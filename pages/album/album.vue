<template>
	<view>
		<commonTitle :title='"专辑详情  -  "+ this.albumName'></commonTitle>
		<scroll-view scroll-y="true">
			<view>
				<view class="albumContainer">
					<view class="cover">
						<img :src="albumImg" class="albumImg">
						<view class="albumText">
							<p class="albumName">
								{{albumName}}
							</p>
							<p>
								歌手： {{artistName}}
							</p>
							<p>
								专辑单曲数： {{albumSize}}
							</p>
							<p>
								发布时间： {{albumTime}}
							</p>
						</view>
					</view>
				</view>
				<!-- 以下为歌单列表 -->
				<view class="List">
					<view class="listHead">
						<van-icon name="play-circle-o" style="vertical-align: middle;margin-right: 5px;" />
						<text style="font-size: 14px; vertical-align:middle" @tap="ToDetail($event)" :id="firstSongId">从头播放</text>
					</view>
					<view>
						<view v-for="(item,index) in list" :key="item.id" class="musicList" @click="ToDetail($event)"
							:id="item.id">
							<van-icon name="play-circle-o"
								style="font-size: 25px; position: absolute; right: 10px;color: gray;" />
							<view class="songIndex">
								{{index+1}}
							</view>
							{{ item.name}}
							<img v-if="item.privilege.fee===1" src="../../static/VIPlogo.png" alt="" class="Logo">
							<img v-if="item.privilege.maxbr>=999000" src="../../static/SQlogo.png" alt="" class="Logo">
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
		getAlbumData,
		timestampToTime
	} from '../../common/api.js'
	export default {
		data() {
			return {
				albumId: '',
				albumName: '',
				artistName: '',
				albumImg: '',
				albumSize: '',
				albumTime: '',
				list: [],
				firstSongId: '',
			}
		},
		methods: {
			ToDetail(e) {
				uni.navigateTo({
					url: `/pages/detail/detail?songid=${e.target.id}`
				})
			},

		},
		onLoad(option) {
			this.albumId = option.id
			getAlbumData(this.albumId).then((res) => {
				this.albumName = res.data.album.name;
				this.artistName = res.data.album.artist.name;
				this.albumImg = res.data.album.blurPicUrl;
				this.albumSize = res.data.album.size;
				this.albumTime = timestampToTime(res.data.album.publishTime);
				this.list = [...res.data.songs];
				this.firstSongId=res.data.songs[0].id
			})
		}
	}
</script>

<style>
	.Tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.albumContainer {
		display: flex;
		font-size: 10px;
		margin-top: 30px;
		color: #666666;
		text-overflow: ellipsis;
		overflow: hidden !important;
		white-space: nowrap;
		width: 100%;
	}

	.albumImg {
		width: 120px;
		height: 120px;
		border-radius: 10px;
		margin-left: 30px;
		margin-right: 20px;
		float: left;
	}

	.albumName {
		font-size: 18px;
		color: black;
	}

	.albumText p {
		padding-bottom: 15px;
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
		width: 100%;
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

	.more {
		margin-top: 60px;
	}
</style>
