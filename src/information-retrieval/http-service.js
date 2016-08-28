var RetrievalProvider = require('./retrieval-provider');
var request = require('request');

module.exports = class extends RetrievalProvider {
    constructor(options) {
        super()
    }

    getRelationships(addresses) {
        var tasks = [];

        addresses.forEach((address) =>  tasks.push(this._getRelationship(address)));


        return Promise.all(tasks)
    }

    _getRelationship(address) {
        return new Promise((resolve, reject) => {
            var url = `http://${address}:11111/status`;


            request(url, (error, response, body) =>  {
                if(error || response.statusCode !== 200) {
                    reject(error)
                }

                resolve(JSON.parse(body));
            })
        });
    }
};