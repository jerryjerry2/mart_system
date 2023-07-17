const con = require('../config/db');
const jwt = require('jsonwebtoken');



const signup_get = (req, res) => {
    res.render('./auth/register');
};

const signup_post = (req, res) => {
    console.log(req.body);
    let body = req.body;
    let name = body.firstname + ' ' + body.lastname;
    let myarr = [name, body.password, body.email,'','','','',''];
    let sql = 'INSERT INTO `user`(`name`, `password`, `email`, `phone`, `avarta`, `addr`, `role`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('login');
        }
    })
}

const signin_get = (req, res) => {
    res.render('./auth/login');
}

const signin_post = (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    con.query('select * from user where email = ? and password = ?', [username, password] ,(err, result) => {
        if(err){
            console.log(err);
        }else{
            const user = result.find((x) => (x.email === username && x.password === password));
            if(user){
                const token = createToken(user.id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 *60 * 1000});
                res.redirect('/');
            }else{
                res.redirect('/login');
            }
        }
    })
}

const createToken = (id) => {
    return jwt.sign({id}, 'ant secret', {
        expiresIn: 3 * 24 * 60 *60
    })
}

const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/');
}

module.exports = {
    signup_get,
    signup_post,
    signin_get,
    signin_post,
    logout
}

