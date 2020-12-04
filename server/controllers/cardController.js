import braintree from 'braintree';

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '5wzrbycyb39dsvj6',
    publicKey: '8b5pcw8rj99sf7ys',
    privateKey: '0eaebbe81e3468a59ddc763ee18ec567'
});
class CardPayment {
    static async initializeBraintree(req, res) {
        try {
            let token = await gateway.clientToken.generate({ customerId: aCustomerId }).clientToken;
            res.send({ data: token })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when registering the file',
                error: error.message
            });
        }
    }

    static async confirmBraintree(req, res) {
        try {
            let transactionResponse = await gateway.transaction.sale({
                amount: '5.00',
                paymentMethodNonce: 'nonce-from-the-client',
                options: {
                    submitForSettlement: true
                }
            });

            console.log(transactionResponse);
            // res.send({ data: transactionResponse })

            if (transactionResponse) {
                return res.status(200).json({
                    status: 200,
                    message: 'transaction is submitted for settlement'
                })
            }
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when registering the file',
                error: error.message
            });
        }
    }
}

export default CardPayment;