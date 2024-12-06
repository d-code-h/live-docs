import { cn } from '@/lib/utils'; // Importing the utility function for conditional className concatenation
import { useIsThreadActive } from '@liveblocks/react-lexical'; // Importing hook to check if the thread is active
import { Composer, Thread } from '@liveblocks/react-ui'; // Importing components from Liveblocks for comments and threads UI
import { useThreads } from '@liveblocks/react/suspense'; // Importing the hook to fetch threads with suspense handling

// ThreadWrapper component renders individual threads and applies conditional styling based on the thread's state
const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id); // Check if the current thread is active

  return (
    <Thread
      thread={thread} // Passes the thread data to the Thread component
      data-state={isActive ? 'active' : null} // Sets the state of the thread (active or inactive)
      className={cn(
        'comment-thread border', // Base class for the comment thread with border styling
        isActive && '!border-blue-500 shadow-md', // Apply blue border and shadow if the thread is active
        thread.resolved && 'opacity-40' // Apply opacity if the thread is resolved
      )}
    />
  );
};

// Comments component renders the comment composer and maps over the threads to display each thread
const Comments = () => {
  const { threads } = useThreads(); // Fetches the threads data using the useThreads hook

  return (
    <div className="comments-container">
      {' '}
      {/* Wrapper div for the comments section */}
      <Composer className="comment-composer" />{' '}
      {/* Renders the composer for new comments */}
      {threads.map((thread) => (
        // For each thread, render the ThreadWrapper component and pass the thread data
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments; // Export the Comments component for use in other parts of the application
