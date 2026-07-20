var oa, la, ca, ha, ua, da, fa, pa, ma;
var zr = 1e3, ei = 1001, Vr = 1002, xt = 1003, no = 1004, ro = 1005, Et = 1006, so = 1007, qr = 1008, xi = 1009, ao = 1010, oo = 1011, ga = 1012, lo = 1013, Ei = 1014, nr = 1015, yi = 1016, va = 1017, _a = 1018, Ma = 1020, co = 35902, ho = 35899, uo = 1021, fo = 1022, fn = 1023, pn = 1026, Sa = 1027, po = 1028, xa = 1029, $n = 1030, Ea = 1031, ya = 1033, mo = 33776, go = 33777, vo = 33778, _o = 33779, Mo = 35840, So = 35841, xo = 35842, Eo = 35843, yo = 36196, To = 37492, bo = 37496, Ao = 37488, wo = 37489, Ro = 37490, Co = 37491, Po = 37808, Lo = 37809, Do = 37810, Io = 37811, Uo = 37812, No = 37813, Fo = 37814, Oo = 37815, Bo = 37816, zo = 37817, Vo = 37818, Go = 37819, Ho = 37820, ko = 37821, Wo = 36492, Xo = 36494, qo = 36495, Yo = 36283, Ko = 36284, Zo = 36285, $o = 36286, Jn = 2300, Gr = 2301, cr = 2302, cs = 2303, hs = 2400, us = 2401, ds = 2402, Jo = 3200;
var wt = "srgb", Hr = "srgb-linear", Qn = "linear", jn = "srgb", hr = 7680;
var Qo = 35044;
var Ki = 2e3;
function jo(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function el(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function er(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function tl() {
  const e = er("canvas");
  return e.style.display = "block", e;
}
var fs = {}, Zi = null;
function ps(...e) {
  const t = "THREE." + e.shift();
  Zi ? Zi("log", t, ...e) : console.log(t, ...e);
}
function Ta(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const i = e[1];
    i && i.isStackTrace ? e[0] += " " + i.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function Te(...e) {
  e = Ta(e);
  const t = "THREE." + e.shift();
  if (Zi) Zi("warn", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.warn(i.getError(t)) : console.warn(t, ...e);
  }
}
function Ce(...e) {
  e = Ta(e);
  const t = "THREE." + e.shift();
  if (Zi) Zi("error", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.error(i.getError(t)) : console.error(t, ...e);
  }
}
function qi(...e) {
  const t = e.join(" ");
  t in fs || (fs[t] = !0, Te(...e));
}
function il(e, t, i) {
  return new Promise(function(n, r) {
    function s() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          r();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(s, i);
          break;
        default:
          n();
      }
    }
    setTimeout(s, i);
  });
}
var nl = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
}, bi = class {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  hasEventListener(e, t) {
    const i = this._listeners;
    return i === void 0 ? !1 : i[e] !== void 0 && i[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const i = this._listeners;
    if (i === void 0) return;
    const n = i[e];
    if (n !== void 0) {
      const r = n.indexOf(t);
      r !== -1 && n.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const i = t[e.type];
    if (i !== void 0) {
      e.target = this;
      const n = i.slice(0);
      for (let r = 0, s = n.length; r < s; r++) n[r].call(this, e);
      e.target = null;
    }
  }
}, gt = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff"
], ms = 1234567, un = Math.PI / 180, mn = 180 / Math.PI;
function Qi() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (gt[e & 255] + gt[e >> 8 & 255] + gt[e >> 16 & 255] + gt[e >> 24 & 255] + "-" + gt[t & 255] + gt[t >> 8 & 255] + "-" + gt[t >> 16 & 15 | 64] + gt[t >> 24 & 255] + "-" + gt[i & 63 | 128] + gt[i >> 8 & 255] + "-" + gt[i >> 16 & 255] + gt[i >> 24 & 255] + gt[n & 255] + gt[n >> 8 & 255] + gt[n >> 16 & 255] + gt[n >> 24 & 255]).toLowerCase();
}
function Oe(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function Yr(e, t) {
  return (e % t + t) % t;
}
function rl(e, t, i, n, r) {
  return n + (e - t) * (r - n) / (i - t);
}
function sl(e, t, i) {
  return e !== t ? (i - e) / (t - e) : 0;
}
function dn(e, t, i) {
  return (1 - i) * e + i * t;
}
function al(e, t, i, n) {
  return dn(e, t, 1 - Math.exp(-i * n));
}
function ol(e, t = 1) {
  return t - Math.abs(Yr(e, t * 2) - t);
}
function ll(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * (3 - 2 * e));
}
function cl(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function hl(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function ul(e, t) {
  return e + Math.random() * (t - e);
}
function dl(e) {
  return e * (0.5 - Math.random());
}
function fl(e) {
  e !== void 0 && (ms = e);
  let t = ms += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function pl(e) {
  return e * un;
}
function ml(e) {
  return e * mn;
}
function gl(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function vl(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function _l(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function Ml(e, t, i, n, r) {
  const s = Math.cos, a = Math.sin, o = s(i / 2), c = a(i / 2), l = s((t + n) / 2), u = a((t + n) / 2), f = s((t - n) / 2), h = a((t - n) / 2), p = s((n - t) / 2), M = a((n - t) / 2);
  switch (r) {
    case "XYX":
      e.set(o * u, c * f, c * h, o * l);
      break;
    case "YZY":
      e.set(c * h, o * u, c * f, o * l);
      break;
    case "ZXZ":
      e.set(c * f, c * h, o * u, o * l);
      break;
    case "XZX":
      e.set(o * u, c * M, c * p, o * l);
      break;
    case "YXY":
      e.set(c * p, o * u, c * M, o * l);
      break;
    case "ZYZ":
      e.set(c * M, c * p, o * u, o * l);
      break;
    default:
      Te("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function ki(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Mt(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
var tn = {
  DEG2RAD: un,
  RAD2DEG: mn,
  generateUUID: Qi,
  clamp: Oe,
  euclideanModulo: Yr,
  mapLinear: rl,
  inverseLerp: sl,
  lerp: dn,
  damp: al,
  pingpong: ol,
  smoothstep: ll,
  smootherstep: cl,
  randInt: hl,
  randFloat: ul,
  randFloatSpread: dl,
  seededRandom: fl,
  degToRad: pl,
  radToDeg: ml,
  isPowerOfTwo: gl,
  ceilPowerOfTwo: vl,
  floorPowerOfTwo: _l,
  setQuaternionFromProperEuler: Ml,
  normalize: Mt,
  denormalize: ki
};
fa = Symbol.iterator;
var Ie = class {
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, i = this.y, n = e.elements;
    return this.x = n[0] * t + n[3] * i + n[6], this.y = n[1] * t + n[4] * i + n[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Oe(this.x, e.x, t.x), this.y = Oe(this.y, e.y, t.y), this;
  }
  clampScalar(e, t) {
    return this.x = Oe(this.x, e, t), this.y = Oe(this.y, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Oe(i, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(Oe(i, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y;
    return t * t + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const i = Math.cos(t), n = Math.sin(t), r = this.x - e.x, s = this.y - e.y;
    return this.x = r * i - s * n + e.x, this.y = r * n + s * i + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[fa]() {
    yield this.x, yield this.y;
  }
};
oa = Ie;
oa.prototype.isVector2 = !0;
var Ai = class {
  constructor(e = 0, t = 0, i = 0, n = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = n;
  }
  static slerpFlat(e, t, i, n, r, s, a) {
    let o = i[n + 0], c = i[n + 1], l = i[n + 2], u = i[n + 3], f = r[s + 0], h = r[s + 1], p = r[s + 2], M = r[s + 3];
    if (u !== M || o !== f || c !== h || l !== p) {
      let E = o * f + c * h + l * p + u * M;
      E < 0 && (f = -f, h = -h, p = -p, M = -M, E = -E);
      let g = 1 - a;
      if (E < 0.9995) {
        const d = Math.acos(E), P = Math.sin(d);
        g = Math.sin(g * d) / P, a = Math.sin(a * d) / P, o = o * g + f * a, c = c * g + h * a, l = l * g + p * a, u = u * g + M * a;
      } else {
        o = o * g + f * a, c = c * g + h * a, l = l * g + p * a, u = u * g + M * a;
        const d = 1 / Math.sqrt(o * o + c * c + l * l + u * u);
        o *= d, c *= d, l *= d, u *= d;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, i, n, r, s) {
    const a = i[n], o = i[n + 1], c = i[n + 2], l = i[n + 3], u = r[s], f = r[s + 1], h = r[s + 2], p = r[s + 3];
    return e[t] = a * p + l * u + o * h - c * f, e[t + 1] = o * p + l * f + c * u - a * h, e[t + 2] = c * p + l * h + a * f - o * u, e[t + 3] = l * p - a * u - o * f - c * h, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, i, n) {
    return this._x = e, this._y = t, this._z = i, this._w = n, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const i = e._x, n = e._y, r = e._z, s = e._order, a = Math.cos, o = Math.sin, c = a(i / 2), l = a(n / 2), u = a(r / 2), f = o(i / 2), h = o(n / 2), p = o(r / 2);
    switch (s) {
      case "XYZ":
        this._x = f * l * u + c * h * p, this._y = c * h * u - f * l * p, this._z = c * l * p + f * h * u, this._w = c * l * u - f * h * p;
        break;
      case "YXZ":
        this._x = f * l * u + c * h * p, this._y = c * h * u - f * l * p, this._z = c * l * p - f * h * u, this._w = c * l * u + f * h * p;
        break;
      case "ZXY":
        this._x = f * l * u - c * h * p, this._y = c * h * u + f * l * p, this._z = c * l * p + f * h * u, this._w = c * l * u - f * h * p;
        break;
      case "ZYX":
        this._x = f * l * u - c * h * p, this._y = c * h * u + f * l * p, this._z = c * l * p - f * h * u, this._w = c * l * u + f * h * p;
        break;
      case "YZX":
        this._x = f * l * u + c * h * p, this._y = c * h * u + f * l * p, this._z = c * l * p - f * h * u, this._w = c * l * u - f * h * p;
        break;
      case "XZY":
        this._x = f * l * u - c * h * p, this._y = c * h * u - f * l * p, this._z = c * l * p + f * h * u, this._w = c * l * u + f * h * p;
        break;
      default:
        Te("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const i = t / 2, n = Math.sin(i);
    return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], c = t[2], l = t[6], u = t[10], f = i + a + u;
    if (f > 0) {
      const h = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / h, this._x = (l - o) * h, this._y = (r - c) * h, this._z = (s - n) * h;
    } else if (i > a && i > u) {
      const h = 2 * Math.sqrt(1 + i - a - u);
      this._w = (l - o) / h, this._x = 0.25 * h, this._y = (n + s) / h, this._z = (r + c) / h;
    } else if (a > u) {
      const h = 2 * Math.sqrt(1 + a - i - u);
      this._w = (r - c) / h, this._x = (n + s) / h, this._y = 0.25 * h, this._z = (o + l) / h;
    } else {
      const h = 2 * Math.sqrt(1 + u - i - a);
      this._w = (s - n) / h, this._x = (r + c) / h, this._y = (o + l) / h, this._z = 0.25 * h;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return i < 1e-8 ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Oe(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const i = this.angleTo(e);
    if (i === 0) return this;
    const n = Math.min(1, t / i);
    return this.slerp(e, n), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const i = e._x, n = e._y, r = e._z, s = e._w, a = t._x, o = t._y, c = t._z, l = t._w;
    return this._x = i * l + s * a + n * c - r * o, this._y = n * l + s * o + r * a - i * c, this._z = r * l + s * c + i * o - n * a, this._w = s * l - i * a - n * o - r * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let i = e._x, n = e._y, r = e._z, s = e._w, a = this.dot(e);
    a < 0 && (i = -i, n = -n, r = -r, s = -s, a = -a);
    let o = 1 - t;
    if (a < 0.9995) {
      const c = Math.acos(a), l = Math.sin(c);
      o = Math.sin(o * c) / l, t = Math.sin(t * c) / l, this._x = this._x * o + i * t, this._y = this._y * o + n * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this._onChangeCallback();
    } else
      this._x = this._x * o + i * t, this._y = this._y * o + n * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this.normalize();
    return this;
  }
  slerpQuaternions(e, t, i) {
    return this.copy(e).slerp(t, i);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), i = Math.random(), n = Math.sqrt(1 - i), r = Math.sqrt(i);
    return this.set(n * Math.sin(e), n * Math.cos(e), r * Math.sin(t), r * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
};
pa = Symbol.iterator;
var B = class {
  constructor(e = 0, t = 0, i = 0) {
    this.x = e, this.y = t, this.z = i;
  }
  set(e, t, i) {
    return i === void 0 && (i = this.z), this.x = e, this.y = t, this.z = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(gs.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(gs.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, i = this.y, n = this.z, r = e.elements;
    return this.x = r[0] * t + r[3] * i + r[6] * n, this.y = r[1] * t + r[4] * i + r[7] * n, this.z = r[2] * t + r[5] * i + r[8] * n, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, i = this.y, n = this.z, r = e.elements, s = 1 / (r[3] * t + r[7] * i + r[11] * n + r[15]);
    return this.x = (r[0] * t + r[4] * i + r[8] * n + r[12]) * s, this.y = (r[1] * t + r[5] * i + r[9] * n + r[13]) * s, this.z = (r[2] * t + r[6] * i + r[10] * n + r[14]) * s, this;
  }
  applyQuaternion(e) {
    const t = this.x, i = this.y, n = this.z, r = e.x, s = e.y, a = e.z, o = e.w, c = 2 * (s * n - a * i), l = 2 * (a * t - r * n), u = 2 * (r * i - s * t);
    return this.x = t + o * c + s * u - a * l, this.y = i + o * l + a * c - r * u, this.z = n + o * u + r * l - s * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, i = this.y, n = this.z, r = e.elements;
    return this.x = r[0] * t + r[4] * i + r[8] * n, this.y = r[1] * t + r[5] * i + r[9] * n, this.z = r[2] * t + r[6] * i + r[10] * n, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Oe(this.x, e.x, t.x), this.y = Oe(this.y, e.y, t.y), this.z = Oe(this.z, e.z, t.z), this;
  }
  clampScalar(e, t) {
    return this.x = Oe(this.x, e, t), this.y = Oe(this.y, e, t), this.z = Oe(this.z, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Oe(i, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const i = e.x, n = e.y, r = e.z, s = t.x, a = t.y, o = t.z;
    return this.x = n * o - r * a, this.y = r * s - i * o, this.z = i * a - n * s, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const i = e.dot(this) / t;
    return this.copy(e).multiplyScalar(i);
  }
  projectOnPlane(e) {
    return ur.copy(this).projectOnVector(e), this.sub(ur);
  }
  reflect(e) {
    return this.sub(ur.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(Oe(i, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y, n = this.z - e.z;
    return t * t + i * i + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, i) {
    const n = Math.sin(t) * e;
    return this.x = n * Math.sin(i), this.y = Math.cos(t) * e, this.z = n * Math.cos(i), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, i) {
    return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(), n = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = i, this.z = n, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, i = Math.sqrt(1 - t * t);
    return this.x = i * Math.cos(e), this.y = t, this.z = i * Math.sin(e), this;
  }
  *[pa]() {
    yield this.x, yield this.y, yield this.z;
  }
};
la = B;
la.prototype.isVector3 = !0;
var ur = /* @__PURE__ */ new B(), gs = /* @__PURE__ */ new Ai(), De = class {
  constructor(e, t, i, n, r, s, a, o, c) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, n, r, s, a, o, c);
  }
  set(e, t, i, n, r, s, a, o, c) {
    const l = this.elements;
    return l[0] = e, l[1] = n, l[2] = a, l[3] = t, l[4] = r, l[5] = o, l[6] = i, l[7] = s, l[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this;
  }
  extractBasis(e, t, i) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const i = e.elements, n = t.elements, r = this.elements, s = i[0], a = i[3], o = i[6], c = i[1], l = i[4], u = i[7], f = i[2], h = i[5], p = i[8], M = n[0], E = n[3], g = n[6], d = n[1], P = n[4], w = n[7], x = n[2], T = n[5], b = n[8];
    return r[0] = s * M + a * d + o * x, r[3] = s * E + a * P + o * T, r[6] = s * g + a * w + o * b, r[1] = c * M + l * d + u * x, r[4] = c * E + l * P + u * T, r[7] = c * g + l * w + u * b, r[2] = f * M + h * d + p * x, r[5] = f * E + h * P + p * T, r[8] = f * g + h * w + p * b, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], s = e[4], a = e[5], o = e[6], c = e[7], l = e[8];
    return t * s * l - t * a * c - i * r * l + i * a * o + n * r * c - n * s * o;
  }
  invert() {
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], s = e[4], a = e[5], o = e[6], c = e[7], l = e[8], u = l * s - a * c, f = a * o - l * r, h = c * r - s * o, p = t * u + i * f + n * h;
    if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / p;
    return e[0] = u * M, e[1] = (n * c - l * i) * M, e[2] = (a * i - n * s) * M, e[3] = f * M, e[4] = (l * t - n * o) * M, e[5] = (n * r - a * t) * M, e[6] = h * M, e[7] = (i * o - c * t) * M, e[8] = (s * t - i * r) * M, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, i, n, r, s, a) {
    const o = Math.cos(r), c = Math.sin(r);
    return this.set(i * o, i * c, -i * (o * s + c * a) + s + e, -n * c, n * o, -n * (-c * s + o * a) + a + t, 0, 0, 1), this;
  }
  scale(e, t) {
    return qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(dr.makeScale(e, t)), this;
  }
  rotate(e) {
    return qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(dr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(dr.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(t, -i, 0, i, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let n = 0; n < 9; n++) if (t[n] !== i[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let i = 0; i < 9; i++) this.elements[i] = e[i + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
ca = De;
ca.prototype.isMatrix3 = !0;
var dr = /* @__PURE__ */ new De(), vs = /* @__PURE__ */ new De().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), _s = /* @__PURE__ */ new De().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Sl() {
  const e = {
    enabled: !0,
    workingColorSpace: Hr,
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === "srgb" && (r.r = ti(r.r), r.g = ti(r.g), r.b = ti(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === "srgb" && (r.r = Yi(r.r), r.g = Yi(r.g), r.b = Yi(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? Qn : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(r, s) {
      return qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, s);
    }
  }, t = [
    0.64,
    0.33,
    0.3,
    0.6,
    0.15,
    0.06
  ], i = [
    0.2126,
    0.7152,
    0.0722
  ], n = [0.3127, 0.329];
  return e.define({
    [Hr]: {
      primaries: t,
      whitePoint: n,
      transfer: Qn,
      toXYZ: vs,
      fromXYZ: _s,
      luminanceCoefficients: i,
      workingColorSpaceConfig: { unpackColorSpace: wt },
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    },
    [wt]: {
      primaries: t,
      whitePoint: n,
      transfer: jn,
      toXYZ: vs,
      fromXYZ: _s,
      luminanceCoefficients: i,
      outputColorSpaceConfig: { drawingBufferColorSpace: wt }
    }
  }), e;
}
var ze = /* @__PURE__ */ Sl();
function ti(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function Yi(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Pi, xl = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let i;
    if (e instanceof HTMLCanvasElement) i = e;
    else {
      Pi === void 0 && (Pi = er("canvas")), Pi.width = e.width, Pi.height = e.height;
      const n = Pi.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), i = Pi;
    }
    return i.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = er("canvas");
      t.width = e.width, t.height = e.height;
      const i = t.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const n = i.getImageData(0, 0, e.width, e.height), r = n.data;
      for (let s = 0; s < r.length; s++) r[s] = ti(r[s] / 255) * 255;
      return i.putImageData(n, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let i = 0; i < t.length; i++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(ti(t[i] / 255) * 255) : t[i] = ti(t[i]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, El = 0, Kr = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: El++ }), this.uuid = Qi(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const i = {
      uuid: this.uuid,
      url: ""
    }, n = this.data;
    if (n !== null) {
      let r;
      if (Array.isArray(n)) {
        r = [];
        for (let s = 0, a = n.length; s < a; s++) n[s].isDataTexture ? r.push(fr(n[s].image)) : r.push(fr(n[s]));
      } else r = fr(n);
      i.url = r;
    }
    return t || (e.images[this.uuid] = i), i;
  }
};
function fr(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? xl.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (Te("Texture: Unable to serialize Texture."), {});
}
var yl = 0, pr = /* @__PURE__ */ new B(), It = class Yn extends bi {
  constructor(t = Yn.DEFAULT_IMAGE, i = Yn.DEFAULT_MAPPING, n = ei, r = ei, s = Et, a = qr, o = fn, c = xi, l = Yn.DEFAULT_ANISOTROPY, u = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: yl++ }), this.uuid = Qi(), this.name = "", this.source = new Kr(t), this.mipmaps = [], this.mapping = i, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new Ie(0, 0), this.repeat = new Ie(1, 1), this.center = new Ie(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(pr).x;
  }
  get height() {
    return this.source.getSize(pr).y;
  }
  get depth() {
    return this.source.getSize(pr).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(t, i) {
    this.updateRanges.push({
      start: t,
      count: i
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.normalized = t.normalized, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  setValues(t) {
    for (const i in t) {
      const n = t[i];
      if (n === void 0) {
        Te(`Texture.setValues(): parameter '${i}' has value of undefined.`);
        continue;
      }
      const r = this[i];
      if (r === void 0) {
        Te(`Texture.setValues(): property '${i}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[i] = n;
    }
  }
  toJSON(t) {
    const i = t === void 0 || typeof t == "string";
    if (!i && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), i || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case zr:
        t.x = t.x - Math.floor(t.x);
        break;
      case ei:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Vr:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case zr:
        t.y = t.y - Math.floor(t.y);
        break;
      case ei:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Vr:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
};
It.DEFAULT_IMAGE = null;
It.DEFAULT_MAPPING = 300;
It.DEFAULT_ANISOTROPY = 1;
ma = Symbol.iterator;
var st = class {
  constructor(e = 0, t = 0, i = 0, n = 1) {
    this.x = e, this.y = t, this.z = i, this.w = n;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, i, n) {
    return this.x = e, this.y = t, this.z = i, this.w = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, i = this.y, n = this.z, r = this.w, s = e.elements;
    return this.x = s[0] * t + s[4] * i + s[8] * n + s[12] * r, this.y = s[1] * t + s[5] * i + s[9] * n + s[13] * r, this.z = s[2] * t + s[6] * i + s[10] * n + s[14] * r, this.w = s[3] * t + s[7] * i + s[11] * n + s[15] * r, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, i, n, r;
    const o = e.elements, c = o[0], l = o[4], u = o[8], f = o[1], h = o[5], p = o[9], M = o[2], E = o[6], g = o[10];
    if (Math.abs(l - f) < 0.01 && Math.abs(u - M) < 0.01 && Math.abs(p - E) < 0.01) {
      if (Math.abs(l + f) < 0.1 && Math.abs(u + M) < 0.1 && Math.abs(p + E) < 0.1 && Math.abs(c + h + g - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const P = (c + 1) / 2, w = (h + 1) / 2, x = (g + 1) / 2, T = (l + f) / 4, b = (u + M) / 4, I = (p + E) / 4;
      return P > w && P > x ? P < 0.01 ? (i = 0, n = 0.707106781, r = 0.707106781) : (i = Math.sqrt(P), n = T / i, r = b / i) : w > x ? w < 0.01 ? (i = 0.707106781, n = 0, r = 0.707106781) : (n = Math.sqrt(w), i = T / n, r = I / n) : x < 0.01 ? (i = 0.707106781, n = 0.707106781, r = 0) : (r = Math.sqrt(x), i = b / r, n = I / r), this.set(i, n, r, t), this;
    }
    let d = Math.sqrt((E - p) * (E - p) + (u - M) * (u - M) + (f - l) * (f - l));
    return Math.abs(d) < 1e-3 && (d = 1), this.x = (E - p) / d, this.y = (u - M) / d, this.z = (f - l) / d, this.w = Math.acos((c + h + g - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Oe(this.x, e.x, t.x), this.y = Oe(this.y, e.y, t.y), this.z = Oe(this.z, e.z, t.z), this.w = Oe(this.w, e.w, t.w), this;
  }
  clampScalar(e, t) {
    return this.x = Oe(this.x, e, t), this.y = Oe(this.y, e, t), this.z = Oe(this.z, e, t), this.w = Oe(this.w, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Oe(i, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[ma]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
ha = st;
ha.prototype.isVector4 = !0;
var Tl = class extends bi {
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Et,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new st(0, 0, e, t), this.scissorTest = !1, this.viewport = new st(0, 0, e, t), this.textures = [];
    const n = new It({
      width: e,
      height: t,
      depth: i.depth
    }), r = i.count;
    for (let s = 0; s < r; s++)
      this.textures[s] = n.clone(), this.textures[s].isRenderTargetTexture = !0, this.textures[s].renderTarget = this;
    this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview, this.useArrayDepthTexture = i.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: Et,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let i = 0; i < this.textures.length; i++) this.textures[i].setValues(t);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, i = 1) {
    if (this.width !== e || this.height !== t || this.depth !== i) {
      this.width = e, this.height = t, this.depth = i;
      for (let n = 0, r = this.textures.length; n < r; n++)
        this.textures[n].image.width = e, this.textures[n].image.height = t, this.textures[n].image.depth = i, this.textures[n].isData3DTexture !== !0 && (this.textures[n].isArrayTexture = this.textures[n].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, i = e.textures.length; t < i; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const n = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Kr(n);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Xt = class extends Tl {
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}, ba = class extends It {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = xt, this.minFilter = xt, this.wrapR = ei, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, bl = class extends It {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = xt, this.minFilter = xt, this.wrapR = ei, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, lt = class Aa {
  constructor(t, i, n, r, s, a, o, c, l, u, f, h, p, M, E, g) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, i, n, r, s, a, o, c, l, u, f, h, p, M, E, g);
  }
  set(t, i, n, r, s, a, o, c, l, u, f, h, p, M, E, g) {
    const d = this.elements;
    return d[0] = t, d[4] = i, d[8] = n, d[12] = r, d[1] = s, d[5] = a, d[9] = o, d[13] = c, d[2] = l, d[6] = u, d[10] = f, d[14] = h, d[3] = p, d[7] = M, d[11] = E, d[15] = g, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Aa().fromArray(this.elements);
  }
  copy(t) {
    const i = this.elements, n = t.elements;
    return i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8], i[9] = n[9], i[10] = n[10], i[11] = n[11], i[12] = n[12], i[13] = n[13], i[14] = n[14], i[15] = n[15], this;
  }
  copyPosition(t) {
    const i = this.elements, n = t.elements;
    return i[12] = n[12], i[13] = n[13], i[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const i = t.elements;
    return this.set(i[0], i[3], i[6], 0, i[1], i[4], i[7], 0, i[2], i[5], i[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, i, n) {
    return this.determinantAffine() === 0 ? (t.set(1, 0, 0), i.set(0, 1, 0), n.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), i.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(t, i, n) {
    return this.set(t.x, i.x, n.x, 0, t.y, i.y, n.y, 0, t.z, i.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    if (t.determinantAffine() === 0) return this.identity();
    const i = this.elements, n = t.elements, r = 1 / Li.setFromMatrixColumn(t, 0).length(), s = 1 / Li.setFromMatrixColumn(t, 1).length(), a = 1 / Li.setFromMatrixColumn(t, 2).length();
    return i[0] = n[0] * r, i[1] = n[1] * r, i[2] = n[2] * r, i[3] = 0, i[4] = n[4] * s, i[5] = n[5] * s, i[6] = n[6] * s, i[7] = 0, i[8] = n[8] * a, i[9] = n[9] * a, i[10] = n[10] * a, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const i = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(r), l = Math.sin(r), u = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const h = a * u, p = a * f, M = o * u, E = o * f;
      i[0] = c * u, i[4] = -c * f, i[8] = l, i[1] = p + M * l, i[5] = h - E * l, i[9] = -o * c, i[2] = E - h * l, i[6] = M + p * l, i[10] = a * c;
    } else if (t.order === "YXZ") {
      const h = c * u, p = c * f, M = l * u, E = l * f;
      i[0] = h + E * o, i[4] = M * o - p, i[8] = a * l, i[1] = a * f, i[5] = a * u, i[9] = -o, i[2] = p * o - M, i[6] = E + h * o, i[10] = a * c;
    } else if (t.order === "ZXY") {
      const h = c * u, p = c * f, M = l * u, E = l * f;
      i[0] = h - E * o, i[4] = -a * f, i[8] = M + p * o, i[1] = p + M * o, i[5] = a * u, i[9] = E - h * o, i[2] = -a * l, i[6] = o, i[10] = a * c;
    } else if (t.order === "ZYX") {
      const h = a * u, p = a * f, M = o * u, E = o * f;
      i[0] = c * u, i[4] = M * l - p, i[8] = h * l + E, i[1] = c * f, i[5] = E * l + h, i[9] = p * l - M, i[2] = -l, i[6] = o * c, i[10] = a * c;
    } else if (t.order === "YZX") {
      const h = a * c, p = a * l, M = o * c, E = o * l;
      i[0] = c * u, i[4] = E - h * f, i[8] = M * f + p, i[1] = f, i[5] = a * u, i[9] = -o * u, i[2] = -l * u, i[6] = p * f + M, i[10] = h - E * f;
    } else if (t.order === "XZY") {
      const h = a * c, p = a * l, M = o * c, E = o * l;
      i[0] = c * u, i[4] = -f, i[8] = l * u, i[1] = h * f + E, i[5] = a * u, i[9] = p * f - M, i[2] = M * f - p, i[6] = o * u, i[10] = E * f + h;
    }
    return i[3] = 0, i[7] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Al, t, wl);
  }
  lookAt(t, i, n) {
    const r = this.elements;
    return Tt.subVectors(t, i), Tt.lengthSq() === 0 && (Tt.z = 1), Tt.normalize(), ai.crossVectors(n, Tt), ai.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Tt.x += 1e-4 : Tt.z += 1e-4, Tt.normalize(), ai.crossVectors(n, Tt)), ai.normalize(), yn.crossVectors(Tt, ai), r[0] = ai.x, r[4] = yn.x, r[8] = Tt.x, r[1] = ai.y, r[5] = yn.y, r[9] = Tt.y, r[2] = ai.z, r[6] = yn.z, r[10] = Tt.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, i) {
    const n = t.elements, r = i.elements, s = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], u = n[1], f = n[5], h = n[9], p = n[13], M = n[2], E = n[6], g = n[10], d = n[14], P = n[3], w = n[7], x = n[11], T = n[15], b = r[0], I = r[4], v = r[8], y = r[12], W = r[1], A = r[5], H = r[9], K = r[13], k = r[2], G = r[6], q = r[10], O = r[14], j = r[3], ee = r[7], ne = r[11], de = r[15];
    return s[0] = a * b + o * W + c * k + l * j, s[4] = a * I + o * A + c * G + l * ee, s[8] = a * v + o * H + c * q + l * ne, s[12] = a * y + o * K + c * O + l * de, s[1] = u * b + f * W + h * k + p * j, s[5] = u * I + f * A + h * G + p * ee, s[9] = u * v + f * H + h * q + p * ne, s[13] = u * y + f * K + h * O + p * de, s[2] = M * b + E * W + g * k + d * j, s[6] = M * I + E * A + g * G + d * ee, s[10] = M * v + E * H + g * q + d * ne, s[14] = M * y + E * K + g * O + d * de, s[3] = P * b + w * W + x * k + T * j, s[7] = P * I + w * A + x * G + T * ee, s[11] = P * v + w * H + x * q + T * ne, s[15] = P * y + w * K + x * O + T * de, this;
  }
  multiplyScalar(t) {
    const i = this.elements;
    return i[0] *= t, i[4] *= t, i[8] *= t, i[12] *= t, i[1] *= t, i[5] *= t, i[9] *= t, i[13] *= t, i[2] *= t, i[6] *= t, i[10] *= t, i[14] *= t, i[3] *= t, i[7] *= t, i[11] *= t, i[15] *= t, this;
  }
  determinant() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], c = t[9], l = t[13], u = t[2], f = t[6], h = t[10], p = t[14], M = t[3], E = t[7], g = t[11], d = t[15], P = c * p - l * h, w = o * p - l * f, x = o * h - c * f, T = a * p - l * u, b = a * h - c * u, I = a * f - o * u;
    return i * (E * P - g * w + d * x) - n * (M * P - g * T + d * b) + r * (M * w - E * T + d * I) - s * (M * x - E * b + g * I);
  }
  determinantAffine() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], c = t[2], l = t[6], u = t[10];
    return i * (a * u - o * l) - n * (s * u - o * c) + r * (s * l - a * c);
  }
  transpose() {
    const t = this.elements;
    let i;
    return i = t[1], t[1] = t[4], t[4] = i, i = t[2], t[2] = t[8], t[8] = i, i = t[6], t[6] = t[9], t[9] = i, i = t[3], t[3] = t[12], t[12] = i, i = t[7], t[7] = t[13], t[13] = i, i = t[11], t[11] = t[14], t[14] = i, this;
  }
  setPosition(t, i, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = i, r[14] = n), this;
  }
  invert() {
    const t = this.elements, i = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], c = t[6], l = t[7], u = t[8], f = t[9], h = t[10], p = t[11], M = t[12], E = t[13], g = t[14], d = t[15], P = i * o - n * a, w = i * c - r * a, x = i * l - s * a, T = n * c - r * o, b = n * l - s * o, I = r * l - s * c, v = u * E - f * M, y = u * g - h * M, W = u * d - p * M, A = f * g - h * E, H = f * d - p * E, K = h * d - p * g, k = P * K - w * H + x * A + T * W - b * y + I * v;
    if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const G = 1 / k;
    return t[0] = (o * K - c * H + l * A) * G, t[1] = (r * H - n * K - s * A) * G, t[2] = (E * I - g * b + d * T) * G, t[3] = (h * b - f * I - p * T) * G, t[4] = (c * W - a * K - l * y) * G, t[5] = (i * K - r * W + s * y) * G, t[6] = (g * x - M * I - d * w) * G, t[7] = (u * I - h * x + p * w) * G, t[8] = (a * H - o * W + l * v) * G, t[9] = (n * W - i * H - s * v) * G, t[10] = (M * b - E * x + d * P) * G, t[11] = (f * x - u * b - p * P) * G, t[12] = (o * y - a * A - c * v) * G, t[13] = (i * A - n * y + r * v) * G, t[14] = (E * w - M * T - g * P) * G, t[15] = (u * T - f * w + h * P) * G, this;
  }
  scale(t) {
    const i = this.elements, n = t.x, r = t.y, s = t.z;
    return i[0] *= n, i[4] *= r, i[8] *= s, i[1] *= n, i[5] *= r, i[9] *= s, i[2] *= n, i[6] *= r, i[10] *= s, i[3] *= n, i[7] *= r, i[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, i = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(i, n, r));
  }
  makeTranslation(t, i, n) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, i, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, i, -n, 0, 0, n, i, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(i, 0, n, 0, 0, 1, 0, 0, -n, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, i) {
    const n = Math.cos(i), r = Math.sin(i), s = 1 - n, a = t.x, o = t.y, c = t.z, l = s * a, u = s * o;
    return this.set(l * a + n, l * o - r * c, l * c + r * o, 0, l * o + r * c, u * o + n, u * c - r * a, 0, l * c - r * o, u * c + r * a, s * c * c + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, i, n) {
    return this.set(t, 0, 0, 0, 0, i, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, i, n, r, s, a) {
    return this.set(1, n, s, 0, t, 1, a, 0, i, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, i, n) {
    const r = this.elements, s = i._x, a = i._y, o = i._z, c = i._w, l = s + s, u = a + a, f = o + o, h = s * l, p = s * u, M = s * f, E = a * u, g = a * f, d = o * f, P = c * l, w = c * u, x = c * f, T = n.x, b = n.y, I = n.z;
    return r[0] = (1 - (E + d)) * T, r[1] = (p + x) * T, r[2] = (M - w) * T, r[3] = 0, r[4] = (p - x) * b, r[5] = (1 - (h + d)) * b, r[6] = (g + P) * b, r[7] = 0, r[8] = (M + w) * I, r[9] = (g - P) * I, r[10] = (1 - (h + E)) * I, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, i, n) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), i.identity(), this;
    let a = Li.set(r[0], r[1], r[2]).length();
    const o = Li.set(r[4], r[5], r[6]).length(), c = Li.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Nt.copy(this);
    const l = 1 / a, u = 1 / o, f = 1 / c;
    return Nt.elements[0] *= l, Nt.elements[1] *= l, Nt.elements[2] *= l, Nt.elements[4] *= u, Nt.elements[5] *= u, Nt.elements[6] *= u, Nt.elements[8] *= f, Nt.elements[9] *= f, Nt.elements[10] *= f, i.setFromRotationMatrix(Nt), n.x = a, n.y = o, n.z = c, this;
  }
  makePerspective(t, i, n, r, s, a, o = Ki, c = !1) {
    const l = this.elements, u = 2 * s / (i - t), f = 2 * s / (n - r), h = (i + t) / (i - t), p = (n + r) / (n - r);
    let M, E;
    if (c)
      M = s / (a - s), E = a * s / (a - s);
    else if (o === 2e3)
      M = -(a + s) / (a - s), E = -2 * a * s / (a - s);
    else if (o === 2001)
      M = -a / (a - s), E = -a * s / (a - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = u, l[4] = 0, l[8] = h, l[12] = 0, l[1] = 0, l[5] = f, l[9] = p, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = M, l[14] = E, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, i, n, r, s, a, o = Ki, c = !1) {
    const l = this.elements, u = 2 / (i - t), f = 2 / (n - r), h = -(i + t) / (i - t), p = -(n + r) / (n - r);
    let M, E;
    if (c)
      M = 1 / (a - s), E = a / (a - s);
    else if (o === 2e3)
      M = -2 / (a - s), E = -(a + s) / (a - s);
    else if (o === 2001)
      M = -1 / (a - s), E = -s / (a - s);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = u, l[4] = 0, l[8] = 0, l[12] = h, l[1] = 0, l[5] = f, l[9] = 0, l[13] = p, l[2] = 0, l[6] = 0, l[10] = M, l[14] = E, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const i = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++) if (i[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, i = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + i];
    return this;
  }
  toArray(t = [], i = 0) {
    const n = this.elements;
    return t[i] = n[0], t[i + 1] = n[1], t[i + 2] = n[2], t[i + 3] = n[3], t[i + 4] = n[4], t[i + 5] = n[5], t[i + 6] = n[6], t[i + 7] = n[7], t[i + 8] = n[8], t[i + 9] = n[9], t[i + 10] = n[10], t[i + 11] = n[11], t[i + 12] = n[12], t[i + 13] = n[13], t[i + 14] = n[14], t[i + 15] = n[15], t;
  }
};
ua = lt;
ua.prototype.isMatrix4 = !0;
var Li = /* @__PURE__ */ new B(), Nt = /* @__PURE__ */ new lt(), Al = /* @__PURE__ */ new B(0, 0, 0), wl = /* @__PURE__ */ new B(1, 1, 1), ai = /* @__PURE__ */ new B(), yn = /* @__PURE__ */ new B(), Tt = /* @__PURE__ */ new B(), Ms = /* @__PURE__ */ new lt(), Ss = /* @__PURE__ */ new Ai(), gn = class wa {
  constructor(t = 0, i = 0, n = 0, r = wa.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = i, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, i, n, r = this._order) {
    return this._x = t, this._y = i, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, i = this._order, n = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], c = r[1], l = r[5], u = r[9], f = r[2], h = r[6], p = r[10];
    switch (i) {
      case "XYZ":
        this._y = Math.asin(Oe(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-u, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(h, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Oe(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Oe(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-f, p), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Oe(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(h, p), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(Oe(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-u, l), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Oe(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(h, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-u, p), this._y = 0);
        break;
      default:
        Te("Euler: .setFromRotationMatrix() encountered an unknown order: " + i);
    }
    return this._order = i, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, i, n) {
    return Ms.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Ms, i, n);
  }
  setFromVector3(t, i = this._order) {
    return this.set(t.x, t.y, t.z, i);
  }
  reorder(t) {
    return Ss.setFromEuler(this), this.setFromQuaternion(Ss, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], i = 0) {
    return t[i] = this._x, t[i + 1] = this._y, t[i + 2] = this._z, t[i + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
gn.DEFAULT_ORDER = "XYZ";
var Ra = class {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}, Rl = 0, xs = /* @__PURE__ */ new B(), Di = /* @__PURE__ */ new Ai(), Zt = /* @__PURE__ */ new lt(), Tn = /* @__PURE__ */ new B(), nn = /* @__PURE__ */ new B(), Cl = /* @__PURE__ */ new B(), Pl = /* @__PURE__ */ new Ai(), Es = /* @__PURE__ */ new B(1, 0, 0), ys = /* @__PURE__ */ new B(0, 1, 0), Ts = /* @__PURE__ */ new B(0, 0, 1), bs = { type: "added" }, Ll = { type: "removed" }, Ii = {
  type: "childadded",
  child: null
}, mr = {
  type: "childremoved",
  child: null
}, ni = class Kn extends bi {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Rl++ }), this.uuid = Qi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Kn.DEFAULT_UP.clone();
    const t = new B(), i = new gn(), n = new Ai(), r = new B(1, 1, 1);
    function s() {
      n.setFromEuler(i, !1);
    }
    function a() {
      i.setFromQuaternion(n, void 0, !1);
    }
    i._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: { value: new lt() },
      normalMatrix: { value: new De() }
    }), this.matrix = new lt(), this.matrixWorld = new lt(), this.matrixAutoUpdate = Kn.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ra(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, i) {
    this.quaternion.setFromAxisAngle(t, i);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, i) {
    return Di.setFromAxisAngle(t, i), this.quaternion.multiply(Di), this;
  }
  rotateOnWorldAxis(t, i) {
    return Di.setFromAxisAngle(t, i), this.quaternion.premultiply(Di), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Es, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(ys, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Ts, t);
  }
  translateOnAxis(t, i) {
    return xs.copy(t).applyQuaternion(this.quaternion), this.position.add(xs.multiplyScalar(i)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Es, t);
  }
  translateY(t) {
    return this.translateOnAxis(ys, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Ts, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Zt.copy(this.matrixWorld).invert());
  }
  lookAt(t, i, n) {
    t.isVector3 ? Tn.copy(t) : Tn.set(t, i, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), nn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Zt.lookAt(nn, Tn, this.up) : Zt.lookAt(Tn, nn, this.up), this.quaternion.setFromRotationMatrix(Zt), r && (Zt.extractRotation(r.matrixWorld), Di.setFromRotationMatrix(Zt), this.quaternion.premultiply(Di.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this;
    }
    return t === this ? (Ce("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(bs), Ii.child = t, this.dispatchEvent(Ii), Ii.child = null) : Ce("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const i = this.children.indexOf(t);
    return i !== -1 && (t.parent = null, this.children.splice(i, 1), t.dispatchEvent(Ll), mr.child = t, this.dispatchEvent(mr), mr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Zt.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Zt.multiply(t.parent.matrixWorld)), t.applyMatrix4(Zt), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(bs), Ii.child = t, this.dispatchEvent(Ii), Ii.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, i) {
    if (this[t] === i) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const s = this.children[n].getObjectByProperty(t, i);
      if (s !== void 0) return s;
    }
  }
  getObjectsByProperty(t, i, n = []) {
    this[t] === i && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++) r[s].getObjectsByProperty(t, i, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(nn, t, Cl), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(nn, Pl, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const i = this.matrixWorld.elements;
    return t.set(i[8], i[9], i[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const i = this.parent;
    i !== null && (t(i), i.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const t = this.pivot;
    if (t !== null) {
      const i = t.x, n = t.y, r = t.z, s = this.matrix.elements;
      s[12] += i - s[0] * i - s[4] * n - s[8] * r, s[13] += n - s[1] * i - s[5] * n - s[9] * r, s[14] += r - s[2] * i - s[6] * n - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, i, n = !1) {
    const r = this.parent;
    if (t === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), i === !0) {
      const s = this.children;
      for (let a = 0, o = s.length; a < o; a++) s[a].updateWorldMatrix(!1, !0, n);
    }
  }
  toJSON(t) {
    const i = t === void 0 || typeof t == "string", n = {};
    i && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, c) {
      return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(t)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c)) for (let l = 0, u = c.length; l < u; l++) {
          const f = c[l];
          s(t.shapes, f);
        }
        else s(t.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const o = [];
      for (let c = 0, l = this.material.length; c < l; c++) o.push(s(t.materials, this.material[c]));
      r.material = o;
    } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        r.animations.push(s(t.animations, c));
      }
    }
    if (i) {
      const o = a(t.geometries), c = a(t.materials), l = a(t.textures), u = a(t.images), f = a(t.shapes), h = a(t.skeletons), p = a(t.animations), M = a(t.nodes);
      o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), u.length > 0 && (n.images = u), f.length > 0 && (n.shapes = f), h.length > 0 && (n.skeletons = h), p.length > 0 && (n.animations = p), M.length > 0 && (n.nodes = M);
    }
    return n.object = r, n;
    function a(o) {
      const c = [];
      for (const l in o) {
        const u = o[l];
        delete u.metadata, c.push(u);
      }
      return c;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, i = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.pivot = t.pivot !== null ? t.pivot.clone() : null, this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), i === !0) for (let n = 0; n < t.children.length; n++) {
      const r = t.children[n];
      this.add(r.clone());
    }
    return this;
  }
};
ni.DEFAULT_UP = /* @__PURE__ */ new B(0, 1, 0);
ni.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ni.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var bn = class extends ni {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, Dl = { type: "move" }, gr = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new bn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new bn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new B(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new B()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new bn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new B(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new B(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const i of e.hand.values()) this._getHandJoint(t, i);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, i) {
    let n = null, r = null, s = null;
    const a = this._targetRay, o = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        s = !0;
        for (const M of e.hand.values()) {
          const E = t.getJointPose(M, i), g = this._getHandJoint(c, M);
          E !== null && (g.matrix.fromArray(E.transform.matrix), g.matrix.decompose(g.position, g.rotation, g.scale), g.matrixWorldNeedsUpdate = !0, g.jointRadius = E.radius), g.visible = E !== null;
        }
        const l = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], f = l.position.distanceTo(u.position), h = 0.02, p = 5e-3;
        c.inputState.pinching && f > h + p ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= h - p && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else o !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, o.eventsEnabled && o.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      a !== null && (n = t.getPose(e.targetRaySpace, i), n === null && r !== null && (n = r), n !== null && (a.matrix.fromArray(n.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1, n.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(Dl)));
    }
    return a !== null && (a.visible = n !== null), o !== null && (o.visible = r !== null), c !== null && (c.visible = s !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new bn();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}, Ca = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, oi = {
  h: 0,
  s: 0,
  l: 0
}, An = {
  h: 0,
  s: 0,
  l: 0
};
function vr(e, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + (t - e) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e;
}
var He = class {
  constructor(e, t, i) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i);
  }
  set(e, t, i) {
    if (t === void 0 && i === void 0) {
      const n = e;
      n && n.isColor ? this.copy(n) : typeof n == "number" ? this.setHex(n) : typeof n == "string" && this.setStyle(n);
    } else this.setRGB(e, t, i);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = wt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ze.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, i, n = ze.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, ze.colorSpaceToWorking(this, n), this;
  }
  setHSL(e, t, i, n = ze.workingColorSpace) {
    if (e = Yr(e, 1), t = Oe(t, 0, 1), i = Oe(i, 0, 1), t === 0) this.r = this.g = this.b = i;
    else {
      const r = i <= 0.5 ? i * (1 + t) : i + t - i * t, s = 2 * i - r;
      this.r = vr(s, r, e + 1 / 3), this.g = vr(s, r, e), this.b = vr(s, r, e - 1 / 3);
    }
    return ze.colorSpaceToWorking(this, n), this;
  }
  setStyle(e, t = wt) {
    function i(r) {
      r !== void 0 && parseFloat(r) < 1 && Te("Color: Alpha component of " + e + " will be ignored.");
    }
    let n;
    if (n = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const s = n[1], a = n[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          Te("Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = n[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      Te("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = wt) {
    const i = Ca[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : Te("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = ti(e.r), this.g = ti(e.g), this.b = ti(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Yi(e.r), this.g = Yi(e.g), this.b = Yi(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = wt) {
    return ze.workingToColorSpace(vt.copy(this), e), Math.round(Oe(vt.r * 255, 0, 255)) * 65536 + Math.round(Oe(vt.g * 255, 0, 255)) * 256 + Math.round(Oe(vt.b * 255, 0, 255));
  }
  getHexString(e = wt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ze.workingColorSpace) {
    ze.workingToColorSpace(vt.copy(this), t);
    const i = vt.r, n = vt.g, r = vt.b, s = Math.max(i, n, r), a = Math.min(i, n, r);
    let o, c;
    const l = (a + s) / 2;
    if (a === s)
      o = 0, c = 0;
    else {
      const u = s - a;
      switch (c = l <= 0.5 ? u / (s + a) : u / (2 - s - a), s) {
        case i:
          o = (n - r) / u + (n < r ? 6 : 0);
          break;
        case n:
          o = (r - i) / u + 2;
          break;
        case r:
          o = (i - n) / u + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = c, e.l = l, e;
  }
  getRGB(e, t = ze.workingColorSpace) {
    return ze.workingToColorSpace(vt.copy(this), t), e.r = vt.r, e.g = vt.g, e.b = vt.b, e;
  }
  getStyle(e = wt) {
    ze.workingToColorSpace(vt.copy(this), e);
    const t = vt.r, i = vt.g, n = vt.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, i) {
    return this.getHSL(oi), this.setHSL(oi.h + e, oi.s + t, oi.l + i);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, i) {
    return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this;
  }
  lerpHSL(e, t) {
    this.getHSL(oi), e.getHSL(An);
    const i = dn(oi.h, An.h, t), n = dn(oi.s, An.s, t), r = dn(oi.l, An.l, t);
    return this.setHSL(i, n, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, i = this.g, n = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * i + r[6] * n, this.g = r[1] * t + r[4] * i + r[7] * n, this.b = r[2] * t + r[5] * i + r[8] * n, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, vt = /* @__PURE__ */ new He();
He.NAMES = Ca;
var Il = class extends ni {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new gn(), this.environmentIntensity = 1, this.environmentRotation = new gn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, Ft = /* @__PURE__ */ new B(), $t = /* @__PURE__ */ new B(), _r = /* @__PURE__ */ new B(), Jt = /* @__PURE__ */ new B(), Ui = /* @__PURE__ */ new B(), Ni = /* @__PURE__ */ new B(), As = /* @__PURE__ */ new B(), Mr = /* @__PURE__ */ new B(), Sr = /* @__PURE__ */ new B(), xr = /* @__PURE__ */ new B(), Er = /* @__PURE__ */ new st(), yr = /* @__PURE__ */ new st(), Tr = /* @__PURE__ */ new st(), rn = class Wi {
  constructor(t = new B(), i = new B(), n = new B()) {
    this.a = t, this.b = i, this.c = n;
  }
  static getNormal(t, i, n, r) {
    r.subVectors(n, i), Ft.subVectors(t, i), r.cross(Ft);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, i, n, r, s) {
    Ft.subVectors(r, i), $t.subVectors(n, i), _r.subVectors(t, i);
    const a = Ft.dot(Ft), o = Ft.dot($t), c = Ft.dot(_r), l = $t.dot($t), u = $t.dot(_r), f = a * l - o * o;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const h = 1 / f, p = (l * c - o * u) * h, M = (a * u - o * c) * h;
    return s.set(1 - p - M, M, p);
  }
  static containsPoint(t, i, n, r) {
    return this.getBarycoord(t, i, n, r, Jt) === null ? !1 : Jt.x >= 0 && Jt.y >= 0 && Jt.x + Jt.y <= 1;
  }
  static getInterpolation(t, i, n, r, s, a, o, c) {
    return this.getBarycoord(t, i, n, r, Jt) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, Jt.x), c.addScaledVector(a, Jt.y), c.addScaledVector(o, Jt.z), c);
  }
  static getInterpolatedAttribute(t, i, n, r, s, a) {
    return Er.setScalar(0), yr.setScalar(0), Tr.setScalar(0), Er.fromBufferAttribute(t, i), yr.fromBufferAttribute(t, n), Tr.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(Er, s.x), a.addScaledVector(yr, s.y), a.addScaledVector(Tr, s.z), a;
  }
  static isFrontFacing(t, i, n, r) {
    return Ft.subVectors(n, i), $t.subVectors(t, i), Ft.cross($t).dot(r) < 0;
  }
  set(t, i, n) {
    return this.a.copy(t), this.b.copy(i), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, i, n, r) {
    return this.a.copy(t[i]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, i, n, r) {
    return this.a.fromBufferAttribute(t, i), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Ft.subVectors(this.c, this.b), $t.subVectors(this.a, this.b), Ft.cross($t).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Wi.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, i) {
    return Wi.getBarycoord(t, this.a, this.b, this.c, i);
  }
  getInterpolation(t, i, n, r, s) {
    return Wi.getInterpolation(t, this.a, this.b, this.c, i, n, r, s);
  }
  containsPoint(t) {
    return Wi.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Wi.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, i) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Ui.subVectors(r, n), Ni.subVectors(s, n), Mr.subVectors(t, n);
    const c = Ui.dot(Mr), l = Ni.dot(Mr);
    if (c <= 0 && l <= 0) return i.copy(n);
    Sr.subVectors(t, r);
    const u = Ui.dot(Sr), f = Ni.dot(Sr);
    if (u >= 0 && f <= u) return i.copy(r);
    const h = c * f - u * l;
    if (h <= 0 && c >= 0 && u <= 0)
      return a = c / (c - u), i.copy(n).addScaledVector(Ui, a);
    xr.subVectors(t, s);
    const p = Ui.dot(xr), M = Ni.dot(xr);
    if (M >= 0 && p <= M) return i.copy(s);
    const E = p * l - c * M;
    if (E <= 0 && l >= 0 && M <= 0)
      return o = l / (l - M), i.copy(n).addScaledVector(Ni, o);
    const g = u * M - p * f;
    if (g <= 0 && f - u >= 0 && p - M >= 0)
      return As.subVectors(s, r), o = (f - u) / (f - u + (p - M)), i.copy(r).addScaledVector(As, o);
    const d = 1 / (g + E + h);
    return a = E * d, o = h * d, i.copy(n).addScaledVector(Ui, a).addScaledVector(Ni, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, vn = class {
  constructor(e = new B(1 / 0, 1 / 0, 1 / 0), t = new B(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(Ot.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(Ot.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const i = Ot.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(i), this.max.copy(e).add(i), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const i = e.geometry;
    if (i !== void 0) {
      const r = i.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let s = 0, a = r.count; s < a; s++)
        e.isMesh === !0 ? e.getVertexPosition(s, Ot) : Ot.fromBufferAttribute(r, s), Ot.applyMatrix4(e.matrixWorld), this.expandByPoint(Ot);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), wn.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), wn.copy(i.boundingBox)), wn.applyMatrix4(e.matrixWorld), this.union(wn);
    }
    const n = e.children;
    for (let r = 0, s = n.length; r < s; r++) this.expandByObject(n[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Ot), Ot.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(sn), Rn.subVectors(this.max, sn), Fi.subVectors(e.a, sn), Oi.subVectors(e.b, sn), Bi.subVectors(e.c, sn), li.subVectors(Oi, Fi), ci.subVectors(Bi, Oi), pi.subVectors(Fi, Bi);
    let t = [
      0,
      -li.z,
      li.y,
      0,
      -ci.z,
      ci.y,
      0,
      -pi.z,
      pi.y,
      li.z,
      0,
      -li.x,
      ci.z,
      0,
      -ci.x,
      pi.z,
      0,
      -pi.x,
      -li.y,
      li.x,
      0,
      -ci.y,
      ci.x,
      0,
      -pi.y,
      pi.x,
      0
    ];
    return !br(t, Fi, Oi, Bi, Rn) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !br(t, Fi, Oi, Bi, Rn)) ? !1 : (Cn.crossVectors(li, ci), t = [
      Cn.x,
      Cn.y,
      Cn.z
    ], br(t, Fi, Oi, Bi, Rn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Ot).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ot).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Qt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Qt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Qt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Qt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Qt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Qt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Qt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Qt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Qt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}, Qt = [
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B()
], Ot = /* @__PURE__ */ new B(), wn = /* @__PURE__ */ new vn(), Fi = /* @__PURE__ */ new B(), Oi = /* @__PURE__ */ new B(), Bi = /* @__PURE__ */ new B(), li = /* @__PURE__ */ new B(), ci = /* @__PURE__ */ new B(), pi = /* @__PURE__ */ new B(), sn = /* @__PURE__ */ new B(), Rn = /* @__PURE__ */ new B(), Cn = /* @__PURE__ */ new B(), mi = /* @__PURE__ */ new B();
function br(e, t, i, n, r) {
  for (let s = 0, a = e.length - 3; s <= a; s += 3) {
    mi.fromArray(e, s);
    const o = r.x * Math.abs(mi.x) + r.y * Math.abs(mi.y) + r.z * Math.abs(mi.z), c = t.dot(mi), l = i.dot(mi), u = n.dot(mi);
    if (Math.max(-Math.max(c, l, u), Math.min(c, l, u)) > o) return !1;
  }
  return !0;
}
var at = /* @__PURE__ */ new B(), Pn = /* @__PURE__ */ new Ie(), Ul = 0, qt = class extends bi {
  constructor(e, t, i = !1) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Ul++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = Qo, this.updateRanges = [], this.gpuType = nr, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, i) {
    e *= this.itemSize, i *= t.itemSize;
    for (let n = 0, r = this.itemSize; n < r; n++) this.array[e + n] = t.array[i + n];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, i = this.count; t < i; t++)
      Pn.fromBufferAttribute(this, t), Pn.applyMatrix3(e), this.setXY(t, Pn.x, Pn.y);
    else if (this.itemSize === 3) for (let t = 0, i = this.count; t < i; t++)
      at.fromBufferAttribute(this, t), at.applyMatrix3(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      at.fromBufferAttribute(this, t), at.applyMatrix4(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      at.fromBufferAttribute(this, t), at.applyNormalMatrix(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      at.fromBufferAttribute(this, t), at.transformDirection(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = ki(i, this.array)), i;
  }
  setComponent(e, t, i) {
    return this.normalized && (i = Mt(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = ki(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = ki(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = ki(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = ki(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, i) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), i = Mt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this;
  }
  setXYZ(e, t, i, n) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), i = Mt(i, this.array), n = Mt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this;
  }
  setXYZW(e, t, i, n, r) {
    return e *= this.itemSize, this.normalized && (t = Mt(t, this.array), i = Mt(i, this.array), n = Mt(n, this.array), r = Mt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Pa = class extends qt {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}, La = class extends qt {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}, ii = class extends qt {
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}, Nl = /* @__PURE__ */ new vn(), an = /* @__PURE__ */ new B(), Ar = /* @__PURE__ */ new B(), Zr = class {
  constructor(e = new B(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : Nl.setFromPoints(e).getCenter(i);
    let n = 0;
    for (let r = 0, s = e.length; r < s; r++) n = Math.max(n, i.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(n), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const i = this.center.distanceToSquared(e);
    return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    an.subVectors(e, this.center);
    const t = an.lengthSq();
    if (t > this.radius * this.radius) {
      const i = Math.sqrt(t), n = (i - this.radius) * 0.5;
      this.center.addScaledVector(an, n / i), this.radius += n;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Ar.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(an.copy(e.center).add(Ar)), this.expandByPoint(an.copy(e.center).sub(Ar))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}, Fl = 0, Lt = /* @__PURE__ */ new lt(), wr = /* @__PURE__ */ new ni(), zi = /* @__PURE__ */ new B(), bt = /* @__PURE__ */ new vn(), on = /* @__PURE__ */ new vn(), dt = /* @__PURE__ */ new B(), wi = class Da extends bi {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Fl++ }), this.uuid = Qi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (jo(t) ? La : Pa)(t, 1) : this.index = t, this;
  }
  setIndirect(t, i = 0) {
    return this.indirect = t, this.indirectOffset = i, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, i) {
    return this.attributes[t] = i, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, i, n = 0) {
    this.groups.push({
      start: t,
      count: i,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, i) {
    this.drawRange.start = t, this.drawRange.count = i;
  }
  applyMatrix4(t) {
    const i = this.attributes.position;
    i !== void 0 && (i.applyMatrix4(t), i.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new De().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  applyQuaternion(t) {
    return Lt.makeRotationFromQuaternion(t), this.applyMatrix4(Lt), this;
  }
  rotateX(t) {
    return Lt.makeRotationX(t), this.applyMatrix4(Lt), this;
  }
  rotateY(t) {
    return Lt.makeRotationY(t), this.applyMatrix4(Lt), this;
  }
  rotateZ(t) {
    return Lt.makeRotationZ(t), this.applyMatrix4(Lt), this;
  }
  translate(t, i, n) {
    return Lt.makeTranslation(t, i, n), this.applyMatrix4(Lt), this;
  }
  scale(t, i, n) {
    return Lt.makeScale(t, i, n), this.applyMatrix4(Lt), this;
  }
  lookAt(t) {
    return wr.lookAt(t), wr.updateMatrix(), this.applyMatrix4(wr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(zi).negate(), this.translate(zi.x, zi.y, zi.z), this;
  }
  setFromPoints(t) {
    const i = this.getAttribute("position");
    if (i === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new ii(n, 3));
    } else {
      const n = Math.min(t.length, i.count);
      for (let r = 0; r < n; r++) {
        const s = t[r];
        i.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > i.count && Te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), i.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new vn());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new B(-1 / 0, -1 / 0, -1 / 0), new B(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), i) for (let n = 0, r = i.length; n < r; n++) {
        const s = i[n];
        bt.setFromBufferAttribute(s), this.morphTargetsRelative ? (dt.addVectors(this.boundingBox.min, bt.min), this.boundingBox.expandByPoint(dt), dt.addVectors(this.boundingBox.max, bt.max), this.boundingBox.expandByPoint(dt)) : (this.boundingBox.expandByPoint(bt.min), this.boundingBox.expandByPoint(bt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Zr());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new B(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (bt.setFromBufferAttribute(t), i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s];
        on.setFromBufferAttribute(o), this.morphTargetsRelative ? (dt.addVectors(bt.min, on.min), bt.expandByPoint(dt), dt.addVectors(bt.max, on.max), bt.expandByPoint(dt)) : (bt.expandByPoint(on.min), bt.expandByPoint(on.max));
      }
      bt.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        dt.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(dt));
      if (i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s], c = this.morphTargetsRelative;
        for (let l = 0, u = o.count; l < u; l++)
          dt.fromBufferAttribute(o, l), c && (zi.fromBufferAttribute(t, l), dt.add(zi)), r = Math.max(r, n.distanceToSquared(dt));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, i = this.attributes;
    if (t === null || i.position === void 0 || i.normal === void 0 || i.uv === void 0) {
      Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = i.position, r = i.normal, s = i.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new qt(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], c = [];
    for (let v = 0; v < n.count; v++)
      o[v] = new B(), c[v] = new B();
    const l = new B(), u = new B(), f = new B(), h = new Ie(), p = new Ie(), M = new Ie(), E = new B(), g = new B();
    function d(v, y, W) {
      l.fromBufferAttribute(n, v), u.fromBufferAttribute(n, y), f.fromBufferAttribute(n, W), h.fromBufferAttribute(s, v), p.fromBufferAttribute(s, y), M.fromBufferAttribute(s, W), u.sub(l), f.sub(l), p.sub(h), M.sub(h);
      const A = 1 / (p.x * M.y - M.x * p.y);
      isFinite(A) && (E.copy(u).multiplyScalar(M.y).addScaledVector(f, -p.y).multiplyScalar(A), g.copy(f).multiplyScalar(p.x).addScaledVector(u, -M.x).multiplyScalar(A), o[v].add(E), o[y].add(E), o[W].add(E), c[v].add(g), c[y].add(g), c[W].add(g));
    }
    let P = this.groups;
    P.length === 0 && (P = [{
      start: 0,
      count: t.count
    }]);
    for (let v = 0, y = P.length; v < y; ++v) {
      const W = P[v], A = W.start, H = W.count;
      for (let K = A, k = A + H; K < k; K += 3) d(t.getX(K + 0), t.getX(K + 1), t.getX(K + 2));
    }
    const w = new B(), x = new B(), T = new B(), b = new B();
    function I(v) {
      T.fromBufferAttribute(r, v), b.copy(T);
      const y = o[v];
      w.copy(y), w.sub(T.multiplyScalar(T.dot(y))).normalize(), x.crossVectors(b, y);
      const W = x.dot(c[v]) < 0 ? -1 : 1;
      a.setXYZW(v, w.x, w.y, w.z, W);
    }
    for (let v = 0, y = P.length; v < y; ++v) {
      const W = P[v], A = W.start, H = W.count;
      for (let K = A, k = A + H; K < k; K += 3)
        I(t.getX(K + 0)), I(t.getX(K + 1)), I(t.getX(K + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const t = this.index, i = this.getAttribute("position");
    if (i !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== i.count)
        n = new qt(new Float32Array(i.count * 3), 3), this.setAttribute("normal", n);
      else for (let h = 0, p = n.count; h < p; h++) n.setXYZ(h, 0, 0, 0);
      const r = new B(), s = new B(), a = new B(), o = new B(), c = new B(), l = new B(), u = new B(), f = new B();
      if (t) for (let h = 0, p = t.count; h < p; h += 3) {
        const M = t.getX(h + 0), E = t.getX(h + 1), g = t.getX(h + 2);
        r.fromBufferAttribute(i, M), s.fromBufferAttribute(i, E), a.fromBufferAttribute(i, g), u.subVectors(a, s), f.subVectors(r, s), u.cross(f), o.fromBufferAttribute(n, M), c.fromBufferAttribute(n, E), l.fromBufferAttribute(n, g), o.add(u), c.add(u), l.add(u), n.setXYZ(M, o.x, o.y, o.z), n.setXYZ(E, c.x, c.y, c.z), n.setXYZ(g, l.x, l.y, l.z);
      }
      else for (let h = 0, p = i.count; h < p; h += 3)
        r.fromBufferAttribute(i, h + 0), s.fromBufferAttribute(i, h + 1), a.fromBufferAttribute(i, h + 2), u.subVectors(a, s), f.subVectors(r, s), u.cross(f), n.setXYZ(h + 0, u.x, u.y, u.z), n.setXYZ(h + 1, u.x, u.y, u.z), n.setXYZ(h + 2, u.x, u.y, u.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let i = 0, n = t.count; i < n; i++)
      dt.fromBufferAttribute(t, i), dt.normalize(), t.setXYZ(i, dt.x, dt.y, dt.z);
  }
  toNonIndexed() {
    function t(o, c) {
      const l = o.array, u = o.itemSize, f = o.normalized, h = new l.constructor(c.length * u);
      let p = 0, M = 0;
      for (let E = 0, g = c.length; E < g; E++) {
        o.isInterleavedBufferAttribute ? p = c[E] * o.data.stride + o.offset : p = c[E] * u;
        for (let d = 0; d < u; d++) h[M++] = l[p++];
      }
      return new qt(h, u, f);
    }
    if (this.index === null)
      return Te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const i = new Da(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const c = r[o], l = t(c, n);
      i.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let u = 0, f = l.length; u < f; u++) {
        const h = l[u], p = t(h, n);
        c.push(p);
      }
      i.morphAttributes[o] = c;
    }
    i.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      i.addGroup(l.start, l.count, l.materialIndex);
    }
    return i;
  }
  toJSON() {
    const t = { metadata: {
      version: 4.7,
      type: "BufferGeometry",
      generator: "BufferGeometry.toJSON"
    } };
    if (t.uuid = this.uuid, t.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const c = this.parameters;
      for (const l in c) c[l] !== void 0 && (t[l] = c[l]);
      return t;
    }
    t.data = { attributes: {} };
    const i = this.index;
    i !== null && (t.data.index = {
      type: i.array.constructor.name,
      array: Array.prototype.slice.call(i.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      t.data.attributes[c] = l.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], u = [];
      for (let f = 0, h = l.length; f < h; f++) {
        const p = l[f];
        u.push(p.toJSON(t.data));
      }
      u.length > 0 && (r[c] = u, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = o.toJSON()), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const i = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone());
    const r = t.attributes;
    for (const l in r) {
      const u = r[l];
      this.setAttribute(l, u.clone(i));
    }
    const s = t.morphAttributes;
    for (const l in s) {
      const u = [], f = s[l];
      for (let h = 0, p = f.length; h < p; h++) u.push(f[h].clone(i));
      this.morphAttributes[l] = u;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let l = 0, u = a.length; l < u; l++) {
      const f = a[l];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = t.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this._transformed = t._transformed, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Ol = 0, rr = class extends bi {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ol++ }), this.uuid = Qi(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new He(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = hr, this.stencilZFail = hr, this.stencilZPass = hr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const i = e[t];
        if (i === void 0) {
          Te(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === void 0) {
          Te(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        n && n.isColor ? n.set(i) : n && n.isVector2 && i && i.isVector2 || n && n.isEuler && i && i.isEuler || n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[t] = i;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const i = { metadata: {
      version: 4.7,
      type: "Material",
      generator: "Material.toJSON"
    } };
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (i.blending = this.blending), this.side !== 0 && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== 204 && (i.blendSrc = this.blendSrc), this.blendDst !== 205 && (i.blendDst = this.blendDst), this.blendEquation !== 100 && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (i.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.allowOverride === !1 && (i.allowOverride = !1), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
    function n(r) {
      const s = [];
      for (const a in r) {
        const o = r[a];
        delete o.metadata, s.push(o);
      }
      return s;
    }
    if (t) {
      const r = n(e.textures), s = n(e.images);
      r.length > 0 && (i.textures = r), s.length > 0 && (i.images = s);
    }
    return i;
  }
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new He().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let i = e.normalScale;
      Array.isArray(i) === !1 && (i = [i, i]), this.normalScale = new Ie().fromArray(i);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new Ie().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let i = null;
    if (t !== null) {
      const n = t.length;
      i = new Array(n);
      for (let r = 0; r !== n; ++r) i[r] = t[r].clone();
    }
    return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}, jt = /* @__PURE__ */ new B(), Rr = /* @__PURE__ */ new B(), Ln = /* @__PURE__ */ new B(), hi = /* @__PURE__ */ new B(), Cr = /* @__PURE__ */ new B(), Dn = /* @__PURE__ */ new B(), Pr = /* @__PURE__ */ new B(), Bl = class {
  constructor(e = new B(), t = new B(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, jt)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const i = t.dot(this.direction);
    return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = jt.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (jt.copy(this.origin).addScaledVector(this.direction, t), jt.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, i, n) {
    Rr.copy(e).add(t).multiplyScalar(0.5), Ln.copy(t).sub(e).normalize(), hi.copy(this.origin).sub(Rr);
    const r = e.distanceTo(t) * 0.5, s = -this.direction.dot(Ln), a = hi.dot(this.direction), o = -hi.dot(Ln), c = hi.lengthSq(), l = Math.abs(1 - s * s);
    let u, f, h, p;
    if (l > 0)
      if (u = s * o - a, f = s * a - o, p = r * l, u >= 0) if (f >= -p) if (f <= p) {
        const M = 1 / l;
        u *= M, f *= M, h = u * (u + s * f + 2 * a) + f * (s * u + f + 2 * o) + c;
      } else
        f = r, u = Math.max(0, -(s * f + a)), h = -u * u + f * (f + 2 * o) + c;
      else
        f = -r, u = Math.max(0, -(s * f + a)), h = -u * u + f * (f + 2 * o) + c;
      else f <= -p ? (u = Math.max(0, -(-s * r + a)), f = u > 0 ? -r : Math.min(Math.max(-r, -o), r), h = -u * u + f * (f + 2 * o) + c) : f <= p ? (u = 0, f = Math.min(Math.max(-r, -o), r), h = f * (f + 2 * o) + c) : (u = Math.max(0, -(s * r + a)), f = u > 0 ? r : Math.min(Math.max(-r, -o), r), h = -u * u + f * (f + 2 * o) + c);
    else
      f = s > 0 ? -r : r, u = Math.max(0, -(s * f + a)), h = -u * u + f * (f + 2 * o) + c;
    return i && i.copy(this.origin).addScaledVector(this.direction, u), n && n.copy(Rr).addScaledVector(Ln, f), h;
  }
  intersectSphere(e, t) {
    jt.subVectors(e.center, this.origin);
    const i = jt.dot(this.direction), n = jt.dot(jt) - i * i, r = e.radius * e.radius;
    if (n > r) return null;
    const s = Math.sqrt(r - n), a = i - s, o = i + s;
    return o < 0 ? null : a < 0 ? this.at(o, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const i = -(this.origin.dot(e.normal) + e.constant) / t;
    return i >= 0 ? i : null;
  }
  intersectPlane(e, t) {
    const i = this.distanceToPlane(e);
    return i === null ? null : this.at(i, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let i, n, r, s, a, o;
    const c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (i = (e.min.x - f.x) * c, n = (e.max.x - f.x) * c) : (i = (e.max.x - f.x) * c, n = (e.min.x - f.x) * c), l >= 0 ? (r = (e.min.y - f.y) * l, s = (e.max.y - f.y) * l) : (r = (e.max.y - f.y) * l, s = (e.min.y - f.y) * l), i > s || r > n || ((r > i || isNaN(i)) && (i = r), (s < n || isNaN(n)) && (n = s), u >= 0 ? (a = (e.min.z - f.z) * u, o = (e.max.z - f.z) * u) : (a = (e.max.z - f.z) * u, o = (e.min.z - f.z) * u), i > o || a > n) || ((a > i || i !== i) && (i = a), (o < n || n !== n) && (n = o), n < 0) ? null : this.at(i >= 0 ? i : n, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, jt) !== null;
  }
  intersectTriangle(e, t, i, n, r) {
    Cr.subVectors(t, e), Dn.subVectors(i, e), Pr.crossVectors(Cr, Dn);
    let s = this.direction.dot(Pr), a;
    if (s > 0) {
      if (n) return null;
      a = 1;
    } else if (s < 0)
      a = -1, s = -s;
    else return null;
    hi.subVectors(this.origin, e);
    const o = a * this.direction.dot(Dn.crossVectors(hi, Dn));
    if (o < 0) return null;
    const c = a * this.direction.dot(Cr.cross(hi));
    if (c < 0 || o + c > s) return null;
    const l = -a * hi.dot(Pr);
    return l < 0 ? null : this.at(l / s, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Ia = class extends rr {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new He(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new gn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, ws = /* @__PURE__ */ new lt(), gi = /* @__PURE__ */ new Bl(), In = /* @__PURE__ */ new Zr(), Rs = /* @__PURE__ */ new B(), Un = /* @__PURE__ */ new B(), Nn = /* @__PURE__ */ new B(), Fn = /* @__PURE__ */ new B(), Lr = /* @__PURE__ */ new B(), On = /* @__PURE__ */ new B(), Cs = /* @__PURE__ */ new B(), Bn = /* @__PURE__ */ new B(), zt = class extends ni {
  constructor(e = new wi(), t = new Ia()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const i = e[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let n = 0, r = i.length; n < r; n++) {
          const s = i[n].name || String(n);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = n;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const i = this.geometry, n = i.attributes.position, r = i.morphAttributes.position, s = i.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const a = this.morphTargetInfluences;
    if (r && a) {
      On.set(0, 0, 0);
      for (let o = 0, c = r.length; o < c; o++) {
        const l = a[o], u = r[o];
        l !== 0 && (Lr.fromBufferAttribute(u, e), s ? On.addScaledVector(Lr, l) : On.addScaledVector(Lr.sub(t), l));
      }
      t.add(On);
    }
    return t;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.material, r = this.matrixWorld;
    n !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), In.copy(i.boundingSphere), In.applyMatrix4(r), gi.copy(e.ray).recast(e.near), !(In.containsPoint(gi.origin) === !1 && (gi.intersectSphere(In, Rs) === null || gi.origin.distanceToSquared(Rs) > (e.far - e.near) ** 2)) && (ws.copy(r).invert(), gi.copy(e.ray).applyMatrix4(ws), !(i.boundingBox !== null && gi.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, gi)));
  }
  _computeIntersections(e, t, i) {
    let n;
    const r = this.geometry, s = this.material, a = r.index, o = r.attributes.position, c = r.attributes.uv, l = r.attributes.uv1, u = r.attributes.normal, f = r.groups, h = r.drawRange;
    if (a !== null) if (Array.isArray(s)) for (let p = 0, M = f.length; p < M; p++) {
      const E = f[p], g = s[E.materialIndex], d = Math.max(E.start, h.start), P = Math.min(a.count, Math.min(E.start + E.count, h.start + h.count));
      for (let w = d, x = P; w < x; w += 3) {
        const T = a.getX(w), b = a.getX(w + 1), I = a.getX(w + 2);
        n = zn(this, g, e, i, c, l, u, T, b, I), n && (n.faceIndex = Math.floor(w / 3), n.face.materialIndex = E.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, h.start), M = Math.min(a.count, h.start + h.count);
      for (let E = p, g = M; E < g; E += 3) {
        const d = a.getX(E), P = a.getX(E + 1), w = a.getX(E + 2);
        n = zn(this, s, e, i, c, l, u, d, P, w), n && (n.faceIndex = Math.floor(E / 3), t.push(n));
      }
    }
    else if (o !== void 0) if (Array.isArray(s)) for (let p = 0, M = f.length; p < M; p++) {
      const E = f[p], g = s[E.materialIndex], d = Math.max(E.start, h.start), P = Math.min(o.count, Math.min(E.start + E.count, h.start + h.count));
      for (let w = d, x = P; w < x; w += 3) {
        const T = w, b = w + 1, I = w + 2;
        n = zn(this, g, e, i, c, l, u, T, b, I), n && (n.faceIndex = Math.floor(w / 3), n.face.materialIndex = E.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, h.start), M = Math.min(o.count, h.start + h.count);
      for (let E = p, g = M; E < g; E += 3) {
        const d = E, P = E + 1, w = E + 2;
        n = zn(this, s, e, i, c, l, u, d, P, w), n && (n.faceIndex = Math.floor(E / 3), t.push(n));
      }
    }
  }
};
function zl(e, t, i, n, r, s, a, o) {
  let c;
  if (t.side === 1 ? c = n.intersectTriangle(a, s, r, !0, o) : c = n.intersectTriangle(r, s, a, t.side === 0, o), c === null) return null;
  Bn.copy(o), Bn.applyMatrix4(e.matrixWorld);
  const l = i.ray.origin.distanceTo(Bn);
  return l < i.near || l > i.far ? null : {
    distance: l,
    point: Bn.clone(),
    object: e
  };
}
function zn(e, t, i, n, r, s, a, o, c, l) {
  e.getVertexPosition(o, Un), e.getVertexPosition(c, Nn), e.getVertexPosition(l, Fn);
  const u = zl(e, t, i, n, Un, Nn, Fn, Cs);
  if (u) {
    const f = new B();
    rn.getBarycoord(Cs, Un, Nn, Fn, f), r && (u.uv = rn.getInterpolatedAttribute(r, o, c, l, f, new Ie())), s && (u.uv1 = rn.getInterpolatedAttribute(s, o, c, l, f, new Ie())), a && (u.normal = rn.getInterpolatedAttribute(a, o, c, l, f, new B()), u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1));
    const h = {
      a: o,
      b: c,
      c: l,
      normal: new B(),
      materialIndex: 0
    };
    rn.getNormal(Un, Nn, Fn, h.normal), u.face = h, u.barycoord = f;
  }
  return u;
}
var Vl = class extends It {
  constructor(e = null, t = 1, i = 1, n, r, s, a, o, c = xt, l = xt, u, f) {
    super(null, s, a, o, c, l, n, r, u, f), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: i
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Dr = /* @__PURE__ */ new B(), Gl = /* @__PURE__ */ new B(), Hl = /* @__PURE__ */ new De(), _i = class {
  constructor(e = new B(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, i, n) {
    return this.normal.set(e, t, i), this.constant = n, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, i) {
    const n = Dr.subVectors(i, t).cross(Gl.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(n, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t, i = !0) {
    const n = e.delta(Dr), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return i === !0 && (s < 0 || s > 1) ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
    return t < 0 && i > 0 || i < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const i = t || Hl.getNormalMatrix(e), n = this.coplanarPoint(Dr).applyMatrix4(e), r = this.normal.applyMatrix3(i).normalize();
    return this.constant = -n.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, vi = /* @__PURE__ */ new Zr(), kl = /* @__PURE__ */ new Ie(0.5, 0.5), Vn = /* @__PURE__ */ new B(), Ua = class {
  constructor(e = new _i(), t = new _i(), i = new _i(), n = new _i(), r = new _i(), s = new _i()) {
    this.planes = [
      e,
      t,
      i,
      n,
      r,
      s
    ];
  }
  set(e, t, i, n, r, s) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(i), a[3].copy(n), a[4].copy(r), a[5].copy(s), this;
  }
  copy(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
    return this;
  }
  setFromProjectionMatrix(e, t = Ki, i = !1) {
    const n = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], c = r[3], l = r[4], u = r[5], f = r[6], h = r[7], p = r[8], M = r[9], E = r[10], g = r[11], d = r[12], P = r[13], w = r[14], x = r[15];
    if (n[0].setComponents(c - s, h - l, g - p, x - d).normalize(), n[1].setComponents(c + s, h + l, g + p, x + d).normalize(), n[2].setComponents(c + a, h + u, g + M, x + P).normalize(), n[3].setComponents(c - a, h - u, g - M, x - P).normalize(), i)
      n[4].setComponents(o, f, E, w).normalize(), n[5].setComponents(c - o, h - f, g - E, x - w).normalize();
    else if (n[4].setComponents(c - o, h - f, g - E, x - w).normalize(), t === 2e3) n[5].setComponents(c + o, h + f, g + E, x + w).normalize();
    else if (t === 2001) n[5].setComponents(o, f, E, w).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(vi);
  }
  intersectsSprite(e) {
    return vi.center.set(0, 0, 0), vi.radius = 0.7071067811865476 + kl.distanceTo(e.center), vi.applyMatrix4(e.matrixWorld), this.intersectsSphere(vi);
  }
  intersectsSphere(e) {
    const t = this.planes, i = e.center, n = -e.radius;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(i) < n) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) {
      const n = t[i];
      if (Vn.x = n.normal.x > 0 ? e.max.x : e.min.x, Vn.y = n.normal.y > 0 ? e.max.y : e.min.y, Vn.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(Vn) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) if (t[i].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Na = class extends It {
  constructor(e = [], t = 301, i, n, r, s, a, o, c, l) {
    super(e, t, i, n, r, s, a, o, c, l), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, Wl = class extends It {
  constructor(e, t, i, n, r, s, a, o, c) {
    super(e, t, i, n, r, s, a, o, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}, $i = class extends It {
  constructor(e, t, i = Ei, n, r, s, a = xt, o = xt, c, l = pn, u = 1) {
    if (l !== 1026 && l !== 1027) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: u
    }, n, r, s, a, o, l, i, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Kr(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, Xl = class extends $i {
  constructor(e, t = Ei, i = 301, n, r, s = xt, a = xt, o, c = pn) {
    const l = {
      width: e,
      height: e,
      depth: 1
    }, u = [
      l,
      l,
      l,
      l,
      l,
      l
    ];
    super(e, e, t, i, n, r, s, a, o, c), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, Fa = class extends It {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, $r = class Oa extends wi {
  constructor(t = 1, i = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: i,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const c = [], l = [], u = [], f = [];
    let h = 0, p = 0;
    M("z", "y", "x", -1, -1, n, i, t, a, s, 0), M("z", "y", "x", 1, -1, n, i, -t, a, s, 1), M("x", "z", "y", 1, 1, t, n, i, r, a, 2), M("x", "z", "y", 1, -1, t, n, -i, r, a, 3), M("x", "y", "z", 1, -1, t, i, n, r, s, 4), M("x", "y", "z", -1, -1, t, i, -n, r, s, 5), this.setIndex(c), this.setAttribute("position", new ii(l, 3)), this.setAttribute("normal", new ii(u, 3)), this.setAttribute("uv", new ii(f, 2));
    function M(E, g, d, P, w, x, T, b, I, v, y) {
      const W = x / I, A = T / v, H = x / 2, K = T / 2, k = b / 2, G = I + 1, q = v + 1;
      let O = 0, j = 0;
      const ee = new B();
      for (let ne = 0; ne < q; ne++) {
        const de = ne * A - K;
        for (let xe = 0; xe < G; xe++)
          ee[E] = (xe * W - H) * P, ee[g] = de * w, ee[d] = k, l.push(ee.x, ee.y, ee.z), ee[E] = 0, ee[g] = 0, ee[d] = b > 0 ? 1 : -1, u.push(ee.x, ee.y, ee.z), f.push(xe / I), f.push(1 - ne / v), O += 1;
      }
      for (let ne = 0; ne < v; ne++) for (let de = 0; de < I; de++) {
        const xe = h + de + G * ne, et = h + de + G * (ne + 1), Ke = h + (de + 1) + G * (ne + 1), X = h + (de + 1) + G * ne;
        c.push(xe, et, X), c.push(et, Ke, X), j += 6;
      }
      o.addGroup(p, j, y), p += j, h += O;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Oa(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}, tr = class Ba extends wi {
  constructor(t = 1, i = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: i,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = i / 2, o = Math.floor(n), c = Math.floor(r), l = o + 1, u = c + 1, f = t / o, h = i / c, p = [], M = [], E = [], g = [];
    for (let d = 0; d < u; d++) {
      const P = d * h - a;
      for (let w = 0; w < l; w++) {
        const x = w * f - s;
        M.push(x, -P, 0), E.push(0, 0, 1), g.push(w / o), g.push(1 - d / c);
      }
    }
    for (let d = 0; d < c; d++) for (let P = 0; P < o; P++) {
      const w = P + l * d, x = P + l * (d + 1), T = P + 1 + l * (d + 1), b = P + 1 + l * d;
      p.push(w, x, b), p.push(x, T, b);
    }
    this.setIndex(p), this.setAttribute("position", new ii(M, 3)), this.setAttribute("normal", new ii(E, 3)), this.setAttribute("uv", new ii(g, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ba(t.width, t.height, t.widthSegments, t.heightSegments);
  }
};
function Ji(e) {
  const t = {};
  for (const i in e) {
    t[i] = {};
    for (const n in e[i]) {
      const r = e[i][n];
      if (Ps(r)) r.isRenderTargetTexture ? (Te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[i][n] = null) : t[i][n] = r.clone();
      else if (Array.isArray(r)) if (Ps(r[0])) {
        const s = [];
        for (let a = 0, o = r.length; a < o; a++) s[a] = r[a].clone();
        t[i][n] = s;
      } else t[i][n] = r.slice();
      else t[i][n] = r;
    }
  }
  return t;
}
function St(e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const n = Ji(e[i]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function Ps(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function ql(e) {
  const t = [];
  for (let i = 0; i < e.length; i++) t.push(e[i].clone());
  return t;
}
function za(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : ze.workingColorSpace;
}
var Yl = {
  clone: Ji,
  merge: St
}, Kl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Zl = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, Dt = class extends rr {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Kl, this.fragmentShader = Zl, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [
        1,
        1,
        1
      ],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ji(e.uniforms), this.uniformsGroups = ql(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const n in this.uniforms) {
      const r = this.uniforms[n].value;
      r && r.isTexture ? t.uniforms[n] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[n] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[n] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[n] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[n] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[n] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[n] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[n] = { value: r };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const i = {};
    for (const n in this.extensions) this.extensions[n] === !0 && (i[n] = !0);
    return Object.keys(i).length > 0 && (t.extensions = i), t;
  }
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0) for (const i in e.uniforms) {
      const n = e.uniforms[i];
      switch (this.uniforms[i] = {}, n.type) {
        case "t":
          this.uniforms[i].value = t[n.value] || null;
          break;
        case "c":
          this.uniforms[i].value = new He().setHex(n.value);
          break;
        case "v2":
          this.uniforms[i].value = new Ie().fromArray(n.value);
          break;
        case "v3":
          this.uniforms[i].value = new B().fromArray(n.value);
          break;
        case "v4":
          this.uniforms[i].value = new st().fromArray(n.value);
          break;
        case "m3":
          this.uniforms[i].value = new De().fromArray(n.value);
          break;
        case "m4":
          this.uniforms[i].value = new lt().fromArray(n.value);
          break;
        default:
          this.uniforms[i].value = n.value;
      }
    }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (const i in e.extensions) this.extensions[i] = e.extensions[i];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}, $l = class extends Dt {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, Jl = class extends rr {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Jo, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, Ql = class extends rr {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
};
function Gn(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var _n = class {
  constructor(e, t, i, n) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = n !== void 0 ? n : new t.constructor(i), this.sampleValues = t, this.valueSize = i, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let i = this._cachedIndex, n = t[i], r = t[i - 1];
    i: {
      e: {
        let s;
        t: {
          n: if (!(e < n)) {
            for (let a = i + 2; ; ) {
              if (n === void 0) {
                if (e < r) break n;
                return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
              }
              if (i === a) break;
              if (r = n, n = t[++i], e < n) break e;
            }
            s = t.length;
            break t;
          }
          if (!(e >= r)) {
            const a = t[1];
            e < a && (i = 2, r = a);
            for (let o = i - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (i === o) break;
              if (n = r, r = t[--i - 1], e >= r) break e;
            }
            s = i, i = 0;
            break t;
          }
          break i;
        }
        for (; i < s; ) {
          const a = i + s >>> 1;
          e < t[a] ? s = a : i = a + 1;
        }
        if (n = t[i], r = t[i - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (n === void 0)
          return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
      }
      this._cachedIndex = i, this.intervalChanged_(i, r, n);
    }
    return this.interpolate_(i, r, e, n);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, n = this.valueSize, r = e * n;
    for (let s = 0; s !== n; ++s) t[s] = i[r + s];
    return t;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {
  }
}, jl = class extends _n {
  constructor(e, t, i, n) {
    super(e, t, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: hs,
      endingEnd: hs
    };
  }
  intervalChanged_(e, t, i) {
    const n = this.parameterPositions;
    let r = e - 2, s = e + 1, a = n[r], o = n[s];
    if (a === void 0) switch (this.getSettings_().endingStart) {
      case us:
        r = e, a = 2 * t - i;
        break;
      case ds:
        r = n.length - 2, a = t + n[r] - n[r + 1];
        break;
      default:
        r = e, a = i;
    }
    if (o === void 0) switch (this.getSettings_().endingEnd) {
      case us:
        s = e, o = 2 * i - t;
        break;
      case ds:
        s = 1, o = i + n[1] - n[0];
        break;
      default:
        s = e - 1, o = t;
    }
    const c = (i - t) * 0.5, l = this.valueSize;
    this._weightPrev = c / (t - a), this._weightNext = c / (o - i), this._offsetPrev = r * l, this._offsetNext = s * l;
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = this._offsetPrev, u = this._offsetNext, f = this._weightPrev, h = this._weightNext, p = (i - t) / (n - t), M = p * p, E = M * p, g = -f * E + 2 * f * M - f * p, d = (1 + f) * E + (-1.5 - 2 * f) * M + (-0.5 + f) * p + 1, P = (-1 - h) * E + (1.5 + h) * M + 0.5 * p, w = h * E - h * M;
    for (let x = 0; x !== a; ++x) r[x] = g * s[l + x] + d * s[c + x] + P * s[o + x] + w * s[u + x];
    return r;
  }
}, ec = class extends _n {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = (i - t) / (n - t), u = 1 - l;
    for (let f = 0; f !== a; ++f) r[f] = s[c + f] * u + s[o + f] * l;
    return r;
  }
}, tc = class extends _n {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, ic = class extends _n {
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = this.inTangents, u = this.outTangents;
    if (!l || !u) {
      const p = (i - t) / (n - t), M = 1 - p;
      for (let E = 0; E !== a; ++E) r[E] = s[c + E] * M + s[o + E] * p;
      return r;
    }
    const f = a * 2, h = e - 1;
    for (let p = 0; p !== a; ++p) {
      const M = s[c + p], E = s[o + p], g = h * f + p * 2, d = u[g], P = u[g + 1], w = e * f + p * 2, x = l[w], T = l[w + 1];
      let b = (i - t) / (n - t), I, v, y, W, A;
      for (let H = 0; H < 8; H++) {
        I = b * b, v = I * b, y = 1 - b, W = y * y, A = W * y;
        const K = A * t + 3 * W * b * d + 3 * y * I * x + v * n - i;
        if (Math.abs(K) < 1e-10) break;
        const k = 3 * W * (d - t) + 6 * y * b * (x - d) + 3 * I * (n - x);
        if (Math.abs(k) < 1e-10) break;
        b = b - K / k, b = Math.max(0, Math.min(1, b));
      }
      r[p] = A * M + 3 * W * b * P + 3 * y * I * T + v * E;
    }
    return r;
  }
}, Yt = class {
  constructor(e, t, i, n) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Gn(t, this.TimeBufferType), this.values = Gn(i, this.ValueBufferType), this.setInterpolation(n || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let i;
    if (t.toJSON !== this.toJSON) i = t.toJSON(e);
    else {
      i = {
        name: e.name,
        times: Gn(e.times, Array),
        values: Gn(e.values, Array)
      };
      const n = e.getInterpolation();
      n !== e.DefaultInterpolation && (i.interpolation = n);
    }
    return i.type = e.ValueTypeName, i;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new tc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new ec(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new jl(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const t = new ic(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Jn:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Gr:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case cr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case cs:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      const i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(i);
      return Te("KeyframeTrack:", i), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Jn;
      case this.InterpolantFactoryMethodLinear:
        return Gr;
      case this.InterpolantFactoryMethodSmooth:
        return cr;
      case this.InterpolantFactoryMethodBezier:
        return cs;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let i = 0, n = t.length; i !== n; ++i) t[i] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let i = 0, n = t.length; i !== n; ++i) t[i] *= e;
    }
    return this;
  }
  trim(e, t) {
    const i = this.times, n = i.length;
    let r = 0, s = n - 1;
    for (; r !== n && i[r] < e; ) ++r;
    for (; s !== -1 && i[s] > t; ) --s;
    if (++s, r !== 0 || s !== n) {
      r >= s && (s = Math.max(s, 1), r = s - 1);
      const a = this.getValueSize();
      this.times = i.slice(r, s), this.values = this.values.slice(r * a, s * a);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (Ce("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const i = this.times, n = this.values, r = i.length;
    r === 0 && (Ce("KeyframeTrack: Track is empty.", this), e = !1);
    let s = null;
    for (let a = 0; a !== r; a++) {
      const o = i[a];
      if (typeof o == "number" && isNaN(o)) {
        Ce("KeyframeTrack: Time is not a valid number.", this, a, o), e = !1;
        break;
      }
      if (s !== null && s > o) {
        Ce("KeyframeTrack: Out of order keys.", this, a, o, s), e = !1;
        break;
      }
      s = o;
    }
    if (n !== void 0 && el(n))
      for (let a = 0, o = n.length; a !== o; ++a) {
        const c = n[a];
        if (isNaN(c)) {
          Ce("KeyframeTrack: Value is not a valid number.", this, a, c), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), i = this.getValueSize(), n = this.getInterpolation() === cr, r = e.length - 1;
    let s = 1;
    for (let a = 1; a < r; ++a) {
      let o = !1;
      const c = e[a];
      if (c !== e[a + 1] && (a !== 1 || c !== e[0])) if (n)
        o = !0;
      else {
        const l = a * i, u = l - i, f = l + i;
        for (let h = 0; h !== i; ++h) {
          const p = t[l + h];
          if (p !== t[u + h] || p !== t[f + h]) {
            o = !0;
            break;
          }
        }
      }
      if (o) {
        if (a !== s) {
          e[s] = e[a];
          const l = a * i, u = s * i;
          for (let f = 0; f !== i; ++f) t[u + f] = t[l + f];
        }
        ++s;
      }
    }
    if (r > 0) {
      e[s] = e[r];
      for (let a = r * i, o = s * i, c = 0; c !== i; ++c) t[o + c] = t[a + c];
      ++s;
    }
    return s !== e.length ? (this.times = e.slice(0, s), this.values = t.slice(0, s * i)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), i = this.constructor, n = new i(this.name, e, t);
    return n.createInterpolant = this.createInterpolant, n;
  }
};
Yt.prototype.ValueTypeName = "";
Yt.prototype.TimeBufferType = Float32Array;
Yt.prototype.ValueBufferType = Float32Array;
Yt.prototype.DefaultInterpolation = Gr;
var Mn = class extends Yt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Mn.prototype.ValueTypeName = "bool";
Mn.prototype.ValueBufferType = Array;
Mn.prototype.DefaultInterpolation = Jn;
Mn.prototype.InterpolantFactoryMethodLinear = void 0;
Mn.prototype.InterpolantFactoryMethodSmooth = void 0;
var nc = class extends Yt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
nc.prototype.ValueTypeName = "color";
var rc = class extends Yt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
rc.prototype.ValueTypeName = "number";
var sc = class extends _n {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = (i - t) / (n - t);
    let c = e * a;
    for (let l = c + a; c !== l; c += 4) Ai.slerpFlat(r, 0, s, c - a, s, c, o);
    return r;
  }
}, Va = class extends Yt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  InterpolantFactoryMethodLinear(e) {
    return new sc(this.times, this.values, this.getValueSize(), e);
  }
};
Va.prototype.ValueTypeName = "quaternion";
Va.prototype.InterpolantFactoryMethodSmooth = void 0;
var Sn = class extends Yt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Sn.prototype.ValueTypeName = "string";
Sn.prototype.ValueBufferType = Array;
Sn.prototype.DefaultInterpolation = Jn;
Sn.prototype.InterpolantFactoryMethodLinear = void 0;
Sn.prototype.InterpolantFactoryMethodSmooth = void 0;
var ac = class extends Yt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
ac.prototype.ValueTypeName = "vector";
var oc = class {
  constructor(e, t, i) {
    const n = this;
    let r = !1, s = 0, a = 0, o;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = i, this._abortController = null, this.itemStart = function(l) {
      a++, r === !1 && n.onStart !== void 0 && n.onStart(l, s, a), r = !0;
    }, this.itemEnd = function(l) {
      s++, n.onProgress !== void 0 && n.onProgress(l, s, a), s === a && (r = !1, n.onLoad !== void 0 && n.onLoad());
    }, this.itemError = function(l) {
      n.onError !== void 0 && n.onError(l);
    }, this.resolveURL = function(l) {
      return l = l.normalize("NFC"), o ? o(l) : l;
    }, this.setURLModifier = function(l) {
      return o = l, this;
    }, this.addHandler = function(l, u) {
      return c.push(l, u), this;
    }, this.removeHandler = function(l) {
      const u = c.indexOf(l);
      return u !== -1 && c.splice(u, 2), this;
    }, this.getHandler = function(l) {
      for (let u = 0, f = c.length; u < f; u += 2) {
        const h = c[u], p = c[u + 1];
        if (h.global && (h.lastIndex = 0), h.test(l)) return p;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}, lc = /* @__PURE__ */ new oc(), cc = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : lc, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  load() {
  }
  loadAsync(e, t) {
    const i = this;
    return new Promise(function(n, r) {
      i.load(e, n, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  abort() {
    return this;
  }
};
cc.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Hn = /* @__PURE__ */ new B(), kn = /* @__PURE__ */ new Ai(), Ht = /* @__PURE__ */ new B(), Ga = class extends ni {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new lt(), this.projectionMatrix = new lt(), this.projectionMatrixInverse = new lt(), this.coordinateSystem = Ki, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(Hn, kn, Ht), Ht.x === 1 && Ht.y === 1 && Ht.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Hn, kn, Ht.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, i = !1) {
    super.updateWorldMatrix(e, t, i), this.matrixWorld.decompose(Hn, kn, Ht), Ht.x === 1 && Ht.y === 1 && Ht.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Hn, kn, Ht.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, ui = /* @__PURE__ */ new B(), Ls = /* @__PURE__ */ new Ie(), Ds = /* @__PURE__ */ new Ie(), Bt = class extends Ga {
  constructor(e = 50, t = 1, i = 0.1, n = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = mn * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(un * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return mn * 2 * Math.atan(Math.tan(un * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, i) {
    ui.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(ui.x, ui.y).multiplyScalar(-e / ui.z), ui.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(ui.x, ui.y).multiplyScalar(-e / ui.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, Ls, Ds), t.subVectors(Ds, Ls);
  }
  setViewOffset(e, t, i, n, r, s) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(un * 0.5 * this.fov) / this.zoom, i = 2 * t, n = this.aspect * i, r = -0.5 * n;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const o = s.fullWidth, c = s.fullHeight;
      r += s.offsetX * n / o, t -= s.offsetY * i / c, n *= s.width / o, i *= s.height / c;
    }
    const a = this.filmOffset;
    a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, Jr = class extends Ga {
  constructor(e = -1, t = 1, i = 1, n = -1, r = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = n, this.near = r, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, i, n, r, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, n = (this.top + this.bottom) / 2;
    let r = i - e, s = i + e, a = n + t, o = n - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, l = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, s = r + c * this.view.width, a -= l * this.view.offsetY, o = a - l * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, Vi = -90, Gi = 1, hc = class extends ni {
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const n = new Bt(Vi, Gi, e, t);
    n.layers = this.layers, this.add(n);
    const r = new Bt(Vi, Gi, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Bt(Vi, Gi, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Bt(Vi, Gi, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Bt(Vi, Gi, e, t);
    o.layers = this.layers, this.add(o);
    const c = new Bt(Vi, Gi, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [i, n, r, s, a, o] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), n.up.set(0, 1, 0), n.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
    else if (e === 2001)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), n.up.set(0, -1, 0), n.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: n } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, s, a, o, c, l] = this.children, u = e.getRenderTarget(), f = e.getActiveCubeFace(), h = e.getActiveMipmapLevel(), p = e.xr.enabled;
    e.xr.enabled = !1;
    const M = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1;
    let E = !1;
    e.isWebGLRenderer === !0 ? E = e.state.buffers.depth.getReversed() : E = e.reversedDepthBuffer, e.setRenderTarget(i, 0, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(i, 1, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(i, 2, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(i, 3, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(i, 4, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, c), i.texture.generateMipmaps = M, e.setRenderTarget(i, 5, n), E && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, f, h), e.xr.enabled = p, i.texture.needsPMREMUpdate = !0;
  }
}, uc = class extends Bt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, Qr = "\\[\\]\\.:\\/", dc = new RegExp("[" + Qr + "]", "g"), jr = "[^" + Qr + "]", fc = "[^" + Qr.replace("\\.", "") + "]", pc = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", jr), mc = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", fc), gc = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", jr), vc = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", jr), _c = new RegExp("^" + pc + mc + gc + vc + "$"), Mc = [
  "material",
  "materials",
  "bones",
  "map"
], Sc = class {
  constructor(e, t, i) {
    const n = i || nt.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, n);
  }
  getValue(e, t) {
    this.bind();
    const i = this._targetGroup.nCachedObjects_, n = this._bindings[i];
    n !== void 0 && n.getValue(e, t);
  }
  setValue(e, t) {
    const i = this._bindings;
    for (let n = this._targetGroup.nCachedObjects_, r = i.length; n !== r; ++n) i[n].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t) e[t].unbind();
  }
}, nt = class Xi {
  constructor(t, i, n) {
    this.path = i, this.parsedPath = n || Xi.parseTrackName(i), this.node = Xi.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, i, n) {
    return t && t.isAnimationObjectGroup ? new Xi.Composite(t, i, n) : new Xi(t, i, n);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(dc, "");
  }
  static parseTrackName(t) {
    const i = _c.exec(t);
    if (i === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + t);
    const n = {
      nodeName: i[2],
      objectName: i[3],
      objectIndex: i[4],
      propertyName: i[5],
      propertyIndex: i[6]
    }, r = n.nodeName && n.nodeName.lastIndexOf(".");
    if (r !== void 0 && r !== -1) {
      const s = n.nodeName.substring(r + 1);
      Mc.indexOf(s) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = s);
    }
    if (n.propertyName === null || n.propertyName.length === 0) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + t);
    return n;
  }
  static findNode(t, i) {
    if (i === void 0 || i === "" || i === "." || i === -1 || i === t.name || i === t.uuid) return t;
    if (t.skeleton) {
      const n = t.skeleton.getBoneByName(i);
      if (n !== void 0) return n;
    }
    if (t.children) {
      const n = function(s) {
        for (let a = 0; a < s.length; a++) {
          const o = s[a];
          if (o.name === i || o.uuid === i) return o;
          const c = n(o.children);
          if (c) return c;
        }
        return null;
      }, r = n(t.children);
      if (r) return r;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(t, i) {
    t[i] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) t[i++] = n[r];
  }
  _getValue_arrayElement(t, i) {
    t[i] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, i) {
    this.resolvedProperty.toArray(t, i);
  }
  _setValue_direct(t, i) {
    this.targetObject[this.propertyName] = t[i];
  }
  _setValue_direct_setNeedsUpdate(t, i) {
    this.targetObject[this.propertyName] = t[i], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, i) {
    this.targetObject[this.propertyName] = t[i], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
  }
  _setValue_array_setNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i];
  }
  _setValue_arrayElement_setNeedsUpdate(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(t, i) {
    this.resolvedProperty.fromArray(t, i);
  }
  _setValue_fromArray_setNeedsUpdate(t, i) {
    this.resolvedProperty.fromArray(t, i), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, i) {
    this.resolvedProperty.fromArray(t, i), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, i) {
    this.bind(), this.getValue(t, i);
  }
  _setValue_unbound(t, i) {
    this.bind(), this.setValue(t, i);
  }
  bind() {
    let t = this.node;
    const i = this.parsedPath, n = i.objectName, r = i.propertyName;
    let s = i.propertyIndex;
    if (t || (t = Xi.findNode(this.rootNode, i.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      Te("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let l = i.objectIndex;
      switch (n) {
        case "materials":
          if (!t.material) {
            Ce("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            Ce("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            Ce("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let u = 0; u < t.length; u++) if (t[u].name === l) {
            l = u;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            Ce("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            Ce("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[n] === void 0) {
            Ce("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[n];
      }
      if (l !== void 0) {
        if (t[l] === void 0) {
          Ce("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[l];
      }
    }
    const a = t[r];
    if (a === void 0) {
      const l = i.nodeName;
      Ce("PropertyBinding: Trying to update property for track: " + l + "." + r + " but it wasn't found.", t);
      return;
    }
    let o = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? o = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (s !== void 0) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[s] !== void 0 && (s = t.morphTargetDictionary[s]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = s;
    } else a.fromArray !== void 0 && a.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (c = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = r;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][o];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
nt.Composite = Sc;
nt.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
nt.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
nt.prototype.GetterByBindingType = [
  nt.prototype._getValue_direct,
  nt.prototype._getValue_array,
  nt.prototype._getValue_arrayElement,
  nt.prototype._getValue_toArray
];
nt.prototype.SetterByBindingTypeAndVersioning = [
  [
    nt.prototype._setValue_direct,
    nt.prototype._setValue_direct_setNeedsUpdate,
    nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    nt.prototype._setValue_array,
    nt.prototype._setValue_array_setNeedsUpdate,
    nt.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    nt.prototype._setValue_arrayElement,
    nt.prototype._setValue_arrayElement_setNeedsUpdate,
    nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    nt.prototype._setValue_fromArray,
    nt.prototype._setValue_fromArray_setNeedsUpdate,
    nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var xc = class {
  constructor(e, t, i, n) {
    this.elements = [
      1,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, n);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(e, t = 0) {
    for (let i = 0; i < 4; i++) this.elements[i] = e[i + t];
    return this;
  }
  set(e, t, i, n) {
    const r = this.elements;
    return r[0] = e, r[2] = t, r[1] = i, r[3] = n, this;
  }
};
da = xc;
da.prototype.isMatrix2 = !0;
function Is(e, t, i, n) {
  const r = Ec(n);
  switch (i) {
    case uo:
      return e * t;
    case po:
      return e * t / r.components * r.byteLength;
    case xa:
      return e * t / r.components * r.byteLength;
    case $n:
      return e * t * 2 / r.components * r.byteLength;
    case Ea:
      return e * t * 2 / r.components * r.byteLength;
    case fo:
      return e * t * 3 / r.components * r.byteLength;
    case fn:
      return e * t * 4 / r.components * r.byteLength;
    case ya:
      return e * t * 4 / r.components * r.byteLength;
    case mo:
    case go:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case vo:
    case _o:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case So:
    case Eo:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case Mo:
    case xo:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case yo:
    case To:
    case Ao:
    case wo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case bo:
    case Ro:
    case Co:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Po:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Lo:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Do:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Io:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Uo:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case No:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Fo:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Oo:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Bo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case zo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Vo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Go:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Ho:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case ko:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Wo:
    case Xo:
    case qo:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Yo:
    case Ko:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case Zo:
    case $o:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${i} format.`);
}
function Ec(e) {
  switch (e) {
    case xi:
    case ao:
      return {
        byteLength: 1,
        components: 1
      };
    case ga:
    case oo:
    case yi:
      return {
        byteLength: 2,
        components: 1
      };
    case va:
    case _a:
      return {
        byteLength: 2,
        components: 4
      };
    case Ei:
    case lo:
    case nr:
      return {
        byteLength: 4,
        components: 1
      };
    case co:
    case ho:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } }));
typeof window < "u" && (window.__THREE__ ? Te("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function Ha() {
  let e = null, t = !1, i = null, n = null;
  function r(s, a) {
    i(s, a), n = e.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && i !== null && e !== null && (n = e.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      e !== null && e.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(s) {
      i = s;
    },
    setContext: function(s) {
      e = s;
    }
  };
}
function yc(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function i(o, c) {
    const l = o.array, u = o.usage, f = l.byteLength, h = e.createBuffer();
    e.bindBuffer(c, h), e.bufferData(c, l, u), o.onUploadCallback();
    let p;
    if (l instanceof Float32Array) p = e.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array) p = e.HALF_FLOAT;
    else if (l instanceof Uint16Array) o.isFloat16BufferAttribute ? p = e.HALF_FLOAT : p = e.UNSIGNED_SHORT;
    else if (l instanceof Int16Array) p = e.SHORT;
    else if (l instanceof Uint32Array) p = e.UNSIGNED_INT;
    else if (l instanceof Int32Array) p = e.INT;
    else if (l instanceof Int8Array) p = e.BYTE;
    else if (l instanceof Uint8Array) p = e.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray) p = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: h,
      type: p,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: f
    };
  }
  function n(o, c, l) {
    const u = c.array, f = c.updateRanges;
    if (e.bindBuffer(l, o), f.length === 0) e.bufferSubData(l, 0, u);
    else {
      f.sort((p, M) => p.start - M.start);
      let h = 0;
      for (let p = 1; p < f.length; p++) {
        const M = f[h], E = f[p];
        E.start <= M.start + M.count + 1 ? M.count = Math.max(M.count, E.start + E.count - M.start) : (++h, f[h] = E);
      }
      f.length = h + 1;
      for (let p = 0, M = f.length; p < M; p++) {
        const E = f[p];
        e.bufferSubData(l, E.start * u.BYTES_PER_ELEMENT, u, E.start, E.count);
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const c = t.get(o);
    c && (e.deleteBuffer(c.buffer), t.delete(o));
  }
  function a(o, c) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const u = t.get(o);
      (!u || u.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const l = t.get(o);
    if (l === void 0) t.set(o, i(o, c));
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(l.buffer, o, c), l.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var Ue = {
  alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  color_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  color_pars_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  color_pars_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  color_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,
  displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
  lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  lights_physical_pars_fragment: `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  lightprobes_pars_fragment: `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
  logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,
  normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
  background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  distance_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  distance_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
  equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
}, oe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new He(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new De() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new De() },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 },
    dfgLUT: { value: null }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new De() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new De() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new De() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new De() },
    normalScale: { value: /* @__PURE__ */ new Ie(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new De() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new De() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new He(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMatrix: { value: [] },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMatrix: { value: [] },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new B() },
    probesMax: { value: /* @__PURE__ */ new B() },
    probesResolution: { value: /* @__PURE__ */ new B() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new He(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new De() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new He(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ie(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  }
}, Wt = {
  basic: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new He(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new He(0) },
        specular: { value: /* @__PURE__ */ new He(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.roughnessmap,
      oe.metalnessmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new He(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.gradientmap,
      oe.fog,
      oe.lights,
      { emissive: { value: /* @__PURE__ */ new He(0) } }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ St([oe.points, oe.fog]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ St([oe.common, oe.displacementmap]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ St([oe.sprite, oe.fog]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new De() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new De() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ St([
      oe.common,
      oe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new B() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ St([
      oe.lights,
      oe.fog,
      {
        color: { value: /* @__PURE__ */ new He(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
Wt.physical = {
  uniforms: /* @__PURE__ */ St([Wt.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new De() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new De() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new Ie(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new De() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new De() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new He(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new De() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new De() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new Ie() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new De() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new He(0) },
    specularColor: { value: /* @__PURE__ */ new He(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new De() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new De() },
    anisotropyVector: { value: /* @__PURE__ */ new Ie() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new De() }
  }]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
var Wn = {
  r: 0,
  b: 0,
  g: 0
}, Tc = /* @__PURE__ */ new lt(), ka = /* @__PURE__ */ new De();
ka.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function bc(e, t, i, n, r, s) {
  const a = new He(0);
  let o = r === !0 ? 0 : 1, c, l, u = null, f = 0, h = null;
  function p(P) {
    let w = P.isScene === !0 ? P.background : null;
    if (w && w.isTexture) {
      const x = P.backgroundBlurriness > 0;
      w = t.get(w, x);
    }
    return w;
  }
  function M(P) {
    let w = !1;
    const x = p(P);
    x === null ? g(a, o) : x && x.isColor && (g(x, 1), w = !0);
    const T = e.xr.getEnvironmentBlendMode();
    T === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, s) : T === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, s), (e.autoClear || w) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function E(P, w) {
    const x = p(w);
    x && (x.isCubeTexture || x.mapping === 306) ? (l === void 0 && (l = new zt(new $r(1, 1, 1), new Dt({
      name: "BackgroundCubeMaterial",
      uniforms: Ji(Wt.backgroundCube.uniforms),
      vertexShader: Wt.backgroundCube.vertexShader,
      fragmentShader: Wt.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(T, b, I) {
      this.matrixWorld.copyPosition(I.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), n.update(l)), l.material.uniforms.envMap.value = x, l.material.uniforms.backgroundBlurriness.value = w.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tc.makeRotationFromEuler(w.backgroundRotation)).transpose(), x.isCubeTexture && x.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(ka), l.material.toneMapped = ze.getTransfer(x.colorSpace) !== jn, (u !== x || f !== x.version || h !== e.toneMapping) && (l.material.needsUpdate = !0, u = x, f = x.version, h = e.toneMapping), l.layers.enableAll(), P.unshift(l, l.geometry, l.material, 0, 0, null)) : x && x.isTexture && (c === void 0 && (c = new zt(new tr(2, 2), new Dt({
      name: "BackgroundMaterial",
      uniforms: Ji(Wt.background.uniforms),
      vertexShader: Wt.background.vertexShader,
      fragmentShader: Wt.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), n.update(c)), c.material.uniforms.t2D.value = x, c.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, c.material.toneMapped = ze.getTransfer(x.colorSpace) !== jn, x.matrixAutoUpdate === !0 && x.updateMatrix(), c.material.uniforms.uvTransform.value.copy(x.matrix), (u !== x || f !== x.version || h !== e.toneMapping) && (c.material.needsUpdate = !0, u = x, f = x.version, h = e.toneMapping), c.layers.enableAll(), P.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function g(P, w) {
    P.getRGB(Wn, za(e)), i.buffers.color.setClear(Wn.r, Wn.g, Wn.b, w, s);
  }
  function d() {
    l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(P, w = 1) {
      a.set(P), o = w, g(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(P) {
      o = P, g(a, o);
    },
    render: M,
    addToRenderList: E,
    dispose: d
  };
}
function Ac(e, t) {
  const i = e.getParameter(e.MAX_VERTEX_ATTRIBS), n = {}, r = h(null);
  let s = r, a = !1;
  function o(A, H, K, k, G) {
    let q = !1;
    const O = f(A, k, K, H);
    s !== O && (s = O, l(s.object)), q = p(A, k, K, G), q && M(A, k, K, G), G !== null && t.update(G, e.ELEMENT_ARRAY_BUFFER), (q || a) && (a = !1, x(A, H, K, k), G !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(G).buffer));
  }
  function c() {
    return e.createVertexArray();
  }
  function l(A) {
    return e.bindVertexArray(A);
  }
  function u(A) {
    return e.deleteVertexArray(A);
  }
  function f(A, H, K, k) {
    const G = k.wireframe === !0;
    let q = n[H.id];
    q === void 0 && (q = {}, n[H.id] = q);
    const O = A.isInstancedMesh === !0 ? A.id : 0;
    let j = q[O];
    j === void 0 && (j = {}, q[O] = j);
    let ee = j[K.id];
    ee === void 0 && (ee = {}, j[K.id] = ee);
    let ne = ee[G];
    return ne === void 0 && (ne = h(c()), ee[G] = ne), ne;
  }
  function h(A) {
    const H = [], K = [], k = [];
    for (let G = 0; G < i; G++)
      H[G] = 0, K[G] = 0, k[G] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: H,
      enabledAttributes: K,
      attributeDivisors: k,
      object: A,
      attributes: {},
      index: null
    };
  }
  function p(A, H, K, k) {
    const G = s.attributes, q = H.attributes;
    let O = 0;
    const j = K.getAttributes();
    for (const ee in j) if (j[ee].location >= 0) {
      const ne = G[ee];
      let de = q[ee];
      if (de === void 0 && (ee === "instanceMatrix" && A.instanceMatrix && (de = A.instanceMatrix), ee === "instanceColor" && A.instanceColor && (de = A.instanceColor)), ne === void 0 || ne.attribute !== de || de && ne.data !== de.data) return !0;
      O++;
    }
    return s.attributesNum !== O || s.index !== k;
  }
  function M(A, H, K, k) {
    const G = {}, q = H.attributes;
    let O = 0;
    const j = K.getAttributes();
    for (const ee in j) if (j[ee].location >= 0) {
      let ne = q[ee];
      ne === void 0 && (ee === "instanceMatrix" && A.instanceMatrix && (ne = A.instanceMatrix), ee === "instanceColor" && A.instanceColor && (ne = A.instanceColor));
      const de = {};
      de.attribute = ne, ne && ne.data && (de.data = ne.data), G[ee] = de, O++;
    }
    s.attributes = G, s.attributesNum = O, s.index = k;
  }
  function E() {
    const A = s.newAttributes;
    for (let H = 0, K = A.length; H < K; H++) A[H] = 0;
  }
  function g(A) {
    d(A, 0);
  }
  function d(A, H) {
    const K = s.newAttributes, k = s.enabledAttributes, G = s.attributeDivisors;
    K[A] = 1, k[A] === 0 && (e.enableVertexAttribArray(A), k[A] = 1), G[A] !== H && (e.vertexAttribDivisor(A, H), G[A] = H);
  }
  function P() {
    const A = s.newAttributes, H = s.enabledAttributes;
    for (let K = 0, k = H.length; K < k; K++) H[K] !== A[K] && (e.disableVertexAttribArray(K), H[K] = 0);
  }
  function w(A, H, K, k, G, q, O) {
    O === !0 ? e.vertexAttribIPointer(A, H, K, G, q) : e.vertexAttribPointer(A, H, K, k, G, q);
  }
  function x(A, H, K, k) {
    E();
    const G = k.attributes, q = K.getAttributes(), O = H.defaultAttributeValues;
    for (const j in q) {
      const ee = q[j];
      if (ee.location >= 0) {
        let ne = G[j];
        if (ne === void 0 && (j === "instanceMatrix" && A.instanceMatrix && (ne = A.instanceMatrix), j === "instanceColor" && A.instanceColor && (ne = A.instanceColor)), ne !== void 0) {
          const de = ne.normalized, xe = ne.itemSize, et = t.get(ne);
          if (et === void 0) continue;
          const Ke = et.buffer, X = et.type, se = et.bytesPerElement, pe = X === e.INT || X === e.UNSIGNED_INT || ne.gpuType === 1013;
          if (ne.isInterleavedBufferAttribute) {
            const he = ne.data, be = he.stride, we = ne.offset;
            if (he.isInstancedInterleavedBuffer) {
              for (let Pe = 0; Pe < ee.locationSize; Pe++) d(ee.location + Pe, he.meshPerAttribute);
              A.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = he.meshPerAttribute * he.count);
            } else for (let Pe = 0; Pe < ee.locationSize; Pe++) g(ee.location + Pe);
            e.bindBuffer(e.ARRAY_BUFFER, Ke);
            for (let Pe = 0; Pe < ee.locationSize; Pe++) w(ee.location + Pe, xe / ee.locationSize, X, de, be * se, (we + xe / ee.locationSize * Pe) * se, pe);
          } else {
            if (ne.isInstancedBufferAttribute) {
              for (let he = 0; he < ee.locationSize; he++) d(ee.location + he, ne.meshPerAttribute);
              A.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = ne.meshPerAttribute * ne.count);
            } else for (let he = 0; he < ee.locationSize; he++) g(ee.location + he);
            e.bindBuffer(e.ARRAY_BUFFER, Ke);
            for (let he = 0; he < ee.locationSize; he++) w(ee.location + he, xe / ee.locationSize, X, de, xe * se, xe / ee.locationSize * he * se, pe);
          }
        } else if (O !== void 0) {
          const de = O[j];
          if (de !== void 0) switch (de.length) {
            case 2:
              e.vertexAttrib2fv(ee.location, de);
              break;
            case 3:
              e.vertexAttrib3fv(ee.location, de);
              break;
            case 4:
              e.vertexAttrib4fv(ee.location, de);
              break;
            default:
              e.vertexAttrib1fv(ee.location, de);
          }
        }
      }
    }
    P();
  }
  function T() {
    y();
    for (const A in n) {
      const H = n[A];
      for (const K in H) {
        const k = H[K];
        for (const G in k) {
          const q = k[G];
          for (const O in q)
            u(q[O].object), delete q[O];
          delete k[G];
        }
      }
      delete n[A];
    }
  }
  function b(A) {
    if (n[A.id] === void 0) return;
    const H = n[A.id];
    for (const K in H) {
      const k = H[K];
      for (const G in k) {
        const q = k[G];
        for (const O in q)
          u(q[O].object), delete q[O];
        delete k[G];
      }
    }
    delete n[A.id];
  }
  function I(A) {
    for (const H in n) {
      const K = n[H];
      for (const k in K) {
        const G = K[k];
        if (G[A.id] === void 0) continue;
        const q = G[A.id];
        for (const O in q)
          u(q[O].object), delete q[O];
        delete G[A.id];
      }
    }
  }
  function v(A) {
    for (const H in n) {
      const K = n[H], k = A.isInstancedMesh === !0 ? A.id : 0, G = K[k];
      if (G !== void 0) {
        for (const q in G) {
          const O = G[q];
          for (const j in O)
            u(O[j].object), delete O[j];
          delete G[q];
        }
        delete K[k], Object.keys(K).length === 0 && delete n[H];
      }
    }
  }
  function y() {
    W(), a = !0, s !== r && (s = r, l(s.object));
  }
  function W() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: y,
    resetDefaultState: W,
    dispose: T,
    releaseStatesOfGeometry: b,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: I,
    initAttributes: E,
    enableAttribute: g,
    disableUnusedAttributes: P
  };
}
function wc(e, t, i) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, l) {
    e.drawArrays(n, c, l), i.update(l, n, 1);
  }
  function a(c, l, u) {
    u !== 0 && (e.drawArraysInstanced(n, c, l, u), i.update(l, n, u));
  }
  function o(c, l, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, l, 0, u);
    let f = 0;
    for (let h = 0; h < u; h++) f += l[h];
    i.update(f, n, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function Rc(e, t, i, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const I = t.get("EXT_texture_filter_anisotropic");
      r = e.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function a(I) {
    return !(I !== 1023 && n.convert(I) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(I) {
    const v = I === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(I !== 1009 && n.convert(I) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && I !== 1015 && !v);
  }
  function c(I) {
    if (I === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      I = "mediump";
    }
    return I === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = i.precision !== void 0 ? i.precision : "highp";
  const u = c(l);
  u !== l && (Te("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
  const f = i.logarithmicDepthBuffer === !0, h = i.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
  i.reversedDepthBuffer === !0 && h === !1 && Te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), M = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), E = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), d = e.getParameter(e.MAX_VERTEX_ATTRIBS), P = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), w = e.getParameter(e.MAX_VARYING_VECTORS), x = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), T = e.getParameter(e.MAX_SAMPLES), b = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: f,
    reversedDepthBuffer: h,
    maxTextures: p,
    maxVertexTextures: M,
    maxTextureSize: E,
    maxCubemapSize: g,
    maxAttributes: d,
    maxVertexUniforms: P,
    maxVaryings: w,
    maxFragmentUniforms: x,
    maxSamples: T,
    samples: b
  };
}
function Cc(e) {
  const t = this;
  let i = null, n = 0, r = !1, s = !1;
  const a = new _i(), o = new De(), c = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, h) {
    const p = f.length !== 0 || h || n !== 0 || r;
    return r = h, n = f.length, p;
  }, this.beginShadows = function() {
    s = !0, u(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, h) {
    i = u(f, h, 0);
  }, this.setState = function(f, h, p) {
    const M = f.clippingPlanes, E = f.clipIntersection, g = f.clipShadows, d = e.get(f);
    if (!r || M === null || M.length === 0 || s && !g) s ? u(null) : l();
    else {
      const P = s ? 0 : n, w = P * 4;
      let x = d.clippingState || null;
      c.value = x, x = u(M, h, w, p);
      for (let T = 0; T !== w; ++T) x[T] = i[T];
      d.clippingState = x, this.numIntersection = E ? this.numPlanes : 0, this.numPlanes += P;
    }
  };
  function l() {
    c.value !== i && (c.value = i, c.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function u(f, h, p, M) {
    const E = f !== null ? f.length : 0;
    let g = null;
    if (E !== 0) {
      if (g = c.value, M !== !0 || g === null) {
        const d = p + E * 4, P = h.matrixWorldInverse;
        o.getNormalMatrix(P), (g === null || g.length < d) && (g = new Float32Array(d));
        for (let w = 0, x = p; w !== E; ++w, x += 4)
          a.copy(f[w]).applyMatrix4(P, o), a.normal.toArray(g, x), g[x + 3] = a.constant;
      }
      c.value = g, c.needsUpdate = !0;
    }
    return t.numPlanes = E, t.numIntersection = 0, g;
  }
}
var di = 4, Us = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], Mi = 20, Pc = 256, ln = /* @__PURE__ */ new Jr(), Ns = /* @__PURE__ */ new He(), Ir = null, Ur = 0, Nr = 0, Fr = !1, Lc = /* @__PURE__ */ new B(), Fs = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(e, t = 0, i = 0.1, n = 100, r = {}) {
    const { size: s = 256, position: a = Lc } = r;
    Ir = this._renderer.getRenderTarget(), Ur = this._renderer.getActiveCubeFace(), Nr = this._renderer.getActiveMipmapLevel(), Fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(s);
    const o = this._allocateTargets();
    return o.depthBuffer = !0, this._sceneToCubeUV(e, i, n, o, a), t > 0 && this._blur(o, 0, 0, t), this._applyPMREM(o), this._cleanup(o), o;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = zs(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Bs(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Ir, Ur, Nr), this._renderer.xr.enabled = Fr, e.scissorTest = !1, Hi(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Ir = this._renderer.getRenderTarget(), Ur = this._renderer.getActiveCubeFace(), Nr = this._renderer.getActiveMipmapLevel(), Fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = t || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
      magFilter: Et,
      minFilter: Et,
      generateMipmaps: !1,
      type: yi,
      format: fn,
      colorSpace: Hr,
      depthBuffer: !1
    }, n = Os(e, t, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Os(e, t, i);
      const { _lodMax: r } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Dc(r)), this._blurMaterial = Uc(r, e, t), this._ggxMaterial = Ic(r, e, t);
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new zt(new wi(), e);
    this._renderer.compile(t, ln);
  }
  _sceneToCubeUV(e, t, i, n, r) {
    const s = new Bt(90, 1, t, i), a = [
      1,
      -1,
      1,
      1,
      1,
      1
    ], o = [
      1,
      1,
      1,
      -1,
      -1,
      -1
    ], c = this._renderer, l = c.autoClear, u = c.toneMapping;
    c.getClearColor(Ns), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(n), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new zt(new $r(), new Ia({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    })));
    const f = this._backgroundBox, h = f.material;
    let p = !1;
    const M = e.background;
    M ? M.isColor && (h.color.copy(M), e.background = null, p = !0) : (h.color.copy(Ns), p = !0);
    for (let E = 0; E < 6; E++) {
      const g = E % 3;
      g === 0 ? (s.up.set(0, a[E], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x + o[E], r.y, r.z)) : g === 1 ? (s.up.set(0, 0, a[E]), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y + o[E], r.z)) : (s.up.set(0, a[E], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y, r.z + o[E]));
      const d = this._cubeSize;
      Hi(n, g * d, E > 2 ? d : 0, d, d), c.setRenderTarget(n), p && c.render(f, s), c.render(e, s);
    }
    c.toneMapping = u, c.autoClear = l, e.background = M;
  }
  _textureToCubeUV(e, t) {
    const i = this._renderer, n = e.mapping === 301 || e.mapping === 302;
    n ? (this._cubemapMaterial === null && (this._cubemapMaterial = zs()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Bs());
    const r = n ? this._cubemapMaterial : this._equirectMaterial, s = this._lodMeshes[0];
    s.material = r;
    const a = r.uniforms;
    a.envMap.value = e;
    const o = this._cubeSize;
    Hi(t, 0, 0, 3 * o, 2 * o), i.setRenderTarget(t), i.render(s, ln);
  }
  _applyPMREM(e) {
    const t = this._renderer, i = t.autoClear;
    t.autoClear = !1;
    const n = this._lodMeshes.length;
    for (let r = 1; r < n; r++) this._applyGGXFilter(e, r - 1, r);
    t.autoClear = i;
  }
  _applyGGXFilter(e, t, i) {
    const n = this._renderer, r = this._pingPongRenderTarget, s = this._ggxMaterial, a = this._lodMeshes[i];
    a.material = s;
    const o = s.uniforms, c = i / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - l * l) * (0 + c * 1.25), { _lodMax: f } = this, h = this._sizeLods[i], p = 3 * h * (i > f - di ? i - f + di : 0), M = 4 * (this._cubeSize - h);
    o.envMap.value = e.texture, o.roughness.value = u, o.mipInt.value = f - t, Hi(r, p, M, 3 * h, 2 * h), n.setRenderTarget(r), n.render(a, ln), o.envMap.value = r.texture, o.roughness.value = 0, o.mipInt.value = f - i, Hi(e, p, M, 3 * h, 2 * h), n.setRenderTarget(e), n.render(a, ln);
  }
  _blur(e, t, i, n, r) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(e, s, t, i, n, "latitudinal", r), this._halfBlur(s, e, i, i, n, "longitudinal", r);
  }
  _halfBlur(e, t, i, n, r, s, a) {
    const o = this._renderer, c = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && Ce("blur direction must be either latitudinal or longitudinal!");
    const l = 3, u = this._lodMeshes[n];
    u.material = c;
    const f = c.uniforms, h = this._sizeLods[i] - 1, p = isFinite(r) ? Math.PI / (2 * h) : 2 * Math.PI / (2 * Mi - 1), M = r / p, E = isFinite(r) ? 1 + Math.floor(l * M) : Mi;
    E > Mi && Te(`sigmaRadians, ${r}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Mi}`);
    const g = [];
    let d = 0;
    for (let x = 0; x < Mi; ++x) {
      const T = x / M, b = Math.exp(-T * T / 2);
      g.push(b), x === 0 ? d += b : x < E && (d += 2 * b);
    }
    for (let x = 0; x < g.length; x++) g[x] = g[x] / d;
    f.envMap.value = e.texture, f.samples.value = E, f.weights.value = g, f.latitudinal.value = s === "latitudinal", a && (f.poleAxis.value = a);
    const { _lodMax: P } = this;
    f.dTheta.value = p, f.mipInt.value = P - i;
    const w = this._sizeLods[n];
    Hi(t, 3 * w * (n > P - di ? n - P + di : 0), 4 * (this._cubeSize - w), 3 * w, 2 * w), o.setRenderTarget(t), o.render(u, ln);
  }
};
function Dc(e) {
  const t = [], i = [], n = [];
  let r = e;
  const s = e - di + 1 + Us.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let c = 1 / o;
    a > e - di ? c = Us[a - e + di - 1] : a === 0 && (c = 0), i.push(c);
    const l = 1 / (o - 2), u = -l, f = 1 + l, h = [
      u,
      u,
      f,
      u,
      f,
      f,
      u,
      u,
      f,
      f,
      u,
      f
    ], p = 6, M = 6, E = 3, g = 2, d = 1, P = new Float32Array(E * M * p), w = new Float32Array(g * M * p), x = new Float32Array(d * M * p);
    for (let b = 0; b < p; b++) {
      const I = b % 3 * 2 / 3 - 1, v = b > 2 ? 0 : -1, y = [
        I,
        v,
        0,
        I + 2 / 3,
        v,
        0,
        I + 2 / 3,
        v + 1,
        0,
        I,
        v,
        0,
        I + 2 / 3,
        v + 1,
        0,
        I,
        v + 1,
        0
      ];
      P.set(y, E * M * b), w.set(h, g * M * b);
      const W = [
        b,
        b,
        b,
        b,
        b,
        b
      ];
      x.set(W, d * M * b);
    }
    const T = new wi();
    T.setAttribute("position", new qt(P, E)), T.setAttribute("uv", new qt(w, g)), T.setAttribute("faceIndex", new qt(x, d)), n.push(new zt(T, null)), r > di && r--;
  }
  return {
    lodMeshes: n,
    sizeLods: t,
    sigmas: i
  };
}
function Os(e, t, i) {
  const n = new Xt(e, t, i);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Hi(e, t, i, n, r) {
  e.viewport.set(t, i, n, r), e.scissor.set(t, i, n, r);
}
function Ic(e, t, i) {
  return new Dt({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Pc,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / i,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Uc(e, t, i) {
  const n = new Float32Array(Mi), r = new B(0, 1, 0);
  return new Dt({
    name: "SphericalGaussianBlur",
    defines: {
      n: Mi,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / i,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Bs() {
  return new Dt({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function zs() {
  return new Dt({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function sr() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
var Wa = class extends Xt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const i = {
      width: e,
      height: e,
      depth: 1
    }, n = [
      i,
      i,
      i,
      i,
      i,
      i
    ];
    this.texture = new Na(n), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const i = {
      uniforms: { tEquirect: { value: null } },
      vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
      fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
    }, n = new $r(5, 5, 5), r = new Dt({
      name: "CubemapFromEquirect",
      uniforms: Ji(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: 1,
      blending: 0
    });
    r.uniforms.tEquirect.value = t;
    const s = new zt(n, r), a = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = Et), new hc(1, 10, this).update(e, s), t.minFilter = a, s.geometry.dispose(), s.material.dispose(), this;
  }
  clear(e, t = !0, i = !0, n = !0) {
    const r = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(t, i, n);
    e.setRenderTarget(r);
  }
};
function Nc(e) {
  let t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n = null;
  function r(h, p = !1) {
    return h == null ? null : p ? a(h) : s(h);
  }
  function s(h) {
    if (h && h.isTexture) {
      const p = h.mapping;
      if (p === 303 || p === 304) if (t.has(h)) {
        const M = t.get(h).texture;
        return o(M, h.mapping);
      } else {
        const M = h.image;
        if (M && M.height > 0) {
          const E = new Wa(M.height);
          return E.fromEquirectangularTexture(e, h), t.set(h, E), h.addEventListener("dispose", l), o(E.texture, h.mapping);
        } else return null;
      }
    }
    return h;
  }
  function a(h) {
    if (h && h.isTexture) {
      const p = h.mapping, M = p === 303 || p === 304, E = p === 301 || p === 302;
      if (M || E) {
        let g = i.get(h);
        const d = g !== void 0 ? g.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== d)
          return n === null && (n = new Fs(e)), g = M ? n.fromEquirectangular(h, g) : n.fromCubemap(h, g), g.texture.pmremVersion = h.pmremVersion, i.set(h, g), g.texture;
        if (g !== void 0) return g.texture;
        {
          const P = h.image;
          return M && P && P.height > 0 || E && P && c(P) ? (n === null && (n = new Fs(e)), g = M ? n.fromEquirectangular(h) : n.fromCubemap(h), g.texture.pmremVersion = h.pmremVersion, i.set(h, g), h.addEventListener("dispose", u), g.texture) : null;
        }
      }
    }
    return h;
  }
  function o(h, p) {
    return p === 303 ? h.mapping = 301 : p === 304 && (h.mapping = 302), h;
  }
  function c(h) {
    let p = 0;
    const M = 6;
    for (let E = 0; E < M; E++) h[E] !== void 0 && p++;
    return p === M;
  }
  function l(h) {
    const p = h.target;
    p.removeEventListener("dispose", l);
    const M = t.get(p);
    M !== void 0 && (t.delete(p), M.dispose());
  }
  function u(h) {
    const p = h.target;
    p.removeEventListener("dispose", u);
    const M = i.get(p);
    M !== void 0 && (i.delete(p), M.dispose());
  }
  function f() {
    t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: f
  };
}
function Fc(e) {
  const t = {};
  function i(n) {
    if (t[n] !== void 0) return t[n];
    const r = e.getExtension(n);
    return t[n] = r, r;
  }
  return {
    has: function(n) {
      return i(n) !== null;
    },
    init: function() {
      i("EXT_color_buffer_float"), i("WEBGL_clip_cull_distance"), i("OES_texture_float_linear"), i("EXT_color_buffer_half_float"), i("WEBGL_multisampled_render_to_texture"), i("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = i(n);
      return r === null && qi("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Oc(e, t, i, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const h = f.target;
    h.index !== null && t.remove(h.index);
    for (const M in h.attributes) t.remove(h.attributes[M]);
    h.removeEventListener("dispose", a), delete r[h.id];
    const p = s.get(h);
    p && (t.remove(p), s.delete(h)), n.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, i.memory.geometries--;
  }
  function o(f, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", a), r[h.id] = !0, i.memory.geometries++), h;
  }
  function c(f) {
    const h = f.attributes;
    for (const p in h) t.update(h[p], e.ARRAY_BUFFER);
  }
  function l(f) {
    const h = [], p = f.index, M = f.attributes.position;
    let E = 0;
    if (M === void 0) return;
    if (p !== null) {
      const P = p.array;
      E = p.version;
      for (let w = 0, x = P.length; w < x; w += 3) {
        const T = P[w + 0], b = P[w + 1], I = P[w + 2];
        h.push(T, b, b, I, I, T);
      }
    } else {
      const P = M.array;
      E = M.version;
      for (let w = 0, x = P.length / 3 - 1; w < x; w += 3) {
        const T = w + 0, b = w + 1, I = w + 2;
        h.push(T, b, b, I, I, T);
      }
    }
    const g = new (M.count >= 65535 ? La : Pa)(h, 1);
    g.version = E;
    const d = s.get(f);
    d && t.remove(d), s.set(f, g);
  }
  function u(f) {
    const h = s.get(f);
    if (h) {
      const p = f.index;
      p !== null && h.version < p.version && l(f);
    } else l(f);
    return s.get(f);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: u
  };
}
function Bc(e, t, i) {
  let n;
  function r(f) {
    n = f;
  }
  let s, a;
  function o(f) {
    s = f.type, a = f.bytesPerElement;
  }
  function c(f, h) {
    e.drawElements(n, h, s, f * a), i.update(h, n, 1);
  }
  function l(f, h, p) {
    p !== 0 && (e.drawElementsInstanced(n, h, s, f * a, p), i.update(h, n, p));
  }
  function u(f, h, p) {
    if (p === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, h, 0, s, f, 0, p);
    let M = 0;
    for (let E = 0; E < p; E++) M += h[E];
    i.update(M, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function zc(e) {
  const t = {
    geometries: 0,
    textures: 0
  }, i = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (i.calls++, a) {
      case e.TRIANGLES:
        i.triangles += o * (s / 3);
        break;
      case e.LINES:
        i.lines += o * (s / 2);
        break;
      case e.LINE_STRIP:
        i.lines += o * (s - 1);
        break;
      case e.LINE_LOOP:
        i.lines += o * s;
        break;
      case e.POINTS:
        i.points += o * s;
        break;
      default:
        Ce("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    i.calls = 0, i.triangles = 0, i.points = 0, i.lines = 0;
  }
  return {
    memory: t,
    render: i,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Vc(e, t, i) {
  const n = /* @__PURE__ */ new WeakMap(), r = new st();
  function s(a, o, c) {
    const l = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = u !== void 0 ? u.length : 0;
    let h = n.get(o);
    if (h === void 0 || h.count !== f) {
      let y = function() {
        I.dispose(), n.delete(o), o.removeEventListener("dispose", y);
      };
      h !== void 0 && h.texture.dispose();
      const p = o.morphAttributes.position !== void 0, M = o.morphAttributes.normal !== void 0, E = o.morphAttributes.color !== void 0, g = o.morphAttributes.position || [], d = o.morphAttributes.normal || [], P = o.morphAttributes.color || [];
      let w = 0;
      p === !0 && (w = 1), M === !0 && (w = 2), E === !0 && (w = 3);
      let x = o.attributes.position.count * w, T = 1;
      x > t.maxTextureSize && (T = Math.ceil(x / t.maxTextureSize), x = t.maxTextureSize);
      const b = new Float32Array(x * T * 4 * f), I = new ba(b, x, T, f);
      I.type = nr, I.needsUpdate = !0;
      const v = w * 4;
      for (let W = 0; W < f; W++) {
        const A = g[W], H = d[W], K = P[W], k = x * T * 4 * W;
        for (let G = 0; G < A.count; G++) {
          const q = G * v;
          p === !0 && (r.fromBufferAttribute(A, G), b[k + q + 0] = r.x, b[k + q + 1] = r.y, b[k + q + 2] = r.z, b[k + q + 3] = 0), M === !0 && (r.fromBufferAttribute(H, G), b[k + q + 4] = r.x, b[k + q + 5] = r.y, b[k + q + 6] = r.z, b[k + q + 7] = 0), E === !0 && (r.fromBufferAttribute(K, G), b[k + q + 8] = r.x, b[k + q + 9] = r.y, b[k + q + 10] = r.z, b[k + q + 11] = K.itemSize === 4 ? r.w : 1);
        }
      }
      h = {
        count: f,
        texture: I,
        size: new Ie(x, T)
      }, n.set(o, h), o.addEventListener("dispose", y);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null) c.getUniforms().setValue(e, "morphTexture", a.morphTexture, i);
    else {
      let p = 0;
      for (let E = 0; E < l.length; E++) p += l[E];
      const M = o.morphTargetsRelative ? 1 : 1 - p;
      c.getUniforms().setValue(e, "morphTargetBaseInfluence", M), c.getUniforms().setValue(e, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(e, "morphTargetsTexture", h.texture, i), c.getUniforms().setValue(e, "morphTargetsTextureSize", h.size);
  }
  return { update: s };
}
function Gc(e, t, i, n, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const u = r.render.frame, f = l.geometry, h = t.get(l, f);
    if (s.get(h) !== u && (t.update(h), s.set(h, u)), l.isInstancedMesh && (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c), s.get(l) !== u && (i.update(l.instanceMatrix, e.ARRAY_BUFFER), l.instanceColor !== null && i.update(l.instanceColor, e.ARRAY_BUFFER), s.set(l, u))), l.isSkinnedMesh) {
      const p = l.skeleton;
      s.get(p) !== u && (p.update(), s.set(p, u));
    }
    return h;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function c(l) {
    const u = l.target;
    u.removeEventListener("dispose", c), n.releaseStatesOfObject(u), i.remove(u.instanceMatrix), u.instanceColor !== null && i.remove(u.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
var Hc = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function kc(e, t, i, n, r, s) {
  const a = new Xt(t, i, {
    type: e,
    depthBuffer: r,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    depthTexture: r ? new $i(t, i) : void 0
  }), o = new Xt(t, i, {
    type: yi,
    depthBuffer: !1,
    stencilBuffer: !1
  }), c = new wi();
  c.setAttribute("position", new ii([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
  ], 3)), c.setAttribute("uv", new ii([
    0,
    2,
    0,
    0,
    2,
    0
  ], 2));
  const l = new $l({
    uniforms: { tDiffuse: { value: null } },
    vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
    fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
    depthTest: !1,
    depthWrite: !1
  }), u = new zt(c, l), f = new Jr(-1, 1, 1, -1, 0, 1);
  let h = null, p = null, M = !1, E, g = null, d = [], P = !1;
  this.setSize = function(w, x) {
    a.setSize(w, x), o.setSize(w, x);
    for (let T = 0; T < d.length; T++) {
      const b = d[T];
      b.setSize && b.setSize(w, x);
    }
  }, this.setEffects = function(w) {
    d = w, P = d.length > 0 && d[0].isRenderPass === !0;
    const x = a.width, T = a.height;
    for (let b = 0; b < d.length; b++) {
      const I = d[b];
      I.setSize && I.setSize(x, T);
    }
  }, this.begin = function(w, x) {
    if (M || w.toneMapping === 0 && d.length === 0) return !1;
    if (g = x, x !== null) {
      const T = x.width, b = x.height;
      (a.width !== T || a.height !== b) && this.setSize(T, b);
    }
    return P === !1 && w.setRenderTarget(a), E = w.toneMapping, w.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return P;
  }, this.end = function(w, x) {
    w.toneMapping = E, M = !0;
    let T = a, b = o;
    for (let I = 0; I < d.length; I++) {
      const v = d[I];
      if (v.enabled !== !1 && (v.render(w, b, T, x), v.needsSwap !== !1)) {
        const y = T;
        T = b, b = y;
      }
    }
    if (h !== w.outputColorSpace || p !== w.toneMapping) {
      h = w.outputColorSpace, p = w.toneMapping, l.defines = {}, ze.getTransfer(h) === "srgb" && (l.defines.SRGB_TRANSFER = "");
      const I = Hc[p];
      I && (l.defines[I] = ""), l.needsUpdate = !0;
    }
    l.uniforms.tDiffuse.value = T.texture, w.setRenderTarget(g), w.render(u, f), g = null, M = !1;
  }, this.isCompositing = function() {
    return M;
  }, this.dispose = function() {
    a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), c.dispose(), l.dispose();
  };
}
var Xa = /* @__PURE__ */ new It(), kr = /* @__PURE__ */ new $i(1, 1), qa = /* @__PURE__ */ new ba(), Ya = /* @__PURE__ */ new bl(), Ka = /* @__PURE__ */ new Na(), Vs = [], Gs = [], Hs = new Float32Array(16), ks = new Float32Array(9), Ws = new Float32Array(4);
function ji(e, t, i) {
  const n = e[0];
  if (n <= 0 || n > 0) return e;
  const r = t * i;
  let s = Vs[r];
  if (s === void 0 && (s = new Float32Array(r), Vs[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += i, e[a].toArray(s, o);
  }
  return s;
}
function ct(e, t) {
  if (e.length !== t.length) return !1;
  for (let i = 0, n = e.length; i < n; i++) if (e[i] !== t[i]) return !1;
  return !0;
}
function ht(e, t) {
  for (let i = 0, n = t.length; i < n; i++) e[i] = t[i];
}
function ar(e, t) {
  let i = Gs[t];
  i === void 0 && (i = new Int32Array(t), Gs[t] = i);
  for (let n = 0; n !== t; ++n) i[n] = e.allocateTextureUnit();
  return i;
}
function Wc(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1f(this.addr, t), i[0] = t);
}
function Xc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ct(i, t)) return;
    e.uniform2fv(this.addr, t), ht(i, t);
  }
}
function qc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else if (t.r !== void 0)
    (i[0] !== t.r || i[1] !== t.g || i[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), i[0] = t.r, i[1] = t.g, i[2] = t.b);
  else {
    if (ct(i, t)) return;
    e.uniform3fv(this.addr, t), ht(i, t);
  }
}
function Yc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ct(i, t)) return;
    e.uniform4fv(this.addr, t), ht(i, t);
  }
}
function Kc(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ct(i, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), ht(i, t);
  } else {
    if (ct(i, n)) return;
    Ws.set(n), e.uniformMatrix2fv(this.addr, !1, Ws), ht(i, n);
  }
}
function Zc(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ct(i, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), ht(i, t);
  } else {
    if (ct(i, n)) return;
    ks.set(n), e.uniformMatrix3fv(this.addr, !1, ks), ht(i, n);
  }
}
function $c(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ct(i, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), ht(i, t);
  } else {
    if (ct(i, n)) return;
    Hs.set(n), e.uniformMatrix4fv(this.addr, !1, Hs), ht(i, n);
  }
}
function Jc(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1i(this.addr, t), i[0] = t);
}
function Qc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ct(i, t)) return;
    e.uniform2iv(this.addr, t), ht(i, t);
  }
}
function jc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ct(i, t)) return;
    e.uniform3iv(this.addr, t), ht(i, t);
  }
}
function eh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ct(i, t)) return;
    e.uniform4iv(this.addr, t), ht(i, t);
  }
}
function th(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1ui(this.addr, t), i[0] = t);
}
function ih(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ct(i, t)) return;
    e.uniform2uiv(this.addr, t), ht(i, t);
  }
}
function nh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ct(i, t)) return;
    e.uniform3uiv(this.addr, t), ht(i, t);
  }
}
function rh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ct(i, t)) return;
    e.uniform4uiv(this.addr, t), ht(i, t);
  }
}
function sh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === e.SAMPLER_2D_SHADOW ? (kr.compareFunction = i.isReversedDepthBuffer() ? 518 : 515, s = kr) : s = Xa, i.setTexture2D(t || s, r);
}
function ah(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture3D(t || Ya, r);
}
function oh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTextureCube(t || Ka, r);
}
function lh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture2DArray(t || qa, r);
}
function ch(e) {
  switch (e) {
    case 5126:
      return Wc;
    case 35664:
      return Xc;
    case 35665:
      return qc;
    case 35666:
      return Yc;
    case 35674:
      return Kc;
    case 35675:
      return Zc;
    case 35676:
      return $c;
    case 5124:
    case 35670:
      return Jc;
    case 35667:
    case 35671:
      return Qc;
    case 35668:
    case 35672:
      return jc;
    case 35669:
    case 35673:
      return eh;
    case 5125:
      return th;
    case 36294:
      return ih;
    case 36295:
      return nh;
    case 36296:
      return rh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return sh;
    case 35679:
    case 36299:
    case 36307:
      return ah;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return oh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return lh;
  }
}
function hh(e, t) {
  e.uniform1fv(this.addr, t);
}
function uh(e, t) {
  const i = ji(t, this.size, 2);
  e.uniform2fv(this.addr, i);
}
function dh(e, t) {
  const i = ji(t, this.size, 3);
  e.uniform3fv(this.addr, i);
}
function fh(e, t) {
  const i = ji(t, this.size, 4);
  e.uniform4fv(this.addr, i);
}
function ph(e, t) {
  const i = ji(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, i);
}
function mh(e, t) {
  const i = ji(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, i);
}
function gh(e, t) {
  const i = ji(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, i);
}
function vh(e, t) {
  e.uniform1iv(this.addr, t);
}
function _h(e, t) {
  e.uniform2iv(this.addr, t);
}
function Mh(e, t) {
  e.uniform3iv(this.addr, t);
}
function Sh(e, t) {
  e.uniform4iv(this.addr, t);
}
function xh(e, t) {
  e.uniform1uiv(this.addr, t);
}
function Eh(e, t) {
  e.uniform2uiv(this.addr, t);
}
function yh(e, t) {
  e.uniform3uiv(this.addr, t);
}
function Th(e, t) {
  e.uniform4uiv(this.addr, t);
}
function bh(e, t, i) {
  const n = this.cache, r = t.length, s = ar(i, r);
  ct(n, s) || (e.uniform1iv(this.addr, s), ht(n, s));
  let a;
  this.type === e.SAMPLER_2D_SHADOW ? a = kr : a = Xa;
  for (let o = 0; o !== r; ++o) i.setTexture2D(t[o] || a, s[o]);
}
function Ah(e, t, i) {
  const n = this.cache, r = t.length, s = ar(i, r);
  ct(n, s) || (e.uniform1iv(this.addr, s), ht(n, s));
  for (let a = 0; a !== r; ++a) i.setTexture3D(t[a] || Ya, s[a]);
}
function wh(e, t, i) {
  const n = this.cache, r = t.length, s = ar(i, r);
  ct(n, s) || (e.uniform1iv(this.addr, s), ht(n, s));
  for (let a = 0; a !== r; ++a) i.setTextureCube(t[a] || Ka, s[a]);
}
function Rh(e, t, i) {
  const n = this.cache, r = t.length, s = ar(i, r);
  ct(n, s) || (e.uniform1iv(this.addr, s), ht(n, s));
  for (let a = 0; a !== r; ++a) i.setTexture2DArray(t[a] || qa, s[a]);
}
function Ch(e) {
  switch (e) {
    case 5126:
      return hh;
    case 35664:
      return uh;
    case 35665:
      return dh;
    case 35666:
      return fh;
    case 35674:
      return ph;
    case 35675:
      return mh;
    case 35676:
      return gh;
    case 5124:
    case 35670:
      return vh;
    case 35667:
    case 35671:
      return _h;
    case 35668:
    case 35672:
      return Mh;
    case 35669:
    case 35673:
      return Sh;
    case 5125:
      return xh;
    case 36294:
      return Eh;
    case 36295:
      return yh;
    case 36296:
      return Th;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return bh;
    case 35679:
    case 36299:
    case 36307:
      return Ah;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return wh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Rh;
  }
}
var Ph = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = ch(t.type);
  }
}, Lh = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Ch(t.type);
  }
}, Dh = class {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, i) {
    const n = this.seq;
    for (let r = 0, s = n.length; r !== s; ++r) {
      const a = n[r];
      a.setValue(e, t[a.id], i);
    }
  }
}, Or = /(\w+)(\])?(\[|\.)?/g;
function Xs(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function Ih(e, t, i) {
  const n = e.name, r = n.length;
  for (Or.lastIndex = 0; ; ) {
    const s = Or.exec(n), a = Or.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === r) {
      Xs(i, l === void 0 ? new Ph(o, e, t) : new Lh(o, e, t));
      break;
    } else {
      let u = i.map[o];
      u === void 0 && (u = new Dh(o), Xs(i, u)), i = u;
    }
  }
}
var Zn = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < i; ++s) {
      const a = e.getActiveUniform(t, s);
      Ih(a, e.getUniformLocation(t, a.name), this);
    }
    const n = [], r = [];
    for (const s of this.seq) s.type === e.SAMPLER_2D_SHADOW || s.type === e.SAMPLER_CUBE_SHADOW || s.type === e.SAMPLER_2D_ARRAY_SHADOW ? n.push(s) : r.push(s);
    n.length > 0 && (this.seq = n.concat(r));
  }
  setValue(e, t, i, n) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, i, n);
  }
  setOptional(e, t, i) {
    const n = t[i];
    n !== void 0 && this.setValue(e, i, n);
  }
  static upload(e, t, i, n) {
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r], o = i[a.id];
      o.needsUpdate !== !1 && a.setValue(e, o.value, n);
    }
  }
  static seqWithValue(e, t) {
    const i = [];
    for (let n = 0, r = e.length; n !== r; ++n) {
      const s = e[n];
      s.id in t && i.push(s);
    }
    return i;
  }
};
function qs(e, t, i) {
  const n = e.createShader(t);
  return e.shaderSource(n, i), e.compileShader(n), n;
}
var Uh = 37297, Nh = 0;
function Fh(e, t) {
  const i = e.split(`
`), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, i.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${i[a]}`);
  }
  return n.join(`
`);
}
var Ys = /* @__PURE__ */ new De();
function Oh(e) {
  ze._getMatrix(Ys, ze.workingColorSpace, e);
  const t = `mat3( ${Ys.elements.map((i) => i.toFixed(4))} )`;
  switch (ze.getTransfer(e)) {
    case Qn:
      return [t, "LinearTransferOETF"];
    case jn:
      return [t, "sRGBTransferOETF"];
    default:
      return Te("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function Ks(e, t, i) {
  const n = e.getShaderParameter(t, e.COMPILE_STATUS), r = (e.getShaderInfoLog(t) || "").trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return i.toUpperCase() + `

` + r + `

` + Fh(e.getShaderSource(t), a);
  } else return r;
}
function Bh(e, t) {
  const i = Oh(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
var zh = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Vh(e, t) {
  const i = zh[t];
  return i === void 0 ? (Te("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }";
}
var Xn = /* @__PURE__ */ new B();
function Gh() {
  return ze.getLuminanceCoefficients(Xn), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${Xn.x.toFixed(4)}, ${Xn.y.toFixed(4)}, ${Xn.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Hh(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(hn).join(`
`);
}
function kh(e) {
  const t = [];
  for (const i in e) {
    const n = e[i];
    n !== !1 && t.push("#define " + i + " " + n);
  }
  return t.join(`
`);
}
function Wh(e, t) {
  const i = {}, n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = e.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === e.FLOAT_MAT2 && (o = 2), s.type === e.FLOAT_MAT3 && (o = 3), s.type === e.FLOAT_MAT4 && (o = 4), i[a] = {
      type: s.type,
      location: e.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return i;
}
function hn(e) {
  return e !== "";
}
function Zs(e, t) {
  const i = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, i).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function $s(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Xh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Wr(e) {
  return e.replace(Xh, Yh);
}
var qh = /* @__PURE__ */ new Map();
function Yh(e, t) {
  let i = Ue[t];
  if (i === void 0) {
    const n = qh.get(t);
    if (n !== void 0)
      i = Ue[n], Te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
  }
  return Wr(i);
}
var Kh = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Js(e) {
  return e.replace(Kh, Zh);
}
function Zh(e, t, i, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(i); s++) r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Qs(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return e.precision === "highp" ? t += `
#define HIGH_PRECISION` : e.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : e.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
var $h = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function Jh(e) {
  return $h[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var Qh = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function jh(e) {
  return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Qh[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var eu = { 302: "ENVMAP_MODE_REFRACTION" };
function tu(e) {
  return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : eu[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var iu = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function nu(e) {
  return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : iu[e.combine] || "ENVMAP_BLENDING_NONE";
}
function ru(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const i = Math.log2(t) - 2, n = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)),
    texelHeight: n,
    maxMip: i
  };
}
function su(e, t, i, n) {
  const r = e.getContext(), s = i.defines;
  let a = i.vertexShader, o = i.fragmentShader;
  const c = Jh(i), l = jh(i), u = tu(i), f = nu(i), h = ru(i), p = Hh(i), M = kh(s), E = r.createProgram();
  let g, d, P = i.glslVersion ? "#version " + i.glslVersion + `
` : "";
  i.isRawShaderMaterial ? (g = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M
  ].filter(hn).join(`
`), g.length > 0 && (g += `
`), d = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M
  ].filter(hn).join(`
`), d.length > 0 && (d += `
`)) : (g = [
    Qs(i),
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M,
    i.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    i.batching ? "#define USE_BATCHING" : "",
    i.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    i.instancing ? "#define USE_INSTANCING" : "",
    i.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    i.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    i.useFog && i.fog ? "#define USE_FOG" : "",
    i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "",
    i.map ? "#define USE_MAP" : "",
    i.envMap ? "#define USE_ENVMAP" : "",
    i.envMap ? "#define " + u : "",
    i.lightMap ? "#define USE_LIGHTMAP" : "",
    i.aoMap ? "#define USE_AOMAP" : "",
    i.bumpMap ? "#define USE_BUMPMAP" : "",
    i.normalMap ? "#define USE_NORMALMAP" : "",
    i.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    i.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    i.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    i.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    i.anisotropy ? "#define USE_ANISOTROPY" : "",
    i.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    i.specularMap ? "#define USE_SPECULARMAP" : "",
    i.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    i.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    i.metalnessMap ? "#define USE_METALNESSMAP" : "",
    i.alphaMap ? "#define USE_ALPHAMAP" : "",
    i.alphaHash ? "#define USE_ALPHAHASH" : "",
    i.transmission ? "#define USE_TRANSMISSION" : "",
    i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    i.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    i.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    i.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    i.mapUv ? "#define MAP_UV " + i.mapUv : "",
    i.alphaMapUv ? "#define ALPHAMAP_UV " + i.alphaMapUv : "",
    i.lightMapUv ? "#define LIGHTMAP_UV " + i.lightMapUv : "",
    i.aoMapUv ? "#define AOMAP_UV " + i.aoMapUv : "",
    i.emissiveMapUv ? "#define EMISSIVEMAP_UV " + i.emissiveMapUv : "",
    i.bumpMapUv ? "#define BUMPMAP_UV " + i.bumpMapUv : "",
    i.normalMapUv ? "#define NORMALMAP_UV " + i.normalMapUv : "",
    i.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + i.displacementMapUv : "",
    i.metalnessMapUv ? "#define METALNESSMAP_UV " + i.metalnessMapUv : "",
    i.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + i.roughnessMapUv : "",
    i.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + i.anisotropyMapUv : "",
    i.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + i.clearcoatMapUv : "",
    i.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + i.clearcoatNormalMapUv : "",
    i.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + i.clearcoatRoughnessMapUv : "",
    i.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + i.iridescenceMapUv : "",
    i.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + i.iridescenceThicknessMapUv : "",
    i.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + i.sheenColorMapUv : "",
    i.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + i.sheenRoughnessMapUv : "",
    i.specularMapUv ? "#define SPECULARMAP_UV " + i.specularMapUv : "",
    i.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + i.specularColorMapUv : "",
    i.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + i.specularIntensityMapUv : "",
    i.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + i.transmissionMapUv : "",
    i.thicknessMapUv ? "#define THICKNESSMAP_UV " + i.thicknessMapUv : "",
    i.vertexTangents && i.flatShading === !1 ? "#define USE_TANGENT" : "",
    i.vertexNormals ? "#define HAS_NORMAL" : "",
    i.vertexColors ? "#define USE_COLOR" : "",
    i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    i.vertexUv1s ? "#define USE_UV1" : "",
    i.vertexUv2s ? "#define USE_UV2" : "",
    i.vertexUv3s ? "#define USE_UV3" : "",
    i.pointsUvs ? "#define USE_POINTS_UV" : "",
    i.flatShading ? "#define FLAT_SHADED" : "",
    i.skinning ? "#define USE_SKINNING" : "",
    i.morphTargets ? "#define USE_MORPHTARGETS" : "",
    i.morphNormals && i.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    i.morphColors ? "#define USE_MORPHCOLORS" : "",
    i.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + i.morphTextureStride : "",
    i.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + i.morphTargetsCount : "",
    i.doubleSided ? "#define DOUBLE_SIDED" : "",
    i.flipSided ? "#define FLIP_SIDED" : "",
    i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    i.shadowMapEnabled ? "#define " + c : "",
    i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    i.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    i.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    i.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(hn).join(`
`), d = [
    Qs(i),
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M,
    i.useFog && i.fog ? "#define USE_FOG" : "",
    i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "",
    i.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    i.map ? "#define USE_MAP" : "",
    i.matcap ? "#define USE_MATCAP" : "",
    i.envMap ? "#define USE_ENVMAP" : "",
    i.envMap ? "#define " + l : "",
    i.envMap ? "#define " + u : "",
    i.envMap ? "#define " + f : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    i.lightMap ? "#define USE_LIGHTMAP" : "",
    i.aoMap ? "#define USE_AOMAP" : "",
    i.bumpMap ? "#define USE_BUMPMAP" : "",
    i.normalMap ? "#define USE_NORMALMAP" : "",
    i.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    i.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    i.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    i.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    i.anisotropy ? "#define USE_ANISOTROPY" : "",
    i.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    i.clearcoat ? "#define USE_CLEARCOAT" : "",
    i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    i.dispersion ? "#define USE_DISPERSION" : "",
    i.iridescence ? "#define USE_IRIDESCENCE" : "",
    i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    i.specularMap ? "#define USE_SPECULARMAP" : "",
    i.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    i.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    i.metalnessMap ? "#define USE_METALNESSMAP" : "",
    i.alphaMap ? "#define USE_ALPHAMAP" : "",
    i.alphaTest ? "#define USE_ALPHATEST" : "",
    i.alphaHash ? "#define USE_ALPHAHASH" : "",
    i.sheen ? "#define USE_SHEEN" : "",
    i.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    i.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    i.transmission ? "#define USE_TRANSMISSION" : "",
    i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    i.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    i.vertexTangents && i.flatShading === !1 ? "#define USE_TANGENT" : "",
    i.vertexColors || i.instancingColor ? "#define USE_COLOR" : "",
    i.vertexAlphas || i.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    i.vertexUv1s ? "#define USE_UV1" : "",
    i.vertexUv2s ? "#define USE_UV2" : "",
    i.vertexUv3s ? "#define USE_UV3" : "",
    i.pointsUvs ? "#define USE_POINTS_UV" : "",
    i.gradientMap ? "#define USE_GRADIENTMAP" : "",
    i.flatShading ? "#define FLAT_SHADED" : "",
    i.doubleSided ? "#define DOUBLE_SIDED" : "",
    i.flipSided ? "#define FLIP_SIDED" : "",
    i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    i.shadowMapEnabled ? "#define " + c : "",
    i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    i.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    i.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    i.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    i.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    i.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    i.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    i.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    i.toneMapping !== 0 ? Ue.tonemapping_pars_fragment : "",
    i.toneMapping !== 0 ? Vh("toneMapping", i.toneMapping) : "",
    i.dithering ? "#define DITHERING" : "",
    i.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    Bh("linearToOutputTexel", i.outputColorSpace),
    Gh(),
    i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "",
    `
`
  ].filter(hn).join(`
`)), a = Wr(a), a = Zs(a, i), a = $s(a, i), o = Wr(o), o = Zs(o, i), o = $s(o, i), a = Js(a), o = Js(o), i.isRawShaderMaterial !== !0 && (P = `#version 300 es
`, g = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + g, d = [
    "#define varying in",
    i.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    i.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + d);
  const w = P + g + a, x = P + d + o, T = qs(r, r.VERTEX_SHADER, w), b = qs(r, r.FRAGMENT_SHADER, x);
  r.attachShader(E, T), r.attachShader(E, b), i.index0AttributeName !== void 0 ? r.bindAttribLocation(E, 0, i.index0AttributeName) : i.hasPositionAttribute === !0 && r.bindAttribLocation(E, 0, "position"), r.linkProgram(E);
  function I(A) {
    if (e.debug.checkShaderErrors) {
      const H = r.getProgramInfoLog(E) || "", K = r.getShaderInfoLog(T) || "", k = r.getShaderInfoLog(b) || "", G = H.trim(), q = K.trim(), O = k.trim();
      let j = !0, ee = !0;
      if (r.getProgramParameter(E, r.LINK_STATUS) === !1)
        if (j = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(r, E, T, b);
        else {
          const ne = Ks(r, T, "vertex"), de = Ks(r, b, "fragment");
          Ce("WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(E, r.VALIDATE_STATUS) + `

Material Name: ` + A.name + `
Material Type: ` + A.type + `

Program Info Log: ` + G + `
` + ne + `
` + de);
        }
      else G !== "" ? Te("WebGLProgram: Program Info Log:", G) : (q === "" || O === "") && (ee = !1);
      ee && (A.diagnostics = {
        runnable: j,
        programLog: G,
        vertexShader: {
          log: q,
          prefix: g
        },
        fragmentShader: {
          log: O,
          prefix: d
        }
      });
    }
    r.deleteShader(T), r.deleteShader(b), v = new Zn(r, E), y = Wh(r, E);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && I(this), v;
  };
  let y;
  this.getAttributes = function() {
    return y === void 0 && I(this), y;
  };
  let W = i.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return W === !1 && (W = r.getProgramParameter(E, Uh)), W;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(E), this.program = void 0;
  }, this.type = i.shaderType, this.name = i.shaderName, this.id = Nh++, this.cacheKey = t, this.usedTimes = 1, this.program = E, this.vertexShader = T, this.fragmentShader = b, this;
}
var au = 0, ou = class {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e, t, i) {
    const n = this._getShaderCacheForMaterial(e);
    return n.has(t) === !1 && (n.add(t), t.usedTimes++), n.has(i) === !1 && (n.add(i), i.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const i of t)
      i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let i = t.get(e);
    return i === void 0 && (i = /* @__PURE__ */ new Set(), t.set(e, i)), i;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let i = t.get(e);
    return i === void 0 && (i = new lu(e), t.set(e, i)), i;
  }
}, lu = class {
  constructor(e) {
    this.id = au++, this.code = e, this.usedTimes = 0;
  }
};
function cu(e) {
  return e === 1030 || e === 37490 || e === 36285;
}
function hu(e, t, i, n, r, s) {
  const a = new Ra(), o = new ou(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), f = n.logarithmicDepthBuffer;
  let h = n.precision;
  const p = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function M(v) {
    return c.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function E(v, y, W, A, H, K) {
    const k = A.fog, G = H.geometry, q = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? A.environment : null, O = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, j = t.get(v.envMap || q, O), ee = j && j.mapping === 306 ? j.image.height : null, ne = p[v.type];
    v.precision !== null && (h = n.getMaxPrecision(v.precision), h !== v.precision && Te("WebGLProgram.getParameters:", v.precision, "not supported, using", h, "instead."));
    const de = G.morphAttributes.position || G.morphAttributes.normal || G.morphAttributes.color, xe = de !== void 0 ? de.length : 0;
    let et = 0;
    G.morphAttributes.position !== void 0 && (et = 1), G.morphAttributes.normal !== void 0 && (et = 2), G.morphAttributes.color !== void 0 && (et = 3);
    let Ke, X, se, pe;
    if (ne) {
      const Ae = Wt[ne];
      Ke = Ae.vertexShader, X = Ae.fragmentShader;
    } else {
      Ke = v.vertexShader, X = v.fragmentShader;
      const Ae = o.getVertexShaderStage(v), _t = o.getFragmentShaderStage(v);
      o.update(v, Ae, _t), se = Ae.id, pe = _t.id;
    }
    const he = e.getRenderTarget(), be = e.state.buffers.depth.getReversed(), we = H.isInstancedMesh === !0, Pe = H.isBatchedMesh === !0, We = !!v.map, Be = !!v.matcap, Je = !!j, ft = !!v.aoMap, yt = !!v.lightMap, Rt = !!v.bumpMap && v.wireframe === !1, Qe = !!v.normalMap, pt = !!v.displacementMap, ut = !!v.emissiveMap, ot = !!v.metalnessMap, L = !!v.roughnessMap, Ct = v.anisotropy > 0, Xe = v.clearcoat > 0, je = v.dispersion > 0, S = v.iridescence > 0, m = v.sheen > 0, R = v.transmission > 0, V = Ct && !!v.anisotropyMap, Z = Xe && !!v.clearcoatMap, ie = Xe && !!v.clearcoatNormalMap, ae = Xe && !!v.clearcoatRoughnessMap, D = S && !!v.iridescenceMap, te = S && !!v.iridescenceThicknessMap, fe = m && !!v.sheenColorMap, _e = m && !!v.sheenRoughnessMap, Q = !!v.specularMap, Se = !!v.specularColorMap, Ee = !!v.specularIntensityMap, Le = R && !!v.transmissionMap, Ve = R && !!v.thicknessMap, C = !!v.gradientMap, Y = !!v.alphaMap, $ = v.alphaTest > 0, ue = !!v.alphaHash, ve = !!v.extensions;
    let J = 0;
    v.toneMapped && (he === null || he.isXRRenderTarget === !0) && (J = e.toneMapping);
    const le = {
      shaderID: ne,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: Ke,
      fragmentShader: X,
      defines: v.defines,
      customVertexShaderID: se,
      customFragmentShaderID: pe,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: h,
      batching: Pe,
      batchingColor: Pe && H._colorsTexture !== null,
      instancing: we,
      instancingColor: we && H.instanceColor !== null,
      instancingMorph: we && H.morphTexture !== null,
      outputColorSpace: he === null ? e.outputColorSpace : he.isXRRenderTarget === !0 ? he.texture.colorSpace : ze.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: We,
      matcap: Be,
      envMap: Je,
      envMapMode: Je && j.mapping,
      envMapCubeUVHeight: ee,
      aoMap: ft,
      lightMap: yt,
      bumpMap: Rt,
      normalMap: Qe,
      displacementMap: pt,
      emissiveMap: ut,
      normalMapObjectSpace: Qe && v.normalMapType === 1,
      normalMapTangentSpace: Qe && v.normalMapType === 0,
      packedNormalMap: Qe && v.normalMapType === 0 && cu(v.normalMap.format),
      metalnessMap: ot,
      roughnessMap: L,
      anisotropy: Ct,
      anisotropyMap: V,
      clearcoat: Xe,
      clearcoatMap: Z,
      clearcoatNormalMap: ie,
      clearcoatRoughnessMap: ae,
      dispersion: je,
      iridescence: S,
      iridescenceMap: D,
      iridescenceThicknessMap: te,
      sheen: m,
      sheenColorMap: fe,
      sheenRoughnessMap: _e,
      specularMap: Q,
      specularColorMap: Se,
      specularIntensityMap: Ee,
      transmission: R,
      transmissionMap: Le,
      thicknessMap: Ve,
      gradientMap: C,
      opaque: v.transparent === !1 && v.blending === 1 && v.alphaToCoverage === !1,
      alphaMap: Y,
      alphaTest: $,
      alphaHash: ue,
      combine: v.combine,
      mapUv: We && M(v.map.channel),
      aoMapUv: ft && M(v.aoMap.channel),
      lightMapUv: yt && M(v.lightMap.channel),
      bumpMapUv: Rt && M(v.bumpMap.channel),
      normalMapUv: Qe && M(v.normalMap.channel),
      displacementMapUv: pt && M(v.displacementMap.channel),
      emissiveMapUv: ut && M(v.emissiveMap.channel),
      metalnessMapUv: ot && M(v.metalnessMap.channel),
      roughnessMapUv: L && M(v.roughnessMap.channel),
      anisotropyMapUv: V && M(v.anisotropyMap.channel),
      clearcoatMapUv: Z && M(v.clearcoatMap.channel),
      clearcoatNormalMapUv: ie && M(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ae && M(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: D && M(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: te && M(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: fe && M(v.sheenColorMap.channel),
      sheenRoughnessMapUv: _e && M(v.sheenRoughnessMap.channel),
      specularMapUv: Q && M(v.specularMap.channel),
      specularColorMapUv: Se && M(v.specularColorMap.channel),
      specularIntensityMapUv: Ee && M(v.specularIntensityMap.channel),
      transmissionMapUv: Le && M(v.transmissionMap.channel),
      thicknessMapUv: Ve && M(v.thicknessMap.channel),
      alphaMapUv: Y && M(v.alphaMap.channel),
      vertexTangents: !!G.attributes.tangent && (Qe || Ct),
      vertexNormals: !!G.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!G.attributes.color && G.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!G.attributes.uv && (We || Y),
      fog: !!k,
      useFog: v.fog === !0,
      fogExp2: !!k && k.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || G.attributes.normal === void 0 && Qe === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reversedDepthBuffer: be,
      skinning: H.isSkinnedMesh === !0,
      hasPositionAttribute: G.attributes.position !== void 0,
      morphTargets: G.morphAttributes.position !== void 0,
      morphNormals: G.morphAttributes.normal !== void 0,
      morphColors: G.morphAttributes.color !== void 0,
      morphTargetsCount: xe,
      morphTextureStride: et,
      numDirLights: y.directional.length,
      numPointLights: y.point.length,
      numSpotLights: y.spot.length,
      numSpotLightMaps: y.spotLightMap.length,
      numRectAreaLights: y.rectArea.length,
      numHemiLights: y.hemi.length,
      numDirLightShadows: y.directionalShadowMap.length,
      numPointLightShadows: y.pointShadowMap.length,
      numSpotLightShadows: y.spotShadowMap.length,
      numSpotLightShadowsWithMaps: y.numSpotLightShadowsWithMaps,
      numLightProbes: y.numLightProbes,
      numLightProbeGrids: K.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: e.shadowMap.enabled && W.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: J,
      decodeVideoTexture: We && v.map.isVideoTexture === !0 && ze.getTransfer(v.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ut && v.emissiveMap.isVideoTexture === !0 && ze.getTransfer(v.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === 2,
      flipSided: v.side === 1,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: ve && v.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ve && v.extensions.multiDraw === !0 || Pe) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return le.vertexUv1s = c.has(1), le.vertexUv2s = c.has(2), le.vertexUv3s = c.has(3), c.clear(), le;
  }
  function g(v) {
    const y = [];
    if (v.shaderID ? y.push(v.shaderID) : (y.push(v.customVertexShaderID), y.push(v.customFragmentShaderID)), v.defines !== void 0) for (const W in v.defines)
      y.push(W), y.push(v.defines[W]);
    return v.isRawShaderMaterial === !1 && (d(y, v), P(y, v), y.push(e.outputColorSpace)), y.push(v.customProgramCacheKey), y.join();
  }
  function d(v, y) {
    v.push(y.precision), v.push(y.outputColorSpace), v.push(y.envMapMode), v.push(y.envMapCubeUVHeight), v.push(y.mapUv), v.push(y.alphaMapUv), v.push(y.lightMapUv), v.push(y.aoMapUv), v.push(y.bumpMapUv), v.push(y.normalMapUv), v.push(y.displacementMapUv), v.push(y.emissiveMapUv), v.push(y.metalnessMapUv), v.push(y.roughnessMapUv), v.push(y.anisotropyMapUv), v.push(y.clearcoatMapUv), v.push(y.clearcoatNormalMapUv), v.push(y.clearcoatRoughnessMapUv), v.push(y.iridescenceMapUv), v.push(y.iridescenceThicknessMapUv), v.push(y.sheenColorMapUv), v.push(y.sheenRoughnessMapUv), v.push(y.specularMapUv), v.push(y.specularColorMapUv), v.push(y.specularIntensityMapUv), v.push(y.transmissionMapUv), v.push(y.thicknessMapUv), v.push(y.combine), v.push(y.fogExp2), v.push(y.sizeAttenuation), v.push(y.morphTargetsCount), v.push(y.morphAttributeCount), v.push(y.numDirLights), v.push(y.numPointLights), v.push(y.numSpotLights), v.push(y.numSpotLightMaps), v.push(y.numHemiLights), v.push(y.numRectAreaLights), v.push(y.numDirLightShadows), v.push(y.numPointLightShadows), v.push(y.numSpotLightShadows), v.push(y.numSpotLightShadowsWithMaps), v.push(y.numLightProbes), v.push(y.shadowMapType), v.push(y.toneMapping), v.push(y.numClippingPlanes), v.push(y.numClipIntersection), v.push(y.depthPacking);
  }
  function P(v, y) {
    a.disableAll(), y.instancing && a.enable(0), y.instancingColor && a.enable(1), y.instancingMorph && a.enable(2), y.matcap && a.enable(3), y.envMap && a.enable(4), y.normalMapObjectSpace && a.enable(5), y.normalMapTangentSpace && a.enable(6), y.clearcoat && a.enable(7), y.iridescence && a.enable(8), y.alphaTest && a.enable(9), y.vertexColors && a.enable(10), y.vertexAlphas && a.enable(11), y.vertexUv1s && a.enable(12), y.vertexUv2s && a.enable(13), y.vertexUv3s && a.enable(14), y.vertexTangents && a.enable(15), y.anisotropy && a.enable(16), y.alphaHash && a.enable(17), y.batching && a.enable(18), y.dispersion && a.enable(19), y.batchingColor && a.enable(20), y.gradientMap && a.enable(21), y.packedNormalMap && a.enable(22), y.vertexNormals && a.enable(23), v.push(a.mask), a.disableAll(), y.fog && a.enable(0), y.useFog && a.enable(1), y.flatShading && a.enable(2), y.logarithmicDepthBuffer && a.enable(3), y.reversedDepthBuffer && a.enable(4), y.skinning && a.enable(5), y.morphTargets && a.enable(6), y.morphNormals && a.enable(7), y.morphColors && a.enable(8), y.premultipliedAlpha && a.enable(9), y.shadowMapEnabled && a.enable(10), y.doubleSided && a.enable(11), y.flipSided && a.enable(12), y.useDepthPacking && a.enable(13), y.dithering && a.enable(14), y.transmission && a.enable(15), y.sheen && a.enable(16), y.opaque && a.enable(17), y.pointsUvs && a.enable(18), y.decodeVideoTexture && a.enable(19), y.decodeVideoTextureEmissive && a.enable(20), y.alphaToCoverage && a.enable(21), y.numLightProbeGrids > 0 && a.enable(22), y.hasPositionAttribute && a.enable(23), v.push(a.mask);
  }
  function w(v) {
    const y = p[v.type];
    let W;
    if (y) {
      const A = Wt[y];
      W = Yl.clone(A.uniforms);
    } else W = v.uniforms;
    return W;
  }
  function x(v, y) {
    let W = u.get(y);
    return W !== void 0 ? ++W.usedTimes : (W = new su(e, y, v, r), l.push(W), u.set(y, W)), W;
  }
  function T(v) {
    if (--v.usedTimes === 0) {
      const y = l.indexOf(v);
      l[y] = l[l.length - 1], l.pop(), u.delete(v.cacheKey), v.destroy();
    }
  }
  function b(v) {
    o.remove(v);
  }
  function I() {
    o.dispose();
  }
  return {
    getParameters: E,
    getProgramCacheKey: g,
    getUniforms: w,
    acquireProgram: x,
    releaseProgram: T,
    releaseShaderCache: b,
    programs: l,
    dispose: I
  };
}
function uu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return e.has(a);
  }
  function i(a) {
    let o = e.get(a);
    return o === void 0 && (o = {}, e.set(a, o)), o;
  }
  function n(a) {
    e.delete(a);
  }
  function r(a, o, c) {
    e.get(a)[o] = c;
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: i,
    remove: n,
    update: r,
    dispose: s
  };
}
function du(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function js(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function ea() {
  const e = [];
  let t = 0;
  const i = [], n = [], r = [];
  function s() {
    t = 0, i.length = 0, n.length = 0, r.length = 0;
  }
  function a(h) {
    let p = 0;
    return h.isInstancedMesh && (p += 2), h.isSkinnedMesh && (p += 1), p;
  }
  function o(h, p, M, E, g, d) {
    let P = e[t];
    return P === void 0 ? (P = {
      id: h.id,
      object: h,
      geometry: p,
      material: M,
      materialVariant: a(h),
      groupOrder: E,
      renderOrder: h.renderOrder,
      z: g,
      group: d
    }, e[t] = P) : (P.id = h.id, P.object = h, P.geometry = p, P.material = M, P.materialVariant = a(h), P.groupOrder = E, P.renderOrder = h.renderOrder, P.z = g, P.group = d), t++, P;
  }
  function c(h, p, M, E, g, d) {
    const P = o(h, p, M, E, g, d);
    M.transmission > 0 ? n.push(P) : M.transparent === !0 ? r.push(P) : i.push(P);
  }
  function l(h, p, M, E, g, d) {
    const P = o(h, p, M, E, g, d);
    M.transmission > 0 ? n.unshift(P) : M.transparent === !0 ? r.unshift(P) : i.unshift(P);
  }
  function u(h, p, M) {
    i.length > 1 && i.sort(h || du), n.length > 1 && n.sort(p || js), r.length > 1 && r.sort(p || js), M && (i.reverse(), n.reverse(), r.reverse());
  }
  function f() {
    for (let h = t, p = e.length; h < p; h++) {
      const M = e[h];
      if (M.id === null) break;
      M.id = null, M.object = null, M.geometry = null, M.material = null, M.group = null;
    }
  }
  return {
    opaque: i,
    transmissive: n,
    transparent: r,
    init: s,
    push: c,
    unshift: l,
    finish: f,
    sort: u
  };
}
function fu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = e.get(n);
    let a;
    return s === void 0 ? (a = new ea(), e.set(n, [a])) : r >= s.length ? (a = new ea(), s.push(a)) : a = s[r], a;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
function pu() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let i;
    switch (t.type) {
      case "DirectionalLight":
        i = {
          direction: new B(),
          color: new He()
        };
        break;
      case "SpotLight":
        i = {
          position: new B(),
          direction: new B(),
          color: new He(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        i = {
          position: new B(),
          color: new He(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        i = {
          direction: new B(),
          skyColor: new He(),
          groundColor: new He()
        };
        break;
      case "RectAreaLight":
        i = {
          color: new He(),
          position: new B(),
          halfWidth: new B(),
          halfHeight: new B()
        };
        break;
    }
    return e[t.id] = i, i;
  } };
}
function mu() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let i;
    switch (t.type) {
      case "DirectionalLight":
        i = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ie()
        };
        break;
      case "SpotLight":
        i = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ie()
        };
        break;
      case "PointLight":
        i = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ie(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return e[t.id] = i, i;
  } };
}
var gu = 0;
function vu(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function _u(e) {
  const t = new pu(), i = mu(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [
      0,
      0,
      0
    ],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) n.probe.push(new B());
  const r = new B(), s = new lt(), a = new lt();
  function o(l) {
    let u = 0, f = 0, h = 0;
    for (let y = 0; y < 9; y++) n.probe[y].set(0, 0, 0);
    let p = 0, M = 0, E = 0, g = 0, d = 0, P = 0, w = 0, x = 0, T = 0, b = 0, I = 0;
    l.sort(vu);
    for (let y = 0, W = l.length; y < W; y++) {
      const A = l[y], H = A.color, K = A.intensity, k = A.distance;
      let G = null;
      if (A.shadow && A.shadow.map && (A.shadow.map.texture.format === 1030 ? G = A.shadow.map.texture : G = A.shadow.map.depthTexture || A.shadow.map.texture), A.isAmbientLight)
        u += H.r * K, f += H.g * K, h += H.b * K;
      else if (A.isLightProbe) {
        for (let q = 0; q < 9; q++) n.probe[q].addScaledVector(A.sh.coefficients[q], K);
        I++;
      } else if (A.isDirectionalLight) {
        const q = t.get(A);
        if (q.color.copy(A.color).multiplyScalar(A.intensity), A.castShadow) {
          const O = A.shadow, j = i.get(A);
          j.shadowIntensity = O.intensity, j.shadowBias = O.bias, j.shadowNormalBias = O.normalBias, j.shadowRadius = O.radius, j.shadowMapSize = O.mapSize, n.directionalShadow[p] = j, n.directionalShadowMap[p] = G, n.directionalShadowMatrix[p] = A.shadow.matrix, P++;
        }
        n.directional[p] = q, p++;
      } else if (A.isSpotLight) {
        const q = t.get(A);
        q.position.setFromMatrixPosition(A.matrixWorld), q.color.copy(H).multiplyScalar(K), q.distance = k, q.coneCos = Math.cos(A.angle), q.penumbraCos = Math.cos(A.angle * (1 - A.penumbra)), q.decay = A.decay, n.spot[E] = q;
        const O = A.shadow;
        if (A.map && (n.spotLightMap[T] = A.map, T++, O.updateMatrices(A), A.castShadow && b++), n.spotLightMatrix[E] = O.matrix, A.castShadow) {
          const j = i.get(A);
          j.shadowIntensity = O.intensity, j.shadowBias = O.bias, j.shadowNormalBias = O.normalBias, j.shadowRadius = O.radius, j.shadowMapSize = O.mapSize, n.spotShadow[E] = j, n.spotShadowMap[E] = G, x++;
        }
        E++;
      } else if (A.isRectAreaLight) {
        const q = t.get(A);
        q.color.copy(H).multiplyScalar(K), q.halfWidth.set(A.width * 0.5, 0, 0), q.halfHeight.set(0, A.height * 0.5, 0), n.rectArea[g] = q, g++;
      } else if (A.isPointLight) {
        const q = t.get(A);
        if (q.color.copy(A.color).multiplyScalar(A.intensity), q.distance = A.distance, q.decay = A.decay, A.castShadow) {
          const O = A.shadow, j = i.get(A);
          j.shadowIntensity = O.intensity, j.shadowBias = O.bias, j.shadowNormalBias = O.normalBias, j.shadowRadius = O.radius, j.shadowMapSize = O.mapSize, j.shadowCameraNear = O.camera.near, j.shadowCameraFar = O.camera.far, n.pointShadow[M] = j, n.pointShadowMap[M] = G, n.pointShadowMatrix[M] = A.shadow.matrix, w++;
        }
        n.point[M] = q, M++;
      } else if (A.isHemisphereLight) {
        const q = t.get(A);
        q.skyColor.copy(A.color).multiplyScalar(K), q.groundColor.copy(A.groundColor).multiplyScalar(K), n.hemi[d] = q, d++;
      }
    }
    g > 0 && (e.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = oe.LTC_FLOAT_1, n.rectAreaLTC2 = oe.LTC_FLOAT_2) : (n.rectAreaLTC1 = oe.LTC_HALF_1, n.rectAreaLTC2 = oe.LTC_HALF_2)), n.ambient[0] = u, n.ambient[1] = f, n.ambient[2] = h;
    const v = n.hash;
    (v.directionalLength !== p || v.pointLength !== M || v.spotLength !== E || v.rectAreaLength !== g || v.hemiLength !== d || v.numDirectionalShadows !== P || v.numPointShadows !== w || v.numSpotShadows !== x || v.numSpotMaps !== T || v.numLightProbes !== I) && (n.directional.length = p, n.spot.length = E, n.rectArea.length = g, n.point.length = M, n.hemi.length = d, n.directionalShadow.length = P, n.directionalShadowMap.length = P, n.pointShadow.length = w, n.pointShadowMap.length = w, n.spotShadow.length = x, n.spotShadowMap.length = x, n.directionalShadowMatrix.length = P, n.pointShadowMatrix.length = w, n.spotLightMatrix.length = x + T - b, n.spotLightMap.length = T, n.numSpotLightShadowsWithMaps = b, n.numLightProbes = I, v.directionalLength = p, v.pointLength = M, v.spotLength = E, v.rectAreaLength = g, v.hemiLength = d, v.numDirectionalShadows = P, v.numPointShadows = w, v.numSpotShadows = x, v.numSpotMaps = T, v.numLightProbes = I, n.version = gu++);
  }
  function c(l, u) {
    let f = 0, h = 0, p = 0, M = 0, E = 0;
    const g = u.matrixWorldInverse;
    for (let d = 0, P = l.length; d < P; d++) {
      const w = l[d];
      if (w.isDirectionalLight) {
        const x = n.directional[f];
        x.direction.setFromMatrixPosition(w.matrixWorld), r.setFromMatrixPosition(w.target.matrixWorld), x.direction.sub(r), x.direction.transformDirection(g), f++;
      } else if (w.isSpotLight) {
        const x = n.spot[p];
        x.position.setFromMatrixPosition(w.matrixWorld), x.position.applyMatrix4(g), x.direction.setFromMatrixPosition(w.matrixWorld), r.setFromMatrixPosition(w.target.matrixWorld), x.direction.sub(r), x.direction.transformDirection(g), p++;
      } else if (w.isRectAreaLight) {
        const x = n.rectArea[M];
        x.position.setFromMatrixPosition(w.matrixWorld), x.position.applyMatrix4(g), a.identity(), s.copy(w.matrixWorld), s.premultiply(g), a.extractRotation(s), x.halfWidth.set(w.width * 0.5, 0, 0), x.halfHeight.set(0, w.height * 0.5, 0), x.halfWidth.applyMatrix4(a), x.halfHeight.applyMatrix4(a), M++;
      } else if (w.isPointLight) {
        const x = n.point[h];
        x.position.setFromMatrixPosition(w.matrixWorld), x.position.applyMatrix4(g), h++;
      } else if (w.isHemisphereLight) {
        const x = n.hemi[E];
        x.direction.setFromMatrixPosition(w.matrixWorld), x.direction.transformDirection(g), E++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: n
  };
}
function ta(e) {
  const t = new _u(e), i = [], n = [], r = [];
  function s(h) {
    f.camera = h, i.length = 0, n.length = 0, r.length = 0;
  }
  function a(h) {
    i.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function c(h) {
    r.push(h);
  }
  function l() {
    t.setup(i);
  }
  function u(h) {
    t.setupView(i, h);
  }
  const f = {
    lightsArray: i,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: f,
    setupLights: l,
    setupLightsView: u,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: c
  };
}
function Mu(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function i(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new ta(e), t.set(r, [o])) : s >= a.length ? (o = new ta(e), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: n
  };
}
var Su = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, xu = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, Eu = [
  /* @__PURE__ */ new B(1, 0, 0),
  /* @__PURE__ */ new B(-1, 0, 0),
  /* @__PURE__ */ new B(0, 1, 0),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, 0, 1),
  /* @__PURE__ */ new B(0, 0, -1)
], yu = [
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, 0, 1),
  /* @__PURE__ */ new B(0, 0, -1),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, -1, 0)
], ia = /* @__PURE__ */ new lt(), cn = /* @__PURE__ */ new B(), Br = /* @__PURE__ */ new B();
function Tu(e, t, i) {
  let n = new Ua();
  const r = new Ie(), s = new Ie(), a = new st(), o = new Jl(), c = new Ql(), l = {}, u = i.maxTextureSize, f = {
    0: 1,
    1: 0,
    2: 2
  }, h = new Dt({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ie() },
      radius: { value: 4 }
    },
    vertexShader: Su,
    fragmentShader: xu
  }), p = h.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const M = new wi();
  M.setAttribute("position", new qt(new Float32Array([
    -1,
    -1,
    0.5,
    3,
    -1,
    0.5,
    -1,
    3,
    0.5
  ]), 3));
  const E = new zt(M, h), g = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(b, I, v) {
    if (g.enabled === !1 || g.autoUpdate === !1 && g.needsUpdate === !1 || b.length === 0) return;
    this.type === 2 && (Te("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const y = e.getRenderTarget(), W = e.getActiveCubeFace(), A = e.getActiveMipmapLevel(), H = e.state;
    H.setBlending(0), H.buffers.depth.getReversed() === !0 ? H.buffers.color.setClear(0, 0, 0, 0) : H.buffers.color.setClear(1, 1, 1, 1), H.buffers.depth.setTest(!0), H.setScissorTest(!1);
    const K = d !== this.type;
    K && I.traverse(function(k) {
      k.material && (Array.isArray(k.material) ? k.material.forEach((G) => G.needsUpdate = !0) : k.material.needsUpdate = !0);
    });
    for (let k = 0, G = b.length; k < G; k++) {
      const q = b[k], O = q.shadow;
      if (O === void 0) {
        Te("WebGLShadowMap:", q, "has no shadow.");
        continue;
      }
      if (O.autoUpdate === !1 && O.needsUpdate === !1) continue;
      r.copy(O.mapSize);
      const j = O.getFrameExtents();
      r.multiply(j), s.copy(O.mapSize), (r.x > u || r.y > u) && (r.x > u && (s.x = Math.floor(u / j.x), r.x = s.x * j.x, O.mapSize.x = s.x), r.y > u && (s.y = Math.floor(u / j.y), r.y = s.y * j.y, O.mapSize.y = s.y));
      const ee = e.state.buffers.depth.getReversed();
      if (O.camera._reversedDepth = ee, O.map === null || K === !0) {
        if (O.map !== null && (O.map.depthTexture !== null && (O.map.depthTexture.dispose(), O.map.depthTexture = null), O.map.dispose()), this.type === 3) {
          if (q.isPointLight) {
            Te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          O.map = new Xt(r.x, r.y, {
            format: $n,
            type: yi,
            minFilter: Et,
            magFilter: Et,
            generateMipmaps: !1
          }), O.map.texture.name = q.name + ".shadowMap", O.map.depthTexture = new $i(r.x, r.y, nr), O.map.depthTexture.name = q.name + ".shadowMapDepth", O.map.depthTexture.format = pn, O.map.depthTexture.compareFunction = null, O.map.depthTexture.minFilter = xt, O.map.depthTexture.magFilter = xt;
        } else
          q.isPointLight ? (O.map = new Wa(r.x), O.map.depthTexture = new Xl(r.x, Ei)) : (O.map = new Xt(r.x, r.y), O.map.depthTexture = new $i(r.x, r.y, Ei)), O.map.depthTexture.name = q.name + ".shadowMap", O.map.depthTexture.format = pn, this.type === 1 ? (O.map.depthTexture.compareFunction = ee ? 518 : 515, O.map.depthTexture.minFilter = Et, O.map.depthTexture.magFilter = Et) : (O.map.depthTexture.compareFunction = null, O.map.depthTexture.minFilter = xt, O.map.depthTexture.magFilter = xt);
        O.camera.updateProjectionMatrix();
      }
      const ne = O.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let de = 0; de < ne; de++) {
        if (O.map.isWebGLCubeRenderTarget)
          e.setRenderTarget(O.map, de), e.clear();
        else {
          de === 0 && (e.setRenderTarget(O.map), e.clear());
          const xe = O.getViewport(de);
          a.set(s.x * xe.x, s.y * xe.y, s.x * xe.z, s.y * xe.w), H.viewport(a);
        }
        if (q.isPointLight) {
          const xe = O.camera, et = O.matrix, Ke = q.distance || xe.far;
          Ke !== xe.far && (xe.far = Ke, xe.updateProjectionMatrix()), cn.setFromMatrixPosition(q.matrixWorld), xe.position.copy(cn), Br.copy(xe.position), Br.add(Eu[de]), xe.up.copy(yu[de]), xe.lookAt(Br), xe.updateMatrixWorld(), et.makeTranslation(-cn.x, -cn.y, -cn.z), ia.multiplyMatrices(xe.projectionMatrix, xe.matrixWorldInverse), O._frustum.setFromProjectionMatrix(ia, xe.coordinateSystem, xe.reversedDepth);
        } else O.updateMatrices(q);
        n = O.getFrustum(), x(I, v, O.camera, q, this.type);
      }
      O.isPointLightShadow !== !0 && this.type === 3 && P(O, v), O.needsUpdate = !1;
    }
    d = this.type, g.needsUpdate = !1, e.setRenderTarget(y, W, A);
  };
  function P(b, I) {
    const v = t.update(E);
    h.defines.VSM_SAMPLES !== b.blurSamples && (h.defines.VSM_SAMPLES = b.blurSamples, p.defines.VSM_SAMPLES = b.blurSamples, h.needsUpdate = !0, p.needsUpdate = !0), b.mapPass === null && (b.mapPass = new Xt(r.x, r.y, {
      format: $n,
      type: yi
    })), h.uniforms.shadow_pass.value = b.map.depthTexture, h.uniforms.resolution.value = b.mapSize, h.uniforms.radius.value = b.radius, e.setRenderTarget(b.mapPass), e.clear(), e.renderBufferDirect(I, null, v, h, E, null), p.uniforms.shadow_pass.value = b.mapPass.texture, p.uniforms.resolution.value = b.mapSize, p.uniforms.radius.value = b.radius, e.setRenderTarget(b.map), e.clear(), e.renderBufferDirect(I, null, v, p, E, null);
  }
  function w(b, I, v, y) {
    let W = null;
    const A = v.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (A !== void 0) W = A;
    else if (W = v.isPointLight === !0 ? c : o, e.localClippingEnabled && I.clipShadows === !0 && Array.isArray(I.clippingPlanes) && I.clippingPlanes.length !== 0 || I.displacementMap && I.displacementScale !== 0 || I.alphaMap && I.alphaTest > 0 || I.map && I.alphaTest > 0 || I.alphaToCoverage === !0) {
      const H = W.uuid, K = I.uuid;
      let k = l[H];
      k === void 0 && (k = {}, l[H] = k);
      let G = k[K];
      G === void 0 && (G = W.clone(), k[K] = G, I.addEventListener("dispose", T)), W = G;
    }
    if (W.visible = I.visible, W.wireframe = I.wireframe, y === 3 ? W.side = I.shadowSide !== null ? I.shadowSide : I.side : W.side = I.shadowSide !== null ? I.shadowSide : f[I.side], W.alphaMap = I.alphaMap, W.alphaTest = I.alphaToCoverage === !0 ? 0.5 : I.alphaTest, W.map = I.map, W.clipShadows = I.clipShadows, W.clippingPlanes = I.clippingPlanes, W.clipIntersection = I.clipIntersection, W.displacementMap = I.displacementMap, W.displacementScale = I.displacementScale, W.displacementBias = I.displacementBias, W.wireframeLinewidth = I.wireframeLinewidth, W.linewidth = I.linewidth, v.isPointLight === !0 && W.isMeshDistanceMaterial === !0) {
      const H = e.properties.get(W);
      H.light = v;
    }
    return W;
  }
  function x(b, I, v, y, W) {
    if (b.visible === !1) return;
    if (b.layers.test(I.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && W === 3) && (!b.frustumCulled || n.intersectsObject(b))) {
      b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, b.matrixWorld);
      const H = t.update(b), K = b.material;
      if (Array.isArray(K)) {
        const k = H.groups;
        for (let G = 0, q = k.length; G < q; G++) {
          const O = k[G], j = K[O.materialIndex];
          if (j && j.visible) {
            const ee = w(b, j, y, W);
            b.onBeforeShadow(e, b, I, v, H, ee, O), e.renderBufferDirect(v, null, H, ee, b, O), b.onAfterShadow(e, b, I, v, H, ee, O);
          }
        }
      } else if (K.visible) {
        const k = w(b, K, y, W);
        b.onBeforeShadow(e, b, I, v, H, k, null), e.renderBufferDirect(v, null, H, k, b, null), b.onAfterShadow(e, b, I, v, H, k, null);
      }
    }
    const A = b.children;
    for (let H = 0, K = A.length; H < K; H++) x(A[H], I, v, y, W);
  }
  function T(b) {
    b.target.removeEventListener("dispose", T);
    for (const I in l) {
      const v = l[I], y = b.target.uuid;
      y in v && (v[y].dispose(), delete v[y]);
    }
  }
}
function bu(e, t) {
  function i() {
    let C = !1;
    const Y = new st();
    let $ = null;
    const ue = new st(0, 0, 0, 0);
    return {
      setMask: function(ve) {
        $ !== ve && !C && (e.colorMask(ve, ve, ve, ve), $ = ve);
      },
      setLocked: function(ve) {
        C = ve;
      },
      setClear: function(ve, J, le, Ae, _t) {
        _t === !0 && (ve *= Ae, J *= Ae, le *= Ae), Y.set(ve, J, le, Ae), ue.equals(Y) === !1 && (e.clearColor(ve, J, le, Ae), ue.copy(Y));
      },
      reset: function() {
        C = !1, $ = null, ue.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let C = !1, Y = !1, $ = null, ue = null, ve = null;
    return {
      setReversed: function(J) {
        if (Y !== J) {
          const le = t.get("EXT_clip_control");
          J ? le.clipControlEXT(le.LOWER_LEFT_EXT, le.ZERO_TO_ONE_EXT) : le.clipControlEXT(le.LOWER_LEFT_EXT, le.NEGATIVE_ONE_TO_ONE_EXT), Y = J;
          const Ae = ve;
          ve = null, this.setClear(Ae);
        }
      },
      getReversed: function() {
        return Y;
      },
      setTest: function(J) {
        J ? he(e.DEPTH_TEST) : be(e.DEPTH_TEST);
      },
      setMask: function(J) {
        $ !== J && !C && (e.depthMask(J), $ = J);
      },
      setFunc: function(J) {
        if (Y && (J = nl[J]), ue !== J) {
          switch (J) {
            case 0:
              e.depthFunc(e.NEVER);
              break;
            case 1:
              e.depthFunc(e.ALWAYS);
              break;
            case 2:
              e.depthFunc(e.LESS);
              break;
            case 3:
              e.depthFunc(e.LEQUAL);
              break;
            case 4:
              e.depthFunc(e.EQUAL);
              break;
            case 5:
              e.depthFunc(e.GEQUAL);
              break;
            case 6:
              e.depthFunc(e.GREATER);
              break;
            case 7:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          ue = J;
        }
      },
      setLocked: function(J) {
        C = J;
      },
      setClear: function(J) {
        ve !== J && (ve = J, Y && (J = 1 - J), e.clearDepth(J));
      },
      reset: function() {
        C = !1, $ = null, ue = null, ve = null, Y = !1;
      }
    };
  }
  function r() {
    let C = !1, Y = null, $ = null, ue = null, ve = null, J = null, le = null, Ae = null, _t = null;
    return {
      setTest: function(Ze) {
        C || (Ze ? he(e.STENCIL_TEST) : be(e.STENCIL_TEST));
      },
      setMask: function(Ze) {
        Y !== Ze && !C && (e.stencilMask(Ze), Y = Ze);
      },
      setFunc: function(Ze, Vt, Kt) {
        ($ !== Ze || ue !== Vt || ve !== Kt) && (e.stencilFunc(Ze, Vt, Kt), $ = Ze, ue = Vt, ve = Kt);
      },
      setOp: function(Ze, Vt, Kt) {
        (J !== Ze || le !== Vt || Ae !== Kt) && (e.stencilOp(Ze, Vt, Kt), J = Ze, le = Vt, Ae = Kt);
      },
      setLocked: function(Ze) {
        C = Ze;
      },
      setClear: function(Ze) {
        _t !== Ze && (e.clearStencil(Ze), _t = Ze);
      },
      reset: function() {
        C = !1, Y = null, $ = null, ue = null, ve = null, J = null, le = null, Ae = null, _t = null;
      }
    };
  }
  const s = new i(), a = new n(), o = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let u = {}, f = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), M = [], E = null, g = !1, d = null, P = null, w = null, x = null, T = null, b = null, I = null, v = new He(0, 0, 0), y = 0, W = !1, A = null, H = null, K = null, k = null, G = null;
  const q = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let O = !1, j = 0;
  const ee = e.getParameter(e.VERSION);
  ee.indexOf("WebGL") !== -1 ? (j = parseFloat(/^WebGL (\d)/.exec(ee)[1]), O = j >= 1) : ee.indexOf("OpenGL ES") !== -1 && (j = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), O = j >= 2);
  let ne = null, de = {};
  const xe = e.getParameter(e.SCISSOR_BOX), et = e.getParameter(e.VIEWPORT), Ke = new st().fromArray(xe), X = new st().fromArray(et);
  function se(C, Y, $, ue) {
    const ve = new Uint8Array(4), J = e.createTexture();
    e.bindTexture(C, J), e.texParameteri(C, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(C, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let le = 0; le < $; le++) C === e.TEXTURE_3D || C === e.TEXTURE_2D_ARRAY ? e.texImage3D(Y, 0, e.RGBA, 1, 1, ue, 0, e.RGBA, e.UNSIGNED_BYTE, ve) : e.texImage2D(Y + le, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, ve);
    return J;
  }
  const pe = {};
  pe[e.TEXTURE_2D] = se(e.TEXTURE_2D, e.TEXTURE_2D, 1), pe[e.TEXTURE_CUBE_MAP] = se(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), pe[e.TEXTURE_2D_ARRAY] = se(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), pe[e.TEXTURE_3D] = se(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), he(e.DEPTH_TEST), a.setFunc(3), Rt(!1), Qe(1), he(e.CULL_FACE), ft(0);
  function he(C) {
    u[C] !== !0 && (e.enable(C), u[C] = !0);
  }
  function be(C) {
    u[C] !== !1 && (e.disable(C), u[C] = !1);
  }
  function we(C, Y) {
    return h[C] !== Y ? (e.bindFramebuffer(C, Y), h[C] = Y, C === e.DRAW_FRAMEBUFFER && (h[e.FRAMEBUFFER] = Y), C === e.FRAMEBUFFER && (h[e.DRAW_FRAMEBUFFER] = Y), !0) : !1;
  }
  function Pe(C, Y) {
    let $ = M, ue = !1;
    if (C) {
      $ = p.get(Y), $ === void 0 && ($ = [], p.set(Y, $));
      const ve = C.textures;
      if ($.length !== ve.length || $[0] !== e.COLOR_ATTACHMENT0) {
        for (let J = 0, le = ve.length; J < le; J++) $[J] = e.COLOR_ATTACHMENT0 + J;
        $.length = ve.length, ue = !0;
      }
    } else $[0] !== e.BACK && ($[0] = e.BACK, ue = !0);
    ue && e.drawBuffers($);
  }
  function We(C) {
    return E !== C ? (e.useProgram(C), E = C, !0) : !1;
  }
  const Be = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  Be[103] = e.MIN, Be[104] = e.MAX;
  const Je = {
    200: e.ZERO,
    201: e.ONE,
    202: e.SRC_COLOR,
    204: e.SRC_ALPHA,
    210: e.SRC_ALPHA_SATURATE,
    208: e.DST_COLOR,
    206: e.DST_ALPHA,
    203: e.ONE_MINUS_SRC_COLOR,
    205: e.ONE_MINUS_SRC_ALPHA,
    209: e.ONE_MINUS_DST_COLOR,
    207: e.ONE_MINUS_DST_ALPHA,
    211: e.CONSTANT_COLOR,
    212: e.ONE_MINUS_CONSTANT_COLOR,
    213: e.CONSTANT_ALPHA,
    214: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function ft(C, Y, $, ue, ve, J, le, Ae, _t, Ze) {
    if (C === 0) {
      g === !0 && (be(e.BLEND), g = !1);
      return;
    }
    if (g === !1 && (he(e.BLEND), g = !0), C !== 5) {
      if (C !== d || Ze !== W) {
        if ((P !== 100 || T !== 100) && (e.blendEquation(e.FUNC_ADD), P = 100, T = 100), Ze) switch (C) {
          case 1:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case 3:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case 4:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            Ce("WebGLState: Invalid blending: ", C);
            break;
        }
        else switch (C) {
          case 1:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case 3:
            Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case 4:
            Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            Ce("WebGLState: Invalid blending: ", C);
            break;
        }
        w = null, x = null, b = null, I = null, v.set(0, 0, 0), y = 0, d = C, W = Ze;
      }
      return;
    }
    ve = ve || Y, J = J || $, le = le || ue, (Y !== P || ve !== T) && (e.blendEquationSeparate(Be[Y], Be[ve]), P = Y, T = ve), ($ !== w || ue !== x || J !== b || le !== I) && (e.blendFuncSeparate(Je[$], Je[ue], Je[J], Je[le]), w = $, x = ue, b = J, I = le), (Ae.equals(v) === !1 || _t !== y) && (e.blendColor(Ae.r, Ae.g, Ae.b, _t), v.copy(Ae), y = _t), d = C, W = !1;
  }
  function yt(C, Y) {
    C.side === 2 ? be(e.CULL_FACE) : he(e.CULL_FACE);
    let $ = C.side === 1;
    Y && ($ = !$), Rt($), C.blending === 1 && C.transparent === !1 ? ft(0) : ft(C.blending, C.blendEquation, C.blendSrc, C.blendDst, C.blendEquationAlpha, C.blendSrcAlpha, C.blendDstAlpha, C.blendColor, C.blendAlpha, C.premultipliedAlpha), a.setFunc(C.depthFunc), a.setTest(C.depthTest), a.setMask(C.depthWrite), s.setMask(C.colorWrite);
    const ue = C.stencilWrite;
    o.setTest(ue), ue && (o.setMask(C.stencilWriteMask), o.setFunc(C.stencilFunc, C.stencilRef, C.stencilFuncMask), o.setOp(C.stencilFail, C.stencilZFail, C.stencilZPass)), ut(C.polygonOffset, C.polygonOffsetFactor, C.polygonOffsetUnits), C.alphaToCoverage === !0 ? he(e.SAMPLE_ALPHA_TO_COVERAGE) : be(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Rt(C) {
    A !== C && (C ? e.frontFace(e.CW) : e.frontFace(e.CCW), A = C);
  }
  function Qe(C) {
    C !== 0 ? (he(e.CULL_FACE), C !== H && (C === 1 ? e.cullFace(e.BACK) : C === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : be(e.CULL_FACE), H = C;
  }
  function pt(C) {
    C !== K && (O && e.lineWidth(C), K = C);
  }
  function ut(C, Y, $) {
    C ? (he(e.POLYGON_OFFSET_FILL), (k !== Y || G !== $) && (k = Y, G = $, a.getReversed() && (Y = -Y), e.polygonOffset(Y, $))) : be(e.POLYGON_OFFSET_FILL);
  }
  function ot(C) {
    C ? he(e.SCISSOR_TEST) : be(e.SCISSOR_TEST);
  }
  function L(C) {
    C === void 0 && (C = e.TEXTURE0 + q - 1), ne !== C && (e.activeTexture(C), ne = C);
  }
  function Ct(C, Y, $) {
    $ === void 0 && (ne === null ? $ = e.TEXTURE0 + q - 1 : $ = ne);
    let ue = de[$];
    ue === void 0 && (ue = {
      type: void 0,
      texture: void 0
    }, de[$] = ue), (ue.type !== C || ue.texture !== Y) && (ne !== $ && (e.activeTexture($), ne = $), e.bindTexture(C, Y || pe[C]), ue.type = C, ue.texture = Y);
  }
  function Xe() {
    const C = de[ne];
    C !== void 0 && C.type !== void 0 && (e.bindTexture(C.type, null), C.type = void 0, C.texture = void 0);
  }
  function je() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function S() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function m() {
    try {
      e.texSubImage2D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function R() {
    try {
      e.texSubImage3D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function V() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function Z() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function ie() {
    try {
      e.texStorage2D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function ae() {
    try {
      e.texStorage3D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function D() {
    try {
      e.texImage2D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function te() {
    try {
      e.texImage3D(...arguments);
    } catch (C) {
      Ce("WebGLState:", C);
    }
  }
  function fe(C) {
    return f[C] !== void 0 ? f[C] : e.getParameter(C);
  }
  function _e(C, Y) {
    f[C] !== Y && (e.pixelStorei(C, Y), f[C] = Y);
  }
  function Q(C) {
    Ke.equals(C) === !1 && (e.scissor(C.x, C.y, C.z, C.w), Ke.copy(C));
  }
  function Se(C) {
    X.equals(C) === !1 && (e.viewport(C.x, C.y, C.z, C.w), X.copy(C));
  }
  function Ee(C, Y) {
    let $ = l.get(Y);
    $ === void 0 && ($ = /* @__PURE__ */ new WeakMap(), l.set(Y, $));
    let ue = $.get(C);
    ue === void 0 && (ue = e.getUniformBlockIndex(Y, C.name), $.set(C, ue));
  }
  function Le(C, Y) {
    const $ = l.get(Y).get(C);
    c.get(Y) !== $ && (e.uniformBlockBinding(Y, $, C.__bindingPointIndex), c.set(Y, $));
  }
  function Ve() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), a.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, f = {}, ne = null, de = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), M = [], E = null, g = !1, d = null, P = null, w = null, x = null, T = null, b = null, I = null, v = new He(0, 0, 0), y = 0, W = !1, A = null, H = null, K = null, k = null, G = null, Ke.set(0, 0, e.canvas.width, e.canvas.height), X.set(0, 0, e.canvas.width, e.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: he,
    disable: be,
    bindFramebuffer: we,
    drawBuffers: Pe,
    useProgram: We,
    setBlending: ft,
    setMaterial: yt,
    setFlipSided: Rt,
    setCullFace: Qe,
    setLineWidth: pt,
    setPolygonOffset: ut,
    setScissorTest: ot,
    activeTexture: L,
    bindTexture: Ct,
    unbindTexture: Xe,
    compressedTexImage2D: je,
    compressedTexImage3D: S,
    texImage2D: D,
    texImage3D: te,
    pixelStorei: _e,
    getParameter: fe,
    updateUBOMapping: Ee,
    uniformBlockBinding: Le,
    texStorage2D: ie,
    texStorage3D: ae,
    texSubImage2D: m,
    texSubImage3D: R,
    compressedTexSubImage2D: V,
    compressedTexSubImage3D: Z,
    scissor: Q,
    viewport: Se,
    reset: Ve
  };
}
function Au(e, t, i, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new Ie(), u = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new Set();
  let h;
  const p = /* @__PURE__ */ new WeakMap();
  let M = !1;
  try {
    M = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function E(S, m) {
    return M ? new OffscreenCanvas(S, m) : er("canvas");
  }
  function g(S, m, R) {
    let V = 1;
    const Z = je(S);
    if ((Z.width > R || Z.height > R) && (V = R / Math.max(Z.width, Z.height)), V < 1) if (typeof HTMLImageElement < "u" && S instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && S instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && S instanceof ImageBitmap || typeof VideoFrame < "u" && S instanceof VideoFrame) {
      const ie = Math.floor(V * Z.width), ae = Math.floor(V * Z.height);
      h === void 0 && (h = E(ie, ae));
      const D = m ? E(ie, ae) : h;
      return D.width = ie, D.height = ae, D.getContext("2d").drawImage(S, 0, 0, ie, ae), Te("WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + ie + "x" + ae + ")."), D;
    } else
      return "data" in S && Te("WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), S;
    return S;
  }
  function d(S) {
    return S.generateMipmaps;
  }
  function P(S) {
    e.generateMipmap(S);
  }
  function w(S) {
    return S.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : S.isWebGL3DRenderTarget ? e.TEXTURE_3D : S.isWebGLArrayRenderTarget || S.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function x(S, m, R, V, Z, ie = !1) {
    if (S !== null) {
      if (e[S] !== void 0) return e[S];
      Te("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + S + "'");
    }
    let ae;
    V && (ae = t.get("EXT_texture_norm16"), ae || Te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let D = m;
    if (m === e.RED && (R === e.FLOAT && (D = e.R32F), R === e.HALF_FLOAT && (D = e.R16F), R === e.UNSIGNED_BYTE && (D = e.R8), R === e.UNSIGNED_SHORT && ae && (D = ae.R16_EXT), R === e.SHORT && ae && (D = ae.R16_SNORM_EXT)), m === e.RED_INTEGER && (R === e.UNSIGNED_BYTE && (D = e.R8UI), R === e.UNSIGNED_SHORT && (D = e.R16UI), R === e.UNSIGNED_INT && (D = e.R32UI), R === e.BYTE && (D = e.R8I), R === e.SHORT && (D = e.R16I), R === e.INT && (D = e.R32I)), m === e.RG && (R === e.FLOAT && (D = e.RG32F), R === e.HALF_FLOAT && (D = e.RG16F), R === e.UNSIGNED_BYTE && (D = e.RG8), R === e.UNSIGNED_SHORT && ae && (D = ae.RG16_EXT), R === e.SHORT && ae && (D = ae.RG16_SNORM_EXT)), m === e.RG_INTEGER && (R === e.UNSIGNED_BYTE && (D = e.RG8UI), R === e.UNSIGNED_SHORT && (D = e.RG16UI), R === e.UNSIGNED_INT && (D = e.RG32UI), R === e.BYTE && (D = e.RG8I), R === e.SHORT && (D = e.RG16I), R === e.INT && (D = e.RG32I)), m === e.RGB_INTEGER && (R === e.UNSIGNED_BYTE && (D = e.RGB8UI), R === e.UNSIGNED_SHORT && (D = e.RGB16UI), R === e.UNSIGNED_INT && (D = e.RGB32UI), R === e.BYTE && (D = e.RGB8I), R === e.SHORT && (D = e.RGB16I), R === e.INT && (D = e.RGB32I)), m === e.RGBA_INTEGER && (R === e.UNSIGNED_BYTE && (D = e.RGBA8UI), R === e.UNSIGNED_SHORT && (D = e.RGBA16UI), R === e.UNSIGNED_INT && (D = e.RGBA32UI), R === e.BYTE && (D = e.RGBA8I), R === e.SHORT && (D = e.RGBA16I), R === e.INT && (D = e.RGBA32I)), m === e.RGB && (R === e.UNSIGNED_SHORT && ae && (D = ae.RGB16_EXT), R === e.SHORT && ae && (D = ae.RGB16_SNORM_EXT), R === e.UNSIGNED_INT_5_9_9_9_REV && (D = e.RGB9_E5), R === e.UNSIGNED_INT_10F_11F_11F_REV && (D = e.R11F_G11F_B10F)), m === e.RGBA) {
      const te = ie ? Qn : ze.getTransfer(Z);
      R === e.FLOAT && (D = e.RGBA32F), R === e.HALF_FLOAT && (D = e.RGBA16F), R === e.UNSIGNED_BYTE && (D = te === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), R === e.UNSIGNED_SHORT && ae && (D = ae.RGBA16_EXT), R === e.SHORT && ae && (D = ae.RGBA16_SNORM_EXT), R === e.UNSIGNED_SHORT_4_4_4_4 && (D = e.RGBA4), R === e.UNSIGNED_SHORT_5_5_5_1 && (D = e.RGB5_A1);
    }
    return (D === e.R16F || D === e.R32F || D === e.RG16F || D === e.RG32F || D === e.RGBA16F || D === e.RGBA32F) && t.get("EXT_color_buffer_float"), D;
  }
  function T(S, m) {
    let R;
    return S ? m === null || m === 1014 || m === 1020 ? R = e.DEPTH24_STENCIL8 : m === 1015 ? R = e.DEPTH32F_STENCIL8 : m === 1012 && (R = e.DEPTH24_STENCIL8, Te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : m === null || m === 1014 || m === 1020 ? R = e.DEPTH_COMPONENT24 : m === 1015 ? R = e.DEPTH_COMPONENT32F : m === 1012 && (R = e.DEPTH_COMPONENT16), R;
  }
  function b(S, m) {
    return d(S) === !0 || S.isFramebufferTexture && S.minFilter !== 1003 && S.minFilter !== 1006 ? Math.log2(Math.max(m.width, m.height)) + 1 : S.mipmaps !== void 0 && S.mipmaps.length > 0 ? S.mipmaps.length : S.isCompressedTexture && Array.isArray(S.image) ? m.mipmaps.length : 1;
  }
  function I(S) {
    const m = S.target;
    m.removeEventListener("dispose", I), y(m), m.isVideoTexture && u.delete(m), m.isHTMLTexture && f.delete(m);
  }
  function v(S) {
    const m = S.target;
    m.removeEventListener("dispose", v), A(m);
  }
  function y(S) {
    const m = n.get(S);
    if (m.__webglInit === void 0) return;
    const R = S.source, V = p.get(R);
    if (V) {
      const Z = V[m.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && W(S), Object.keys(V).length === 0 && p.delete(R);
    }
    n.remove(S);
  }
  function W(S) {
    const m = n.get(S);
    e.deleteTexture(m.__webglTexture);
    const R = S.source, V = p.get(R);
    delete V[m.__cacheKey], a.memory.textures--;
  }
  function A(S) {
    const m = n.get(S);
    if (S.depthTexture && (S.depthTexture.dispose(), n.remove(S.depthTexture)), S.isWebGLCubeRenderTarget) for (let V = 0; V < 6; V++) {
      if (Array.isArray(m.__webglFramebuffer[V])) for (let Z = 0; Z < m.__webglFramebuffer[V].length; Z++) e.deleteFramebuffer(m.__webglFramebuffer[V][Z]);
      else e.deleteFramebuffer(m.__webglFramebuffer[V]);
      m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer[V]);
    }
    else {
      if (Array.isArray(m.__webglFramebuffer)) for (let V = 0; V < m.__webglFramebuffer.length; V++) e.deleteFramebuffer(m.__webglFramebuffer[V]);
      else e.deleteFramebuffer(m.__webglFramebuffer);
      if (m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer), m.__webglMultisampledFramebuffer && e.deleteFramebuffer(m.__webglMultisampledFramebuffer), m.__webglColorRenderbuffer)
        for (let V = 0; V < m.__webglColorRenderbuffer.length; V++) m.__webglColorRenderbuffer[V] && e.deleteRenderbuffer(m.__webglColorRenderbuffer[V]);
      m.__webglDepthRenderbuffer && e.deleteRenderbuffer(m.__webglDepthRenderbuffer);
    }
    const R = S.textures;
    for (let V = 0, Z = R.length; V < Z; V++) {
      const ie = n.get(R[V]);
      ie.__webglTexture && (e.deleteTexture(ie.__webglTexture), a.memory.textures--), n.remove(R[V]);
    }
    n.remove(S);
  }
  let H = 0;
  function K() {
    H = 0;
  }
  function k() {
    return H;
  }
  function G(S) {
    H = S;
  }
  function q() {
    const S = H;
    return S >= r.maxTextures && Te("WebGLTextures: Trying to use " + S + " texture units while this GPU supports only " + r.maxTextures), H += 1, S;
  }
  function O(S) {
    const m = [];
    return m.push(S.wrapS), m.push(S.wrapT), m.push(S.wrapR || 0), m.push(S.magFilter), m.push(S.minFilter), m.push(S.anisotropy), m.push(S.internalFormat), m.push(S.format), m.push(S.type), m.push(S.generateMipmaps), m.push(S.premultiplyAlpha), m.push(S.flipY), m.push(S.unpackAlignment), m.push(S.colorSpace), m.join();
  }
  function j(S, m) {
    const R = n.get(S);
    if (S.isVideoTexture && Ct(S), S.isRenderTargetTexture === !1 && S.isExternalTexture !== !0 && S.version > 0 && R.__version !== S.version) {
      const V = S.image;
      if (V === null) Te("WebGLRenderer: Texture marked for update but no image data found.");
      else if (V.complete === !1) Te("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        be(R, S, m);
        return;
      }
    } else S.isExternalTexture && (R.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D, R.__webglTexture, e.TEXTURE0 + m);
  }
  function ee(S, m) {
    const R = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && R.__version !== S.version) {
      be(R, S, m);
      return;
    } else S.isExternalTexture && (R.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D_ARRAY, R.__webglTexture, e.TEXTURE0 + m);
  }
  function ne(S, m) {
    const R = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && R.__version !== S.version) {
      be(R, S, m);
      return;
    }
    i.bindTexture(e.TEXTURE_3D, R.__webglTexture, e.TEXTURE0 + m);
  }
  function de(S, m) {
    const R = n.get(S);
    if (S.isCubeDepthTexture !== !0 && S.version > 0 && R.__version !== S.version) {
      we(R, S, m);
      return;
    }
    i.bindTexture(e.TEXTURE_CUBE_MAP, R.__webglTexture, e.TEXTURE0 + m);
  }
  const xe = {
    [zr]: e.REPEAT,
    [ei]: e.CLAMP_TO_EDGE,
    [Vr]: e.MIRRORED_REPEAT
  }, et = {
    [xt]: e.NEAREST,
    [no]: e.NEAREST_MIPMAP_NEAREST,
    [ro]: e.NEAREST_MIPMAP_LINEAR,
    [Et]: e.LINEAR,
    [so]: e.LINEAR_MIPMAP_NEAREST,
    [qr]: e.LINEAR_MIPMAP_LINEAR
  }, Ke = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function X(S, m) {
    if (m.type === 1015 && t.has("OES_texture_float_linear") === !1 && (m.magFilter === 1006 || m.magFilter === 1007 || m.magFilter === 1005 || m.magFilter === 1008 || m.minFilter === 1006 || m.minFilter === 1007 || m.minFilter === 1005 || m.minFilter === 1008) && Te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(S, e.TEXTURE_WRAP_S, xe[m.wrapS]), e.texParameteri(S, e.TEXTURE_WRAP_T, xe[m.wrapT]), (S === e.TEXTURE_3D || S === e.TEXTURE_2D_ARRAY) && e.texParameteri(S, e.TEXTURE_WRAP_R, xe[m.wrapR]), e.texParameteri(S, e.TEXTURE_MAG_FILTER, et[m.magFilter]), e.texParameteri(S, e.TEXTURE_MIN_FILTER, et[m.minFilter]), m.compareFunction && (e.texParameteri(S, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(S, e.TEXTURE_COMPARE_FUNC, Ke[m.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (m.magFilter === 1003 || m.minFilter !== 1005 && m.minFilter !== 1008 || m.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (m.anisotropy > 1 || n.get(m).__currentAnisotropy) {
        const R = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(S, R.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(m.anisotropy, r.getMaxAnisotropy())), n.get(m).__currentAnisotropy = m.anisotropy;
      }
    }
  }
  function se(S, m) {
    let R = !1;
    S.__webglInit === void 0 && (S.__webglInit = !0, m.addEventListener("dispose", I));
    const V = m.source;
    let Z = p.get(V);
    Z === void 0 && (Z = {}, p.set(V, Z));
    const ie = O(m);
    if (ie !== S.__cacheKey) {
      Z[ie] === void 0 && (Z[ie] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, R = !0), Z[ie].usedTimes++;
      const ae = Z[S.__cacheKey];
      ae !== void 0 && (Z[S.__cacheKey].usedTimes--, ae.usedTimes === 0 && W(m)), S.__cacheKey = ie, S.__webglTexture = Z[ie].texture;
    }
    return R;
  }
  function pe(S, m, R) {
    return Math.floor(Math.floor(S / R) / m);
  }
  function he(S, m, R, V) {
    const ie = S.updateRanges;
    if (ie.length === 0) i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, m.width, m.height, R, V, m.data);
    else {
      ie.sort((_e, Q) => _e.start - Q.start);
      let ae = 0;
      for (let _e = 1; _e < ie.length; _e++) {
        const Q = ie[ae], Se = ie[_e], Ee = Q.start + Q.count, Le = pe(Se.start, m.width, 4), Ve = pe(Q.start, m.width, 4);
        Se.start <= Ee + 1 && Le === Ve && pe(Se.start + Se.count - 1, m.width, 4) === Le ? Q.count = Math.max(Q.count, Se.start + Se.count - Q.start) : (++ae, ie[ae] = Se);
      }
      ie.length = ae + 1;
      const D = i.getParameter(e.UNPACK_ROW_LENGTH), te = i.getParameter(e.UNPACK_SKIP_PIXELS), fe = i.getParameter(e.UNPACK_SKIP_ROWS);
      i.pixelStorei(e.UNPACK_ROW_LENGTH, m.width);
      for (let _e = 0, Q = ie.length; _e < Q; _e++) {
        const Se = ie[_e], Ee = Math.floor(Se.start / 4), Le = Math.ceil(Se.count / 4), Ve = Ee % m.width, C = Math.floor(Ee / m.width), Y = Le, $ = 1;
        i.pixelStorei(e.UNPACK_SKIP_PIXELS, Ve), i.pixelStorei(e.UNPACK_SKIP_ROWS, C), i.texSubImage2D(e.TEXTURE_2D, 0, Ve, C, Y, $, R, V, m.data);
      }
      S.clearUpdateRanges(), i.pixelStorei(e.UNPACK_ROW_LENGTH, D), i.pixelStorei(e.UNPACK_SKIP_PIXELS, te), i.pixelStorei(e.UNPACK_SKIP_ROWS, fe);
    }
  }
  function be(S, m, R) {
    let V = e.TEXTURE_2D;
    (m.isDataArrayTexture || m.isCompressedArrayTexture) && (V = e.TEXTURE_2D_ARRAY), m.isData3DTexture && (V = e.TEXTURE_3D);
    const Z = se(S, m), ie = m.source;
    i.bindTexture(V, S.__webglTexture, e.TEXTURE0 + R);
    const ae = n.get(ie);
    if (ie.version !== ae.__version || Z === !0) {
      if (i.activeTexture(e.TEXTURE0 + R), !(typeof ImageBitmap < "u" && m.image instanceof ImageBitmap)) {
        const Y = ze.getPrimaries(ze.workingColorSpace), $ = m.colorSpace === "" ? null : ze.getPrimaries(m.colorSpace), ue = m.colorSpace === "" || Y === $ ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, ue);
      }
      i.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment);
      let D = g(m.image, !1, r.maxTextureSize);
      D = Xe(m, D);
      const te = s.convert(m.format, m.colorSpace), fe = s.convert(m.type);
      let _e = x(m.internalFormat, te, fe, m.normalized, m.colorSpace, m.isVideoTexture);
      X(V, m);
      let Q;
      const Se = m.mipmaps, Ee = m.isVideoTexture !== !0, Le = ae.__version === void 0 || Z === !0, Ve = ie.dataReady, C = b(m, D);
      if (m.isDepthTexture)
        _e = T(m.format === Sa, m.type), Le && (Ee ? i.texStorage2D(e.TEXTURE_2D, 1, _e, D.width, D.height) : i.texImage2D(e.TEXTURE_2D, 0, _e, D.width, D.height, 0, te, fe, null));
      else if (m.isDataTexture) if (Se.length > 0) {
        Ee && Le && i.texStorage2D(e.TEXTURE_2D, C, _e, Se[0].width, Se[0].height);
        for (let Y = 0, $ = Se.length; Y < $; Y++)
          Q = Se[Y], Ee ? Ve && i.texSubImage2D(e.TEXTURE_2D, Y, 0, 0, Q.width, Q.height, te, fe, Q.data) : i.texImage2D(e.TEXTURE_2D, Y, _e, Q.width, Q.height, 0, te, fe, Q.data);
        m.generateMipmaps = !1;
      } else Ee ? (Le && i.texStorage2D(e.TEXTURE_2D, C, _e, D.width, D.height), Ve && he(m, D, te, fe)) : i.texImage2D(e.TEXTURE_2D, 0, _e, D.width, D.height, 0, te, fe, D.data);
      else if (m.isCompressedTexture) if (m.isCompressedArrayTexture) {
        Ee && Le && i.texStorage3D(e.TEXTURE_2D_ARRAY, C, _e, Se[0].width, Se[0].height, D.depth);
        for (let Y = 0, $ = Se.length; Y < $; Y++)
          if (Q = Se[Y], m.format !== 1023) if (te !== null) if (Ee) {
            if (Ve) if (m.layerUpdates.size > 0) {
              const ue = Is(Q.width, Q.height, m.format, m.type);
              for (const ve of m.layerUpdates) {
                const J = Q.data.subarray(ve * ue / Q.data.BYTES_PER_ELEMENT, (ve + 1) * ue / Q.data.BYTES_PER_ELEMENT);
                i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, Y, 0, 0, ve, Q.width, Q.height, 1, te, J);
              }
              m.clearLayerUpdates();
            } else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, Y, 0, 0, 0, Q.width, Q.height, D.depth, te, Q.data);
          } else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY, Y, _e, Q.width, Q.height, D.depth, 0, Q.data, 0, 0);
          else Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else Ee ? Ve && i.texSubImage3D(e.TEXTURE_2D_ARRAY, Y, 0, 0, 0, Q.width, Q.height, D.depth, te, fe, Q.data) : i.texImage3D(e.TEXTURE_2D_ARRAY, Y, _e, Q.width, Q.height, D.depth, 0, te, fe, Q.data);
      } else {
        Ee && Le && i.texStorage2D(e.TEXTURE_2D, C, _e, Se[0].width, Se[0].height);
        for (let Y = 0, $ = Se.length; Y < $; Y++)
          Q = Se[Y], m.format !== 1023 ? te !== null ? Ee ? Ve && i.compressedTexSubImage2D(e.TEXTURE_2D, Y, 0, 0, Q.width, Q.height, te, Q.data) : i.compressedTexImage2D(e.TEXTURE_2D, Y, _e, Q.width, Q.height, 0, Q.data) : Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ee ? Ve && i.texSubImage2D(e.TEXTURE_2D, Y, 0, 0, Q.width, Q.height, te, fe, Q.data) : i.texImage2D(e.TEXTURE_2D, Y, _e, Q.width, Q.height, 0, te, fe, Q.data);
      }
      else if (m.isDataArrayTexture) if (Ee) {
        if (Le && i.texStorage3D(e.TEXTURE_2D_ARRAY, C, _e, D.width, D.height, D.depth), Ve) if (m.layerUpdates.size > 0) {
          const Y = Is(D.width, D.height, m.format, m.type);
          for (const $ of m.layerUpdates) {
            const ue = D.data.subarray($ * Y / D.data.BYTES_PER_ELEMENT, ($ + 1) * Y / D.data.BYTES_PER_ELEMENT);
            i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, $, D.width, D.height, 1, te, fe, ue);
          }
          m.clearLayerUpdates();
        } else i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, D.width, D.height, D.depth, te, fe, D.data);
      } else i.texImage3D(e.TEXTURE_2D_ARRAY, 0, _e, D.width, D.height, D.depth, 0, te, fe, D.data);
      else if (m.isData3DTexture) Ee ? (Le && i.texStorage3D(e.TEXTURE_3D, C, _e, D.width, D.height, D.depth), Ve && i.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, D.width, D.height, D.depth, te, fe, D.data)) : i.texImage3D(e.TEXTURE_3D, 0, _e, D.width, D.height, D.depth, 0, te, fe, D.data);
      else if (m.isFramebufferTexture) {
        if (Le) if (Ee) i.texStorage2D(e.TEXTURE_2D, C, _e, D.width, D.height);
        else {
          let Y = D.width, $ = D.height;
          for (let ue = 0; ue < C; ue++)
            i.texImage2D(e.TEXTURE_2D, ue, _e, Y, $, 0, te, fe, null), Y >>= 1, $ >>= 1;
        }
      } else if (m.isHTMLTexture) {
        if ("texElementImage2D" in e) {
          const Y = e.canvas;
          if (Y.hasAttribute("layoutsubtree") || Y.setAttribute("layoutsubtree", "true"), D.parentNode !== Y) {
            Y.appendChild(D), f.add(m), Y.onpaint = ($) => {
              const ue = $.changedElements;
              for (const ve of f) ue.includes(ve.image) && (ve.needsUpdate = !0);
            }, Y.requestPaint();
            return;
          }
          if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, D);
          else {
            const ue = e.RGBA, ve = e.RGBA, J = e.UNSIGNED_BYTE;
            e.texElementImage2D(e.TEXTURE_2D, 0, ue, ve, J, D);
          }
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (Se.length > 0) {
        if (Ee && Le) {
          const Y = je(Se[0]);
          i.texStorage2D(e.TEXTURE_2D, C, _e, Y.width, Y.height);
        }
        for (let Y = 0, $ = Se.length; Y < $; Y++)
          Q = Se[Y], Ee ? Ve && i.texSubImage2D(e.TEXTURE_2D, Y, 0, 0, te, fe, Q) : i.texImage2D(e.TEXTURE_2D, Y, _e, te, fe, Q);
        m.generateMipmaps = !1;
      } else if (Ee) {
        if (Le) {
          const Y = je(D);
          i.texStorage2D(e.TEXTURE_2D, C, _e, Y.width, Y.height);
        }
        Ve && i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, te, fe, D);
      } else i.texImage2D(e.TEXTURE_2D, 0, _e, te, fe, D);
      d(m) && P(V), ae.__version = ie.version, m.onUpdate && m.onUpdate(m);
    }
    S.__version = m.version;
  }
  function we(S, m, R) {
    if (m.image.length !== 6) return;
    const V = se(S, m), Z = m.source;
    i.bindTexture(e.TEXTURE_CUBE_MAP, S.__webglTexture, e.TEXTURE0 + R);
    const ie = n.get(Z);
    if (Z.version !== ie.__version || V === !0) {
      i.activeTexture(e.TEXTURE0 + R);
      const ae = ze.getPrimaries(ze.workingColorSpace), D = m.colorSpace === "" ? null : ze.getPrimaries(m.colorSpace), te = m.colorSpace === "" || ae === D ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), i.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, te);
      const fe = m.isCompressedTexture || m.image[0].isCompressedTexture, _e = m.image[0] && m.image[0].isDataTexture, Q = [];
      for (let J = 0; J < 6; J++)
        !fe && !_e ? Q[J] = g(m.image[J], !0, r.maxCubemapSize) : Q[J] = _e ? m.image[J].image : m.image[J], Q[J] = Xe(m, Q[J]);
      const Se = Q[0], Ee = s.convert(m.format, m.colorSpace), Le = s.convert(m.type), Ve = x(m.internalFormat, Ee, Le, m.normalized, m.colorSpace), C = m.isVideoTexture !== !0, Y = ie.__version === void 0 || V === !0, $ = Z.dataReady;
      let ue = b(m, Se);
      X(e.TEXTURE_CUBE_MAP, m);
      let ve;
      if (fe) {
        C && Y && i.texStorage2D(e.TEXTURE_CUBE_MAP, ue, Ve, Se.width, Se.height);
        for (let J = 0; J < 6; J++) {
          ve = Q[J].mipmaps;
          for (let le = 0; le < ve.length; le++) {
            const Ae = ve[le];
            m.format !== 1023 ? Ee !== null ? C ? $ && i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le, 0, 0, Ae.width, Ae.height, Ee, Ae.data) : i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le, Ve, Ae.width, Ae.height, 0, Ae.data) : Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : C ? $ && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le, 0, 0, Ae.width, Ae.height, Ee, Le, Ae.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le, Ve, Ae.width, Ae.height, 0, Ee, Le, Ae.data);
          }
        }
      } else {
        if (ve = m.mipmaps, C && Y) {
          ve.length > 0 && ue++;
          const J = je(Q[0]);
          i.texStorage2D(e.TEXTURE_CUBE_MAP, ue, Ve, J.width, J.height);
        }
        for (let J = 0; J < 6; J++) if (_e) {
          C ? $ && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, Q[J].width, Q[J].height, Ee, Le, Q[J].data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, Ve, Q[J].width, Q[J].height, 0, Ee, Le, Q[J].data);
          for (let le = 0; le < ve.length; le++) {
            const Ae = ve[le].image[J].image;
            C ? $ && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le + 1, 0, 0, Ae.width, Ae.height, Ee, Le, Ae.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le + 1, Ve, Ae.width, Ae.height, 0, Ee, Le, Ae.data);
          }
        } else {
          C ? $ && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, Ee, Le, Q[J]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, Ve, Ee, Le, Q[J]);
          for (let le = 0; le < ve.length; le++) {
            const Ae = ve[le];
            C ? $ && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le + 1, 0, 0, Ee, Le, Ae.image[J]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + J, le + 1, Ve, Ee, Le, Ae.image[J]);
          }
        }
      }
      d(m) && P(e.TEXTURE_CUBE_MAP), ie.__version = Z.version, m.onUpdate && m.onUpdate(m);
    }
    S.__version = m.version;
  }
  function Pe(S, m, R, V, Z, ie) {
    const ae = s.convert(R.format, R.colorSpace), D = s.convert(R.type), te = x(R.internalFormat, ae, D, R.normalized, R.colorSpace), fe = n.get(m), _e = n.get(R);
    if (_e.__renderTarget = m, !fe.__hasExternalTextures) {
      const Q = Math.max(1, m.width >> ie), Se = Math.max(1, m.height >> ie);
      Z === e.TEXTURE_3D || Z === e.TEXTURE_2D_ARRAY ? i.texImage3D(Z, ie, te, Q, Se, m.depth, 0, ae, D, null) : i.texImage2D(Z, ie, te, Q, Se, 0, ae, D, null);
    }
    i.bindFramebuffer(e.FRAMEBUFFER, S), L(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, V, Z, _e.__webglTexture, 0, ot(m)) : (Z === e.TEXTURE_2D || Z >= e.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, V, Z, _e.__webglTexture, ie), i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function We(S, m, R) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, S), m.depthBuffer) {
      const V = m.depthTexture, Z = V && V.isDepthTexture ? V.type : null, ie = T(m.stencilBuffer, Z), ae = m.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      L(m) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ot(m), ie, m.width, m.height) : R ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ot(m), ie, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, ie, m.width, m.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, ae, e.RENDERBUFFER, S);
    } else {
      const V = m.textures;
      for (let Z = 0; Z < V.length; Z++) {
        const ie = V[Z], ae = s.convert(ie.format, ie.colorSpace), D = s.convert(ie.type), te = x(ie.internalFormat, ae, D, ie.normalized, ie.colorSpace);
        L(m) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ot(m), te, m.width, m.height) : R ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ot(m), te, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, te, m.width, m.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function Be(S, m, R) {
    const V = m.isWebGLCubeRenderTarget === !0;
    if (i.bindFramebuffer(e.FRAMEBUFFER, S), !(m.depthTexture && m.depthTexture.isDepthTexture)) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const Z = n.get(m.depthTexture);
    if (Z.__renderTarget = m, (!Z.__webglTexture || m.depthTexture.image.width !== m.width || m.depthTexture.image.height !== m.height) && (m.depthTexture.image.width = m.width, m.depthTexture.image.height = m.height, m.depthTexture.needsUpdate = !0), V) {
      if (Z.__webglInit === void 0 && (Z.__webglInit = !0, m.depthTexture.addEventListener("dispose", I)), Z.__webglTexture === void 0) {
        Z.__webglTexture = e.createTexture(), i.bindTexture(e.TEXTURE_CUBE_MAP, Z.__webglTexture), X(e.TEXTURE_CUBE_MAP, m.depthTexture);
        const fe = s.convert(m.depthTexture.format), _e = s.convert(m.depthTexture.type);
        let Q;
        m.depthTexture.format === 1026 ? Q = e.DEPTH_COMPONENT24 : m.depthTexture.format === 1027 && (Q = e.DEPTH24_STENCIL8);
        for (let Se = 0; Se < 6; Se++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + Se, 0, Q, m.width, m.height, 0, fe, _e, null);
      }
    } else j(m.depthTexture, 0);
    const ie = Z.__webglTexture, ae = ot(m), D = V ? e.TEXTURE_CUBE_MAP_POSITIVE_X + R : e.TEXTURE_2D, te = m.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (m.depthTexture.format === 1026) L(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, te, D, ie, 0, ae) : e.framebufferTexture2D(e.FRAMEBUFFER, te, D, ie, 0);
    else if (m.depthTexture.format === 1027) L(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, te, D, ie, 0, ae) : e.framebufferTexture2D(e.FRAMEBUFFER, te, D, ie, 0);
    else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function Je(S) {
    const m = n.get(S), R = S.isWebGLCubeRenderTarget === !0;
    if (m.__boundDepthTexture !== S.depthTexture) {
      const V = S.depthTexture;
      if (m.__depthDisposeCallback && m.__depthDisposeCallback(), V) {
        const Z = () => {
          delete m.__boundDepthTexture, delete m.__depthDisposeCallback, V.removeEventListener("dispose", Z);
        };
        V.addEventListener("dispose", Z), m.__depthDisposeCallback = Z;
      }
      m.__boundDepthTexture = V;
    }
    if (S.depthTexture && !m.__autoAllocateDepthBuffer) if (R) for (let V = 0; V < 6; V++) Be(m.__webglFramebuffer[V], S, V);
    else {
      const V = S.texture.mipmaps;
      V && V.length > 0 ? Be(m.__webglFramebuffer[0], S, 0) : Be(m.__webglFramebuffer, S, 0);
    }
    else if (R) {
      m.__webglDepthbuffer = [];
      for (let V = 0; V < 6; V++)
        if (i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[V]), m.__webglDepthbuffer[V] === void 0)
          m.__webglDepthbuffer[V] = e.createRenderbuffer(), We(m.__webglDepthbuffer[V], S, !1);
        else {
          const Z = S.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ie = m.__webglDepthbuffer[V];
          e.bindRenderbuffer(e.RENDERBUFFER, ie), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ie);
        }
    } else {
      const V = S.texture.mipmaps;
      if (V && V.length > 0 ? i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[0]) : i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer), m.__webglDepthbuffer === void 0)
        m.__webglDepthbuffer = e.createRenderbuffer(), We(m.__webglDepthbuffer, S, !1);
      else {
        const Z = S.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ie = m.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, ie), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ie);
      }
    }
    i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function ft(S, m, R) {
    const V = n.get(S);
    m !== void 0 && Pe(V.__webglFramebuffer, S, S.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), R !== void 0 && Je(S);
  }
  function yt(S) {
    const m = S.texture, R = n.get(S), V = n.get(m);
    S.addEventListener("dispose", v);
    const Z = S.textures, ie = S.isWebGLCubeRenderTarget === !0, ae = Z.length > 1;
    if (ae || (V.__webglTexture === void 0 && (V.__webglTexture = e.createTexture()), V.__version = m.version, a.memory.textures++), ie) {
      R.__webglFramebuffer = [];
      for (let D = 0; D < 6; D++) if (m.mipmaps && m.mipmaps.length > 0) {
        R.__webglFramebuffer[D] = [];
        for (let te = 0; te < m.mipmaps.length; te++) R.__webglFramebuffer[D][te] = e.createFramebuffer();
      } else R.__webglFramebuffer[D] = e.createFramebuffer();
    } else {
      if (m.mipmaps && m.mipmaps.length > 0) {
        R.__webglFramebuffer = [];
        for (let D = 0; D < m.mipmaps.length; D++) R.__webglFramebuffer[D] = e.createFramebuffer();
      } else R.__webglFramebuffer = e.createFramebuffer();
      if (ae) for (let D = 0, te = Z.length; D < te; D++) {
        const fe = n.get(Z[D]);
        fe.__webglTexture === void 0 && (fe.__webglTexture = e.createTexture(), a.memory.textures++);
      }
      if (S.samples > 0 && L(S) === !1) {
        R.__webglMultisampledFramebuffer = e.createFramebuffer(), R.__webglColorRenderbuffer = [], i.bindFramebuffer(e.FRAMEBUFFER, R.__webglMultisampledFramebuffer);
        for (let D = 0; D < Z.length; D++) {
          const te = Z[D];
          R.__webglColorRenderbuffer[D] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, R.__webglColorRenderbuffer[D]);
          const fe = s.convert(te.format, te.colorSpace), _e = s.convert(te.type), Q = x(te.internalFormat, fe, _e, te.normalized, te.colorSpace, S.isXRRenderTarget === !0), Se = ot(S);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Se, Q, S.width, S.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + D, e.RENDERBUFFER, R.__webglColorRenderbuffer[D]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), S.depthBuffer && (R.__webglDepthRenderbuffer = e.createRenderbuffer(), We(R.__webglDepthRenderbuffer, S, !0)), i.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (ie) {
      i.bindTexture(e.TEXTURE_CUBE_MAP, V.__webglTexture), X(e.TEXTURE_CUBE_MAP, m);
      for (let D = 0; D < 6; D++) if (m.mipmaps && m.mipmaps.length > 0) for (let te = 0; te < m.mipmaps.length; te++) Pe(R.__webglFramebuffer[D][te], S, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + D, te);
      else Pe(R.__webglFramebuffer[D], S, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + D, 0);
      d(m) && P(e.TEXTURE_CUBE_MAP), i.unbindTexture();
    } else if (ae) {
      for (let D = 0, te = Z.length; D < te; D++) {
        const fe = Z[D], _e = n.get(fe);
        let Q = e.TEXTURE_2D;
        (S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (Q = S.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture(Q, _e.__webglTexture), X(Q, fe), Pe(R.__webglFramebuffer, S, fe, e.COLOR_ATTACHMENT0 + D, Q, 0), d(fe) && P(Q);
      }
      i.unbindTexture();
    } else {
      let D = e.TEXTURE_2D;
      if ((S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (D = S.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture(D, V.__webglTexture), X(D, m), m.mipmaps && m.mipmaps.length > 0) for (let te = 0; te < m.mipmaps.length; te++) Pe(R.__webglFramebuffer[te], S, m, e.COLOR_ATTACHMENT0, D, te);
      else Pe(R.__webglFramebuffer, S, m, e.COLOR_ATTACHMENT0, D, 0);
      d(m) && P(D), i.unbindTexture();
    }
    S.depthBuffer && Je(S);
  }
  function Rt(S) {
    const m = S.textures;
    for (let R = 0, V = m.length; R < V; R++) {
      const Z = m[R];
      if (d(Z)) {
        const ie = w(S), ae = n.get(Z).__webglTexture;
        i.bindTexture(ie, ae), P(ie), i.unbindTexture();
      }
    }
  }
  const Qe = [], pt = [];
  function ut(S) {
    if (S.samples > 0) {
      if (L(S) === !1) {
        const m = S.textures, R = S.width, V = S.height;
        let Z = e.COLOR_BUFFER_BIT;
        const ie = S.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ae = n.get(S), D = m.length > 1;
        if (D) for (let fe = 0; fe < m.length; fe++)
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + fe, e.RENDERBUFFER, null), i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + fe, e.TEXTURE_2D, null, 0);
        i.bindFramebuffer(e.READ_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
        const te = S.texture.mipmaps;
        te && te.length > 0 ? i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglFramebuffer[0]) : i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglFramebuffer);
        for (let fe = 0; fe < m.length; fe++) {
          if (S.resolveDepthBuffer && (S.depthBuffer && (Z |= e.DEPTH_BUFFER_BIT), S.stencilBuffer && S.resolveStencilBuffer && (Z |= e.STENCIL_BUFFER_BIT)), D) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, ae.__webglColorRenderbuffer[fe]);
            const _e = n.get(m[fe]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, _e, 0);
          }
          e.blitFramebuffer(0, 0, R, V, 0, 0, R, V, Z, e.NEAREST), c === !0 && (Qe.length = 0, pt.length = 0, Qe.push(e.COLOR_ATTACHMENT0 + fe), S.depthBuffer && S.resolveDepthBuffer === !1 && (Qe.push(ie), pt.push(ie), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, pt)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, Qe));
        }
        if (i.bindFramebuffer(e.READ_FRAMEBUFFER, null), i.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), D) for (let fe = 0; fe < m.length; fe++) {
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + fe, e.RENDERBUFFER, ae.__webglColorRenderbuffer[fe]);
          const _e = n.get(m[fe]).__webglTexture;
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + fe, e.TEXTURE_2D, _e, 0);
        }
        i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
      } else if (S.depthBuffer && S.resolveDepthBuffer === !1 && c) {
        const m = S.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [m]);
      }
    }
  }
  function ot(S) {
    return Math.min(r.maxSamples, S.samples);
  }
  function L(S) {
    const m = n.get(S);
    return S.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && m.__useRenderToTexture !== !1;
  }
  function Ct(S) {
    const m = a.render.frame;
    u.get(S) !== m && (u.set(S, m), S.update());
  }
  function Xe(S, m) {
    const R = S.colorSpace, V = S.format, Z = S.type;
    return S.isCompressedTexture === !0 || S.isVideoTexture === !0 || R !== "srgb-linear" && R !== "" && (ze.getTransfer(R) === "srgb" ? (V !== 1023 || Z !== 1009) && Te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Ce("WebGLTextures: Unsupported texture color space:", R)), m;
  }
  function je(S) {
    return typeof HTMLImageElement < "u" && S instanceof HTMLImageElement ? (l.width = S.naturalWidth || S.width, l.height = S.naturalHeight || S.height) : typeof VideoFrame < "u" && S instanceof VideoFrame ? (l.width = S.displayWidth, l.height = S.displayHeight) : (l.width = S.width, l.height = S.height), l;
  }
  this.allocateTextureUnit = q, this.resetTextureUnits = K, this.getTextureUnits = k, this.setTextureUnits = G, this.setTexture2D = j, this.setTexture2DArray = ee, this.setTexture3D = ne, this.setTextureCube = de, this.rebindTextures = ft, this.setupRenderTarget = yt, this.updateRenderTargetMipmap = Rt, this.updateMultisampleRenderTarget = ut, this.setupDepthRenderbuffer = Je, this.setupFrameBufferTexture = Pe, this.useMultisampledRTT = L, this.isReversedDepthBuffer = function() {
    return i.buffers.depth.getReversed();
  };
}
function wu(e, t) {
  function i(n, r = "") {
    let s;
    const a = ze.getTransfer(r);
    if (n === 1009) return e.UNSIGNED_BYTE;
    if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === 1010) return e.BYTE;
    if (n === 1011) return e.SHORT;
    if (n === 1012) return e.UNSIGNED_SHORT;
    if (n === 1013) return e.INT;
    if (n === 1014) return e.UNSIGNED_INT;
    if (n === 1015) return e.FLOAT;
    if (n === 1016) return e.HALF_FLOAT;
    if (n === 1021) return e.ALPHA;
    if (n === 1022) return e.RGB;
    if (n === 1023) return e.RGBA;
    if (n === 1026) return e.DEPTH_COMPONENT;
    if (n === 1027) return e.DEPTH_STENCIL;
    if (n === 1028) return e.RED;
    if (n === 1029) return e.RED_INTEGER;
    if (n === 1030) return e.RG;
    if (n === 1031) return e.RG_INTEGER;
    if (n === 1033) return e.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779) if (a === "srgb")
      if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
        if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
      if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === "srgb" ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return s.COMPRESSED_R11_EAC;
        if (n === 37489) return s.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return s.COMPRESSED_RG11_EAC;
        if (n === 37491) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === "srgb" ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] !== void 0 ? e[n] : null;
  }
  return { convert: i };
}
var Ru = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Cu = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Pu = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const i = new Fa(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, i = new Dt({
        vertexShader: Ru,
        fragmentShader: Cu,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new zt(new tr(20, 20), i);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, Lu = class extends bi {
  constructor(e, t) {
    super();
    const i = this;
    let n = null, r = 1, s = null, a = "local-floor", o = 1, c = null, l = null, u = null, f = null, h = null, p = null;
    const M = typeof XRWebGLBinding < "u", E = new Pu(), g = {}, d = t.getContextAttributes();
    let P = null, w = null;
    const x = [], T = [], b = new Ie();
    let I = null;
    const v = new Bt();
    v.viewport = new st();
    const y = new Bt();
    y.viewport = new st();
    const W = [v, y], A = new uc();
    let H = null, K = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(X) {
      let se = x[X];
      return se === void 0 && (se = new gr(), x[X] = se), se.getTargetRaySpace();
    }, this.getControllerGrip = function(X) {
      let se = x[X];
      return se === void 0 && (se = new gr(), x[X] = se), se.getGripSpace();
    }, this.getHand = function(X) {
      let se = x[X];
      return se === void 0 && (se = new gr(), x[X] = se), se.getHandSpace();
    };
    function k(X) {
      const se = T.indexOf(X.inputSource);
      if (se === -1) return;
      const pe = x[se];
      pe !== void 0 && (pe.update(X.inputSource, X.frame, c || s), pe.dispatchEvent({
        type: X.type,
        data: X.inputSource
      }));
    }
    function G() {
      n.removeEventListener("select", k), n.removeEventListener("selectstart", k), n.removeEventListener("selectend", k), n.removeEventListener("squeeze", k), n.removeEventListener("squeezestart", k), n.removeEventListener("squeezeend", k), n.removeEventListener("end", G), n.removeEventListener("inputsourceschange", q);
      for (let X = 0; X < x.length; X++) {
        const se = T[X];
        se !== null && (T[X] = null, x[X].disconnect(se));
      }
      H = null, K = null, E.reset();
      for (const X in g) delete g[X];
      e.setRenderTarget(P), h = null, f = null, u = null, n = null, w = null, Ke.stop(), i.isPresenting = !1, e.setPixelRatio(I), e.setSize(b.width, b.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(X) {
      r = X, i.isPresenting === !0 && Te("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(X) {
      a = X, i.isPresenting === !0 && Te("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || s;
    }, this.setReferenceSpace = function(X) {
      c = X;
    }, this.getBaseLayer = function() {
      return f !== null ? f : h;
    }, this.getBinding = function() {
      return u === null && M && (u = new XRWebGLBinding(n, t)), u;
    }, this.getFrame = function() {
      return p;
    }, this.getSession = function() {
      return n;
    }, this.setSession = async function(X) {
      if (n = X, n !== null) {
        if (P = e.getRenderTarget(), n.addEventListener("select", k), n.addEventListener("selectstart", k), n.addEventListener("selectend", k), n.addEventListener("squeeze", k), n.addEventListener("squeezestart", k), n.addEventListener("squeezeend", k), n.addEventListener("end", G), n.addEventListener("inputsourceschange", q), d.xrCompatible !== !0 && await t.makeXRCompatible(), I = e.getPixelRatio(), e.getSize(b), M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let se = null, pe = null, he = null;
          d.depth && (he = d.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, se = d.stencil ? Sa : pn, pe = d.stencil ? Ma : Ei);
          const be = {
            colorFormat: t.RGBA8,
            depthFormat: he,
            scaleFactor: r
          };
          u = this.getBinding(), f = u.createProjectionLayer(be), n.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), w = new Xt(f.textureWidth, f.textureHeight, {
            format: fn,
            type: xi,
            depthTexture: new $i(f.textureWidth, f.textureHeight, pe, void 0, void 0, void 0, void 0, void 0, void 0, se),
            stencilBuffer: d.stencil,
            colorSpace: e.outputColorSpace,
            samples: d.antialias ? 4 : 0,
            resolveDepthBuffer: f.ignoreDepthValues === !1,
            resolveStencilBuffer: f.ignoreDepthValues === !1
          });
        } else {
          const se = {
            antialias: d.antialias,
            alpha: !0,
            depth: d.depth,
            stencil: d.stencil,
            framebufferScaleFactor: r
          };
          h = new XRWebGLLayer(n, t, se), n.updateRenderState({ baseLayer: h }), e.setPixelRatio(1), e.setSize(h.framebufferWidth, h.framebufferHeight, !1), w = new Xt(h.framebufferWidth, h.framebufferHeight, {
            format: fn,
            type: xi,
            colorSpace: e.outputColorSpace,
            stencilBuffer: d.stencil,
            resolveDepthBuffer: h.ignoreDepthValues === !1,
            resolveStencilBuffer: h.ignoreDepthValues === !1
          });
        }
        w.isXRRenderTarget = !0, this.setFoveation(o), c = null, s = await n.requestReferenceSpace(a), Ke.setContext(n), Ke.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (n !== null) return n.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return E.getDepthTexture();
    };
    function q(X) {
      for (let se = 0; se < X.removed.length; se++) {
        const pe = X.removed[se], he = T.indexOf(pe);
        he >= 0 && (T[he] = null, x[he].disconnect(pe));
      }
      for (let se = 0; se < X.added.length; se++) {
        const pe = X.added[se];
        let he = T.indexOf(pe);
        if (he === -1) {
          for (let we = 0; we < x.length; we++) if (we >= T.length) {
            T.push(pe), he = we;
            break;
          } else if (T[we] === null) {
            T[we] = pe, he = we;
            break;
          }
          if (he === -1) break;
        }
        const be = x[he];
        be && be.connect(pe);
      }
    }
    const O = new B(), j = new B();
    function ee(X, se, pe) {
      O.setFromMatrixPosition(se.matrixWorld), j.setFromMatrixPosition(pe.matrixWorld);
      const he = O.distanceTo(j), be = se.projectionMatrix.elements, we = pe.projectionMatrix.elements, Pe = be[14] / (be[10] - 1), We = be[14] / (be[10] + 1), Be = (be[9] + 1) / be[5], Je = (be[9] - 1) / be[5], ft = (be[8] - 1) / be[0], yt = (we[8] + 1) / we[0], Rt = Pe * ft, Qe = Pe * yt, pt = he / (-ft + yt), ut = pt * -ft;
      if (se.matrixWorld.decompose(X.position, X.quaternion, X.scale), X.translateX(ut), X.translateZ(pt), X.matrixWorld.compose(X.position, X.quaternion, X.scale), X.matrixWorldInverse.copy(X.matrixWorld).invert(), be[10] === -1)
        X.projectionMatrix.copy(se.projectionMatrix), X.projectionMatrixInverse.copy(se.projectionMatrixInverse);
      else {
        const ot = Pe + pt, L = We + pt, Ct = Rt - ut, Xe = Qe + (he - ut), je = Be * We / L * ot, S = Je * We / L * ot;
        X.projectionMatrix.makePerspective(Ct, Xe, je, S, ot, L), X.projectionMatrixInverse.copy(X.projectionMatrix).invert();
      }
    }
    function ne(X, se) {
      se === null ? X.matrixWorld.copy(X.matrix) : X.matrixWorld.multiplyMatrices(se.matrixWorld, X.matrix), X.matrixWorldInverse.copy(X.matrixWorld).invert();
    }
    this.updateCamera = function(X) {
      if (n === null) return;
      let se = X.near, pe = X.far;
      E.texture !== null && (E.depthNear > 0 && (se = E.depthNear), E.depthFar > 0 && (pe = E.depthFar)), A.near = y.near = v.near = se, A.far = y.far = v.far = pe, (H !== A.near || K !== A.far) && (n.updateRenderState({
        depthNear: A.near,
        depthFar: A.far
      }), H = A.near, K = A.far), A.layers.mask = X.layers.mask | 6, v.layers.mask = A.layers.mask & -5, y.layers.mask = A.layers.mask & -3;
      const he = X.parent, be = A.cameras;
      ne(A, he);
      for (let we = 0; we < be.length; we++) ne(be[we], he);
      be.length === 2 ? ee(A, v, y) : A.projectionMatrix.copy(v.projectionMatrix), de(X, A, he);
    };
    function de(X, se, pe) {
      pe === null ? X.matrix.copy(se.matrixWorld) : (X.matrix.copy(pe.matrixWorld), X.matrix.invert(), X.matrix.multiply(se.matrixWorld)), X.matrix.decompose(X.position, X.quaternion, X.scale), X.updateMatrixWorld(!0), X.projectionMatrix.copy(se.projectionMatrix), X.projectionMatrixInverse.copy(se.projectionMatrixInverse), X.isPerspectiveCamera && (X.fov = mn * 2 * Math.atan(1 / X.projectionMatrix.elements[5]), X.zoom = 1);
    }
    this.getCamera = function() {
      return A;
    }, this.getFoveation = function() {
      if (!(f === null && h === null))
        return o;
    }, this.setFoveation = function(X) {
      o = X, f !== null && (f.fixedFoveation = X), h !== null && h.fixedFoveation !== void 0 && (h.fixedFoveation = X);
    }, this.hasDepthSensing = function() {
      return E.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return E.getMesh(A);
    }, this.getCameraTexture = function(X) {
      return g[X];
    };
    let xe = null;
    function et(X, se) {
      if (l = se.getViewerPose(c || s), p = se, l !== null) {
        const pe = l.views;
        h !== null && (e.setRenderTargetFramebuffer(w, h.framebuffer), e.setRenderTarget(w));
        let he = !1;
        pe.length !== A.cameras.length && (A.cameras.length = 0, he = !0);
        for (let we = 0; we < pe.length; we++) {
          const Pe = pe[we];
          let We = null;
          if (h !== null) We = h.getViewport(Pe);
          else {
            const Je = u.getViewSubImage(f, Pe);
            We = Je.viewport, we === 0 && (e.setRenderTargetTextures(w, Je.colorTexture, Je.depthStencilTexture), e.setRenderTarget(w));
          }
          let Be = W[we];
          Be === void 0 && (Be = new Bt(), Be.layers.enable(we), Be.viewport = new st(), W[we] = Be), Be.matrix.fromArray(Pe.transform.matrix), Be.matrix.decompose(Be.position, Be.quaternion, Be.scale), Be.projectionMatrix.fromArray(Pe.projectionMatrix), Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(), Be.viewport.set(We.x, We.y, We.width, We.height), we === 0 && (A.matrix.copy(Be.matrix), A.matrix.decompose(A.position, A.quaternion, A.scale)), he === !0 && A.cameras.push(Be);
        }
        const be = n.enabledFeatures;
        if (be && be.includes("depth-sensing") && n.depthUsage == "gpu-optimized" && M) {
          u = i.getBinding();
          const we = u.getDepthInformation(pe[0]);
          we && we.isValid && we.texture && E.init(we, n.renderState);
        }
        if (be && be.includes("camera-access") && M) {
          e.state.unbindTexture(), u = i.getBinding();
          for (let we = 0; we < pe.length; we++) {
            const Pe = pe[we].camera;
            if (Pe) {
              let We = g[Pe];
              We || (We = new Fa(), g[Pe] = We);
              const Be = u.getCameraImage(Pe);
              We.sourceTexture = Be;
            }
          }
        }
      }
      for (let pe = 0; pe < x.length; pe++) {
        const he = T[pe], be = x[pe];
        he !== null && be !== void 0 && be.update(he, se, c || s);
      }
      xe && xe(X, se), se.detectedPlanes && i.dispatchEvent({
        type: "planesdetected",
        data: se
      }), p = null;
    }
    const Ke = new Ha();
    Ke.setAnimationLoop(et), this.setAnimationLoop = function(X) {
      xe = X;
    }, this.dispose = function() {
    };
  }
}, Du = /* @__PURE__ */ new lt(), Za = /* @__PURE__ */ new De();
Za.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Iu(e, t) {
  function i(g, d) {
    g.matrixAutoUpdate === !0 && g.updateMatrix(), d.value.copy(g.matrix);
  }
  function n(g, d) {
    d.color.getRGB(g.fogColor.value, za(e)), d.isFog ? (g.fogNear.value = d.near, g.fogFar.value = d.far) : d.isFogExp2 && (g.fogDensity.value = d.density);
  }
  function r(g, d, P, w, x) {
    d.isNodeMaterial ? d.uniformsNeedUpdate = !1 : d.isMeshBasicMaterial ? s(g, d) : d.isMeshLambertMaterial ? (s(g, d), d.envMap && (g.envMapIntensity.value = d.envMapIntensity)) : d.isMeshToonMaterial ? (s(g, d), f(g, d)) : d.isMeshPhongMaterial ? (s(g, d), u(g, d), d.envMap && (g.envMapIntensity.value = d.envMapIntensity)) : d.isMeshStandardMaterial ? (s(g, d), h(g, d), d.isMeshPhysicalMaterial && p(g, d, x)) : d.isMeshMatcapMaterial ? (s(g, d), M(g, d)) : d.isMeshDepthMaterial ? s(g, d) : d.isMeshDistanceMaterial ? (s(g, d), E(g, d)) : d.isMeshNormalMaterial ? s(g, d) : d.isLineBasicMaterial ? (a(g, d), d.isLineDashedMaterial && o(g, d)) : d.isPointsMaterial ? c(g, d, P, w) : d.isSpriteMaterial ? l(g, d) : d.isShadowMaterial ? (g.color.value.copy(d.color), g.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function s(g, d) {
    g.opacity.value = d.opacity, d.color && g.diffuse.value.copy(d.color), d.emissive && g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (g.map.value = d.map, i(d.map, g.mapTransform)), d.alphaMap && (g.alphaMap.value = d.alphaMap, i(d.alphaMap, g.alphaMapTransform)), d.bumpMap && (g.bumpMap.value = d.bumpMap, i(d.bumpMap, g.bumpMapTransform), g.bumpScale.value = d.bumpScale, d.side === 1 && (g.bumpScale.value *= -1)), d.normalMap && (g.normalMap.value = d.normalMap, i(d.normalMap, g.normalMapTransform), g.normalScale.value.copy(d.normalScale), d.side === 1 && g.normalScale.value.negate()), d.displacementMap && (g.displacementMap.value = d.displacementMap, i(d.displacementMap, g.displacementMapTransform), g.displacementScale.value = d.displacementScale, g.displacementBias.value = d.displacementBias), d.emissiveMap && (g.emissiveMap.value = d.emissiveMap, i(d.emissiveMap, g.emissiveMapTransform)), d.specularMap && (g.specularMap.value = d.specularMap, i(d.specularMap, g.specularMapTransform)), d.alphaTest > 0 && (g.alphaTest.value = d.alphaTest);
    const P = t.get(d), w = P.envMap, x = P.envMapRotation;
    w && (g.envMap.value = w, g.envMapRotation.value.setFromMatrix4(Du.makeRotationFromEuler(x)).transpose(), w.isCubeTexture && w.isRenderTargetTexture === !1 && g.envMapRotation.value.premultiply(Za), g.reflectivity.value = d.reflectivity, g.ior.value = d.ior, g.refractionRatio.value = d.refractionRatio), d.lightMap && (g.lightMap.value = d.lightMap, g.lightMapIntensity.value = d.lightMapIntensity, i(d.lightMap, g.lightMapTransform)), d.aoMap && (g.aoMap.value = d.aoMap, g.aoMapIntensity.value = d.aoMapIntensity, i(d.aoMap, g.aoMapTransform));
  }
  function a(g, d) {
    g.diffuse.value.copy(d.color), g.opacity.value = d.opacity, d.map && (g.map.value = d.map, i(d.map, g.mapTransform));
  }
  function o(g, d) {
    g.dashSize.value = d.dashSize, g.totalSize.value = d.dashSize + d.gapSize, g.scale.value = d.scale;
  }
  function c(g, d, P, w) {
    g.diffuse.value.copy(d.color), g.opacity.value = d.opacity, g.size.value = d.size * P, g.scale.value = w * 0.5, d.map && (g.map.value = d.map, i(d.map, g.uvTransform)), d.alphaMap && (g.alphaMap.value = d.alphaMap, i(d.alphaMap, g.alphaMapTransform)), d.alphaTest > 0 && (g.alphaTest.value = d.alphaTest);
  }
  function l(g, d) {
    g.diffuse.value.copy(d.color), g.opacity.value = d.opacity, g.rotation.value = d.rotation, d.map && (g.map.value = d.map, i(d.map, g.mapTransform)), d.alphaMap && (g.alphaMap.value = d.alphaMap, i(d.alphaMap, g.alphaMapTransform)), d.alphaTest > 0 && (g.alphaTest.value = d.alphaTest);
  }
  function u(g, d) {
    g.specular.value.copy(d.specular), g.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function f(g, d) {
    d.gradientMap && (g.gradientMap.value = d.gradientMap);
  }
  function h(g, d) {
    g.metalness.value = d.metalness, d.metalnessMap && (g.metalnessMap.value = d.metalnessMap, i(d.metalnessMap, g.metalnessMapTransform)), g.roughness.value = d.roughness, d.roughnessMap && (g.roughnessMap.value = d.roughnessMap, i(d.roughnessMap, g.roughnessMapTransform)), d.envMap && (g.envMapIntensity.value = d.envMapIntensity);
  }
  function p(g, d, P) {
    g.ior.value = d.ior, d.sheen > 0 && (g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), g.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (g.sheenColorMap.value = d.sheenColorMap, i(d.sheenColorMap, g.sheenColorMapTransform)), d.sheenRoughnessMap && (g.sheenRoughnessMap.value = d.sheenRoughnessMap, i(d.sheenRoughnessMap, g.sheenRoughnessMapTransform))), d.clearcoat > 0 && (g.clearcoat.value = d.clearcoat, g.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (g.clearcoatMap.value = d.clearcoatMap, i(d.clearcoatMap, g.clearcoatMapTransform)), d.clearcoatRoughnessMap && (g.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, i(d.clearcoatRoughnessMap, g.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (g.clearcoatNormalMap.value = d.clearcoatNormalMap, i(d.clearcoatNormalMap, g.clearcoatNormalMapTransform), g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && g.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (g.dispersion.value = d.dispersion), d.iridescence > 0 && (g.iridescence.value = d.iridescence, g.iridescenceIOR.value = d.iridescenceIOR, g.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], g.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (g.iridescenceMap.value = d.iridescenceMap, i(d.iridescenceMap, g.iridescenceMapTransform)), d.iridescenceThicknessMap && (g.iridescenceThicknessMap.value = d.iridescenceThicknessMap, i(d.iridescenceThicknessMap, g.iridescenceThicknessMapTransform))), d.transmission > 0 && (g.transmission.value = d.transmission, g.transmissionSamplerMap.value = P.texture, g.transmissionSamplerSize.value.set(P.width, P.height), d.transmissionMap && (g.transmissionMap.value = d.transmissionMap, i(d.transmissionMap, g.transmissionMapTransform)), g.thickness.value = d.thickness, d.thicknessMap && (g.thicknessMap.value = d.thicknessMap, i(d.thicknessMap, g.thicknessMapTransform)), g.attenuationDistance.value = d.attenuationDistance, g.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (g.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (g.anisotropyMap.value = d.anisotropyMap, i(d.anisotropyMap, g.anisotropyMapTransform))), g.specularIntensity.value = d.specularIntensity, g.specularColor.value.copy(d.specularColor), d.specularColorMap && (g.specularColorMap.value = d.specularColorMap, i(d.specularColorMap, g.specularColorMapTransform)), d.specularIntensityMap && (g.specularIntensityMap.value = d.specularIntensityMap, i(d.specularIntensityMap, g.specularIntensityMapTransform));
  }
  function M(g, d) {
    d.matcap && (g.matcap.value = d.matcap);
  }
  function E(g, d) {
    const P = t.get(d).light;
    g.referencePosition.value.setFromMatrixPosition(P.matrixWorld), g.nearDistance.value = P.shadow.camera.near, g.farDistance.value = P.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Uu(e, t, i, n) {
  let r = {}, s = {}, a = [];
  const o = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(x, T) {
    const b = T.program;
    n.uniformBlockBinding(x, b);
  }
  function l(x, T) {
    let b = r[x.id];
    b === void 0 && (g(x), b = u(x), r[x.id] = b, x.addEventListener("dispose", P));
    const I = T.program;
    n.updateUBOMapping(x, I);
    const v = t.render.frame;
    s[x.id] !== v && (h(x), s[x.id] = v);
  }
  function u(x) {
    const T = f();
    x.__bindingPointIndex = T;
    const b = e.createBuffer(), I = x.__size, v = x.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, b), e.bufferData(e.UNIFORM_BUFFER, I, v), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, T, b), b;
  }
  function f() {
    for (let x = 0; x < o; x++) if (a.indexOf(x) === -1)
      return a.push(x), x;
    return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(x) {
    const T = r[x.id], b = x.uniforms, I = x.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, T);
    for (let v = 0, y = b.length; v < y; v++) {
      const W = b[v];
      if (Array.isArray(W)) for (let A = 0, H = W.length; A < H; A++) p(W[A], v, A, I);
      else p(W, v, 0, I);
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function p(x, T, b, I) {
    if (E(x, T, b, I) === !0) {
      const v = x.__offset, y = x.value;
      if (Array.isArray(y)) {
        let W = 0;
        for (let A = 0; A < y.length; A++) {
          const H = y[A], K = d(H);
          M(H, x.__data, W), typeof H != "number" && typeof H != "boolean" && !H.isMatrix3 && !ArrayBuffer.isView(H) && (W += K.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else M(y, x.__data, 0);
      e.bufferSubData(e.UNIFORM_BUFFER, v, x.__data);
    }
  }
  function M(x, T, b) {
    typeof x == "number" || typeof x == "boolean" ? T[0] = x : x.isMatrix3 ? (T[0] = x.elements[0], T[1] = x.elements[1], T[2] = x.elements[2], T[3] = 0, T[4] = x.elements[3], T[5] = x.elements[4], T[6] = x.elements[5], T[7] = 0, T[8] = x.elements[6], T[9] = x.elements[7], T[10] = x.elements[8], T[11] = 0) : ArrayBuffer.isView(x) ? T.set(new x.constructor(x.buffer, x.byteOffset, T.length)) : x.toArray(T, b);
  }
  function E(x, T, b, I) {
    const v = x.value, y = T + "_" + b;
    if (I[y] === void 0)
      return typeof v == "number" || typeof v == "boolean" ? I[y] = v : ArrayBuffer.isView(v) ? I[y] = v.slice() : I[y] = v.clone(), !0;
    {
      const W = I[y];
      if (typeof v == "number" || typeof v == "boolean") {
        if (W !== v)
          return I[y] = v, !0;
      } else {
        if (ArrayBuffer.isView(v)) return !0;
        if (W.equals(v) === !1)
          return W.copy(v), !0;
      }
    }
    return !1;
  }
  function g(x) {
    const T = x.uniforms;
    let b = 0;
    const I = 16;
    for (let y = 0, W = T.length; y < W; y++) {
      const A = Array.isArray(T[y]) ? T[y] : [T[y]];
      for (let H = 0, K = A.length; H < K; H++) {
        const k = A[H], G = Array.isArray(k.value) ? k.value : [k.value];
        for (let q = 0, O = G.length; q < O; q++) {
          const j = G[q], ee = d(j), ne = b % I, de = ne % ee.boundary, xe = ne + de;
          b += de, xe !== 0 && I - xe < ee.storage && (b += I - xe), k.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = b, b += ee.storage;
        }
      }
    }
    const v = b % I;
    return v > 0 && (b += I - v), x.__size = b, x.__cache = {}, this;
  }
  function d(x) {
    const T = {
      boundary: 0,
      storage: 0
    };
    return typeof x == "number" || typeof x == "boolean" ? (T.boundary = 4, T.storage = 4) : x.isVector2 ? (T.boundary = 8, T.storage = 8) : x.isVector3 || x.isColor ? (T.boundary = 16, T.storage = 12) : x.isVector4 ? (T.boundary = 16, T.storage = 16) : x.isMatrix3 ? (T.boundary = 48, T.storage = 48) : x.isMatrix4 ? (T.boundary = 64, T.storage = 64) : x.isTexture ? Te("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(x) ? (T.boundary = 16, T.storage = x.byteLength) : Te("WebGLRenderer: Unsupported uniform value type.", x), T;
  }
  function P(x) {
    const T = x.target;
    T.removeEventListener("dispose", P);
    const b = a.indexOf(T.__bindingPointIndex);
    a.splice(b, 1), e.deleteBuffer(r[T.id]), delete r[T.id], delete s[T.id];
  }
  function w() {
    for (const x in r) e.deleteBuffer(r[x]);
    a = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: w
  };
}
var Nu = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]), kt = null;
function Fu() {
  return kt === null && (kt = new Vl(Nu, 16, 16, $n, yi), kt.name = "DFG_LUT", kt.minFilter = Et, kt.magFilter = Et, kt.wrapS = ei, kt.wrapT = ei, kt.generateMipmaps = !1, kt.needsUpdate = !0), kt;
}
var Ou = class {
  constructor(e = {}) {
    const { canvas: t = tl(), context: i = null, depth: n = !0, stencil: r = !1, alpha: s = !1, antialias: a = !1, premultipliedAlpha: o = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: f = !1, outputBufferType: h = xi } = e;
    this.isWebGLRenderer = !0;
    let p;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = i.getContextAttributes().alpha;
    } else p = s;
    const M = h, E = /* @__PURE__ */ new Set([
      ya,
      Ea,
      xa
    ]), g = /* @__PURE__ */ new Set([
      xi,
      Ei,
      ga,
      Ma,
      va,
      _a
    ]), d = new Uint32Array(4), P = new Int32Array(4), w = new B();
    let x = null, T = null;
    const b = [], I = [];
    let v = null;
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const y = this;
    let W = !1, A = null, H = null, K = null, k = null;
    this._outputColorSpace = wt;
    let G = 0, q = 0, O = null, j = -1, ee = null;
    const ne = new st(), de = new st();
    let xe = null;
    const et = new He(0);
    let Ke = 0, X = t.width, se = t.height, pe = 1, he = null, be = null;
    const we = new st(0, 0, X, se), Pe = new st(0, 0, X, se);
    let We = !1;
    const Be = new Ua();
    let Je = !1, ft = !1;
    const yt = new lt(), Rt = new B(), Qe = new st(), pt = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ut = !1;
    function ot() {
      return O === null ? pe : 1;
    }
    let L = i;
    function Ct(_, U) {
      return t.getContext(_, U);
    }
    try {
      const _ = {
        alpha: !0,
        depth: n,
        stencil: r,
        antialias: a,
        premultipliedAlpha: o,
        preserveDrawingBuffer: c,
        powerPreference: l,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r185"), t.addEventListener("webglcontextlost", Ae, !1), t.addEventListener("webglcontextrestored", _t, !1), t.addEventListener("webglcontextcreationerror", Ze, !1), L === null) {
        const U = "webgl2";
        if (L = Ct(U, _), L === null) throw Ct(U) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (_) {
      throw Ce("WebGLRenderer: " + _.message), _;
    }
    let Xe, je, S, m, R, V, Z, ie, ae, D, te, fe, _e, Q, Se, Ee, Le, Ve, C, Y, $, ue, ve;
    function J() {
      Xe = new Fc(L), Xe.init(), $ = new wu(L, Xe), je = new Rc(L, Xe, e, $), S = new bu(L, Xe), je.reversedDepthBuffer && f && S.buffers.depth.setReversed(!0), H = L.createFramebuffer(), K = L.createFramebuffer(), k = L.createFramebuffer(), m = new zc(L), R = new uu(), V = new Au(L, Xe, S, R, je, $, m), Z = new Nc(y), ie = new yc(L), ue = new Ac(L, ie), ae = new Oc(L, ie, m, ue), D = new Gc(L, ae, ie, ue, m), Ve = new Vc(L, je, V), Se = new Cc(R), te = new hu(y, Z, Xe, je, ue, Se), fe = new Iu(y, R), _e = new fu(), Q = new Mu(Xe), Le = new bc(y, Z, S, D, p, o), Ee = new Tu(y, D, je), ve = new Uu(L, m, je, S), C = new wc(L, Xe, m), Y = new Bc(L, Xe, m), m.programs = te.programs, y.capabilities = je, y.extensions = Xe, y.properties = R, y.renderLists = _e, y.shadowMap = Ee, y.state = S, y.info = m;
    }
    J(), M !== 1009 && (v = new kc(M, t.width, t.height, a, n, r));
    const le = new Lu(y, L);
    this.xr = le, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const _ = Xe.get("WEBGL_lose_context");
      _ && _.loseContext();
    }, this.forceContextRestore = function() {
      const _ = Xe.get("WEBGL_lose_context");
      _ && _.restoreContext();
    }, this.getPixelRatio = function() {
      return pe;
    }, this.setPixelRatio = function(_) {
      _ !== void 0 && (pe = _, this.setSize(X, se, !1));
    }, this.getSize = function(_) {
      return _.set(X, se);
    }, this.setSize = function(_, U, z = !0) {
      if (le.isPresenting) {
        Te("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      X = _, se = U, t.width = Math.floor(_ * pe), t.height = Math.floor(U * pe), z === !0 && (t.style.width = _ + "px", t.style.height = U + "px"), v !== null && v.setSize(t.width, t.height), this.setViewport(0, 0, _, U);
    }, this.getDrawingBufferSize = function(_) {
      return _.set(X * pe, se * pe).floor();
    }, this.setDrawingBufferSize = function(_, U, z) {
      X = _, se = U, pe = z, t.width = Math.floor(_ * z), t.height = Math.floor(U * z), this.setViewport(0, 0, _, U);
    }, this.setEffects = function(_) {
      if (M === 1009) {
        Ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (_) {
        for (let U = 0; U < _.length; U++) if (_[U].isOutputPass === !0) {
          Te("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      v.setEffects(_ || []);
    }, this.getCurrentViewport = function(_) {
      return _.copy(ne);
    }, this.getViewport = function(_) {
      return _.copy(we);
    }, this.setViewport = function(_, U, z, F) {
      _.isVector4 ? we.set(_.x, _.y, _.z, _.w) : we.set(_, U, z, F), S.viewport(ne.copy(we).multiplyScalar(pe).round());
    }, this.getScissor = function(_) {
      return _.copy(Pe);
    }, this.setScissor = function(_, U, z, F) {
      _.isVector4 ? Pe.set(_.x, _.y, _.z, _.w) : Pe.set(_, U, z, F), S.scissor(de.copy(Pe).multiplyScalar(pe).round());
    }, this.getScissorTest = function() {
      return We;
    }, this.setScissorTest = function(_) {
      S.setScissorTest(We = _);
    }, this.setOpaqueSort = function(_) {
      he = _;
    }, this.setTransparentSort = function(_) {
      be = _;
    }, this.getClearColor = function(_) {
      return _.copy(Le.getClearColor());
    }, this.setClearColor = function() {
      Le.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Le.getClearAlpha();
    }, this.setClearAlpha = function() {
      Le.setClearAlpha(...arguments);
    }, this.clear = function(_ = !0, U = !0, z = !0) {
      let F = 0;
      if (_) {
        let N = !1;
        if (O !== null) {
          const re = O.texture.format;
          N = E.has(re);
        }
        if (N) {
          const re = O.texture.type, ce = g.has(re), me = Le.getClearColor(), ge = Le.getClearAlpha(), Re = me.r, Ne = me.g, Fe = me.b;
          ce ? (d[0] = Re, d[1] = Ne, d[2] = Fe, d[3] = ge, L.clearBufferuiv(L.COLOR, 0, d)) : (P[0] = Re, P[1] = Ne, P[2] = Fe, P[3] = ge, L.clearBufferiv(L.COLOR, 0, P));
        } else F |= L.COLOR_BUFFER_BIT;
      }
      U && (F |= L.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), z && (F |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && L.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(_) {
      _.setRenderer(this), A = _;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", Ae, !1), t.removeEventListener("webglcontextrestored", _t, !1), t.removeEventListener("webglcontextcreationerror", Ze, !1), Le.dispose(), _e.dispose(), Q.dispose(), R.dispose(), Z.dispose(), D.dispose(), ue.dispose(), ve.dispose(), te.dispose(), le.dispose(), le.removeEventListener("sessionstart", ts), le.removeEventListener("sessionend", is), fi.stop();
    };
    function Ae(_) {
      _.preventDefault(), ps("WebGLRenderer: Context Lost."), W = !0;
    }
    function _t() {
      ps("WebGLRenderer: Context Restored."), W = !1;
      const _ = m.autoReset, U = Ee.enabled, z = Ee.autoUpdate, F = Ee.needsUpdate, N = Ee.type;
      J(), m.autoReset = _, Ee.enabled = U, Ee.autoUpdate = z, Ee.needsUpdate = F, Ee.type = N;
    }
    function Ze(_) {
      Ce("WebGLRenderer: A WebGL context could not be created. Reason: ", _.statusMessage);
    }
    function Vt(_) {
      const U = _.target;
      U.removeEventListener("dispose", Vt), Kt(U);
    }
    function Kt(_) {
      Ja(_), R.remove(_);
    }
    function Ja(_) {
      const U = R.get(_).programs;
      U !== void 0 && (U.forEach(function(z) {
        te.releaseProgram(z);
      }), _.isShaderMaterial && te.releaseShaderCache(_));
    }
    this.renderBufferDirect = function(_, U, z, F, N, re) {
      U === null && (U = pt);
      const ce = N.isMesh && N.matrixWorld.determinantAffine() < 0, me = eo(_, U, z, F, N);
      S.setMaterial(F, ce);
      let ge = z.index, Re = 1;
      if (F.wireframe === !0) {
        if (ge = ae.getWireframeAttribute(z), ge === void 0) return;
        Re = 2;
      }
      const Ne = z.drawRange, Fe = z.attributes.position;
      let ye = Ne.start * Re, $e = (Ne.start + Ne.count) * Re;
      re !== null && (ye = Math.max(ye, re.start * Re), $e = Math.min($e, (re.start + re.count) * Re)), ge !== null ? (ye = Math.max(ye, 0), $e = Math.min($e, ge.count)) : Fe != null && (ye = Math.max(ye, 0), $e = Math.min($e, Fe.count));
      const tt = $e - ye;
      if (tt < 0 || tt === 1 / 0) return;
      ue.setup(N, F, me, z, ge);
      let it, Ge = C;
      if (ge !== null && (it = ie.get(ge), Ge = Y, Ge.setIndex(it)), N.isMesh) F.wireframe === !0 ? (S.setLineWidth(F.wireframeLinewidth * ot()), Ge.setMode(L.LINES)) : Ge.setMode(L.TRIANGLES);
      else if (N.isLine) {
        let mt = F.linewidth;
        mt === void 0 && (mt = 1), S.setLineWidth(mt * ot()), N.isLineSegments ? Ge.setMode(L.LINES) : N.isLineLoop ? Ge.setMode(L.LINE_LOOP) : Ge.setMode(L.LINE_STRIP);
      } else N.isPoints ? Ge.setMode(L.POINTS) : N.isSprite && Ge.setMode(L.TRIANGLES);
      if (N.isBatchedMesh) if (Xe.get("WEBGL_multi_draw"))
        Ge.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
      else {
        const mt = N._multiDrawStarts, Me = N._multiDrawCounts, Ut = N._multiDrawCount, ke = ge ? ie.get(ge).bytesPerElement : 1, Pt = R.get(F).currentProgram.getUniforms();
        for (let Gt = 0; Gt < Ut; Gt++)
          Pt.setValue(L, "_gl_DrawID", Gt), Ge.render(mt[Gt] / ke, Me[Gt]);
      }
      else if (N.isInstancedMesh) Ge.renderInstances(ye, tt, N.count);
      else if (z.isInstancedBufferGeometry) {
        const mt = z._maxInstanceCount !== void 0 ? z._maxInstanceCount : 1 / 0, Me = Math.min(z.instanceCount, mt);
        Ge.renderInstances(ye, tt, Me);
      } else Ge.render(ye, tt);
    };
    function es(_, U, z) {
      _.transparent === !0 && _.side === 2 && _.forceSinglePass === !1 ? (_.side = 1, _.needsUpdate = !0, En(_, U, z), _.side = 0, _.needsUpdate = !0, En(_, U, z), _.side = 2) : En(_, U, z);
    }
    this.compile = function(_, U, z = null) {
      z === null && (z = _), T = Q.get(z), T.init(U), I.push(T), z.traverseVisible(function(N) {
        N.isLight && N.layers.test(U.layers) && (T.pushLight(N), N.castShadow && T.pushShadow(N));
      }), _ !== z && _.traverseVisible(function(N) {
        N.isLight && N.layers.test(U.layers) && (T.pushLight(N), N.castShadow && T.pushShadow(N));
      }), T.setupLights();
      const F = /* @__PURE__ */ new Set();
      return _.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite)) return;
        const re = N.material;
        if (re) if (Array.isArray(re)) for (let ce = 0; ce < re.length; ce++) {
          const me = re[ce];
          es(me, z, N), F.add(me);
        }
        else
          es(re, z, N), F.add(re);
      }), T = I.pop(), F;
    }, this.compileAsync = function(_, U, z = null) {
      const F = this.compile(_, U, z);
      return new Promise((N) => {
        function re() {
          if (F.forEach(function(ce) {
            R.get(ce).currentProgram.isReady() && F.delete(ce);
          }), F.size === 0) {
            N(_);
            return;
          }
          setTimeout(re, 10);
        }
        Xe.get("KHR_parallel_shader_compile") !== null ? re() : setTimeout(re, 10);
      });
    };
    let or = null;
    function Qa(_) {
      or && or(_);
    }
    function ts() {
      fi.stop();
    }
    function is() {
      fi.start();
    }
    const fi = new Ha();
    fi.setAnimationLoop(Qa), typeof self < "u" && fi.setContext(self), this.setAnimationLoop = function(_) {
      or = _, le.setAnimationLoop(_), _ === null ? fi.stop() : fi.start();
    }, le.addEventListener("sessionstart", ts), le.addEventListener("sessionend", is), this.render = function(_, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (W === !0) return;
      A !== null && A.renderStart(_, U);
      const z = le.enabled === !0 && le.isPresenting === !0, F = v !== null && (O === null || z) && v.begin(y, O);
      if (_.matrixWorldAutoUpdate === !0 && _.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), le.enabled === !0 && le.isPresenting === !0 && (v === null || v.isCompositing() === !1) && (le.cameraAutoUpdate === !0 && le.updateCamera(U), U = le.getCamera()), _.isScene === !0 && _.onBeforeRender(y, _, U, O), T = Q.get(_, I.length), T.init(U), T.state.textureUnits = V.getTextureUnits(), I.push(T), yt.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), Be.setFromProjectionMatrix(yt, Ki, U.reversedDepth), ft = this.localClippingEnabled, Je = Se.init(this.clippingPlanes, ft), x = _e.get(_, b.length), x.init(), b.push(x), le.enabled === !0 && le.isPresenting === !0) {
        const re = y.xr.getDepthSensingMesh();
        re !== null && lr(re, U, -1 / 0, y.sortObjects);
      }
      lr(_, U, 0, y.sortObjects), x.finish(), y.sortObjects === !0 && x.sort(he, be, U.reversedDepth), ut = le.enabled === !1 || le.isPresenting === !1 || le.hasDepthSensing() === !1, ut && Le.addToRenderList(x, _), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), Je === !0 && Se.beginShadows();
      const N = T.state.shadowsArray;
      if (Ee.render(N, _, U), Je === !0 && Se.endShadows(), (F && v.hasRenderPass()) === !1) {
        const re = x.opaque, ce = x.transmissive;
        if (T.setupLights(), U.isArrayCamera) {
          const me = U.cameras;
          if (ce.length > 0) for (let ge = 0, Re = me.length; ge < Re; ge++) {
            const Ne = me[ge];
            rs(re, ce, _, Ne);
          }
          ut && Le.render(_);
          for (let ge = 0, Re = me.length; ge < Re; ge++) {
            const Ne = me[ge];
            ns(x, _, Ne, Ne.viewport);
          }
        } else
          ce.length > 0 && rs(re, ce, _, U), ut && Le.render(_), ns(x, _, U);
      }
      O !== null && q === 0 && (V.updateMultisampleRenderTarget(O), V.updateRenderTargetMipmap(O)), F && v.end(y), _.isScene === !0 && _.onAfterRender(y, _, U), ue.resetDefaultState(), j = -1, ee = null, I.pop(), I.length > 0 ? (T = I[I.length - 1], V.setTextureUnits(T.state.textureUnits), Je === !0 && Se.setGlobalState(y.clippingPlanes, T.state.camera)) : T = null, b.pop(), b.length > 0 ? x = b[b.length - 1] : x = null, A !== null && A.renderEnd();
    };
    function lr(_, U, z, F) {
      if (_.visible === !1) return;
      if (_.layers.test(U.layers)) {
        if (_.isGroup) z = _.renderOrder;
        else if (_.isLOD)
          _.autoUpdate === !0 && _.update(U);
        else if (_.isLightProbeGrid) T.pushLightProbeGrid(_);
        else if (_.isLight)
          T.pushLight(_), _.castShadow && T.pushShadow(_);
        else if (_.isSprite) {
          if (!_.frustumCulled || Be.intersectsSprite(_)) {
            F && Qe.setFromMatrixPosition(_.matrixWorld).applyMatrix4(yt);
            const re = D.update(_), ce = _.material;
            ce.visible && x.push(_, re, ce, z, Qe.z, null);
          }
        } else if ((_.isMesh || _.isLine || _.isPoints) && (!_.frustumCulled || Be.intersectsObject(_))) {
          const re = D.update(_), ce = _.material;
          if (F && (_.boundingSphere !== void 0 ? (_.boundingSphere === null && _.computeBoundingSphere(), Qe.copy(_.boundingSphere.center)) : (re.boundingSphere === null && re.computeBoundingSphere(), Qe.copy(re.boundingSphere.center)), Qe.applyMatrix4(_.matrixWorld).applyMatrix4(yt)), Array.isArray(ce)) {
            const me = re.groups;
            for (let ge = 0, Re = me.length; ge < Re; ge++) {
              const Ne = me[ge], Fe = ce[Ne.materialIndex];
              Fe && Fe.visible && x.push(_, re, Fe, z, Qe.z, Ne);
            }
          } else ce.visible && x.push(_, re, ce, z, Qe.z, null);
        }
      }
      const N = _.children;
      for (let re = 0, ce = N.length; re < ce; re++) lr(N[re], U, z, F);
    }
    function ns(_, U, z, F) {
      const { opaque: N, transmissive: re, transparent: ce } = _;
      T.setupLightsView(z), Je === !0 && Se.setGlobalState(y.clippingPlanes, z), F && S.viewport(ne.copy(F)), N.length > 0 && xn(N, U, z), re.length > 0 && xn(re, U, z), ce.length > 0 && xn(ce, U, z), S.buffers.depth.setTest(!0), S.buffers.depth.setMask(!0), S.buffers.color.setMask(!0), S.setPolygonOffset(!1);
    }
    function rs(_, U, z, F) {
      if ((z.isScene === !0 ? z.overrideMaterial : null) !== null) return;
      if (T.state.transmissionRenderTarget[F.id] === void 0) {
        const Fe = Xe.has("EXT_color_buffer_half_float") || Xe.has("EXT_color_buffer_float");
        T.state.transmissionRenderTarget[F.id] = new Xt(1, 1, {
          generateMipmaps: !0,
          type: Fe ? yi : xi,
          minFilter: qr,
          samples: Math.max(4, je.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: ze.workingColorSpace
        });
      }
      const N = T.state.transmissionRenderTarget[F.id], re = F.viewport || ne;
      N.setSize(re.z * y.transmissionResolutionScale, re.w * y.transmissionResolutionScale);
      const ce = y.getRenderTarget(), me = y.getActiveCubeFace(), ge = y.getActiveMipmapLevel();
      y.setRenderTarget(N), y.getClearColor(et), Ke = y.getClearAlpha(), Ke < 1 && y.setClearColor(16777215, 0.5), y.clear(), ut && Le.render(z);
      const Re = y.toneMapping;
      y.toneMapping = 0;
      const Ne = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), T.setupLightsView(F), Je === !0 && Se.setGlobalState(y.clippingPlanes, F), xn(_, z, F), V.updateMultisampleRenderTarget(N), V.updateRenderTargetMipmap(N), Xe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Fe = !1;
        for (let ye = 0, $e = U.length; ye < $e; ye++) {
          const { object: tt, geometry: it, material: Ge, group: mt } = U[ye];
          if (Ge.side === 2 && tt.layers.test(F.layers)) {
            const Me = Ge.side;
            Ge.side = 1, Ge.needsUpdate = !0, ss(tt, z, F, it, Ge, mt), Ge.side = Me, Ge.needsUpdate = !0, Fe = !0;
          }
        }
        Fe === !0 && (V.updateMultisampleRenderTarget(N), V.updateRenderTargetMipmap(N));
      }
      y.setRenderTarget(ce, me, ge), y.setClearColor(et, Ke), Ne !== void 0 && (F.viewport = Ne), y.toneMapping = Re;
    }
    function xn(_, U, z) {
      const F = U.isScene === !0 ? U.overrideMaterial : null;
      for (let N = 0, re = _.length; N < re; N++) {
        const ce = _[N], { object: me, geometry: ge, group: Re } = ce;
        let Ne = ce.material;
        Ne.allowOverride === !0 && F !== null && (Ne = F), me.layers.test(z.layers) && ss(me, U, z, ge, Ne, Re);
      }
    }
    function ss(_, U, z, F, N, re) {
      _.onBeforeRender(y, U, z, F, N, re), _.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, _.matrixWorld), _.normalMatrix.getNormalMatrix(_.modelViewMatrix), N.onBeforeRender(y, U, z, F, _, re), N.transparent === !0 && N.side === 2 && N.forceSinglePass === !1 ? (N.side = 1, N.needsUpdate = !0, y.renderBufferDirect(z, U, F, N, _, re), N.side = 0, N.needsUpdate = !0, y.renderBufferDirect(z, U, F, N, _, re), N.side = 2) : y.renderBufferDirect(z, U, F, N, _, re), _.onAfterRender(y, U, z, F, N, re);
    }
    function En(_, U, z) {
      U.isScene !== !0 && (U = pt);
      const F = R.get(_), N = T.state.lights, re = T.state.shadowsArray, ce = N.state.version, me = te.getParameters(_, N.state, re, U, z, T.state.lightProbeGridArray), ge = te.getProgramCacheKey(me);
      let Re = F.programs;
      F.environment = _.isMeshStandardMaterial || _.isMeshLambertMaterial || _.isMeshPhongMaterial ? U.environment : null, F.fog = U.fog;
      const Ne = _.isMeshStandardMaterial || _.isMeshLambertMaterial && !_.envMap || _.isMeshPhongMaterial && !_.envMap;
      F.envMap = Z.get(_.envMap || F.environment, Ne), F.envMapRotation = F.environment !== null && _.envMap === null ? U.environmentRotation : _.envMapRotation, Re === void 0 && (_.addEventListener("dispose", Vt), Re = /* @__PURE__ */ new Map(), F.programs = Re);
      let Fe = Re.get(ge);
      if (Fe !== void 0) {
        if (F.currentProgram === Fe && F.lightsStateVersion === ce)
          return os(_, me), Fe;
      } else
        me.uniforms = te.getUniforms(_), A !== null && _.isNodeMaterial && A.build(_, z, me), _.onBeforeCompile(me, y), Fe = te.acquireProgram(me, ge), Re.set(ge, Fe), F.uniforms = me.uniforms;
      const ye = F.uniforms;
      return (!_.isShaderMaterial && !_.isRawShaderMaterial || _.clipping === !0) && (ye.clippingPlanes = Se.uniform), os(_, me), F.needsLights = io(_), F.lightsStateVersion = ce, F.needsLights && (ye.ambientLightColor.value = N.state.ambient, ye.lightProbe.value = N.state.probe, ye.directionalLights.value = N.state.directional, ye.directionalLightShadows.value = N.state.directionalShadow, ye.spotLights.value = N.state.spot, ye.spotLightShadows.value = N.state.spotShadow, ye.rectAreaLights.value = N.state.rectArea, ye.ltc_1.value = N.state.rectAreaLTC1, ye.ltc_2.value = N.state.rectAreaLTC2, ye.pointLights.value = N.state.point, ye.pointLightShadows.value = N.state.pointShadow, ye.hemisphereLights.value = N.state.hemi, ye.directionalShadowMatrix.value = N.state.directionalShadowMatrix, ye.spotLightMatrix.value = N.state.spotLightMatrix, ye.spotLightMap.value = N.state.spotLightMap, ye.pointShadowMatrix.value = N.state.pointShadowMatrix), F.lightProbeGrid = T.state.lightProbeGridArray.length > 0, F.currentProgram = Fe, F.uniformsList = null, Fe;
    }
    function as(_) {
      if (_.uniformsList === null) {
        const U = _.currentProgram.getUniforms();
        _.uniformsList = Zn.seqWithValue(U.seq, _.uniforms);
      }
      return _.uniformsList;
    }
    function os(_, U) {
      const z = R.get(_);
      z.outputColorSpace = U.outputColorSpace, z.batching = U.batching, z.batchingColor = U.batchingColor, z.instancing = U.instancing, z.instancingColor = U.instancingColor, z.instancingMorph = U.instancingMorph, z.skinning = U.skinning, z.morphTargets = U.morphTargets, z.morphNormals = U.morphNormals, z.morphColors = U.morphColors, z.morphTargetsCount = U.morphTargetsCount, z.numClippingPlanes = U.numClippingPlanes, z.numIntersection = U.numClipIntersection, z.vertexAlphas = U.vertexAlphas, z.vertexTangents = U.vertexTangents, z.toneMapping = U.toneMapping;
    }
    function ja(_, U) {
      if (_.length === 0) return null;
      if (_.length === 1) return _[0].texture !== null ? _[0] : null;
      w.setFromMatrixPosition(U.matrixWorld);
      for (let z = 0, F = _.length; z < F; z++) {
        const N = _[z];
        if (N.texture !== null && N.boundingBox.containsPoint(w)) return N;
      }
      return null;
    }
    function eo(_, U, z, F, N) {
      U.isScene !== !0 && (U = pt), V.resetTextureUnits();
      const re = U.fog, ce = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? U.environment : null, me = O === null ? y.outputColorSpace : O.isXRRenderTarget === !0 ? O.texture.colorSpace : ze.workingColorSpace, ge = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, Re = Z.get(F.envMap || ce, ge), Ne = F.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4, Fe = !!z.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), ye = !!z.morphAttributes.position, $e = !!z.morphAttributes.normal, tt = !!z.morphAttributes.color;
      let it = 0;
      F.toneMapped && (O === null || O.isXRRenderTarget === !0) && (it = y.toneMapping);
      const Ge = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, mt = Ge !== void 0 ? Ge.length : 0, Me = R.get(F), Ut = T.state.lights;
      if (Je === !0 && (ft === !0 || _ !== ee)) {
        const qe = _ === ee && F.id === j;
        Se.setState(F, _, qe);
      }
      let ke = !1;
      F.version === Me.__version ? (Me.needsLights && Me.lightsStateVersion !== Ut.state.version || Me.outputColorSpace !== me || N.isBatchedMesh && Me.batching === !1 || !N.isBatchedMesh && Me.batching === !0 || N.isBatchedMesh && Me.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && Me.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && Me.instancing === !1 || !N.isInstancedMesh && Me.instancing === !0 || N.isSkinnedMesh && Me.skinning === !1 || !N.isSkinnedMesh && Me.skinning === !0 || N.isInstancedMesh && Me.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && Me.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && Me.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && Me.instancingMorph === !1 && N.morphTexture !== null || Me.envMap !== Re || F.fog === !0 && Me.fog !== re || Me.numClippingPlanes !== void 0 && (Me.numClippingPlanes !== Se.numPlanes || Me.numIntersection !== Se.numIntersection) || Me.vertexAlphas !== Ne || Me.vertexTangents !== Fe || Me.morphTargets !== ye || Me.morphNormals !== $e || Me.morphColors !== tt || Me.toneMapping !== it || Me.morphTargetsCount !== mt || !!Me.lightProbeGrid != T.state.lightProbeGridArray.length > 0) && (ke = !0) : (ke = !0, Me.__version = F.version);
      let Pt = Me.currentProgram;
      ke === !0 && (Pt = En(F, U, N), A && F.isNodeMaterial && A.onUpdateProgram(F, Pt, Me));
      let Gt = !1, ri = !1, Ri = !1;
      const Ye = Pt.getUniforms(), rt = Me.uniforms;
      if (S.useProgram(Pt.program) && (Gt = !0, ri = !0, Ri = !0), F.id !== j && (j = F.id, ri = !0), Me.needsLights) {
        const qe = ja(T.state.lightProbeGridArray, N);
        Me.lightProbeGrid !== qe && (Me.lightProbeGrid = qe, ri = !0);
      }
      if (Gt || ee !== _) {
        S.buffers.depth.getReversed() && _.reversedDepth !== !0 && (_._reversedDepth = !0, _.updateProjectionMatrix()), Ye.setValue(L, "projectionMatrix", _.projectionMatrix), Ye.setValue(L, "viewMatrix", _.matrixWorldInverse);
        const qe = Ye.map.cameraPosition;
        qe !== void 0 && qe.setValue(L, Rt.setFromMatrixPosition(_.matrixWorld)), je.logarithmicDepthBuffer && Ye.setValue(L, "logDepthBufFC", 2 / (Math.log(_.far + 1) / Math.LN2)), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && Ye.setValue(L, "isOrthographic", _.isOrthographicCamera === !0), ee !== _ && (ee = _, ri = !0, Ri = !0);
      }
      if (Me.needsLights && (Ut.state.directionalShadowMap.length > 0 && Ye.setValue(L, "directionalShadowMap", Ut.state.directionalShadowMap, V), Ut.state.spotShadowMap.length > 0 && Ye.setValue(L, "spotShadowMap", Ut.state.spotShadowMap, V), Ut.state.pointShadowMap.length > 0 && Ye.setValue(L, "pointShadowMap", Ut.state.pointShadowMap, V)), N.isSkinnedMesh) {
        Ye.setOptional(L, N, "bindMatrix"), Ye.setOptional(L, N, "bindMatrixInverse");
        const qe = N.skeleton;
        qe && (qe.boneTexture === null && qe.computeBoneTexture(), Ye.setValue(L, "boneTexture", qe.boneTexture, V));
      }
      N.isBatchedMesh && (Ye.setOptional(L, N, "batchingTexture"), Ye.setValue(L, "batchingTexture", N._matricesTexture, V), Ye.setOptional(L, N, "batchingIdTexture"), Ye.setValue(L, "batchingIdTexture", N._indirectTexture, V), Ye.setOptional(L, N, "batchingColorTexture"), N._colorsTexture !== null && Ye.setValue(L, "batchingColorTexture", N._colorsTexture, V));
      const si = z.morphAttributes;
      if ((si.position !== void 0 || si.normal !== void 0 || si.color !== void 0) && Ve.update(N, z, Pt), (ri || Me.receiveShadow !== N.receiveShadow) && (Me.receiveShadow = N.receiveShadow, Ye.setValue(L, "receiveShadow", N.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && U.environment !== null && (rt.envMapIntensity.value = U.environmentIntensity), rt.dfgLUT !== void 0 && (rt.dfgLUT.value = Fu()), ri) {
        if (Ye.setValue(L, "toneMappingExposure", y.toneMappingExposure), Me.needsLights && to(rt, Ri), re && F.fog === !0 && fe.refreshFogUniforms(rt, re), fe.refreshMaterialUniforms(rt, F, pe, se, T.state.transmissionRenderTarget[_.id]), Me.needsLights && Me.lightProbeGrid) {
          const qe = Me.lightProbeGrid;
          rt.probesSH.value = qe.texture, rt.probesMin.value.copy(qe.boundingBox.min), rt.probesMax.value.copy(qe.boundingBox.max), rt.probesResolution.value.copy(qe.resolution);
        }
        Zn.upload(L, as(Me), rt, V);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Zn.upload(L, as(Me), rt, V), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && Ye.setValue(L, "center", N.center), Ye.setValue(L, "modelViewMatrix", N.modelViewMatrix), Ye.setValue(L, "normalMatrix", N.normalMatrix), Ye.setValue(L, "modelMatrix", N.matrixWorld), F.uniformsGroups !== void 0) {
        const qe = F.uniformsGroups;
        for (let en = 0, Ci = qe.length; en < Ci; en++) {
          const ls = qe[en];
          ve.update(ls, Pt), ve.bind(ls, Pt);
        }
      }
      return Pt;
    }
    function to(_, U) {
      _.ambientLightColor.needsUpdate = U, _.lightProbe.needsUpdate = U, _.directionalLights.needsUpdate = U, _.directionalLightShadows.needsUpdate = U, _.pointLights.needsUpdate = U, _.pointLightShadows.needsUpdate = U, _.spotLights.needsUpdate = U, _.spotLightShadows.needsUpdate = U, _.rectAreaLights.needsUpdate = U, _.hemisphereLights.needsUpdate = U;
    }
    function io(_) {
      return _.isMeshLambertMaterial || _.isMeshToonMaterial || _.isMeshPhongMaterial || _.isMeshStandardMaterial || _.isShadowMaterial || _.isShaderMaterial && _.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return G;
    }, this.getActiveMipmapLevel = function() {
      return q;
    }, this.getRenderTarget = function() {
      return O;
    }, this.setRenderTargetTextures = function(_, U, z) {
      const F = R.get(_);
      F.__autoAllocateDepthBuffer = _.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), R.get(_.texture).__webglTexture = U, R.get(_.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : z, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(_, U) {
      const z = R.get(_);
      z.__webglFramebuffer = U, z.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(_, U = 0, z = 0) {
      O = _, G = U, q = z;
      let F = null, N = !1, re = !1;
      if (_) {
        const ce = R.get(_);
        if (ce.__useDefaultFramebuffer !== void 0) {
          S.bindFramebuffer(L.FRAMEBUFFER, ce.__webglFramebuffer), ne.copy(_.viewport), de.copy(_.scissor), xe = _.scissorTest, S.viewport(ne), S.scissor(de), S.setScissorTest(xe), j = -1;
          return;
        } else if (ce.__webglFramebuffer === void 0) V.setupRenderTarget(_);
        else if (ce.__hasExternalTextures) V.rebindTextures(_, R.get(_.texture).__webglTexture, R.get(_.depthTexture).__webglTexture);
        else if (_.depthBuffer) {
          const Re = _.depthTexture;
          if (ce.__boundDepthTexture !== Re) {
            if (Re !== null && R.has(Re) && (_.width !== Re.image.width || _.height !== Re.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            V.setupDepthRenderbuffer(_);
          }
        }
        const me = _.texture;
        (me.isData3DTexture || me.isDataArrayTexture || me.isCompressedArrayTexture) && (re = !0);
        const ge = R.get(_).__webglFramebuffer;
        _.isWebGLCubeRenderTarget ? (Array.isArray(ge[U]) ? F = ge[U][z] : F = ge[U], N = !0) : _.samples > 0 && V.useMultisampledRTT(_) === !1 ? F = R.get(_).__webglMultisampledFramebuffer : Array.isArray(ge) ? F = ge[z] : F = ge, ne.copy(_.viewport), de.copy(_.scissor), xe = _.scissorTest;
      } else
        ne.copy(we).multiplyScalar(pe).floor(), de.copy(Pe).multiplyScalar(pe).floor(), xe = We;
      if (z !== 0 && (F = H), S.bindFramebuffer(L.FRAMEBUFFER, F) && S.drawBuffers(_, F), S.viewport(ne), S.scissor(de), S.setScissorTest(xe), N) {
        const ce = R.get(_.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + U, ce.__webglTexture, z);
      } else if (re) {
        const ce = U;
        for (let me = 0; me < _.textures.length; me++) {
          const ge = R.get(_.textures[me]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + me, ge.__webglTexture, z, ce);
        }
      } else if (_ !== null && z !== 0) {
        const ce = R.get(_.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, ce.__webglTexture, z);
      }
      j = -1;
    }, this.readRenderTargetPixels = function(_, U, z, F, N, re, ce, me = 0) {
      if (!(_ && _.isWebGLRenderTarget)) {
        Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ge = R.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) {
        S.bindFramebuffer(L.FRAMEBUFFER, ge);
        try {
          const Re = _.textures[me], Ne = Re.format, Fe = Re.type;
          if (_.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + me), !je.textureFormatReadable(Ne)) {
            Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!je.textureTypeReadable(Fe)) {
            Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= _.width - F && z >= 0 && z <= _.height - N && L.readPixels(U, z, F, N, $.convert(Ne), $.convert(Fe), re);
        } finally {
          const Re = O !== null ? R.get(O).__webglFramebuffer : null;
          S.bindFramebuffer(L.FRAMEBUFFER, Re);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(_, U, z, F, N, re, ce, me = 0) {
      if (!(_ && _.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ge = R.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) if (U >= 0 && U <= _.width - F && z >= 0 && z <= _.height - N) {
        S.bindFramebuffer(L.FRAMEBUFFER, ge);
        const Re = _.textures[me], Ne = Re.format, Fe = Re.type;
        if (_.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + me), !je.textureFormatReadable(Ne)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!je.textureTypeReadable(Fe)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const ye = L.createBuffer();
        L.bindBuffer(L.PIXEL_PACK_BUFFER, ye), L.bufferData(L.PIXEL_PACK_BUFFER, re.byteLength, L.STREAM_READ), L.readPixels(U, z, F, N, $.convert(Ne), $.convert(Fe), 0);
        const $e = O !== null ? R.get(O).__webglFramebuffer : null;
        S.bindFramebuffer(L.FRAMEBUFFER, $e);
        const tt = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return L.flush(), await il(L, tt, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, ye), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, re), L.deleteBuffer(ye), L.deleteSync(tt), re;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(_, U = null, z = 0) {
      const F = Math.pow(2, -z), N = Math.floor(_.image.width * F), re = Math.floor(_.image.height * F), ce = U !== null ? U.x : 0, me = U !== null ? U.y : 0;
      V.setTexture2D(_, 0), L.copyTexSubImage2D(L.TEXTURE_2D, z, 0, 0, ce, me, N, re), S.unbindTexture();
    }, this.copyTextureToTexture = function(_, U, z = null, F = null, N = 0, re = 0) {
      let ce, me, ge, Re, Ne, Fe, ye, $e, tt;
      const it = _.isCompressedTexture ? _.mipmaps[re] : _.image;
      if (z !== null)
        ce = z.max.x - z.min.x, me = z.max.y - z.min.y, ge = z.isBox3 ? z.max.z - z.min.z : 1, Re = z.min.x, Ne = z.min.y, Fe = z.isBox3 ? z.min.z : 0;
      else {
        const rt = Math.pow(2, -N);
        ce = Math.floor(it.width * rt), me = Math.floor(it.height * rt), _.isDataArrayTexture ? ge = it.depth : _.isData3DTexture ? ge = Math.floor(it.depth * rt) : ge = 1, Re = 0, Ne = 0, Fe = 0;
      }
      F !== null ? (ye = F.x, $e = F.y, tt = F.z) : (ye = 0, $e = 0, tt = 0);
      const Ge = $.convert(U.format), mt = $.convert(U.type);
      let Me;
      U.isData3DTexture ? (V.setTexture3D(U, 0), Me = L.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (V.setTexture2DArray(U, 0), Me = L.TEXTURE_2D_ARRAY) : (V.setTexture2D(U, 0), Me = L.TEXTURE_2D), S.activeTexture(L.TEXTURE0), S.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, U.flipY), S.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), S.pixelStorei(L.UNPACK_ALIGNMENT, U.unpackAlignment);
      const Ut = S.getParameter(L.UNPACK_ROW_LENGTH), ke = S.getParameter(L.UNPACK_IMAGE_HEIGHT), Pt = S.getParameter(L.UNPACK_SKIP_PIXELS), Gt = S.getParameter(L.UNPACK_SKIP_ROWS), ri = S.getParameter(L.UNPACK_SKIP_IMAGES);
      S.pixelStorei(L.UNPACK_ROW_LENGTH, it.width), S.pixelStorei(L.UNPACK_IMAGE_HEIGHT, it.height), S.pixelStorei(L.UNPACK_SKIP_PIXELS, Re), S.pixelStorei(L.UNPACK_SKIP_ROWS, Ne), S.pixelStorei(L.UNPACK_SKIP_IMAGES, Fe);
      const Ri = _.isDataArrayTexture || _.isData3DTexture, Ye = U.isDataArrayTexture || U.isData3DTexture;
      if (_.isDepthTexture) {
        const rt = R.get(_), si = R.get(U), qe = R.get(rt.__renderTarget), en = R.get(si.__renderTarget);
        S.bindFramebuffer(L.READ_FRAMEBUFFER, qe.__webglFramebuffer), S.bindFramebuffer(L.DRAW_FRAMEBUFFER, en.__webglFramebuffer);
        for (let Ci = 0; Ci < ge; Ci++)
          Ri && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, R.get(_).__webglTexture, N, Fe + Ci), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, R.get(U).__webglTexture, re, tt + Ci)), L.blitFramebuffer(Re, Ne, ce, me, ye, $e, ce, me, L.DEPTH_BUFFER_BIT, L.NEAREST);
        S.bindFramebuffer(L.READ_FRAMEBUFFER, null), S.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (N !== 0 || _.isRenderTargetTexture || R.has(_)) {
        const rt = R.get(_), si = R.get(U);
        S.bindFramebuffer(L.READ_FRAMEBUFFER, K), S.bindFramebuffer(L.DRAW_FRAMEBUFFER, k);
        for (let qe = 0; qe < ge; qe++)
          Ri ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, rt.__webglTexture, N, Fe + qe) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, rt.__webglTexture, N), Ye ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, si.__webglTexture, re, tt + qe) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, si.__webglTexture, re), N !== 0 ? L.blitFramebuffer(Re, Ne, ce, me, ye, $e, ce, me, L.COLOR_BUFFER_BIT, L.NEAREST) : Ye ? L.copyTexSubImage3D(Me, re, ye, $e, tt + qe, Re, Ne, ce, me) : L.copyTexSubImage2D(Me, re, ye, $e, Re, Ne, ce, me);
        S.bindFramebuffer(L.READ_FRAMEBUFFER, null), S.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else Ye ? _.isDataTexture || _.isData3DTexture ? L.texSubImage3D(Me, re, ye, $e, tt, ce, me, ge, Ge, mt, it.data) : U.isCompressedArrayTexture ? L.compressedTexSubImage3D(Me, re, ye, $e, tt, ce, me, ge, Ge, it.data) : L.texSubImage3D(Me, re, ye, $e, tt, ce, me, ge, Ge, mt, it) : _.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, re, ye, $e, ce, me, Ge, mt, it.data) : _.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, re, ye, $e, it.width, it.height, Ge, it.data) : L.texSubImage2D(L.TEXTURE_2D, re, ye, $e, ce, me, Ge, mt, it);
      S.pixelStorei(L.UNPACK_ROW_LENGTH, Ut), S.pixelStorei(L.UNPACK_IMAGE_HEIGHT, ke), S.pixelStorei(L.UNPACK_SKIP_PIXELS, Pt), S.pixelStorei(L.UNPACK_SKIP_ROWS, Gt), S.pixelStorei(L.UNPACK_SKIP_IMAGES, ri), re === 0 && U.generateMipmaps && L.generateMipmap(Me), S.unbindTexture();
    }, this.initRenderTarget = function(_) {
      R.get(_).__webglFramebuffer === void 0 && V.setupRenderTarget(_);
    }, this.initTexture = function(_) {
      _.isCubeTexture ? V.setTextureCube(_, 0) : _.isData3DTexture ? V.setTexture3D(_, 0) : _.isDataArrayTexture || _.isCompressedArrayTexture ? V.setTexture2DArray(_, 0) : V.setTexture2D(_, 0), S.unbindTexture();
    }, this.resetState = function() {
      G = 0, q = 0, O = null, S.reset(), ue.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Ki;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = ze._getDrawingBufferColorSpace(e), t.unpackColorSpace = ze._getUnpackColorSpace();
  }
}, $a = `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uRadius;
  uniform float uInfluence;
  uniform float uMaxAngle;
  uniform float uStiffness;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;

  vec3 deformSticker(vec3 base) {
    float transition = smoothstep(0.0, 0.018, uPeel);
    if (transition <= 0.0) return base;

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = base.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float influence = max(uInfluence, 0.001);
    float sideRatio = abs(side) / influence;
    float frontShape = max(0.0, 1.0 - sideRatio * sideRatio);
    float front = uPeelDepth * frontShape;
    float arcDistance = front - along;
    float peelMask = step(0.0, arcDistance) * step(sideRatio, 1.0) * transition;
    if (peelMask <= 0.0) return base;

    float radius = max(uRadius * mix(0.76, 1.22, uStiffness), 0.008);
    float maxAngle = clamp(uMaxAngle, 1.1, 4.25);
    float arcLength = radius * maxAngle;
    float angle = min(arcDistance / radius, maxAngle);
    float projected = -radius * sin(angle);
    float elevation = radius * (1.0 - cos(angle));

    if (arcDistance > arcLength) {
      float freeLength = arcDistance - arcLength;
      projected += -freeLength * cos(maxAngle);
      elevation += freeLength * sin(maxAngle);
    }

    vec3 curved = base;
    vec2 crease = base.xy + direction * (front - along);
    curved.xy = crease + direction * projected;
    curved.z = max(0.008, elevation);

    float edgeWeight = smoothstep(0.0, max(front, 0.001), arcDistance);
    float windWave = sin(uTime * 8.168 + side * 10.7) *
      sin(uTime * 3.41 + arcDistance * 6.3);
    curved.z += windWave * uWind * 0.026 * edgeWeight;
    curved.xy += tangent * windWave * uWind * 0.012 * edgeWeight;
    return mix(base, curved, peelMask);
  }
`, Bu = `
  ${$a}

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCrease;
  varying float vCurl;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    float epsilon = max(min(uMeshSize.x, uMeshSize.y) * 0.0024, 0.001);
    vec3 deformedX = deformSticker(position + vec3(epsilon, 0.0, 0.0));
    vec3 deformedY = deformSticker(position + vec3(0.0, epsilon, 0.0));
    vec3 localNormal = normalize(cross(deformedX - deformed, deformedY - deformed));

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = position.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float sideRatio = abs(side) / max(uInfluence, 0.001);
    float front = uPeelDepth * max(0.0, 1.0 - sideRatio * sideRatio);
    float arcDistance = max(front - along, 0.0);
    float peelMask = step(along, front) * step(sideRatio, 1.0) * smoothstep(0.0, 0.018, uPeel);
    float effectiveRadius = max(uRadius * mix(0.76, 1.22, uStiffness), 0.008);
    float normalizedArc = arcDistance / effectiveRadius;

    vLift = max(deformed.z, 0.0);
    vCrease = peelMask * exp(-arcDistance / max(effectiveRadius * 0.32, 0.004));
    vCurl = peelMask * sin(clamp(normalizedArc, 0.0, 3.14159265));

    vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormalView = normalize(normalMatrix * localNormal);
    gl_Position = projectionMatrix * viewPosition;
  }
`, zu = `
  uniform sampler2D uMap;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCrease;
  varying float vCurl;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    vec4 printSample = texture2D(uMap, vUv);
    if (printSample.a < 0.018) discard;

    vec3 normal = normalize(vNormalView);
    if (!gl_FrontFacing) normal *= -1.0;
    vec3 viewDirection = normalize(-vViewPosition);
    vec3 lightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float diffuse = 0.78 + 0.22 * max(dot(normal, lightDirection), 0.0);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    vec3 color;
    if (gl_FrontFacing) {
      float printHighlight = pow(max(dot(normal, halfDirection), 0.0), 42.0) * 0.055;
      color = printSample.rgb * diffuse + printHighlight;
      color += fresnel * 0.025;
    } else {
      float exponent = mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0));
      float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
      specular *= mix(0.06, 0.3, uGloss) * (1.0 - uRoughness * 0.58);
      float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
      color = uBackColor * (0.82 + 0.18 * max(dot(normal, lightDirection), 0.0));
      color += specular + fresnel * (0.055 + 0.085 * uGloss) + satinBand + micro;
    }

    color *= 1.0 - vCrease * 0.11;
    float rim = smoothstep(0.02, 0.24, printSample.a);
    color *= mix(0.9, 1.0, rim);
    gl_FragColor = vec4(color, printSample.a);
  }
`, Vu = `
  ${$a}

  uniform vec2 uShadowDirection;
  uniform float uShadowDistance;
  uniform float uShadowLayer;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    float height = max(deformed.z, 0.0);
    float projection = (0.14 + height * 3.2) * uShadowLayer;
    deformed.xy += uShadowDirection * uShadowDistance * projection;
    deformed.z = -0.075 - uShadowLayer * 0.004;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`, Gu = `
  uniform sampler2D uMap;
  uniform vec2 uTexel;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uShadowBlur;
  uniform float uBlurScale;
  uniform float uLayerWeight;
  varying vec2 vUv;

  void main() {
    vec2 stepSize = uTexel * max(uShadowBlur, 0.25) * uBlurScale;
    float alpha = texture2D(uMap, vUv).a * 0.2;
    alpha += texture2D(uMap, vUv + vec2(stepSize.x, 0.0)).a * 0.11;
    alpha += texture2D(uMap, vUv - vec2(stepSize.x, 0.0)).a * 0.11;
    alpha += texture2D(uMap, vUv + vec2(0.0, stepSize.y)).a * 0.11;
    alpha += texture2D(uMap, vUv - vec2(0.0, stepSize.y)).a * 0.11;
    alpha += texture2D(uMap, vUv + stepSize).a * 0.09;
    alpha += texture2D(uMap, vUv - stepSize).a * 0.09;
    alpha += texture2D(uMap, vUv + vec2(stepSize.x, -stepSize.y)).a * 0.09;
    alpha += texture2D(uMap, vUv + vec2(-stepSize.x, stepSize.y)).a * 0.09;
    alpha = smoothstep(0.0, 0.78, alpha);
    if (alpha < 0.006) discard;
    gl_FragColor = vec4(uShadowColor, alpha * uShadowOpacity * uLayerWeight);
  }
`, Xr = 1536, ir = 320;
function Ti(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function na(e) {
  if (!e) return null;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function Hu(e) {
  if (e.length > 2e6) throw new Error("SVG markup must be smaller than 2 MB.");
  const t = new DOMParser().parseFromString(e, "image/svg+xml");
  if (t.querySelector("parsererror")) throw new Error("The SVG could not be parsed.");
  const i = t.documentElement;
  if (i.localName.toLowerCase() !== "svg") throw new Error("The uploaded file is not an SVG document.");
  i.querySelectorAll("script, foreignObject, iframe, object, embed, audio, video, canvas, style, animate, animateMotion, animateTransform, set").forEach((n) => n.remove());
  for (const n of [i, ...Array.from(i.querySelectorAll("*"))]) for (const r of Array.from(n.attributes)) {
    const s = r.name.toLowerCase(), a = r.value.trim();
    if (s.startsWith("on")) {
      n.removeAttribute(r.name);
      continue;
    }
    if (s === "href" || s === "xlink:href") {
      a.startsWith("#") || n.removeAttribute(r.name);
      continue;
    }
    /url\s*\(/i.test(a) && !/url\s*\(\s*["']?#/i.test(a) && n.removeAttribute(r.name), (/^javascript:/i.test(a) || /^data:text\/html/i.test(a)) && n.removeAttribute(r.name);
  }
  return i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(i);
}
function ku(e) {
  const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement, i = t.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (i?.length === 4 && Number.isFinite(i[2]) && Number.isFinite(i[3]) && i[2] > 0 && i[3] > 0) return Ti(i[2] / i[3], 0.15, 8);
  const n = na(t.getAttribute("width")), r = na(t.getAttribute("height"));
  return n && r ? Ti(n / r, 0.15, 8) : 1;
}
async function Wu(e) {
  const t = new Blob([e], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(t);
  try {
    const n = new Image();
    return n.decoding = "async", n.src = i, await n.decode(), n;
  } finally {
    URL.revokeObjectURL(i);
  }
}
async function Xu(e) {
  const t = e.fontFamily ?? "Arial Rounded MT Bold, Arial Black, sans-serif", i = e.fontWeight ?? 900;
  let n = 300;
  const r = document.createElement("canvas").getContext("2d");
  if (!r) throw new Error("Canvas 2D is unavailable.");
  if (document.fonts?.load) try {
    await document.fonts.load(`${i} ${n}px ${t}`);
  } catch {
  }
  const s = e.text || " ";
  r.font = `${i} ${n}px ${t}`;
  let a = r.measureText(s);
  const o = Math.max(1, a.width);
  o > 1240 && (n *= 1240 / o, r.font = `${i} ${n}px ${t}`, a = r.measureText(s));
  const c = a.actualBoundingBoxAscent || Math.max(n * 0.76, 1), l = a.actualBoundingBoxDescent || Math.max(n * 0.2, 1), u = 128, f = Ti(Math.ceil(a.width + u * 2), ir, Xr), h = Ti(Math.ceil(c + l + u * 2), ir, 960), p = document.createElement("canvas");
  p.width = f, p.height = h;
  const M = p.getContext("2d", { willReadFrequently: !0 });
  if (!M) throw new Error("Canvas 2D is unavailable.");
  return M.clearRect(0, 0, f, h), M.font = `${i} ${n}px ${t}`, M.textBaseline = "alphabetic", M.textAlign = "center", M.fillStyle = e.color ?? "#19191d", M.fillText(s, f / 2, (h + c - l) / 2), p;
}
async function qu(e) {
  const t = Hu(e.svg), i = ku(t), n = 1210, r = 128, s = i >= 1 ? n : n * i, a = i >= 1 ? n / i : n, o = Ti(Math.ceil(s + r * 2), ir, Xr), c = Ti(Math.ceil(a + r * 2), ir, Xr), l = document.createElement("canvas");
  l.width = o, l.height = c;
  const u = l.getContext("2d", { willReadFrequently: !0 });
  if (!u) throw new Error("Canvas 2D is unavailable.");
  const f = await Wu(t);
  return u.drawImage(f, r, r, o - r * 2, c - r * 2), l;
}
function Yu(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d");
  if (!n) throw new Error("Canvas 2D is unavailable.");
  return n.fillStyle = t, n.fillRect(0, 0, i.width, i.height), n.globalCompositeOperation = "destination-in", n.drawImage(e, 0, 0), i;
}
function Ku(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d", { willReadFrequently: !0 });
  if (!n) throw new Error("Canvas 2D is unavailable.");
  const r = Ti(t.width * 2.35, 0, 112);
  if (r > 0.25) {
    const s = Yu(e, t.color), a = Math.max(1, Math.min(12, Math.ceil(r / 7))), o = r > 48 ? 32 : 24;
    for (let c = 1; c <= a; c += 1) {
      const l = r * c / a;
      for (let u = 0; u < o; u += 1) {
        const f = u / o * Math.PI * 2;
        n.drawImage(s, Math.cos(f) * l, Math.sin(f) * l);
      }
    }
  }
  return n.drawImage(e, 0, 0), i;
}
async function Zu(e, t) {
  const i = Ku(e.type === "text" ? await Xu(e) : await qu(e), t), n = i.getContext("2d", { willReadFrequently: !0 });
  if (!n) throw new Error("Canvas 2D is unavailable.");
  const r = n.getImageData(0, 0, i.width, i.height), s = new Uint8ClampedArray(i.width * i.height);
  for (let a = 3, o = 0; a < r.data.length; a += 4)
    s[o] = r.data[a], o += 1;
  return {
    canvas: i,
    width: i.width,
    height: i.height,
    aspect: i.width / i.height,
    alpha: s
  };
}
var $u = {
  source: void 0,
  outline: {
    width: 18,
    color: "#ffffff"
  },
  shadow: {
    color: "#191823",
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    release: "reset"
  },
  back: {
    color: "#f7f5f2",
    gloss: 0.7,
    roughness: 0.3
  },
  tilt: -3,
  wind: 0,
  quality: "high"
};
function ra(e, t = {}) {
  const i = e ?? $u;
  return {
    source: t.source ?? i.source,
    outline: {
      ...i.outline,
      ...t.outline
    },
    shadow: {
      ...i.shadow,
      ...t.shadow
    },
    peel: {
      ...i.peel,
      ...t.peel
    },
    back: {
      ...i.back,
      ...t.back
    },
    tilt: t.tilt ?? i.tilt,
    wind: t.wind ?? i.wind,
    quality: t.quality ?? i.quality
  };
}
var Si = {
  type: "text",
  text: "PEEL ME",
  color: "#19191d",
  fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
  fontWeight: 900
};
function At(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function qn(e, t) {
  try {
    return new He(e);
  } catch {
    return new He(t);
  }
}
function sa(e, t) {
  return {
    ...e,
    ...t,
    outline: {
      ...e.outline,
      ...t.outline
    },
    shadow: {
      ...e.shadow,
      ...t.shadow
    },
    peel: {
      ...e.peel,
      ...t.peel
    },
    back: {
      ...e.back,
      ...t.back
    }
  };
}
var Ju = class {
  constructor(e, t = {}) {
    this.camera = new Jr(-1, 1, 1, -1, 0.01, 10), this.scene = new Il(), this.shadowMaterials = [], this.shadowMeshes = [], this.geometry = new tr(1, 1, 2, 2), this.texture = null, this.artwork = null, this.source = Si, this.requestedSource = Si, this.sourceRevision = 0, this.sourceRebuildTimer = null, this.destroyed = !1, this.resizeObserver = null, this.viewWidth = 2, this.viewHeight = 2, this.meshWidth = 1.6, this.meshHeight = 0.62, this.pointerId = null, this.grabOrigin = new Ie(-0.8, 0), this.grabStart = new Ie(), this.grabDirection = new Ie(1, 0), this.activeDirection = new Ie(1, 0), this.grabExtent = 1.6, this.springVelocity = 0, this.springActive = !1, this.frameRequest = 0, this.lastFrameTime = 0, this.state = {
      ready: !1,
      dragging: !1,
      progress: 0,
      grabPoint: null,
      pointer: null
    }, this.resize = () => {
      if (this.destroyed) return;
      const n = this.container.getBoundingClientRect(), r = Math.max(2, Math.round(n.width || 640)), s = Math.max(2, Math.round(n.height || 420)), a = this.options.quality === "low" ? 1.25 : 2;
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, a)), this.renderer.setSize(r, s, !1), this.viewHeight = 2, this.viewWidth = r / s * this.viewHeight, this.camera.left = -this.viewWidth / 2, this.camera.right = this.viewWidth / 2, this.camera.top = this.viewHeight / 2, this.camera.bottom = -this.viewHeight / 2, this.camera.updateProjectionMatrix(), this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.applyOptionsToRenderer(), this.requestRender();
    }, this.onPointerDown = (n) => {
      if (this.destroyed || !this.state.ready || n.button !== 0) return;
      const r = this.screenToLocal(n.clientX, n.clientY), s = this.hitEdge(r);
      s && (n.preventDefault(), this.renderer.domElement.focus({ preventScroll: !0 }), this.renderer.domElement.setPointerCapture(n.pointerId), this.pointerId = n.pointerId, this.grabOrigin.copy(s.local), this.grabStart.copy(s.local), this.grabDirection.copy(s.inward), this.activeDirection.copy(s.inward), this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), this.springActive = !1, this.springVelocity = 0, this.state.dragging = !0, this.state.progress = Math.max(this.state.progress, 0.018), this.state.grabPoint = {
        x: s.local.x,
        y: s.local.y
      }, this.state.pointer = {
        x: s.local.x,
        y: s.local.y
      }, this.renderer.domElement.style.cursor = "grabbing", this.updatePeelUniforms(), this.emit("peelstart", {
        amount: this.state.progress,
        progress: this.state.progress,
        origin: this.state.grabPoint
      }), this.requestRender());
    }, this.onPointerMove = (n) => {
      if (this.destroyed || !this.state.ready) return;
      const r = this.screenToLocal(n.clientX, n.clientY);
      if (!this.state.dragging || n.pointerId !== this.pointerId) {
        this.renderer.domElement.style.cursor = this.hitEdge(r) ? "grab" : "default";
        return;
      }
      n.preventDefault();
      const s = r.clone().sub(this.grabStart), a = s.length();
      if (this.activeDirection.copy(this.grabDirection), a > 1e-3) {
        const c = s.clone().normalize();
        c.dot(this.grabDirection) > -0.35 && this.activeDirection.multiplyScalar(0.72).add(c.multiplyScalar(0.28)).normalize();
      }
      this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection);
      const o = Math.max(0, s.dot(this.activeDirection)) * 0.76 + a * 0.4;
      this.state.progress = At(o / Math.max(this.grabExtent * 0.64, 0.08), 0.018, 1), this.state.pointer = {
        x: r.x,
        y: r.y
      }, this.updatePeelUniforms(), this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress,
        direction: {
          x: this.activeDirection.x,
          y: this.activeDirection.y
        }
      }), this.requestRender();
    }, this.onPointerUp = (n) => {
      if (!this.state.dragging || n.pointerId !== this.pointerId) return;
      this.renderer.domElement.hasPointerCapture(n.pointerId) && this.renderer.domElement.releasePointerCapture(n.pointerId), this.pointerId = null, this.state.dragging = !1, this.renderer.domElement.style.cursor = "grab";
      const r = this.options.peel.release, s = r === "reset" || r === "snap" && this.state.progress < 0.68, a = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (s && !a && (this.springActive = !0, this.springVelocity = 0), this.emit("peelend", {
        amount: this.state.progress,
        progress: this.state.progress,
        willReset: s
      }), s && a) {
        this.reset();
        return;
      }
      this.requestRender();
    }, this.onPointerLeave = () => {
      this.state.dragging || (this.renderer.domElement.style.cursor = "default");
    }, this.onKeyDown = (n) => {
      if (!this.state.ready) return;
      const r = n.key === "ArrowUp" || n.key === "ArrowRight", s = n.key === "ArrowDown" || n.key === "ArrowLeft";
      if (!(!r && !s && n.key !== " ")) {
        if (n.preventDefault(), n.key === " ") {
          this.reset();
          return;
        }
        this.grabOrigin.set(-this.meshWidth / 2, 0), this.activeDirection.set(1, 0), this.grabDirection.copy(this.activeDirection), this.grabExtent = this.meshWidth, this.state.progress = At(this.state.progress + (r ? 0.08 : -0.08), 0, 1), this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        }), this.requestRender();
      }
    }, this.onContextLost = (n) => {
      n.preventDefault(), this.emit("error", { message: "The WebGL context was lost. Reload the page to restore the sticker." });
    }, this.renderFrame = (n) => {
      if (this.frameRequest = 0, this.destroyed) return;
      const r = this.lastFrameTime ? Math.min((n - this.lastFrameTime) / 1e3, 1 / 20) : 1 / 60;
      this.lastFrameTime = n;
      const s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (this.springActive && s) {
        this.reset();
        return;
      }
      if (this.springActive) {
        const o = 132 + At(this.options.peel.stiffness, 0, 1) * 146, c = Math.sqrt(o) * 1.83, l = -o * this.state.progress - c * this.springVelocity;
        this.springVelocity += l * r, this.state.progress += this.springVelocity * r, this.state.progress <= 8e-4 && Math.abs(this.springVelocity) < 0.018 ? (this.state.progress = 0, this.springVelocity = 0, this.springActive = !1, this.state.pointer = null, this.state.grabPoint = null) : this.state.progress = Math.max(0, this.state.progress), this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      }
      this.uniforms.uTime.value = n / 1e3, this.renderer.render(this.scene, this.camera);
      const a = !s && this.options.wind > 1e-3 && this.state.progress > 0.01;
      (this.springActive || a) && this.requestRender();
    }, this.container = e, this.options = ra(void 0, t), this.camera.position.z = 3, this.renderer = new Ou({
      alpha: !0,
      antialias: !0,
      powerPreference: "high-performance",
      premultipliedAlpha: !0
    }), this.renderer.setClearColor(0, 0), this.renderer.outputColorSpace = wt, this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.cursor = "default", this.renderer.domElement.tabIndex = 0, this.renderer.domElement.setAttribute("role", "slider"), this.renderer.domElement.setAttribute("aria-valuemin", "0"), this.renderer.domElement.setAttribute("aria-valuemax", "100"), this.renderer.domElement.setAttribute("aria-valuenow", "0"), this.renderer.domElement.setAttribute("aria-label", "Interactive sticker. Drag a visible edge, or use arrow keys to preview the peel."), this.renderer.domElement.setAttribute("aria-keyshortcuts", "ArrowUp ArrowRight ArrowDown ArrowLeft Space"), e.appendChild(this.renderer.domElement), this.uniforms = {
      uMap: { value: null },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
      uRadius: { value: 0.08 },
      uInfluence: { value: 0.2 },
      uMaxAngle: { value: 3.55 },
      uStiffness: { value: this.options.peel.stiffness },
      uWind: { value: this.options.wind },
      uTime: { value: 0 },
      uOrigin: { value: this.grabOrigin.clone() },
      uPeelDir: { value: this.activeDirection.clone() },
      uMeshSize: { value: new Ie(this.meshWidth, this.meshHeight) },
      uTexel: { value: new Ie(1 / 1024, 1 / 512) },
      uBackColor: { value: qn(this.options.back.color, "#f7f5f2") },
      uGloss: { value: this.options.back.gloss },
      uRoughness: { value: this.options.back.roughness },
      uShadowColor: { value: qn(this.options.shadow.color, "#191823") },
      uShadowOpacity: { value: this.options.shadow.opacity },
      uShadowBlur: { value: this.options.shadow.blur },
      uShadowDistance: { value: 0.04 },
      uShadowDirection: { value: new Ie(0.7, -0.7) }
    }, this.stickerMaterial = new Dt({
      uniforms: { ...this.uniforms },
      vertexShader: Bu,
      fragmentShader: zu,
      side: 2,
      transparent: !0,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMaterial.alphaTest = 8e-3, this.stickerMesh = new zt(this.geometry, this.stickerMaterial), this.stickerMesh.renderOrder = 20;
    for (const n of [
      {
        layer: 0.3,
        weight: 0.4,
        blur: 0.46
      },
      {
        layer: 0.64,
        weight: 0.34,
        blur: 0.82
      },
      {
        layer: 1,
        weight: 0.24,
        blur: 1.28
      }
    ]) {
      const r = new Dt({
        uniforms: {
          ...this.uniforms,
          uShadowLayer: { value: n.layer },
          uLayerWeight: { value: n.weight },
          uBlurScale: { value: n.blur }
        },
        vertexShader: Vu,
        fragmentShader: Gu,
        side: 2,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1
      }), s = new zt(this.geometry, r);
      s.renderOrder = Math.round(n.layer * 10), this.shadowMaterials.push(r), this.shadowMeshes.push(s), this.scene.add(s);
    }
    this.scene.add(this.stickerMesh);
    const i = this.renderer.domElement;
    i.addEventListener("pointerdown", this.onPointerDown), i.addEventListener("pointermove", this.onPointerMove), i.addEventListener("pointerup", this.onPointerUp), i.addEventListener("pointercancel", this.onPointerUp), i.addEventListener("pointerleave", this.onPointerLeave), i.addEventListener("keydown", this.onKeyDown), i.addEventListener("webglcontextlost", this.onContextLost), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(e)) : window.addEventListener("resize", this.resize), this.resize(), this.applyOptionsToRenderer();
  }
  async setSource(e) {
    if (this.destroyed) return;
    this.requestedSource = e, this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null);
    const t = ++this.sourceRevision;
    try {
      const i = await Zu(e, this.options.outline);
      if (this.destroyed || t !== this.sourceRevision) return;
      this.source = e, this.options.source = e, this.applyArtwork(i);
    } catch (i) {
      const n = i instanceof Error ? i.message : "The sticker source failed to render.";
      throw this.emit("error", { message: n }), i;
    }
  }
  setOptions(e) {
    if (this.destroyed) return;
    const t = this.options.outline, i = this.options.quality;
    this.options = ra(this.options, e), this.applyOptionsToRenderer(), e.source && this.setSource(e.source).catch(() => {
    }), e.outline && (this.options.outline.width !== t.width || this.options.outline.color !== t.color) && !e.source && (this.sourceRebuildTimer !== null && window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = window.setTimeout(() => {
      this.sourceRebuildTimer = null, this.setSource(this.requestedSource).catch(() => {
      });
    }, 70)), this.options.quality !== i && this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.requestRender();
  }
  reset() {
    this.springActive = !1, this.springVelocity = 0, this.state.progress = 0, this.state.dragging = !1, this.state.pointer = null, this.state.grabPoint = null, this.pointerId = null, this.updatePeelUniforms(), this.emit("peelchange", {
      amount: 0,
      progress: 0
    }), this.requestRender();
  }
  getState() {
    return {
      ready: this.state.ready,
      dragging: this.state.dragging,
      progress: this.state.progress,
      grabPoint: this.state.grabPoint ? { ...this.state.grabPoint } : null,
      pointer: this.state.pointer ? { ...this.state.pointer } : null
    };
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = !0, cancelAnimationFrame(this.frameRequest), this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null), this.resizeObserver?.disconnect(), window.removeEventListener("resize", this.resize);
    const e = this.renderer.domElement;
    e.removeEventListener("pointerdown", this.onPointerDown), e.removeEventListener("pointermove", this.onPointerMove), e.removeEventListener("pointerup", this.onPointerUp), e.removeEventListener("pointercancel", this.onPointerUp), e.removeEventListener("pointerleave", this.onPointerLeave), e.removeEventListener("keydown", this.onKeyDown), e.removeEventListener("webglcontextlost", this.onContextLost), this.texture?.dispose(), this.geometry.dispose(), this.stickerMaterial.dispose(), this.shadowMaterials.forEach((t) => t.dispose()), this.renderer.dispose(), this.renderer.forceContextLoss(), e.remove();
  }
  applyArtwork(e) {
    this.artwork = e;
    const t = new Wl(e.canvas);
    t.colorSpace = wt, t.minFilter = Et, t.magFilter = Et, t.generateMipmaps = !0, t.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy()), t.needsUpdate = !0;
    const i = this.texture;
    this.texture = t, this.uniforms.uMap.value = t, this.uniforms.uTexel.value.set(1 / e.width, 1 / e.height), this.updateMeshGeometry(e.aspect), this.reset(), this.state.ready = !0, i?.dispose(), this.emit("ready", {
      width: e.width,
      height: e.height
    });
  }
  updateMeshGeometry(e) {
    const t = Math.max(1.1, this.viewWidth * 0.78), i = this.viewHeight * 0.58;
    let n = t, r = n / e;
    r > i && (r = i, n = r * e), this.meshWidth = Math.max(0.34, n), this.meshHeight = Math.max(0.25, r);
    const s = this.options.quality === "high" ? 112 : this.options.quality === "medium" ? 72 : 40, a = At(Math.round(s), 28, 128), o = At(Math.round(s / Math.max(e, 0.35)), 24, 112), c = new tr(this.meshWidth, this.meshHeight, a, o), l = this.geometry;
    this.geometry = c, this.stickerMesh.geometry = c, this.shadowMeshes.forEach((u) => {
      u.geometry = c;
    }), l.dispose(), this.uniforms.uMeshSize.value.set(this.meshWidth, this.meshHeight), this.grabOrigin.set(-this.meshWidth / 2, 0), this.grabDirection.set(1, 0), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.meshWidth, this.applyOptionsToRenderer(), this.updatePeelUniforms();
  }
  applyOptionsToRenderer() {
    const e = tn.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = e, this.shadowMeshes.forEach((o) => {
      o.rotation.z = e;
    }), this.uniforms.uBackColor.value = qn(this.options.back.color, "#f7f5f2"), this.uniforms.uGloss.value = At(this.options.back.gloss, 0, 1), this.uniforms.uRoughness.value = At(this.options.back.roughness, 0, 1), this.uniforms.uStiffness.value = At(this.options.peel.stiffness, 0, 1), this.uniforms.uWind.value = Math.max(0, this.options.wind);
    const t = this.options.peel.maxAngle;
    this.uniforms.uMaxAngle.value = t > Math.PI * 2 ? tn.degToRad(t) : t;
    const i = this.options.peel.radius, n = this.container.getBoundingClientRect();
    this.uniforms.uRadius.value = i <= 1 ? Math.max(8e-3, Math.min(this.meshWidth, this.meshHeight) * i) : Math.max(8e-3, i / Math.max(n.height, 1) * this.viewHeight), this.uniforms.uShadowColor.value = qn(this.options.shadow.color, "#191823"), this.uniforms.uShadowOpacity.value = At(this.options.shadow.opacity, 0, 0.9);
    const r = this.meshWidth / Math.max(this.viewWidth, 1e-3) * Math.max(n.width, 1), s = this.artwork ? this.artwork.width / Math.max(r, 1) : 1;
    this.uniforms.uShadowBlur.value = Math.max(0, this.options.shadow.blur) * s * 0.34, this.uniforms.uShadowDistance.value = Math.max(0, this.options.shadow.distance) / Math.max(n.width || 1, 1) * this.viewWidth;
    const a = tn.degToRad(this.options.shadow.angle);
    this.uniforms.uShadowDirection.value.set(Math.cos(a), -Math.sin(a)).normalize();
  }
  updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress, this.uniforms.uPeelDepth.value = this.state.progress * this.grabExtent * 0.92, this.uniforms.uInfluence.value = tn.lerp(this.meshHeight * 0.18, Math.hypot(this.meshWidth, this.meshHeight) * 0.72, Math.pow(this.state.progress, 0.58)), this.uniforms.uOrigin.value.copy(this.grabOrigin), this.uniforms.uPeelDir.value.copy(this.activeDirection);
    const e = Math.round(At(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(e)), this.renderer.domElement.setAttribute("aria-valuetext", `${e}% peeled`);
  }
  screenToLocal(e, t) {
    const i = this.renderer.domElement.getBoundingClientRect(), n = (e - i.left) / Math.max(i.width, 1) * 2 - 1, r = 1 - (t - i.top) / Math.max(i.height, 1) * 2, s = n * (this.viewWidth / 2), a = r * (this.viewHeight / 2), o = -tn.degToRad(this.options.tilt), c = Math.cos(o), l = Math.sin(o);
    return new Ie(s * c - a * l, s * l + a * c);
  }
  sampleAlpha(e, t) {
    if (!this.artwork) return 0;
    const i = At(Math.round(e), 0, this.artwork.width - 1), n = At(Math.round(t), 0, this.artwork.height - 1);
    return this.artwork.alpha[n * this.artwork.width + i] / 255;
  }
  hitEdge(e) {
    if (!this.artwork) return null;
    const t = e.x / this.meshWidth + 0.5, i = e.y / this.meshHeight + 0.5;
    if (t < -0.04 || t > 1.04 || i < -0.04 || i > 1.04) return null;
    const n = t * (this.artwork.width - 1), r = (1 - i) * (this.artwork.height - 1), s = this.renderer.domElement.getBoundingClientRect(), a = this.meshWidth / Math.max(this.viewWidth, 1e-3) * s.width, o = this.artwork.width / Math.max(a, 1), c = At(this.options.peel.grabWidth * o, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13);
    let l = this.sampleAlpha(n, r), u = l;
    for (let p = 0; p < 20; p += 1) {
      const M = p / 20 * Math.PI * 2, E = this.sampleAlpha(n + Math.cos(M) * c, r + Math.sin(M) * c);
      l = Math.min(l, E), u = Math.max(u, E);
    }
    if (u < 0.12 || l > 0.88) return null;
    const f = Math.max(2, c * 0.46), h = new Ie(this.sampleAlpha(n + f, r) - this.sampleAlpha(n - f, r), -(this.sampleAlpha(n, r + f) - this.sampleAlpha(n, r - f)));
    return h.lengthSq() < 8e-3 && h.set(-e.x, -e.y), h.lengthSq() < 1e-4 && h.set(1, 0), h.normalize(), {
      local: e.clone(),
      inward: h
    };
  }
  projectionExtent(e, t) {
    const i = [
      new Ie(-this.meshWidth / 2, -this.meshHeight / 2),
      new Ie(this.meshWidth / 2, -this.meshHeight / 2),
      new Ie(this.meshWidth / 2, this.meshHeight / 2),
      new Ie(-this.meshWidth / 2, this.meshHeight / 2)
    ];
    return Math.max(this.meshHeight * 0.35, ...i.map((n) => n.sub(e).dot(t)));
  }
  requestRender() {
    this.destroyed || this.frameRequest || (this.frameRequest = requestAnimationFrame(this.renderFrame));
  }
  emit(e, t) {
    this.container.dispatchEvent(new CustomEvent(e, { detail: t }));
  }
};
async function Qu(e, t = {}) {
  if (typeof document > "u") throw new Error("Sticker Forge can only be created in a browser.");
  const i = typeof e == "string" ? document.querySelector(e) : e;
  if (!i) throw new Error("Sticker Forge could not find its target element.");
  const n = new Ju(i, t);
  return await n.setSource(t.source ?? Si), n;
}
var ju = typeof HTMLElement > "u" ? class {
} : HTMLElement, aa = class extends ju {
  constructor(...e) {
    super(...e), this.instance = null, this.instancePromise = null, this.mountElement = null, this.pendingOptions = {}, this.pendingSource = null, this.lifecycleRevision = 0;
  }
  static get observedAttributes() {
    return ["text"];
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
      t.textContent = `
        :host { display: block; min-width: 160px; min-height: 120px; }
        .mount { width: 100%; height: 100%; min-height: inherit; }
      `, this.mountElement = document.createElement("div"), this.mountElement.className = "mount", e.append(t, this.mountElement);
      for (const i of [
        "peelstart",
        "peelchange",
        "peelend",
        "error"
      ]) this.mountElement.addEventListener(i, (n) => {
        this.dispatchEvent(new CustomEvent(i, {
          detail: n.detail,
          bubbles: !0,
          composed: !0
        }));
      });
    }
    this.pendingSource || (this.pendingSource = {
      ...Si,
      text: this.getAttribute("text") || Si.text
    }), this.ensureInstance().catch(() => {
    });
  }
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback(e, t, i) {
    if (e === "text" && t !== i) {
      const n = {
        ...Si,
        text: i || " "
      };
      this.pendingSource = n, this.isConnected && this.setSource(n).catch(() => {
      });
    }
  }
  async setSource(e) {
    this.pendingSource = e, await (await this.ensureInstance()).setSource(e);
  }
  setOptions(e) {
    this.pendingOptions = sa(this.pendingOptions, e), this.instance?.setOptions(e);
  }
  reset() {
    this.instance?.reset();
  }
  resize() {
    this.instance?.resize();
  }
  getState() {
    return this.instance?.getState() ?? {
      ready: !1,
      dragging: !1,
      progress: 0,
      grabPoint: null,
      pointer: null
    };
  }
  destroy() {
    this.lifecycleRevision += 1;
    const e = this.instancePromise;
    this.instance?.destroy(), this.instance = null, this.instancePromise = null, e && e.then((t) => {
      t.destroy();
    }).catch(() => {
    });
  }
  ensureInstance() {
    if (this.instance) return Promise.resolve(this.instance);
    if (this.instancePromise) return this.instancePromise;
    if (!this.mountElement) return Promise.reject(/* @__PURE__ */ new Error("The sticker element is not connected."));
    const e = sa(this.pendingOptions, { source: this.pendingSource ?? Si }), t = this.lifecycleRevision, i = Qu(this.mountElement, e);
    return this.instancePromise = i, i.then((n) => {
      if (this.instancePromise === i && (this.instancePromise = null), t !== this.lifecycleRevision || !this.isConnected) {
        n.destroy();
        return;
      }
      this.instance = n, this.dispatchEvent(new CustomEvent("ready", {
        bubbles: !0,
        composed: !0
      }));
    }).catch((n) => {
      this.instancePromise === i && (this.instancePromise = null);
      const r = n instanceof Error ? n.message : "Sticker Forge could not initialize.";
      this.dispatchEvent(new CustomEvent("error", {
        detail: { message: r },
        bubbles: !0,
        composed: !0
      }));
    }), i;
  }
};
function ed(e = "sticker-forge") {
  if (!(typeof customElements > "u") && !customElements.get(e)) {
    const t = e === "sticker-forge" ? aa : class extends aa {
    };
    customElements.define(e, t);
  }
}
ed();
export {
  aa as StickerForgeElement,
  Qu as createSticker,
  ed as defineStickerForge,
  Hu as sanitizeSvgMarkup
};

//# sourceMappingURL=sticker-forge.es.js.map