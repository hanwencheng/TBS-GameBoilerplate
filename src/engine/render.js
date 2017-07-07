import map from './tiles'
import loader from '../core/loader';
import _ from 'lodash'
import {movingSpeed} from '../constant'

const getTile = (map, layer, col, row) => {
  return layer.data[map.width * row + col]
}

const drawLayers = function (canvas, camera, atlas) {
  var startCol = Math.floor(camera.x / map.tilewidth);
  var endCol = startCol + (camera.width / map.tilewidth);
  var startRow = Math.floor(camera.y / map.tileheight);
  var endRow = startRow + (camera.height / map.tileheight);
  var offsetX = -camera.x + startCol * map.tilewidth;
  var offsetY = -camera.y + startRow * map.tileheight;

  const drawLayer = layer => {

    for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
        var tile = getTile(map, layer, c, r);
        var x = (c - startCol) * map.tilewidth + offsetX;
        var y = (r - startRow) * map.tileheight + offsetY;
        var sx = (tile % map.tilesets.column - 1) * map.tilesets.width;
        var sy = Math.floor(tile/map.tilesets.column) * map.tilesets.height;
        // console.log(`tile: ${tile}, x: ${x}, y: ${y}, sx: ${sx}, sy: ${sy}`)
        if (tile !== 0) { // 0 => empty tile
          canvas.drawImage(
            atlas, // image
            sx,  // source x
            sy, // source y
            map.tilesets.width, // source width
            map.tilesets.height, // source height
            Math.round(x),  // target x
            Math.round(y), // target y
            map.tilewidth, // target width
            map.tileheight// target height
          );
        }
      }
    }
  }

  map.layers.forEach(drawLayer);

};

const drawHeroes = (canvas, store, context, camera, heroes, delta) => {
  _.forIn(heroes, (hero, heroId) => {
    if(hero.isMoving){
      // const deltaX = hero.target.x - hero.x;
      // const deltaY = hero.target.y - hero.y;


    }
    const scaleX = hero.x * map.tilewidth;
    const scaleY = hero.y * map.tileheight;
    let offsetX = scaleX - camera.x;
    let offsetY = scaleY - camera.y;
    let image = loader.getImage(store, hero.sprite);

    if(offsetX < -hero.width || offsetY < -hero.height)
      return;

    const frame = context.tick % hero.animation

    canvas.drawImage(
      image,
      hero.width * frame,
      0,
      hero.width ,
      hero.height,
      offsetX,
      offsetY,
      map.tilewidth,
      map.tileheight,
    )
    }
  )
}

const drawMoveRange = (canvas, camera, context, heroes) => {
  const select = context.selection
  if(select){
    const unit = heroes[select];
    if(!unit.isMoving){
      const scaleX = unit.x * map.tilewidth - camera.x,
        scaleY = unit.y * map.tileheight - camera.y,
        range = unit.movement,
        maxX = scaleX + (range + 1) * map.tilewidth,
        minX = scaleX - range * map.tilewidth,
        maxY = scaleY + (range + 1) * map.tileheight,
        minY = scaleY - range * map.tileheight,
        edges = (3 + ( range - 1 ) * 2) * 4 ;
      let towardRight = true,
        towardBottom = true,
        isXChange = false,
        pointerX = scaleX + map.tilewidth,
        pointerY = scaleY - range * map.tileheight,
        start = 0;

      canvas.fillStyle = "rgba(255, 0, 0, 0.5)";
      canvas.beginPath();
      console.log('map is', map)
      canvas.moveTo(pointerX, pointerY)
      do{
        if(isXChange){
          if((start === edges / 4) || (start === edges / 4 * 3))
            towardRight = !towardRight;
          pointerX += towardRight ? map.tilewidth : - map.tilewidth;
        } else {
          if(start === edges / 2 )
            towardBottom = !towardBottom;
          pointerY += towardBottom ? map.tileheight : - map.tileheight;
        }
        isXChange = !isXChange;
        canvas.lineTo(pointerX, pointerY)
        start++
        console.log('start is', start)
      } while (start < edges)

      canvas.closePath();
      canvas.fill();
    }
  }
}

export default {
  drawLayers,
  drawHeroes,
  drawMoveRange,
}