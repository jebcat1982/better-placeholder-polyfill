/**
 * @file src/better-placeholder-polyfill.js
 * @version 1.1.0-rc.3 2013-11-24T18:11:42
 * @overview [placeholder] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-placeholder-polyfill
 */
(function(DOM) {
    "use strict";

    if (typeof DOM.create("input").get("placeholder") === "string") return;

    var PLACEHOLDER_KEY = "input-placeholder";

    DOM.extend("[placeholder]", {
        constructor: function() {
            var placeholder = DOM.create("input[tabindex=-1 value='${v}' style='${css}']", {v: this.get("placeholder"), css: "box-sizing: border-box; position: absolute; color: graytext; background: none no-repeat 0 0; border-color: transparent"});

            this
                .on({focus: this.onFocus, blur: this.onBlur})
                .data(PLACEHOLDER_KEY, placeholder)
                .before(placeholder);

            placeholder
                .style("width", this.width())
                .on("click", this, this.onPlaceholderClick);

            if (this.get() || this.matches(":focus")) placeholder.hide();
        },
        onFocus: function() {
            this.data(PLACEHOLDER_KEY).hide();
        },
        onBlur: function() {
            if (!this.get()) this.data(PLACEHOLDER_KEY).show();
        },
        onPlaceholderClick: function() {
            this.fire("focus");
        }
    });
}(window.DOM));
