import { useUsers } from "@/app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Switch } from "./ui/Switch";
import { Skeleton } from "./ui/Skeleton";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";

export default function UsersList() {
  const { users, isLoading } = useUsers();
  const { updataUser } = useUpdateUser();

  function handleBLockedChange(id: string, blocked: boolean) {
    console.log({ blocked });

    updataUser({ id, blocked });
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
        </>
      )}

      {users.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded-md flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.userName}.png`} />
              <AvatarFallback>
                {user.name.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.userName}</small>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBLockedChange(user.id, blocked)}
          />
        </div>
      ))}
    </div>
  );
}
