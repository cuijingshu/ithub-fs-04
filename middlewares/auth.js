exports.checkLogin = function (req, res, next) {
  // 合理的做法应该是：
  //    同步请求 redirect
  //    异步请求 401 状态码

  if (!req.session.user) {
    // 判断是否是异步请求，如果是异步请求则发送一个 401 状态码
    const reqType = req.get('X-Requested-With') // 获取请求类型字段
    if (reqType && reqType === 'XMLHttpRequest') {
      return res.sendStatus(401)
    }

    // 否则就是同步请求，做重定向处理
    return res.redirect('/signin')
  }

  next()
}
