'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'; // Import Popover components for showing notifications
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from '@liveblocks/react-ui'; // Import Liveblocks components to manage inbox notifications
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from '@liveblocks/react/suspense'; // Hooks for fetching notifications and unread count
import Image from 'next/image';
import { ReactNode } from 'react';

const Notifications = () => {
  // Fetch inbox notifications and unread notifications count
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  // Filter unread notifications (those without a 'readAt' timestamp)
  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      {/* Popover Trigger button, which is the bell icon */}
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
        {/* Show unread notification badge if there are unread notifications */}
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
        )}
      </PopoverTrigger>

      {/* Popover content, containing the list of notifications */}
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
          // Custom override for the notification mention text
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            ),
          }}
        >
          <InboxNotificationList>
            {/* Display message if no new notifications */}
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">
                No new notifications
              </p>
            )}

            {/* Display unread notifications if any */}
            {unreadNotifications.length > 0 &&
              unreadNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-dark-200 text-white"
                  href={`/documents/${notification.roomId}`} // Redirect to the document link on click
                  showActions={false} // Hide actions (reply, delete, etc.)
                  kinds={{
                    // Custom handling for thread type notifications
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={false}
                        showRoomName={false}
                      />
                    ),
                    // Custom handling for text mention type notifications
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    // Custom handling for document access notifications
                    $documentAccess: (props) => (
                      <InboxNotification.Custom
                        {...props}
                        title={props.inboxNotification.activities[0].data.title}
                        aside={
                          <InboxNotification.Icon className="bg-transparent">
                            {/* Display avatar in the aside section */}
                            <Image
                              src={
                                (props.inboxNotification.activities[0].data
                                  .avatar as string) || ''
                              }
                              width={36}
                              height={36}
                              alt="avatar"
                              className="rounded-full"
                            />
                          </InboxNotification.Icon>
                        }
                      >
                        {props.children}
                      </InboxNotification.Custom>
                    ),
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
