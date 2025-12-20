"use client";

import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    console.log("Where am I rendered?");
  }, []);

  return <div>Feed Page</div>;
};

export default Page;
