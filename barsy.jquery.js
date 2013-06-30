/*
    barsy - copyright 2013, Jesse Pollak
    http://github.com/jessepollak/barsy
    http://www.opensource.org/licenses/mit-license.php

    barcode generating code adapted from:
    code128-js - copyright 2010-2012, Doeke Zanstra
    http://zanstra.com/my/Barcode.html
    http://www.opensource.org/licenses/mit-license.php
*/

(function($) {
    if (!exports) var exports = window;
    var BARS = [212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232,23311120],
        START_BASE = 38,
        STOP       = 106, //BARS[STOP]==23311120 (manually added a zero at the end)
        HEIGHT = 150,
        RAINBOW = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];

    var animations = [];
    var max_animation_length = 0;

    function code128(code, opts) {
        barcodeType = code128Detect(code);
        if (barcodeType=='C' && code.length%2==1) code = '0'+code;
        var a = parseBarcode(code,  barcodeType);
        return bar2html(a.join(''), opts);
    }

    function bar2html(s, opts) {
        for(var pos=0, i = 0, sb=[], b; pos<s.length; pos+=2, i += 1) {
            b = '<div class="bar' + s.charAt(pos) + ' space' + s.charAt(pos+1) + '"';

            if (opts.color) {
                if (opts.color === 'rainbow') color = RAINBOW[i % RAINBOW.length];
                else color = opts.color;

                b += 'style="border-color:' + color + ';"></div>';
            }
            else b += '></div>';

            sb.push(b);
        }
        return sb.join('');
    }

    // detects which type of barcode it is
    function code128Detect(code) {
        if (/^[0-9]+$/.test(code)) return 'C';
        if (/[a-z]/.test(code)) return 'B';
        return 'A';
    }

    function parseBarcode(barcode, barcodeType) {
        var bars = [];
        bars.add = function(nr) {
            var nrCode = BARS[nr];
            this.check = this.length === 0 ? nr : this.check + nr*this.length;
            this.push( nrCode || ("UNDEFINED: "+nr+"->"+nrCode) );
        };
        bars.add(START_BASE + barcodeType.charCodeAt(0));
        for(var i=0; i<barcode.length; i++) {
            var code = barcodeType=='C' ? +barcode.substr(i++, 2) : barcode.charCodeAt(i);
            converted = fromType[barcodeType](code);
            if (isNaN(converted) || converted<0 || converted>106) throw new Error("Unrecognized character ("+code+") at position "+i+" in code '"+barcode+"'.");
            bars.add( converted );
        }
        bars.push(BARS[bars.check % 103], BARS[STOP]);
        return bars;
    }

    var fromType = {
        A: function(charCode) {
            if (charCode>=0 && charCode<32) return charCode+64;
            if (charCode>=32 && charCode<96) return charCode-32;
            return charCode;
        },
        B: function(charCode) {
            if (charCode>=32 && charCode<128) return charCode-32;
            return charCode;
        },
        C: function(charCode) {
            return charCode;
        }
    };

    function animate($barsy, opts) {
        var children = $barsy.children(),
            l = children.length;

        for (var i = 0; i < l; i++) {
            barAnimate(children.eq(i), $.extend({}, opts));
        }
    }

    function barAnimate($bar, opts) {
        var aniOptions = {};

        // initialize values when random isn't there
        if (!opts.random) {
            opts.random = Math.random();
            opts.reverse = opts.random < 0.7 ? true : false;
            opts.d = (opts.random * (opts.distance - 0.2) + 0.2) * parseInt(150, 10);
            opts.s = (opts.random * (1 - 0.5) + 0.5) * opts.speed;
            aniOptions['height'] = opts.height;
        }

        max_animation_length = Math.max(max_animation_length, opts.s);

        aniOptions['top'] = opts.reverse ? -opts.d : opts.d;

        $bar.css("height", 1);
        $bar.css("opacity", 0);

        animations.push([window.setInterval(function () {
                var moveBack = move($bar).y(0).duration(opts.s).end();
                var distance = opts.d*2;

                if(!opts.started) {
                    $bar.css("opacity", 1);

                    move($bar).set("height",opts.height).duration(opts.s).y(distance).end();
                    move($bar).set("height",opts.height).duration(opts.s).y(distance).ease("in-out").then(moveBack).end();

                    opts.started = true;
                } else {
                    move($bar).set("height",opts.height).duration(opts.s).y(distance).ease("in-out").then(moveBack).end();
                }
            }, opts.s*2), $bar, opts]);

    }
    

    $.fn.barsy = function(opts) {

        this.finished = false;

        this.stop = function() {
            if (!this.finished) {
                window.setTimeout(function () {
                        var i = 0;

                        var finish = function () { 
                                if (i < animations.length-1) {
                                    var bar = animations[++i][1];

                                    move(bar).set("border-right", bar.css("margin-right")+" solid "+bar.css("border-left-color"))
                                        .set("margin-right", "0px").duration(5).then(finish).end();
                                } else {
                                    this.finished = true;
                                }
                            };

                        var bar = animations[0][1];

                        move(bar)
                            .set("border-right", bar.css("margin-right")+" solid "+bar.css("border-left-color"))
                            .set("margin-right", "0px").duration(5).then(finish).end();

                        move($(".barsy")).set("background-color", animations[0][1].css("border-left-color")).duration(1000).end();

                    }, max_animation_length / 1.5);

                for (var i = 0; i < animations.length; i++) {
                        clearInterval(animations[i][0]);

                        var bar = animations[i][1];

                        move(bar).y(0).duration(500).end();
                }
            } 
        };

        this.restart = function() {
            if (!this.finished) {
                window.setTimeout(function () {                        

                        var bars = [];
                        var opts = [];
                        for (var i = 0; i < animations.length; i++) {
                            animations[i][1].css("margin-right", animations[i][1].css("border-right-width")).css("border-right", "");

                            animations[i][1].css("opacity", 0);

                            bars.push(animations[i][1]);
                            opts.push(animations[i][2]);
                        }

                        animations = [];

                        for (var i = 0; i < bars.length; i++) {
                            console.log(i);
                            opts[i].started = false;

                            barAnimate(bars[i], opts[i]);
                        }

                        this.finished = false;


                        move($(".barsy")).set("background-color", "#FFF").duration(1000).end();

                    }, max_animation_length / 1.5);

            } 
        };

        move.select = function(element) {
            return element.get(0);
        };


        opts = opts || {};

        var $this = $(this),
            value = opts.value || $this.text();

        opts.height = opts.height || 150;
        opts.speed = opts.speed || 1000;
        opts.distance = (opts.distance && opts.distance < 0.5) ? opts.distance : 0.3;

        $this.css('height', opts.height);

        animate($this.empty().addClass('barsy').append(code128(value, opts)), opts);
        
        return this;
    };

})(jQuery);