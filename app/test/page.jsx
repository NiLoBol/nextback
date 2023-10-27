import Link from "next/link";

export default function test() {
  return (
    <div className="min-h-screen">
      <div className="text-center font-bold text-3xl m-5">
        <h1>Test page</h1>
      </div>
      <div className="text-center font-bold text-2xl m-10">
        <h1>User database test</h1>
      </div>
      <div className="flex flex-row justify-around ">
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./topic"}>Topic page</Link>
        </div>
        <div className="col-auto bg-yellow-300 p-5">
          <Link href={"./user"}>User page</Link>
        </div>

      </div>
    </div>
  );
}
