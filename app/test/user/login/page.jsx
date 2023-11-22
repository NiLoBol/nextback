"use client";
import Link from "next/link";
import React from "react";

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
    
    return {message:"ERROR"};
  }
};

export default async function user() {
  return (
    <div className="min-h-screen">
      <div class="text-center font-bold text-3xl m-5">
        <h1>Add User</h1>

        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            class="border-2 border-black ms-4 mt-10"
            pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          title="username must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
          ></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            class="border-2 border-black ms-4 mt-10"
            pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            title="Password must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
          ></input>
        </div>
        <button
          type="submit"
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

          Submit
        </button>

      </div>
    </div>
  );
}
