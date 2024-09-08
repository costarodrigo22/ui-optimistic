import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="font-bold text-3xl -tracking-wider">Theusers</h1>

        <small className="text-muted-foreground">Gerencie seus usuários</small>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
