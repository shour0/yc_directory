import AnimatedHero from "@/components/AnimatedHero";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function Home({searchParams}:
   {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query; // extracts the query parameter
    const posts = await client.fetch(STARTUPS_QUERY) // Fetches startup data

    console.log(JSON.stringify(posts, null, 2)) // Logs the fetched data

  return (
    <>
      <AnimatedHero query={query}  />

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search results for ${query}` : 'All startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}