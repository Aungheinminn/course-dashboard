import type { CreateQuestion } from "@/types/question";

type TrueFalseOptionsProps = {
  question: CreateQuestion;
  handleOptionCorrectChange: (index: number) => void;
};

export const TrueFalseOptions: React.FC<TrueFalseOptionsProps> = ({
  question,
  handleOptionCorrectChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleOptionCorrectChange(index)}
          className={`p-4 rounded-lg border-2 transition-all font-medium ${
            option.isCorrect
              ? "bg-green-50 border-green-500 text-green-700 shadow-md"
              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {option.isCorrect && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-lg">{option.text}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
