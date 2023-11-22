"use client";
import useSessionStorage from "@/hook/useSessionStorage";
// const getTopics = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
//       cache: "no-store",
//     });
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };
export default  function Home() {
  // const { topics } = await getTopics();
  const [user, setuser] = useState("");
  useEffect(() => {
    // Perform localStorage action
    console.log(sessionStorage.getItem("user"));
    if(sessionStorage.getItem("user")!=undefined){
      const newuser = JSON.parse(sessionStorage.getItem("user"));
      setuser(newuser);
      console.log(newuser);
    }
    else  {
      setuser("User not Login")
    }
  }, []);
  return (
    // <div className="min-h-screen">
    //   <div className="font-bold text-5xl">
    //     <p>use database in /api/topics</p>
    //   </div>
    //   <div className="flex  justify-center flex-wrap items-center pt-20">
    //     {topics.map((data) => {
    //       return (
    //         <div className="p-10 w-3/4 bg-blue-400 flex-row flex my-3">
    //           <p className="text-white font-bold  w-1/3 text-3xl">
    //             {data.title}
    //           </p>
    //           <p className="text-white w-2/3 my-auto">{data.description}</p>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="min-h-screen">
      <div className="text-center font-bold text-3xl m-5">
        <h1>Test page</h1>
        <h1>Wecome user {user.username}</h1>
      </div>
      <div className="text-center font-bold text-2xl m-10">
        <h1>User database test</h1>
      </div>
      <div className="flex flex-row justify-around ">
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./test/topic"}>Topic page</Link>
        </div>
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./test/user"}>User page</Link>
        </div>
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./test/user/createuser"}>User create page</Link>
        </div>
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./test/user/login"}>Login page</Link>
        </div>
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./test/todo"}>Todo page</Link>
        </div>
      </div>
    </div>
  );
}
