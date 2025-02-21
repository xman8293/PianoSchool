'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event
  const collection = db.collection('teachers')
  
  try {
    const res = await collection
      .field({
        name: true,
        avatar: true,
        brief: true,
        subject: true
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return {
      code: 200,
      data: res.data
    }
  } catch (e) {
    return {
      code: 500,
      message: '获取教师数据失败'
    }
  }
} 