const assert = require('chai').assert;
const BouyomiChan = require('../index.js');
const process = require('process');

const BOUYOMI_CHAN_PORT = 'BOUYOMI_CHAN_PORT' in process.env ? process.env.BOUYOMI_CHAN_PORT : 8000;

describe('BouyomiChan', function () {
    describe('#constructor()', function () {
        it('should succeed without options', function () {
            new BouyomiChan();
        });
        it('should set options', function () {
            let bouyomiChan = new BouyomiChan({
                host: 'host',
                port: 12345,
                speed: 50,
                tone: 200,
                volume: 0,
                type: 5,
            });
            assert.equal(bouyomiChan.host, 'host');
            assert.equal(bouyomiChan.port, 12345);
            assert.equal(bouyomiChan.speed, 50);
            assert.equal(bouyomiChan.tone, 200);
            assert.equal(bouyomiChan.volume, 0);
            assert.equal(bouyomiChan.type, 5);
        });
    });
    describe('#speak()', function () {
        it('should ask BouyomiChan to speak', function () {
            let bouyomiChan = new BouyomiChan({ port: BOUYOMI_CHAN_PORT });
            bouyomiChan.speak('test');
        });
    });
});
