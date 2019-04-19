# Banka
[![Build Status](https://travis-ci.org/okikiola11/banka.svg?branch=develop)](https://travis-ci.org/okikiola11/banka)
[![Coverage Status](https://coveralls.io/repos/github/okikiola11/banka/badge.svg?branch=develop)](https://coveralls.io/github/okikiola11/banka?branch=develop)

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money..

## Clone the Repo

git clone https://github.com/okikiola11/banka

## Github Pages
https://okikiola11.github.io/banka/UI/index.html

## Prerequisites

The following tools will be needed to run this application successfully:

* Node v10.15.0 or above
* Npm v6.4 or above

## Setup
To run this project, install it locally using npm:

```
$ cd ../banka
$ npm install
$ npm start
```

## Endpoints

| HTTP Verb       | Endpoints                                 |
| --------------- | ----------------------------------------- |
| `POST request`  | api/v1/auth/signup                        |
| `POST request`  | api/v1/auth/signin                        |
| `POST request`  | api/v1/accounts                           |
| `GET all`       | api/v1/accounts                           |
| `GET single`    | api/v1/accounts/:accountNumber            |
| `PATCH request` | api/v1/accounts/:accountNumber            |
| `DELETE`        | api/v1/accounts/:accountNumber            |
| `POST request`  | api/v1/transactions/:accountNumber/credit |
| `POST request`  | api/v1/transactions/:accountNumber/debit  |
