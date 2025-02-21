<template>
	<view class="page">
		<swiper 
			class="full-screen-swiper"
			:autoplay="true"
			:interval="3000"
			:circular="true"
		>
			<swiper-item 
				v-for="(item, index) in swiperList" 
				:key="index"
			>
				<image 
					:src="item.image" 
					mode="scaleToFill"
					class="swiper-image"
				/>
			</swiper-item>
		</swiper>

		<view class="cards">
			<!-- 机构简介卡片 -->
			<view class="card-section">
				<view class="section-title">机构简介</view>
				<view class="intro-content">
					<view v-if="!showFullIntro">{{ truncatedIntroContent }}</view>
					<view v-else>{{ introContent }}</view>
					<view class="btn-more" @tap="toggleIntroContent">
						{{ showFullIntro ? '收起' : '查看更多' }}
					</view>
				</view>
			</view>

			<!-- 核心优势 -->
			<view class="card-section">
				<view class="section-title">核心优势</view>
				<view class="advantages-grid">
					<view v-for="(item, index) in advantagesList" 
						  :key="index" 
						  class="advantage-item">
						<image :src="item.icon" class="advantage-icon"/>
						<text class="advantage-text">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 获取状态栏高度
const statusBarHeight = ref(0)

onMounted(() => {
	// 获取系统信息
	const systemInfo = uni.getSystemInfoSync()
	statusBarHeight.value = systemInfo.statusBarHeight || 0
	console.log('页面加载完成')
	// 输出当前页面路径
	const pages = getCurrentPages()
	console.log('当前页面:', pages[pages.length - 1].route)
})

// 轮播图数据
const swiperList = ref([
	{
		image: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner1.png',
		jumpLink: '/pages/introduction/index'
	},
	{
		image: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner2.png',
		jumpLink: '/pages/introduction/index'
	},
	{
		image: 'https://scrmconnect-1251489075.cos.ap-beijing.myqcloud.com/wxapp/piano/banner/banner3.png',
		jumpLink: '/pages/introduction/index'
	}
])

// 机构简介
const introContent = ref('大奔儿音乐学校成立于2013年，是一家结合艺术培训、考级、艺术教学研发为一体的连锁培训机构，历时十年的沉淀，学校创下了良好的社会口碑，始终坚持"学做人，在学艺"的教学理念。2012年办学至今已培养出44名九级毕业生，33名考级优秀生。2019年至2022年被中央音乐学院评为优秀培训机构全国前五名...')

// 核心优势数据
const advantagesList = ref([
	{
		icon: '/static/img/zhuanye.png',
		text: '专业师资团队'
	},
	{
		icon: '/static/img/tese.png',
		text: '特色课程体系'
	},
	{
		icon: '/static/img/huanjing.png',
		text: '优质教学环境'
	}	,
	{
		icon: '/static/img/tese.png',
		text: '十年办学经验'
	},
	{
		icon: '/static/img/huanjing.png',
		text: '考级优秀率说明'
	}
])

const showFullIntro = ref(false)

const toggleIntroContent = () => {
	showFullIntro.value = !showFullIntro.value
}

const truncatedIntroContent = computed(() => {
	return introContent.value.substring(0, 100) + '...';
})

// 轮播图点击处理
const handleBannerClick = (item) => {
	uni.navigateTo({
		url: item.jumpLink
	})
}

// 跳转到机构介绍页
const navigateToIntro = () => {
	uni.navigateTo({
		url: '/pages/introduction/index'
	})
}
</script>

<style scoped>
/* 全屏轮播样式 */
.full-screen-swiper {
	width: 100%;
	height: 500rpx;
	margin: 0;
}

.swiper-image {
	width: 100%;
	height: 100%;
}

/* 统一背景色 */
.page {
	background-color: #f5f7fa;
	min-height: 100vh;
}

/* 卡片统一样式 */
.card-section {
	background: #ffffff;
	border-radius: 16rpx;
	margin: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
}

.cards {
	padding: 0 30rpx;
}

.card-section {
	background: #ffffff;
	border-radius: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	padding: 30rpx;
	margin-top: 20rpx;
}

/* 标题样式 */
.section-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #2A3F54;
	margin-bottom: 30rpx;
	padding-left: 20rpx;
	position: relative;
	display: flex;
	align-items: center;
}

.section-title::before {
	content: '';
	position: absolute;
	left: 0;
	width: 8rpx;
	height: 36rpx;
	background: linear-gradient(180deg, #007BFF 0%, #0056b3 100%);
	border-radius: 4rpx;
}

/* 核心优势网格布局 */
.advantages-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
	justify-items: center;
	width: 100%;
}

.advantage-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 180rpx;
}

.advantage-icon {
	width: 80rpx;
	height: 80rpx;
	padding: 10rpx;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 4rpx 12rpx rgba(0, 123, 255, 0.15);
	margin-bottom: 15rpx;
}

.advantage-text {
	font-size: 28rpx;
	color: #2A3F54;
	text-align: center;
	white-space: nowrap;
}

/* 机构简介内容样式 */
.intro-content {
	position: relative;
	font-size: 30rpx;
	line-height: 1.6;
	color: #4a5568;
	padding-bottom: 40rpx;
}

.btn-more {
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: 26rpx;
	color: #007BFF;
	padding: 10rpx 0;
}
</style>
