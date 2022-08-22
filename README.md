# nestjs-data-platform-test

## Description
Command line app that takes as input a file with a set of records in one of three formats (pipe-delimited, comma-delimited, space-delimited), and outputs (to the screen) the set of records sorted in one of three ways.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Test Step 1 (command line)
After running the application, the prompt will be shown to input file names and files should be located in `/src/assets/`

```bash
prompt: Input file names separated by space: 1.txt 2.txt 3.txt
```

It will output merged records in three different views
- Output 1 – sorted by gender (females before males) then by last name ascending.
- Output 2 – sorted by birth date, ascending.
- Output 3 – sorted by last name, descending.

## Test Step 2 (REST API)
Four records endpoints are created for creating / reading user records.

- POST: http://localhost:3000/records - stores user record in memory
```json
Body
{
  "record": "Fogel | Mike | MALE | Yello | 12-09-1980"
}
```
- GET: http://localhost:3000/records/gender - returns user records sorted by gender
- GET: http://localhost:3000/records/birthdate - returns user records sorted by birthdate
- GET: http://localhost:3000/records/name - returns user records sorted by last name

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```

## License

Nest is [MIT licensed](LICENSE).
