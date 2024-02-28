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
Hoi, ik ben Joost, een **full stack** developer uit Friesland, maar gehuisvest in Groningen. Ik ben al sinds 2016 werkzaam bij verschillende bedrijven in webdevelopment land. Ik heb veel ervaring met het bouwen van custom **WordPress** thema's van **Front-end** tot **Back-end**, van statische content tot **Webshops**, **Configurators**, **API-koppelingen** en **Plug-ins** bouwen. Dit is niet alleen WordPress specifieke kennis, maar ook veel **JavaScript** (custom, **VueJS**, **React**), **SCSS**, **PHP** en **HTML**. Als ik thuis ben, slinger ik meestal meteen de computer aan om thuis verder te werken aan mijn eigen projecten. Ik raak niet snel uitgekeken op het webdevelopment vak en ben altijd op zoek naar nieuwe dingen om te bouwen.


Naast webdevelopment ben ik ook een groot fan van **pixel art** en **game development**. Ik heb laatst mijn eerste pack met game assets uitgebracht op [itch.io](https://jossafossa.itch.io/mansion-indoor-tileset). Ook heb ik meegedaan aan meerdere **Hackathons** en **Game Jams**. Tijdens Game Jams heb ik mijn skills kunnen uitbreiden met **pixel art**, **3D Modeling** en **Game Development**. Tijdens Game Jams moet je werken met een strakke deadline en dat is een goede manier te leren werken onder druk, knopen door te hakken en snel te schakelen.`,
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
          tags: ["WordPress", "CSS", "JavaScript", "PHP"],
          description:
            "Een custom WordPress thema gemaakt een E-sportsvereniging. ",
          image: "gea-fairplay.webp",
        },
        {
          title: "Compact CSS-Grid",
          url: "https://codepen.io/Jossafossa/pen/QWrdaaj",
          image: "css-grid.webp",
          tags: ["CSS"],
          description:
            "Een compact / flexibel CSS-grid systeem. Maak veel gebruik van `css var` en `calc`. Heeft zelfde functionaliteit als **Bootstrap**",
        },
        {
          title: "Drawing app",
          image: "drawing.webp",
          url: "https://www.jossafossa.nl/projects/draw/",
          tags: ["JavaScript"],
          description:
            "Een custom drawing app gemaakt vanilla JavaScript op een `canvas` element.",
        },
        {
          title: "Spotidash",
          url: "https://spotidash.jossafossa.nl/",
          image: "spotidash.webp",
          tags: ["React", "API", "CSS"],
          description:
            "Een fullscreen spotify player gemaakt in React. De achtergrond laat de huidige playlist zien. ",
        },
        {
          title: "Mansion Indoor Tileset",
          url: "https://jossafossa.itch.io/mansion-indoor-tileset",
          image: "mansion.webp",
          images: [
            "mansion-1.webp",
            "mansion-2.webp",
            "mansion-3.webp",
            "mansion-4.webp",
            "mansion-5.webp",
            "mansion-6.webp",
          ],
          description:
            "Een pixel art tileset die gebruikt kan worden in games.",
          tags: ["Pixel Art"],
        },
        {
          title: "Pure CSS Filters",
          url: "https://codepen.io/Jossafossa/pen/abXrzxz",
          image: "css-filter.webp",
          description:
            "Een experimentele manier om met puur CSS filters te laten werken. De filters hierboven werken op dezelfde manier",
          tags: ["CSS", "Experimental"],
        },
        {
          title: "Cat reveal",
          url: "https://codepen.io/Jossafossa/pen/eYryzmp",
          image: "cat-reveal.webp",
          description:
            "Chrome only. Beweeg je muis over de kat om hem te onthullen",
          tags: ["Experimental", "JavaScript"],
        },
        {
          title: "Cat sliding puzzle",
          url: "https://codepen.io/Jossafossa/pen/zYjZQZR",
          description: "Een schuifpuzzel met een kat.",
          image: "cat-puzzle.webp",
          tags: ["Experimental", "JavaScript", "CSS"],
        },
        {
          title: "Alessandro Personal Training",
          description: "Een custom WordPress thema gemaakt voor Gutenberg.",
          url: "https://www.alessandro-pt.com",
          image: "alessandro-pt.webp",
          tags: ["WordPress", "CSS", "JavaScript", "PHP"],
        },
        {
          title: "Top 2000 viewer",
          url: "https://top-2000.jossafossa.nl/",
          image: "top-2000.webp",
          description:
            "Het idee is om een betere viewer te hebben voor de top 2000.",
          tags: ["JavaScript", "CSS", "API"],
        },
        {
          title: "Morgue Mayham",
          url: "https://ldjam.com/events/ludum-dare/54/morgue-mayhem",
          description:
            "Onze submission voor de Ludum Dare 54. Zorg ervoor dat de bezoekers van het mortuarium de 'juiste' dierbare te zien krijgen?",
          images: [
            "morgue-mayham-2.webp",
            "morgue-mayham-1.webp",
            "morgue-mayham-3.webp",
            "morgue-mayham-4.webp",
            "morgue-mayham-5.webp",
          ],
          image: "morgue-mayham-2.webp",
          tags: ["Pixel Art", "Game Jam", "Godot"],
        },
        {
          title: "Shadow Rush",
          url: "https://ldjam.com/events/ludum-dare/50/shadow-rush",
          image: "shadow-rush.webp",
          tags: ["Pixel Art", "Game Jam", "Unity", "JavaScript"],
          description:
            'Onze submission voor de Ludum Dare 50. "Shadow Rush" is een endless racing game waarbij je zo lang mogelijk je schaduw moet zien te ontwijken. Met Level editor',
        },
        {
          title: "Peter OS",
          url: "https://ldjam.com/events/ludum-dare/51/peter-os",
          description:
            "Onze submission voor de Ludum Dare 51. Peter heeft een nieuwe telefoon nodig. Kun jij voorkomen dat zijn oude telefoon crasht? Ondertussen leer je Peter kennen.",
          image: "peter-os.webp",
          images: ["peter-1.webp", "peter-2.webp", "peter-os.webp"],
          tags: ["Pixel Art", "Game Jam", "Unity"],
        },
        {
          title: "Don't let them bug you",
          url: "https://ldjam.com/events/ludum-dare/52/harvest-td",
          image: "ld52-1.webp",
          description:
            "Onze submission voor de Ludum Dare 52. Een tower defense game waarbij je je planten moet beschermen tegen insecten.",
          images: ["ld52-1.webp", "ld52-2.webp"],
          tags: ["Game Jam", "Unity", "3D Modeling"],
        },
        {
          title: "P2P Chat",
          url: "https://files.jossafossa.nl/",
          image: "files.webp",
          description:
            "Een simpel P2P chat systeem met met peerJS. Staat berichten en files toe.",
          tags: ["JavaScript", "P2P", "VueJS"],
        },
        {
          title: "Hypotheek berekenen",
          url: "https://berekenen.financieelfit.nl/",
          image: "financieelfit-1.webp",
          images: [
            "financieelfit-1.webp",
            "financieelfit-2.webp",
            "financieelfit-3.webp",
            "financieelfit-4.webp",
            "financieelfit-5.webp",
          ],
          description:
            "Een custom multistep formulier, volledig te beheren in WordPress, koppeling met een API en PDF-generatie",
          tags: ["WordPress", "PHP", "Gotenberg", "JavaScript", "API"],
          hidden: true,
        },
        {
          title: "Zonwering configurator",
          url: "https://www.zonwering-online.com/",
          image: "zonwering-1.webp",
          images: ["zonwering-1.webp", "zonwering-2.webp"],
          description:
            "Een custom WooCommerce webshop met een uitgebreide product configurator gemaakt in VueJS",
          tags: ["WordPress", "CSS", "PHP", "VueJS", "WooCommerce"],
          hidden: true,
        },
        {
          title: "Dakcheck",
          url: "https://www.sbsolar.nl/gratis-dakcheck/",
          image: "sbsolar-1.webp",
          images: [
            "sbsolar-1.webp",
            "sbsolar-2.webp",
            "sbsolar-3.webp",
            "sbsolar-4.webp",
            "sbsolar-5.webp",
          ],
          description:
            "Een custom WordPress website met een dakcheck module met koppeling met een CRM-systeem",
          tags: ["WordPress", "PHP", "JavaScript", "API"],
          hidden: true,
        },
        {
          title: "Winel configurator",
          url: "https://www.winel.nl/",
          image: "winel-1.webp",
          images: [
            "winel-1.webp",
            "winel-2.webp",
            "winel-3.webp",
            "winel-4.webp",
            "winel-5.webp",
          ],
          description:
            "Een Custom Woocommerce webshop met uitgebreide product configurator",
          tags: ["WordPress", "PHP", "CSS", "JavaScript", "WooCommerce"],
          hidden: true,
        },
        {
          title: "NOM",
          url: "https://www.nom.nl/nom-in-cijfers/portfolio/kaart/",
          image: "nom-1.webp",
          images: ["nom-1.webp", "nom-2.webp"],
          description:
            'Voor NOM.nl heb ik een custom "Google Maps" module gemaakt. Deze module is makkelijk her te gebruiken en in te stellen met plugins en events. Ook heb ik een Filter module gemaakt die veilig en snel posttypes kan filteren',
          tags: ["WordPress", "PHP", "JavaScript"],
          hidden: true,
        },
        {
          title: "WP-Quick-Seach",
          url: "https://github.com/jossafossa/quick-search",
          image: "quick-search-1.webp",
          images: ["quick-search-1.webp", "quick-search-2.webp"],
          description:
            "Een custom WordPress plugin waarmee je snel door wordpress kan navigeren of acties kan uitvoeren. Er zit een update server en een License server aan gekoppeld.",
          tags: ["WordPress", "PHP", "CSS", "JavaScript", "Plugin", "VueJS"],
        },
        // track
        // gaarkeuken
        // Work projects
        // Youtube zoom
        // Catifier
        // Favicon games
        // overviewer to osd
        // custom select
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
            label: "Pixel Art",
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
                label: "WordPress",
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
                label: "VS Code",
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
