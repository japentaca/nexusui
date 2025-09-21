import C from "waaclock";
const V = (h, t, e) => Math.min(Math.max(h, t), e), O = (h, t, e) => (h - t) / (e - t), P = (h, t, e, i, s) => t === e ? i : (h - t) * (s - i) / (e - t) + i, N = (h, t) => {
  var e = Math.sqrt(h * h + t * t), i = Math.atan2(t, h);
  return i < 0 && (i = i + 2 * Math.PI), { radius: e, angle: i };
}, B = function(h, t) {
  var e = Math.cos(t), i = Math.sin(t);
  return { x: h * e, y: h * i * -1 };
}, W = function(h, t) {
  return parseFloat(h.toFixed(t));
}, Z = function(h) {
  return P(h, 1, 0, 0, 1);
}, q = function(h) {
  return Math.pow(2, (h - 69) / 12) * 440;
}, j = function(h, t, e) {
  return h * (e - t) + t;
}, H = function() {
  return arguments[~~(Math.random() * arguments.length)];
}, U = function(h) {
  return Math.pow(2, h);
}, K = function(h, t) {
  t || (t = h, h = 0);
  var e = Math.min(h, t), i = Math.max(h, t);
  return Math.floor(Math.random() * (i - e) + e);
}, E = function(h, t) {
  t || (t = h, h = 0);
  var e = Math.min(h, t), i = Math.max(h, t);
  return Math.random() * (i - e) + e;
}, G = function(h, t, e) {
  return h++, h >= e && (h = t), h;
}, $ = function(h) {
  let t = 0;
  for (var e = 0; e < h.length; e++)
    t += h[e];
  return t / h.length;
}, J = function(h, t, e, i) {
  let s = h - e, n = t - i;
  return Math.sqrt(s * s + n * n);
}, Q = function(h) {
  return 20 * Math.log10(h);
}, tt = function(h = 0.5) {
  return E(0, 1) < h ? 1 : 0;
}, r = {
  clip: V,
  normalize: O,
  scale: P,
  toPolar: N,
  toCartesian: B,
  prune: W,
  invert: Z,
  mtof: q,
  interp: j,
  pick: H,
  octave: U,
  ri: K,
  rf: E,
  cycle: G,
  average: $,
  distance: J,
  gainToDB: Q,
  coin: tt
}, c = {
  create: (h) => document.createElementNS("http://www.w3.org/2000/svg", h),
  arc: (h, t, e, i, s) => {
    var n = r.toCartesian(e, s), l = r.toCartesian(e, i), a = s - i <= 180 ? "0" : "1", o = [
      "M",
      n.x + h,
      n.y + t,
      "A",
      e,
      e,
      0,
      a,
      0,
      l.x + h,
      l.y + t
    ].join(" ");
    return o;
  },
  radialGradient: (h, t) => {
    let e = "gradient" + r.ri(1e11), i = [], s = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    s.setAttribute("id", e), s.setAttribute("cx", "50%"), s.setAttribute("cy", "50%"), s.setAttribute("r", "50%"), h.appendChild(s);
    for (let n = 0; n < t; n++) {
      let l = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      l.setAttribute("id", "stop" + n), s.appendChild(l), i.push(l);
    }
    return {
      id: e,
      stops: i,
      element: s
    };
  }
}, et = (h) => {
  let t = h.getBoundingClientRect(), e = t.top + window.scrollY, i = t.left + window.scrollX;
  return { top: e, left: i };
}, it = (h) => (typeof h == "string" && (h = document.getElementById(h.replace("#", ""))), h instanceof HTMLElement || h instanceof SVGElement ? h : "No valid parent argument"), st = (h, t) => ({
  x: h.pageX - t.left,
  y: h.pageY - t.top
}), ht = (h, t) => ({
  x: h.targetTouches.length ? h.targetTouches[0].pageX - t.left : !1,
  y: h.targetTouches.length ? h.targetTouches[0].pageY - t.top : !1
}), nt = function(h, t) {
  this.element = document.createElement("canvas"), this.context = this.element.getContext("2d"), this.scale = window.devicePixelRatio || 1, this.lastRefreshTime = 0, h.appendChild(this.element), this.resize = (e, i) => {
    this.element.width = e * this.scale, this.element.height = i * this.scale, this.element.style.width = e + "px", this.element.style.height = i + "px";
  }, this.setFramerate = (e) => {
    this.millisecondsPerFrame = e ? 1e3 / e : 0;
  }, this.refreshIntervalReached = (e) => {
    if (this.millisecondsPerFrame) {
      if (e - this.lastRefreshTime >= this.millisecondsPerFrame)
        return this.lastRefreshTime = e, !0;
    } else return !0;
  }, this.setFramerate(t);
}, p = {
  findPosition: et,
  parseElement: it,
  locateMouse: st,
  locateTouch: ht,
  SmartCanvas: nt
}, at = (h) => typeof h == "object" && !Array.isArray(h) && h !== null && !(h instanceof SVGElement) && !(h instanceof HTMLElement), lt = (h, t) => {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(e) {
    h.addEventListener(e, function() {
      t(this.value) ? (this.oldValue = this.value, this.oldSelectionStart = this.selectionStart, this.oldSelectionEnd = this.selectionEnd) : this.hasOwnProperty("oldValue") ? (this.value = this.oldValue, this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)) : this.value = "";
    });
  });
}, L = {
  isObject: at,
  setInputFilter: lt
}, rt = "ontouchstart" in document.documentElement, v = {
  exists: rt
};
class ot {
  constructor() {
    this._events = /* @__PURE__ */ new Map();
  }
  on(t, e) {
    return this._events.has(t) || this._events.set(t, /* @__PURE__ */ new Set()), this._events.get(t).add(e), () => this.off(t, e);
  }
  off(t, e) {
    const i = this._events.get(t);
    i && i.delete(e);
  }
  emit(t, ...e) {
    const i = this._events.get(t);
    if (i) for (const s of i) try {
      s(...e);
    } catch (n) {
      console.error(n);
    }
  }
  // Añadido para compatibilidad con el uso en destroy()
  removeAllListeners(t) {
    typeof t == "string" ? this._events.delete(t) : this._events.clear();
  }
  // Alias común en EventEmitter de Node
  removeListener(t, e) {
    this.off(t, e);
  }
}
class m extends ot {
  constructor(t, e, i) {
    super(), this.type = this.constructor.name, this.settings = this.parseSettings(t, e, i), this.mouse = {}, this.wait = !1, this.colors = {};
    let s = F();
    this.colors.accent = s.accent, this.colors.fill = s.fill, this.colors.light = s.light, this.colors.dark = s.dark, this.colors.mediumLight = s.mediumLight, this.colors.mediumDark = s.mediumDark;
  }
  parseSettings(t, e, i) {
    e.unshift("target"), i.defaultSize = i.size.splice(0, 2), i.size = !1;
    let s = {
      target: document.body,
      colors: {},
      // should inherit from a colors module,
      snapWithParent: !0,
      event: function() {
      },
      component: !1
    };
    for (let n in i)
      s[n] = i[n];
    for (let n = 0; n < t.length; n++) {
      let l = t[n];
      if (L.isObject(l))
        for (let a in l)
          s[a] = l[a];
      else if (typeof l == "function")
        s.event = l;
      else if (e.length >= 1) {
        let a = e.splice(0, 1)[0];
        s[a] = l;
      }
    }
    return this.parent = p.parseElement(s.target), this.parent && this.parent instanceof HTMLElement && !s.component && (this.parent.hasAttribute("nexus-ui") || this.parent.setAttribute("nexus-ui", "")), s.size && Array.isArray(s.size) && s.snapWithParent ? (this.width = s.size[0], this.height = s.size[1], this.parent.style.width = this.width + "px", this.parent.style.height = this.height + "px") : s.snapWithParent && !s.component ? (this.width = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("width").replace("px", "")), this.height = parseFloat(window.getComputedStyle(this.parent, null).getPropertyValue("height").replace("px", "")), this.width == 5e3 && (this.width = s.defaultSize[0], this.parent.style.width = this.parent.width = this.width + "px"), this.height == 5e3 && (this.height = s.defaultSize[1], this.parent.style.height = this.parent.height = this.height + "px")) : (s.size = s.defaultSize, this.width = s.size[0], this.height = s.size[1]), s.event ? this.event = this.on("change", s.event) : this.event = !1, s;
  }
  init() {
    this.buildFrame(), this.buildInterface(), this.sizeInterface(), this.attachListeners(), this.colorInterface(), this.finalTouches();
  }
  buildFrame() {
    this.element = c.create("svg"), this.element.setAttribute("width", this.width), this.element.setAttribute("height", this.height), this.parent.appendChild(this.element);
  }
  buildInterface() {
  }
  sizeInterface() {
  }
  colorInterface() {
  }
  attachListeners() {
    this.interactionTarget = this.interactionTarget || this.element, v.exists && (this.interactionTarget.addEventListener("touchstart", (t) => this.preTouch(t)), this.interactionTarget.addEventListener("touchmove", (t) => this.preTouchMove(t)), this.interactionTarget.addEventListener("touchend", (t) => this.preTouchRelease(t))), this.boundPreMove = (t) => this.preMove(t), this.boundPreRelease = (t) => this.preRelease(t), this.interactionTarget.addEventListener("mousedown", (t) => this.preClick(t));
  }
  finalTouches() {
    this.element.style.cursor = "pointer";
  }
  preClick(t) {
    this.element instanceof HTMLElement && (this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "")), this.offset = p.findPosition(this.element), this.mouse = p.locateMouse(t, this.offset), this.clicked = !0, this.click(), this.moveEvent = document.addEventListener("mousemove", this.boundPreMove), this.releaseEvent = document.addEventListener("mouseup", this.boundPreRelease), this.emit("click"), t.preventDefault(), t.stopPropagation();
  }
  preMove(t) {
    this.wait || (this.mouse = p.locateMouse(t, this.offset), this.move(), this.wait = !0, setTimeout(() => {
      this.wait = !1;
    }, 25)), t.preventDefault(), t.stopPropagation();
  }
  preRelease(t) {
    this.mouse = p.locateMouse(t, this.offset), this.clicked = !1, this.release(), this.emit("release"), document.removeEventListener("mousemove", this.boundPreMove), document.removeEventListener("mouseup", this.boundPreRelease), t.preventDefault(), t.stopPropagation();
  }
  click() {
  }
  move() {
  }
  release() {
  }
  /* touch */
  preTouch(t) {
    this.element instanceof HTMLElement && (this.width = window.getComputedStyle(this.element, null).getPropertyValue("width").replace("px", "")), this.offset = p.findPosition(this.element), this.mouse = p.locateTouch(t, this.offset), this.clicked = !0, this.touch(t), this.emit("click"), t.preventDefault(), t.stopPropagation();
  }
  preTouchMove(t) {
    this.clicked && (this.mouse = p.locateTouch(t, this.offset), this.touchMove(), t.preventDefault(), t.stopPropagation());
  }
  preTouchRelease(t) {
    this.mouse = p.locateTouch(t, this.offset), this.clicked = !1, this.touchRelease(), this.emit("release"), t.preventDefault(), t.stopPropagation();
  }
  touch() {
    this.click();
  }
  touchMove() {
    this.move();
  }
  touchRelease() {
    this.release();
  }
  /**
  * Resize the interface
  * @param width {number} New width in pixels
  * @param height {number} New height in pixels
  *
  * @example
  * button.resize(100,100);
  */
  resize(t, e) {
    this.width = t, this.height = e, this.parent.style.width = this.width + "px", this.parent.style.height = this.height + "px", this.element.setAttribute("width", this.width), this.element.setAttribute("height", this.height), this.sizeInterface();
  }
  empty() {
    for (; this.element.lastChild; )
      this.element.removeChild(this.element.lastChild);
  }
  /**
  * Remove the interface from the page and cancel its event listener(s).
  *
  * @example
  * button.destroy();
  */
  destroy() {
    this.empty(), this.parent.removeChild(this.element), this.removeAllListeners(), this.instrument && delete this.instrument[this.id], this.customDestroy();
  }
  customDestroy() {
  }
  colorize(t, e) {
    this.colors[t] = e, this.colorInterface();
  }
}
class g {
  constructor(t = 0, e = 1, i = 0, s = 0) {
    this.min = t, this.max = e, this.step = i, this.value = s, this.changed = !1, this.oldValue = !1, this.update(this.value);
  }
  /**
    Update with a new value. The value will be auto-adjusted to fit the min/max/step.
    @param {number} value
  */
  update(t) {
    return this.step ? this.value = r.clip(Math.round((t - this.min) / this.step) * this.step + this.min, this.min, this.max) : this.value = r.clip(t, this.min, this.max), this.oldValue !== this.value ? (this.oldValue = this.value, this.changed = !0) : this.changed = !1, this.value;
  }
  /**
    Update with a normalized value 0-1.
    @param {number} value
  */
  updateNormal(t) {
    return this.value = r.scale(t, 0, 1, this.min, this.max), this.update(this.value);
  }
  /**
    Get a normalized version of this.value . Not settable.
  */
  get normalized() {
    return r.normalize(this.value, this.min, this.max);
  }
}
let T = class {
  constructor(t) {
    this.state = t || !1;
  }
  flip(t) {
    t || t === !1 ? this.state = t : this.state = !this.state;
  }
  on() {
    this.state = !0;
  }
  off() {
    this.state = !1;
  }
};
class x {
  constructor(t = "absolute", e = "vertical", i = [0, 100], s = [0, 100]) {
    this.mode = t, this.direction = e, this.previous = 0, this.value = 0, this.sensitivity = 1, this.resize(i, s);
  }
  resize(t, e) {
    this.boundary = {
      min: {
        x: t[0],
        y: e[0]
      },
      max: {
        x: t[1],
        y: e[1]
      },
      center: {
        x: (t[1] - t[0]) / 2 + t[0],
        y: (e[1] - e[0]) / 2 + e[0]
      }
    };
  }
  set anchor(t) {
    this._anchor = this.convertPositionToValue(t);
  }
  get anchor() {
    return this._anchor;
  }
  update(t) {
    if (this.mode === "relative") {
      let e = this.convertPositionToValue(t) - this.anchor, i = Math.abs(e) > 0.5 && this.direction === "radial" ? 0 : e * this.sensitivity;
      this.anchor = t, this.value = this.value + i;
    } else
      this.value = this.convertPositionToValue(t);
    this.value = r.clip(this.value, 0, 1);
  }
  convertPositionToValue(t) {
    switch (this.direction) {
      case "radial":
        let e = r.toPolar(t.x - this.boundary.center.x, t.y - this.boundary.center.y);
        return e = e.angle / (Math.PI * 2), e = (e - 0.25 + 1) % 1, e;
      case "vertical":
        return r.scale(t.y, this.boundary.min.y, this.boundary.max.y, 0, 1);
      case "horizontal":
        return r.scale(t.x, this.boundary.min.x, this.boundary.max.x, 0, 1);
    }
  }
}
class ct extends m {
  constructor() {
    let t = ["value"], e = {
      size: [200, 200],
      mode: "absolute",
      minX: 0,
      maxX: 1,
      stepX: 0,
      x: 0.5,
      minY: 0,
      maxY: 1,
      stepY: 0,
      y: 0.5
    };
    super(arguments, t, e), this._x = new g(this.settings.minX, this.settings.maxX, this.settings.stepX, this.settings.x), this._y = new g(this.settings.minY, this.settings.maxY, this.settings.stepY, this.settings.y), this.position = {
      x: new x(this.settings.mode, "horizontal", [0, this.width], [this.height, 0]),
      y: new x(this.settings.mode, "vertical", [0, this.width], [this.height, 0])
    }, this.position.x.value = this._x.normalized, this.position.y.value = this._y.normalized, this.init(), this.render();
  }
  buildInterface() {
    this.knob = c.create("circle"), this.element.appendChild(this.knob);
  }
  sizeInterface() {
    this.position.x.resize([0, this.width], [this.height, 0]), this.position.y.resize([0, this.width], [this.height, 0]), this._minDimension = Math.min(this.width, this.height), this.knobRadius = {
      off: ~~(this._minDimension / 100) * 5 + 5
    }, this.knobRadius.on = this.knobRadius.off * 2, this.knob.setAttribute("cx", this.width / 2), this.knob.setAttribute("cy", this.height / 2), this.knob.setAttribute("r", this.knobRadius.off);
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this.knob.setAttribute("fill", this.colors.accent);
  }
  render() {
    this.clicked ? this.knob.setAttribute("r", this.knobRadius.on) : this.knob.setAttribute("r", this.knobRadius.off), this.knobCoordinates = {
      x: this._x.normalized * this.width,
      y: this.height - this._y.normalized * this.height
    }, this.knob.setAttribute("cx", this.knobCoordinates.x), this.knob.setAttribute("cy", this.knobCoordinates.y);
  }
  click() {
    this.position.x.anchor = this.mouse, this.position.y.anchor = this.mouse, this.move();
  }
  move() {
    this.clicked && (this.position.x.update(this.mouse), this.position.y.update(this.mouse), this._x.updateNormal(this.position.x.value), this._y.updateNormal(this.position.y.value), this.emit("change", {
      x: this._x.value,
      y: this._y.value
    }), this.render());
  }
  release() {
    this.render();
  }
  /**
  * The interface's x value. When set, it will automatically adjust to fit min/max/step settings of the interface.
  * @type {object}
  * @example position.x = 0.5;
  */
  get x() {
    return this._x.value;
  }
  set x(t) {
    this._x.update(t), this.emit("change", {
      x: this._x.value,
      y: this._y.value
    }), this.render();
  }
  /**
  * The interface's y values. When set, it will automatically adjust to fit min/max/step settings of the interface.
  * @type {object}
  * @example position.x = 0.5;
  */
  get y() {
    return this._y.value;
  }
  set y(t) {
    this._y.update(t), this.emit("change", {
      x: this._x.value,
      y: this._y.value
    }), this.render();
  }
  get normalized() {
    return {
      x: this._x.normalized,
      y: this._y.normalized
    };
  }
  /**
  * The lower limit of value on the x axis
  * @type {object}
  */
  get minX() {
    return this._x.min;
  }
  set minX(t) {
    this._x.min = t, this.render();
  }
  /**
  * The lower limit of value on the y axis
  * @type {object}
  */
  get minY() {
    return this._y.min;
  }
  set minY(t) {
    this._y.min = t, this.render();
  }
  /**
  * The upper limit of value on the x axis
  * @type {object}
  */
  get maxX() {
    return this._x.max;
  }
  set maxX(t) {
    this._x.max = t, this.render();
  }
  /**
  * The upper limit of value on the y axis
  * @type {object}
  */
  get maxY() {
    return this._y.max;
  }
  set maxY(t) {
    this._y.max = t, this.render();
  }
  /**
  * The incremental step of values on the x axis
  * @type {object}
  */
  get stepX() {
    return this._x.step;
  }
  set stepX(t) {
    this._x.step = t, this.render();
  }
  /**
  * The incremental step of values on the y axis
  * @type {object}
  */
  get stepY() {
    return this._y.step;
  }
  set stepY(t) {
    this._y.step = t, this.render();
  }
  /**
  Absolute mode (position's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "absolute".
  @type {string}
  @example position.mode = "relative";
  */
  get mode() {
    return this.position.x.mode;
  }
  set mode(t) {
    this.position.x.mode = t, this.position.y.mode = t;
  }
}
class ut extends m {
  constructor() {
    let t = ["min", "max", "value"], e = {
      size: [120, 20],
      mode: "relative",
      // 'relative' or 'absolute'
      min: 0,
      max: 1,
      step: 0,
      value: 0
    };
    super(arguments, t, e), this.orientation = "vertical", this._value = new g(this.settings.min, this.settings.max, this.settings.step, this.settings.value), this.position = new x(this.settings.mode, this.orientation, [0, this.width], [this.height, 0]), this.position.value = this._value.normalized, this.init(), this.position.direction = this.orientation, this.emit("change", this.value);
  }
  buildInterface() {
    this.bar = c.create("rect"), this.fillbar = c.create("rect"), this.knob = c.create("circle"), this.element.appendChild(this.bar), this.element.appendChild(this.fillbar), this.element.appendChild(this.knob);
  }
  sizeInterface() {
    this.width < this.height ? (this.orientation = "vertical", this.position.direction = "vertical") : (this.orientation = "horizontal", this.position.direction = "horizontal"), this.position && this.position.resize([0, this.width], [this.height, 0]);
    let t, e, i, s, n, l;
    this.knobData = {
      level: 0,
      r: 0
    }, this.orientation === "vertical" ? (this.thickness = this.width / 2, t = this.width / 2, e = 0, i = this.thickness, s = this.height, this.knobData.r = this.thickness * 0.8, this.knobData.level = s - this.knobData.r - this.normalized * (s - this.knobData.r * 2), n = "translate(" + this.thickness * -1 / 2 + ",0)", l = i / 2) : (this.thickness = this.height / 2, t = 0, e = this.height / 2, i = this.width, s = this.thickness, this.knobData.r = this.thickness * 0.8, this.knobData.level = this.normalized * (i - this.knobData.r * 2) + this.knobData.r, n = "translate(0," + this.thickness * -1 / 2 + ")", l = s / 2), this.bar.setAttribute("x", t), this.bar.setAttribute("y", e), this.bar.setAttribute("transform", n), this.bar.setAttribute("rx", l), this.bar.setAttribute("ry", l), this.bar.setAttribute("width", i), this.bar.setAttribute("height", s), this.orientation === "vertical" ? (this.fillbar.setAttribute("x", t), this.fillbar.setAttribute("y", this.knobData.level), this.fillbar.setAttribute("width", i), this.fillbar.setAttribute("height", s - this.knobData.level)) : (this.fillbar.setAttribute("x", 0), this.fillbar.setAttribute("y", e), this.fillbar.setAttribute("width", this.knobData.level), this.fillbar.setAttribute("height", s)), this.fillbar.setAttribute("transform", n), this.fillbar.setAttribute("rx", l), this.fillbar.setAttribute("ry", l), this.orientation === "vertical" ? (this.knob.setAttribute("cx", t), this.knob.setAttribute("cy", this.knobData.level)) : (this.knob.setAttribute("cx", this.knobData.level), this.knob.setAttribute("cy", e)), this.knob.setAttribute("r", this.knobData.r);
  }
  colorInterface() {
    this.bar.setAttribute("fill", this.colors.fill), this.fillbar.setAttribute("fill", this.colors.accent), this.knob.setAttribute("fill", this.colors.accent);
  }
  render() {
    this.clicked || (this.knobData.r = this.thickness * 0.75), this.knob.setAttribute("r", this.knobData.r), this.orientation === "vertical" ? (this.knobData.level = this.knobData.r + this._value.normalized * (this.height - this.knobData.r * 2), this.knob.setAttribute("cy", this.height - this.knobData.level), this.fillbar.setAttribute("y", this.height - this.knobData.level), this.fillbar.setAttribute("height", this.knobData.level)) : (this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r, this.knob.setAttribute("cx", this.knobData.level), this.fillbar.setAttribute("x", 0), this.fillbar.setAttribute("width", this.knobData.level));
  }
  click() {
    this.knobData.r = this.thickness * 0.9, this.position.anchor = this.mouse, this.move();
  }
  move() {
    this.clicked && (this.position.update(this.mouse), this._value.updateNormal(this.position.value), this.emit("change", this._value.value), this.render());
  }
  release() {
    this.render();
  }
  get normalized() {
    return this._value.normalized;
  }
  /**
  The slider's current value. If set manually, will update the interface and trigger the output event.
  @type {number}
  @example slider.value = 10;
  */
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.update(t), this.position.value = this._value.normalized, this.emit("change", this._value.value), this.render();
  }
  /**
  Lower limit of the sliders's output range
  @type {number}
  @example slider.min = 1000;
  */
  get min() {
    return this._value.min;
  }
  set min(t) {
    this._value.min = t;
  }
  /**
  Upper limit of the slider's output range
  @type {number}
  @example slider.max = 1000;
  */
  get max() {
    return this._value.max;
  }
  set max(t) {
    this._value.max = t;
  }
  /**
  The increment that the slider's value changes by.
  @type {number}
  @example slider.step = 5;
  */
  get step() {
    return this._value.step;
  }
  set step(t) {
    this._value.step = t;
  }
  /**
  Absolute mode (slider's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
  @type {string}
  @example slider.mode = "relative";
  */
  get mode() {
    return this.position.mode;
  }
  set mode(t) {
    this.position.mode = t;
  }
}
class dt extends m {
  constructor() {
    let t = ["value"], e = {
      size: [40, 20],
      target: !1,
      state: !1
    };
    super(arguments, t, e), this._state = new T(this.settings.state), this.init();
  }
  buildInterface() {
    this.bar = c.create("rect"), this.knob = c.create("circle"), this.element.appendChild(this.bar), this.element.appendChild(this.knob);
  }
  sizeInterface() {
    this.height < this.width / 2 ? this.knobSize = this.height / 2 : this.knobSize = this.width / 4, this.bar.setAttribute("x", this.width / 2 - this.knobSize * 1.5), this.bar.setAttribute("y", this.height / 2 - this.knobSize / 2), this.bar.setAttribute("rx", this.knobSize / 2), this.bar.setAttribute("ry", this.knobSize / 2), this.bar.setAttribute("width", this.knobSize * 3), this.bar.setAttribute("height", this.knobSize), this.knob.setAttribute("cx", this.width / 2 - this.knobSize), this.knob.setAttribute("cy", this.height / 2), this.knob.setAttribute("r", this.knobSize);
  }
  colorInterface() {
    this.knob.setAttribute("fill", this.colors.accent), this.render();
  }
  render() {
    this.state ? (this.knob.setAttribute("cx", this.width / 2 + this.knobSize), this.bar.setAttribute("fill", this.colors.accent)) : (this.knob.setAttribute("cx", this.width / 2 - this.knobSize), this.bar.setAttribute("fill", this.colors.fill));
  }
  click() {
    this.flip(), this.render(), this.emit("change", this.state);
  }
  /**
  Whether the toggle is currently on or off. Setting this property will update the toggle interface and trigger the output event.
  @type {boolean}
  @example toggle.state = false;
  */
  get state() {
    return this._state.state;
  }
  set state(t) {
    this._state.flip(t), this.emit("change", this.state), this.render();
  }
  /**
  * Switch the toggle state to its opposite state
  * @example
  * toggle.flip();
  */
  flip() {
    this._state.flip(), this.render();
  }
}
class w extends m {
  constructor(t, e, i) {
    super(t, e, i), this.mode = this.settings.mode || "button", this.position = {
      x: 0,
      y: 0
    }, this._state = new T(this.settings.state);
  }
  buildInterface() {
    this.pad = c.create("circle"), this.pad.setAttribute("fill", "#d18"), this.pad.setAttribute("stroke", "#d18"), this.pad.setAttribute("stroke-width", 4), this.element.appendChild(this.pad), this.interactionTarget = this.pad, this.sizeInterface();
  }
  sizeInterface() {
    this.pad.setAttribute("cx", this.width / 2), this.pad.setAttribute("cy", this.height / 2), this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - 2);
  }
  render() {
    this.state ? (this.pad.setAttribute("fill", this.colors.accent), this.pad.setAttribute("stroke", this.colors.accent)) : (this.pad.setAttribute("fill", this.colors.fill), this.pad.setAttribute("stroke", this.colors.mediumLight));
  }
  down(t) {
    switch (this.mode) {
      case "impulse":
        this.turnOn(), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(this.turnOff.bind(this), 30);
        break;
      case "button":
        this.turnOn();
        break;
      case "aftertouch":
        this.position = {
          x: r.clip(this.mouse.x / this.width, 0, 1),
          y: r.clip(1 - this.mouse.y / this.height, 0, 1)
        }, this.turnOn();
        break;
      case "toggle":
        this.flip(t);
        break;
    }
  }
  bend(t) {
    this.mode === "aftertouch" && (this.mouse = t || this.mouse, this.position = {
      x: r.clip(this.mouse.x / this.width, 0, 1),
      y: r.clip(1 - this.mouse.y / this.height, 0, 1)
    }, this.emit("change", {
      state: this.state,
      x: this.position.x,
      y: this.position.y
    }), this.render());
  }
  up() {
    switch (this.mode) {
      case "button":
        this.turnOff();
        break;
      case "aftertouch":
        this.turnOff(), this.position = {
          x: r.clip(this.mouse.x / this.width, 0, 1),
          y: r.clip(1 - this.mouse.y / this.height, 0, 1)
        };
        break;
    }
  }
  /* overwritable interaction handlers */
  click() {
    this.down();
  }
  move() {
    this.bend();
  }
  release() {
    this.up();
  }
  /**
  Whether the button is on (pressed) or off (not pressed)
  @type {boolean}
  @example button.state = true;
  */
  get state() {
    return this._state.state;
  }
  set state(t) {
    this._state.flip(t), this.mode === "aftertouch" ? this.emit("change", {
      state: this.state,
      x: this.position.x,
      y: this.position.y
    }) : this.emit("change", this.state), this.render();
  }
  /**
  Change the button to its alternate state (off=>on, on=>off), or flip it to a specified state.
  @param value {boolean} (Optional) State to flip to.
  @example button.flip();
  */
  flip(t) {
    this._state.flip(t), this.mode === "aftertouch" ? this.emit("change", {
      state: this.state,
      x: this.position.x,
      y: this.position.y
    }) : this.emit("change", this.state), this.render();
  }
  /**
  Turn the button's state to true.
  @example button.turnOn();
  */
  turnOn(t) {
    this._state.on(), t !== !1 && (this.mode === "aftertouch" ? this.emit("change", {
      state: this.state,
      x: this.position.x,
      y: this.position.y
    }) : this.emit("change", this.state)), this.render();
  }
  /**
  Turn the button's state to false.
  @example button.turnOff();
  */
  turnOff(t) {
    this._state.off(), t !== !1 && (this.mode === "aftertouch" ? this.emit("change", {
      state: this.state,
      x: this.position.x,
      y: this.position.y
    }) : this.emit("change", this.state)), this.render();
  }
}
class S extends w {
  constructor() {
    let t = ["mode"], e = {
      size: [80, 80],
      mode: "aftertouch",
      // button, aftertouch, impulse, toggle
      state: !1
    };
    super(arguments, t, e), this.mode = this.settings.mode, this.init(), this.render();
  }
  buildInterface() {
    this.pad = c.create("circle"), this.element.appendChild(this.pad), this.interactionTarget = this.pad, this.defs = c.create("defs"), this.element.appendChild(this.defs), this.gradient = c.radialGradient(this.defs, 2), this.gradient.stops[0].setAttribute("offset", "30%"), this.gradient.stops[1].setAttribute("offset", "100%");
  }
  sizeInterface() {
    this.pad.setAttribute("cx", this.width / 2), this.pad.setAttribute("cy", this.height / 2), this.pad.setAttribute("r", Math.min(this.width, this.height) / 2 - this.width / 40), this.pad.setAttribute("stroke-width", this.width / 20);
  }
  colorInterface() {
    this.gradient.stops[0].setAttribute("stop-color", this.colors.accent), this.gradient.stops[1].setAttribute("stop-color", this.colors.fill), this.render();
  }
  /*
  * Update the visual interface using its current state
  *
  * @example
  * button.render();
  */
  render() {
    this.state ? (this.mode === "aftertouch" ? (this.pad.setAttribute("stroke", "url(#" + this.gradient.id + ")"), this.gradient.element.setAttribute("cx", this.position.x * 100 + "%"), this.gradient.element.setAttribute("cy", (1 - this.position.y) * 100 + "%")) : this.pad.setAttribute("stroke", this.colors.accent), this.pad.setAttribute("fill", this.colors.accent)) : (this.pad.setAttribute("fill", this.colors.fill), this.pad.setAttribute("stroke", this.colors.mediumLight));
  }
}
class mt extends w {
  constructor() {
    let t = ["value"], e = {
      size: [150, 50],
      state: !1,
      text: "Play"
    };
    super(arguments, t, e), this._text = this.settings.text, this.settings.alternate && (this.settings.alternateText = this.settings.alternate, console.warn("'alternate' initiator is deprecated. Use 'alternateText' instead.")), this._alternateText = this.settings.alternateText, this.mode = this.settings.alternateText ? "toggle" : "button", this.init(), this.render(), this.state = this.settings.state;
  }
  buildFrame() {
    this.element = document.createElement("div"), this.parent.appendChild(this.element), this.textElement = document.createElement("div"), this.textElement.innerHTML = this._text, this.element.appendChild(this.textElement);
  }
  buildInterface() {
  }
  colorInterface() {
    this.element.style.color = this.colors.dark, this.render();
  }
  sizeInterface() {
    let t = this.height / 3, e = this.width / (this._text.length + 2);
    if (t = Math.min(t, e), this.alternateText) {
      let s = this.width / (this.alternateText.length + 2);
      t = Math.min(t, s);
    }
    let i = "width: " + this.width + "px;";
    i += "height: " + this.height + "px;", i += "padding: " + (this.height - t) / 2 + "px 0px;", i += "box-sizing: border-box;", i += "text-align: center;", i += "font-family: inherit;", i += "font-weight: 700;", i += "opacity: 1;", i += "font-size:" + t + "px;", this.textElement.style.cssText = i, this.render();
  }
  render() {
    this.state ? (this.element.style.backgroundColor = this.colors.accent, this.textElement.style.color = this.colors.fill, this.alternateText ? this.textElement.innerHTML = this._alternateText : this.textElement.innerHTML = this._text) : (this.element.style.backgroundColor = this.colors.fill, this.textElement.style.color = this.colors.dark, this.textElement.innerHTML = this._text);
  }
  /**
  The text to display when the button is in its "on" state. If set, this puts the button in "toggle" mode.
  @type {String}
  */
  get alternateText() {
    return this._alternateText;
  }
  set alternateText(t) {
    t ? this.mode = "toggle" : this.mode = "button", this._alternateText = t, this.render();
  }
  /**
  The text to display. (If .alternateText exists, then this .text will only be displayed when the button is in its "off" state.)
  @type {String}
  */
  get text() {
    return this._text;
  }
  set text(t) {
    this._text = t, this.sizeInterface(), this.render();
  }
}
class pt extends m {
  constructor() {
    let t = ["value"], e = {
      size: [120, 25],
      numberOfButtons: 4,
      active: -1
    };
    super(arguments, t, e), this.buttons = [], this._numberOfButtons = this.settings.numberOfButtons, this.active = this.settings.active, this.init(), this.render();
  }
  buildFrame() {
    this.element = document.createElement("div"), this.parent.appendChild(this.element);
  }
  buildInterface() {
    for (let t = 0; t < this._numberOfButtons; t++) {
      let e = document.createElement("span"), i = new S(
        e,
        {
          mode: "toggle",
          component: !0
        },
        this.update.bind(this, t)
      );
      this.buttons.push(i), this.element.appendChild(e);
    }
  }
  sizeInterface() {
    let t;
    this.width > this.height ? t = "horizontal" : t = "vertical";
    let e = this.width / (t === "vertical" ? 1 : this._numberOfButtons), i = this.height / (t === "vertical" ? this._numberOfButtons : 1);
    for (let s = 0; s < this._numberOfButtons; s++)
      this.buttons[s].resize(e, i);
  }
  colorInterface() {
    for (let t = 0; t < this._numberOfButtons; t++)
      this.buttons[t].colors = this.colors, this.buttons[t].render();
  }
  update(t) {
    this.buttons[t].state ? this.select(t) : this.deselect();
  }
  render() {
    for (let t = 0; t < this.buttons.length; t++)
      t === this.active ? this.buttons[t].turnOn(!1) : this.buttons[t].turnOff(!1);
  }
  /**
  Select one button and deselect all other buttons.
  @param index {number} The index of the button to select
  */
  select(t) {
    t >= 0 && t < this.buttons.length && (this.active = t, this.emit("change", this.active), this.render());
  }
  /**
  Deselect all buttons.
  */
  deselect() {
    this.active = -1, this.emit("change", this.active), this.render();
  }
  get numberOfButtons() {
    return this._numberOfButtons;
  }
  /**
   * Update how many buttons are in the interface
   * @param  {number} buttons How many buttons are in the interface
   */
  set numberOfButtons(t) {
    this._numberOfButtons = t;
    for (let e = 0; e < this.buttons.length; e++)
      this.buttons[e].destroy();
    this.buttons = [], this.empty(), this.buildInterface();
  }
}
class ft extends m {
  constructor() {
    let t = ["value"], e = {
      size: [60, 30],
      value: 0,
      min: 0,
      max: 2e4,
      step: 1
    };
    super(arguments, t, e), this._value = new g(this.settings.min, this.settings.max, this.settings.step, this.settings.value), this.decimalPlaces = 2, this.actual = 0, this.max = this._value.max, this.min = this._value.min, this.step = this._value.step, this.init(), this.render();
  }
  buildFrame() {
    this.element = document.createElement("input"), this.element.type = "text", this.element.addEventListener("blur", (function() {
      this.element.style.backgroundColor = this.colors.fill, this.element.style.color = this.colors.dark, this.element.value !== this.value && (this.value = parseFloat(this.element.value), this.render());
    }).bind(this)), L.setInputFilter(this.element, function(t) {
      return /^-?\d*\.?\d*$/.test(t);
    }), this.element.addEventListener("keydown", (function(t) {
      t.which === 13 && (this.element.blur(), this.value = this.element.value, this.emit("change", this.value), this.render());
    }).bind(this), !0), this.parent.appendChild(this.element);
  }
  sizeInterface() {
    this._minDimension = Math.min(this.width, this.height);
    let t = "width: " + this.width + "px;";
    t += "height: " + this.height + "px;", t += "background-color: #e7e7e7;", t += "color: #333;", t += "font-family: arial;", t += "font-weight: 500;", t += "font-size:" + this._minDimension / 2 + "px;", t += "border: none;", t += "outline: none;", t += "padding: " + this._minDimension / 4 + "px " + this._minDimension / 4 + "px;", t += "box-sizing: border-box;", t += "userSelect: text;", t += "mozUserSelect: text;", t += "webkitUserSelect: text;", this.element.style.cssText += t, this.element.value = this.value;
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this.element.style.color = this.colors.dark;
  }
  render() {
    this.element.value = r.prune(this.value, this.decimalPlaces);
  }
  click() {
    this.hasMoved = !1, this.element.readOnly = !0, this.actual = this.value, this.initial = { y: this.mouse.y }, this.changeFactor = r.invert(this.mouse.x / this.width);
  }
  move() {
    if (this.hasMoved = !0, this.clicked) {
      let t = this.actual - (this.mouse.y - this.initial.y) * (r.clip(this.max - this.min, 0, 1e3) / 200) * Math.pow(this.changeFactor, 2);
      this.value = t, this.render(), this._value.changed && this.emit("change", this.value);
    }
  }
  release() {
    this.hasMoved ? document.body.focus() : (this.element.readOnly = !1, this.element.focus(), this.element.setSelectionRange(0, this.element.value.length), this.element.style.backgroundColor = this.colors.accent, this.element.style.color = this.colors.light);
  }
  /**
  Connect this number interface to a dial or slider
  @param {Interface} element Element to connect to.
  @example number.link(slider)
  */
  link(t) {
    this.min = t.min, this.max = t.max, this.step = t.step, t.on("change", (e) => {
      this.passiveUpdate(e);
    }), this.on("change", (e) => {
      t.value = e;
    }), this.value = t.value;
  }
  passiveUpdate(t) {
    this._value.update(t), this.render();
  }
  /**
  The interface's current value. If set manually, will update the interface and trigger the output event.
  @type {number}
  @example number.value = 10;
  */
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.update(t), this.emit("change", this.value), this.render();
  }
  /**
  Lower limit of the number's output range
  @type {number}
  @example number.min = 1000;
  */
  get min() {
    return this._value.min;
  }
  set min(t) {
    this._value.min = t;
  }
  /**
  Upper limit of the number's output range
  @type {number}
  @example number.max = 1000;
  */
  get max() {
    return this._value.max;
  }
  set max(t) {
    this._value.max = t;
  }
  /**
  The increment that the number's value changes by.
  @type {number}
  @example number.step = 5;
  */
  get step() {
    return this._value.step;
  }
  set step(t) {
    this._value.step = t;
  }
}
class gt extends m {
  constructor() {
    let t = ["value"], e = {
      size: [100, 30],
      options: ["default", "options"]
    };
    super(arguments, t, e), this._selectedIndex = -1, this._value = !1, this._options = this.settings.options, this.init(), this.render();
  }
  buildFrame() {
    this.element = document.createElement("select"), this.element.style.fontSize = this.height / 2 + "px", this.element.style.outline = "none", this.element.style.highlight = "none", this.element.style.width = this.width + "px", this.element.style.height = this.height + "px", this.boundRender = this.render.bind(this), this.element.addEventListener("change", this.boundRender), this.parent.appendChild(this.element);
  }
  attachListeners() {
  }
  buildInterface() {
    this.defineOptions();
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this.element.style.color = this.colors.dark, this.element.style.border = "solid 0px " + this.colors.mediumLight;
  }
  render() {
    this._value = this.element.options[this.element.selectedIndex].text, this._selectedIndex = this.element.selectedIndex, this.emit("change", {
      value: this._value,
      index: this._selectedIndex
    });
  }
  click() {
  }
  move() {
  }
  release() {
  }
  /**
   * Update the list of options. This removes all existing options and creates a new list of options.
   * @param  {array} options New array of options
   */
  defineOptions(t) {
    t && (this._options = t);
    for (let e = this.element.options.length - 1; e >= 0; e--)
      this.element.remove(e);
    for (let e = 0; e < this._options.length; e++)
      this.element.options.add(new Option(this._options[e], e));
  }
  /**
  The text of the option that is currently selected. If set, will update the interface and trigger the output event.
  @type {String}
  @example select.value = "sawtooth";
  */
  get value() {
    return this._value;
  }
  set value(t) {
    this._value = t;
    for (let e = 0; e < this.element.options.length; e++)
      if (t === this.element.options[e].text) {
        this.selectedIndex = e;
        break;
      }
  }
  /**
  The numeric index of the option that is currently selected. If set, will update the interface and trigger the output event.
  @type {number}
  @example select.selectedIndex = 2;
  */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(t) {
    this._selectedIndex = t, this.element.selectedIndex = t, this.render();
  }
  customDestroy() {
    this.element.removeEventListener("change", this.boundRender);
  }
}
class bt extends m {
  constructor() {
    let t = ["min", "max", "value"], e = {
      size: [75, 75],
      interaction: "radial",
      // radial, vertical, horizontal
      mode: "relative",
      // absolute, relative
      min: 0,
      max: 1,
      step: 0,
      value: 0
    };
    super(arguments, t, e), this.interaction = this.settings.interaction, this._value = new g(this.settings.min, this.settings.max, this.settings.step, this.settings.value), this.position = new x(this.settings.mode, this.interaction, [0, this.width], [this.height, 0]), this.init(), this.value = this._value.value, this.position.value = this._value.normalized, this.previousAngle = !1, this.emit("change", this.value);
  }
  buildInterface() {
    this.background = c.create("circle"), this.screw = c.create("circle"), this.handle = c.create("path"), this.handle2 = c.create("path"), this.handleFill = c.create("path"), this.handle2Fill = c.create("path"), this.handleLine = c.create("path"), this.element.appendChild(this.background), this.element.appendChild(this.handle), this.element.appendChild(this.handle2), this.element.appendChild(this.handleFill), this.element.appendChild(this.handle2Fill), this.element.appendChild(this.handleLine), this.element.appendChild(this.screw);
  }
  sizeInterface() {
    this.position.resize([0, this.width], [this.height, 0]);
    let t = {
      x: this.width / 2,
      y: this.height / 2
    }, e = Math.min(this.width, this.height);
    this.background.setAttribute("cx", t.x), this.background.setAttribute("cy", t.y), this.background.setAttribute("r", e / 2 - e / 40), this.screw.setAttribute("cx", t.x), this.screw.setAttribute("cy", t.y), this.screw.setAttribute("r", e / 12);
    let i = this.value, s = {
      start: Math.PI * 1.5,
      end: r.clip(r.scale(i, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
    }, n = {
      start: Math.PI * 2.5,
      end: r.clip(r.scale(i, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
    }, l = c.arc(t.x, t.y, e / 2 - e / 40, s.start, s.end), a = c.arc(t.x, t.y, e / 2 - e / 40, n.start, n.end);
    this.handle.setAttribute("d", l), this.handle.setAttribute("stroke-width", e / 20), this.handle.setAttribute("fill", "none"), this.handle2.setAttribute("d", a), this.handle2.setAttribute("stroke-width", e / 20), this.handle2.setAttribute("fill", "none"), l += " L " + t.x + " " + t.y, this.handleFill.setAttribute("d", l), this.handleFill.setAttribute("fill-opacity", "0.3"), a += " L " + t.x + " " + t.y, this.handle2Fill.setAttribute("d", a), this.handle2Fill.setAttribute("fill-opacity", "0.3");
    let o;
    i < 0.5 ? o = s.end : o = n.end;
    let u = t.x + Math.cos(o) * (e / 2), d = t.y + Math.sin(o) * (e / 2) * -1;
    this.handleLine.setAttribute("d", "M " + t.x + " " + t.y + " L " + u + " " + d), this.handleLine.setAttribute("stroke-width", e / 20);
  }
  colorInterface() {
    this.background.setAttribute("fill", this.colors.fill), this.screw.setAttribute("fill", this.colors.accent), this.handle.setAttribute("stroke", this.colors.accent), this.handle2.setAttribute("stroke", this.colors.accent), this.handleFill.setAttribute("fill", this.colors.accent), this.handle2Fill.setAttribute("fill", this.colors.accent), this.handleLine.setAttribute("stroke", this.colors.accent);
  }
  render() {
    let t = this._value.normalized, e = {
      x: this.width / 2,
      y: this.height / 2
    }, i = Math.min(this.width, this.height), s = {
      start: Math.PI * 1.5,
      end: r.clip(r.scale(t, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
    }, n = {
      start: Math.PI * 2.5,
      end: r.clip(r.scale(t, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
    }, l = c.arc(e.x, e.y, i / 2 - i / 40, s.start, s.end), a = c.arc(e.x, e.y, i / 2 - i / 40, n.start, n.end);
    this.handle.setAttribute("d", l), this.handle2.setAttribute("d", a), l += " L " + e.x + " " + e.y, this.handleFill.setAttribute("d", l), a += " L " + e.x + " " + e.y, this.handle2Fill.setAttribute("d", a);
    let o;
    t <= 0.5 ? o = s.end : o = n.end;
    let u = e.x + Math.cos(o) * (i / 2), d = e.y + Math.sin(o) * (i / 2) * -1;
    this.handleLine.setAttribute("d", "M " + e.x + " " + e.y + " L " + u + " " + d);
  }
  click() {
    this.mode === "relative" && (this.previousAngle = !1), this.position.anchor = this.mouse, this.position.value = this._value.normalized, this.move();
  }
  move() {
    if (this.clicked) {
      this.position.update(this.mouse);
      let t = this.position.value * Math.PI * 2;
      t < 0 && (t += Math.PI * 2), this.mode === "relative" && this.position.direction === "radial" && this.previousAngle !== !1 && Math.abs(this.previousAngle - t) > 2 && (this.previousAngle > 3 ? t = Math.PI * 2 : t = 0), this.previousAngle = t;
      let e = t / (Math.PI * 2);
      this.value = this._value.updateNormal(e), this.mode === "relative" && (this.position.value = e), this.emit("change", this._value.value), this.render();
    }
  }
  release() {
  }
  /*
    Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
    @type {number}
    @example dial.value = 10;
  
    get value() {
      return this._value.value;
    }
  
    set value(value) {
      this._value.update(value);
      this.emit('change',this.value);
      this.render();
    }
  */
  /**
  Dial's value. When set, it will automatically be adjust to fit min/max/step settings of the interface.
  @type {number}
  @example dial.value = 10;
  */
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.update(t), this.position.value = this._value.normalized, this.emit("change", this._value.value), this.render();
  }
  /**
  Lower limit of the dial's output range
  @type {number}
  @example dial.min = 1000;
  */
  get min() {
    return this._value.min;
  }
  set min(t) {
    this._value.min = t;
  }
  /**
  Upper limit of the dial's output range
  @type {number}
  @example dial.max = 1000;
  */
  get max() {
    return this._value.max;
  }
  set max(t) {
    this._value.max = t;
  }
  /**
  The increment that the dial's value changes by.
  @type {number}
  @example dial.step = 5;
  */
  get step() {
    return this._value.step;
  }
  set step(t) {
    this._value.step = t;
  }
  /**
  Absolute mode (dial's value jumps to mouse click position) or relative mode (mouse drag changes value relative to its current position). Default: "relative".
  @type {string}
  @example dial.mode = "relative";
  */
  get mode() {
    return this.position.mode;
  }
  set mode(t) {
    this.position.mode = t;
  }
  /**
  Normalized value of the dial.
  @type {number}
  @example dial.normalized = 0.5;
  */
  get normalized() {
    return this._value.normalized;
  }
  set normalized(t) {
    this._value.updateNormal(t), this.emit("change", this.value);
  }
}
class vt extends w {
  constructor() {
    let t = ["value", "note", "color"], e = {
      size: [80, 80],
      target: !1,
      mode: "button",
      value: 0
    };
    super(arguments, t, e), this.note = this.settings.note, this.color = this.settings.color, this.colors = {
      w: "#fff",
      b: "#666"
    }, this.init(), this.render();
  }
  buildFrame() {
    this.element = c.create("svg"), this.element.setAttribute("width", this.width), this.element.setAttribute("height", this.height), this.parent.appendChild(this.element);
  }
  buildInterface() {
    this.pad = c.create("rect"), this.element.appendChild(this.pad), this.interactionTarget = this.pad, v.exists || (this.click = () => {
      this.piano.interacting = !0, this.piano.paintbrush = !this.state, this.down(this.piano.paintbrush);
    }, this.pad.addEventListener("mouseover", () => {
      this.piano.interacting && this.down(this.piano.paintbrush);
    }), this.move = () => {
      this.piano.interacting && this.bend();
    }, this.release = () => {
      this.piano.interacting = !1;
    }, this.pad.addEventListener("mouseup", () => {
      this.piano.interacting && this.up();
    }), this.pad.addEventListener("mouseout", () => {
      this.piano.interacting && this.up();
    }));
  }
  sizeInterface() {
    let t = 0;
    this.pad.setAttribute("x", 0.5), this.pad.setAttribute("y", 0.5), this.width > 2 ? this.pad.setAttribute("width", this.width - 1) : this.pad.setAttribute("width", this.width), this.height > 2 ? this.pad.setAttribute("height", this.height) : this.pad.setAttribute("height", this.height), this.pad.setAttribute("rx", t), this.pad.setAttribute("ry", t);
  }
  render() {
    this.state ? this.pad.setAttribute("fill", this.colors.accent) : this.pad.setAttribute("fill", this.colors[this.color]);
  }
}
class xt extends m {
  constructor() {
    let t = ["value"], e = {
      size: [500, 125],
      lowNote: 24,
      highNote: 60,
      mode: "button"
    };
    super(arguments, t, e), this.keyPattern = ["w", "b", "w", "b", "w", "w", "b", "w", "b", "w", "b", "w"], this.paintbrush = !1, this.mode = this.settings.mode, this.range = {
      low: this.settings.lowNote,
      high: this.settings.highNote
    }, this.range.size = this.range.high - this.range.low + 1, this.keys = [], this.toggleTo = !1, this.init(), this.render();
  }
  buildFrame() {
    this.element = document.createElement("div"), this.element.style.position = "relative", this.element.style.borderRadius = "0px", this.element.style.display = "block", this.element.style.width = "100%", this.element.style.height = "100%", this.parent.appendChild(this.element);
  }
  buildInterface() {
    this.keys = [];
    for (let t = 0; t < this.range.size; t++) {
      let e = document.createElement("span"), i = (t + this.range.low) % this.keyPattern.length, s = new vt(e, {
        component: !0,
        note: t + this.range.low,
        color: this.keyPattern[i],
        mode: this.mode
      }, this.keyChange.bind(this, t + this.range.low));
      s.piano = this, v.exists && (s.pad.index = t, s.preClick = s.preMove = s.preRelease = () => {
      }, s.click = s.move = s.release = () => {
      }, s.preTouch = s.preTouchMove = s.preTouchRelease = () => {
      }, s.touch = s.touchMove = s.touchRelease = () => {
      }), this.keys.push(s), this.element.appendChild(e);
    }
    v.exists && this.addTouchListeners();
  }
  sizeInterface() {
    let t = 0, e = [];
    for (let a = 0; a < this.range.size; a++) {
      e.push(t);
      let o = (a + this.range.low) % this.keyPattern.length, u = (a + 1 + this.range.low) % this.keyPattern.length;
      a + 1 + this.range.low >= this.range.high || this.keyPattern[o] === "w" && this.keyPattern[u] === "w" ? t += 1 : t += 0.5;
    }
    let i = t, s = 1, n = (this.width - s * 2) / i, l = (this.height - s * 2) / 2;
    for (let a = 0; a < this.keys.length; a++) {
      let o = this.keys[a].parent;
      o.style.position = "absolute", o.style.left = e[a] * n + s + "px", this.keys[a].color === "w" ? (o.style.top = s + "px", this.keys[a].resize(n, l * 2)) : (o.style.zIndex = 1, o.style.top = s + "px", this.keys[a].resize(n, l * 1.1));
    }
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.mediumLight;
    for (let t = 0; t < this.keys.length; t++)
      this.keys[t].colors = {
        w: this.colors.light,
        b: this.colors.dark,
        accent: this.colors.accent,
        border: this.colors.mediumLight
      }, this.keys[t].colorInterface(), this.keys[t].render();
  }
  keyChange(t, e) {
    var i = {
      note: t
    };
    typeof e == "object" ? i.state = e.state : i.state = e, this.emit("change", i);
  }
  /* drag(note,on) {
    this.emit('change',{
      note: note,
      state: on
    });
  } */
  render() {
  }
  addTouchListeners() {
    this.preClick = this.preMove = this.preRelease = () => {
    }, this.click = this.move = this.release = () => {
    }, this.preTouch = this.preTouchMove = this.preTouchRelease = () => {
    }, this.touch = this.touchMove = this.touchRelease = () => {
    };
    const t = {}, e = this.keys;
    function i(a) {
      return { identifier: a.identifier, clientX: a.clientX, clientY: a.clientY };
    }
    function s() {
      const a = {};
      Object.keys(t).forEach((o) => {
        const u = t[o], d = document.elementFromPoint(u.clientX, u.clientY);
        let f = d ? e[d.index] : null;
        f ? (a[d.index] = o, f.state || f.down()) : delete t[o];
      }), e.forEach((o) => {
        o.state && !a[o.pad.index] && o.up();
      });
    }
    function n(a) {
      a.preventDefault(), a.stopPropagation();
      for (let o = 0; o < a.changedTouches.length; o++) {
        const u = a.changedTouches[o];
        t[u.identifier] = i(u);
      }
      s();
    }
    function l(a) {
      a.preventDefault(), a.stopPropagation();
      for (let o = 0; o < a.changedTouches.length; o++) {
        const u = a.changedTouches[o];
        delete t[u.identifier];
      }
      s();
    }
    this.element.addEventListener("touchstart", n), this.element.addEventListener("touchmove", n), this.element.addEventListener("touchend", l);
  }
  /**
  Define the pitch range (lowest and highest note) of the piano keyboard.
  @param low {number} MIDI note value of the lowest note on the keyboard
  @param high {number} MIDI note value of the highest note on the keyboard
  */
  setRange(t, e) {
    this.range.low = t, this.range.high = e, this.empty(), this.buildInterface();
  }
  /**
  Turn a key on or off using its MIDI note value;
  @param note {number} MIDI note value of the key to change
  @param on {boolean} Whether the note should turn on or off
  */
  toggleKey(t, e) {
    this.keys[t - this.range.low].flip(e);
  }
  /**
  Turn a key on or off using its key index on the piano interface.
  @param index {number} Index of the key to change
  @param on {boolean} Whether the note should turn on or off
  */
  toggleIndex(t, e) {
    this.keys[t].flip(e);
  }
}
class M {
  constructor(t = 0, e = 9, i = 0, s = 1, n = !1) {
    this.min = t, this.max = e, this.value = i, this.increment = s, this.loop = n;
  }
  next() {
    return this.value += r.pick(-1 * this.increment, this.increment), this.value > this.max && (this.loop ? this.value = this.min : this.value = this.max - this.increment), this.value < this.min && (this.loop ? this.value = this.max : this.value = this.min + this.increment), this.value;
  }
}
class k {
  constructor(t = [0, 10, 20, 30], e = "up", i = !1) {
    this.values = t, Array.isArray(this.values) || (this.values = [this.values]), this._mode = e, this.position = i, this.drunkWalk = new M(0, this.values.length - 1), this.startValues = {
      up: 0,
      down: this.values.length - 1,
      drunk: ~~(this.values.length / 2),
      random: r.ri(this.values.length)
    }, this.position !== !1 ? this.next = this[this._mode] : this.next = this.first;
  }
  get mode() {
    return this._mode;
  }
  set mode(t) {
    if (!(t === "up" || t === "down" || t === "random" || t === "drunk")) {
      console.error("The only modes currently allowed are: up, down, random, drunk");
      return;
    }
    this._mode = t, this.position && (this.next = this[this._mode]);
  }
  get value() {
    return this.values[this.position];
  }
  set value(t) {
    this.position = this.values.indexOf(t);
  }
  first() {
    return this.position !== !1 ? (this.next = this[this._mode], this.next()) : (this.position = this.startValues[this._mode], this.next = this[this._mode], this.value);
  }
  up() {
    return this.position++, this.position %= this.values.length, this.value;
  }
  down() {
    return this.position--, this.position < 0 && (this.position = (this.position + this.values.length) % this.values.length), this.value;
  }
  random() {
    return this.position = r.ri(0, this.values.length), this.value;
  }
  drunk() {
    return this.drunkWalk.max = this.values.length, this.drunkWalk.value = this.position, this.position = this.drunkWalk.next(), this.value;
  }
  /* future methods
  .group(start,stop) -- outputs a group of n items from the list, with wrapping
  .loop(start,stop) -- confines sequencing to a subset of the values
      (could even have a distinction between .originalValues and the array of values being used)
  */
}
class D {
  constructor(t, e) {
    this.pattern = [], this.create(t, e), this.toggle = {
      cell: (i, s) => (this.pattern[s][i] = !this.pattern[s][i], this.ui && this.ui.update(), this.pattern[s][i]),
      all: () => {
        this.iterate((i, s) => {
          this.toggle.cell(s, i);
        }), this.ui && this.ui.update();
      },
      row: (i) => {
        for (let s = 0; s < this.columns; s++)
          this.toggle.cell(s, i);
        this.ui && this.ui.update();
      },
      column: (i) => {
        for (let s = 0; s < this.rows; s++)
          this.toggle.cell(i, s);
        this.ui && this.ui.update();
      }
    }, this.set = {
      cell: (i, s, n) => {
        this.pattern[s][i] = n, this.ui && this.ui.update();
      },
      all: (i) => {
        this.pattern = i, this.ui && this.ui.update();
      },
      row: (i, s) => {
        this.pattern[i] = s, this.ui && this.ui.update();
      },
      column: (i, s) => {
        this.pattern.forEach((n, l) => {
          this.pattern[l][i] = s[l];
        }), this.ui && this.ui.update();
      }
    }, this.rotate = {
      //should eventually do (amountX, amountY) here
      // could just use a loop and this.rotate.row(i,amountX);
      all: (i) => {
        !i && i !== 0 && (i = 1), i %= this.pattern[0].length, i < 0 && (i = this.pattern[0].length + i);
        for (let s = 0; s < this.rows; s++) {
          let n = this.pattern[s].splice(this.pattern[s].length - i, i);
          this.pattern[s] = n.concat(this.pattern[s]);
        }
        this.ui && this.ui.update();
      },
      row: (i, s) => {
        !s && s !== 0 && (s = 1), s %= this.pattern[0].length, s < 0 && (s = this.pattern[0].length + s);
        let n = this.pattern[i].splice(this.pattern[i].length - s, s);
        this.pattern[i] = n.concat(this.pattern[i]), this.ui && this.ui.update();
      },
      column: (i, s) => {
        !s && s !== 0 && (s = 1), s %= this.pattern.length, s < 0 && (s = this.pattern.length + s);
        let n = [];
        this.pattern.forEach((a) => {
          n.push(a[i]);
        }), n = n.splice(n.length - s, s).concat(n), this.pattern.forEach((a, o) => {
          a[i] = n[o];
        }), this.ui && this.ui.update();
      }
    }, this.populate = {
      all: (i) => {
        let s = new k(i);
        this.iterate((n, l) => {
          this.pattern[n][l] = r.coin(s.next());
        }), this.ui && this.ui.update();
      },
      row: (i = 0, s = 1) => {
        let n = new k(s);
        this.pattern[i].forEach((l, a) => {
          this.pattern[i][a] = r.coin(n.next());
        }), this.ui && this.ui.update();
      },
      column: (i = 0, s = 1) => {
        let n = new k(s);
        this.pattern.forEach((l, a) => {
          this.pattern[a][i] = r.coin(n.next());
        }), this.ui && this.ui.update();
      }
    }, this.erase = {
      all: () => {
        this.set.all(0);
      },
      row: (i) => {
        this.set.row(i, 0);
      },
      column: (i) => {
        this.set.column(i, 0);
      }
    };
  }
  create(t, e) {
    this.pattern = [];
    for (let i = 0; i < t; i++) {
      let s = new Array(e);
      this.pattern.push(s);
    }
    this.iterate((i, s) => {
      this.pattern[i][s] = !1;
    });
  }
  iterate(t, e) {
    let i = 0;
    for (let s = 0; s < this.rows; s++) {
      e && e(s);
      for (let n = 0; n < this.columns; n++)
        t(s, n, i), i++;
    }
  }
  formatAsText() {
    let t = "";
    return this.iterate(
      (e, i) => {
        t += (this.pattern[e][i] ? 1 : 0) + " ";
      },
      () => {
        t += `
`;
      }
    ), t;
  }
  log() {
    console.log(this.formatAsText());
  }
  update(t) {
    this.pattern = t || this.pattern;
  }
  get length() {
    return this.rows * this.columns;
  }
  locate(t) {
    return {
      row: ~~(t / this.columns),
      column: t % this.columns
    };
  }
  indexOf(t, e) {
    return e + t * this.columns;
  }
  row(t) {
    let e = [];
    for (let i = 0; i < this.columns; i++)
      e.push(this.pattern[t] ? 1 : 0);
    return e;
  }
  column(t) {
    let e = [];
    for (let i = 0; i < this.rows; i++)
      e.push(this.pattern[i][t] ? 1 : 0);
    return e;
  }
  get rows() {
    return this.pattern.length;
  }
  set rows(t) {
    let e = this.pattern.slice(0);
    this.create(t, this.columns), this.iterate((i, s) => {
      e[i] && e[i][s] && (this.pattern[i][s] = e[i][s]);
    });
  }
  get columns() {
    return this.pattern[0].length;
  }
  set columns(t) {
    let e = this.pattern.slice(0);
    this.create(this.rows, t), this.iterate((i, s) => {
      e[i] && e[i][s] && (this.pattern[i][s] = e[i][s]);
    });
  }
}
class R {
  constructor(t = 0, e = 10, i = "up", s = !1) {
    this.min = t, this.max = e, this.value = s, this.mode = i, this.drunkWalk = new M(this.min, this.max), this.value !== !1 ? this.next = this[this._mode] : this.next = this.first;
  }
  set mode(t) {
    if (!(t === "up" || t === "down" || t === "random" || t === "drunk")) {
      console.error("The only modes currently allowed are: up, down, random, drunk");
      return;
    }
    this._mode = t, this.value && (this.next = this[this._mode]);
  }
  get mode() {
    return this._mode;
  }
  first() {
    return this.value !== !1 ? (this.next = this[this._mode], this.next()) : (this.startValues = {
      up: this.min,
      down: this.max,
      drunk: ~~r.average(this.min, this.max),
      random: r.ri(this.min, this.max)
    }, this.value = this.startValues[this._mode], this.next = this[this._mode], this.value);
  }
  up() {
    return this.value++, this.value >= this.max && (this.value = this.min), this.value;
  }
  down() {
    return this.value--, this.value < this.min && (this.value = this.max), this.value;
  }
  random() {
    return this.value = r.ri(this.min, this.max), this.value;
  }
  drunk() {
    return this.drunkWalk.min = this.min, this.drunkWalk.max = this.max, this.drunkWalk.value = this.value, this.value = this.drunkWalk.next(), this.value;
  }
}
class X {
  constructor(t, e, i) {
    this.rate = t, this.on = i, this.clock = Xt(), this.pattern = [1], this.index = 0, this.event = e || function() {
    }, this.on && this.start();
  }
  _event(t) {
    this.event(t), this.index++;
  }
  stop() {
    this.on = !1, this.interval.clear();
  }
  start() {
    this.on = !0, this.interval = this.clock.callbackAtTime(this._event.bind(this), this.clock.context.currentTime).repeat(this.rate / 1e3).tolerance({ early: 0.1, late: 1 });
  }
  ms(t) {
    if (this.on) {
      var e = t / this.rate;
      this.rate = t, this.clock.timeStretch(this.clock.context.currentTime, [this.interval], e);
    } else
      this.rate = t;
  }
}
class yt extends w {
  constructor() {
    let t = ["value"], e = {
      size: [80, 80],
      target: !1,
      mode: "toggle",
      value: 0,
      paddingRow: 2,
      paddingColumn: 2
    };
    super(arguments, t, e), this.index = this.settings.index, this.row = this.settings.row, this.column = this.settings.column, this.matrix = this.settings.matrix, this.paddingRow = this.settings.paddingRow || e.paddingRow, this.paddingColumn = this.settings.paddingColumn || e.paddingColumn, this.interacting = !1, this.paintbrush = !1, this.init(), this.render();
  }
  buildFrame() {
    this.element = c.create("svg"), this.element.setAttribute("width", this.width), this.element.setAttribute("height", this.height), this.element.style.top = "0px", this.element.style.left = "0px", this.element.style.position = "absolute", this.parent.appendChild(this.element);
  }
  buildInterface() {
    this.pad = c.create("rect"), this.element.appendChild(this.pad), this.interactionTarget = this.pad, v.exists || (this.click = () => {
      this.matrix.interacting = !0, this.matrix.paintbrush = !this.state, this.down(this.matrix.paintbrush);
    }, this.pad.addEventListener("mouseover", () => {
      this.matrix.interacting && this.down(this.matrix.paintbrush);
    }), this.move = () => {
    }, this.pad.addEventListener("mousemove", (t) => {
      this.matrix.interacting && (this.offset || (this.offset = p.findPosition(this.element)), this.mouse = p.locateMouse(t, this.offset), this.bend());
    }), this.release = () => {
      this.matrix.interacting = !1;
    }, this.pad.addEventListener("mouseup", () => {
      this.matrix.interacting && this.up();
    }), this.pad.addEventListener("mouseout", () => {
      this.matrix.interacting && this.up();
    }));
  }
  sizeInterface() {
    this.pad.setAttribute("x", this.paddingColumn / 2), this.pad.setAttribute("y", this.paddingRow / 2), this.width > 2 ? this.pad.setAttribute("width", this.width - this.paddingColumn) : this.pad.setAttribute("width", this.width), this.height > 2 ? this.pad.setAttribute("height", this.height - this.paddingRow) : this.pad.setAttribute("height", this.height), this.pad.setAttribute("fill", this.matrix.colors.fill);
  }
  render() {
    this.state ? this.pad.setAttribute("fill", this.matrix.colors.accent) : this.pad.setAttribute("fill", this.matrix.colors.fill);
  }
}
class kt extends m {
  constructor() {
    let t = ["value"], e = {
      size: [400, 200],
      mode: "toggle",
      rows: 5,
      columns: 10
    };
    super(arguments, t, e), this.active = -1, this.mode = this.settings.mode, this.interval = new X(200, function() {
    }, !1), this.matrix = new D(this.settings.rows, this.settings.columns), this.matrix.ui = this, this.stepper = new R(0, this.columns), this.paddingRow = this.settings.paddingRow, this.paddingColumn = this.settings.paddingColumn, this.init();
  }
  buildFrame() {
    this.element = document.createElement("div"), this.element.style.position = "relative", this.element.style.display = "block", this.element.style.width = "100%", this.element.style.height = "100%", this.parent.appendChild(this.element), v.exists && this.addTouchListeners();
  }
  buildInterface() {
    this.cells = [];
    for (let t = 0; t < this.matrix.length; t++) {
      let e = this.matrix.locate(t), i = document.createElement("span");
      i.style.position = "absolute";
      let s = new yt(
        i,
        {
          component: !0,
          index: t,
          row: e.row,
          column: e.column,
          mode: this.mode,
          matrix: this,
          paddingRow: this.paddingRow,
          paddingColumn: this.paddingColumn
        },
        this.keyChange.bind(this, t)
      );
      v.exists && (s.pad.index = t, s.preClick = s.preMove = s.preRelease = () => {
      }, s.click = s.move = s.release = () => {
      }, s.preTouch = s.preTouchMove = s.preTouchRelease = () => {
      }, s.touch = s.touchMove = s.touchRelease = () => {
      }), this.cells.push(s), this.element.appendChild(i);
    }
    this.sizeInterface();
  }
  sizeInterface() {
    let t = this.width / this.columns, e = this.height / this.rows;
    for (let i = 0; i < this.cells.length; i++) {
      let s = this.cells[i].parent;
      s.style.left = this.cells[i].column * t + "px", s.style.top = this.cells[i].row * e + "px", this.cells[i].resize(t, e);
    }
  }
  colorInterface() {
    for (var t = 0; t < this.cells.length; t++)
      this.cells[t].render();
  }
  update() {
    this.matrix.iterate((t, e, i) => {
      this.matrix.pattern[t][e] !== this.cells[i].state && (this.matrix.pattern[t][e] > 0 ? this.cells[i].turnOn() : this.cells[i].turnOff());
    });
  }
  // update => cell.turnOn => cell.emit => keyChange (seq.emit) => matrix.set.cell => update
  //
  // interaction => keyChange => matrix.set.cell => update => cell.turnOn
  //                                             => emit
  //
  // set.cell => update => needs to emit.
  keyChange(t, e) {
    let i = this.matrix.locate(t);
    this.matrix.pattern[i.row][i.column] = e;
    var s = {
      row: i.row,
      column: i.column,
      state: e
    };
    this.emit("change", s);
  }
  render() {
    this.stepper.value >= 0 && this.matrix.iterate((t, e, i) => {
      e === this.stepper.value ? (this.cells[i].pad.setAttribute("stroke", this.colors.mediumLight), this.cells[i].pad.setAttribute("stroke-width", "1"), this.cells[i].pad.setAttribute("stroke-opacity", "1")) : this.cells[i].pad.setAttribute("stroke", "none");
    });
  }
  /**
   * Start sequencing
   * @param  {number} ms Beat tempo in milliseconds
   */
  start(t) {
    this.interval.event = this.next.bind(this), t && this.interval.ms(t), this.interval.start();
  }
  /**
  Stop sequencing
  */
  stop() {
    this.interval.stop();
  }
  /**
  Manually jump to the next column and trigger the 'change' event. The "next" column is determined by your mode of sequencing.
  */
  next() {
    this.stepper.next(), this.emit("step", this.matrix.column(this.stepper.value).reverse()), this.render();
  }
  addTouchListeners() {
    this.preClick = this.preMove = this.preRelease = () => {
    }, this.click = this.move = this.release = () => {
    }, this.preTouch = this.preTouchMove = this.preTouchRelease = () => {
    }, this.touch = this.touchMove = this.touchRelease = () => {
    }, this.currentElement = !1, this.element.addEventListener("touchstart", (t) => {
      let e = document.elementFromPoint(
        t.targetTouches[0].clientX,
        t.targetTouches[0].clientY
      ), i = this.cells[e.index];
      this.paintbrush = !i.state, i.down(this.paintbrush), this.currentElement = e.index, t.preventDefault(), t.stopPropagation();
    }), this.element.addEventListener("touchmove", (t) => {
      let e = document.elementFromPoint(
        t.targetTouches[0].clientX,
        t.targetTouches[0].clientY
      ), i = this.cells[e.index];
      e.index !== this.currentElement ? (this.currentElement >= 0 && this.cells[this.currentElement].up(), i.down(this.paintbrush)) : i.bend(), this.currentElement = e.index, t.preventDefault(), t.stopPropagation();
    }), this.element.addEventListener("touchend", (t) => {
      this.cells[this.currentElement].up(), this.interacting = !1, this.currentElement = !1, t.preventDefault(), t.stopPropagation();
    });
  }
  /**
  Number of rows in the sequencer
  @type {number}
  */
  get rows() {
    return this.matrix.rows;
  }
  set rows(t) {
    this.matrix.rows = t, this.empty(), this.buildInterface(), this.update();
  }
  /**
  Number of columns in the sequencer
  @type {number}
  */
  get columns() {
    return this.matrix.columns;
  }
  set columns(t) {
    this.matrix.columns = t, this.stepper.max = t, this.empty(), this.buildInterface(), this.update();
  }
}
class wt extends m {
  constructor() {
    let t = ["range"], e = {
      size: [200, 200],
      range: 0.5,
      mode: "absolute",
      speakers: [
        [0.5, 0.2],
        [0.75, 0.25],
        [0.8, 0.5],
        [0.75, 0.75],
        [0.5, 0.8],
        [0.25, 0.75],
        [0.2, 0.5],
        [0.25, 0.25]
      ]
    };
    super(arguments, t, e), this.value = {
      x: new g(0, 1, 0, 0.5),
      y: new g(0, 1, 0, 0.5)
    }, this.mode = this.settings.mode, this.position = {
      x: new x(this.mode, "horizontal", [0, this.width], [this.height, 0]),
      y: new x(this.mode, "vertical", [0, this.width], [this.height, 0])
    }, this.position.x.value = this.value.x.normalized, this.position.y.value = this.value.y.normalized, this.speakers = this.settings.speakers, this.range = this.settings.range, this.levels = [], this.init(), this.calculateLevels(), this.render();
  }
  buildInterface() {
    this.knob = c.create("circle"), this.element.appendChild(this.knob), this.speakerElements = [];
    for (let t = 0; t < this.speakers.length; t++) {
      let e = c.create("circle");
      this.element.appendChild(e), this.speakerElements.push(e);
    }
  }
  sizeInterface() {
    this._minDimension = Math.min(this.width, this.height), this.knobRadius = {
      off: ~~(this._minDimension / 100) * 3 + 5
    }, this.knobRadius.on = this.knobRadius.off * 2, this.knob.setAttribute("cx", this.width / 2), this.knob.setAttribute("cy", this.height / 2), this.knob.setAttribute("r", this.knobRadius.off);
    for (let t = 0; t < this.speakers.length; t++) {
      let e = this.speakerElements[t], i = this.speakers[t];
      e.setAttribute("cx", i[0] * this.width), e.setAttribute("cy", i[1] * this.height), e.setAttribute("r", this._minDimension / 20 + 5), e.setAttribute("fill-opacity", "0");
    }
    this.position.x.resize([0, this.width], [this.height, 0]), this.position.y.resize([0, this.width], [this.height, 0]), this.calculateLevels(), this.render();
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this.knob.setAttribute("fill", this.colors.mediumLight);
    for (let t = 0; t < this.speakers.length; t++) {
      let e = this.speakerElements[t];
      e.setAttribute("fill", this.colors.accent), e.setAttribute("stroke", this.colors.accent);
    }
  }
  render() {
    this.knobCoordinates = {
      x: this.value.x.normalized * this.width,
      y: this.height - this.value.y.normalized * this.height
    }, this.knob.setAttribute("cx", this.knobCoordinates.x), this.knob.setAttribute("cy", this.knobCoordinates.y);
  }
  click() {
    this.position.x.anchor = this.mouse, this.position.y.anchor = this.mouse, this.move();
  }
  move() {
    this.clicked && (this.position.x.update(this.mouse), this.position.y.update(this.mouse), this.calculateLevels(), this.emit("change", this.levels), this.render());
  }
  release() {
    this.render();
  }
  get normalized() {
    return {
      x: this.value.x.normalized,
      y: this.value.y.normalized
    };
  }
  calculateLevels() {
    this.value.x.updateNormal(this.position.x.value), this.value.y.updateNormal(this.position.y.value), this.levels = [], this.speakers.forEach((t, e) => {
      let i = r.distance(t[0] * this.width, t[1] * this.height, this.position.x.value * this.width, (1 - this.position.y.value) * this.height), s = r.clip(1 - i / (this.range * this.width), 0, 1);
      this.levels.push(s), this.speakerElements[e].setAttribute("fill-opacity", s);
    });
  }
  /**
  Move the audio source node and trigger the output event.
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  moveSource(t, e) {
    let i = {
      x: t * this.width,
      y: e * this.height
    };
    this.position.x.update(i), this.position.y.update(i), this.calculateLevels(), this.emit("change", this.levels), this.render();
  }
  /**
  Move a speaker node and trigger the output event.
  @param index {number} Index of the speaker to move
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  moveSpeaker(t, e, i) {
    this.speakers[t] = [e, i], this.speakerElements[t].setAttribute("cx", e * this.width), this.speakerElements[t].setAttribute("cy", i * this.height), this.calculateLevels(), this.emit("change", this.levels), this.render();
  }
  /**
    Set all speaker locations
    @param locations {Array} Array of speaker locations. Each item in the array should be an array of normalized x and y coordinates.
  
    setSpeakers(locations) {
  
    }
    */
}
class At extends m {
  constructor() {
    let t = ["value"], e = {
      size: [80, 80]
    };
    super(arguments, t, e), this._active = !0, this.init(), this.boundUpdate = this.update.bind(this), window.DeviceOrientationEvent ? this.orientationListener = window.addEventListener("deviceorientation", this.boundUpdate, !1) : (this._active = !1, this.colorInterface());
  }
  buildInterface() {
    this.title = c.create("text"), this.circleX = c.create("circle"), this.circleY = c.create("circle"), this.circleZ = c.create("circle"), this.barX = c.create("path"), this.barY = c.create("path"), this.barZ = c.create("path"), this.barX2 = c.create("path"), this.barY2 = c.create("path"), this.barZ2 = c.create("path"), this.barX.setAttribute("opacity", "0.8"), this.barY.setAttribute("opacity", "0.8"), this.barZ.setAttribute("opacity", "0.8"), this.barX2.setAttribute("opacity", "0.8"), this.barY2.setAttribute("opacity", "0.8"), this.barZ2.setAttribute("opacity", "0.8"), this.circleX.setAttribute("cx", this.width * 3 / 12), this.circleX.setAttribute("cy", this.height * 3 / 4), this.circleX.setAttribute("r", this.height / 10), this.circleX.setAttribute("opacity", "0.4"), this.circleY.setAttribute("cx", this.width * 6 / 12), this.circleY.setAttribute("cy", this.height * 3 / 4), this.circleY.setAttribute("r", this.height / 10), this.circleY.setAttribute("opacity", "0.4"), this.circleZ.setAttribute("cx", this.width * 9 / 12), this.circleZ.setAttribute("cy", this.height * 3 / 4), this.circleZ.setAttribute("r", this.height / 10), this.circleZ.setAttribute("opacity", "0.4"), this.barX.setAttribute("stroke-width", Math.round(this.height / 30)), this.barY.setAttribute("stroke-width", Math.round(this.height / 30)), this.barZ.setAttribute("stroke-width", Math.round(this.height / 30)), this.barX.setAttribute("fill", "none"), this.barY.setAttribute("fill", "none"), this.barZ.setAttribute("fill", "none"), this.barX2.setAttribute("stroke-width", Math.round(this.height / 30)), this.barY2.setAttribute("stroke-width", Math.round(this.height / 30)), this.barZ2.setAttribute("stroke-width", Math.round(this.height / 30)), this.barX2.setAttribute("fill", "none"), this.barY2.setAttribute("fill", "none"), this.barZ2.setAttribute("fill", "none"), this.title.setAttribute("x", this.width / 2), this.title.setAttribute("y", this.height / 3 + 7), this.title.setAttribute("font-size", "15px"), this.title.setAttribute("font-weight", "bold"), this.title.setAttribute("letter-spacing", "2px"), this.title.setAttribute("opacity", "0.7"), this.title.setAttribute("text-anchor", "middle"), this.title.textContent = "TILT", this.element.appendChild(this.circleX), this.element.appendChild(this.circleY), this.element.appendChild(this.circleZ), this.element.appendChild(this.barX), this.element.appendChild(this.barY), this.element.appendChild(this.barZ), this.element.appendChild(this.barX2), this.element.appendChild(this.barY2), this.element.appendChild(this.barZ2), this.element.appendChild(this.title);
  }
  colorInterface() {
    this._active ? (this.element.style.backgroundColor = this.colors.accent, this.circleX.setAttribute("fill", this.colors.light), this.circleY.setAttribute("fill", this.colors.light), this.circleZ.setAttribute("fill", this.colors.light), this.circleX.setAttribute("stroke", this.colors.light), this.circleY.setAttribute("stroke", this.colors.light), this.circleZ.setAttribute("stroke", this.colors.light), this.barX.setAttribute("stroke", this.colors.light), this.barY.setAttribute("stroke", this.colors.light), this.barZ.setAttribute("stroke", this.colors.light), this.barX2.setAttribute("stroke", this.colors.light), this.barY2.setAttribute("stroke", this.colors.light), this.barZ2.setAttribute("stroke", this.colors.light), this.title.setAttribute("fill", this.colors.light)) : (this.element.style.backgroundColor = this.colors.fill, this.circleX.setAttribute("fill", this.colors.mediumLight), this.circleY.setAttribute("fill", this.colors.mediumLight), this.circleZ.setAttribute("fill", this.colors.mediumLight), this.circleX.setAttribute("stroke", this.colors.mediumLight), this.circleY.setAttribute("stroke", this.colors.mediumLight), this.circleZ.setAttribute("stroke", this.colors.mediumLight), this.barX.setAttribute("stroke", this.colors.mediumLight), this.barY.setAttribute("stroke", this.colors.mediumLight), this.barZ.setAttribute("stroke", this.colors.mediumLight), this.barX2.setAttribute("stroke", this.colors.mediumLight), this.barY2.setAttribute("stroke", this.colors.mediumLight), this.barZ2.setAttribute("stroke", this.colors.mediumLight), this.title.setAttribute("fill", this.colors.mediumLight));
  }
  update(t) {
    if (this._active) {
      let e = t.beta, i = t.gamma, s = t.alpha;
      i = r.scale(i, -90, 90, 0, 1), e = r.scale(e, -90, 90, 0, 1), s = r.scale(s, 0, 360, 0, 1);
      let n = {
        start: Math.PI * 1.5,
        end: r.clip(r.scale(i, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
      }, l = {
        start: Math.PI * 2.5,
        end: r.clip(r.scale(i, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
      }, a = c.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, n.start, n.end), o = c.arc(this.circleX.cx.baseVal.value, this.circleX.cy.baseVal.value, this.circleX.r.baseVal.value, l.start, l.end);
      this.barX.setAttribute("d", a), this.barX2.setAttribute("d", o), n = {
        start: Math.PI * 1.5,
        end: r.clip(r.scale(e, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
      }, l = {
        start: Math.PI * 2.5,
        end: r.clip(r.scale(e, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
      }, a = c.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, n.start, n.end), o = c.arc(this.circleY.cx.baseVal.value, this.circleY.cy.baseVal.value, this.circleY.r.baseVal.value, l.start, l.end), this.barY.setAttribute("d", a), this.barY2.setAttribute("d", o), n = {
        start: Math.PI * 1.5,
        end: r.clip(r.scale(s, 0, 0.5, Math.PI * 1.5, Math.PI * 0.5), Math.PI * 0.5, Math.PI * 1.5)
      }, l = {
        start: Math.PI * 2.5,
        end: r.clip(r.scale(s, 0.5, 1, Math.PI * 2.5, Math.PI * 1.5), Math.PI * 1.5, Math.PI * 2.5)
      }, a = c.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, n.start, n.end), o = c.arc(this.circleZ.cx.baseVal.value, this.circleZ.cy.baseVal.value, this.circleZ.r.baseVal.value, l.start, l.end), this.barZ.setAttribute("d", a), this.barZ2.setAttribute("d", o), this.emit("change", {
        x: i,
        y: e,
        z: s
      });
    }
  }
  click() {
    window.DeviceOrientationEvent && (this.active = !this.active);
  }
  /**
  Whether the interface is on (emitting values) or off (paused & not emitting values). Setting this property will update it.
  @type {boolean}
  */
  get active() {
    return this._active;
  }
  set active(t) {
    this._active = t, this.colorInterface();
  }
  customDestroy() {
    window.removeEventListener("deviceorientation", this.boundUpdate, !1);
  }
}
class _t extends m {
  constructor() {
    let t = ["value"], e = {
      size: [200, 100],
      numberOfSliders: 5,
      min: 0,
      max: 1,
      step: 0,
      candycane: 3,
      values: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
      smoothing: 0,
      mode: "bar"
      // 'bar', 'line'
    };
    super(arguments, t, e), this._numberOfSliders = this.settings.numberOfSliders, this._min = this.settings.min, this._max = this.settings.max, this._step = this.settings.step, this._mode = this.settings.mode;
    const i = this.settings.values;
    this.values = i.length > this._numberOfSliders ? i.slice(0, this._numberOfSliders) : i.concat(Array(this._numberOfSliders - i.length).fill(0)), this.candycane = this.settings.candycane, this.sliderWidth = this.width / this.values.length, this.smoothing = this.settings.smoothing, this.init(), this.render();
  }
  buildInterface() {
    this._mode == "line" ? (this.line = c.create("polyline"), this.line.setAttribute("stroke-width", 2), this.line.setAttribute("fill", "none"), this.element.appendChild(this.line), this.fill = c.create("polyline"), this.fill.setAttribute("fill-opacity", "0.2"), this.element.appendChild(this.fill), this.nodes = [], this.values.forEach(
      (function(t, e) {
        let i = c.create("circle");
        i.setAttribute("cx", this.getX(e)), i.setAttribute("cy", this.getY(t)), this.element.appendChild(i), this.nodes.push(i);
      }).bind(this)
    )) : (this.bars = [], this.caps = [], this.values.forEach(
      (function(t, e) {
        let i = c.create("rect"), s = this.getBarX(e), n = this.getY(t);
        i.setAttribute("x", s - 0.1), i.setAttribute("y", n), i.setAttribute("width", this.sliderWidth + 0.2), i.setAttribute("height", this.height), i.setAttribute(
          "opacity",
          1 - (e % this.candycane + 1) / (this.candycane + 1)
        ), this.element.appendChild(i), this.bars.push(i);
        let l = c.create("rect");
        l.setAttribute("x", s - 0.1), l.setAttribute("y", n), l.setAttribute("width", this.sliderWidth + 0.2), l.setAttribute("height", 5), this.element.appendChild(l), this.caps.push(l);
      }).bind(this)
    ));
  }
  getBarX(t) {
    return this.getX(t) - this.sliderWidth / 2;
  }
  getX(t) {
    return t * this.sliderWidth + this.sliderWidth / 2;
  }
  getY(t) {
    return r.scale(t, this._min, this._max, this.height, 0);
  }
  getValueFromY(t) {
    let e = r.scale(t, this.height, 0, this._min, this._max);
    return this.adjustValueToStep(e);
  }
  getIndexFromX(t) {
    return r.clip(
      Math.floor(t / this.width * this.values.length),
      0,
      this.values.length - 1
    );
  }
  adjustValueToStep(t) {
    if (!this._step)
      return t;
    let e = t % this._step;
    return t = t - t % this._step, e > this._step / 2 && (t += this._step), t;
  }
  adjustAllValues() {
    this.values.forEach(
      (function(t, e) {
        t = this.adjustValueToStep(t), this.values[e] = r.clip(t, this._min, this._max);
      }).bind(this)
    );
  }
  getNormalizedValues() {
    this.normalizedValues = [], this.values.forEach(
      (function(t) {
        this.normalizedValues.push(
          r.scale(t, this._min, this._max, 0, 1)
        );
      }).bind(this)
    );
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this._mode == "line" ? (this.line.setAttribute("stroke", this.colors.accent), this.fill.setAttribute("fill", this.colors.accent), this.nodes.forEach((t) => {
      t.setAttribute("fill", this.colors.accent);
    })) : (this.bars.forEach((t) => {
      t.setAttribute("fill", this.colors.accent);
    }), this.caps.forEach((t) => {
      t.setAttribute("fill", this.colors.accent);
    }));
  }
  sizeInterface() {
    this.sliderWidth = this.width / this.values.length, this._mode == "line" && this.nodes.forEach(
      (function(t) {
        let e = ~~(Math.min(this.width, this.height) / 50) + 2;
        e = Math.min(this.sliderWidth, e), t.setAttribute("r", e);
      }).bind(this)
    ), this.render();
  }
  render() {
    if (this._mode == "line") {
      let t = "0 " + this.getY(this.values[0]) + ", ";
      this.values.forEach((e, i) => {
        let s = this.getX(i), n = this.getY(e);
        t += s + " " + n + ", ", this.nodes[i].setAttribute("cx", this.getX(i)), this.nodes[i].setAttribute("cy", this.getY(e));
      }), t += this.width + " " + this.getY(this.values[this.values.length - 1]), this.line.setAttribute("points", t), t += ", " + this.width + " " + this.height + ", ", t += "0 " + this.height, this.fill.setAttribute("points", t);
    } else
      this.values.forEach((t, e) => {
        this.bars[e].setAttribute("y", this.getY(t)), this.caps[e].setAttribute("y", this.getY(t));
      });
  }
  click() {
    this.hasMoved = !1, this.previousSlider = !1, this.move();
  }
  move() {
    if (this.clicked) {
      if (this.mouse.x = r.clip(this.mouse.x, 0, this.width), this.mouse.y = r.clip(this.mouse.y, 0, this.height), this.hasMoved = !0, this.selectedSlider = this.getIndexFromX(this.mouse.x), this.values[this.selectedSlider] = this.getValueFromY(this.mouse.y), this.previousSlider !== !1) {
        let e = Math.abs(this.previousSlider - this.selectedSlider);
        if (e > 1) {
          let i = Math.min(this.previousSlider, this.selectedSlider), s = Math.max(this.previousSlider, this.selectedSlider), n = this.values[i], l = this.values[s];
          for (let a = i; a < s; a++)
            this.values[a] = r.interp(
              (a - i) / e,
              n,
              l
            ), this.values[a] = this.adjustValueToStep(this.values[a]);
        }
      }
      if (this.smoothing > 0)
        for (var t = 1; t <= this.smoothing; t++) {
          let e = this.selectedSlider - t, i = this.selectedSlider + t;
          if (e >= 1) {
            let s = e - 1 >= 0 ? e - 1 : 0, n = e + 1;
            this.values[e] = (this.values[s] + this.values[n]) / 2, this.values[e] = this.adjustValueToStep(
              this.values[e]
            );
          }
          if (i < this.values.length - 1) {
            let s = i - 1, n = i + 1 < this.values.length ? i + 1 : this.values.length - 1;
            this.values[i] = (this.values[s] + this.values[n]) / 2, this.values[i] = this.adjustValueToStep(
              this.values[i]
            );
          }
        }
      this.previousSlider = this.selectedSlider, this.emit("change", this.values), this.render();
    }
  }
  // would be a cool API call to have for later...
  scan() {
  }
  update(t, e) {
    this.values[t] = this.adjustValueToStep(e), this.emit("change", {
      index: t,
      value: e
    });
  }
  /**
  Get the number of sliders
  @type {Number}
  */
  get numberOfSliders() {
    return this.values.length;
  }
  /**
  Lower limit of the multislider's output range
  @type {number}
  @example multislider.min = 1000;
  */
  get min() {
    return this._min;
  }
  set min(t) {
    this._min = t, this.adjustAllValues(), this.render();
  }
  /**
  Upper limit of the multislider's output range
  @type {number}
  @example multislider.max = 1000;
  */
  get max() {
    return this._max;
  }
  set max(t) {
    this._max = t, this.adjustAllValues(), this.render();
  }
  /**
  The increment that the multislider's value changes by.
  @type {number}
  @example multislider.step = 5;
  */
  get step() {
    return this._step;
  }
  set step(t) {
    this._step = t, this.adjustAllValues(), this.render();
  }
  /**
  Set the value of an individual slider
  @param index {number} Slider index
  @param value {number} New slider value
  @example
  // Set the first slider to value 0.5
  multislider.setSlider(0,0.5)
  */
  setSlider(t, e) {
    this.values[t] = this.adjustValueToStep(e), this.values[t] = r.clip(this.values[t], this._min, this._max), this.emit("change", {
      index: t,
      value: e
    });
  }
  /**
  Set the value of all sliders at once. If the size of the input array does not match the current number of sliders, the value array will repeat until all sliders have been set. I.e. an input array of length 1 will set all sliders to that value.
  @param values {Array} All slider values
  @example
  multislider.setAllSliders([0.2,0.3,0.4,0.5,0.6])
  */
  setAllSliders(t) {
    let e = this.values.length, i = t.length;
    this.values = t, this.adjustAllValues(), e != i && (this.empty(), this.buildInterface(), this.colorInterface()), this.sizeInterface();
  }
}
class Mt extends m {
  constructor() {
    let t = ["scale", "value"], e = {
      size: [120, 20],
      orientation: "horizontal",
      mode: "relative",
      scale: [-1, 1],
      step: 0,
      value: 0,
      hasKnob: !0
    };
    super(arguments, t, e), this.orientation = this.settings.orientation, this.mode = this.settings.mode, this.hasKnob = this.settings.hasKnob, this.step = this.settings.step, this._value = new g(this.settings.scale[0], this.settings.scale[1], this.settings.step, this.settings.value), this.init(), this.position = new x(this.mode, this.orientation, [0, this.width], [this.height, 0]), this.position.value = this._value.normalized, this.value = this._value.value, this.emit("change", this.value);
  }
  buildInterface() {
    this.bar = c.create("rect"), this.knob = c.create("circle"), this.element.appendChild(this.bar), this.element.appendChild(this.knob);
  }
  sizeInterface() {
    this.position && this.position.resize([0, this.width], [this.height, 0]), this.width < this.height ? this.orientation = "vertical" : this.orientation = "horizontal";
    let t, e, i, s, n, l;
    this.knobData = {
      level: 0,
      r: 0
    }, this.orientation === "vertical" ? (this.thickness = this.width / 2, t = this.width / 2, e = 0, i = this.thickness, s = this.height, this.knobData.r = this.thickness * 0.8, this.knobData.level = s - this.knobData.r - this.normalized * (s - this.knobData.r * 2), n = "translate(" + this.thickness * -1 / 2 + ",0)", l = i / 2) : (this.thickness = this.height / 2, t = 0, e = this.height / 2, i = this.width, s = this.thickness, this.knobData.r = this.thickness * 0.8, this.knobData.level = this.normalized * (i - this.knobData.r * 2) + this.knobData.r, n = "translate(0," + this.thickness * -1 / 2 + ")", l = s / 2), this.bar.setAttribute("x", t), this.bar.setAttribute("y", e), this.bar.setAttribute("transform", n), this.bar.setAttribute("rx", l), this.bar.setAttribute("ry", l), this.bar.setAttribute("width", i), this.bar.setAttribute("height", s), this.orientation === "vertical" ? (this.knob.setAttribute("cx", t), this.knob.setAttribute("cy", this.knobData.level)) : (this.knob.setAttribute("cx", this.knobData.level), this.knob.setAttribute("cy", e)), this.knob.setAttribute("r", this.knobData.r);
  }
  colorInterface() {
    this.bar.setAttribute("fill", this.colors.fill), this.knob.setAttribute("fill", this.colors.accent), this.hasKnob || this.knob.setAttribute("fill", "transparent");
  }
  render() {
    this.clicked || (this.knobData.r = this.thickness * 0.75), this.knob.setAttribute("r", this.knobData.r), this.orientation === "vertical" ? (this.knobData.level = this.knobData.r + this._value.normalized * (this.height - this.knobData.r * 2), this.knob.setAttribute("cy", this.height - this.knobData.level)) : (this.knobData.level = this._value.normalized * (this.width - this.knobData.r * 2) + this.knobData.r, this.knob.setAttribute("cx", this.knobData.level));
  }
  click() {
    this.knobData.r = this.thickness * 0.9, this.position.anchor = this.mouse, this.move();
  }
  move() {
    this.clicked && (this.position.update(this.mouse), this.value = this._value.updateNormal(this.position.value), this.emit("change", {
      value: this.value,
      L: Math.pow(r.scale(this.value, -1, 1, 1, 0), 2),
      R: Math.pow(r.scale(this.value, -1, 1, 0, 1), 2)
    }));
  }
  release() {
    this.render();
  }
  /**
  The position of crossfader, from -1 (left) to 1 (right). Setting this value updates the interface and triggers the output event.
  @type {number}
  */
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.update(t), this.position.value = this._value.normalized, this.emit("change", {
      value: this.value,
      L: Math.pow(r.scale(this.value, -1, 1, 1, 0), 2),
      R: Math.pow(r.scale(this.value, -1, 1, 0, 1), 2)
    }), this.render();
  }
  get normalized() {
    return this._value.normalized;
  }
}
let A = function(h, t) {
  this.x = h.x, this.y = h.y, this.xMin = h.xMin || 0, this.xMax = h.xMax || 1, this.yMin = h.yMin || 0, this.yMax = h.yMax || 1, this.envelope = t, this.element = c.create("circle"), this.element.setAttribute("fill", this.envelope.colors.accent), this.envelope.element.appendChild(this.element), this.resize = function() {
    let e = ~~(Math.min(this.envelope.width, this.envelope.height) / 50) + 2;
    this.element.setAttribute("r", e);
  }, this.move = function(e, i) {
    if (this.x = e || e === 0 ? e : this.x, this.y = i || i === 0 ? i : this.y, this.envelope.nodes.indexOf(this) >= 0) {
      let s = this.envelope.nodes.indexOf(this) - 1, n = this.envelope.nodes.indexOf(this) + 1, l = this.envelope.nodes[s], a = this.envelope.nodes[n], o = s >= 0 ? l.x : 0;
      o = o < this.xMin ? this.xMin : o;
      let u = n < this.envelope.nodes.length ? a.x : 1;
      u = u > this.xMax ? this.xMax : u, this.x < o && (this.x = o), this.x > u && (this.x = u), this.y < this.yMin && (this.y = this.yMin), this.y > this.yMax && (this.y = this.yMax);
    }
    this.location = this.getCoordinates(), this.element.setAttribute("cx", this.location.x), this.element.setAttribute("cy", this.location.y);
  }, this.getCoordinates = function() {
    return {
      x: this.x * this.envelope.width,
      y: (1 - this.y) * this.envelope.height
    };
  }, this.move(this.x, this.y, !0), this.resize(), this.destroy = function() {
    this.envelope.element.removeChild(this.element), this.envelope.nodes.splice(this.envelope.nodes.indexOf(this), 1);
  };
};
class It extends m {
  constructor() {
    let t = ["value"], e = {
      size: [300, 150],
      noNewPoints: !1,
      points: [
        {
          x: 0.1,
          y: 0.4
        },
        {
          x: 0.35,
          y: 0.6
        },
        {
          x: 0.65,
          y: 0.2
        },
        {
          x: 0.9,
          y: 0.4
        }
      ]
    };
    super(arguments, t, e), this.points = this.settings.points, this.nodes = [], this.selected = !1, this.init();
  }
  buildInterface() {
    this.points.forEach((t) => {
      let e = new A(t, this);
      this.nodes.push(e);
    }), this.sortPoints(), this.line = c.create("polyline"), this.line.setAttribute("stroke-width", 2), this.line.setAttribute("fill", "none"), this.element.appendChild(this.line), this.fill = c.create("polyline"), this.fill.setAttribute("fill-opacity", "0.2"), this.element.appendChild(this.fill);
  }
  sizeInterface() {
    for (let t = 0; t < this.nodes.length; t++)
      this.nodes[t].resize(), this.nodes[t].move();
    this.render();
  }
  colorInterface() {
    this.element.style.backgroundColor = this.colors.fill, this.line.setAttribute("stroke", this.colors.accent), this.fill.setAttribute("fill", this.colors.accent), this.nodes.forEach((t) => {
      t.element.setAttribute("fill", this.colors.accent);
    });
  }
  render() {
    this.calculatePath();
  }
  calculatePoints() {
    this.points = [], this.nodes.forEach((t) => {
      this.points.push({ x: t.x, y: t.y });
    });
  }
  calculatePath() {
    let t = "0 " + this.nodes[0].location.y + ", ";
    this.nodes.forEach((e) => {
      t += e.location.x + " " + e.location.y + ", ";
    }), t += this.width + " " + this.nodes[this.nodes.length - 1].location.y, this.line.setAttribute("points", t), t += ", " + this.width + " " + this.height + ", ", t += "0 " + this.height, this.fill.setAttribute("points", t);
  }
  click() {
    this.hasMoved = !1, this.selected = this.findNearestNode(), this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height), this.scaleNode(this.selected), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
  move() {
    this.clicked && (this.mouse.x = r.clip(this.mouse.x, 0, this.width), this.hasMoved = !0, this.nodes[this.selected].move(this.mouse.x / this.width, 1 - this.mouse.y / this.height), this.scaleNode(this.selected), this.calculatePoints(), this.emit("change", this.points), this.render());
  }
  release() {
    this.hasMoved || this.nodes[this.selected].destroy(), this.calculatePoints(), this.emit("change", this.points), this.render(), this.selected = null;
  }
  findNearestNode() {
    var t = null, e = 1e4;
    let i = this.mouse.x / this.width, s = 1 - this.mouse.y / this.height, n = this.nodes;
    for (let a = 0; a < n.length; a++) {
      var l = Math.sqrt(Math.pow(n[a].x - i, 2) + Math.pow(n[a].y - s, 2));
      l < e && (e = l, t = a, i > n[a].x);
    }
    return !this.settings.noNewPoints && e > 0.07 && (t = this.getIndexFromX(this.mouse.x / this.width), this.nodes.splice(t, 0, new A({
      x: this.mouse.x / this.width,
      y: 1 - this.mouse.y / this.height
    }, this)), this.hasMoved = !0), t;
  }
  getIndexFromX(t) {
    let e = 0;
    return this.nodes.forEach((i, s) => {
      this.nodes[s].x <= t && (e = s + 1);
    }), e;
  }
  scaleNode(t) {
    let e = r.clip(this.nodes[t].x, 0, 1), i = r.clip(this.nodes[t].y, 0, 1);
    this.nodes[t].move(e, i);
  }
  /**
  Sort the this.points array from left-most point to right-most point. You should not regularly need to use this, however it may be useful if the points get unordered.
  */
  sortPoints() {
    this.nodes.sort(function(t, e) {
      return t.x > e.x;
    });
  }
  /**
  Add a breakpoint on the envelope.
  @param x {number} x location of the point, normalized (0-1)
  @param y {number} y location of the point, normalized (0-1)
  */
  addPoint(t, e) {
    let i = this.nodes.length;
    this.sortPoints();
    for (let s = 0; s < this.nodes.length; s++)
      if (t < this.nodes[s].x) {
        i = s;
        break;
      }
    this.nodes.splice(i, 0, new A({
      x: t,
      y: e
    }, this)), this.scaleNode(i), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
  /**
  Find the level at a certain x location on the envelope.
  @param x {number} The x location to find the level of, normalized 0-1
  */
  scan(t) {
    let e = this.getIndexFromX(t), i = e - 1;
    i < 0 && (i = 0), e >= this.nodes.length && (e = this.nodes.length - 1);
    let s = this.nodes[i], n = this.nodes[e], l = r.scale(t, s.x, n.x, 0, 1), a = r.interp(l, s.y, n.y);
    return this.emit("scan", a), a;
  }
  /**
  Move a breakpoint on the envelope.
  @param index {number} The index of the breakpoint to move
  @param x {number} New x location, normalized 0-1
  @param y {number} New y location, normalized 0-1
  */
  movePoint(t, e, i) {
    this.nodes[t].move(e, i), this.scaleNode(t), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
  /**
  Move a breakpoint on the envelope by a certain amount.
  @param index {number} The index of the breakpoint to move
  @param xOffset {number} X displacement, normalized 0-1
  @param yOffset {number} Y displacement, normalized 0-1
  */
  adjustPoint(t, e, i) {
    this.nodes[t].move(this.nodes[t].x + e, this.nodes[t].y + i), this.scaleNode(t), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
  /**
  Remove a breakpoint from the envelope.
  @param index {number} Index of the breakpoint to remove
  */
  destroyPoint(t) {
    this.nodes[t].destroy(), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
  /**
  Remove all existing breakpoints and add an entirely new set of breakpoints.
  @param allPoints {array} An array of objects with x/y properties (normalized 0-1). Each object in the array specifices the x/y location of a new breakpoint to be added.
  */
  setPoints(t) {
    for (; this.nodes.length; )
      this.nodes[0].destroy();
    t.forEach((e) => {
      this.addPoint(e.x, e.y);
    }), this.calculatePoints(), this.emit("change", this.points), this.render();
  }
}
class zt extends m {
  constructor() {
    let t = [], e = {
      size: [300, 150],
      fps: void 0
    };
    super(arguments, t, e), this.analyser = null, this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null, this.init();
  }
  buildFrame() {
    this.canvas = new p.SmartCanvas(this.parent), this.element = this.canvas.element;
  }
  sizeInterface() {
    this.canvas.resize(this.width, this.height);
  }
  colorInterface() {
    this.canvas.element.style.backgroundColor = this.colors.fill;
  }
  /**
  Set the refreshes per second. Defaults to 0 = max permitted by browser, typically 60. Values < 60 can be used to decrease cpu/gpu usage.
  * @param framesPerSecond {number} New framerate
  */
  setFramerate(t) {
    this.settings.fps = t, this.canvas.setFramerate(t);
  }
  render(t = performance.now()) {
    if (this.active && (requestAnimationFrame(this.render.bind(this)), !this.canvas.refreshIntervalReached(t)))
      return;
    this.analyser && this.analyser.getByteFrequencyData(this.dataArray);
    const e = this.canvas.element.width, i = this.canvas.element.height, s = this.canvas.context;
    if (s.fillStyle = this.colors.fill, s.fillRect(
      0,
      0,
      e,
      i
    ), this.source && this.dataArray) {
      const n = this.bufferLength, l = this.dataArray, a = this.colors.accent;
      let o = e / n, u, d = 0, f = e / 50;
      for (let b = 0; b < n; b = b + f)
        u = Math.max.apply(
          null,
          l.subarray(b, b + f)
        ), u /= 255, u *= i, s.fillStyle = a, s.fillRect(
          d,
          i - u,
          o * f,
          u
        ), d += o * f;
    }
  }
  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @example spectrogram.connect( Tone.Master );
  */
  connect(t) {
    this.source && this.disconnect(), this.analyser = t.context.createAnalyser(), this.analyser.fftSize = 2048, this.bufferLength = this.analyser.frequencyBinCount, this.dataArray = new Uint8Array(this.bufferLength), this.active = !0, this.source = t, this.source.connect(this.analyser), this.render();
  }
  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {
    this.source && this.source.disconnect(this.analyser), this.analyser = null, this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null;
  }
  click() {
    this.active = !this.active && this.source, this.render();
  }
  customDestroy() {
    this.active = !1;
  }
}
class Ct extends m {
  constructor() {
    let t = [], e = {
      size: [30, 100],
      fps: void 0
    };
    super(arguments, t, e), this.channels = 2, this.splitter = null, this.analysers = [], this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null, this.db = -1 / 0, this.init(), this.meterWidth = this.canvas.element.width / this.channels, this.render();
  }
  buildFrame() {
    this.canvas = new p.SmartCanvas(this.parent), this.element = this.canvas.element;
  }
  sizeInterface() {
    this.canvas.resize(this.width, this.height);
  }
  colorInterface() {
    this.canvas.element.style.backgroundColor = this.colors.fill;
  }
  /**
  Set the refreshes per second. Defaults to 0 = max permitted by browser, typically 60. Values < 60 can be used to decrease cpu/gpu usage.
  * @param framesPerSecond {number} New framerate
  */
  setFramerate(t) {
    this.settings.fps = t, this.canvas.setFramerate(t);
  }
  render(t = performance.now()) {
    if (this.active && (requestAnimationFrame(this.render.bind(this)), !this.canvas.refreshIntervalReached(t)))
      return;
    const e = this.canvas.element.width, i = this.canvas.element.height, s = this.canvas.context;
    s.fillStyle = this.colors.fill, s.fillRect(
      0,
      0,
      e,
      i
    );
    for (let n = 0; n < this.analysers.length; n++) {
      if (this.source) {
        const l = this.dataArray, a = this.dataArray.length;
        this.analysers[n].getFloatTimeDomainData(l);
        let o = 0;
        for (let u = 0; u < a; u++)
          o += l[u] * l[u];
        o = Math.sqrt(o / a), this.db = 20 * Math.log10(o);
      } else this.db > -200 && this.db !== -1 / 0 ? this.db -= 1 : this.db = -1 / 0;
      if (this.db > -70) {
        let l = r.normalize(this.db, -70, 5), a = l * l, o = r.scale(a, 0, 1, i, 0);
        s.fillStyle = this.colors.accent, s.fillRect(
          this.meterWidth * n,
          o,
          e,
          i - o
        );
      }
    }
  }
  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @param channels {number} (optional) The number of channels in the source node to watch. If not specified, the interface will look for a .channelCount property on the input node. If it does not exist, the interface will default to 1 channel.
  @example meter.connect( Tone.Master, 2 );
  */
  connect(t, e) {
    this.source && this.disconnect(), this.channels = e || t.channelCount || 2, this.splitter = t.context.createChannelSplitter(this.channels), this.analysers = [];
    for (let i = 0; i < this.channels; i++) {
      const s = t.context.createAnalyser();
      s.fftSize = 1024, s.smoothingTimeConstant = 1, this.splitter.connect(s, i), this.analysers.push(s);
    }
    this.bufferLength = this.analysers[0].frequencyBinCount, this.dataArray = new Float32Array(this.bufferLength), this.active = !0, this.meterWidth = this.canvas.element.width / this.channels, this.source = t, this.source.connect(this.splitter), this.render();
  }
  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {
    this.source && this.source.disconnect(this.splitter), this.splitter = null, this.analysers = [], this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null;
  }
  click() {
    this.active = !this.active && this.source, this.render();
  }
  customDestroy() {
    this.active = !1;
  }
}
class Pt extends m {
  constructor() {
    let t = [], e = {
      size: [300, 150],
      fps: void 0
    };
    super(arguments, t, e), this.analyser = null, this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null, this.init(), this.render();
  }
  buildFrame() {
    this.canvas = new p.SmartCanvas(this.parent, this.settings.fps), this.element = this.canvas.element;
  }
  sizeInterface() {
    this.canvas.resize(this.width, this.height);
  }
  colorInterface() {
    this.canvas.element.style.backgroundColor = this.colors.fill;
  }
  /**
  Set the refreshes per second. Defaults to 0 = max permitted by browser, typically 60. Values < 60 can be used to decrease cpu/gpu usage.
  * @param framesPerSecond {number} New framerate
  */
  setFramerate(t) {
    this.settings.fps = t, this.canvas.setFramerate(t);
  }
  render(t = performance.now()) {
    if (this.active && (requestAnimationFrame(this.render.bind(this)), !this.canvas.refreshIntervalReached(t)))
      return;
    this.analyser && this.analyser.getByteTimeDomainData(this.dataArray);
    const e = this.canvas.element.width, i = this.canvas.element.height, s = this.canvas.context;
    if (s.fillStyle = this.colors.fill, s.fillRect(
      0,
      0,
      e,
      i
    ), s.lineWidth = ~~(i / 100 + 2), s.strokeStyle = this.colors.accent, s.beginPath(), this.source) {
      const d = this.bufferLength, f = this.dataArray, b = i / 2;
      for (var n = e / d, l = 0, a = 0; a < d; a++) {
        var o = f[a] / 128, u = o * b;
        a === 0 ? s.moveTo(l, u) : s.lineTo(l, u), l += n;
      }
    } else
      s.moveTo(0, i / 2), s.lineTo(
        e,
        i / 2
      );
    s.stroke();
  }
  /**
  Equivalent to "patching in" an audio node to visualize.
  @param node {AudioNode} The audio node to visualize
  @example oscilloscope.connect( Tone.Master );
  */
  connect(t) {
    this.source && this.disconnect(), this.analyser = t.context.createAnalyser(), this.analyser.fftSize = 2048, this.bufferLength = this.analyser.frequencyBinCount, this.dataArray = new Uint8Array(this.bufferLength), this.analyser.getByteTimeDomainData(this.dataArray), this.active = !0, this.source = t, this.source.connect(this.analyser), this.render();
  }
  /**
  Stop visualizing the source node and disconnect it.
  */
  disconnect() {
    this.source && this.source.disconnect(this.analyser), this.analyser = null, this.bufferLength = 0, this.dataArray = null, this.active = !1, this.source = null;
  }
  click() {
    this.active = !this.active && this.source, this.render();
  }
  customDestroy() {
    this.active = !1;
  }
}
const y = {
  Position: ct,
  Slider: ut,
  Toggle: dt,
  Button: S,
  TextButton: mt,
  RadioButton: pt,
  Number: ft,
  Select: gt,
  Dial: bt,
  Piano: xt,
  Sequencer: kt,
  Pan2D: wt,
  Tilt: At,
  Multislider: _t,
  Pan: Mt,
  Envelope: It,
  Spectrogram: zt,
  Meter: Ct,
  Oscilloscope: Pt
};
let Et = (h, t) => {
  let e = h.type;
  return t[e] ? t[e]++ : t[e] = 1, e + t[e];
}, I = (h, t, e) => {
  e = e || {};
  for (let s = 0; s < h.attributes.length; s++) {
    let n = h.attributes[s];
    e[n.nodeName] = n.nodeValue;
  }
  t = t[0].toUpperCase() + t.slice(1);
  let i = new y[t](h, e);
  return i.id = h.id, i;
}, Y = (h, t) => {
  t = t || "nexus-ui";
  let e = {}, i = p.parseElement(h), s = {}, n = i.getElementsByTagName("*"), l = [];
  for (let a = 0; a < n.length; a++)
    l.push(n[a]);
  for (let a = 0; a < l.length; a++) {
    let o = l[a].getAttribute(t);
    if (o) {
      let u = !1;
      for (let f in y)
        o.toLowerCase() === f.toLowerCase() && (u = f);
      console.log(u);
      let d = I(l[a], u);
      if (d.id)
        s[d.id] = d;
      else {
        let f = Et(d, e);
        s[f] = d;
      }
    }
  }
  return s;
}, _ = (h, t, e) => {
  let i = document.createElement("div");
  return e = e || {}, t ? t = p.parseElement(t) : t = document.body, t.appendChild(i), e.target = i, e.size && (i.style.width = e.size[0] + "px", i.style.height = e.size[1] + "px"), I(i, h, e);
};
const Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: _,
  element: I,
  section: Y
}, Symbol.toStringTag, { value: "Module" }));
class Tt {
  constructor(t, e) {
    this.meta = {}, this.meta.target = t, this.meta.parent = p.parseElement(t), this.meta.colors = {}, e ? (this.meta.attribute = e.attribute || "nexus-ui", this.meta.title = e.name || !1, this.meta.open = e.open || !1) : (this.meta.attribute = "nexus-ui", this.meta.title = !1, this.meta.open = !1);
    let i = F();
    this.meta.colors.accent = i.accent, this.meta.colors.fill = i.fill, this.meta.colors.light = i.light, this.meta.colors.dark = i.dark, this.meta.colors.mediumLight = i.mediumLight, this.meta.colors.mediumDark = i.mediumDark, this.buildInterface(), this.colorInterface();
  }
  buildInterface() {
    for (this.meta.parent.style.boxSizing = "border-box", this.meta.parent.style.userSelect = "none", this.meta.parent.style.mozUserSelect = "none", this.meta.parent.style.webkitUserSelect = "none", this.meta.contents = document.createElement("div"); this.meta.parent.childNodes.length > 0; )
      this.meta.contents.appendChild(this.meta.parent.childNodes[0]);
    this.meta.contents.style.padding = "0px", this.meta.contents.style.boxSizing = "border-box", this.meta.title && (this.meta.titleBar = document.createElement("div"), this.meta.titleBar.innerHTML = this.meta.title, this.meta.titleBar.style.fontFamily = "arial", this.meta.titleBar.style.position = "relative", this.meta.titleBar.style.color = "#888", this.meta.titleBar.style.padding = "7px", this.meta.titleBar.style.fontSize = "12px", this.meta.button = document.createElement("div"), this.meta.button.style.position = "absolute", this.meta.button.style.top = "5px", this.meta.button.style.right = "5px", this.meta.button.innerHTML = "-", this.meta.button.style.padding = "0px 5px 2px", this.meta.button.style.lineHeight = "12px", this.meta.button.style.fontSize = "15px", this.meta.button.style.cursor = "pointer", this.meta.button.addEventListener("mouseover", () => {
      this.meta.button.style.backgroundColor = this.meta.colors.mediumDark;
    }), this.meta.button.addEventListener("mouseleave", () => {
      this.meta.button.style.backgroundColor = this.meta.colors.mediumLight;
    }), this.meta.button.addEventListener("click", () => {
      this.meta.open ? this.hide() : this.show();
    }), this.meta.titleBar.appendChild(this.meta.button), this.meta.parent.appendChild(this.meta.titleBar)), this.meta.parent.appendChild(this.meta.contents);
    let t = Y(this.meta.target, this.meta.attribute);
    for (var e in t)
      this[e] = t[e];
  }
  colorInterface() {
    this.meta.title && (this.meta.button.style.backgroundColor = this.meta.colors.mediumLight, this.meta.button.style.border = "solid 0px " + this.meta.colors.fill, this.meta.parent.style.border = "solid 1px " + this.meta.colors.mediumLight, this.meta.parent.style.backgroundColor = this.meta.colors.light, this.meta.titleBar.style.backgroundColor = this.meta.colors.fill);
  }
  show() {
    this.meta.contents.style.display = "block", this.meta.open = !0;
  }
  hide() {
    this.meta.contents.style.display = "none", this.meta.open = !1;
  }
  colorize(t, e) {
    for (var i in this)
      this[i].colorize && this[i].colorize(t, e);
    this.meta.colors[t] = e, this.colorInterface();
  }
  empty() {
    for (var t in this)
      this[t].destroy && this[t].destroy();
  }
}
class St {
  constructor() {
    this.scale = [], this.mode = {
      output: "frequency",
      input: "step"
    }, this.etmajor = [
      261.62558,
      293.664764,
      329.627563,
      349.228241,
      391.995422,
      440,
      493.883301,
      523.25116
    ], this.root = r.mtof(60), this.createScale(0, 2, 4, 5, 7, 9, 11);
  }
  /* Return data in the mode you are in (freq, ratio, or midi) */
  note(t, e) {
    let i;
    return this.mode.output === "frequency" ? i = this.frequency(t, e) : this.mode.output === "ratio" ? i = this.ratio(t, e) : this.mode.output === "MIDI" ? i = this.MIDI(t, e) : i = this.frequency(t, e), i;
  }
  /* Return freq data */
  frequency(t, e) {
    (this.mode.input === "midi" || this.mode.input === "MIDI") && (this.stepIn += 60);
    let i = Math.floor(t / this.scale.length);
    e && (i += e);
    let s = t % this.scale.length;
    for (; s < 0; )
      s += this.scale.length;
    let n = this.scale[s], l = this.root * n;
    return l = l * Math.pow(2, i), l = Math.floor(l * 1e11) / 1e11, l;
  }
  /* Force return ratio data */
  ratio(t, e) {
    (this.mode.input === "midi" || this.mode.input === "MIDI") && (this.stepIn += 60);
    let i = Math.floor(t / this.scale.length);
    e && (i += e);
    let s = t % this.scale.length, n = Math.pow(2, i) * this.scale[s];
    return n = Math.floor(n * 1e11) / 1e11, n;
  }
  /* Force return adjusted MIDI data */
  MIDI(t, e) {
    let i = this.frequency(t, e), s = 69 + 12 * Math.log(i / 440) / Math.log(2);
    return s = Math.floor(s * 1e9) / 1e9, s;
  }
  createScale() {
    let t = [];
    for (let e = 0; e < arguments.length; e++)
      t.push(r.mtof(60 + arguments[e]));
    this.loadScaleFromFrequencies(t);
  }
  createJIScale() {
    this.scale = [];
    for (let t = 0; t < arguments.length; t++)
      this.scale.push(arguments[t]);
  }
  loadScaleFromFrequencies(t) {
    this.scale = [];
    for (let e = 0; e < t.length; e++)
      this.scale.push(t[e] / t[0]);
  }
  /* Load a new scale */
  loadScale(t) {
    let e = this.scales[t].frequencies;
    this.loadScaleFromFrequencies(e);
  }
  /* Search the names of tunings
  	 Returns an array of names of tunings */
  search(t) {
    let e = [];
    for (let i in this.scales)
      i.toLowerCase().indexOf(t.toLowerCase()) !== -1 && e.push(i);
    return e;
  }
  /* Return a collection of notes as an array */
  chord(t) {
    let e = [];
    for (let i = 0; i < t.length; i++)
      e.push(this.note(t[i]));
    return e;
  }
}
class Dt {
  //if non-existent buttons are switched, they are ignored
  constructor(t = 3, ...e) {
    t < 0 && (t = 1), this.length = t, this.onVals = e, this.array = new Array(t).fill(0), e.length > 0 && this.on(...e);
  }
  select(t) {
    return this.array.fill(0), this.array[t] = 1, this.array;
  }
  flip(...t) {
    let e = this.array;
    return t.length > 0 ? t.forEach(function(i) {
      i > e.length - 1 ? console.warn("Warning: AnonRadio[" + i + "] does not exist") : e[i] = e[i] ? 0 : 1;
    }) : e.forEach(function(i, s, n) {
      n[s] = i ? 0 : 1;
    }), e;
  }
  on(...t) {
    let e = this.array;
    return t.length > 0 ? t.forEach(function(i) {
      i > e.length - 1 ? console.warn("Warning: AnonRadio[" + i + "] exceeds size of object") : (e[i] === 1 && console.warn("Warning: AnonRadio[" + i + "] was already on."), e[i] = 1);
    }) : e.fill(1), e;
  }
  off(...t) {
    let e = this.array;
    return t.length > 0 ? t.forEach(function(i) {
      e[i] = 0;
    }) : e.fill(0), e;
  }
}
class Rt {
  constructor(t) {
    for (let a in y)
      this[a] = y[a];
    for (let a in r)
      this[a] = r[a];
    let e = {
      Rack: Tt
    }, i = {
      Counter: R,
      Radio: Dt,
      Drunk: M,
      Sequence: k,
      Matrix: D
    };
    for (let a in i)
      this[a] = i[a];
    for (let a in e)
      this[a] = e[a];
    let s = window.AudioContext || window.webkitAudioContext;
    this._context = t || new s(), this.tune = new St(), this.note = this.tune.note.bind(this.tune), this.clock = new C(this._context), this.clock.start(), this.Interval = X, this.colors = {
      accent: "#2bb",
      fill: "#eee",
      light: "#fff",
      dark: "#333",
      mediumLight: "#ccc",
      mediumDark: "#666"
    }, this.transform = Lt, this.add = _, this.Add = {};
    for (let a in y)
      this.Add[a] = _.bind(this, a);
    var n = document.createElement("style");
    n.type = "text/css", n.innerHTML = "[nexus-ui]{height:5000px;width:5000px}";
    var l = document.head;
    l.insertBefore(n, l.firstElementChild);
  }
  get context() {
    return this._context;
  }
  set context(t) {
    this.clock.stop(), this._context = t, this.clock = new C(this.context), this.clock.start();
  }
}
let z = new Rt();
function F() {
  return z.colors;
}
function Vt() {
  return z.context;
}
function Xt() {
  return z.clock;
}
export {
  Xt as clock,
  F as colors,
  Vt as context,
  z as default
};
//# sourceMappingURL=NexusUI.esm.js.map
