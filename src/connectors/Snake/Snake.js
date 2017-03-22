import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from 'seamless-immutable'

import { actionCreators } from 'reduxBits/snake'
import _ from 'lodash';

const LEFT = 'left'
const RIGHT = 'right'
const UP = 'up'
const DOWN = 'down'

const styles = Immutable.from({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  canvas: {
    border: '1px solid #5e5d5c',
    backgroundColor: '#f9f7f6',
  },
  gameOver: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#49b975',
    borderRadius: '4px',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
  },

  gameOverHeader: {
    fontFamily: '\'BlocketSans-Bold\', sans-serif',
    color: '#ef404f',
  },
  score: {
    marginTop: '0',
    color: '#5E5D5C',
  },
})

const mapStateToProps = state => ({
  speed: state.snake.speed,
  direction: state.snake.direction,
  size: state.snake.size,
  position: state.snake.position,
  gameOver: state.snake.gameOver,
  foodPosition: state.snake.foodPosition,
  boardSize: state.snake.boardSize,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
})

export class _Snake extends React.Component {

  componentDidMount() {
    this._context = this.canvas.getContext('2d')
    this.init()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getNewPosition = (direction, lastPosition) => {
    const {
      size,
      boardSize,
    } = this.props
    const surfaceWidth = parseInt(boardSize[0] / size, 10);
    const surfaceHeight = parseInt(boardSize[1] / size, 10);

    switch (direction) {
      case LEFT:
        if (lastPosition[0] - 1 === -1) {
          return ([surfaceWidth, lastPosition[1]])
        }
        return ([lastPosition[0] - 1, lastPosition[1]])
      case UP:
        if (lastPosition[1] - 1 === -1) {
          return ([lastPosition[0], surfaceHeight])
        }
        return ([lastPosition[0], lastPosition[1] - 1])
      case RIGHT:
        if (lastPosition[0] + 1 > surfaceWidth) {
          return ([0, lastPosition[1]])
        }
        return ([lastPosition[0] + 1, lastPosition[1]])
      case DOWN:
        if (lastPosition[1] + 1 > surfaceHeight) {
          return ([lastPosition[0], 0])
        }
        return ([lastPosition[0], lastPosition[1] + 1])
      default:
        return (lastPosition)
    }
  }

  handleKeyDown = (event) => {
    const {
      direction,
      actions,
    } = this.props

    const keys = {
      37: LEFT,
      38: UP,
      39: RIGHT,
      40: DOWN,
    }

    const newDirection = keys[event.which]
    if (newDirection) {
      if ((direction === LEFT && newDirection === RIGHT) ||
          (direction === UP && newDirection === DOWN) ||
          (direction === RIGHT && newDirection === LEFT) ||
          (direction === DOWN && newDirection === UP)) {
        return
      }
      actions.setDirection(newDirection)
    }

    event.preventDefault()
  }

  generateFoodPosition = () => {
    const {
      size,
      boardSize,
    } = this.props

    const surfaceWidth = parseInt(boardSize[0] / size, 10);
    const surfaceHeight = parseInt(boardSize[1] / size, 10);

    return ([
      Math.floor(Math.random() * surfaceWidth),
      Math.floor(Math.random() * surfaceHeight),
    ]);
  }

  advance = () => {
    const {
      direction,
      position,
      foodPosition,
      actions,
    } = this.props

    const currentPosition = position[0]
    const pos = position.slice(0, position.length - 1);
    const newPosition = this.getNewPosition(direction, currentPosition)

    if (_.isEqual(currentPosition, foodPosition)) {
      actions.setFoodPosition(this.generateFoodPosition())
      actions.setPosition([newPosition, ...position])
    } else {
      position.forEach((element) => {
        if (_.isEqual(newPosition, element)) {
          actions.setGameOver(true)
        }
      })
      actions.setPosition([newPosition, ...pos])
    }
  }

  drawElement = (position) => {
    const {
      size,
    } = this.props

    const x = size * position[0]
    const y = size * position[1]
    this._context.fillRect(x, y, size, size)
  }

  drawSnake = () => {
    const {
      position,
    } = this.props

    this._context.save()
    this._context.fillStyle = '#4182C3'

    position.forEach(this.drawElement)

    this._context.restore()
  }

  drawFood = () => {
    // TODO: don't draw food on snake body
    const {
      size,
      foodPosition,
    } = this.props

    const food = new Image(size, size)
    food.src = 'assets/symbol.svg'

    this._context.save()

    const x = foodPosition[0] * size
    const y = foodPosition[1] * size

    this._context.drawImage(food, x, y, size, size)

    this._context.restore()
  }

  gameLoop = () => {
    const {
      gameOver,
      boardSize,
    } = this.props
    const canvasWidth = boardSize[0]
    const canvasHeight = boardSize[1]

    // TODO get width from canvas?
    this._context.clearRect(0, 0, canvasWidth, canvasHeight)
    this.advance()
    this.drawSnake()
    this.drawFood()

    if (gameOver) {
      clearInterval(this.interval)
    }
  }

  resetGame = () => {
    const {
      actions,
    } = this.props

    actions.resetGame()
    this.init()
  }

  focusInput = () => {
    this.input.focus()
  }

  init = () => {
    const {
      actions,
      speed,
    } = this.props
    this.focusInput()
    actions.setFoodPosition(this.generateFoodPosition())

    this.interval = setInterval(this.gameLoop, speed)
  }

  render() {
    const {
      boardSize,
      gameOver,
      position,
    } = this.props
    return (
      <div>
        <input
          style={{ position: 'absolute', width: 0, height: 0, outline: '0 !important', border: 'none' }}
          ref={(inpt) => { this.input = inpt }}
          type="text"
          onKeyDown={this.handleKeyDown}
        />
        <h1>
          b-snake
        </h1>
        <div style={_.merge(styles.wrapper, { width: `${boardSize[0]}px`, height: `${boardSize[1]}px` })}>
          {gameOver &&
            <div style={styles.gameOver}>
              <h1 style={styles.gameOverHeader}>
                Game over!
              </h1>
              <h2 style={styles.score}>
                Score: {position.length}
              </h2>
              <div
                style={styles.button}
                onClick={this.resetGame}
              >
                Give it another go
              </div>
            </div>
          }
          <canvas
            style={styles.canvas}
            ref={(c) => { this.canvas = c }}
            onKeyDown={this.handleKeyDown}
            width={boardSize[0]}
            height={boardSize[1]}
          />
        </div>
      </div>
    )
  }
}

_Snake.propTypes = {
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
  size: React.PropTypes.number,
  speed: React.PropTypes.number,
  gameOver: React.PropTypes.bool,
  direction: React.PropTypes.string,
  position: React.PropTypes.array,
  foodPosition: React.PropTypes.array,
  boardSize: React.PropTypes.array,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Snake)
