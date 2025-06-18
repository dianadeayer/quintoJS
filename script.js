import data from "./albums.js";

const artist = data.artistUnion.profile.name;
const albums = data.artistUnion.discography.albums.items;
const headerImage = data.artistUnion.visuals.headerImage.sources[0].url;
const monthlyListeners = data.artistUnion.stats.monthlyListeners;
const verified = data.artistUnion.profile.verified;

const createArtistHeader = (headerImage, artist, monthlyListeners) => {
  const coverHeader = document.createElement("div");
  coverHeader.className = "artist-cover";
  coverHeader.innerHTML = `
  <img src="${headerImage}" alt="Artist cover" class="artist-cover-img">
  <div class="artist-cover-info">
  <p class="artist-verified">
<svg class="verified-icon" viewBox="0 0 24 24" width="20" height="20" aria-label="Verified">
  <g>
    <path class="verified-bg" d="M12 2.25c.6 0 1.17.34 1.43.89l1.13 2.29c.13.26.39.43.68.43h2.5c.66 0 1.19.53 1.19 1.19v2.5c0 .29.17.55.43.68l2.29 1.13c.55.26.89.83.89 1.43s-.34 1.17-.89 1.43l-2.29 1.13a.75.75 0 0 0-.43.68v2.5c0 .66-.53 1.19-1.19 1.19h-2.5a.75.75 0 0 0-.68.43l-1.13 2.29a1.19 1.19 0 0 1-2.14 0l-1.13-2.29a.75.75 0 0 0-.68-.43h-2.5a1.19 1.19 0 0 1-1.19-1.19v-2.5a.75.75 0 0 0-.43-.68l-2.29-1.13a1.19 1.19 0 0 1 0-2.14l2.29-1.13a.75.75 0 0 0 .43-.68v-2.5c0-.66.53-1.19 1.19-1.19h2.5c.29 0 .55-.17.68-.43l1.13-2.29A1.19 1.19 0 0 1 12 2.25z"/>
    <path class="verified-check" d="M10.5 13.5l-1.5-1.5a.75.75 0 1 1 1.06-1.06l1 1 3-3a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0z"/>
  </g>
</svg>
  ${verified ? "Verified Artist" : ""}</p>
    <h1 class="artist-name">${artist}</h1>
    <p class="artist-listeners">${monthlyListeners.toLocaleString()} monthly listeners</p>
  </div>
`;
  return coverHeader;
};

const createActionBar = (artist) => {
  const actionBar = document.createElement("div");
  actionBar.className = "action-bar";
  actionBar.innerHTML = `
   <button class="play-main-btn" aria-label="Play">
      <svg viewBox="0 0 24 24" width="28" height="28"><path fill="#fff" d="M5 3.87v16.26c0 1.04 1.13 1.68 2.02 1.13l13.09-8.13c.89-.55.89-1.71 0-2.26L7.02 2.74C6.13 2.19 5 2.83 5 3.87z"/></svg>
    </button>
    <button class="follow-btn">Follow</button>
  `;
  return actionBar;
};

const createStickyBar = (artist) => {
  const stickyBar = document.createElement("div");
  stickyBar.className = "sticky-bar";
  stickyBar.innerHTML = `
     <span class="sticky-artist">${artist}</span>
    <button class="stop-btn" aria-label="Stop">
      <svg viewBox="0 0 24 24" width="24" height="24"><rect x="6" y="6" width="12" height="12" rx="2" fill="#fff"/></svg>
    </button>
  `;
  return stickyBar;
};

const createTracksTable = (tracks) => {
  const table = document.createElement("table");
  table.innerHTML = `
  <thead class="table-header">
    <tr>
      <th>#</th>
      <th>Título</th>
      <th></th> <!-- columna para add track -->
      <th>
        <svg class="duration-icon" viewBox="0 0 16 16" width="18" height="18" aria-label="Duración">
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
          <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"></path>
        </svg>
      </th>
    </tr>
  </thead>
  <tbody class="table-body"></tbody>
`;
  const tbody = table.querySelector("tbody");
  tracks.forEach((trackItem, index) => {
    const track = trackItem.track;
    const row = document.createElement("tr");
    const durationMs = track.duration.totalMilliseconds;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const durationStr = `${minutes}:${seconds}`;
    row.innerHTML = `
     <td class="track-number">
        <span class="track-index">${index + 1}</span>
        <button class="track-play-btn" aria-label="Play track" title="Play ${
          track.name
        }">
  <svg viewBox="0 0 24 24" width="20" height="20">
    <polygon points="8,6 18,12 8,18" fill="#fff"/>
  </svg>
</button>
      </td>
  <td class="track-title">${track.name}</td>
  <td class="track-add">
    <button class="add-track-button" aria-label="Add track" title="Add ${
      track.name
    } to Library">
     <svg viewBox="0 0 24 24" stroke-width="2">
              <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"></path>
              <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"></path>
            </svg>
    </button>
  </td>
  <td>${durationStr}</td>
`;
    tbody.appendChild(row);
  });
  return table;
};

const createAlbumBlock = (release) => {
  const albumDiv = document.createElement("div");
  const coverUrl = release.coverArt.sources[0].url;
  albumDiv.innerHTML = `
    <div class="album-header">
    <img src="${coverUrl}" alt="cover" class="album-cover">
    <div class="album-meta">
      <h2 class="album-title">${release.name}</h2>
      <p class="album-info">Album · ${release.date.year} · ${release.tracks.items.length} songs</p>
           <div class="album-actions">
        <button class="play-button" aria-label="Play Album" title="Play ${release.name}">
            <svg viewBox="0 0 16 16">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
            </svg>
          </button>
          <button class="add-button" aria-label="Add Album to Library" title="Add ${release.name}to Library">
            <svg viewBox="0 0 24 24" stroke-width="2">
              <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"></path>
              <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"></path>
            </svg>
          </button>
          <button class="more-button" aria-label="More options for Album" title="More options for ${release.name}">
  <svg viewBox="0 0 24 24" width="24">
    <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
  </svg>
</button>
        </div>
      </div>
    </div>
  `;
  const table = createTracksTable(release.tracks.items);
  albumDiv.appendChild(table);
  return albumDiv;
};

const renderArtistPage = () => {
  // sticky bar primero
  const stickyBar = createStickyBar(artist);
  document.body.prepend(stickyBar);

  const header = createArtistHeader(headerImage, artist, monthlyListeners);
  stickyBar.after(header);

  const actionBar = createActionBar(artist);
  header.after(actionBar);

  const albumsContainer = document.createElement("div");
  albumsContainer.className = "albums-container";
  actionBar.after(albumsContainer);

  albums.forEach((albumItem) => {
    if (
      albumItem.releases &&
      albumItem.releases.items &&
      albumItem.releases.items[0]
    ) {
      const release = albumItem.releases.items[0];
      albumsContainer.appendChild(createAlbumBlock(release));
    }
  });

  stickyBar.style.opacity = 0;
  stickyBar.style.pointerEvents = "none";

  window.addEventListener("scroll", () => {
    const rect = actionBar.getBoundingClientRect();
    if (rect.bottom < 0) {
      stickyBar.style.opacity = 1;
      stickyBar.style.pointerEvents = "auto";
    } else {
      stickyBar.style.opacity = 0;
      stickyBar.style.pointerEvents = "none";
    }
  });
};

renderArtistPage();
