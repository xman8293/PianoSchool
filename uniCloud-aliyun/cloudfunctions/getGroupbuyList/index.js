'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 设置超时时间为10秒
  const startTime = Date.now()
  try {
    const { 
      page = 1, 
      pageSize = 10,
      orderBy = 'sort'
    } = event
    
    const collection = db.collection('groupbuy')
    
    // 获取总数
    const countRes = await collection.count()
    
    // 获取数据
    const dataRes = await collection
      .orderBy(orderBy, 'asc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get({
        timeout: 10000 // 设置数据库查询超时
      })

    return {
      code: 200,
      data: {
        list: dataRes.data,
        total: countRes.total,
        page,
        pageSize
      }
    }
  } catch (e) {
    console.error(`执行耗时：${Date.now() - startTime}ms`)
    return {
      code: 500,
      msg: e.message
    }
  }
} 