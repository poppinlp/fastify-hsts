# fastify-hsts

[![Build Status][ci-img]][ci-url]
[![Code coverage][cov-img]][cov-url]
[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

Fastify plugin for HTTP Strict Transport Security

## Why?

You may know [hsts](https://github.com/helmetjs/hsts) as a [hsts middleware](https://helmetjs.github.io/docs/hsts/) used in [helmet](https://github.com/helmetjs/helmet). And you could use it as a middleware in fastify also. So why i made this plugin?

You may find the reason in [benchmark result](./benchmarks/benchmark.txt) and wish you like it. :)

## Install

Via npm:

```shell
npm i fastify-hsts
```

Via yarn:

```shell
yarn add fastify-hsts
```

## Usage

```js
const fastify = require('fastify');
const fastifyHsts = require('fastify-hsts');

const app = fastify();
app.register(fastifyHsts, {
  // Your options
});

app.listen(3000, err => {
  if (err) throw err;
});
```

## Options

This plugin has the same options as the middleware in helmet.

### maxAge {number}

Set `max-age` in header. Default is `15552000` which means 180 days in seconds. Plugin will use default value if you passed in a non-numeric value.

### includeSubDomains {boolean}

Set `includeSubDomains` value in header. Default is `true`. You could see more informations [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) for this value.

### preload {boolean}

Set `preload` value in header. Default is `false`. You could see more informations [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) for this value.

### setIf {function}

This plugin will always set the header since [the header is ignored in insecure HTTP](https://tools.ietf.org/html/rfc6797#section-8.1). But if you wish to set it conditionally, you could use this.

```js
app.register(fastifyHsts, {
  setIf: (request, reply) => {
    // request is the fastify request instance
    // reply is the fastify reply instance
    // should return a truly value for setting header
  }
});
```

## Changelog

- 0.2.0:
  - Add test case
  - Add code coverage
  - Add benchmarks
- 0.1.0:
  - Init version

[ci-img]: https://img.shields.io/travis/poppinlp/fastify-hsts.svg?style=flat-square
[ci-url]: https://travis-ci.org/poppinlp/fastify-hsts
[cov-img]: https://img.shields.io/coveralls/poppinlp/fastify-hsts.svg?style=flat-square
[cov-url]: https://coveralls.io/github/poppinlp/fastify-hsts?branch=master
[lint-img]: https://img.shields.io/badge/code%20style-handsome-brightgreen.svg?style=flat-square
[lint-url]: https://github.com/poppinlp/eslint-config-handsome
[dep-img]: https://img.shields.io/david/poppinlp/fastify-hsts.svg?style=flat-square
[dep-url]: https://david-dm.org/poppinlp/fastify-hsts
[dev-dep-img]: https://img.shields.io/david/dev/poppinlp/fastify-hsts.svg?style=flat-square
[dev-dep-url]: https://david-dm.org/poppinlp/fastify-hsts#info=devDependencies
[npm-ver-img]: https://img.shields.io/npm/v/fastify-hsts.svg?style=flat-square
[npm-dl-img]: https://img.shields.io/npm/dm/fastify-hsts.svg?style=flat-square
[npm-lc-img]: https://img.shields.io/npm/l/fastify-hsts.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/fastify-hsts
