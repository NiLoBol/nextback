import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title: title} = await request.json();
  const newTodoData = {
    title: title,
    clickbox:false,
  };
  await connectMongoDB();
  await Todo.updateOne(
    { _id: id },
    { $push: { todo: newTodoData } }
  );
  const todos = await Todo.findOne({ _id: id });
  return NextResponse.json({ message: "Topic updated",todos }, { status: 200 });
}
