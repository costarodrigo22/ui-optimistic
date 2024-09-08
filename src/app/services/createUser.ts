import axios from "axios";
import { IUser } from "../types/IUsers";
import { sleep } from "@/lib/utils";

interface ICreateUser extends Omit<IUser, "id"> {}

export async function createUser({ blocked, name, userName }: ICreateUser) {
  await sleep(1500);

  const body = {
    name,
    blocked,
    userName,
  };

  const response = await axios.post<IUser>(
    "http://localhost:30010/users",
    body
  );

  return response.data;
}
