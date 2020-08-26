<!-- @format -->

<template>
	<v-container class="fill-height" fluid="">
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10" md="8">
				<v-card color="amber lighten-3" class="grey--text ">
					<v-card-title>Về Ứng Dụng</v-card-title>

					<v-card-text>
						<v-data-table
							v-model="selected"
							:headers="headers"
							:items="items"
							item-key="name"
							class="elevation-1 text-center"
							hide-default-header
							hide-default-footer
						></v-data-table>
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
						value: 'Đặng Hoàng Phúc (AT16) [Haven Code]',
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
						value: 'https://github.com/Haven-Code/KMA-Schedule-Remaster',
                    },
                    {
						name: 'Server',
						value: 'Netlify - Netlify Functions - Firebase',
                    },
                    {
						name: 'Tương Thích',
						value: 'Bất kỳ HĐH sử dụng Chrome 86 trở lên. Riêng IOS chạy tốt nhất từ IOS 11.3 trở lên !',
					},
				],
			}
		},
	}
</script>

<style></style>
