import store from '@/store'

export const install = function (http) {
  // Log all of the requests (remove logs on production).
  function success (response) {
    if (process.env.NODE_ENV === 'development') {
      console.log('/' + response.request.responseURL.split('/').slice(3).join('/'))
      console.log(response)
    }
    return response
  }
  function error ({ response }) {
    // Todo: Check if response code is 401 in order to send to /login.
    console.log(response)
    if (response.status === 401) {
      store.dispatch('session/logout')
    }
    return Promise.reject(response)
  }
  http.interceptors.response.use(success, error)
}
