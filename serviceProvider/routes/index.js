const authRoute = require('./auth')
const subscribesRoute = require('./subscribers')
const usersRoute = require('./users')
const staticPages = require('./StaticPages')

const routes = [
  {
    path: '/auth',
    component: authRoute
  },
  { path: '/subscribers', component: subscribesRoute },
  { path: '/users', component: usersRoute },
  {
    path: '/',
    component: staticPages
  }
]

module.exports = function setRoutes(app) {
  routes.forEach((route) => {
    if (route.path && route.component) {
      app.use(route.path, route.component)
    }
  })
}
