export function getSources(src) {
  const sizes = [
    { width: 200, height: 200, suffix: "-200x200" },
    { width: 400, height: 400, suffix: "-400x400" },
    { width: 800, height: 800, suffix: "-800x800" },
    { width: 1500, height: 1500, suffix: "-1500x1500" },
    { width: 2000, height: 2000, suffix: "-2000x2000" },
  ];

  let formats = ["webp"];
  // let formats = [];

  let [name, ext] = src.split(".");
  let sources = [];

  for (let format of [...formats]) {
    let srcsets = [];
    for (let size of sizes) {
      let img = `/img/${name}${size.suffix}.${format}`;
      srcsets.push(`${img} ${size.width}w`);
    }
    sources.push({
      srcset: srcsets.join(", "),
      format: `image/${format}`,
    });
  }

  console.log(sources);
  return sources;
}

// get a color by slug
export function getColor(slug) {
  // unique colors
  const colors = [
    "#cd380b",
    "#FF5722",
    "#FF9800",
    "#4CAF50",
    "#009688",
    "#00BCD4",
    "#03A9F4",
    "#3F51B5",
    "#673AB7",
    "#9C27B0",
    "#E91E63",
    "#F44336",
    "#795548",
    "#607D8B",
    "#2196F3",
    "#2E7D32",
    "#d46ab9",
    "#f9a825",
    "#cd380b",
    "#e65100",
    "#21ba45",
    "#388e3c",
    "#00796b",
    "#0288d1",
    "#303f9f",
    "#512da8",
    "#ad1457",
    "#c62828",
    "#5d4037",
    "#455a64",
    "#1976d2",
    "#8e24aa",
    "#f57f17",
    "#b85c3f",
    "#144e6a",
    "#4a148c",
    "#d84315",
    "#00695c",
    "#05BB66",
    "#DF8F12",
    "#6726C5",
  ];
  const index = slug
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((a, b) => a + b, 0);

  return colors[index % colors.length];
}
