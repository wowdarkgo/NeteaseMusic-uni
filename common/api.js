import {
	baseUrl
} from './config.js'

export function timestampToTime(timestamp){
	/* 时间戳转换为时间 */ {
	    timestamp = timestamp ? timestamp : null;
	    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    let Y = date.getFullYear() + '-';
	    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	    return Y + M + D + h + m + s;
	  }

}


export function getSongList(listId,userid){
	return new Promise(function(resolve,reject){
		uni.request({
						url: `${baseUrl}/playlist/detail?id=${listId}&userid=${userid}`,
						method:'GET',
						data:{},
						success: res =>{
							resolve(res)
						}
		})
	})
}
export function getUserFollow(userId) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `${baseUrl}/user/follows?uid=${userId}`,
			method: 'GET',
			data: {},
			success: res => {
				resolve(res)
			}
		})
	})
}
export function getSongUrl(songid){
	return new Promise(function(resolve,reject){
		uni.request({
			url:`${baseUrl}/song/url?id=${songid}`,
			method:'GET',
			data:{},
			success(res) {
				resolve(res)
			}
		})
	})
}

export function getSongData(songid){
	return new Promise(function(resolve,reject){
		uni.request({
			url:`${baseUrl}/song/detail?ids=${songid}`,
			method:'GET',
			data:{},
			success(res) {
				resolve(res)
			}
		})
	})
}

export function getSimiSong(songid){
	return new Promise(function(resolve,reject){
		uni.request({
			url:`${baseUrl}/simi/song?id=${songid}`,
			method:'GET',
			data:{},
			success(res) {
				resolve(res)
			}
		})
	})
}

export function getHotComment(songid){
	return new Promise(function(resolve,reject){
		uni.request({
			url:`${baseUrl}/comment/hot?id=${songid}&type=0`,
			method:'GET',
			data:{},
			success(res) {
				resolve(res)
			}
		})
	})
}