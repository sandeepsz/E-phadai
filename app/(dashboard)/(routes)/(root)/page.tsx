import React, { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="animate-bounce text-purple-700 ">Loading...</div>
        }
      >
        <div>Student Dashboard</div>
      </Suspense>
    </>
  );
};

export default Home;
