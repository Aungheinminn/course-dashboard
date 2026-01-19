import { GeneralFields } from "@/components/GeneralFields";
import { MultiChoiceOptions } from "@/components/MultiChoiceOptions";
import { QuestionFieldValidator } from "@/components/QuestionFieldValidator";
import { TagFields } from "@/components/TagFields";
import { TagWrapper } from "@/components/TagWrapper";
import { TrueFalseOptions } from "@/components/TrueFalseOptions";
import { WordBankOptions } from "@/components/WordBankOptions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreateQuestion,
  QuestionOption,
  QuestionType,
} from "@/types/question";
import { useState } from "react";
import { useCreateQuestion } from "@/hooks/useQuestions";
import { useAuth } from "@/lib/utils/useAuth";
import { useNavigate } from "react-router-dom";

export const QuestionGeneration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createQuestionMutation = useCreateQuestion();

  const [question, setQuestion] = useState<CreateQuestion>({
    content: "",
    type: "multi-choice",
    options: [],
    explanation: "",
    tags: [],
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, content: e.target.value });
  };

  const handleExplanationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setQuestion({ ...question, explanation: e.target.value });
  };

  const handleSelectOption = (type: QuestionType) => {
    setQuestion((prev) => {
      let newOptions: QuestionOption[] = [];

      if (type === "true-false") {
        newOptions = [
          { text: "True", isCorrect: false, order: 0 },
          { text: "False", isCorrect: false, order: 1 },
        ];
      } else if (type === "multi-choice") {
        newOptions = [
          { text: "", isCorrect: false, order: 0 },
          { text: "", isCorrect: false, order: 1 },
        ];
      } else if (type === "word-bank") {
        newOptions = [{ text: "", isCorrect: false, order: 0 }];
      }

      return {
        ...prev,
        type,
        options: newOptions,
      };
    });
  };

  const handleSelectTag = (tag: string, type: string) => {
    if (type === "select") {
      setQuestion((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    } else {
      setQuestion((prev) => ({
        ...prev,
        tags: prev.tags.filter((item: string) => item !== tag),
      }));
    }
  };

  const handleAddOption = () => {
    setQuestion((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { text: "", isCorrect: false, order: prev.options.length },
      ],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options
        .filter((_, i) => i !== index)
        .map((opt, i) => ({ ...opt, order: i })),
    }));
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, text } : opt,
      ),
    }));
  };

  const handleOptionCorrectChange = (index: number) => {
    setQuestion((prev) => {
      if (question.type === "true-false" || question.type === "multi-choice") {
        // Single correct answer - radio button behavior
        return {
          ...prev,
          options: prev.options.map((opt, i) => ({
            ...opt,
            isCorrect: i === index,
          })),
        };
      } else if (question.type === "word-bank") {
        // Multiple correct answers - checkbox behavior
        return {
          ...prev,
          options: prev.options.map((opt, i) =>
            i === index ? { ...opt, isCorrect: !opt.isCorrect } : opt,
          ),
        };
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    if (!user?._id) {
      console.error("User not authenticated");
      return;
    }

    try {
      await createQuestionMutation.mutateAsync({
        ...question,
        owner: user._id,
      });

      // Reset form on success
      setQuestion({
        content: "",
        type: "multi-choice",
        options: [],
        explanation: "",
        tags: [],
      });

      // Optional: Navigate to a questions list page or show success message
      alert("Question created successfully!");
    } catch (error) {
      console.error("Failed to create question:", error);
      alert("Failed to create question. Please try again.");
    }
  };

  const isValid =
    question.content.trim().length > 0 &&
    question.options.length >= 1 &&
    (question.type === "word-bank"
      ? (() => {
          const blankCount = (question.content.match(/___/g) || []).length;
          const correctAnswers = question.options.filter(
            (opt) => opt.isCorrect,
          );
          return (
            blankCount > 0 &&
            correctAnswers.length === blankCount &&
            question.options.every((opt) => opt.text.trim().length > 0)
          );
        })()
      : question.options.length >= 2 &&
        question.options.some((opt) => opt.isCorrect) &&
        (question.type !== "multi-choice" ||
          question.options.every((opt) => opt.text.trim().length > 0))) &&
    question.explanation.trim().length > 0 &&
    question.tags.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">
            Create Question
          </h1>
          <p className="text-slate-600 text-lg">
            Design engaging questions for your course
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Question Details
                </h2>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">
                      Question Content
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Textarea
                      value={question.content}
                      onChange={handleContentChange}
                      placeholder="Enter your question here..."
                      className="w-full min-h-25 resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                    <p className="text-xs text-slate-500">
                      Write a clear and concise question
                    </p>
                  </div>

                  {/* Options Section */}
                  {question.type && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-700">
                          Answer Options
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        {question.type === "multi-choice" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleAddOption}
                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            + Add Option
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {question.type === "true-false" ? (
                          <TrueFalseOptions
                            question={question}
                            handleOptionCorrectChange={
                              handleOptionCorrectChange
                            }
                          />
                        ) : question.type === "multi-choice" ? (
                          <MultiChoiceOptions
                            question={question}
                            handleOptionCorrectChange={
                              handleOptionCorrectChange
                            }
                            handleOptionTextChange={handleOptionTextChange}
                            handleRemoveOption={handleRemoveOption}
                          />
                        ) : question.type === "word-bank" ? (
                          <WordBankOptions
                            question={question}
                            handleOptionCorrectChange={
                              handleOptionCorrectChange
                            }
                            handleOptionTextChange={handleOptionTextChange}
                            handleRemoveOption={handleRemoveOption}
                            handleAddOption={handleAddOption}
                          />
                        ) : null}
                      </div>

                      {question.type === "multi-choice" && (
                        <p className="text-xs text-slate-500">
                          Click the circle to mark the correct answer
                        </p>
                      )}
                      {question.type === "true-false" && (
                        <p className="text-xs text-slate-500">
                          Click on True or False to select the correct answer
                        </p>
                      )}
                      {question.type === "word-bank" && (
                        <p className="text-xs text-slate-500">
                          Use ___ (three underscores) in the question to create
                          blanks
                        </p>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">
                      Explanation
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Textarea
                      value={question.explanation}
                      onChange={handleExplanationChange}
                      placeholder="Provide an explanation for the correct answer..."
                      className="w-full min-h-20 resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                    <p className="text-xs text-slate-500">
                      Help students understand why this is the correct answer
                    </p>
                  </div>

                  {/* Selected Tags Display */}
                  {question.tags.length > 0 && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-700">
                        Selected Categories
                      </label>
                      <TagWrapper tags={question.tags} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Ready to create?
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Make sure all required fields are filled
                  </p>
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!isValid || createQuestionMutation.isPending}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createQuestionMutation.isPending
                    ? "Creating..."
                    : "Create Question"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Configuration */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <QuestionFieldValidator question={question} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <GeneralFields
                option={question.type}
                handleSelectOption={handleSelectOption}
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <TagFields
                tags={question.tags}
                handleSelectTag={handleSelectTag}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
