import { Navbar, Typography } from "@material-tailwind/react";

export default function navbar() {
  return (
    <Navbar className="rounded-none  m-0 max-w-none">
      <Typography className="cursor-pointer text-lg font-semibold text-black">
        <span>Grosir Admin</span>
      </Typography>
    </Navbar>
  );
}
