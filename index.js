module.exports = {
    create: create
};

var _ = require('underscore');
var InfoProvider = require('./src/relation-info-provider');

var relationInfoProvider = new InfoProvider();
relationInfoProvider.setLocationProvider("kubernetes");
relationInfoProvider.setRetrievalProvider("http-service");

module.exports = _.extend(relationInfoProvider, module.exports);

function create() {
    return new InfoProvider();
}