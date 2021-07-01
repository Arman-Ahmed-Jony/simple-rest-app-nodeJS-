const authRoute = require('./auth')
const subscribesRoute = require('./subscribers')
const usersRoute = require('./users')

const routes = [
  {
    path: '/auth',
    component: authRoute
  },
  { path: '/subscribers', component: subscribesRoute },
  { path: '/users', component: usersRoute }
]

module.exports = function setRoutes(app) {
  routes.forEach((route) => {
    app.use(route.path, route.component)
  })
}
