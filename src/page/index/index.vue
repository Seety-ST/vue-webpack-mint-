<template>
	<div>
		<!-- 公共头部start -->
		<g-header></g-header>
		<!-- 公共头部end -->
		<!-- 轮播效果start -->
		<mt-swipe :auto="4000">
			<mt-swipe-item>
				<ul class="swipe-list">
    				<li style="background-color: #000">
						11111111
    				</li>	
				</ul>
			</mt-swipe-item>
			<mt-swipe-item>
				<ul class="swipe-list">
    				<li style="background-color: #eee">
						2222
    				</li>	
				</ul>
			</mt-swipe-item>
			<mt-swipe-item>
				<ul class="swipe-list">
			    	<li style="background-color: #ccc">
						33333
			    	</li>	
				</ul>
			</mt-swipe-item>
		</mt-swipe>
		<!-- 轮播效果end -->
		<!-- 带参数的路由跳转start -->
		<ul class="list">
			<li v-for="item in lists">
				<router-link :to="{ name: 'detail', params: { id: item.id }}">  {{item.id}}
        	</router-link>  
			
			</li>
		</ul>
		<!-- 带参数的路由跳转end -->
		<button type="" @click="toast_button" style="border:1px solid #ccc">toast提示</button>
		<!-- 加载更多start -->
		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
		  <li v-for="item in lists">{{ item.name }}</li>
		</ul>
		<!-- 加载更多end -->
		<ul id="container">
			<li v-for="item in lists">
				<img v-lazy.container="item.image">
			</li>
		</ul>
		<!-- 公共底部start -->
		<g-footer></g-footer>
		<!-- 公共底部end -->
	</div>
	
</template>
<script>


// 引入公共头底部start
import header from '../../components/header.vue';
import footer from '../../components/footer.vue';
// 引入公共头底部end


import {Indicator} from 'mint-ui'; /*加载更多*/
import { Swipe, SwipeItem } from 'mint-ui'; /*轮播图使用*/
import { Toast } from 'mint-ui';/*toast提示使用*/

export default {
	data() {
		return {
			lists:[],
			allUseLoad : false,
			bottomText : "上拉加载更多。。。",
			pages :1,
			loading : false,
		}
	},

	created () {
		// 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
		this.get_data();
		
	},
	methods: {

		get_data: function(params) {
			var self = this
			if (!params) params = {
				name : 'nihao',
				age : 2,
			}
			self.$http.post('/test', [{
				params:{
					'name' : "nihao",
					'age':1,
				},
				dataType: 'json' 
			}])
			.then(function(res){
			    // 响应成功回调
			    console.log(res);
			    self.lists= res.data.list;
			}, function(response){
			    // 响应错误回调
			});
			
		},
		toast_button(){
			Toast('提示信息');
		},
		loadBottomUse() {
		  // 加载更多数据
		  console.log("load");
		  
		},
		loadMore(){
			console.log(this.pages);
			this.pages++;
			this.$http.post("/test",{
				params:{
					'page':this.pages,
					'tableNum':1,
					'justList':1
				}
			}).then(function(res){
				console.log(this.pages);
				if (res.data.errcode==0) {
					this.lists=(this.lists).concat(res.data.list);
				}
				else{
					this.loading=true;
				}
				
			},function(msg){
				
			})
		}
	},
	components : {
		'g-header' : header,
		'g-footer' : footer,
		'mt-swipe' : Swipe,
		'mt-swipe-item' : SwipeItem,
	}
}
</script>
<style lang="scss">
  @import "../../style/page/index";

</style>