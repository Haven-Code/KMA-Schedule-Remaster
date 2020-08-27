import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import ICS from 'vue-ics'
import './registerServiceWorker'

Vue.use(ICS, {
	uidDomain: 'https://danghoangphuc.com',
	prodId: 'KMAScheduleByDHP'
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
