import React from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-4 pb-12">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
