'use client';

import { ReactElement } from "react";

const ErrorPage = ({ error }: { error: Error }): ReactElement => {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>{error.message}</p>
        </main>
    );
};

export default ErrorPage;