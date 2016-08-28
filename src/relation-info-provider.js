var locationProviderFactory = require('./location-provider/location-provider-factory');
var retrievalProviderFactory = require('./information-retrieval/retrieval-provider-factory');


module.exports = class {

    constructor() {

    }

    getRelations() {
        return this.locationProvider.getLocations()
                    .then((addresses) => this.retrievalProvider.getRelationships(addresses))
    }

    /**
     * Set the locationprovider that should be used. Can be a string or a object that adheres to the location provider
     * interface.
     *
     * @param name | object
     * @param options
     */
    setLocationProvider( name, options ) {
        if(typeof name === 'object') {
            this.locationProvider = name;
        }

        this.locationProvider = locationProviderFactory.create(name, options);
    }

    setRetrievalProvider(name, options) {
        this.retrievalProvider = retrievalProviderFactory.create(name, options)
    }

};