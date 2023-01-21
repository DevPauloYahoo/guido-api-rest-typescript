import { appDataSource } from '../data-source';
import { Video } from '../entities';

export const videoRepository = appDataSource.getRepository(Video);
