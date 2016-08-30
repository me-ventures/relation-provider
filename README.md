# Relation-provider

Provides framework for retrieving relationship information from a set of 
microservice services.

### Location Provider

A location provider gets the adresses of the services that expose the
relationship schema's.

#### Kubernetes Location provider

Can be initialized by the using the kubernetes location provider:

```javascript
relationInfoProvider.setLocationProvider("kubernetes", {});
```

The following options can be set:

```javascript
{
    master: "URL of kubernetes master"
    caFile: "",
    auth: {
        type: "none"
    }
}
```

##### Authentication options

Currently there are 2 authentication available for the kubernetes location
provider: `none` and `token`.

