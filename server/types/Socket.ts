import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface RoomType {
  clientId: string;
  username: string;
  date: Date;
}

export type IO = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export interface Client {
  clientId: string;
  username: string;
  email: null | string;
  date: Date;
}

export interface Message {
  socketRoom: string | null | undefined;
  status: "client" | "operator";
  message: string;
  username: string;
  date: number;
}
