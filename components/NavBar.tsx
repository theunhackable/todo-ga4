import { ThemeToggle } from "./ThemeToggle";

function NavBar() {
  return (
    <nav className="flex items-center justify-between sticky top-0 border p-4 ">
      <div>
        <h1 className="font-bold text-3xl">Todo</h1>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default NavBar;
