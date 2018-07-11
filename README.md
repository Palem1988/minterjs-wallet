# Minter JS Wallet

[![NPM Package](https://img.shields.io/npm/v/minterjs-wallet.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-wallet)
[![Build Status](https://api.travis-ci.com/MinterTeam/minterjs-wallet.svg?branch=master)](https://travis-ci.com/MinterTeam/minterjs-wallet)
[![Coverage Status](https://coveralls.io/repos/github/MinterTeam/minterjs-wallet/badge.svg?branch=master)](https://coveralls.io/github/MinterTeam/minterjs-wallet?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MinterTeam/minterjs-wallet/blob/master/LICENSE)

A lightweight Minter Wallet implementation.
Forked from [ethereumjs-wallet](https://github.com/ethereumjs/ethereumjs-wallet)

It is complemented by the following packages:
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) complete JS solution to work with Minter
- [minterjs-tx](https://github.com/MinterTeam/minterjs-tx) to sign transactions

Motivations are:
- be lightweight
- work in a browser
- support BIP39 mnemonic phrases
- support BIP32 HD keys

Features not supported:
- signing transactions
- managing storage (neither in node.js or the browser)
- conversion between various wallet formats

## Wallet API

Constructors:

* `generate()` - generate an instance based on random BIP39 12 words mnemonic phrase
* `fromMnemonic(input)` - create an instance based on BIP39 12 words mnemonic phrase
* `fromPrivateKey(input)` - create an instance based on a raw private key
* `fromExtendedPrivateKey(input)` - create an instance based on a BIP32 extended private key (xprv)

Instance methods:

* `getMnemonic()` - return the mnemonic phrase (12 words string)
* `getPrivateKey()` - return the private key
* `getPublicKey()` - return the public key
* `getAddress()` - return the address

All of the above instance methods (expect mnemonic) return a Buffer or JSON. Use the `String` suffixed versions for a string output, such as `getPrivateKeyString()`.

Note: `getPublicKey()` only returns uncompressed Ethereum-style public keys.

## License

MIT License
