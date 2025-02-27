<template>
  <view class="form-container">
    <!-- 机构Logo -->
    <image 
      src="/static/logo.png" 
      mode="aspectFit" 
      class="header-logo"
    />

    <view class="form-card">
      <!-- 表单标题 -->
      <view class="form-header">
        <text class="title">课程咨询</text>
        <text class="subtitle">专业音乐教育·成就艺术梦想</text>
      </view>

      <!-- 表单内容 -->
      <view class="form-body">
        <!-- 姓名 -->
        <view class="form-item">
          <text class="label">家长姓名</text>
          <input 
            v-model="formData.name"
            placeholder="请输入姓名"
            class="input"
            :class="{ error: errors.name }"
          />
          <text v-if="errors.name" class="error-msg">{{ errors.name }}</text>
        </view>

        <!-- 手机号 -->
        <view class="form-item">
          <text class="label">联系电话</text>
          <input
            v-model="formData.phone"
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
            class="input"
            :class="{ error: errors.phone }"
          />
          <text v-if="errors.phone" class="error-msg">{{ errors.phone }}</text>
        </view>

        <!-- 孩子年龄 -->
        <view class="form-item">
          <text class="label">孩子年龄</text>
          <input
            v-model="formData.age"
            placeholder="请输入年龄"
            type="number"
            class="input"
            :class="{ error: errors.age }"
          />
          <text v-if="errors.age" class="error-msg">{{ errors.age }}</text>
        </view>

        <!-- 兴趣科目 -->
        <view class="form-item">
          <text class="label">兴趣科目</text>
          <picker
            mode="selector"
            :range="subjectOptions"
            @change="onSubjectChange"
          >
            <view class="picker" :class="{ placeholder: !formData.subject }">
              {{ formData.subject || '请选择兴趣科目' }}
            </view>
          </picker>
        </view>

        <!-- 提交按钮 -->
        <button 
          class="submit-btn" 
          :disabled="isSubmitting"
          @click="handleSubmit"
        >
          {{ isSubmitting ? '提交中...' : '立即预约' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 表单数据
const formData = ref({
  name: '',
  phone: '',
  age: '',
  subject: ''
})

// 验证错误信息
const errors = ref({
  name: '',
  phone: '',
  age: ''
})

// 表单提交状态
const isSubmitting = ref(false)

// 科目选项
const subjectOptions = ref(['钢琴', '古筝', '小提琴', '吉他', '声乐', '其他'])

// 选择科目
const onSubjectChange = (e) => {
  const index = e.detail.value
  formData.value.subject = subjectOptions.value[index]
}

// 表单验证规则
const validateForm = () => {
  let isValid = true
  const newErrors = { name: '', phone: '', age: '' }

  if (!formData.value.name.trim()) {
    newErrors.name = '姓名不能为空'
    isValid = false
  }

  if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    newErrors.phone = '请输入有效的手机号'
    isValid = false
  }

  if (!formData.value.age || formData.value.age < 3 || formData.value.age > 18) {
    newErrors.age = '请输入3-18岁的有效年龄'
    isValid = false
  }

  errors.value = newErrors
  return isValid
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const res = await uniCloud.callFunction({
      name: 'submitFeedback',
      data: {
        ...formData.value,
        createTime: Date.now()
      }
    })

    if (res.result.code === 200) {
      uni.showConfirm({
        title: '提交成功',
        content: '感谢您的咨询,我们会尽快与您联系',
        success: function (res) {
          if (res.confirm) {
            uni.navigateBack()
          }
        }
      })
      // 清空表单
      formData.value = { name: '', phone: '', age: '', subject: '' }
    } else {
      throw new Error(res.result.msg)
    }
  } catch (e) {
    console.error('提交失败:', e)
    uni.showToast({ title: '提交失败，请重试', icon: 'none' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-container {
  padding: 30rpx;
  background: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-logo {
  width: 320rpx;
  height: 120rpx;
  margin: 40rpx 0;
}

.form-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.05);
  width: 100%;
  max-width: 700rpx;
}

.form-header {
  margin-bottom: 40rpx;
  text-align: center;
}

.title {
  font-size: 40rpx;
  font-weight: 600;
  color: #2A3F54;
  display: block;
  margin-bottom: 10rpx;
  letter-spacing: 2rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
}

.form-item {
  margin-bottom: 30rpx;
}

.label {
  display: block;
  font-size: 30rpx;
  color: #2A3F54;
  margin-bottom: 15rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 2rpx solid #eee;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.input.error {
  border-color: #ff4d4f;
}

.error-msg {
  color: #ff4d4f;
  font-size: 24rpx;
  margin-top: 10rpx;
  display: block;
}

.picker {
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  border: 2rpx solid #eee;
  border-radius: 12rpx;
  color: #333;
}

.placeholder {
  color: #999;
}

.submit-btn {
  margin-top: 50rpx;
  background: linear-gradient(135deg, #2A3F54, #3A5F7A);
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
  transition: all 0.3s;
}

.submit-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style> 