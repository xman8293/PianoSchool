'use strict';
const db = uniCloud.database();

exports.main = async (event) => {
  try {
    const collection = db.collection('feedback');
    const result = await collection.add(event);
    
    return {
      code: 200,
      msg: '提交成功',
      data: result
    };
  } catch (e) {
    return {
      code: 500,
      msg: e.message
    };
  }
}; 