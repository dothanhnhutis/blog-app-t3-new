import Header from "@/components/Header";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
