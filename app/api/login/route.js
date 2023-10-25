import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user"; // ให้แน่ใจว่าคุณได้ import โมเดล User อย่างถูกต้อง
import { NextResponse } from "next/server";


export async function POST(request) {
    const { username, password } = await request.json();
    await connectMongoDB();
    const user = await User.findOne({ username, password });
  
    if (user) {
      // ผู้ใช้เข้าสู่ระบบสำเร็จ
      return NextResponse.json({ message: "Login Successful",user:user,fail:false }, { status: 200 });
    } else {
      // ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
      return NextResponse.json({ message: "Login Failed" ,fail:true}, { status: 401 });
    }
}

