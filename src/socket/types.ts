export interface Disptacher {
  action: string;
  payload?: any;
}

export interface Request {
  player: string;
  action: string;
  data?: any;
  token?: string;
}

export interface Response {
  type: string;
  data: any; // { [key: string]: any } | string | Disptacher;
}
