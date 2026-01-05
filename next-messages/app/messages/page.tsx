import { ReactElement } from 'react';

import Messages from '@/components/messages.tsx';
import { getMessages } from '@/lib/api.ts';

const MessagesPage = async (): Promise<ReactElement> => {
  // const headers: Record<string, string> = {
  //   'X-ID': 'page'
  // };
  // const messages = await getServerMessages(headers);
  // const messages = await getServerMessages();
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
};

export default MessagesPage;
