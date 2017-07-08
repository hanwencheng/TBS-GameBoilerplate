import map from './tiles'
import loader from '../core/loader';
import _ from 'lodash'
import {movingSpeed} from '../constant'
import canvasHelper from '../canvas/canvasHelper'

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

const _reduceDelta = (delta, unit, actions, heroId) => {
  let restDistance = delta * movingSpeed.hero;

  while (restDistance > 0) {
    let path = unit.path;
    if(path.length === 0)
      break;
    let target = {x: _.head(path)[0], y: _.head(path)[1]}

    let currentX = unit.pixelX,
      currentY = unit.pixelY,
      newX = currentX,
      newY = currentY,
      targetDelta;

    const deltaDirection = canvasHelper.tileMinus(target, {x:unit.x, y: unit.y})
    const targetPosition = canvasHelper.tileToPosition(target);
    if(deltaDirection.x !== 0) {
      targetDelta = Math.abs(targetPosition.x - currentX)
      if(restDistance >= targetDelta){
        newX = targetPosition.x
        restDistance -= targetDelta
        //set Position
        actions.heroes.setPosition(heroId, target.x, target.y)
        unit.path.shift()
        actions.heroes.setPath(heroId, unit.path)
        unit.x = target.x;
        unit.y = target.y;
      }else{
        newX += restDistance * deltaDirection.x
        restDistance = 0
      }
    } else if(deltaDirection.y !== 0){
      targetDelta = Math.abs(targetPosition.y - currentY)
      if(restDistance >= targetDelta){
        newY = targetPosition.y
        restDistance -= targetDelta
        //set Position
        actions.heroes.setPosition(heroId, target.x, target.y)
        unit.path.shift()
        actions.heroes.setPath(heroId, unit.path)
        unit.x = target.x;
        unit.y = target.y;
      }else{
        newY += restDistance * deltaDirection.y
        restDistance = 0
      }
    }
    actions.heroes.move(heroId, newX, newY)
    unit.pixelX = newX;
    unit.pixelY = newY;
    //set Pixel X, and Y
  }
  
}

const drawHeroes = (canvas, store, context, camera, heroes, delta, actions) => {
  _.forIn(heroes, (hero, heroId) => {
    if(hero.isMoving){
      _reduceDelta(delta, hero, actions, heroId)
    }
    const scaleX = hero.pixelX;
    const scaleY = hero.pixelY;
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
        range = unit.movePoint,
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