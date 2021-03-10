'use  strict'
import Vue from 'vue'
import App from './App'
import config from './config.js'
import './axios'
import './vue-awesome'
import './element'
import './socketio'
import './eventbus'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import message from '@/utilities/Message'

Vue.config.productionTip = false
sync(store, router)
Vue.prototype.$message = message
// start app
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});



