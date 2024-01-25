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
const clickboxtodouser = async (id, ids, box) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todo/complete/${id}`;

    const userData = {
      ids,
      box,
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
  const Unlogin = () => {
    const [user, setuser] = useState("");
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
    return (
      <div className="flex items-center justify-center xl:min-h-[650px] w-screen  ">
        <div class="text-start font-bold xl:text-3xl text-sm sm:text-lg m-5 backdrop-blur-sm bg-white/5 xl:p-32 p-12 rounded-xl">
          <h1 className="text-white">Login</h1>
          <div>
            <label className="text-white" for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              class="border-2 border-black ms-4 mt-10 w-84 w-[200px] sm:w-2/3"
              pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="username must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
            ></input>
          </div>
          <div>
            <label className="text-white" for="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              class="border-2 border-black ms-4 mt-10  w-[200px] sm:w-2/3 "
              pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Password must contain at least 8 characters with at least one letter and one number, and can't contain special characters."
            ></input>
          </div>
          <button
            type="submit"
            className="before:ease relative h-12 w-40  overflow-hidden mt-10
            border rounded-xl border-none 
            text-2xl text-white
            shadow-2xl transition-all before:absolute 
            before:top-1/2 before:h-0 before:w-64 before:origin-center 
            before:-translate-x-20 before:rotate-45 
            before:bg-gradient-to-t before:from-green-300 before:via-blue-500 before:to-purple-600
            before:duration-300  hover:shadow-blue-500 
            hover:before:h-48 hover:before:-translate-y-20 mt-1 "
            onClick={async () => {
              const username = document.getElementById("username").value;
              const password = document.getElementById("password").value;
              const res = await login(username, password);
              console.log(username);
              console.log(res);
              alert(res.message);

              if (res.fail == false) {
                // signIn(user.username, user.password,user.email);
                sessionStorage.setItem("user", JSON.stringify(res.user));

                console.log(res.user);
                window.location.href = "/";
              }
            }}
          >
            <span class="relative z-10">Submit</span>
          </button>
        </div>
      </div>
    );
  };
  const TodoPage = () => {
    return (
      <div className="w-screen m-50">
        {/* <h1 className="text-5xl font-bold my-5">
          ยินดีต้อนรับ {user.username}
        </h1> */}
        <div className="xl:w-3/5 w-4/5 mx-auto mb-20 mt-10 ">
          <input
            type="text"
            className="text-center w-full text-xl xl:text-3xl font-extrabold  text-gray-600 focus-visible:outline-0 bg-white p-2 xl:p-5 rounded-full shadow-2xl border-stone-600 border-spacing-2"
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
          <div className="xl:w-3/5 w-4/5 my-5 py-10 backdrop-blur-md bg-white/5 w-3/4 mx-auto rounded-xl">
            {todo.map((singleTodo) => (
              <div
                id={singleTodo._id}
                key={singleTodo._id}
                className="p-3 xl:text-2xl text-lg flex flex-row justify-around xl:justify-center "
              >
                <input
                  type="checkbox"
                  className="basis-1/12"
                  checked={singleTodo.clickbox}
                  onChange={() =>
                    clickboxtodouser(
                      user.todo,
                      singleTodo._id,
                      !singleTodo.clickbox
                    ).then((value) => {
                      console.log(value.todos.todo);
                      setTodo(value.todos.todo);
                    })
                  }
                />
                <div className="xl:basis-6/12 basis-8/12 bg-purple-400 rounded-full  ">
                  {singleTodo.title}
                </div>
                <div
                  className="basis-1/12 hover:cursor-pointer buttonshow"
                  onClick={() => {
                    deletetodouser(user.todo, singleTodo).then((value) => {
                      console.log(value.todos.todo);
                      setTodo(value.todos.todo);
                    });
                  }}
                >
                  <div className="hidden text-red-600">X</div>
                </div>

                {/* Render other properties of singleTodo as needed */}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };
  return (
    <div className="container  text-center mx-auto  xl:mt-40">
      {user == undefined || user == "" ? (
        <Unlogin></Unlogin>
      ) : (
        <TodoPage></TodoPage>
      )}
    </div>
  );
}

export default page;
