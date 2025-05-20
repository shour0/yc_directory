import AnimatedHero from "@/components/AnimatedHero";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:
   {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query; 
    const params = { search: query || null}

    const session = await auth()

    console.log(session?.id);
    
    const { data:posts } = await sanityFetch({query: STARTUPS_QUERY,params}) 

    console.log(JSON.stringify(posts, null, 2))

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

      <SanityLive />
    </>
  );
}