/**
* @component App
* @description ルートコンポーネント，このコンポーネントが最初に読み込まれ，他のコンポーネントは，このコンポーネント内でルーティングされる．つまり，このコンポーネント上に他のコンポーネントが重なる．
*
* @since 2024-06-10
* @author 小島佑太
* 
*/

<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'App',
	mounted() {

		const url = process.env.VUE_APP_EXPRESS_URL || 'http://localhost:3000';
		axios.get(url).then().catch(error =>{
			console.error('Error fetching data:', error);
		});
	}
	
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
