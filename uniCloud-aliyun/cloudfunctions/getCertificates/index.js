'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const { 
      page = 1, 
      pageSize = 10,
      orderBy = 'sort' // 默认排序字段
    } = event;
    
    const collection = db.collection('certificates');
    
    // 构建排序参数
    const orderParams = [];
    if(orderBy) {
      orderParams.push(orderBy, 'asc'); // 默认升序
    }

    // 获取总数
    const countResult = await collection.count();
    
    // 获取数据
    const res = await collection
      .orderBy(...orderParams)
      .skip((page - 1) * pageSize)
      .limit(pageSize) // 关键：使用传入的pageSize
      .get();

    return {
      code: 200,
      data: {
        list: res.data,
        total: countResult.total,
        page,
        pageSize
      }
    };
  } catch (e) {
    console.error('错误详情:', e);
    return {
      code: 500,
      msg: `排序参数错误: ${e.message}`
    };
  }
}; 
