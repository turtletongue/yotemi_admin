import { Admin } from "@store/features/admins";

export interface AuthState {
  accessToken: string | null;
  admin: Admin | null;
}

const authInitialState: AuthState = {
  accessToken: null,
  admin: null,
};

export default authInitialState;
