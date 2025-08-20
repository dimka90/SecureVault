import { FaCheck, FaCircle } from 'react-icons/fa';

// Define the type for step status
type StepStatus = 'complete' | 'current' | 'upcoming';

// Define the Step interface with strict status typing
interface Step {
  id: string;
  name: string;
  status: StepStatus; // Now only these 3 strings are allowed
}

interface ProgressStepperProps {
  steps: Step[];
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <nav className="flex items-center justify-center">
      <ol className="flex items-center space-x-8">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            {step.status === 'complete' ? (
              <div className="flex items-center">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-500">
                  <FaCheck className="h-4 w-4 text-white" />
                </span>
                <span className="ml-3 text-sm font-medium text-indigo-400">{step.name}</span>
              </div>
            ) : step.status === 'current' ? (
              <div className="flex items-center">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-indigo-500">
                  <FaCircle className="h-2.5 w-2.5 text-indigo-500" />
                </span>
                <span className="ml-3 text-sm font-medium text-white">{step.name}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-600">
                  <FaCircle className="h-2.5 w-2.5 text-gray-500" />
                </span>
                <span className="ml-3 text-sm font-medium text-gray-400">{step.name}</span>
              </div>
            )}
            
            {index !== steps.length - 1 && (
              <div className="ml-8 h-0.5 w-16 bg-gray-600" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}