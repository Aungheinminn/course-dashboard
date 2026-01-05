import {
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  InsertImage,
  InsertTable,
  StrikeThroughSupSubToggles,
  HighlightToggle,
  tablePlugin,
  imagePlugin,
  InsertThematicBreak,
  thematicBreakPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  InsertFrontmatter,
  frontmatterPlugin,
  InsertAdmonition,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  const [markdowns, setMarkdowns] = useState<string>(content);
  const handleChange = (markdown: string) => {
    setMarkdowns(markdown);
    onChange(markdown);
  };
  return (
    <div className="w-full h-[calc(100vh-150px)]">
      <MDXEditor
        className="w-full h-full overflow-y-auto"
        plugins={[
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          toolbarPlugin({
            toolbarClassName: "my-classname",
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <StrikeThroughSupSubToggles />
                <HighlightToggle />
                <CodeToggle />
                <ListsToggle />
                <InsertTable />
                <InsertImage />
                <InsertAdmonition />
                <InsertThematicBreak />
                <InsertFrontmatter />
              </DiffSourceToggleWrapper>
            ),
          }),
          tablePlugin(),
          imagePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          diffSourcePlugin({
            diffMarkdown: markdowns,
            viewMode: "rich-text",
            readOnlyDiff: true,
          }),
        ]}
        markdown={markdowns}
        onChange={(markdown) => handleChange(markdown)}
      />
    </div>
  );
};
