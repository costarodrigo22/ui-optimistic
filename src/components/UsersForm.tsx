import { useCreateUsers } from '@/app/hooks/useCreateUsers';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UsersForm() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');

  const { createUser } = useCreateUsers();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setName('');
      setUserName('');

      await createUser({ name, userName, blocked: false });
    } catch (error) {
      toast.error('Erro ao cadastrar usuário!!');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-muted/50 rounded-md p-4">
      <div className="flex gap-3">
        <Input
          placeholder="Nome do usuário"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="@ do GitHub"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
      </div>

      <Button className="mt-3 w-full">Cadastrar</Button>
    </form>
  );
}
