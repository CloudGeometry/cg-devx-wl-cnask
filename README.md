# CloudGeometry DevX Cloud Native Application Starter Kit 🚀

Cloud Native Application template by CloudGeometry team.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- Node.js (version 18.15.0 or higher)
- Yarn (version 1.22 or higher)
- PostgreSQL (version 15 or higher)
- Docker (version 20.10.14 or higher)

### Installing Node.js

Download and install Node.js from the [official website](https://nodejs.org/)

### Installing Yarn

To install Yarn, follow the instructions in the [official documentation](https://classic.yarnpkg.com/en/docs/install/)

### Installing Docker

To install Docker, follow the instructions in the [official documentation](https://docs.docker.com/engine/install/) for your operating system

### Installing PostgreSQL

Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/)
or

Run PostgreSQL in Docker using image of your choice like [official one](https://hub.docker.com/_/postgres) 
```bash
docker run --name cg-cnask-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

## Getting Started

1. Clone this repository to your local machine.
2. Install the project dependencies using Yarn:

```bash
# yarn
yarn install
```
3. Create a new PostgreSQL database and user with the following commands:

```bash
createdb my_database
createuser my_user
```

> **Note**: Replace `my_database` and `my_user` with the names you want to use for your database and user. Set the environment variables to API application `.env`. 

**When using docker**: You could skip this step as you are going to provide db name, user, and password as input parameters.

4. Setup application services according to [README.md](./apps/api/README.md)

5. Setup tenant services according to [README.md](./apps/api-tenant/README.md)


## Local Development

Use the following commands to:

Run application API services. By default, it will be available on http://localhost:3000/.

```bash
# yarn
yarn workspace cnask-api start
```

Run application web UI. By default, it will be available on http://localhost:4200/.

```bash
# yarn
yarn workspace cnask-web-client dev
```


Run tenant management application API services. By default, it will be available on http://localhost:4000/.

```bash
# yarn
yarn workspace cnask-api-tenant start
```

Run application web UI. By default, it will be available on http://localhost:4210/.

```bash
# yarn
yarn workspace cnask-web-tenant-admin dev
```

The app will automatically reload if you change any of the source files.
