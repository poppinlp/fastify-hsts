# fastify-hsts

[![Code style][lint-img]][lint-url]
[![Dependency Status][dep-img]][dep-url]
[![Dev Dependency Status][dev-dep-img]][dev-dep-url]
[![NPM version][npm-ver-img]][npm-url]
[![NPM downloads][npm-dl-img]][npm-url]
[![NPM license][npm-lc-img]][npm-url]

Fastify plugin for HTTP Strict Transport Security

## Why?

You may know [hsts](https://github.com/helmetjs/hsts) as a [hsts middleware](https://helmetjs.github.io/docs/hsts/) used in [helmet](https://github.com/helmetjs/helmet). And you could use it as a middleware in fastify also. So why i made this plugin?

Benchmark with no plugin:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev   Max
Latency (ms) 32.37   8.9     1139.09
Req/Sec      30444   1051.31 31048
Bytes/Sec    4.53 MB 170 kB  4.63 MB

609k requests in 20s, 90.7 MB read
```

Benchmark with hsts as middleware:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev   Max
Latency (ms) 37.81   9.07    607.01
Req/Sec      26119.2 1369.03 27550
Bytes/Sec    5.56 MB 311 kB  5.87 MB

522k requests in 20s, 111 MB read
```

Benchmark with this plugin:

```txt
Running 20s test @ http://127.0.0.1:10290/pudge/rest/v0/benchmark
1000 connections

Stat         Avg     Stdev  Max
Latency (ms) 34.54   7.56   320.06
Req/Sec      28563.2 974.97 29246
Bytes/Sec    6.09 MB 183 kB 6.23 MB

571k requests in 20s, 122 MB read
```

So that's the reason and wish you like it. :)

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

- 0.1.0: Init version

## Todo

- Add test case
- Add ci
- Add benchmark scripts

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
