import _ from 'lodash';

const heros = (state = {}, action ) => {
  switch (action.type){
    case 'Create_hero': return _.set(state, action.hero.name, action.hero)
    default : return state
  }
}

export default heros