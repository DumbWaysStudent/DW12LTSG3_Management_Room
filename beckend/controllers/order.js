const Order = require('./../models').order
const Room = require('./../models').room

exports.index = (req, res) => {
    Room.findAll()
    .then(function(result){
        
    })
}