const User = require('../models').user
const multer = require('multer');
const path = require('path');

exports.getDataUser = (req, res) => {
    const id = req.params.userId
    User.findOne({
        where: { id }
    })
        .then(function (result) {
            res.send({
                name: result.name,
                image: result.image
            })
        })
        .catch(function (err) {
            res.send({
                error: true,
                message: "Can't Find User",
                err
            })
        })
}


// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.user.userId + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('users');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

//Update User
exports.updateDataUser = (req, res) => {
    const id = req.user.userId
    upload(req, res, (err) => {
        if (err) {
            res.send({
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.send({
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.send({
                    msg: 'File Uploaded!',
                    dest: req.file.destination,
                })
                User.update({
                    image: req.file.path,
                    name: req.body.name,
                    updateAt: new Date()
                },
                    {
                        where: { id }
                    })
                    .then(function (result) {
                        console.log(result)
                        res.send({
                            message: "Succes"
                        })
                    })
                    .catch(function(err){
                        res.send({
                            message: "Error"
                        })
                    })
            }
        }
    })
}