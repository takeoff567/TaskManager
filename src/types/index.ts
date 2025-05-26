/**Navigaion types */
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
  };
  
  export type AppStackParamList = {
    Home: undefined;
    Profile: { userId: string };
  };
  
/**authentication types */
  export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
  }

 export type AuthCredentials = {
    email: string;
    password: string;
  };
  
 export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name?: string;
    };
  };