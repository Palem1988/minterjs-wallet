const DomEnvironment = require('jest-environment-jsdom');
const nodeCrypto = require('crypto');

class TestEnvironment extends DomEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();

        // window.crypto is not defined in jsdom
        this.global.crypto = {
            getRandomValues: function(buffer) {
                return nodeCrypto.randomFillSync(buffer);
            }
        };
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = TestEnvironment;
