! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(Vue) : "function" == typeof define &&
        define.amd ? define("VuePopup", ["vue"], t) : "object" == typeof exports ? exports.VuePopup = t(Vue) : e.VuePopup =
        t(e.vue)
}(this, function (e) {
    return function (e) {
        function t(n) {
            if (o[n]) return o[n].exports;
            var i = o[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        var o = {};
        return t.m = e, t.c = o, t.i = function (e) {
            return e
        }, t.d = function (e, t, o) {
            Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: o
            })
        }, t.n = function (e) {
            var o = e && e.__esModule ? function () {
                    return e.
                    default
                } : function () {
                    return e
                };
            return t.d(o, "a", o), o
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "/lib/", t(t.s = 6)
    }([function (t, o) {
            t.exports = e
        }, function (e, t, o) {
            "use strict";
 
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.PopupManager = void 0;
            var i = o(0),
                l = n(i),
                s = o(4),
                d = o(3),
                r = n(d);
            o(5);
            var a = 1,
                u = [],
                c = function (e) {
                    if (u.indexOf(e) === -1) {
                        var t = function (e) {
                            var t = e.__vue__;
                            if (!t) {
                                var o = e.previousSibling;
                                o.__vue__ && (t = o.__vue__)
                            }
                            return t
                        };
                        l.
                        default.transition(e, {
                            afterEnter: function (e) {
                                var o = t(e);
                                o && o.doAfterOpen && o.doAfterOpen()
                            },
                            afterLeave: function (e) {
                                var o = t(e);
                                o && o.doAfterClose && o.doAfterClose()
                            }
                        })
                    }
                }, f = void 0,
                p = function () {
                    if (!l.
                    default.prototype.$isServer) {
                        if (void 0 !== f) return f;
                        var e = document.createElement("div");
                        e.style.visibility = "hidden", e.style.width = "100px", e.style.position = "absolute", e.style.top =
                            "-9999px", document.body.appendChild(e);
                        var t = e.offsetWidth;
                        e.style.overflow = "scroll";
                        var o = document.createElement("div");
                        o.style.width = "100%", e.appendChild(o);
                        var n = o.offsetWidth;
                        return e.parentNode.removeChild(e), t - n
                    }
                }, h = function e(t) {
                    return 3 === t.nodeType && (t = t.nextElementSibling || t.nextSibling, e(t)), t
                };
            t.
            default = {
                props: {
                    value: {
                        type: Boolean,
                        default: !1
                    },
                    transition: {
                        type: String,
                        default: ""
                    },
                    openDelay: {},
                    closeDelay: {},
                    zIndex: {},
                    modal: {
                        type: Boolean,
                        default: !1
                    },
                    modalFade: {
                        type: Boolean,
                        default: !0
                    },
                    modalClass: {},
                    lockScroll: {
                        type: Boolean,
                        default: !0
                    },
                    closeOnPressEscape: {
                        type: Boolean,
                        default: !1
                    },
                    closeOnClickModal: {
                        type: Boolean,
                        default: !1
                    }
                },
                created: function () {
                    this.transition && c(this.transition)
                },
                beforeMount: function () {
                    this._popupId = "popup-" + a++, r.
                    default.register(this._popupId, this)
                },
                beforeDestroy: function () {
                    r.
                    default.deregister(this._popupId), r.
                    default.closeModal(this._popupId), this.modal && null !== this.bodyOverflow && "hidden" !== this.bodyOverflow &&
                        (document.body.style.overflow = this.bodyOverflow, document.body.style.paddingRight = this.bodyPaddingRight),
                        this.bodyOverflow = null, this.bodyPaddingRight = null
                },
                data: function () {
                    return {
                        opened: !1,
                        bodyOverflow: null,
                        bodyPaddingRight: null,
                        rendered: !1
                    }
                },
                watch: {
                    value: function (e) {
                        var t = this;
                        if (e) {
                            if (this._opening) return;
                            this.rendered ? this.open() : (this.rendered = !0, l.
                            default.nextTick(function () {
                                t.open()
                            }))
                        } else this.close()
                    }
                },
                methods: {
                    open: function (e) {
                        var t = this;
                        this.rendered || (this.rendered = !0, this.$emit("input", !0));
                        var o = (0, s.merge)({}, this, e);
                        this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), clearTimeout(
                            this._openTimer);
                        var n = Number(o.openDelay);
                        n > 0 ? this._openTimer = setTimeout(function () {
                            t._openTimer = null, t.doOpen(o)
                        }, n) : this.doOpen(o)
                    },
                    doOpen: function (e) {
                        if (!this.$isServer && (!this.willOpen || this.willOpen()) && !this.opened) {
                            this._opening = !0, this.visible = !0, this.$emit("input", !0);
                            var t = h(this.$el),
                                o = e.modal,
                                n = e.zIndex;
                            if (n && (r.
                            default.zIndex = n), o && (this._closing && (r.
                            default.closeModal(this._popupId), this._closing = !1), r.
                            default.openModal(this._popupId, r.
                            default.nextZIndex(), t, e.modalClass, e.modalFade), e.lockScroll)) {
                                this.bodyOverflow || (this.bodyPaddingRight = document.body.style.paddingRight, this.bodyOverflow =
                                    document.body.style.overflow), f = p();
                                var i = document.documentElement.clientHeight < document.body.scrollHeight;
                                f > 0 && i && (document.body.style.paddingRight = f + "px"), document.body.style.overflow =
                                    "hidden"
                            }
                            "static" === getComputedStyle(t).position && (t.style.position = "absolute"), t.style.zIndex =
                                r.
                            default.nextZIndex(), this.opened = !0, this.onOpen && this.onOpen(), this.transition ||
                                this.doAfterOpen()
                        }
                    },
                    doAfterOpen: function () {
                        this._opening = !1
                    },
                    close: function () {
                        var e = this;
                        if (!this.willClose || this.willClose()) {
                            null !== this._openTimer && (clearTimeout(this._openTimer), this._openTimer = null),
                                clearTimeout(this._closeTimer);
                            var t = Number(this.closeDelay);
                            t > 0 ? this._closeTimer = setTimeout(function () {
                                e._closeTimer = null, e.doClose()
                            }, t) : this.doClose()
                        }
                    },
                    doClose: function () {
                        var e = this;
                        this.visible = !1, this.$emit("input", !1), this._closing = !0, this.onClose && this.onClose(),
                            this.lockScroll && setTimeout(function () {
                            e.modal && "hidden" !== e.bodyOverflow && (document.body.style.overflow = e.bodyOverflow,
                                document.body.style.paddingRight = e.bodyPaddingRight), e.bodyOverflow = null, e.bodyPaddingRight =
                                null
                        }, 200), this.opened = !1, this.transition || this.doAfterClose()
                    },
                    doAfterClose: function () {
                        r.
                        default.closeModal(this._popupId), this._closing = !1
                    }
                }
            }, t.PopupManager = r.
            default
        }, function (e, t) {
            var o = function (e) {
                return (e || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
            }, n = function (e, t) {
                    if (!e || !t) return !1;
                    if (t.indexOf(" ") != -1) throw new Error("className should not contain space.");
                    return e.classList ? e.classList.contains(t) : (" " + e.className + " ").indexOf(" " + t + " ") > -
                        1
                }, i = function (e, t) {
                    if (e) {
                        for (var o = e.className, i = (t || "").split(" "), l = 0, s = i.length; l < s; l++) {
                            var d = i[l];
                            d && (e.classList ? e.classList.add(d) : n(e, d) || (o += " " + d))
                        }
                        e.classList || (e.className = o)
                    }
                }, l = function (e, t) {
                    if (e && t) {
                        for (var i = t.split(" "), l = " " + e.className + " ", s = 0, d = i.length; s < d; s++) {
                            var r = i[s];
                            r && (e.classList ? e.classList.remove(r) : n(e, r) && (l = l.replace(" " + r + " ", " ")))
                        }
                        e.classList || (e.className = o(l))
                    }
                };
            e.exports = {
                hasClass: n,
                addClass: i,
                removeClass: l
            }
        }, function (e, t, o) {
            "use strict";
 
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0;
            var i = o(0),
                l = n(i),
                s = o(2),
                d = !1,
                r = function () {
                    if (!l.
                    default.prototype.$isServer) {
                        var e = u.modalDom;
                        return e ? d = !0 : (d = !1, e = document.createElement("div"), u.modalDom = e, e.addEventListener(
                            "touchmove", function (e) {
                            e.preventDefault(), e.stopPropagation()
                        }), e.addEventListener("click", function () {
                            u.doOnModalClick && u.doOnModalClick()
                        })), e
                    }
                }, a = {}, u = {
                    zIndex: 2e3,
                    modalFade: !0,
                    getInstance: function (e) {
                        return a[e]
                    },
                    register: function (e, t) {
                        e && t && (a[e] = t)
                    },
                    deregister: function (e) {
                        e && (a[e] = null, delete a[e])
                    },
                    nextZIndex: function () {
                        return u.zIndex++
                    },
                    modalStack: [],
                    doOnModalClick: function () {
                        var e = u.modalStack[u.modalStack.length - 1];
                        if (e) {
                            var t = u.getInstance(e.id);
                            t && t.closeOnClickModal && t.close()
                        }
                    },
                    openModal: function (e, t, o, n, i) {
                        if (!l.
                        default.prototype.$isServer && e && void 0 !== t) {
                            this.modalFade = i;
                            for (var a = this.modalStack, u = 0, c = a.length; u < c; u++) {
                                var f = a[u];
                                if (f.id === e) return
                            }
                            var p = r();
                            if ((0, s.addClass)(p, "v-modal"), this.modalFade && !d && (0, s.addClass)(p,
                                "v-modal-enter"), n) {
                                var h = n.trim().split(/\s+/);
                                h.forEach(function (e) {
                                    return (0, s.addClass)(p, e)
                                })
                            }
                            setTimeout(function () {
                                (0, s.removeClass)(p, "v-modal-enter")
                            }, 200), o && o.parentNode && 11 !== o.parentNode.nodeType ? o.parentNode.appendChild(p) :
                                document.body.appendChild(p), t && (p.style.zIndex = t), p.style.display = "", this.modalStack
                                .push({
                                id: e,
                                zIndex: t,
                                modalClass: n
                            })
                        }
                    },
                    closeModal: function (e) {
                        var t = this.modalStack,
                            o = r();
                        if (t.length > 0) {
                            var n = t[t.length - 1];
                            if (n.id === e) {
                                if (n.modalClass) {
                                    var i = n.modalClass.trim().split(/\s+/);
                                    i.forEach(function (e) {
                                        return (0, s.removeClass)(o, e)
                                    })
                                }
                                t.pop(), t.length > 0 && (o.style.zIndex = t[t.length - 1].zIndex)
                            } else for (var l = t.length - 1; l >= 0; l--) if (t[l].id === e) {
                                        t.splice(l, 1);
                                        break
                                    }
                        }
                        0 === t.length && (this.modalFade && (0, s.addClass)(o, "v-modal-leave"), setTimeout(function () {
                            0 === t.length && (o.parentNode && o.parentNode.removeChild(o), o.style.display = "none", u
                                .modalDom = void 0), (0, s.removeClass)(o, "v-modal-leave")
                        }, 200))
                    }
                };
            !l.
            default.prototype.$isServer && window.addEventListener("keydown", function (e) {
                if (27 === e.keyCode && u.modalStack.length > 0) {
                    var t = u.modalStack[u.modalStack.length - 1];
                    if (!t) return;
                    var o = u.getInstance(t.id);
                    o.closeOnPressEscape && o.close()
                }
            }), t.
            default = u
        }, function (e, t) {
            "use strict";
 
            function o(e) {
                for (var t = 1, o = arguments.length; t < o; t++) {
                    var n = arguments[t];
                    for (var i in n) if (n.hasOwnProperty(i)) {
                            var l = n[i];
                            void 0 !== l && (e[i] = l)
                        }
                }
                return e
            }
            t.__esModule = !0, t.merge = o
        }, function (e, t) {}, function (e, t, o) {
            e.exports = o(1)
        }])
});
