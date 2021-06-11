// TODO try use a better way (prefer coding instead of commenting) to describe the time
export const jwtConstants = {
  access_secret:
    '(DL$bS1IygCE@[-Sh.YAyulR{y[NUeyr<^>.f$,lYD}9wswLCGAFFEN+)g>2nA4',
  access_expired_time: 900, // 15 min
  refresh_secret:
    'W"])E&jZzH2u}ypxde)E]4p(34jL3^Lj<x)G2vz^J[qD/~BHm:Sx?3:]d^q.(Q7',
  refresh_expired_time: 28800 * 4, // 8 hour
};

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum HttpResponseError {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  USER_NOT_FOUND = 'USER NOT FOUND',
  INSUFFICIENT_PRIVILEGES = 'INSUFFICIENT PRIVILEGES',
}

export enum HttpResponseMessage {
  USER_NOT_FOUND = 'Missing user',
  TOKEN_EXPIRED = 'Your token has expired',
  WRONG_CREDENTIALS = 'Wrong password or username',
  INSUFFICIENT_PRIVILEGES = 'INSUFFICIENT PRIVILEGES',
}

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}
