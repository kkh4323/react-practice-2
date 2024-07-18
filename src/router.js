import {createBrowserRouter} from "react-router-dom";
import {BlogList, Detail, Login, Profile, ResetPassword, Signup} from "./pages";
import ChangePassword from "./pages/ChangePassword";

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
        path: '/resetPassword',
        element: <ResetPassword/>
    },
    {
        path: '/change/password',
        element: <ChangePassword/>
    }
])

export default router;