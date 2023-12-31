export interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserApiResponse {
  status: boolean;
  message: string;
}

export interface IUserApiLoginResponse {
  status: boolean;
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
