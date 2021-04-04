export interface User {
  id: number;
  username: string;
  token: string;
  followed_subreddits?: number[];
}
export interface TempUser {
  id: number;
  username: string;
  token: string;
  password: string;
}
