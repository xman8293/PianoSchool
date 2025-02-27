<template>
	<view class="container">
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

		<!-- 在轮播图之后保留的机构简介 -->
		<view class="card-section">
			<view class="section-title">机构简介</view>
			<view class="intro-content">
				{{ showFullIntro ? introContent : truncatedIntroContent }}
				<text class="btn-more" @click="toggleIntroContent">
					{{ showFullIntro ? '收起' : '展开全文' }}
				</text>
			</view>
		</view>

		<!-- 优秀学员模块 -->
		<view class="card-section">
			<view class="section-header">
				<text class="title">优秀学员</text>
				<text class="more" @click="navTo('students/index')">更多 ></text>
			</view>
			<view class="student-list">
				<view v-for="(item,index) in students" :key="index" class="student-item">
					<image :src="item.avatar" mode="aspectFill" />
					<view class="student-info">
						<text class="name">{{item.name}}</text>
						<text class="intro">{{item.intro}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 证书展示模块 -->
		<view class="card-section">
			<view class="section-header">
				<text class="title">权威认证</text>
				<text class="more" @click="navTo('certificates/index')">更多 ></text>
			</view>
			<view class="cert-grid">
				<view 
					v-for="(item,index) in certificates" 
					:key="index" 
					class="cert-item"
				>
					<view class="image-container">
						<image 
							:src="item.image" 
							mode="aspectFill" 
							class="cert-image"
						/>
					</view>
					<text class="cert-name">{{item.name}}</text>
				</view>
			</view>
		</view>

		<!-- 活动列表模块 -->
		<view class="card-section">
			<view class="section-header">
				<text class="title">近期活动</text>
				<text class="more" @click="navTo('events/index')">更多 ></text>
			</view>
			<view class="event-list">
				<view 
					v-for="(item,index) in events" 
					:key="index"
					class="event-card"
					hover-class="event-card-hover"
					style="margin-bottom: 30rpx"
				>
					<!-- 活动状态标签 -->
					<view class="status-tag" :class="getStatusClass(item.status)">
						{{ getStatusText(item.status) }}
					</view>
					<image 
						:src="item.cover" 
						mode="aspectFill" 
						class="event-image"
						lazy-load
						style="height: 400rpx"
					/>
					<view class="event-info">
						<view class="title-wrapper">
							<text class="event-title">{{ item.title }}</text>
							<view class="time-wrapper">
								<text class="event-time">
									{{ formatTime(item.start_time) }} 
								</text>
							</view>
						</view>
						<view class="event-brief">
							{{ item.brief }}
						</view>
					</view>
				</view>
			</view>
			<!-- 骨架屏加载 -->
			<view v-if="eventsLoading" class="skeleton-wrapper">
				<view 
					v-for="i in 3" 
					:key="i" 
					class="skeleton-card"
				>
					<view class="skeleton-image"></view>
					<view class="skeleton-content">
						<view class="skeleton-line lg"></view>
						<view class="skeleton-line md"></view>
						<view class="skeleton-line sm"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 悬浮联系按钮 -->
		<view class="fixed-contact" @click="navTo('contact/form')">
			<image src="/static/logo.png" mode="aspectFit" />
		</view>
	</view>
</template>

<script setup>
import EventCard from '@/components/event-card.vue'
import { ref, computed, onMounted } from 'vue'
import { formatPrice, formatTime } from '@/utils/common.js'

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
	
	// 加载初始数据
	loadStudents()
	loadCertificates()
	loadEvents()
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

// // 核心优势数据
// const advantagesList = ref([
// 	{
// 		icon: '/static/img/zhuanye.png',
// 		text: '专业师资团队'
// 	},
// 	{
// 		icon: '/static/img/tese.png',
// 		text: '特色课程体系'
// 	},
// 	{
// 		icon: '/static/img/huanjing.png',
// 		text: '优质教学环境'
// 	}	,
// 	{
// 		icon: '/static/img/tese.png',
// 		text: '十年办学经验'
// 	},
// 	{
// 		icon: '/static/img/huanjing.png',
// 		text: '考级优秀率说明'
// 	}
// ])

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

// 新增数据
const students = ref([])
const certificates = ref([])
const events = ref([])

const loadStudents = async () => {
	try {
		const res = await uniCloud.callFunction({
			name: 'getStudents',
			data: {
				page: 1,
				pageSize: 2,
				orderBy: 'sort'
			}
		});
		console.log('学员数据响应:', res); // 添加日志输出
		if (res.result.code === 200) {
			students.value = res.result.data.list;
		} else {
			uni.showToast({
				title: '数据加载失败',
				icon: 'none'
			});
		}
	} catch (e) {
		console.error('请求异常:', e);
		uni.showToast({
			title: '网络异常',
			icon: 'none'
		});
	}
}

const loadCertificates = async () => {
	const res = await uniCloud.callFunction({
		name: 'getCertificates',
		data: {
			page: 1,
			pageSize: 3,
			orderBy: 'sort'
		}
	})
	certificates.value = res.result.data.list;
}

const loadEvents = async () => {
	try {
		const res = await uniCloud.callFunction({
			name: 'getEvents',
			data: {
				page: 1,
				pageSize: 2,
				status: 'ongoing' // 只获取进行中的活动
			}
		});
		console.log('活动数据:', res);
		if(res.result.code === 200) {
			// 数据格式校验
			const validData = res.result.data.list.filter(item => {
				return item.title && item.cover && item.start_time
			});
			events.value = validData;
			
			// 调试日志
			console.log('有效活动数据:', JSON.parse(JSON.stringify(validData)));
		} else {
			uni.showToast({ title: '活动加载失败', icon: 'none' });
		}
	} catch (e) {
		console.error('活动请求异常:', e);
		uni.showToast({ title: '网络异常', icon: 'none' });
	}
}

const navTo = (path) => {
	const tabBarPaths = ['contact/form', 'teachers/index', 'groupbuy/index'] // 所有 tabbar 页面
	if(tabBarPaths.includes(path)) {
		uni.switchTab({
			url: `/pages/${path}`
		})
	} else {
		uni.navigateTo({
			url: `/pages/${path}`
		})
	}
}

const eventsLoading = ref(false)

const getStatusClass = (status) => {
	switch (status) {
		case 'ongoing':
			return 'ongoing'
		case 'upcoming':
			return 'upcoming'
		case 'ended':
			return 'ended'
		default:
			return ''
	}
}

const getStatusText = (status) => {
	switch (status) {
		case 'ongoing':
			return '进行中'
		case 'upcoming':
			return '即将开始'
		case 'ended':
			return '已结束'
		default:
			return ''
	}
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
.container {
	background-color: #f5f7fa;
	min-height: 100vh;
}

/* 统一卡片样式 */
.section, .card-section {
	background: #ffffff;
	border-radius: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	padding: 30rpx;
	margin: 30rpx;
}

/* 标题样式 */
.section-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #2A3F54;
	margin: 20rpx 0;
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
	background: linear-gradient(to right, transparent 0%, white 50%);
	padding-left: 80rpx;
}

/* 新增样式 */
.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.title {
	font-size: 36rpx;
	font-weight: 600;
	color: #2A3F54;
}

.more {
	font-size: 26rpx;
	color: #007BFF;
}

/* 优秀学员列表 */
.student-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.student-item {
	background: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.student-item image {
	width: 100%;
	height: 300rpx;
	object-fit: cover;
	border-radius: 16rpx 16rpx 0 0;
}

.student-info {
	padding: 20rpx;
}

.name {
	font-size: 30rpx;
	color: #2A3F54;
	font-weight: 500;
	margin-bottom: 10rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.intro {
	font-size: 24rpx;
	color: #666;
	line-height: 1.4;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.cert-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
	margin: 20rpx 0;
}

.cert-item {
	width: 100%;
	margin-bottom: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
	transition: transform 0.3s ease;
}

.cert-item:active {
	transform: scale(0.98);
}

.image-container {
	width: 100%;
	height: 240rpx;
	overflow: hidden;
	position: relative;
}

.cert-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.cert-name {
	font-size: 28rpx;
	color: #2A3F54;
	padding: 20rpx;
	text-align: center;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	line-height: 1.4;
}

.event-list {
	display: flex;
	flex-direction: column;
}

.event-card {
	width: 100%;
	margin-bottom: 30rpx;
	background: #fff;
	border-radius: 24rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
	position: relative;
	transition: all 0.3s ease;
}

.event-card-hover {
	transform: translateY(-4rpx);
	box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.12);
}

.event-image {
	width: 100%;
	height: 400rpx;
	object-fit: cover;
}

.event-info {
	padding: 24rpx;
}

.title-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.event-title {
	font-size: 36rpx;
	color: #2A3F54;
	font-weight: 600;
	line-height: 1.4;
	max-width: 70%;
}

.time-wrapper {
	display: flex;
	align-items: center;
	min-width: 30%;
}

.time-wrapper::before {
	content: '📅';
	margin-right: 8rpx;
	font-size: 32rpx;
}

.event-time {
	font-size: 28rpx;
	color: #666;
	margin-left: 10rpx;
}

.event-brief {
	font-size: 28rpx;
	color: #666;
	line-height: 1.6;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	background: #f8f9fa;
	padding: 20rpx;
	border-radius: 12rpx;
}

.status-tag {
	position: absolute;
	top: 20rpx;
	left: -8rpx;
	padding: 8rpx 30rpx;
	border-radius: 0 20rpx 20rpx 0;
	font-size: 26rpx;
	z-index: 2;
	box-shadow: 2rpx 2rpx 6rpx rgba(0,0,0,0.1);
}

.status-tag.ongoing {
	background: #4CAF50;
	color: #fff;
}

.status-tag.upcoming {
	background: #FF9800;
	color: #fff;
}

.status-tag.ended {
	background: #9E9E9E;
	color: #fff;
}

/* 骨架屏样式 */
.skeleton-wrapper {
	display: grid;
	gap: 30rpx;
}

.skeleton-card {
	background: #fff;
	border-radius: 24rpx;
	overflow: hidden;
}

.skeleton-image {
	height: 300rpx;
	background: #f5f5f5;
}

.skeleton-content {
	padding: 24rpx;
}

.skeleton-line {
	height: 30rpx;
	background: #f5f5f5;
	margin-bottom: 20rpx;
	border-radius: 8rpx;
}

.skeleton-line.lg {
	width: 70%;
}

.skeleton-line.md {
	width: 50%;
}

.skeleton-line.sm {
	width: 30%;
}

.fixed-contact {
	position: fixed;
	right: 20rpx;
	bottom: 20rpx;
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #ffffff;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
