// Defines the parameters expected for search functionality, specifically an object containing a 'Promise' resolving to an 'id' string.
declare type SearchParamProps = {
  params: Promise<{ id: string }>;
};

// Defines the types of access a user can have, either write access to the room or read and presence write access.
declare type AccessType = ['room:write'] | ['room:read', 'room:presence:write'];

// Defines a record of room accesses, where each room (represented by a string key) has an associated access type.
declare type RoomAccesses = Record<string, AccessType>;

// Defines possible user roles within the application, such as creator, editor, or viewer.
declare type UserType = 'creator' | 'editor' | 'viewer';

// Metadata associated with a room, including the creator's ID, the email of the creator, and the room's title.
declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

// Parameters for creating a document, requiring a user ID and email for the user initiating the creation.
declare type CreateDocumentParams = {
  userId: string;
  email: string;
};

// Represents a user with an ID, name, email, avatar, color, and an optional user type (creator, editor, or viewer).
declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

// Parameters for sharing a document, including the room ID, the email of the user to share with, their user type, and the user who updated the document.
declare type ShareDocumentParams = {
  roomId: string;
  email: string;
  userType: UserType;
  updatedBy: User;
};

// Props for selecting a user type, which includes the current user type, a setter function to update the user type, and an optional onClick handler.
declare type UserTypeSelectorParams = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
};

// Props for the share document dialog, which includes the room ID, a list of collaborators, the creator's ID, and the current user's type.
declare type ShareDocumentDialogProps = {
  roomId: string;
  collaborators: User[];
  creatorId: string;
  currentUserType: UserType;
};

// Defines the structure for a header component, which can have children elements and an optional className for styling.
declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

// Props for a collaborator component, which includes the room ID, email of the collaborator, creator's ID, and user information.
declare type CollaboratorProps = {
  roomId: string;
  email: string;
  creatorId: string;
  collaborator: User;
  user: User;
};

// Props for a collaborative room component, which includes the room ID, metadata, a list of users, and the current user's type.
declare type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: RoomMetadata;
  users: User[];
  currentUserType: UserType;
};

// Props for the button used to add a document, requiring the user ID and email of the user who is adding the document.
declare type AddDocumentBtnProps = {
  userId: string;
  email: string;
};

// Props for a modal that asks for confirmation before deleting a room, requiring the room ID.
declare type DeleteModalProps = { roomId: string };

// Props for wrapping a thread, which includes the thread's data and its associated metadata.
declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };

// Defines the structure for a room document, which includes the document's ID, title metadata, and creation timestamp.
declare interface RoomDocumentProps {
  id: string;
  metadata: {
    title: string;
  };
  createdAt: string;
}
