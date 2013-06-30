/*
    barsy - copyright 2013, Jesse Pollak
    http://github.com/jessepollak/barsy
    http://www.opensource.org/licenses/mit-license.php

    barcode generating code adapted from:
    code128-js - copyright 2010-2012, Doeke Zanstra
    http://zanstra.com/my/Barcode.html
    http://www.opensource.org/licenses/mit-license.php
*/

/*!
 * move
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

 (function(exports){var current=window.getComputedStyle||window.currentStyle,map={top:"px",bottom:"px",left:"px",right:"px",width:"px",height:"px","font-size":"px",margin:"px","margin-top":"px","margin-bottom":"px","margin-left":"px","margin-right":"px",padding:"px","padding-top":"px","padding-bottom":"px","padding-left":"px","padding-right":"px"};exports.move=function(selector){return new Move(move.select(selector))},exports.move.version="0.0.3",move.defaults={duration:500},move.ease={"in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},move.select=function(selector){if("string"!=typeof selector)return selector;return document.getElementById(selector)||document.querySelectorAll(selector)[0]};function EventEmitter(){this.callbacks={}}EventEmitter.prototype.on=function(event,fn){(this.callbacks[event]=this.callbacks[event]||[]).push(fn);return this},EventEmitter.prototype.emit=function(event){var args=Array.prototype.slice.call(arguments,1),callbacks=this.callbacks[event],len;if(callbacks){len=callbacks.length;for(var i=0;i<len;++i)callbacks[i].apply(this,args)}return this},exports.Move=function Move(el){if(!(this instanceof Move))return new Move(el);EventEmitter.call(this),this.el=el,this._props={},this._rotate=0,this._transitionProps=[],this._transforms=[],this.duration(move.defaults.duration)},Move.prototype=new EventEmitter,Move.prototype.constructor=Move,Move.prototype.transform=function(transform){this._transforms.push(transform);return this},Move.prototype.skew=function(x,y){y=y||0;return this.transform("skew("+x+"deg, "+y+"deg)")},Move.prototype.skewX=function(n){return this.transform("skewX("+n+"deg)")},Move.prototype.skewY=function(n){return this.transform("skewY("+n+"deg)")},Move.prototype.translate=Move.prototype.to=function(x,y){y=y||0;return this.transform("translate("+x+"px, "+y+"px)")},Move.prototype.translateX=Move.prototype.x=function(n){return this.transform("translateX("+n+"px)")},Move.prototype.translateY=Move.prototype.y=function(n){return this.transform("translateY("+n+"px)")},Move.prototype.scale=function(x,y){y=null==y?x:y;return this.transform("scale("+x+", "+y+")")},Move.prototype.scaleX=function(n){return this.transform("scaleX("+n+")")},Move.prototype.scaleY=function(n){return this.transform("scaleY("+n+")")},Move.prototype.rotate=function(n){return this.transform("rotate("+n+"deg)")},Move.prototype.ease=function(fn){fn=move.ease[fn]||fn||"ease";return this.setVendorProperty("transition-timing-function",fn)},Move.prototype.animate=function(name,props){for(var i in props)props.hasOwnProperty(i)&&this.setVendorProperty("animation-"+i,props[i]);return this.setVendorProperty("animation-name",name)},Move.prototype.duration=function(n){n=this._duration="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-duration",n+"ms")},Move.prototype.delay=function(n){n="string"==typeof n?parseFloat(n)*1e3:n;return this.setVendorProperty("transition-delay",n+"ms")},Move.prototype.setProperty=function(prop,val){this._props[prop]=val;return this},Move.prototype.setVendorProperty=function(prop,val){this.setProperty("-webkit-"+prop,val),this.setProperty("-moz-"+prop,val),this.setProperty("-ms-"+prop,val),this.setProperty("-o-"+prop,val);return this},Move.prototype.set=function(prop,val){this.transition(prop),"number"==typeof val&&map[prop]&&(val+=map[prop]),this._props[prop]=val;return this},Move.prototype.add=function(prop,val){if(!!current){var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr+val+"px")})}},Move.prototype.sub=function(prop,val){if(!!current){var self=this;return this.on("start",function(){var curr=parseInt(self.current(prop),10);self.set(prop,curr-val+"px")})}},Move.prototype.current=function(prop){return current(this.el).getPropertyValue(prop)},Move.prototype.transition=function(prop){if(!this._transitionProps.indexOf(prop))return this;this._transitionProps.push(prop);return this},Move.prototype.applyProperties=function(){var props=this._props,el=this.el;for(var prop in props)props.hasOwnProperty(prop)&&el.style.setProperty(prop,props[prop],"");return this},Move.prototype.move=Move.prototype.select=function(selector){this.el=move.select(selector);return this},Move.prototype.then=function(fn){if(fn instanceof Move)this.on("end",function(){fn.end()});else if("function"==typeof fn)this.on("end",fn);else{var clone=new Move(this.el);clone._transforms=this._transforms.slice(0),this.then(clone),clone.parent=this;return clone}return this},Move.prototype.pop=function(){return this.parent},Move.prototype.end=function(fn){var self=this;this.emit("start"),this._transforms.length&&this.setVendorProperty("transform",this._transforms.join(" ")),this.setVendorProperty("transition-properties",this._transitionProps.join(", ")),this.applyProperties(),fn&&this.then(fn),setTimeout(function(){self.emit("end")},this._duration);return this}})(this);

/* end move */


