import { appDataSource } from '../../data-source';
import { Profile } from '../../entities';

export const ProfileRepository = appDataSource.getRepository(Profile);
