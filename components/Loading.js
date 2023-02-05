import React from "react";

export default function Loading() {
  return (
    <div className="absolute w-full grid place-items-center min-h-screen backdrop-blur-sm">
      <div className="w-20 h-20 border-8 border-orange-600 rounded-full border-t-transparent animate-spin" />
    </div>
  );
}
