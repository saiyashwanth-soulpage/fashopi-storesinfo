import Image from "next/image";
import Leftimage from "../public/Rectangleleftsignup.png";


export default function first() {
  return (
    <div className="greybg">
      <div className="fcenter">

        <div className="fsidebyside">
        <Image
            src={Leftimage}
            alt="image"
            className="leftimage"/>
         form
         </div>
      </div>
    </div>
  );
}
