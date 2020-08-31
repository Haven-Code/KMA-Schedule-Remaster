<!-- @format -->

<template>
	<v-main>
		<v-toolbar class="white">
			<v-toolbar-title class="mx-0">KMA Schedule</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<!--<v-btn flat>Blog</v-btn>-->
				<v-btn text :to="{ name: 'ToS' }">Term Of Service</v-btn>
				<v-btn text :to="{ name: 'PP' }">Privacy Policy</v-btn>
				<v-btn text class="pink lighten-3 white--text">Sign In</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<v-main>
			<section>
				<v-parallax src="/assets/bg.png" height="600">
					<v-layout column align-center justify-center class="white--text">
						<!-- <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">
							The social network for epic content
						</h1>

						<div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">
							Unlesh your creativity without limitations
						</div> -->

						<center>
							<div class="content">
								<v-img src="../assets/logo.png" class="logo" aspect-ratio="1"></v-img>

								<p class="text-h5 text-sm-h4 text-md-h2 text-lg-h1 mt-2 display-1 black--text">
									&lt;
									<strong>KMA&nbsp;</strong>
									Schedule /&gt;
									<span class="flicker">_</span>
								</p>
							</div>
						</center>

						<v-btn class="blue lighten-2 mt-5" dark large :to="{ name: 'Login' }">
							<v-icon left>fas fa-user</v-icon>
							Login With Actvn !
						</v-btn>
					</v-layout>
				</v-parallax>
			</section>

			<section>
				<v-layout column wrap class="my-5" align-center>
					<v-flex xs12 sm4 class="my-3">
						<div class="text-center">
							<h2 class="headline">Easy with 3 step !</h2>
							<span class="subheading">
								Fast and Flexible !
							</span>
						</div>
					</v-flex>
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap align-center>
								<v-flex xs12 md4>
									<v-card class="elevation-0 transparent">
										<v-card-text class="text-center text-h5">
											Step 1
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline text-xs-center">Login with ACTVN</div>
										</v-card-title>
										<v-card-text>
											Login with your ACTVN account to access many features hidden. We promise not save your password. All your
											data will be get one time and only save on Local Storage.
										</v-card-text>
									</v-card>
								</v-flex>
								<v-flex xs12 md4>
									<v-card class="elevation-0 transparent">
										<v-card-text class="text-center text-h5">
											Step 2
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline text-xs-center">Login With Google</div>
										</v-card-title>
										<v-card-text>
											Just navigate to to Sync tab on left menu. And click "Link with google" then follow the step on screen. We
											will ask you to provide Calendar (readwrite) scope only. So don't worry bro !
										</v-card-text>
									</v-card>
								</v-flex>
								<v-flex xs12 md4>
									<v-card class="elevation-0 transparent">
										<v-card-text class="text-center text-h5">
											Step 4
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline text-xs-center">Let's Sync</div>
										</v-card-title>
										<v-card-text>
											Just press "Sync" button and take a cup of coffee. It take you about 2 minutes to complete. And done !
											Every thing was sync with google calendar !
										</v-card-text>
									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<section>
				<v-parallax :src="imageLink.main" height="380">
					<v-layout column align-center justify-center>
						<div class="headline white--text mb-3 text-xs-center">
							That easy right ?
						</div>
						<em>Login and start now !</em>
						<v-btn class="blue lighten-2 mt-5" dark large :to="{ name: 'Login' }">
							<v-icon left>fas fa-user</v-icon>
							Login With ACTVN
						</v-btn>
					</v-layout>
				</v-parallax>
			</section>

			<section>
				<v-container grid-list-md>
					<v-layout row wrap>
						<v-flex xs12 text-xs-center class="mt-5">
							<div class="headline">FAQ !</div>
							<br />
							<div>
								Here we will answer your question.
							</div>
						</v-flex>
						<v-flex xs8 offset-xs2>
							<v-card class="elevation-0 transparent">
								<v-card-text>
									<v-flex xs12>
										Q: What google scopes will request ?
										<br />
										A: Only calendar.readwrite, user, email and openid
									</v-flex>

									<v-flex xs12>
										Q: What data will app storage ?
										<br />
										A: Just schedule data. Your login data like username and password will never save.
									</v-flex>

									<v-flex xs12>
										Q: Do your app save google access token ?
										<br />
										A: No. link with google will only work one time ! After finish sync. It will auto unlink
									</v-flex>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</section>

			<!-- <section>
				<v-parallax :src="imageLink.social_cover" height="380">
					<v-layout column align-center justify-center>
						<div class="headline white--text mb-3 text-xs-center">We are dropping cool news and opportunities on socials</div>
					</v-layout>
					<v-layout justify-space-around justify-center>
						<v-icon x-large dark>fab fa-facebook-f</v-icon>

						<v-icon x-large dark>fab fa-twitter</v-icon>

						<v-icon x-large dark>fab fa-reddit-alien</v-icon>

						<v-icon x-large dark>fab fa-instagram</v-icon>

						<v-icon x-large dark>fab fa-discord</v-icon>
					</v-layout>
				</v-parallax>
			</section>

			<section>
				<v-container grid-list-xl>
					<v-layout row wrap justify-center class="my-5">
						<v-flex xs12 sm4>
							<v-card class="elevation-0 transparent">
								<v-card-title primary-title class="layout justify-center">
									<div class="headline">Company info</div>
								</v-card-title>
								<v-card-text>
									We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series.
								</v-card-text>
							</v-card>
						</v-flex>
						<v-flex xs12 sm4 offset-sm1>
							<v-card class="elevation-0 transparent">
								<v-card-title primary-title class="layout justify-center">
									<div class="headline">We are hiring</div>
								</v-card-title>
								<v-card-text>
									Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</section> -->

			<v-footer class="text-center font-weight-medium white mt-5">
				<v-col class="text-center" cols="12">
					Copyright &copy; {{ new Date().getFullYear() }} —
					<strong><a href="https://havencode.net" target="_blank">Haven Code</a></strong>
					- Powered By
					<a href="https://danghoangphuc.com" target="_blank">Phuc Dang</a>
					<br />
					<router-link :to="{ name: 'ToS' }">Term of Service</router-link>
					|
					<router-link :to="{ name: 'PP' }">Privacy Policy</router-link>
				</v-col>
			</v-footer>
		</v-main>
	</v-main>
</template>

<script>
	export default {
		name: 'LD',
		data() {
			return {
				imageLink: {
					main:
						'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea',
				},
			}
		},
		methods: {},
		computed: {
			imgHeight: function() {
				var offset = 320
				console.log('new image height is ' + (this.pageHeight - offset))
				return this.pageHeight - offset
			},
		},
	}
</script>

<style scoped>
	.finedTitle {
		font-weight: 900;
		text-shadow: 2px 2px #000000;
	}

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
