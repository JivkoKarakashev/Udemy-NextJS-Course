import { MdPostAdd, MdMessage } from 'react-icons/md';

import styles from './Header.module.scss';

import type { HeaderProps } from '../types/headerProps.tsx';

const Header = ({ onCreatePost }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <MdMessage />
                React Poster
            </h1>
            <p>
                <button type="button" className={styles.button} onClick={onCreatePost}>
                    <MdPostAdd size={18} />
                    New Post
                </button>
            </p>
        </header>
    );
}

export default Header;