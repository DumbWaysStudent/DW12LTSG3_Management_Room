const Customers = require('./../models').customer

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
    Customers.create({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            message : "Error cant Create Customer",
            err
        })
    })
}

//UPDATE CUSTOMER
exports.update = (req, res) => {
    const id = req.params.id
    Customers.update({
        ...req.body,
        updatedAt: new Date()
    },
    {
        where: {id}    
    })
    .then(function(result){
        res.send({
            ...req.body,
            message: `Update Customers with id ${id} has Success`
        })
    })
    .then(function(err){
        res.send({
            message: `Cant Update Customers with id ${id}`
        })
    })
}