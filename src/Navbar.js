import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

function DarkModeToggler({ className }) {
  const [darkmode, setDarkmode] = useState(
    document.getElementsByTagName("html")[0].classList.contains("dark")
  );

  const toggleDarkmode = () => {
    document.getElementsByTagName("html")[0].classList.toggle("dark");

    if (document.getElementsByTagName("html")[0].classList.contains("dark")) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    setTimeout(
      () =>
        setDarkmode(
          document.getElementsByTagName("html")[0].classList.contains("dark")
        ),
      100
    );
  };

  useEffect(() => {
    if (
      (localStorage.theme === "dark" ||
        (!localStorage.theme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)) &&
      darkmode === false
    ) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      setDarkmode(true);
      // toggleDarkmode();
    }
  }, [darkmode]);

  return darkmode ? (
    <SunIcon
      onClick={toggleDarkmode}
      className="h-10 md:h-12 p-2 md:p-3 scale-0 dark:scale-100"
    />
  ) : (
    <MoonIcon
      onClick={toggleDarkmode}
      className="h-10 md:h-12 p-2 md:p-3 scale-100 dark:scale-0"
    />
  );
}

function Navbar() {
  return (
    <nav className="z-20 fixed top-0 w-full border-b shadow-lg">
      <div className="max-w-7xl w-full h-full items-center flex mx-auto px-2 justify-between">
        <div className="flex items-center">
          <h1 className="md:border-r px-1 mr-1 md:mr-5 md:px-5 whitespace-nowrap">
            WordCounter
          </h1>
        </div>
        <div className="flex items-center">
          <DarkModeToggler></DarkModeToggler>
        </div>
      </div>
    </nav>
  );
}

function Sidebar() {
  return (
    <div className="z-10 fixed bottom-0 md:left-0 w-full md:w-auto md:h-screen mb-5 px-5 md:mb-0 md:px-0">
      <aside className="md:border-0 md:h-full md:border-r shadow-2xl border theme-b-secondary">
        <div className="w-full h-full items-center flex md:flex-col justify-center"></div>
      </aside>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div id="home" className="text-xl md:text-2xl pt-12">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}

export default Layout;
