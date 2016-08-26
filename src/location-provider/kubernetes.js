var LocationProvider = require('./location-provider');
var request = require('request');

module.exports = class extends LocationProvider {
    constructor(options) {
        super();
        this.options = options;
    }

    getLocations() {
        var masterLocation = this.options.master;

        return this._getDeployments(masterLocation)

    }

    _getDeployments(master){
        return new Promise((resolve, reject) => {
            var deploymentsEndpoint = "/apis/extensions/v1beta1/deployments";

            var url =  master + deploymentsEndpoint;

            request(url, (error, response, body) =>  {
                if(error) {
                    return reject(error)
                }

                var content = JSON.parse(body);

                if(content.items) {
                    return resolve(content.items)
                }

                return reject("Deployments does not contain an items field")
            })

        });
    }
};