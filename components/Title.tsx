import Image from 'next/image';
import { useMutation, useStorage } from '@liveblocks/react/suspense';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { updateDocument } from '@/lib/actions/room.actions';

const Title = ({ roomId, currentUserType }: CollaborativeRoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = useStorage((root) => root.room.title);
  console.log('Title', title);

  const updateTitle = useMutation(({ storage }, newTitle: string) => {
    const room = storage.get('room');
    room.set('title', newTitle);
  }, []);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setLoading(true);

      try {
        // updateTitle(title);
        await updateDocument(roomId, title);

        setEditing(false);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, title);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [roomId, title]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <>
      <div
        ref={containerRef}
        className="flex w-fit items-center justify-center gap-2"
      >
        {editing && !loading ? (
          <Input
            type="text"
            value={title}
            ref={inputRef}
            placeholder="Enter title"
            onChange={(e) => updateTitle(e.target.value)}
            onKeyDown={updateTitleHandler}
            disabled={!editing}
            className="document-title-input"
          />
        ) : (
          <p className="document-title">{title}</p>
        )}

        {currentUserType === 'editor' && !editing && (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={24}
            height={24}
            onClick={() => setEditing(true)}
            className="pointer"
          />
        )}
        {currentUserType !== 'editor' && !editing && (
          <p className="view-only-tag">View only</p>
        )}

        {loading && <p className="text-sm text-gray-400">saving...</p>}
      </div>
    </>
  );
};

export default Title;
