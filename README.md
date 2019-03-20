# REQUEST-PARAMETERS

Help to configure the request parameters and to send HTTP request with the configured parameters.

## Pre requirements

- NodeJs 6 or bigger

## Install

```sh
npm install --save @luigisamurai/request-parameters
```

## Use

```json
export default Object.freeze({
  'Get': {
    'method': 'get',
    'uri': '/home/{homeId}'
  },
  'Post': {
    'method': 'post',
    'headers': { 'Content-Type': 'application/json' },
    'uri': '/home',
  }
});
```

```javascript
const RequestParameters = require('@luigisamurai/request-parameters');
const JSONFile = requiere('./JSONFile');

const request = new RequestParameters.Request();

// request-promises options
const setting = {
  resolveWithFullResponse: true,
  simple: false
};

// set the common parameters
request.setParameters({
  baseUrl: 'http://www.google.com',
  setting
});

// Get request with request-parameter dependency
const getPromise = request.send(JSONFile.GET, {
  urlParams: { homeId: 1 },
  queryParams: { offset: 0, limit: 100 },
});

// Also can use async - await to wait the promises
getPromise.then((response) => {
  const statusCode = response.statusCode;
  const body = response.body;

  console.log(statusCode, ' ', body);
});

// Post request with request-parameter dependency
const postPromise = request.send(JSONFile.Post, {
  body: { name: 'home view' }
});

postPromise.then((response) => {
  const statusCode = response.statusCode;
  const body = response.body;

  console.log(statusCode, ' ', body);
});

// Note the URIs don't exist so the request return 404 status code.
```

## Parameters configuration

You can specify the following parameters

- baseUrl?: string
- uri?: string
- method?: string
- headers?: any
- urlParams?: any
- queryParams?: any
- body?: any
- form?: any
- formData?: any
- setting?: Setting

### Settings

- resolveWithFullResponse?: boolean
- simple?: boolean
- transform?: () => any
- agent?: boolean
- port?: number
- rejectUnauthorized?: boolean
- requestCert?: boolean

## References

- [request-promises](https://www.npmjs.com/package/request-promise)
