const express = require('express')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const {v4: uuidv4} = require('uuid')

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET response from researcher');
    req.json({
        message: 'It works'
    })
})



