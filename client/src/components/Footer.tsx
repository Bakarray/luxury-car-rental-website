import { assets } from "../assets/assets";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Browse Cars", "List Your Car", "About Us"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Terms of Service", "Privacy Policy", "Insurance"],
    },
    {
      title: "Contact",
      links: [
        "1234 Luxury Drive",
        "San Francisco, CA 94107",
        "+1 234 5678",
        "info@example.com",
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        <div>
          <img className="h-8 md:h-9" src={assets.logo} alt="logo" />
          <p className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook logo"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram logo"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="twitter logo"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.gmail_logo}
                alt="gmail logo"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h2 className="font-semibold text-base text-gray-800 uppercase">
                {section.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {section.title === "Contact" ? (
                      <a href="#" className="hover:underline transition">
                        {link}
                      </a>
                    ) : (
                      <>{link}</>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
          Copyright 2025 © All Right Reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
