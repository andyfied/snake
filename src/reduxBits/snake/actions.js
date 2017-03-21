import { createAction } from 'redux-actions'

export const SET_SPEED = 'Set snake speed'
export const SET_DIRECTION = 'Set snake direction'
export const SET_SIZE = 'Set size of canvas'
export const SET_POSITION = 'Set snake position'
export const SET_GAME_OVER = 'Game over'
export const SET_FOOD_POSITION = 'Set the position of the food'
export const SET_BOARD_SIZE = 'Set the size of the board'

const setSpeed = createAction(
  SET_SPEED,
  (payload) => payload
)

const setDirection = createAction(
  SET_DIRECTION,
  (payload) => payload
)

const setSize = createAction(
  SET_SIZE,
  (payload) => payload
)

const setPosition = createAction(
  SET_POSITION,
  (payload) => payload
)

const setGameOver = createAction(
  SET_GAME_OVER,
  (payload) => payload
)

const setFoodPosition = createAction(
  SET_FOOD_POSITION,
  (payload) => payload
)

const setBoardSize = createAction(
  SET_BOARD_SIZE,
  (payload) => payload
)

export const actionCreators = {
  setSpeed,
  setDirection,
  setSize,
  setPosition,
  setGameOver,
  setFoodPosition,
  setBoardSize,
}
