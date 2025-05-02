import AnimatedHero from "@/components/AnimatedHero";


export default async function Home({searchParams}:
   {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    // save query for later use
  return (
    <>
      <AnimatedHero query={query}  />
      <section className="mt-[1000rem]">
        <h1>hello</h1>
      </section>
    </>
  );
}