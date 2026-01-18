import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CreateQuestion } from "@/types/question";

type QuestionFieldValidatorProps = {
  question: CreateQuestion;
};

export const QuestionFieldValidator: React.FC<QuestionFieldValidatorProps> = ({
  question,
}) => {
  const hasCorrectAnswer = question.options.some((opt) => opt.isCorrect);
  const hasAllOptionsFilled =
    question.type === "true-false" ||
    question.options.every((opt) => opt.text.trim().length > 0);

  const blankCount =
    question.type === "word-bank"
      ? (question.content.match(/___/g) || []).length
      : 0;
  const correctAnswerCount = question.options.filter(
    (opt) => opt.isCorrect,
  ).length;
  const wordBankValid =
    question.type === "word-bank"
      ? blankCount > 0 &&
        correctAnswerCount === blankCount &&
        hasAllOptionsFilled
      : true;

  const validationItems = [
    {
      label: "Question Type",
      isValid: !!question.type,
      description: "Select a question type",
    },
    {
      label: "Question Content",
      isValid: question.content.trim().length > 0,
      description: "A question must have content",
    },
    {
      label: "Answer Options",
      isValid:
        question.type === "word-bank"
          ? question.options.length >= 1 && hasAllOptionsFilled
          : question.options.length >= 2 && hasAllOptionsFilled,
      description:
        question.type === "true-false"
          ? "True/False options are set"
          : question.type === "word-bank"
            ? "Add words for the word bank"
            : "Provide at least 2 options with text",
    },
    {
      label: "Correct Answer",
      isValid: question.type === "word-bank" ? wordBankValid : hasCorrectAnswer,
      description:
        question.type === "word-bank"
          ? blankCount === 0
            ? "Add ___ blanks to your question"
            : correctAnswerCount !== blankCount
              ? `Mark ${blankCount} correct answer${blankCount === 1 ? "" : "s"} for ${blankCount} blank${blankCount === 1 ? "" : "s"}`
              : "Blanks and answers match"
          : "Mark at least one option as correct",
    },
    {
      label: "Explanation",
      isValid: question.explanation.trim().length > 0,
      description: "Include an explanation for the answer",
    },
    {
      label: "Tags",
      isValid: question.tags.length > 0,
      description: "Add at least one category tag",
    },
  ];

  const allValid = validationItems.every((item) => item.isValid);
  const validCount = validationItems.filter((item) => item.isValid).length;

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between w-full pr-2">
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Validation Status
            </span>
            <div className="flex items-center gap-2">
              {allValid ? (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  All checks passed
                </span>
              ) : (
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">
                  {validCount}/{validationItems.length} complete
                </span>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <div className="space-y-2">
            {validationItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                  item.isValid
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.isValid ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      item.isValid ? "text-green-800" : "text-amber-800"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      item.isValid ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
