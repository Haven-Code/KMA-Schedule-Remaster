<!-- @format -->

<template>
	<v-container class="fill-height grey lighten-4" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10" md="8">
				<center>
					<div class="content">
						<v-img src="../assets/logo.png" class="logo"></v-img>

						<p class="text-h1 mt-2">
							&lt;
							<strong>KMA&nbsp;</strong>
							Schedule /&gt;
							<span class="flicker">_</span>
						</p>
					</div>

					<v-btn :to="{ name: 'Login' }" color="primary" class="mt-5" large v-if="!checkLogin">
						<v-icon left>fas fa-user</v-icon>
						Đăng Nhập Bằng Actvn !
					</v-btn>

					<div class="abc" v-else>
						<p class="title">Chào {{ user.userData.displayName }} ({{ user.userData.studentCode }}) !</p>

						<v-btn :to="{ name: 'Dashboard' }" color="primary" class="mt-5" large>
							<v-icon left>fas fa-tachometer-alt</v-icon>
							Truy Cập Bảng Điều Khiển !
						</v-btn>
						<br />
						<v-btn text color="primary" class="mt-2">
							Thoát
						</v-btn>
					</div>
				</center>
			</v-col>
		</v-row>

		<v-footer absolute class="font-weight-medium">
			<v-col class="text-center" cols="12">
				Copyright &copy; {{ new Date().getFullYear() }} —
				<strong><a href="https://havencode.net" target="_blank">Haven Code</a></strong> - Powered By <a href="https://danghoangphuc.com" target="_blank">Phuc Dang</a>
				<br>
				<router-link :to="{name: 'ToS'}">Term of Service</router-link> | <router-link :to="{name: 'PP'}">Privacy Policy</router-link>
			</v-col>
		</v-footer>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'LandingPage',
		computed: {
			...mapState(['user']),
			checkLogin() {
				return this.user.isLogined
			},
		},
		methods: {},
		created() {
			if (this.user.isLogined) {
				this.$router.replace({ name: 'Dashboard' })
			}
		},
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 20%;
		height: auto;
	}

	@keyframes flickerAni {
		25% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.flicker {
		-webkit-animation: flickerAni 1.5s infinite;
	}
</style>
