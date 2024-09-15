# Archive of my old web projects

This is a collection of all my old web projects from the time of my apprenticeship. (2018-2022)

I haven't touched most of the projects since 2019. Thanks to Docker, I was able to bring all the projects back to life.

## How to run

```bash
docker compose -f path/to/docker-compose.yml up
```

## Overview

### Apprentice project

- [waterplaces](/waterplaces/)
  - Built with Kotlin, HTML, CSS and vanilla JavaScript
- [snake](/snake/)
  - Built with C# (no prebuilt .exe available)

### Atelier Sidefyn

Visit [atelier-sidefyn.ch](https://atelier-sidefyn.ch/?utm_source=github) for the current live site.

- [v1](/atelier-sidefyn/v1/)
  - Built with Kotlin, HTML, CSS and jQuery
- [v2](/atelier-sidefyn/v2/)
  - Built with HTML, CSS and jQuery
- [v3](/atelier-sidefyn/v3/)
  - Built with HTML, CSS and jQuery
- [v4](/atelier-sidefyn/v4/)
  - Built with HTML, CSS and jQuery

### Personal site

Visit [larsgerber.ch](https://larsgerber.ch/?utm_source=github) for the current live site.

- [v1](/larsgerber/v1/)
  - Built with HTML, CSS and vanilla JavaScript
- [v2](/larsgerber/v2/)
  - Built with PHP, jQuery and Sass
- [v3](/larsgerber/v3/)
  - Built with NodeJS, jQuery and Sass
- [v4](/larsgerber/v4/)
  - Built with NodeJS, jQuery and Sass

### Personal blog

Visit [blog.larsgerber.ch](https://blog.larsgerber.ch/?utm_source=github) for the current live site.

- [v1](/blog-larsgerber/v1/)
  - Built with NodeJS, jQuery and MongoDB
- [v2](/blog-larsgerber/v2/)
  - Built with NodeJS, jQuery, Scss and MongoDB
  - Works with my provided read only DB user
- v3
  - Built with NodeJS, jQuery, Scss and KeystoneJS CMS
  - Frontend: [github.com/larsgerber/minimalism-blog/blob/keystone](https://github.com/larsgerber/minimalism-blog/blob/keystone/docker-compose.yml)
  - Backend: [github.com/larsgerber/minimalism-keystone](https://github.com/larsgerber/minimalism-keystone/blob/master/docker-compose.yml)
  - (KeystoneJS crashes when run with my read only DB user)
- v4
  - Built with NodeJS, jQuery, Scss and StrapiJS CMS
  - Frontend: [github.com/larsgerber/minimalism-blog/blob/strapi](https://github.com/larsgerber/minimalism-blog/blob/strapi/docker-compose.yml)
  - Backend: [github.com/larsgerber/minimalism-strapi](https://github.com/larsgerber/minimalism-strapi/blob/master/docker-compose.yml)
  - (only working with my archived image from 25.06.2022)
