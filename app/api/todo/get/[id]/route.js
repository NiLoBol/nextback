import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { title, description } = await request.json();
//   await connectMongoDB();
//   await Todo.create({ title, description });
//   return NextResponse.json({ message: "Todo Created" }, { status: 201 });
// }

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const todos = await Todo.findOne({ _id: id });
  return NextResponse.json({ todos }, {status:200});
}
