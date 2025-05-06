"use client"

import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import SearchForm from "./SearchForm";

gsap.registerPlugin(TextPlugin);

interface AnimatedHeroProps {
  query?: string;
}

const AnimatedHero = ({ query }: AnimatedHeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  

  const splitText = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = "";
    
    const words = text.split(" ");
    const output = words.map(word => {
      return `<span class="word inline-block mx-1">${
        word.split("").map(char => 
          `<span class="char inline-block">${char}</span>`
        ).join("")
      }</span>`;
    }).join(" ");
    
    element.innerHTML = output;
    return {
      chars: element.querySelectorAll(".char"),
      words: element.querySelectorAll(".word")
    };
  };

 

  useGSAP(() => {
    const master = gsap.timeline({ defaults: { ease: "power3.out" } });
  
    const headingTl = gsap.timeline();

    if (headingRef.current && headingWrapperRef.current) {

      gsap.set(headingWrapperRef.current, { 
        overflow: "hidden", 
        position: "relative", 
        display: "block"
      });
      

      gsap.set(headingRef.current, { opacity: 1 }); 
      
      const { words } = splitText(headingRef.current);
      
      headingTl.fromTo(headingWrapperRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"},
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power4.inOut"
        }
      );
    
      headingTl.fromTo(words, 
        { 
          y: -100, 
          opacity: 0, 
          rotationX: -100, 
          transformOrigin: "0% 50% -50" 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "back.out(1.7)" 
        }, 
        "-=0.8" 
      );

    }

    master.add(headingTl, 0.3);


    const subheadingTl = gsap.timeline();
 
    if (subHeadingRef.current) {
      gsap.set(subHeadingRef.current, { autoAlpha: 0 });

      const originalText = subHeadingRef.current.textContent || "";
      subHeadingRef.current.textContent = "";
    
      subheadingTl.to(subHeadingRef.current, {
        autoAlpha: 1,
        duration: 0.5
      });
    
      subheadingTl.to(subHeadingRef.current, {
        text: {
          value: originalText,
          delimiter: ""
        },
        duration: 2,
        ease: "none"
      });
     
      subheadingTl.to(subHeadingRef.current,
       { duration: 0.8, ease: "power2.inOut",}
      );
    }
   
    master.add(subheadingTl, 1.5);

    const formTl = gsap.timeline();
    
    if (formRef.current) {
      gsap.set(formRef.current, { autoAlpha: 0, scaleX: 0.8 });

      formTl.to(formRef.current, {
        autoAlpha: 1,
        scaleX: 1,
        duration: 1,
        ease: "elastic.out(1, 0.75)"
      });
     
      formTl.from('.search-input', {
        width: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.4");

      formTl.from('.search-btn', {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

    }

    master.add(formTl, 2.2);

  
    return () => {
      master.kill();
      if (decorationRef.current) {
        gsap.killTweensOf(decorationRef.current.children);
      }
    };
  }, []);

  return (

    <section ref={heroRef} className="pink_container relative overflow-hidden">
      
   
      <div ref={headingWrapperRef} className="w-full max-w-5xl mx-auto ">
        <h1 ref={headingRef} className="heading">
   
          Pitch Your Startup,&nbsp;<br/> Connect With Entrepreneurs
        </h1>
      </div>

      <p ref={subHeadingRef} className="sub-heading !max-w-3xl">
        
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
      </p>
      
      <div ref={formRef} className="w-full max-w-3xl ">
        <SearchForm query={query} />
        
      </div>
    </section>
   
  );
};

export default AnimatedHero;