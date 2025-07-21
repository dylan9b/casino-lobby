import { Suspense } from "react";

const LazyWrapper = (props) => {
  const { Component } = props;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="bg-gray-200 min-w-20 min-h-10 space-x-4 rounded-2xl items-center justify-center animate-pulse"></div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default LazyWrapper;
