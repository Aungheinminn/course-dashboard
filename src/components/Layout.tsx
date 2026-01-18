import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ProfileDropdown } from "./ProfileDropdown";

import { Link } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <h2 className="text-xl font-bold truncate text-slate-100">
          Course Admin
        </h2>
        <div className="flex items-center justify-end gap-2">
          <Link
            to="/quiz-library"
            className="px-2 py-1 border-2 border-slate-700 bg-slate-800 text-slate-100 rounded-xl"
          >
            Quiz Library

          </Link>

          <Link
            to="/question-generation"
            className="px-2 py-1 border-2 border-slate-700 bg-slate-800 text-slate-100 rounded-xl"
          >
            Add Question
          </Link>
          <Link
            to="/media-library"
            className="px-2 py-1 border-2 border-slate-700 bg-slate-800 text-slate-100 rounded-xl"
          >
            Library
          </Link>
          <ProfileDropdown />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={200} minSize={150} maxSize={250}>
            <div className="h-full overflow-hidden">
              <Sidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="h-full overflow-auto bg-slate-50">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
