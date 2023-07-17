const jwt = require('jsonwebtoken');
const con = require('../config/db');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'ant secret', (err, decodedToken) => {
            if(err){
                res.redirect('/login');
            }else{
                //console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'ant secret', (err, decodedToken) => {
            if(err){
                next();
            }else{
                //console.log(decodedToken);
                con.query('select * from user where id = ?', [decodedToken.id], (err, result) => {
                    if(err){
                        console.log(err);
                        res.locals.user = null;
                        next();
                    }else{
                        res.locals.user = result;
                        next();
                    }
                })
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }