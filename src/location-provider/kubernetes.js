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
                   .then(data => this._getPods(data, masterLocation))
                   .then(this._getAdresses)

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

    _getPods(deployments, master) {


        var tasks = [];

        deployments.forEach(pod => tasks.push(this._getPodInfo(pod, master)));

        return Promise.all(tasks)
                        .then(data => {
                            var pods = [];

                            data.forEach(pod => {
                                pods = pods.concat(pod)
                            });

                            return pods;
                        })
    }

    _getPodInfo(pod, masterlocation) {
        return new Promise((resolve, reject) => {
            var podsEndpoint = "/api/v1/namespaces/default/pods";


            var selector = pod.spec.selector.matchLabels;
            var query = [];

            for(var property in selector) {
                query.push(property + '=' + selector[property])
            }

            var queryString = "labelSelector=" + query.join(',');

            var url =  masterlocation + podsEndpoint + '?' + queryString;

            request(url, (error, response, body) =>  {
                if(error) {
                    return reject(error)
                }

                var content = JSON.parse(body);

                if(content.items) {
                    return resolve(content.items)
                }

                return reject("PodListing does not contain an items field")
            })
        })
    }

    _getAdresses(pods) {
        var adresses = [];

        pods.forEach(pod => {
           adresses.push(pod.status.podIP);
        });

        return adresses;
    }
};