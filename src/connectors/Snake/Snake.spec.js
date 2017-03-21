import { _Snake as Snake } from './Snake'

describe('Snake', () => {
  let actual

  before(() => {
    actual = shallow(<Snake />)
  })

  it('fails awesomely', () => {
    expect(actual).toBe(false)
  })
})
