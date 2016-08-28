module.exports = {
    create: create
};


function create(name, config) {
    var provider;

    switch (name) {
        case "http-service":
            var Provider = require('./http-service');
            break;

        default:
            throw Error(`${name} retrieval provider could not be found`)
    }

    return new Provider(config);
}
