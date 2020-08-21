import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls";
const ls = new SecureLS({
	isCompression: false,
	encodingType: 'aes',
	encryptionSecret: 'phuc-phoenix'
});

import user from './user'

Vue.use(Vuex)

const pluginState = createPersistedState({
	storage: {
		getItem: key => ls.get(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: key => ls.remove(key)
	},
	path: [
		'user'
	]
})

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		user: user
	},
	plugins: [pluginState],
})
