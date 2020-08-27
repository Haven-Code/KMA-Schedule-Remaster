<!-- @format -->

<template>
	<v-row justify="center">
		<v-dialog v-model="show" max-width="100vh">
			<v-card>
				<v-card-title class="headline">Cài Đặt App !</v-card-title>

				<v-card-text>
					<p class="text-h6 black--text text-center">Nền Tảng Tương Thích</p>

					<v-container fluid>
						<v-row>
							<v-col cols="12">
								<v-row justify="space-around" align="center">
									<i class="fab fa-apple fa-3x"></i>
									<i class="fab fa-android fa-3x"></i>
									<i class="fab fa-windows fa-3x"></i>
									<i class="fab fa-chrome fa-3x"></i>
								</v-row>
							</v-col>
						</v-row>
					</v-container>

					<center>
						<v-btn large dark color="primary" elevation="0" class="mt-4" @click.prevent.stop="install">
							<v-icon class="mr-2">fas fa-plus-circle</v-icon>
							Cài Đặt Ngay
						</v-btn>
					</center>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="show = false">Đóng</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	import swal from 'sweetalert'
	export default {
		name: 'InstallApp',
		props: {
			value: Boolean,
		},
		data() {
			return {
				deferredPrompt: null,
			}
		},
		computed: {
			show: {
				get() {
					return this.value
				},
				set(value) {
					this.$emit('input', value)
				},
			},
		},
		methods: {
			install() {
				this.deferredPrompt.prompt()

				this.deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted the install prompt')
					} else {
						console.log('User dismissed the install prompt')
						swal({
							title: 'Oh :(',
							icon: 'error',
							text: 'Bạn Có Thể Thử Lại Sau !',
						})
					}
				})
			},
		},
		created() {
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault()
				this.deferredPrompt = e
			})
			window.addEventListener('appinstalled', () => {
				console.log('App install success !')
				this.show = false
				this.deferredPrompt = null
			})
		},
	}
</script>

<style></style>
