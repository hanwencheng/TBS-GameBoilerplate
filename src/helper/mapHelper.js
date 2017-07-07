import map from '../engine/tiles';

tileToPosition = (tile, props) => ({
  x: Math.floor(position.x / map.tilewidth),
  y: Math.floor(position.y / map.tileheight)
})

export default {}