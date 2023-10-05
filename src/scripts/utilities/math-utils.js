/******************************************************************************\
|                                                                              |
|                                   math-utils.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a set of miscillaneous math utilities.                        |
|                                                                              |
|******************************************************************************|
|                Opticosm - Copyright (c) 2015, Abe Megahed                    |
\******************************************************************************/


var infinity = (Number.MAX_VALUE) * 2;

if (!Math.sign) {
	Math.sign = function sign(x) {
	    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
	}
}

if (!Math.clamp) {
	Math.clamp = function(number, min, max) {
	  return Math.max(min, Math.min(number, max));
	}
}