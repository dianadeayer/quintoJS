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
      <path fill="#1da1f2" d="M12 2.25c.6 0 1.17.34 1.43.89l1.13 2.29c.13.26.39.43.68.43h2.5c.66 0 1.19.53 1.19 1.19v2.5c0 .29.17.55.43.68l2.29 1.13c.55.26.89.83.89 1.43s-.34 1.17-.89 1.43l-2.29 1.13a.75.75 0 0 0-.43.68v2.5c0 .66-.53 1.19-1.19 1.19h-2.5a.75.75 0 0 0-.68.43l-1.13 2.29a1.19 1.19 0 0 1-2.14 0l-1.13-2.29a.75.75 0 0 0-.68-.43h-2.5a1.19 1.19 0 0 1-1.19-1.19v-2.5a.75.75 0 0 0-.43-.68l-2.29-1.13a1.19 1.19 0 0 1 0-2.14l2.29-1.13a.75.75 0 0 0 .43-.68v-2.5c0-.66.53-1.19 1.19-1.19h2.5c.29 0 .55-.17.68-.43l1.13-2.29A1.19 1.19 0 0 1 12 2.25z"/>
      <path fill="#fff" d="M10.75 14.25l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0z"/>
    </g>
  </svg>
  ${verified ? "Verified Artist" : ""}</p>
    <h1 class="artist-name">${artist}</h1>
    <p class="artist-listeners">${monthlyListeners.toLocaleString()} monthly listeners</p>
  </div>
`;
  return coverHeader;
};

const createTracksTable = (tracks) => {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead class="table-header">
      <tr><th>#</th><th>Título</th><th>Duración</th></tr>
    </thead>
    <tbody></tbody>
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
  <td>${index + 1}</td>
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
  document.body.prepend(
    createArtistHeader(headerImage, artist, monthlyListeners)
  );
  albums.forEach((albumItem) => {
    const release = albumItem.releases.items[0];
    document.body.appendChild(createAlbumBlock(release));
  });
};

renderArtistPage();
