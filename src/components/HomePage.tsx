"use client";

import { useQuery } from "@tanstack/react-query";
interface ITodo {
  //   userId: number;
  id: number;
  title: string;
  //   completed: boolean;
}
interface IUser {
  name: string;
}
function HomePage() {

  const { data, isLoading, isError } = useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: async () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    select: (todos) =>
      todos.map((todo) => ({ id: todo.id, title: todo.title })),
  });

  const { data: users } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: async () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      );
    },
    select: (users) => users.map((user) => ({ name: user.name })),
    enabled: !!data,
  });

  
    if (isLoading) {
      return (
        <div className=" w-full min-h-screen flex items-center justify-center">
          Loading....
        </div>
      );
    }

  if (isError) {
    return (
      <div className=" w-full min-h-screen flex items-center justify-center">
        Error
      </div>
    );
  }
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl">TODOS</h1>
      <div className=" flex  flex-col gap-2">
        {data?.slice(0, 5).map((todo, i) => (
          <div className="flex " key={todo.id}>
            <h2>
              {i + 1}- {todo.title}
            </h2>
          </div>
        ))}
      </div>

      <h1 className="text-xl">Users</h1>
      <div className=" flex  flex-col gap-2">
        {users?.slice(0, 5).map((user, i) => (
          <div className="flex " key={user.name}>
            <h2>
              {i + 1}- {user.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
