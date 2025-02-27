'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  console.log('=== 云函数版本 2.0.3 ===')
  const { 
    page = 1, 
    pageSize = 10,
    status = '' // 可选状态过滤
  } = event
  
  // 添加超时设置
  context.callbackWaitsForEmptyEventLoop = false
  const startTime = Date.now()
  
  try {
    const collection = db.collection('event')
    const where = {}
    
    if(status) {
      where.status = status
    }

    const countResult = await collection.where(where).count()
    const res = await collection
      .where(where)
      .orderBy('start_time', 'asc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get({
        getCount: true,
        getOne: false,
        cache: false,  // 新增禁用缓存
        timeout: 5000  // 设置5秒超时
      })

    console.log('当前查询条件：', {
      collection: 'event',
      page: event.page,
      pageSize: event.pageSize
    });
 

    return {
      code: 200,
      data: {
        list: res.data,
        total: countResult.total,
        page,
        pageSize
      },
      message: 'success'
    }
  } catch (error) {
    // 处理集合不存在的情况
    if (error.errCode === 'DATABASE_COLLECTION_NOT_EXIST') {
      return { code: 404, message: '活动集合不存在' }
    }
    console.error('云函数错误:', error)
    return {
      code: 500,
      data: null,
      message: error.message || '服务内部错误'
    }
  } finally {
    console.log('查询耗时:', Date.now() - startTime, 'ms')
  }
} 

