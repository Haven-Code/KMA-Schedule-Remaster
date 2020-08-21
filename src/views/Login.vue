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
							<v-text-field outlined label="Login" name="login" prepend-icon="fas fa-user" type="text" v-model="username"></v-text-field>

							<v-text-field outlined id="password" label="Password" name="password" prepend-icon="fas fa-user-lock" type="password" v-model="password"></v-text-field>
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
    
    import md5 from 'blueimp-md5'
    import axios from 'axios'

	export default {
		name: 'Login',
		data() {
			return {
				username: '',
                password: '',
                source: ''
			}
		},
		methods: {
			doLogin() {
                const loginUrl = process.env.VUE_APP_API_LOGIN_URL

				const param = {
					method: 'POST',
					url: loginUrl,
					timeout: 20000,
					headers: {
						Connection: 'keep-alive',
						'Cache-Control': 'max-age=0',
						Origin: loginUrl,
						'Upgrade-Insecure-Requests': '1',
						'Content-Type': 'application/x-www-form-urlencoded',
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.18 Safari/537.36 Edg/75.0.139.4',
						Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
						Referer: loginUrl,
						'Accept-Encoding': 'gzip, deflate',
						'Accept-Language': 'en-US,en;q=0.9',
					},
					data: {
						txtUserName: this.username,
						txtPassword: md5(this.password),
						btnSubmit: 'Đăng Nhập',
						__EVENTTARGET: '',
					},
				}

				axios(param).then((res) => {
					console.log(res)
				})
			},
		},
	}
</script>

<style lang="scss" scoped></style>
