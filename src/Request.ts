import { stringify } from 'query-string';
import * as request from 'request-promise';
import * as format from 'string-template';
import Parameters from './interfaces/Parameters';

export default class Request {
  private parameters: Parameters;

  public constructor(parameters: Parameters = {}) {
    this.parameters = parameters;
  }

  get Parameters(): Parameters {
    return this.parameters;
  }

  public addParameters(parameters: Parameters): Request {
    this.parameters = Object.assign({}, this.parameters, parameters);

    return this;
  }

  public addHeaders(headers: any): Request {
    this.parameters.headers = Object.assign({}, this.parameters.headers, headers);

    return this;
  }

  public addQueryParams(queryParams: any): any {
    this.parameters.queryParams = Object.assign({}, this.parameters.queryParams, queryParams);

    return this;
  }

  public addURLParams(urlParams: any): any {
    this.parameters.urlParams = Object.assign({}, this.parameters.urlParams, urlParams);

    return this;
  }

  public setBody(body: any): Request {
    this.parameters.body = Object.assign({}, this.parameters.body, body);

    return this;
  }

  public setForm(form: any): Request {
    this.parameters.form = Object.assign({}, this.parameters.form, form);

    return this;
  }

  public setFormData(formData: any): Request {
    this.parameters.formData = Object.assign({}, this.parameters.formData, formData);

    return this;
  }

  public setting(setting: any): Request {
    this.parameters = Object.assign({}, this.parameters, setting);

    return this;
  }

  public clone(parameters: Parameters = {}): Request {
    const baseParameters: Parameters = Object.assign({}, this.parameters);
    const requestParameters: Parameters = Object.assign({}, baseParameters, parameters);

    return new Request(requestParameters);
  }

  public build(parameters: Parameters): any {
    const baseParameters: Parameters = Object.assign({}, this.parameters, parameters);
    const queryParams: string = baseParameters.queryParams ? `?${stringify(baseParameters.queryParams)}` : '';
    const baseUrl: string = baseParameters.baseUrl || '';
    const baseUri: string = baseParameters.uri || '';
    const uri: string = `${format(baseUri, baseParameters.urlParams)}${queryParams}`;
    const urlAndMethod: any = { url: `${baseUrl}${uri}`, method: baseParameters.method };

    const headers: any = baseParameters.headers ? { headers: baseParameters.headers } : {};
    const body: any = baseParameters.body ? { body: baseParameters.body } : {};
    const form: any = baseParameters.form ? { form: baseParameters.form } : {} ;
    const formData: any = baseParameters.formData  ? { formData: baseParameters.formData } : {} ;
    const setting: any = baseParameters.setting ? baseParameters.setting : {};
    const json: any = { json: !Buffer.isBuffer(baseParameters.body) };
    const requestParameters: any = Object.assign({}, urlAndMethod, headers, body, form, formData, json, setting);

    return requestParameters;
  }

  public send(methodParameters: Parameters): any {
    const requestParameters: any = this.build(methodParameters);

    return request(requestParameters);
  }
}
