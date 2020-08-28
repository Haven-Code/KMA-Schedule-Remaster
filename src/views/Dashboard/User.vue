<!-- @format -->

<template>
	<v-container fluid class="fill-height user amber lighten-4 text-center">
		<v-row align="center" justify="center">
			<v-col cols="12" md="10" sm="8">
				<v-card min-height="65vh">
					<v-card-title>Thông Tin Sinh Viên</v-card-title>

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
										></v-data-table>
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
		name: 'User',
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
				items: [],
			}
		},
		created() {
			this.items.push({
				name: 'Họ Và Tên:',
				value: this.user.userData.displayName,
            })
            
            this.items.push({
				name: 'Mã SV:',
				value: this.user.userData.studentCode,
            })
            
            this.items.push({
				name: 'Giới Tính:',
				value: this.user.userData.gender,
            })
            
            this.items.push({
				name: 'Ngày Sinh:',
				value: this.user.userData.birthday,
			})
		},
	}
</script>

<style lang="scss" scoped>
	.user {
		height: 91.5vh;
	}

	.table {
		border-collapse: separate;
		border-spacing: 0vh 0vh;
		text-align: justify;
        width: 60vh;
	}
</style>
