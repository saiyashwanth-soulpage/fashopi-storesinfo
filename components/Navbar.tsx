import Image from "next/image";
import Link from "next/link";
import Fashpilogo from "../public/fashpilogo.png";
import Bell from "../public/bell.png";
import Userimage from "../public/userimage.png";
import Dropdown from "../public/dropdown.png"

export default function Navbar(){

return(

<div className="navbardiv">

     <div className="navbarleft">
       <Link href="/homepage"><Image src={Fashpilogo} alt="logo" /></Link> 
     </div>
     
     <div className="navbarcenter">
        <input type="search" placeholder="Search" className="navbarcentersearch"/>
        <button className="navbarcentersearchbutton">Search</button>
     </div>

     <div className="navbarright">
        <Image src={Bell} alt="notifications"/>
        <Image src={Userimage} alt="userimage"/>
        <p>Username</p>
        <Image src={Dropdown} alt="dropdown"/>
     </div>

</div>
)
}
