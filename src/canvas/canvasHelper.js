import map from '../engine/tiles';

const tileToPosition = (tile) => ({
  x: tile.x * map.tilewidth,
  y: tile.y * map.tileheight,
})

const compare = (x, y) => {
  if (x > y) {
    return 1
  } else if (x === y) {
    return 0
  } else {
    return -1
  }
}

const positionToTile = (position) => ({
  x: Math.floor(position.x / map.tilewidth),
  y: Math.floor(position.y / map.tileheight)
})

const tileMinus = (newTile, oldTile ) => ({
  x: compare(newTile.x , oldTile.x),
  y: compare(newTile.y , oldTile.y),
});

export default {
  positionToTile,
  tileToPosition,
  tileMinus,
}