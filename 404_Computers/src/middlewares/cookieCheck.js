module.exports = function (req, res, next) {
    if(req.cookies.user404){
        req.session.user = req.cookies.user404;
        res.locals.user = req.session.user;
    }
    next();
}