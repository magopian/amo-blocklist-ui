# AMO blocklist UI

[![Build Status](https://travis-ci.org/mozilla-services/amo-blocklist-ui.svg)](https://travis-ci.org/mozilla-services/amo-blocklist-ui)

A Web admin UI to manage Mozilla's AMO blocklist.

## Installation

NodeJS v4+ and npm 2.14+ should be instaled and available on your machine.

```bash
$ npm install
```

## Development server

```
$ npm start
```

Application is served at [localhost:3000](http://localhost:3000/). Any project file update will trigger an automatic reload.

## Building for production hosting

```
$ npm run build
```

Production-ready assets are generated in the `build/` directory, and can be published on any static webserver.

## Publishing on github pages

```
$ npm run publish
```

Application is built and [published to gh-pages](http://mozilla-services.github.io/amo-blocklist-ui).

## License

Mozilla Public License 2.0

