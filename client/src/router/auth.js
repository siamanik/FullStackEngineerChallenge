import jwtDecode from 'jwt-decode'

export default {
  authorized (to, from, next) {
    if (localStorage.getItem('token')) {
      return next()
    } else {
      return next('/login')
    }
  },
  isAdmin (to, from, next) {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token').split(' ')[1]
      var decoded = jwtDecode(token)
      if (decoded.admin) {
        return next()
      } else {
        return next('/login')
      }
    } else {
      return next('/login')
    }
  }

}
