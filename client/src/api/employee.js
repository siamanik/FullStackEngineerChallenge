import api from './index'

const { http, index, store, update, destroy } = api

/**
 * ===================
 * Applicant API
 * ===================
 */
export default {
  baseUrl: 'http://localhost:3000/api/',
  url: 'employees',
  http,
  index,
  store,
  update,
  destroy,

  /**
   * Login
   *
   */
  login (payload) {
    return this.http(this.baseUrl, false)
      .post(`${this.url}/login`, payload)
  }
}
