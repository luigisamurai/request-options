
import { expect } from 'chai';
import RequestOptions from '../src/RequestOptions';

describe('Given a default options with base url', () => {
  const baseUrl: string = 'https://www.google.com';
  const optionsWithBaseUrl: RequestOptions = new RequestOptions()
    .setDefault({ baseUrl })
    .addHeaders({'Content-Type': 'application/json'});

  describe('when it invokes build with Base URL and Header options', () => {
    let basicQuery: any;

    before(async () => {
      basicQuery = optionsWithBaseUrl.build({ uri: '/view', method: 'get'});
    });

    it('then built options should have to URL and method', () => {
      expect(basicQuery.url).to.equal(`${baseUrl}/view`);
      expect(basicQuery.method).to.equal('get');
    });

    it('and the default options should have only Base URL', () => {
      expect(optionsWithBaseUrl.Options.baseUrl).to.equal(baseUrl);
      expect(optionsWithBaseUrl.Options.headers).to.deep.equal({'Content-Type': 'application/json'});
      expect(optionsWithBaseUrl.Options.uri).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.method).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.body).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.form).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.formData).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.queryParams).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.urlParams).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.setting).to.equal(undefined);
    });
  });

  describe('when it clones an exist RequestOptions object', () => {
    let cloneFromOptionsWithBaseUrl: any;
    let cloneQuery: any;

    before(() => {
      cloneFromOptionsWithBaseUrl = optionsWithBaseUrl.clone()
        .addURLParams({ viewId: 1 })
        .addQueryParams({ limit: 5, offset: 0 })
        .addHeaders({ Authorization: 'Bearer 12345' });
      cloneQuery = cloneFromOptionsWithBaseUrl.build({ uri: '/view/{viewId}', method: 'head'});
    });

    it('then built options should have to URL and method', () => {
      expect(cloneQuery.url).to.equal(`${baseUrl}/view/1?limit=5&offset=0`);
      expect(cloneQuery.method).to.equal('head');
    });

    it('and the options should have Base Url, URL params and query Params', () => {
      const expectedHeader: any = {
        'Authorization': 'Bearer 12345',
        'Content-Type': 'application/json'
      };
      expect(cloneFromOptionsWithBaseUrl.Options.baseUrl).to.equal(baseUrl);
      expect(cloneFromOptionsWithBaseUrl.Options.queryParams).to.deep.equal({ limit: 5, offset: 0 });
      expect(cloneFromOptionsWithBaseUrl.Options.urlParams).to.deep.equal({ viewId: 1 });
      expect(cloneFromOptionsWithBaseUrl.Options.headers).to.deep.equal(expectedHeader);
      expect(cloneFromOptionsWithBaseUrl.Options.uri).to.equal(undefined);
      expect(cloneFromOptionsWithBaseUrl.Options.method).to.equal(undefined);
      expect(cloneFromOptionsWithBaseUrl.Options.body).to.equal(undefined);
      expect(cloneFromOptionsWithBaseUrl.Options.form).to.equal(undefined);
      expect(cloneFromOptionsWithBaseUrl.Options.formData).to.equal(undefined);
      expect(cloneFromOptionsWithBaseUrl.Options.setting).to.equal(undefined);
    });
  });

  describe('when it modifies optionsWithBaseUrl and it send a Post', () => {
    let postQuery: any;

    before(() => {
      postQuery = optionsWithBaseUrl
        .setting({ simple: false })
        .build({ method: 'post', uri: '/view', body: { name: 'firstView' } });
    });

    it('then the uri, method and body should match', () => {
      expect(postQuery.url).to.equal(`${baseUrl}/view`);
      expect(postQuery.method).to.equal('post');
      expect(postQuery.body).to.deep.equal({ name: 'firstView' });
    });

    it('and the options should have Base Url, URL params and query Params', () => {
      const expectedHeader: any = {
        'Content-Type': 'application/json'
      };
      expect(optionsWithBaseUrl.Options.baseUrl).to.equal(baseUrl);
      expect(optionsWithBaseUrl.Options.headers).to.deep.equal(expectedHeader);
      expect(optionsWithBaseUrl.Options).to.have.property('simple', false);
      expect(optionsWithBaseUrl.Options.queryParams).to.deep.equal(undefined);
      expect(optionsWithBaseUrl.Options.urlParams).to.deep.equal(undefined);
      expect(optionsWithBaseUrl.Options.uri).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.method).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.form).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.formData).to.equal(undefined);
      expect(optionsWithBaseUrl.Options.body).to.equal(undefined);
    });
  });
});
