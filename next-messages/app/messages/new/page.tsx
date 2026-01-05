import { ReactElement } from 'react';

import { createMessage } from '@/actions/create-message';

const NewMessagePage = (): ReactElement => {

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
