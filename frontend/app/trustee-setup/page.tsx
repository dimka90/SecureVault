// import ProgressStepper from '@/components/ProgressStepper';
import TrusteeSetup from '@/components/TrusteeSetup';
// import { Step } from '@/types/steps';

export default function TrusteeSetupPage() {
  // const steps: Step[] = [
  //   { id: '01', name: 'Sign In', status: 'complete' },
  //   { id: '02', name: 'Account Setup', status: 'complete' },
  //   { id: '03', name: 'Trustees', status: 'current' },
  //   { id: '04', name: 'Documents', status: 'upcoming' },
  // ];

  return (
    <div className="min-h-screen p-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="py-8">
          {/* <ProgressStepper steps={steps} /> */}
        </div>
        
        <TrusteeSetup />
      </div>
    </div>
  );
}