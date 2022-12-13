import {useLocation, Link} from "react-router-dom"

type Props = {}

function Navbar({}: Props) {
    const location :{pathname:string}= useLocation()
    const path :string= location.pathname.split("/")[1].toLowerCase()

    return (
        <div className="header">
        <span className="big-text">
            Find your film
        </span>
        <span className="small-text">
             {
                 path === "list" ? 
                 <Link to = "/">Search for Movies</Link >: 
                 <Link to = "/list">My Watchlist</Link >
            }
        </span>
    </div>
  )
}

export default Navbar