var assert = require('chai').assert;
var sut = require('./../../index');
var nock = require('nock');

describe("Relationship provider test", function() {
    describe("Automatic initialization test", function() {
        it("Should create default instance",function() {
            assert.equal(typeof sut, 'object')
        });

        it("Should create default instance with kubernetes location provider",function() {
            assert.equal(typeof sut.locationProvider, 'object')
        })

        it("It should retrieve relationship info from http services",function(done) {

            nock('http://localhost')
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
                            "name": "deployment-1",
                            "namespace": "default",
                            "selfLink": "/apis/extensions/v1beta1/namespaces/default/deployments/deployment-1",
                            "uid": "6584d136-4f5e-11e6-81f4-42010a840019",
                            "resourceVersion": "706761",
                            "generation": 2,
                            "creationTimestamp": "2016-07-21T16:15:53Z",
                            "labels": {
                                "name": "deployment-1"
                            },
                            "annotations": {
                                "deployment.kubernetes.io/revision": "1",
                                "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Deployment\",\"apiVersion\":\"extensions/v1beta1\",\"metadata\":{\"name\":\"deployment-1\",\"creationTimestamp\":null,\"labels\":{\"name\":\"deployment-1\"}},\"spec\":{\"replicas\":1,\"template\":{\"metadata\":{\"creationTimestamp\":null,\"labels\":{\"name\":\"deployment-1\"}},\"spec\":{\"containers\":[{\"name\":\"deployment-1\",\"image\":\"gcr.io/maikel-eva-ventures/deployment-1:7b293f3947624bfc139c69a7bda4f766397bf7a0\",\"ports\":[{\"name\":\"http\",\"containerPort\":8000}],\"resources\":{}}]}},\"strategy\":{}},\"status\":{}}"
                            }
                        },
                        "spec": {
                            "replicas": 1,
                            "selector": {
                                "matchLabels": {
                                    "name": "deployment-1"
                                }
                            },
                            "template": {
                                "metadata": {
                                    "creationTimestamp": null,
                                    "labels": {
                                        "name": "deployment-1"
                                    }
                                },
                                "spec": {
                                    "containers": [{
                                        "name": "deployment-1",
                                        "image": "deployment-1:7b293f3947624bfc139c69a7bda4f766397bf7a0",
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
                                "name": "test-deployment",
                                "namespace": "default",
                                "selfLink": "/apis/extensions/v1beta1/namespaces/default/deployments/test-deployment",
                                "uid": "78881084-58b2-11e6-81f4-42010a840019",
                                "resourceVersion": "896519",
                                "generation": 10,
                                "creationTimestamp": "2016-08-02T13:10:23Z",
                                "labels": {
                                    "name": "test-deployment",
                                    "platform": "amazon"
                                },
                                "annotations": {
                                    "deployment.kubernetes.io/revision": "5",
                                    "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Deployment\",\"apiVersion\":\"extensions/v1beta1\",\"metadata\":{\"name\":\"test-deployment\",\"creationTimestamp\":null,\"labels\":{\"name\":\"test-deployment\",\"platform\":\"amazon\"}},\"spec\":{\"replicas\":1,\"template\":{\"metadata\":{\"creationTimestamp\":null,\"labels\":{\"name\":\"test-deployment\",\"platform\":\"amazon\"}},\"spec\":{\"containers\":[{\"name\":\"test-deployment\",\"image\":\"gcr.io/maikel-eva-ventures/test-deployment:ee8d3ca7178b2983ab01b459042a951421ff4720\",\"env\":[{\"name\":\"PG_PASSWORD\",\"valueFrom\":{\"secretKeyRef\":{\"name\":\"postgres\",\"key\":\"password\"}}}],\"resources\":{}}]}},\"strategy\":{}},\"status\":{}}"
                                }
                            },
                            "spec": {
                                "replicas": 1,
                                "selector": {
                                    "matchLabels": {
                                        "name": "test-deployment",
                                    }
                                },
                                "template": {
                                    "metadata": {
                                        "creationTimestamp": null,
                                        "labels": {
                                            "name": "test-deployment",
                                        }
                                    },
                                    "spec": {
                                        "containers": [{
                                            "name": "test-deployment",
                                            "image": "test-deployment:ee8d3ca7178b2983ab01b459042a951421ff4720",
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

            nock('http://localhost')
                .get('/api/v1/namespaces/default/pods?labelSelector=name=test-deployment')
                .reply(200, {
                    "kind": "PodList",
                    "apiVersion": "v1",
                    "metadata": {
                        "selfLink": "/api/v1/namespaces/default/pods",
                        "resourceVersion": "1193045"
                    },
                    "items": [{
                        "metadata": {
                            "name": "deployment-1-761646460-g6ihz",
                            "generateName": "amazon-product-advertising-api-queue-761646460-",
                            "namespace": "default",
                            "selfLink": "/api/v1/namespaces/default/pods/amazon-product-advertising-api-queue-761646460-g6ihz",
                            "uid": "d6adf7c3-6927-11e6-92ae-42010a840019",
                            "resourceVersion": "1019532",
                            "creationTimestamp": "2016-08-23T11:50:50Z",
                            "labels": {
                                "name": "deployment-1",
                                "pod-template-hash": "761646460"
                            },
                            "annotations": {
                                "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"deployment-1-761646460\",\"uid\":\"d6aaf161-6927-11e6-92ae-42010a840019\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"1019519\"}}\n",
                                "kubernetes.io/limit-ranger": "LimitRanger plugin set: cpu request for container deployment-1"
                            }
                        },
                        "spec": {
                            "volumes": [{
                                "name": "default-token-iqoek",
                                "secret": {
                                    "secretName": "default-token-iqoek"
                                }
                            }],
                            "containers": [{
                                "name": "deployment-1",
                                "image": "deployment-1:2333ed38d2766f08c38ee947dd5580be661e2a40",
                                "resources": {
                                    "requests": {
                                        "cpu": "50m"
                                    }
                                },
                                "volumeMounts": [{
                                    "name": "default-token-iqoek",
                                    "readOnly": true,
                                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                                }],
                                "terminationMessagePath": "/dev/termination-log",
                                "imagePullPolicy": "IfNotPresent"
                            }],
                            "restartPolicy": "Always",
                            "terminationGracePeriodSeconds": 30,
                            "dnsPolicy": "ClusterFirst",
                            "serviceAccountName": "default",
                            "serviceAccount": "default",
                            "nodeName": "gke-em-cluster-default-pool-cc39a5f2-2i9z",
                            "securityContext": {}
                        },
                        "status": {
                            "phase": "Running",
                            "conditions": [{
                                "type": "Initialized",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:50Z"
                            }, {
                                "type": "Ready",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:53Z"
                            }, {
                                "type": "PodScheduled",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:50Z"
                            }],
                            "hostIP": "10.132.0.5",
                            "podIP": "10.0.0.1",
                            "startTime": "2016-08-23T11:50:50Z",
                            "containerStatuses": [{
                                "name": "deployment-1",
                                "state": {
                                    "running": {
                                        "startedAt": "2016-08-23T11:50:53Z"
                                    }
                                },
                                "lastState": {},
                                "ready": true,
                                "restartCount": 0,
                                "image": "deployment-1"
                            }]
                        }
                    }]
                });

            nock('http://localhost')
                .get('/api/v1/namespaces/default/pods?labelSelector=name=deployment-1')
                .reply(200, {
                    "kind": "PodList",
                    "apiVersion": "v1",
                    "metadata": {
                        "selfLink": "/api/v1/namespaces/default/pods",
                        "resourceVersion": "1193045"
                    },
                    "items": [{
                        "metadata": {
                            "name": "deployment-1-761646460-g6ihz",
                            "generateName": "amazon-product-advertising-api-queue-761646460-",
                            "namespace": "default",
                            "selfLink": "/api/v1/namespaces/default/pods/amazon-product-advertising-api-queue-761646460-g6ihz",
                            "uid": "d6adf7c3-6927-11e6-92ae-42010a840019",
                            "resourceVersion": "1019532",
                            "creationTimestamp": "2016-08-23T11:50:50Z",
                            "labels": {
                                "name": "deployment-1",
                                "pod-template-hash": "761646460"
                            },
                            "annotations": {
                                "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"deployment-1-761646460\",\"uid\":\"d6aaf161-6927-11e6-92ae-42010a840019\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"1019519\"}}\n",
                                "kubernetes.io/limit-ranger": "LimitRanger plugin set: cpu request for container deployment-1"
                            }
                        },
                        "spec": {
                            "volumes": [{
                                "name": "default-token-iqoek",
                                "secret": {
                                    "secretName": "default-token-iqoek"
                                }
                            }],
                            "containers": [{
                                "name": "deployment-1",
                                "image": "deployment-1:2333ed38d2766f08c38ee947dd5580be661e2a40",
                                "resources": {
                                    "requests": {
                                        "cpu": "50m"
                                    }
                                },
                                "volumeMounts": [{
                                    "name": "default-token-iqoek",
                                    "readOnly": true,
                                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"
                                }],
                                "terminationMessagePath": "/dev/termination-log",
                                "imagePullPolicy": "IfNotPresent"
                            }],
                            "restartPolicy": "Always",
                            "terminationGracePeriodSeconds": 30,
                            "dnsPolicy": "ClusterFirst",
                            "serviceAccountName": "default",
                            "serviceAccount": "default",
                            "nodeName": "gke-em-cluster-default-pool-cc39a5f2-2i9z",
                            "securityContext": {}
                        },
                        "status": {
                            "phase": "Running",
                            "conditions": [{
                                "type": "Initialized",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:50Z"
                            }, {
                                "type": "Ready",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:53Z"
                            }, {
                                "type": "PodScheduled",
                                "status": "True",
                                "lastProbeTime": null,
                                "lastTransitionTime": "2016-08-23T11:50:50Z"
                            }],
                            "hostIP": "10.132.0.5",
                            "podIP": "10.0.0.3",
                            "startTime": "2016-08-23T11:50:50Z",
                            "containerStatuses": [{
                                "name": "deployment-1",
                                "state": {
                                    "running": {
                                        "startedAt": "2016-08-23T11:50:53Z"
                                    }
                                },
                                "lastState": {},
                                "ready": true,
                                "restartCount": 0,
                                "image": "deployment-1"
                            }]
                        }
                    }]
                });

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

            sut.getRelations()
                .then(result => {
                    assert.isArray(result);
                    assert.equal(result.length, 2);

                    assert.isDefined(result.find((item) => item.service.name === 'historic-price-service'));
                    assert.isDefined(result.find((item) => item.service.name === 'product-aggregate'));

                    done()
                })
                .catch(console.error)

        })
    });
});