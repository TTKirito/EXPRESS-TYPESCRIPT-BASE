# PROJECT

## Install requirement

- **Nodejs**: 16 (every version >= 14.\* is OK)
- **Mysql**: 5.7.25

## Development environments

- **ENV**: Environment

- Configuration files with corresponding environments are in the `env` file.


## Install project và run server

- **Step 1:** Clone git repository:
  `git clone https://gitlab.vinova.sg/vinova/project-bestfoody/bestfoody-api.git`

- **Step 2:** Install packages:
  `npm install`
- **Step 3:** In env:

  - Copy file `.env.example`
  - Rename to `.env`

    Change configuration to connect database , redis at local, ...

- **Step 3** Run Migrate database
  - Normal run: `npm run migrate-run`

- **Step 4** Run Seed database 
  - Normal run: `npm run seed`


- **Step 5:** Running server
  - Normal run: `npm start`

## Create migrate file

- At **Step 3** if not file migrate.

  - Normal run: `npm run migrate-create --name`

## Api docs

- **API docs**, `git clone http://localhost:3000/docs`

## TypeOrm

Typeorum is an ORM used for SQL. Read document [TypeOrm](https://orkhan.gitbook.io/typeorm/docs).
In this project, TypeOrm is configured to read corresponding environment variables.