import { Setting } from './Setting';

export interface Parameter {
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
