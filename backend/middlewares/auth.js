const { getUser } = require("../services/auth")


// async function restrictToLoggedinUserOnly(req, res, next) {
//     const uuid = req.cookies?.uuid;//retrive value from web browser cookie or yo can say token which is born from the jwt and we set it in to our brwsr cookies.
    
//     if (!uuid) return res.redirect('/signin')
    
//     const user = getUser(uuid)

//     if (!user) return res.redirect('/signin')
//     req.user = user;

//     next()

// }


// async function checkAuth(req, res, next) {
//     const uuid = req.cookies?.uuid;//retrive value from web browser cookie
//     const user = getUser(uuid)
//     req.user = user;
//     next()
    
// }

 function checkForAunthentication(req, res, next) {
    const uuid = req.cookies?.uuid;//retrive value from web browser cookie or yo can say token which is born from the jwt and we set it in to our brwsr cookies.    
    req.user = null;
    if (!uuid)  { return next(); }
    const user = getUser(uuid)
    if (!user) {return next()}
    req.user = user;
    return next()
    
}

function restrictTO(roles=[""]) {  
    return function name(req, res, next) {
        if (!req.user) {return res.redirect('/signin') }
        if (!roles.includes(req.user.role)) { return res.send("You are Unauthorized") }
        return next()  
    }  
}

module.exports = {
    checkForAunthentication,
    restrictTO
}