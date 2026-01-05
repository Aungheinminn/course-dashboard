import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { ProfileDropdown } from './ProfileDropdown';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/Resizable';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 flex-shrink-0">
        <h2 className="text-xl font-bold truncate text-slate-100">Course Admin</h2>
        <ProfileDropdown />
      </header>
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full overflow-hidden">
              <Sidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="h-full overflow-auto bg-slate-50">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
