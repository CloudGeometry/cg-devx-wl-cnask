export enum ERROR_MESSAGE {
  INVALID_CREDENTIALS = 'Invalid username or password',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  LOCALE_VALIDATION_ERROR = 'locale must be in format: en-US'
}

export enum ERROR_CODES {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  GRAPHQL_VALIDATION_FAILED = 'GRAPHQL_VALIDATION_FAILED'
}

export const PAGINATION_ERRORS = [
  'Only one of "after" and "before" can be set',
  'Only one of "first" and "last" can be set'
]
