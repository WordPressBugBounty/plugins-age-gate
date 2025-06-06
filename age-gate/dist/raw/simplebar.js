(() => {
    "use strict";
    const lodash_es_isObject = function(value) {
        var type = typeof value;
        return null != value && ("object" == type || "function" == type);
    };
    const _freeGlobal = "object" == typeof global && global && global.Object === Object && global;
    var freeSelf = "object" == typeof self && self && self.Object === Object && self;
    const _root = _freeGlobal || freeSelf || Function("return this")();
    const lodash_es_now = function() {
        return _root.Date.now();
    };
    var reWhitespace = /\s/;
    const _trimmedEndIndex = function(string) {
        for (var index = string.length; index-- && reWhitespace.test(string.charAt(index)); ) ;
        return index;
    };
    var reTrimStart = /^\s+/;
    const _baseTrim = function(string) {
        return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    };
    const _Symbol = _root.Symbol;
    var objectProto = Object.prototype, _getRawTag_hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    const _getRawTag = function(value) {
        var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = void 0;
            var unmasked = !0;
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
        result;
    };
    var _objectToString_nativeObjectToString = Object.prototype.toString;
    const _objectToString = function(value) {
        return _objectToString_nativeObjectToString.call(value);
    };
    var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    const _baseGetTag = function(value) {
        return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
    };
    const lodash_es_isObjectLike = function(value) {
        return null != value && "object" == typeof value;
    };
    const lodash_es_isSymbol = function(value) {
        return "symbol" == typeof value || lodash_es_isObjectLike(value) && "[object Symbol]" == _baseGetTag(value);
    };
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
    const lodash_es_toNumber = function(value) {
        if ("number" == typeof value) return value;
        if (lodash_es_isSymbol(value)) return NaN;
        if (lodash_es_isObject(value)) {
            var other = "function" == typeof value.valueOf ? value.valueOf() : value;
            value = lodash_es_isObject(other) ? other + "" : other;
        }
        if ("string" != typeof value) return 0 === value ? value : +value;
        value = _baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
    };
    var nativeMax = Math.max, nativeMin = Math.min;
    const lodash_es_debounce = function(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
        if ("function" != typeof func) throw new TypeError("Expected a function");
        function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            return lastArgs = lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args);
        }
        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime;
            return void 0 === lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && time - lastInvokeTime >= maxWait;
        }
        function timerExpired() {
            var time = lodash_es_now();
            if (shouldInvoke(time)) return trailingEdge(time);
            timerId = setTimeout(timerExpired, function(time) {
                var timeWaiting = wait - (time - lastCallTime);
                return maxing ? nativeMin(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting;
            }(time));
        }
        function trailingEdge(time) {
            return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, 
            result);
        }
        function debounced() {
            var time = lodash_es_now(), isInvoking = shouldInvoke(time);
            if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
                if (void 0 === timerId) return function(time) {
                    return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result;
                }(lastCallTime);
                if (maxing) return clearTimeout(timerId), timerId = setTimeout(timerExpired, wait), 
                invokeFunc(lastCallTime);
            }
            return void 0 === timerId && (timerId = setTimeout(timerExpired, wait)), result;
        }
        return wait = lodash_es_toNumber(wait) || 0, lodash_es_isObject(options) && (leading = !!options.leading, 
        maxWait = (maxing = "maxWait" in options) ? nativeMax(lodash_es_toNumber(options.maxWait) || 0, wait) : maxWait, 
        trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = function() {
            void 0 !== timerId && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
        }, debounced.flush = function() {
            return void 0 === timerId ? result : trailingEdge(lodash_es_now());
        }, debounced;
    };
    const lodash_es_throttle = function(func, wait, options) {
        var leading = !0, trailing = !0;
        if ("function" != typeof func) throw new TypeError("Expected a function");
        return lodash_es_isObject(options) && (leading = "leading" in options ? !!options.leading : leading, 
        trailing = "trailing" in options ? !!options.trailing : trailing), lodash_es_debounce(func, wait, {
            leading,
            maxWait: wait,
            trailing
        });
    };
    var __assign = function() {
        return __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
            return t;
        }, __assign.apply(this, arguments);
    };
    function getElementWindow$1(element) {
        return element && element.ownerDocument && element.ownerDocument.defaultView ? element.ownerDocument.defaultView : window;
    }
    function getElementDocument$1(element) {
        return element && element.ownerDocument ? element.ownerDocument : document;
    }
    var getOptions$1 = function(obj) {
        return Array.prototype.reduce.call(obj, (function(acc, attribute) {
            var option = attribute.name.match(/data-simplebar-(.+)/);
            if (option) {
                var key = option[1].replace(/\W+(.)/g, (function(_, chr) {
                    return chr.toUpperCase();
                }));
                switch (attribute.value) {
                  case "true":
                    acc[key] = !0;
                    break;

                  case "false":
                    acc[key] = !1;
                    break;

                  case void 0:
                    acc[key] = !0;
                    break;

                  default:
                    acc[key] = attribute.value;
                }
            }
            return acc;
        }), {});
    };
    function addClasses$1(el, classes) {
        var _a;
        el && (_a = el.classList).add.apply(_a, classes.split(" "));
    }
    function removeClasses$1(el, classes) {
        el && classes.split(" ").forEach((function(className) {
            el.classList.remove(className);
        }));
    }
    function classNamesToQuery$1(classNames) {
        return ".".concat(classNames.split(" ").join("."));
    }
    var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), helpers = Object.freeze({
        __proto__: null,
        addClasses: addClasses$1,
        canUseDOM,
        classNamesToQuery: classNamesToQuery$1,
        getElementDocument: getElementDocument$1,
        getElementWindow: getElementWindow$1,
        getOptions: getOptions$1,
        removeClasses: removeClasses$1
    }), cachedScrollbarWidth = null, cachedDevicePixelRatio = null;
    function scrollbarWidth() {
        if (null === cachedScrollbarWidth) {
            if ("undefined" == typeof document) return cachedScrollbarWidth = 0;
            var body = document.body, box = document.createElement("div");
            box.classList.add("simplebar-hide-scrollbar"), body.appendChild(box);
            var width = box.getBoundingClientRect().right;
            body.removeChild(box), cachedScrollbarWidth = width;
        }
        return cachedScrollbarWidth;
    }
    canUseDOM && window.addEventListener("resize", (function() {
        cachedDevicePixelRatio !== window.devicePixelRatio && (cachedDevicePixelRatio = window.devicePixelRatio, 
        cachedScrollbarWidth = null);
    }));
    var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1, SimpleBarCore = function() {
        function SimpleBarCore(element, options) {
            void 0 === options && (options = {});
            var _this = this;
            if (this.removePreventClickId = null, this.minScrollbarWidth = 20, this.stopScrollDelay = 175, 
            this.isScrolling = !1, this.isMouseEntering = !1, this.isDragging = !1, this.scrollXTicking = !1, 
            this.scrollYTicking = !1, this.wrapperEl = null, this.contentWrapperEl = null, this.contentEl = null, 
            this.offsetEl = null, this.maskEl = null, this.placeholderEl = null, this.heightAutoObserverWrapperEl = null, 
            this.heightAutoObserverEl = null, this.rtlHelpers = null, this.scrollbarWidth = 0, 
            this.resizeObserver = null, this.mutationObserver = null, this.elStyles = null, 
            this.isRtl = null, this.mouseX = 0, this.mouseY = 0, this.onMouseMove = function() {}, 
            this.onWindowResize = function() {}, this.onStopScrolling = function() {}, this.onMouseEntered = function() {}, 
            this.onScroll = function() {
                var elWindow = getElementWindow(_this.el);
                _this.scrollXTicking || (elWindow.requestAnimationFrame(_this.scrollX), _this.scrollXTicking = !0), 
                _this.scrollYTicking || (elWindow.requestAnimationFrame(_this.scrollY), _this.scrollYTicking = !0), 
                _this.isScrolling || (_this.isScrolling = !0, addClasses(_this.el, _this.classNames.scrolling)), 
                _this.showScrollbar("x"), _this.showScrollbar("y"), _this.onStopScrolling();
            }, this.scrollX = function() {
                _this.axis.x.isOverflowing && _this.positionScrollbar("x"), _this.scrollXTicking = !1;
            }, this.scrollY = function() {
                _this.axis.y.isOverflowing && _this.positionScrollbar("y"), _this.scrollYTicking = !1;
            }, this._onStopScrolling = function() {
                removeClasses(_this.el, _this.classNames.scrolling), _this.options.autoHide && (_this.hideScrollbar("x"), 
                _this.hideScrollbar("y")), _this.isScrolling = !1;
            }, this.onMouseEnter = function() {
                _this.isMouseEntering || (addClasses(_this.el, _this.classNames.mouseEntered), _this.showScrollbar("x"), 
                _this.showScrollbar("y"), _this.isMouseEntering = !0), _this.onMouseEntered();
            }, this._onMouseEntered = function() {
                removeClasses(_this.el, _this.classNames.mouseEntered), _this.options.autoHide && (_this.hideScrollbar("x"), 
                _this.hideScrollbar("y")), _this.isMouseEntering = !1;
            }, this._onMouseMove = function(e) {
                _this.mouseX = e.clientX, _this.mouseY = e.clientY, (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) && _this.onMouseMoveForAxis("x"), 
                (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) && _this.onMouseMoveForAxis("y");
            }, this.onMouseLeave = function() {
                _this.onMouseMove.cancel(), (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) && _this.onMouseLeaveForAxis("x"), 
                (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) && _this.onMouseLeaveForAxis("y"), 
                _this.mouseX = -1, _this.mouseY = -1;
            }, this._onWindowResize = function() {
                _this.scrollbarWidth = _this.getScrollbarWidth(), _this.hideNativeScrollbar();
            }, this.onPointerEvent = function(e) {
                var isWithinTrackXBounds, isWithinTrackYBounds;
                _this.axis.x.track.el && _this.axis.y.track.el && _this.axis.x.scrollbar.el && _this.axis.y.scrollbar.el && (_this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect(), 
                _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect(), (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) && (isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect)), 
                (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) && (isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect)), 
                (isWithinTrackXBounds || isWithinTrackYBounds) && (e.stopPropagation(), "pointerdown" === e.type && "touch" !== e.pointerType && (isWithinTrackXBounds && (_this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect(), 
                _this.isWithinBounds(_this.axis.x.scrollbar.rect) ? _this.onDragStart(e, "x") : _this.onTrackClick(e, "x")), 
                isWithinTrackYBounds && (_this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect(), 
                _this.isWithinBounds(_this.axis.y.scrollbar.rect) ? _this.onDragStart(e, "y") : _this.onTrackClick(e, "y")))));
            }, this.drag = function(e) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                if (_this.draggedAxis && _this.contentWrapperEl) {
                    var track = _this.axis[_this.draggedAxis].track, trackSize = null !== (_b = null === (_a = track.rect) || void 0 === _a ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) && void 0 !== _b ? _b : 0, scrollbar = _this.axis[_this.draggedAxis].scrollbar, contentSize = null !== (_d = null === (_c = _this.contentWrapperEl) || void 0 === _c ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) && void 0 !== _d ? _d : 0, hostSize = parseInt(null !== (_f = null === (_e = _this.elStyles) || void 0 === _e ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) && void 0 !== _f ? _f : "0px", 10);
                    e.preventDefault(), e.stopPropagation();
                    var dragPos = ("y" === _this.draggedAxis ? e.pageY : e.pageX) - (null !== (_h = null === (_g = track.rect) || void 0 === _g ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) && void 0 !== _h ? _h : 0) - _this.axis[_this.draggedAxis].dragOffset, scrollPos = (dragPos = "x" === _this.draggedAxis && _this.isRtl ? (null !== (_k = null === (_j = track.rect) || void 0 === _j ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) && void 0 !== _k ? _k : 0) - scrollbar.size - dragPos : dragPos) / (trackSize - scrollbar.size) * (contentSize - hostSize);
                    "x" === _this.draggedAxis && _this.isRtl && (scrollPos = (null === (_l = SimpleBarCore.getRtlHelpers()) || void 0 === _l ? void 0 : _l.isScrollingToNegative) ? -scrollPos : scrollPos), 
                    _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
                }
            }, this.onEndDrag = function(e) {
                _this.isDragging = !1;
                var elDocument = getElementDocument(_this.el), elWindow = getElementWindow(_this.el);
                e.preventDefault(), e.stopPropagation(), removeClasses(_this.el, _this.classNames.dragging), 
                _this.onStopScrolling(), elDocument.removeEventListener("mousemove", _this.drag, !0), 
                elDocument.removeEventListener("mouseup", _this.onEndDrag, !0), _this.removePreventClickId = elWindow.setTimeout((function() {
                    elDocument.removeEventListener("click", _this.preventClick, !0), elDocument.removeEventListener("dblclick", _this.preventClick, !0), 
                    _this.removePreventClickId = null;
                }));
            }, this.preventClick = function(e) {
                e.preventDefault(), e.stopPropagation();
            }, this.el = element, this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options), 
            this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames), 
            this.axis = {
                x: {
                    scrollOffsetAttr: "scrollLeft",
                    sizeAttr: "width",
                    scrollSizeAttr: "scrollWidth",
                    offsetSizeAttr: "offsetWidth",
                    offsetAttr: "left",
                    overflowAttr: "overflowX",
                    dragOffset: 0,
                    isOverflowing: !0,
                    forceVisible: !1,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: !1
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: !1
                    }
                },
                y: {
                    scrollOffsetAttr: "scrollTop",
                    sizeAttr: "height",
                    scrollSizeAttr: "scrollHeight",
                    offsetSizeAttr: "offsetHeight",
                    offsetAttr: "top",
                    overflowAttr: "overflowY",
                    dragOffset: 0,
                    isOverflowing: !0,
                    forceVisible: !1,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: !1
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: !1
                    }
                }
            }, "object" != typeof this.el || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
            this.onMouseMove = lodash_es_throttle(this._onMouseMove, 64), this.onWindowResize = lodash_es_debounce(this._onWindowResize, 64, {
                leading: !0
            }), this.onStopScrolling = lodash_es_debounce(this._onStopScrolling, this.stopScrollDelay), 
            this.onMouseEntered = lodash_es_debounce(this._onMouseEntered, this.stopScrollDelay), 
            this.init();
        }
        return SimpleBarCore.getRtlHelpers = function() {
            if (SimpleBarCore.rtlHelpers) return SimpleBarCore.rtlHelpers;
            var dummyDiv = document.createElement("div");
            dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
            var scrollbarDummyEl = dummyDiv.firstElementChild, dummyChild = null == scrollbarDummyEl ? void 0 : scrollbarDummyEl.firstElementChild;
            if (!dummyChild) return null;
            document.body.appendChild(scrollbarDummyEl), scrollbarDummyEl.scrollLeft = 0;
            var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl), dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
            scrollbarDummyEl.scrollLeft = -999;
            var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
            return document.body.removeChild(scrollbarDummyEl), SimpleBarCore.rtlHelpers = {
                isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
                isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
            }, SimpleBarCore.rtlHelpers;
        }, SimpleBarCore.prototype.getScrollbarWidth = function() {
            try {
                return this.contentWrapperEl && "none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : scrollbarWidth();
            } catch (e) {
                return scrollbarWidth();
            }
        }, SimpleBarCore.getOffset = function(el) {
            var rect = el.getBoundingClientRect(), elDocument = getElementDocument(el), elWindow = getElementWindow(el);
            return {
                top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
                left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
            };
        }, SimpleBarCore.prototype.init = function() {
            canUseDOM && (this.initDOM(), this.rtlHelpers = SimpleBarCore.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), 
            this.recalculate(), this.initListeners());
        }, SimpleBarCore.prototype.initDOM = function() {
            var _a, _b;
            this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper)), 
            this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper)), 
            this.contentEl = this.options.contentNode || this.el.querySelector(classNamesToQuery(this.classNames.contentEl)), 
            this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset)), 
            this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder)), 
            this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl)), 
            this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl)), 
            this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal))), 
            this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical))), 
            this.axis.x.scrollbar.el = (null === (_a = this.axis.x.track.el) || void 0 === _a ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null, 
            this.axis.y.scrollbar.el = (null === (_b = this.axis.y.track.el) || void 0 === _b ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null, 
            this.options.autoHide || (addClasses(this.axis.x.scrollbar.el, this.classNames.visible), 
            addClasses(this.axis.y.scrollbar.el, this.classNames.visible));
        }, SimpleBarCore.prototype.initListeners = function() {
            var _a, _this = this, elWindow = getElementWindow(this.el);
            if (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("pointerdown", this.onPointerEvent, !0), 
            this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), 
            null === (_a = this.contentWrapperEl) || void 0 === _a || _a.addEventListener("scroll", this.onScroll), 
            elWindow.addEventListener("resize", this.onWindowResize), this.contentEl) {
                if (window.ResizeObserver) {
                    var resizeObserverStarted_1 = !1, resizeObserver = elWindow.ResizeObserver || ResizeObserver;
                    this.resizeObserver = new resizeObserver((function() {
                        resizeObserverStarted_1 && elWindow.requestAnimationFrame((function() {
                            _this.recalculate();
                        }));
                    })), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), 
                    elWindow.requestAnimationFrame((function() {
                        resizeObserverStarted_1 = !0;
                    }));
                }
                this.mutationObserver = new elWindow.MutationObserver((function() {
                    elWindow.requestAnimationFrame((function() {
                        _this.recalculate();
                    }));
                })), this.mutationObserver.observe(this.contentEl, {
                    childList: !0,
                    subtree: !0,
                    characterData: !0
                });
            }
        }, SimpleBarCore.prototype.recalculate = function() {
            if (this.heightAutoObserverEl && this.contentEl && this.contentWrapperEl && this.wrapperEl && this.placeholderEl) {
                var elWindow = getElementWindow(this.el);
                this.elStyles = elWindow.getComputedStyle(this.el), this.isRtl = "rtl" === this.elStyles.direction;
                var contentElOffsetWidth = this.contentEl.offsetWidth, isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1, isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0, contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth, elOverflowX = this.elStyles.overflowX, elOverflowY = this.elStyles.overflowY;
                this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), 
                this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
                var contentElScrollHeight = this.contentEl.scrollHeight, contentElScrollWidth = this.contentEl.scrollWidth;
                this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%", this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : "auto", 
                this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
                var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
                this.axis.x.isOverflowing = 0 !== contentElOffsetWidth && contentElScrollWidth > contentElOffsetWidth, 
                this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight, 
                this.axis.x.isOverflowing = "hidden" !== elOverflowX && this.axis.x.isOverflowing, 
                this.axis.y.isOverflowing = "hidden" !== elOverflowY && this.axis.y.isOverflowing, 
                this.axis.x.forceVisible = "x" === this.options.forceVisible || !0 === this.options.forceVisible, 
                this.axis.y.forceVisible = "y" === this.options.forceVisible || !0 === this.options.forceVisible, 
                this.hideNativeScrollbar();
                var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
                this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar, 
                this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar, 
                this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), 
                this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), 
                this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), 
                this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), 
                this.toggleTrackVisibility("y");
            }
        }, SimpleBarCore.prototype.getScrollbarSize = function(axis) {
            var _a, _b;
            if (void 0 === axis && (axis = "y"), !this.axis[axis].isOverflowing || !this.contentEl) return 0;
            var scrollbarSize, contentSize = this.contentEl[this.axis[axis].scrollSizeAttr], trackSize = null !== (_b = null === (_a = this.axis[axis].track.el) || void 0 === _a ? void 0 : _a[this.axis[axis].offsetSizeAttr]) && void 0 !== _b ? _b : 0, scrollbarRatio = trackSize / contentSize;
            return scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize), 
            this.options.scrollbarMaxSize && (scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize)), 
            scrollbarSize;
        }, SimpleBarCore.prototype.positionScrollbar = function(axis) {
            var _a, _b, _c;
            void 0 === axis && (axis = "y");
            var scrollbar = this.axis[axis].scrollbar;
            if (this.axis[axis].isOverflowing && this.contentWrapperEl && scrollbar.el && this.elStyles) {
                var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr], trackSize = (null === (_a = this.axis[axis].track.el) || void 0 === _a ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0, hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10), scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
                scrollOffset = "x" === axis && this.isRtl && (null === (_b = SimpleBarCore.getRtlHelpers()) || void 0 === _b ? void 0 : _b.isScrollOriginAtZero) ? -scrollOffset : scrollOffset, 
                "x" === axis && this.isRtl && (scrollOffset = (null === (_c = SimpleBarCore.getRtlHelpers()) || void 0 === _c ? void 0 : _c.isScrollingToNegative) ? scrollOffset : -scrollOffset);
                var scrollPourcent = scrollOffset / (contentSize - hostSize), handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
                handleOffset = "x" === axis && this.isRtl ? -handleOffset + (trackSize - scrollbar.size) : handleOffset, 
                scrollbar.el.style.transform = "x" === axis ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
            }
        }, SimpleBarCore.prototype.toggleTrackVisibility = function(axis) {
            void 0 === axis && (axis = "y");
            var track = this.axis[axis].track.el, scrollbar = this.axis[axis].scrollbar.el;
            track && scrollbar && this.contentWrapperEl && (this.axis[axis].isOverflowing || this.axis[axis].forceVisible ? (track.style.visibility = "visible", 
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis))) : (track.style.visibility = "hidden", 
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis))), 
            this.axis[axis].isOverflowing ? scrollbar.style.display = "block" : scrollbar.style.display = "none");
        }, SimpleBarCore.prototype.showScrollbar = function(axis) {
            void 0 === axis && (axis = "y"), this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible && (addClasses(this.axis[axis].scrollbar.el, this.classNames.visible), 
            this.axis[axis].scrollbar.isVisible = !0);
        }, SimpleBarCore.prototype.hideScrollbar = function(axis) {
            void 0 === axis && (axis = "y"), this.isDragging || this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible && (removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible), 
            this.axis[axis].scrollbar.isVisible = !1);
        }, SimpleBarCore.prototype.hideNativeScrollbar = function() {
            this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", 
            this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
        }, SimpleBarCore.prototype.onMouseMoveForAxis = function(axis) {
            void 0 === axis && (axis = "y");
            var currentAxis = this.axis[axis];
            currentAxis.track.el && currentAxis.scrollbar.el && (currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect(), 
            currentAxis.scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(currentAxis.track.rect) ? (this.showScrollbar(axis), 
            addClasses(currentAxis.track.el, this.classNames.hover), this.isWithinBounds(currentAxis.scrollbar.rect) ? addClasses(currentAxis.scrollbar.el, this.classNames.hover) : removeClasses(currentAxis.scrollbar.el, this.classNames.hover)) : (removeClasses(currentAxis.track.el, this.classNames.hover), 
            this.options.autoHide && this.hideScrollbar(axis)));
        }, SimpleBarCore.prototype.onMouseLeaveForAxis = function(axis) {
            void 0 === axis && (axis = "y"), removeClasses(this.axis[axis].track.el, this.classNames.hover), 
            removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(axis);
        }, SimpleBarCore.prototype.onDragStart = function(e, axis) {
            var _a;
            void 0 === axis && (axis = "y"), this.isDragging = !0;
            var elDocument = getElementDocument(this.el), elWindow = getElementWindow(this.el), scrollbar = this.axis[axis].scrollbar, eventOffset = "y" === axis ? e.pageY : e.pageX;
            this.axis[axis].dragOffset = eventOffset - ((null === (_a = scrollbar.rect) || void 0 === _a ? void 0 : _a[this.axis[axis].offsetAttr]) || 0), 
            this.draggedAxis = axis, addClasses(this.el, this.classNames.dragging), elDocument.addEventListener("mousemove", this.drag, !0), 
            elDocument.addEventListener("mouseup", this.onEndDrag, !0), null === this.removePreventClickId ? (elDocument.addEventListener("click", this.preventClick, !0), 
            elDocument.addEventListener("dblclick", this.preventClick, !0)) : (elWindow.clearTimeout(this.removePreventClickId), 
            this.removePreventClickId = null);
        }, SimpleBarCore.prototype.onTrackClick = function(e, axis) {
            var _a, _b, _c, _d, _this = this;
            void 0 === axis && (axis = "y");
            var currentAxis = this.axis[axis];
            if (this.options.clickOnTrack && currentAxis.scrollbar.el && this.contentWrapperEl) {
                e.preventDefault();
                var elWindow = getElementWindow(this.el);
                this.axis[axis].scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
                var scrollbarOffset = null !== (_b = null === (_a = this.axis[axis].scrollbar.rect) || void 0 === _a ? void 0 : _a[this.axis[axis].offsetAttr]) && void 0 !== _b ? _b : 0, hostSize = parseInt(null !== (_d = null === (_c = this.elStyles) || void 0 === _c ? void 0 : _c[this.axis[axis].sizeAttr]) && void 0 !== _d ? _d : "0px", 10), scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr], dir = ("y" === axis ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset) < 0 ? -1 : 1, scrollSize = -1 === dir ? scrolled - hostSize : scrolled + hostSize, scrollTo = function() {
                    _this.contentWrapperEl && (-1 === dir ? scrolled > scrollSize && (scrolled -= 40, 
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled, elWindow.requestAnimationFrame(scrollTo)) : scrolled < scrollSize && (scrolled += 40, 
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled, elWindow.requestAnimationFrame(scrollTo)));
                };
                scrollTo();
            }
        }, SimpleBarCore.prototype.getContentElement = function() {
            return this.contentEl;
        }, SimpleBarCore.prototype.getScrollElement = function() {
            return this.contentWrapperEl;
        }, SimpleBarCore.prototype.removeListeners = function() {
            var elWindow = getElementWindow(this.el);
            this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("pointerdown", this.onPointerEvent, !0), 
            this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), 
            this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), 
            elWindow.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), 
            this.resizeObserver && this.resizeObserver.disconnect(), this.onMouseMove.cancel(), 
            this.onWindowResize.cancel(), this.onStopScrolling.cancel(), this.onMouseEntered.cancel();
        }, SimpleBarCore.prototype.unMount = function() {
            this.removeListeners();
        }, SimpleBarCore.prototype.isWithinBounds = function(bbox) {
            return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
        }, SimpleBarCore.prototype.findChild = function(el, query) {
            var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
            return Array.prototype.filter.call(el.children, (function(child) {
                return matches.call(child, query);
            }))[0];
        }, SimpleBarCore.rtlHelpers = null, SimpleBarCore.defaultOptions = {
            forceVisible: !1,
            clickOnTrack: !0,
            scrollbarMinSize: 25,
            scrollbarMaxSize: 0,
            ariaLabel: "scrollable content",
            tabIndex: 0,
            classNames: {
                contentEl: "simplebar-content",
                contentWrapper: "simplebar-content-wrapper",
                offset: "simplebar-offset",
                mask: "simplebar-mask",
                wrapper: "simplebar-wrapper",
                placeholder: "simplebar-placeholder",
                scrollbar: "simplebar-scrollbar",
                track: "simplebar-track",
                heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                heightAutoObserverEl: "simplebar-height-auto-observer",
                visible: "simplebar-visible",
                horizontal: "simplebar-horizontal",
                vertical: "simplebar-vertical",
                hover: "simplebar-hover",
                dragging: "simplebar-dragging",
                scrolling: "simplebar-scrolling",
                scrollable: "simplebar-scrollable",
                mouseEntered: "simplebar-mouse-entered"
            },
            scrollableNode: null,
            contentNode: null,
            autoHide: !0
        }, SimpleBarCore.getOptions = getOptions, SimpleBarCore.helpers = helpers, SimpleBarCore;
    }(), extendStatics = function(d, b) {
        return extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        }, extendStatics(d, b);
    };
    var _a = SimpleBarCore.helpers, dist_getOptions = _a.getOptions, dist_addClasses = _a.addClasses, dist_canUseDOM = _a.canUseDOM, SimpleBar = function(_super) {
        function SimpleBar() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var _this = _super.apply(this, args) || this;
            return SimpleBar.instances.set(args[0], _this), _this;
        }
        return function(d, b) {
            if ("function" != typeof b && null !== b) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            function __() {
                this.constructor = d;
            }
            extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
            new __);
        }(SimpleBar, _super), SimpleBar.initDOMLoadedElements = function() {
            document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.removeEventListener("load", this.initDOMLoadedElements), 
            Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(el) {
                "init" === el.getAttribute("data-simplebar") || SimpleBar.instances.has(el) || new SimpleBar(el, dist_getOptions(el.attributes));
            }));
        }, SimpleBar.removeObserver = function() {
            var _a;
            null === (_a = SimpleBar.globalObserver) || void 0 === _a || _a.disconnect();
        }, SimpleBar.prototype.initDOM = function() {
            var _a, _b, _c, _this = this;
            if (!Array.prototype.filter.call(this.el.children, (function(child) {
                return child.classList.contains(_this.classNames.wrapper);
            })).length) {
                for (this.wrapperEl = document.createElement("div"), this.contentWrapperEl = document.createElement("div"), 
                this.offsetEl = document.createElement("div"), this.maskEl = document.createElement("div"), 
                this.contentEl = document.createElement("div"), this.placeholderEl = document.createElement("div"), 
                this.heightAutoObserverWrapperEl = document.createElement("div"), this.heightAutoObserverEl = document.createElement("div"), 
                dist_addClasses(this.wrapperEl, this.classNames.wrapper), dist_addClasses(this.contentWrapperEl, this.classNames.contentWrapper), 
                dist_addClasses(this.offsetEl, this.classNames.offset), dist_addClasses(this.maskEl, this.classNames.mask), 
                dist_addClasses(this.contentEl, this.classNames.contentEl), dist_addClasses(this.placeholderEl, this.classNames.placeholder), 
                dist_addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl), 
                dist_addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl); this.el.firstChild; ) this.contentEl.appendChild(this.el.firstChild);
                this.contentWrapperEl.appendChild(this.contentEl), this.offsetEl.appendChild(this.contentWrapperEl), 
                this.maskEl.appendChild(this.offsetEl), this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl), 
                this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl), this.wrapperEl.appendChild(this.maskEl), 
                this.wrapperEl.appendChild(this.placeholderEl), this.el.appendChild(this.wrapperEl), 
                null === (_a = this.contentWrapperEl) || void 0 === _a || _a.setAttribute("tabindex", this.options.tabIndex.toString()), 
                null === (_b = this.contentWrapperEl) || void 0 === _b || _b.setAttribute("role", "region"), 
                null === (_c = this.contentWrapperEl) || void 0 === _c || _c.setAttribute("aria-label", this.options.ariaLabel);
            }
            if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var track = document.createElement("div"), scrollbar = document.createElement("div");
                dist_addClasses(track, this.classNames.track), dist_addClasses(scrollbar, this.classNames.scrollbar), 
                track.appendChild(scrollbar), this.axis.x.track.el = track.cloneNode(!0), dist_addClasses(this.axis.x.track.el, this.classNames.horizontal), 
                this.axis.y.track.el = track.cloneNode(!0), dist_addClasses(this.axis.y.track.el, this.classNames.vertical), 
                this.el.appendChild(this.axis.x.track.el), this.el.appendChild(this.axis.y.track.el);
            }
            SimpleBarCore.prototype.initDOM.call(this), this.el.setAttribute("data-simplebar", "init");
        }, SimpleBar.prototype.unMount = function() {
            SimpleBarCore.prototype.unMount.call(this), SimpleBar.instances.delete(this.el);
        }, SimpleBar.initHtmlApi = function() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this), "undefined" != typeof MutationObserver && (this.globalObserver = new MutationObserver(SimpleBar.handleMutations), 
            this.globalObserver.observe(document, {
                childList: !0,
                subtree: !0
            })), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements), 
            window.addEventListener("load", this.initDOMLoadedElements));
        }, SimpleBar.handleMutations = function(mutations) {
            mutations.forEach((function(mutation) {
                mutation.addedNodes.forEach((function(addedNode) {
                    1 === addedNode.nodeType && (addedNode.hasAttribute("data-simplebar") ? !SimpleBar.instances.has(addedNode) && document.documentElement.contains(addedNode) && new SimpleBar(addedNode, dist_getOptions(addedNode.attributes)) : addedNode.querySelectorAll("[data-simplebar]").forEach((function(el) {
                        "init" !== el.getAttribute("data-simplebar") && !SimpleBar.instances.has(el) && document.documentElement.contains(el) && new SimpleBar(el, dist_getOptions(el.attributes));
                    })));
                })), mutation.removedNodes.forEach((function(removedNode) {
                    var _a;
                    1 === removedNode.nodeType && ("init" === removedNode.getAttribute("data-simplebar") ? !document.documentElement.contains(removedNode) && (null === (_a = SimpleBar.instances.get(removedNode)) || void 0 === _a || _a.unMount()) : Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), (function(el) {
                        var _a;
                        !document.documentElement.contains(el) && (null === (_a = SimpleBar.instances.get(el)) || void 0 === _a || _a.unMount());
                    })));
                }));
            }));
        }, SimpleBar.instances = new WeakMap, SimpleBar;
    }(SimpleBarCore);
    dist_canUseDOM && SimpleBar.initHtmlApi(), window.addEventListener("age_gate_shown", (function() {
        new SimpleBar(document.querySelector(".age-gate"), {});
    }));
})();