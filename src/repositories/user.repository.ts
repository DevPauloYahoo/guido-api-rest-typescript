import { appDataSource } from '../data-source';
import { UserEntity } from '../entities/user.entity';

export const UserRepository = appDataSource.getRepository(UserEntity);
