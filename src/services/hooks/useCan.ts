import { useAuth } from '../../contexts/Auth.context';
import { validateUserPermission } from '../../utils/validateUserPermissions';

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermission({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
