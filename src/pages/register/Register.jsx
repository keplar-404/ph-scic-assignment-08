import React from "react";
import Form from "./Form";

export default function Register() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl balboo">
              Register a new account
            </h1>
          </div>

          <Form />
        </div>
      </div>
    </>
  );
}
