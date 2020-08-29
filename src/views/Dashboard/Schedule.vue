<!-- @format -->

<template>
	<v-row class="fill-height scheduleView">
		<v-col>
			<v-overlay absolute :value="overlay" opacity="0.8">
				<Spinner />
			</v-overlay>

			<v-sheet height="8.5vh">
				<v-toolbar flat color="white">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" color="grey darken-2" @click="setToday" v-bind="attrs" v-on="on">
								Về Hôm Nay
							</v-btn>
						</template>
						<span>Về Trang Có Ngày Hôm Nay</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab text small color="grey darken-2" @click="prev" v-bind="attrs" v-on="on">
								<v-icon small>mdi-chevron-left</v-icon>
							</v-btn>
						</template>
						<span>Trang Trước</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab text small color="grey darken-2" @click="next" v-bind="attrs" v-on="on">
								<v-icon small>mdi-chevron-right</v-icon>
							</v-btn>
						</template>
						<span>Trang Sau</span>
					</v-tooltip>

					<v-toolbar-title v-if="$refs.calendar">
						{{ translateMonth($refs.calendar.title) }}
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<!-- <v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" color="grey darken-2" v-bind="attrs" v-on="on">
								Đồng Bộ Lại
							</v-btn>
						</template>
						<span>Comming Soon</span>
					</v-tooltip> -->

					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
								<span>{{ calendar.typeToLabel[calendar.type] }}</span>
								<v-icon right>mdi-menu-down</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="calendar.type = 'day'">
								<v-list-item-title>Ngày</v-list-item-title>
							</v-list-item>
							<v-list-item @click="calendar.type = 'week'">
								<v-list-item-title>Tuần</v-list-item-title>
							</v-list-item>
							<v-list-item @click="calendar.type = 'month'">
								<v-list-item-title>Tháng</v-list-item-title>
							</v-list-item>
							<v-list-item @click="calendar.type = '4day'">
								<v-list-item-title>4 ngày</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-sheet>

			<v-sheet height="80vh" class="fill-height">
				<v-calendar
					ref="calendar"
					v-model="focusCalendar"
					:type="calendar.type"
					:event-overlap-mode="calendar.mode"
					:event-overlap-threshold="30"
					:short-months="false"
					:short-weekdays="false"
					color="amber"
					:event-color="getEventColor"
					:events="calendar.events"
					:weekdays="calendar.weekdays"
					@click:event="showEvent"
					@click:more="viewDay"
					@click:date="viewDay"
				></v-calendar>

				<v-menu
					v-model="calendarEventDetail.selectedOpen"
					:close-on-content-click="false"
					:activator="calendarEventDetail.selectedElement"
					offset-x
				>
					<v-card color="grey lighten-5" min-width="30vh" flat style="opacity: 0.95">
						<v-toolbar :color="calendarEventDetail.selectedEvent.color" dark>
							<v-toolbar-title v-html="calendarEventDetail.selectedEvent.name"></v-toolbar-title>

							<v-spacer></v-spacer>

							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on">
										<v-icon>far fa-calendar-plus</v-icon>
									</v-btn>
								</template>
								<span>Thêm Ghi Chú</span>
							</v-tooltip>
						</v-toolbar>

						<v-card-text>
							<p class="text-body-1" v-html="calendarEventDetail.selectedEvent.details"></p>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text color="secondary" @click="calendarEventDetail.selectedOpen = false">
								Huỷ Bỏ
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
	/* eslint-disable */
	import { mapState } from 'vuex'
	import moment from 'moment'
	import Spinner from '../../components/Spinner'

	export default {
		name: 'Schedule',
		components: {
			Spinner,
		},
		data() {
			return {
				focusCalendar: '',
				calendar: {
					type: 'month',
					mode: 'stack',
					modes: ['stack', 'column'],
					events: [],
					weekdays: [1, 2, 3, 4, 5, 6, 0],
					typeToLabel: {
						month: 'Tháng',
						week: 'Tuần',
						day: 'Ngày',
						'4day': '4 Ngày',
					},
				},
				calendarEventDetail: {
					selectedOpen: false,
					selectedEvent: {},
					selectedElement: null,
				},
				colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'pink lighten-1', 'red darken-1'],
				overlay: false,
			}
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			viewDay({ date }) {
				this.focusCalendar = date
				this.calendar.type = 'day'
			},
			prev() {
				this.$refs.calendar.prev()
			},
			next() {
				this.$refs.calendar.next()
			},
			setToday() {
				this.focusCalendar = ''
			},
			getEventColor(event) {
				return event.color
			},
			getEvents() {
				const events = []

				this.user.userSchedule.forEach((e) => {
					let lessionTime = this.convertLessonsToTime(e.lesson)
					let startTime = moment(e.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + lessionTime.start
					let endTime = moment(e.day, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + lessionTime.end
					let color = Math.floor(Math.random() * this.colors.length)
					let detail = `Môn: <strong>${e.subjectName} (${e.subjectCode})</strong> <br> Lớp: <strong>${e.className}</strong> <br> Tiết: <strong>${e.lesson}</strong> <br> Phòng Học: <strong>${e.room}</strong> <br> Giáo Viên: <strong>${e.teacher}</strong>`

					events.push({
						name: e.subjectName,
						start: startTime,
						end: endTime,
						color: this.colors[color],
						details: detail,
					})
				})

				this.calendar.events = events
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
			showEvent({ nativeEvent, event }) {
				const open = () => {
					this.calendarEventDetail.selectedEvent = event
					this.calendarEventDetail.selectedElement = nativeEvent.target
					setTimeout(() => (this.calendarEventDetail.selectedOpen = true), 10)
				}

				if (this.calendarEventDetail.selectedOpen) {
					this.calendarEventDetail.selectedOpen = false
					setTimeout(open, 10)
				} else {
					open()
				}

				nativeEvent.stopPropagation()
			},
			translateMonth(str) {
				let a = str.split(' ')
				const dic = {
					January: 'Tháng Một',
					February: 'Tháng Hai',
					March: 'Tháng Ba',
					April: 'Thánng Bốn',
					May: 'Tháng Năm',
					June: 'Tháng Sáu',
					July: 'Tháng Bảy',
					August: 'Tháng Tám',
					September: 'Tháng Chín',
					October: 'Tháng Mười',
					November: 'Tháng Mười Một',
					December: 'Tháng Mười Hai',
				}

				let text = dic[a[0]] + ' ' + a[1]
				return text
			},
		},
		mounted() {
			this.overlay = true
			this.getEvents()
			setTimeout(() => {
				this.overlay = false
			}, 500)

			document.title = 'Thời Khoá Biểu'
		},
	}
</script>

<style>
	.scheduleView {
		overflow: hidden;
	}
</style>
