"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Navbar() {
  const [user, setuser] = useState("");
  const [data, setdata] = useState("");
  useEffect(() => {
    // Perform localStorage action
    console.log(sessionStorage.getItem("user"));
    if (sessionStorage.getItem("user") != undefined) {
      const newuser = JSON.parse(sessionStorage.getItem("user"));
      setuser(newuser);
      console.log(newuser);
    } else {
      setuser("");
    }
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ul class="flex justify-around fixed backdrop-blur-sm bg-white/5  w-full top-0 py-5 px-30 text-center">
      <li class="basis-3/12">
        <a
          type="button"
          class=" text-white font-bold  rounded-lg text-3xl px-5 py-2.5 me-2 mb-2 "
          href="/"
        >
          HOME
        </a>
      </li>

      {user == "" ? (
        <li class="basis-3/12 ">
        <button type="submit" onClick={() => {
          window.location.href='/test/user/createuser'
        }} class="before:ease relative h-12 w-40  overflow-hidden
        border rounded-xl border-none 
        text-2xl text-white
        shadow-2xl transition-all before:absolute 
        before:top-1/2 before:h-0 before:w-64 before:origin-center 
        before:-translate-x-20 before:rotate-45 
        before:bg-gradient-to-t before:from-green-300 before:via-blue-500 before:to-purple-600
        before:duration-300  hover:shadow-blue-500 
        hover:before:h-44 hover:before:-translate-y-20 mt-1 " >
          <span class="relative z-10">Sing up</span>
        </button>
      </li>
      ) : (
        <li class="basis-3/12 ">
          <button type="submit" onClick={() => {
            sessionStorage.removeItem("user");
            window.location.reload();
          }} class="before:ease relative h-12 w-40  overflow-hidden
          border rounded-xl border-none 
          text-2xl text-white
          shadow-2xl transition-all before:absolute 
          before:top-1/2 before:h-0 before:w-64 before:origin-center 
          before:-translate-x-20 before:rotate-45 
          before:bg-gradient-to-t before:from-green-300 before:via-blue-500 before:to-purple-600
          before:duration-300  hover:shadow-blue-500 
          hover:before:h-44 hover:before:-translate-y-20 mt-1 " >
            <span class="relative z-10">Logout</span>
          </button>
        </li>
          
      )}

    </ul>
  );
}

export default Navbar;
