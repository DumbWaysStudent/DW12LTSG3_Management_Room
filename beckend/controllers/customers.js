const Customers = require('./../models').customer
const multer = require('multer')
const path = require('path')

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
}).single('image');

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

//SELECT ALL CUSTOMER
exports.index = (req, res) => {
    Customers.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            res.send({
                message: "Error cant Find Database",
                err
            })
        })
}

//POST CUSTOMER
exports.store = (req, res) => {
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
                Customers.create({
                    name: req.body.name,
                    id_card: req.body.id_card,
                    phone_number: req.body.phone_number,
                    image: req.file.path,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .then(function (result) {
                        res.send(result)
                    })
                    .catch(function (err) {
                        res.send({
                            message: "Error cant Create Customer",
                            err
                        })
                    })
            }
        }
    })
}

//UPDATE CUSTOMER
exports.update = (req, res) => {
    const id = req.params.id
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
                Customers.update({
                    name: req.body.name,
                    id_card: req.body.id_card,
                    phone_number: req.body.phone_number,
                    image: req.file.path,
                    updatedAt: new Date()
                },
                    {
                        where: { id: req.params.id }
                    })
                    .then(function (result) {
                        res.send({
                            name: req.body.name,
                            id_card: req.body.id_card,
                            phone_number: req.body.phone_number,
                            image: req.file.path,
                            message: `Update Customers with id ${id} has Success`
                        })
                    })
                    .then(function (err) {
                        res.send({
                            message: `Cant Update Customers with id ${id}`
                        })
                    })
            }
        }
    })
}