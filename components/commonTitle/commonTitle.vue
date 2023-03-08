<template>
	<view>
		<uni-nav-bar background-color="#5d6b9a" color="#ffffff" left-text="返回" shadow="true" leftIcon="back"
			height="70px" @clickLeft="back" :title='title'>
		</uni-nav-bar>
	</view>
</template>

<script>
	import {
		getSongList
	} from '../../common/api.js'
	export default {
		name: 'commonTitle',
		data() {
			return {
				back() {
					uni.navigateBack()
				}
			}
		},
		methods: {
		},
		props: {
			title: {
				type: String,
				default: '仿网易云音乐'
			},
		},
	}
</script>

<style>
	.title {
		position: relative;
		top: 2.2em;
		/* left: 50%; */
	}
</style>
