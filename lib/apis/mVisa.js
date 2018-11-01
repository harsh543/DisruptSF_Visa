/**
 * Created by smaheshw on 2/8/17.
 */

module.exports = function(VDPClient) {
    return {
        payMerchant(merchant, sender, transaction) {

            //TODO - support optional or conditional parameters
            //TODO - better error handling

            return new Promise((resolve, reject) => {

                let today = new Date();
                let currentTime = today.toISOString().replace(/\..*$/, '');

                this.merchantPaymentRequest = {};
                this.merchantPaymentRequest.url = "visadirect/mvisa/v1/merchantpushpayments";

                this.merchantPaymentRequest.body = {
                    acquirerCountryCode: merchant.countryCode,
                    acquiringBin: merchant.acquiringBin,
                    amount: transaction.amount,
                    businessApplicationId: "MP",
                    cardAcceptor: {
                        address: {
                            city: merchant.city,
                            country: merchant.countryCode
                        },
                        idCode: "IDCODE_123",
                        name: merchant.name
                    },
                    localTransactionDateTime: currentTime,
                    purchaseIdentifier: {
                        referenceNumber: "REF_123",
                        type: "1"
                    },
                    recipientPrimaryAccountNumber: merchant.pan,
                    retrievalReferenceNumber: "412770451035",
                    secondaryId: "SEC_123",
                    senderAccountNumber: sender.accountNumber,
                    senderName: sender.name,
                    systemsTraceAuditNumber: "123456",
                    transactionCurrencyCode: transaction.currencyCode
                }

                VDPClient.doMutualAuthRequest(this.merchantPaymentRequest.url, {}, 'POST', this.merchantPaymentRequest.body)
                    .then(data => {
                        resolve(data);
                    }).catch(err => {
                    reject(err);
                });
            });

        }
    }
}
