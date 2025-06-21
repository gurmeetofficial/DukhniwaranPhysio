import { apiRequest } from "./queryClient";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    return response.json();
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest("POST", "/api/auth/register", userData);
    return response.json();
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiRequest("GET", "/api/auth/me");
    return response.json();
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
