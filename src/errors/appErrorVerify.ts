import { AppError } from './AppError';
import ConstantError from './constants';

type VerifyErrorDTO = {
  status_code: number;
  code: string;
  message?: string;
};

export function appErrorVerifyError({
  code,
  status_code,
  message = '',
}: VerifyErrorDTO): AppError {
  if (!status_code || !code) {
    return new AppError(ConstantError[500][50001]);
  }
  if (message === 'celebrate request validation failed') {
    return new AppError(ConstantError[400]['0002']);
  }
  if (ConstantError[status_code][code]) {
    return new AppError(ConstantError[status_code][code]);
  }
  return new AppError(ConstantError[500][50001]);
}
