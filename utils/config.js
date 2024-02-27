const SECRET_CODE = 'some-secret-key';

const ALLOWED_CORS = [
  // 'https://diploma.maribel.nomoredomains.club',
  // 'http://diploma.maribel.nomoredomains.club',
  'https://movies-explorer-frontend-gps9.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SECRET_CODE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
