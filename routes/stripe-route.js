const express = require('express')

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { v4: uuidv4 } = require('uuid')

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET response from researcher');
    console.log(process.env.STRIPE_SECRET_KEY);
    res.json({
        message: 'It works'
    })
})

router.post('/pay', async (req, res, next) => {
    console.log(req.body.token);
    const { token, amount } = req.body;
    const idempotencyKey = uuidv4();

    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token
        })

        const result = await stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, { idempotencyKey })

        return res.status(200).json(result)

    }
    catch (err) {
        console.log(err);
    }

})

module.exports = router
