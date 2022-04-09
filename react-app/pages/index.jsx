import {useState} from "react";

const BIO = "bio";
const AUDIO = "audio";
const GALLERY = "gallery";
const VIDEO = "video";

export default function Index() {
  const [activeComponent, setActiveComponent] = useState(BIO);

  const renderComponent = () => {
    switch (activeComponent) {
      case GALLERY:
        return <div>Gallery</div>;
      case AUDIO:
        return <div>Audio</div>;
      case BIO:
      default:
        return <div>Bio</div>;
    }
  };

  return <div>{renderComponent()}</div>;
}
