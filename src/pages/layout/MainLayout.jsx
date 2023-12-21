import { Outlet } from "react-router-dom";

export default function LayoutMain() {
  return (
    <>
      <nav>
        {/* Nav bar component here */}
        Nave bar
      </nav>

      <main className="">
        <Outlet />
      </main>

      <footer>
        {/* Footer componentes here */}
        Footer
      </footer>
    </>
  );
}
