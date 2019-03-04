import { stringify } from 'query-string';
import * as format from 'string-template';
import Options from './interfaces/Options';

export default (baseOptions: Options) => {
  const queryParams: string = baseOptions.queryParams ? `?${stringify(baseOptions.queryParams)}` : '';
  const uri: string = `${format(baseOptions.uri, baseOptions.urlParams)}${queryParams}`;
  const url: string = `${baseOptions.baseUrl}${uri}`;
  const options: any = Object.assign({}, baseOptions, { url });

  return options;
};
