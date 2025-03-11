module.exports = (req, res, next) => {
    if(req.session.user){ 
        if(req.session.user.role === "user"){
            next()
        }else{
           return res.status(302).redirect("/")
        }
    }else{
        return res.status(302).redirect("/")
     }
    }