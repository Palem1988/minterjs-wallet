# Minter JS Wallet

[![NPM Package](https://img.shields.io/npm/v/minterjs-wallet.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-wallet)
[![Build Status](https://travis-ci.org/MinterTeam/minterjs-wallet.svg?branch=master)](https://travis-ci.org/MinterTeam/minterjs-wallet)
[![Coverage Status](https://img.shields.io/coveralls/ethereumjs/minterjs-wallet.svg?style=flat-square)](https://coveralls.io/r/MinterTeam/minterjs-wallet)
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

* `getPrivateKey()` - return the private key
* `getPublicKey()` - return the public key
* `getAddress()` - return the address
* `getChecksumAddressString()` - return the [address with checksum](https://github.com/ethereum/EIPs/issues/55)

All of the above instance methods return a Buffer or JSON. Use the `String` suffixed versions for a string output, such as `getPrivateKeyString()`.

Note: `getPublicKey()` only returns uncompressed Ethereum-style public keys.

For the seed we suggest to use [bip39](https://npmjs.org/package/bip39) to create one from a BIP39 mnemonic.

## License

MIT License

Copyright (C) 2016 Alex Beregszaszi
