(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0138":function(t,i,n){var s=n("24fb");i=s(!1),i.push([t.i,".search-bar[data-v-8f3ce724]{margin-top:10px}.content[data-v-8f3ce724]{display:flex;flex-direction:column;align-items:center;justify-content:center}.logo[data-v-8f3ce724]{height:%?200?%;width:%?200?%;margin-top:%?200?%;margin-left:auto;margin-right:auto;margin-bottom:%?50?%}.text-area[data-v-8f3ce724]{display:flex;justify-content:center}.title[data-v-8f3ce724]{font-size:36px}.songImg[data-v-8f3ce724]{float:left;border-radius:10px;margin-left:30px;margin-top:30px;width:100px;height:100px}.songList[data-v-8f3ce724]{float:left;margin-top:55px;font-size:10px;text-align:16px;margin-left:20px;list-style-type:none;color:#666;flex-direction:row}.songList li[data-v-8f3ce724]{margin-bottom:5px;text-overflow:ellipsis;overflow:hidden!important;width:%?400?%;white-space:nowrap}.Tabbar[data-v-8f3ce724]{position:absolute;right:0;left:0;height:20px;margin-top:%?80?%;position:-webkit-sticky;position:sticky}",""]),t.exports=i},"1a32":function(t,i,n){"use strict";n.r(i);var s=n("f4b9"),a=n.n(s);for(var e in s)["default"].indexOf(e)<0&&function(t){n.d(i,t,(function(){return s[t]}))}(e);i["default"]=a.a},"2e12":function(t,i,n){"use strict";n.r(i);var s=n("d0c6"),a=n("1a32");for(var e in a)["default"].indexOf(e)<0&&function(t){n.d(i,t,(function(){return a[t]}))}(e);n("d1c4");var o=n("f0c5"),c=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"8f3ce724",null,!1,s["a"],void 0);i["default"]=c.exports},"3ee9":function(t,i,n){t.exports=n.p+"static/img/biaosheng.b7641779.png"},"47f2":function(t,i,n){t.exports=n.p+"static/img/ACG.9e9f878a.png"},"5a78":function(t,i,n){t.exports=n.p+"static/img/rege.27eba7df.png"},"5fa8":function(t,i,n){t.exports=n.p+"static/img/xinge.291a12e0.png"},8481:function(t,i,n){var s=n("0138");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=n("4f06").default;a("72024d13",s,!0,{sourceMap:!1,shadowMode:!1})},c413:function(t,i,n){t.exports=n.p+"static/img/Riyu.750a3e54.png"},d0c6:function(t,i,n){"use strict";n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return e})),n.d(i,"a",(function(){return s}));var s={commonTitle:n("7390").default,commonTabbar:n("2a82").default},a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("v-uni-view",[s("commonTitle"),s("v-uni-scroll-view",{attrs:{"scroll-y":"true"}},[s("v-uni-view",[s("van-row",[s("van-col",{attrs:{span:"24",type:"flex"}},[s("v-uni-view",{attrs:{id:this.songIdList[0]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("3ee9"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.upList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1),s("van-col",{attrs:{span:"24"}},[s("v-uni-view",{attrs:{id:this.songIdList[1]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("5a78"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.hotList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1),s("van-col",{attrs:{span:"24"}},[s("v-uni-view",{attrs:{id:this.songIdList[2]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("d227"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.originList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1),s("van-col",{attrs:{span:"24"}},[s("v-uni-view",{attrs:{id:this.songIdList[3]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("5fa8"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.newList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1),s("van-col",{attrs:{span:"24"}},[s("v-uni-view",{attrs:{id:this.songIdList[4]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("47f2"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.ACGList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1),s("van-col",{attrs:{span:"24"}},[s("v-uni-view",{staticStyle:{"margin-bottom":"20%"},attrs:{id:this.songIdList[5]},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToList(i)}}},[s("img",{staticClass:"songImg",attrs:{src:n("c413"),alt:""}}),s("ul",{staticClass:"songList"},t._l(t.RiyuList,(function(i,n){return s("li",{key:i.id},[t._v(t._s(n+1)+"."+t._s(i.name)+" - "+t._s(i.ar[0].name))])})),0)])],1)],1)],1)],1),s("commonTabbar",{staticClass:"Tabbar"})],1)},e=[]},d1c4:function(t,i,n){"use strict";var s=n("8481"),a=n.n(s);a.a},d227:function(t,i,n){t.exports=n.p+"static/img/yuanchuang.2a4651d4.png"},f4b9:function(t,i,n){"use strict";n("7a82");var s=n("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,n("fb6a");var a=s(n("7390")),e=n("135c"),o={data:function(){return{upList:[],hotList:[],originList:[],newList:[],ACGList:[],RiyuList:[],songIdList:["19723756","3778678","2884035","3779629","71385702","5059644681"]}},onLoad:function(){var t=this;(0,e.getSongList)(this.songIdList[0]).then((function(i){t.upList=i.data.playlist.tracks.slice(0,3)})),(0,e.getSongList)(this.songIdList[1]).then((function(i){t.hotList=i.data.playlist.tracks.slice(0,3)})),(0,e.getSongList)(this.songIdList[2]).then((function(i){t.originList=i.data.playlist.tracks.slice(0,3)})),(0,e.getSongList)(this.songIdList[3]).then((function(i){t.newList=i.data.playlist.tracks.slice(0,3)})),(0,e.getSongList)(this.songIdList[4]).then((function(i){t.ACGList=i.data.playlist.tracks.slice(0,3)})),(0,e.getSongList)(this.songIdList[5]).then((function(i){t.RiyuList=i.data.playlist.tracks.slice(0,3)}))},methods:{ToList:function(t){uni.navigateTo({url:"/pages/list/list?listid=".concat(t.target.id)})}},components:{commonTitle:a.default}};i.default=o}}]);