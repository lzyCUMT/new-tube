interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <div>
        <p>Home navbar</p>
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
