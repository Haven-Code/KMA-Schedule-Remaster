<!-- @format -->

<template>
	<v-container fluid class="fill-height syncForm amber lighten-4 text-center">
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="10">
				<v-card min-height="56vh">
					<v-card-title>Đồng Bộ Hoá Với Google Lịch / Microsoft Lịch</v-card-title>

					<v-row>
						<v-col cols="6">
							<v-btn v-if="!authorized" color="red" dark @click.stop="handleAuthClick">
								Đăng Nhập Với Google
							</v-btn>
							<v-btn v-if="authorized" color="red" dark @click.stop="handleSignoutClick" :loading="google.loadingBtn">
								Ngắt Kết Nối Google
							</v-btn>
							<br />
							<v-btn v-if="authorized" color="primary" class="mt-2" @click="importData" :loading="google.loadingBtn">
								Nhập Dữ Liệu
							</v-btn>
						</v-col>

						<v-col cols="6">
							ABC
						</v-col>
					</v-row>

					<div class="console grey lighten-2 mt-5 ma-2 px-2 pt-1 white--text text-left text-body-2" v-html="console"></div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	/* eslint-disable */

	import { mapState } from 'vuex'
	import swal from 'sweetalert'
	import moment from 'moment'

	const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
	const SCOPES =
		'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.calendars https://www.googleapis.com/auth/calendar.calendarlist https://www.googleapis.com/auth/calendar.calendarlist.readonly https://www.googleapis.com/auth/calendar.readonly'

	export default {
		name: 'Sync',
		data() {
			return {
				api: undefined,
				authorized: false,
				google: {
					loadingBtn: false,
				},
				console: '<p>Chào Bạn !</p>',
			}
		},
		computed: {
			...mapState(['user']),
		},
		created() {
			this.api = gapi
			this.handleClientLoad()
		},
		methods: {
			handleClientLoad() {
				this.api.load('client:auth2', this.initClient)
			},

			initClient() {
				this.api.client
					.init({
						apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
						clientId: process.env.VUE_APP_GOOGLE_PUBLIC_KEY,
						discoveryDocs: DISCOVERY_DOCS,
						scope: SCOPES,
					})
					.then((_) => {
						// Listen for sign-in state changes.
						this.api.auth2.getAuthInstance().isSignedIn.listen(this.authorized)
					})
			},

			handleAuthClick(event) {
				this.api.auth2
					.getAuthInstance()
					.signIn()
					.then((_) => {
						this.authorized = true
						swal({
							title: 'Kết Nối Thành Công !',
							icon: 'success',
						})
					})
			},

			handleSignoutClick(event) {
				this.api.auth2
					.getAuthInstance()
					.signOut()
					.then((_) => {
						this.authorized = false
						swal({
							title: 'Ngắt Kết Nối Thành Công !',
							icon: 'success',
						})
					})
			},

			generateUniqueID() {
				return Math.floor(Math.random() * 10000)
			},

			convertLessonsToTime(lessons) {
				let time = {
					start: '',
					end: '',
				}

				switch (lessons) {
					case '1,2,3':
						time = {
							start: '7:00',
							end: '9:25',
						}
						break
					case '4,5,6':
						time = {
							start: '9:35',
							end: '12:00',
						}
						break
					case '7,8,9':
						time = {
							start: '12:30',
							end: '14:55',
						}
						break
					case '10,11,12':
						time = {
							start: '15:05',
							end: '17:30',
						}
						break
					case '13,14,15,16':
						time = {
							start: '18:00',
							end: '21:15',
						}
						break
				}
				return time
			},

			clearConsole() {
				this.console = '<p>Chào Bạn !</p>'
			},

			importData() {
				if (!this.user.userSchedule) {
					return swal({
						title: 'Error !',
						icon: 'error',
						text: 'List TKB Rỗng !',
					})
				}

				//clear console
				this.clearConsole()
				this.google.loadingBtn = true

				// Create Calendar
				let stuYear = moment().format('YYYY') + ' - ' + (moment().format('YYYY') + 1)
				let ID = this.generateUniqueID()

				this.api.client.calendar.calendars
					.insert({
						resource: {
							summary: `KMA Schedule ${stuYear} ${ID}`,
							description: `TKB Khoá Học ${stuYear} \nID: ${ID}`,
							timeZone: 'Asia/Ho_Chi_Minh',
						},
					})
					.then((res) => {
						console.log(res.result.id)
						this.console += `<p class="success--text">[GOOGLE] --> Tạo Lịch Mới Thành Công !</p>`

						const batch = this.api.client.newBatch()

						this.console += `<p class="primary--text">[GOOGLE] --> Bắt Đầu Chuẩn Bị Event !</p>`

						this.user.userSchedule.forEach((a, index) => {
							console.log('Satrt Import Insert Event: ', index)

							let start =
								moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).start + ':00.000+07:00'
							let end =
								moment(a.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' + this.convertLessonsToTime(a.lesson).end + ':00.000+07:00'

							let event = {
								summary: a.subjectName,
								location: a.room,
								description: `Tiết: ${a.lesson} \nLớp: ${a.className} \nGiáo Viên: ${a.teacher}`,
								start: {
									dateTime: start,
									timeZone: 'Asia/Ho_Chi_Minh',
								},
								end: {
									dateTime: end,
									timeZone: 'Asia/Ho_Chi_Minh',
								},
							}

							batch.add(
								this.api.client.calendar.events.insert({
									calendarId: res.result.id,
									resource: event,
								})
							)

							console.log('Finish Insert Event: ', index)
						})

						this.console += `<p class="success--text">[GOOGLE] --> Tạo Event Thành Công !</p>`

						this.console += `<p class="primary--text">[GOOGLE] --> Bắt Đầu Gửi !</p>`

						batch
							.then(() => {
								this.console += `<p class="success--text">[GOOGLE] --> Đồng Bộ Thành Công ! </p>`
								console.log('all jobs done!!!')
							})
							.catch((err) => {
								this.console += `<p class="danger--text">[GOOGLE] --> Đồng Bộ Thất Bại ! </p> <p> ${err} </p>`
								throw new Error(err)
							})
					})
					.catch((err) => {
						this.console += `<p class="danger--text">[GOOGLE] --> Tạo Lịch Lỗi !</p> <p> ${err} </p>`
						throw new Error(err)
					})

				this.google.loadingBtn = false
			},
		},
	}
</script>

<style lang="scss" scoped>
	.syncForm {
		height: 91.5vh;
	}

	.console {
		height: 30vh;
		border-radius: 10px 10px 10px 10px;
		overflow: auto;
	}
</style>

<style>
	.swal-modal {
		font-family: Helvetica;
	}
</style>
