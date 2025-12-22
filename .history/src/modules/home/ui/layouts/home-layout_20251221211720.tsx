interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <div>
        <p>Home navbar</p>
      </div>
      {children}
    </div>
  );
};
