import axios from 'axios';
import { IUser } from '../types/IUsers';

type IUpdateUser = Partial<Omit<IUser, 'id'>> & { id: string };

export async function updateUser({ id, blocked, name, userName }: IUpdateUser) {
  const body = {
    name,
    blocked,
    userName,
  };

  const response = await axios.patch<IUser>(
    `http://localhost:3000/users/${id}`,
    body,
  );

  return response.data;
}
