import { Link } from "react-router-dom";

const ErrorPage = () =>{
    return (<>
        <Link to="/">Wormhole</Link>
        <h1>Oops!! something went wrong...</h1>
        <h1>Page Not Found</h1>
        <h4>If you expected to see files here, they've already been deleted. Wormhole automalically deletes the files once it expires</h4>
        <button><Link to="/">Send Files</Link></button>
    </>);
}

export default ErrorPage;