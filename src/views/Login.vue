<!-- @format -->

<template>
	<v-container class="fill-height amber loginForm" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10" md="8">
				<v-card class="elevation-12" height="55vh">
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
							<v-text-field
								outlined
								label="Login"
								name="login"
								prepend-icon="fas fa-user"
								type="text"
								v-model="username"
								required
								:counter="10"
								:disabled="disable"
								@keydown.enter="doLogin"
							></v-text-field>

							<v-text-field
								outlined
								id="password"
								label="Password"
								name="password"
								prepend-icon="fas fa-user-lock"
								type="password"
								required
								v-model="password"
								:disabled="disable"
								@keydown.enter="doLogin"
							></v-text-field>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" @click.prevent="doLogin" :loading="submitBtnLoading" block depressed >
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
	import { mapState } from 'vuex'

	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				password: '',
				source: '',
				submitBtnLoading: false,
				disable: false
			}
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			async doLogin() {
				this.disable = true

				if (this.username === '' || this.password === '') {
					this.disable = false
					return swal({
						title: 'Error !',
						icon: 'error',
						text: 'Tên Đăng Nhập / Mật Khẩu Không Được Trống !',
					})
				}

				this.submitBtnLoading = true

				let param = {
					username: this.username,
					password: this.password,
				}

				try {
					let res = await axios.post('https://kma.api.dhpgo.com/.netlify/functions/get-user-info', param)

					// console.log(res.data)

					let data = res.data

					if (data.code === 'ERROR') {
						if (data.message.name == 'TransformError') {
							this.disable = false
							this.submitBtnLoading = false
							return swal({
								title: 'Error !',
								icon: 'error',
								text: `Sai Tài Khoản Hoặc Mật Khẩu ! ${data.message.message}`,
							})
						} else {
							this.disable = false
							this.submitBtnLoading = false
							return swal({
								title: 'Response Error !',
								icon: 'error',
								text: 'Server Error ! Please Wait !',
							})
						}

						
					} else if (data.code === 'SUCCESS') {
						// console.log(data.data)

						this.$store.commit('user/SET_USER', data.data)

						swal({
							title: 'Login Success !',
							icon: 'success',
							text: `Chào ${data.data.studentInfo.displayName} (${data.data.studentInfo.studentCode}) !`,
						})

						this.$router.replace({ name: 'Dashboard' })
					}
				} catch (err) {
					this.disable = false
					swal({
						title: 'Error !',
						icon: 'error',
						text: 'Server Error ! Please Wait !',
					})

					console.log('ERROR: ', err)
				}

				this.submitBtnLoading = false
			},
		},
		mounted() {
			if (this.user.isLogined) {
				this.$router.push({ name: 'Dashboard' })
			}

			document.title = "Đăng Nhập | KMA Schedule"
		},
	}
</script>

<style lang="scss">
	.swal-modal {
		font-family: Helvetica;
	}
</style>
