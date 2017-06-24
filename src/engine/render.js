import map from './tiles'

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

const render ={
  drawLayers,
}

export {
  render as default,
  drawLayers
}