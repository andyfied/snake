import React from 'react'
import { Route } from 'react-router'

import Default from 'layouts/Default'
//import HelloDesktop from 'layouts/HelloDesktop'
import Snake from 'connectors/Snake'

export default (
  <Route path="" component={Default} >
    <Route path="/" component={Snake} />
  </Route>
)
