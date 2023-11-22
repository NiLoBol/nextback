import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user"; // ให้แน่ใจว่าคุณได้ import โมเดล User อย่างถูกต้อง
import { NextResponse } from "next/server";
import Todo from "@/models/todo";
export async function POST(request) {
  const { username, email, password } = await request.json();
  await connectMongoDB();
  const tododata = await Todo.create({});
  await User.create({ username, email, password ,todo: tododata._id});
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}


export async function GET() {
  await connectMongoDB();
  const users = await User.find({});
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
