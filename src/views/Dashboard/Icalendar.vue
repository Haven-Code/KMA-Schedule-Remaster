<!-- @format -->

<template>
	<div class="iCalendar amber lighten-4">
		<v-row align="center" justify="center">
			<v-col cols="12" md="10" sm="8">
				<v-card>
					<v-card-title>Chuyển Đổi Sang File Icalendar (.ics)</v-card-title>

					<div class="content text-center pb-5">
						<v-btn x-large color="primary" @click.prevent="convertICS()" :loading="btnLoading">
							<v-icon class="mr-2">fas fa-file-download</v-icon>
							Chuyển Đổi & Tải Xuống
						</v-btn>

						<div class="step mt-4" v-if="step.show">
							<v-container fluid>
								<v-row>
									<v-col cols="12">
										<v-row align="center" justify="center">
											<table class="table">
												<tr>
													<th>Nhiệm Vụ</th>
													<th>Trạng Thái</th>
												</tr>

												<tr>
													<td>
														<v-icon class="mr-2">fas fa-download</v-icon>
														Tải Thông Tin
													</td>

													<td v-html="step.step1.message"></td>
												</tr>

												<tr v-if="step.step2.show">
													<td>
														<v-icon class="mr-2">fas fa-sync</v-icon>
														Chuyển Đổi
													</td>

													<td class="px-5 success--text" v-html="step.step2.message"></td>
												</tr>

												<tr v-if="step.step3.show">
													<td>
														<v-icon class="mr-2">fas fa-file</v-icon>
														Chuẩn Bị File
													</td>

													<td class="px-5 success--text" v-html="step.step3.message"></td>
												</tr>
											</table>
										</v-row>
									</v-col>
								</v-row>
							</v-container>

							<v-btn large color="primary" class="mt-1" v-if="step.downloadBtn" @click.prevent="downloadFile">
								<v-icon class="mr-2">fas fa-save</v-icon>
								Tải Xuống
							</v-btn>
						</div>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'

	export default {
		name: 'Icalendar',
		computed: {
			...mapState(['user']),
		},
		data() {
			return {
				text: {
					ok: '<p class="success--text"><i class="mr-2 fas fa-check-circle"></i> OK</p>',
					fail: '<p class="error--text"><i class="mr-2 fas fa-times-circle"></i> Fail</p>',
					loading: '<p class="primary--text"><i class="mr-2 fas fa-spinner fa-spin"></i> Loading...</p>',
				},
				step: {
					show: false,
					step1: {
						show: true,
						message: '',
					},
					step2: {
						show: false,
						message: '',
					},
					step3: {
						show: false,
						message: '',
					},
					downloadBtn: false,
				},
				btnLoading: false,
			}
		},
		methods: {
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
			slug(alias) {
				var str = alias
				str = str.toLowerCase()
				str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
				str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
				str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
				str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
				str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
				str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
				str = str.replace(/đ/g, 'd')
				str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
				str = str.replace(/ + /g, ' ')
				str = str.trim()
				return str
			},
			convertICS() {
				this.btnLoading = true
				this.step.show = true
				this.step.step1.message = this.text.ok

				this.$ics.removeAllEvents()

				this.step.step2.show = true
				this.step.step2.message = this.text.loading

				try {
					this.user.userSchedule.forEach((ch) => {
						let title = ch.subjectName
						let des = `Tiết ${ch.lesson} \n Lớp: ${ch.className} \n Giáo Viên: ${ch.teacher}`
						let location = ch.room
						let lessionTime = this.convertLessonsToTime(ch.lesson)
						let startTime = moment(ch.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + lessionTime.start
						let endTime = moment(ch.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + lessionTime.end

						this.$ics.addEvent('vi-vn', title, des, location, startTime, endTime)
					})
				} catch (e) {
					console.log('ERROR: ', e)
					this.step.step2.message = this.text.fail
				}

				this.step.step2.message = this.text.ok
				this.step.step3.show = true
				this.step.step3.message = this.text.ok
				this.step.downloadBtn = true
				this.btnLoading = false
			},
			downloadFile() {
				// console.log(this.$ics.calendar())
				let filename = this.slug(this.user.userData.displayName) + "-" + this.user.userData.studentCode
				this.$ics.download(filename)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.iCalendar {
		height: 91.5vh;
	}

	.table {
		border-collapse: separate;
		border-spacing: 20vh 3vh;
		text-align: justify;
	}
</style>
