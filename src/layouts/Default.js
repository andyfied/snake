import React from 'react'

const Default = ({ children }) => (
  <div>
    {children}
  </div>
)

Default.propTypes = {
  children: React.PropTypes.node.isRequired,
}

export default Default
