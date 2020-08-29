<!-- @format -->

<template>
	<v-container class="fill-height nf amber lighten-4" fluid>
		<v-row>
			<v-col cols="12">
				<v-row justify="center" align="center">
					<div class="logoHeader mx-3 mt-5" @click.stop="returnHome">
						<v-img src="../assets/logo.png" class="logoImg mr-2"></v-img>
						<p class="text-h2 logoText"><strong>KMA</strong> Schedule</p>
					</div>
				</v-row>

				<v-row justify="center" align="center" class="mt-3">
					<p class="text-h3">404 - Không Tìm Thấy Nội Dung</p>
				</v-row>

				<v-row justify="center" align="center" class="mt-3">
					<v-btn color="primary" large :to="{ name: 'LD' }"><v-icon class="mr-2">fas fa-home</v-icon>Về Trang Chủ</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: '404',
	}
</script>

<style lang="scss" scoped>
	.logoHeader {
		display: flex;
		justify-content: center;
		align-items: center;

		.logoImg {
			width: 12vh;
			height: auto;
			display: inline-block;
		}

		.logoText {
			display: inline-block;
		}
	}
</style>
