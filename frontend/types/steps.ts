export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface Step {
  id: string;
  name: string;
  status: StepStatus;
}