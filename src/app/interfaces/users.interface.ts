export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserApiResponse {
  status: boolean;
  message: string;
}

export interface UserApiLoginResponse {
  status: boolean;
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
