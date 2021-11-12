// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api?rq=1

export function getThumbnailURL(url) {
  console.log(url);
  console.log(getEmbedCode(url), "embed code, from url");
  try {
    return `https://img.youtube.com/vi/${getEmbedCode(url)}/0.jpg`;
  } catch (e) {
    console.log("error", e);
    return "";
  }
}

export function getEmbedCode(url) {
  const searchMatchIndex = url.search(/(?<==|\/)[a-zA-Z0-9]{11}/gm);
  if (searchMatchIndex < 0) return null;
  return url.slice(searchMatchIndex);
}
