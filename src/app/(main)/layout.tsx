import Navbar from "./Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
