import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user"; // ให้แน่ใจว่าคุณได้ import โมเดล User อย่างถูกต้อง
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, email, password } = await request.json();
  await connectMongoDB();
  await User.create({ username, email, password });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}


export async function GET() {
  await connectMongoDB();
  const users = await User.find({},{ username: 1 });
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
