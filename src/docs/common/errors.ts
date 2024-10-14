import errors from "../../constants/errors";

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean', example: false},
          error: {
            type: 'string',
            example: errors.SYSTEM_ERROR,
          },
        },
      },
    },
  },
};


const invalidEmailOrPassword = {
  description: 'Invalid email or password',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean', example: false},
          error: {type: 'string', example: errors.INVALID_EMAIL_PASSWORD}
        },
      },
    },
  },
};

const validOTPCode = {
  description: 'in valid otp code',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean', example: false},
          error: {type: 'string', example: errors.VALID_OTP_CODE}
        },
      },
    },
  },
};

const nofound = {
  description: 'Not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean', example: false},
          error: {type: 'string', example: errors.NOT_FOUND}
        },
      },
    },
  },
};

const invalidRefreshToken = {
  description: 'invalid refresh token',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {type: 'boolean', example: false},
          error: {type: 'string', example: errors.INVALID_REFRESH_TOKEN}
        },
      },
    },
  },
}

const security = [
  {
    bearerAuth: [],
  },
];



export {
  internalServerError,
  invalidEmailOrPassword,
  security,
  nofound,
  validOTPCode,
  invalidRefreshToken
}
