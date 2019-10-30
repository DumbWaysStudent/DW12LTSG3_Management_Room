const Order = require('./../models').order
const Room = require('./../models').room
const Customer = require('./../models').customer
const moment = require('moment')
exports.index = (req, res) => {
    Room.findAll({
        include: [{
            model: Order,
            required: false,
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

exports.store = (req, res) => {
    const time = moment(req.body.order_end_time).add(req.body.duration, 'minutes')
    Order.create({
        room_id: req.body.room_id,
        customer_id: req.body.customer_id,
        is_done: false,
        duration: req.body.duration,
        order_end_time: time,
    })
        .then(function(result){
            res.send({
                data: result,
                message: `Success Checkin with customer id ${req.body.customer_id}`
            })
            Room.update({
                is_booked: true,
            },
            {
                where: {id: req.body.room_id}
            })
        })
        .catch(function(err){
            res.send({
                message: "Error",
                err
            })
        })
}

exports.update = (req, res) => {
    const id =  req.body.room_id
    Order.destroy({
        where: {room_id: id}
    })
        .then(function(result){
            res.send({
                message: `Delete Orders Id ${id} has be Updated`
            })
            Room.update({
                is_booked: false,
            },
            {
                where: {id: req.body.room_id}
            })
        })
        .catch(function(err){
            res.send({
                message: `Cannot Update Orders id ${id}`,
                err
            })
        })
}