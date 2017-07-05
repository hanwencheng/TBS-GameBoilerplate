import map from './tiles'
import loader from '../core/loader';
import _ from 'lodash'

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

const drawHeroes = (canvas, store, camera, heroes) => {
  _.forIn(heroes, (hero, heroId) => {
    const scaleX = hero.x * map.tilewidth;
    const scaleY = hero.y * map.tileheight;
    let offsetX = scaleX - camera.x;
    let offsetY = scaleY - camera.y;
    let image = loader.getImage(store, hero.sprite);

    if(offsetX < -hero.width || offsetY < -hero.height)
      return;

    canvas.drawImage(
      image,
      0,
      0,
      hero.width,
      hero.height,
      offsetX,
      offsetY,
      map.tilewidth,
      map.tileheight,
    )
    }
  )
}

const drawMove = (canvas, camera, select, heroes) => {
  if(select.length === 1){
    const unit = heroes[select[0]],
      scaleX = unit.x * map.tilewidth - camera.x,
      scaleY = unit.y * map.tileheight - camera.y,
      range = unit.movement,
      maxX = scaleX + (range + 1) * map.tilewidth,
      minX = scaleX - range * map.tilewidth,
      maxY = scaleY + (range + 1) * map.tileheight,
      minY = scaleY - range * map.tileheight;
      let towardRight = true,
      towardBottom = false,
      isXChange = true,
      pointerX = scaleX,
      pointerY = scaleY - range * map.tileheight;

    canvas.fillStyle = "rgba(255, 0, 0, 0.5)";
    canvas.beginPath();
    canvas.moveTo(pointerX, pointerY)
    do{
      if(isXChange){
        if(pointerX === maxX || pointerX === minX)
          towardRight = !towardRight;
        pointerX += towardRight ? map.tilewidth : - map.tilewidth;
      } else {
        if(pointerY === maxY || pointerY === minY)
          towardBottom = !towardBottom;
        pointerY += towardBottom ? map.tileheight : - map.tileheight;
      }
      isXChange = !isXChange;
      canvas.lineTo(pointerX, pointerY)
    } while (
      pointerX !== scaleX ||
      pointerY !==scaleY - range * map.tileheight)

    canvas.closePath();
    canvas.fill();
  }
}

export {
  drawLayers,
  drawHeroes,
  drawMove,
}