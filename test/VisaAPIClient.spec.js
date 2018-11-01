/**
 * Created by smaheshw on 14/6/17.
 */
'use strict'

const chai = require('chai')
const assert = chai.assert
const VisaAPIClient = require('../lib/VisaAPIClient')
const config = require('../config/configuration.json')

describe('VisaAPIClient is initialized properly', () => {
    it('Validation for mutualAuthCredentials', () => {
        try {
            new VisaAPIClient()
        } catch (e) {
            assert.equal(e.message, 'one of `mutualAuthCredentials` and `XPayTokenCredentials` is mandatory')
        }

        try {
            new VisaAPIClient({
                mutualAuthCredentials: {
                }
            })
        } catch (e) {
            assert.equal(e.message, '`userId` is mandatory in mutualAuthCredentials')
        }

        try {
            new VisaAPIClient({
                mutualAuthCredentials: {
                    userId: config.userId
                }
            })
        } catch (e) {
            assert.equal(e.message, '`password` is mandatory in mutualAuthCredentials')
        }

        try {
            new VisaAPIClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password
                }
            })
        } catch (e) {
            assert.equal(e.message, '`keyFile` is mandatory in mutualAuthCredentials')
        }

        try {
            new VisaAPIClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password,
                    keyFile: config.key
                }
            })
        } catch (e) {
            assert.equal(e.message, '`certificateFile` is mandatory in mutualAuthCredentials')
        }

    })

    it('Validation for visaUrl', () => {

        try {
            new VisaAPIClient({
                mutualAuthCredentials: {
                    userId: config.userId,
                    password: config.password,
                    keyFile: config.key,
                    certificateFile: config.cert
                }
            })
        } catch (e) {
            assert.equal(e.message, '`visaUrl` is mandatory')
        }

        try {
            new VisaAPIClient({
                XPayTokenCredentials: {
                    sharedSecret: config.sharedSecret,
                }
            })
        } catch (e) {
            assert.equal(e.message, '`visaUrl` is mandatory')
        }

    })

    it('instance should initialize', () => {
        let instance = new VisaAPIClient({
            mutualAuthCredentials: {
                userId: config.userId,
                password: config.password,
                keyFile: config.key,
                certificateFile: config.cert
            },
            XPayTokenCredentials: {
                sharedSecret: config.sharedSecret,
            },
            visaUrl: config.visaUrl
        })

        assert.equal(instance.VDPClient.userId, config.userId)
        assert.equal(instance.VDPClient.password, config.password)
        assert.equal(instance.VDPClient.keyFile, config.key)
        assert.equal(instance.VDPClient.certificateFile, config.cert)
        assert.equal(instance.VDPClient.sharedSecret, config.sharedSecret)
        assert.equal(instance.VDPClient.visaUrl, config.visaUrl)
    })

})


describe('VisaAPIClient Helper method', () => {

    it('Get xPayToken is returning xPayToken', () => {
        let instance = new VisaAPIClient({
            mutualAuthCredentials: {
                userId: config.userId,
                password: config.password,
                keyFile: config.key,
                certificateFile: config.cert
            },
            XPayTokenCredentials: {
                sharedSecret: config.sharedSecret,
            },
            visaUrl: config.visaUrl
        })

        assert.include(instance.VDPClient.getXPayToken('helloworld',null,null), 'xv2:')
    })

})
describe('PaymentProcess Helper method', () => {
var request = require('request');
const fs = require('fs');

var req = request.defaults();
var userId = USER_ID
var password = PASSWD
var certfile = "/Users/fei/Downloads/cert.pem"
var keyfile = "/Users/fei/Downloads/key_66053e71-eabc-4489-9530-fca3209cac87.pem"
var data =
{
"senderEnterpriseId": "788890",
"receiverEnterpriseId": "V-USA-EUR-20990373-100900001-008",
"invoiceDetails": [
{
"invoiceNumber": "54trtrt",
"poNumber": "125552",
"paymentAmount": 500,
"paymentCurrencyIsoCode": 840,
"notes": "For Coffee",
"partialPayment": false
}
]
}
req.post({    
	uri : "https://sandbox.api.visa.com/visab2bconnect/v1/payments",    
	key: fs.readFileSync(keyfile),    
	cert: fs.readFileSync(certfile),    
	headers: {      
		'Content-Type' : 'application/json',      
		'Accept' : 'application/json',      
		'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64')    },   
		 body: JSON.stringify(data)
	}, function(error, response, body) { 
	   console.log(response.body);
	});
var request = require("request");

var options = { method: 'POST',
  url: 'https://api.globaldatacompany.com/verifications/v1/verify' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
 })
