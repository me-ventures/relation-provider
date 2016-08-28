var assert = require('chai').assert;
var sut = require('./../../index');

describe("Relationship provider test", function() {
    describe("Automatic initialization test", function() {
        it("Should create default instance",function() {
            assert.equal(typeof sut, 'object')
        });

        it("Should create default instance with kubernetes location provider",function() {
            assert.equal(typeof sut.locationProvider, 'object')
        })
    });
});