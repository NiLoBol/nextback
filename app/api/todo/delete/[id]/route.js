import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { ids: ids} = await request.json();
  
  await connectMongoDB();

  await Todo.updateOne(
    { _id: id },
    { $pull: { todo: { _id: { $in: ids } } } }
  );
  const todos = await Todo.findOne({ _id: id });
  return NextResponse.json({ message: "Topic updated" ,todos}, { status: 200 });
}
