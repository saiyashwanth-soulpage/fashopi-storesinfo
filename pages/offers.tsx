import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

export default function Offers(){
    return(
        <>
        <Navbar/>

        <div className="sidebyside">
        <Sidebar/>
        <div className="offersdiv">
            <h1>This is Offers page</h1>
        </div>
        </div>
        </>
    )
}