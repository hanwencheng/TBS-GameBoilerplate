import _ from 'lodash'
import map from '../engine/tiles';
import helper from './canvasHelper';

const _getMousePosition = (canvasSize, camera, evt) => ({
  x: evt.clientX - canvasSize.left + camera.x,
  y: evt.clientY - canvasSize.top + camera.y,
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

const _getUnit = (props) => (props.store.heroes.data[props.canvas.context.selection])

const _tileToPath = (unit, target) => {
  const originX = unit.x
  const originY = unit.y
  const targetX = target.x
  const targetY = target.y
  let path = []
  for(var i = 0; i < Math.abs(targetX - originX); i ++){
    let stepX = targetX - originX > 0 ? i + 1 : - i - 1
    path.push([originX + stepX, originY])
  }
  for(var j = 0; j < Math.abs(targetY - originY); j ++){
    let stepY = targetY - originY > 0 ? j + 1 : - j - 1
    path.push([targetX, originY + stepY])
  }
  return path
}

const _isInclude = (props, target) => {
  const unit = _getUnit(props);
  const isInMovePoint = (
    Math.abs(target.x - unit.x) +
    Math.abs(target.y - unit.y)
  ) <= unit.movePoint
  return unit.movePoint && isInMovePoint
}

const _isValidatePosition = (props, evt) => {
  const mousePos = _getMousePosition(props.canvas.context.size, props.canvas.camera, evt);
  const target = helper.positionToTile(mousePos);
  return _isInclude(props, target) ? target : null;
};

const onHover = (evt, props) => {
  let found = _selectSprite(evt, props)
  if ( found && props.canvas.context.highlight !== found){
    props.actions.context.setHighlight(found);
  }
  return found;
};

//TODO
const onClick = (evt, props) => {
  const current = _selectSprite(evt, props)
  const previous = props.canvas.context.selection
  if(previous){
    if(current && previous !== current){
      //
      props.actions.context.setSelection(current)
    }else if (!current){

    }
  }
  if(current) {
    if(previous !== current){
      //pick new unit: do nothing, maybe later operation
      props.actions.context.setSelection(current)
    }else{
      //same unit: do nothing
    }
  } else {
    if (previous) {
      //no current, operate based on previous
      const unit = _getUnit(props);
      if(unit.isMoving){
        return;
      }

      const target =_isValidatePosition(props, evt)
      if(target){
        const path = _tileToPath(unit, target);
        props.actions.heroes.setPath(previous, path)
      }else{
        props.actions.context.setSelection(null);
      }
    } else {
      // no previous, no current, do nothing
    }
  }
}

export default {
  onHover,
  onClick,
}