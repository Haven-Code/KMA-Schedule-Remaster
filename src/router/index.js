import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

import store from '../store/index'

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {

		const user = store.state.user.isLogined

		if (!user) {
			next("/login")
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
