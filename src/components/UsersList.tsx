import { useUsers } from "@/app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Switch } from "./ui/Switch";
import { Skeleton } from "./ui/Skeleton";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function UsersList() {
  const { users, isLoading } = useUsers();
  const { updataUser } = useUpdateUser();

  async function handleBlockedChange(id: string, blocked: boolean) {
    try {
      await updataUser({ id, blocked });
    } catch (error) {
      toast.error("Ops! Algo deu errado ao atualizar o usuário!");
    }
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
          className={cn(
            "border p-4 rounded-md flex items-center justify-between",
            user.status === "pending" && "opacity-50",
            user.status === "error" && "border-destructive bg-destructive/20"
          )}
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
            disabled={user.status === "pending" || user.status === "error"}
            onCheckedChange={(blocked) => handleBlockedChange(user.id, blocked)}
          />
        </div>
      ))}
    </div>
  );
}
