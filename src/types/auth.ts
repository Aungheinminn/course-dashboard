export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  password: string;
  username: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  role: string;
}
