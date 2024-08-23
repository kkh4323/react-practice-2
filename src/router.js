import {createBrowserRouter} from "react-router-dom";
import {BlogList, ChangePassword, CreateProfile, Detail, Login, Profile, ResetPassword, Signup} from "./pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BlogList/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/blog/:id',
        element: <Detail/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/profile/create',
        element: <CreateProfile/>
    },
    {
        path: '/profile/:profileId',
        element: <CreateProfile/>
    },
    {
        path: '/reset/password',
        element: <ResetPassword/>
    },
    {
        path: '/change/password',
        element: <ChangePassword/>
    }
])

export default router;