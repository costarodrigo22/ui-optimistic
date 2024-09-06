import { ThemeProvider } from "@/app/context/ThemeContext";
import Header from "./components/Header";
import UsersList from "./components/UsersList";

function App() {
  return (
    <ThemeProvider>
      <div className="max-w-[500px] mx-auto mt-20">
        <Header />

        <main className="mt-10">
          <UsersList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
