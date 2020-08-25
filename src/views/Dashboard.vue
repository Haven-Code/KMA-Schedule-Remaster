<!-- @format -->

<template>
	<div class="home">
		<NavBar />
		<router-view></router-view>
	</div>
</template>

<script>
	import NavBar from "../components/AppBar"

	export default {
		name: 'Home',
		components: {
			NavBar
		},
	}
</script>
