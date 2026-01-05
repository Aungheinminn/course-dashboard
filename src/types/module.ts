export interface Module {
  _id: string;
  name: string;
  description?: string;
  course_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateModuleDto {
  name: string;
  description?: string;
  course_id: string;
}

export interface UpdateModuleDto {
  name?: string;
  description?: string;
  course_id?: string;
}
