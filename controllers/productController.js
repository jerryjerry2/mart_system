const con = require('../config/db');

const getAll = (req, res) => {
    let sql = 'select product.id, product.name, product.price, product.amount, product.cate_id, category.name as cate_name,  product.discount,  product.income_date, product.expired_date from product INNER join category on product.cate_id = category.id';
    con.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.render('./products/list-product', {result});
        }
    })
    
}

const create_get = (req, res) => {
    con.query('select id, name from category', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.render('./products/create-product', {result});
        }
    })
    
}

const create_post = (req, res) => {
    console.log(req.body)
    const body = req.body;
    const sql = 'INSERT INTO `product`( `name`, `price`, `description`, `cate_id`, `amount`, `discount`, `income_date`, `expired_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const myarr = [body.name, body.price, body.description, body.category, body.amount, body.discount, body.income_date, body.expired_date];
    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/product');
        }
    }) 
}

const edit_get = (req, res) => {
    con.query('select * from product where id = ?', [req.params.id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.render('products/edit-product', {result});
        }
    }) 
}

const edit_post = (req, res) => {
    
}

module.exports = {
    getAll,
    create_get,
    create_post,
    edit_get,
    edit_post
}