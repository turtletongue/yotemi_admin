import { Admin } from "@store/features/admins";

export interface AuthResponse {
  accessToken: string;
  admin: Admin;
}
