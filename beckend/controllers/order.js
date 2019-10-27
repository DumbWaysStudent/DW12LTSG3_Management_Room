const Order = require('./../models').order
const Room = require('./../models').room
const Customer = require('./../models').customer
exports.index = (req, res) => {
    Room.findAll({
        include: [{
            model: Order,
            required: false,
        },
        {
            model: Customer,
            require: false
        }],
    })
        .then(function (resultRoom) {
            res.send(resultRoom)
        })
        .catch(function (err) {
            res.send({
                message: "Error",
                err
            })
        })
}