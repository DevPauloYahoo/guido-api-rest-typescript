import { appDataSource } from '../data-source';
import { Video } from '../entities/video.entity';

export const videoRepository = appDataSource.getRepository(Video);
