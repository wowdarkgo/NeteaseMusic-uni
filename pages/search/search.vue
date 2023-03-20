<template>
	<view>
		<commonTitle :title='"搜索页"'></commonTitle>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
			@cancel="cancel" @change="change" @clear="clear" placeholder="输入歌曲名搜索" cancelButton="none"
			class="search-bar"></uni-search-bar>
		<view class="history">
			<view class="history-head">
				<text>历史记录</text>
				<van-icon name="delete-o" size="20px" style="position: absolute;right: 10px;vertical-align: middle" />
			</view>
			<view class="history-item">
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
				<van-tag color="#f7f7f7" text-color="#333333" round size="large">One Last Kiss</van-tag>
			</view>
		</view>
		<view class="hotSearch">
			<text>热搜榜</text>
			<view v-for="(item,index) in hotList" :key="item.id" class="hotSearch-item">
				<view class="songIndex">
					{{index+1}}
				</view>
				<text :style="{color:(item.iconType==1 ? '#ff3a3a' : '')}">{{ item.searchWord}}</text>
				<img src="../../static/HOTlogo.png" v-if="item.iconType==1" style="margin-left: 10px;width: 1.5em;">
				<text style="position: absolute;right: 10px;font-size: 12px;color: #999999;">{{item.score}}</text>
				<view class="content">
					{{item.content}}
				</view>
			</view>
		</view>
		<commonTabbar class="Tabbar"></commonTabbar>
	</view>
</template>

<script>
	import {
		getHotSearch
	} from '../../common/api.js'
	export default {
		data() {
			return {
				hotList: []
			}
		},
		methods: {

		},
		onLoad() {
			getHotSearch().then(res => {
				this.hotList = [...res.data.data]
				console.log(this.hotList)
			})
		}
	}
</script>

<style>
	.search-bar {
		margin-top: 10px;
	}

	.history {
		margin-top: 10px;
		color: #666666;
	}

	.history-head {
		font-size: 20px;
		margin-left: 15px;
		margin-bottom: 10px;
		line-height: 20px;
	}

	.history-item {
		margin-left: 15px;
	}

	.hotSearch {
		margin-top: 20px;
		font-size: 20px;
		margin-left: 15px;
		color: #666666;
	}

	.hotSearch-item {
		margin-top: 15px;
		margin-left: 10px;
		margin-bottom: 10px;
		font-size: 14px;
		height: 2.5em;
	}

	.songIndex {
		float: left;
		margin-right: 20px;
		width: 24px;
		font-size: 18px;
		text-align: center;
	}

	.content {
		font-size: 12px;
		color: #999999;
	}
</style>
