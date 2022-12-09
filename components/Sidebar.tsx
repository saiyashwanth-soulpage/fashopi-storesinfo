import Image from "next/image";
import Link from "next/link";
import Dashboardicon from "../public/dashboardsidebar.png";
import Storeinfoicon from "../public/storesidebar.png";
import Insightsicon from "../public/insightssidebar.png";
import Offersicon from "../public/offerssidebar.png";
import Logouticon from "../public/logout.png";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { toast } from "react-toastify";

export default function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    toast.success("Logged out ", { autoClose: 1000 });
    cookie.remove("accessToken");
    router.push("/allstores");
  }

  return (
    <div className="sidebar">
      <div className="storenamediv">
        <p>Store Name</p>
      </div>

      <div className="sidebarfirst">
        <Link href="/dashboard" className="hideMenuUnderline text-muted">
          <div className="sidebardashboard">
            <Image
              src={Dashboardicon}
              alt="dashboard"
              className="hoverbgsidebaricons"
            />
            <p>Dashboard</p>
          </div>
        </Link>
        {/* <a href="#">dsfsdfsdf</a> */}

        <Link href="/storeinfo" className="hideMenuUnderline text-muted">
          <div className="sidebarstoreinfo">
            <Image
              src={Storeinfoicon}
              alt="storeinfo"
              className="hoverbgsidebaricons"
            />
            <p>Store Info</p>
          </div>
        </Link>

        <Link href="/insights" className="hideMenuUnderline text-muted">
          <div className="sidebarinsights">
            <Image
              src={Insightsicon}
              alt="insights"
              className="hoverbgsidebaricons"
            />
            <p>Insights</p>
          </div>
        </Link>

        <Link href="/offers" className="hideMenuUnderline text-muted">
          <div className="sidebaroffers">
            <Image
              src={Offersicon}
              alt="offers"
              className="hoverbgsidebaricons"
            />
            <p>Offers</p>
          </div>
        </Link>
      </div>

      <div className="sidebarlast">
        <div className="sidebarlogout">
          <Image
            src={Logouticon}
            alt="logout"
            className="hoverbgsidebaricons"
          />
          <button onClick={handleLogout} className="logoutbuttonsidebar">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
