import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type TagFieldsProps = {
  tags: string[];
  handleSelectTag: (tag: string, type: string) => void;
};

type Tag = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

const availableTags: Tag[] = [
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    color:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
  },
  {
    id: "mathematics",
    label: "Mathematics",
    icon: "📐",
    color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
  },
  {
    id: "science",
    label: "Science",
    icon: "🔬",
    color: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
  },
];

export const TagFields: React.FC<TagFieldsProps> = ({
  tags,
  handleSelectTag,
}) => {
  const isSelected = (tagId: string) => tags.includes(tagId);

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <div className="flex items-center justify-between w-full pr-2">
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Categories
            </span>
            {tags.length > 0 && (
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full font-medium">
                {tags.length} selected
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <div className="grid grid-cols-1 gap-3">
            {availableTags.map((tag) => {
              const selected = isSelected(tag.id);
              return (
                <Button
                  key={tag.id}
                  variant="outline"
                  className={`justify-start h-auto py-3 px-4 transition-all ${
                    selected
                      ? `${tag.color} border-2 shadow-sm`
                      : "hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  onClick={() =>
                    handleSelectTag(tag.id, selected ? "deselect" : "select")
                  }
                >
                  <div className="flex items-center space-x-3 w-full">
                    <span className="text-xl shrink-0">{tag.icon}</span>
                    <span className="font-medium text-sm flex-1 text-left">
                      {tag.label}
                    </span>
                    {selected && (
                      <svg
                        className="w-5 h-5 shrink-0"
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
