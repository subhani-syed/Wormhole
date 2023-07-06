import { useRouteError } from "react-router-dom";

const ErrorPage = () =>{
    
    const error = useRouteError();

    return (<>
        <h1>Oops!! something went wrong...</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
    </>)
}

export default ErrorPage;