(function($) {
    if (!exports) var exports = window;
    var BARS = [212222,222122,222221,121223,121322,131222,122213,122312,132212,221213,221312,231212,112232,122132,122231,113222,123122,123221,223211,221132,221231,213212,223112,312131,311222,321122,321221,312212,322112,322211,212123,212321,232121,111323,131123,131321,112313,132113,132311,211313,231113,231311,112133,112331,132131,113123,113321,133121,313121,211331,231131,213113,213311,213131,311123,311321,331121,312113,312311,332111,314111,221411,431111,111224,111422,121124,121421,141122,141221,112214,112412,122114,122411,142112,142211,241211,221114,413111,241112,134111,111242,121142,121241,114212,124112,124211,411212,421112,421211,212141,214121,412121,111143,111341,131141,114113,114311,411113,411311,113141,114131,311141,411131,211412,211214,211232,23311120],
        START_BASE = 38,
        STOP       = 106, //BARS[STOP]==23311120 (manually added a zero at the end)
        HEIGHT = 150,
        RAINBOW = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];

    var animations = [];
    var max_animation_length = 0;
    var finished = false;

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

        this.stop = function(fn) {
            if (!this.finished) {
                window.setTimeout(function () {
                        var i = 0;

                        var finish = function () { 
                                if (i < animations.length-1) {
                                    var bar = animations[++i][1];

                                    move(bar).set("border-right", bar.css("margin-right")+" solid "+bar.css("border-left-color"))
                                        .set("margin-right", "0px").duration(5).then(finish).end();
                                } else {
                                    finished = true;
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

                var args = arguments;

                var onFinish = function () {
                    if (fn) {
                        fn.apply(null, Array.prototype.slice.call(args, 1));
                    }

                    finished = true;
                };

                window.setTimeout(onFinish, (max_animation_length / 1.5) + 1000);
            } 
        };

        this.restart = function(fn) {
            if (finished) {
                for (var i = 0, bars = [], opts = []; i < animations.length; i++) {
                    bars.push(animations[i][1]);
                    opts.push(animations[i][2]);

                    move(bars[i]).set("opacity", 0).duration(1000).end();
                }

                window.setTimeout(function() { 
                    for (var j = 0; j < bars.length; j++) {
                        bars[j].css("margin-right", bars[j].css("border-right-width")).css("border-right", ""); 
                    }
                }, 700);

                animations = [];

                for (var i = 0; i < bars.length; i++) {
                    opts[i].started = false;

                    barAnimate(bars[i], opts[i]);
                }

                var args = arguments;

                var onFinish = function () {
                    if (fn) {
                        fn.apply(null, Array.prototype.slice.call(args, 1));
                    }

                    finished = false;
                };

                window.setTimeout(onFinish, 1000);

                move($(".barsy")).set("background-color", "#FFF").ease("in").duration(300).end();
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