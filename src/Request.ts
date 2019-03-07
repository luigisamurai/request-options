import { stringify } from 'query-string';
import * as request from 'request-promise';
import * as format from 'string-template';
import { Parameter } from './interfaces/Parameter';

export class Request {
  private parameters: Parameter;

  public constructor(parameters: Parameter = {}) {
    this.parameters = parameters;
  }

  get Parameters(): Parameter {
    return this.parameters;
  }

  public addParameters(parameters: Parameter): Request {
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

  public merge(...parameters: Parameter[]): any {
    let fullParameters: Parameter = Object.assign({}, this.parameters);

    for (const parameter of parameters) {
      fullParameters = Object.assign({}, fullParameters, parameter);
    }

    const queryParams: string = fullParameters.queryParams ? `?${stringify(fullParameters.queryParams)}` : '';
    const baseUrl: string = fullParameters.baseUrl || '';
    const baseUri: string = fullParameters.uri || '';
    const uri: string = `${format(baseUri, fullParameters.urlParams)}${queryParams}`;
    const urlAndMethod: any = { url: `${baseUrl}${uri}`, method: fullParameters.method };

    const headers: any = fullParameters.headers ? { headers: fullParameters.headers } : {};
    const body: any = fullParameters.body ? { body: fullParameters.body } : {};
    const form: any = fullParameters.form ? { form: fullParameters.form } : {} ;
    const formData: any = fullParameters.formData  ? { formData: fullParameters.formData } : {} ;
    const setting: any = fullParameters.setting ? fullParameters.setting : {};
    const json: any = { json: !Buffer.isBuffer(fullParameters.body) };
    const requestParameters: any = Object.assign({}, urlAndMethod, headers, body, form, formData, json, setting);

    return requestParameters;
  }

  public send(...parameters: Parameter[]): any {
    const requestParameters: any = this.merge(...parameters);

    return request(requestParameters);
  }
}
