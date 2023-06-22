## Getting Started

You can use docker-compose to start app easily.

First of all, install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it on your machine. Make sure you follow all prerequisites.

Secondly, you must create .env file in the root folder with content like this:

```dotenv
REACT_APP_API_URL=http://meetlane-api-dev:3030
```

Now, you can execute this command:

```shell
# build containers and run application
docker-compose up
```

If you want to stop containers, just use:

```shell
docker-compose stop
```

If you want to remove containers, use:

```shell
docker-compose down
```

## Project Structure

`./src/pages` folder contains all pages.

`./src/components` folder contains useful components - building blocks of pages.

`./src/hooks` folder contains useful hooks.

`./src/store` folder contains logic for making requests and caching their results.

`./src/utils` folder contains useful functions.
