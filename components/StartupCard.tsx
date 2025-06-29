'use client'

import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author} 

const StartupCard = ({post}: {post: StartupTypeCard}) => {
useGSAP(() => {
    gsap.fromTo('.startup-card', 
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationX: 15,
        filter: "blur(8px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: "blur(0px)",
        delay: 1.5,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        transformOrigin: "center bottom"
      }
    )
  }, [])

  const {
   _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description
    } = post; // nested destructuring
  return (

    <li className="startup-card group opacity-0">
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(_createdAt)} 
        </p>
        <div className="flex gap-1.5">
         <EyeIcon className="size-6 text-primary"/>
         <span  className="text-16-medium">{views}</span>
        </div>
      </div>
      
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
        <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full"/>
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
      <p className="startup-card_desc">
        {description}
      </p>
      <img src={image} alt="placeholder" className="startup-card_img"/>
      </Link>
      
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
        <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
          Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard