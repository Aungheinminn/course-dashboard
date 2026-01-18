import { Input } from "@/components/ui/input";
import type { CreateQuestion } from "@/types/question";

type MultiChoiceOptionsProps = {
  question: CreateQuestion;
  handleOptionCorrectChange: (index: number) => void;
  handleOptionTextChange: (index: number, text: string) => void;
  handleRemoveOption: (index: number) => void;
};

export const MultiChoiceOptions: React.FC<MultiChoiceOptionsProps> = ({
  question,
  handleOptionCorrectChange,
  handleOptionTextChange,
  handleRemoveOption,
}) => {
  return (
    <div>
      {question.options.map((option, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
            option.isCorrect
              ? "bg-green-50 border-green-500"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <button
            type="button"
            onClick={() => handleOptionCorrectChange(index)}
            className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              option.isCorrect
                ? "bg-green-500 border-green-500"
                : "bg-white border-slate-300 hover:border-slate-400"
            }`}
          >
            {option.isCorrect && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <Input
            value={option.text}
            onChange={(e) => handleOptionTextChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="flex-1 border-0 bg-transparent focus:ring-0 px-2"
          />

          {question.options.length > 2 && (
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
              className="shrink-0 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
