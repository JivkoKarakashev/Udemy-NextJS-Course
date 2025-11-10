import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Posts from './routes/Posts.tsx';
import NewPost from './routes/NewPost.tsx';
import RootLayout from './routes/RootLayout.tsx';
import PostDetails from './routes/PostDetails.tsx';

const router = createBrowserRouter([
    {
        path: '/', element: <RootLayout />,
        children: [
            {
                path: '/', element: <Posts />,
                children: [
                    { path: 'create-post', element: <NewPost /> },
                    { path: ':id', element: <PostDetails /> },
                ]
            },
        ]
    },
]);

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;