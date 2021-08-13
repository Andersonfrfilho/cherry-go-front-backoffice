import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.UNAUTHORIZED;

export const UNAUTHORIZED = {
  '401': {
    '4001': {
      message: 'Senha incorreta',
      status_code,
      code: '4001',
    },
    '4002': {
      message: 'Token expirado!',
      status_code,
      code: '4002',
    },
    '4003': {
      message: 'Token não encontrado!',
      status_code,
      code: '4003',
    },
    '4004': {
      message: 'Token invalido!',
      status_code,
      code: '4004',
    },
  },
};
