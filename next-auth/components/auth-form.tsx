'use client';

import { useActionState, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import authIcon from '@/public/images/auth-icon.jpg';
import { register } from '@/actions/auth.ts';
import { formStateInit } from '@/types/form-state';

const AuthForm = (): React.ReactElement => {
  const [formState, formAction] = useActionState(register, { ...formStateInit });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form id="auth-form" action={formAction}>
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
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        {!formState.valid && formState.stage === 'updated' && (
          <span className='form-error'>{formState.email.error}</span>
        )}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        {!formState.valid && formState.stage === 'updated' && (
          <span className='form-error'>{formState.password.error}</span>
        )}
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
