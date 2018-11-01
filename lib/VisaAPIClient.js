/**
 * Created by smaheshw on 28/7/17.
 */
const VDPClient = require('vdp-nodejs-client')

class VisaAPIClient {

    constructor(options = {}) {
        let { mutualAuthCredentials, XPayTokenCredentials, visaUrl} = options
        try {
            this.VDPClient = new VDPClient({
                mutualAuthCredentials : mutualAuthCredentials,
                XPayTokenCredentials : XPayTokenCredentials,
                visaUrl: visaUrl
            })
            if(this.VDPClient){
                this._addAPIs()
            }
        }
        catch (err){
            throw err;
        }

    }

    _addAPIs() {
        Object.assign(this, {
            mvisa: require('./apis/mVisa')(this.VDPClient),
            fundstransfer: require('./apis/fundstransfer')(this.VDPClient)
        })
    }

}

module.exports = VisaAPIClient