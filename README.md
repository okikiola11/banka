# banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money..

## Clone the Repo

git clone https://github.com/okikiola11/banka

## Prerequisites

The following tools will be needed to run this application successfully:

- Node v10.15.0 or above
- Npm v6.4 or above

## Endpoints

POST request - api/v1/auth/signup
POST request - api/v1/auth/signin

POST request - api/v1/accounts
GET all request - api/v1/accounts
GET single request - api/v1/accounts/:accountNumber
PATCH request - api/v1/accounts/:accountNumber
DELETE - api/v1/accounts/:accountNumber

POST request - api/v1/transactions/:accountNumber/credit
POST request - api/v1/transactions/:accountNumber/debit
