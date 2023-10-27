"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// const getuser = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };
const Deleteuser = async (id) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user?id=${id}`;

    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to add user");
    }

    return res.json();
  } catch (error) {
    console.log("Error adding user: ", error);
  }
};

export default function user() {
  const [users, setUsers] = useState([]);

  const getuser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }

      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userData = await getuser();
      if (JSON.stringify(users) !== JSON.stringify(userData.users)) {
        setUsers(userData.users);
        console.log(userData.users);
        console.log(users);
      }
    }
    console.log('run');
    fetchData();
  }, [users]);

  return (
    <div className="min-h-screen px-40">
      <div className="text-center font-bold text-2xl m-10">
        <h1>User database test</h1>
      </div>
      {users.length>0
        ? users.map((data, index) => {
            return (
              <div
                className="text-center font-bold text-2xl m-5"
                key={data._id}
              >
                <div className="flex flex-row">
                  <h1 className="basis-3/4 text-center px-10">
                    {data.username}
                  </h1>
                  <button
                    className="basis-1/4  bg-white px-10 text-right "
                    onClick={async () => {
                      await Deleteuser(data._id);
                      setUsers([]);
                      console.log(users);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
