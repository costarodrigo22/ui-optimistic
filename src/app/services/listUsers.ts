import axios from 'axios';
import { IUser } from '../types/IUsers';

export async function listUsers() {
  const response = await axios.get<IUser[]>('http://localhost:3000/users');

  return response.data;
}
