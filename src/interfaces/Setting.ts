export default interface Setting {
  json?: boolean;
  resolveWithFullResponse?: boolean;
  simple?: boolean;
  transform?: () => any;
  agent?: boolean;
  port?: number;
  rejectUnauthorized?: boolean;
  requestCert?: boolean;
}
