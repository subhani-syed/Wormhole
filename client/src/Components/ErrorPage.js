import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ErrorPage = () =>{
    return (<>
        <Header></Header>
        <div className="bg-[#555555] rounded-[30px] m-10 p-10 border-4 border-black drop-shadow-[4px_4px_0px_black]">
            <h1 className="text-6xl">Oops!! something went wrong...</h1>
            <h1 className="text-4xl">If you expected to see files here, they've already been deleted. Wormhole automalically deletes the files once it expires</h1>
            <button className="bg-[#FFFF00] rounded-[30px] border-4 border-black m-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200"><Link to="/">Send Files</Link></button>
        </div>
        <Footer></Footer>
    </>);
}

export default ErrorPage;