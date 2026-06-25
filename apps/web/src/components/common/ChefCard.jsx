'use client';
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

const ChefCard = ({
  name,
  designation,
  image,
  animationDelay,
  isActive,
  onToggle
}) => {
  const socialLinksRef = useRef(null); // Ref for the social links
  const timelineRef = useRef(null); // Ref for the GSAP timeline

  useEffect(() => {
    // Initialize the GSAP animation timeline
    timelineRef.current = gsap.timeline({
      paused: true,
      defaults: { ease: "back.inOut" }
    });

    timelineRef.current
      .to(socialLinksRef.current, {
        duration: 0.5,
        scale: 1,
        transformOrigin: "50% 50%",
      })
      .fromTo(
        socialLinksRef.current,
        { scaleX: 0 },
        {
          duration: 0.5,
          transformOrigin: "100% 50%",
          scaleX: 1,
          ease: "circ.inOut",
        },
        0.1
      )
      .fromTo(
        socialLinksRef.current,
        { scaleY: 0.8, x: -10 },
        {
          duration: 0.4,
          transformOrigin: "50% 50%",
          scaleY: 1,
          x: 0,
          ease: "circ.inOut"
        },
        0.1
      )
      .fromTo(
        socialLinksRef.current.querySelectorAll("li"),
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, stagger: -0.05 },
        0.1
      );

    // Cleanup on unmount
    return () => timelineRef.current?.kill();
  }, []);

  useEffect(() => {
    // Play or reverse based on isActive prop
    if (isActive) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isActive]);

  return (
    <div
      className={`col-span-12 md:col-span-6 lg:col-span-3 social-link-wrapper mb-[32px] md:mb-0 wow bounceIn`}
      data-wow-duration="2s"
      data-wow-delay={animationDelay}
    >
      <div className="img max-h-[290px] md:max-h-[300px] xl:max-h-[354px] w-full h-full mb-[25px] relative wow overlay-anim zoom-effect overflow-hidden">
        <Image className="w-full h-full object-cover" src={image} alt={name} />
        <SocialLinks ref={socialLinksRef} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/skyline/the-chef-single"
            className="block font-plus-jakarta-sans font-semibold text-white meet-our-master-teams-name"
          >
            {name}
          </Link>
          <p className="font-jost font-medium text-International-Orange meet-our-master-teams-designation">
            {designation}
          </p>
        </div>
        <div>
          <button
            onClick={onToggle}
            style={{
              transform: isActive ? "rotate(40deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center share-panel-icons toggle-button bg-Beer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.17963 0.89996L6.19966 6.28801L0.813128 6.26646L0.819197 7.89925L6.20573 7.92079L6.22576 13.3088L7.85808 13.3154L7.83805 7.92732L13.2246 7.94887L13.2185 6.31608L7.83198 6.29454L7.81195 0.906489L6.17963 0.89996Z"
                fill="#0F3435"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChefCard;
