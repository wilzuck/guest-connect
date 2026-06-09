import { cn } from "@/lib/utils/cn";

type StepperProps = {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
};

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="space-y-4">
      {/* Progress segments */}
      <div className="flex gap-1">
        {steps.map((_, index) => {
          const isDone = index <= currentStep;

          return (
            <div
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                isDone ? "bg-black" : "bg-zinc-200"
              )}
            />
          );
        })}
      </div>

      {/* Steps (no scroll, responsive grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isDone = currentStep > index;

          return (
            <button
              key={index}
              onClick={() => onStepClick?.(index)}
              className={cn(
                "text-left transition rounded-xl p-2",
                isActive && "text-black",
                isDone && !isActive && "text-zinc-700",
                !isActive && !isDone && "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium truncate leading-5",
                  isActive && "font-semibold "
                )}
                title={step.title}
              >
                {step.title}
              </p>

              {step.description && (
                <p title={step.description} className="mt-1 truncate text-xs text-zinc-500">
                  {step.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}