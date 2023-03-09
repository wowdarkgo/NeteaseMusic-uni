<template>
	<view>

		<view class="bg bg-blur" :style="{backgroundImage:`url(${coverurl})`}">
		</view>
		<view class="container">
			<scroll-view scroll-y="true">
				<commonTitle :title="'正在播放 -  '+this.songname" class="nav-bar"></commonTitle>
				<scroll-view scroll-y="true" style="height: 90vh;">

					<view class="play">
						<img :src='coverurl' alt="" class="coverImg">
						<img src="../../static/disc.png" alt="" class="disc">
						<img src="../../static/needle.png" alt="" class="needle">
						<van-icon name="play-circle-o" class="icon-play" />
					</view>
					<view class="lyric">
						<view class="lyric-item">
							苍茫的天涯是我的爱
						</view>
						<view class="lyric-item-active">
							留下那万紫千红一片彩
						</view>
						<view class="lyric-item">
							火辣辣得歌谣使我们的精彩
						</view>
					</view>
				</scroll-view>
				<view class="recommend">
					<view class="recommend-head">
						<text>喜欢这首歌的人也听</text>
					</view>
					<div v-for="item in simisong" :key="item.id" class="recommend-item" :id="item.id"
						@click="ToDetail($event)">
						<img :src='item.album.blurPicUrl' alt="" style="width: 50px;border-radius: 10%;float: left;">
						<view class="item-content">
							{{ item.name }}
							<van-icon name="play-circle-o" style="font-size: 30px; position: absolute; right: 10px;" />
							<view class="item-author">
								{{item.artists[0].name}}
							</view>
						</view>
					</div>
				</view>
				<view class="comment">
					<view class="comment-head">
						<text>热门评论</text>
					</view>
					<div v-for="item in hotcomment" :key="item.id" class="comment-item"
						style="border-bottom: #a5a5ab .5px solid;">
						<view class="comment-user">
							<view>
								<img :src="item.user.avatarUrl" alt=""
									style="width: 50px;border-radius: 50%;float:left;margin-right: 10px;">
								<van-icon name="like-o" style="font-size: 15px;position:absolute;right: 10px;" />
								<text style="position: absolute;right:30px;font-size: 10px;">{{item.likedCount}}</text>

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
				songurl: '',
				coverurl: '',
				simisong: [],
				hotcomment: [],
			}
		},
		methods: {
			ToDetail(e) {
				uni.showLoading({
					title: "加载歌曲中……",
				})
				getSongData(e.currentTarget.id).then((res) => {
						this.songname = res.data.songs[0].name,
							this.coverurl = res.data.songs[0].al.picUrl
						// console.log(this.coverurl)
					}).then(
						getSongUrl(e.currentTarget.id).then((res) => {
							this.songurl = res.data.data[0].url
							// console.log(res.data.data[0].url)
							setInterval(function() {
								uni.hideLoading()
							}, 1000)
						})
					).then(getSimiSong(e.currentTarget.id).then((res) => {
						this.simisong = [...res.data.songs].slice(0, 5)
						// console.log(this.simisong)
					})).then(getHotComment(e.currentTarget.id).then((res) => {
						this.hotcomment = [...res.data.hotComments].slice(0, 10)
					}))

					.catch((err) => {
						uni.showToast({
							title: '请重新进入列表或更换歌曲',
							icon: 'error'
						})
					})
			}
		},
		onLoad(option) {
			this.songid = option.songid,
				uni.showLoading({
					title: "加载歌曲中……",
				})
			getSongData(this.songid).then((res) => {
					this.songname = res.data.songs[0].name,
						this.coverurl = res.data.songs[0].al.picUrl
					// console.log(this.coverurl)
				}).then(
					getSongUrl(this.songid).then((res) => {
						this.songurl = res.data.data[0].url
						// console.log(res.data.data[0].url)
						setInterval(function() {
							uni.hideLoading()
						}, 1000)
					})
				).then(getSimiSong(this.songid).then((res) => {
					this.simisong = [...res.data.songs].slice(0, 5)
					// console.log(this.simisong)
				})).then(getHotComment(this.songid).then((res) => {
					this.hotcomment = [...res.data.hotComments].slice(0, 10)
				}))

				.catch((err) => {
					uni.showToast({
						title: '请重新进入列表或更换歌曲',
						icon: 'error'
					})
				})

		}
	}
</script>

<style>
	.nav-bar {
		position: sticky;
		top: 0;
	}

	.Tabbar {
		position: absolute fixed;
		right: 0;
		bottom: 0;
		left: 0;
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
	}

	.lyric {
		font-size: 12px;
		position: absolute;
		left: 50%;
		top: 80%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.lyric-item {
		margin: 15px 0 15px 0;
		color: #646468
	}

	.lyric-item-active {
		font-size: 15px;
		color: #ffffff;
	}

	.recommend,
	.comment {
		margin-left: 10px;
		margin-top: 10px;
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
		font-size: 15px;
		color: #ffffff;
		float: left;
		margin-left: 10px;
	}

	.comment-time {
		display: flex;
		font-size: 10px;
		color: #dcdddf;
	}

	.user-content {
		width: 70px;
		text-align: start;
		line-height: 15px;
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
	}

	.comment-content {
		width: 60%;
		margin-top: 10px;
	}
</style>
