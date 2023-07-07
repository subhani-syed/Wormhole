import React from "react";
import ReactDom from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Upload from "./Components/Upload";
import ErrorPage from "./Components/ErrorPage";
import Download from "./Components/Download";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const router = createBrowserRouter([
    {
        path: "/",
        element:<>
            <Header/>
            <Upload />
            <Footer />
        </> ,
        errorElement: <ErrorPage/>,
    },
    {
        path:"/:file_id/:file_key",
        element: <>
            <Header/>
            <Download/>
            <Footer/>
        </>,
        errorElement: <ErrorPage/>,
    }
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);