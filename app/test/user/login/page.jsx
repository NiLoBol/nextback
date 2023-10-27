"use client";
import Link from "next/link";
import React from "react";

const adduser = async (username, password, email) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

    const userData = {
      username,
      password,
      email,
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

      throw new Error("Failed to add user");
    }

    return res.json();
  } catch (error) {
    
    return {message:"มีผู้ใช้งานอยู่แล้ว"};
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
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="border-2 border-black ms-4 mt-10"

          ></input>
        </div>
        <button
          type="submit"
          onClick={async()=>{
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
            if(usernamePattern.test(username) && passwordPattern.test(password) && emailPattern.test(email)){
                const { message } =await adduser(username, password, email);
                console.log(message);
                if(message){
                    alert(message);
                }
                else{
                    alert(message);
                }
            }
            else{
                alert("โปรดกรอกข้อมูลให้ครบ")
            }
          }}
        >

          Submit
        </button>

      </div>
    </div>
  );
}
