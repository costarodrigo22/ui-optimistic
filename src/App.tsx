import { ThemeProvider } from "@/app/context/ThemeContext";
import Header from "./components/Header";
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/Toaster";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        <div className="max-w-[500px] mx-auto mt-20">
          <Header />

          <main className="mt-10 space-y-4">
            <UsersForm />

            <UsersList />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
