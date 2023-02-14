import { Button, IconButton, MobileNav, Navbar, Typography } from "@material-tailwind/react";

export default function navbar({ openNav, setOpenNav }) {

  return (
    <Navbar className="rounded-none  m-0 max-w-none py-2 px-4 lg:px-8 lg:py-4">
      <div className=" flex justify-between">
        <Typography className="cursor-pointer text-lg font-semibold text-black">
          <span>Grosir Admin</span>
        </Typography>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="black"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
    </Navbar>
  );
}
