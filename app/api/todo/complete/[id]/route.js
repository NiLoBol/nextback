import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { ids: ids ,box:box } = await request.json();

  await connectMongoDB();

  await Todo.updateOne(
    { _id: id, "todo._id": ids },
    {
      $set: {
        "todo.$.clickbox":box ,
      },
    }
  );
  const todos = await Todo.findOne({ _id: id, "todo._id": ids });
  return NextResponse.json(
    { message: "Topic updated", todos },
    { status: 200 }
  );
}
