
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ApprovalStep {
  name: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  timestamp?: string;
  notes?: string;
}

interface ApprovalWorkflowProps {
  steps: ApprovalStep[];
}

const ApprovalWorkflow = ({ steps }: ApprovalWorkflowProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Approval Workflow</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-start">
              {/* Status icon */}
              <div className="mr-4">
                {step.status === "approved" && (
                  <div className="rounded-full bg-green-100 p-1">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                )}
                {step.status === "rejected" && (
                  <div className="rounded-full bg-red-100 p-1">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                )}
                {step.status === "pending" && (
                  <div className="rounded-full bg-yellow-100 p-1">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                )}
              </div>
              
              {/* Step details */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{step.name}</p>
                    <p className="text-sm text-muted-foreground">{step.role}</p>
                  </div>
                  {step.timestamp && (
                    <p className="text-sm text-muted-foreground">{step.timestamp}</p>
                  )}
                </div>
                
                {step.notes && (
                  <p className="mt-1 text-sm border-l-2 pl-2 border-muted">
                    {step.notes}
                  </p>
                )}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="ml-8 mt-2 mb-2">
                <Separator orientation="vertical" className="h-8 ml-[7px] absolute" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalWorkflow;
