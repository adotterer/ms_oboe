// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api?rq=1

export function getThumbnailURL(url) {
  try {
    return `https://img.youtube.com/vi/${getEmbedCode(url)}/0.jpg`;
  } catch (e) {
    console.log("error", e);
    return "";
  }
}

export function getEmbedCode(url) {
  const embedCodeArr = url.split("https://youtu.be/")

  if (!embedCodeArr[1]) return null;
  return embedCodeArr[1]
}

