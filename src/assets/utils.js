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
    "#FFC107",
    "#FF5722",
    "#FF9800",
    "#4CAF50",
    "#8BC34A",
    "#009688",
    "#00BCD4",
    "#03A9F4",
    "#3F51B5",
    "#673AB7",
    "#9C27B0",
    "#E91E63",
    "#F44336",
    "#795548",
    "#9E9E9E",
    "#607D8B",
    "#2196F3",
    "#2E7D32",
    "#d46ab9",
    "rgb(49, 127, 67)",
    "rgb(106, 93, 77)",
    "rgb(120, 31, 25)",
    "rgb(66, 70, 50)",
    "rgb(61, 100, 45)",
    "rgb(73, 103, 141)",
    "rgb(100, 107, 99)",
    "rgb(32, 96, 61)",
    "rgb(255, 255, 255)",
    "rgb(41, 49, 51)",
    "rgb(157, 145, 1)",
    "rgb(255, 120, 0)",
    "rgb(255, 255, 255)",
    "rgb(138, 102, 66)",
    "rgb(117, 21, 30)",
    "rgb(199, 180, 70)",
    "rgb(228, 160, 16)",
    "rgb(34, 113, 179)",
    "rgb(207, 211, 205)",
    "rgb(239, 169, 74)",
    "rgb(137, 172, 118)",
    "rgb(125, 132, 113)",
    "rgb(56, 44, 30)",
    "rgb(137, 129, 118)",
    "rgb(211, 110, 112)",
  ];
  const index = slug
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((a, b) => a + b, 0);

  return colors[index % colors.length];
}
