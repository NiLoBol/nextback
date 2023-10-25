const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
export default async function Home() {
  const { topics } = await getTopics();
  return (
    <div className="min-h-screen">
      <div className="font-bold text-5xl">
        <p>use database in /api/topics</p>
      </div>
      <div className="flex  justify-center flex-wrap items-center pt-20">
        {topics.map((data) => {
          return (
            <div className="p-10 w-3/4 bg-blue-400 flex-row flex my-3">
              <p className="text-white font-bold  w-1/3 text-3xl">
                {data.title}
              </p>
              <p className="text-white w-2/3 my-auto">{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
