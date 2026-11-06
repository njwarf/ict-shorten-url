import { Config } from 'ziggy-js';

export type UserRole = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  avatar?: string | null;
  role: userRole;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User | null;
  };
  ziggy: Config & { location: string };
};
