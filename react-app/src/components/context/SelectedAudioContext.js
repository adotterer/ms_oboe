import { createContext } from "react";

const defaultContext = {
  URL: "https://mshippoboe.s3.us-west-1.amazonaws.com/audio_19_Brahms.wav",
  composer: "Johannes Brahms",
  id: 19,
  performers: "Andrew Dotterer, oboe",
  title: "12AM CF",
};

const SelectedAudioContext = createContext({
  selectedAudio: defaultContext,
  setSelectedAudio: () => {},
});
