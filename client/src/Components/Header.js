import {Link} from "react-router-dom";
const Header = () =>{
    return (<>
        <div className="flex bg-[#69D2E7] border-4 border-black justify-between m-10 p-10 rounded-[30px] drop-shadow-[4px_4px_0px_black]">
            <Link to="/">
                <div className="flex">
                    <img width="58" height="58" src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/external-galaxy-space-sbts2018-outline-sbts2018-3.png" alt="wormhole-logo"/>
                    <h1 className="text-6xl">Wormhole</h1>
                </div>
            </Link>
            <div className="flex">
                <a href="https://github.com/subhani-syed/Wormhole" target="_blank"><h1 className="text-4xl my-2">GitHub</h1></a>
            </div>
        </div>
    </>);
};

export default Header;