// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api?rq=1

export function getThumbnailURL(url) {
  const [_n, embedCode] = url.split("https://www.youtube.com/embed/");
  return `https://img.youtube.com/vi/${embedCode}/0.jpg`;
}
