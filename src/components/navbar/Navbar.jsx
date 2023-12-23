import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LinkComponent from "./Link";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useState } from "react";
import { UserContext } from "../AuthContextWraper";
import Tooltip from "./Toolip";

export default function Navbar() {
  const [mobileView, setMobileView] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const link = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About us",
      link: "/about",
    },
    {
      name: "Register",
      link: "/register",
    },
  ];

  return (
    <>
      <div className="responsive flex justify-between items-center mt-6">
        {/* logo */}
        <p className="font-bold text-[2rem] cursor-default">TSK</p>

        {/* links */}
        <div className="flex justify-center items-center gap-[2.19rem] sm:hidden md:flex">
          {link.map((data, index) => (
            <LinkComponent name={data.name} navigate={data.link} key={index} />
          ))}
        </div>

        {/* show profile logo or login button based on user loged in or not */}
        {userData === null || userData.profilePic === null ? (
          <div className="">
            <Link to={"/login"}>
              <Button variant="contained">Login</Button>
            </Link>
          </div>
        ) : (
          <Tooltip userData={userData} setUserData={setUserData} />
        )}

        {/* hamber menu for mobile devices */}
        <div
          className="sm:block md:hidden cursor-pointer"
          onClick={() => setMobileView(true)}
        >
          <MenuIcon />
        </div>
      </div>

      {/* mobile view links */}
      {mobileView && (
        <div className="glassEffect z-[100000000] absolute w-full h-screen flex justify-center items-center">
          <div className="flex flex-col gap-[2.18rem] text-center">
            {link.map((data, index) => (
              <div key={index} onClick={() => setMobileView(false)}>
                <LinkComponent
                  name={data.name}
                  navigate={data.link}
                  key={index}
                />
              </div>
            ))}
            <div onClick={() => setMobileView(false)}>
              <CancelIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
