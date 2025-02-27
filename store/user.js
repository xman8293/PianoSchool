import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    uid: uni.getStorageSync('uid') || null,
    hasLogin: uni.getStorageSync('hasLogin') || false
  }),
  actions: {
    login(userInfo) {
      this.uid = userInfo.uid
      this.hasLogin = true
      uni.setStorageSync('uid', userInfo.uid)
      uni.setStorageSync('hasLogin', true)
    },
    logout() {
      this.uid = null
      this.hasLogin = false
      uni.removeStorageSync('uid')
      uni.removeStorageSync('hasLogin')
    }
  }
}) 