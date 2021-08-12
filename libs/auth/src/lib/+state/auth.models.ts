/**
 * Interface for the 'Auth' data
 */
export interface User {
  uid: string;
  email: string;
}

export interface Authenticate {
  email: string;
  password: string;
}
