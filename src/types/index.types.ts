export interface InterestTypes {
  _id: string | number;
  name: string;
}

export interface MessageTypes {
  _id?: string;
  id?: string;
  senderId: string;
  content: string;
  createdAt: string;
  deleted?: boolean;
}
