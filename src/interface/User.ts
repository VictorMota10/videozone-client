export interface UserRegisterInterface {
  username: string;
  email: string;
  country: string;
  birthdate: string;
}

export interface UserDataLogin {
  userDataFirebase: {
    user: {
      uid: string;
      email: string;
      stsTokenManager: {
        accessToken: string;
      };
      createdAt: string;
      lastLoginAt: string;
    };
  };
  userDataPostgres: {
    username: string;
    country: string;
    avatar_url: string;
    birthdate: string;
    id: string;
  };
  success: boolean;
}

export interface UserDataLogged {
  uid: string;
  email: string;
  accessToken: string;
  username: string;
}
