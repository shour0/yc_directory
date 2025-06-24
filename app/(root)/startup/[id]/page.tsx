import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'

const md = markdownit()

// export const experemental_ppr = true

const Page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id = (await params).id

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  const parsedContent = md.render(post?.pitch || "")

  if (!post) return notFound()
  return <>
  <section className='pink_container !min-h-[230h]'>
    <p className='tag'>{formatDate(post?._createdAt)}</p>
    <h1 className='heading'>{post.title}</h1>
    <p className='sub-heading !max-w-5xl'>{post.description}</p>
  </section>

  <section className="section_container">
    <img
     src={post.image}
     alt='thumbail'
     className='w-full h-auto rounded-xl'
     />

     <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
      <div className='flex-between gap-5'>
        <Link href={`/user/${post.author?.author?._id}`} 
        className='flex gap-2 items-center mb-3'>
          <Image
           src={post.author.image}
           alt='avatar'
           width={64}
           height={64}
           className='rounded-full drop-shadow-lg'
           />
           <div className='text-20-medium'>{post.author.name}</div>
           <div className='text-20-medium'>@{post.author.username}</div>
        </Link>
        <p className='category-tag'>{post.category}</p>
      </div>
      
      <h3 className='text-30-bold'>PITCH DETAILS</h3>
      {parsedContent ? (
        <article 
        className='prose max-w-4xl font-work-sans break-all'
        dangerouslySetInnerHTML={{ __html: parsedContent}}
        />
      ) : (
        <p className='no-result'>No details provided</p>
      )}

      <hr className='divider'/>
     </div>

     {/* TODO: EDITOR SELECTED STARTUPS */}
  </section>
  <Suspense fallback={<Skeleton className="view_skeleton"/>}>
  <View id={id}/>
  </Suspense>
  </>
}

export default Page