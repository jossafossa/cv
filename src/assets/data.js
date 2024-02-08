export default {
  name: "Joost Hobma",
  image: "./assets/img/jossafossa.jpg",
  linksLabel: "Portfolio:",
  links: [
    {
      url: "https://www.jossafossa.nl",
      label: "jossafossa.nl",
    },
    {
      url: "https://codepen.io/Jossafossa",
      label: "codepen.io",
    },
  ],
  contactInfo: [
    {
      label: "Email",
      value: "joosthobma@gmail.com",
    },
    {
      label: "Telefoon",
      value: "+31 612631823",
    },
    {
      label: "Adres",
      value: "Groningen",
    },
  ],
  footer: {
    label: "Gemaakt met VueJS",
  },
  sections: [
    {
      type: "content",
      title: "Over mij",
      content: `
Hoi, ik ben Joost, een **full stack** developer uit Friesland, maar gehuisvest in Groningen. Ik ben al sinds 2016 werkzaam bij verschillende bedrijven in webdevelopment land. Ik heb veel ervaring met het bouwen van custom **WordPress** Thema's van frontend tot backend, van statische content tot **Webshops**, **Configurators**, **API-koppelingen** en **Plug-ins** bouwen. Dit is niet alleen WordPress specifieke kennis, maar ook veel **JavaScript** (custom, **VueJS**, **React**), **SCSS**, **PHP** en **HTML**. Als ik thuis ben, slinger ik meestal meteen de computer aan om thuis verder te werken aan mijn eigen projecten. Ik raak niet snel uitgekeken op het webdevelopment vak en ben altijd op zoek naar nieuwe dingen om te bouwen.

Naast webdevelopment ben ik ook een groot fan van **pixel art** en **game development**. Ik heb laatst mijn eerste pack met game assets uitgebracht op [itch.io](https://jossafossa.itch.io/mansion-indoor-tileset). Ook heb ik meegedaan aan meerdere **Hackathons** en **Game Jams**. Tijdens gamejams heb ik mijn skills kunnen uitbreiden met **pixel art**, **3D Modeling** en **Game Development**. Tijdens gamejams moet je werken met een strakke deadline en dat is een goede manier te leren werken onder druk, knopen door te hakken en snel te schakelen.`,
    },
    {
      type: "content",
      title: "Dit vind ik belangrijk",
      content: `
- Ik houd van **Leesbare code**. Zelfs zonder documentatie moet de code duidelijk zijn.
- Ik houd van **modulaire en herbruikbare code**. Waar mogelijk maak ik gebruik van **componenten**.
- Ik houd van **atomic functies** met 1 simpele functie.
- Ik houd van **lightweight** oplossingen. Voor webdevelopment zoek ik eerst de oplossing in HTML dan CSS en dan JavaScript.
- Ik houd van **early return** boven nested if statements.
- Ik houd van veilige code. 
- Ik houd van **semantisch kloppende HTML en CSS**.
- Ik houd van duidelijke **coding standards**.
- Ik houd van \`var()\`, \`flexbox\`, \`grid\`, \`gaps\`, \`:has()\`, \`:where()\`, \`<dialog>\`, \`async\`, \`await\`, \`import()\`, \`Promises\`, \`?.\`, \`...\` & \`const\`. 
- Ik houd van een efficiënte en consistente workflow.
- Ik houd van consistente user interfaces.
- Ik houd een **gebruiksvriendelijke** backend. 
- Ik houd van andere **mensen helpen** en **kennis delen**.
- Ik houd van duidelijke **efficiënt communicatie**.

`,
    },

    {
      type: "educations",
      title: "Werkervaring",
      educations: [
        {
          title: "B2DESIGN",
          attributes: {
            Functie: "Full-stack Developer",
            locatie: "Groningen",
          },
          time: "Aug `20 - heden",
        },
        {
          title: "Nordique",
          attributes: {
            Functie: "Front-end Developer",
            locatie: "Groningen",
          },
          time: "Sep `19 - Mar `20",
        },
        {
          title: "MediaSoep",
          attributes: {
            Functie: "Front-end Developer",
            locatie: "Joure",
          },
          time: "Aug `16 - Jan `17",
        },
        {
          title: "ZZP",
          attributes: {
            Bedrijf: "JossaFossa",
            werkzaamheden: "Webdesign & graphic design",
          },
          time: "`22 - heden",
        },
      ],
    },
    {
      type: "educations",
      title: "Opleidingen",
      educations: [
        {
          title: "HBO-ICT",
          attributes: {
            School: "Hanze Hogeschool Groningen",
            locatie: "Groningen",
            specialisatie: "Software Engineering",
          },
          time: "sep `17 - aug `20",
        },
        {
          title: "Mediavormgeving",
          attributes: {
            School: "Friesland College",
            locatie: "Heerenveen",
            specialisatie: "Interactief",
            niveau: "MBO 4",
          },
          time: "Feb `14 - Juli `17",
        },
      ],
    },
    {
      type: "projects",
      title: "Projecten",
      projects: [
        {
          title: "GeA Fairplay",
          url: "https://www.gea-fairplay.nl",
          tags: ["Wordpress"],
          image: "gea-fairplay.png",
        },
        {
          title: "Compact CSS Grid",
          url: "https://codepen.io/Jossafossa/pen/QWrdaaj",
          image: "css-grid.png",
          tags: ["CSS", "SCSS"],
          description:
            "Een compact / flexibel CSS grid systeem. Maak veel gebruik van `css var` en `calc`. Heeft zelfde functionaliteit als **Boostrap**",
        },
        {
          title: "Drawing app",
          image: "drawing.png",
          url: "https://www.jossafossa.nl/projects/draw/",
          tags: ["JavaScript", "Custom"],
          description:
            "Een custom drawing app gemaakt vanilla Javascript op een `canvas` element.",
        },
        {
          title: "Spotidash",
          url: "https://spotidash.jossafossa.nl/",
          image: "spotidash.png",
          tags: ["React", "Spotify Rest API"],
          description:
            "Een fullscreen spotify player gemaakt in React. De achtergrond laat de huidige playlist zien. ",
        },
        {
          title: "Mansion Indoor Tileset",
          url: "https://jossafossa.itch.io/mansion-indoor-tileset",
          image: "mansion.png",
          tags: ["Pixel Art", "Game Assets"],
        },
        {
          title: "Pure CSS Filters",
          url: "https://codepen.io/Jossafossa/pen/abXrzxz",
          image: "css-filter.png",
          tags: ["CSS", "Experimental"],
        },
        {
          title: "Cat reveal",
          url: "https://codepen.io/Jossafossa/pen/eYryzmp",
          image: "cat-reveal.png",
          description:
            "Chrome only. beweeg je muis over de kat om hem te onthullen",
          tags: ["Custom Javascript", "Experimental"],
        },
        {
          title: "Cat sliding puzzle",
          url: "https://codepen.io/Jossafossa/pen/zYjZQZR",
          description: "Een schuifpuzzle met een kat.",
          image: "cat-puzzle.png",
          tags: ["Custom Javascript", "Experimental"],
        },
        {
          title: "Personal training website",
          url: "https://www.alessandro-pt.com",
          image: "alessandro-pt.png",
          tags: ["Wordpress"],
        },
      ],
    },
    {
      type: "attributes",
      qualities: {
        title: "Kwaliteiten",
        items: [
          {
            label: "Creatief",
            icon: "fa fa-paint-brush",
          },
          {
            label: "Optimistisch",
            icon: "fa fa-smile-o",
          },
          {
            label: "Enthousiast",
            icon: "fa fa-thumbs-o-up",
          },
          {
            label: "Zelfstandig",
            icon: "fa fa-user",
          },
          {
            label: "Perfectionistisch",
            icon: "fa fa-check",
          },
          {
            label: "Innovatief",
            icon: "fa fa-lightbulb-o",
          },
        ],
      },

      interests: {
        title: "Interesses",
        items: [
          {
            label: "Webdevelopment",
            icon: "fa fa-code",
          },
          {
            label: "Graphic Design",
            icon: "fa fa-paint-brush",
          },
          {
            label: "Game development",
            icon: "fa fa-gamepad",
          },
          {
            label: "Pixelart",
            icon: "fa fa-paint-brush",
          },
          {
            label: "Audio apparatuur",
            icon: "fa fa-microphone",
          },
          {
            label: "Bas, gitaar & drum",
            icon: "fa fa-music",
          },
        ],
      },
      skills: {
        title: "Skills",
        skills: [
          {
            title: "Frontend",
            items: [
              {
                label: "HTML5",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "CSS/SCSS",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "JavaScript",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "VueJS",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "React",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "Webpack/Vite",
                rating: 3,
                suffix: "Gemiddeld",
              },
            ],
          },
          {
            title: "Backend",
            items: [
              {
                label: "PHP",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "Wordpress",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "MySQL",
                rating: 3,
                suffix: "Gemiddeld",
              },
              {
                label: "Python",
                rating: 3,
                suffix: "Gemiddeld",
              },
              {
                label: "Unity",
                rating: 3,
                suffix: "Gemiddeld",
              },
            ],
          },
          {
            title: "Frameworks",
            items: [
              {
                label: "Bootstrap",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "Foundation",
                rating: 5,
                suffix: "Goed",
              },
            ],
          },
          {
            title: "Tools",
            items: [
              {
                label: "VSCode",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "Git/Bitbucket",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "Illustrator",
                rating: 5,
                suffix: "Geavanceerd",
              },
              {
                label: "Figma",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "Premiere Pro",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "After Effects",
                rating: 4,
                suffix: "Goed",
              },
              {
                label: "Photoshop",
                rating: 3,
                suffix: "Gemiddeld",
              },
              {
                label: "Blender",
                rating: 3,
                suffix: "Gemiddeld",
              },
            ],
          },
          {
            title: "Talen",
            items: [
              {
                label: "Nederlands",
                rating: 5,
                suffix: "Moedertaal",
              },
              {
                label: "Engels",
                rating: 4,
                suffix: "Good",
              },
              {
                label: "Fries",
                rating: 2,
                suffix: "Begrinzgje",
              },
            ],
          },
        ],
      },
    },
  ],
};
