import { Event } from 'src/event/entities/event.entity';
import { ResponseType } from '../response/ResponseType';

export type SignupType = {
  id?: number;
  note?: string;
  event?: Event;
  responses: ResponseType[];
};
