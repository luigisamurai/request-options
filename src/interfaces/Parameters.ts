import Setting from './Setting';

export default interface Parameters {
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
