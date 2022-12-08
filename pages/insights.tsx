import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

export default function Insights(){
    return(
        <>
        <Navbar/>

        <div className="sidebyside">
         <Sidebar/>
           <div className="insightsdiv">
               <h1>This is Insights page</h1>
           </div>
        </div>
        </>
    )
}