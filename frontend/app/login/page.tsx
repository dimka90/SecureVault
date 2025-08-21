import HandleLogin from "@/components/HandleLogin";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 mt-32">
        <div className="max-w-4xl mx-auto">
          <HandleLogin />
        </div>
      </div>
    </div>
  );
}
