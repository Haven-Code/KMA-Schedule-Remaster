<!-- @format -->

<template>
	<div class="appBar">
		<v-app-bar app clipped-left color="amber" dark>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<span class="title ml-3 mr-5">
				KMA&nbsp;
				<span class="font-weight-light">Schedule</span>
			</span>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
			<v-list dense class="grey lighten-4">
				<v-list-item link>
					<v-list-item-action>
						<v-icon>mdi_glass</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title class="grey--text">
							ABC
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
	export default {
        name: 'AppBar'
    }
</script>

<style></style>
