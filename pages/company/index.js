import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <Image
        fill
        src="/splash4.jpg"
        priority="false"
        alt="splashgudang"
        className="object-cover"
      />
    </div>
  );
}
