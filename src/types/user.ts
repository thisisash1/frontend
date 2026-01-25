export interface User {
  id: number;
  name: string;
  email: string;
  age: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserCreateInput {
  name: string;
  email: string;
  age?: number | null;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  age?: number | null;
}
