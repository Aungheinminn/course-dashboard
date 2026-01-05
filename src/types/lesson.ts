export interface Lesson {
  _id: string;
  name: string;
  content?: string;
  course_id: string;
  module_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLessonDto {
  name: string;
  content?: string;
  course_id: string;
  module_id: string;
}

export interface UpdateLessonDto {
  name?: string;
  content?: string;
  course_id?: string;
  module_id?: string;
}
