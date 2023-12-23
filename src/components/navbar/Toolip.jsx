import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";

import logoutUser from "../../services/auth/logout";
import { Link } from "react-router-dom";

export default function Toolip({ userData, setUserData }) {
  const [model, setModel] = useState(false);
  return (
    <>
      <div className="relative">
        <div onClick={() => setModel(!model)} className="cursor-pointer">
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={userData.name}
            src={userData.profilePic}
          />
        </div>

        {model && (
          <div className="absolute z-[1000000] sm:right-[-180%] md:right-0 bg-gray-100 rounded-xl px-[2rem] py-4 flex flex-col gap-4">
            <p>{userData.email}</p>

            <Link to={`/dashboard`} className="cursor-pointer">
              Dashboard
            </Link>

            <div onClick={() => logoutUser(setUserData)}>
              <Button variant="outlined">Log out</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
