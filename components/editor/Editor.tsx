'use client';

import Theme from './plugins/Theme'; // Importing custom theme plugin for the editor
import ToolbarPlugin from './plugins/ToolbarPlugin'; // Importing the toolbar plugin
import { HeadingNode } from '@lexical/rich-text'; // Importing Lexical's HeadingNode for rich text editing
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'; // Auto-focus plugin for the editor
import { LexicalComposer } from '@lexical/react/LexicalComposer'; // LexicalComposer component to manage editor configuration
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'; // Plugin for rendering rich text content
import { ContentEditable } from '@lexical/react/LexicalContentEditable'; // Component to render editable content
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'; // Plugin to manage editor history (undo/redo)
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'; // Error boundary for the editor
import React from 'react';
import {
  FloatingComposer,
  FloatingThreads,
  liveblocksConfig,
  LiveblocksPlugin,
} from '@liveblocks/react-lexical'; // Liveblocks integration for real-time collaboration
import { useThreads } from '@liveblocks/react/suspense'; // Hook to get active threads for real-time collaboration
import DeleteModal from '../DeleteModal'; // Importing DeleteModal component for the editor
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin'; // Importing floating toolbar plugin
import Comments from '../Comments'; // Comments section for collaborative editing

// Placeholder component for the editor when no content is present
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

// Editor component to manage the collaborative rich text editor
export function Editor({
  roomId, // The room ID for the collaborative session
  currentUserType, // Current user's role type (e.g., editor, viewer)
}: {
  roomId: string;
  currentUserType: UserType;
}) {
  const { threads } = useThreads(); // Using the useThreads hook to get active threads for live commenting

  // Initial configuration for Lexical editor with Liveblocks integration
  const initialConfig = liveblocksConfig({
    namespace: 'Editor', // Namespace for the Liveblocks room
    nodes: [HeadingNode], // Defining custom nodes (e.g., headings) in the editor
    onError: (error: Error) => {
      console.error(`Editor error: ${error}`); // Handle any editor errors
      throw error; // Rethrow the error for further handling
    },
    theme: Theme, // Custom theme for the editor
    editable: currentUserType === 'editor', // Determine if the editor is editable based on user type
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {' '}
      {/* Wrapping the editor with LexicalComposer */}
      <div className="editor-container size-full">
        {' '}
        {/* Container for the editor */}
        <div className="toolbar-wrapper flex min-w-full justify-between">
          {' '}
          {/* Toolbar wrapper */}
          <ToolbarPlugin />{' '}
          {/* Toolbar for text formatting and other actions */}
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}{' '}
          {/* Show delete modal for editor */}
        </div>
        <div className="editor-wrapper flex flex-col items-center justify-start">
          {' '}
          {/* Editor content area */}
          <div className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
            {/* RichTextPlugin to render editable content */}
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-full" />
              } // Editable area
              placeholder={<Placeholder />} // Placeholder when the editor is empty
              ErrorBoundary={LexicalErrorBoundary} // Error boundary for handling errors in the editor
            />
            {currentUserType === 'editor' && <FloatingToolbarPlugin />}{' '}
            {/* Floating toolbar for editors */}
            <HistoryPlugin /> {/* Plugin to manage undo and redo actions */}
            <AutoFocusPlugin /> {/* Plugin to autofocus the editor */}
          </div>
          {/* Liveblocks plugin for real-time collaboration */}
          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />{' '}
            {/* Floating composer for live comments */}
            <FloatingThreads threads={threads} />{' '}
            {/* Display active threads for comments */}
            <Comments /> {/* Comments section for collaboration */}
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
