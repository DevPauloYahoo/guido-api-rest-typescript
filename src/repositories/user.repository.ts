import { appDataSource } from '../data-source';
import { UserEntity } from '../entities';

export const UserRepository = appDataSource.getRepository(UserEntity);
