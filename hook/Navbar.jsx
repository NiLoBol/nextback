"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const login = async (username, password) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;

    const userData = {
      username,
      password,
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }
    console.log(res.json);
    return res.json();
  } catch (error) {
    return { message: "ERROR" };
  }
};
function Navbar() {
    const [user, setuser] = useState("");
    const [data, setdata] = useState("");
  useEffect(() => {
    // Perform localStorage action
    console.log(sessionStorage.getItem("user"));
    if(sessionStorage.getItem("user")!=undefined){
      const newuser = JSON.parse(sessionStorage.getItem("user"));
      setuser(newuser);
      console.log(newuser);
    }
    else  {
      setuser("")
    }
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ul class="flex fixed bg-yellow-400 w-full top-0 py-5 px-30 text-center">
      <li class="basis-3/12">
        <button
          type="button"
          class=" text-white font-bold  rounded-lg text-sl px-5 py-2.5 me-2 mb-2"
        >
          HOME
        </button>
      </li>
      <li class="basis-1/12 flex">
        <Link
          href="/test/user/createuser"
          class="text-white bg-yellow-400 hover:bg-white hover:text-orange-500 hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Sing up
        </Link>
      </li>
      {user ==""?
      (<li class="basis-3/12 flex">
      <input
        type="text"
        className="w-32  text-sm px-5 py-2.5 me-2 mb-2 focus-visible:outline-0"
        placeholder="username"
        id="username"
        name="username"
        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
        title="username must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
      />
      <input
        type="text"
        className="w-32  text-sm px-5 py-2.5 me-2 mb-2 focus-visible:outline-0"
        placeholder="password"
        id="password"
        name="password"
        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
        title="Password must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
      />
      <button
        type="submit"
        class="text-white bg-yellow-400 hover:bg-white hover:text-orange-500 hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={async()=>{
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const res =await login(username,password);
          console.log(res);
          alert(res.message);

          if(res.fail==false){
            // signIn(user.username, user.password,user.email);
            sessionStorage.setItem('user', JSON.stringify(res.user));

            console.log(res.user);
            window.location.href='/';
            
          }
        }}
      >

Login
      </button>
      
    </li>)
      :(<button
        type="submit"
        class="text-white bg-yellow-400 hover:bg-white hover:text-orange-500 hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={()=>{
          sessionStorage.removeItem('user');
          window.location.reload();
        }}
      >

Logout
      </button>)}

      <li class="basis-3/12"></li>
    </ul>
  );
}

export default Navbar;
