import React from "react";
import ReactDom from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Upload from "./src/Components/Upload";
import ErrorPage from "./src/Components/ErrorPage";
import Download from "./src/Components/Download";
import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import dotenv from "dotenv";
dotenv.config();

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