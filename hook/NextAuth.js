import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      // ที่นี่คุณกำหนดการกำหนดค่าของผู้ใช้ที่คุณสร้างเอง หรือใช้ระบบข้อมูลต่าง ๆ
      // ที่คุณใช้ในการตรวจสอบตัวตน ผ่านกลไกที่คุณเลือกใช้
    }),
    // คุณสามารถเพิ่ม providers อื่น ๆ ตามที่คุณต้องการ
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // ที่นี่คุณสามารถทำการปรับแต่งข้อมูลผู้ใช้หลังจากการตรวจสอบตัวตนเสร็จสิ้น
      // ตัวอย่างที่เราใช้ในที่นี้คือการกำหนดชื่อผู้ใช้
      user.name = "John Doe"; // แทนด้วยชื่อผู้ใช้จริงที่มาจากแหล่งข้อมูลของคุณ
      return Promise.resolve(user);
    },
  },
  // ตัวเลือกอื่น ๆ ของ NextAuth.js
});
