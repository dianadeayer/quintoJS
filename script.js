import data from "./albums.js";
import {
  playMainBtnIcon,
  playButtonIcon,
  playBtnStickyIcon,
  addTrackIcon,
  durationIcon,
  verifiedIcon,
} from "./icons.js";

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
        ${verified ? verifiedIcon + "Verified Artist" : ""}
      </p>
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
      ${playMainBtnIcon}
    </button>
    <button class="follow-btn">Follow</button>
  `;
  return actionBar;
};

const createStickyBar = (artist) => {
  const stickyBar = document.createElement("div");
  stickyBar.className = "sticky-bar";
  stickyBar.innerHTML = `
   <button class="play-btn" aria-label="Play">
      ${playBtnStickyIcon}
    </button>
    <span class="sticky-artist">${artist}</span>
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
        <th></th>
        <th>
          ${durationIcon}
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
        <button class="track-play-btn" aria-label="Play">
          ${playButtonIcon}
        </button>
      </td>
      <td class="track-title">${track.name}</td>
      <td class="track-add">
        <button class="add-track-button" aria-label="Add track" title="Add ${
          track.name
        } to Library">
          ${addTrackIcon}
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
          <button class="play-button" aria-label="Play">${playButtonIcon}</button>
          <button class="add-button" aria-label="Add">${addTrackIcon}</button>
          <button class="more-button" aria-label="More">...</button>
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
  stickyBar.style.opacity = 0;
  stickyBar.style.pointerEvents = "none";

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
