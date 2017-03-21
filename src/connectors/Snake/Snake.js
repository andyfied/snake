import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionCreators } from 'reduxBits/snake'

const mapStateToProps = state => ({
  speed: state.snake.speed,
  direction: state.snake.direction,
  size: state.snake.size,
  position: state.snake.position,
  gameOver: state.snake.gameOver,
  applePosition: state.snake.applePosition,
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

  init = () => {
    const {
      actions,
      speed,
    } = this.props
    // TODO set focus
    actions.setFoodPosition(this.generateApplePosition())

    this.interval = setInterval(this.gameLoop, speed)
  }

  generateApplePosition = () => {
    const {
      size,
    } = this.props

    const surfaceWidth = parseInt(window.innerWidth / size, 10);
    const surfaceHeight = parseInt(window.innerHeight / size, 10);

    return ([
      Math.floor(Math.random() * surfaceWidth),
      Math.floor(Math.random() * surfaceHeight),
    ]);
  }

  advance = () => {
    console.log('advance')
  }

  drawSnake = () => {
    console.log('draw snake')
  }

  drawApple = () => {
    console.log('draw apple')
  }

  gameLoop = () => {
    const {
      gameOver,
    } = this.props
    const canvasWidth = parseInt(window.innerWidth, 10)
    const canvasHeight = parseInt(window.innerHeight, 10)

    // TODO get width from canvas?
    this._context.clearRect(0, 0, canvasWidth, canvasHeight)
    this.advance()
    this.drawSnake()
    this.drawApple()

    if (gameOver) {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <div>
        <h1>
          b-snake
        </h1>
        <canvas
          ref={(c) => { this.canvas = c }}
          width={window.innerWidth}
          height={window.innerWidth}
        />
      </div>
    )
  }
}

_Snake.propTypes = {
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
  size: React.PropTypes.number,
  speed: React.PropTypes.number,
  gameOver: React.PropTypes.bool,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Snake)
