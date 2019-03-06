# REQUEST-PARAMETERS

Help to configure the request parameters and to send HTTP request with the configured parameters.

## Pre requirements

- NodeJs 6 or bigger

## Install

```sh
npm install --save @luigisamurai/request-parameters
```

## Use

```javascript
const Request = require('@luigisamurai/request-parameters');

const request = new Request();

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
const getPromise = request.send({
  method: 'get',
  urlParams: { homeId: 1 }
  queryParams: { offset: 0, limit: 100 }
  uri: '/home/{homeId}'
});

// Also can use async - await to wait the promises
getPromise.then((response) => {
  const statusCode = getResponse.statusCode;
  const body = getResponse.body;

  console.log(statusCode, ' ', body);
});

// Post request with request-parameter dependency
const postPromise = request.send({
  method: 'post',
  headers: { 'Content-Type': 'application/json' }
  uri: '/home'
  body: { name: 'home view' }
});

postPromise.then((response) => {
  const statusCode = getResponse.statusCode;
  const body = getResponse.body;

  console.log(statusCode, ' ', body);
});

// the URIs don't exist so the request return 404 or 5xx status code.
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

- json?: boolean
- resolveWithFullResponse?: boolean
- simple?: boolean
- transform?: () => any
- agent?: boolean
- port?: number
- rejectUnauthorized?: boolean
- requestCert?: boolean

## References

- [request-promises](https://www.npmjs.com/package/request-promise)