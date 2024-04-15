
export interface IAuthState {
  isAuthenticated: boolean,
  userEmail: string,
  loading: boolean,
  error: boolean,
  success: boolean,
  user: {},
  searchUser: [],
  customers: [],
  updatedUsers: [],
  drivers: [],
  noCustomers: number,
  noDrivers: number,
}
