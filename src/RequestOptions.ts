import { stringify } from 'query-string';
import * as format from 'string-template';
import Options from './interfaces/Options';

export default class RequestOptions {
  private options: Options;

  get Options(): Options {
    return this.options;
  }

  public setDefault(options: Options): RequestOptions {
    this.options = Object.assign({}, options);

    return this;
  }

  public addHeaders(headers: any): RequestOptions {
    this.options.headers = Object.assign({}, this.options.headers, headers);

    return this;
  }

  public addQueryParams(queryParams: any): any {
    this.options.queryParams = Object.assign({}, this.options.queryParams, queryParams);

    return this;
  }

  public addURLParams(urlParams: any): any {
    this.options.urlParams = Object.assign({}, this.options.urlParams, urlParams);

    return this;
  }

  public setBody(body: any): RequestOptions {
    this.options.body = Object.assign({}, this.options.body, body);

    return this;
  }

  public setForm(form: any): RequestOptions {
    this.options.form = Object.assign({}, this.options.form, form);

    return this;
  }

  public setFormData(formData: any): RequestOptions {
    this.options.formData = Object.assign({}, this.options.formData, formData);

    return this;
  }

  public setting(setting: any): RequestOptions {
    this.options = Object.assign({}, this.options, setting);

    return this;
  }

  public clone(options: Options = {}): RequestOptions {
    const baseOptions: Options = Object.assign({}, this.options);
    const requestOptions: Options = Object.assign({}, baseOptions, options);

    return new RequestOptions().setDefault(requestOptions);
  }

  public build(options: Options): any {
    const optionsToBuild: Options = Object.assign({}, this.options, options);
    const queryParams: string = optionsToBuild.queryParams ? `?${stringify(optionsToBuild.queryParams)}` : '';
    const uri: string = `${format(optionsToBuild.uri, optionsToBuild.urlParams)}${queryParams}`;
    const urlAndMethod: any = { url: `${optionsToBuild.baseUrl}${uri}`, method: options.method };

    const headers: any = optionsToBuild.headers ? { headers: optionsToBuild.headers } : {};
    const body: any = optionsToBuild.body ? { body: optionsToBuild.body } : {};
    const form: any = optionsToBuild.form ? { form: optionsToBuild.form } : {} ;
    const formData: any = optionsToBuild.formData  ? { formData: optionsToBuild.formData } : {} ;
    const setting: any = optionsToBuild.setting ? optionsToBuild.setting : {};
    const requestOptions: any = Object.assign({}, urlAndMethod, headers, body, form, formData, setting);

    return requestOptions;
  }
}
