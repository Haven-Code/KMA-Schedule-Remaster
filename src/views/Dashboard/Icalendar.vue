<!-- @format -->

<template>
	<v-container fluid class="fill-height iCalendar amber lighten-4 text-center">
		<v-row align="center" justify="center">
			<v-col cols="12" md="9" sm="7">
				<v-card min-height="65vh">
					<v-card-title>Chuyển Đổi Sang File Icalendar (.ics)</v-card-title>

					<div class="content text-center pb-5">
						<v-btn large color="primary" @click.prevent="convertICS()" :loading="btnLoading">
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

							<v-btn large color="primary" class="mt-1 downloadBtn" v-if="step.downloadBtn" @click.prevent="downloadFile">
								<v-icon class="mr-2">fas fa-save</v-icon>
								Tải Xuống
							</v-btn>
						</div>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	/* eslint-disable */
	import { mapState } from 'vuex'
	import moment from 'moment'
	import { createEvents } from 'ics'

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
				events: [],
				fileValue: null,
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
							start: '7:01',
							end: '9:25',
						}
						break
					case '4,5,6':
						time = {
							start: '9:35',
							end: '11:59',
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
							start: '18:01',
							end: '21:15',
						}
						break
					case '7,8,9,10':
						time = {
							start: '12:30',
							end: '15:50',
						}
						break
					default:
						time = {
							start: '',
							end: '',
						}
				}
				return time
			},
			convertICS() {
				this.btnLoading = true
				this.step.show = true
				this.step.step1.message = this.text.ok
				this.step.step2.show = true
				this.step.step2.message = this.text.loading

				this.user.userSchedule.forEach((ch, index) => {
					let title = ch.subjectName
					let des = `Tiết ${ch.lesson} \n Lớp: ${ch.className} \n Giáo Viên: ${ch.teacher}`
					let location = ch.room
					let lessonTime = this.convertLessonsToTime(ch.lesson)
					let tmStart = moment(lessonTime.start, 'hh:mm')
					let tmEnd = moment(lessonTime.end, 'hh:mm')
					let date = moment(ch.day, 'DD/MM/YYYY')

					this.events.push({
						productId: 'KMASchedulePoweredByDHP',
						uid: index+1 + '@kma.dhpgo.com',
						title: title,
						description: des,
						location: location,
						start: [date.format('YYYY'), date.format('MM'), date.format('DD'), tmStart.format('hh'), tmStart.format('mm')],
						end: [date.format('YYYY'), date.format('MM'), date.format('DD'), tmEnd.format('hh'), tmEnd.format('mm')],
					})
				})

				const { error, value } = createEvents(this.events)

				if (error) {
					console.log('ERROR: ', error)
					this.step.step2.message = this.text.fail
				} else {
					this.fileValue = value
				}

				this.step.step2.message = this.text.ok
				this.step.step3.show = true
				this.step.step3.message = this.text.ok
				this.step.downloadBtn = true
				this.btnLoading = false
			},
			downloadFile() {
				// console.log(this.$ics.calendar())
				var element = document.createElement('a')
				element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(this.fileValue))
				element.setAttribute('download', this.user.userData.displayName + '-' + this.user.userData.studentCode)

				element.style.display = 'none'
				document.body.appendChild(element)

				element.click()

				document.body.removeChild(element)
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
