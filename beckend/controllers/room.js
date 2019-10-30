const Room = require('../models').room

//GET ALL ROOM
exports.index = (req, res) =>{
    Room.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        res.send({
            message: "Error Cant Ger Room",
            err
        })
    })
}

//PUSH / CREATE A ROOM 
exports.store = (req, res) => {
    const name = req.body.name
    Room.create({
        name,
        is_booked: false
    })
    .then(function(result){
        res.send({
            result,
            message: `Room has Created with name ${result.name}`
        })
    })
    .catch(function(err){
        res.send({
            message: "Error cant create a room",
            err
        })
    })
}

//Update Room By Id
exports.update = (req, res) => {
    const id = req.params.id
    const name = req.body.name
    Room.update({
        name,
        is_booked: false
    },
    {
        where: {id}
    })
    .then(function(result){
        res.send({
            name,
            message: `Room with id ${id} has be updated`
        })
    })
    .catch(function(err){
        res.send({
            message: `Error Update room with id ${id}`,
            err
        })
    })
}