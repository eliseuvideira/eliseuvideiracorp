# http-error

> Error class to handle http status code

## Install

```bash
yarn install @eliseuvideiracorp/http-error
```

## Usage

```js
const { HttpError, isHttpError } = require('@eliseuvideiracorp/http-error');

...

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

...
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
