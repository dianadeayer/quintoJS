import data from "./albums.js";

const artist = data.artistUnion.profile.name;
const albums = data.artistUnion.discography.albums.items;

albums.forEach((albumItem) => {
  const release = albumItem.releases.items[0];
  const albumDiv = document.createElement("div");

  const coverUrl = release.coverArt.sources[0].url;

  albumDiv.innerHTML = `
    <div class="album-header">
      <img src="${coverUrl}" alt="cover" class="album-cover">
      <h2 class="album-title">${release.name} (${release.date.year})</h2>
    </div>
  `;

  const table = document.createElement("table");
  table.innerHTML = `
  <thead>
    <tr><th>#</th><th>Título</th><th>Duración</th></tr>
  </thead>
  <tbody></tbody>
`;
  const tbody = table.querySelector("tbody");
  release.tracks.items.forEach((trackItem, index) => {
    const track = trackItem.track;
    const row = document.createElement("tr");
    const durationSec = Math.round(track.duration.totalMilliseconds / 1000);
    row.innerHTML = `<td>${index + 1}</td><td>${
      track.name
    }</td><td>${durationSec}</td>`;
    tbody.appendChild(row);
  });

  albumDiv.appendChild(table);
  document.body.appendChild(albumDiv);
});
