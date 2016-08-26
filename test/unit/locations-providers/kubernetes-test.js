var assert = require('chai').assert;
var KubernetesProvider = require('./../../../src/location-provider/kubernetes');
var LocationProvider = require('./../../../src/location-provider/location-provider');
var nock = require('nock');

describe("Kubernetes location provider test", function(){

    it("should instantiate valid location provider when instantiated", function(){
        var provider = new KubernetesProvider({});

        assert.isObject(provider);
        assert.instanceOf(provider, LocationProvider)
    });

    it("should return list of ip addresses when getLocations is called", function(done){
        var provider = new KubernetesProvider({
            master: "http://localhost"
        });

        var deploymentsEndpoint = nock('http://localhost')
                                        .get('/apis/extensions/v1beta1/deployments')
                                        .reply(200, {
                                            "kind": "DeploymentList",
                                            "apiVersion": "extensions/v1beta1",
                                            "metadata": {
                                                "selfLink": "/apis/extensions/v1beta1/deployments",
                                                "resourceVersion": "1153985"
                                            },
                                            "items": [{
                                                "metadata": {
                                                    "name": "amazon-discovery-service",
                                                    "namespace": "default",
                                                    "selfLink": "/apis/extensions/v1beta1/namespaces/default/deployments/amazon-discovery-service",
                                                    "uid": "6584d136-4f5e-11e6-81f4-42010a840019",
                                                    "resourceVersion": "706761",
                                                    "generation": 2,
                                                    "creationTimestamp": "2016-07-21T16:15:53Z",
                                                    "labels": {
                                                        "name": "amazon-discovery-service"
                                                    },
                                                    "annotations": {
                                                        "deployment.kubernetes.io/revision": "1",
                                                        "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Deployment\",\"apiVersion\":\"extensions/v1beta1\",\"metadata\":{\"name\":\"amazon-discovery-service\",\"creationTimestamp\":null,\"labels\":{\"name\":\"amazon-discovery-service\"}},\"spec\":{\"replicas\":1,\"template\":{\"metadata\":{\"creationTimestamp\":null,\"labels\":{\"name\":\"amazon-discovery-service\"}},\"spec\":{\"containers\":[{\"name\":\"amazon-discovery-service\",\"image\":\"gcr.io/maikel-eva-ventures/amazon-discovery-service:7b293f3947624bfc139c69a7bda4f766397bf7a0\",\"ports\":[{\"name\":\"http\",\"containerPort\":8000}],\"resources\":{}}]}},\"strategy\":{}},\"status\":{}}"
                                                    }
                                                },
                                                "spec": {
                                                    "replicas": 1,
                                                    "selector": {
                                                        "matchLabels": {
                                                            "name": "amazon-discovery-service"
                                                        }
                                                    },
                                                    "template": {
                                                        "metadata": {
                                                            "creationTimestamp": null,
                                                            "labels": {
                                                                "name": "amazon-discovery-service"
                                                            }
                                                        },
                                                        "spec": {
                                                            "containers": [{
                                                                "name": "amazon-discovery-service",
                                                                "image": "gcr.io/maikel-eva-ventures/amazon-discovery-service:7b293f3947624bfc139c69a7bda4f766397bf7a0",
                                                                "ports": [{
                                                                    "name": "http",
                                                                    "containerPort": 8000,
                                                                    "protocol": "TCP"
                                                                }],
                                                                "resources": {},
                                                                "terminationMessagePath": "/dev/termination-log",
                                                                "imagePullPolicy": "IfNotPresent"
                                                            }],
                                                            "restartPolicy": "Always",
                                                            "terminationGracePeriodSeconds": 30,
                                                            "dnsPolicy": "ClusterFirst",
                                                            "securityContext": {}
                                                        }
                                                    },
                                                    "strategy": {
                                                        "type": "RollingUpdate",
                                                        "rollingUpdate": {
                                                            "maxUnavailable": 1,
                                                            "maxSurge": 1
                                                        }
                                                    }
                                                },
                                                "status": {
                                                    "observedGeneration": 2,
                                                    "replicas": 1,
                                                    "updatedReplicas": 1,
                                                    "availableReplicas": 1
                                                }
                                            },
                                                {
                                                    "metadata": {
                                                        "name": "amazon-product-advertising-api-dispatcher",
                                                        "namespace": "default",
                                                        "selfLink": "/apis/extensions/v1beta1/namespaces/default/deployments/amazon-product-advertising-api-dispatcher",
                                                        "uid": "78881084-58b2-11e6-81f4-42010a840019",
                                                        "resourceVersion": "896519",
                                                        "generation": 10,
                                                        "creationTimestamp": "2016-08-02T13:10:23Z",
                                                        "labels": {
                                                            "name": "amazon-product-advertising-api-dispatcher",
                                                            "platform": "amazon"
                                                        },
                                                        "annotations": {
                                                            "deployment.kubernetes.io/revision": "5",
                                                            "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Deployment\",\"apiVersion\":\"extensions/v1beta1\",\"metadata\":{\"name\":\"amazon-product-advertising-api-dispatcher\",\"creationTimestamp\":null,\"labels\":{\"name\":\"amazon-product-advertising-api-dispatcher\",\"platform\":\"amazon\"}},\"spec\":{\"replicas\":1,\"template\":{\"metadata\":{\"creationTimestamp\":null,\"labels\":{\"name\":\"amazon-product-advertising-api-dispatcher\",\"platform\":\"amazon\"}},\"spec\":{\"containers\":[{\"name\":\"amazon-product-advertising-api-dispatcher\",\"image\":\"gcr.io/maikel-eva-ventures/amazon-product-advertising-api-dispatcher:ee8d3ca7178b2983ab01b459042a951421ff4720\",\"env\":[{\"name\":\"PG_PASSWORD\",\"valueFrom\":{\"secretKeyRef\":{\"name\":\"postgres\",\"key\":\"password\"}}}],\"resources\":{}}]}},\"strategy\":{}},\"status\":{}}"
                                                        }
                                                    },
                                                    "spec": {
                                                        "replicas": 1,
                                                        "selector": {
                                                            "matchLabels": {
                                                                "name": "amazon-product-advertising-api-dispatcher",
                                                                "platform": "amazon"
                                                            }
                                                        },
                                                        "template": {
                                                            "metadata": {
                                                                "creationTimestamp": null,
                                                                "labels": {
                                                                    "name": "amazon-product-advertising-api-dispatcher",
                                                                    "platform": "amazon"
                                                                }
                                                            },
                                                            "spec": {
                                                                "containers": [{
                                                                    "name": "amazon-product-advertising-api-dispatcher",
                                                                    "image": "gcr.io/maikel-eva-ventures/amazon-product-advertising-api-dispatcher:ee8d3ca7178b2983ab01b459042a951421ff4720",
                                                                    "env": [{
                                                                        "name": "PG_PASSWORD",
                                                                        "valueFrom": {
                                                                            "secretKeyRef": {
                                                                                "name": "postgres",
                                                                                "key": "password"
                                                                            }
                                                                        }
                                                                    }],
                                                                    "resources": {},
                                                                    "terminationMessagePath": "/dev/termination-log",
                                                                    "imagePullPolicy": "IfNotPresent"
                                                                }],
                                                                "restartPolicy": "Always",
                                                                "terminationGracePeriodSeconds": 30,
                                                                "dnsPolicy": "ClusterFirst",
                                                                "securityContext": {}
                                                            }
                                                        },
                                                        "strategy": {
                                                            "type": "RollingUpdate",
                                                            "rollingUpdate": {
                                                                "maxUnavailable": 1,
                                                                "maxSurge": 1
                                                            }
                                                        }
                                                    },
                                                    "status": {
                                                        "observedGeneration": 10,
                                                        "replicas": 1,
                                                        "updatedReplicas": 1,
                                                        "availableReplicas": 1
                                                    }
                                                }]
                                        });

        provider.getLocations()
                .then(result => {
                    assert.isArray(result);
                    assert.equal(result.length, 2);

                    assert.equal(result[0], "10.0.0.1");
                    assert.equal(result[1], "10.0.0.3");

                    assert.isTrue(deploymentsEndpoint.isDone());

                    done()
                })
                .catch(console.error)
    })
});