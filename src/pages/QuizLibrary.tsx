import { QuizTable } from "@/components/QuizTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type QuizStatus = "all" | "unpublished" | "published";

export const QuizLibrary = () => {
  const [status, setStatus] = useState<QuizStatus>("all");

  const handleStatusChange = (status: QuizStatus) => {
    setStatus(status);
  };
  return (
    <div className="w-full h-full bg-slate-50 p-3 flex flex-col gap-y-6">
      <div className="flex justify-start items-center">
        <div className="bg-white border border-slate-200 rounded-xl flex justify-start items-center p-6 py-3">
          <div className="flex flex-col items-start justify-center">
            <b className="text-4xl">15</b>
            <b className="text-xl text-gray-600">Published Quizzes</b>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-end gap-y-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              Quiz Library
            </h2>
            <div className="px-1 py-1 bg-slate-200 rounded-sm gap-x-0.5">
              <Button
                className={`bg-transparent text-black h-7 hover:bg-transparent cursor-pointer rounded-sm ${status === "all" ? "bg-white hover:bg-white" : ""} `}
                onClick={() => handleStatusChange("all")}
              >
                View All
              </Button>
              <Button
                className={`bg-transparent text-black h-7 hover:bg-transparent cursor-pointer rounded-sm ${status === "published" ? "bg-white hover:bg-white" : ""} `}
                onClick={() => handleStatusChange("published")}
              >
                Published
              </Button>
              <Button
                className={`bg-transparent text-black h-7 hover:bg-transparent cursor-pointer rounded-sm ${status === "unpublished" ? "bg-white hover:bg-whtie" : ""} `}
                onClick={() => handleStatusChange("unpublished")}
              >
                Unpublished
              </Button>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
            + Add
          </Button>
        </div>
        <QuizTable />
      </div>
    </div>
  );
};
