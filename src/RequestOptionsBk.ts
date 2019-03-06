import { stringify } from 'query-string';
import * as format from 'string-template';
import Options from './interfaces/Options';

export default class RequestOptions {
  private defaultOptions: Options;

  public setDefault(options: Options): RequestOptions {
    this.defaultOptions = Object.assign({}, options);

    return this;
  }

  public addHeaders(headers: any): RequestOptions {
    this.defaultOptions.headers = Object.assign({}, this.defaultOptions.headers, headers);

    return this;
  }

  public build(options: Options = {}): any {
    const mergedOptions: Options = Object.assign({}, this.defaultOptions, options);
    const queryParams: string = mergedOptions.queryParams ? `?${stringify(mergedOptions.queryParams)}` : '';
    const uri: string = `${format(mergedOptions.uri, mergedOptions.urlParams)}${queryParams}`;
    const url: any = { url: `${mergedOptions.baseUrl}${uri}` };

    const headers: any = mergedOptions.headers ? { headers: mergedOptions.headers } : {};
    const body: any = mergedOptions.body ? { body: mergedOptions.body } : {};
    const form: any = mergedOptions.form ? { form: mergedOptions.form } : {} ;
    const formData: any = mergedOptions.formData  ? { formData: mergedOptions.formData } : {} ;
    const setting: any = mergedOptions.setting ? mergedOptions.setting : {};
    const requestOptions: any = Object.assign({}, url, headers, body, form, formData, setting);

    return requestOptions;
  }

  public clone(options: Options = {}): RequestOptions {
    return new RequestOptions().setDefault(options);
  }
}
