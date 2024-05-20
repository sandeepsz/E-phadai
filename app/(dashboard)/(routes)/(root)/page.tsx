import React, { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="animate-bounce text-purple-700 ">Loading...</div>
        }
      >
        <div>
          This is the Student Dashbaord I am unable to access this Dashbaord
          With out login in the websites.
        </div>
      </Suspense>
    </>
  );
};

export default Home;
