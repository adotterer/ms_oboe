export function getThumbnailURL(url) {
  const [_n, embedCode] = url.split("https://www.youtube.com/embed/");
  return `https://img.youtube.com/vi/${embedCode}/0.jpg`;
}
