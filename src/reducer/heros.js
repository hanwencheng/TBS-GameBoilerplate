import _ from 'lodash';

const heros = (state = {
  heroIndex:0,
  self: [
    {
      name: 'zhangfei',
      position: {x: 2, y: 3},
    }
  ],
  enemy: {},
}, action ) => {
  switch (action.type){
    case 'Create_hero': return _.set(state, action.hero.name, action.hero)
    default : return state
  }
}

export default heros