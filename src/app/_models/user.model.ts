/** api model; excludes some fields*/
export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  reservations: number[];
  password: string;
  token?: string;
}
