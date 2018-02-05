const user = require('../models/user')
const md5 = require('blueimp-md5')

exports.showSignin = (req, res, next) => {
  res.render('signin.html')
}

exports.signin = (req, res, next) => {
  // 1. 获取表单 POST 提交数据
  // 2. 普通数据验证
  // 3. 业务数据验证
  // 4. 验证通过，使用 Session 存储会话标识
  // 5. 发送响应
  const body = req.body

  user.findByEmail(body.email, (err, ret) => {
    if (err) {
      // return res.status(500).json({
      //   error: err.message // err 错误对象有一个 message 属性是具体的错误消息
      // })

      // 传参的 next 方法会自动向后匹配到具有 4 个参数的应用程序处理级别中间
      return next(err)
    }

    // 如果用户不存在
    if (!ret) {
      return res.status(200).json({
        code: 1,
        message: 'user not exists'
      })
    }

    // 校验密码是否正确
    if (md5(body.password) !== ret.password) {
      return res.status(200).json({
        code: 2,
        message: 'password invalid'
      })
    }

    // 使用 Session 存储用户登陆状态
    req.session.user = ret

    res.status(200).json({
      code: 0,
      message: 'success'
    })
  })
}

exports.showSignup = (req, res, next) => {
  res.render('signup.html')
}

exports.signup = (req, res, next) => {
  // 1. 接收表单提交的数据
  //    配置 body-parser 中间件解析表单 POST 请求体
  // 2. 验证数据的有效性
  //    普通数据校验
  //    业务数据校验
  // 3. 验证通过，持久化保存到数据库中
  // 4. 发送响应

  const body = req.body

  // 校验邮箱是否被占用
  user.findByEmail(body.email, (err, ret) => {
    if (err) {
      return next(err)
    }

    if (ret) {
      return res.status(200).json({
        code: 1,
        message: 'email exists'
      })
    }

    // 校验昵称是否被占用
    user.findByNickname(body.nickname, (err, ret) => {
      if (err) {
        return next(err)
      }

      if (ret) {
        return res.status(200).json({
          code: 2,
          message: 'nickname exists'
        })
      }

      // md5 加密处理
      body.password = md5(body.password)

      // 持久化存储用户信息
      user.save(body, (err, results) => {
        if (err) {
          return next(err)
        }

        // 注册即登陆，使用 Session 保存登陆状态
        req.session.user = {
          ...body,
          id: results.insertId
        }

        res.status(200).json({
          code: 0,
          message: 'success'
        })
      })
    })
  })
}

exports.signout = (req, res, next) => {
  // 清除 Session
  delete req.session.user

  // 重定向到登陆页
  res.redirect('/signin')
}
