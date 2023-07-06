import React from "react";
import ReactDom from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Upload from "./Components/Upload";
import ErrorPage from "./Components/ErrorPage";
import Download from "./Components/Download";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Upload />,
        errorElement: <ErrorPage/>,
    },
    {
        path:"/:file_id/:file_key",
        element: <Download/>,
        errorElement: <ErrorPage/>,
    }
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);