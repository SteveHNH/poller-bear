<script>
export let videoId;
export let title = "";
export let thumbnailUrl = "";

let isPlaying = false;

$: fallbackThumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";

function play() {
  isPlaying = true;
}
</script>

<div class="video-embed">
  {#if isPlaying}
    <div class="player-wrapper">
      <iframe
        src="https://www.youtube.com/embed/{videoId}?autoplay=1"
        title={title || "YouTube video player"}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  {:else}
    <button type="button" class="thumbnail-button" on:click={play} aria-label="Play {title || 'video'}">
      <img
        src={thumbnailUrl || fallbackThumbnail}
        alt={title || "Video thumbnail"}
        class="thumbnail-image"
        loading="lazy"
      />
      <span class="play-overlay" aria-hidden="true">▶</span>
    </button>
  {/if}

  {#if title}
    <p class="video-title">{title}</p>
  {/if}
</div>

<style>
  .video-embed {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .player-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: black;
  }

  .player-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .thumbnail-button {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--bg-elevated);
    cursor: pointer;
  }

  .thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.65);
    color: white;
    font-size: 1.1rem;
    line-height: 1;
    padding-left: 3px;
  }

  .video-title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
