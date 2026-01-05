export interface User {
  _id: string;
  email: string;
  username: string;
  role: 'admin' | 'instructor' | 'student';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'instructor' | 'student';
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  username?: string;
  role?: 'admin' | 'instructor' | 'student';
}
