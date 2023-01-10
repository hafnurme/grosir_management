import Image from "next/image";

const GudangIndex = () => {
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          fill
          src="/splash3.jpg"
          priority="false"
          alt="splashgudang"
          className="object-cover"
        />
      </div>
    </>
  );
};

export default GudangIndex;
