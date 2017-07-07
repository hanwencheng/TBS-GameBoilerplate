import _ from 'lodash'
import map from '../../engine/tiles';

const _getMousePosition = (canvasSize, camera, evt) => ({
  x: evt.clientX - canvasSize.left + camera.x,
  y: evt.clientY - canvasSize.top + camera.y,
})

const _positionToTile = (position) => ({
  x: Math.floor(position.x / map.tilewidth),
  y: Math.floor(position.y / map.tileheight)
})

const _isInSprite = (sprites, position) => {
  return (
      sprites.left <= position.x &&
      position.x <= sprites.right &&
      sprites.top <= position.y &&
      position.y <= sprites.bottom
  )
}

const _selectSprite = (evt, props) => {
  let mousePos = _getMousePosition(props.canvas.context.size, props.canvas.camera, evt);
  let rectList = props.store.heroes.sortedMap
  let found;
  for(let i = rectList.length - 1; i >= 0 ;i--){
    let rect = rectList[i];
    if(rect.selectable && _isInSprite(rect, mousePos)){
      found = rect.id
      break;
    }
  }
  return found
}

const onSelect = (evt, props) => {
  let found = _selectSprite(evt, props)
  if( found && props.canvas.context.selection !== found) {
    props.actions.context.setSelection(found);
  } else {
    props.actions.context.setSelection(null);
  }
}

const onMove = (evt, props) => {
  let mousePos = _getMousePosition(props.canvas.context.size, props.canvas.camera, evt);
  let target = _positionToTile(mousePos);
  props.actions.heroes.setTarget(props.canvas.context.selection, target)
}

const onHover = (evt, props) => {
  let found = _selectSprite(evt, props)
  if ( found && props.canvas.context.highlight !== found){
    props.actions.context.setHighlight(found);
  }
  return found;
};

const onClick = (evt, props) => {
  if(props.canvas.context.selection){
    onMove(evt,props)
  }else {
    onSelect(evt, props)
  }
}

export default {
  onHover,
  onClick,
}