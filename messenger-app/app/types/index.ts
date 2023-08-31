import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seenByUsers: User[];
};

// uses the existing conversation but it extends it to gives types of populated user and populated messages
// needed this because in our getCnversations action we use a query: *include*
// this populates the users and populates the messages..
// ... did this to fix and issue with types being incompatable when asigning
// conversations to initialItems in my layout.tsx file.
export type FullConversationType = Conversation & {
  participants: User[];
  messages: FullMessageType[];
};

export { User };
