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
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  return (
    <div className="w-full h-[calc(100vh-150px)]">
      <MDXEditor
        className="w-full h-full overflow-y-auto"
        contentEditableClassName="prose"
        markdown={content}
        onChange={onChange}
        plugins={[
          // Core plugins for markdown features
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          // Code block plugins
          codeBlockPlugin({ defaultCodeBlockLanguage: "javascript", }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              javascript: "JavaScript",
              ts: "TypeScript",
              typescript: "TypeScript",
              tsx: "TypeScript (JSX)",
              jsx: "JavaScript (JSX)",
              html: "HTML",
              css: "CSS",
              markdown: "Markdown",
              md: "Markdown",
              text: "Plain Text",
            },
          }),
          // Other plugins
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          tablePlugin(),
          imagePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          diffSourcePlugin({
            viewMode: "rich-text",
            diffMarkdown: content,
          }),
          toolbarPlugin({
            toolbarClassName: "toolbar",
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <StrikeThroughSupSubToggles />
                <HighlightToggle />
                <CodeToggle />
                <InsertCodeBlock />
                <ListsToggle />
                <InsertTable />
                <InsertImage />
                <InsertAdmonition />
                <InsertThematicBreak />
                <InsertFrontmatter />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
};
