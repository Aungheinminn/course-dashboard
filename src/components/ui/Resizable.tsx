import * as React from 'react';
import { GripVertical } from 'lucide-react';

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
}

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
  onResize?: (delta: number) => void;
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className = '', direction = 'horizontal', children, ...props }, ref) => {
    const [sizes, setSizes] = React.useState<number[]>([20, 80]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleResize = React.useCallback((index: number, delta: number) => {
      setSizes(prev => {
        const containerWidth = containerRef.current?.offsetWidth || 1000;
        const deltaPercent = (delta / containerWidth) * 100;
        
        const newLeftSize = Math.max(15, Math.min(30, prev[index] + deltaPercent));
        const newRightSize = 100 - newLeftSize;
        
        return [newLeftSize, newRightSize];
      });
    }, []);

    const childrenArray = React.Children.toArray(children);
    let panelIndex = 0;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} w-full h-full ${className}`}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (React.isValidElement(child)) {
            if (child.type === ResizablePanel) {
              const currentPanelIndex = panelIndex++;
              const childProps = child.props as ResizablePanelProps;
              return React.cloneElement(child as React.ReactElement<any>, {
                key: index,
                style: { 
                  ...(childProps.style || {}),
                  flex: `0 0 ${sizes[currentPanelIndex]}%`,
                  width: `${sizes[currentPanelIndex]}%`
                }
              });
            } else if (child.type === ResizableHandle) {
              const handleIndex = panelIndex - 1;
              return React.cloneElement(child as React.ReactElement<any>, {
                key: index,
                onResize: (delta: number) => handleResize(handleIndex, delta)
              });
            }
          }
          return child;
        })}
      </div>
    );
  }
);
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className = '', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-auto ${className}`}
        style={style}
        {...props}
      />
    );
  }
);
ResizablePanel.displayName = 'ResizablePanel';

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle = false, className = '', onResize, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const startXRef = React.useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      e.preventDefault();
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        const delta = e.clientX - startXRef.current;
        startXRef.current = e.clientX;
        onResize?.(delta);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, onResize]);

    return (
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        className={`relative flex w-1 items-center justify-center bg-slate-200 hover:bg-slate-300 cursor-col-resize transition-colors ${isDragging ? 'bg-slate-400' : ''} ${className}`}
        {...props}
      >
        {withHandle && (
          <div className="z-10 flex h-8 w-3 items-center justify-center rounded-sm border border-slate-300 bg-white shadow-sm">
            <GripVertical className="h-3 w-3 text-slate-400" />
          </div>
        )}
      </div>
    );
  }
);
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
