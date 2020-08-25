<!-- @format -->

<template>
	<div class="appBar">
		<v-app-bar app clipped-left color="amber" dark elevation="3">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<span class="title ml-3 mr-5">
				KMA&nbsp;
				<span class="font-weight-light">Schedule</span>
			</span>

			<v-spacer></v-spacer>

			<p class="text-h6 mt-4 font-weight-light text--white">{{ user.userData.displayName }} ({{ user.userData.studentCode }})</p>

		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
			<v-list dense class="grey lighten-4">
				<v-list-item link>
					<v-list-item-action>
						<v-icon>far fa-calendar-alt</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title class="grey--text">
							Thời Khoá Biểu
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'AppBar',
		computed: {
			...mapState(['user']),
		},
		data() {
			return {
				drawer: true,
			}
		},
	}
</script>

<style></style>
