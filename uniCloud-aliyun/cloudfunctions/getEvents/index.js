'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  console.log('=== 云函数版本 2.0.3 ===')
  const { page = 1, pageSize = 10 } = event
  const collection = db.collection('event')
  
  // 在云函数开头增加验证
  const collectionList = await db.listCollections()
  if (!collectionList.data.some(col => col.name === 'event')) {
    return { code: 404, message: '活动集合不存在' }
  }
  
  // 添加超时设置
  context.callbackWaitsForEmptyEventLoop = false
  const startTime = Date.now()
  
  try {
    // 获取总记录数用于分页
    const countResult = await collection.count()
    
    const res = await collection
      .field({
        id: true,
        title: true,
        time: true,
        image: true,
        brief: true,
        location: true,  // 新增地点字段
        status: true     // 新增活动状态
      })
      .orderBy("time","desc") // 改为按时间排序
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
    console.log('实际查询结果：', res);
    console.log('数据库连接状态:', db.command);
    console.log('集合是否存在:', await collection.count());
    console.log('数据库集合列表:', await db.listCollections());
    console.log('当前环境配置:', JSON.stringify(context.config));
    console.log('用户访问令牌:', context.getUniIdToken());
    console.log('物理服务器ID:', context.env.UNI_CLOUD_SERVER_ID)
    console.log('部署时间:', context.env.UNI_CLOUD_DEPLOY_TIME)

    return {
      code: 200,
      data: {
        list: res.data,
        total: countResult.total,
        hasMore: (page * pageSize) < countResult.total
      }
    }
  } catch (e) {
    console.error('云函数错误:', e)
    return {
      code: 500,
      message: '服务器繁忙，请稍后再试'
    }
  } finally {
    console.log('查询耗时:', Date.now() - startTime, 'ms')
  }
} 

