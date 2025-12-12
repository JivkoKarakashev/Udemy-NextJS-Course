import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/icons/logo.png';

const Header = (): ReactElement => {
  return (
    <header id="main-header">
      <Link href="/">
        <div className="img-wrapper">
          <Image
            src={logo.src}
            alt="Mobile phone with posts feed on it"
            loading='eager'
            fill
          />
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
