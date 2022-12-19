import { toast } from "react-toastify";
import cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Logout () {

    const router = useRouter();

    async function handleLogout() {
        cookie.remove("accessToken");
        toast.success("Logged out ", { autoClose: 1000 });
        router.push("/allstores");
    }

    return <>{handleLogout}</>;

}