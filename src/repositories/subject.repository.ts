import { appDataSource } from '../data-source';
import { Subject } from '../entities';

export const subjectRepository = appDataSource.getRepository(Subject);
