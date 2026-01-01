import { ReactElement } from "react";

import { Message } from "@/types/message.ts";

const Messages = ({ messages }: { messages: Message[] }): ReactElement => {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}

export default Messages;