<template>
	<view>
		<view class="bg bg-blur" :style="{backgroundImage:`url(${coverurl})`}">
		</view>
		<view class="container">
			<scroll-view scroll-y="true">

				<view class="back" @tap="back()">
					<van-icon name="arrow-left" class="back-arrow" />
				</view>
				<scroll-view scroll-y="true" style="height: 90vh;">
					<view class="play" @click="controlplay()">
						<img :src='coverurl' alt="" class="coverImg turn" :style="{'--turn':isturn}">
						<img src="../../static/disc.png" alt="" class="disc">
						<img src="../../static/needle.png" alt="" class="needle">
						<view v-show='!isplay'>
							<van-icon name="pause-circle-o" class="icon-play" :style="{'--opacity':isplay}" />
						</view>
						<view v-show="isplay">
							<van-icon name="play-circle-o" class="icon-play" :style="{'--opacity':isplay}" />
						</view>

					</view>
					<view class="song-info">
						<view class="songname">
							{{songname}}
						</view>
						<view class="authorname" @tap="ToArtist($event)" :id="this.artistid">
							{{authorname}}
						</view>
						<view class="authorname" @tap="ToAlbum($event)" :id="this.albumid">
							- {{albumname}} -
						</view>
					</view>
				</scroll-view>
				<view class="recommend">
					<view class="recommend-head">
						<text>喜欢这首歌的人也听</text>
					</view>
					<view v-for="item in simisong" :key="item.id" class="recommend-item" :id="item.id"
						@click="ToDetail($event)">
						<img :src='item.album.blurPicUrl' alt=""
							style="width: 50px;height:50px;border-radius: 10%;float: left;">
						<view class="item-content">
							{{ item.name }}
							<van-icon name="play-circle-o" style="font-size: 30px; position: absolute; right: 10px;" />
							<view class="item-author">
								{{item.artists[0].name}}
							</view>
						</view>
					</view>
				</view>
				<view class="comment">
					<view class="comment-head">
						<text>热门评论</text>
					</view>
					<div v-for="item in hotcomment" :key="item.id" class="comment-item"
						style="border-bottom: darkgray .5px solid ;">
						<view class="comment-user">
							<view>
								<img :src="item.user.avatarUrl" alt=""
									style="width: 50px;border-radius: 50%;float:left;margin-right: 10px;">
								<view style="position: absolute;right: 10px;">
									<van-icon name="like-o" style="font-size: 15px;position:absolute;right: 10px;" />
									<text
										style="position: absolute;right:30px;font-size: 10px;">{{item.likedCount}}</text>
								</view>
								<view class="user-content">
									{{item.user.nickname}}
									<text class="comment-time">{{item.timeStr}}</text>
								</view>
							</view>
						</view>
						<view class="comment-content">
							{{ item.content }}
						</view>
					</div>
					<text class="more">更多评论请前往App查看</text>
				</view>
			</scroll-view>

		</view>

		<commonTabbar class="Tabbar"></commonTabbar>
	</view>
</template>

<script>
	import {
		getSongUrl,
		getSongData,
		getSimiSong,
		getHotComment,
		timestampToTime
	} from '../../common/api.js';
	export default {
		data() {
			return {
				songid: '',
				songname: '',
				authorname: '',
				albumname: '',
				albumid: '',
				artistid: '',
				songurl: '',
				coverurl: '',
				simisong: [],
				hotcomment: [],
				privileges: [],
				isplay: false,
				isinit: false,
				isturn: 'paused',
			}
		},
		methods: {
			ToDetail(e) {
				uni.showLoading({
						title: "加载歌曲中……",
					}),
					this.innerAudioContext.stop();
				getSongData(e.currentTarget.id).then((res) => {
						this.songname = res.data.songs[0].name,
							this.authorname = res.data.songs[0].ar[0].name,
							this.albumname = res.data.songs[0].al.name,
							this.albumid = res.data.songs[0].al.id,
							this.artistid = res.data.songs[0].ar[0].id,
							this.coverurl = res.data.songs[0].al.picUrl
					}).then(
						getSongUrl(e.currentTarget.id).then((res) => {
							this.songurl = res.data.data[0].url;
							setInterval(function() {
								uni.hideLoading()
							}, 1000)
						})
					).then(getSimiSong(e.currentTarget.id).then((res) => {
						this.simisong = [...res.data.songs].slice(0, 5)
						// console.log(this.simisong)
					})).then(getHotComment(e.currentTarget.id).then((res) => {
						this.hotcomment = [...res.data.hotComments].slice(0, 10)
					})).then(this.isplay = false, this.isinit = false)
					.catch((err) => {
						uni.showToast({
							title: '请重新进入列表或更换歌曲',
							icon: 'error'
						})
					}),
					this.isturn = 'paused';
			},
			back() {
				uni.navigateBack()
			},
			ToArtist(e) {
				uni.navigateTo({
					url: `/pages/artists/artists?id=${e.target.id}`
				})
				this.innerAudioContext.stop();
				this.isplay = false
				this.isturn = 'paused';
			},
			ToAlbum(e) {
				uni.navigateTo({
					url: `/pages/album/album?id=${e.target.id}`
				})
				this.innerAudioContext.stop();
				this.isplay = false;
				this.isturn = 'paused';
			},
			controlplay() {
				if (!this.isinit) {
					this.innerAudioContext.destroy();
					this.innerAudioContext.loop = true;
					this.innerAudioContext.src = this.songurl;
					this.isinit = true;
					console.log('音乐初始化成功')
					if (this.privileges.fee === 1) {
						uni.showToast({
							title: '会员专享歌曲，仅可试听30秒',
							icon: 'none',
							duration: 2000
						})
					}
				}
				this.isplay = !this.isplay;
				if (this.isplay) {
					this.innerAudioContext.play()
					this.isturn = "running";
					console.log('开始播放')
				} else {
					this.innerAudioContext.pause();
					this.isturn = "paused"
					console.log('结束播放')
				}
			},
		},
		onLoad(option) {
			this.songid = option.songid,
				uni.showLoading({
					title: "加载歌曲中……",
				})
			getSongData(this.songid).then((res) => {
					this.songname = res.data.songs[0].name,
						this.authorname = res.data.songs[0].ar[0].name,
						this.albumname = res.data.songs[0].al.name,
						this.albumid = res.data.songs[0].al.id,
						this.artistid = res.data.songs[0].ar[0].id,
						this.coverurl = res.data.songs[0].al.picUrl,
						this.privileges = res.data.privileges[0]
				}).then(
					getSongUrl(this.songid).then((res) => {
						this.songurl = res.data.data[0].url
						console.log(this.songurl)
						// console.log(res.data.data[0].url)
						setInterval(function() {
							uni.hideLoading()
						}, 1000)
					})
				).then(getSimiSong(this.songid).then((res) => {
					this.simisong = [...res.data.songs].slice(0, 5)
				})).then(getHotComment(this.songid).then((res) => {
					this.hotcomment = [...res.data.hotComments]
				}))
				.catch((err) => {
					uni.showModal({
						title: '加载失败',
						content: '请重新进入歌曲播放页',
						cancelText: '返回主页',
						confirmText: '返回列表',
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack()
							} else if (res.cancel) {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}
						}
					});
				})
			//歌曲播放
			this.innerAudioContext = uni.createInnerAudioContext();
		},
		onBackPress() {
			this.innerAudioContext.stop()
			console.log('返回')
		}
	}
