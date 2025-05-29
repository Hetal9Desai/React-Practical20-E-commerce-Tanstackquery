import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as api from "./authApi";

export interface AuthResponse {
  user: api.UserRecord;
  token: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends SigninCredentials {
  fullName: string;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export const signup = createAsyncThunk<void, SignupCredentials, { rejectValue: string }>(
  "auth/signup",
  async (creds, { rejectWithValue }) => {
    try {
      await api.register(creds);
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err) || "Sign up failed");
    }
  }
);

export const signin = createAsyncThunk<
  AuthResponse,
  SigninCredentials,
  { rejectValue: string }
>(
  "auth/signin",
  async (creds, { rejectWithValue }) => {
    try {
   
      const users = await api.fetchUsers();

      const found = users.find(
        (u) => u.email === creds.email && u.password === creds.password
      );
      if (!found) {
        return rejectWithValue("Invalid email or password");
      }

      // here you could replace with a real token flow
      const fakeToken = btoa(`${found.id}:${found.email}`);
      return { user: found, token: fakeToken };
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err) || "Network error");
    }
  }
);

interface AuthState {
  user: api.UserRecord | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const persistedUser = localStorage.getItem("user");
const persistedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
  token: persistedToken || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      })

     
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
