export interface StaffCredentials {
  email: string;
  password: string;
}

export interface StaffSession {
  id: string;
  email: string;
  name: string;
  role: 'staff' | 'admin';
}