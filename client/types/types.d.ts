export type IAvatars = atring[];

export interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
  created_at: string;
  posts?: IPost[];
  followers: IUser[];
  following: IUser[];
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface IRegisterData {
  email: string;
  password: string;
  image: string;
  name: string;
}

export interface IMonths {
  english: string[];
  portuguese: string[];
}

export interface IPost {
  author: IUser;
  content: string;
  created_at: string;
  user_id: number;
  likes?: IUser[];
}
