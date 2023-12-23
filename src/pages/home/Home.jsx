import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Testimonial from "./Testimonial";
export default function Home() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="responsive mt-16 flex flex-col justify-center items-center">
        <p className="font-bold sm:text-[3rem] md:text-[4rem] text-center">
          Efficient Task <br />
          Management Strategies.
        </p>
        <div className="mt-[4rem]">
          <Link to={"/login"}>
            <Button variant="contained">Let’s Explore</Button>
          </Link>
        </div>


<Testimonial/>

      </div>
    </div>
  );
}
