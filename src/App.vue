<!-- @format -->

<template>
	<v-app>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		components: {},
	}
</script>

<style>
	body {
		overscroll-behavior-y: contain;
	}
</style>
