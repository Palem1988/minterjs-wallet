# minterjs-wallet

[![NPM Package](https://img.shields.io/npm/v/ethereumjs-wallet.svg?style=flat-square)](https://www.npmjs.org/package/ethereumjs-wallet)
[![Build Status](https://travis-ci.org/ethereumjs/ethereumjs-wallet.svg?branch=master)](https://travis-ci.org/ethereumjs/ethereumjs-wallet)
[![Coverage Status](https://img.shields.io/coveralls/ethereumjs/ethereumjs-wallet.svg?style=flat-square)](https://coveralls.io/r/ethereumjs/ethereumjs-wallet)

A lightweight wallet implementation. At the moment it supports key creation and conversion between various formats.
Forked from [ethereumjs-wallet](https://github.com/ethereumjs/ethereumjs-wallet)

It is complemented by the following packages:
- [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx) to sign transactions
- [ethereumjs-icap](https://github.com/ethereumjs/ethereumjs-icap) to manipulate ICAP addresses
- [store.js](https://github.com/marcuswestin/store.js) to use browser storage

Motivations are:
- be lightweight
- work in a browser
- use a single, maintained version of crypto library (and that should be in line with `ethereumjs-util` and `ethereumjs-tx`)
- support import/export between various wallet formats
- support BIP32 HD keys

Features not supported:
- signing transactions
- managing storage (neither in node.js or the browser)

## Wallet API

Constructors:

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
