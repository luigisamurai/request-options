
import { expect } from 'chai';
import { OK } from 'http-status-codes';
import { Parameter, Request, Setting,  } from '../src';

describe('Given a default options with base url', () => {
  const baseUrl: string = 'https://www.google.com';
  const headers: any = { 'Content-Type': 'application/json' };
  const optionsWithBaseUrl: Request = new Request({ baseUrl, headers });

  describe('when it invokes build with Base URL and Header options', () => {
    let basicQuery: any;

    before(async () => {
      basicQuery = optionsWithBaseUrl.merge({ uri: '/view', method: 'get'});
    });

    it('then built options should have to URL and method', () => {
      expect(basicQuery.url).to.equal(`${baseUrl}/view`);
      expect(basicQuery.method).to.equal('get');
    });

    it('and the default options should have only Base URL', () => {
      expect(optionsWithBaseUrl.Parameters.baseUrl).to.equal(baseUrl);
      expect(optionsWithBaseUrl.Parameters.headers).to.deep.equal({'Content-Type': 'application/json'});
      expect(optionsWithBaseUrl.Parameters.uri).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.method).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.body).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.form).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.formData).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.queryParams).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.urlParams).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.setting).to.equal(undefined);
    });
  });

  describe('when it clones an exist RequestOptions object', () => {
    let cloneQuery: any;

    before(() => {
      const parameters: Parameter = {
        headers: { Authorization: 'Bearer 12345' },
        queryParams: { limit: 5, offset: 0 },
        urlParams: { viewId: 1 }
      };
      cloneQuery = optionsWithBaseUrl.merge(parameters, { uri: '/view/{viewId}', method: 'head'}, );
    });

    it('then built options should have to URL and method', () => {
      expect(cloneQuery.url).to.equal(`${baseUrl}/view/1?limit=5&offset=0`);
      expect(cloneQuery.method).to.equal('head');
    });
  });

  describe('when it modifies optionsWithBaseUrl and it send a Post', () => {
    let postQuery: any;

    before(() => {
      postQuery = optionsWithBaseUrl
        .setting({ simple: false })
        .merge({ method: 'post', uri: '/view', body: { name: 'firstView' } });
    });

    it('then the uri, method and body should match', () => {
      expect(postQuery.url).to.equal(`${baseUrl}/view`);
      expect(postQuery.method).to.equal('post');
      expect(postQuery.body).to.deep.equal({ name: 'firstView' });
    });

    it('and the options should have Base Url, URL Params and query Params', () => {
      const expectedHeader: any = {
        'Content-Type': 'application/json'
      };
      expect(optionsWithBaseUrl.Parameters.baseUrl).to.equal(baseUrl);
      expect(optionsWithBaseUrl.Parameters.headers).to.deep.equal(expectedHeader);
      expect(optionsWithBaseUrl.Parameters).to.have.property('simple', false);
      expect(optionsWithBaseUrl.Parameters.queryParams).to.deep.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.urlParams).to.deep.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.uri).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.method).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.form).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.formData).to.equal(undefined);
      expect(optionsWithBaseUrl.Parameters.body).to.equal(undefined);
    });
  });

  describe('when it sends a get request', () => {
    let response: any;

    before(async () => {
      const setting: Setting = {
        resolveWithFullResponse: true,
        simple: false
      };
      const request: Request = new Request({
        baseUrl: 'http://www.google.com',
        setting
      });

      response = await request.send({
        method: 'get',
        uri: '/home',
      });
    });

    it('then status code should be OK', () => {
      expect(response.statusCode).to.equal(OK);
    });
  });
});
