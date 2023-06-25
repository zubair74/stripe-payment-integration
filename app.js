const express = require('express')
const cors = require('cors')

const stripeRoutes = require('./routes/stripe-route')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api/stripe/', stripeRoutes)

app.listen(5000, () => {
    console.log("listening on port 5000");
})