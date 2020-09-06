<!-- @format -->

<template>
	<v-app>
		<v-app-bar v-if="!checkPageNotNavBar" app clipped-left color="amber" dark elevation="3">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<span class="title ml-3 mr-5">
				KMA&nbsp;
				<span class="font-weight-light">Schedule</span>
			</span>

			<v-spacer></v-spacer>

			<p v-if="user.isLoggined" class="text-h6 mt-4 font-weight-light text--white hidden-sm-and-down mr-2">
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

		<v-navigation-drawer v-if="!checkPageNotNavBar" v-model="drawer" app clipped color="grey lighten-4">
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
							<v-icon>fas fa-tools</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Chuyển Sang Icalendar
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link exact :to="{ name: 'Sync' }">
						<v-list-item-action>
							<v-icon>fas fa-sync</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Đồng Bộ Hoá
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
					<v-list-item link class="green lighten-1" dark @click.stop="installAppDialog = true" v-if="!hideInstallBanner">
						<v-list-item-action>
							<v-icon class="white--text">fas fa-mobile-alt</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Cài Đặt App Ngay !
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item link exact dark class="orange accent-2" :to="{ name: 'Donate' }">
						<v-list-item-action>
							<v-icon class="white--text">fas fa-hand-holding-usd</v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>
								Ủng Hộ Dev
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

		<InstallApp v-model="installAppDialog" v-if="!checkPageNotNavBar" />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	import InstallApp from './components/InstallApp'

	export default {
		name: 'App',
		components: {
			InstallApp,
		},
		computed: {
			...mapState(['user']),
			getYear() {
				return moment().format('YYYY')
			},
			checkPageNotNavBar() {
				const denyNavBar = ['LD', 'Login', 'ToS', 'PP']

				if (denyNavBar.indexOf(this.$route.name) >= 0){
					return true
				} else {
					return false
				}
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
			isPwa() {
				var displayModes = ['fullscreen', 'standalone', 'minimal-ui']
				return displayModes.some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches)
			},
		},
		mounted() {
			// const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone

			if (this.isPwa()) {
				this.hideInstallBanner = true
			}
		},
	}
</script>

<style>
	body {
		overscroll-behavior-y: contain;
	}
</style>
