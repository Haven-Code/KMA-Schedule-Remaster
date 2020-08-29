import Vue from 'vue'
import VueRouter from 'vue-router'
import LD from '../views/LandingPage.vue'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'LD',
		component: LD,
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
	},
	{
		path: '/termofservice',
		name: 'ToS',
		component: () => import(/* webpackChunkName: "tos" */ '../views/ToS.vue')
	},
	{
		path: '/privacypolicy',
		name: 'PP',
		component: () => import(/* webpackChunkName: "pp" */ '../views/PrivacyPolicy.vue')
	},
	{
		path: '/index.html',
		// component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
		redirect: { name: 'Dashboard' }
	},
	{
		path: '/dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: () => import(/* webpackChunkName: "dashboard-chil" */ '../views/Dashboard/Schedule.vue')
			},
			{
				path: '/about',
				name: 'About',
				component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/About.vue')
			},
			{
				path: '/ics',
				name: 'Icalendar',
				component: () => import(/* webpackChunkName: "icalendar" */ '../views/Dashboard/Icalendar.vue')
			},
			{
				path: '/sync',
				name: 'Sync',
				component: () => import(/* webpackChunkName: "Sync" */ '../views/Dashboard/Sync.vue')
			},
			{
				path: '/user',
				name: 'User',
				component: () => import(/* webpackChunkName: "User" */ '../views/Dashboard/User.vue')
			}
		]
	},
	{
		path: '*',
		name: '404',
		component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

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
