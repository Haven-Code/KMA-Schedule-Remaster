<!-- @format -->

<template>
	<div class="appBar">
		<v-app-bar app clipped-left color="amber" dark elevation="3">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<span class="title ml-3 mr-5">
				KMA&nbsp;
				<span class="font-weight-light">Schedule</span>
			</span>

			<v-spacer></v-spacer>

			<p class="text-h6 mt-4 font-weight-light text--white hidden-sm-and-down mr-2">
				{{ user.userData.displayName }} ({{ user.userData.studentCode }})
			</p>

			<v-menu offset-y offset-x>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon color="white" dark v-bind="attrs" v-on="on">
						<v-icon>fas fa-power-off</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item>
						<v-list-item-title @click.prevent="doLogout">
							<v-icon class="mr-1">fas fa-power-off</v-icon>
							Thoát
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4" :permanent="$vuetify.breakpoint.mdAndUp" left>
			<v-list dense class="grey lighten-4">
				<v-list-item-group mandatory>
					<v-list-item link exact :to="{ name: 'Dashboard' }">
						<v-list-item-action>
							<v-icon>far fa-calendar-alt</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Thời Khoá Biểu
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link exact :to="{ name: 'Icalendar' }">
						<v-list-item-action>
							<v-icon>fas fa-sync</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Chuyển Sang Icalendar
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link exact :to="{ name: 'User' }">
						<v-list-item-action>
							<v-icon>fas fa-user</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Thông Tin Sinh Viên
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>

			<template v-slot:append>
				<v-list-item-group mandatory>
					<v-list-item link class="success" dark @click.stop="installAppDialog = true">
						<v-list-item-action>
							<v-icon class="white--text">fas fa-mobile-alt</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Cài Đặt App Ngay !
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link exact :to="{ name: 'About' }">
						<v-list-item-action>
							<v-icon>fas fa-info-circle</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Thông Tin
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>

				<p class="text-subtitle-2 text-center mb-0 mt-2">
					Copyright &copy; {{ getYear }}
					<a target="_blank" href="https://havencode.net">Haven Code</a>
				</p>
				<p class="text-subtitle-2 text-center mb-2 ">
					Powered By
					<a href="https://danghoangphuc.com" target="_blank">Phuc Dang</a>
				</p>
			</template>
		</v-navigation-drawer>

		<InstallApp v-model="installAppDialog" />
	</div>
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
			}
		},
		methods: {
			doLogout() {
				this.$store.commit('user/LOGOUT')
				this.$router.replace({ name: 'Login' })
			},
		},
		mounted() {
			window.addEventListener('DOMContentLoaded', () => {
				let displayMode = 'browser tab'
				if (navigator.standalone) {
					displayMode = 'standalone-ios'
				}
				if (window.matchMedia('(display-mode: standalone)').matches) {
					displayMode = 'standalone'
				}
				// Log launch display mode to analytics
				console.log('DISPLAY_MODE_LAUNCH:', displayMode)
			})
		},
	}
</script>

<style></style>
