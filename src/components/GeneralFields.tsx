import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { QuestionType } from "@/types/question";

type GeneralFieldsProps = {
  option: QuestionType;
  handleSelectOption: (type: QuestionType) => void;
};

type QuestionTypeOption = {
  id: QuestionType;
  label: string;
  icon: string;
  description: string;
};

const questionTypes: QuestionTypeOption[] = [
  {
    id: "multi-choice",
    label: "Multiple Choice",
    icon: "☰",
    description: "Select from multiple options",
  },
  {
    id: "true-false",
    label: "True/False",
    icon: "✓✗",
    description: "Binary choice question",
  },
  {
    id: "word-bank",
    label: "Word Bank",
    icon: "≡",
    description: "Fill in the blanks",
  },
];

export const GeneralFields: React.FC<GeneralFieldsProps> = ({
  option,
  handleSelectOption,
}) => {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between w-full pr-2">
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Question Type
            </span>
            {option && (
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                {questionTypes.find((qt) => qt.id === option)?.label}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <div className="grid grid-cols-1 gap-2">
            {questionTypes.map((type) => {
              return (
                <Button
                  key={type.id}
                  variant={option === type.id ? "default" : "outline"}
                  disabled={option === type.id}
                  className={`justify-start h-auto py-4 px-4 ${
                    option === type.id
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-default shadow-sm"
                      : "hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  onClick={() => handleSelectOption(type.id)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <span className="text-2xl shrink-0">{type.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {type.label}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          option === type.id
                            ? "text-blue-100"
                            : "text-slate-500"
                        }`}
                      >
                        {type.description}
                      </div>
                    </div>
                    {option === type.id && (
                      <svg
                        className="w-5 h-5 text-white shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
