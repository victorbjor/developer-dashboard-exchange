
import { ReactNode } from "react";
import Header from "./Header";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
