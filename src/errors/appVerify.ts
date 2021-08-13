import { AppError } from './AppError';
import ConstantError from './constants';

export function appVerifyError(error) {
  return ConstantError[error.status_code][error.code]
    ? new AppError(ConstantError[error.status_code][error.code])
    : new AppError(ConstantError[500][50001]);
}
