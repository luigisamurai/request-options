export default interface Options {
  baseUrl: string;
  uri: string;
  method: string;
  headers?: any;
  urlParams?: any;
  queryParams?: any;
  body?: any;
  form?: any;
  formData?: any;
  json?: boolean;
  resolveWithFullResponse?: boolean;
  simple?: boolean;
}
