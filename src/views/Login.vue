<!-- @format -->

<template>
	<v-container class="fill-height amber loginForm" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10" md="8">
				<v-card class="elevation-12" height="50vh">
					<v-toolbar color="primary" dark flat>
						<v-toolbar-title>
							<span class="title ml-3 mr-5">
								KMA&nbsp;
								<span class="font-weight-light">Account</span>
							</span>
						</v-toolbar-title>

						<v-spacer></v-spacer>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn :href="source" icon large target="_blank" v-on="on">
									<v-icon>far fa-question-circle</v-icon>
								</v-btn>
							</template>
							<span>Help</span>
						</v-tooltip>
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field outlined label="Login" name="login" prepend-icon="fas fa-user" type="text" v-model="username" required :counter="10"></v-text-field>

							<v-text-field outlined id="password" label="Password" name="password" prepend-icon="fas fa-user-lock" type="password" required v-model="password"></v-text-field>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" block depressed @click.prevent="doLogin">
							<v-icon class="mr-2">fas fa-sign-in-alt</v-icon>
							Login
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	/* eslint-disable */
	import axios from 'axios'
	import swal from 'sweetalert'

	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				password: '',
				source: '',
			}
		},
		methods: {
			async doLogin() {
				if (this.username === '' || this.password === '') {
					return swal({
						title: 'Error !',
						icon: 'error',
						text: 'Tên Đăng Nhập / Mật Khẩu Không Được Trống !',
					})
				}

				let param = {
					username: this.username,
					password: this.password,
				}

				try {

					let res = await axios.post(process.env.VUE_APP_API_LOGIN_URL, param)

					console.table(JSON.parse(res.data))

				} catch (err) {
					return swal({
						title: 'Error !',
						icon: 'error',
						text: err,
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.swal-modal {
		font-family: Helvetica;
	}
</style>
