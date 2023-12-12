import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
