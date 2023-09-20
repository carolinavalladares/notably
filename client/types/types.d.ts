export type IAvatars = atring[];

export interface IUser {
  name: string;
  email: string;
  image: string;
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
