import Setting from './Setting';

export default interface Options {
  baseUrl?: string;
  uri?: string;
  method?: string;
  headers?: any;
  urlParams?: any;
  queryParams?: any;
  body?: any;
  form?: any;
  formData?: any;
  setting?: Setting;
}
