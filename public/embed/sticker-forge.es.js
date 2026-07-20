var Da, Ia, Ua, Na, Va, Fa, Oa, Ba, ka;
var es = 1e3, ai = 1001, ts = 1002, Et = 1003, Co = 1004, Po = 1005, yt = 1006, Lo = 1007, as = 1008, Mi = 1009, Do = 1010, Io = 1011, za = 1012, Uo = 1013, Pi = 1014, fr = 1015, Li = 1016, Ga = 1017, Ha = 1018, Wa = 1020, No = 35902, Vo = 35899, Fo = 1021, Oo = 1022, yn = 1023, Tn = 1026, Xa = 1027, Bo = 1028, qa = 1029, lr = 1030, Ya = 1031, Ka = 1033, ko = 33776, zo = 33777, Go = 33778, Ho = 33779, Wo = 35840, Xo = 35841, qo = 35842, Yo = 35843, Ko = 36196, Zo = 37492, Jo = 37496, Qo = 37488, jo = 37489, $o = 37490, el = 37491, tl = 37808, il = 37809, nl = 37810, rl = 37811, sl = 37812, al = 37813, ol = 37814, ll = 37815, cl = 37816, hl = 37817, ul = 37818, dl = 37819, fl = 37820, pl = 37821, ml = 36492, gl = 36494, vl = 36495, _l = 36283, Ml = 36284, Sl = 36285, xl = 36286, cr = 2300, is = 2301, Mr = 2302, Es = 2303, ys = 2400, Ts = 2401, bs = 2402, Al = 3200;
var Pt = "srgb", ns = "srgb-linear", hr = "linear", ur = "srgb", Sr = 7680;
var El = 35044;
var nn = 2e3;
function yl(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function Tl(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dr(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function bl() {
  const e = dr("canvas");
  return e.style.display = "block", e;
}
var ws = {}, rn = null;
function Rs(...e) {
  const t = "THREE." + e.shift();
  rn ? rn("log", t, ...e) : console.log(t, ...e);
}
function Za(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const i = e[1];
    i && i.isStackTrace ? e[0] += " " + i.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function ye(...e) {
  e = Za(e);
  const t = "THREE." + e.shift();
  if (rn) rn("warn", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.warn(i.getError(t)) : console.warn(t, ...e);
  }
}
function Ce(...e) {
  e = Za(e);
  const t = "THREE." + e.shift();
  if (rn) rn("error", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.error(i.getError(t)) : console.error(t, ...e);
  }
}
function en(...e) {
  const t = e.join(" ");
  t in ws || (ws[t] = !0, ye(...e));
}
function wl(e, t, i) {
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
var Rl = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
}, Di = class {
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
}, _t = [
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
], Cs = 1234567, xn = Math.PI / 180, bn = 180 / Math.PI;
function on() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (_t[e & 255] + _t[e >> 8 & 255] + _t[e >> 16 & 255] + _t[e >> 24 & 255] + "-" + _t[t & 255] + _t[t >> 8 & 255] + "-" + _t[t >> 16 & 15 | 64] + _t[t >> 24 & 255] + "-" + _t[i & 63 | 128] + _t[i >> 8 & 255] + "-" + _t[i >> 16 & 255] + _t[i >> 24 & 255] + _t[n & 255] + _t[n >> 8 & 255] + _t[n >> 16 & 255] + _t[n >> 24 & 255]).toLowerCase();
}
function Fe(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function os(e, t) {
  return (e % t + t) % t;
}
function Cl(e, t, i, n, r) {
  return n + (e - t) * (r - n) / (i - t);
}
function Pl(e, t, i) {
  return e !== t ? (i - e) / (t - e) : 0;
}
function An(e, t, i) {
  return (1 - i) * e + i * t;
}
function Ll(e, t, i, n) {
  return An(e, t, 1 - Math.exp(-i * n));
}
function Dl(e, t = 1) {
  return t - Math.abs(os(e, t * 2) - t);
}
function Il(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * (3 - 2 * e));
}
function Ul(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function Nl(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function Vl(e, t) {
  return e + Math.random() * (t - e);
}
function Fl(e) {
  return e * (0.5 - Math.random());
}
function Ol(e) {
  e !== void 0 && (Cs = e);
  let t = Cs += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Bl(e) {
  return e * xn;
}
function kl(e) {
  return e * bn;
}
function zl(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function Gl(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function Hl(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function Wl(e, t, i, n, r) {
  const s = Math.cos, a = Math.sin, o = s(i / 2), c = a(i / 2), l = s((t + n) / 2), h = a((t + n) / 2), f = s((t - n) / 2), u = a((t - n) / 2), m = s((n - t) / 2), M = a((n - t) / 2);
  switch (r) {
    case "XYX":
      e.set(o * h, c * f, c * u, o * l);
      break;
    case "YZY":
      e.set(c * u, o * h, c * f, o * l);
      break;
    case "ZXZ":
      e.set(c * f, c * u, o * h, o * l);
      break;
    case "XZX":
      e.set(o * h, c * M, c * m, o * l);
      break;
    case "YXY":
      e.set(c * m, o * h, c * M, o * l);
      break;
    case "ZYZ":
      e.set(c * M, c * m, o * h, o * l);
      break;
    default:
      ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Qi(e, t) {
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
function xt(e, t) {
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
var Fi = {
  DEG2RAD: xn,
  RAD2DEG: bn,
  generateUUID: on,
  clamp: Fe,
  euclideanModulo: os,
  mapLinear: Cl,
  inverseLerp: Pl,
  lerp: An,
  damp: Ll,
  pingpong: Dl,
  smoothstep: Il,
  smootherstep: Ul,
  randInt: Nl,
  randFloat: Vl,
  randFloatSpread: Fl,
  seededRandom: Ol,
  degToRad: Bl,
  radToDeg: kl,
  isPowerOfTwo: zl,
  ceilPowerOfTwo: Gl,
  floorPowerOfTwo: Hl,
  setQuaternionFromProperEuler: Wl,
  normalize: xt,
  denormalize: Qi
};
Oa = Symbol.iterator;
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
    return this.x = Fe(this.x, e.x, t.x), this.y = Fe(this.y, e.y, t.y), this;
  }
  clampScalar(e, t) {
    return this.x = Fe(this.x, e, t), this.y = Fe(this.y, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Fe(i, e, t));
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
    return Math.acos(Fe(i, -1, 1));
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
  *[Oa]() {
    yield this.x, yield this.y;
  }
};
Da = Ie;
Da.prototype.isVector2 = !0;
var Ii = class {
  constructor(e = 0, t = 0, i = 0, n = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = n;
  }
  static slerpFlat(e, t, i, n, r, s, a) {
    let o = i[n + 0], c = i[n + 1], l = i[n + 2], h = i[n + 3], f = r[s + 0], u = r[s + 1], m = r[s + 2], M = r[s + 3];
    if (h !== M || o !== f || c !== u || l !== m) {
      let S = o * f + c * u + l * m + h * M;
      S < 0 && (f = -f, u = -u, m = -m, M = -M, S = -S);
      let p = 1 - a;
      if (S < 0.9995) {
        const d = Math.acos(S), R = Math.sin(d);
        p = Math.sin(p * d) / R, a = Math.sin(a * d) / R, o = o * p + f * a, c = c * p + u * a, l = l * p + m * a, h = h * p + M * a;
      } else {
        o = o * p + f * a, c = c * p + u * a, l = l * p + m * a, h = h * p + M * a;
        const d = 1 / Math.sqrt(o * o + c * c + l * l + h * h);
        o *= d, c *= d, l *= d, h *= d;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = l, e[t + 3] = h;
  }
  static multiplyQuaternionsFlat(e, t, i, n, r, s) {
    const a = i[n], o = i[n + 1], c = i[n + 2], l = i[n + 3], h = r[s], f = r[s + 1], u = r[s + 2], m = r[s + 3];
    return e[t] = a * m + l * h + o * u - c * f, e[t + 1] = o * m + l * f + c * h - a * u, e[t + 2] = c * m + l * u + a * f - o * h, e[t + 3] = l * m - a * h - o * f - c * u, e;
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
    const i = e._x, n = e._y, r = e._z, s = e._order, a = Math.cos, o = Math.sin, c = a(i / 2), l = a(n / 2), h = a(r / 2), f = o(i / 2), u = o(n / 2), m = o(r / 2);
    switch (s) {
      case "XYZ":
        this._x = f * l * h + c * u * m, this._y = c * u * h - f * l * m, this._z = c * l * m + f * u * h, this._w = c * l * h - f * u * m;
        break;
      case "YXZ":
        this._x = f * l * h + c * u * m, this._y = c * u * h - f * l * m, this._z = c * l * m - f * u * h, this._w = c * l * h + f * u * m;
        break;
      case "ZXY":
        this._x = f * l * h - c * u * m, this._y = c * u * h + f * l * m, this._z = c * l * m + f * u * h, this._w = c * l * h - f * u * m;
        break;
      case "ZYX":
        this._x = f * l * h - c * u * m, this._y = c * u * h + f * l * m, this._z = c * l * m - f * u * h, this._w = c * l * h + f * u * m;
        break;
      case "YZX":
        this._x = f * l * h + c * u * m, this._y = c * u * h + f * l * m, this._z = c * l * m - f * u * h, this._w = c * l * h - f * u * m;
        break;
      case "XZY":
        this._x = f * l * h - c * u * m, this._y = c * u * h - f * l * m, this._z = c * l * m + f * u * h, this._w = c * l * h + f * u * m;
        break;
      default:
        ye("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const i = t / 2, n = Math.sin(i);
    return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], c = t[2], l = t[6], h = t[10], f = i + a + h;
    if (f > 0) {
      const u = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / u, this._x = (l - o) * u, this._y = (r - c) * u, this._z = (s - n) * u;
    } else if (i > a && i > h) {
      const u = 2 * Math.sqrt(1 + i - a - h);
      this._w = (l - o) / u, this._x = 0.25 * u, this._y = (n + s) / u, this._z = (r + c) / u;
    } else if (a > h) {
      const u = 2 * Math.sqrt(1 + a - i - h);
      this._w = (r - c) / u, this._x = (n + s) / u, this._y = 0.25 * u, this._z = (o + l) / u;
    } else {
      const u = 2 * Math.sqrt(1 + h - i - a);
      this._w = (s - n) / u, this._x = (r + c) / u, this._y = (o + l) / u, this._z = 0.25 * u;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return i < 1e-8 ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Fe(this.dot(e), -1, 1)));
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
Ba = Symbol.iterator;
var O = class {
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
    return this.applyQuaternion(Ps.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Ps.setFromAxisAngle(e, t));
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
    const t = this.x, i = this.y, n = this.z, r = e.x, s = e.y, a = e.z, o = e.w, c = 2 * (s * n - a * i), l = 2 * (a * t - r * n), h = 2 * (r * i - s * t);
    return this.x = t + o * c + s * h - a * l, this.y = i + o * l + a * c - r * h, this.z = n + o * h + r * l - s * c, this;
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
    return this.x = Fe(this.x, e.x, t.x), this.y = Fe(this.y, e.y, t.y), this.z = Fe(this.z, e.z, t.z), this;
  }
  clampScalar(e, t) {
    return this.x = Fe(this.x, e, t), this.y = Fe(this.y, e, t), this.z = Fe(this.z, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Fe(i, e, t));
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
    return xr.copy(this).projectOnVector(e), this.sub(xr);
  }
  reflect(e) {
    return this.sub(xr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(Fe(i, -1, 1));
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
  *[Ba]() {
    yield this.x, yield this.y, yield this.z;
  }
};
Ia = O;
Ia.prototype.isVector3 = !0;
var xr = /* @__PURE__ */ new O(), Ps = /* @__PURE__ */ new Ii(), De = class {
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
    const i = e.elements, n = t.elements, r = this.elements, s = i[0], a = i[3], o = i[6], c = i[1], l = i[4], h = i[7], f = i[2], u = i[5], m = i[8], M = n[0], S = n[3], p = n[6], d = n[1], R = n[4], T = n[7], A = n[2], y = n[5], b = n[8];
    return r[0] = s * M + a * d + o * A, r[3] = s * S + a * R + o * y, r[6] = s * p + a * T + o * b, r[1] = c * M + l * d + h * A, r[4] = c * S + l * R + h * y, r[7] = c * p + l * T + h * b, r[2] = f * M + u * d + m * A, r[5] = f * S + u * R + m * y, r[8] = f * p + u * T + m * b, this;
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
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], s = e[4], a = e[5], o = e[6], c = e[7], l = e[8], h = l * s - a * c, f = a * o - l * r, u = c * r - s * o, m = t * h + i * f + n * u;
    if (m === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / m;
    return e[0] = h * M, e[1] = (n * c - l * i) * M, e[2] = (a * i - n * s) * M, e[3] = f * M, e[4] = (l * t - n * o) * M, e[5] = (n * r - a * t) * M, e[6] = u * M, e[7] = (i * o - c * t) * M, e[8] = (s * t - i * r) * M, this;
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
    return en("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Ar.makeScale(e, t)), this;
  }
  rotate(e) {
    return en("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Ar.makeRotation(-e)), this;
  }
  translate(e, t) {
    return en("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Ar.makeTranslation(e, t)), this;
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
Ua = De;
Ua.prototype.isMatrix3 = !0;
var Ar = /* @__PURE__ */ new De(), Ls = /* @__PURE__ */ new De().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Ds = /* @__PURE__ */ new De().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Xl() {
  const e = {
    enabled: !0,
    workingColorSpace: ns,
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === "srgb" && (r.r = oi(r.r), r.g = oi(r.g), r.b = oi(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === "srgb" && (r.r = tn(r.r), r.g = tn(r.g), r.b = tn(r.b))), r;
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
      return r === "" ? hr : this.spaces[r].transfer;
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
      return en("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return en("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, s);
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
    [ns]: {
      primaries: t,
      whitePoint: n,
      transfer: hr,
      toXYZ: Ls,
      fromXYZ: Ds,
      luminanceCoefficients: i,
      workingColorSpaceConfig: { unpackColorSpace: Pt },
      outputColorSpaceConfig: { drawingBufferColorSpace: Pt }
    },
    [Pt]: {
      primaries: t,
      whitePoint: n,
      transfer: ur,
      toXYZ: Ls,
      fromXYZ: Ds,
      luminanceCoefficients: i,
      outputColorSpaceConfig: { drawingBufferColorSpace: Pt }
    }
  }), e;
}
var Be = /* @__PURE__ */ Xl();
function oi(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function tn(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Oi, ql = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let i;
    if (e instanceof HTMLCanvasElement) i = e;
    else {
      Oi === void 0 && (Oi = dr("canvas")), Oi.width = e.width, Oi.height = e.height;
      const n = Oi.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), i = Oi;
    }
    return i.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = dr("canvas");
      t.width = e.width, t.height = e.height;
      const i = t.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const n = i.getImageData(0, 0, e.width, e.height), r = n.data;
      for (let s = 0; s < r.length; s++) r[s] = oi(r[s] / 255) * 255;
      return i.putImageData(n, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let i = 0; i < t.length; i++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(oi(t[i] / 255) * 255) : t[i] = oi(t[i]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Yl = 0, ls = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Yl++ }), this.uuid = on(), this.data = e, this.dataReady = !0, this.version = 0;
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
        for (let s = 0, a = n.length; s < a; s++) n[s].isDataTexture ? r.push(Er(n[s].image)) : r.push(Er(n[s]));
      } else r = Er(n);
      i.url = r;
    }
    return t || (e.images[this.uuid] = i), i;
  }
};
function Er(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? ql.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (ye("Texture: Unable to serialize Texture."), {});
}
var Kl = 0, yr = /* @__PURE__ */ new O(), Ft = class sr extends Di {
  constructor(t = sr.DEFAULT_IMAGE, i = sr.DEFAULT_MAPPING, n = ai, r = ai, s = yt, a = as, o = yn, c = Mi, l = sr.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Kl++ }), this.uuid = on(), this.name = "", this.source = new ls(t), this.mipmaps = [], this.mapping = i, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new Ie(0, 0), this.repeat = new Ie(1, 1), this.center = new Ie(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(yr).x;
  }
  get height() {
    return this.source.getSize(yr).y;
  }
  get depth() {
    return this.source.getSize(yr).z;
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
        ye(`Texture.setValues(): parameter '${i}' has value of undefined.`);
        continue;
      }
      const r = this[i];
      if (r === void 0) {
        ye(`Texture.setValues(): property '${i}' does not exist.`);
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
      case es:
        t.x = t.x - Math.floor(t.x);
        break;
      case ai:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case ts:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case es:
        t.y = t.y - Math.floor(t.y);
        break;
      case ai:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case ts:
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
Ft.DEFAULT_IMAGE = null;
Ft.DEFAULT_MAPPING = 300;
Ft.DEFAULT_ANISOTROPY = 1;
ka = Symbol.iterator;
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
    const o = e.elements, c = o[0], l = o[4], h = o[8], f = o[1], u = o[5], m = o[9], M = o[2], S = o[6], p = o[10];
    if (Math.abs(l - f) < 0.01 && Math.abs(h - M) < 0.01 && Math.abs(m - S) < 0.01) {
      if (Math.abs(l + f) < 0.1 && Math.abs(h + M) < 0.1 && Math.abs(m + S) < 0.1 && Math.abs(c + u + p - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const R = (c + 1) / 2, T = (u + 1) / 2, A = (p + 1) / 2, y = (l + f) / 4, b = (h + M) / 4, P = (m + S) / 4;
      return R > T && R > A ? R < 0.01 ? (i = 0, n = 0.707106781, r = 0.707106781) : (i = Math.sqrt(R), n = y / i, r = b / i) : T > A ? T < 0.01 ? (i = 0.707106781, n = 0, r = 0.707106781) : (n = Math.sqrt(T), i = y / n, r = P / n) : A < 0.01 ? (i = 0.707106781, n = 0.707106781, r = 0) : (r = Math.sqrt(A), i = b / r, n = P / r), this.set(i, n, r, t), this;
    }
    let d = Math.sqrt((S - m) * (S - m) + (h - M) * (h - M) + (f - l) * (f - l));
    return Math.abs(d) < 1e-3 && (d = 1), this.x = (S - m) / d, this.y = (h - M) / d, this.z = (f - l) / d, this.w = Math.acos((c + u + p - 1) / 2), this;
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
    return this.x = Fe(this.x, e.x, t.x), this.y = Fe(this.y, e.y, t.y), this.z = Fe(this.z, e.z, t.z), this.w = Fe(this.w, e.w, t.w), this;
  }
  clampScalar(e, t) {
    return this.x = Fe(this.x, e, t), this.y = Fe(this.y, e, t), this.z = Fe(this.z, e, t), this.w = Fe(this.w, e, t), this;
  }
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Fe(i, e, t));
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
  *[ka]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
Na = st;
Na.prototype.isVector4 = !0;
var Zl = class extends Di {
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: yt,
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
    const n = new Ft({
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
      minFilter: yt,
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
      this.textures[t].source = new ls(n);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Zt = class extends Zl {
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}, Ja = class extends Ft {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Et, this.minFilter = Et, this.wrapR = ai, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, Jl = class extends Ft {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Et, this.minFilter = Et, this.wrapR = ai, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, ot = class Qa {
  constructor(t, i, n, r, s, a, o, c, l, h, f, u, m, M, S, p) {
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
    ], t !== void 0 && this.set(t, i, n, r, s, a, o, c, l, h, f, u, m, M, S, p);
  }
  set(t, i, n, r, s, a, o, c, l, h, f, u, m, M, S, p) {
    const d = this.elements;
    return d[0] = t, d[4] = i, d[8] = n, d[12] = r, d[1] = s, d[5] = a, d[9] = o, d[13] = c, d[2] = l, d[6] = h, d[10] = f, d[14] = u, d[3] = m, d[7] = M, d[11] = S, d[15] = p, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Qa().fromArray(this.elements);
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
    const i = this.elements, n = t.elements, r = 1 / Bi.setFromMatrixColumn(t, 0).length(), s = 1 / Bi.setFromMatrixColumn(t, 1).length(), a = 1 / Bi.setFromMatrixColumn(t, 2).length();
    return i[0] = n[0] * r, i[1] = n[1] * r, i[2] = n[2] * r, i[3] = 0, i[4] = n[4] * s, i[5] = n[5] * s, i[6] = n[6] * s, i[7] = 0, i[8] = n[8] * a, i[9] = n[9] * a, i[10] = n[10] * a, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const i = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(r), l = Math.sin(r), h = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const u = a * h, m = a * f, M = o * h, S = o * f;
      i[0] = c * h, i[4] = -c * f, i[8] = l, i[1] = m + M * l, i[5] = u - S * l, i[9] = -o * c, i[2] = S - u * l, i[6] = M + m * l, i[10] = a * c;
    } else if (t.order === "YXZ") {
      const u = c * h, m = c * f, M = l * h, S = l * f;
      i[0] = u + S * o, i[4] = M * o - m, i[8] = a * l, i[1] = a * f, i[5] = a * h, i[9] = -o, i[2] = m * o - M, i[6] = S + u * o, i[10] = a * c;
    } else if (t.order === "ZXY") {
      const u = c * h, m = c * f, M = l * h, S = l * f;
      i[0] = u - S * o, i[4] = -a * f, i[8] = M + m * o, i[1] = m + M * o, i[5] = a * h, i[9] = S - u * o, i[2] = -a * l, i[6] = o, i[10] = a * c;
    } else if (t.order === "ZYX") {
      const u = a * h, m = a * f, M = o * h, S = o * f;
      i[0] = c * h, i[4] = M * l - m, i[8] = u * l + S, i[1] = c * f, i[5] = S * l + u, i[9] = m * l - M, i[2] = -l, i[6] = o * c, i[10] = a * c;
    } else if (t.order === "YZX") {
      const u = a * c, m = a * l, M = o * c, S = o * l;
      i[0] = c * h, i[4] = S - u * f, i[8] = M * f + m, i[1] = f, i[5] = a * h, i[9] = -o * h, i[2] = -l * h, i[6] = m * f + M, i[10] = u - S * f;
    } else if (t.order === "XZY") {
      const u = a * c, m = a * l, M = o * c, S = o * l;
      i[0] = c * h, i[4] = -f, i[8] = l * h, i[1] = u * f + S, i[5] = a * h, i[9] = m * f - M, i[2] = M * f - m, i[6] = o * h, i[10] = S * f + u;
    }
    return i[3] = 0, i[7] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Ql, t, jl);
  }
  lookAt(t, i, n) {
    const r = this.elements;
    return wt.subVectors(t, i), wt.lengthSq() === 0 && (wt.z = 1), wt.normalize(), ui.crossVectors(n, wt), ui.lengthSq() === 0 && (Math.abs(n.z) === 1 ? wt.x += 1e-4 : wt.z += 1e-4, wt.normalize(), ui.crossVectors(n, wt)), ui.normalize(), Nn.crossVectors(wt, ui), r[0] = ui.x, r[4] = Nn.x, r[8] = wt.x, r[1] = ui.y, r[5] = Nn.y, r[9] = wt.y, r[2] = ui.z, r[6] = Nn.z, r[10] = wt.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, i) {
    const n = t.elements, r = i.elements, s = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], h = n[1], f = n[5], u = n[9], m = n[13], M = n[2], S = n[6], p = n[10], d = n[14], R = n[3], T = n[7], A = n[11], y = n[15], b = r[0], P = r[4], v = r[8], E = r[12], X = r[1], w = r[5], G = r[9], W = r[13], H = r[2], B = r[6], q = r[10], N = r[14], J = r[3], ee = r[7], te = r[11], he = r[15];
    return s[0] = a * b + o * X + c * H + l * J, s[4] = a * P + o * w + c * B + l * ee, s[8] = a * v + o * G + c * q + l * te, s[12] = a * E + o * W + c * N + l * he, s[1] = h * b + f * X + u * H + m * J, s[5] = h * P + f * w + u * B + m * ee, s[9] = h * v + f * G + u * q + m * te, s[13] = h * E + f * W + u * N + m * he, s[2] = M * b + S * X + p * H + d * J, s[6] = M * P + S * w + p * B + d * ee, s[10] = M * v + S * G + p * q + d * te, s[14] = M * E + S * W + p * N + d * he, s[3] = R * b + T * X + A * H + y * J, s[7] = R * P + T * w + A * B + y * ee, s[11] = R * v + T * G + A * q + y * te, s[15] = R * E + T * W + A * N + y * he, this;
  }
  multiplyScalar(t) {
    const i = this.elements;
    return i[0] *= t, i[4] *= t, i[8] *= t, i[12] *= t, i[1] *= t, i[5] *= t, i[9] *= t, i[13] *= t, i[2] *= t, i[6] *= t, i[10] *= t, i[14] *= t, i[3] *= t, i[7] *= t, i[11] *= t, i[15] *= t, this;
  }
  determinant() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], c = t[9], l = t[13], h = t[2], f = t[6], u = t[10], m = t[14], M = t[3], S = t[7], p = t[11], d = t[15], R = c * m - l * u, T = o * m - l * f, A = o * u - c * f, y = a * m - l * h, b = a * u - c * h, P = a * f - o * h;
    return i * (S * R - p * T + d * A) - n * (M * R - p * y + d * b) + r * (M * T - S * y + d * P) - s * (M * A - S * b + p * P);
  }
  determinantAffine() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], c = t[2], l = t[6], h = t[10];
    return i * (a * h - o * l) - n * (s * h - o * c) + r * (s * l - a * c);
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
    const t = this.elements, i = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], c = t[6], l = t[7], h = t[8], f = t[9], u = t[10], m = t[11], M = t[12], S = t[13], p = t[14], d = t[15], R = i * o - n * a, T = i * c - r * a, A = i * l - s * a, y = n * c - r * o, b = n * l - s * o, P = r * l - s * c, v = h * S - f * M, E = h * p - u * M, X = h * d - m * M, w = f * p - u * S, G = f * d - m * S, W = u * d - m * p, H = R * W - T * G + A * w + y * X - b * E + P * v;
    if (H === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const B = 1 / H;
    return t[0] = (o * W - c * G + l * w) * B, t[1] = (r * G - n * W - s * w) * B, t[2] = (S * P - p * b + d * y) * B, t[3] = (u * b - f * P - m * y) * B, t[4] = (c * X - a * W - l * E) * B, t[5] = (i * W - r * X + s * E) * B, t[6] = (p * A - M * P - d * T) * B, t[7] = (h * P - u * A + m * T) * B, t[8] = (a * G - o * X + l * v) * B, t[9] = (n * X - i * G - s * v) * B, t[10] = (M * b - S * A + d * R) * B, t[11] = (f * A - h * b - m * R) * B, t[12] = (o * E - a * w - c * v) * B, t[13] = (i * w - n * E + r * v) * B, t[14] = (S * T - M * y - p * R) * B, t[15] = (h * y - f * T + u * R) * B, this;
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
    const n = Math.cos(i), r = Math.sin(i), s = 1 - n, a = t.x, o = t.y, c = t.z, l = s * a, h = s * o;
    return this.set(l * a + n, l * o - r * c, l * c + r * o, 0, l * o + r * c, h * o + n, h * c - r * a, 0, l * c - r * o, h * c + r * a, s * c * c + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, i, n) {
    return this.set(t, 0, 0, 0, 0, i, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, i, n, r, s, a) {
    return this.set(1, n, s, 0, t, 1, a, 0, i, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, i, n) {
    const r = this.elements, s = i._x, a = i._y, o = i._z, c = i._w, l = s + s, h = a + a, f = o + o, u = s * l, m = s * h, M = s * f, S = a * h, p = a * f, d = o * f, R = c * l, T = c * h, A = c * f, y = n.x, b = n.y, P = n.z;
    return r[0] = (1 - (S + d)) * y, r[1] = (m + A) * y, r[2] = (M - T) * y, r[3] = 0, r[4] = (m - A) * b, r[5] = (1 - (u + d)) * b, r[6] = (p + R) * b, r[7] = 0, r[8] = (M + T) * P, r[9] = (p - R) * P, r[10] = (1 - (u + S)) * P, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, i, n) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), i.identity(), this;
    let a = Bi.set(r[0], r[1], r[2]).length();
    const o = Bi.set(r[4], r[5], r[6]).length(), c = Bi.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Bt.copy(this);
    const l = 1 / a, h = 1 / o, f = 1 / c;
    return Bt.elements[0] *= l, Bt.elements[1] *= l, Bt.elements[2] *= l, Bt.elements[4] *= h, Bt.elements[5] *= h, Bt.elements[6] *= h, Bt.elements[8] *= f, Bt.elements[9] *= f, Bt.elements[10] *= f, i.setFromRotationMatrix(Bt), n.x = a, n.y = o, n.z = c, this;
  }
  makePerspective(t, i, n, r, s, a, o = nn, c = !1) {
    const l = this.elements, h = 2 * s / (i - t), f = 2 * s / (n - r), u = (i + t) / (i - t), m = (n + r) / (n - r);
    let M, S;
    if (c)
      M = s / (a - s), S = a * s / (a - s);
    else if (o === 2e3)
      M = -(a + s) / (a - s), S = -2 * a * s / (a - s);
    else if (o === 2001)
      M = -a / (a - s), S = -a * s / (a - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = f, l[9] = m, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = M, l[14] = S, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, i, n, r, s, a, o = nn, c = !1) {
    const l = this.elements, h = 2 / (i - t), f = 2 / (n - r), u = -(i + t) / (i - t), m = -(n + r) / (n - r);
    let M, S;
    if (c)
      M = 1 / (a - s), S = a / (a - s);
    else if (o === 2e3)
      M = -2 / (a - s), S = -(a + s) / (a - s);
    else if (o === 2001)
      M = -1 / (a - s), S = -s / (a - s);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = 0, l[12] = u, l[1] = 0, l[5] = f, l[9] = 0, l[13] = m, l[2] = 0, l[6] = 0, l[10] = M, l[14] = S, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
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
Va = ot;
Va.prototype.isMatrix4 = !0;
var Bi = /* @__PURE__ */ new O(), Bt = /* @__PURE__ */ new ot(), Ql = /* @__PURE__ */ new O(0, 0, 0), jl = /* @__PURE__ */ new O(1, 1, 1), ui = /* @__PURE__ */ new O(), Nn = /* @__PURE__ */ new O(), wt = /* @__PURE__ */ new O(), Is = /* @__PURE__ */ new ot(), Us = /* @__PURE__ */ new Ii(), wn = class ja {
  constructor(t = 0, i = 0, n = 0, r = ja.DEFAULT_ORDER) {
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
    const r = t.elements, s = r[0], a = r[4], o = r[8], c = r[1], l = r[5], h = r[9], f = r[2], u = r[6], m = r[10];
    switch (i) {
      case "XYZ":
        this._y = Math.asin(Fe(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Fe(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Fe(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-f, m), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Fe(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(u, m), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(Fe(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-Fe(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        ye("Euler: .setFromRotationMatrix() encountered an unknown order: " + i);
    }
    return this._order = i, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, i, n) {
    return Is.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Is, i, n);
  }
  setFromVector3(t, i = this._order) {
    return this.set(t.x, t.y, t.z, i);
  }
  reorder(t) {
    return Us.setFromEuler(this), this.setFromQuaternion(Us, t);
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
wn.DEFAULT_ORDER = "XYZ";
var $a = class {
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
}, $l = 0, Ns = /* @__PURE__ */ new O(), ki = /* @__PURE__ */ new Ii(), $t = /* @__PURE__ */ new ot(), Vn = /* @__PURE__ */ new O(), hn = /* @__PURE__ */ new O(), ec = /* @__PURE__ */ new O(), tc = /* @__PURE__ */ new Ii(), Vs = /* @__PURE__ */ new O(1, 0, 0), Fs = /* @__PURE__ */ new O(0, 1, 0), Os = /* @__PURE__ */ new O(0, 0, 1), Bs = { type: "added" }, ic = { type: "removed" }, zi = {
  type: "childadded",
  child: null
}, Tr = {
  type: "childremoved",
  child: null
}, Lt = class ar extends Di {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: $l++ }), this.uuid = on(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ar.DEFAULT_UP.clone();
    const t = new O(), i = new wn(), n = new Ii(), r = new O(1, 1, 1);
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
      modelViewMatrix: { value: new ot() },
      normalMatrix: { value: new De() }
    }), this.matrix = new ot(), this.matrixWorld = new ot(), this.matrixAutoUpdate = ar.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ar.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new $a(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
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
    return ki.setFromAxisAngle(t, i), this.quaternion.multiply(ki), this;
  }
  rotateOnWorldAxis(t, i) {
    return ki.setFromAxisAngle(t, i), this.quaternion.premultiply(ki), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Vs, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Fs, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Os, t);
  }
  translateOnAxis(t, i) {
    return Ns.copy(t).applyQuaternion(this.quaternion), this.position.add(Ns.multiplyScalar(i)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Vs, t);
  }
  translateY(t) {
    return this.translateOnAxis(Fs, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Os, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4($t.copy(this.matrixWorld).invert());
  }
  lookAt(t, i, n) {
    t.isVector3 ? Vn.copy(t) : Vn.set(t, i, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), hn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? $t.lookAt(hn, Vn, this.up) : $t.lookAt(Vn, hn, this.up), this.quaternion.setFromRotationMatrix($t), r && ($t.extractRotation(r.matrixWorld), ki.setFromRotationMatrix($t), this.quaternion.premultiply(ki.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this;
    }
    return t === this ? (Ce("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Bs), zi.child = t, this.dispatchEvent(zi), zi.child = null) : Ce("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const i = this.children.indexOf(t);
    return i !== -1 && (t.parent = null, this.children.splice(i, 1), t.dispatchEvent(ic), Tr.child = t, this.dispatchEvent(Tr), Tr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), $t.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), $t.multiply(t.parent.matrixWorld)), t.applyMatrix4($t), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Bs), zi.child = t, this.dispatchEvent(zi), zi.child = null, this;
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
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(hn, t, ec), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(hn, tc, t), t;
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
        if (Array.isArray(c)) for (let l = 0, h = c.length; l < h; l++) {
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
      const o = a(t.geometries), c = a(t.materials), l = a(t.textures), h = a(t.images), f = a(t.shapes), u = a(t.skeletons), m = a(t.animations), M = a(t.nodes);
      o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), u.length > 0 && (n.skeletons = u), m.length > 0 && (n.animations = m), M.length > 0 && (n.nodes = M);
    }
    return n.object = r, n;
    function a(o) {
      const c = [];
      for (const l in o) {
        const h = o[l];
        delete h.metadata, c.push(h);
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
Lt.DEFAULT_UP = /* @__PURE__ */ new O(0, 1, 0);
Lt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Fn = class extends Lt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, nc = { type: "move" }, br = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Fn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Fn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new O(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new O()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Fn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new O(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new O(), this._grip.eventsEnabled = !1), this._grip;
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
          const S = t.getJointPose(M, i), p = this._getHandJoint(c, M);
          S !== null && (p.matrix.fromArray(S.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = !0, p.jointRadius = S.radius), p.visible = S !== null;
        }
        const l = c.joints["index-finger-tip"], h = c.joints["thumb-tip"], f = l.position.distanceTo(h.position), u = 0.02, m = 5e-3;
        c.inputState.pinching && f > u + m ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= u - m && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else o !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, o.eventsEnabled && o.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      a !== null && (n = t.getPose(e.targetRaySpace, i), n === null && r !== null && (n = r), n !== null && (a.matrix.fromArray(n.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1, n.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(nc)));
    }
    return a !== null && (a.visible = n !== null), o !== null && (o.visible = r !== null), c !== null && (c.visible = s !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new Fn();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}, eo = {
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
}, di = {
  h: 0,
  s: 0,
  l: 0
}, On = {
  h: 0,
  s: 0,
  l: 0
};
function wr(e, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + (t - e) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e;
}
var ke = class {
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
  setHex(e, t = Pt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Be.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, i, n = Be.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, Be.colorSpaceToWorking(this, n), this;
  }
  setHSL(e, t, i, n = Be.workingColorSpace) {
    if (e = os(e, 1), t = Fe(t, 0, 1), i = Fe(i, 0, 1), t === 0) this.r = this.g = this.b = i;
    else {
      const r = i <= 0.5 ? i * (1 + t) : i + t - i * t, s = 2 * i - r;
      this.r = wr(s, r, e + 1 / 3), this.g = wr(s, r, e), this.b = wr(s, r, e - 1 / 3);
    }
    return Be.colorSpaceToWorking(this, n), this;
  }
  setStyle(e, t = Pt) {
    function i(r) {
      r !== void 0 && parseFloat(r) < 1 && ye("Color: Alpha component of " + e + " will be ignored.");
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
          ye("Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = n[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      ye("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Pt) {
    const i = eo[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : ye("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = oi(e.r), this.g = oi(e.g), this.b = oi(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = tn(e.r), this.g = tn(e.g), this.b = tn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Pt) {
    return Be.workingToColorSpace(Mt.copy(this), e), Math.round(Fe(Mt.r * 255, 0, 255)) * 65536 + Math.round(Fe(Mt.g * 255, 0, 255)) * 256 + Math.round(Fe(Mt.b * 255, 0, 255));
  }
  getHexString(e = Pt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Be.workingColorSpace) {
    Be.workingToColorSpace(Mt.copy(this), t);
    const i = Mt.r, n = Mt.g, r = Mt.b, s = Math.max(i, n, r), a = Math.min(i, n, r);
    let o, c;
    const l = (a + s) / 2;
    if (a === s)
      o = 0, c = 0;
    else {
      const h = s - a;
      switch (c = l <= 0.5 ? h / (s + a) : h / (2 - s - a), s) {
        case i:
          o = (n - r) / h + (n < r ? 6 : 0);
          break;
        case n:
          o = (r - i) / h + 2;
          break;
        case r:
          o = (i - n) / h + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = c, e.l = l, e;
  }
  getRGB(e, t = Be.workingColorSpace) {
    return Be.workingToColorSpace(Mt.copy(this), t), e.r = Mt.r, e.g = Mt.g, e.b = Mt.b, e;
  }
  getStyle(e = Pt) {
    Be.workingToColorSpace(Mt.copy(this), e);
    const t = Mt.r, i = Mt.g, n = Mt.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, i) {
    return this.getHSL(di), this.setHSL(di.h + e, di.s + t, di.l + i);
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
    this.getHSL(di), e.getHSL(On);
    const i = An(di.h, On.h, t), n = An(di.s, On.s, t), r = An(di.l, On.l, t);
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
}, Mt = /* @__PURE__ */ new ke();
ke.NAMES = eo;
var rc = class extends Lt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new wn(), this.environmentIntensity = 1, this.environmentRotation = new wn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, kt = /* @__PURE__ */ new O(), ei = /* @__PURE__ */ new O(), Rr = /* @__PURE__ */ new O(), ti = /* @__PURE__ */ new O(), Gi = /* @__PURE__ */ new O(), Hi = /* @__PURE__ */ new O(), ks = /* @__PURE__ */ new O(), Cr = /* @__PURE__ */ new O(), Pr = /* @__PURE__ */ new O(), Lr = /* @__PURE__ */ new O(), Dr = /* @__PURE__ */ new st(), Ir = /* @__PURE__ */ new st(), Ur = /* @__PURE__ */ new st(), un = class ji {
  constructor(t = new O(), i = new O(), n = new O()) {
    this.a = t, this.b = i, this.c = n;
  }
  static getNormal(t, i, n, r) {
    r.subVectors(n, i), kt.subVectors(t, i), r.cross(kt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, i, n, r, s) {
    kt.subVectors(r, i), ei.subVectors(n, i), Rr.subVectors(t, i);
    const a = kt.dot(kt), o = kt.dot(ei), c = kt.dot(Rr), l = ei.dot(ei), h = ei.dot(Rr), f = a * l - o * o;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / f, m = (l * c - o * h) * u, M = (a * h - o * c) * u;
    return s.set(1 - m - M, M, m);
  }
  static containsPoint(t, i, n, r) {
    return this.getBarycoord(t, i, n, r, ti) === null ? !1 : ti.x >= 0 && ti.y >= 0 && ti.x + ti.y <= 1;
  }
  static getInterpolation(t, i, n, r, s, a, o, c) {
    return this.getBarycoord(t, i, n, r, ti) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, ti.x), c.addScaledVector(a, ti.y), c.addScaledVector(o, ti.z), c);
  }
  static getInterpolatedAttribute(t, i, n, r, s, a) {
    return Dr.setScalar(0), Ir.setScalar(0), Ur.setScalar(0), Dr.fromBufferAttribute(t, i), Ir.fromBufferAttribute(t, n), Ur.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(Dr, s.x), a.addScaledVector(Ir, s.y), a.addScaledVector(Ur, s.z), a;
  }
  static isFrontFacing(t, i, n, r) {
    return kt.subVectors(n, i), ei.subVectors(t, i), kt.cross(ei).dot(r) < 0;
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
    return kt.subVectors(this.c, this.b), ei.subVectors(this.a, this.b), kt.cross(ei).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return ji.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, i) {
    return ji.getBarycoord(t, this.a, this.b, this.c, i);
  }
  getInterpolation(t, i, n, r, s) {
    return ji.getInterpolation(t, this.a, this.b, this.c, i, n, r, s);
  }
  containsPoint(t) {
    return ji.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return ji.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, i) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Gi.subVectors(r, n), Hi.subVectors(s, n), Cr.subVectors(t, n);
    const c = Gi.dot(Cr), l = Hi.dot(Cr);
    if (c <= 0 && l <= 0) return i.copy(n);
    Pr.subVectors(t, r);
    const h = Gi.dot(Pr), f = Hi.dot(Pr);
    if (h >= 0 && f <= h) return i.copy(r);
    const u = c * f - h * l;
    if (u <= 0 && c >= 0 && h <= 0)
      return a = c / (c - h), i.copy(n).addScaledVector(Gi, a);
    Lr.subVectors(t, s);
    const m = Gi.dot(Lr), M = Hi.dot(Lr);
    if (M >= 0 && m <= M) return i.copy(s);
    const S = m * l - c * M;
    if (S <= 0 && l >= 0 && M <= 0)
      return o = l / (l - M), i.copy(n).addScaledVector(Hi, o);
    const p = h * M - m * f;
    if (p <= 0 && f - h >= 0 && m - M >= 0)
      return ks.subVectors(s, r), o = (f - h) / (f - h + (m - M)), i.copy(r).addScaledVector(ks, o);
    const d = 1 / (p + S + u);
    return a = S * d, o = u * d, i.copy(n).addScaledVector(Gi, a).addScaledVector(Hi, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, Rn = class {
  constructor(e = new O(1 / 0, 1 / 0, 1 / 0), t = new O(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(zt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(zt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const i = zt.copy(t).multiplyScalar(0.5);
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
        e.isMesh === !0 ? e.getVertexPosition(s, zt) : zt.fromBufferAttribute(r, s), zt.applyMatrix4(e.matrixWorld), this.expandByPoint(zt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Bn.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), Bn.copy(i.boundingBox)), Bn.applyMatrix4(e.matrixWorld), this.union(Bn);
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
    return this.clampPoint(e.center, zt), zt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(dn), kn.subVectors(this.max, dn), Wi.subVectors(e.a, dn), Xi.subVectors(e.b, dn), qi.subVectors(e.c, dn), fi.subVectors(Xi, Wi), pi.subVectors(qi, Xi), xi.subVectors(Wi, qi);
    let t = [
      0,
      -fi.z,
      fi.y,
      0,
      -pi.z,
      pi.y,
      0,
      -xi.z,
      xi.y,
      fi.z,
      0,
      -fi.x,
      pi.z,
      0,
      -pi.x,
      xi.z,
      0,
      -xi.x,
      -fi.y,
      fi.x,
      0,
      -pi.y,
      pi.x,
      0,
      -xi.y,
      xi.x,
      0
    ];
    return !Nr(t, Wi, Xi, qi, kn) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !Nr(t, Wi, Xi, qi, kn)) ? !1 : (zn.crossVectors(fi, pi), t = [
      zn.x,
      zn.y,
      zn.z
    ], Nr(t, Wi, Xi, qi, kn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, zt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(zt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (ii[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), ii[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), ii[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), ii[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), ii[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), ii[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), ii[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), ii[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(ii), this);
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
}, ii = [
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O()
], zt = /* @__PURE__ */ new O(), Bn = /* @__PURE__ */ new Rn(), Wi = /* @__PURE__ */ new O(), Xi = /* @__PURE__ */ new O(), qi = /* @__PURE__ */ new O(), fi = /* @__PURE__ */ new O(), pi = /* @__PURE__ */ new O(), xi = /* @__PURE__ */ new O(), dn = /* @__PURE__ */ new O(), kn = /* @__PURE__ */ new O(), zn = /* @__PURE__ */ new O(), Ai = /* @__PURE__ */ new O();
function Nr(e, t, i, n, r) {
  for (let s = 0, a = e.length - 3; s <= a; s += 3) {
    Ai.fromArray(e, s);
    const o = r.x * Math.abs(Ai.x) + r.y * Math.abs(Ai.y) + r.z * Math.abs(Ai.z), c = t.dot(Ai), l = i.dot(Ai), h = n.dot(Ai);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o) return !1;
  }
  return !0;
}
var lt = /* @__PURE__ */ new O(), Gn = /* @__PURE__ */ new Ie(), sc = 0, Jt = class extends Di {
  constructor(e, t, i = !1) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: sc++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = El, this.updateRanges = [], this.gpuType = fr, this.version = 0;
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
      Gn.fromBufferAttribute(this, t), Gn.applyMatrix3(e), this.setXY(t, Gn.x, Gn.y);
    else if (this.itemSize === 3) for (let t = 0, i = this.count; t < i; t++)
      lt.fromBufferAttribute(this, t), lt.applyMatrix3(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      lt.fromBufferAttribute(this, t), lt.applyMatrix4(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      lt.fromBufferAttribute(this, t), lt.applyNormalMatrix(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      lt.fromBufferAttribute(this, t), lt.transformDirection(e), this.setXYZ(t, lt.x, lt.y, lt.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = Qi(i, this.array)), i;
  }
  setComponent(e, t, i) {
    return this.normalized && (i = xt(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Qi(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = xt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Qi(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = xt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Qi(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = xt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Qi(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = xt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, i) {
    return e *= this.itemSize, this.normalized && (t = xt(t, this.array), i = xt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this;
  }
  setXYZ(e, t, i, n) {
    return e *= this.itemSize, this.normalized && (t = xt(t, this.array), i = xt(i, this.array), n = xt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this;
  }
  setXYZW(e, t, i, n, r) {
    return e *= this.itemSize, this.normalized && (t = xt(t, this.array), i = xt(i, this.array), n = xt(n, this.array), r = xt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this.array[e + 3] = r, this;
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
}, to = class extends Jt {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}, io = class extends Jt {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}, li = class extends Jt {
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}, ac = /* @__PURE__ */ new Rn(), fn = /* @__PURE__ */ new O(), Vr = /* @__PURE__ */ new O(), cs = class {
  constructor(e = new O(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : ac.setFromPoints(e).getCenter(i);
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
    fn.subVectors(e, this.center);
    const t = fn.lengthSq();
    if (t > this.radius * this.radius) {
      const i = Math.sqrt(t), n = (i - this.radius) * 0.5;
      this.center.addScaledVector(fn, n / i), this.radius += n;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Vr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(fn.copy(e.center).add(Vr)), this.expandByPoint(fn.copy(e.center).sub(Vr))), this);
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
}, oc = 0, Nt = /* @__PURE__ */ new ot(), Fr = /* @__PURE__ */ new Lt(), Yi = /* @__PURE__ */ new O(), Rt = /* @__PURE__ */ new Rn(), pn = /* @__PURE__ */ new Rn(), pt = /* @__PURE__ */ new O(), Ui = class no extends Di {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: oc++ }), this.uuid = on(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (yl(t) ? io : to)(t, 1) : this.index = t, this;
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
    return Nt.makeRotationFromQuaternion(t), this.applyMatrix4(Nt), this;
  }
  rotateX(t) {
    return Nt.makeRotationX(t), this.applyMatrix4(Nt), this;
  }
  rotateY(t) {
    return Nt.makeRotationY(t), this.applyMatrix4(Nt), this;
  }
  rotateZ(t) {
    return Nt.makeRotationZ(t), this.applyMatrix4(Nt), this;
  }
  translate(t, i, n) {
    return Nt.makeTranslation(t, i, n), this.applyMatrix4(Nt), this;
  }
  scale(t, i, n) {
    return Nt.makeScale(t, i, n), this.applyMatrix4(Nt), this;
  }
  lookAt(t) {
    return Fr.lookAt(t), Fr.updateMatrix(), this.applyMatrix4(Fr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Yi).negate(), this.translate(Yi.x, Yi.y, Yi.z), this;
  }
  setFromPoints(t) {
    const i = this.getAttribute("position");
    if (i === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new li(n, 3));
    } else {
      const n = Math.min(t.length, i.count);
      for (let r = 0; r < n; r++) {
        const s = t[r];
        i.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > i.count && ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), i.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Rn());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new O(-1 / 0, -1 / 0, -1 / 0), new O(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), i) for (let n = 0, r = i.length; n < r; n++) {
        const s = i[n];
        Rt.setFromBufferAttribute(s), this.morphTargetsRelative ? (pt.addVectors(this.boundingBox.min, Rt.min), this.boundingBox.expandByPoint(pt), pt.addVectors(this.boundingBox.max, Rt.max), this.boundingBox.expandByPoint(pt)) : (this.boundingBox.expandByPoint(Rt.min), this.boundingBox.expandByPoint(Rt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new cs());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new O(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Rt.setFromBufferAttribute(t), i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s];
        pn.setFromBufferAttribute(o), this.morphTargetsRelative ? (pt.addVectors(Rt.min, pn.min), Rt.expandByPoint(pt), pt.addVectors(Rt.max, pn.max), Rt.expandByPoint(pt)) : (Rt.expandByPoint(pn.min), Rt.expandByPoint(pn.max));
      }
      Rt.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        pt.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(pt));
      if (i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s], c = this.morphTargetsRelative;
        for (let l = 0, h = o.count; l < h; l++)
          pt.fromBufferAttribute(o, l), c && (Yi.fromBufferAttribute(t, l), pt.add(Yi)), r = Math.max(r, n.distanceToSquared(pt));
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
    (a === void 0 || a.count !== n.count) && (a = new Jt(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], c = [];
    for (let v = 0; v < n.count; v++)
      o[v] = new O(), c[v] = new O();
    const l = new O(), h = new O(), f = new O(), u = new Ie(), m = new Ie(), M = new Ie(), S = new O(), p = new O();
    function d(v, E, X) {
      l.fromBufferAttribute(n, v), h.fromBufferAttribute(n, E), f.fromBufferAttribute(n, X), u.fromBufferAttribute(s, v), m.fromBufferAttribute(s, E), M.fromBufferAttribute(s, X), h.sub(l), f.sub(l), m.sub(u), M.sub(u);
      const w = 1 / (m.x * M.y - M.x * m.y);
      isFinite(w) && (S.copy(h).multiplyScalar(M.y).addScaledVector(f, -m.y).multiplyScalar(w), p.copy(f).multiplyScalar(m.x).addScaledVector(h, -M.x).multiplyScalar(w), o[v].add(S), o[E].add(S), o[X].add(S), c[v].add(p), c[E].add(p), c[X].add(p));
    }
    let R = this.groups;
    R.length === 0 && (R = [{
      start: 0,
      count: t.count
    }]);
    for (let v = 0, E = R.length; v < E; ++v) {
      const X = R[v], w = X.start, G = X.count;
      for (let W = w, H = w + G; W < H; W += 3) d(t.getX(W + 0), t.getX(W + 1), t.getX(W + 2));
    }
    const T = new O(), A = new O(), y = new O(), b = new O();
    function P(v) {
      y.fromBufferAttribute(r, v), b.copy(y);
      const E = o[v];
      T.copy(E), T.sub(y.multiplyScalar(y.dot(E))).normalize(), A.crossVectors(b, E);
      const X = A.dot(c[v]) < 0 ? -1 : 1;
      a.setXYZW(v, T.x, T.y, T.z, X);
    }
    for (let v = 0, E = R.length; v < E; ++v) {
      const X = R[v], w = X.start, G = X.count;
      for (let W = w, H = w + G; W < H; W += 3)
        P(t.getX(W + 0)), P(t.getX(W + 1)), P(t.getX(W + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const t = this.index, i = this.getAttribute("position");
    if (i !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== i.count)
        n = new Jt(new Float32Array(i.count * 3), 3), this.setAttribute("normal", n);
      else for (let u = 0, m = n.count; u < m; u++) n.setXYZ(u, 0, 0, 0);
      const r = new O(), s = new O(), a = new O(), o = new O(), c = new O(), l = new O(), h = new O(), f = new O();
      if (t) for (let u = 0, m = t.count; u < m; u += 3) {
        const M = t.getX(u + 0), S = t.getX(u + 1), p = t.getX(u + 2);
        r.fromBufferAttribute(i, M), s.fromBufferAttribute(i, S), a.fromBufferAttribute(i, p), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), o.fromBufferAttribute(n, M), c.fromBufferAttribute(n, S), l.fromBufferAttribute(n, p), o.add(h), c.add(h), l.add(h), n.setXYZ(M, o.x, o.y, o.z), n.setXYZ(S, c.x, c.y, c.z), n.setXYZ(p, l.x, l.y, l.z);
      }
      else for (let u = 0, m = i.count; u < m; u += 3)
        r.fromBufferAttribute(i, u + 0), s.fromBufferAttribute(i, u + 1), a.fromBufferAttribute(i, u + 2), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let i = 0, n = t.count; i < n; i++)
      pt.fromBufferAttribute(t, i), pt.normalize(), t.setXYZ(i, pt.x, pt.y, pt.z);
  }
  toNonIndexed() {
    function t(o, c) {
      const l = o.array, h = o.itemSize, f = o.normalized, u = new l.constructor(c.length * h);
      let m = 0, M = 0;
      for (let S = 0, p = c.length; S < p; S++) {
        o.isInterleavedBufferAttribute ? m = c[S] * o.data.stride + o.offset : m = c[S] * h;
        for (let d = 0; d < h; d++) u[M++] = l[m++];
      }
      return new Jt(u, h, f);
    }
    if (this.index === null)
      return ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const i = new no(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const c = r[o], l = t(c, n);
      i.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let h = 0, f = l.length; h < f; h++) {
        const u = l[h], m = t(u, n);
        c.push(m);
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
      const l = this.morphAttributes[c], h = [];
      for (let f = 0, u = l.length; f < u; f++) {
        const m = l[f];
        h.push(m.toJSON(t.data));
      }
      h.length > 0 && (r[c] = h, s = !0);
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
      const h = r[l];
      this.setAttribute(l, h.clone(i));
    }
    const s = t.morphAttributes;
    for (const l in s) {
      const h = [], f = s[l];
      for (let u = 0, m = f.length; u < m; u++) h.push(f[u].clone(i));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let l = 0, h = a.length; l < h; l++) {
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
}, lc = 0, Cn = class extends Di {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: lc++ }), this.uuid = on(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new ke(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Sr, this.stencilZFail = Sr, this.stencilZPass = Sr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
          ye(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === void 0) {
          ye(`Material: '${t}' is not a property of THREE.${this.type}.`);
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
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new ke().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
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
}, ni = /* @__PURE__ */ new O(), Or = /* @__PURE__ */ new O(), Hn = /* @__PURE__ */ new O(), mi = /* @__PURE__ */ new O(), Br = /* @__PURE__ */ new O(), Wn = /* @__PURE__ */ new O(), kr = /* @__PURE__ */ new O(), cc = class {
  constructor(e = new O(), t = new O(0, 0, -1)) {
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
    return this.origin.copy(this.at(e, ni)), this;
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
    const t = ni.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (ni.copy(this.origin).addScaledVector(this.direction, t), ni.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, i, n) {
    Or.copy(e).add(t).multiplyScalar(0.5), Hn.copy(t).sub(e).normalize(), mi.copy(this.origin).sub(Or);
    const r = e.distanceTo(t) * 0.5, s = -this.direction.dot(Hn), a = mi.dot(this.direction), o = -mi.dot(Hn), c = mi.lengthSq(), l = Math.abs(1 - s * s);
    let h, f, u, m;
    if (l > 0)
      if (h = s * o - a, f = s * a - o, m = r * l, h >= 0) if (f >= -m) if (f <= m) {
        const M = 1 / l;
        h *= M, f *= M, u = h * (h + s * f + 2 * a) + f * (s * h + f + 2 * o) + c;
      } else
        f = r, h = Math.max(0, -(s * f + a)), u = -h * h + f * (f + 2 * o) + c;
      else
        f = -r, h = Math.max(0, -(s * f + a)), u = -h * h + f * (f + 2 * o) + c;
      else f <= -m ? (h = Math.max(0, -(-s * r + a)), f = h > 0 ? -r : Math.min(Math.max(-r, -o), r), u = -h * h + f * (f + 2 * o) + c) : f <= m ? (h = 0, f = Math.min(Math.max(-r, -o), r), u = f * (f + 2 * o) + c) : (h = Math.max(0, -(s * r + a)), f = h > 0 ? r : Math.min(Math.max(-r, -o), r), u = -h * h + f * (f + 2 * o) + c);
    else
      f = s > 0 ? -r : r, h = Math.max(0, -(s * f + a)), u = -h * h + f * (f + 2 * o) + c;
    return i && i.copy(this.origin).addScaledVector(this.direction, h), n && n.copy(Or).addScaledVector(Hn, f), u;
  }
  intersectSphere(e, t) {
    ni.subVectors(e.center, this.origin);
    const i = ni.dot(this.direction), n = ni.dot(ni) - i * i, r = e.radius * e.radius;
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
    const c = 1 / this.direction.x, l = 1 / this.direction.y, h = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (i = (e.min.x - f.x) * c, n = (e.max.x - f.x) * c) : (i = (e.max.x - f.x) * c, n = (e.min.x - f.x) * c), l >= 0 ? (r = (e.min.y - f.y) * l, s = (e.max.y - f.y) * l) : (r = (e.max.y - f.y) * l, s = (e.min.y - f.y) * l), i > s || r > n || ((r > i || isNaN(i)) && (i = r), (s < n || isNaN(n)) && (n = s), h >= 0 ? (a = (e.min.z - f.z) * h, o = (e.max.z - f.z) * h) : (a = (e.max.z - f.z) * h, o = (e.min.z - f.z) * h), i > o || a > n) || ((a > i || i !== i) && (i = a), (o < n || n !== n) && (n = o), n < 0) ? null : this.at(i >= 0 ? i : n, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, ni) !== null;
  }
  intersectTriangle(e, t, i, n, r) {
    Br.subVectors(t, e), Wn.subVectors(i, e), kr.crossVectors(Br, Wn);
    let s = this.direction.dot(kr), a;
    if (s > 0) {
      if (n) return null;
      a = 1;
    } else if (s < 0)
      a = -1, s = -s;
    else return null;
    mi.subVectors(this.origin, e);
    const o = a * this.direction.dot(Wn.crossVectors(mi, Wn));
    if (o < 0) return null;
    const c = a * this.direction.dot(Br.cross(mi));
    if (c < 0 || o + c > s) return null;
    const l = -a * mi.dot(kr);
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
}, ro = class extends Cn {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new ke(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new wn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, zs = /* @__PURE__ */ new ot(), Ei = /* @__PURE__ */ new cc(), Xn = /* @__PURE__ */ new cs(), Gs = /* @__PURE__ */ new O(), qn = /* @__PURE__ */ new O(), Yn = /* @__PURE__ */ new O(), Kn = /* @__PURE__ */ new O(), zr = /* @__PURE__ */ new O(), Zn = /* @__PURE__ */ new O(), Hs = /* @__PURE__ */ new O(), Jn = /* @__PURE__ */ new O(), Ht = class extends Lt {
  constructor(e = new Ui(), t = new ro()) {
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
      Zn.set(0, 0, 0);
      for (let o = 0, c = r.length; o < c; o++) {
        const l = a[o], h = r[o];
        l !== 0 && (zr.fromBufferAttribute(h, e), s ? Zn.addScaledVector(zr, l) : Zn.addScaledVector(zr.sub(t), l));
      }
      t.add(Zn);
    }
    return t;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.material, r = this.matrixWorld;
    n !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), Xn.copy(i.boundingSphere), Xn.applyMatrix4(r), Ei.copy(e.ray).recast(e.near), !(Xn.containsPoint(Ei.origin) === !1 && (Ei.intersectSphere(Xn, Gs) === null || Ei.origin.distanceToSquared(Gs) > (e.far - e.near) ** 2)) && (zs.copy(r).invert(), Ei.copy(e.ray).applyMatrix4(zs), !(i.boundingBox !== null && Ei.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, Ei)));
  }
  _computeIntersections(e, t, i) {
    let n;
    const r = this.geometry, s = this.material, a = r.index, o = r.attributes.position, c = r.attributes.uv, l = r.attributes.uv1, h = r.attributes.normal, f = r.groups, u = r.drawRange;
    if (a !== null) if (Array.isArray(s)) for (let m = 0, M = f.length; m < M; m++) {
      const S = f[m], p = s[S.materialIndex], d = Math.max(S.start, u.start), R = Math.min(a.count, Math.min(S.start + S.count, u.start + u.count));
      for (let T = d, A = R; T < A; T += 3) {
        const y = a.getX(T), b = a.getX(T + 1), P = a.getX(T + 2);
        n = Qn(this, p, e, i, c, l, h, y, b, P), n && (n.faceIndex = Math.floor(T / 3), n.face.materialIndex = S.materialIndex, t.push(n));
      }
    }
    else {
      const m = Math.max(0, u.start), M = Math.min(a.count, u.start + u.count);
      for (let S = m, p = M; S < p; S += 3) {
        const d = a.getX(S), R = a.getX(S + 1), T = a.getX(S + 2);
        n = Qn(this, s, e, i, c, l, h, d, R, T), n && (n.faceIndex = Math.floor(S / 3), t.push(n));
      }
    }
    else if (o !== void 0) if (Array.isArray(s)) for (let m = 0, M = f.length; m < M; m++) {
      const S = f[m], p = s[S.materialIndex], d = Math.max(S.start, u.start), R = Math.min(o.count, Math.min(S.start + S.count, u.start + u.count));
      for (let T = d, A = R; T < A; T += 3) {
        const y = T, b = T + 1, P = T + 2;
        n = Qn(this, p, e, i, c, l, h, y, b, P), n && (n.faceIndex = Math.floor(T / 3), n.face.materialIndex = S.materialIndex, t.push(n));
      }
    }
    else {
      const m = Math.max(0, u.start), M = Math.min(o.count, u.start + u.count);
      for (let S = m, p = M; S < p; S += 3) {
        const d = S, R = S + 1, T = S + 2;
        n = Qn(this, s, e, i, c, l, h, d, R, T), n && (n.faceIndex = Math.floor(S / 3), t.push(n));
      }
    }
  }
};
function hc(e, t, i, n, r, s, a, o) {
  let c;
  if (t.side === 1 ? c = n.intersectTriangle(a, s, r, !0, o) : c = n.intersectTriangle(r, s, a, t.side === 0, o), c === null) return null;
  Jn.copy(o), Jn.applyMatrix4(e.matrixWorld);
  const l = i.ray.origin.distanceTo(Jn);
  return l < i.near || l > i.far ? null : {
    distance: l,
    point: Jn.clone(),
    object: e
  };
}
function Qn(e, t, i, n, r, s, a, o, c, l) {
  e.getVertexPosition(o, qn), e.getVertexPosition(c, Yn), e.getVertexPosition(l, Kn);
  const h = hc(e, t, i, n, qn, Yn, Kn, Hs);
  if (h) {
    const f = new O();
    un.getBarycoord(Hs, qn, Yn, Kn, f), r && (h.uv = un.getInterpolatedAttribute(r, o, c, l, f, new Ie())), s && (h.uv1 = un.getInterpolatedAttribute(s, o, c, l, f, new Ie())), a && (h.normal = un.getInterpolatedAttribute(a, o, c, l, f, new O()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: c,
      c: l,
      normal: new O(),
      materialIndex: 0
    };
    un.getNormal(qn, Yn, Kn, u.normal), h.face = u, h.barycoord = f;
  }
  return h;
}
var uc = class extends Ft {
  constructor(e = null, t = 1, i = 1, n, r, s, a, o, c = Et, l = Et, h, f) {
    super(null, s, a, o, c, l, n, r, h, f), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: i
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Gr = /* @__PURE__ */ new O(), dc = /* @__PURE__ */ new O(), fc = /* @__PURE__ */ new De(), bi = class {
  constructor(e = new O(1, 0, 0), t = 0) {
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
    const n = Gr.subVectors(i, t).cross(dc.subVectors(e, t)).normalize();
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
    const n = e.delta(Gr), r = this.normal.dot(n);
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
    const i = t || fc.getNormalMatrix(e), n = this.coplanarPoint(Gr).applyMatrix4(e), r = this.normal.applyMatrix3(i).normalize();
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
}, yi = /* @__PURE__ */ new cs(), pc = /* @__PURE__ */ new Ie(0.5, 0.5), jn = /* @__PURE__ */ new O(), hs = class {
  constructor(e = new bi(), t = new bi(), i = new bi(), n = new bi(), r = new bi(), s = new bi()) {
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
  setFromProjectionMatrix(e, t = nn, i = !1) {
    const n = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], c = r[3], l = r[4], h = r[5], f = r[6], u = r[7], m = r[8], M = r[9], S = r[10], p = r[11], d = r[12], R = r[13], T = r[14], A = r[15];
    if (n[0].setComponents(c - s, u - l, p - m, A - d).normalize(), n[1].setComponents(c + s, u + l, p + m, A + d).normalize(), n[2].setComponents(c + a, u + h, p + M, A + R).normalize(), n[3].setComponents(c - a, u - h, p - M, A - R).normalize(), i)
      n[4].setComponents(o, f, S, T).normalize(), n[5].setComponents(c - o, u - f, p - S, A - T).normalize();
    else if (n[4].setComponents(c - o, u - f, p - S, A - T).normalize(), t === 2e3) n[5].setComponents(c + o, u + f, p + S, A + T).normalize();
    else if (t === 2001) n[5].setComponents(o, f, S, T).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(yi);
  }
  intersectsSprite(e) {
    return yi.center.set(0, 0, 0), yi.radius = 0.7071067811865476 + pc.distanceTo(e.center), yi.applyMatrix4(e.matrixWorld), this.intersectsSphere(yi);
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
      if (jn.x = n.normal.x > 0 ? e.max.x : e.min.x, jn.y = n.normal.y > 0 ? e.max.y : e.min.y, jn.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(jn) < 0) return !1;
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
}, so = class extends Ft {
  constructor(e = [], t = 301, i, n, r, s, a, o, c, l) {
    super(e, t, i, n, r, s, a, o, c, l), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, mc = class extends Ft {
  constructor(e, t, i, n, r, s, a, o, c) {
    super(e, t, i, n, r, s, a, o, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}, sn = class extends Ft {
  constructor(e, t, i = Pi, n, r, s, a = Et, o = Et, c, l = Tn, h = 1) {
    if (l !== 1026 && l !== 1027) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: h
    }, n, r, s, a, o, l, i, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new ls(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, gc = class extends sn {
  constructor(e, t = Pi, i = 301, n, r, s = Et, a = Et, o, c = Tn) {
    const l = {
      width: e,
      height: e,
      depth: 1
    }, h = [
      l,
      l,
      l,
      l,
      l,
      l
    ];
    super(e, e, t, i, n, r, s, a, o, c), this.image = h, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, ao = class extends Ft {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, us = class oo extends Ui {
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
    const c = [], l = [], h = [], f = [];
    let u = 0, m = 0;
    M("z", "y", "x", -1, -1, n, i, t, a, s, 0), M("z", "y", "x", 1, -1, n, i, -t, a, s, 1), M("x", "z", "y", 1, 1, t, n, i, r, a, 2), M("x", "z", "y", 1, -1, t, n, -i, r, a, 3), M("x", "y", "z", 1, -1, t, i, n, r, s, 4), M("x", "y", "z", -1, -1, t, i, -n, r, s, 5), this.setIndex(c), this.setAttribute("position", new li(l, 3)), this.setAttribute("normal", new li(h, 3)), this.setAttribute("uv", new li(f, 2));
    function M(S, p, d, R, T, A, y, b, P, v, E) {
      const X = A / P, w = y / v, G = A / 2, W = y / 2, H = b / 2, B = P + 1, q = v + 1;
      let N = 0, J = 0;
      const ee = new O();
      for (let te = 0; te < q; te++) {
        const he = te * w - W;
        for (let Se = 0; Se < B; Se++)
          ee[S] = (Se * X - G) * R, ee[p] = he * T, ee[d] = H, l.push(ee.x, ee.y, ee.z), ee[S] = 0, ee[p] = 0, ee[d] = b > 0 ? 1 : -1, h.push(ee.x, ee.y, ee.z), f.push(Se / P), f.push(1 - te / v), N += 1;
      }
      for (let te = 0; te < v; te++) for (let he = 0; he < P; he++) {
        const Se = u + he + B * te, We = u + he + B * (te + 1), Ye = u + (he + 1) + B * (te + 1), Y = u + (he + 1) + B * te;
        c.push(Se, We, Y), c.push(We, Ye, Y), J += 6;
      }
      o.addGroup(m, J, E), m += J, u += N;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new oo(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}, En = class lo extends Ui {
  constructor(t = 1, i = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: i,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = i / 2, o = Math.floor(n), c = Math.floor(r), l = o + 1, h = c + 1, f = t / o, u = i / c, m = [], M = [], S = [], p = [];
    for (let d = 0; d < h; d++) {
      const R = d * u - a;
      for (let T = 0; T < l; T++) {
        const A = T * f - s;
        M.push(A, -R, 0), S.push(0, 0, 1), p.push(T / o), p.push(1 - d / c);
      }
    }
    for (let d = 0; d < c; d++) for (let R = 0; R < o; R++) {
      const T = R + l * d, A = R + l * (d + 1), y = R + 1 + l * (d + 1), b = R + 1 + l * d;
      m.push(T, A, b), m.push(A, y, b);
    }
    this.setIndex(m), this.setAttribute("position", new li(M, 3)), this.setAttribute("normal", new li(S, 3)), this.setAttribute("uv", new li(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new lo(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}, vc = class extends Cn {
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new ke(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
};
function an(e) {
  const t = {};
  for (const i in e) {
    t[i] = {};
    for (const n in e[i]) {
      const r = e[i][n];
      if (Ws(r)) r.isRenderTargetTexture ? (ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[i][n] = null) : t[i][n] = r.clone();
      else if (Array.isArray(r)) if (Ws(r[0])) {
        const s = [];
        for (let a = 0, o = r.length; a < o; a++) s[a] = r[a].clone();
        t[i][n] = s;
      } else t[i][n] = r.slice();
      else t[i][n] = r;
    }
  }
  return t;
}
function At(e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const n = an(e[i]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function Ws(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function _c(e) {
  const t = [];
  for (let i = 0; i < e.length; i++) t.push(e[i].clone());
  return t;
}
function co(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Be.workingColorSpace;
}
var ho = {
  clone: an,
  merge: At
}, Mc = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Sc = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, Vt = class extends Cn {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Mc, this.fragmentShader = Sc, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = an(e.uniforms), this.uniformsGroups = _c(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
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
          this.uniforms[i].value = new ke().setHex(n.value);
          break;
        case "v2":
          this.uniforms[i].value = new Ie().fromArray(n.value);
          break;
        case "v3":
          this.uniforms[i].value = new O().fromArray(n.value);
          break;
        case "v4":
          this.uniforms[i].value = new st().fromArray(n.value);
          break;
        case "m3":
          this.uniforms[i].value = new De().fromArray(n.value);
          break;
        case "m4":
          this.uniforms[i].value = new ot().fromArray(n.value);
          break;
        default:
          this.uniforms[i].value = n.value;
      }
    }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (const i in e.extensions) this.extensions[i] = e.extensions[i];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}, xc = class extends Vt {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, Ac = class extends Cn {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Al, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, Ec = class extends Cn {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
};
function $n(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var Pn = class {
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
}, yc = class extends Pn {
  constructor(e, t, i, n) {
    super(e, t, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ys,
      endingEnd: ys
    };
  }
  intervalChanged_(e, t, i) {
    const n = this.parameterPositions;
    let r = e - 2, s = e + 1, a = n[r], o = n[s];
    if (a === void 0) switch (this.getSettings_().endingStart) {
      case Ts:
        r = e, a = 2 * t - i;
        break;
      case bs:
        r = n.length - 2, a = t + n[r] - n[r + 1];
        break;
      default:
        r = e, a = i;
    }
    if (o === void 0) switch (this.getSettings_().endingEnd) {
      case Ts:
        s = e, o = 2 * i - t;
        break;
      case bs:
        s = 1, o = i + n[1] - n[0];
        break;
      default:
        s = e - 1, o = t;
    }
    const c = (i - t) * 0.5, l = this.valueSize;
    this._weightPrev = c / (t - a), this._weightNext = c / (o - i), this._offsetPrev = r * l, this._offsetNext = s * l;
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = this._offsetPrev, h = this._offsetNext, f = this._weightPrev, u = this._weightNext, m = (i - t) / (n - t), M = m * m, S = M * m, p = -f * S + 2 * f * M - f * m, d = (1 + f) * S + (-1.5 - 2 * f) * M + (-0.5 + f) * m + 1, R = (-1 - u) * S + (1.5 + u) * M + 0.5 * m, T = u * S - u * M;
    for (let A = 0; A !== a; ++A) r[A] = p * s[l + A] + d * s[c + A] + R * s[o + A] + T * s[h + A];
    return r;
  }
}, Tc = class extends Pn {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = (i - t) / (n - t), h = 1 - l;
    for (let f = 0; f !== a; ++f) r[f] = s[c + f] * h + s[o + f] * l;
    return r;
  }
}, bc = class extends Pn {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, wc = class extends Pn {
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, c = o - a, l = this.inTangents, h = this.outTangents;
    if (!l || !h) {
      const m = (i - t) / (n - t), M = 1 - m;
      for (let S = 0; S !== a; ++S) r[S] = s[c + S] * M + s[o + S] * m;
      return r;
    }
    const f = a * 2, u = e - 1;
    for (let m = 0; m !== a; ++m) {
      const M = s[c + m], S = s[o + m], p = u * f + m * 2, d = h[p], R = h[p + 1], T = e * f + m * 2, A = l[T], y = l[T + 1];
      let b = (i - t) / (n - t), P, v, E, X, w;
      for (let G = 0; G < 8; G++) {
        P = b * b, v = P * b, E = 1 - b, X = E * E, w = X * E;
        const W = w * t + 3 * X * b * d + 3 * E * P * A + v * n - i;
        if (Math.abs(W) < 1e-10) break;
        const H = 3 * X * (d - t) + 6 * E * b * (A - d) + 3 * P * (n - A);
        if (Math.abs(H) < 1e-10) break;
        b = b - W / H, b = Math.max(0, Math.min(1, b));
      }
      r[m] = w * M + 3 * X * b * R + 3 * E * P * y + v * S;
    }
    return r;
  }
}, Qt = class {
  constructor(e, t, i, n) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = $n(t, this.TimeBufferType), this.values = $n(i, this.ValueBufferType), this.setInterpolation(n || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let i;
    if (t.toJSON !== this.toJSON) i = t.toJSON(e);
    else {
      i = {
        name: e.name,
        times: $n(e.times, Array),
        values: $n(e.values, Array)
      };
      const n = e.getInterpolation();
      n !== e.DefaultInterpolation && (i.interpolation = n);
    }
    return i.type = e.ValueTypeName, i;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new bc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Tc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new yc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const t = new wc(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case cr:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case is:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case Mr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case Es:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      const i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(i);
      return ye("KeyframeTrack:", i), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return cr;
      case this.InterpolantFactoryMethodLinear:
        return is;
      case this.InterpolantFactoryMethodSmooth:
        return Mr;
      case this.InterpolantFactoryMethodBezier:
        return Es;
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
    if (n !== void 0 && Tl(n))
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
    const e = this.times.slice(), t = this.values.slice(), i = this.getValueSize(), n = this.getInterpolation() === Mr, r = e.length - 1;
    let s = 1;
    for (let a = 1; a < r; ++a) {
      let o = !1;
      const c = e[a];
      if (c !== e[a + 1] && (a !== 1 || c !== e[0])) if (n)
        o = !0;
      else {
        const l = a * i, h = l - i, f = l + i;
        for (let u = 0; u !== i; ++u) {
          const m = t[l + u];
          if (m !== t[h + u] || m !== t[f + u]) {
            o = !0;
            break;
          }
        }
      }
      if (o) {
        if (a !== s) {
          e[s] = e[a];
          const l = a * i, h = s * i;
          for (let f = 0; f !== i; ++f) t[h + f] = t[l + f];
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
Qt.prototype.ValueTypeName = "";
Qt.prototype.TimeBufferType = Float32Array;
Qt.prototype.ValueBufferType = Float32Array;
Qt.prototype.DefaultInterpolation = is;
var Ln = class extends Qt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Ln.prototype.ValueTypeName = "bool";
Ln.prototype.ValueBufferType = Array;
Ln.prototype.DefaultInterpolation = cr;
Ln.prototype.InterpolantFactoryMethodLinear = void 0;
Ln.prototype.InterpolantFactoryMethodSmooth = void 0;
var Rc = class extends Qt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
Rc.prototype.ValueTypeName = "color";
var Cc = class extends Qt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
Cc.prototype.ValueTypeName = "number";
var Pc = class extends Pn {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = (i - t) / (n - t);
    let c = e * a;
    for (let l = c + a; c !== l; c += 4) Ii.slerpFlat(r, 0, s, c - a, s, c, o);
    return r;
  }
}, uo = class extends Qt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Pc(this.times, this.values, this.getValueSize(), e);
  }
};
uo.prototype.ValueTypeName = "quaternion";
uo.prototype.InterpolantFactoryMethodSmooth = void 0;
var Dn = class extends Qt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Dn.prototype.ValueTypeName = "string";
Dn.prototype.ValueBufferType = Array;
Dn.prototype.DefaultInterpolation = cr;
Dn.prototype.InterpolantFactoryMethodLinear = void 0;
Dn.prototype.InterpolantFactoryMethodSmooth = void 0;
var Lc = class extends Qt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
Lc.prototype.ValueTypeName = "vector";
var Dc = class {
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
    }, this.addHandler = function(l, h) {
      return c.push(l, h), this;
    }, this.removeHandler = function(l) {
      const h = c.indexOf(l);
      return h !== -1 && c.splice(h, 2), this;
    }, this.getHandler = function(l) {
      for (let h = 0, f = c.length; h < f; h += 2) {
        const u = c[h], m = c[h + 1];
        if (u.global && (u.lastIndex = 0), u.test(l)) return m;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}, Ic = /* @__PURE__ */ new Dc(), Uc = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : Ic, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
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
Uc.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Nc = class extends Lt {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new ke(e), this.intensity = t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}, Hr = /* @__PURE__ */ new ot(), Xs = /* @__PURE__ */ new O(), qs = /* @__PURE__ */ new O(), Vc = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ie(512, 512), this.mapType = Mi, this.map = null, this.mapPass = null, this.matrix = new ot(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new hs(), this._frameExtents = new Ie(1, 1), this._viewportCount = 1, this._viewports = [new st(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, i = this.matrix;
    Xs.setFromMatrixPosition(e.matrixWorld), t.position.copy(Xs), qs.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(qs), t.updateMatrixWorld(), Hr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Hr, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), i.multiply(Hr);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}, er = /* @__PURE__ */ new O(), tr = /* @__PURE__ */ new Ii(), qt = /* @__PURE__ */ new O(), fo = class extends Lt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ot(), this.projectionMatrix = new ot(), this.projectionMatrixInverse = new ot(), this.coordinateSystem = nn, this._reversedDepth = !1;
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
    super.updateMatrixWorld(e), this.matrixWorld.decompose(er, tr, qt), qt.x === 1 && qt.y === 1 && qt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(er, tr, qt.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, i = !1) {
    super.updateWorldMatrix(e, t, i), this.matrixWorld.decompose(er, tr, qt), qt.x === 1 && qt.y === 1 && qt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(er, tr, qt.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, gi = /* @__PURE__ */ new O(), Ys = /* @__PURE__ */ new Ie(), Ks = /* @__PURE__ */ new Ie(), Gt = class extends fo {
  constructor(e = 50, t = 1, i = 0.1, n = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = bn * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(xn * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return bn * 2 * Math.atan(Math.tan(xn * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, i) {
    gi.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(gi.x, gi.y).multiplyScalar(-e / gi.z), gi.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(gi.x, gi.y).multiplyScalar(-e / gi.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, Ys, Ks), t.subVectors(Ks, Ys);
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
    let t = e * Math.tan(xn * 0.5 * this.fov) / this.zoom, i = 2 * t, n = this.aspect * i, r = -0.5 * n;
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
}, pr = class extends fo {
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
}, Fc = class extends Vc {
  constructor() {
    super(new pr(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, Oc = class extends Nc {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Lt.DEFAULT_UP), this.updateMatrix(), this.target = new Lt(), this.shadow = new Fc();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}, Ki = -90, Zi = 1, Bc = class extends Lt {
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const n = new Gt(Ki, Zi, e, t);
    n.layers = this.layers, this.add(n);
    const r = new Gt(Ki, Zi, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Gt(Ki, Zi, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Gt(Ki, Zi, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Gt(Ki, Zi, e, t);
    o.layers = this.layers, this.add(o);
    const c = new Gt(Ki, Zi, e, t);
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
    const [r, s, a, o, c, l] = this.children, h = e.getRenderTarget(), f = e.getActiveCubeFace(), u = e.getActiveMipmapLevel(), m = e.xr.enabled;
    e.xr.enabled = !1;
    const M = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1;
    let S = !1;
    e.isWebGLRenderer === !0 ? S = e.state.buffers.depth.getReversed() : S = e.reversedDepthBuffer, e.setRenderTarget(i, 0, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(i, 1, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(i, 2, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(i, 3, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(i, 4, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, c), i.texture.generateMipmaps = M, e.setRenderTarget(i, 5, n), S && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(h, f, u), e.xr.enabled = m, i.texture.needsPMREMUpdate = !0;
  }
}, kc = class extends Gt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, ds = "\\[\\]\\.:\\/", zc = new RegExp("[" + ds + "]", "g"), fs = "[^" + ds + "]", Gc = "[^" + ds.replace("\\.", "") + "]", Hc = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", fs), Wc = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Gc), Xc = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", fs), qc = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", fs), Yc = new RegExp("^" + Hc + Wc + Xc + qc + "$"), Kc = [
  "material",
  "materials",
  "bones",
  "map"
], Zc = class {
  constructor(e, t, i) {
    const n = i || rt.parseTrackName(t);
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
}, rt = class $i {
  constructor(t, i, n) {
    this.path = i, this.parsedPath = n || $i.parseTrackName(i), this.node = $i.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, i, n) {
    return t && t.isAnimationObjectGroup ? new $i.Composite(t, i, n) : new $i(t, i, n);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(zc, "");
  }
  static parseTrackName(t) {
    const i = Yc.exec(t);
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
      Kc.indexOf(s) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = s);
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
    if (t || (t = $i.findNode(this.rootNode, i.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      ye("PropertyBinding: No target node found for track: " + this.path + ".");
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
          for (let h = 0; h < t.length; h++) if (t[h].name === l) {
            l = h;
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
rt.Composite = Zc;
rt.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
rt.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
rt.prototype.GetterByBindingType = [
  rt.prototype._getValue_direct,
  rt.prototype._getValue_array,
  rt.prototype._getValue_arrayElement,
  rt.prototype._getValue_toArray
];
rt.prototype.SetterByBindingTypeAndVersioning = [
  [
    rt.prototype._setValue_direct,
    rt.prototype._setValue_direct_setNeedsUpdate,
    rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    rt.prototype._setValue_array,
    rt.prototype._setValue_array_setNeedsUpdate,
    rt.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    rt.prototype._setValue_arrayElement,
    rt.prototype._setValue_arrayElement_setNeedsUpdate,
    rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    rt.prototype._setValue_fromArray,
    rt.prototype._setValue_fromArray_setNeedsUpdate,
    rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var Jc = class {
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
Fa = Jc;
Fa.prototype.isMatrix2 = !0;
function Zs(e, t, i, n) {
  const r = Qc(n);
  switch (i) {
    case Fo:
      return e * t;
    case Bo:
      return e * t / r.components * r.byteLength;
    case qa:
      return e * t / r.components * r.byteLength;
    case lr:
      return e * t * 2 / r.components * r.byteLength;
    case Ya:
      return e * t * 2 / r.components * r.byteLength;
    case Oo:
      return e * t * 3 / r.components * r.byteLength;
    case yn:
      return e * t * 4 / r.components * r.byteLength;
    case Ka:
      return e * t * 4 / r.components * r.byteLength;
    case ko:
    case zo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Go:
    case Ho:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Xo:
    case Yo:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case Wo:
    case qo:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case Ko:
    case Zo:
    case Qo:
    case jo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Jo:
    case $o:
    case el:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case tl:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case il:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case nl:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case rl:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case sl:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case al:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case ol:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case ll:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case cl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case hl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case ul:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case dl:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case fl:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case pl:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case ml:
    case gl:
    case vl:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case _l:
    case Ml:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case Sl:
    case xl:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${i} format.`);
}
function Qc(e) {
  switch (e) {
    case Mi:
    case Do:
      return {
        byteLength: 1,
        components: 1
      };
    case za:
    case Io:
    case Li:
      return {
        byteLength: 2,
        components: 1
      };
    case Ga:
    case Ha:
      return {
        byteLength: 2,
        components: 4
      };
    case Pi:
    case Uo:
    case fr:
      return {
        byteLength: 4,
        components: 1
      };
    case No:
    case Vo:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } }));
typeof window < "u" && (window.__THREE__ ? ye("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function po() {
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
function jc(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function i(o, c) {
    const l = o.array, h = o.usage, f = l.byteLength, u = e.createBuffer();
    e.bindBuffer(c, u), e.bufferData(c, l, h), o.onUploadCallback();
    let m;
    if (l instanceof Float32Array) m = e.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array) m = e.HALF_FLOAT;
    else if (l instanceof Uint16Array) o.isFloat16BufferAttribute ? m = e.HALF_FLOAT : m = e.UNSIGNED_SHORT;
    else if (l instanceof Int16Array) m = e.SHORT;
    else if (l instanceof Uint32Array) m = e.UNSIGNED_INT;
    else if (l instanceof Int32Array) m = e.INT;
    else if (l instanceof Int8Array) m = e.BYTE;
    else if (l instanceof Uint8Array) m = e.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray) m = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: u,
      type: m,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: f
    };
  }
  function n(o, c, l) {
    const h = c.array, f = c.updateRanges;
    if (e.bindBuffer(l, o), f.length === 0) e.bufferSubData(l, 0, h);
    else {
      f.sort((m, M) => m.start - M.start);
      let u = 0;
      for (let m = 1; m < f.length; m++) {
        const M = f[u], S = f[m];
        S.start <= M.start + M.count + 1 ? M.count = Math.max(M.count, S.start + S.count - M.start) : (++u, f[u] = S);
      }
      f.length = u + 1;
      for (let m = 0, M = f.length; m < M; m++) {
        const S = f[m];
        e.bufferSubData(l, S.start * h.BYTES_PER_ELEMENT, h, S.start, S.count);
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
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, {
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
}, ae = {
  common: {
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
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
    fogColor: { value: /* @__PURE__ */ new ke(16777215) }
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
    probesMin: { value: /* @__PURE__ */ new O() },
    probesMax: { value: /* @__PURE__ */ new O() },
    probesResolution: { value: /* @__PURE__ */ new O() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
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
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ie(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  }
}, Kt = {
  basic: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        specular: { value: /* @__PURE__ */ new ke(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.roughnessmap,
      ae.metalnessmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.gradientmap,
      ae.fog,
      ae.lights,
      { emissive: { value: /* @__PURE__ */ new ke(0) } }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ At([ae.points, ae.fog]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.fog,
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
    uniforms: /* @__PURE__ */ At([ae.common, ae.displacementmap]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ At([ae.sprite, ae.fog]),
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
    uniforms: /* @__PURE__ */ At([
      ae.common,
      ae.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new O() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ At([
      ae.lights,
      ae.fog,
      {
        color: { value: /* @__PURE__ */ new ke(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
Kt.physical = {
  uniforms: /* @__PURE__ */ At([Kt.standard.uniforms, {
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
    sheenColor: { value: /* @__PURE__ */ new ke(0) },
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
    attenuationColor: { value: /* @__PURE__ */ new ke(0) },
    specularColor: { value: /* @__PURE__ */ new ke(1, 1, 1) },
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
var ir = {
  r: 0,
  b: 0,
  g: 0
}, $c = /* @__PURE__ */ new ot(), mo = /* @__PURE__ */ new De();
mo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function eh(e, t, i, n, r, s) {
  const a = new ke(0);
  let o = r === !0 ? 0 : 1, c, l, h = null, f = 0, u = null;
  function m(R) {
    let T = R.isScene === !0 ? R.background : null;
    if (T && T.isTexture) {
      const A = R.backgroundBlurriness > 0;
      T = t.get(T, A);
    }
    return T;
  }
  function M(R) {
    let T = !1;
    const A = m(R);
    A === null ? p(a, o) : A && A.isColor && (p(A, 1), T = !0);
    const y = e.xr.getEnvironmentBlendMode();
    y === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, s) : y === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, s), (e.autoClear || T) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function S(R, T) {
    const A = m(T);
    A && (A.isCubeTexture || A.mapping === 306) ? (l === void 0 && (l = new Ht(new us(1, 1, 1), new Vt({
      name: "BackgroundCubeMaterial",
      uniforms: an(Kt.backgroundCube.uniforms),
      vertexShader: Kt.backgroundCube.vertexShader,
      fragmentShader: Kt.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(y, b, P) {
      this.matrixWorld.copyPosition(P.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), n.update(l)), l.material.uniforms.envMap.value = A, l.material.uniforms.backgroundBlurriness.value = T.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = T.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4($c.makeRotationFromEuler(T.backgroundRotation)).transpose(), A.isCubeTexture && A.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(mo), l.material.toneMapped = Be.getTransfer(A.colorSpace) !== ur, (h !== A || f !== A.version || u !== e.toneMapping) && (l.material.needsUpdate = !0, h = A, f = A.version, u = e.toneMapping), l.layers.enableAll(), R.unshift(l, l.geometry, l.material, 0, 0, null)) : A && A.isTexture && (c === void 0 && (c = new Ht(new En(2, 2), new Vt({
      name: "BackgroundMaterial",
      uniforms: an(Kt.background.uniforms),
      vertexShader: Kt.background.vertexShader,
      fragmentShader: Kt.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), n.update(c)), c.material.uniforms.t2D.value = A, c.material.uniforms.backgroundIntensity.value = T.backgroundIntensity, c.material.toneMapped = Be.getTransfer(A.colorSpace) !== ur, A.matrixAutoUpdate === !0 && A.updateMatrix(), c.material.uniforms.uvTransform.value.copy(A.matrix), (h !== A || f !== A.version || u !== e.toneMapping) && (c.material.needsUpdate = !0, h = A, f = A.version, u = e.toneMapping), c.layers.enableAll(), R.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function p(R, T) {
    R.getRGB(ir, co(e)), i.buffers.color.setClear(ir.r, ir.g, ir.b, T, s);
  }
  function d() {
    l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(R, T = 1) {
      a.set(R), o = T, p(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(R) {
      o = R, p(a, o);
    },
    render: M,
    addToRenderList: S,
    dispose: d
  };
}
function th(e, t) {
  const i = e.getParameter(e.MAX_VERTEX_ATTRIBS), n = {}, r = u(null);
  let s = r, a = !1;
  function o(w, G, W, H, B) {
    let q = !1;
    const N = f(w, H, W, G);
    s !== N && (s = N, l(s.object)), q = m(w, H, W, B), q && M(w, H, W, B), B !== null && t.update(B, e.ELEMENT_ARRAY_BUFFER), (q || a) && (a = !1, A(w, G, W, H), B !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(B).buffer));
  }
  function c() {
    return e.createVertexArray();
  }
  function l(w) {
    return e.bindVertexArray(w);
  }
  function h(w) {
    return e.deleteVertexArray(w);
  }
  function f(w, G, W, H) {
    const B = H.wireframe === !0;
    let q = n[G.id];
    q === void 0 && (q = {}, n[G.id] = q);
    const N = w.isInstancedMesh === !0 ? w.id : 0;
    let J = q[N];
    J === void 0 && (J = {}, q[N] = J);
    let ee = J[W.id];
    ee === void 0 && (ee = {}, J[W.id] = ee);
    let te = ee[B];
    return te === void 0 && (te = u(c()), ee[B] = te), te;
  }
  function u(w) {
    const G = [], W = [], H = [];
    for (let B = 0; B < i; B++)
      G[B] = 0, W[B] = 0, H[B] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: G,
      enabledAttributes: W,
      attributeDivisors: H,
      object: w,
      attributes: {},
      index: null
    };
  }
  function m(w, G, W, H) {
    const B = s.attributes, q = G.attributes;
    let N = 0;
    const J = W.getAttributes();
    for (const ee in J) if (J[ee].location >= 0) {
      const te = B[ee];
      let he = q[ee];
      if (he === void 0 && (ee === "instanceMatrix" && w.instanceMatrix && (he = w.instanceMatrix), ee === "instanceColor" && w.instanceColor && (he = w.instanceColor)), te === void 0 || te.attribute !== he || he && te.data !== he.data) return !0;
      N++;
    }
    return s.attributesNum !== N || s.index !== H;
  }
  function M(w, G, W, H) {
    const B = {}, q = G.attributes;
    let N = 0;
    const J = W.getAttributes();
    for (const ee in J) if (J[ee].location >= 0) {
      let te = q[ee];
      te === void 0 && (ee === "instanceMatrix" && w.instanceMatrix && (te = w.instanceMatrix), ee === "instanceColor" && w.instanceColor && (te = w.instanceColor));
      const he = {};
      he.attribute = te, te && te.data && (he.data = te.data), B[ee] = he, N++;
    }
    s.attributes = B, s.attributesNum = N, s.index = H;
  }
  function S() {
    const w = s.newAttributes;
    for (let G = 0, W = w.length; G < W; G++) w[G] = 0;
  }
  function p(w) {
    d(w, 0);
  }
  function d(w, G) {
    const W = s.newAttributes, H = s.enabledAttributes, B = s.attributeDivisors;
    W[w] = 1, H[w] === 0 && (e.enableVertexAttribArray(w), H[w] = 1), B[w] !== G && (e.vertexAttribDivisor(w, G), B[w] = G);
  }
  function R() {
    const w = s.newAttributes, G = s.enabledAttributes;
    for (let W = 0, H = G.length; W < H; W++) G[W] !== w[W] && (e.disableVertexAttribArray(W), G[W] = 0);
  }
  function T(w, G, W, H, B, q, N) {
    N === !0 ? e.vertexAttribIPointer(w, G, W, B, q) : e.vertexAttribPointer(w, G, W, H, B, q);
  }
  function A(w, G, W, H) {
    S();
    const B = H.attributes, q = W.getAttributes(), N = G.defaultAttributeValues;
    for (const J in q) {
      const ee = q[J];
      if (ee.location >= 0) {
        let te = B[J];
        if (te === void 0 && (J === "instanceMatrix" && w.instanceMatrix && (te = w.instanceMatrix), J === "instanceColor" && w.instanceColor && (te = w.instanceColor)), te !== void 0) {
          const he = te.normalized, Se = te.itemSize, We = t.get(te);
          if (We === void 0) continue;
          const Ye = We.buffer, Y = We.type, re = We.bytesPerElement, de = Y === e.INT || Y === e.UNSIGNED_INT || te.gpuType === 1013;
          if (te.isInterleavedBufferAttribute) {
            const ue = te.data, Te = ue.stride, we = te.offset;
            if (ue.isInstancedInterleavedBuffer) {
              for (let Pe = 0; Pe < ee.locationSize; Pe++) d(ee.location + Pe, ue.meshPerAttribute);
              w.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = ue.meshPerAttribute * ue.count);
            } else for (let Pe = 0; Pe < ee.locationSize; Pe++) p(ee.location + Pe);
            e.bindBuffer(e.ARRAY_BUFFER, Ye);
            for (let Pe = 0; Pe < ee.locationSize; Pe++) T(ee.location + Pe, Se / ee.locationSize, Y, he, Te * re, (we + Se / ee.locationSize * Pe) * re, de);
          } else {
            if (te.isInstancedBufferAttribute) {
              for (let ue = 0; ue < ee.locationSize; ue++) d(ee.location + ue, te.meshPerAttribute);
              w.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = te.meshPerAttribute * te.count);
            } else for (let ue = 0; ue < ee.locationSize; ue++) p(ee.location + ue);
            e.bindBuffer(e.ARRAY_BUFFER, Ye);
            for (let ue = 0; ue < ee.locationSize; ue++) T(ee.location + ue, Se / ee.locationSize, Y, he, Se * re, Se / ee.locationSize * ue * re, de);
          }
        } else if (N !== void 0) {
          const he = N[J];
          if (he !== void 0) switch (he.length) {
            case 2:
              e.vertexAttrib2fv(ee.location, he);
              break;
            case 3:
              e.vertexAttrib3fv(ee.location, he);
              break;
            case 4:
              e.vertexAttrib4fv(ee.location, he);
              break;
            default:
              e.vertexAttrib1fv(ee.location, he);
          }
        }
      }
    }
    R();
  }
  function y() {
    E();
    for (const w in n) {
      const G = n[w];
      for (const W in G) {
        const H = G[W];
        for (const B in H) {
          const q = H[B];
          for (const N in q)
            h(q[N].object), delete q[N];
          delete H[B];
        }
      }
      delete n[w];
    }
  }
  function b(w) {
    if (n[w.id] === void 0) return;
    const G = n[w.id];
    for (const W in G) {
      const H = G[W];
      for (const B in H) {
        const q = H[B];
        for (const N in q)
          h(q[N].object), delete q[N];
        delete H[B];
      }
    }
    delete n[w.id];
  }
  function P(w) {
    for (const G in n) {
      const W = n[G];
      for (const H in W) {
        const B = W[H];
        if (B[w.id] === void 0) continue;
        const q = B[w.id];
        for (const N in q)
          h(q[N].object), delete q[N];
        delete B[w.id];
      }
    }
  }
  function v(w) {
    for (const G in n) {
      const W = n[G], H = w.isInstancedMesh === !0 ? w.id : 0, B = W[H];
      if (B !== void 0) {
        for (const q in B) {
          const N = B[q];
          for (const J in N)
            h(N[J].object), delete N[J];
          delete B[q];
        }
        delete W[H], Object.keys(W).length === 0 && delete n[G];
      }
    }
  }
  function E() {
    X(), a = !0, s !== r && (s = r, l(s.object));
  }
  function X() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: E,
    resetDefaultState: X,
    dispose: y,
    releaseStatesOfGeometry: b,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: P,
    initAttributes: S,
    enableAttribute: p,
    disableUnusedAttributes: R
  };
}
function ih(e, t, i) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, l) {
    e.drawArrays(n, c, l), i.update(l, n, 1);
  }
  function a(c, l, h) {
    h !== 0 && (e.drawArraysInstanced(n, c, l, h), i.update(l, n, h));
  }
  function o(c, l, h) {
    if (h === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, l, 0, h);
    let f = 0;
    for (let u = 0; u < h; u++) f += l[u];
    i.update(f, n, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function nh(e, t, i, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const P = t.get("EXT_texture_filter_anisotropic");
      r = e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function a(P) {
    return !(P !== 1023 && n.convert(P) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(P) {
    const v = P === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(P !== 1009 && n.convert(P) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && P !== 1015 && !v);
  }
  function c(P) {
    if (P === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      P = "mediump";
    }
    return P === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = i.precision !== void 0 ? i.precision : "highp";
  const h = c(l);
  h !== l && (ye("WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const f = i.logarithmicDepthBuffer === !0, u = i.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
  i.reversedDepthBuffer === !0 && u === !1 && ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const m = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), M = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), S = e.getParameter(e.MAX_TEXTURE_SIZE), p = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), d = e.getParameter(e.MAX_VERTEX_ATTRIBS), R = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), T = e.getParameter(e.MAX_VARYING_VECTORS), A = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), y = e.getParameter(e.MAX_SAMPLES), b = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: f,
    reversedDepthBuffer: u,
    maxTextures: m,
    maxVertexTextures: M,
    maxTextureSize: S,
    maxCubemapSize: p,
    maxAttributes: d,
    maxVertexUniforms: R,
    maxVaryings: T,
    maxFragmentUniforms: A,
    maxSamples: y,
    samples: b
  };
}
function rh(e) {
  const t = this;
  let i = null, n = 0, r = !1, s = !1;
  const a = new bi(), o = new De(), c = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, u) {
    const m = f.length !== 0 || u || n !== 0 || r;
    return r = u, n = f.length, m;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, u) {
    i = h(f, u, 0);
  }, this.setState = function(f, u, m) {
    const M = f.clippingPlanes, S = f.clipIntersection, p = f.clipShadows, d = e.get(f);
    if (!r || M === null || M.length === 0 || s && !p) s ? h(null) : l();
    else {
      const R = s ? 0 : n, T = R * 4;
      let A = d.clippingState || null;
      c.value = A, A = h(M, u, T, m);
      for (let y = 0; y !== T; ++y) A[y] = i[y];
      d.clippingState = A, this.numIntersection = S ? this.numPlanes : 0, this.numPlanes += R;
    }
  };
  function l() {
    c.value !== i && (c.value = i, c.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(f, u, m, M) {
    const S = f !== null ? f.length : 0;
    let p = null;
    if (S !== 0) {
      if (p = c.value, M !== !0 || p === null) {
        const d = m + S * 4, R = u.matrixWorldInverse;
        o.getNormalMatrix(R), (p === null || p.length < d) && (p = new Float32Array(d));
        for (let T = 0, A = m; T !== S; ++T, A += 4)
          a.copy(f[T]).applyMatrix4(R, o), a.normal.toArray(p, A), p[A + 3] = a.constant;
      }
      c.value = p, c.needsUpdate = !0;
    }
    return t.numPlanes = S, t.numIntersection = 0, p;
  }
}
var vi = 4, Js = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], wi = 20, sh = 256, mn = /* @__PURE__ */ new pr(), Qs = /* @__PURE__ */ new ke(), Wr = null, Xr = 0, qr = 0, Yr = !1, ah = /* @__PURE__ */ new O(), js = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(e, t = 0, i = 0.1, n = 100, r = {}) {
    const { size: s = 256, position: a = ah } = r;
    Wr = this._renderer.getRenderTarget(), Xr = this._renderer.getActiveCubeFace(), qr = this._renderer.getActiveMipmapLevel(), Yr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(s);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = ta(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = ea(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(Wr, Xr, qr), this._renderer.xr.enabled = Yr, e.scissorTest = !1, Ji(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Wr = this._renderer.getRenderTarget(), Xr = this._renderer.getActiveCubeFace(), qr = this._renderer.getActiveMipmapLevel(), Yr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = t || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
      magFilter: yt,
      minFilter: yt,
      generateMipmaps: !1,
      type: Li,
      format: yn,
      colorSpace: ns,
      depthBuffer: !1
    }, n = $s(e, t, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = $s(e, t, i);
      const { _lodMax: r } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = oh(r)), this._blurMaterial = ch(r, e, t), this._ggxMaterial = lh(r, e, t);
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new Ht(new Ui(), e);
    this._renderer.compile(t, mn);
  }
  _sceneToCubeUV(e, t, i, n, r) {
    const s = new Gt(90, 1, t, i), a = [
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
    ], c = this._renderer, l = c.autoClear, h = c.toneMapping;
    c.getClearColor(Qs), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(n), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ht(new us(), new ro({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    })));
    const f = this._backgroundBox, u = f.material;
    let m = !1;
    const M = e.background;
    M ? M.isColor && (u.color.copy(M), e.background = null, m = !0) : (u.color.copy(Qs), m = !0);
    for (let S = 0; S < 6; S++) {
      const p = S % 3;
      p === 0 ? (s.up.set(0, a[S], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x + o[S], r.y, r.z)) : p === 1 ? (s.up.set(0, 0, a[S]), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y + o[S], r.z)) : (s.up.set(0, a[S], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y, r.z + o[S]));
      const d = this._cubeSize;
      Ji(n, p * d, S > 2 ? d : 0, d, d), c.setRenderTarget(n), m && c.render(f, s), c.render(e, s);
    }
    c.toneMapping = h, c.autoClear = l, e.background = M;
  }
  _textureToCubeUV(e, t) {
    const i = this._renderer, n = e.mapping === 301 || e.mapping === 302;
    n ? (this._cubemapMaterial === null && (this._cubemapMaterial = ta()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = ea());
    const r = n ? this._cubemapMaterial : this._equirectMaterial, s = this._lodMeshes[0];
    s.material = r;
    const a = r.uniforms;
    a.envMap.value = e;
    const o = this._cubeSize;
    Ji(t, 0, 0, 3 * o, 2 * o), i.setRenderTarget(t), i.render(s, mn);
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
    const o = s.uniforms, c = i / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), h = Math.sqrt(c * c - l * l) * (0 + c * 1.25), { _lodMax: f } = this, u = this._sizeLods[i], m = 3 * u * (i > f - vi ? i - f + vi : 0), M = 4 * (this._cubeSize - u);
    o.envMap.value = e.texture, o.roughness.value = h, o.mipInt.value = f - t, Ji(r, m, M, 3 * u, 2 * u), n.setRenderTarget(r), n.render(a, mn), o.envMap.value = r.texture, o.roughness.value = 0, o.mipInt.value = f - i, Ji(e, m, M, 3 * u, 2 * u), n.setRenderTarget(e), n.render(a, mn);
  }
  _blur(e, t, i, n, r) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(e, s, t, i, n, "latitudinal", r), this._halfBlur(s, e, i, i, n, "longitudinal", r);
  }
  _halfBlur(e, t, i, n, r, s, a) {
    const o = this._renderer, c = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && Ce("blur direction must be either latitudinal or longitudinal!");
    const l = 3, h = this._lodMeshes[n];
    h.material = c;
    const f = c.uniforms, u = this._sizeLods[i] - 1, m = isFinite(r) ? Math.PI / (2 * u) : 2 * Math.PI / (2 * wi - 1), M = r / m, S = isFinite(r) ? 1 + Math.floor(l * M) : wi;
    S > wi && ye(`sigmaRadians, ${r}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${wi}`);
    const p = [];
    let d = 0;
    for (let A = 0; A < wi; ++A) {
      const y = A / M, b = Math.exp(-y * y / 2);
      p.push(b), A === 0 ? d += b : A < S && (d += 2 * b);
    }
    for (let A = 0; A < p.length; A++) p[A] = p[A] / d;
    f.envMap.value = e.texture, f.samples.value = S, f.weights.value = p, f.latitudinal.value = s === "latitudinal", a && (f.poleAxis.value = a);
    const { _lodMax: R } = this;
    f.dTheta.value = m, f.mipInt.value = R - i;
    const T = this._sizeLods[n];
    Ji(t, 3 * T * (n > R - vi ? n - R + vi : 0), 4 * (this._cubeSize - T), 3 * T, 2 * T), o.setRenderTarget(t), o.render(h, mn);
  }
};
function oh(e) {
  const t = [], i = [], n = [];
  let r = e;
  const s = e - vi + 1 + Js.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let c = 1 / o;
    a > e - vi ? c = Js[a - e + vi - 1] : a === 0 && (c = 0), i.push(c);
    const l = 1 / (o - 2), h = -l, f = 1 + l, u = [
      h,
      h,
      f,
      h,
      f,
      f,
      h,
      h,
      f,
      f,
      h,
      f
    ], m = 6, M = 6, S = 3, p = 2, d = 1, R = new Float32Array(S * M * m), T = new Float32Array(p * M * m), A = new Float32Array(d * M * m);
    for (let b = 0; b < m; b++) {
      const P = b % 3 * 2 / 3 - 1, v = b > 2 ? 0 : -1, E = [
        P,
        v,
        0,
        P + 2 / 3,
        v,
        0,
        P + 2 / 3,
        v + 1,
        0,
        P,
        v,
        0,
        P + 2 / 3,
        v + 1,
        0,
        P,
        v + 1,
        0
      ];
      R.set(E, S * M * b), T.set(u, p * M * b);
      const X = [
        b,
        b,
        b,
        b,
        b,
        b
      ];
      A.set(X, d * M * b);
    }
    const y = new Ui();
    y.setAttribute("position", new Jt(R, S)), y.setAttribute("uv", new Jt(T, p)), y.setAttribute("faceIndex", new Jt(A, d)), n.push(new Ht(y, null)), r > vi && r--;
  }
  return {
    lodMeshes: n,
    sizeLods: t,
    sigmas: i
  };
}
function $s(e, t, i) {
  const n = new Zt(e, t, i);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Ji(e, t, i, n, r) {
  e.viewport.set(t, i, n, r), e.scissor.set(t, i, n, r);
}
function lh(e, t, i) {
  return new Vt({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: sh,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / i,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: mr(),
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
function ch(e, t, i) {
  const n = new Float32Array(wi), r = new O(0, 1, 0);
  return new Vt({
    name: "SphericalGaussianBlur",
    defines: {
      n: wi,
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
    vertexShader: mr(),
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
function ea() {
  return new Vt({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: mr(),
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
function ta() {
  return new Vt({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: mr(),
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
function mr() {
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
var go = class extends Zt {
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
    this.texture = new so(n), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
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
    }, n = new us(5, 5, 5), r = new Vt({
      name: "CubemapFromEquirect",
      uniforms: an(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: 1,
      blending: 0
    });
    r.uniforms.tEquirect.value = t;
    const s = new Ht(n, r), a = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = yt), new Bc(1, 10, this).update(e, s), t.minFilter = a, s.geometry.dispose(), s.material.dispose(), this;
  }
  clear(e, t = !0, i = !0, n = !0) {
    const r = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(t, i, n);
    e.setRenderTarget(r);
  }
};
function hh(e) {
  let t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n = null;
  function r(u, m = !1) {
    return u == null ? null : m ? a(u) : s(u);
  }
  function s(u) {
    if (u && u.isTexture) {
      const m = u.mapping;
      if (m === 303 || m === 304) if (t.has(u)) {
        const M = t.get(u).texture;
        return o(M, u.mapping);
      } else {
        const M = u.image;
        if (M && M.height > 0) {
          const S = new go(M.height);
          return S.fromEquirectangularTexture(e, u), t.set(u, S), u.addEventListener("dispose", l), o(S.texture, u.mapping);
        } else return null;
      }
    }
    return u;
  }
  function a(u) {
    if (u && u.isTexture) {
      const m = u.mapping, M = m === 303 || m === 304, S = m === 301 || m === 302;
      if (M || S) {
        let p = i.get(u);
        const d = p !== void 0 ? p.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== d)
          return n === null && (n = new js(e)), p = M ? n.fromEquirectangular(u, p) : n.fromCubemap(u, p), p.texture.pmremVersion = u.pmremVersion, i.set(u, p), p.texture;
        if (p !== void 0) return p.texture;
        {
          const R = u.image;
          return M && R && R.height > 0 || S && R && c(R) ? (n === null && (n = new js(e)), p = M ? n.fromEquirectangular(u) : n.fromCubemap(u), p.texture.pmremVersion = u.pmremVersion, i.set(u, p), u.addEventListener("dispose", h), p.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, m) {
    return m === 303 ? u.mapping = 301 : m === 304 && (u.mapping = 302), u;
  }
  function c(u) {
    let m = 0;
    const M = 6;
    for (let S = 0; S < M; S++) u[S] !== void 0 && m++;
    return m === M;
  }
  function l(u) {
    const m = u.target;
    m.removeEventListener("dispose", l);
    const M = t.get(m);
    M !== void 0 && (t.delete(m), M.dispose());
  }
  function h(u) {
    const m = u.target;
    m.removeEventListener("dispose", h);
    const M = i.get(m);
    M !== void 0 && (i.delete(m), M.dispose());
  }
  function f() {
    t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: f
  };
}
function uh(e) {
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
      return r === null && en("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function dh(e, t, i, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const u = f.target;
    u.index !== null && t.remove(u.index);
    for (const M in u.attributes) t.remove(u.attributes[M]);
    u.removeEventListener("dispose", a), delete r[u.id];
    const m = s.get(u);
    m && (t.remove(m), s.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, i.memory.geometries--;
  }
  function o(f, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", a), r[u.id] = !0, i.memory.geometries++), u;
  }
  function c(f) {
    const u = f.attributes;
    for (const m in u) t.update(u[m], e.ARRAY_BUFFER);
  }
  function l(f) {
    const u = [], m = f.index, M = f.attributes.position;
    let S = 0;
    if (M === void 0) return;
    if (m !== null) {
      const R = m.array;
      S = m.version;
      for (let T = 0, A = R.length; T < A; T += 3) {
        const y = R[T + 0], b = R[T + 1], P = R[T + 2];
        u.push(y, b, b, P, P, y);
      }
    } else {
      const R = M.array;
      S = M.version;
      for (let T = 0, A = R.length / 3 - 1; T < A; T += 3) {
        const y = T + 0, b = T + 1, P = T + 2;
        u.push(y, b, b, P, P, y);
      }
    }
    const p = new (M.count >= 65535 ? io : to)(u, 1);
    p.version = S;
    const d = s.get(f);
    d && t.remove(d), s.set(f, p);
  }
  function h(f) {
    const u = s.get(f);
    if (u) {
      const m = f.index;
      m !== null && u.version < m.version && l(f);
    } else l(f);
    return s.get(f);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: h
  };
}
function fh(e, t, i) {
  let n;
  function r(f) {
    n = f;
  }
  let s, a;
  function o(f) {
    s = f.type, a = f.bytesPerElement;
  }
  function c(f, u) {
    e.drawElements(n, u, s, f * a), i.update(u, n, 1);
  }
  function l(f, u, m) {
    m !== 0 && (e.drawElementsInstanced(n, u, s, f * a, m), i.update(u, n, m));
  }
  function h(f, u, m) {
    if (m === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, u, 0, s, f, 0, m);
    let M = 0;
    for (let S = 0; S < m; S++) M += u[S];
    i.update(M, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = h;
}
function ph(e) {
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
function mh(e, t, i) {
  const n = /* @__PURE__ */ new WeakMap(), r = new st();
  function s(a, o, c) {
    const l = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let u = n.get(o);
    if (u === void 0 || u.count !== f) {
      let E = function() {
        P.dispose(), n.delete(o), o.removeEventListener("dispose", E);
      };
      u !== void 0 && u.texture.dispose();
      const m = o.morphAttributes.position !== void 0, M = o.morphAttributes.normal !== void 0, S = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], d = o.morphAttributes.normal || [], R = o.morphAttributes.color || [];
      let T = 0;
      m === !0 && (T = 1), M === !0 && (T = 2), S === !0 && (T = 3);
      let A = o.attributes.position.count * T, y = 1;
      A > t.maxTextureSize && (y = Math.ceil(A / t.maxTextureSize), A = t.maxTextureSize);
      const b = new Float32Array(A * y * 4 * f), P = new Ja(b, A, y, f);
      P.type = fr, P.needsUpdate = !0;
      const v = T * 4;
      for (let X = 0; X < f; X++) {
        const w = p[X], G = d[X], W = R[X], H = A * y * 4 * X;
        for (let B = 0; B < w.count; B++) {
          const q = B * v;
          m === !0 && (r.fromBufferAttribute(w, B), b[H + q + 0] = r.x, b[H + q + 1] = r.y, b[H + q + 2] = r.z, b[H + q + 3] = 0), M === !0 && (r.fromBufferAttribute(G, B), b[H + q + 4] = r.x, b[H + q + 5] = r.y, b[H + q + 6] = r.z, b[H + q + 7] = 0), S === !0 && (r.fromBufferAttribute(W, B), b[H + q + 8] = r.x, b[H + q + 9] = r.y, b[H + q + 10] = r.z, b[H + q + 11] = W.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: f,
        texture: P,
        size: new Ie(A, y)
      }, n.set(o, u), o.addEventListener("dispose", E);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null) c.getUniforms().setValue(e, "morphTexture", a.morphTexture, i);
    else {
      let m = 0;
      for (let S = 0; S < l.length; S++) m += l[S];
      const M = o.morphTargetsRelative ? 1 : 1 - m;
      c.getUniforms().setValue(e, "morphTargetBaseInfluence", M), c.getUniforms().setValue(e, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(e, "morphTargetsTexture", u.texture, i), c.getUniforms().setValue(e, "morphTargetsTextureSize", u.size);
  }
  return { update: s };
}
function gh(e, t, i, n, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const h = r.render.frame, f = l.geometry, u = t.get(l, f);
    if (s.get(u) !== h && (t.update(u), s.set(u, h)), l.isInstancedMesh && (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c), s.get(l) !== h && (i.update(l.instanceMatrix, e.ARRAY_BUFFER), l.instanceColor !== null && i.update(l.instanceColor, e.ARRAY_BUFFER), s.set(l, h))), l.isSkinnedMesh) {
      const m = l.skeleton;
      s.get(m) !== h && (m.update(), s.set(m, h));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function c(l) {
    const h = l.target;
    h.removeEventListener("dispose", c), n.releaseStatesOfObject(h), i.remove(h.instanceMatrix), h.instanceColor !== null && i.remove(h.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
var vh = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function _h(e, t, i, n, r, s) {
  const a = new Zt(t, i, {
    type: e,
    depthBuffer: r,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    depthTexture: r ? new sn(t, i) : void 0
  }), o = new Zt(t, i, {
    type: Li,
    depthBuffer: !1,
    stencilBuffer: !1
  }), c = new Ui();
  c.setAttribute("position", new li([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
  ], 3)), c.setAttribute("uv", new li([
    0,
    2,
    0,
    0,
    2,
    0
  ], 2));
  const l = new xc({
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
  }), h = new Ht(c, l), f = new pr(-1, 1, 1, -1, 0, 1);
  let u = null, m = null, M = !1, S, p = null, d = [], R = !1;
  this.setSize = function(T, A) {
    a.setSize(T, A), o.setSize(T, A);
    for (let y = 0; y < d.length; y++) {
      const b = d[y];
      b.setSize && b.setSize(T, A);
    }
  }, this.setEffects = function(T) {
    d = T, R = d.length > 0 && d[0].isRenderPass === !0;
    const A = a.width, y = a.height;
    for (let b = 0; b < d.length; b++) {
      const P = d[b];
      P.setSize && P.setSize(A, y);
    }
  }, this.begin = function(T, A) {
    if (M || T.toneMapping === 0 && d.length === 0) return !1;
    if (p = A, A !== null) {
      const y = A.width, b = A.height;
      (a.width !== y || a.height !== b) && this.setSize(y, b);
    }
    return R === !1 && T.setRenderTarget(a), S = T.toneMapping, T.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return R;
  }, this.end = function(T, A) {
    T.toneMapping = S, M = !0;
    let y = a, b = o;
    for (let P = 0; P < d.length; P++) {
      const v = d[P];
      if (v.enabled !== !1 && (v.render(T, b, y, A), v.needsSwap !== !1)) {
        const E = y;
        y = b, b = E;
      }
    }
    if (u !== T.outputColorSpace || m !== T.toneMapping) {
      u = T.outputColorSpace, m = T.toneMapping, l.defines = {}, Be.getTransfer(u) === "srgb" && (l.defines.SRGB_TRANSFER = "");
      const P = vh[m];
      P && (l.defines[P] = ""), l.needsUpdate = !0;
    }
    l.uniforms.tDiffuse.value = y.texture, T.setRenderTarget(p), T.render(h, f), p = null, M = !1;
  }, this.isCompositing = function() {
    return M;
  }, this.dispose = function() {
    a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), c.dispose(), l.dispose();
  };
}
var vo = /* @__PURE__ */ new Ft(), rs = /* @__PURE__ */ new sn(1, 1), _o = /* @__PURE__ */ new Ja(), Mo = /* @__PURE__ */ new Jl(), So = /* @__PURE__ */ new so(), ia = [], na = [], ra = new Float32Array(16), sa = new Float32Array(9), aa = new Float32Array(4);
function ln(e, t, i) {
  const n = e[0];
  if (n <= 0 || n > 0) return e;
  const r = t * i;
  let s = ia[r];
  if (s === void 0 && (s = new Float32Array(r), ia[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += i, e[a].toArray(s, o);
  }
  return s;
}
function ut(e, t) {
  if (e.length !== t.length) return !1;
  for (let i = 0, n = e.length; i < n; i++) if (e[i] !== t[i]) return !1;
  return !0;
}
function dt(e, t) {
  for (let i = 0, n = t.length; i < n; i++) e[i] = t[i];
}
function gr(e, t) {
  let i = na[t];
  i === void 0 && (i = new Int32Array(t), na[t] = i);
  for (let n = 0; n !== t; ++n) i[n] = e.allocateTextureUnit();
  return i;
}
function Mh(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1f(this.addr, t), i[0] = t);
}
function Sh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ut(i, t)) return;
    e.uniform2fv(this.addr, t), dt(i, t);
  }
}
function xh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else if (t.r !== void 0)
    (i[0] !== t.r || i[1] !== t.g || i[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), i[0] = t.r, i[1] = t.g, i[2] = t.b);
  else {
    if (ut(i, t)) return;
    e.uniform3fv(this.addr, t), dt(i, t);
  }
}
function Ah(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ut(i, t)) return;
    e.uniform4fv(this.addr, t), dt(i, t);
  }
}
function Eh(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ut(i, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), dt(i, t);
  } else {
    if (ut(i, n)) return;
    aa.set(n), e.uniformMatrix2fv(this.addr, !1, aa), dt(i, n);
  }
}
function yh(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ut(i, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), dt(i, t);
  } else {
    if (ut(i, n)) return;
    sa.set(n), e.uniformMatrix3fv(this.addr, !1, sa), dt(i, n);
  }
}
function Th(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ut(i, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), dt(i, t);
  } else {
    if (ut(i, n)) return;
    ra.set(n), e.uniformMatrix4fv(this.addr, !1, ra), dt(i, n);
  }
}
function bh(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1i(this.addr, t), i[0] = t);
}
function wh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ut(i, t)) return;
    e.uniform2iv(this.addr, t), dt(i, t);
  }
}
function Rh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ut(i, t)) return;
    e.uniform3iv(this.addr, t), dt(i, t);
  }
}
function Ch(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ut(i, t)) return;
    e.uniform4iv(this.addr, t), dt(i, t);
  }
}
function Ph(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1ui(this.addr, t), i[0] = t);
}
function Lh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ut(i, t)) return;
    e.uniform2uiv(this.addr, t), dt(i, t);
  }
}
function Dh(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ut(i, t)) return;
    e.uniform3uiv(this.addr, t), dt(i, t);
  }
}
function Ih(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ut(i, t)) return;
    e.uniform4uiv(this.addr, t), dt(i, t);
  }
}
function Uh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === e.SAMPLER_2D_SHADOW ? (rs.compareFunction = i.isReversedDepthBuffer() ? 518 : 515, s = rs) : s = vo, i.setTexture2D(t || s, r);
}
function Nh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture3D(t || Mo, r);
}
function Vh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTextureCube(t || So, r);
}
function Fh(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture2DArray(t || _o, r);
}
function Oh(e) {
  switch (e) {
    case 5126:
      return Mh;
    case 35664:
      return Sh;
    case 35665:
      return xh;
    case 35666:
      return Ah;
    case 35674:
      return Eh;
    case 35675:
      return yh;
    case 35676:
      return Th;
    case 5124:
    case 35670:
      return bh;
    case 35667:
    case 35671:
      return wh;
    case 35668:
    case 35672:
      return Rh;
    case 35669:
    case 35673:
      return Ch;
    case 5125:
      return Ph;
    case 36294:
      return Lh;
    case 36295:
      return Dh;
    case 36296:
      return Ih;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Uh;
    case 35679:
    case 36299:
    case 36307:
      return Nh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Vh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Fh;
  }
}
function Bh(e, t) {
  e.uniform1fv(this.addr, t);
}
function kh(e, t) {
  const i = ln(t, this.size, 2);
  e.uniform2fv(this.addr, i);
}
function zh(e, t) {
  const i = ln(t, this.size, 3);
  e.uniform3fv(this.addr, i);
}
function Gh(e, t) {
  const i = ln(t, this.size, 4);
  e.uniform4fv(this.addr, i);
}
function Hh(e, t) {
  const i = ln(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, i);
}
function Wh(e, t) {
  const i = ln(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, i);
}
function Xh(e, t) {
  const i = ln(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, i);
}
function qh(e, t) {
  e.uniform1iv(this.addr, t);
}
function Yh(e, t) {
  e.uniform2iv(this.addr, t);
}
function Kh(e, t) {
  e.uniform3iv(this.addr, t);
}
function Zh(e, t) {
  e.uniform4iv(this.addr, t);
}
function Jh(e, t) {
  e.uniform1uiv(this.addr, t);
}
function Qh(e, t) {
  e.uniform2uiv(this.addr, t);
}
function jh(e, t) {
  e.uniform3uiv(this.addr, t);
}
function $h(e, t) {
  e.uniform4uiv(this.addr, t);
}
function eu(e, t, i) {
  const n = this.cache, r = t.length, s = gr(i, r);
  ut(n, s) || (e.uniform1iv(this.addr, s), dt(n, s));
  let a;
  this.type === e.SAMPLER_2D_SHADOW ? a = rs : a = vo;
  for (let o = 0; o !== r; ++o) i.setTexture2D(t[o] || a, s[o]);
}
function tu(e, t, i) {
  const n = this.cache, r = t.length, s = gr(i, r);
  ut(n, s) || (e.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== r; ++a) i.setTexture3D(t[a] || Mo, s[a]);
}
function iu(e, t, i) {
  const n = this.cache, r = t.length, s = gr(i, r);
  ut(n, s) || (e.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== r; ++a) i.setTextureCube(t[a] || So, s[a]);
}
function nu(e, t, i) {
  const n = this.cache, r = t.length, s = gr(i, r);
  ut(n, s) || (e.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== r; ++a) i.setTexture2DArray(t[a] || _o, s[a]);
}
function ru(e) {
  switch (e) {
    case 5126:
      return Bh;
    case 35664:
      return kh;
    case 35665:
      return zh;
    case 35666:
      return Gh;
    case 35674:
      return Hh;
    case 35675:
      return Wh;
    case 35676:
      return Xh;
    case 5124:
    case 35670:
      return qh;
    case 35667:
    case 35671:
      return Yh;
    case 35668:
    case 35672:
      return Kh;
    case 35669:
    case 35673:
      return Zh;
    case 5125:
      return Jh;
    case 36294:
      return Qh;
    case 36295:
      return jh;
    case 36296:
      return $h;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return eu;
    case 35679:
    case 36299:
    case 36307:
      return tu;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return iu;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return nu;
  }
}
var su = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = Oh(t.type);
  }
}, au = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = ru(t.type);
  }
}, ou = class {
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
}, Kr = /(\w+)(\])?(\[|\.)?/g;
function oa(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function lu(e, t, i) {
  const n = e.name, r = n.length;
  for (Kr.lastIndex = 0; ; ) {
    const s = Kr.exec(n), a = Kr.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === r) {
      oa(i, l === void 0 ? new su(o, e, t) : new au(o, e, t));
      break;
    } else {
      let h = i.map[o];
      h === void 0 && (h = new ou(o), oa(i, h)), i = h;
    }
  }
}
var or = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < i; ++s) {
      const a = e.getActiveUniform(t, s);
      lu(a, e.getUniformLocation(t, a.name), this);
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
function la(e, t, i) {
  const n = e.createShader(t);
  return e.shaderSource(n, i), e.compileShader(n), n;
}
var cu = 37297, hu = 0;
function uu(e, t) {
  const i = e.split(`
`), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, i.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${i[a]}`);
  }
  return n.join(`
`);
}
var ca = /* @__PURE__ */ new De();
function du(e) {
  Be._getMatrix(ca, Be.workingColorSpace, e);
  const t = `mat3( ${ca.elements.map((i) => i.toFixed(4))} )`;
  switch (Be.getTransfer(e)) {
    case hr:
      return [t, "LinearTransferOETF"];
    case ur:
      return [t, "sRGBTransferOETF"];
    default:
      return ye("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function ha(e, t, i) {
  const n = e.getShaderParameter(t, e.COMPILE_STATUS), r = (e.getShaderInfoLog(t) || "").trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return i.toUpperCase() + `

` + r + `

` + uu(e.getShaderSource(t), a);
  } else return r;
}
function fu(e, t) {
  const i = du(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
var pu = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function mu(e, t) {
  const i = pu[t];
  return i === void 0 ? (ye("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }";
}
var nr = /* @__PURE__ */ new O();
function gu() {
  return Be.getLuminanceCoefficients(nr), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${nr.x.toFixed(4)}, ${nr.y.toFixed(4)}, ${nr.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function vu(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Mn).join(`
`);
}
function _u(e) {
  const t = [];
  for (const i in e) {
    const n = e[i];
    n !== !1 && t.push("#define " + i + " " + n);
  }
  return t.join(`
`);
}
function Mu(e, t) {
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
function Mn(e) {
  return e !== "";
}
function ua(e, t) {
  const i = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, i).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function da(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Su = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ss(e) {
  return e.replace(Su, Au);
}
var xu = /* @__PURE__ */ new Map();
function Au(e, t) {
  let i = Ue[t];
  if (i === void 0) {
    const n = xu.get(t);
    if (n !== void 0)
      i = Ue[n], ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
  }
  return ss(i);
}
var Eu = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function fa(e) {
  return e.replace(Eu, yu);
}
function yu(e, t, i, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(i); s++) r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function pa(e) {
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
var Tu = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function bu(e) {
  return Tu[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var wu = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function Ru(e) {
  return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : wu[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var Cu = { 302: "ENVMAP_MODE_REFRACTION" };
function Pu(e) {
  return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : Cu[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var Lu = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function Du(e) {
  return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Lu[e.combine] || "ENVMAP_BLENDING_NONE";
}
function Iu(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const i = Math.log2(t) - 2, n = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)),
    texelHeight: n,
    maxMip: i
  };
}
function Uu(e, t, i, n) {
  const r = e.getContext(), s = i.defines;
  let a = i.vertexShader, o = i.fragmentShader;
  const c = bu(i), l = Ru(i), h = Pu(i), f = Du(i), u = Iu(i), m = vu(i), M = _u(s), S = r.createProgram();
  let p, d, R = i.glslVersion ? "#version " + i.glslVersion + `
` : "";
  i.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M
  ].filter(Mn).join(`
`), p.length > 0 && (p += `
`), d = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    M
  ].filter(Mn).join(`
`), d.length > 0 && (d += `
`)) : (p = [
    pa(i),
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
    i.envMap ? "#define " + h : "",
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
  ].filter(Mn).join(`
`), d = [
    pa(i),
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
    i.envMap ? "#define " + h : "",
    i.envMap ? "#define " + f : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
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
    i.toneMapping !== 0 ? mu("toneMapping", i.toneMapping) : "",
    i.dithering ? "#define DITHERING" : "",
    i.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    fu("linearToOutputTexel", i.outputColorSpace),
    gu(),
    i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "",
    `
`
  ].filter(Mn).join(`
`)), a = ss(a), a = ua(a, i), a = da(a, i), o = ss(o), o = ua(o, i), o = da(o, i), a = fa(a), o = fa(o), i.isRawShaderMaterial !== !0 && (R = `#version 300 es
`, p = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, d = [
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
  const T = R + p + a, A = R + d + o, y = la(r, r.VERTEX_SHADER, T), b = la(r, r.FRAGMENT_SHADER, A);
  r.attachShader(S, y), r.attachShader(S, b), i.index0AttributeName !== void 0 ? r.bindAttribLocation(S, 0, i.index0AttributeName) : i.hasPositionAttribute === !0 && r.bindAttribLocation(S, 0, "position"), r.linkProgram(S);
  function P(w) {
    if (e.debug.checkShaderErrors) {
      const G = r.getProgramInfoLog(S) || "", W = r.getShaderInfoLog(y) || "", H = r.getShaderInfoLog(b) || "", B = G.trim(), q = W.trim(), N = H.trim();
      let J = !0, ee = !0;
      if (r.getProgramParameter(S, r.LINK_STATUS) === !1)
        if (J = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(r, S, y, b);
        else {
          const te = ha(r, y, "vertex"), he = ha(r, b, "fragment");
          Ce("WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(S, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + B + `
` + te + `
` + he);
        }
      else B !== "" ? ye("WebGLProgram: Program Info Log:", B) : (q === "" || N === "") && (ee = !1);
      ee && (w.diagnostics = {
        runnable: J,
        programLog: B,
        vertexShader: {
          log: q,
          prefix: p
        },
        fragmentShader: {
          log: N,
          prefix: d
        }
      });
    }
    r.deleteShader(y), r.deleteShader(b), v = new or(r, S), E = Mu(r, S);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && P(this), v;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && P(this), E;
  };
  let X = i.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return X === !1 && (X = r.getProgramParameter(S, cu)), X;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(S), this.program = void 0;
  }, this.type = i.shaderType, this.name = i.shaderName, this.id = hu++, this.cacheKey = t, this.usedTimes = 1, this.program = S, this.vertexShader = y, this.fragmentShader = b, this;
}
var Nu = 0, Vu = class {
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
    return i === void 0 && (i = new Fu(e), t.set(e, i)), i;
  }
}, Fu = class {
  constructor(e) {
    this.id = Nu++, this.code = e, this.usedTimes = 0;
  }
};
function Ou(e) {
  return e === 1030 || e === 37490 || e === 36285;
}
function Bu(e, t, i, n, r, s) {
  const a = new $a(), o = new Vu(), c = /* @__PURE__ */ new Set(), l = [], h = /* @__PURE__ */ new Map(), f = n.logarithmicDepthBuffer;
  let u = n.precision;
  const m = {
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
  function S(v, E, X, w, G, W) {
    const H = w.fog, B = G.geometry, q = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? w.environment : null, N = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, J = t.get(v.envMap || q, N), ee = J && J.mapping === 306 ? J.image.height : null, te = m[v.type];
    v.precision !== null && (u = n.getMaxPrecision(v.precision), u !== v.precision && ye("WebGLProgram.getParameters:", v.precision, "not supported, using", u, "instead."));
    const he = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, Se = he !== void 0 ? he.length : 0;
    let We = 0;
    B.morphAttributes.position !== void 0 && (We = 1), B.morphAttributes.normal !== void 0 && (We = 2), B.morphAttributes.color !== void 0 && (We = 3);
    let Ye, Y, re, de;
    if (te) {
      const be = Kt[te];
      Ye = be.vertexShader, Y = be.fragmentShader;
    } else {
      Ye = v.vertexShader, Y = v.fragmentShader;
      const be = o.getVertexShaderStage(v), St = o.getFragmentShaderStage(v);
      o.update(v, be, St), re = be.id, de = St.id;
    }
    const ue = e.getRenderTarget(), Te = e.state.buffers.depth.getReversed(), we = G.isInstancedMesh === !0, Pe = G.isBatchedMesh === !0, Xe = !!v.map, Oe = !!v.matcap, je = !!J, mt = !!v.aoMap, Tt = !!v.lightMap, Dt = !!v.bumpMap && v.wireframe === !1, $e = !!v.normalMap, gt = !!v.displacementMap, ft = !!v.emissiveMap, ct = !!v.metalnessMap, D = !!v.roughnessMap, It = v.anisotropy > 0, qe = v.clearcoat > 0, et = v.dispersion > 0, x = v.iridescence > 0, g = v.sheen > 0, C = v.transmission > 0, z = It && !!v.anisotropyMap, Z = qe && !!v.clearcoatMap, ne = qe && !!v.clearcoatNormalMap, oe = qe && !!v.clearcoatRoughnessMap, I = x && !!v.iridescenceMap, ie = x && !!v.iridescenceThicknessMap, pe = g && !!v.sheenColorMap, _e = g && !!v.sheenRoughnessMap, $ = !!v.specularMap, xe = !!v.specularColorMap, Ae = !!v.specularIntensityMap, Le = C && !!v.transmissionMap, ze = C && !!v.thicknessMap, L = !!v.gradientMap, K = !!v.alphaMap, Q = v.alphaTest > 0, fe = !!v.alphaHash, ve = !!v.extensions;
    let j = 0;
    v.toneMapped && (ue === null || ue.isXRRenderTarget === !0) && (j = e.toneMapping);
    const le = {
      shaderID: te,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: Ye,
      fragmentShader: Y,
      defines: v.defines,
      customVertexShaderID: re,
      customFragmentShaderID: de,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: u,
      batching: Pe,
      batchingColor: Pe && G._colorsTexture !== null,
      instancing: we,
      instancingColor: we && G.instanceColor !== null,
      instancingMorph: we && G.morphTexture !== null,
      outputColorSpace: ue === null ? e.outputColorSpace : ue.isXRRenderTarget === !0 ? ue.texture.colorSpace : Be.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: Xe,
      matcap: Oe,
      envMap: je,
      envMapMode: je && J.mapping,
      envMapCubeUVHeight: ee,
      aoMap: mt,
      lightMap: Tt,
      bumpMap: Dt,
      normalMap: $e,
      displacementMap: gt,
      emissiveMap: ft,
      normalMapObjectSpace: $e && v.normalMapType === 1,
      normalMapTangentSpace: $e && v.normalMapType === 0,
      packedNormalMap: $e && v.normalMapType === 0 && Ou(v.normalMap.format),
      metalnessMap: ct,
      roughnessMap: D,
      anisotropy: It,
      anisotropyMap: z,
      clearcoat: qe,
      clearcoatMap: Z,
      clearcoatNormalMap: ne,
      clearcoatRoughnessMap: oe,
      dispersion: et,
      iridescence: x,
      iridescenceMap: I,
      iridescenceThicknessMap: ie,
      sheen: g,
      sheenColorMap: pe,
      sheenRoughnessMap: _e,
      specularMap: $,
      specularColorMap: xe,
      specularIntensityMap: Ae,
      transmission: C,
      transmissionMap: Le,
      thicknessMap: ze,
      gradientMap: L,
      opaque: v.transparent === !1 && v.blending === 1 && v.alphaToCoverage === !1,
      alphaMap: K,
      alphaTest: Q,
      alphaHash: fe,
      combine: v.combine,
      mapUv: Xe && M(v.map.channel),
      aoMapUv: mt && M(v.aoMap.channel),
      lightMapUv: Tt && M(v.lightMap.channel),
      bumpMapUv: Dt && M(v.bumpMap.channel),
      normalMapUv: $e && M(v.normalMap.channel),
      displacementMapUv: gt && M(v.displacementMap.channel),
      emissiveMapUv: ft && M(v.emissiveMap.channel),
      metalnessMapUv: ct && M(v.metalnessMap.channel),
      roughnessMapUv: D && M(v.roughnessMap.channel),
      anisotropyMapUv: z && M(v.anisotropyMap.channel),
      clearcoatMapUv: Z && M(v.clearcoatMap.channel),
      clearcoatNormalMapUv: ne && M(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: oe && M(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: I && M(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: ie && M(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: pe && M(v.sheenColorMap.channel),
      sheenRoughnessMapUv: _e && M(v.sheenRoughnessMap.channel),
      specularMapUv: $ && M(v.specularMap.channel),
      specularColorMapUv: xe && M(v.specularColorMap.channel),
      specularIntensityMapUv: Ae && M(v.specularIntensityMap.channel),
      transmissionMapUv: Le && M(v.transmissionMap.channel),
      thicknessMapUv: ze && M(v.thicknessMap.channel),
      alphaMapUv: K && M(v.alphaMap.channel),
      vertexTangents: !!B.attributes.tangent && ($e || It),
      vertexNormals: !!B.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4,
      pointsUvs: G.isPoints === !0 && !!B.attributes.uv && (Xe || K),
      fog: !!H,
      useFog: v.fog === !0,
      fogExp2: !!H && H.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || B.attributes.normal === void 0 && $e === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reversedDepthBuffer: Te,
      skinning: G.isSkinnedMesh === !0,
      hasPositionAttribute: B.attributes.position !== void 0,
      morphTargets: B.morphAttributes.position !== void 0,
      morphNormals: B.morphAttributes.normal !== void 0,
      morphColors: B.morphAttributes.color !== void 0,
      morphTargetsCount: Se,
      morphTextureStride: We,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numLightProbeGrids: W.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: e.shadowMap.enabled && X.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: j,
      decodeVideoTexture: Xe && v.map.isVideoTexture === !0 && Be.getTransfer(v.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ft && v.emissiveMap.isVideoTexture === !0 && Be.getTransfer(v.emissiveMap.colorSpace) === "srgb",
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
  function p(v) {
    const E = [];
    if (v.shaderID ? E.push(v.shaderID) : (E.push(v.customVertexShaderID), E.push(v.customFragmentShaderID)), v.defines !== void 0) for (const X in v.defines)
      E.push(X), E.push(v.defines[X]);
    return v.isRawShaderMaterial === !1 && (d(E, v), R(E, v), E.push(e.outputColorSpace)), E.push(v.customProgramCacheKey), E.join();
  }
  function d(v, E) {
    v.push(E.precision), v.push(E.outputColorSpace), v.push(E.envMapMode), v.push(E.envMapCubeUVHeight), v.push(E.mapUv), v.push(E.alphaMapUv), v.push(E.lightMapUv), v.push(E.aoMapUv), v.push(E.bumpMapUv), v.push(E.normalMapUv), v.push(E.displacementMapUv), v.push(E.emissiveMapUv), v.push(E.metalnessMapUv), v.push(E.roughnessMapUv), v.push(E.anisotropyMapUv), v.push(E.clearcoatMapUv), v.push(E.clearcoatNormalMapUv), v.push(E.clearcoatRoughnessMapUv), v.push(E.iridescenceMapUv), v.push(E.iridescenceThicknessMapUv), v.push(E.sheenColorMapUv), v.push(E.sheenRoughnessMapUv), v.push(E.specularMapUv), v.push(E.specularColorMapUv), v.push(E.specularIntensityMapUv), v.push(E.transmissionMapUv), v.push(E.thicknessMapUv), v.push(E.combine), v.push(E.fogExp2), v.push(E.sizeAttenuation), v.push(E.morphTargetsCount), v.push(E.morphAttributeCount), v.push(E.numDirLights), v.push(E.numPointLights), v.push(E.numSpotLights), v.push(E.numSpotLightMaps), v.push(E.numHemiLights), v.push(E.numRectAreaLights), v.push(E.numDirLightShadows), v.push(E.numPointLightShadows), v.push(E.numSpotLightShadows), v.push(E.numSpotLightShadowsWithMaps), v.push(E.numLightProbes), v.push(E.shadowMapType), v.push(E.toneMapping), v.push(E.numClippingPlanes), v.push(E.numClipIntersection), v.push(E.depthPacking);
  }
  function R(v, E) {
    a.disableAll(), E.instancing && a.enable(0), E.instancingColor && a.enable(1), E.instancingMorph && a.enable(2), E.matcap && a.enable(3), E.envMap && a.enable(4), E.normalMapObjectSpace && a.enable(5), E.normalMapTangentSpace && a.enable(6), E.clearcoat && a.enable(7), E.iridescence && a.enable(8), E.alphaTest && a.enable(9), E.vertexColors && a.enable(10), E.vertexAlphas && a.enable(11), E.vertexUv1s && a.enable(12), E.vertexUv2s && a.enable(13), E.vertexUv3s && a.enable(14), E.vertexTangents && a.enable(15), E.anisotropy && a.enable(16), E.alphaHash && a.enable(17), E.batching && a.enable(18), E.dispersion && a.enable(19), E.batchingColor && a.enable(20), E.gradientMap && a.enable(21), E.packedNormalMap && a.enable(22), E.vertexNormals && a.enable(23), v.push(a.mask), a.disableAll(), E.fog && a.enable(0), E.useFog && a.enable(1), E.flatShading && a.enable(2), E.logarithmicDepthBuffer && a.enable(3), E.reversedDepthBuffer && a.enable(4), E.skinning && a.enable(5), E.morphTargets && a.enable(6), E.morphNormals && a.enable(7), E.morphColors && a.enable(8), E.premultipliedAlpha && a.enable(9), E.shadowMapEnabled && a.enable(10), E.doubleSided && a.enable(11), E.flipSided && a.enable(12), E.useDepthPacking && a.enable(13), E.dithering && a.enable(14), E.transmission && a.enable(15), E.sheen && a.enable(16), E.opaque && a.enable(17), E.pointsUvs && a.enable(18), E.decodeVideoTexture && a.enable(19), E.decodeVideoTextureEmissive && a.enable(20), E.alphaToCoverage && a.enable(21), E.numLightProbeGrids > 0 && a.enable(22), E.hasPositionAttribute && a.enable(23), v.push(a.mask);
  }
  function T(v) {
    const E = m[v.type];
    let X;
    if (E) {
      const w = Kt[E];
      X = ho.clone(w.uniforms);
    } else X = v.uniforms;
    return X;
  }
  function A(v, E) {
    let X = h.get(E);
    return X !== void 0 ? ++X.usedTimes : (X = new Uu(e, E, v, r), l.push(X), h.set(E, X)), X;
  }
  function y(v) {
    if (--v.usedTimes === 0) {
      const E = l.indexOf(v);
      l[E] = l[l.length - 1], l.pop(), h.delete(v.cacheKey), v.destroy();
    }
  }
  function b(v) {
    o.remove(v);
  }
  function P() {
    o.dispose();
  }
  return {
    getParameters: S,
    getProgramCacheKey: p,
    getUniforms: T,
    acquireProgram: A,
    releaseProgram: y,
    releaseShaderCache: b,
    programs: l,
    dispose: P
  };
}
function ku() {
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
function zu(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function ma(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function ga() {
  const e = [];
  let t = 0;
  const i = [], n = [], r = [];
  function s() {
    t = 0, i.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    let m = 0;
    return u.isInstancedMesh && (m += 2), u.isSkinnedMesh && (m += 1), m;
  }
  function o(u, m, M, S, p, d) {
    let R = e[t];
    return R === void 0 ? (R = {
      id: u.id,
      object: u,
      geometry: m,
      material: M,
      materialVariant: a(u),
      groupOrder: S,
      renderOrder: u.renderOrder,
      z: p,
      group: d
    }, e[t] = R) : (R.id = u.id, R.object = u, R.geometry = m, R.material = M, R.materialVariant = a(u), R.groupOrder = S, R.renderOrder = u.renderOrder, R.z = p, R.group = d), t++, R;
  }
  function c(u, m, M, S, p, d) {
    const R = o(u, m, M, S, p, d);
    M.transmission > 0 ? n.push(R) : M.transparent === !0 ? r.push(R) : i.push(R);
  }
  function l(u, m, M, S, p, d) {
    const R = o(u, m, M, S, p, d);
    M.transmission > 0 ? n.unshift(R) : M.transparent === !0 ? r.unshift(R) : i.unshift(R);
  }
  function h(u, m, M) {
    i.length > 1 && i.sort(u || zu), n.length > 1 && n.sort(m || ma), r.length > 1 && r.sort(m || ma), M && (i.reverse(), n.reverse(), r.reverse());
  }
  function f() {
    for (let u = t, m = e.length; u < m; u++) {
      const M = e[u];
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
    sort: h
  };
}
function Gu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = e.get(n);
    let a;
    return s === void 0 ? (a = new ga(), e.set(n, [a])) : r >= s.length ? (a = new ga(), s.push(a)) : a = s[r], a;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
function Hu() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let i;
    switch (t.type) {
      case "DirectionalLight":
        i = {
          direction: new O(),
          color: new ke()
        };
        break;
      case "SpotLight":
        i = {
          position: new O(),
          direction: new O(),
          color: new ke(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        i = {
          position: new O(),
          color: new ke(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        i = {
          direction: new O(),
          skyColor: new ke(),
          groundColor: new ke()
        };
        break;
      case "RectAreaLight":
        i = {
          color: new ke(),
          position: new O(),
          halfWidth: new O(),
          halfHeight: new O()
        };
        break;
    }
    return e[t.id] = i, i;
  } };
}
function Wu() {
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
var Xu = 0;
function qu(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function Yu(e) {
  const t = new Hu(), i = Wu(), n = {
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
  for (let l = 0; l < 9; l++) n.probe.push(new O());
  const r = new O(), s = new ot(), a = new ot();
  function o(l) {
    let h = 0, f = 0, u = 0;
    for (let E = 0; E < 9; E++) n.probe[E].set(0, 0, 0);
    let m = 0, M = 0, S = 0, p = 0, d = 0, R = 0, T = 0, A = 0, y = 0, b = 0, P = 0;
    l.sort(qu);
    for (let E = 0, X = l.length; E < X; E++) {
      const w = l[E], G = w.color, W = w.intensity, H = w.distance;
      let B = null;
      if (w.shadow && w.shadow.map && (w.shadow.map.texture.format === 1030 ? B = w.shadow.map.texture : B = w.shadow.map.depthTexture || w.shadow.map.texture), w.isAmbientLight)
        h += G.r * W, f += G.g * W, u += G.b * W;
      else if (w.isLightProbe) {
        for (let q = 0; q < 9; q++) n.probe[q].addScaledVector(w.sh.coefficients[q], W);
        P++;
      } else if (w.isDirectionalLight) {
        const q = t.get(w);
        if (q.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const N = w.shadow, J = i.get(w);
          J.shadowIntensity = N.intensity, J.shadowBias = N.bias, J.shadowNormalBias = N.normalBias, J.shadowRadius = N.radius, J.shadowMapSize = N.mapSize, n.directionalShadow[m] = J, n.directionalShadowMap[m] = B, n.directionalShadowMatrix[m] = w.shadow.matrix, R++;
        }
        n.directional[m] = q, m++;
      } else if (w.isSpotLight) {
        const q = t.get(w);
        q.position.setFromMatrixPosition(w.matrixWorld), q.color.copy(G).multiplyScalar(W), q.distance = H, q.coneCos = Math.cos(w.angle), q.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), q.decay = w.decay, n.spot[S] = q;
        const N = w.shadow;
        if (w.map && (n.spotLightMap[y] = w.map, y++, N.updateMatrices(w), w.castShadow && b++), n.spotLightMatrix[S] = N.matrix, w.castShadow) {
          const J = i.get(w);
          J.shadowIntensity = N.intensity, J.shadowBias = N.bias, J.shadowNormalBias = N.normalBias, J.shadowRadius = N.radius, J.shadowMapSize = N.mapSize, n.spotShadow[S] = J, n.spotShadowMap[S] = B, A++;
        }
        S++;
      } else if (w.isRectAreaLight) {
        const q = t.get(w);
        q.color.copy(G).multiplyScalar(W), q.halfWidth.set(w.width * 0.5, 0, 0), q.halfHeight.set(0, w.height * 0.5, 0), n.rectArea[p] = q, p++;
      } else if (w.isPointLight) {
        const q = t.get(w);
        if (q.color.copy(w.color).multiplyScalar(w.intensity), q.distance = w.distance, q.decay = w.decay, w.castShadow) {
          const N = w.shadow, J = i.get(w);
          J.shadowIntensity = N.intensity, J.shadowBias = N.bias, J.shadowNormalBias = N.normalBias, J.shadowRadius = N.radius, J.shadowMapSize = N.mapSize, J.shadowCameraNear = N.camera.near, J.shadowCameraFar = N.camera.far, n.pointShadow[M] = J, n.pointShadowMap[M] = B, n.pointShadowMatrix[M] = w.shadow.matrix, T++;
        }
        n.point[M] = q, M++;
      } else if (w.isHemisphereLight) {
        const q = t.get(w);
        q.skyColor.copy(w.color).multiplyScalar(W), q.groundColor.copy(w.groundColor).multiplyScalar(W), n.hemi[d] = q, d++;
      }
    }
    p > 0 && (e.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ae.LTC_FLOAT_1, n.rectAreaLTC2 = ae.LTC_FLOAT_2) : (n.rectAreaLTC1 = ae.LTC_HALF_1, n.rectAreaLTC2 = ae.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = u;
    const v = n.hash;
    (v.directionalLength !== m || v.pointLength !== M || v.spotLength !== S || v.rectAreaLength !== p || v.hemiLength !== d || v.numDirectionalShadows !== R || v.numPointShadows !== T || v.numSpotShadows !== A || v.numSpotMaps !== y || v.numLightProbes !== P) && (n.directional.length = m, n.spot.length = S, n.rectArea.length = p, n.point.length = M, n.hemi.length = d, n.directionalShadow.length = R, n.directionalShadowMap.length = R, n.pointShadow.length = T, n.pointShadowMap.length = T, n.spotShadow.length = A, n.spotShadowMap.length = A, n.directionalShadowMatrix.length = R, n.pointShadowMatrix.length = T, n.spotLightMatrix.length = A + y - b, n.spotLightMap.length = y, n.numSpotLightShadowsWithMaps = b, n.numLightProbes = P, v.directionalLength = m, v.pointLength = M, v.spotLength = S, v.rectAreaLength = p, v.hemiLength = d, v.numDirectionalShadows = R, v.numPointShadows = T, v.numSpotShadows = A, v.numSpotMaps = y, v.numLightProbes = P, n.version = Xu++);
  }
  function c(l, h) {
    let f = 0, u = 0, m = 0, M = 0, S = 0;
    const p = h.matrixWorldInverse;
    for (let d = 0, R = l.length; d < R; d++) {
      const T = l[d];
      if (T.isDirectionalLight) {
        const A = n.directional[f];
        A.direction.setFromMatrixPosition(T.matrixWorld), r.setFromMatrixPosition(T.target.matrixWorld), A.direction.sub(r), A.direction.transformDirection(p), f++;
      } else if (T.isSpotLight) {
        const A = n.spot[m];
        A.position.setFromMatrixPosition(T.matrixWorld), A.position.applyMatrix4(p), A.direction.setFromMatrixPosition(T.matrixWorld), r.setFromMatrixPosition(T.target.matrixWorld), A.direction.sub(r), A.direction.transformDirection(p), m++;
      } else if (T.isRectAreaLight) {
        const A = n.rectArea[M];
        A.position.setFromMatrixPosition(T.matrixWorld), A.position.applyMatrix4(p), a.identity(), s.copy(T.matrixWorld), s.premultiply(p), a.extractRotation(s), A.halfWidth.set(T.width * 0.5, 0, 0), A.halfHeight.set(0, T.height * 0.5, 0), A.halfWidth.applyMatrix4(a), A.halfHeight.applyMatrix4(a), M++;
      } else if (T.isPointLight) {
        const A = n.point[u];
        A.position.setFromMatrixPosition(T.matrixWorld), A.position.applyMatrix4(p), u++;
      } else if (T.isHemisphereLight) {
        const A = n.hemi[S];
        A.direction.setFromMatrixPosition(T.matrixWorld), A.direction.transformDirection(p), S++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: n
  };
}
function va(e) {
  const t = new Yu(e), i = [], n = [], r = [];
  function s(u) {
    f.camera = u, i.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    i.push(u);
  }
  function o(u) {
    n.push(u);
  }
  function c(u) {
    r.push(u);
  }
  function l() {
    t.setup(i);
  }
  function h(u) {
    t.setupView(i, u);
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
    setupLightsView: h,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: c
  };
}
function Ku(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function i(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new va(e), t.set(r, [o])) : s >= a.length ? (o = new va(e), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: n
  };
}
var Zu = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Ju = `uniform sampler2D shadow_pass;
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
}`, Qu = [
  /* @__PURE__ */ new O(1, 0, 0),
  /* @__PURE__ */ new O(-1, 0, 0),
  /* @__PURE__ */ new O(0, 1, 0),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, 0, 1),
  /* @__PURE__ */ new O(0, 0, -1)
], ju = [
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, 0, 1),
  /* @__PURE__ */ new O(0, 0, -1),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, -1, 0)
], _a = /* @__PURE__ */ new ot(), gn = /* @__PURE__ */ new O(), Zr = /* @__PURE__ */ new O();
function $u(e, t, i) {
  let n = new hs();
  const r = new Ie(), s = new Ie(), a = new st(), o = new Ac(), c = new Ec(), l = {}, h = i.maxTextureSize, f = {
    0: 1,
    1: 0,
    2: 2
  }, u = new Vt({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ie() },
      radius: { value: 4 }
    },
    vertexShader: Zu,
    fragmentShader: Ju
  }), m = u.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const M = new Ui();
  M.setAttribute("position", new Jt(new Float32Array([
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
  const S = new Ht(M, u), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(b, P, v) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || b.length === 0) return;
    this.type === 2 && (ye("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const E = e.getRenderTarget(), X = e.getActiveCubeFace(), w = e.getActiveMipmapLevel(), G = e.state;
    G.setBlending(0), G.buffers.depth.getReversed() === !0 ? G.buffers.color.setClear(0, 0, 0, 0) : G.buffers.color.setClear(1, 1, 1, 1), G.buffers.depth.setTest(!0), G.setScissorTest(!1);
    const W = d !== this.type;
    W && P.traverse(function(H) {
      H.material && (Array.isArray(H.material) ? H.material.forEach((B) => B.needsUpdate = !0) : H.material.needsUpdate = !0);
    });
    for (let H = 0, B = b.length; H < B; H++) {
      const q = b[H], N = q.shadow;
      if (N === void 0) {
        ye("WebGLShadowMap:", q, "has no shadow.");
        continue;
      }
      if (N.autoUpdate === !1 && N.needsUpdate === !1) continue;
      r.copy(N.mapSize);
      const J = N.getFrameExtents();
      r.multiply(J), s.copy(N.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / J.x), r.x = s.x * J.x, N.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / J.y), r.y = s.y * J.y, N.mapSize.y = s.y));
      const ee = e.state.buffers.depth.getReversed();
      if (N.camera._reversedDepth = ee, N.map === null || W === !0) {
        if (N.map !== null && (N.map.depthTexture !== null && (N.map.depthTexture.dispose(), N.map.depthTexture = null), N.map.dispose()), this.type === 3) {
          if (q.isPointLight) {
            ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          N.map = new Zt(r.x, r.y, {
            format: lr,
            type: Li,
            minFilter: yt,
            magFilter: yt,
            generateMipmaps: !1
          }), N.map.texture.name = q.name + ".shadowMap", N.map.depthTexture = new sn(r.x, r.y, fr), N.map.depthTexture.name = q.name + ".shadowMapDepth", N.map.depthTexture.format = Tn, N.map.depthTexture.compareFunction = null, N.map.depthTexture.minFilter = Et, N.map.depthTexture.magFilter = Et;
        } else
          q.isPointLight ? (N.map = new go(r.x), N.map.depthTexture = new gc(r.x, Pi)) : (N.map = new Zt(r.x, r.y), N.map.depthTexture = new sn(r.x, r.y, Pi)), N.map.depthTexture.name = q.name + ".shadowMap", N.map.depthTexture.format = Tn, this.type === 1 ? (N.map.depthTexture.compareFunction = ee ? 518 : 515, N.map.depthTexture.minFilter = yt, N.map.depthTexture.magFilter = yt) : (N.map.depthTexture.compareFunction = null, N.map.depthTexture.minFilter = Et, N.map.depthTexture.magFilter = Et);
        N.camera.updateProjectionMatrix();
      }
      const te = N.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let he = 0; he < te; he++) {
        if (N.map.isWebGLCubeRenderTarget)
          e.setRenderTarget(N.map, he), e.clear();
        else {
          he === 0 && (e.setRenderTarget(N.map), e.clear());
          const Se = N.getViewport(he);
          a.set(s.x * Se.x, s.y * Se.y, s.x * Se.z, s.y * Se.w), G.viewport(a);
        }
        if (q.isPointLight) {
          const Se = N.camera, We = N.matrix, Ye = q.distance || Se.far;
          Ye !== Se.far && (Se.far = Ye, Se.updateProjectionMatrix()), gn.setFromMatrixPosition(q.matrixWorld), Se.position.copy(gn), Zr.copy(Se.position), Zr.add(Qu[he]), Se.up.copy(ju[he]), Se.lookAt(Zr), Se.updateMatrixWorld(), We.makeTranslation(-gn.x, -gn.y, -gn.z), _a.multiplyMatrices(Se.projectionMatrix, Se.matrixWorldInverse), N._frustum.setFromProjectionMatrix(_a, Se.coordinateSystem, Se.reversedDepth);
        } else N.updateMatrices(q);
        n = N.getFrustum(), A(P, v, N.camera, q, this.type);
      }
      N.isPointLightShadow !== !0 && this.type === 3 && R(N, v), N.needsUpdate = !1;
    }
    d = this.type, p.needsUpdate = !1, e.setRenderTarget(E, X, w);
  };
  function R(b, P) {
    const v = t.update(S);
    u.defines.VSM_SAMPLES !== b.blurSamples && (u.defines.VSM_SAMPLES = b.blurSamples, m.defines.VSM_SAMPLES = b.blurSamples, u.needsUpdate = !0, m.needsUpdate = !0), b.mapPass === null && (b.mapPass = new Zt(r.x, r.y, {
      format: lr,
      type: Li
    })), u.uniforms.shadow_pass.value = b.map.depthTexture, u.uniforms.resolution.value = b.mapSize, u.uniforms.radius.value = b.radius, e.setRenderTarget(b.mapPass), e.clear(), e.renderBufferDirect(P, null, v, u, S, null), m.uniforms.shadow_pass.value = b.mapPass.texture, m.uniforms.resolution.value = b.mapSize, m.uniforms.radius.value = b.radius, e.setRenderTarget(b.map), e.clear(), e.renderBufferDirect(P, null, v, m, S, null);
  }
  function T(b, P, v, E) {
    let X = null;
    const w = v.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (w !== void 0) X = w;
    else if (X = v.isPointLight === !0 ? c : o, e.localClippingEnabled && P.clipShadows === !0 && Array.isArray(P.clippingPlanes) && P.clippingPlanes.length !== 0 || P.displacementMap && P.displacementScale !== 0 || P.alphaMap && P.alphaTest > 0 || P.map && P.alphaTest > 0 || P.alphaToCoverage === !0) {
      const G = X.uuid, W = P.uuid;
      let H = l[G];
      H === void 0 && (H = {}, l[G] = H);
      let B = H[W];
      B === void 0 && (B = X.clone(), H[W] = B, P.addEventListener("dispose", y)), X = B;
    }
    if (X.visible = P.visible, X.wireframe = P.wireframe, E === 3 ? X.side = P.shadowSide !== null ? P.shadowSide : P.side : X.side = P.shadowSide !== null ? P.shadowSide : f[P.side], X.alphaMap = P.alphaMap, X.alphaTest = P.alphaToCoverage === !0 ? 0.5 : P.alphaTest, X.map = P.map, X.clipShadows = P.clipShadows, X.clippingPlanes = P.clippingPlanes, X.clipIntersection = P.clipIntersection, X.displacementMap = P.displacementMap, X.displacementScale = P.displacementScale, X.displacementBias = P.displacementBias, X.wireframeLinewidth = P.wireframeLinewidth, X.linewidth = P.linewidth, v.isPointLight === !0 && X.isMeshDistanceMaterial === !0) {
      const G = e.properties.get(X);
      G.light = v;
    }
    return X;
  }
  function A(b, P, v, E, X) {
    if (b.visible === !1) return;
    if (b.layers.test(P.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && X === 3) && (!b.frustumCulled || n.intersectsObject(b))) {
      b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, b.matrixWorld);
      const G = t.update(b), W = b.material;
      if (Array.isArray(W)) {
        const H = G.groups;
        for (let B = 0, q = H.length; B < q; B++) {
          const N = H[B], J = W[N.materialIndex];
          if (J && J.visible) {
            const ee = T(b, J, E, X);
            b.onBeforeShadow(e, b, P, v, G, ee, N), e.renderBufferDirect(v, null, G, ee, b, N), b.onAfterShadow(e, b, P, v, G, ee, N);
          }
        }
      } else if (W.visible) {
        const H = T(b, W, E, X);
        b.onBeforeShadow(e, b, P, v, G, H, null), e.renderBufferDirect(v, null, G, H, b, null), b.onAfterShadow(e, b, P, v, G, H, null);
      }
    }
    const w = b.children;
    for (let G = 0, W = w.length; G < W; G++) A(w[G], P, v, E, X);
  }
  function y(b) {
    b.target.removeEventListener("dispose", y);
    for (const P in l) {
      const v = l[P], E = b.target.uuid;
      E in v && (v[E].dispose(), delete v[E]);
    }
  }
}
function ed(e, t) {
  function i() {
    let L = !1;
    const K = new st();
    let Q = null;
    const fe = new st(0, 0, 0, 0);
    return {
      setMask: function(ve) {
        Q !== ve && !L && (e.colorMask(ve, ve, ve, ve), Q = ve);
      },
      setLocked: function(ve) {
        L = ve;
      },
      setClear: function(ve, j, le, be, St) {
        St === !0 && (ve *= be, j *= be, le *= be), K.set(ve, j, le, be), fe.equals(K) === !1 && (e.clearColor(ve, j, le, be), fe.copy(K));
      },
      reset: function() {
        L = !1, Q = null, fe.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let L = !1, K = !1, Q = null, fe = null, ve = null;
    return {
      setReversed: function(j) {
        if (K !== j) {
          const le = t.get("EXT_clip_control");
          j ? le.clipControlEXT(le.LOWER_LEFT_EXT, le.ZERO_TO_ONE_EXT) : le.clipControlEXT(le.LOWER_LEFT_EXT, le.NEGATIVE_ONE_TO_ONE_EXT), K = j;
          const be = ve;
          ve = null, this.setClear(be);
        }
      },
      getReversed: function() {
        return K;
      },
      setTest: function(j) {
        j ? ue(e.DEPTH_TEST) : Te(e.DEPTH_TEST);
      },
      setMask: function(j) {
        Q !== j && !L && (e.depthMask(j), Q = j);
      },
      setFunc: function(j) {
        if (K && (j = Rl[j]), fe !== j) {
          switch (j) {
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
          fe = j;
        }
      },
      setLocked: function(j) {
        L = j;
      },
      setClear: function(j) {
        ve !== j && (ve = j, K && (j = 1 - j), e.clearDepth(j));
      },
      reset: function() {
        L = !1, Q = null, fe = null, ve = null, K = !1;
      }
    };
  }
  function r() {
    let L = !1, K = null, Q = null, fe = null, ve = null, j = null, le = null, be = null, St = null;
    return {
      setTest: function(Je) {
        L || (Je ? ue(e.STENCIL_TEST) : Te(e.STENCIL_TEST));
      },
      setMask: function(Je) {
        K !== Je && !L && (e.stencilMask(Je), K = Je);
      },
      setFunc: function(Je, Wt, jt) {
        (Q !== Je || fe !== Wt || ve !== jt) && (e.stencilFunc(Je, Wt, jt), Q = Je, fe = Wt, ve = jt);
      },
      setOp: function(Je, Wt, jt) {
        (j !== Je || le !== Wt || be !== jt) && (e.stencilOp(Je, Wt, jt), j = Je, le = Wt, be = jt);
      },
      setLocked: function(Je) {
        L = Je;
      },
      setClear: function(Je) {
        St !== Je && (e.clearStencil(Je), St = Je);
      },
      reset: function() {
        L = !1, K = null, Q = null, fe = null, ve = null, j = null, le = null, be = null, St = null;
      }
    };
  }
  const s = new i(), a = new n(), o = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, u = {}, m = /* @__PURE__ */ new WeakMap(), M = [], S = null, p = !1, d = null, R = null, T = null, A = null, y = null, b = null, P = null, v = new ke(0, 0, 0), E = 0, X = !1, w = null, G = null, W = null, H = null, B = null;
  const q = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let N = !1, J = 0;
  const ee = e.getParameter(e.VERSION);
  ee.indexOf("WebGL") !== -1 ? (J = parseFloat(/^WebGL (\d)/.exec(ee)[1]), N = J >= 1) : ee.indexOf("OpenGL ES") !== -1 && (J = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), N = J >= 2);
  let te = null, he = {};
  const Se = e.getParameter(e.SCISSOR_BOX), We = e.getParameter(e.VIEWPORT), Ye = new st().fromArray(Se), Y = new st().fromArray(We);
  function re(L, K, Q, fe) {
    const ve = new Uint8Array(4), j = e.createTexture();
    e.bindTexture(L, j), e.texParameteri(L, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(L, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let le = 0; le < Q; le++) L === e.TEXTURE_3D || L === e.TEXTURE_2D_ARRAY ? e.texImage3D(K, 0, e.RGBA, 1, 1, fe, 0, e.RGBA, e.UNSIGNED_BYTE, ve) : e.texImage2D(K + le, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, ve);
    return j;
  }
  const de = {};
  de[e.TEXTURE_2D] = re(e.TEXTURE_2D, e.TEXTURE_2D, 1), de[e.TEXTURE_CUBE_MAP] = re(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), de[e.TEXTURE_2D_ARRAY] = re(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), de[e.TEXTURE_3D] = re(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), ue(e.DEPTH_TEST), a.setFunc(3), Dt(!1), $e(1), ue(e.CULL_FACE), mt(0);
  function ue(L) {
    h[L] !== !0 && (e.enable(L), h[L] = !0);
  }
  function Te(L) {
    h[L] !== !1 && (e.disable(L), h[L] = !1);
  }
  function we(L, K) {
    return u[L] !== K ? (e.bindFramebuffer(L, K), u[L] = K, L === e.DRAW_FRAMEBUFFER && (u[e.FRAMEBUFFER] = K), L === e.FRAMEBUFFER && (u[e.DRAW_FRAMEBUFFER] = K), !0) : !1;
  }
  function Pe(L, K) {
    let Q = M, fe = !1;
    if (L) {
      Q = m.get(K), Q === void 0 && (Q = [], m.set(K, Q));
      const ve = L.textures;
      if (Q.length !== ve.length || Q[0] !== e.COLOR_ATTACHMENT0) {
        for (let j = 0, le = ve.length; j < le; j++) Q[j] = e.COLOR_ATTACHMENT0 + j;
        Q.length = ve.length, fe = !0;
      }
    } else Q[0] !== e.BACK && (Q[0] = e.BACK, fe = !0);
    fe && e.drawBuffers(Q);
  }
  function Xe(L) {
    return S !== L ? (e.useProgram(L), S = L, !0) : !1;
  }
  const Oe = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  Oe[103] = e.MIN, Oe[104] = e.MAX;
  const je = {
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
  function mt(L, K, Q, fe, ve, j, le, be, St, Je) {
    if (L === 0) {
      p === !0 && (Te(e.BLEND), p = !1);
      return;
    }
    if (p === !1 && (ue(e.BLEND), p = !0), L !== 5) {
      if (L !== d || Je !== X) {
        if ((R !== 100 || y !== 100) && (e.blendEquation(e.FUNC_ADD), R = 100, y = 100), Je) switch (L) {
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
            Ce("WebGLState: Invalid blending: ", L);
            break;
        }
        else switch (L) {
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
            Ce("WebGLState: Invalid blending: ", L);
            break;
        }
        T = null, A = null, b = null, P = null, v.set(0, 0, 0), E = 0, d = L, X = Je;
      }
      return;
    }
    ve = ve || K, j = j || Q, le = le || fe, (K !== R || ve !== y) && (e.blendEquationSeparate(Oe[K], Oe[ve]), R = K, y = ve), (Q !== T || fe !== A || j !== b || le !== P) && (e.blendFuncSeparate(je[Q], je[fe], je[j], je[le]), T = Q, A = fe, b = j, P = le), (be.equals(v) === !1 || St !== E) && (e.blendColor(be.r, be.g, be.b, St), v.copy(be), E = St), d = L, X = !1;
  }
  function Tt(L, K) {
    L.side === 2 ? Te(e.CULL_FACE) : ue(e.CULL_FACE);
    let Q = L.side === 1;
    K && (Q = !Q), Dt(Q), L.blending === 1 && L.transparent === !1 ? mt(0) : mt(L.blending, L.blendEquation, L.blendSrc, L.blendDst, L.blendEquationAlpha, L.blendSrcAlpha, L.blendDstAlpha, L.blendColor, L.blendAlpha, L.premultipliedAlpha), a.setFunc(L.depthFunc), a.setTest(L.depthTest), a.setMask(L.depthWrite), s.setMask(L.colorWrite);
    const fe = L.stencilWrite;
    o.setTest(fe), fe && (o.setMask(L.stencilWriteMask), o.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask), o.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)), ft(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), L.alphaToCoverage === !0 ? ue(e.SAMPLE_ALPHA_TO_COVERAGE) : Te(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Dt(L) {
    w !== L && (L ? e.frontFace(e.CW) : e.frontFace(e.CCW), w = L);
  }
  function $e(L) {
    L !== 0 ? (ue(e.CULL_FACE), L !== G && (L === 1 ? e.cullFace(e.BACK) : L === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : Te(e.CULL_FACE), G = L;
  }
  function gt(L) {
    L !== W && (N && e.lineWidth(L), W = L);
  }
  function ft(L, K, Q) {
    L ? (ue(e.POLYGON_OFFSET_FILL), (H !== K || B !== Q) && (H = K, B = Q, a.getReversed() && (K = -K), e.polygonOffset(K, Q))) : Te(e.POLYGON_OFFSET_FILL);
  }
  function ct(L) {
    L ? ue(e.SCISSOR_TEST) : Te(e.SCISSOR_TEST);
  }
  function D(L) {
    L === void 0 && (L = e.TEXTURE0 + q - 1), te !== L && (e.activeTexture(L), te = L);
  }
  function It(L, K, Q) {
    Q === void 0 && (te === null ? Q = e.TEXTURE0 + q - 1 : Q = te);
    let fe = he[Q];
    fe === void 0 && (fe = {
      type: void 0,
      texture: void 0
    }, he[Q] = fe), (fe.type !== L || fe.texture !== K) && (te !== Q && (e.activeTexture(Q), te = Q), e.bindTexture(L, K || de[L]), fe.type = L, fe.texture = K);
  }
  function qe() {
    const L = he[te];
    L !== void 0 && L.type !== void 0 && (e.bindTexture(L.type, null), L.type = void 0, L.texture = void 0);
  }
  function et() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function x() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function g() {
    try {
      e.texSubImage2D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function C() {
    try {
      e.texSubImage3D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function z() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function Z() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function ne() {
    try {
      e.texStorage2D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function oe() {
    try {
      e.texStorage3D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function I() {
    try {
      e.texImage2D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function ie() {
    try {
      e.texImage3D(...arguments);
    } catch (L) {
      Ce("WebGLState:", L);
    }
  }
  function pe(L) {
    return f[L] !== void 0 ? f[L] : e.getParameter(L);
  }
  function _e(L, K) {
    f[L] !== K && (e.pixelStorei(L, K), f[L] = K);
  }
  function $(L) {
    Ye.equals(L) === !1 && (e.scissor(L.x, L.y, L.z, L.w), Ye.copy(L));
  }
  function xe(L) {
    Y.equals(L) === !1 && (e.viewport(L.x, L.y, L.z, L.w), Y.copy(L));
  }
  function Ae(L, K) {
    let Q = l.get(K);
    Q === void 0 && (Q = /* @__PURE__ */ new WeakMap(), l.set(K, Q));
    let fe = Q.get(L);
    fe === void 0 && (fe = e.getUniformBlockIndex(K, L.name), Q.set(L, fe));
  }
  function Le(L, K) {
    const Q = l.get(K).get(L);
    c.get(K) !== Q && (e.uniformBlockBinding(K, Q, L.__bindingPointIndex), c.set(K, Q));
  }
  function ze() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), a.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), h = {}, f = {}, te = null, he = {}, u = {}, m = /* @__PURE__ */ new WeakMap(), M = [], S = null, p = !1, d = null, R = null, T = null, A = null, y = null, b = null, P = null, v = new ke(0, 0, 0), E = 0, X = !1, w = null, G = null, W = null, H = null, B = null, Ye.set(0, 0, e.canvas.width, e.canvas.height), Y.set(0, 0, e.canvas.width, e.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: ue,
    disable: Te,
    bindFramebuffer: we,
    drawBuffers: Pe,
    useProgram: Xe,
    setBlending: mt,
    setMaterial: Tt,
    setFlipSided: Dt,
    setCullFace: $e,
    setLineWidth: gt,
    setPolygonOffset: ft,
    setScissorTest: ct,
    activeTexture: D,
    bindTexture: It,
    unbindTexture: qe,
    compressedTexImage2D: et,
    compressedTexImage3D: x,
    texImage2D: I,
    texImage3D: ie,
    pixelStorei: _e,
    getParameter: pe,
    updateUBOMapping: Ae,
    uniformBlockBinding: Le,
    texStorage2D: ne,
    texStorage3D: oe,
    texSubImage2D: g,
    texSubImage3D: C,
    compressedTexSubImage2D: z,
    compressedTexSubImage3D: Z,
    scissor: $,
    viewport: xe,
    reset: ze
  };
}
function td(e, t, i, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new Ie(), h = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new Set();
  let u;
  const m = /* @__PURE__ */ new WeakMap();
  let M = !1;
  try {
    M = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function S(x, g) {
    return M ? new OffscreenCanvas(x, g) : dr("canvas");
  }
  function p(x, g, C) {
    let z = 1;
    const Z = et(x);
    if ((Z.width > C || Z.height > C) && (z = C / Math.max(Z.width, Z.height)), z < 1) if (typeof HTMLImageElement < "u" && x instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && x instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && x instanceof ImageBitmap || typeof VideoFrame < "u" && x instanceof VideoFrame) {
      const ne = Math.floor(z * Z.width), oe = Math.floor(z * Z.height);
      u === void 0 && (u = S(ne, oe));
      const I = g ? S(ne, oe) : u;
      return I.width = ne, I.height = oe, I.getContext("2d").drawImage(x, 0, 0, ne, oe), ye("WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + ne + "x" + oe + ")."), I;
    } else
      return "data" in x && ye("WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), x;
    return x;
  }
  function d(x) {
    return x.generateMipmaps;
  }
  function R(x) {
    e.generateMipmap(x);
  }
  function T(x) {
    return x.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : x.isWebGL3DRenderTarget ? e.TEXTURE_3D : x.isWebGLArrayRenderTarget || x.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function A(x, g, C, z, Z, ne = !1) {
    if (x !== null) {
      if (e[x] !== void 0) return e[x];
      ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + x + "'");
    }
    let oe;
    z && (oe = t.get("EXT_texture_norm16"), oe || ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let I = g;
    if (g === e.RED && (C === e.FLOAT && (I = e.R32F), C === e.HALF_FLOAT && (I = e.R16F), C === e.UNSIGNED_BYTE && (I = e.R8), C === e.UNSIGNED_SHORT && oe && (I = oe.R16_EXT), C === e.SHORT && oe && (I = oe.R16_SNORM_EXT)), g === e.RED_INTEGER && (C === e.UNSIGNED_BYTE && (I = e.R8UI), C === e.UNSIGNED_SHORT && (I = e.R16UI), C === e.UNSIGNED_INT && (I = e.R32UI), C === e.BYTE && (I = e.R8I), C === e.SHORT && (I = e.R16I), C === e.INT && (I = e.R32I)), g === e.RG && (C === e.FLOAT && (I = e.RG32F), C === e.HALF_FLOAT && (I = e.RG16F), C === e.UNSIGNED_BYTE && (I = e.RG8), C === e.UNSIGNED_SHORT && oe && (I = oe.RG16_EXT), C === e.SHORT && oe && (I = oe.RG16_SNORM_EXT)), g === e.RG_INTEGER && (C === e.UNSIGNED_BYTE && (I = e.RG8UI), C === e.UNSIGNED_SHORT && (I = e.RG16UI), C === e.UNSIGNED_INT && (I = e.RG32UI), C === e.BYTE && (I = e.RG8I), C === e.SHORT && (I = e.RG16I), C === e.INT && (I = e.RG32I)), g === e.RGB_INTEGER && (C === e.UNSIGNED_BYTE && (I = e.RGB8UI), C === e.UNSIGNED_SHORT && (I = e.RGB16UI), C === e.UNSIGNED_INT && (I = e.RGB32UI), C === e.BYTE && (I = e.RGB8I), C === e.SHORT && (I = e.RGB16I), C === e.INT && (I = e.RGB32I)), g === e.RGBA_INTEGER && (C === e.UNSIGNED_BYTE && (I = e.RGBA8UI), C === e.UNSIGNED_SHORT && (I = e.RGBA16UI), C === e.UNSIGNED_INT && (I = e.RGBA32UI), C === e.BYTE && (I = e.RGBA8I), C === e.SHORT && (I = e.RGBA16I), C === e.INT && (I = e.RGBA32I)), g === e.RGB && (C === e.UNSIGNED_SHORT && oe && (I = oe.RGB16_EXT), C === e.SHORT && oe && (I = oe.RGB16_SNORM_EXT), C === e.UNSIGNED_INT_5_9_9_9_REV && (I = e.RGB9_E5), C === e.UNSIGNED_INT_10F_11F_11F_REV && (I = e.R11F_G11F_B10F)), g === e.RGBA) {
      const ie = ne ? hr : Be.getTransfer(Z);
      C === e.FLOAT && (I = e.RGBA32F), C === e.HALF_FLOAT && (I = e.RGBA16F), C === e.UNSIGNED_BYTE && (I = ie === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), C === e.UNSIGNED_SHORT && oe && (I = oe.RGBA16_EXT), C === e.SHORT && oe && (I = oe.RGBA16_SNORM_EXT), C === e.UNSIGNED_SHORT_4_4_4_4 && (I = e.RGBA4), C === e.UNSIGNED_SHORT_5_5_5_1 && (I = e.RGB5_A1);
    }
    return (I === e.R16F || I === e.R32F || I === e.RG16F || I === e.RG32F || I === e.RGBA16F || I === e.RGBA32F) && t.get("EXT_color_buffer_float"), I;
  }
  function y(x, g) {
    let C;
    return x ? g === null || g === 1014 || g === 1020 ? C = e.DEPTH24_STENCIL8 : g === 1015 ? C = e.DEPTH32F_STENCIL8 : g === 1012 && (C = e.DEPTH24_STENCIL8, ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === 1014 || g === 1020 ? C = e.DEPTH_COMPONENT24 : g === 1015 ? C = e.DEPTH_COMPONENT32F : g === 1012 && (C = e.DEPTH_COMPONENT16), C;
  }
  function b(x, g) {
    return d(x) === !0 || x.isFramebufferTexture && x.minFilter !== 1003 && x.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : x.mipmaps !== void 0 && x.mipmaps.length > 0 ? x.mipmaps.length : x.isCompressedTexture && Array.isArray(x.image) ? g.mipmaps.length : 1;
  }
  function P(x) {
    const g = x.target;
    g.removeEventListener("dispose", P), E(g), g.isVideoTexture && h.delete(g), g.isHTMLTexture && f.delete(g);
  }
  function v(x) {
    const g = x.target;
    g.removeEventListener("dispose", v), w(g);
  }
  function E(x) {
    const g = n.get(x);
    if (g.__webglInit === void 0) return;
    const C = x.source, z = m.get(C);
    if (z) {
      const Z = z[g.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && X(x), Object.keys(z).length === 0 && m.delete(C);
    }
    n.remove(x);
  }
  function X(x) {
    const g = n.get(x);
    e.deleteTexture(g.__webglTexture);
    const C = x.source, z = m.get(C);
    delete z[g.__cacheKey], a.memory.textures--;
  }
  function w(x) {
    const g = n.get(x);
    if (x.depthTexture && (x.depthTexture.dispose(), n.remove(x.depthTexture)), x.isWebGLCubeRenderTarget) for (let z = 0; z < 6; z++) {
      if (Array.isArray(g.__webglFramebuffer[z])) for (let Z = 0; Z < g.__webglFramebuffer[z].length; Z++) e.deleteFramebuffer(g.__webglFramebuffer[z][Z]);
      else e.deleteFramebuffer(g.__webglFramebuffer[z]);
      g.__webglDepthbuffer && e.deleteRenderbuffer(g.__webglDepthbuffer[z]);
    }
    else {
      if (Array.isArray(g.__webglFramebuffer)) for (let z = 0; z < g.__webglFramebuffer.length; z++) e.deleteFramebuffer(g.__webglFramebuffer[z]);
      else e.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && e.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && e.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let z = 0; z < g.__webglColorRenderbuffer.length; z++) g.__webglColorRenderbuffer[z] && e.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);
      g.__webglDepthRenderbuffer && e.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const C = x.textures;
    for (let z = 0, Z = C.length; z < Z; z++) {
      const ne = n.get(C[z]);
      ne.__webglTexture && (e.deleteTexture(ne.__webglTexture), a.memory.textures--), n.remove(C[z]);
    }
    n.remove(x);
  }
  let G = 0;
  function W() {
    G = 0;
  }
  function H() {
    return G;
  }
  function B(x) {
    G = x;
  }
  function q() {
    const x = G;
    return x >= r.maxTextures && ye("WebGLTextures: Trying to use " + x + " texture units while this GPU supports only " + r.maxTextures), G += 1, x;
  }
  function N(x) {
    const g = [];
    return g.push(x.wrapS), g.push(x.wrapT), g.push(x.wrapR || 0), g.push(x.magFilter), g.push(x.minFilter), g.push(x.anisotropy), g.push(x.internalFormat), g.push(x.format), g.push(x.type), g.push(x.generateMipmaps), g.push(x.premultiplyAlpha), g.push(x.flipY), g.push(x.unpackAlignment), g.push(x.colorSpace), g.join();
  }
  function J(x, g) {
    const C = n.get(x);
    if (x.isVideoTexture && It(x), x.isRenderTargetTexture === !1 && x.isExternalTexture !== !0 && x.version > 0 && C.__version !== x.version) {
      const z = x.image;
      if (z === null) ye("WebGLRenderer: Texture marked for update but no image data found.");
      else if (z.complete === !1) ye("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Te(C, x, g);
        return;
      }
    } else x.isExternalTexture && (C.__webglTexture = x.sourceTexture ? x.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D, C.__webglTexture, e.TEXTURE0 + g);
  }
  function ee(x, g) {
    const C = n.get(x);
    if (x.isRenderTargetTexture === !1 && x.version > 0 && C.__version !== x.version) {
      Te(C, x, g);
      return;
    } else x.isExternalTexture && (C.__webglTexture = x.sourceTexture ? x.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D_ARRAY, C.__webglTexture, e.TEXTURE0 + g);
  }
  function te(x, g) {
    const C = n.get(x);
    if (x.isRenderTargetTexture === !1 && x.version > 0 && C.__version !== x.version) {
      Te(C, x, g);
      return;
    }
    i.bindTexture(e.TEXTURE_3D, C.__webglTexture, e.TEXTURE0 + g);
  }
  function he(x, g) {
    const C = n.get(x);
    if (x.isCubeDepthTexture !== !0 && x.version > 0 && C.__version !== x.version) {
      we(C, x, g);
      return;
    }
    i.bindTexture(e.TEXTURE_CUBE_MAP, C.__webglTexture, e.TEXTURE0 + g);
  }
  const Se = {
    [es]: e.REPEAT,
    [ai]: e.CLAMP_TO_EDGE,
    [ts]: e.MIRRORED_REPEAT
  }, We = {
    [Et]: e.NEAREST,
    [Co]: e.NEAREST_MIPMAP_NEAREST,
    [Po]: e.NEAREST_MIPMAP_LINEAR,
    [yt]: e.LINEAR,
    [Lo]: e.LINEAR_MIPMAP_NEAREST,
    [as]: e.LINEAR_MIPMAP_LINEAR
  }, Ye = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function Y(x, g) {
    if (g.type === 1015 && t.has("OES_texture_float_linear") === !1 && (g.magFilter === 1006 || g.magFilter === 1007 || g.magFilter === 1005 || g.magFilter === 1008 || g.minFilter === 1006 || g.minFilter === 1007 || g.minFilter === 1005 || g.minFilter === 1008) && ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(x, e.TEXTURE_WRAP_S, Se[g.wrapS]), e.texParameteri(x, e.TEXTURE_WRAP_T, Se[g.wrapT]), (x === e.TEXTURE_3D || x === e.TEXTURE_2D_ARRAY) && e.texParameteri(x, e.TEXTURE_WRAP_R, Se[g.wrapR]), e.texParameteri(x, e.TEXTURE_MAG_FILTER, We[g.magFilter]), e.texParameteri(x, e.TEXTURE_MIN_FILTER, We[g.minFilter]), g.compareFunction && (e.texParameteri(x, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(x, e.TEXTURE_COMPARE_FUNC, Ye[g.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || n.get(g).__currentAnisotropy) {
        const C = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(x, C.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), n.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function re(x, g) {
    let C = !1;
    x.__webglInit === void 0 && (x.__webglInit = !0, g.addEventListener("dispose", P));
    const z = g.source;
    let Z = m.get(z);
    Z === void 0 && (Z = {}, m.set(z, Z));
    const ne = N(g);
    if (ne !== x.__cacheKey) {
      Z[ne] === void 0 && (Z[ne] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, C = !0), Z[ne].usedTimes++;
      const oe = Z[x.__cacheKey];
      oe !== void 0 && (Z[x.__cacheKey].usedTimes--, oe.usedTimes === 0 && X(g)), x.__cacheKey = ne, x.__webglTexture = Z[ne].texture;
    }
    return C;
  }
  function de(x, g, C) {
    return Math.floor(Math.floor(x / C) / g);
  }
  function ue(x, g, C, z) {
    const ne = x.updateRanges;
    if (ne.length === 0) i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, g.width, g.height, C, z, g.data);
    else {
      ne.sort((_e, $) => _e.start - $.start);
      let oe = 0;
      for (let _e = 1; _e < ne.length; _e++) {
        const $ = ne[oe], xe = ne[_e], Ae = $.start + $.count, Le = de(xe.start, g.width, 4), ze = de($.start, g.width, 4);
        xe.start <= Ae + 1 && Le === ze && de(xe.start + xe.count - 1, g.width, 4) === Le ? $.count = Math.max($.count, xe.start + xe.count - $.start) : (++oe, ne[oe] = xe);
      }
      ne.length = oe + 1;
      const I = i.getParameter(e.UNPACK_ROW_LENGTH), ie = i.getParameter(e.UNPACK_SKIP_PIXELS), pe = i.getParameter(e.UNPACK_SKIP_ROWS);
      i.pixelStorei(e.UNPACK_ROW_LENGTH, g.width);
      for (let _e = 0, $ = ne.length; _e < $; _e++) {
        const xe = ne[_e], Ae = Math.floor(xe.start / 4), Le = Math.ceil(xe.count / 4), ze = Ae % g.width, L = Math.floor(Ae / g.width), K = Le, Q = 1;
        i.pixelStorei(e.UNPACK_SKIP_PIXELS, ze), i.pixelStorei(e.UNPACK_SKIP_ROWS, L), i.texSubImage2D(e.TEXTURE_2D, 0, ze, L, K, Q, C, z, g.data);
      }
      x.clearUpdateRanges(), i.pixelStorei(e.UNPACK_ROW_LENGTH, I), i.pixelStorei(e.UNPACK_SKIP_PIXELS, ie), i.pixelStorei(e.UNPACK_SKIP_ROWS, pe);
    }
  }
  function Te(x, g, C) {
    let z = e.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (z = e.TEXTURE_2D_ARRAY), g.isData3DTexture && (z = e.TEXTURE_3D);
    const Z = re(x, g), ne = g.source;
    i.bindTexture(z, x.__webglTexture, e.TEXTURE0 + C);
    const oe = n.get(ne);
    if (ne.version !== oe.__version || Z === !0) {
      if (i.activeTexture(e.TEXTURE0 + C), !(typeof ImageBitmap < "u" && g.image instanceof ImageBitmap)) {
        const K = Be.getPrimaries(Be.workingColorSpace), Q = g.colorSpace === "" ? null : Be.getPrimaries(g.colorSpace), fe = g.colorSpace === "" || K === Q ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, fe);
      }
      i.pixelStorei(e.UNPACK_ALIGNMENT, g.unpackAlignment);
      let I = p(g.image, !1, r.maxTextureSize);
      I = qe(g, I);
      const ie = s.convert(g.format, g.colorSpace), pe = s.convert(g.type);
      let _e = A(g.internalFormat, ie, pe, g.normalized, g.colorSpace, g.isVideoTexture);
      Y(z, g);
      let $;
      const xe = g.mipmaps, Ae = g.isVideoTexture !== !0, Le = oe.__version === void 0 || Z === !0, ze = ne.dataReady, L = b(g, I);
      if (g.isDepthTexture)
        _e = y(g.format === Xa, g.type), Le && (Ae ? i.texStorage2D(e.TEXTURE_2D, 1, _e, I.width, I.height) : i.texImage2D(e.TEXTURE_2D, 0, _e, I.width, I.height, 0, ie, pe, null));
      else if (g.isDataTexture) if (xe.length > 0) {
        Ae && Le && i.texStorage2D(e.TEXTURE_2D, L, _e, xe[0].width, xe[0].height);
        for (let K = 0, Q = xe.length; K < Q; K++)
          $ = xe[K], Ae ? ze && i.texSubImage2D(e.TEXTURE_2D, K, 0, 0, $.width, $.height, ie, pe, $.data) : i.texImage2D(e.TEXTURE_2D, K, _e, $.width, $.height, 0, ie, pe, $.data);
        g.generateMipmaps = !1;
      } else Ae ? (Le && i.texStorage2D(e.TEXTURE_2D, L, _e, I.width, I.height), ze && ue(g, I, ie, pe)) : i.texImage2D(e.TEXTURE_2D, 0, _e, I.width, I.height, 0, ie, pe, I.data);
      else if (g.isCompressedTexture) if (g.isCompressedArrayTexture) {
        Ae && Le && i.texStorage3D(e.TEXTURE_2D_ARRAY, L, _e, xe[0].width, xe[0].height, I.depth);
        for (let K = 0, Q = xe.length; K < Q; K++)
          if ($ = xe[K], g.format !== 1023) if (ie !== null) if (Ae) {
            if (ze) if (g.layerUpdates.size > 0) {
              const fe = Zs($.width, $.height, g.format, g.type);
              for (const ve of g.layerUpdates) {
                const j = $.data.subarray(ve * fe / $.data.BYTES_PER_ELEMENT, (ve + 1) * fe / $.data.BYTES_PER_ELEMENT);
                i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, K, 0, 0, ve, $.width, $.height, 1, ie, j);
              }
              g.clearLayerUpdates();
            } else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, K, 0, 0, 0, $.width, $.height, I.depth, ie, $.data);
          } else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY, K, _e, $.width, $.height, I.depth, 0, $.data, 0, 0);
          else ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else Ae ? ze && i.texSubImage3D(e.TEXTURE_2D_ARRAY, K, 0, 0, 0, $.width, $.height, I.depth, ie, pe, $.data) : i.texImage3D(e.TEXTURE_2D_ARRAY, K, _e, $.width, $.height, I.depth, 0, ie, pe, $.data);
      } else {
        Ae && Le && i.texStorage2D(e.TEXTURE_2D, L, _e, xe[0].width, xe[0].height);
        for (let K = 0, Q = xe.length; K < Q; K++)
          $ = xe[K], g.format !== 1023 ? ie !== null ? Ae ? ze && i.compressedTexSubImage2D(e.TEXTURE_2D, K, 0, 0, $.width, $.height, ie, $.data) : i.compressedTexImage2D(e.TEXTURE_2D, K, _e, $.width, $.height, 0, $.data) : ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ae ? ze && i.texSubImage2D(e.TEXTURE_2D, K, 0, 0, $.width, $.height, ie, pe, $.data) : i.texImage2D(e.TEXTURE_2D, K, _e, $.width, $.height, 0, ie, pe, $.data);
      }
      else if (g.isDataArrayTexture) if (Ae) {
        if (Le && i.texStorage3D(e.TEXTURE_2D_ARRAY, L, _e, I.width, I.height, I.depth), ze) if (g.layerUpdates.size > 0) {
          const K = Zs(I.width, I.height, g.format, g.type);
          for (const Q of g.layerUpdates) {
            const fe = I.data.subarray(Q * K / I.data.BYTES_PER_ELEMENT, (Q + 1) * K / I.data.BYTES_PER_ELEMENT);
            i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, Q, I.width, I.height, 1, ie, pe, fe);
          }
          g.clearLayerUpdates();
        } else i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, I.width, I.height, I.depth, ie, pe, I.data);
      } else i.texImage3D(e.TEXTURE_2D_ARRAY, 0, _e, I.width, I.height, I.depth, 0, ie, pe, I.data);
      else if (g.isData3DTexture) Ae ? (Le && i.texStorage3D(e.TEXTURE_3D, L, _e, I.width, I.height, I.depth), ze && i.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, I.width, I.height, I.depth, ie, pe, I.data)) : i.texImage3D(e.TEXTURE_3D, 0, _e, I.width, I.height, I.depth, 0, ie, pe, I.data);
      else if (g.isFramebufferTexture) {
        if (Le) if (Ae) i.texStorage2D(e.TEXTURE_2D, L, _e, I.width, I.height);
        else {
          let K = I.width, Q = I.height;
          for (let fe = 0; fe < L; fe++)
            i.texImage2D(e.TEXTURE_2D, fe, _e, K, Q, 0, ie, pe, null), K >>= 1, Q >>= 1;
        }
      } else if (g.isHTMLTexture) {
        if ("texElementImage2D" in e) {
          const K = e.canvas;
          if (K.hasAttribute("layoutsubtree") || K.setAttribute("layoutsubtree", "true"), I.parentNode !== K) {
            K.appendChild(I), f.add(g), K.onpaint = (Q) => {
              const fe = Q.changedElements;
              for (const ve of f) fe.includes(ve.image) && (ve.needsUpdate = !0);
            }, K.requestPaint();
            return;
          }
          if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, I);
          else {
            const fe = e.RGBA, ve = e.RGBA, j = e.UNSIGNED_BYTE;
            e.texElementImage2D(e.TEXTURE_2D, 0, fe, ve, j, I);
          }
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (xe.length > 0) {
        if (Ae && Le) {
          const K = et(xe[0]);
          i.texStorage2D(e.TEXTURE_2D, L, _e, K.width, K.height);
        }
        for (let K = 0, Q = xe.length; K < Q; K++)
          $ = xe[K], Ae ? ze && i.texSubImage2D(e.TEXTURE_2D, K, 0, 0, ie, pe, $) : i.texImage2D(e.TEXTURE_2D, K, _e, ie, pe, $);
        g.generateMipmaps = !1;
      } else if (Ae) {
        if (Le) {
          const K = et(I);
          i.texStorage2D(e.TEXTURE_2D, L, _e, K.width, K.height);
        }
        ze && i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ie, pe, I);
      } else i.texImage2D(e.TEXTURE_2D, 0, _e, ie, pe, I);
      d(g) && R(z), oe.__version = ne.version, g.onUpdate && g.onUpdate(g);
    }
    x.__version = g.version;
  }
  function we(x, g, C) {
    if (g.image.length !== 6) return;
    const z = re(x, g), Z = g.source;
    i.bindTexture(e.TEXTURE_CUBE_MAP, x.__webglTexture, e.TEXTURE0 + C);
    const ne = n.get(Z);
    if (Z.version !== ne.__version || z === !0) {
      i.activeTexture(e.TEXTURE0 + C);
      const oe = Be.getPrimaries(Be.workingColorSpace), I = g.colorSpace === "" ? null : Be.getPrimaries(g.colorSpace), ie = g.colorSpace === "" || oe === I ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(e.UNPACK_ALIGNMENT, g.unpackAlignment), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, ie);
      const pe = g.isCompressedTexture || g.image[0].isCompressedTexture, _e = g.image[0] && g.image[0].isDataTexture, $ = [];
      for (let j = 0; j < 6; j++)
        !pe && !_e ? $[j] = p(g.image[j], !0, r.maxCubemapSize) : $[j] = _e ? g.image[j].image : g.image[j], $[j] = qe(g, $[j]);
      const xe = $[0], Ae = s.convert(g.format, g.colorSpace), Le = s.convert(g.type), ze = A(g.internalFormat, Ae, Le, g.normalized, g.colorSpace), L = g.isVideoTexture !== !0, K = ne.__version === void 0 || z === !0, Q = Z.dataReady;
      let fe = b(g, xe);
      Y(e.TEXTURE_CUBE_MAP, g);
      let ve;
      if (pe) {
        L && K && i.texStorage2D(e.TEXTURE_CUBE_MAP, fe, ze, xe.width, xe.height);
        for (let j = 0; j < 6; j++) {
          ve = $[j].mipmaps;
          for (let le = 0; le < ve.length; le++) {
            const be = ve[le];
            g.format !== 1023 ? Ae !== null ? L ? Q && i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le, 0, 0, be.width, be.height, Ae, be.data) : i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le, ze, be.width, be.height, 0, be.data) : ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : L ? Q && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le, 0, 0, be.width, be.height, Ae, Le, be.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le, ze, be.width, be.height, 0, Ae, Le, be.data);
          }
        }
      } else {
        if (ve = g.mipmaps, L && K) {
          ve.length > 0 && fe++;
          const j = et($[0]);
          i.texStorage2D(e.TEXTURE_CUBE_MAP, fe, ze, j.width, j.height);
        }
        for (let j = 0; j < 6; j++) if (_e) {
          L ? Q && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, $[j].width, $[j].height, Ae, Le, $[j].data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ze, $[j].width, $[j].height, 0, Ae, Le, $[j].data);
          for (let le = 0; le < ve.length; le++) {
            const be = ve[le].image[j].image;
            L ? Q && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le + 1, 0, 0, be.width, be.height, Ae, Le, be.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le + 1, ze, be.width, be.height, 0, Ae, Le, be.data);
          }
        } else {
          L ? Q && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Ae, Le, $[j]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ze, Ae, Le, $[j]);
          for (let le = 0; le < ve.length; le++) {
            const be = ve[le];
            L ? Q && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le + 1, 0, 0, Ae, Le, be.image[j]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, le + 1, ze, Ae, Le, be.image[j]);
          }
        }
      }
      d(g) && R(e.TEXTURE_CUBE_MAP), ne.__version = Z.version, g.onUpdate && g.onUpdate(g);
    }
    x.__version = g.version;
  }
  function Pe(x, g, C, z, Z, ne) {
    const oe = s.convert(C.format, C.colorSpace), I = s.convert(C.type), ie = A(C.internalFormat, oe, I, C.normalized, C.colorSpace), pe = n.get(g), _e = n.get(C);
    if (_e.__renderTarget = g, !pe.__hasExternalTextures) {
      const $ = Math.max(1, g.width >> ne), xe = Math.max(1, g.height >> ne);
      Z === e.TEXTURE_3D || Z === e.TEXTURE_2D_ARRAY ? i.texImage3D(Z, ne, ie, $, xe, g.depth, 0, oe, I, null) : i.texImage2D(Z, ne, ie, $, xe, 0, oe, I, null);
    }
    i.bindFramebuffer(e.FRAMEBUFFER, x), D(g) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, z, Z, _e.__webglTexture, 0, ct(g)) : (Z === e.TEXTURE_2D || Z >= e.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, z, Z, _e.__webglTexture, ne), i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Xe(x, g, C) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, x), g.depthBuffer) {
      const z = g.depthTexture, Z = z && z.isDepthTexture ? z.type : null, ne = y(g.stencilBuffer, Z), oe = g.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      D(g) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ct(g), ne, g.width, g.height) : C ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ct(g), ne, g.width, g.height) : e.renderbufferStorage(e.RENDERBUFFER, ne, g.width, g.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, oe, e.RENDERBUFFER, x);
    } else {
      const z = g.textures;
      for (let Z = 0; Z < z.length; Z++) {
        const ne = z[Z], oe = s.convert(ne.format, ne.colorSpace), I = s.convert(ne.type), ie = A(ne.internalFormat, oe, I, ne.normalized, ne.colorSpace);
        D(g) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, ct(g), ie, g.width, g.height) : C ? e.renderbufferStorageMultisample(e.RENDERBUFFER, ct(g), ie, g.width, g.height) : e.renderbufferStorage(e.RENDERBUFFER, ie, g.width, g.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function Oe(x, g, C) {
    const z = g.isWebGLCubeRenderTarget === !0;
    if (i.bindFramebuffer(e.FRAMEBUFFER, x), !(g.depthTexture && g.depthTexture.isDepthTexture)) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const Z = n.get(g.depthTexture);
    if (Z.__renderTarget = g, (!Z.__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), z) {
      if (Z.__webglInit === void 0 && (Z.__webglInit = !0, g.depthTexture.addEventListener("dispose", P)), Z.__webglTexture === void 0) {
        Z.__webglTexture = e.createTexture(), i.bindTexture(e.TEXTURE_CUBE_MAP, Z.__webglTexture), Y(e.TEXTURE_CUBE_MAP, g.depthTexture);
        const pe = s.convert(g.depthTexture.format), _e = s.convert(g.depthTexture.type);
        let $;
        g.depthTexture.format === 1026 ? $ = e.DEPTH_COMPONENT24 : g.depthTexture.format === 1027 && ($ = e.DEPTH24_STENCIL8);
        for (let xe = 0; xe < 6; xe++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + xe, 0, $, g.width, g.height, 0, pe, _e, null);
      }
    } else J(g.depthTexture, 0);
    const ne = Z.__webglTexture, oe = ct(g), I = z ? e.TEXTURE_CUBE_MAP_POSITIVE_X + C : e.TEXTURE_2D, ie = g.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (g.depthTexture.format === 1026) D(g) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, I, ne, 0, oe) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, I, ne, 0);
    else if (g.depthTexture.format === 1027) D(g) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, I, ne, 0, oe) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, I, ne, 0);
    else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function je(x) {
    const g = n.get(x), C = x.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== x.depthTexture) {
      const z = x.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), z) {
        const Z = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, z.removeEventListener("dispose", Z);
        };
        z.addEventListener("dispose", Z), g.__depthDisposeCallback = Z;
      }
      g.__boundDepthTexture = z;
    }
    if (x.depthTexture && !g.__autoAllocateDepthBuffer) if (C) for (let z = 0; z < 6; z++) Oe(g.__webglFramebuffer[z], x, z);
    else {
      const z = x.texture.mipmaps;
      z && z.length > 0 ? Oe(g.__webglFramebuffer[0], x, 0) : Oe(g.__webglFramebuffer, x, 0);
    }
    else if (C) {
      g.__webglDepthbuffer = [];
      for (let z = 0; z < 6; z++)
        if (i.bindFramebuffer(e.FRAMEBUFFER, g.__webglFramebuffer[z]), g.__webglDepthbuffer[z] === void 0)
          g.__webglDepthbuffer[z] = e.createRenderbuffer(), Xe(g.__webglDepthbuffer[z], x, !1);
        else {
          const Z = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ne = g.__webglDepthbuffer[z];
          e.bindRenderbuffer(e.RENDERBUFFER, ne), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ne);
        }
    } else {
      const z = x.texture.mipmaps;
      if (z && z.length > 0 ? i.bindFramebuffer(e.FRAMEBUFFER, g.__webglFramebuffer[0]) : i.bindFramebuffer(e.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
        g.__webglDepthbuffer = e.createRenderbuffer(), Xe(g.__webglDepthbuffer, x, !1);
      else {
        const Z = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ne = g.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, ne), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ne);
      }
    }
    i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function mt(x, g, C) {
    const z = n.get(x);
    g !== void 0 && Pe(z.__webglFramebuffer, x, x.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), C !== void 0 && je(x);
  }
  function Tt(x) {
    const g = x.texture, C = n.get(x), z = n.get(g);
    x.addEventListener("dispose", v);
    const Z = x.textures, ne = x.isWebGLCubeRenderTarget === !0, oe = Z.length > 1;
    if (oe || (z.__webglTexture === void 0 && (z.__webglTexture = e.createTexture()), z.__version = g.version, a.memory.textures++), ne) {
      C.__webglFramebuffer = [];
      for (let I = 0; I < 6; I++) if (g.mipmaps && g.mipmaps.length > 0) {
        C.__webglFramebuffer[I] = [];
        for (let ie = 0; ie < g.mipmaps.length; ie++) C.__webglFramebuffer[I][ie] = e.createFramebuffer();
      } else C.__webglFramebuffer[I] = e.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        C.__webglFramebuffer = [];
        for (let I = 0; I < g.mipmaps.length; I++) C.__webglFramebuffer[I] = e.createFramebuffer();
      } else C.__webglFramebuffer = e.createFramebuffer();
      if (oe) for (let I = 0, ie = Z.length; I < ie; I++) {
        const pe = n.get(Z[I]);
        pe.__webglTexture === void 0 && (pe.__webglTexture = e.createTexture(), a.memory.textures++);
      }
      if (x.samples > 0 && D(x) === !1) {
        C.__webglMultisampledFramebuffer = e.createFramebuffer(), C.__webglColorRenderbuffer = [], i.bindFramebuffer(e.FRAMEBUFFER, C.__webglMultisampledFramebuffer);
        for (let I = 0; I < Z.length; I++) {
          const ie = Z[I];
          C.__webglColorRenderbuffer[I] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, C.__webglColorRenderbuffer[I]);
          const pe = s.convert(ie.format, ie.colorSpace), _e = s.convert(ie.type), $ = A(ie.internalFormat, pe, _e, ie.normalized, ie.colorSpace, x.isXRRenderTarget === !0), xe = ct(x);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, xe, $, x.width, x.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + I, e.RENDERBUFFER, C.__webglColorRenderbuffer[I]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), x.depthBuffer && (C.__webglDepthRenderbuffer = e.createRenderbuffer(), Xe(C.__webglDepthRenderbuffer, x, !0)), i.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (ne) {
      i.bindTexture(e.TEXTURE_CUBE_MAP, z.__webglTexture), Y(e.TEXTURE_CUBE_MAP, g);
      for (let I = 0; I < 6; I++) if (g.mipmaps && g.mipmaps.length > 0) for (let ie = 0; ie < g.mipmaps.length; ie++) Pe(C.__webglFramebuffer[I][ie], x, g, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + I, ie);
      else Pe(C.__webglFramebuffer[I], x, g, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + I, 0);
      d(g) && R(e.TEXTURE_CUBE_MAP), i.unbindTexture();
    } else if (oe) {
      for (let I = 0, ie = Z.length; I < ie; I++) {
        const pe = Z[I], _e = n.get(pe);
        let $ = e.TEXTURE_2D;
        (x.isWebGL3DRenderTarget || x.isWebGLArrayRenderTarget) && ($ = x.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture($, _e.__webglTexture), Y($, pe), Pe(C.__webglFramebuffer, x, pe, e.COLOR_ATTACHMENT0 + I, $, 0), d(pe) && R($);
      }
      i.unbindTexture();
    } else {
      let I = e.TEXTURE_2D;
      if ((x.isWebGL3DRenderTarget || x.isWebGLArrayRenderTarget) && (I = x.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture(I, z.__webglTexture), Y(I, g), g.mipmaps && g.mipmaps.length > 0) for (let ie = 0; ie < g.mipmaps.length; ie++) Pe(C.__webglFramebuffer[ie], x, g, e.COLOR_ATTACHMENT0, I, ie);
      else Pe(C.__webglFramebuffer, x, g, e.COLOR_ATTACHMENT0, I, 0);
      d(g) && R(I), i.unbindTexture();
    }
    x.depthBuffer && je(x);
  }
  function Dt(x) {
    const g = x.textures;
    for (let C = 0, z = g.length; C < z; C++) {
      const Z = g[C];
      if (d(Z)) {
        const ne = T(x), oe = n.get(Z).__webglTexture;
        i.bindTexture(ne, oe), R(ne), i.unbindTexture();
      }
    }
  }
  const $e = [], gt = [];
  function ft(x) {
    if (x.samples > 0) {
      if (D(x) === !1) {
        const g = x.textures, C = x.width, z = x.height;
        let Z = e.COLOR_BUFFER_BIT;
        const ne = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, oe = n.get(x), I = g.length > 1;
        if (I) for (let pe = 0; pe < g.length; pe++)
          i.bindFramebuffer(e.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + pe, e.RENDERBUFFER, null), i.bindFramebuffer(e.FRAMEBUFFER, oe.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + pe, e.TEXTURE_2D, null, 0);
        i.bindFramebuffer(e.READ_FRAMEBUFFER, oe.__webglMultisampledFramebuffer);
        const ie = x.texture.mipmaps;
        ie && ie.length > 0 ? i.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglFramebuffer[0]) : i.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglFramebuffer);
        for (let pe = 0; pe < g.length; pe++) {
          if (x.resolveDepthBuffer && (x.depthBuffer && (Z |= e.DEPTH_BUFFER_BIT), x.stencilBuffer && x.resolveStencilBuffer && (Z |= e.STENCIL_BUFFER_BIT)), I) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, oe.__webglColorRenderbuffer[pe]);
            const _e = n.get(g[pe]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, _e, 0);
          }
          e.blitFramebuffer(0, 0, C, z, 0, 0, C, z, Z, e.NEAREST), c === !0 && ($e.length = 0, gt.length = 0, $e.push(e.COLOR_ATTACHMENT0 + pe), x.depthBuffer && x.resolveDepthBuffer === !1 && ($e.push(ne), gt.push(ne), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, gt)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, $e));
        }
        if (i.bindFramebuffer(e.READ_FRAMEBUFFER, null), i.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), I) for (let pe = 0; pe < g.length; pe++) {
          i.bindFramebuffer(e.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + pe, e.RENDERBUFFER, oe.__webglColorRenderbuffer[pe]);
          const _e = n.get(g[pe]).__webglTexture;
          i.bindFramebuffer(e.FRAMEBUFFER, oe.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + pe, e.TEXTURE_2D, _e, 0);
        }
        i.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglMultisampledFramebuffer);
      } else if (x.depthBuffer && x.resolveDepthBuffer === !1 && c) {
        const g = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function ct(x) {
    return Math.min(r.maxSamples, x.samples);
  }
  function D(x) {
    const g = n.get(x);
    return x.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function It(x) {
    const g = a.render.frame;
    h.get(x) !== g && (h.set(x, g), x.update());
  }
  function qe(x, g) {
    const C = x.colorSpace, z = x.format, Z = x.type;
    return x.isCompressedTexture === !0 || x.isVideoTexture === !0 || C !== "srgb-linear" && C !== "" && (Be.getTransfer(C) === "srgb" ? (z !== 1023 || Z !== 1009) && ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Ce("WebGLTextures: Unsupported texture color space:", C)), g;
  }
  function et(x) {
    return typeof HTMLImageElement < "u" && x instanceof HTMLImageElement ? (l.width = x.naturalWidth || x.width, l.height = x.naturalHeight || x.height) : typeof VideoFrame < "u" && x instanceof VideoFrame ? (l.width = x.displayWidth, l.height = x.displayHeight) : (l.width = x.width, l.height = x.height), l;
  }
  this.allocateTextureUnit = q, this.resetTextureUnits = W, this.getTextureUnits = H, this.setTextureUnits = B, this.setTexture2D = J, this.setTexture2DArray = ee, this.setTexture3D = te, this.setTextureCube = he, this.rebindTextures = mt, this.setupRenderTarget = Tt, this.updateRenderTargetMipmap = Dt, this.updateMultisampleRenderTarget = ft, this.setupDepthRenderbuffer = je, this.setupFrameBufferTexture = Pe, this.useMultisampledRTT = D, this.isReversedDepthBuffer = function() {
    return i.buffers.depth.getReversed();
  };
}
function id(e, t) {
  function i(n, r = "") {
    let s;
    const a = Be.getTransfer(r);
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
var nd = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, rd = `
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

}`, sd = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const i = new ao(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, i = new Vt({
        vertexShader: nd,
        fragmentShader: rd,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Ht(new En(20, 20), i);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, ad = class extends Di {
  constructor(e, t) {
    super();
    const i = this;
    let n = null, r = 1, s = null, a = "local-floor", o = 1, c = null, l = null, h = null, f = null, u = null, m = null;
    const M = typeof XRWebGLBinding < "u", S = new sd(), p = {}, d = t.getContextAttributes();
    let R = null, T = null;
    const A = [], y = [], b = new Ie();
    let P = null;
    const v = new Gt();
    v.viewport = new st();
    const E = new Gt();
    E.viewport = new st();
    const X = [v, E], w = new kc();
    let G = null, W = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let re = A[Y];
      return re === void 0 && (re = new br(), A[Y] = re), re.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let re = A[Y];
      return re === void 0 && (re = new br(), A[Y] = re), re.getGripSpace();
    }, this.getHand = function(Y) {
      let re = A[Y];
      return re === void 0 && (re = new br(), A[Y] = re), re.getHandSpace();
    };
    function H(Y) {
      const re = y.indexOf(Y.inputSource);
      if (re === -1) return;
      const de = A[re];
      de !== void 0 && (de.update(Y.inputSource, Y.frame, c || s), de.dispatchEvent({
        type: Y.type,
        data: Y.inputSource
      }));
    }
    function B() {
      n.removeEventListener("select", H), n.removeEventListener("selectstart", H), n.removeEventListener("selectend", H), n.removeEventListener("squeeze", H), n.removeEventListener("squeezestart", H), n.removeEventListener("squeezeend", H), n.removeEventListener("end", B), n.removeEventListener("inputsourceschange", q);
      for (let Y = 0; Y < A.length; Y++) {
        const re = y[Y];
        re !== null && (y[Y] = null, A[Y].disconnect(re));
      }
      G = null, W = null, S.reset();
      for (const Y in p) delete p[Y];
      e.setRenderTarget(R), u = null, f = null, h = null, n = null, T = null, Ye.stop(), i.isPresenting = !1, e.setPixelRatio(P), e.setSize(b.width, b.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      r = Y, i.isPresenting === !0 && ye("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      a = Y, i.isPresenting === !0 && ye("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || s;
    }, this.setReferenceSpace = function(Y) {
      c = Y;
    }, this.getBaseLayer = function() {
      return f !== null ? f : u;
    }, this.getBinding = function() {
      return h === null && M && (h = new XRWebGLBinding(n, t)), h;
    }, this.getFrame = function() {
      return m;
    }, this.getSession = function() {
      return n;
    }, this.setSession = async function(Y) {
      if (n = Y, n !== null) {
        if (R = e.getRenderTarget(), n.addEventListener("select", H), n.addEventListener("selectstart", H), n.addEventListener("selectend", H), n.addEventListener("squeeze", H), n.addEventListener("squeezestart", H), n.addEventListener("squeezeend", H), n.addEventListener("end", B), n.addEventListener("inputsourceschange", q), d.xrCompatible !== !0 && await t.makeXRCompatible(), P = e.getPixelRatio(), e.getSize(b), M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let re = null, de = null, ue = null;
          d.depth && (ue = d.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, re = d.stencil ? Xa : Tn, de = d.stencil ? Wa : Pi);
          const Te = {
            colorFormat: t.RGBA8,
            depthFormat: ue,
            scaleFactor: r
          };
          h = this.getBinding(), f = h.createProjectionLayer(Te), n.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), T = new Zt(f.textureWidth, f.textureHeight, {
            format: yn,
            type: Mi,
            depthTexture: new sn(f.textureWidth, f.textureHeight, de, void 0, void 0, void 0, void 0, void 0, void 0, re),
            stencilBuffer: d.stencil,
            colorSpace: e.outputColorSpace,
            samples: d.antialias ? 4 : 0,
            resolveDepthBuffer: f.ignoreDepthValues === !1,
            resolveStencilBuffer: f.ignoreDepthValues === !1
          });
        } else {
          const re = {
            antialias: d.antialias,
            alpha: !0,
            depth: d.depth,
            stencil: d.stencil,
            framebufferScaleFactor: r
          };
          u = new XRWebGLLayer(n, t, re), n.updateRenderState({ baseLayer: u }), e.setPixelRatio(1), e.setSize(u.framebufferWidth, u.framebufferHeight, !1), T = new Zt(u.framebufferWidth, u.framebufferHeight, {
            format: yn,
            type: Mi,
            colorSpace: e.outputColorSpace,
            stencilBuffer: d.stencil,
            resolveDepthBuffer: u.ignoreDepthValues === !1,
            resolveStencilBuffer: u.ignoreDepthValues === !1
          });
        }
        T.isXRRenderTarget = !0, this.setFoveation(o), c = null, s = await n.requestReferenceSpace(a), Ye.setContext(n), Ye.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (n !== null) return n.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return S.getDepthTexture();
    };
    function q(Y) {
      for (let re = 0; re < Y.removed.length; re++) {
        const de = Y.removed[re], ue = y.indexOf(de);
        ue >= 0 && (y[ue] = null, A[ue].disconnect(de));
      }
      for (let re = 0; re < Y.added.length; re++) {
        const de = Y.added[re];
        let ue = y.indexOf(de);
        if (ue === -1) {
          for (let we = 0; we < A.length; we++) if (we >= y.length) {
            y.push(de), ue = we;
            break;
          } else if (y[we] === null) {
            y[we] = de, ue = we;
            break;
          }
          if (ue === -1) break;
        }
        const Te = A[ue];
        Te && Te.connect(de);
      }
    }
    const N = new O(), J = new O();
    function ee(Y, re, de) {
      N.setFromMatrixPosition(re.matrixWorld), J.setFromMatrixPosition(de.matrixWorld);
      const ue = N.distanceTo(J), Te = re.projectionMatrix.elements, we = de.projectionMatrix.elements, Pe = Te[14] / (Te[10] - 1), Xe = Te[14] / (Te[10] + 1), Oe = (Te[9] + 1) / Te[5], je = (Te[9] - 1) / Te[5], mt = (Te[8] - 1) / Te[0], Tt = (we[8] + 1) / we[0], Dt = Pe * mt, $e = Pe * Tt, gt = ue / (-mt + Tt), ft = gt * -mt;
      if (re.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(ft), Y.translateZ(gt), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), Te[10] === -1)
        Y.projectionMatrix.copy(re.projectionMatrix), Y.projectionMatrixInverse.copy(re.projectionMatrixInverse);
      else {
        const ct = Pe + gt, D = Xe + gt, It = Dt - ft, qe = $e + (ue - ft), et = Oe * Xe / D * ct, x = je * Xe / D * ct;
        Y.projectionMatrix.makePerspective(It, qe, et, x, ct, D), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function te(Y, re) {
      re === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(re.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (n === null) return;
      let re = Y.near, de = Y.far;
      S.texture !== null && (S.depthNear > 0 && (re = S.depthNear), S.depthFar > 0 && (de = S.depthFar)), w.near = E.near = v.near = re, w.far = E.far = v.far = de, (G !== w.near || W !== w.far) && (n.updateRenderState({
        depthNear: w.near,
        depthFar: w.far
      }), G = w.near, W = w.far), w.layers.mask = Y.layers.mask | 6, v.layers.mask = w.layers.mask & -5, E.layers.mask = w.layers.mask & -3;
      const ue = Y.parent, Te = w.cameras;
      te(w, ue);
      for (let we = 0; we < Te.length; we++) te(Te[we], ue);
      Te.length === 2 ? ee(w, v, E) : w.projectionMatrix.copy(v.projectionMatrix), he(Y, w, ue);
    };
    function he(Y, re, de) {
      de === null ? Y.matrix.copy(re.matrixWorld) : (Y.matrix.copy(de.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(re.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(re.projectionMatrix), Y.projectionMatrixInverse.copy(re.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = bn * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return w;
    }, this.getFoveation = function() {
      if (!(f === null && u === null))
        return o;
    }, this.setFoveation = function(Y) {
      o = Y, f !== null && (f.fixedFoveation = Y), u !== null && u.fixedFoveation !== void 0 && (u.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return S.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return S.getMesh(w);
    }, this.getCameraTexture = function(Y) {
      return p[Y];
    };
    let Se = null;
    function We(Y, re) {
      if (l = re.getViewerPose(c || s), m = re, l !== null) {
        const de = l.views;
        u !== null && (e.setRenderTargetFramebuffer(T, u.framebuffer), e.setRenderTarget(T));
        let ue = !1;
        de.length !== w.cameras.length && (w.cameras.length = 0, ue = !0);
        for (let we = 0; we < de.length; we++) {
          const Pe = de[we];
          let Xe = null;
          if (u !== null) Xe = u.getViewport(Pe);
          else {
            const je = h.getViewSubImage(f, Pe);
            Xe = je.viewport, we === 0 && (e.setRenderTargetTextures(T, je.colorTexture, je.depthStencilTexture), e.setRenderTarget(T));
          }
          let Oe = X[we];
          Oe === void 0 && (Oe = new Gt(), Oe.layers.enable(we), Oe.viewport = new st(), X[we] = Oe), Oe.matrix.fromArray(Pe.transform.matrix), Oe.matrix.decompose(Oe.position, Oe.quaternion, Oe.scale), Oe.projectionMatrix.fromArray(Pe.projectionMatrix), Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(), Oe.viewport.set(Xe.x, Xe.y, Xe.width, Xe.height), we === 0 && (w.matrix.copy(Oe.matrix), w.matrix.decompose(w.position, w.quaternion, w.scale)), ue === !0 && w.cameras.push(Oe);
        }
        const Te = n.enabledFeatures;
        if (Te && Te.includes("depth-sensing") && n.depthUsage == "gpu-optimized" && M) {
          h = i.getBinding();
          const we = h.getDepthInformation(de[0]);
          we && we.isValid && we.texture && S.init(we, n.renderState);
        }
        if (Te && Te.includes("camera-access") && M) {
          e.state.unbindTexture(), h = i.getBinding();
          for (let we = 0; we < de.length; we++) {
            const Pe = de[we].camera;
            if (Pe) {
              let Xe = p[Pe];
              Xe || (Xe = new ao(), p[Pe] = Xe);
              const Oe = h.getCameraImage(Pe);
              Xe.sourceTexture = Oe;
            }
          }
        }
      }
      for (let de = 0; de < A.length; de++) {
        const ue = y[de], Te = A[de];
        ue !== null && Te !== void 0 && Te.update(ue, re, c || s);
      }
      Se && Se(Y, re), re.detectedPlanes && i.dispatchEvent({
        type: "planesdetected",
        data: re
      }), m = null;
    }
    const Ye = new po();
    Ye.setAnimationLoop(We), this.setAnimationLoop = function(Y) {
      Se = Y;
    }, this.dispose = function() {
    };
  }
}, od = /* @__PURE__ */ new ot(), xo = /* @__PURE__ */ new De();
xo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function ld(e, t) {
  function i(p, d) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), d.value.copy(p.matrix);
  }
  function n(p, d) {
    d.color.getRGB(p.fogColor.value, co(e)), d.isFog ? (p.fogNear.value = d.near, p.fogFar.value = d.far) : d.isFogExp2 && (p.fogDensity.value = d.density);
  }
  function r(p, d, R, T, A) {
    d.isNodeMaterial ? d.uniformsNeedUpdate = !1 : d.isMeshBasicMaterial ? s(p, d) : d.isMeshLambertMaterial ? (s(p, d), d.envMap && (p.envMapIntensity.value = d.envMapIntensity)) : d.isMeshToonMaterial ? (s(p, d), f(p, d)) : d.isMeshPhongMaterial ? (s(p, d), h(p, d), d.envMap && (p.envMapIntensity.value = d.envMapIntensity)) : d.isMeshStandardMaterial ? (s(p, d), u(p, d), d.isMeshPhysicalMaterial && m(p, d, A)) : d.isMeshMatcapMaterial ? (s(p, d), M(p, d)) : d.isMeshDepthMaterial ? s(p, d) : d.isMeshDistanceMaterial ? (s(p, d), S(p, d)) : d.isMeshNormalMaterial ? s(p, d) : d.isLineBasicMaterial ? (a(p, d), d.isLineDashedMaterial && o(p, d)) : d.isPointsMaterial ? c(p, d, R, T) : d.isSpriteMaterial ? l(p, d) : d.isShadowMaterial ? (p.color.value.copy(d.color), p.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function s(p, d) {
    p.opacity.value = d.opacity, d.color && p.diffuse.value.copy(d.color), d.emissive && p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (p.map.value = d.map, i(d.map, p.mapTransform)), d.alphaMap && (p.alphaMap.value = d.alphaMap, i(d.alphaMap, p.alphaMapTransform)), d.bumpMap && (p.bumpMap.value = d.bumpMap, i(d.bumpMap, p.bumpMapTransform), p.bumpScale.value = d.bumpScale, d.side === 1 && (p.bumpScale.value *= -1)), d.normalMap && (p.normalMap.value = d.normalMap, i(d.normalMap, p.normalMapTransform), p.normalScale.value.copy(d.normalScale), d.side === 1 && p.normalScale.value.negate()), d.displacementMap && (p.displacementMap.value = d.displacementMap, i(d.displacementMap, p.displacementMapTransform), p.displacementScale.value = d.displacementScale, p.displacementBias.value = d.displacementBias), d.emissiveMap && (p.emissiveMap.value = d.emissiveMap, i(d.emissiveMap, p.emissiveMapTransform)), d.specularMap && (p.specularMap.value = d.specularMap, i(d.specularMap, p.specularMapTransform)), d.alphaTest > 0 && (p.alphaTest.value = d.alphaTest);
    const R = t.get(d), T = R.envMap, A = R.envMapRotation;
    T && (p.envMap.value = T, p.envMapRotation.value.setFromMatrix4(od.makeRotationFromEuler(A)).transpose(), T.isCubeTexture && T.isRenderTargetTexture === !1 && p.envMapRotation.value.premultiply(xo), p.reflectivity.value = d.reflectivity, p.ior.value = d.ior, p.refractionRatio.value = d.refractionRatio), d.lightMap && (p.lightMap.value = d.lightMap, p.lightMapIntensity.value = d.lightMapIntensity, i(d.lightMap, p.lightMapTransform)), d.aoMap && (p.aoMap.value = d.aoMap, p.aoMapIntensity.value = d.aoMapIntensity, i(d.aoMap, p.aoMapTransform));
  }
  function a(p, d) {
    p.diffuse.value.copy(d.color), p.opacity.value = d.opacity, d.map && (p.map.value = d.map, i(d.map, p.mapTransform));
  }
  function o(p, d) {
    p.dashSize.value = d.dashSize, p.totalSize.value = d.dashSize + d.gapSize, p.scale.value = d.scale;
  }
  function c(p, d, R, T) {
    p.diffuse.value.copy(d.color), p.opacity.value = d.opacity, p.size.value = d.size * R, p.scale.value = T * 0.5, d.map && (p.map.value = d.map, i(d.map, p.uvTransform)), d.alphaMap && (p.alphaMap.value = d.alphaMap, i(d.alphaMap, p.alphaMapTransform)), d.alphaTest > 0 && (p.alphaTest.value = d.alphaTest);
  }
  function l(p, d) {
    p.diffuse.value.copy(d.color), p.opacity.value = d.opacity, p.rotation.value = d.rotation, d.map && (p.map.value = d.map, i(d.map, p.mapTransform)), d.alphaMap && (p.alphaMap.value = d.alphaMap, i(d.alphaMap, p.alphaMapTransform)), d.alphaTest > 0 && (p.alphaTest.value = d.alphaTest);
  }
  function h(p, d) {
    p.specular.value.copy(d.specular), p.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function f(p, d) {
    d.gradientMap && (p.gradientMap.value = d.gradientMap);
  }
  function u(p, d) {
    p.metalness.value = d.metalness, d.metalnessMap && (p.metalnessMap.value = d.metalnessMap, i(d.metalnessMap, p.metalnessMapTransform)), p.roughness.value = d.roughness, d.roughnessMap && (p.roughnessMap.value = d.roughnessMap, i(d.roughnessMap, p.roughnessMapTransform)), d.envMap && (p.envMapIntensity.value = d.envMapIntensity);
  }
  function m(p, d, R) {
    p.ior.value = d.ior, d.sheen > 0 && (p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), p.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (p.sheenColorMap.value = d.sheenColorMap, i(d.sheenColorMap, p.sheenColorMapTransform)), d.sheenRoughnessMap && (p.sheenRoughnessMap.value = d.sheenRoughnessMap, i(d.sheenRoughnessMap, p.sheenRoughnessMapTransform))), d.clearcoat > 0 && (p.clearcoat.value = d.clearcoat, p.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (p.clearcoatMap.value = d.clearcoatMap, i(d.clearcoatMap, p.clearcoatMapTransform)), d.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, i(d.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (p.clearcoatNormalMap.value = d.clearcoatNormalMap, i(d.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && p.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (p.dispersion.value = d.dispersion), d.iridescence > 0 && (p.iridescence.value = d.iridescence, p.iridescenceIOR.value = d.iridescenceIOR, p.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (p.iridescenceMap.value = d.iridescenceMap, i(d.iridescenceMap, p.iridescenceMapTransform)), d.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = d.iridescenceThicknessMap, i(d.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), d.transmission > 0 && (p.transmission.value = d.transmission, p.transmissionSamplerMap.value = R.texture, p.transmissionSamplerSize.value.set(R.width, R.height), d.transmissionMap && (p.transmissionMap.value = d.transmissionMap, i(d.transmissionMap, p.transmissionMapTransform)), p.thickness.value = d.thickness, d.thicknessMap && (p.thicknessMap.value = d.thicknessMap, i(d.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = d.attenuationDistance, p.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (p.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (p.anisotropyMap.value = d.anisotropyMap, i(d.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = d.specularIntensity, p.specularColor.value.copy(d.specularColor), d.specularColorMap && (p.specularColorMap.value = d.specularColorMap, i(d.specularColorMap, p.specularColorMapTransform)), d.specularIntensityMap && (p.specularIntensityMap.value = d.specularIntensityMap, i(d.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function M(p, d) {
    d.matcap && (p.matcap.value = d.matcap);
  }
  function S(p, d) {
    const R = t.get(d).light;
    p.referencePosition.value.setFromMatrixPosition(R.matrixWorld), p.nearDistance.value = R.shadow.camera.near, p.farDistance.value = R.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function cd(e, t, i, n) {
  let r = {}, s = {}, a = [];
  const o = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(A, y) {
    const b = y.program;
    n.uniformBlockBinding(A, b);
  }
  function l(A, y) {
    let b = r[A.id];
    b === void 0 && (p(A), b = h(A), r[A.id] = b, A.addEventListener("dispose", R));
    const P = y.program;
    n.updateUBOMapping(A, P);
    const v = t.render.frame;
    s[A.id] !== v && (u(A), s[A.id] = v);
  }
  function h(A) {
    const y = f();
    A.__bindingPointIndex = y;
    const b = e.createBuffer(), P = A.__size, v = A.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, b), e.bufferData(e.UNIFORM_BUFFER, P, v), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, y, b), b;
  }
  function f() {
    for (let A = 0; A < o; A++) if (a.indexOf(A) === -1)
      return a.push(A), A;
    return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(A) {
    const y = r[A.id], b = A.uniforms, P = A.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, y);
    for (let v = 0, E = b.length; v < E; v++) {
      const X = b[v];
      if (Array.isArray(X)) for (let w = 0, G = X.length; w < G; w++) m(X[w], v, w, P);
      else m(X, v, 0, P);
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function m(A, y, b, P) {
    if (S(A, y, b, P) === !0) {
      const v = A.__offset, E = A.value;
      if (Array.isArray(E)) {
        let X = 0;
        for (let w = 0; w < E.length; w++) {
          const G = E[w], W = d(G);
          M(G, A.__data, X), typeof G != "number" && typeof G != "boolean" && !G.isMatrix3 && !ArrayBuffer.isView(G) && (X += W.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else M(E, A.__data, 0);
      e.bufferSubData(e.UNIFORM_BUFFER, v, A.__data);
    }
  }
  function M(A, y, b) {
    typeof A == "number" || typeof A == "boolean" ? y[0] = A : A.isMatrix3 ? (y[0] = A.elements[0], y[1] = A.elements[1], y[2] = A.elements[2], y[3] = 0, y[4] = A.elements[3], y[5] = A.elements[4], y[6] = A.elements[5], y[7] = 0, y[8] = A.elements[6], y[9] = A.elements[7], y[10] = A.elements[8], y[11] = 0) : ArrayBuffer.isView(A) ? y.set(new A.constructor(A.buffer, A.byteOffset, y.length)) : A.toArray(y, b);
  }
  function S(A, y, b, P) {
    const v = A.value, E = y + "_" + b;
    if (P[E] === void 0)
      return typeof v == "number" || typeof v == "boolean" ? P[E] = v : ArrayBuffer.isView(v) ? P[E] = v.slice() : P[E] = v.clone(), !0;
    {
      const X = P[E];
      if (typeof v == "number" || typeof v == "boolean") {
        if (X !== v)
          return P[E] = v, !0;
      } else {
        if (ArrayBuffer.isView(v)) return !0;
        if (X.equals(v) === !1)
          return X.copy(v), !0;
      }
    }
    return !1;
  }
  function p(A) {
    const y = A.uniforms;
    let b = 0;
    const P = 16;
    for (let E = 0, X = y.length; E < X; E++) {
      const w = Array.isArray(y[E]) ? y[E] : [y[E]];
      for (let G = 0, W = w.length; G < W; G++) {
        const H = w[G], B = Array.isArray(H.value) ? H.value : [H.value];
        for (let q = 0, N = B.length; q < N; q++) {
          const J = B[q], ee = d(J), te = b % P, he = te % ee.boundary, Se = te + he;
          b += he, Se !== 0 && P - Se < ee.storage && (b += P - Se), H.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), H.__offset = b, b += ee.storage;
        }
      }
    }
    const v = b % P;
    return v > 0 && (b += P - v), A.__size = b, A.__cache = {}, this;
  }
  function d(A) {
    const y = {
      boundary: 0,
      storage: 0
    };
    return typeof A == "number" || typeof A == "boolean" ? (y.boundary = 4, y.storage = 4) : A.isVector2 ? (y.boundary = 8, y.storage = 8) : A.isVector3 || A.isColor ? (y.boundary = 16, y.storage = 12) : A.isVector4 ? (y.boundary = 16, y.storage = 16) : A.isMatrix3 ? (y.boundary = 48, y.storage = 48) : A.isMatrix4 ? (y.boundary = 64, y.storage = 64) : A.isTexture ? ye("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(A) ? (y.boundary = 16, y.storage = A.byteLength) : ye("WebGLRenderer: Unsupported uniform value type.", A), y;
  }
  function R(A) {
    const y = A.target;
    y.removeEventListener("dispose", R);
    const b = a.indexOf(y.__bindingPointIndex);
    a.splice(b, 1), e.deleteBuffer(r[y.id]), delete r[y.id], delete s[y.id];
  }
  function T() {
    for (const A in r) e.deleteBuffer(r[A]);
    a = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: T
  };
}
var hd = new Uint16Array([
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
]), Yt = null;
function ud() {
  return Yt === null && (Yt = new uc(hd, 16, 16, lr, Li), Yt.name = "DFG_LUT", Yt.minFilter = yt, Yt.magFilter = yt, Yt.wrapS = ai, Yt.wrapT = ai, Yt.generateMipmaps = !1, Yt.needsUpdate = !0), Yt;
}
var dd = class {
  constructor(e = {}) {
    const { canvas: t = bl(), context: i = null, depth: n = !0, stencil: r = !1, alpha: s = !1, antialias: a = !1, premultipliedAlpha: o = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: h = !1, reversedDepthBuffer: f = !1, outputBufferType: u = Mi } = e;
    this.isWebGLRenderer = !0;
    let m;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = i.getContextAttributes().alpha;
    } else m = s;
    const M = u, S = /* @__PURE__ */ new Set([
      Ka,
      Ya,
      qa
    ]), p = /* @__PURE__ */ new Set([
      Mi,
      Pi,
      za,
      Wa,
      Ga,
      Ha
    ]), d = new Uint32Array(4), R = new Int32Array(4), T = new O();
    let A = null, y = null;
    const b = [], P = [];
    let v = null;
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const E = this;
    let X = !1, w = null, G = null, W = null, H = null;
    this._outputColorSpace = Pt;
    let B = 0, q = 0, N = null, J = -1, ee = null;
    const te = new st(), he = new st();
    let Se = null;
    const We = new ke(0);
    let Ye = 0, Y = t.width, re = t.height, de = 1, ue = null, Te = null;
    const we = new st(0, 0, Y, re), Pe = new st(0, 0, Y, re);
    let Xe = !1;
    const Oe = new hs();
    let je = !1, mt = !1;
    const Tt = new ot(), Dt = new O(), $e = new st(), gt = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ft = !1;
    function ct() {
      return N === null ? de : 1;
    }
    let D = i;
    function It(_, U) {
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
        failIfMajorPerformanceCaveat: h
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r185"), t.addEventListener("webglcontextlost", be, !1), t.addEventListener("webglcontextrestored", St, !1), t.addEventListener("webglcontextcreationerror", Je, !1), D === null) {
        const U = "webgl2";
        if (D = It(U, _), D === null) throw It(U) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (_) {
      throw Ce("WebGLRenderer: " + _.message), _;
    }
    let qe, et, x, g, C, z, Z, ne, oe, I, ie, pe, _e, $, xe, Ae, Le, ze, L, K, Q, fe, ve;
    function j() {
      qe = new uh(D), qe.init(), Q = new id(D, qe), et = new nh(D, qe, e, Q), x = new ed(D, qe), et.reversedDepthBuffer && f && x.buffers.depth.setReversed(!0), G = D.createFramebuffer(), W = D.createFramebuffer(), H = D.createFramebuffer(), g = new ph(D), C = new ku(), z = new td(D, qe, x, C, et, Q, g), Z = new hh(E), ne = new jc(D), fe = new th(D, ne), oe = new dh(D, ne, g, fe), I = new gh(D, oe, ne, fe, g), ze = new mh(D, et, z), xe = new rh(C), ie = new Bu(E, Z, qe, et, fe, xe), pe = new ld(E, C), _e = new Gu(), $ = new Ku(qe), Le = new eh(E, Z, x, I, m, o), Ae = new $u(E, I, et), ve = new cd(D, g, et, x), L = new ih(D, qe, g), K = new fh(D, qe, g), g.programs = ie.programs, E.capabilities = et, E.extensions = qe, E.properties = C, E.renderLists = _e, E.shadowMap = Ae, E.state = x, E.info = g;
    }
    j(), M !== 1009 && (v = new _h(M, t.width, t.height, a, n, r));
    const le = new ad(E, D);
    this.xr = le, this.getContext = function() {
      return D;
    }, this.getContextAttributes = function() {
      return D.getContextAttributes();
    }, this.forceContextLoss = function() {
      const _ = qe.get("WEBGL_lose_context");
      _ && _.loseContext();
    }, this.forceContextRestore = function() {
      const _ = qe.get("WEBGL_lose_context");
      _ && _.restoreContext();
    }, this.getPixelRatio = function() {
      return de;
    }, this.setPixelRatio = function(_) {
      _ !== void 0 && (de = _, this.setSize(Y, re, !1));
    }, this.getSize = function(_) {
      return _.set(Y, re);
    }, this.setSize = function(_, U, k = !0) {
      if (le.isPresenting) {
        ye("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Y = _, re = U, t.width = Math.floor(_ * de), t.height = Math.floor(U * de), k === !0 && (t.style.width = _ + "px", t.style.height = U + "px"), v !== null && v.setSize(t.width, t.height), this.setViewport(0, 0, _, U);
    }, this.getDrawingBufferSize = function(_) {
      return _.set(Y * de, re * de).floor();
    }, this.setDrawingBufferSize = function(_, U, k) {
      Y = _, re = U, de = k, t.width = Math.floor(_ * k), t.height = Math.floor(U * k), this.setViewport(0, 0, _, U);
    }, this.setEffects = function(_) {
      if (M === 1009) {
        Ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (_) {
        for (let U = 0; U < _.length; U++) if (_[U].isOutputPass === !0) {
          ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      v.setEffects(_ || []);
    }, this.getCurrentViewport = function(_) {
      return _.copy(te);
    }, this.getViewport = function(_) {
      return _.copy(we);
    }, this.setViewport = function(_, U, k, F) {
      _.isVector4 ? we.set(_.x, _.y, _.z, _.w) : we.set(_, U, k, F), x.viewport(te.copy(we).multiplyScalar(de).round());
    }, this.getScissor = function(_) {
      return _.copy(Pe);
    }, this.setScissor = function(_, U, k, F) {
      _.isVector4 ? Pe.set(_.x, _.y, _.z, _.w) : Pe.set(_, U, k, F), x.scissor(he.copy(Pe).multiplyScalar(de).round());
    }, this.getScissorTest = function() {
      return Xe;
    }, this.setScissorTest = function(_) {
      x.setScissorTest(Xe = _);
    }, this.setOpaqueSort = function(_) {
      ue = _;
    }, this.setTransparentSort = function(_) {
      Te = _;
    }, this.getClearColor = function(_) {
      return _.copy(Le.getClearColor());
    }, this.setClearColor = function() {
      Le.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Le.getClearAlpha();
    }, this.setClearAlpha = function() {
      Le.setClearAlpha(...arguments);
    }, this.clear = function(_ = !0, U = !0, k = !0) {
      let F = 0;
      if (_) {
        let V = !1;
        if (N !== null) {
          const se = N.texture.format;
          V = S.has(se);
        }
        if (V) {
          const se = N.texture.type, ce = p.has(se), me = Le.getClearColor(), ge = Le.getClearAlpha(), Re = me.r, Ne = me.g, Ve = me.b;
          ce ? (d[0] = Re, d[1] = Ne, d[2] = Ve, d[3] = ge, D.clearBufferuiv(D.COLOR, 0, d)) : (R[0] = Re, R[1] = Ne, R[2] = Ve, R[3] = ge, D.clearBufferiv(D.COLOR, 0, R));
        } else F |= D.COLOR_BUFFER_BIT;
      }
      U && (F |= D.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), k && (F |= D.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && D.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(_) {
      _.setRenderer(this), w = _;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", be, !1), t.removeEventListener("webglcontextrestored", St, !1), t.removeEventListener("webglcontextcreationerror", Je, !1), Le.dispose(), _e.dispose(), $.dispose(), C.dispose(), Z.dispose(), I.dispose(), fe.dispose(), ve.dispose(), ie.dispose(), le.dispose(), le.removeEventListener("sessionstart", ms), le.removeEventListener("sessionend", gs), Si.stop();
    };
    function be(_) {
      _.preventDefault(), Rs("WebGLRenderer: Context Lost."), X = !0;
    }
    function St() {
      Rs("WebGLRenderer: Context Restored."), X = !1;
      const _ = g.autoReset, U = Ae.enabled, k = Ae.autoUpdate, F = Ae.needsUpdate, V = Ae.type;
      j(), g.autoReset = _, Ae.enabled = U, Ae.autoUpdate = k, Ae.needsUpdate = F, Ae.type = V;
    }
    function Je(_) {
      Ce("WebGLRenderer: A WebGL context could not be created. Reason: ", _.statusMessage);
    }
    function Wt(_) {
      const U = _.target;
      U.removeEventListener("dispose", Wt), jt(U);
    }
    function jt(_) {
      Eo(_), C.remove(_);
    }
    function Eo(_) {
      const U = C.get(_).programs;
      U !== void 0 && (U.forEach(function(k) {
        ie.releaseProgram(k);
      }), _.isShaderMaterial && ie.releaseShaderCache(_));
    }
    this.renderBufferDirect = function(_, U, k, F, V, se) {
      U === null && (U = gt);
      const ce = V.isMesh && V.matrixWorld.determinantAffine() < 0, me = bo(_, U, k, F, V);
      x.setMaterial(F, ce);
      let ge = k.index, Re = 1;
      if (F.wireframe === !0) {
        if (ge = oe.getWireframeAttribute(k), ge === void 0) return;
        Re = 2;
      }
      const Ne = k.drawRange, Ve = k.attributes.position;
      let Ee = Ne.start * Re, Qe = (Ne.start + Ne.count) * Re;
      se !== null && (Ee = Math.max(Ee, se.start * Re), Qe = Math.min(Qe, (se.start + se.count) * Re)), ge !== null ? (Ee = Math.max(Ee, 0), Qe = Math.min(Qe, ge.count)) : Ve != null && (Ee = Math.max(Ee, 0), Qe = Math.min(Qe, Ve.count));
      const tt = Qe - Ee;
      if (tt < 0 || tt === 1 / 0) return;
      fe.setup(V, F, me, k, ge);
      let it, Ge = L;
      if (ge !== null && (it = ne.get(ge), Ge = K, Ge.setIndex(it)), V.isMesh) F.wireframe === !0 ? (x.setLineWidth(F.wireframeLinewidth * ct()), Ge.setMode(D.LINES)) : Ge.setMode(D.TRIANGLES);
      else if (V.isLine) {
        let vt = F.linewidth;
        vt === void 0 && (vt = 1), x.setLineWidth(vt * ct()), V.isLineSegments ? Ge.setMode(D.LINES) : V.isLineLoop ? Ge.setMode(D.LINE_LOOP) : Ge.setMode(D.LINE_STRIP);
      } else V.isPoints ? Ge.setMode(D.POINTS) : V.isSprite && Ge.setMode(D.TRIANGLES);
      if (V.isBatchedMesh) if (qe.get("WEBGL_multi_draw"))
        Ge.renderMultiDraw(V._multiDrawStarts, V._multiDrawCounts, V._multiDrawCount);
      else {
        const vt = V._multiDrawStarts, Me = V._multiDrawCounts, Ot = V._multiDrawCount, He = ge ? ne.get(ge).bytesPerElement : 1, Ut = C.get(F).currentProgram.getUniforms();
        for (let Xt = 0; Xt < Ot; Xt++)
          Ut.setValue(D, "_gl_DrawID", Xt), Ge.render(vt[Xt] / He, Me[Xt]);
      }
      else if (V.isInstancedMesh) Ge.renderInstances(Ee, tt, V.count);
      else if (k.isInstancedBufferGeometry) {
        const vt = k._maxInstanceCount !== void 0 ? k._maxInstanceCount : 1 / 0, Me = Math.min(k.instanceCount, vt);
        Ge.renderInstances(Ee, tt, Me);
      } else Ge.render(Ee, tt);
    };
    function ps(_, U, k) {
      _.transparent === !0 && _.side === 2 && _.forceSinglePass === !1 ? (_.side = 1, _.needsUpdate = !0, Un(_, U, k), _.side = 0, _.needsUpdate = !0, Un(_, U, k), _.side = 2) : Un(_, U, k);
    }
    this.compile = function(_, U, k = null) {
      k === null && (k = _), y = $.get(k), y.init(U), P.push(y), k.traverseVisible(function(V) {
        V.isLight && V.layers.test(U.layers) && (y.pushLight(V), V.castShadow && y.pushShadow(V));
      }), _ !== k && _.traverseVisible(function(V) {
        V.isLight && V.layers.test(U.layers) && (y.pushLight(V), V.castShadow && y.pushShadow(V));
      }), y.setupLights();
      const F = /* @__PURE__ */ new Set();
      return _.traverse(function(V) {
        if (!(V.isMesh || V.isPoints || V.isLine || V.isSprite)) return;
        const se = V.material;
        if (se) if (Array.isArray(se)) for (let ce = 0; ce < se.length; ce++) {
          const me = se[ce];
          ps(me, k, V), F.add(me);
        }
        else
          ps(se, k, V), F.add(se);
      }), y = P.pop(), F;
    }, this.compileAsync = function(_, U, k = null) {
      const F = this.compile(_, U, k);
      return new Promise((V) => {
        function se() {
          if (F.forEach(function(ce) {
            C.get(ce).currentProgram.isReady() && F.delete(ce);
          }), F.size === 0) {
            V(_);
            return;
          }
          setTimeout(se, 10);
        }
        qe.get("KHR_parallel_shader_compile") !== null ? se() : setTimeout(se, 10);
      });
    };
    let vr = null;
    function yo(_) {
      vr && vr(_);
    }
    function ms() {
      Si.stop();
    }
    function gs() {
      Si.start();
    }
    const Si = new po();
    Si.setAnimationLoop(yo), typeof self < "u" && Si.setContext(self), this.setAnimationLoop = function(_) {
      vr = _, le.setAnimationLoop(_), _ === null ? Si.stop() : Si.start();
    }, le.addEventListener("sessionstart", ms), le.addEventListener("sessionend", gs), this.render = function(_, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (X === !0) return;
      w !== null && w.renderStart(_, U);
      const k = le.enabled === !0 && le.isPresenting === !0, F = v !== null && (N === null || k) && v.begin(E, N);
      if (_.matrixWorldAutoUpdate === !0 && _.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), le.enabled === !0 && le.isPresenting === !0 && (v === null || v.isCompositing() === !1) && (le.cameraAutoUpdate === !0 && le.updateCamera(U), U = le.getCamera()), _.isScene === !0 && _.onBeforeRender(E, _, U, N), y = $.get(_, P.length), y.init(U), y.state.textureUnits = z.getTextureUnits(), P.push(y), Tt.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), Oe.setFromProjectionMatrix(Tt, nn, U.reversedDepth), mt = this.localClippingEnabled, je = xe.init(this.clippingPlanes, mt), A = _e.get(_, b.length), A.init(), b.push(A), le.enabled === !0 && le.isPresenting === !0) {
        const se = E.xr.getDepthSensingMesh();
        se !== null && _r(se, U, -1 / 0, E.sortObjects);
      }
      _r(_, U, 0, E.sortObjects), A.finish(), E.sortObjects === !0 && A.sort(ue, Te, U.reversedDepth), ft = le.enabled === !1 || le.isPresenting === !1 || le.hasDepthSensing() === !1, ft && Le.addToRenderList(A, _), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), je === !0 && xe.beginShadows();
      const V = y.state.shadowsArray;
      if (Ae.render(V, _, U), je === !0 && xe.endShadows(), (F && v.hasRenderPass()) === !1) {
        const se = A.opaque, ce = A.transmissive;
        if (y.setupLights(), U.isArrayCamera) {
          const me = U.cameras;
          if (ce.length > 0) for (let ge = 0, Re = me.length; ge < Re; ge++) {
            const Ne = me[ge];
            _s(se, ce, _, Ne);
          }
          ft && Le.render(_);
          for (let ge = 0, Re = me.length; ge < Re; ge++) {
            const Ne = me[ge];
            vs(A, _, Ne, Ne.viewport);
          }
        } else
          ce.length > 0 && _s(se, ce, _, U), ft && Le.render(_), vs(A, _, U);
      }
      N !== null && q === 0 && (z.updateMultisampleRenderTarget(N), z.updateRenderTargetMipmap(N)), F && v.end(E), _.isScene === !0 && _.onAfterRender(E, _, U), fe.resetDefaultState(), J = -1, ee = null, P.pop(), P.length > 0 ? (y = P[P.length - 1], z.setTextureUnits(y.state.textureUnits), je === !0 && xe.setGlobalState(E.clippingPlanes, y.state.camera)) : y = null, b.pop(), b.length > 0 ? A = b[b.length - 1] : A = null, w !== null && w.renderEnd();
    };
    function _r(_, U, k, F) {
      if (_.visible === !1) return;
      if (_.layers.test(U.layers)) {
        if (_.isGroup) k = _.renderOrder;
        else if (_.isLOD)
          _.autoUpdate === !0 && _.update(U);
        else if (_.isLightProbeGrid) y.pushLightProbeGrid(_);
        else if (_.isLight)
          y.pushLight(_), _.castShadow && y.pushShadow(_);
        else if (_.isSprite) {
          if (!_.frustumCulled || Oe.intersectsSprite(_)) {
            F && $e.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Tt);
            const se = I.update(_), ce = _.material;
            ce.visible && A.push(_, se, ce, k, $e.z, null);
          }
        } else if ((_.isMesh || _.isLine || _.isPoints) && (!_.frustumCulled || Oe.intersectsObject(_))) {
          const se = I.update(_), ce = _.material;
          if (F && (_.boundingSphere !== void 0 ? (_.boundingSphere === null && _.computeBoundingSphere(), $e.copy(_.boundingSphere.center)) : (se.boundingSphere === null && se.computeBoundingSphere(), $e.copy(se.boundingSphere.center)), $e.applyMatrix4(_.matrixWorld).applyMatrix4(Tt)), Array.isArray(ce)) {
            const me = se.groups;
            for (let ge = 0, Re = me.length; ge < Re; ge++) {
              const Ne = me[ge], Ve = ce[Ne.materialIndex];
              Ve && Ve.visible && A.push(_, se, Ve, k, $e.z, Ne);
            }
          } else ce.visible && A.push(_, se, ce, k, $e.z, null);
        }
      }
      const V = _.children;
      for (let se = 0, ce = V.length; se < ce; se++) _r(V[se], U, k, F);
    }
    function vs(_, U, k, F) {
      const { opaque: V, transmissive: se, transparent: ce } = _;
      y.setupLightsView(k), je === !0 && xe.setGlobalState(E.clippingPlanes, k), F && x.viewport(te.copy(F)), V.length > 0 && In(V, U, k), se.length > 0 && In(se, U, k), ce.length > 0 && In(ce, U, k), x.buffers.depth.setTest(!0), x.buffers.depth.setMask(!0), x.buffers.color.setMask(!0), x.setPolygonOffset(!1);
    }
    function _s(_, U, k, F) {
      if ((k.isScene === !0 ? k.overrideMaterial : null) !== null) return;
      if (y.state.transmissionRenderTarget[F.id] === void 0) {
        const Ve = qe.has("EXT_color_buffer_half_float") || qe.has("EXT_color_buffer_float");
        y.state.transmissionRenderTarget[F.id] = new Zt(1, 1, {
          generateMipmaps: !0,
          type: Ve ? Li : Mi,
          minFilter: as,
          samples: Math.max(4, et.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: Be.workingColorSpace
        });
      }
      const V = y.state.transmissionRenderTarget[F.id], se = F.viewport || te;
      V.setSize(se.z * E.transmissionResolutionScale, se.w * E.transmissionResolutionScale);
      const ce = E.getRenderTarget(), me = E.getActiveCubeFace(), ge = E.getActiveMipmapLevel();
      E.setRenderTarget(V), E.getClearColor(We), Ye = E.getClearAlpha(), Ye < 1 && E.setClearColor(16777215, 0.5), E.clear(), ft && Le.render(k);
      const Re = E.toneMapping;
      E.toneMapping = 0;
      const Ne = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), y.setupLightsView(F), je === !0 && xe.setGlobalState(E.clippingPlanes, F), In(_, k, F), z.updateMultisampleRenderTarget(V), z.updateRenderTargetMipmap(V), qe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ve = !1;
        for (let Ee = 0, Qe = U.length; Ee < Qe; Ee++) {
          const { object: tt, geometry: it, material: Ge, group: vt } = U[Ee];
          if (Ge.side === 2 && tt.layers.test(F.layers)) {
            const Me = Ge.side;
            Ge.side = 1, Ge.needsUpdate = !0, Ms(tt, k, F, it, Ge, vt), Ge.side = Me, Ge.needsUpdate = !0, Ve = !0;
          }
        }
        Ve === !0 && (z.updateMultisampleRenderTarget(V), z.updateRenderTargetMipmap(V));
      }
      E.setRenderTarget(ce, me, ge), E.setClearColor(We, Ye), Ne !== void 0 && (F.viewport = Ne), E.toneMapping = Re;
    }
    function In(_, U, k) {
      const F = U.isScene === !0 ? U.overrideMaterial : null;
      for (let V = 0, se = _.length; V < se; V++) {
        const ce = _[V], { object: me, geometry: ge, group: Re } = ce;
        let Ne = ce.material;
        Ne.allowOverride === !0 && F !== null && (Ne = F), me.layers.test(k.layers) && Ms(me, U, k, ge, Ne, Re);
      }
    }
    function Ms(_, U, k, F, V, se) {
      _.onBeforeRender(E, U, k, F, V, se), _.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, _.matrixWorld), _.normalMatrix.getNormalMatrix(_.modelViewMatrix), V.onBeforeRender(E, U, k, F, _, se), V.transparent === !0 && V.side === 2 && V.forceSinglePass === !1 ? (V.side = 1, V.needsUpdate = !0, E.renderBufferDirect(k, U, F, V, _, se), V.side = 0, V.needsUpdate = !0, E.renderBufferDirect(k, U, F, V, _, se), V.side = 2) : E.renderBufferDirect(k, U, F, V, _, se), _.onAfterRender(E, U, k, F, V, se);
    }
    function Un(_, U, k) {
      U.isScene !== !0 && (U = gt);
      const F = C.get(_), V = y.state.lights, se = y.state.shadowsArray, ce = V.state.version, me = ie.getParameters(_, V.state, se, U, k, y.state.lightProbeGridArray), ge = ie.getProgramCacheKey(me);
      let Re = F.programs;
      F.environment = _.isMeshStandardMaterial || _.isMeshLambertMaterial || _.isMeshPhongMaterial ? U.environment : null, F.fog = U.fog;
      const Ne = _.isMeshStandardMaterial || _.isMeshLambertMaterial && !_.envMap || _.isMeshPhongMaterial && !_.envMap;
      F.envMap = Z.get(_.envMap || F.environment, Ne), F.envMapRotation = F.environment !== null && _.envMap === null ? U.environmentRotation : _.envMapRotation, Re === void 0 && (_.addEventListener("dispose", Wt), Re = /* @__PURE__ */ new Map(), F.programs = Re);
      let Ve = Re.get(ge);
      if (Ve !== void 0) {
        if (F.currentProgram === Ve && F.lightsStateVersion === ce)
          return xs(_, me), Ve;
      } else
        me.uniforms = ie.getUniforms(_), w !== null && _.isNodeMaterial && w.build(_, k, me), _.onBeforeCompile(me, E), Ve = ie.acquireProgram(me, ge), Re.set(ge, Ve), F.uniforms = me.uniforms;
      const Ee = F.uniforms;
      return (!_.isShaderMaterial && !_.isRawShaderMaterial || _.clipping === !0) && (Ee.clippingPlanes = xe.uniform), xs(_, me), F.needsLights = Ro(_), F.lightsStateVersion = ce, F.needsLights && (Ee.ambientLightColor.value = V.state.ambient, Ee.lightProbe.value = V.state.probe, Ee.directionalLights.value = V.state.directional, Ee.directionalLightShadows.value = V.state.directionalShadow, Ee.spotLights.value = V.state.spot, Ee.spotLightShadows.value = V.state.spotShadow, Ee.rectAreaLights.value = V.state.rectArea, Ee.ltc_1.value = V.state.rectAreaLTC1, Ee.ltc_2.value = V.state.rectAreaLTC2, Ee.pointLights.value = V.state.point, Ee.pointLightShadows.value = V.state.pointShadow, Ee.hemisphereLights.value = V.state.hemi, Ee.directionalShadowMatrix.value = V.state.directionalShadowMatrix, Ee.spotLightMatrix.value = V.state.spotLightMatrix, Ee.spotLightMap.value = V.state.spotLightMap, Ee.pointShadowMatrix.value = V.state.pointShadowMatrix), F.lightProbeGrid = y.state.lightProbeGridArray.length > 0, F.currentProgram = Ve, F.uniformsList = null, Ve;
    }
    function Ss(_) {
      if (_.uniformsList === null) {
        const U = _.currentProgram.getUniforms();
        _.uniformsList = or.seqWithValue(U.seq, _.uniforms);
      }
      return _.uniformsList;
    }
    function xs(_, U) {
      const k = C.get(_);
      k.outputColorSpace = U.outputColorSpace, k.batching = U.batching, k.batchingColor = U.batchingColor, k.instancing = U.instancing, k.instancingColor = U.instancingColor, k.instancingMorph = U.instancingMorph, k.skinning = U.skinning, k.morphTargets = U.morphTargets, k.morphNormals = U.morphNormals, k.morphColors = U.morphColors, k.morphTargetsCount = U.morphTargetsCount, k.numClippingPlanes = U.numClippingPlanes, k.numIntersection = U.numClipIntersection, k.vertexAlphas = U.vertexAlphas, k.vertexTangents = U.vertexTangents, k.toneMapping = U.toneMapping;
    }
    function To(_, U) {
      if (_.length === 0) return null;
      if (_.length === 1) return _[0].texture !== null ? _[0] : null;
      T.setFromMatrixPosition(U.matrixWorld);
      for (let k = 0, F = _.length; k < F; k++) {
        const V = _[k];
        if (V.texture !== null && V.boundingBox.containsPoint(T)) return V;
      }
      return null;
    }
    function bo(_, U, k, F, V) {
      U.isScene !== !0 && (U = gt), z.resetTextureUnits();
      const se = U.fog, ce = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? U.environment : null, me = N === null ? E.outputColorSpace : N.isXRRenderTarget === !0 ? N.texture.colorSpace : Be.workingColorSpace, ge = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, Re = Z.get(F.envMap || ce, ge), Ne = F.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4, Ve = !!k.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), Ee = !!k.morphAttributes.position, Qe = !!k.morphAttributes.normal, tt = !!k.morphAttributes.color;
      let it = 0;
      F.toneMapped && (N === null || N.isXRRenderTarget === !0) && (it = E.toneMapping);
      const Ge = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, vt = Ge !== void 0 ? Ge.length : 0, Me = C.get(F), Ot = y.state.lights;
      if (je === !0 && (mt === !0 || _ !== ee)) {
        const Ke = _ === ee && F.id === J;
        xe.setState(F, _, Ke);
      }
      let He = !1;
      F.version === Me.__version ? (Me.needsLights && Me.lightsStateVersion !== Ot.state.version || Me.outputColorSpace !== me || V.isBatchedMesh && Me.batching === !1 || !V.isBatchedMesh && Me.batching === !0 || V.isBatchedMesh && Me.batchingColor === !0 && V.colorTexture === null || V.isBatchedMesh && Me.batchingColor === !1 && V.colorTexture !== null || V.isInstancedMesh && Me.instancing === !1 || !V.isInstancedMesh && Me.instancing === !0 || V.isSkinnedMesh && Me.skinning === !1 || !V.isSkinnedMesh && Me.skinning === !0 || V.isInstancedMesh && Me.instancingColor === !0 && V.instanceColor === null || V.isInstancedMesh && Me.instancingColor === !1 && V.instanceColor !== null || V.isInstancedMesh && Me.instancingMorph === !0 && V.morphTexture === null || V.isInstancedMesh && Me.instancingMorph === !1 && V.morphTexture !== null || Me.envMap !== Re || F.fog === !0 && Me.fog !== se || Me.numClippingPlanes !== void 0 && (Me.numClippingPlanes !== xe.numPlanes || Me.numIntersection !== xe.numIntersection) || Me.vertexAlphas !== Ne || Me.vertexTangents !== Ve || Me.morphTargets !== Ee || Me.morphNormals !== Qe || Me.morphColors !== tt || Me.toneMapping !== it || Me.morphTargetsCount !== vt || !!Me.lightProbeGrid != y.state.lightProbeGridArray.length > 0) && (He = !0) : (He = !0, Me.__version = F.version);
      let Ut = Me.currentProgram;
      He === !0 && (Ut = Un(F, U, V), w && F.isNodeMaterial && w.onUpdateProgram(F, Ut, Me));
      let Xt = !1, ci = !1, Ni = !1;
      const Ze = Ut.getUniforms(), at = Me.uniforms;
      if (x.useProgram(Ut.program) && (Xt = !0, ci = !0, Ni = !0), F.id !== J && (J = F.id, ci = !0), Me.needsLights) {
        const Ke = To(y.state.lightProbeGridArray, V);
        Me.lightProbeGrid !== Ke && (Me.lightProbeGrid = Ke, ci = !0);
      }
      if (Xt || ee !== _) {
        x.buffers.depth.getReversed() && _.reversedDepth !== !0 && (_._reversedDepth = !0, _.updateProjectionMatrix()), Ze.setValue(D, "projectionMatrix", _.projectionMatrix), Ze.setValue(D, "viewMatrix", _.matrixWorldInverse);
        const Ke = Ze.map.cameraPosition;
        Ke !== void 0 && Ke.setValue(D, Dt.setFromMatrixPosition(_.matrixWorld)), et.logarithmicDepthBuffer && Ze.setValue(D, "logDepthBufFC", 2 / (Math.log(_.far + 1) / Math.LN2)), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && Ze.setValue(D, "isOrthographic", _.isOrthographicCamera === !0), ee !== _ && (ee = _, ci = !0, Ni = !0);
      }
      if (Me.needsLights && (Ot.state.directionalShadowMap.length > 0 && Ze.setValue(D, "directionalShadowMap", Ot.state.directionalShadowMap, z), Ot.state.spotShadowMap.length > 0 && Ze.setValue(D, "spotShadowMap", Ot.state.spotShadowMap, z), Ot.state.pointShadowMap.length > 0 && Ze.setValue(D, "pointShadowMap", Ot.state.pointShadowMap, z)), V.isSkinnedMesh) {
        Ze.setOptional(D, V, "bindMatrix"), Ze.setOptional(D, V, "bindMatrixInverse");
        const Ke = V.skeleton;
        Ke && (Ke.boneTexture === null && Ke.computeBoneTexture(), Ze.setValue(D, "boneTexture", Ke.boneTexture, z));
      }
      V.isBatchedMesh && (Ze.setOptional(D, V, "batchingTexture"), Ze.setValue(D, "batchingTexture", V._matricesTexture, z), Ze.setOptional(D, V, "batchingIdTexture"), Ze.setValue(D, "batchingIdTexture", V._indirectTexture, z), Ze.setOptional(D, V, "batchingColorTexture"), V._colorsTexture !== null && Ze.setValue(D, "batchingColorTexture", V._colorsTexture, z));
      const hi = k.morphAttributes;
      if ((hi.position !== void 0 || hi.normal !== void 0 || hi.color !== void 0) && ze.update(V, k, Ut), (ci || Me.receiveShadow !== V.receiveShadow) && (Me.receiveShadow = V.receiveShadow, Ze.setValue(D, "receiveShadow", V.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && U.environment !== null && (at.envMapIntensity.value = U.environmentIntensity), at.dfgLUT !== void 0 && (at.dfgLUT.value = ud()), ci) {
        if (Ze.setValue(D, "toneMappingExposure", E.toneMappingExposure), Me.needsLights && wo(at, Ni), se && F.fog === !0 && pe.refreshFogUniforms(at, se), pe.refreshMaterialUniforms(at, F, de, re, y.state.transmissionRenderTarget[_.id]), Me.needsLights && Me.lightProbeGrid) {
          const Ke = Me.lightProbeGrid;
          at.probesSH.value = Ke.texture, at.probesMin.value.copy(Ke.boundingBox.min), at.probesMax.value.copy(Ke.boundingBox.max), at.probesResolution.value.copy(Ke.resolution);
        }
        or.upload(D, Ss(Me), at, z);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (or.upload(D, Ss(Me), at, z), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && Ze.setValue(D, "center", V.center), Ze.setValue(D, "modelViewMatrix", V.modelViewMatrix), Ze.setValue(D, "normalMatrix", V.normalMatrix), Ze.setValue(D, "modelMatrix", V.matrixWorld), F.uniformsGroups !== void 0) {
        const Ke = F.uniformsGroups;
        for (let cn = 0, Vi = Ke.length; cn < Vi; cn++) {
          const As = Ke[cn];
          ve.update(As, Ut), ve.bind(As, Ut);
        }
      }
      return Ut;
    }
    function wo(_, U) {
      _.ambientLightColor.needsUpdate = U, _.lightProbe.needsUpdate = U, _.directionalLights.needsUpdate = U, _.directionalLightShadows.needsUpdate = U, _.pointLights.needsUpdate = U, _.pointLightShadows.needsUpdate = U, _.spotLights.needsUpdate = U, _.spotLightShadows.needsUpdate = U, _.rectAreaLights.needsUpdate = U, _.hemisphereLights.needsUpdate = U;
    }
    function Ro(_) {
      return _.isMeshLambertMaterial || _.isMeshToonMaterial || _.isMeshPhongMaterial || _.isMeshStandardMaterial || _.isShadowMaterial || _.isShaderMaterial && _.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return B;
    }, this.getActiveMipmapLevel = function() {
      return q;
    }, this.getRenderTarget = function() {
      return N;
    }, this.setRenderTargetTextures = function(_, U, k) {
      const F = C.get(_);
      F.__autoAllocateDepthBuffer = _.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), C.get(_.texture).__webglTexture = U, C.get(_.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : k, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(_, U) {
      const k = C.get(_);
      k.__webglFramebuffer = U, k.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(_, U = 0, k = 0) {
      N = _, B = U, q = k;
      let F = null, V = !1, se = !1;
      if (_) {
        const ce = C.get(_);
        if (ce.__useDefaultFramebuffer !== void 0) {
          x.bindFramebuffer(D.FRAMEBUFFER, ce.__webglFramebuffer), te.copy(_.viewport), he.copy(_.scissor), Se = _.scissorTest, x.viewport(te), x.scissor(he), x.setScissorTest(Se), J = -1;
          return;
        } else if (ce.__webglFramebuffer === void 0) z.setupRenderTarget(_);
        else if (ce.__hasExternalTextures) z.rebindTextures(_, C.get(_.texture).__webglTexture, C.get(_.depthTexture).__webglTexture);
        else if (_.depthBuffer) {
          const Re = _.depthTexture;
          if (ce.__boundDepthTexture !== Re) {
            if (Re !== null && C.has(Re) && (_.width !== Re.image.width || _.height !== Re.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            z.setupDepthRenderbuffer(_);
          }
        }
        const me = _.texture;
        (me.isData3DTexture || me.isDataArrayTexture || me.isCompressedArrayTexture) && (se = !0);
        const ge = C.get(_).__webglFramebuffer;
        _.isWebGLCubeRenderTarget ? (Array.isArray(ge[U]) ? F = ge[U][k] : F = ge[U], V = !0) : _.samples > 0 && z.useMultisampledRTT(_) === !1 ? F = C.get(_).__webglMultisampledFramebuffer : Array.isArray(ge) ? F = ge[k] : F = ge, te.copy(_.viewport), he.copy(_.scissor), Se = _.scissorTest;
      } else
        te.copy(we).multiplyScalar(de).floor(), he.copy(Pe).multiplyScalar(de).floor(), Se = Xe;
      if (k !== 0 && (F = G), x.bindFramebuffer(D.FRAMEBUFFER, F) && x.drawBuffers(_, F), x.viewport(te), x.scissor(he), x.setScissorTest(Se), V) {
        const ce = C.get(_.texture);
        D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_CUBE_MAP_POSITIVE_X + U, ce.__webglTexture, k);
      } else if (se) {
        const ce = U;
        for (let me = 0; me < _.textures.length; me++) {
          const ge = C.get(_.textures[me]);
          D.framebufferTextureLayer(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0 + me, ge.__webglTexture, k, ce);
        }
      } else if (_ !== null && k !== 0) {
        const ce = C.get(_.texture);
        D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, ce.__webglTexture, k);
      }
      J = -1;
    }, this.readRenderTargetPixels = function(_, U, k, F, V, se, ce, me = 0) {
      if (!(_ && _.isWebGLRenderTarget)) {
        Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ge = C.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) {
        x.bindFramebuffer(D.FRAMEBUFFER, ge);
        try {
          const Re = _.textures[me], Ne = Re.format, Ve = Re.type;
          if (_.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + me), !et.textureFormatReadable(Ne)) {
            Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!et.textureTypeReadable(Ve)) {
            Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= _.width - F && k >= 0 && k <= _.height - V && D.readPixels(U, k, F, V, Q.convert(Ne), Q.convert(Ve), se);
        } finally {
          const Re = N !== null ? C.get(N).__webglFramebuffer : null;
          x.bindFramebuffer(D.FRAMEBUFFER, Re);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(_, U, k, F, V, se, ce, me = 0) {
      if (!(_ && _.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ge = C.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && ce !== void 0 && (ge = ge[ce]), ge) if (U >= 0 && U <= _.width - F && k >= 0 && k <= _.height - V) {
        x.bindFramebuffer(D.FRAMEBUFFER, ge);
        const Re = _.textures[me], Ne = Re.format, Ve = Re.type;
        if (_.textures.length > 1 && D.readBuffer(D.COLOR_ATTACHMENT0 + me), !et.textureFormatReadable(Ne)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!et.textureTypeReadable(Ve)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const Ee = D.createBuffer();
        D.bindBuffer(D.PIXEL_PACK_BUFFER, Ee), D.bufferData(D.PIXEL_PACK_BUFFER, se.byteLength, D.STREAM_READ), D.readPixels(U, k, F, V, Q.convert(Ne), Q.convert(Ve), 0);
        const Qe = N !== null ? C.get(N).__webglFramebuffer : null;
        x.bindFramebuffer(D.FRAMEBUFFER, Qe);
        const tt = D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return D.flush(), await wl(D, tt, 4), D.bindBuffer(D.PIXEL_PACK_BUFFER, Ee), D.getBufferSubData(D.PIXEL_PACK_BUFFER, 0, se), D.deleteBuffer(Ee), D.deleteSync(tt), se;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(_, U = null, k = 0) {
      const F = Math.pow(2, -k), V = Math.floor(_.image.width * F), se = Math.floor(_.image.height * F), ce = U !== null ? U.x : 0, me = U !== null ? U.y : 0;
      z.setTexture2D(_, 0), D.copyTexSubImage2D(D.TEXTURE_2D, k, 0, 0, ce, me, V, se), x.unbindTexture();
    }, this.copyTextureToTexture = function(_, U, k = null, F = null, V = 0, se = 0) {
      let ce, me, ge, Re, Ne, Ve, Ee, Qe, tt;
      const it = _.isCompressedTexture ? _.mipmaps[se] : _.image;
      if (k !== null)
        ce = k.max.x - k.min.x, me = k.max.y - k.min.y, ge = k.isBox3 ? k.max.z - k.min.z : 1, Re = k.min.x, Ne = k.min.y, Ve = k.isBox3 ? k.min.z : 0;
      else {
        const at = Math.pow(2, -V);
        ce = Math.floor(it.width * at), me = Math.floor(it.height * at), _.isDataArrayTexture ? ge = it.depth : _.isData3DTexture ? ge = Math.floor(it.depth * at) : ge = 1, Re = 0, Ne = 0, Ve = 0;
      }
      F !== null ? (Ee = F.x, Qe = F.y, tt = F.z) : (Ee = 0, Qe = 0, tt = 0);
      const Ge = Q.convert(U.format), vt = Q.convert(U.type);
      let Me;
      U.isData3DTexture ? (z.setTexture3D(U, 0), Me = D.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (z.setTexture2DArray(U, 0), Me = D.TEXTURE_2D_ARRAY) : (z.setTexture2D(U, 0), Me = D.TEXTURE_2D), x.activeTexture(D.TEXTURE0), x.pixelStorei(D.UNPACK_FLIP_Y_WEBGL, U.flipY), x.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), x.pixelStorei(D.UNPACK_ALIGNMENT, U.unpackAlignment);
      const Ot = x.getParameter(D.UNPACK_ROW_LENGTH), He = x.getParameter(D.UNPACK_IMAGE_HEIGHT), Ut = x.getParameter(D.UNPACK_SKIP_PIXELS), Xt = x.getParameter(D.UNPACK_SKIP_ROWS), ci = x.getParameter(D.UNPACK_SKIP_IMAGES);
      x.pixelStorei(D.UNPACK_ROW_LENGTH, it.width), x.pixelStorei(D.UNPACK_IMAGE_HEIGHT, it.height), x.pixelStorei(D.UNPACK_SKIP_PIXELS, Re), x.pixelStorei(D.UNPACK_SKIP_ROWS, Ne), x.pixelStorei(D.UNPACK_SKIP_IMAGES, Ve);
      const Ni = _.isDataArrayTexture || _.isData3DTexture, Ze = U.isDataArrayTexture || U.isData3DTexture;
      if (_.isDepthTexture) {
        const at = C.get(_), hi = C.get(U), Ke = C.get(at.__renderTarget), cn = C.get(hi.__renderTarget);
        x.bindFramebuffer(D.READ_FRAMEBUFFER, Ke.__webglFramebuffer), x.bindFramebuffer(D.DRAW_FRAMEBUFFER, cn.__webglFramebuffer);
        for (let Vi = 0; Vi < ge; Vi++)
          Ni && (D.framebufferTextureLayer(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, C.get(_).__webglTexture, V, Ve + Vi), D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, C.get(U).__webglTexture, se, tt + Vi)), D.blitFramebuffer(Re, Ne, ce, me, Ee, Qe, ce, me, D.DEPTH_BUFFER_BIT, D.NEAREST);
        x.bindFramebuffer(D.READ_FRAMEBUFFER, null), x.bindFramebuffer(D.DRAW_FRAMEBUFFER, null);
      } else if (V !== 0 || _.isRenderTargetTexture || C.has(_)) {
        const at = C.get(_), hi = C.get(U);
        x.bindFramebuffer(D.READ_FRAMEBUFFER, W), x.bindFramebuffer(D.DRAW_FRAMEBUFFER, H);
        for (let Ke = 0; Ke < ge; Ke++)
          Ni ? D.framebufferTextureLayer(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, at.__webglTexture, V, Ve + Ke) : D.framebufferTexture2D(D.READ_FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, at.__webglTexture, V), Ze ? D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, hi.__webglTexture, se, tt + Ke) : D.framebufferTexture2D(D.DRAW_FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_2D, hi.__webglTexture, se), V !== 0 ? D.blitFramebuffer(Re, Ne, ce, me, Ee, Qe, ce, me, D.COLOR_BUFFER_BIT, D.NEAREST) : Ze ? D.copyTexSubImage3D(Me, se, Ee, Qe, tt + Ke, Re, Ne, ce, me) : D.copyTexSubImage2D(Me, se, Ee, Qe, Re, Ne, ce, me);
        x.bindFramebuffer(D.READ_FRAMEBUFFER, null), x.bindFramebuffer(D.DRAW_FRAMEBUFFER, null);
      } else Ze ? _.isDataTexture || _.isData3DTexture ? D.texSubImage3D(Me, se, Ee, Qe, tt, ce, me, ge, Ge, vt, it.data) : U.isCompressedArrayTexture ? D.compressedTexSubImage3D(Me, se, Ee, Qe, tt, ce, me, ge, Ge, it.data) : D.texSubImage3D(Me, se, Ee, Qe, tt, ce, me, ge, Ge, vt, it) : _.isDataTexture ? D.texSubImage2D(D.TEXTURE_2D, se, Ee, Qe, ce, me, Ge, vt, it.data) : _.isCompressedTexture ? D.compressedTexSubImage2D(D.TEXTURE_2D, se, Ee, Qe, it.width, it.height, Ge, it.data) : D.texSubImage2D(D.TEXTURE_2D, se, Ee, Qe, ce, me, Ge, vt, it);
      x.pixelStorei(D.UNPACK_ROW_LENGTH, Ot), x.pixelStorei(D.UNPACK_IMAGE_HEIGHT, He), x.pixelStorei(D.UNPACK_SKIP_PIXELS, Ut), x.pixelStorei(D.UNPACK_SKIP_ROWS, Xt), x.pixelStorei(D.UNPACK_SKIP_IMAGES, ci), se === 0 && U.generateMipmaps && D.generateMipmap(Me), x.unbindTexture();
    }, this.initRenderTarget = function(_) {
      C.get(_).__webglFramebuffer === void 0 && z.setupRenderTarget(_);
    }, this.initTexture = function(_) {
      _.isCubeTexture ? z.setTextureCube(_, 0) : _.isData3DTexture ? z.setTexture3D(_, 0) : _.isDataArrayTexture || _.isCompressedArrayTexture ? z.setTexture2DArray(_, 0) : z.setTexture2D(_, 0), x.unbindTexture();
    }, this.resetState = function() {
      B = 0, q = 0, N = null, x.reset(), fe.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return nn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Be._getDrawingBufferColorSpace(e), t.unpackColorSpace = Be._getUnpackColorSpace();
  }
}, Ao = `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uRadius;
  uniform float uMaxAngle;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;
  uniform float uEntranceScaleProgress;
  uniform vec2 uEntranceAxis;

  vec3 scaleEntranceSlice(vec3 base) {
    if (uEntranceScaleProgress < 0.0) return base;

    float entranceCoordinate = abs(uEntranceAxis.x) > 0.5
      ? (uEntranceAxis.x > 0.0
          ? base.x / uMeshSize.x + 0.5
          : 0.5 - base.x / uMeshSize.x)
      : (uEntranceAxis.y < 0.0
          ? 0.5 - base.y / uMeshSize.y
          : base.y / uMeshSize.y + 0.5);
    float sliceProgress = clamp(
      uEntranceScaleProgress * 1.42 - entranceCoordinate * 0.42,
      0.0,
      1.0
    );
    float springResponse = 1.0
      - exp(-3.8 * sliceProgress) * cos(9.0 * sliceProgress);
    float sliceScale = mix(0.6, 1.0, springResponse);
    base.xy *= sliceScale;
    return base;
  }

  vec3 deformSticker(vec3 base) {
    base = scaleEntranceSlice(base);
    if (uPeelDepth <= 0.00001 || uPeel <= 0.0) return base;

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = base.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float front = uPeelDepth;
    float arcDistance = front - along;
    if (arcDistance <= 0.0) return base;

    float radius = max(uRadius, 0.001);
    float maxAngle = clamp(uMaxAngle, 2.55, 3.14159265);
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
    curved.z = elevation;

    float normalizedPeel = clamp(arcDistance / max(front, 0.001), 0.0, 1.0);
    float flutterEnvelope = sin(normalizedPeel * 3.14159265);
    float windWave =
      sin(uTime * 3.1 + side * 4.6 + arcDistance * 2.2) * 0.72 +
      sin(uTime * 7.4 - side * 6.8 + arcDistance * 4.1) * 0.28;
    float windDisplacement = windWave * uWind * flutterEnvelope;
    curved.z += windDisplacement * 0.032;
    curved.xy += tangent * windDisplacement * 0.04;
    curved.xy += direction * windDisplacement * 0.01;
    return curved;
  }

  vec3 stickerSurfaceNormal(vec3 base) {
    if (uPeelDepth <= 0.00001 || uPeel <= 0.0) {
      return vec3(0.0, 0.0, 1.0);
    }

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    float along = dot(base.xy - uOrigin, direction);
    float arcDistance = uPeelDepth - along;
    if (arcDistance <= 0.0) return vec3(0.0, 0.0, 1.0);

    float radius = max(uRadius, 0.001);
    float maxAngle = clamp(uMaxAngle, 2.55, 3.14159265);
    float angle = min(arcDistance / radius, maxAngle);
    return normalize(vec3(direction * sin(angle), cos(angle)));
  }
`, fd = `
  ${Ao}
  #include <common>
  #include <shadowmap_pars_vertex>

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    vec3 localNormal = stickerSurfaceNormal(position);

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 relative = position.xy - uOrigin;
    float along = dot(relative, direction);
    float front = uPeelDepth;
    float arcDistance = max(front - along, 0.0);
    float peelMask =
      step(along, front) * step(0.00001, uPeelDepth);
    float effectiveRadius = max(uRadius, 0.001);
    float normalizedArc = arcDistance / effectiveRadius;
    float receiverFeather = max(min(uMeshSize.x, uMeshSize.y) * 0.006, 0.004);
    float activePeel = step(0.00001, uPeelDepth);

    vLift = max(deformed.z, 0.0);
    vCurl = peelMask * sin(clamp(normalizedArc, 0.0, 3.14159265));
    vAdhered = mix(
      1.0,
      smoothstep(front - receiverFeather, front + receiverFeather, along),
      activePeel
    );

    vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormalView = normalize(normalMatrix * localNormal);
    vec3 transformedNormal = vNormalView;
    vec4 worldPosition = modelMatrix * vec4(deformed, 1.0);
    #include <shadowmap_vertex>
    gl_Position = projectionMatrix * viewPosition;
  }
`, pd = `
  uniform sampler2D uMap;
  uniform vec2 uTexel;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uEntranceSweep;
  uniform vec2 uEntranceAxis;
  uniform float uInteractionHint;
  uniform vec3 uInteractionHintColor;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;

  #include <common>
  #include <packing>
  #include <lights_pars_begin>
  #include <shadowmap_pars_fragment>
  #include <shadowmask_pars_fragment>

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    vec4 printSample = texture2D(uMap, vUv);
    if (printSample.a < 0.018) discard;

    vec3 surfaceNormal = normalize(vNormalView);
    vec3 viewDirection = normalize(-vViewPosition);
    float signedFacing = dot(surfaceNormal, viewDirection);
    float frontMix = smoothstep(-0.035, 0.035, signedFacing);
    vec3 normal = signedFacing < 0.0 ? -surfaceNormal : surfaceNormal;
    vec3 lightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float normalLight = max(dot(normal, lightDirection), 0.0);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    float printHighlight = pow(max(dot(normal, halfDirection), 0.0), 42.0) * 0.055;
    float frontDeformation = clamp(vCurl * 0.82 + vLift * 0.48, 0.0, 1.0);
    float frontDiffuse = mix(1.0, 0.76 + 0.24 * normalLight, frontDeformation);
    vec3 frontColor = printSample.rgb * frontDiffuse + printHighlight;
    frontColor += fresnel * 0.025;

    float exponent = mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0));
    float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
    specular *= mix(0.06, 0.3, uGloss) * (1.0 - uRoughness * 0.58);
    float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
    vec3 backColor = uBackColor * (0.82 + 0.18 * max(dot(normal, lightDirection), 0.0));
    backColor += specular + fresnel * (0.055 + 0.085 * uGloss) + satinBand + micro;

    vec3 color = mix(backColor, frontColor, frontMix);

    float projectedShadow = (1.0 - getShadowMask()) * vAdhered;
    color = mix(
      color,
      uShadowColor,
      clamp(projectedShadow * uShadowOpacity, 0.0, 1.0)
    );

    if (uEntranceSweep >= 0.0) {
      float sweepCoordinate = abs(uEntranceAxis.x) > 0.5
        ? (uEntranceAxis.x > 0.0 ? vUv.x : 1.0 - vUv.x)
        : (uEntranceAxis.y < 0.0 ? 1.0 - vUv.y : vUv.y);
      float sweepCenter = mix(-0.3, 1.3, uEntranceSweep);
      float laserDistance = abs(sweepCoordinate - sweepCenter);
      float laserCore = 1.0 - smoothstep(0.0, 0.04, laserDistance);
      float laserHalo = 1.0 - smoothstep(0.04, 0.3, laserDistance);
      float laserPhase =
        (sweepCoordinate - sweepCenter) * 3.6 + uEntranceSweep * 1.7;
      vec3 laserColor = 0.58 + 0.42 * cos(
        6.2831853 * (laserPhase + vec3(0.0, 0.33, 0.67))
      );
      color = mix(color, laserColor * 1.18, laserHalo * 0.46);
      color += laserColor * (laserCore * 0.62 + laserHalo * 0.16);
    }

    if (uInteractionHint > 0.0) {
      float nearbyAlpha = min(
        min(
          texture2D(uMap, vUv + vec2(uTexel.x * 3.0, 0.0)).a,
          texture2D(uMap, vUv - vec2(uTexel.x * 3.0, 0.0)).a
        ),
        min(
          texture2D(uMap, vUv + vec2(0.0, uTexel.y * 3.0)).a,
          texture2D(uMap, vUv - vec2(0.0, uTexel.y * 3.0)).a
        )
      );
      float edge = smoothstep(0.04, 0.28, printSample.a)
        * (1.0 - smoothstep(0.08, 0.72, nearbyAlpha));
      float dash = smoothstep(
        -0.22,
        0.22,
        sin((gl_FragCoord.x + gl_FragCoord.y) * 0.72 - uTime * 3.2)
      );
      float fillOpacity = 0.1 * uInteractionHint;
      float outlineOpacity = edge * dash * 0.92 * uInteractionHint;
      color = mix(color, uInteractionHintColor, fillOpacity);
      color = mix(color, uInteractionHintColor, outlineOpacity);
    }

    gl_FragColor = vec4(color, printSample.a);
    #include <colorspace_fragment>
  }
`, md = `
  ${Ao}

  varying vec2 vDepthUv;

  void main() {
    vDepthUv = uv;
    vec3 deformed = deformSticker(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`, gd = `
  uniform sampler2D uMap;
  varying vec2 vDepthUv;

  void main() {
    float artworkAlpha = texture2D(uMap, vDepthUv).a;
    if (artworkAlpha < 0.04) discard;
    gl_FragColor = vec4(1.0);
  }
`, vd = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYyLjEyLjEwMAAAAAAAAAAAAAAA//uQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAABBAABrwAAHCwsPExMXGxsfIiImKiouMjI2Ojo+PkFFRUlNTVFVVVldXWBkZGhsbHBwdHh4fH9/g4eHi4+Pk5eXm5+foqKmqqqusrK2urq+wcHFycnN0dHV1dnd3eDk5Ojs7PD09Pj8/P8AAAAATGF2YzYyLjI4AAAAAAAAAAAAAAAAJARKAAAAAAAAa8A1m0IlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQxAAD1IWU+AMx/Ms4NGJCkvAAaQGcAEHPTbKQBzkCdJiED7MQPTuiCrbD6TMnYknUJtE3dSkFkCzlEypu+DjjzWHJp15nYCZCYRXv8452UhPy4WBzVKOX+cLTNJFjxgXy2OBiW1kBbJDMcRmPBND8tuWPDNowRGZYQy3lGXgQJIsCTcl9Cz8VD9nmfzsD1Rrhwf6pA1f4eVYIkNnx8scJD2JUJ9ucY0VzZ9YmV+6VuxxmSGPEBoZBQDBQAApJ2NUVSsgUgxuMS3tTOqXvtvc4EW8aNWGxs+vDfwFZFjvH6kcdvH9GCL4ThR/hvOxWu2NiNBaewlAwRISsVDAmVEhD/Kvno2MKmHA2KBDBHDxMg7BwE/VSaMs5HE3EMTSjSAyyHwx2C+NoXMkB2tKfG+QArkIyQdpup0ejGhuRpjnAEfKgjZ5i36VZhjjTcVOMp4F/WpYTQZcBk2wRZ4rmrF27TCAOtsuuy5sDGepXrF2w7zYQK6TyNON44P8eI4R0+zvkMzTMs6p4iGp3h6iqqZj/yVuotNOCJNUYGwslW/UC//uSxAyAGQ2ZN/mHgAMmr2p/MYACv1ykFtKtxxlmn+ZaxuxMx6yWDuqfJ/F6OgR9Tm0LRKyK1YP91IQwhQua7NU5ILIwMskdbcHg+B6yRKNk76BFvPiBaDWLuE8iH4hir3DpGouGvUa1NyNz9Tsdo6HwHlXs238OXVLa1uDiRCGBk1ed+wMkKGuH0P0riBmTDE9fOcGFvcWG/ncb1+vSji4w5P6QJ5GHG8X3vbyFDf6lklmh4t6RKTwJtejPePK/////8vCtCtDuyq6I5nE2SgCSgEAIhhj4NQdeBnZM1rquasCQhDdUbgolvneQ0mWRo01KFd4NGe74uSzK7jKlXgJ4edo7pTMOv9TfUvll0H17u44FWao5qX5SqX1r9hwEvFqOPG7uUqj+7P7jMt/eEYjFJXcN37uVWZ3ZsfveP/7XIxewwwy/OliM7VvXMYjAut56x5zv4w3F3Ilmcy5d9x5fW7Tbq2YjMRbKr39a/Wv//7GMakbkUsf9/4XMWKlxgFn+4/NS7dnLestWqehXW6yoYbgtRejdCMXb0tKaKhZS4v/7ksQKANbZsSqc9gADQLYj4PM9sNtE7M0s9VDWtKd22+rNabM2/8hzGd7PstpBSZmZlqq1htQmZRPMsPLbNtrfaNxKQWSUOxsOTpkPJ3VowOCAg8W2C2hvG8hcJR0vRmJBiEkcVqI2H4rFESEI5K5dRLAW2zFRkqK5IJR0uVZEqdZaP6mKxfU5Q4h+hyKNa+8c6sOFKoSi2veVIyzHby+Yhop46XOeTBHRdPpVGpYVMx5/tTLsmNDnno9QHNCm4PMTSrclRBmWJKLMSGAR2BRW5VbdWW75BnhqejznXaZaJFcF7uHP51tx2hTqRHvXNMOoxuSSIcaRfltrMNtYYlVtueI2GzvScSI9RqpbOpUktiEwHYiEu1oxjN9hcZ2guhlHhETcJMLztXl8ZjSuYJLULJUWJcl/DtETeE4Sh/kiDRF4ntGgZy4OQzDaOiKzLo/GI/ZkP0oF9TrdDgcNM7Krz7Vzyh1wJy5PmJPltVJo0blESA5IbarXkGRm3DbmZafxnLX9vK/REMUjJUAeQlgxmBLq8wMXMt0kkJcz5Dzysaf/+5LEDQBZEZ0jZ5ntixK2pPDzPfAg2EUcNnaURraK75qJ3dCPYdNhYtMFMtazddwXqoLiwIcwn+hEI0WyGxsK4TKaZly3IQ2O21jel8OYuKNLueZ5JgcWjRMo1mF6pDJQk5kuuT9Zz7ZzyMpPymSzHqfcM8z9cn67ZUq3WlG6SwsTNCSZbDOLanSQMpyp2VgOVN1SlmZXacY7w6m0yY0BHqemElGyhx5SKaFZjco+Fc79FXY0l1NIxQInvTUb0nB/PERC1FNWlQHkJlV8bda764hm8vtUirek0DJZtMlyL9OXJe0zbWjaLZ7YrKuEduQpxId6TTaze4ISrlbGg2Oh+fbIvwVIdrmqm1veMDyHc5C2GzAXkGs3ai73Q9xaEY5tDeukCh2pmwccNLWwyQjTVUZmWI6EXRBoKfKnME5FQZ5dCMPDXVwtiGE0ZD7acNSMO1dTump05t7HLAgNjAqmPEsFqaZ2BnfM1FIpGxvc49zkopGGVibWy9nF1/plboDHrvvIvv9Q46ouTSyMQB5CA7O9CsYYF0redzfdrs2QtR3B//uSxAyAWGGxK2eN8QsONiVynvAAlDPlHMR7Vyae0+XyUtK0evoLyeDL2xvc4TXAYmCj4/j9QyWM1URilnYzfOpVo1ySJmOR4sTo00McDCwXBD1FHZkaUVlA+scxysp7EsYEIZEUYKoNPDx4qXhUxlexMeqxlUwoQT8TAe6us2MQ9JxLT9WRTunmhQoL2mpMHS/gbnYWpRM0VCYbCwvswl6aOxQEpGazgYGdlbIqserqBF8ZjgJ3Kx/F7m1pikRSa3aMyBq5QLpEmQrS3uMx2RoiPsyQj8ew4MDVNSyax9Q9wGf+tZe8zmNrdr2vi14m6x33k8/jPnb16u1etNitlhubi39J5Z2LMRPsLNDhrpDmpp7i/L8gUmoU7Z6qlqEq2FOY0zMNFeo19DVcrUKmRSpqtNlE0eEOKkVSqO5KdGn6JOYWlMwq14qjIV7irldRiSumKlLxoKbcplHEVsdimS7G5UVneRFUzKZnnjO3sx7QbzM0y1JNTGYDZZUy5+NN+I2admd3eIaFh0ZUtcYhJRJDRZGla+Lqr7aI3Glk67FgX//7ksQPgBjJl0/5h4ATRjKqPx+QAOgaeCKKCAwwO6yTA0BwBHwBPQgKQeIInA/wkAKSc6mMvzKzx3MpBcwY6FrpjhM13rCpEJbFZWOhiGUa06/wZFJbxYkLVIERnfvm5wZmCalta+aTM7Wxs7JNH/zitsXzAa83tEfRnE5FR4ajR7Czv4n1iFLSHmPAiQby7tiTcud0u8ljsDJAn7BCexobuHiWz99mJnGNOOda9q7vBrf7fwLufxqjPDfxMvr7O39h4EYZ/skSSAAAkBTS9zNx7AuiQwQzkmNNDwriHjbQYRsp05Tqlhptq11YVYYaOyksg+zkrGwKUwy4E7FLFPdm5XUfaVW6PT+S+5PS6i+jyrU9eZp7M1hq5UprtqURmm3EY1bwuS5/qsrqWb9SxLZuksZZ0/4/uliMkrS78KT9UmF27XlvdbtU1PZqzNmVP9NfhW79JYxmOXcb2Pf+mvarTuV3Kjt/juU2sq+sccabHH/yp6Se/GktapKtfmf3e/Wt65U3yxTCL////3ACOXiLuEABQAD0HEqVEdbYgDmcDfX/+5LECgBWVbM/3PYAAv+2JNDHs8m4lmdjWGaq6A/rsULWcjUK6LXq9/T293fF9eltxm33mfmT2YWD9Mblx+ONErYQ2C+02dRuunRdaYXn2HZUP3ybZETR/JAzLBHK0k6aQNruSr1A8tj6+pAqWIXCqWWVMZ68y5FBCdOmROKZUiTGywficaNlZY9X2vmZmtmvmUrrK1ctat8tPxTjzNddZqzXCa6616ZUdPxQNzOZeKlH2LB2K6xCZOcPwCnKaOQNGTwMnjkm1RLf/PXLmbqyaVj9EqhYamtJZ7/q09sC74Dry8dRwnp6VXOenzkkiKTtqmN0Q7DlAhrWZbiPnzSW1w3GP5zbC5JGEiVKaSTRsqtO0xW5MuUJPKpWwDKO0TVCjpTQnpVClxLC4p9lisB0SUglSHSqTkmraHJSPwajkbLnYDJG6dRzOeytk5aQ7rlRz1uKukkqlmd7JllcuXQutXPqsnpyTTE9TE799lKTbNElEloAgASXDyBsY8laPVrqGjuzb0rbiC8znHcY8iTzVk2sraLYrPT+0ZtvbTJHk1aP//uSxBcC1R21DqYxF8KiNOFAZ6QJiqpKxatOPHS56MxdXLthCUPQmRjiglVaUmqWhUnI+wLiUO1mglPmWbHRdLJ0q3HtQlWnCqASj5qOGJc0VVKZUlWtecrm3Tk9rrrrWsntHzmKzNbreaXfmUzUx9jxy4qkmiwLmDpB9+rrL6S7ODU1n+KmVJRqKJD1RUabYsh7ezl7UKhNJEGCUsKupgGlCBqBElCDK7dpopIpwbVmoqvrCRCUCGFV2IL2Rp9epzJ9rElLDdN+mBRMUEhVcuG0RGTkZpAC4AyZiLbqSRieZQkwwKF4NnW026cRhiLR1HqhUC3OLolIpKElpYuG220kRJhISHQTb1wXeuAcDbdBQSCttpAnJBJuEOovKC2MOVRpEAkg+JORo0aNushs5pEmJpmzdqCE1aziurY7wa78lbOwJxub8xTukBcUF7l5XWIR2sODvFjKYigLG2O0eWr1pLCgqg3Rupz4kHpIWGY/igfQ/Agdj4rCQFWJtabW3EJVFVh3edthiQ6rmCMgeWMQE0yLWbUvR7i6g7GmesngNf/7ksQ0gCH1sw4Hsy3LLLXlMMZiuLSOCTyNCX6PaqBd0IPrrQZe3NU9A/C81JvwoGyV+n4YhLWZFtE0VdMqLaJSjQb6OxLWdve2SMgkNuAZAYrYQEpZAjNVHUIzEAAs4KaNIhVFOZQpFAtWmQkIgAWDV/H3cciQphy6GEj2+fhn64y7DI0b06mcuUtFbia8tZ4j45atjVYUyNkSXiwbNmcVFh23oa7pFtG4tOS8bVt4DmnCg583UiEmp8CJc1l1S64Vp0aEAhjwTgVslX+hmHOoBmlXWcvOfH1WfY5x04XLdjreaa3Z9qrWZx4+U6l45Yx9WiK5fM0ZYPz4tDmeLjYSRLOl7h8tr1osaQru2s4aMEMVDoWCsAs6KoRF2iNREsQwQYGKLjJcPZASuLCdVEvKLqU+OygrEg6YK4ED4lwMw2YjRCNlDjTsOyF4I/M9jNe3Z+9PxmtLZXBWn/iEYjMSld/B/5LSuVHff51qW1NWYYkmEulEFySKTr3cnL+W4XP8/G7buV01yPSMeobZC6mIoHB/GzdRo3Zd6HIECoxAyLL/+5LEDYBVpbEoh5mNwr82Ja2DMfBhYWAx60ILedbXu6e9TxmhuZCFnK5RawY8PSY4eHa265hJVlYvXI2In7S1Q8KapcOCFqAP5bD8troljJbstWld8loT3uQDCiw3I6RUbn/sldOSDw/ZhFyCkSj/rC4+dqXYFlW0xh7GFRZD7s9Ke9TBhmNtWo59tiN9ISGS/6b4oNu486YCQm1YWfyZ5+F+UN7olC91z1hRqbHiO88EhqVLczjY5O/EN4GBcjI0FnO3qqJEh0oqKxnnWdJktzZjN+mygtBBgx4vX302+mHjZefOlp65flMUB5ipxgqHFC6+Lic00uZIx8PKxN2loGg4G68e17SldAIJTFZPQXmhIL1rF4riWPZeBcl+4dj4pLaGuPTehYXmb6PnnENdM7kUUFWDNedv1VtmbxfjXN4FHvxNn3RXW0q6rLdoEkzOUT2lmZvEUn21sOAABNwPLXhuHh8eLSUvsRD5WpeSrI4HaxN/KyoaiKdt8yypEcyF91q4xtWz1gtFBafsQLObKRfPOdipSu7hZlVdKtTNVOSy//uSxCWAVhmxL4YNksKKNiX48zJ4VGq3WRFRdlB1uPY+CEVgdPBAEk2fAYNZNlYUVireOi3uwEwfzhCJIdCocw9fAa4+kqhmxaY07rU+XwuTyIyuWZTGT1E6ofCemP6MnWUHiEhPnx4dXSFuAtnvVsZFOB+ZmXPmdfxxHd4iXZDsDt4QlmGyG8rlUjUuoSxm4gUNX1c5qPGY/8CZHl1du8tTVeP4b/95RnHy3fEt+L04BGJtaCElp0vFErI9GaIlcUIQEDDwdJCBqIwCCjCYR5GQcQCdLUarxmflszJY8UtS6N9iVZTQT5PclPGC+Be2vXRvUXHT1OpbtWOQUy9b3y752yvXry/TLr0byHHlkU1UY98zM2n5mZz5mGkF6jp7vo5cAAfQnxpNpeDJLbG2l2VFHBlgnwMJgvbHElHEzCl01hAlpLD9bAbkh3oUHQ0Alx8uVq7Fl1331rMDl/XXNEx8mLxKHJ4lPRvGJJSHTDZ76lDfTGR82WnzqGhVqS0wcwiSBnl5kvTiUZDKgpPD6Tk1kfzs+MVZHZMYVh//l5fFY//7ksRCAFSxiSuHjY+ChrUjoJYn0KXlg5QoL58nPHR/RcZHScs2uZKli4ydaHKh75kuPv/yQiCZ6zle11gRkVYQsv4oSfuHqo1xSo36ltpxS2NqsbUlbuD9WnBaU78pP6xMh3Fmu6da4iJlnyUaWWtRzaj9WBFdc3yUr9qA+5UtutWulUm9xyDURQRNWovM0htCkKbw8gdgEZUqEkQR2XEoSjJcAotU1YTSIQqGVAKLExchPRZQiFVwJH/zMjgpDLjRWKopJUOJwNZKRE4oaSRxz////+v/ytWVxZLR0ZF8VDFeERgEhXss94EZti6adNPQIo61iEzACm2ES9zRu6+nugRK1Ldf4LjKNJqa6GbQZOoppstmSLYykmoS6IsXKF3k6sQdQmWUCJ8SohICKzwpPEtioNGmzB0hEqAnCxsUuGjbqgTikCk7kkPMxQUQkJLhDBCq2gRikIwJiyImYIkuhWlLFJ4QxYTWohZjGOBptNYmLCbf////6JRUS9ZdAAAQAADMLVZTlyAWqxGeUxL8F5Wpqcv2jSxMyxSydJDUJZn/+5LEZIAUzakKFMSABO9CIRczoACm+DSsicu/DSmi6AhuHWjMEGSWtzbX4ytRhqKBcSBXMlkvjb/xZmDuRxv4eRzUi/8nc2njczLH2uyxwnLbV32bsWJgZYDmfJmHIkwuWQxWrvP8CPkpe47aNFeZtwcUNQYHRJiw4kGVgIgNDQZSfHThwPYhhkG2Vs/aettey8x4QpnK0oWAEQ4SHmEAhB+mpJVG7kETXKaF5RVniuGcMLZM8Dut+/rYDXoRUAUIQ8AhxRkZu0RTASHpkzL+Tnbcvp9Sqdllqcu9h9hasbsMHjz+TNiBHbisTj9VAOhm8AGTo9rql6W74NMMqTWs+hjBBfW7haq////////////////rsLwMBmv///////////////zEnxhSDCxpAip5aHaYdhAABAHNoAAAAAABW9OYsbAwYqoWOMLpJUvS0x5l6o6KkYdTteLrgy59Wm6yLaI5FxGRMhbzlmlLqi0ix2uOVWyyq2tbR4WO0RE5wX2h6Ixl2a85hKMYgwJBKq5Wot5Qyh3mdvk4Hcc5BQwAsOs1//uSxDmAJEoTNfmMgALJNia7nsABr7gQ9IHbZND0bvzsSd9yoZhMZll1/l2oPy6XSuUbg8uJKmYs5lMEM/aSy1eUdlvZQ+NqVUEHFng4Ezw2YwFJn4gOflGDvq3PDBes4MiFPGX3fy+3eNZXG/d+KwTSxh3InPX5ixjP3JHSRuBXLfaCuP7SyzDu5TXlEdu0NBO1akdlF2KYaqVoJvU1ZqaaEz///////////////+6MZnZV////////////////GN6idhGh5eZcz5AAPAGAnz1GbEWilPuEwsBemfrlnq9K3ILUgiY3X3q0pea7lG/mczbzf5vMtTM9TdZcq8qaV618azteaokinKPtr1zk2XoLBSOSnyN40ZWQUuSI15AUsXUlxCH/l5eb5YuXw/VeXCQIApEEjt+Vy2mXk8yAoSV2lJ1dqtBjTRI43TRpTLh4jbeRoaksRIj+XqH8pnXG7QuMJJmBtxswdN4yWV4G6PwLJlhQ4bE6V7mZilMeQAD5pt6IqCBRazh1eVJI4zf1H4sxkOdzfEJ7bQ5aZ5Oh/tsJp//7ksQVgFXZsTnMGY/CobMoPp7AAQnGH3v55xOP7va8BDJroQYELGWcp5Pp/Ipv+cjbJ7diK+0sME1XjM3rdBixvCtJmXWUhLIDBPC0SlhoM0hbLa4s8TgPFNKfFaFJgkIyX4TCSSy2bFrSwoXRpFaKOZuYzLcRi4HubyJQfWKzmJZkyf0ncfnqaZn/sXZcj5iZgpBeZgufWupzNm5hY2QWwAkAyqNXFejDkwTkfRiLlVR1lUGU8cppuHQpCk6ODZKDFMRkqkyZnray1/rmTnHmlrh8u/rQxLrs28xHo7c1xGuQ1BaQ3V3LmrrVsC5PFGt2i5K6wTi+JSUkoR9LKJrGaEpsxPCUfjkW4oVhlcxYxLQyK6ihOPvnp4yPk9BxKTbCGsv+Tv2/JmZmZntn+mb9Ms9MzM/T7/MzMy6up+TLU9UhyF1tRpBFAU0CQQOq8IOj8uVX7Km3xkN5MNwlZI81q462cZw3C2rg8i6nuRByFzVJ/PKpxQFIstj8hZ0FsQ1drpeJ2rDJP5teq6dfU5dJV4gBBI6KGAO9eJe5C6lvPYH/+5LEMAAiJhEimYeAAxGvan8xgAKI2xD0LarRik5LGkx2AFpHnSknpoMgzB5jdL2pCHjjJEM8SJbMoM46w/hH1YO0yH5Mx6hNU4OpfOdcnaoFuQkaGNIjZIQHYkQ5RGRgL57O201FMhpcBdkmLMSlUWZ2ZmMtvJsezW5K5z+EwPNdpkfJybQtRGo3FxifC8nVtsfRUep2LviwKPUjx6+N1LNTAuToRCVONlU2/////////////2/X////////////62dZ+HA7vDOzKyqhAZnEkSiEAiEQO5KrBE1ZbwoCjRRIJxoGXJG1OYo4KwNHthgoaHm2317EU3Cqw0w7/9xEr4Xbam1qHo1d13NrEUpGvuvSy25KYz/97vq7JIyRB9g9yaf6RfNZcrd12H3U5GGXu3F3ClNLZ5rf////zlPfikTo3Yaw6mv/XcquMp///9f/v3P4Q/E5e/lixbqSq1Wxx1qmtfr///////5bwllPbqReVy9rkOXq9zLeOOV/n1aust5Vv823/5ZZ1TFY7YggGV4nB8oo6TJKPCqcMH+lUNu2//uSxAuAVB2lI3z2AAJ+q+OQ9j54rklunq/FXLq+0y/9djU0pL1J5/c329mOBZ/QunKtY4kLo+EJBiRl9QXNhLhPaJFHllF8brWOPZaBtWdWXqUoqxZddsTR0cu/RMsadXUsoOD5BiLxoTyaZvmLRzFzy7tQpxC11Ni9NZmKEyYe+ZmZmZmZ396GZWKt6OZmcl2v/0zLvdVr5nLza0s8EGnGyPUyp1MV7Yh7K/QdVKeE87PCUT9zmj0zHllmWfq1rFodldk1jWrJjcpH9qISOR7d6TFscFSw/EQiOgmflZPyZKwWyOhNUxyx8V0I62raQ5OD42ZXkJDcK18TJD/gbF1UTAAkF0qJM8Wt4zqYsz9iOp5aMDOiGRSrTp+4q6dcRnJr1mDqF4M+I3//8Kf09X26xWHKCR6Bxj4FDKb49QwkoyR7QKgzL4fPEuzJqeFUDJ9646c7X/M31r9evfH30bj96wOdFLi1czGsu5br1e29EzBTPE59Da0k+Ne4hQ6JiJuNYfiSdGDzK3rQ0MFA9Jy3OxutUPGWL5p7hoZJRxH8zf/7ksQxgBQ5oxyUxgAM1EJmezGQADHJgeFgwsHVDrGYYGWyUuWrEE7PuWo43+htLtKL7P3/OmaUtSLOWbe+9M3zuyenJmZmZ7u6ZtMzt216yjg8PeCRkd5pohSMykAAAAAfSqFIIpy5zIFmkAjdmyxJqKwityUpjBDKaDnreIlFAlNqi3F5GyaaKJjUOyu1gL8M4m5eOBhiqFagj1OM+0V/Gnfv49OLCJ6Idb8MM6pIfl9iOwuelkoUqEDotECgi2MtdJjznNdaduehiZkb6MsZOvEOLDgE7wcsHOQS2JhrR46kSFxIHk8soZE6kEsHwAwIQsEOGAODUC3pgFo3LLUUWu8CqagoNSn03QALII3y4+juW8pRlWQ6iIpSAsBXZGlOgCRocVeTWG5w4xu1VwZ3H5XNUmufYwvd1Y5asWb7LWIxaGZ2gpaCHGtlu2RQaraotGpnVb60umotMx1+Hrepk8gnI3a////////////////aOs150h////////////////3ggLlNbUdZp5ZjFQAAzQo2diQKlEdOYgyuydqMSsb/+5LEDIBWBbM33PYAAz62KPWdJqJ62vH70GdW/wWimlctboc7budbr3hrPZs42/k70vLWroziNexZ9FVbc9P0GihuUx84U4TeZowTT70wpLhbAqiJhKL7ThZH45iIpkSx98hVVicSjWoRMmT5oDYiFNlcqsoQlEzMnCpq1G6R5z6yfxCmc6i3OYcbimcpTm/vMysilKmYgovirUtpIbllWYMoR30fopTIdlcWW7262yRE3X2S8pVJwI4S63vf925Qz1WpHyPvU0lbiR5b8LKA4U10SVg7jDFfJwTdlM0I6pCRKcFOIGBuChi1ZuhhhTYsPZA1x7S67r8uSixqvG43g7cUlc/SZ1LFe3Qy+kicPtIgWtyKyu++juQStdyJaKCM2QGCM+Y2BGHjIrPgETDZ02QEInsoM6uQJNkBU2wSMUXJyBk4R03MjNUjYIKOMk5/P/8/rEazC51+eO5/V71I+vjF+SrdpS67fz9Blo0mP97tuULnCko/82wmjXuYqpowAAAAy8Ahl0XQzzSTxeFGwcEh9NIKx48y5a62ys6dJpIE//uSxBMA1TmxP8exK0KyteZ4xhr5o9FpABshAkm6EtjH35buxtKScbnux1WJMje0TGkMTIpKPEol1EaKnizRCJdkHzxY+SpBZ+IWRUhAllEkHyINSIXFVUTlhCyZoRCLTrCJRGNhUwcXBpaOfqMdFDELLMPvwz7/8331c+VqxFBjFbv9pVd379y2Uqy+l02Hwjkrr/qsnRSgjaHlnUQmog1CVcB06GLpMD4pOrSxbH4j96P+e6I6nkJ4rE5oxWsu1r09+9a1KtxMNR3adWTfppC0eINHTg/Wch0+JMeJ/LuqeJ0GWOUIrLjofsQJx9cvNyySXw5LLtaxMrEgvJRqsOVhYPxxdOzgQhKMIWwag1FKQh+woW8JLkUoSVpUaur2T5ctb+FthbNcSYRsYo6hUb+6an94tiwXQi0uRVMm1+5HqjNxQMpmeaimQAIAAIbMrHbeXk2Jh+kI1Y41yx4iUgTMcZ43s6kGAADCzDU2j2me/hpPx6ibiM0p/b31kyZNM7CcjnFVDZP565mfnhXJZ/+OYxaNDJbVDlocCIJCkS45iv/7ksQuAFXVsTvHmZMCkTUpPYYK8ccFhcsczvtXHCwUiutHgcCCZnqMcHAXGZ+vK5dHN7zmCCZYUf9bJHDg/jgYmVjn5mRTOTCWKn8zRib7eXJmYZ6/rJ6Z7V5PXnjn0RLDx2PiRV29TNZmxMx9EZllDI3ylj9Po3dnNp2VMnTkLpZZR23Np0hUwNGcEjrDyAxdRHNzRGwSOXdUaY8/sa5VdZbS61St5qF3F36umtdr1l0wrV2xH2uLWI62hRe0tgey0tW3a8dPrYHxxPkOJq1rLobWa+sE2vb2XWnmxJLhZHofglNTr+gWxWta31g0csysxjGVtTfMrKJQytL3XrL/ykAhRUcK6lDChWMtZKWkIBS7ecq8r3EWa2XLasR9FcolzErbjXP0l0rKmXz120MWPTWvdk/Ltre7ms91tZyaQuypSNRur0OLssY8SltqpqPMsQPP0eYd9yQlMkoCRafMukonUXM46lgedKx8vPYSaYkoCTAHlBaIzzzJ0leeZdx51lb9Hn4ul72VtaUe3sOmXVz/VnI6/XK01lb2TNrbN4P/+5LESwAUrbEndPYADPxB4IMzgABrM5aOBdq3Mh9rrWt9cXSkAAIoL/CJAEAmhau5RhVV9Upn9L9MNEhFZVdvaxdjLJlDFnBUznggKDrqMRZVVTIYAu57U5kxmlILOlLF0NngtgbLkM12KWLZe54WbrpWS/KFUJWfMoCiQ4roImSVTptqGIfhg0rWYxlqYqhTFGYIuaxDzEm0OaK4CeZSGsDX0DFs20MlMhkQhGj6shsI0lQUFeHqo6koCIA4Rh6PwN+tkRoUnDoXSGUSygQqHXMXBXuwwt6THTgAgH0PpF6qjAAckql8Ie7xa0oSXRRtRzDGRBhCwEjp18qlZY1VKJYWbiigzsK2TVMqVYJXK6WGoZRqCpQobOv1DiaTxvO0CkcRtIXg6kGwblFpTLo8+z/N2mWQy+BmuRtlaw7EpdBghA/Nr////////////////473v////////////////0NTqtbtrtrd5rNI0WgiEQkW3GorbUOSXSCZC5TzqwJCL3rQ2masM7LTHVfiXbhtHiHIJmGuskOQ4q15a7UVqNYR//uSxB8AHYmZPbmMABLHNSq3nzACYZ6w6cc9YkXeV3VA2lM9lL9MhsO7AsicmfjktdO3Zt3ljuvGMnldaXtipa2TsV7U/GH8ikP14fbu+DrbjVC+O6TVm/9V+KtrUro23tXr0O28cXqoaOHYjPyipy5fosoYdiWSOYlluYvfhTR+xYg+ZuS+TPNvKgsUGvyykXP/tJYd+Nz9qMWIclmGGrdyD3oaw/sFKbP68cflsZkMpx19N8btZZVYxYr3No//mP/6I5frdpJEUSB9Uo3v7JwWkXBgfQGRjZ7MAZbFbA3IBswIVAzxB0wMDAuED3xSAfAKUE9h65PCtBcBSIIWh9jnmQyhdHPJ0XOS5MEUKpAz9Be6BZJ83WRcvlguGhmV0DMrnC4yZfSNE0EicOn2UgYGpuYGh03MJkam8zPmCK0ybQQWmYGijIihqRcvkwThiXzQzNzAihOE2VzczPr+hrdBqf///rW//636dTKrdSDLTZcwNJh8rIcwAEAAuPI4zCLlDNE8y7OLMZb05jKdq1DZWXTE+jQXszC9mfPMret2W//7ksQWgFUBqUHHsTXCwTUmEMMxuOtXbadLtrjT0zkzOpl1qnT61TADYyZPYz0946ehU9Vlb2b0D3W91p/1qKTZkxWiS7KVdCoPkZ67olOJBGRlU9OhCIzTzLpqZGUBy8yHOdM4PRLqqrKZwmvMy//////c2270ifmff//78djdzOikwTELnKkqkpIURE8Slb0t9kAXQcBuJzA/vNxE0cIRzRxE0AKCzgMxMgmRmo16nPsS8NVPYFLWIuv5/lpU0p6GV4jcTrT20FlRygRvO9vHW2TUTN19EQ0BBL5VRJyQbWMqHByueL6lIO4BiejNSWWS+JRSNk9ywSBPOUART5MqUFpEkPySnLrQVEAtMiUTivWyjlczM6+cFk7LFWUyc4aXjwliJLBy/MwlJZHR8xpxXSlYcoHIlNrnGWYR2w6PqlZol5dAAAAAqYpAi3KU4jIRJYkJdwD9VqHqd23Q59P73fx/S89NvuS3fNv9KUO/TmatjZcm8znZj7DCwmHkHQUYiuwsXr5/+VoXP9NqGHduHlY0OFerUn5+nXjFybruOFj/+5LEMIDV2bEzx7E1wsU2ZdKYwACIz4pkYkFAjtktDcMB7GZfOyfsTjao/tGVmBWDcWILfnBO6cF//7hkopKPQkggvCCBGRGCxIpaAwIBItMwFDCzQgBAwoe/Rjf8y///6jknPfmRlyW9QMJHJQUw+eDlSUiCzfVTbBkVTx5m3NKtae7q5ectPNO+QQY1HE1WmN8mXWlzKRasXwQwLjKsRydbdZaNbLCM5RH3TPrT2eOVsVZZJsOrWkpNVxUKpNuTUAfmLFMRSovaElOzVo+KxdUnJFRT6dZ5VSGS5aTbk3Zyy7/t8zM7WZnsskUlWJpeXAbHZcJKAvEk0XqUwhORrR4D47NT4yJKKZJRtM1+ZmZleiySWvTWXlMCSCAYEjHDyMaVBIJrDnCELZlhH7e158WQpPio6dlTP2eEASKToJoVZe1yszeXtElrgyeeinWjobs3rQDEa8ShFTNJ1S9nbOWhw6zFVGItOvTE/Q1JyZagsgHCI1uW0NrYgAAS5Z8wiYrflHZXqkiTDy5a16KVP+CCW0L2FnFiJFqDSinjUhiU//uQxEcAKAYVJ3mMgAKyNqe7npAAepJZK4uoJOzQEKFjE16WGSFZVURBM9SpBQZE+ZyDcb8dlli3M1rcxPYmSuDk1dtcWEfhxVdxou4rwIHMo0xwI6LGERCSQ4IEDDRzD69nWv/tJWuSGXVLEzFFM2/f9kjd11qQYA+qbDVS0bBHkQoTNTsdgFIllzUNHgTfCA0JqqCopwtF0UK5Haw5///////////////+wwtuwZOivn//////////////5jnmuCOJDLcHUZtDXFu7HqAAeyOL6KSeTESouReGZjgk6dN1mZAiVRahWR38qVwvLa/+1uKz//krC/415XCCtxxacY+DSJpMUnA01RNNDkCKeItVZtImKuiQs0s0mSu3anAU0KkSwqIjR0EXJqEtkTaI6Sp0QmSzV6mhKOpZECQ8CLqEIZpZFHP4wyOSaajSZKkAZ8rCppXxIiIAQXZLHzIBRLZEfJVmgSJuVgKnxjaqFKZECSrFVvrssMIAAAGeQU0IZTHCrXl9400VyikjzQpyqLnH15xO+fjvOa87CGWXlbn+//uSxBaAVZm1LaeZjcKvtaX2npABtO+5zg7lXDij2Oy97hepJ7lsY6Gqn/QyrFRDqxGVZfUnpkubSl1oSiWiOoD06OENaVFCSBCO0JIhMMpjhbh3f6gYohvtFQmniExisfE5ketTMztUiw9TmFzlwkryqfLF5wxlCocIlCsqoantdJKQ6sweWmVrZXhXdd+ZIJ3T2XRp//a7SQPgEI2vTwNEkqEtxlzQkarsQMLFHqzuUYOiRTE9ELaTN/1u/ITSTU8FYZ4b2UmKRavQWX2domUmklE92VVyzLEEJso1sEXkWa6tE0m+sWXOQNoEWsEZSzoHAVGZjXpIxKIggKhSSUQirEZ1tuIpLBUCAabFVgKw3WQ85/pIxw+2GS7aaARNEYYRntERCemeE18cLgQPBkBtQB4dqEOIWH1MIm5zDLVCZlZWaFZ0VVhV+AAAAAQ+JBsKUVfBRRrk/fedsrOHjpUUlhnU4wMA4GWA/TK6Qh4n1XMhywcplF/QTKoz/YSXKwnZYHFDz/N5X7T6MP6OT03kSoJJ5FMj1YhtWR3Or1eoTf/7ksQwgCDeESvZh4ACg7Dl/5iQAcPlEHSX53NH7O4P7sDGzvFKfqZUqGHGeRSnwnExd9EgnmoEfOzKR5DOVQF1Q12fyUL+4EnFGX0RwhxdBwGaW4fiVncXq2n1EcyBSafHHGTh4MpkBpGa+FhBGhvCBC0q2BpOK/aFtjbpMqJUKHUrDNqsWM9gzuSqTzM+3HbXSkWpWl6qy4O0KePLvGLMsL////////////VssP///////////8B5DVhsrKkPDHGAAABOBKwPQ5kYdHotqhPpjUt1BgzyG5Muzt3C8jNKUN9x2k72v/lzX7OKzUybnnEz4MEKJQMlVccjOKioNAYFb0C59BaDaLloTb/KIROp0lV0bbC6AhI2CFk6VPMLIyZTCrxYhwUxjMmQFyxgTqMEC5uoY9JEgQtmkm1Io1Zwmt14RYXZuePgjX1SM3Vsi6EltPmDg5GZnG8mTldnmJdXXwAAloB5ALhAFYOKuH9gOx/Pye0/RxeVBJCshAcqZtV/Objpe79OvZZWmzSZv/dsrIl7RglJhDLQNCqH4oNRHWj/+5LEIwAVkbU5xiTeQ2I2qHz2J+A3LxqWzB0Ey4Bs4NhYGBGaAhckbCh4uiDB0TgHGhIGyAyGxgdEhHJAmidPSfYtoJoIGRiB/2U/GJtDn7a+e12Uh93Hvdis95dmTn3mY9ZE30D0zJUTbLKQPWmZNwfRCNe7KCHAggzIZml5aHb6EAAOVMMqiOptVq6frbE+fp5no3LZchkj4DqFtMwmxBVIyIdD1RTmKW5zjxFcrm+IkmcuLa8jV01uCigz/G21wQ5vUqLLCSI4yEl2L0K6XAQ09i9HKfiCLanCxAKCcWAeGkYgkPY2EUej8xcOlYgigbAGB0KAiEEuEYxToBkhqFTNLUj1yNmjzNq5eublKetp+1y0ztHmWHq7uXrmtXerXI3Wr9MxNLkqgrD2biSsMi+FIJH4+iCkH4QS4ThPFoJDkRgOj0PZMBsfqdp+RF2CIPn8KFslLEAABVaFh14+JwIj6WcaKxPk7PRA76sWjWu2q1e0fZbNmZv1czKXpkztZy18hiqAKgsnpINiyGi9wpKzkSbNVs+sdWrU7iRDSRus//uSxCcAFVWxJ5TGAAxtQaSzMYAAIserFEtOzWBG7dmI5UtevYQzEyPDssnTOookaIxhbWuWMcvab3vjvxXs7HSssrILvwtbm61Rt/YFBKZZ8s3ROEqHGYLzboWsPnUaxhbl7wLVSHE09d6uRu3MUz00k0ulzklsGACAAAFMyFuYwtZazEJqHNozfKYxBdVV5J1QdYVOlrrZoPbI5U1Q/AsRLTsrlcMxN7WDy9ZqqTVVUu50UEPPIIrAbB34bfKfYVdlVeAonKH6dBptK7zJR0CY4kwuin03KPs8Yq/sff+G23oHti04kWRJTCf1CSmk6cPJFQ80h6Ydbha/4hFIJaJNXns/3qSfT4U6FTgBnd5rrX87r4W36dvrr0X25XL2uRi0uQvegouXjoOiyJNOH3EfN/33m7laIcguvL/t0Oc06FI5EUnMpinlFG8cdh2HnmiiAtlyPq63pbs2sOz0O3b8VfR2rb7NOs4K7pmPWv////////////////////////////////////+vObq+7+/97cqsu/tEo0SEkE2fvBFFrv/7ksQKgBjFmU35h4ADFLGqPzDwApPK5R8lTZl0DKVLZfLFyx7pfg7ULOUMIl4QpnHAu1Gqj+LgPWJDOizmWD5ZWUvwoyVghEpBkWGd2wwTlUzKmoiscH+Mue7NdJYD6M9rHgMjnRzgLhw1jLZpXPrM284ZOoGSHmlLYu3x9ws5kxmeSLF/VfVieIIqY8CI8pnevjO4bVXHg6hV6EPMsmMQHmGR//77prV76pqBEpBibrb3hb3JqtLe0BD7ME7/T+Pd/L//irqkOsQruqKaGbjRJIAAAJAxJczA4Gbq7KUwAgkmrYw9tUE8ND0kRnToGcuomoTxjmnMVSrT5+n+4HIyk4YFCMFhVSkUzXBZ4CGqoz0SXxtfqAsDAq4bdZfR8QmUzE5WzW39LPGTTGzrg7zgUzWbtp2uLrVnOP3jBEnx/baLCqM8uN/8+DhrgoXGcEY/ur6tR/P2XVYOILQ1uMK3/rj1+H8fv90s8ZI+8/tyJRTAsxbL8KNCjW/xF0+r8V//1eSJEa2dnxJl1ZmZmZmYmZh2RbbGyiAAQkV9KWH6XRX/+5LECwAYyXtX+PwAAyGzK38w8ALn4cb85HiWhq5yOaerTEZKWtOPsJYO9Uj4ajoIHvLOJumtpibk9u0v73XZY/bL2VxyAnerVav5X8rU7ATYGyr0ZDWxgJ1rku7/6/rzua6zd4+6bNo/BT7Q1KpS8O+/W/6uEHx9pfYw47tRuVZ0sdh2zQw7Kf/Wu/zmqeekdNOWspPRTlqtjKquu3ZbrKt//////z6W7BUtjbJXCiUF/9Lf7Lp6ryzjEYrW7/1r92ls+xlR3WId3RWJlLVWiMRCwSElAzVjD4vUzRMNUkFjwVjqVtfQDsveYx0DGsRIVYBvHoFPay+p9rMQfivALwt2lWnMn3hfz/MYTB2ch0IUoXiCcRC1OzrpwFLgaU5b6tzVPmVgW3N926OzwIjxgmljSTyNdGSSJ8acGSCo1HCmZcWkitk68+iX3j/5+XkRWRKK+Pp/aFq7HiLJvq9Xx819493kBDzrc0L3uJn//OoT3df//66iP38NQOc7Ayen+ImpX79Pq+P2//9nuvuYfJmVAPIgptnohSVeFy1NWxqx//uSxAoAGHmbYf2HgAKtM+t49hq5OAuqXKVNbcmtUn27JlhFBHh8kKOVQwVa2K1W0hK5PLT16xE6c5le6gsiOGEBLMqkULEcQhqIKSHXceSO1K6KzK5RSqZrUM2H23ski3BUr5mVxyoaqYkJ3DesCihW1V6+fK5XPny/EvGWG/apVkrlhehtcJiZje2w1mc2SNOyEKcqwldZijxfAclBnP/xJWus3pTX/rXVbxm5hZWQ/nK0a26aznWv8b//vff/8rxPXl2ZleIcgEAAA5nt5IzqIIhKQRhxp8t7mThhcy+KCkWGxx399Zhx75OyWZr33Fixy917/9MUXfe/vvtr152Zr17lKW3JODxevVzpwIB5HCr1f6k7f08LC8pBQpP5Ow8K5Pm81WGA7o44ZSUMCYT9TiWWzsc2lmna99tWweVPJzW1ev3CET9y0yZPM75nvf/3aGIBZ0k/AOPJ4XftM5D3RAgZEk04z9jEOe6A/QyXdHeVEAAAAGxIlUTsVDmcUNWwkKiXPFxnbWV6raR2GLi6lUW5E8qohFZ5cfQqfaaTH//7ksQZANVxo1vHsNXCt7Sr+rCQAVUJ9113K1aeszs2rWB6A+uhl4+dsQSzG7EIqYQY3kpiewE5OWWmEaQJj5ZxeEkQXWDmefaKg/USlmq8uiCgvqISaelk5Q0ZlBS0bjt2Tk9WrSDDtEqTOS2q1//+dG//81k5S0cBmkiRUKkj+2yek0U5l61ofte4c5qphmhoUQCH0q01oGmnLht0AgjKHjedpdG/krlVFsiA60xsCOJAJGxQuctRBikVDCbaTUEF7DKXioqWTRMvieniNKzXbJ6NvOpKCgDxTTANikDcLwMN8CzIFjAfQHyARlBkVDZE5GJFwIIxIJyQfAOQCYCCcDBODEhAIyg2gFKQfNeshgoqDChdrP15//3v85///rrojcHrwn0eMNntU1Rsg88/YYvkE//7nMy//HEVLmXZQCAAAbVTAQmCCEoRa7S0SGUTSCFcrJUbr1BWmTqTNpmJsUw7wFJMnQgms6ssYNkEwC2N1DkOK5nhuNHNPqsyBYo0Vcq5muk0rVtDRXZ8mmJENNkZThQ9cqa7Evt6eQobp2H/+5LEMoAhRhFMmYeAAz2wLj8w8ADMeYQ5CyEpBvLgIEdY2SFGchpdi9K57cqgaRKUugS7k7EHLgoUAkFadBvkob0k/YkdRdKKxxGuJjKJwonEvhYlaczezIcX9aLehZ/s6NY4qAXmk5WtDmZhZYV4J2pVvUT0Q414AjyFOZ7D6Rl2CLK2nAuz6U101Taof2k1lTR5ewul00VgQqGTG4tMH///////////saaaluT///////////q5zk1d3dxkxcPURDtt8miWQiW17cAsRoaRSkmOPkgWLCa63i69KoM3ao8gMAMAHqGmW8slSaaOEcLqOc9BbRIC4Cbk7OtVLsekeMdJni7OhOeCn04wriKac8JvSScVbgwKCBEljRWWdhv3kWj7xP3jyIxwW672RktWl3mqIXe6rxzTUceKxqBTN7AuntsUpi1s70z70h6Hs6GKyJam2uVacWeeBPesbWYcCDWPqPnMTV3jJEfv7vHlI8N+7dNMd6wwHF5L9OLXaDDawAiElSf//AKltttttciUSiSJRJBIKKlIloqtQhUVMrQN//uSxAwAGS2VabmHgBsesWx3MYADBaA20IArpwV3FzC9DVIumsfwk6H4AhjWSBklxujILxbXkJP9kUTTAbUPgRrOacVK5bEIVLArDuZYM0JsljVXRpVmu/fxFer4MVlVsmVxMzWYltFK9csTpONrYpYT5igOS4a6M2JbVcZnl77zOz2iPLNvfMU7LNqLLF0+vBe1g2pEeRLut0xS0img+TMXeqq1iznP8JVWxSl7pyBL4je513msKLNtcLmKwsV7wp2uSCuoUT0kizlSiUSIIBAA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yRlBLhYGgLd9+38EiTWIMZ09+TzAAV4ZQFSSZgFGhccLCJrrYDKv5/////////////////yCBN9////////////////W64MsCKTcSSAeIK4nY6UwrXGqYs1MckZOqA8YO+sqtlueq9v/Ha8NK9F21jn/+5LEsoAngg8Y2PyAAoszZG+ewAG1Wo4Phk6XfD9DJ5aeuxZdv48YhhWk0xMS6uv8P8zafOrR/ZpHlsaOoGvddaeTNWfXm30axw4+zSx1aYh6TaPLjJbTk6UkmJ6691IW25epl08nKW0Dzh8TicISFEOo6oy6VTEmiS6erX77WKJ1a5b9vq7HIGmv3auulQU2o0QgHgjGgeAVoKiEoVsUA2K562c+h36Gu7uzt+96n97K+BaurHl9a3Z5bAWzNQV1yH8DCxdaJYvPF2x3j1G+8kO2N+q6J5Gy8WT51UgD/Gsu7T59mq9ktxJYWYT41H5YW1DZ0lJLXITrCXUqGcVcfWIyavhV5TdlpmT4SRKJJK6i+ygjmK4OzAljocjsTSVy7oUi5b8CZew/B0bD9LX62fOrH/AIAAAALzoVIGAYsQ0AAZ7XvQnJ1mWiqszaXue1UCBDwcld9balSKxcTKQWluLsU3dUaQDoODYEzl6ljWFAFhQcDSiBglDrVd11VjrJgNk6W67KdNNCcgqlSNAW8ph4Es+MtzTSdOVs7csQARIu//uSxImAFLGbJXSWAAT0weLXM6AACg6tyjih6AZhqYbSWauA78eEgRQUYw3FUDDZQk6ISxdhJAyYcOHiwhlLQYAbVp7zveztoRax32TyhgzXmJNbcIOQCIQXwMMIMsCTUL2EAEDE3ZRvdd4YchpmELrxllIoFbuzlVddrFGZp0uyuuGmxqquioA7ZEPauzdDmcg4Sgb7MuM1Rsx7v4YT0//+eSTTTWHS3z/9St2t9/0a1nNdVTMwGWSjneldO4Zc8vWWQLsb////////////////////////////////////+BHX6rV0+HAGAAImYEKOGTDqxwAcQgGI2Cjw54qR+2uAQAsI3dN4DCoBTXMCBBABFVBWiizJQMDSDdNVF21oxeH18JWGAHJmGFFGCJyxMdl7Ny3jd11go2vhOUzgMMnGJZBw9ti5QsASUSMVgoXflip4eYWFwYADAYewMQkmGLUXSs0SCrTZIDhiO4cDf9NC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0ZOnULjZ60vEEKnO1en5xJYKRanqkuxIKLRosiRzm4dPc3Dkqd//3mXqt7VpqKoARlNOLMTRJGlFOz0aceZG5/s07xakiJxoEKLKPhyizCni1JGnFvV1dJpKkJY6ojUTODIKh4ugXSOnDp1JdScJw3YyVSThNJZNK6tY6cLJpKrEI0Hxg4dLHTh0oNjAeGyAnPEwpEQyMh4bICc8TCkiIipYqWKh4bGDhdRdJNIuUSXhOF1axxpRZRZQGBAR5l5v+TU1JxpwGJAjyCaKRpx1VVVMQf/7ksRSA9QloIJDJNtIAAA0gAAABE1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=", _d = vd, Md = 5, Sd = 7e-4, Ma = 0.018, Sa = 0.012, Jr = 6e-3, vn = 0.985, Qr = 0.95, jr = 4, xd = 90, Ad = 48, Sn = null, rr = /* @__PURE__ */ new Map(), xa = 0.16;
function Ct(e, t, i, n) {
  return {
    key: e,
    start: t - xa,
    end: i - xa,
    trim: n
  };
}
var Ed = {
  lift: Ct("lift", 0.178, 0.325, 2.65),
  micro: [
    Ct("micro-a", 0.185, 0.205, 2.9),
    Ct("micro-b", 0.282, 0.322, 2.8),
    Ct("micro-c", 0.407, 0.44, 2.75),
    Ct("micro-d", 0.483, 0.565, 2.65),
    Ct("micro-e", 0.603, 0.698, 2.55),
    Ct("micro-f", 0.724, 0.92, 2.45)
  ],
  body: [
    Ct("body-a", 0.94, 1.126, 0.64),
    Ct("body-b", 1.352, 1.446, 0.7),
    Ct("body-c", 1.558, 1.708, 0.68)
  ],
  accent: [Ct("accent-a", 1.222, 1.292, 0.58), Ct("accent-b", 1.574, 1.715, 0.62)],
  finish: Ct("finish", 1.73, 1.795, 0.72)
};
function ht(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Aa(e, t, i) {
  const n = ht((i - e) / (t - e), 0, 1);
  return n * n * (3 - 2 * n);
}
function si(e, t) {
  return e + Math.random() * (t - e);
}
function yd(e) {
  const t = Array.from({ length: e }, (i, n) => n);
  for (let i = t.length - 1; i > 0; i -= 1) {
    const n = Math.floor(Math.random() * (i + 1));
    [t[i], t[n]] = [t[n], t[i]];
  }
  return t;
}
function Ea(e) {
  return 10 ** (e / 20);
}
function _n(e) {
  return 2 ** (si(-e, e) / 12);
}
function ya() {
  return ht(-Math.log(Math.max(1e-3, 1 - Math.random())), 0.55, 1.8);
}
function Ta() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function $r() {
  if (Sn) return Sn;
  if (typeof window > "u") return null;
  const e = window.AudioContext ?? window.webkitAudioContext;
  if (!e) return null;
  try {
    Sn = new e({ latencyHint: "interactive" });
  } catch {
    return null;
  }
  return Sn;
}
function Td(e, t) {
  const i = rr.get(e);
  if (i) return i;
  const n = fetch(e).then((r) => {
    if (!r.ok) throw new Error(`Peel audio request failed with ${r.status}.`);
    return r.arrayBuffer();
  }).then((r) => t.decodeAudioData(r));
  return rr.set(e, n), n.catch(() => {
    rr.get(e) === n && rr.delete(e);
  }), n;
}
function ri(e, t, i, n, r = 1) {
  return {
    key: e,
    start: t * i,
    end: t * n,
    trim: r
  };
}
function bd(e) {
  return {
    lift: ri("lift", e, 0.02, 0.18, 1.2),
    micro: [
      ri("micro-a", e, 0.12, 0.32, 1.05),
      ri("micro-b", e, 0.28, 0.48, 1),
      ri("micro-c", e, 0.44, 0.62, 0.95)
    ],
    body: [
      ri("body-a", e, 0.32, 0.56, 0.9),
      ri("body-b", e, 0.52, 0.76, 0.86),
      ri("body-c", e, 0.7, 0.88, 0.82)
    ],
    accent: [ri("accent", e, 0.58, 0.78, 0.82)],
    finish: ri("finish", e, 0.8, 0.98, 0.9)
  };
}
var wd = class {
  constructor() {
    this.enabled = !1, this.src = "", this.volume = 0.7, this.useBuiltInProfile = !1, this.buffer = null, this.profile = null, this.loadRevision = 0, this.masterGain = null, this.compressor = null, this.activeVoices = /* @__PURE__ */ new Set(), this.gestureActive = !1, this.lastProgress = 0, this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = 6e-3, this.nextBackwardSpacing = 0.025, this.liftArmed = !0, this.finishArmed = !0, this.fullyDetached = !1, this.lastAccentTime = -1 / 0, this.holdTimer = null, this.panWalk = 0, this.lastSliceKey = "", this.sliceBags = {
      micro: [],
      body: [],
      accent: []
    }, this.destroyed = !1;
  }
  configure(e) {
    if (this.destroyed) return;
    const t = e.src.trim(), i = !!e.useBuiltInProfile, n = t !== this.src, r = i !== this.useBuiltInProfile;
    if (this.enabled = e.enabled && !!t, this.src = t, this.volume = ht(e.volume, 0, 1), this.useBuiltInProfile = i, this.masterGain && this.masterGain.gain.setTargetAtTime(this.volume, this.masterGain.context.currentTime, 0.012), (n || r) && (this.reset(0), this.buffer = null, this.profile = null, this.loadRevision += 1), !this.enabled) {
      this.reset(this.lastProgress);
      return;
    }
    this.buffer || this.preload();
  }
  unlock() {
    if (!this.enabled || this.destroyed) return;
    const e = $r();
    e && (e.state === "suspended" && e.resume().catch(() => {
    }), this.buffer || this.preload());
  }
  begin(e, t = Ta()) {
    this.clearHoldTimer(), this.gestureActive = !0, this.lastProgress = ht(e, 0, 1), this.lastUpdateTime = t, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = si(4e-3, 8e-3), this.nextBackwardSpacing = si(0.018, 0.032), this.lastAccentTime = -1 / 0, this.panWalk = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012), this.lastProgress <= Jr && (this.liftArmed = !0), this.lastProgress < Qr ? (this.fullyDetached = !1, this.finishArmed = !0) : this.lastProgress >= vn && (this.fullyDetached = !0, this.finishArmed = !1);
  }
  update(e, t = Ta(), i = 0) {
    const n = ht(e, 0, 1);
    if (!this.gestureActive) {
      this.begin(n, t);
      return;
    }
    const r = this.lastProgress, s = Math.max((t - this.lastUpdateTime) / 1e3, 0), a = n - r;
    if (this.lastProgress = n, this.lastUpdateTime = t, n <= Jr && (this.liftArmed = !0), n < Qr && (this.fullyDetached = !1, this.finishArmed = !0), Math.abs(a) < Sd) {
      const d = Math.exp(-Math.min(s, 0.12) / 0.045);
      this.smoothedVelocity *= d, this.smoothedAcceleration *= d;
      return;
    }
    this.armHoldSilence();
    const o = ht(s || 1 / 60, 1 / 240, 0.25);
    s > 0.14 && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0);
    const c = a / o, l = this.smoothedVelocity, h = 1 - Math.exp(-o / 0.045);
    this.smoothedVelocity += (c - this.smoothedVelocity) * h;
    const f = (this.smoothedVelocity - l) / o, u = this.smoothedAcceleration, m = 1 - Math.exp(-o / 0.075);
    this.smoothedAcceleration += (f - this.smoothedAcceleration) * m;
    const M = Math.abs(c) * 0.52 + Math.abs(this.smoothedVelocity) * 0.48, S = ht(Math.log1p(8 * M) / Math.log(13), 0, 1);
    this.panWalk = ht(this.panWalk + si(-0.018, 0.018), -0.05, 0.05);
    const p = ht(i * 0.08 + this.panWalk, -0.12, 0.12);
    if (this.fullyDetached && n >= Qr) {
      this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.01);
      return;
    }
    if (a > 0 && M >= Ma) {
      if (this.stopVoices(/* @__PURE__ */ new Set(["reattach"]), 0.012), this.liftArmed && r <= Sa && n >= Sa && (this.playLift(S, p), this.liftArmed = !1), this.finishArmed && r < vn && n >= vn) {
        this.playFinish(S, p), this.finishArmed = !1, this.fullyDetached = !0, this.forwardTravel = 0, this.backwardTravel = 0;
        return;
      }
      if (!this.fullyDetached) {
        this.forwardTravel += a;
        const d = ht(M / (6 + 44 * S ** 0.75), 32e-4, 0.035);
        let R = 0;
        for (; this.forwardTravel >= this.nextForwardSpacing && R < 2; ) {
          const T = Aa(8e-3, 0.035, n) * (1 - 0.28 * Aa(0.86, 0.98, n));
          this.playTexture(S, T, p), this.forwardTravel -= this.nextForwardSpacing, this.nextForwardSpacing = d * ya(), R += 1;
        }
        R === 2 && this.forwardTravel >= this.nextForwardSpacing && (this.forwardTravel = 0);
      }
      if (u <= jr && this.smoothedAcceleration > jr && S > 0.2 && t - this.lastAccentTime >= xd && n < vn) {
        const d = ht((this.smoothedAcceleration - jr) / 8, 0, 1);
        this.playAccent(S, d, p), this.lastAccentTime = t;
      }
      this.backwardTravel = 0;
      return;
    }
    if (a < 0 && M >= Ma) {
      this.stopVoices(/* @__PURE__ */ new Set(["texture"]), 0.014), this.backwardTravel += -a;
      const d = ht(M / (2 + 12 * S ** 0.8), 8e-3, 0.07);
      let R = 0;
      for (; this.backwardTravel >= this.nextBackwardSpacing && R < 1; )
        this.playReattach(S, p), this.backwardTravel -= this.nextBackwardSpacing, this.nextBackwardSpacing = d * ya(), R += 1;
      R && this.backwardTravel >= this.nextBackwardSpacing && (this.backwardTravel = 0), this.forwardTravel = 0;
    }
  }
  end(e) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ht(e, 0, 1), this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.016);
  }
  reset(e = 0) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ht(e, 0, 1), this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.liftArmed = this.lastProgress <= Jr, this.fullyDetached = this.lastProgress >= vn, this.finishArmed = !this.fullyDetached, this.lastAccentTime = -1 / 0, this.stopVoices(void 0, 0.012);
  }
  stop() {
    this.clearHoldTimer(), this.gestureActive = !1, this.stopVoices(void 0, 0.012);
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.loadRevision += 1, this.stop(), this.masterGain?.disconnect(), this.compressor?.disconnect(), this.masterGain = null, this.compressor = null, this.buffer = null, this.profile = null);
  }
  preload() {
    const e = $r();
    if (!e || !this.enabled || !this.src || this.destroyed) return;
    const t = ++this.loadRevision;
    Td(this.src, e).then((i) => {
      this.destroyed || t !== this.loadRevision || (this.buffer = i, this.profile = this.useBuiltInProfile ? Ed : bd(i.duration), this.sliceBags = {
        micro: [],
        body: [],
        accent: []
      });
    }).catch(() => {
    });
  }
  armHoldSilence() {
    typeof window > "u" || (this.clearHoldTimer(), this.holdTimer = window.setTimeout(() => {
      this.holdTimer = null, this.gestureActive && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012));
    }, Ad));
  }
  clearHoldTimer() {
    this.holdTimer === null || typeof window > "u" || (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
  playLift(e, t) {
    const i = this.profile?.lift;
    i && this.playSlice(i, {
      kind: "lift",
      duration: 0.07 + e * 0.025,
      playbackRate: (0.94 + e * 0.12) * _n(0.5),
      gain: 0.11 + e * 0.065,
      lowpass: 4200 + e * 5400,
      highpass: 180,
      attack: 4e-3,
      release: 0.018,
      pan: t
    });
  }
  playTexture(e, t, i) {
    if (!this.profile || t <= 1e-3) return;
    const n = Math.random() < ht(0.12 + 0.58 * e, 0, 0.72), r = this.takeSlice(n ? "body" : "micro");
    if (!r) return;
    const s = si(0.85, 1.15) * (0.066 - 0.032 * e);
    this.playSlice(r, {
      kind: "texture",
      duration: s,
      playbackRate: (0.92 + e * 0.18) * _n(0.7),
      gain: (0.07 + 0.2 * e ** 0.65) * t * Ea(si(-1.5, 1.5)),
      lowpass: 2400 + e * 9e3,
      highpass: 210,
      attack: 6e-3 - e * 35e-4,
      release: 0.017 - e * 8e-3,
      pan: i
    });
  }
  playReattach(e, t) {
    const i = this.takeSlice("micro");
    i && this.playSlice(i, {
      kind: "reattach",
      duration: si(0.03, 0.05),
      playbackRate: (0.67 + e * 0.17) * _n(0.5),
      gain: (0.024 + 0.052 * e ** 0.7) * Ea(si(-1.2, 1.2)),
      lowpass: 1500 + e * 2400,
      highpass: 120,
      attack: 5e-3,
      release: 0.02,
      pan: t * 0.6
    });
  }
  playAccent(e, t, i) {
    const n = this.takeSlice("accent");
    n && this.playSlice(n, {
      kind: "accent",
      duration: si(0.045, 0.072),
      playbackRate: (0.96 + e * 0.12) * (1 + t * 0.08) * _n(0.45),
      gain: (0.14 + e * 0.1) * (1 + t * 0.35),
      lowpass: 5200 + e * 6e3,
      highpass: 220,
      attack: 2e-3,
      release: 0.024,
      pan: i
    });
  }
  playFinish(e, t) {
    const i = this.profile?.finish;
    i && (this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.01), this.playSlice(i, {
      kind: "finish",
      duration: 0.064,
      playbackRate: (0.97 + e * 0.08) * _n(0.35),
      gain: 0.2 + e * 0.12,
      lowpass: 7500 + e * 4500,
      highpass: 180,
      attack: 15e-4,
      release: 0.038,
      pan: t
    }));
  }
  takeSlice(e) {
    const t = this.profile?.[e] ?? [];
    if (!t.length) return null;
    let i = this.sliceBags[e];
    i.length || (i = yd(t.length), i.length > 1 && t[i[i.length - 1]]?.key === this.lastSliceKey && ([i[0], i[i.length - 1]] = [i[i.length - 1], i[0]]), this.sliceBags[e] = i);
    const n = t[i.pop() ?? 0] ?? null;
    return n && (this.lastSliceKey = n.key), n;
  }
  playSlice(e, t) {
    if (!this.enabled || this.destroyed || this.activeVoices.size >= Md) return;
    const i = $r(), n = this.buffer;
    if (!i || !n) return;
    const r = ht(e.start, 0, Math.max(n.duration - 4e-3, 0)), s = ht(e.end, r + 4e-3, n.duration) - r;
    if (s < 4e-3) return;
    const a = Math.min(t.duration * t.playbackRate, s), o = Math.max(s - a, 0), c = r + (o ? Math.random() * o : 0), l = a / t.playbackRate, h = i.currentTime + 2e-3, f = Math.min(t.attack, l * 0.36), u = Math.min(t.release, l * 0.48), m = Math.max(h + f, h + l - u), M = ht(t.gain * e.trim, 0, 1.1), S = i.createBufferSource(), p = i.createBiquadFilter(), d = i.createBiquadFilter(), R = i.createGain(), T = typeof i.createStereoPanner == "function" ? i.createStereoPanner() : null;
    S.buffer = n, S.playbackRate.setValueAtTime(t.playbackRate, h), p.type = "highpass", p.frequency.setValueAtTime(t.highpass, h), p.Q.setValueAtTime(0.7, h), d.type = "lowpass", d.frequency.setValueAtTime(ht(t.lowpass, 600, i.sampleRate * 0.46), h), d.Q.setValueAtTime(0.72, h), T && T.pan.setValueAtTime(t.pan, h), R.gain.setValueAtTime(0, h), R.gain.linearRampToValueAtTime(M, h + f), R.gain.setValueAtTime(M, m), R.gain.linearRampToValueAtTime(0, h + l), S.connect(p), p.connect(d);
    const A = T ?? d;
    T && d.connect(T), A.connect(R), R.connect(this.ensureOutput(i));
    const y = [
      S,
      p,
      d
    ];
    T && y.push(T), y.push(R);
    const b = {
      source: S,
      gain: R,
      nodes: y,
      kind: t.kind
    };
    this.activeVoices.add(b), S.addEventListener("ended", () => {
      this.activeVoices.delete(b);
      for (const P of y) P.disconnect();
    }, { once: !0 }), S.start(h, c, a);
  }
  stopVoices(e, t) {
    const i = Sn;
    if (!i) return;
    const n = i.currentTime;
    for (const r of [...this.activeVoices])
      if (!(e && !e.has(r.kind))) {
        try {
          r.gain.gain.cancelScheduledValues(n), r.gain.gain.setTargetAtTime(0, n, Math.max(t / 3, 2e-3)), r.source.stop(n + t);
        } catch {
        }
        this.activeVoices.delete(r);
      }
  }
  ensureOutput(e) {
    return this.masterGain ? this.masterGain : (this.masterGain = e.createGain(), this.compressor = e.createDynamicsCompressor(), this.masterGain.gain.setValueAtTime(this.volume, e.currentTime), this.compressor.threshold.setValueAtTime(-14, e.currentTime), this.compressor.knee.setValueAtTime(8, e.currentTime), this.compressor.ratio.setValueAtTime(4, e.currentTime), this.compressor.attack.setValueAtTime(3e-3, e.currentTime), this.compressor.release.setValueAtTime(0.1, e.currentTime), this.masterGain.connect(this.compressor), this.compressor.connect(e.destination), this.masterGain);
  }
}, Ci = 1536, _i = 320;
function bt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function ba(e) {
  if (!e) return null;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function Rd(e) {
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
function Cd(e) {
  const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement, i = t.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (i?.length === 4 && Number.isFinite(i[2]) && Number.isFinite(i[3]) && i[2] > 0 && i[3] > 0) return bt(i[2] / i[3], 0.15, 8);
  const n = ba(t.getAttribute("width")), r = ba(t.getAttribute("height"));
  return n && r ? bt(n / r, 0.15, 8) : 1;
}
async function Pd(e) {
  const t = new Blob([e], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(t);
  try {
    const n = new Image();
    return n.decoding = "async", n.src = i, await n.decode(), n;
  } finally {
    URL.revokeObjectURL(i);
  }
}
async function Ld(e) {
  if (!/^(data:|blob:|https?:|\/)/i.test(e)) throw new Error("The image URL must use data, blob, HTTP, or HTTPS.");
  const t = new Image();
  if (t.decoding = "async", /^https?:/i.test(e) && (t.crossOrigin = "anonymous"), t.src = e, await t.decode(), !t.naturalWidth || !t.naturalHeight) throw new Error("The image has no drawable dimensions.");
  return t;
}
function Dd(e) {
  const t = Math.min(1, 640 / Math.max(e.naturalWidth, e.naturalHeight)), i = Math.max(1, Math.round(e.naturalWidth * t)), n = Math.max(1, Math.round(e.naturalHeight * t)), r = document.createElement("canvas");
  r.width = i, r.height = n;
  const s = r.getContext("2d", { willReadFrequently: !0 });
  if (!s) throw new Error("Canvas 2D is unavailable.");
  s.clearRect(0, 0, i, n), s.drawImage(e, 0, 0, i, n);
  const a = s.getImageData(0, 0, i, n).data;
  for (let o = 3; o < a.length; o += 4) if (a[o] < 255) return !0;
  return !1;
}
async function Id(e) {
  const t = e.fontFamily ?? "Arial Rounded MT Bold, Arial Black, sans-serif", i = e.fontWeight ?? 900, n = e.richText?.blocks.filter((d) => d.runs.length);
  if (n?.length) {
    const d = document.createElement("canvas").getContext("2d");
    if (!d) throw new Error("Canvas 2D is unavailable.");
    const R = 128, T = (W) => {
      const H = n.map((B) => {
        let q = 0, N = 0, J = 0, ee = 0;
        const te = B.runs.map((Se) => {
          const We = bt((Se.fontSize ?? 28) * W, 24, 720);
          ee = Math.max(ee, We);
          const Ye = Se.fontWeight ?? i;
          d.font = `${Ye} ${We}px ${t}`;
          const Y = d.measureText(Se.text || " "), re = Y.actualBoundingBoxAscent || Math.max(We * 0.76, 1), de = Y.actualBoundingBoxDescent || Math.max(We * 0.2, 1), ue = Se.text ? Y.width : 0;
          return q += ue, N = Math.max(N, re), J = Math.max(J, de), {
            ...Se,
            fontSize: We,
            fontWeight: Ye,
            width: ue
          };
        }), he = ee || 28 * W;
        return (!te.length || N + J < 1) && (N = he * 0.76, J = he * 0.24), {
          align: B.align ?? "center",
          runs: te,
          width: q,
          ascent: N,
          descent: J,
          height: Math.max(N + J, he) * bt(B.lineHeight ?? 1.2, 0.7, 3)
        };
      });
      return {
        lines: H,
        contentWidth: Math.max(1, ...H.map((B) => B.width)),
        contentHeight: H.reduce((B, q) => B + q.height, 0)
      };
    };
    let A = 8, y = T(A);
    const b = 1240 / Math.max(y.contentWidth, 1), P = 1280 / Math.max(y.contentHeight, 1);
    if ((b < 1 || P < 1) && (A *= Math.min(b, P), y = T(A)), document.fonts?.load) {
      const W = /* @__PURE__ */ new Set();
      for (const H of y.lines) for (const B of H.runs) W.add(`${B.fontWeight} ${B.fontSize}px ${t}`);
      await Promise.all([...W].map((H) => document.fonts.load(H).catch(() => []))), y = T(A);
    }
    const v = bt(Math.ceil(y.contentWidth + R * 2), _i, Ci), E = bt(Math.ceil(y.contentHeight + R * 2), _i, Ci), X = document.createElement("canvas");
    X.width = v, X.height = E;
    const w = X.getContext("2d", { willReadFrequently: !0 });
    if (!w) throw new Error("Canvas 2D is unavailable.");
    w.clearRect(0, 0, v, E), w.textBaseline = "alphabetic";
    let G = (E - y.contentHeight) / 2;
    for (const W of y.lines) {
      const H = W.align === "left" ? R : W.align === "right" ? v - R - W.width : (v - W.width) / 2, B = G + (W.height - W.ascent - W.descent) / 2 + W.ascent;
      let q = H;
      for (const N of W.runs) {
        if (w.font = `${N.fontWeight} ${N.fontSize}px ${t}`, w.fillStyle = N.color ?? e.color ?? "#19191d", w.fillText(N.text, q, B), N.underline && N.width > 0) {
          const J = Math.max(2, N.fontSize * 0.045);
          w.fillRect(q, B + Math.max(2, N.fontSize * 0.07), N.width, J);
        }
        q += N.width;
      }
      G += W.height;
    }
    return X;
  }
  const r = i;
  let s = 300;
  const a = document.createElement("canvas").getContext("2d");
  if (!a) throw new Error("Canvas 2D is unavailable.");
  if (document.fonts?.load) try {
    await document.fonts.load(`${r} ${s}px ${t}`);
  } catch {
  }
  const o = e.text || " ";
  a.font = `${r} ${s}px ${t}`;
  let c = a.measureText(o);
  const l = Math.max(1, c.width);
  l > 1240 && (s *= 1240 / l, a.font = `${r} ${s}px ${t}`, c = a.measureText(o));
  const h = c.actualBoundingBoxAscent || Math.max(s * 0.76, 1), f = c.actualBoundingBoxDescent || Math.max(s * 0.2, 1), u = 128, m = bt(Math.ceil(c.width + u * 2), _i, Ci), M = bt(Math.ceil(h + f + u * 2), _i, 960), S = document.createElement("canvas");
  S.width = m, S.height = M;
  const p = S.getContext("2d", { willReadFrequently: !0 });
  if (!p) throw new Error("Canvas 2D is unavailable.");
  return p.clearRect(0, 0, m, M), p.font = `${r} ${s}px ${t}`, p.textBaseline = "alphabetic", p.textAlign = "center", p.fillStyle = e.color ?? "#19191d", p.fillText(o, m / 2, (M + h - f) / 2), S;
}
async function Ud(e) {
  const t = Rd(e.svg), i = Cd(t), n = 1210, r = 128, s = i >= 1 ? n : n * i, a = i >= 1 ? n / i : n, o = bt(Math.ceil(s + r * 2), _i, Ci), c = bt(Math.ceil(a + r * 2), _i, Ci), l = document.createElement("canvas");
  l.width = o, l.height = c;
  const h = l.getContext("2d", { willReadFrequently: !0 });
  if (!h) throw new Error("Canvas 2D is unavailable.");
  const f = await Pd(t);
  return h.drawImage(f, r, r, o - r * 2, c - r * 2), l;
}
async function Nd(e) {
  const t = await Ld(e.src), i = Dd(t), n = bt(t.naturalWidth / t.naturalHeight, 0.15, 8), r = 1210, s = 128, a = n >= 1 ? r : r * n, o = n >= 1 ? r / n : r, c = bt(Math.ceil(a + s * 2), _i, Ci), l = bt(Math.ceil(o + s * 2), _i, Ci), h = document.createElement("canvas");
  h.width = c, h.height = l;
  const f = h.getContext("2d", { willReadFrequently: !0 });
  if (!f) throw new Error("Canvas 2D is unavailable.");
  return f.clearRect(0, 0, c, l), f.drawImage(t, s, s, c - s * 2, l - s * 2), {
    canvas: h,
    hasTransparency: i
  };
}
function Vd(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d");
  if (!n) throw new Error("Canvas 2D is unavailable.");
  return n.fillStyle = t, n.fillRect(0, 0, i.width, i.height), n.globalCompositeOperation = "destination-in", n.drawImage(e, 0, 0), i;
}
function Fd(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d", { willReadFrequently: !0 });
  if (!n) throw new Error("Canvas 2D is unavailable.");
  const r = bt(t.width * 2.35, 0, 112);
  if (r > 0.25) {
    const s = Vd(e, t.color), a = Math.max(1, Math.min(12, Math.ceil(r / 7))), o = r > 48 ? 32 : 24;
    for (let c = 1; c <= a; c += 1) {
      const l = r * c / a;
      for (let h = 0; h < o; h += 1) {
        const f = h / o * Math.PI * 2;
        n.drawImage(s, Math.cos(f) * l, Math.sin(f) * l);
      }
    }
  }
  return n.drawImage(e, 0, 0), i;
}
async function Od(e, t) {
  const i = e.type === "image" ? await Nd(e) : {
    canvas: e.type === "text" ? await Id(e) : await Ud(e),
    hasTransparency: !0
  }, n = i.canvas, r = Fd(n, t), s = r.getContext("2d", { willReadFrequently: !0 });
  if (!s) throw new Error("Canvas 2D is unavailable.");
  const a = s.getImageData(0, 0, r.width, r.height), o = new Uint8ClampedArray(r.width * r.height);
  for (let h = 3, f = 0; h < a.data.length; h += 4)
    o[f] = a.data[h], f += 1;
  const c = [], l = 0.1 * 255;
  for (let h = 0; h < r.height; h += 1) {
    const f = h * r.width;
    let u = -1, m = -1;
    for (let S = 0; S < r.width; S += 1)
      o[f + S] < l || (u < 0 && (u = S), m = S);
    if (u < 0) continue;
    const M = h / Math.max(r.height - 1, 1);
    c.push(u / Math.max(r.width - 1, 1), M), m !== u && c.push(m / Math.max(r.width - 1, 1), M);
  }
  return {
    canvas: r,
    width: r.width,
    height: r.height,
    aspect: r.width / r.height,
    alpha: o,
    support: new Float32Array(c),
    hasTransparency: i.hasTransparency
  };
}
var Bd = {
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
    release: "snap"
  },
  back: {
    color: "#f7f5f2",
    gloss: 0.7,
    roughness: 0.3
  },
  sound: {
    src: "",
    volume: 0.7,
    enabled: !0
  },
  tilt: -3,
  wind: 0.25,
  quality: "high"
};
function wa(e, t = {}) {
  const i = e ?? Bd;
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
    sound: {
      ...i.sound,
      ...t.sound
    },
    tilt: t.tilt ?? i.tilt,
    wind: t.wind ?? i.wind,
    quality: t.quality ?? i.quality
  };
}
var Ri = {
  type: "text",
  text: `PEEL ME
@cats_juice`,
  color: "#19191d",
  fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
  fontWeight: 900,
  richText: { blocks: [{
    align: "center",
    lineHeight: 1.2,
    runs: [{
      text: "PEEL ",
      color: "#19191d",
      fontSize: 28,
      fontWeight: 900
    }, {
      text: "ME",
      color: "rgb(36, 126, 245)",
      fontSize: 28,
      fontWeight: 900
    }]
  }, {
    align: "center",
    lineHeight: 0.8,
    runs: [{
      text: "@cats_juice",
      color: "#19191d",
      fontSize: 10,
      fontWeight: 500
    }]
  }] }
}, Ra = 2.55, kd = Math.PI, zd = 1.28, Gd = 4e-3, Hd = -0.22, Wd = 0.74, Xd = 760, qd = 520, Yd = 0.72, Kd = 0.06, Zd = 0.42, Jd = 0.9, Qd = "#615cff";
function nt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Ca(e, t, i) {
  const n = nt((i - e) / (t - e), 0, 1);
  return n * n * (3 - 2 * n);
}
function Ti(e, t) {
  try {
    return new ke(e);
  } catch {
    return new ke(t);
  }
}
function Pa(e, t) {
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
    },
    sound: {
      ...e.sound,
      ...t.sound
    }
  };
}
var jd = class {
  constructor(e, t = {}) {
    this.camera = new pr(-1, 1, 1, -1, 0.01, 10), this.scene = new rc(), this.peelAudio = new wd(), this.groundShadowGeometry = new En(1, 1), this.peelShadowLight = new Oc(16777215, 1), this.peelShadowTarget = new Lt(), this.geometry = new En(1, 1, 2, 2), this.texture = null, this.artwork = null, this.source = Ri, this.requestedSource = Ri, this.sourceRevision = 0, this.sourceRebuildTimer = null, this.destroyed = !1, this.resizeObserver = null, this.viewWidth = 2, this.viewHeight = 2, this.viewportHeightPx = 420, this.meshWidth = 1.6, this.meshHeight = 0.62, this.pointerId = null, this.grabOrigin = new Ie(-0.8, 0), this.grabStart = new Ie(), this.grabDirection = new Ie(1, 0), this.activeDirection = new Ie(1, 0), this.grabExtent = 1.6, this.creaseDepth = 0, this.basePeelRadius = 0.08, this.effectivePeelRadius = 0.08, this.grabProjection = 0, this.springVelocity = 0, this.springActive = !1, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.entranceAxis = new Ie(1, 0), this.frameRequest = 0, this.lastFrameTime = 0, this.state = {
      ready: !1,
      dragging: !1,
      progress: 0,
      grabPoint: null,
      pointer: null
    }, this.resize = () => {
      if (this.destroyed) return;
      const r = this.container.getBoundingClientRect(), s = Math.max(2, Math.round(r.width || 640)), a = Math.max(2, Math.round(r.height || 420)), o = this.options.quality === "low" ? 1.25 : 2;
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, o)), this.renderer.setSize(s, a, !1), this.viewportHeightPx = a, this.viewHeight = 2, this.viewWidth = s / a * this.viewHeight, this.groundShadowMesh.scale.set(this.viewWidth * 1.2, this.viewHeight * 1.2, 1), this.camera.left = -this.viewWidth / 2, this.camera.right = this.viewWidth / 2, this.camera.top = this.viewHeight / 2, this.camera.bottom = -this.viewHeight / 2, this.camera.updateProjectionMatrix();
      const c = this.peelShadowLight.shadow.camera, l = Math.max(this.viewWidth, this.viewHeight) * 0.9;
      c.left = -l, c.right = l, c.top = l, c.bottom = -l, c.near = 0.1, c.far = 16, c.updateProjectionMatrix(), this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.applyOptionsToRenderer(), this.requestRender();
    }, this.onPointerDown = (r) => {
      if (this.destroyed || !this.state.ready || this.detachedExitActive || this.entranceActive || r.button !== 0) return;
      const s = this.screenToLocal(r.clientX, r.clientY), a = this.hitEdge(s);
      if (!a) {
        this.startInteractionHint();
        return;
      }
      this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.uniforms.uInteractionHint.value = 0, r.preventDefault(), this.renderer.domElement.focus({ preventScroll: !0 }), this.renderer.domElement.setPointerCapture(r.pointerId), this.pointerId = r.pointerId, this.grabOrigin.copy(a.local), this.grabStart.copy(a.local), this.grabDirection.copy(a.inward), this.activeDirection.copy(a.inward), this.grabExtent = this.projectionExtent(this.grabOrigin, this.grabDirection), this.setCreaseDepth(0), this.springActive = !1, this.springVelocity = 0, this.state.dragging = !0, this.state.grabPoint = {
        x: a.local.x,
        y: a.local.y
      }, this.state.pointer = {
        x: s.x,
        y: s.y
      }, this.renderer.domElement.style.cursor = "grabbing", this.peelAudio.unlock(), this.peelAudio.begin(this.state.progress, r.timeStamp), this.updatePeelUniforms(), this.emit("peelstart", {
        amount: this.state.progress,
        progress: this.state.progress,
        origin: this.state.grabPoint
      }), this.requestRender();
    }, this.onPointerMove = (r) => {
      if (this.destroyed || !this.state.ready) return;
      if (this.state.dragging && r.pointerId === this.pointerId && r.buttons === 0) {
        this.finishPointerDrag(r.timeStamp);
        return;
      }
      const s = this.screenToLocal(r.clientX, r.clientY);
      if (!this.state.dragging || r.pointerId !== this.pointerId) {
        this.renderer.domElement.style.cursor = this.hitEdge(s) ? "grab" : "default";
        return;
      }
      r.preventDefault();
      const a = s.clone().sub(this.grabStart), o = a.length();
      let c = 0;
      if (o > Gd) {
        const l = a.clone().normalize();
        l.dot(this.grabDirection) >= Hd ? (this.activeDirection.copy(l), c = o) : (this.activeDirection.copy(this.grabDirection), c = Math.max(0, a.dot(this.grabDirection)));
      } else this.activeDirection.copy(this.grabDirection);
      this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), this.setCreaseDepth(this.solveCreaseDepth(c)), this.peelAudio.update(this.state.progress, r.timeStamp, this.activeDirection.x), this.state.pointer = {
        x: s.x,
        y: s.y
      }, this.updatePeelUniforms(), this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress,
        direction: {
          x: this.activeDirection.x,
          y: this.activeDirection.y
        }
      }), this.requestRender();
    }, this.onPointerUp = (r) => {
      !this.state.dragging || r.pointerId !== this.pointerId || this.finishPointerDrag(r.timeStamp);
    }, this.onWindowPointerEnd = (r) => {
      !this.state.dragging || r.pointerId !== this.pointerId || this.finishPointerDrag(r.timeStamp);
    }, this.onLostPointerCapture = (r) => {
      !this.state.dragging || r.pointerId !== this.pointerId || this.finishPointerDrag(r.timeStamp);
    }, this.onWindowBlur = () => {
      this.finishPointerDrag(performance.now());
    }, this.onVisibilityChange = () => {
      document.visibilityState === "hidden" && this.finishPointerDrag(performance.now());
    }, this.onPointerLeave = () => {
      this.state.dragging || (this.renderer.domElement.style.cursor = "default");
    }, this.onKeyDown = (r) => {
      if (!this.state.ready) return;
      const s = r.key === "ArrowUp" || r.key === "ArrowRight", a = r.key === "ArrowDown" || r.key === "ArrowLeft";
      if (!s && !a && r.key !== " ") return;
      if (r.preventDefault(), this.peelAudio.unlock(), r.key === " ") {
        this.reset();
        return;
      }
      this.grabOrigin.set(-this.meshWidth / 2, 0), this.activeDirection.set(1, 0), this.grabDirection.copy(this.activeDirection), this.grabExtent = this.meshWidth;
      const o = this.state.progress, c = nt(o + (s ? 0.08 : -0.08), 0, 1);
      this.setCreaseDepth(c * this.grabExtent), this.peelAudio.begin(o, r.timeStamp - 72), this.peelAudio.update(this.state.progress, r.timeStamp, this.activeDirection.x), this.peelAudio.end(this.state.progress), this.state.pointer = {
        x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
        y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
      }, this.updatePeelUniforms(), this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress
      }), this.requestRender();
    }, this.onContextLost = (r) => {
      r.preventDefault(), this.emit("error", { message: "The WebGL context was lost. Reload the page to restore the sticker." });
    }, this.renderFrame = (r) => {
      if (this.frameRequest = 0, this.destroyed) return;
      const s = this.lastFrameTime ? Math.min((r - this.lastFrameTime) / 1e3, 1 / 20) : 1 / 60;
      this.lastFrameTime = r;
      const a = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (this.springActive && a) {
        this.reset();
        return;
      }
      if (this.springActive) {
        const c = 132 + nt(this.options.peel.stiffness, 0, 1) * 146, l = Math.sqrt(c) * 1.83, h = -c * this.creaseDepth - l * this.springVelocity;
        this.springVelocity += h * s;
        const f = this.creaseDepth + this.springVelocity * s;
        f <= this.grabExtent * 8e-4 && Math.abs(this.springVelocity) < this.grabExtent * 0.018 ? (this.setCreaseDepth(0), this.springVelocity = 0, this.springActive = !1, this.state.pointer = null, this.state.grabPoint = null) : (this.setCreaseDepth(Math.max(0, f)), this.state.pointer = {
          x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
          y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
        }), this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      }
      if (this.detachedExitActive) {
        this.detachedExitElapsed += s;
        const c = Math.max(this.viewWidth, this.viewHeight) * (1.45 + this.detachedExitElapsed * 3.2);
        if (this.stickerMesh.position.x += this.activeDirection.x * c * s, this.stickerMesh.position.y += this.activeDirection.y * c * s, this.stickerMesh.rotation.z += this.detachedExitSpin * s, this.detachedExitElapsed >= 0.46) {
          this.startEntranceAnimation();
          return;
        }
      }
      if (this.entranceActive) {
        this.entranceElapsed += s;
        const c = nt(this.entranceElapsed / Yd, 0, 1);
        this.uniforms.uEntranceScaleProgress.value = c;
        const l = Kd, h = nt((this.entranceElapsed - l) / Zd, 0, 1);
        this.uniforms.uEntranceSweep.value = this.entranceElapsed < l ? -1 : h, c >= 1 && h >= 1 && (this.entranceActive = !1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uEntranceSweep.value = -1);
      }
      if (this.interactionHintActive) {
        this.interactionHintElapsed += s;
        const c = nt(this.interactionHintElapsed / Jd, 0, 1);
        if (a) this.uniforms.uInteractionHint.value = c < 0.72 ? 1 : 0;
        else {
          const l = Ca(0, 0.12, c), h = 1 - Ca(0.58, 1, c), f = 0.9 + Math.sin(c * Math.PI * 2) * 0.1;
          this.uniforms.uInteractionHint.value = l * h * f;
        }
        c >= 1 && (this.interactionHintActive = !1, this.uniforms.uInteractionHint.value = 0);
      }
      this.uniforms.uTime.value = r / 1e3, this.renderer.render(this.scene, this.camera);
      const o = !a && this.options.wind > 1e-3 && this.state.progress > 0.01;
      (this.springActive || this.detachedExitActive || this.entranceActive || this.interactionHintActive || o) && this.requestRender();
    }, this.container = e, this.options = wa(void 0, t), this.camera.position.z = 3, this.renderer = new dd({
      alpha: !0,
      antialias: !0,
      powerPreference: "high-performance",
      premultipliedAlpha: !0
    }), this.renderer.setClearColor(0, 0), this.renderer.outputColorSpace = Pt, this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = 1, this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.cursor = "default", this.renderer.domElement.tabIndex = 0, this.renderer.domElement.setAttribute("role", "slider"), this.renderer.domElement.setAttribute("aria-valuemin", "0"), this.renderer.domElement.setAttribute("aria-valuemax", "100"), this.renderer.domElement.setAttribute("aria-valuenow", "0"), this.renderer.domElement.setAttribute("aria-label", "Interactive sticker. Drag a visible edge, or use arrow keys to preview the peel."), this.renderer.domElement.setAttribute("aria-keyshortcuts", "ArrowUp ArrowRight ArrowDown ArrowLeft Space"), e.appendChild(this.renderer.domElement), this.uniforms = {
      uMap: { value: null },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
      uRadius: { value: 0.08 },
      uMaxAngle: { value: 3.55 },
      uWind: { value: this.options.wind },
      uTime: { value: 0 },
      uOrigin: { value: this.grabOrigin.clone() },
      uPeelDir: { value: this.activeDirection.clone() },
      uMeshSize: { value: new Ie(this.meshWidth, this.meshHeight) },
      uTexel: { value: new Ie(1 / 1024, 1 / 512) },
      uBackColor: { value: Ti(this.options.back.color, "#f7f5f2") },
      uGloss: { value: this.options.back.gloss },
      uRoughness: { value: this.options.back.roughness },
      uShadowColor: { value: Ti(this.options.shadow.color, "#191823") },
      uShadowOpacity: { value: this.options.shadow.opacity },
      uShadowBlur: { value: this.options.shadow.blur },
      uShadowDistance: { value: 0.04 },
      uShadowDirection: { value: new Ie(0.7, -0.7) },
      uEntranceSweep: { value: -1 },
      uEntranceAxis: { value: this.entranceAxis.clone() },
      uEntranceScaleProgress: { value: -1 },
      uInteractionHint: { value: 0 },
      uInteractionHintColor: { value: Ti(Qd, "#615cff") }
    };
    const i = {
      ...ho.clone(ae.lights),
      ...this.uniforms
    };
    this.stickerMaterial = new Vt({
      uniforms: i,
      vertexShader: fd,
      fragmentShader: pd,
      lights: !0,
      side: 2,
      transparent: !0,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMaterial.alphaTest = 8e-3, this.stickerMesh = new Ht(this.geometry, this.stickerMaterial), this.stickerMesh.renderOrder = 20, this.stickerMesh.receiveShadow = !0, this.peelShadowDepthMaterial = new Vt({
      uniforms: { ...this.uniforms },
      vertexShader: md,
      fragmentShader: gd,
      side: 2,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMesh.castShadow = !0, this.stickerMesh.customDepthMaterial = this.peelShadowDepthMaterial, this.peelShadowLight.castShadow = !0, this.peelShadowLight.shadow.mapSize.set(this.options.quality === "high" ? 2048 : 1024, this.options.quality === "high" ? 2048 : 1024), this.peelShadowLight.shadow.bias = -1e-4, this.peelShadowLight.shadow.normalBias = 15e-4, this.peelShadowLight.target = this.peelShadowTarget, this.scene.add(this.peelShadowTarget, this.peelShadowLight), this.groundShadowMaterial = new vc({
      color: Ti(this.options.shadow.color, "#191823"),
      opacity: this.options.shadow.opacity,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }), this.groundShadowMesh = new Ht(this.groundShadowGeometry, this.groundShadowMaterial), this.groundShadowMesh.position.z = -0.012, this.groundShadowMesh.receiveShadow = !0, this.groundShadowMesh.renderOrder = 5, this.scene.add(this.groundShadowMesh), this.scene.add(this.stickerMesh);
    const n = this.renderer.domElement;
    n.addEventListener("pointerdown", this.onPointerDown), n.addEventListener("pointermove", this.onPointerMove), n.addEventListener("pointerup", this.onPointerUp), n.addEventListener("pointercancel", this.onPointerUp), n.addEventListener("lostpointercapture", this.onLostPointerCapture), n.addEventListener("pointerleave", this.onPointerLeave), n.addEventListener("keydown", this.onKeyDown), n.addEventListener("webglcontextlost", this.onContextLost), window.addEventListener("pointerup", this.onWindowPointerEnd, !0), window.addEventListener("pointercancel", this.onWindowPointerEnd, !0), window.addEventListener("blur", this.onWindowBlur), document.addEventListener("visibilitychange", this.onVisibilityChange), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(e)) : window.addEventListener("resize", this.resize), this.resize(), this.applyOptionsToRenderer();
  }
  async setSource(e) {
    if (this.destroyed) return;
    this.requestedSource = e, this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null);
    const t = ++this.sourceRevision;
    try {
      const i = await Od(e, this.options.outline);
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
    this.options = wa(this.options, e), this.applyOptionsToRenderer(), e.source && this.setSource(e.source).catch(() => {
    }), e.outline && (this.options.outline.width !== t.width || this.options.outline.color !== t.color) && !e.source && (this.sourceRebuildTimer !== null && window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = window.setTimeout(() => {
      this.sourceRebuildTimer = null, this.setSource(this.requestedSource).catch(() => {
      });
    }, 70)), this.options.quality !== i && this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.requestRender();
  }
  reset() {
    const e = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, e !== null && this.renderer.domElement.hasPointerCapture(e) && this.renderer.domElement.releasePointerCapture(e), this.springActive = !1, this.springVelocity = 0, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = Fi.degToRad(this.options.tilt), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uInteractionHint.value = 0, this.peelAudio.reset(0), this.setCreaseDepth(0), this.state.pointer = null, this.state.grabPoint = null, this.renderer.domElement.style.cursor = "default", this.updatePeelUniforms(), this.emit("peelchange", {
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
    e.removeEventListener("pointerdown", this.onPointerDown), e.removeEventListener("pointermove", this.onPointerMove), e.removeEventListener("pointerup", this.onPointerUp), e.removeEventListener("pointercancel", this.onPointerUp), e.removeEventListener("lostpointercapture", this.onLostPointerCapture), e.removeEventListener("pointerleave", this.onPointerLeave), e.removeEventListener("keydown", this.onKeyDown), e.removeEventListener("webglcontextlost", this.onContextLost), window.removeEventListener("pointerup", this.onWindowPointerEnd, !0), window.removeEventListener("pointercancel", this.onWindowPointerEnd, !0), window.removeEventListener("blur", this.onWindowBlur), document.removeEventListener("visibilitychange", this.onVisibilityChange), this.texture?.dispose(), this.geometry.dispose(), this.groundShadowGeometry.dispose(), this.stickerMaterial.dispose(), this.peelShadowDepthMaterial.dispose(), this.groundShadowMaterial.dispose(), this.peelAudio.destroy(), this.renderer.dispose(), this.renderer.forceContextLoss(), e.remove();
  }
  applyArtwork(e) {
    this.artwork = e;
    const t = new mc(e.canvas);
    t.colorSpace = Pt, t.minFilter = yt, t.magFilter = yt, t.generateMipmaps = !0, t.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy()), t.needsUpdate = !0;
    const i = this.texture;
    this.texture = t, this.uniforms.uMap.value = t, this.uniforms.uTexel.value.set(1 / e.width, 1 / e.height), this.updateMeshGeometry(e.aspect), this.reset(), this.state.ready = !0, i?.dispose(), this.emit("ready", {
      width: e.width,
      height: e.height,
      hasTransparency: e.hasTransparency
    });
  }
  updateMeshGeometry(e) {
    const t = this.viewHeight / Math.max(1, this.viewportHeightPx), i = Math.min(this.viewWidth * 0.78, Xd * t), n = Math.min(this.viewHeight * 0.58, qd * t);
    let r = i, s = r / e;
    s > n && (s = n, r = s * e), this.meshWidth = Math.max(0.34, r), this.meshHeight = Math.max(0.25, s);
    const a = this.options.quality === "high" ? 240 : this.options.quality === "medium" ? 160 : 96, o = nt(Math.round(a), 64, 256), c = nt(Math.round(a / Math.max(e, 0.35)), 56, 192), l = new En(this.meshWidth, this.meshHeight, o, c), h = this.geometry;
    this.geometry = l, this.stickerMesh.geometry = l, h.dispose(), this.uniforms.uMeshSize.value.set(this.meshWidth, this.meshHeight), this.grabOrigin.set(-this.meshWidth / 2, 0), this.grabDirection.set(1, 0), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.meshWidth, this.setCreaseDepth(0), this.applyOptionsToRenderer(), this.updatePeelUniforms();
  }
  applyOptionsToRenderer() {
    const e = Fi.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = e, this.uniforms.uBackColor.value = Ti(this.options.back.color, "#f7f5f2"), this.uniforms.uGloss.value = nt(this.options.back.gloss, 0, 1), this.uniforms.uRoughness.value = nt(this.options.back.roughness, 0, 1), this.uniforms.uWind.value = Math.max(0, this.options.wind);
    const t = this.options.sound.src.trim();
    this.peelAudio.configure({
      enabled: this.options.sound.enabled,
      src: t || _d,
      volume: this.options.sound.volume,
      useBuiltInProfile: !t
    });
    const i = this.options.peel.maxAngle, n = i > Math.PI * 2 ? Fi.degToRad(i) : i;
    this.uniforms.uMaxAngle.value = nt(n, Ra, kd);
    const r = this.options.peel.radius, s = this.container.getBoundingClientRect(), a = r <= 1 ? Math.max(8e-3, Math.min(this.meshWidth, this.meshHeight) * r) : Math.max(8e-3, r / Math.max(s.height, 1) * this.viewHeight);
    this.basePeelRadius = a * Fi.lerp(0.82, 1.16, nt(this.options.peel.stiffness, 0, 1)), this.setCreaseDepth(this.creaseDepth), this.uniforms.uShadowColor.value = Ti(this.options.shadow.color, "#191823"), this.uniforms.uShadowOpacity.value = nt(this.options.shadow.opacity, 0, 0.9), this.groundShadowMaterial.color.copy(Ti(this.options.shadow.color, "#191823")), this.groundShadowMaterial.opacity = nt(this.options.shadow.opacity, 0, 0.9);
    const o = this.meshWidth / Math.max(this.viewWidth, 1e-3) * Math.max(s.width, 1), c = this.artwork ? this.artwork.width / Math.max(o, 1) : 1;
    this.uniforms.uShadowBlur.value = Math.max(0, this.options.shadow.blur) * c * 0.34, this.uniforms.uShadowDistance.value = Math.max(0, this.options.shadow.distance) / Math.max(s.width || 1, 1) * this.viewWidth;
    const l = Fi.degToRad(this.options.shadow.angle), h = this.uniforms.uShadowDirection.value;
    h.set(Math.cos(l), -Math.sin(l)).normalize();
    const f = 1.6 + this.uniforms.uShadowDistance.value * 34;
    this.peelShadowLight.position.set(-h.x * f, -h.y * f, 4.8), this.peelShadowTarget.position.set(0, 0, 0), this.peelShadowLight.shadow.radius = nt(this.options.shadow.blur * 0.18, 1, 7);
    const u = this.options.quality === "high" ? 2048 : 1024;
    this.peelShadowLight.shadow.mapSize.set(u, u), this.peelShadowLight.shadow.needsUpdate = !0;
  }
  updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress, this.uniforms.uPeelDepth.value = this.creaseDepth, this.uniforms.uRadius.value = this.effectivePeelRadius, this.uniforms.uOrigin.value.copy(this.grabOrigin), this.uniforms.uPeelDir.value.copy(this.activeDirection);
    const e = Math.round(nt(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(e)), this.renderer.domElement.setAttribute("aria-valuetext", `${e}% peeled`);
  }
  projectedGrabDistance(e, t, i = this.uniforms.uMaxAngle.value) {
    if (e <= 0) return 0;
    const n = Math.max(t, 1e-3), r = Math.min(e / n, i), s = n * i;
    let a = -n * Math.sin(r);
    return e > s && (a -= (e - s) * Math.cos(i)), Math.max(0, e + a);
  }
  peelModelForDepth(e) {
    const t = nt(e, 0, Math.max(this.grabExtent, 1e-3));
    if (t <= 1e-6) return {
      depth: 0,
      radius: this.basePeelRadius,
      projection: 0
    };
    const i = this.projectedGrabDistance(t, this.basePeelRadius);
    if (i >= t / zd) return {
      depth: t,
      radius: this.basePeelRadius,
      projection: i
    };
    const n = t / Ra;
    return {
      depth: t,
      radius: n,
      projection: this.projectedGrabDistance(t, n)
    };
  }
  setCreaseDepth(e) {
    const t = this.peelModelForDepth(e);
    this.creaseDepth = t.depth, this.effectivePeelRadius = t.radius, this.grabProjection = t.projection, this.state.progress = nt(this.creaseDepth / Math.max(this.grabExtent, 1e-3), 0, 1);
  }
  solveCreaseDepth(e) {
    const t = Math.max(0, e), i = this.peelModelForDepth(this.grabExtent);
    if (t >= i.projection) return i.depth;
    if (t <= 1e-6) return 0;
    let n = 0, r = this.grabExtent;
    for (let s = 0; s < 16; s += 1) {
      const a = (n + r) * 0.5;
      this.peelModelForDepth(a).projection < t ? n = a : r = a;
    }
    return (n + r) * 0.5;
  }
  screenToLocal(e, t) {
    const i = this.renderer.domElement.getBoundingClientRect(), n = (e - i.left) / Math.max(i.width, 1) * 2 - 1, r = 1 - (t - i.top) / Math.max(i.height, 1) * 2, s = n * (this.viewWidth / 2), a = r * (this.viewHeight / 2), o = -Fi.degToRad(this.options.tilt), c = Math.cos(o), l = Math.sin(o);
    return new Ie(s * c - a * l, s * l + a * c);
  }
  sampleAlpha(e, t) {
    if (!this.artwork) return 0;
    const i = nt(Math.round(e), 0, this.artwork.width - 1), n = nt(Math.round(t), 0, this.artwork.height - 1);
    return this.artwork.alpha[n * this.artwork.width + i] / 255;
  }
  hitEdge(e) {
    if (!this.artwork) return null;
    const t = e.x / this.meshWidth + 0.5, i = e.y / this.meshHeight + 0.5;
    if (t < -0.04 || t > 1.04 || i < -0.04 || i > 1.04) return null;
    const n = t * (this.artwork.width - 1), r = (1 - i) * (this.artwork.height - 1), s = this.renderer.domElement.getBoundingClientRect(), a = this.meshWidth / Math.max(this.viewWidth, 1e-3) * s.width, o = this.artwork.width / Math.max(a, 1), c = nt(this.options.peel.grabWidth * o, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13), l = Math.ceil(c), h = Math.max(0, Math.floor(n - l)), f = Math.min(this.artwork.width - 1, Math.ceil(n + l)), u = Math.max(0, Math.floor(r - l)), m = Math.min(this.artwork.height - 1, Math.ceil(r + l));
    let M = -1, S = -1, p = c * c + 1;
    for (let A = u; A <= m; A += 1) for (let y = h; y <= f; y += 1) {
      const b = y - n, P = A - r, v = b * b + P * P;
      if (v >= p || v > c * c) continue;
      const E = this.sampleAlpha(y, A);
      E < 0.1 || (E < 0.9 || this.sampleAlpha(y - 1, A) < 0.1 || this.sampleAlpha(y + 1, A) < 0.1 || this.sampleAlpha(y, A - 1) < 0.1 || this.sampleAlpha(y, A + 1) < 0.1) && (M = y, S = A, p = v);
    }
    if (M < 0 || S < 0) return null;
    const d = new Ie((M / Math.max(this.artwork.width - 1, 1) - 0.5) * this.meshWidth, (0.5 - S / Math.max(this.artwork.height - 1, 1)) * this.meshHeight), R = nt(c * 0.14, 1.5, 4.5), T = new Ie(this.sampleAlpha(M + R, S) - this.sampleAlpha(M - R, S), -(this.sampleAlpha(M, S + R) - this.sampleAlpha(M, S - R)));
    return T.lengthSq() < 8e-3 && T.set(-d.x, -d.y), T.lengthSq() < 1e-4 && T.set(1, 0), T.normalize(), {
      local: d,
      inward: T
    };
  }
  projectionExtent(e, t) {
    if (!this.artwork) return Math.max(this.meshHeight * 0.35, this.meshWidth);
    let i = this.meshHeight * 0.35;
    for (let n = 0; n < this.artwork.support.length; n += 2) {
      const r = (this.artwork.support[n] - 0.5) * this.meshWidth, s = (0.5 - this.artwork.support[n + 1]) * this.meshHeight;
      i = Math.max(i, (r - e.x) * t.x + (s - e.y) * t.y);
    }
    return Math.max(this.meshHeight * 0.35, i + this.meshHeight * 0.025);
  }
  finishPointerDrag(e) {
    if (!this.state.dragging) return;
    const t = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, t !== null && this.renderer.domElement.hasPointerCapture(t) && this.renderer.domElement.releasePointerCapture(t), this.renderer.domElement.style.cursor = "grab";
    const i = this.options.peel.release, n = i === "snap" && this.state.progress >= Wd;
    n && (this.setCreaseDepth(this.grabExtent), this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
      y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
    }, this.updatePeelUniforms(), this.peelAudio.update(this.state.progress, e, this.activeDirection.x)), this.peelAudio.end(this.state.progress);
    const r = i === "reset" || i === "snap" && !n, s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (r && !s && (this.springActive = !0, this.springVelocity = 0), this.emit("peelend", {
      amount: this.state.progress,
      progress: this.state.progress,
      willReset: r
    }), n) {
      if (s) {
        this.reset();
        return;
      }
      this.detachedExitActive = !0, this.detachedExitElapsed = 0, this.detachedExitSpin = this.activeDirection.x >= 0 ? -0.42 : 0.42;
    }
    if (r && s) {
      this.reset();
      return;
    }
    this.requestRender();
  }
  requestRender() {
    this.destroyed || this.frameRequest || (this.frameRequest = requestAnimationFrame(this.renderFrame));
  }
  startInteractionHint() {
    this.interactionHintActive = !0, this.interactionHintElapsed = 0, this.uniforms.uInteractionHint.value = 1, this.requestRender();
  }
  startEntranceAnimation() {
    this.reset(), this.entranceActive = !0, this.entranceElapsed = 0, this.entranceAxis.set(this.meshWidth >= this.meshHeight ? 1 : 0, this.meshWidth >= this.meshHeight ? 0 : -1), this.uniforms.uEntranceAxis.value.copy(this.entranceAxis), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = 0, this.requestRender();
  }
  emit(e, t) {
    this.container.dispatchEvent(new CustomEvent(e, { detail: t }));
  }
};
async function $d(e, t = {}) {
  if (typeof document > "u") throw new Error("Sticker Forge can only be created in a browser.");
  const i = typeof e == "string" ? document.querySelector(e) : e;
  if (!i) throw new Error("Sticker Forge could not find its target element.");
  const n = new jd(i, t);
  return await n.setSource(t.source ?? Ri), n;
}
var ef = typeof HTMLElement > "u" ? class {
} : HTMLElement, La = class extends ef {
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
      ...Ri,
      text: this.getAttribute("text") || Ri.text
    }), this.ensureInstance().catch(() => {
    });
  }
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback(e, t, i) {
    if (e === "text" && t !== i) {
      const n = {
        ...Ri,
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
    this.pendingOptions = Pa(this.pendingOptions, e), this.instance?.setOptions(e);
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
    const e = Pa(this.pendingOptions, { source: this.pendingSource ?? Ri }), t = this.lifecycleRevision, i = $d(this.mountElement, e);
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
function tf(e = "sticker-forge") {
  if (!(typeof customElements > "u") && !customElements.get(e)) {
    const t = e === "sticker-forge" ? La : class extends La {
    };
    customElements.define(e, t);
  }
}
tf();
export {
  La as StickerForgeElement,
  $d as createSticker,
  tf as defineStickerForge,
  Rd as sanitizeSvgMarkup
};

//# sourceMappingURL=sticker-forge.es.js.map