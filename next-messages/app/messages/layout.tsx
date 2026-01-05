import { ReactNode } from "react";

import { getMessages } from "@/lib/api.ts";

const MessagesLayout = async ({ children }: { children: ReactNode }) => {
  // const headers: Record<string, string> = {
  //   'X-ID': 'layout',
  // };
  // const messages = await getServerMessages(headers);
  // const messages = await getServerMessages();
  const messages = await getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
};

export default MessagesLayout;
