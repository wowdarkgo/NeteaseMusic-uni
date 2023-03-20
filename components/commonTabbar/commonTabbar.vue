<template>
	<view>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" @tap="toIndex()">首页</van-tabbar-item>
			<van-tabbar-item icon="search" dot>搜索</van-tabbar-item>
			<van-tabbar-item icon="service-o" @tap="toList()" dot >精品歌单</van-tabbar-item>
			<van-tabbar-item icon="friends-o"> 个人中心</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script>
	export default {
		name: "commonTabbar",
		data() {
			return {
				active: 0,
				listId: [520767140, 2078182964, 486138039, 454384988, 454421366, 402439190]
			};
		},
		methods: {
			toIndex() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toList() {
				uni.navigateTo({
					url: `/pages/list/list?listid=${this.listId[Math.round(Math.random()*5)]}`
				})
			}
		}
	}
</script>

<style>

</style>
