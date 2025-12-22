interface HomeLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: HomeLayoutProps) => {
  return (
  <div>
    <div>
        <p>Home navbar</p>
    </div>
    {children}
  </div>
  );
};

export default Layout;
