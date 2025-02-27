// 价格格式化
export const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

// 时间格式化
export const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')}`
} 