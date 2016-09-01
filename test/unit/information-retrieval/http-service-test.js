/**
 * Created by maikel on 28.08.16.
 */
var assert = require('chai').assert;
var httpService = require('./../../../src/information-retrieval/http-service');
var retrievalProvider = require('./../../../src/information-retrieval/retrieval-provider');
var nock = require('nock');

describe("HTTP-server retrieval test", function(){

    it("should instantiate valid retrieval provider when instantiated", function(){
        var provider = new httpService({});

        assert.isObject(provider);
        assert.instanceOf(provider, retrievalProvider)
    });

    it("should return a list of relationships when called", function(done){
        var provider = new httpService({});

        var podEndpoint1 = nock('http://10.0.0.1:11111')
            .get('/status')
            .reply(200, {
                "service": {
                    "name": "historic-price-service"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "shared": true,
                            "queueName": "historic-price-service.product-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "historic-price-service",
                            "topic": "price-updated",
                            "schema": ""
                        }
                    ]
                }
            });

        var podEndpoint2 = nock('http://10.0.0.3:11111')
            .get('/status')
            .reply(200, {
                "service": {
                    "name": "product-aggregate"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-identification-to-data-associator",
                            "topic": "data-identified",
                            "shared": true,
                            "queueName": "product-aggregate.data-identified",
                            "schema": ""
                        },
                        {
                            "namespace": "product-identification",
                            "topic": "identification-updated",
                            "shared": true,
                            "queueName": "product-aggregate.identification-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "schema": ""
                        }
                    ]
                }
            });


        var addresses = [
            "10.0.0.1",
            "10.0.0.3"
        ];

        provider.getRelationships(addresses)
            .then(result => {
                assert.isArray(result);
                assert.equal(result.length, 2);

                assert.isDefined(result.find((item) => item.service.name === 'historic-price-service'));
                assert.isDefined(result.find((item) => item.service.name === 'product-aggregate'));


                assert.isTrue(podEndpoint2.isDone());
                assert.isTrue(podEndpoint1.isDone());

                done()
            })
            .catch(console.error)
    })

    it("should not throw exception when called with undefined address", function(done){
        var provider = new httpService({});

        var podEndpoint1 = nock('http://10.0.0.1:11111')
            .get('/status')
            .reply(200, {
                "service": {
                    "name": "historic-price-service"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "shared": true,
                            "queueName": "historic-price-service.product-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "historic-price-service",
                            "topic": "price-updated",
                            "schema": ""
                        }
                    ]
                }
            });

        var podEndpoint2 = nock('http://10.0.0.3:11111')
            .get('/status')
            .reply(200, {
                "service": {
                    "name": "product-aggregate"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-identification-to-data-associator",
                            "topic": "data-identified",
                            "shared": true,
                            "queueName": "product-aggregate.data-identified",
                            "schema": ""
                        },
                        {
                            "namespace": "product-identification",
                            "topic": "identification-updated",
                            "shared": true,
                            "queueName": "product-aggregate.identification-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "schema": ""
                        }
                    ]
                }
            });


        var addresses = [
            "10.0.0.1",
            "10.0.0.3",
            undefined
        ];

        provider.getRelationships(addresses)
            .then(result => {
                assert.isArray(result);
                assert.equal(result.length, 2);

                assert.isDefined(result.find((item) => item.service.name === 'historic-price-service'));
                assert.isDefined(result.find((item) => item.service.name === 'product-aggregate'));


                assert.isTrue(podEndpoint2.isDone());
                assert.isTrue(podEndpoint1.isDone());

                done()
            })
            .catch(console.error)
    })

    it("should not fail when a service time-outs", function(done){
        this.timeout(6000);
    
        var provider = new httpService({});

        var podEndpoint1 = nock('http://10.0.0.1:11111')
            .get('/status')
            .reply(200, {
                "service": {
                    "name": "historic-price-service"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "shared": true,
                            "queueName": "historic-price-service.product-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "historic-price-service",
                            "topic": "price-updated",
                            "schema": ""
                        }
                    ]
                }
            });

        var podEndpoint2 = nock('http://10.0.0.3:11111')
            .get('/status')
            .delay(15000)
            .reply(200, {
                "service": {
                    "name": "product-aggregate"
                },
                "events": {
                    "consume": [
                        {
                            "namespace": "product-identification-to-data-associator",
                            "topic": "data-identified",
                            "shared": true,
                            "queueName": "product-aggregate.data-identified",
                            "schema": ""
                        },
                        {
                            "namespace": "product-identification",
                            "topic": "identification-updated",
                            "shared": true,
                            "queueName": "product-aggregate.identification-updated",
                            "schema": ""
                        }
                    ],
                    "publish": [
                        {
                            "namespace": "product-aggregate",
                            "topic": "product-updated",
                            "schema": ""
                        }
                    ]
                }
            });


        var addresses = [
            "10.0.0.1",
            "10.0.0.3"
        ];

        provider.getRelationships(addresses)
            .then(result => {
                assert.isArray(result);
                assert.equal(result.length, 1);

                assert.isDefined(result.find((item) => item.service.name === 'historic-price-service'));

                assert.isTrue(podEndpoint1.isDone());

                done()
            })
            .catch(err => {
                console.error(err);
            })
    })
});