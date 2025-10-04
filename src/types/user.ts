export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Manager = 'Manager',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}
