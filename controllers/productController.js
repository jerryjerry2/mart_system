
const getAll = (req, res) => {
    res.render('./products/list-product');
}

const create_get = (req, res) => {
    res.render('./products/create-product');
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

    }
}

module.exports = {
    getAll,
    create_get,
    create_post
}