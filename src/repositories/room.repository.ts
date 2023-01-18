import { appDataSource } from '../data-source';
import { Room } from '../entities/room.entity';

export const roomRepository = appDataSource.getRepository(Room);
