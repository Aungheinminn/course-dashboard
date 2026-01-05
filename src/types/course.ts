export interface Course {
  _id: string;
  name: string;
  description?: string;
  instructor_id: string | {
    _id: string;
    username: string;
    email: string;
  };
  category: string;
  level: string;
  thumbnail?: string;
  is_published: boolean;
  modules: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCourseDto {
  name: string;
  description?: string;
  instructor_id: string;
  category: string;
  level: string;
  thumbnail?: string;
  is_published: boolean;
}

export interface UpdateCourseDto {
  name?: string;
  description?: string;
  instructor_id?: string;
  category?: string;
  level?: string;
  thumbnail?: string;
  is_published?: boolean;
}
