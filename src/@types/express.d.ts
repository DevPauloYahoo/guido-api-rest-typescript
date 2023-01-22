import { Room } from '../entities';

declare global {
  namespace Express {
    export interface Request {
      room: Partial<Room>;
    }
  }
}
