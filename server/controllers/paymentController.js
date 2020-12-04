import request from 'request';

// Add your credentials:
// Add your client ID and secret
var CLIENT =
    'AfeOK4gxWmZDIgg32Uii6QpAXMIuwHAldROqeg7XcAw6Rkud0OaxkyU54US-g3SDu7EGNumP4TWCH-co';
var SECRET =
    'EGsEb9pETNHHLYUVTiMkKZoeZzhcvUgxowhDIzOszfKphvE5fmPbd_8mh_tQHal21fU6I684IrDxSDhN';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

class Payment {
    static async setUpPayment(req, res) {
        console.log('Reacted');
        request.post(PAYPAL_API + '/v1/payments/payment', {
            auth: {
                user: CLIENT,
                pass: SECRET
            },
            body: {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                transactions: [{
                    amount: {
                        total: '5.99',
                        currency: 'USD'
                    }
                }],
                redirect_urls: {
                    return_url: 'https://example.com',
                    cancel_url: 'https://example.com'
                }
            },
            json: true
        }, function(err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            // 3. Return the payment ID to the client
            res.json({
                id: response.body.id
            });
        });
    }

    static async finalizePayment(req, res) {
        // 2. Get the payment ID and the payer ID from the request body.
        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;
        // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
        request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
            '/execute', {
                auth: {
                    user: CLIENT,
                    pass: SECRET
                },
                body: {
                    payer_id: payerID,
                    transactions: [{
                        amount: {
                            total: '10.99',
                            currency: 'USD'
                        }
                    }]
                },
                json: true
            },
            function(err, response) {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                // 4. Return a success response to the client
                res.json({
                    status: 'success'
                });
            });
    }
}

export default Payment;