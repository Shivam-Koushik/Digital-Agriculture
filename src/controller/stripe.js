require("dotenv").config()
const stripe = require("stripe")(process.env.Secret_key)
const stripePayment = async function (req, res) {
    try {
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'SHIVAM KOUSHIK',
            address: {
                city: 'Meerut',
                state: 'Up',
                country: 'India',
            }
        })
            .then((customer) => {

                return stripe.charges.create({
                    amount: 10000,
                    description: 'Fertilizers',
                    currency: 'INR',
                    customer: customer.id
                });
            })
            .then((charge) => {
                res.send("Success")
            })
            .catch((err) => {
                res.send(err.message)
            });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.stripePayment = stripePayment