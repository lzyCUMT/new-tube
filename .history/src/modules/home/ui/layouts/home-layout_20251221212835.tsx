import { SidebarProvider } from "@/components/ui/sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="p-4 bg-blue-500">
        <p>Home navbar</p>
      </div>
      {children}
    </SidebarProvider>
  );
};
