import Cuocphi from "../../components/cuocphi";
import React from "react";

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <h1>Hello MagicPost!</h1>
      <Cuocphi />
      {/* TODO: build landing page, QR scanner, parcel search */}
    </div>
  );
}
