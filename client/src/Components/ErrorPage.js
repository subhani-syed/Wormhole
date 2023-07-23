import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="bg-red-500 text-white rounded-lg border-4 border-black m-10 p-10 shadow-lg">
        <h1 className="text-6xl font-bold mb-4">
          Oops!! Something went wrong...
        </h1>
        <h1 className="text-4xl">
          If you expected to see files here, they've already been deleted.
          Wormhole automatically deletes the files once they expire.
        </h1>
        <Link to="/">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 border border-black mt-4">
            Send Files
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
