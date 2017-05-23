<template>
  <div>
  		<g-header></g-header>
      <div class="red">content</div>
      <router-view></router-view>
      <g-footer></g-footer>
  </div>
</template>

<script>


// 引入公共头部start
import header from '../../components/header.vue';
import footer from '../../components/footer.vue';

// 引入公共头部end
export default {
	data() {
		return {
			lists:[]
		}
	},

	created () {
		// 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
		var self = this;
		console.log(self.$route.params.id);

		
	},
	methods: {
		
	},
	components : {
		'g-header' : header,
		'g-footer' : footer
	}
}
</script>
<style lang="scss">
  @import "../../style/page/detail/index";

</style>