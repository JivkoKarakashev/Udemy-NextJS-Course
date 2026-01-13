import type { Metadata } from "next";

import "../globals.scss";

import { logout } from "@/actions/auth.ts";

export const metadata: Metadata = {
    title: "Next Auth",
    description: "Next.js Authentication",
};

const AuthRootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body>
                <header id="auth-header">
                    <p>Welcome back!</p>
                    <form action={logout}>
                        <button type='submit'>Logout</button>
                    </form>
                </header>
                {children}
            </body>
        </html>
    );
};

export default AuthRootLayout;