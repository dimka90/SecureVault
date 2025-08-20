import Navbar from "@/components/Navbar";
import RecoveryFlow from "@/components/RecoveryFlow";

export default function RecoveryPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <RecoveryFlow />
        </div>
      </div>
    </>
  );
}
