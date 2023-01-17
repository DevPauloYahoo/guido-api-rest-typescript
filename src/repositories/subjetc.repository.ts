import { appDataSource } from '../data-source';
import { Subject } from '../entities/subject.entity';

export const subjetcRepository = appDataSource.getRepository(Subject);
