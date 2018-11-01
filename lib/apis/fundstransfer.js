/**
 * Created by smaheshw on 7/8/17.
 */

module.exports = function(VDPClient) {
    return {
        pushFunds(receiver, sender, transaction) {

            //TODO - support optional or conditional parameters
            //TODO - better error handling

            return new Promise((resolve, reject) => {

                let today = new Date();
                let currentTime = today.toISOString().replace(/\..*$/, '');

                this.pushFundsRequest = {};
                this.pushFundsRequest.url = "visadirect/fundstransfer/v1/pushfundstransactions";

                this.pushFundsRequest.body = {
                    acquirerCountryCode: receiver.countryCode,
                    acquiringBin: receiver.acquiringBin,
                    amount: transaction.amount,
                    businessApplicationId: "AA",
                    cardAcceptor: {
                        name: receiver.name,
                        terminalId: "13655392",
                        idCode: "VMT200911026070",
                        address: {
                            state: receiver.state,
                            county: receiver.county,
                            country: receiver.countryCode,
                            zipCode: receiver.zipCode
                        }
                    },
                    localTransactionDateTime: currentTime,
                    recipientName: receiver.name,
                    recipientPrimaryAccountNumber: receiver.pan,
                    retrievalReferenceNumber: "412770451035",
                    senderAccountNumber: sender.accountNumber,
                    senderAddress: sender.address,
                    senderCity: sender.city,
                    senderCountryCode: sender.countryCode,
                    senderName: sender.name,
                    senderStateCode: sender.stateCode,
                    systemsTraceAuditNumber: "123456",
                    transactionCurrencyCode: transaction.currencyCode,
                    transactionIdentifier: transaction.identifier
                }

                VDPClient.doMutualAuthRequest(this.pushFundsRequest.url, {}, 'POST', this.pushFundsRequest.body)
                    .then(data => {
                        resolve(data);
                    }).catch(err => {
                    reject(err);
                });
            });

        }
    }
}
