import { useSession } from "next-auth/react";

const GudangIndex = () => {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <>
      <p>Hello World</p>
    </>
  );
};

export default GudangIndex;
