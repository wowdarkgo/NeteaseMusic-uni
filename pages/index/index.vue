<template>
	<view>
		<commonTitle></commonTitle>
		<scroll-view scroll-y="true">
			<view>
				<van-row>
					<van-col span="24" type="flex">
						<view @click="ToList($event)" :id="this.songIdList[0]">
							<img src="../../static/biaosheng.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in upList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
					<van-col span="24">
						<view @tap="ToList($event)" :id="this.songIdList[1]">
							<img src="../../static/rege.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in hotList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
					<van-col span="24">
						<view @tap="ToList($event)" :id="this.songIdList[2]">
							<img src="../../static/yuanchuang.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in originList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
					<van-col span="24">
						<view @tap="ToList($event)" :id="this.songIdList[3]">
							<img src="../../static/xinge.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in newList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
					<van-col span="24">
						<view @tap="ToList($event)" :id="this.songIdList[4]">
							<img src="../../static/ACG.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in ACGList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
					<van-col span="24">
						<view @tap="ToList($event)" :id="this.songIdList[5]" style="margin-bottom: 20%;">
							<img src="../../static/Riyu.png" alt="" class="songImg">
							<ul class="songList">
								<li v-for="(item,index) in RiyuList" :key="item.id">
									{{index+1}}.{{ item.name }} - {{item.ar[0].name}}
								</li>
							</ul>
						</view>
					</van-col>
				</van-row>
			</view>
		</scroll-view>
		<commonTabbar class="Tabbar"></commonTabbar>
	</view>
</template>

<script>
	import commonTitle from '../../components/commonTitle/commonTitle.vue'
	import {
		getSongList,
		getUserFollow
	} from '../../common/api.js'
	export default {
		data() {
			return {
				upList: [],
				hotList: [],
				originList: [],
				newList: [],
				ACGList: [],
				RiyuList:[],
				songIdList: ['19723756', '3778678', '2884035', '3779629', '71385702','5059644681']
			}
		},
		onLoad() {

			getSongList(this.songIdList[0]).then((res) => {
				this.upList = (res.data.playlist.tracks).slice(0, 3)
			})
			getSongList(this.songIdList[1]).then((res) => {
					this.hotList = (res.data.playlist.tracks).slice(0, 3)
				}),
				getSongList(this.songIdList[2]).then((res) => {
					this.originList = (res.data.playlist.tracks).slice(0, 3)
				})
			getSongList(this.songIdList[3]).then((res) => {
				this.newList = (res.data.playlist.tracks).slice(0, 3)
			})
			getSongList(this.songIdList[4]).then((res) => {
				this.ACGList = (res.data.playlist.tracks).slice(0, 3)
			})
			getSongList(this.songIdList[5]).then((res)=>{
				this.RiyuList=(res.data.playlist.tracks).slice(0,3)
			})

		},
		methods: {
			ToList(e) {
				console.log(e.target.id)
				uni.navigateTo({
					url: `/pages/list/list?listid=${e.target.id}`
				})
			}
		},
		components: {
			commonTitle
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
	}

	.songImg {
		float: left;
		border-radius: 10px;
		margin-left: 30px;
		margin-top: 30px;
		width: 100px;
		height: 100px;
	}

	.songList {
		float: left;
		margin-top: 55px;
		font-size: 10px;
		text-align: 16px;
		margin-left: 20px;
		list-style-type: none;
		color: #666666;
		flex-direction: row;
	}

	.songList li {
		margin-bottom: 5px;
		text-overflow: ellipsis;
		overflow: hidden !important;
		width: 400rpx;
		white-space: nowrap;
	}

	.Tabbar {
		position: absolute;
		right: 0;
		left: 0;
		height: 20px;
		margin-top: 80rpx;
		position: sticky;
	}
</style>
