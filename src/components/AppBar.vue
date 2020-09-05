<!-- @format -->

<template>
	<v-layout>
		

		<InstallApp v-model="installAppDialog" />
	</v-layout>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import InstallApp from './InstallApp'

	export default {
		name: 'AppBar',
		components: {
			InstallApp,
		},
		computed: {
			...mapState(['user']),
			getYear() {
				return moment().format('YYYY')
			},
		},
		data() {
			return {
				drawer: null,
				installAppDialog: false,
				hideInstallBanner: false,
				swipeDirection: 'None',
			}
		},
		methods: {
			doLogout() {
				this.$store.commit('user/LOGOUT')
				this.$router.replace({ name: 'Login' })
			},
			swipe(direction) {
				this.swipeDirection = direction
			},
		},
		mounted() {
			const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone

			if (isInStandaloneMode()) {
				this.hideInstallBanner = true
			}
		},
	}
</script>

<style></style>
