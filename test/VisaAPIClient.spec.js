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