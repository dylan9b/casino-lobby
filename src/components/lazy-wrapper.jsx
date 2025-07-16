import { Suspense } from "react";

const LazyWrapper = ({ Component }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export default LazyWrapper;
