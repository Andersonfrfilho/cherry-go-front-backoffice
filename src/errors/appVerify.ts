import { AppError } from './AppError';
import ConstantError from './constants';

type VerifyErrorDTO = {
  status_code: number;
  code: string;
};

export function appVerifyError({
  code,
  status_code,
}: VerifyErrorDTO): AppError {
  return ConstantError[status_code][code]
    ? new AppError(ConstantError[status_code][code])
    : new AppError(ConstantError[500][50001]);
}
