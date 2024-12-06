import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines class names using clsx and resolves conflicts using tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deep copies the given value by serializing and deserializing it
export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

// Returns the access permissions based on the user type
export const getAccessType = (userType: UserType) => {
  switch (userType) {
    case 'creator':
      return ['room:write']; // Creator can write to the room
    case 'editor':
      return ['room:write']; // Editor can write to the room
    case 'viewer':
      return ['room:read', 'room:presence:write']; // Viewer can read and write presence
    default:
      return ['room:read', 'room:presence:write']; // Default access for any unrecognized user type
  }
};

// Converts a timestamp to a human-readable relative time (e.g., '2 days ago')
export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  // Checks the difference in days, hours, minutes, and returns a human-readable string
  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return 'Just now';
  }
};

// Generates a random color in hex format, avoiding specified colors
export function getRandomColor() {
  const avoidColors = ['#000000', '#FFFFFF', '#8B4513']; // Black, White, Brown in hex format

  let randomColor;
  do {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256); // Random number between 0-255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert RGB to hex format
    randomColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  } while (avoidColors.includes(randomColor)); // Keep generating until the color is not in the avoid list

  return randomColor;
}

// Array of bright colors used for random selection
export const brightColors = [
  '#2E8B57',
  '#FF6EB4',
  '#00CDCD',
  '#FF00FF',
  '#FF007F',
  '#FFD700',
  '#00CED1',
  '#FF1493',
  '#00CED1',
  '#FF7F50',
  '#9ACD32',
  '#FFA500',
  '#32CD32',
  '#ADFF2F',
  '#DB7093',
  '#00FF7F',
  '#FFD700',
  '#FF007F',
  '#FF6347',
];

// Generates a color based on the user ID, ensuring consistency for each user
export function getUserColor(userId: string) {
  let sum = 0;
  // Calculate the sum of character codes of the userId to determine a unique color index
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i);
  }

  // Use the sum to select a color from the brightColors array
  const colorIndex = sum % brightColors.length;
  return brightColors[colorIndex];
}
