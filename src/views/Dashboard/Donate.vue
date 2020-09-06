<!-- @format -->

<template>
	<v-container fluid class="fill-height user amber lighten-4 text-center">
		<v-row align="center" justify="center">
			<v-col cols="12" md="10" sm="8">
				<v-card min-height="65vh">
					<v-card-title>Ủng Hộ Nhà Phát Triển</v-card-title>

					<div class="content text-center pb-5">
						<v-container fluid>
							<v-row>
								<v-col cols="12">
									<v-row align="center" justify="center">
										<v-data-table
											:headers="headers"
											hide-default-header
											hide-default-footer
											:items="items"
											class="elevation-0 text-center table"
										>
											<template v-slot:[`item.value`]="{ item }">
												<span v-html="item.value"></span>
											</template>
										</v-data-table>
									</v-row>
								</v-col>
							</v-row>
						</v-container>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'Donate',
		computed: {
			...mapState(['user']),
		},
		data() {
			return {
				headers: [
					{
						value: 'name',
					},
					{
						value: 'value',
					},
				],
				items: [
					{
						name: 'Ngân Hàng MB Bank: ',
						value: '4100172376886 <br> Đặng Hoàng Phúc - Chi Nhánh Hội sở chính',
					},
					{
						name: 'Ngân Hàng Agribank:',
						value: '1401205101015 <br> Đặng Hoàng Phúc - Chi Nhánh Hà Nội 1'
					},
					{
						name: 'QR Pay',
						value: ''
					},
					{
						name: 'Ví Momo',
						value: '<a href="https://nhantien.momo.vn/Gjs532xiR34" target="_blank">https://nhantien.momo.vn/Gjs532xiR34</a>'
					},
					{
						name: 'Paypal',
						value: '<a href="https://paypal.me/phuchptty" target="_blank">https://paypal.me/phuchptty</a>'
					},
					{
						name: 'Buy me a coffee',
						value: '<a href="https://www.buymeacoffee.com/phuchptty" target="_blank">https://www.buymeacoffee.com/phuchptty</a>'
					}
				],
			}
		},
	}
</script>

<style lang="scss" scoped>
	.user {
		height: 91.5vh;
	}

</style>
