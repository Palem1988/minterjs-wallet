import bip39 from 'bip39'
import hdKey from 'hdkey'
import ethUtil from 'ethereumjs-util'
import bs58check from 'bs58check'

function assert (val, msg) {
  if (!val) {
    throw new Error(msg || 'Assertion failed')
  }
}

/**
 * BIP39 Master seed from mnemonic phrase
 * @param mnemonic - 12 words
 * @return {Buffer}
 */
export function seedFromMnemonic (mnemonic) {
  return bip39.mnemonicToSeed(mnemonic)
}

/**
 * BIP44 HD key from master seed
 * @param {Buffer} seed - 64 bytes
 * @return {HDKey}
 */
export function hdKeyFromSeed (seed) {
  return hdKey.fromMasterSeed(seed).derive("m/44'/60'/0'/0").deriveChild(0)
}

const Wallet = function (priv, mnemonic) {
  if (priv && mnemonic) {
    throw new Error('Cannot supply both a private and a mnemonic phrase to the constructor')
  }

  if (priv && !ethUtil.isValidPrivate(priv)) {
    throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)')
  }

  if (mnemonic && !bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase')
  }

  if (mnemonic) {
    const seed = seedFromMnemonic(mnemonic)
    priv = hdKeyFromSeed(seed)._privateKey
  }

  this._privKey = priv
  this._mnemonic = mnemonic
}

Object.defineProperty(Wallet.prototype, 'mnemonic', {
  get: function () {
    assert(this._mnemonic, 'This is a private key only wallet')
    return this._mnemonic
  }
})

Object.defineProperty(Wallet.prototype, 'privKey', {
  get: function () {
    return this._privKey
  }
})

// uncompressed public key
Object.defineProperty(Wallet.prototype, 'pubKey', {
  get: function () {
    if (!this._pubKey) {
      this._pubKey = ethUtil.privateToPublic(this.privKey)
    }
    return this._pubKey
  }
})

/**
 * @return {string}
 */
Wallet.prototype.getMnemonic = function () {
  return this.mnemonic
}

/**
 * @return {Buffer}
 */
Wallet.prototype.getPrivateKey = function () {
  return this.privKey
}

/**
 * @return {string}
 */
Wallet.prototype.getPrivateKeyString = function () {
  return this.getPrivateKey().toString('hex')
}

/**
 * @return {Buffer}
 */
Wallet.prototype.getPublicKey = function () {
  return this.pubKey
}

/**
 * @return {string}
 */
Wallet.prototype.getPublicKeyString = function () {
  return this.getPublicKey().toString('hex')
}

/**
 * @return {Buffer}
 */
Wallet.prototype.getAddress = function () {
  return ethUtil.publicToAddress(this.pubKey)
}

/**
 * @return {string}
 */
Wallet.prototype.getAddressString = function () {
  return 'Mx' + this.getAddress().toString('hex')
}

/**
 * Generate Wallet from random mnemonic
 * @return {Wallet}
 */
Wallet.generate = function () {
  const mnemonic = bip39.generateMnemonic()
  return Wallet.fromMnemonic(mnemonic)
}

/**
 * MinterWallet from mnemonic phrase
 * @param {string} mnemonic - 12 words
 * @return {Wallet}
 */
Wallet.fromMnemonic = function (mnemonic) {
  return new Wallet(null, mnemonic)
}

/**
 * MinterWallet from private key
 * @param {Buffer} priv - 64 bytes
 * @return {Wallet}
 */
Wallet.fromPrivateKey = function (priv) {
  return new Wallet(priv)
}

/**
 * @param {string} priv
 * @return {Wallet}
 */
Wallet.fromExtendedPrivateKey = function (priv) {
  assert(priv.slice(0, 4) === 'xprv', 'Not an extended private key')
  let tmp = bs58check.decode(priv)
  assert(tmp[45] === 0, 'Invalid extended private key')
  return Wallet.fromPrivateKey(tmp.slice(46))
}

export default Wallet
