const con = require('../config/db');
const fs = require('fs');

const getAll = (req, res) => {
    con.query('select * from category', (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.render('category/list-category', {result});
        }
    })
}

const create_get = (req, res) => {
    res.render('category/create-category');
}

const create_post = (req, res) => {
    let img = null;

    if(req.files){
        var timestamp = Date.now();
        var file = req.files.file;
        var filename = timestamp + file.name;
        

        file.mv('./public/uploads/' + filename, (err) => {
            if(err){
                console.log(err);
            }
        })
        img = filename;
    }

    const body = req.body;
    const sql = 'INSERT INTO `category`(`name`, `description`, `img`) VALUES (?, ? ,?)';
    const myarr = [body.name, body.des, img];
    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/category');
        }
    }) 
}

const deleteRow = (req, res) =>{
    con.query('delete from category where id = ?', [req.params.id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            fs.unlinkSync('public/uploads/' + req.params.img);
            res.redirect('/category');
        }
    })

}

const edit_get = (req, res) => {
    con.query('select * from category where id = ?', [req.params.id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.render('category/edit-category', {result});
        }
    }) 
}

const edit_post = (req, res) => {
    console.log(req.body);
    let body = req.body;
    let img = req.body.img;

    if(req.files){
        var timestamp = Date.now();
        var file = req.files.file;
        var filename = timestamp + file.name;
        
        file.mv('./public/uploads/' + filename, (err) => {
            if(err){
                console.log(err);
            }
        });

        fs.unlinkSync('public/uploads/' + img);
        img = filename;
    }

    const sql = 'UPDATE `category` SET `name`= ?, `description`= ?, `img`= ?  WHERE id = ?';
    const myarr = [body.name, body.des, img, body.id];
    con.query(sql, myarr, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/category');
        }
    });
}

module.exports = {
    getAll,
    create_get,
    create_post,
    deleteRow,
    edit_get,
    edit_post
}