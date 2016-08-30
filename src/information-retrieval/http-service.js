var RetrievalProvider = require('./retrieval-provider');
var request = require('request');
var _ = require('underscore');

module.exports = class extends RetrievalProvider {
    constructor(options) {
        super()
    }

    getRelationships(addresses) {
        var tasks = [];

        addresses.forEach((address) =>  tasks.push(this._getRelationship(address)));


        return Promise.all(tasks)
                      .then(results => {
                          return _.filter(results, x => x != null)
                      })
    }

    _getRelationship(address) {
        return new Promise((resolve, reject) => {
            var url = `http://${address}:11111/status`;


            request(url, { timeout: 5000 }, (error, response, body) =>  {
                if(error && (error.code === 'ETIMEDOUT' || error.code == 'ECONNREFUSED')) {
                    return resolve(null)
                }

                if(error || response.statusCode !== 200) {
                    return reject(error)
                }

                resolve(JSON.parse(body));
            })
        });
    }
};