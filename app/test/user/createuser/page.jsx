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
    return { message: "มีผู้ใช้งานอยู่แล้ว" };
  }
};

export default async function user() {
  return (
    <div className="min-h-screen ">
      <div class="px-40 mx-96 font-bold text-3xl m-5 backdrop-blur-md bg-white/5 rounded-xl py-10" >
        <h1 className="text-center">Add User</h1>

        <div className="ms-20">
          <label for="C_username">Username</label>
          <input
            type="text"
            id="C_username"
            name="C_username"
            class="border-2 border-black ms-4 mt-10"
            pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            title="username must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
          ></input>
          <p id="username-text" className="m-0 mt-3 p-0 text-xs text-red-600 hidden">
            username must contain at least 8 characters with at least one letter
            and one number, and can't contain special characters.
          </p>
        </div>
        <div className="ms-20">
          <label for="C_password">Password</label>
          <input
            type="text"
            id="C_password"
            name="C_password"
            class="border-2 border-black ms-4 mt-10"
          ></input>
          <p id="password-text" className="m-0 mt-3 p-0 text-xs text-red-600 hidden">
            Password must contain at least 8 characters with at least one letter
            and one number, and can't contain special characters.
          </p>
        </div>
        <div className="ms-20">
          <label for="C_email">Email</label>
          <input
            type="email"
            id="C_email"
            name="C_email"
            class="border-2 border-black ms-4 mt-10"
          ></input>
          <p id="email-text" className="m-0 mt-3 p-0 text-xs text-red-600 hidden">
            ใส่รูปแบบ email ให้ถูกต้อง
          </p>
        </div>
        <button
          type="submit"
          onClick={async () => {
            const username = document.getElementById("C_username").value;
            const password = document.getElementById("C_password").value;
            const email = document.getElementById("C_email").value;
            const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const emailPattern =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            console.log(username);;
            console.log(password);
            console.log(email);
            if (
              usernamePattern.test(username) &&
              passwordPattern.test(password) &&
              emailPattern.test(email)
            ) {
              document.getElementById("username-text").classList.add("hidden");
              document.getElementById("password-text").classList.add("hidden");
              document.getElementById("email-text").classList.add("hidden");

              const { message } = await adduser(username, password, email);
              console.log(message);
              
              alert(message);
              if(message =="User Created"){
                window.location.href='/';
              }
            } else {
              alert("โปรดกรอกข้อมูลให้ครบ");
              if (!usernamePattern.test(username)) {
                document
                  .getElementById("username-text")
                  .classList.remove("hidden");
              }else{
                document
                  .getElementById("username-text")
                  .classList.add("hidden");
              }
              if (!passwordPattern.test(password)) {
                document
                  .getElementById("password-text")
                  .classList.remove("hidden");
              }else{
                document
                  .getElementById("password-text")
                  .classList.add("hidden");
              }
              if (!emailPattern.test(email)) {
                document
                  .getElementById("email-text")
                  .classList.remove("hidden");
              }else{
                document
                  .getElementById("email-text")
                  .classList.add("hidden");
              }
            }
          }}
          className="flex mx-auto mt-10 border-2 border-black hover:bg-orange-400 hover:border-orange-600 p-5 rounded-2xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
