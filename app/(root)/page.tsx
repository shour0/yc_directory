import AnimatedHero from "@/components/AnimatedHero";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}:
   {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    
    const posts = [{
      _createdAt: new Date(),
      views: 55,
      author: { _id:1, name: 'Charbel' },
      _id: 1,
      description: 'This is a description.',
      image: 'https://imgs.search.brave.com/CiFBBPNZUnaw-L2s8-Vp21t9t-h4hUjLpHCJDPTVtTY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzEzLzU0LzYw/LzM2MF9GXzEzNTQ2/MDMyX0dHQ1VPZEk3/dXVrWEZGSEIyZkdt/c1pKZ2RoeW14TXo0/LmpwZw',
      category: "Robots",
      title: "we Robots",
    }]
  return (
    <>
      <AnimatedHero query={query}  />

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search results for ${query}` : 'All startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
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