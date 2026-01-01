import { ReactElement } from 'react';
import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/api.ts';
import { NewMessage } from '@/types/message.ts';

const NewMessagePage = (): ReactElement => {
  async function createMessage(formData: FormData) {
    'use server';

    const text = formData.get('message');
    if (!text) {
      throw new Error('Empty message not allowed!');
    }

    if (typeof text !== 'string') {
      throw new Error('Message must be a string!');
    }

    const message: NewMessage = {
      text
    }
    addMessage(message);
    redirect('/messages');
  };

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
};

export default NewMessagePage;
