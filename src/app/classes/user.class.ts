import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  id: number;

  name: string;

  surname: string;

  age: number;

  fc: string;

  email: string;

  phone: string;

  province: string;

  // tslint:disable-next-line: variable-name
  _method: string;
}
