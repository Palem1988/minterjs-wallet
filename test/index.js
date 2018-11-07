import assert from 'assert'
import bip39 from 'bip39'
import ethUtil from 'ethereumjs-util'
import { Buffer } from 'safe-buffer'
import Wallet, { seedFromMnemonic, hdKeyFromSeed, walletFromPrivateKey, walletFromExtendedPrivateKey, walletFromMnemonic, generateWallet, isValidMnemonic } from '../src/index'

const MNEMONIC = 'exercise fantasy smooth enough arrive steak demise donkey true employ jealous decide blossom bind someone'
const PRIVATE_KEY = '5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da'
const fixturewallet = walletFromMnemonic(MNEMONIC)

describe('seedFromMnemonic()', () => {
  const seedBuffer = seedFromMnemonic(MNEMONIC)
  it('should have correct length', () => {
    assert.strictEqual(seedBuffer.length, 64)
  })
  it('should have correct value', () => {
    assert.strictEqual(seedBuffer.toString('hex'), '4ca64bd07f7765099f856e554504900953f59bd874009b4905fca674158ea0563bd7c35b79bff3feb3b33fcbdcdb771b93338ea4f29fcb9cfbb2f570093878c1')
  })
})

describe('hd key from mnemonic', () => {
  it('should work', () => {
    const seed = seedFromMnemonic(MNEMONIC)
    const hdKey = hdKeyFromSeed(seed)
    const privateKey = hdKey._privateKey.toString('hex')
    assert.strictEqual(privateKey.length, 64)
    assert.strictEqual(privateKey, PRIVATE_KEY)
  })
})

describe('.getPrivateKey()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getPrivateKey().toString('hex'), PRIVATE_KEY)
  })
})

describe('.getPrivateKeyString()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getPrivateKeyString(), PRIVATE_KEY)
  })
})

describe('.getPublicKey()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getPublicKey().toString('hex'), 'f9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3cb8a015b8031d02e79456aedb361fa20ec1a119d6009e5c08e9d1eeb5b29ad92')
  })
})

describe('.getPublicKeyString()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getPublicKeyString(), 'Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3')
  })
})

describe('.getAddress()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getAddress().toString('hex'), '7633980c000139dd3bd24a3f54e06474fa941e16')
  })
})

describe('.getAddressString()', function () {
  it('should work', function () {
    assert.strictEqual(fixturewallet.getAddressString(), 'Mx7633980c000139dd3bd24a3f54e06474fa941e16')
  })
})

describe('generate random wallet', function () {
  const wallet = generateWallet()
  it('should have valid mnemonic', () => {
    assert.ok(bip39.validateMnemonic(wallet.getMnemonic()))
  })
  it('should have valid private key', () => {
    assert.ok(ethUtil.isValidPrivate(wallet.getPrivateKey()))
  })
})

describe('private key only wallet', function () {
  const privKey = Buffer.from(PRIVATE_KEY, 'hex')
  const wallet = walletFromPrivateKey(privKey)
  it('walletFromPrivateKey() should work', function () {
    assert.strictEqual(wallet.getPublicKey().toString('hex'),
      'f9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3cb8a015b8031d02e79456aedb361fa20ec1a119d6009e5c08e9d1eeb5b29ad92')
  })
  it('walletFromPrivateKey() should not accept invalid key', function () {
    assert.throws(function () {
      walletFromPrivateKey(Buffer.from('001122', 'hex'))
    }, /^Error: Private key does not satisfy the curve requirements \(ie. it is invalid\)$/)
  })
  it('.getAddress() should work', function () {
    assert.strictEqual(wallet.getAddress().toString('hex'), '7633980c000139dd3bd24a3f54e06474fa941e16')
  })
  it('.getMnemonic() should fail', function () {
    assert.throws(function () {
      wallet.getMnemonic()
    }, /^Error: This is a private key only wallet$/)
  })
})

describe('Wallet', function () {
  it('constructor should throw with 2 arguments', function () {
    assert.throws(() => {
      const privKey = Buffer.from(PRIVATE_KEY, 'hex')
      return new Wallet(privKey, MNEMONIC)
    })
  })
})

describe('walletFromMnemonic()', function () {
  it('should throw on invalid mnemonic', function () {
    assert.throws(() => {
      walletFromMnemonic('a b c d e f g h i j k l')
    })
  })
})

describe('walletFromExtendedPrivateKey()', function () {
  it('should work', function () {
    const xprv = 'xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY'
    assert.strictEqual(walletFromExtendedPrivateKey(xprv).getAddressString(), 'Mxb800bf5435f67c7ee7d83c3a863269969a57c57c')
  })
})

describe('isValidMnemonic()', function () {
  it('should work on valid 15 words mnemonic', function () {
    assert.strictEqual(isValidMnemonic(MNEMONIC), true)
  })
  it('should work on valid 15 words mnemonic', function () {
    assert.strictEqual(isValidMnemonic(bip39.generateMnemonic(160)), true)
  })
  it('should work on valid 12 words mnemonic', function () {
    assert.strictEqual(isValidMnemonic(bip39.generateMnemonic()), true)
  })
  it('should fail on invalid 12 words mnemonic', function () {
    assert.strictEqual(isValidMnemonic('a b c d e f g h i j k l'), false)
  })
})
