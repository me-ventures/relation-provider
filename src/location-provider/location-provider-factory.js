module.exports = {
    create: create
};


function create(name, config) {
    var provider;

    switch (name) {
        case "kubernetes":
            var Provider = require('./kubernetes');
            break;

        default:
            throw Error(`${name} location provider could not be found`)
    }

    return new Provider(config);
}
