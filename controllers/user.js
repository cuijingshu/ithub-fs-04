const user = require('../models/user')
const md5 = require('blueimp-md5')

exports.showSignin = (req, res) => {
  res.render('signin.html')
}

exports.signin = (req, res) => {
  res.send(JSON.stringify({
    foo: 'bar'
  }))
}

exports.showSignup = (req, res) => {
  res.render('signup.html')
}

exports.signup = (req, res) => {
  // 1. 接收表单提交的数据
  //    配置 body-parser 中间件解析表单 POST 请求体
  // 2. 验证数据的有效性
  //    普通数据校验
  //    业务数据校验
  // 3. 验证通过，持久化保存到数据库中
  // 4. 发送响应

  const body = req.body

  user.findByEmail(body.email, (err, ret) => {
    if (err) {
      return res.status(500).json({
        error: err.message // err 错误对象有一个 message 属性是具体的错误消息
      })
    }

    if (ret) {
      return res.status(200).json({
        code: 1,
        message: 'email exists'
      })
    }

    user.findByNickname(body.nickname, (err, ret) => {
      if (err) {
        return res.status(500).json({
          error: err.message // err 错误对象有一个 message 属性是具体的错误消息
        })
      }

      if (ret) {
        return res.status(200).json({
          code: 2,
          message: 'nickname exists'
        })
      }

      body.password = md5(body.password)

      user.save(body, (err, results) => {
        if (err) {
          return res.status(500).json({
            error: err.message // err 错误对象有一个 message 属性是具体的错误消息
          })
        }
        res.status(200).json({
          code: 0,
          message: 'success'
        })
      })
    })

    // res.status(200).json({
    //   code: 0,
    //   message: '注册成功'
    // })
  })
}

exports.signout = (req, res) => {
  res.send('post signout')
}
