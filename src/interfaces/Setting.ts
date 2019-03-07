export interface Setting {
  resolveWithFullResponse?: boolean;
  simple?: boolean;
  transform?: () => any;
  agent?: boolean;
  port?: number;
  rejectUnauthorized?: boolean;
  requestCert?: boolean;
}
