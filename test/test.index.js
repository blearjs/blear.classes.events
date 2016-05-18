/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Events = require('../src/index.js');

describe('测试文件', function () {
    it('#on/#emit/#un', function (done) {
        var ee = new Events();
        var times = 0;
        var fn = function (a, b, c) {
            times++;
            expect(a).toEqual(1);
            expect(b).toEqual(2);
            expect(c).toEqual(3);

            ee.un('hehe', fn);
        };

        setTimeout(function () {
            ee.emit('hehe', 1, 2, 3);
        }, 1);

        setTimeout(function () {
            expect(times).toEqual(1);
            done();
        }, 300);

        ee.on('hehe', fn);
        ee.emit('hehe', 1, 2, 3);
    });

    it('#on:multiple', function (done) {
        var ee = new Events();

        ee.on('a b c', function (d) {
            expect(d).toEqual(1);
            done();
        });

        ee.emit('a', 1);
    });

    it('#emit:muliple', function (done) {
        var ee = new Events();
        var times = 0;

        ee.on('a b c', function (d) {
            times++;
        });

        setTimeout(function () {
            expect(times).toEqual(3);
            done();
        }, 100);

        ee.emit('a b c', 1);
    });

    it('#un:multiple', function (done) {
        var ee = new Events();
        var times = 0;

        ee.on('a b c', function (d) {
            times++;
            ee.un('a b c');
            ee.emit('a b c');
        });

        setTimeout(function () {
            expect(times).toEqual(1);
            done();
        }, 100);

        ee.emit('a b c', 1);
    });

    it('#once', function (done) {
        var ee = new Events();
        var times = 0;

        ee.once('a', function () {
            times++;
        });

        ee.emit('a');
        ee.emit('a');

        setTimeout(function () {
            expect(times).toEqual(1);
            done();
        }, 100);
    });

    it('#destroy', function (done) {
        var ee = new Events();
        var times = 0;

        ee.on('a', function () {
            times++;
        });

        ee.destroy();

        ee.emit('a');
        ee.emit('a');
        ee.un('a');

        setTimeout(function () {
            expect(times).toEqual(0);
            done();
        }, 100);
    });
});
