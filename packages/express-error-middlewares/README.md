# express-error-middlewares

> express based middlewares to handle errors

## Install

```bash
yarn add express @eliseuvideiracorp/http-error @eliseuvideiracorp/express-error-middlewares
```

## API

The module exports two middlewares

- notFound

  Handles not found response

- exception

  Handles all errors, if the thrown error has a status property, it uses it as response status code, otherwise 500

## Usage

```js
const {
  exception,
  notFound,
} = require('@eliseuvideiracorp/express-error-middlewares');

// ...

app.use(notFound);

app.use(exception);
```

## Example

```js
const express = require('express');
const {
  exception,
  notFound,
} = require('@eliseuvideiracorp/express-error-middlewares');

const app = express();

app.get('/', (req, res) => res.status(200).send('🍔'));

app.use(notFound);

app.use(exception);

app.listen(3000);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
