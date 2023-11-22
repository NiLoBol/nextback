"use client";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const gettodouser = async (id) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todo/get/${id}`;

    const res = await fetch(apiUrl, {
      method: "GET",
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
    return { message: "มีผู้ใช้งานอยู่แล้ว" };
  }
};
const addtodouser = async (id, title) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todo/add/${id}`;

    const userData = {
      title,
    };

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    return res.json();
  } catch (error) {
    return { message: "ERROR" };
  }
};
const deletetodouser = async (id, ids) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todo/delete/${id}`;

    const userData = {
      ids,
    };

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    return res.json();
  } catch (error) {
    return { message: "ERROR" };
  }
};
const clickboxtodouser = async (id, ids,box) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todo/complete/${id}`;

    const userData = {
      ids,box
    };

    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(userData), // Convert the user data to JSON
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    return res.json();
  } catch (error) {
    return { message: "ERROR" };
  }
};
function page() {
  const [user, setuser] = useState("");

  useEffect(() => {
    // Perform localStorage action
    console.log(sessionStorage.getItem("user"));
    if (sessionStorage.getItem("user") != undefined) {
      const newuser = JSON.parse(sessionStorage.getItem("user"));
      setuser(newuser);
      console.log(newuser);
    } else {
    }
  }, []);

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.todo != undefined) {
          const value = await gettodouser(user.todo);
          console.log(value);
          setTodo(value.todos.todo);
        }

        console.log(todo);
      } catch (error) {
        console.error("Error fetching todo:", error.message);
      }
    };

    fetchData();
  }, [user.todo]);
  useEffect(() => {
    // Log todo whenever it changes
    console.log(todo);
  }, [todo]);
  return (
    <div className="container content-center text-center mx-auto">
      <h1 className="text-3xl mt-16">Todo Page</h1>

      {user == undefined || user == "" ? (
        <div>
          <h1 className="text-5xl font-bold my-5">โปรด Login หรือ สมัครที่</h1>
          <div className="flex flex-row justify-around items-center min-w-full">
            <a href="/test/user/login" className="px-10 py-5 bg-yellow-500">
              Login
            </a>
            <a
              href="/test/user/createuser"
              className="px-10 py-5 bg-yellow-500"
            >
              Register
            </a>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold my-5">
            ยินดีต้อนรับ {user.username}
          </h1>
          <div className="w-3/4 mx-auto">
            <input
              type="text"
              className="text-center w-full text-3xl text-gray-600 focus-visible:outline-0 "
              placeholder="Click to add Todo"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const res = addtodouser(user.todo, e.target.value);
                  res.then((value) => {
                    setTodo(value.todos.todo);
                    console.log(value.todos.todo);
                    e.target.value = "";
                  });
                  // res.then(value=>{setTodo(value)})
                }
              }}
            ></input>
          </div>
          {todo != null ? (
            todo.map((singleTodo) => (
              <div
                id={singleTodo._id}
                key={singleTodo._id}
                className=" p-3 text-2xl flex flex-row justify-center "
              >
                <input
                  type="checkbox"
                  className="basis-3/12"
                  checked={singleTodo.clickbox}
                  onChange={() => clickboxtodouser(user.todo,singleTodo._id,!singleTodo.clickbox).then((value) => {
                    console.log(value.todos.todo);
                    setTodo(value.todos.todo);
                  })}
                />
                <div className="basis-6/12">{singleTodo.title}</div>
                <div
                  className="basis-3/12 hover:cursor-pointer"
                  onClick={() => {
                    deletetodouser(user.todo,  singleTodo).then((value) => {
                      console.log(value.todos.todo);
                      setTodo(value.todos.todo);
                    });
                  }}
                >
                  X
                </div>
                {/* Render other properties of singleTodo as needed */}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default page;
