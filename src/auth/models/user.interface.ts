import { RoleEnum } from './role.enum';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: RoleEnum[];
}
