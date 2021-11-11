// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api?rq=1

export function getThumbnailURL(url) {
  let urlArr = url.split("https://www.youtube.com/embed/");

  return `https://img.youtube.com/vi/${urlArr[1]}/0.jpg`;
}
