const topic = require('../models/topic')
const topicCategory = require('../models/topic-category')

exports.showIndex = (req, res, next) => {
  // req.query 获取查询字符串数据
  // req.parmas 获取动态路径参数
  // req.body   获取表单请求体数据
  let {categoryId} = req.query
  categoryId = parseInt(categoryId) // 将字符串类型的 id 转成数字

  if (!categoryId) {
    topicCategory.findAll((err, topicCategories) => {
      if (err) {
        return next(err)
      }
      topic.findAll((err, topics) => {
        if (err) {
          return next(err)
        }
        res.render('index.html', {
          topics,
          topicCategories,
          categoryId
        })
      })
    })
  } else {
    // 查所有分类
    topicCategory.findAll((err, topicCategories) => {
      if (err) {
        return next(err)
      }

      // 查询所有话题
      topic.findByCategoryId(categoryId, (err, topics) => {
        if (err) {
          return next(err)
        }
        res.render('index.html', {
          topics,
          topicCategories,
          categoryId
        })
      })
    })
  }
}
