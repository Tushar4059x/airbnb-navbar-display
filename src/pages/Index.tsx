
import Navbar from "@/components/Navbar/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-[120px] px-4">
        <div className="max-w-[2520px] mx-auto">
          <h1 className="text-3xl font-bold">Welcome to Airbnb</h1>
          {/* Add more content here */}
        </div>
      </main>
    </div>
  );
};

export default Index;
