import Immutable from 'seamless-immutable'

import * as actions from './actions'

const initialState = Immutable.from({
  speed: 100,
  direction: 'right',
  size: 10,
  position: [
    [6, 4], [5, 4], [4, 4],
  ],
  gameOver: false,
  foodPosition: [0, 0],
})

const snake = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case actions.SET_SPEED:
      return state.set('speed', payload)
    case actions.SET_DIRECTION:
      return state.set('direction', payload)
    case actions.SET_SIZE:
      return state.set('size', payload)
    case actions.SET_POSITION:
      return state.set('postion', payload)
    case actions.SET_GAME_OVER:
      return state.set('gameOver', payload)
    case actions.SET_FOOD_POSITION:
      return state.set('foodPosition', payload)
    default:
      return state
  }
}

export default snake
