import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CreateQuestion } from "@/types/question";

type WordBankOptionsProps = {
  question: CreateQuestion;
  handleOptionCorrectChange: (index: number) => void;
  handleOptionTextChange: (index: number, text: string) => void;
  handleRemoveOption: (index: number) => void;
  handleAddOption: () => void;
};

export const WordBankOptions: React.FC<WordBankOptionsProps> = ({
  question,
  handleOptionCorrectChange,
  handleOptionTextChange,
  handleRemoveOption,
  handleAddOption,
}) => {
  const blankCount = (question.content.match(/___/g) || []).length;
  const correctAnswers = question.options.filter((opt) => opt.isCorrect);
  const hasEnoughCorrectAnswers = correctAnswers.length === blankCount;

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-semibold">
              {blankCount === 0
                ? "No blanks detected"
                : `${blankCount} blank${blankCount === 1 ? "" : "s"} detected in your question`}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {blankCount === 0
                ? "Use ___ (three underscores) in your question to create blanks"
                : `Mark ${blankCount} word${blankCount === 1 ? "" : "s"} as correct answer${blankCount === 1 ? "" : "s"} below`}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-700">
            Word Bank
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddOption}
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            + Add Word
          </Button>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = option.isCorrect;
            const correctIndex = isCorrect
              ? question.options.filter((o, i) => o.isCorrect && i < index)
                  .length
              : null;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  isCorrect
                    ? "bg-green-50 border-green-500"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {/* Checkbox for correct answer */}
                <button
                  type="button"
                  onClick={() => handleOptionCorrectChange(index)}
                  className={`shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    isCorrect
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                  title={isCorrect ? "Correct answer" : "Mark as correct"}
                >
                  {isCorrect && (
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

                {/* Word input */}
                <div className="flex-1">
                  <Input
                    value={option.text}
                    onChange={(e) =>
                      handleOptionTextChange(index, e.target.value)
                    }
                    placeholder={
                      isCorrect
                        ? `Correct answer for blank #${(correctIndex ?? 0) + 1}`
                        : "Distractor word"
                    }
                    className={`border-0 bg-transparent focus:ring-0 px-2 ${
                      isCorrect ? "font-medium" : ""
                    }`}
                  />
                </div>

                {/* Label badge */}
                <div
                  className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                    isCorrect
                      ? "bg-green-200 text-green-800"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isCorrect
                    ? `Blank #${(correctIndex ?? 0) + 1}`
                    : "Distractor"}
                </div>

                {/* Remove button */}
                {question.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="shrink-0 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove word"
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
            );
          })}
        </div>

        {/* Validation warning */}
        {blankCount > 0 && !hasEnoughCorrectAnswers && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-amber-800">
                <span className="font-semibold">
                  Not enough correct answers:
                </span>{" "}
                You need {blankCount} correct answer
                {blankCount === 1 ? "" : "s"} but only have{" "}
                {correctAnswers.length}.
              </p>
            </div>
          </div>
        )}

        {/* Help text */}
        <p className="text-xs text-slate-500 mt-3">
          Check the box next to words that are correct answers. Unchecked words
          become distractors.
        </p>
      </div>
    </div>
  );
};
