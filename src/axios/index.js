import Vue from 'vue'
import axios from 'axios'
import { install as installMiddlewares } from './middlewares'
import config from '../config'


// Export http instance so it can be used from vuex.
export const http = axios.create({
  baseURL: config.api + config.port,
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
})

installMiddlewares(http)

export function setHttpToken(token) {
  http.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
}

// Expose as this.$http inside Vue components
Vue.prototype.$http = http
