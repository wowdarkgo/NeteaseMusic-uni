<template>
	<view>
		<commonTitle :title='"歌手详情  -  "+artistsData.artistName'></commonTitle>
		<scroll-view scroll-y="true">
			<view>
				<view class="artistContainer">
					<view class="cover">
						<img :src="artistsData.artistImg" class="artistImg">
						<view class="artistText">
							<p class="artistName">
								{{artistsData.artistName}}
							</p>
							<p>
								单曲数：{{artistsData.musicSize}} 专辑数：{{artistsData.albumSize}} MV数：{{artistsData.mvSize}}
							</p>
							<p>
								<text class="desc"> {{artistsData.briefDesc}}</text>
							</p>
						</view>
					</view>
				</view>
				<!-- 以下为歌单列表 -->
				<view class="List">
					<view class="listHead">
						<van-icon name="play-circle-o" style="vertical-align: middle;margin-right: 5px;" />
						<text style="font-size: 14px; vertical-align:middle" @tap="ToDetail($event)" :id="firstSongId">最热50首 - 开始播放</text>
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
				</view>
			</view>
		</scroll-view>
		<commonTabbar class="Tabbar"></commonTabbar>
	</view>

</template>

<script>
	import {
		getArtistData
	} from '../../common/api.js'
	export default {
		data() {
			return {
				artistsData: {
					artistId: '',
					artistName: '',
					artistImg: '',
					musicSize: '',
					albumSize: '',
					mvSize: '',
					briefDesc: '',
				},
				list: [],
				firstSongId:''
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
			this.artistId = option.id,
				uni.showLoading({
					title: "获取歌手信息中..."
				})
			getArtistData(this.artistId).then((res) => {
				this.artistsData.artistName = res.data.artist.name;
				this.artistsData.artistImg = res.data.artist.img1v1Url;
				this.artistsData.musicSize = res.data.artist.musicSize;
				this.artistsData.albumSize = res.data.artist.albumSize;
				this.artistsData.mvSize = res.data.artist.mvSize;
				this.artistsData.briefDesc = res.data.artist.briefDesc;
				this.list = [...res.data.hotSongs];
				this.firstSongId=res.data.hotSongs[0].id
				setInterval(function() {
					uni.hideLoading()
				}, 1000)
			}).catch((err) => {
				uni.showToast({
					title: "请重新进入歌手页"
				})
			})
		}
	}
</script>

<style>
	.Tabbar {
		width: 100%;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		position: sticky;

	}

	.artistContainer {
		display: flex;
		font-size: 10px;
		margin-top: 30px;
		color: #666666;
		text-overflow: ellipsis;
		overflow: hidden !important;
		white-space: nowrap;
		width: 100%;
	}

	.artistImg {
		width: 120px;
		height: 120px;
		border-radius: 10px;
		margin-left: 30px;
		margin-right: 20px;
		float: left;
	}

	.artistName {
		font-size: 18px;
		color: black;
	}

	.artistText p {
		padding-bottom: 10px;
	}

	.desc {
		white-space: normal;
		text-overflow: ellipsis;
		overflow: hidden;
		display: inline-block;
		width: 65%;
		max-height: 7em;
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
</style>
