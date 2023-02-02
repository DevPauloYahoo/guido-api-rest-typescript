import { appDataSource } from '../../data-source';
import { Role } from '../../entities';

export const RoleRepository = appDataSource.getRepository(Role);
