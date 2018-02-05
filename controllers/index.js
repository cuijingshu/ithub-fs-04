exports.showIndex = (req, res, next) => {
  res.render('index.html', {
    user: req.session.user
  })
}
