import data from "./albums.js";

const artist = data.artistUnion.profile.name;
const albums = data.artistUnion.discography.albums.items;
const headerImage = data.artistUnion.visuals.headerImage.sources[0].url;
const monthlyListeners = data.artistUnion.stats.monthlyListeners;

const coverHeader = document.createElement("div");
coverHeader.className = "artist-cover";
coverHeader.innerHTML = `
  <img src="${headerImage}" alt="Artist cover" class="artist-cover-img">
  <div class="artist-cover-info">
    <h1 class="artist-name">${artist}</h1>
    <p class="artist-listeners">${monthlyListeners.toLocaleString()} monthly listeners</p>
  </div>
`;
document.body.prepend(coverHeader);

const createTracksTable = (tracks) => {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
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
    row.innerHTML = `<td>${index + 1}</td><td>${
      track.name
    }</td><td>${durationStr}</td>`;
    tbody.appendChild(row);
  });
  return table;
};

albums.forEach((albumItem) => {
  const release = albumItem.releases.items[0];
  const albumDiv = document.createElement("div");

  const coverUrl = release.coverArt.sources[0].url;

  albumDiv.innerHTML = `
    <div class="album-header">
      <img src="${coverUrl}" alt="cover" class="album-cover">
      <div class="album-meta">
      <h2 class="album-title">${release.name} </h2>
      <p class= "album-info"> Album · ${release.date.year} · ${release.tracks.items.length} songs</p>
    </div>
      </div>
  `;

  const table = createTracksTable(release.tracks.items);

  albumDiv.appendChild(table);
  document.body.appendChild(albumDiv);
});
