import {createBrowserRouter} from "react-router-dom";
import {BlogList, Detail, Login, Signup} from "./pages";

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
    }
])

export default router;