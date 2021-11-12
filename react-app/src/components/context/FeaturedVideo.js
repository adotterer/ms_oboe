import { createContext } from "react";

const FeaturedVideoContext = createContext({
  featuredVideoId: null,
  setFeaturedVideoId: () => {},
});

export default FeaturedVideoContext;
