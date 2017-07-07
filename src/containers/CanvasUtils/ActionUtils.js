import _ from 'lodash'

const _getMousePosition = (canvasSize, evt) => ({
  x: evt.clientX - canvasSize.left,
  y: evt.clientY - canvasSize.top,
})

const _isInSprite = (sprites, mousePosition, camera) => {
  let relateX = mousePosition.x + camera.x;
  let relateY = mousePosition.y + camera.y;
  return (
      sprites.left <= relateX &&
      relateX <= sprites.right &&
      sprites.top <= relateY &&
      relateY <= sprites.bottom
  )
}

const _selectSprite = (evt, props) => {
  let mousePos = _getMousePosition(props.canvas.context.size, evt);
  let rectList = props.store.heroes.sortedMap
  let found;
  for(let i = rectList.length - 1; i >= 0 ;i--){
    let rect = rectList[i];
    if(_isInSprite(rect, mousePos, props.canvas.camera)){
      found = rect.id
      break;
    }
  }
  return found
}


const onHover = (evt, props) => {
  let found = _selectSprite(evt, props)
  if ( found && props.canvas.context.highlight !== found){
    props.actions.context.setHighlight(found);
  }
  return found;
};

const onClick = (evt, props) => {

  let found = _selectSprite(evt, props)
  if( found && props.canvas.context.selection[0] !== found) {
    props.actions.context.setSelection([].concat(found));
  } else {
    props.actions.context.setSelection([]);
  }
}

export default {
  onHover,
  onClick,
}