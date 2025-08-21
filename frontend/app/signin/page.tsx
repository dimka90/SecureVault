import Navbar from "@/components/Navbar";
import SignIn from "@/components/SignInFlow/SignIn";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4 mt-20">
        <div className="max-w-4xl mx-auto">
          <SignIn />
        </div>
      </div>
    </>
  );
}
