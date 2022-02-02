module.exports = (req, res, next) => {
    if(req.session.user && req.session.user.role === "ROLE_ADMIN" || req.session.user && req.session.user.role === "ROLE_SUPER_ADMIN"){
      next()
    }else{
        res.redirect('/')
    }
}