</script>

<style>
	.back {
		width: 200px;
		position: absolute;
		left: 20px;
		top: 20px;
		background-color: #cccccc;
		;
		z-index: 1;
	}

	.back-arrow {
		color: white;
		font-size: 16px;
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 40%;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-position: center 0;
		background-repeat: no-repeat;
	}

	.bg-blur {
		position: fixed;
		-webkit-filter: blur(15px);
		-moz-filter: blur(15px);
		-o-filter: blur(15px);
		-ms-filter: blur(15px);
		filter: blur(15px) brightness(70%);
		transform: scale(1.15);
	}

	.container {
		position: relative;
		overflow: hidden;
	}

	.play {
		height: 400px;
		position: absolute;
		top: calc(50% - 20px);
		transform: translate(0, -50%);
		/*自己的50%*/
		width: 100%;
	}

	.coverImg {
		position: absolute;
		width: 200px;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/*自己的50%*/

	}

	.turn {
		//旋转动画
		animation: turn 20s linear infinite;
		animation-play-state: var(--turn) !important;
		-webkit-animation: turn 20s linear infinite;
	}

	@keyframes turn {
		from {
			transform: translate(-50%, -50%) rotate(0deg);

		}

		to {
			transform: translate(-50%, -50%) rotate(359deg);

		}
	}

	@keyframes opacity {
		form {
			opacity: 1;
		}

		to {
			opacity: 0;
			;
		}
	}

	.disc {
		position: relative;
		width: 300px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.needle {
		position: absolute;
		width: 200px;
		left: 51%;
		transform: translate(-50%, -50%);

	}

	.icon-play {
		font-size: 4em;
		color: #ffffff;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		opacity: 1;
		animation-play-state: var(--opacity) !important;
		animation: opacity 3s;
		animation-fill-mode: forwards;
	}

	.song-info {
		font-size: 12px;
		position: absolute;
		left: 50%;
		top: 80%;
		transform: translate(-50%, -50%);
		text-align: center;
		width: 100%;
	}

	.songname {
		font-size: 2em;
		color: white;
		margin-top: 6em;
	}

	.authorname {
		font-size: 1.10em;
		color: #dcdddf;
		margin-top: .5em;
	}

	.recommend {
		margin: 100px 0 0 10px
	}

	.comment {
		margin: 20px 0 20% 10px
	}

	.recommend-item,
	.comment-item {
		display: flex;
		padding-bottom: 10px;
	}

	.recommend-head,
	.comment-head {
		font-size: 20px;
		color: #ffffff;
		margin-bottom: 15px;
	}

	.item-content,
	.comment-content {
		font-size: 14px;
		color: #ffffff;
		float: left;
		margin-left: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 90%;
	}

	.comment-time {
		display: flex;
		font-size: 10px;
		color: #dcdddf;
	}

	.user-content {
		width: 70px;
		text-align: start;
		white-space: nowrap;
	}

	.comment-like {
		position: absolute;
		right: 10px;
		text-align: 10px
	}

	.item-author,
	.comment-user {
		font-size: 13px;
		color: #dcdddf;
		margin-top: 10px;
		width: 50px;
	}

	.item-author {
		width: 100%;
	}

	.comment-content {
		width: 90%;
		margin-top: 50px;
	}

	.more {
		font-size: 12px;
		color: #dcdddf;
		text-decoration: underline;
		margin-top: 20px;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
	}
</style>
