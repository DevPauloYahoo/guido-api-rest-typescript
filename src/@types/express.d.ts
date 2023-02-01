import { Room, UserEntity } from '../entities';

declare global {
  namespace Express {
    export interface Request {
      room: Partial<Room>;
      user: Partial<UserEntity>;
    }
  }
}
