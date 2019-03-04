
import { expect } from 'chai';
import Options from '../src/interfaces/Options';
import RequestOptions from '../src/RequestOptions';

describe('Given an basic query', () => {
  const baseUrl: string = 'https://www.google.com';

  describe('when it gets the options from basic query', () => {
    let basicQueryResponse: any;
    let basicQuery: Options;

    before(() => {
      basicQuery = {
        baseUrl,
        method: 'get',
        uri: '/view',
      };
      basicQueryResponse = RequestOptions(basicQuery);
    });

    it('then the uri should match', () => {
      expect(basicQueryResponse.url).to.equal(`${baseUrl}${basicQuery.uri}`);
    });

    it('and the method should match', () => {
      expect(basicQueryResponse.method).to.equal(basicQuery.method);
    });
  });

  describe('when it gets the options with URL parameters', () => {
    let urlParamsResponse: any;
    let urlParamsQuery: Options;

    before(() => {
      urlParamsQuery = {
        baseUrl,
        method: 'get',
        uri: '/view/{viewId}',
        urlParams: {
          viewId: 1
        }
      };
      urlParamsResponse = RequestOptions(urlParamsQuery);
    });

    it('then the uri should match', () => {
      const expectedURL: string = `${baseUrl}/view/1`;
      expect(urlParamsResponse.url).to.equal(expectedURL);
    });
  });

  describe('when it gets the options with Query parameters', () => {
    let urlParamsResponse: any;
    let urlQueryParams: Options;

    before(() => {
      urlQueryParams = {
        baseUrl,
        method: 'get',
        queryParams: {
          name: 'automationView'
        },
        uri: '/view',
      };
      urlParamsResponse = RequestOptions(urlQueryParams);
    });

    it('then the URL should match', () => {
      const expectedURL: string = `${baseUrl}${urlQueryParams.uri}?name=automationView`;
      expect(urlParamsResponse.url).to.equal(expectedURL);
    });
  });

  describe('when it gets the options with Headers', () => {
    let headersQueryResponse: any;
    let headersQuery: Options;

    before(() => {
      headersQuery = {
        baseUrl,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'get',
        uri: '/view',
      };
      headersQueryResponse = RequestOptions(headersQuery);
    });

    it('then the headers should match', () => {
      expect(headersQueryResponse.headers).to.deep.equal(headersQuery.headers);
    });
  });

  describe('when it gets the options with Request Promises Options', () => {
    let postQueryResponse: any;
    let postQuery: Options;

    before(() => {
      postQuery = {
        baseUrl,
        body: {
          lastName: 'Data',
          name: 'Automation'
        },
        json: true,
        method: 'post',
        resolveWithFullResponse: true,
        simple: false,
        uri: '/view',
      };
      postQueryResponse = RequestOptions(postQuery);
    });

    it('then the body should match', () => {
      expect(postQueryResponse.body).to.deep.equal(postQueryResponse.body);
    });

    it('and the method option should be post', () => {
      expect(postQueryResponse.method).to.equal('post');
    });

    it('and the request option should match', () => {
      expect(postQueryResponse.json).to.equal(true);
      expect(postQueryResponse.simple).to.equal(false);
      expect(postQueryResponse.resolveWithFullResponse).to.equal(true);
    });
  });
});
