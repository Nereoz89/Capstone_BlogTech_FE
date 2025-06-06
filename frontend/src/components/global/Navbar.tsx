import { motion } from "framer-motion";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import images from "../../constants/images";
import { authLinks, BASE_URL, HOME, links, LOGIN, REGISTRATION, SEARCH } from "../../constants/routes";
import { useAppSelector } from "../../redux/app/hooks";
import { selectAuth } from "../../redux/features/login/loginSlice";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const isHidden = pathname === LOGIN || pathname === REGISTRATION;
  const { user, token } = useAppSelector(selectAuth);

  let userAvatar = null;
  if (user?.name) {
    userAvatar = <UserMenu />;
  }
  const navItems = user && token ? authLinks : links;
  let regularClass =
    "px-3 py-2 border-1 border-orange-50 font-semibold hover:text-black hover:bg-blue-400 text-white rounded-md  ";
  let activeClass = "px-3 py-2 border-1 border-orange-50 font-semibold text-white text-white rounded-md border-b";
  return (
    <nav>
      <div className={isHidden ? "hidden" : " backdrop-blur-xl  top-2 left-0 right-0 bg-gray-700/100 z-10"}>
        <div className="flex px-4 md:px-8 justify-between items-center  sm:container mx-auto  ">
          <div>
            <Link to={HOME}>
              <div>
                <img
                  src={images.logo}
                  className="hidden sm:block w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px]"
                  alt="BlogTech"
                />

                <img src={images.logo} className="block sm:hidden w-[40px] mr-3 " alt="BlogTech" />
              </div>
            </Link>
          </div>

          <div className="flex items-center md:flex-row-reverse">
            {userAvatar}
            <ul className="hidden md:flex flex-end items-center gap-2">
              {navItems.map((link) => (
                <li key={link.id}>
                  <Link to={link.link}>
                    <span className={link.link === pathname ? activeClass : regularClass}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="block md:hidden ">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-orange-500 text-white h-[30px] w-[30px] flex items-center  justify-center rounded-full"
              >
                <HiMenuAlt4 className="text-xl" />
              </button>
              {isOpen && (
                <motion.div
                  whileInView={{ x: [300, 0] }}
                  transition={{
                    duration: 0.75,
                    ease: "easeOut",
                  }}
                  exit={{ x: [-300, 0] }}
                  className="fixed top-0 right-0 w-[80%] h-screen bg-blue-500"
                >
                  <div className="flex justify-end mt-4 mx-4 m-3">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="bg-orange-500 text-white h-[30px] w-[30px] flex  items-center justify-center rounded-full"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <ul className="flex flex-col justify-start">
                    {navItems.map((link) => (
                      <li
                        role="button"
                        onClick={() => {
                          navigate(link.link);
                          setIsOpen(false);
                        }}
                        key={link.id}
                        className="px-3 py-2 border-1 border-orange-50 font-semibold hover:text-white hover:bg-orange-400 w-100mb-2  "
                      >
                        <span className="text-white ">{link.label}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center py-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const SearchBar = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`${SEARCH}?query=${value.trim().replaceAll(" ", "+")}`);
  };

  useEffect(() => {
    if (!pathname.includes(SEARCH)) {
      setValue("");
    }
  }, [pathname]);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] md:w-[80%] flex rounded-full border transition-all shadow-sm border-gray-400 focus-within:border-blue-500 items-center overflow-hidden relative"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=""
        type="text"
        className="outline-none border-none focus:border-none px-3 w-full rounded-full flex-1 h-full py-2 pl-6 text-sm text-gray-500"
        style={{ transition: "width 0.3s" }} // Aggiunto stile per la transizione
      />

      <button className="absolute top-0 right-0 bottom-0 px-4">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </form>
  );
};
