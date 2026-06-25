import { forwardRef } from "react";
import Link from "next/link";

const SocialLinks = forwardRef((_, ref) => (
  <ul ref={ref} className="absolute bottom-0 right-0 social-icon social-links">
    {["facebook-f", "twitter", "instagram", "youtube"].map((icon) => (
      <li key={icon}>
        <Link
          href="#"
          className="py-3 px-3 bg-Beer text-[#0F3435] flex items-center justify-center hover:bg-Beer transition-all ease-linear duration-300"
        >
          <i className={`fa-brands fa-${icon}`} aria-hidden="true"></i>
        </Link>
      </li>
    ))}
  </ul>
));
SocialLinks.displayName = "SocialLinks";
export default SocialLinks ;
