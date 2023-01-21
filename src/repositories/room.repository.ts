import { appDataSource } from '../data-source';
import { Room } from '../entities';

export const roomRepository = appDataSource.getRepository(Room);
