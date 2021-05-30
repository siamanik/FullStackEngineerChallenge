import axios from 'axios'

/**
 *============================================================
 * API
 * ===========================================================
 *
 * Initialize the axios instance with an Authorization header.
 * Refreshes expired token before am API request.
 *
 */
export default {
  /**
   * Creates an axios instance with an access token as authorization header
   *
   * @param String baseUrl
   * @param String acceptLanguage
   * @return {*} http
   */
  http (baseUrl, withAuth = true) {
    const http = axios.create({ baseURL: baseUrl, withCredentials: true })

    http.interceptors.request.use(async config => {
      /**
       * Set Headers config
       */
      config.headers = {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Credentials': 'true'
      }
      if (withAuth) config.headers.Authorization = localStorage.getItem('token')
      return config
    })

    return http
  },

  /**
   * Display a list of the resource.
   *
   */
  index (params = null) {
    return this.http(this.baseUrl)
      .get(this.url, { params })
  },

  /**
   * Store a newly created resource in storage.
   *
   */
  store (payload) {
    return this.http(this.baseUrl)
      .post(`${this.url}`, payload)
  },

  /**
   * Update the specified resource in storage.
   *
   */
  update (id, payload) {
    return this.http(this.baseUrl)
      .put(`${this.url}/${id}`, payload)
  },

  /**
   * Remove the specified resource from storage.
   *
   */
  destroy (id) {
    return this.http(this.baseUrl)
      .delete(`${this.url}/${id}`)
  }
}
