<!-- @format -->

<template>
	<v-container class="fill-height amber lighten-4 about" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10" md="8">
				<v-card color="amber lighten-3" class="grey--text ">
					<v-card-title class="white--text">Về Ứng Dụng</v-card-title>

					<v-card-text>
						<v-data-table
							v-model="selected"
							:headers="headers"
							:items="items"
							item-key="name"
							class="elevation-1 text-center"
							hide-default-header
							hide-default-footer
						>
							<template v-slot:[`item.value`]="{ item }">
								<span v-html="item.value"></span>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'About',
		data() {
			return {
				selected: null,
				headers: [
					{
						align: 'start',
						sortable: false,
						value: 'name',
					},
					{
						sortable: false,
						value: 'value',
					},
				],
				items: [
					{
						name: 'Tên Ứng Dụng',
						value: 'KMA Schedule',
					},
					{
						name: 'Phiên Bản',
						value: '1.0.0',
					},
					{
						name: 'Viết Bởi',
						value:
							'<a href="https://danghoangphuc.com" target="_blank">Đặng Hoàng Phúc (AT16)</a> [<a href="https://havencode.net" target="_blank">Haven Code</a>]',
					},
					{
						name: 'Năm Phát Hành',
						value: '2020',
					},
					{
						name: 'Framework',
						value: 'Vue.js 2 with VueX & Vue-Router',
					},
					{
						name: 'Source Code',
						value: '<a href="https://github.com/Haven-Code/KMA-Schedule-Remaster" target="_blank">Github</a>',
					},
					{
						name: 'Server',
						value: 'Netlify - Netlify Functions - Firebase',
					},
					{
						name: 'Tương Thích',
						value: '<strong>Bất kỳ HĐH sử dụng Chrome 80 trở lên. Riêng IOS chạy tốt nhất từ IOS 11.3 trở lên !</strong>',
					},
					{
						name: 'Term Of Service',
						value: `<a href="/termofservice" target="_blank">Tos</a>`,
					},
					{
						name: 'Privacy Police',
						value: '<a href="/privacypolicy" target="_blank">Privacy Policy</a>',
					},
				],
			}
		},
	}
</script>

<style lang="scss" scoped>
	.about {
		height: 91.5vh;
	}
</style>
