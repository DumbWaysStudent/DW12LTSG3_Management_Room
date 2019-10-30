import promise from 'redux-promise-middleware'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

const middleware = []

const reactNavigation = createReactNavigationReduxMiddleware(
    state => state.router,
    "root"
)

// if (__DEV__) {
//     middleware.push(createLogger())
// }


middleware.push(reactNavigation)
middleware.push(promise)

export default middleware;