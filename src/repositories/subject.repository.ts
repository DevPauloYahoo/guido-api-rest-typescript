import { appDataSource } from '../data-source';
import { Subject } from '../entities/subject.entity';

export const subjectRepository = appDataSource.getRepository(Subject);
