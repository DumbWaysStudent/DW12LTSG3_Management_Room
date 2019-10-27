require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 2050
const path = require('path')

//Body PArser
app.use(bodyParser.json())
//CKECKED
app.get('/', (req, res) => {
    res.send('Succes')
})

//MiddleWare
const { authenticated } = require('./middleware')

//API V2
const AuthController = require('./controllers/auth')
const RoomController = require('./controllers/room')
const CustomerController = require('./controllers/customers')
const OrderCustomerController = require('./controllers/order')

//API V2
app.group('/api/v2', (router) => {
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    //Room
    router.get('/rooms', authenticated, RoomController.index)
    router.post('/room', authenticated, RoomController.store)
    router.put('/room/:id', authenticated, RoomController.update)

    //Customer
    router.get('/customers', authenticated, CustomerController.index)
    router.post('/customer', authenticated, CustomerController.store)
    router.put('/customer/:id', authenticated, CustomerController.update)

    //Order
    router.get('/checkin', authenticated, OrderCustomerController.index)
})

//STATIC FILE
app.use("/public", express.static(path.join(__dirname, "public")))


app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});