import React from 'react'
import { Route } from 'react-router'

import Default from 'layouts/Default'
import HelloDesktop from 'layouts/HelloDesktop'

export default (
  <Route path="" component={Default} >
    <Route path="/" component={HelloDesktop} />
  </Route>
)
