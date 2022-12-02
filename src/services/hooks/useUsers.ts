import { count } from "console";
import { useQuery } from "react-query";
import { string } from "yup";
import { api } from "../api";


type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data } = await api.get('http://localhost:3333/users/all', {
    params: {
      page,
    }
  })

  const totalCount = Number(data.TotalCount)

  const users = data.usuarios
  
  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number) {
  return useQuery(['getUsers', 'http://localhost:3333/users/all', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10   // 10 min
  })
}