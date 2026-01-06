import Image from 'next/image';
import Link from 'next/link';

import authIcon from '@/public/images/auth-icon.jpg';

const AuthForm = (): React.ReactElement => {
  return (
    <form id="auth-form">
      <div>
        <Image
          src={authIcon}
          alt="A lock icon"
          loading='eager'
          fetchPriority='high'
        />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
};

export default AuthForm;
