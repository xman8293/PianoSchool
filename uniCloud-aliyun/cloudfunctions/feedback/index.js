'use strict';
const db = uniCloud.database();
const feedbackCollection = db.collection('feedback');

exports.main = async (event, context) => {
  try {
    // 参数验证
    if (!event.name || !event.contact || !event.content) {
      return {
        code: 400,
        message: '缺少必填参数'
      };
    }

    // 插入数据库
    const result = await feedbackCollection.add({
      name: event.name,
      contact: event.contact,
      content: event.content
    });

    return {
      code: 200,
      message: '反馈提交成功',
      data: result
    };
  } catch (e) {
    console.error('云函数执行错误:', e);
    return {
      code: 500,
      message: '服务器内部错误'
    };
  }
}; 