export interface UserCredentials {
  username: string,
  password: string
}

export interface LoggedInUser {
  id: number,
  token: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  login_name: string
}
