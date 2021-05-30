import api from './index'

const { http, index, store, update, destroy } = api

/**
 * ===================
 * Applicant API
 * ===================
 */
export default {
  baseUrl: 'http://localhost:3000/api/',
  url: 'feedbacks',
  http,
  index,
  store,
  update,
  destroy,

  /**
   * Find
   *
   */
  find (params = null) {
    return this.http(this.baseUrl)
      .get(`${this.url}/find`, { params })
  }
}
