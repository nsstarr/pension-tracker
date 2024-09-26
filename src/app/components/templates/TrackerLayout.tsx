interface TrackerLayoutProps {
  children: React.ReactNode;
}

const TrackerLayout: React.FC<TrackerLayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-10 md:gap-10 lg:flex-row">
      {children}
    </main>
  );
};

export default TrackerLayout;
