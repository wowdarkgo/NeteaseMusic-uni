<template>
	<view>
		<commonTitle :title='"歌单列表  -  "+this.listName' class="commontitle"></commonTitle>
		<scroll-view scroll-y="true">
			<view>
				<view class="listContainer">
					<view class="cover">
						<img :src="this.coverUrl" class="coverImg">
						<view class="listText">
							<p class="listName">
								{{listName}}
							</p>
							<p>
								<img :src="authorUrl" class="authorImg">
								{{listAuthor}}
							</p>
							<p>{{listDescription}}</p>
						</view>
					</view>

				</view>

				<view class="List">
					<view class="listHead" @tap="ToDetail($event)" :id="firstSongId">
						<van-icon name="play-circle-o" style="vertical-align: middle;margin-right: 5px;" />
						<text style="font-size: 14px; vertical-align:middle">开始播放</text>
					</view>
					<view>
						<view v-for="(item,index) in list" :key="item.id" class="musicList" @click="ToDetail($event)"
							:id="item.id">
							<van-icon name="play-circle-o" style="font-size: 25px; position: absolute; right: 10px;" />
							<view class="songIndex">
								{{index+1}}
							</view>
							<text>{{ item.name}}</text>
							<img v-if="privileges[index].flag===1028" src="../../static/VIPlogo.png" alt=""
								class="Logo">
							<img v-if="privileges[index].maxbr>=999000" src="../../static/SQlogo.png" alt=""
								class="Logo">
							<view class="author">
								{{item.ar[0].name}}
							</view>
						</view>
					</view>
					<view class="more">
					</view>
				</view>

			</view>
		</scroll-view>

		<commonTabbar class="Tabbar"></commonTabbar>
	</view>
</template>

<script>
	import {
		getSongList,
		timestampToTime
	} from '../../common/api.js'
	export default {
		data() {
			return {
				listid: '',
				coverUrl: '',
				authorUrl: '',
				listName: '',
				listAuthor: '',
				listDescription: '',
				UpdateTime: '',
				list: [],
				firstSongId: '',
				privileges: []
			}
		},
		methods: {
			ToDetail(e) {
				uni.navigateTo({
					url: `/pages/detail/detail?songid=${e.target.id}`
				})
			}
		},

		onLoad(option) {
			this.listid = option.listid
			uni.showLoading({
				title: "拉取歌单中……",
			})
			getSongList(this.listid).then((res) => {
				this.listName = res.data.playlist.name;
								this.coverUrl = res.data.playlist.coverImgUrl;
				this.listAuthor = res.data.playlist.creator.nickname;
				this.authorUrl = res.data.playlist.creator.avatarUrl;
				this.listDescription = res.data.playlist.description;
				this.UpdateTime = timestampToTime(res.data.playlist.trackUpdateTime);
				this.list = [...res.data.playlist.tracks].slice(0, 99);
				this.firstSongId = res.data.playlist.tracks[0].id;
				this.privileges = [...res.data.privileges];
				setInterval(function() {
					uni.hideLoading()
				}, 1000)
			}).catch((err) => {
				console.log(err)
				uni.showToast({
					title: '请重新进入列表',
					icon: 'error'
				})
			})

		}
	}
</script>

<style>
	.Tabbar {
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	.listContainer {
		font-size: 10px;
		margin-top: 30px;
		color: #666666;
		text-overflow: ellipsis;
		overflow: hidden !important;
		width: 800rpx;
		white-space: nowrap;
	}

	.coverImg {
		width: 120px;
		height: 120px;
		border-radius: 10px;
		margin-left: 30px;
		margin-right: 20px;
		float: left;
	}

	.listName {
		font-size: 18px;
		color: black;
	}

	.authorImg {
		width: 20px;
		height: 20px;
		border-radius: 3px;
		margin-right: .5em;
		vertical-align: bottom;
	}

	.listText p {
		padding-bottom: 10px;
	}

	.List {
		margin-top: 30px;
		margin-bottom: 30px;
		background-color: white;
	}

	.listHead {
		margin-left: 30px;
		margin-bottom: 10px;
	}

	.musicList {
		font-size: 14px;
		color: #666666;
		padding-top: 1em;
		margin-left: 30px;
		box-shadow: 0 7px 5px -5px rgba(240, 240, 240, .7);
		text-overflow: ellipsis;
		overflow: hidden !important;
		width: 90%;
		white-space: nowrap;
	}

	.songIndex {
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
	
	.more {
		margin-top: 60px;
	
	}
</style>
