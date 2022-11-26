export interface IUserData {
  id: string
  userName: string
  email: string
  localRegDate: number
  localLoginDate: number
  status: boolean
  cheked?: boolean
}

export interface IInitialState {
  data: IUserData[],
  status: string,
  isLoading: boolean
}

export interface IField {
  name?: string;
  label: string;
  type?: string;
  id: string;
  error?: boolean;
  helperText?: string;
  register?: any
};

export interface IButtonLink {
  path: string;
  title: string;
  onClick?: any;
}

export interface IAuthUser {
  email: string,
  id: string,
  localLoginDate: number,
  localRegDate: number,
  status: boolean,
  token: string,
  userName: string,
  __v: number,
}

export interface ISendData {
  email: string,
  password: string,
  userName: undefined | string,
  localLoginDate: number,
  localRegDate: number,
}
export interface IUserDataSend {
  email: string,
  password: string,
  localLoginDate: number,
}

export interface IInitialStateAuth {
  data: null | IAuthUser,
  status: null | string,
  isLoading: boolean,
  message: null | string,
};

