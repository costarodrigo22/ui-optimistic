import axios from "axios";
import { IUser } from "../types/IUsers";

interface ICreateUser extends Omit<IUser, "id"> {}

export async function createUser({ blocked, name, userName }: ICreateUser) {
  const body = {
    name,
    blocked,
    userName,
  };

  const response = await axios.post<IUser>("http://localhost:3000/users", body);

  return response.data;
}
