const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function videoIdFromUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    let id;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    if (url.hostname.endsWith('youtube.com')) {
      id = url.searchParams.get('v') || (url.pathname.startsWith('/embed/') ? url.pathname.split('/')[2] : null);
    }
    return id && YOUTUBE_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export async function titleForVideo(videoId) {
  const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
  if (!response.ok) throw new Error('This video is unavailable.');
  const metadata = await response.json();
  return String(metadata.title || videoId).trim().slice(0, 256) || videoId;
}
