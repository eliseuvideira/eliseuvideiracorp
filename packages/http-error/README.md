# http-error

> HttpError handles HTTP status code errors by extending Error base class

## Install

```bash
yarn add @eliseuvideiracorp/http-error
```

## Example

```js
const express = require('express');
const { HttpError, isHttpError } = require('@eliseuvideiracorp/http-error');

const app = express();

app.get('/users', (req, res, next) => {
  try {
    if (!req.user) {
      throw new HttpError(401, 'Unauthorized');
    }
    res.status(200).send('😎');
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  next(new HttpError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
  const status = isHttpError(err) ? err.status : 500;
  let message = err.message;
  if (status === 500) {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
      message = 'Internal server error';
    }
  }
  res.status(status).json({ message });
});

app.listen(3000);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
