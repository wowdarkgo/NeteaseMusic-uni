<template>
	<view>
		<commonTitle :title='"搜索页 - " + this.searchValue'></commonTitle>
		<uni-search-bar @confirm="search(searchValue)" :focus="true" v-model="searchValue" @cancel="cancel"
			@change="change" placeholder="输入歌曲/歌手名进行搜索" cancelButton="none" class="search-bar">
		</uni-search-bar>
		<block v-if="!isSearch">
			<view class="history">
				<view class="history-head">
					<text>历史记录</text>
					<van-icon @tap="clear()" name="delete-o" size="20px"
						style="position: absolute;right: 10px;vertical-align: middle" />
				</view>
				<view style="display: flex;">
					<view v-for="item in history" class="history-item" :value='item' @tap="historyValue(item)">
						<van-tag color="#f7f7f7" text-color="#333333" round size="large">{{item}}</van-tag>
					</view>
				</view>
			</view>
			<view class="hotSearch">
				<text>热搜榜</text>
				<view v-for="(item,index) in hotList" :key="item.id" class="hotSearch-item"
					@tap="hotValue(item.searchWord)">
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
		</block>
		<block v-if="isSearch">
			<view>
				<view v-for="(item,index) in songList" :key="item.id" class="musicList" @click="ToDetail($event)"
					:id="item.id">
					<van-icon name="play-circle-o" style="font-size: 30px; position: absolute; right: 10px;" />
					<view class="index">
						{{index+1}}
					</view>
					<text>{{ item.name}}</text>
					<img v-if="item.fee===1" src="../../static/VIPlogo.png" alt="" class="Logo">
					<view class="author">
						{{item.artists[0].name}}
					</view>
				</view>
			</view>
		</block>
		<commonTabbar class="Tabbar"></commonTabbar>
	</view>
</template>

<script>
	import {
		getHotSearch,
		getSearchResult
	} from '../../common/api.js'
	export default {
		data() {
			return {
				isSearch: false,
				searchValue: '',
				hotList: [],
				history: [],
				songList: [],
			}
		},
		methods: {
			search(text) {
				this.history.unshift(text);
				this.history = [...new Set(this.history)] //防止重复
				uni.setStorage({
						key: 'history',
						data: this.history
					}),
					this.isSearch = true;
				getSearchResult(text).then(res => {
					this.songList = [...res.data.result.songs]
				})
			},
			clear() {
				this.history = [],
					uni.removeStorage({
						key: 'history'
					})
			},
			historyValue(value) {
				this.searchValue = value;
			},
			hotValue(value) {
				this.searchValue = value;
			},
			ToDetail(e) {
				uni.navigateTo({
					url: `/pages/detail/detail?songid=${e.target.id}`
				})
			}
			},
		onLoad() {
			this.isSearch = false;
			uni.getStorage({
				key: 'history',
				success: res => {
					this.history = res.data
				}
			})
			getHotSearch().then(res => {
				this.hotList = [...res.data.data]
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

	.musicList {
		font-size: 14px;
		color: #666666;
		padding-top: 1em;
		margin-left: 30px;
		box-shadow: 0 7px 5px -5px rgba(240, 240, 240, .7);
		text-overflow: ellipsis;
		overflow: hidden !important;
		width: 800rpx;
		white-space: nowrap;
	}

	.index {
		font-size: 18px;
		float: left;
		margin-right: 20px;
		text-align: center;
		width: 24px;
	}

	.Logo {
		width: 20px;
		padding-left: 5px;
	}

	.author {
		font-size: 12px;
	}
</style>
