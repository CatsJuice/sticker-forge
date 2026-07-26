var ta, ia, na, ra, sa, aa, oa, la, ca;
var fr = 1e3, ot = 1001, ur = 1002, Me = 1003, no = 1004, ro = 1005, xe = 1006, so = 1007, En = 1008, Et = 1009, ao = 1010, oo = 1011, ha = 1012, lo = 1013, bt = 1014, Bn = 1015, Rt = 1016, fa = 1017, ua = 1018, da = 1020, co = 35902, ho = 35899, fo = 1021, uo = 1022, Ti = 1023, bi = 1026, pa = 1027, po = 1028, ga = 1029, vn = 1030, va = 1031, ma = 1033, go = 33776, vo = 33777, mo = 33778, wo = 33779, Po = 35840, Do = 35841, Eo = 35842, Bo = 35843, Mo = 36196, Co = 37492, xo = 37496, _o = 37488, So = 37489, Io = 37490, yo = 37491, Qo = 37808, To = 37809, bo = 37810, Ro = 37811, Lo = 37812, Uo = 37813, Fo = 37814, No = 37815, zo = 37816, Oo = 37817, Ho = 37818, Vo = 37819, Go = 37820, ko = 37821, Wo = 36492, Xo = 36494, Yo = 36495, Ko = 36283, Jo = 36284, qo = 36285, jo = 36286, mn = 2300, dr = 2301, In = 2302, zr = 2303, Or = 2400, Hr = 2401, Vr = 2402, Zo = 3200;
var Qe = "srgb", pr = "srgb-linear", wn = "linear", Pn = "srgb", yn = 7680;
var $o = 35044;
var li = 2e3;
function Al(A) {
  for (let e = A.length - 1; e >= 0; --e) if (A[e] >= 65535) return !0;
  return !1;
}
function el(A) {
  return ArrayBuffer.isView(A) && !(A instanceof DataView);
}
function Dn(A) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", A);
}
function tl() {
  const A = Dn("canvas");
  return A.style.display = "block", A;
}
var Gr = {}, ci = null;
function kr(...A) {
  const e = "THREE." + A.shift();
  ci ? ci("log", e, ...A) : console.log(e, ...A);
}
function wa(A) {
  const e = A[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = A[1];
    t && t.isStackTrace ? A[0] += " " + t.getLocation() : A[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return A;
}
function MA(...A) {
  A = wa(A);
  const e = "THREE." + A.shift();
  if (ci) ci("warn", e, ...A);
  else {
    const t = A[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...A);
  }
}
function IA(...A) {
  A = wa(A);
  const e = "THREE." + A.shift();
  if (ci) ci("error", e, ...A);
  else {
    const t = A[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...A);
  }
}
function si(...A) {
  const e = A.join(" ");
  e in Gr || (Gr[e] = !0, MA(...A));
}
function il(A, e, t) {
  return new Promise(function(i, n) {
    function r() {
      switch (A.clientWaitSync(e, A.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case A.WAIT_FAILED:
          n();
          break;
        case A.TIMEOUT_EXPIRED:
          setTimeout(r, t);
          break;
        default:
          i();
      }
    }
    setTimeout(r, t);
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
}, Lt = class {
  addEventListener(A, e) {
    this._listeners === void 0 && (this._listeners = {});
    const t = this._listeners;
    t[A] === void 0 && (t[A] = []), t[A].indexOf(e) === -1 && t[A].push(e);
  }
  hasEventListener(A, e) {
    const t = this._listeners;
    return t === void 0 ? !1 : t[A] !== void 0 && t[A].indexOf(e) !== -1;
  }
  removeEventListener(A, e) {
    const t = this._listeners;
    if (t === void 0) return;
    const i = t[A];
    if (i !== void 0) {
      const n = i.indexOf(e);
      n !== -1 && i.splice(n, 1);
    }
  }
  dispatchEvent(A) {
    const e = this._listeners;
    if (e === void 0) return;
    const t = e[A.type];
    if (t !== void 0) {
      A.target = this;
      const i = t.slice(0);
      for (let n = 0, r = i.length; n < r; n++) i[n].call(this, A);
      A.target = null;
    }
  }
}, we = [
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
], Wr = 1234567, Ii = Math.PI / 180, Ri = 180 / Math.PI;
function ui() {
  const A = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (we[A & 255] + we[A >> 8 & 255] + we[A >> 16 & 255] + we[A >> 24 & 255] + "-" + we[e & 255] + we[e >> 8 & 255] + "-" + we[e >> 16 & 15 | 64] + we[e >> 24 & 255] + "-" + we[t & 63 | 128] + we[t >> 8 & 255] + "-" + we[t >> 16 & 255] + we[t >> 24 & 255] + we[i & 255] + we[i >> 8 & 255] + we[i >> 16 & 255] + we[i >> 24 & 255]).toLowerCase();
}
function NA(A, e, t) {
  return Math.max(e, Math.min(t, A));
}
function Pr(A, e) {
  return (A % e + e) % e;
}
function rl(A, e, t, i, n) {
  return i + (A - e) * (n - i) / (t - e);
}
function sl(A, e, t) {
  return A !== e ? (t - A) / (e - A) : 0;
}
function yi(A, e, t) {
  return (1 - t) * A + t * e;
}
function al(A, e, t, i) {
  return yi(A, e, 1 - Math.exp(-t * i));
}
function ol(A, e = 1) {
  return e - Math.abs(Pr(A, e * 2) - e);
}
function ll(A, e, t) {
  return A <= e ? 0 : A >= t ? 1 : (A = (A - e) / (t - e), A * A * (3 - 2 * A));
}
function cl(A, e, t) {
  return A <= e ? 0 : A >= t ? 1 : (A = (A - e) / (t - e), A * A * A * (A * (A * 6 - 15) + 10));
}
function hl(A, e) {
  return A + Math.floor(Math.random() * (e - A + 1));
}
function fl(A, e) {
  return A + Math.random() * (e - A);
}
function ul(A) {
  return A * (0.5 - Math.random());
}
function dl(A) {
  A !== void 0 && (Wr = A);
  let e = Wr += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function pl(A) {
  return A * Ii;
}
function gl(A) {
  return A * Ri;
}
function vl(A) {
  return (A & A - 1) === 0 && A !== 0;
}
function ml(A) {
  return Math.pow(2, Math.ceil(Math.log(A) / Math.LN2));
}
function wl(A) {
  return Math.pow(2, Math.floor(Math.log(A) / Math.LN2));
}
function Pl(A, e, t, i, n) {
  const r = Math.cos, s = Math.sin, a = r(t / 2), l = s(t / 2), o = r((e + i) / 2), c = s((e + i) / 2), f = r((e - i) / 2), h = s((e - i) / 2), p = r((i - e) / 2), m = s((i - e) / 2);
  switch (n) {
    case "XYX":
      A.set(a * c, l * f, l * h, a * o);
      break;
    case "YZY":
      A.set(l * h, a * c, l * f, a * o);
      break;
    case "ZXZ":
      A.set(l * f, l * h, a * c, a * o);
      break;
    case "XZX":
      A.set(a * c, l * m, l * p, a * o);
      break;
    case "YXY":
      A.set(l * p, a * c, l * m, a * o);
      break;
    case "ZYZ":
      A.set(l * m, l * p, a * c, a * o);
      break;
    default:
      MA("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + n);
  }
}
function Ai(A, e) {
  switch (e.constructor) {
    case Float32Array:
      return A;
    case Uint32Array:
      return A / 4294967295;
    case Uint16Array:
      return A / 65535;
    case Uint8Array:
      return A / 255;
    case Int32Array:
      return Math.max(A / 2147483647, -1);
    case Int16Array:
      return Math.max(A / 32767, -1);
    case Int8Array:
      return Math.max(A / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Ee(A, e) {
  switch (e.constructor) {
    case Float32Array:
      return A;
    case Uint32Array:
      return Math.round(A * 4294967295);
    case Uint16Array:
      return Math.round(A * 65535);
    case Uint8Array:
      return Math.round(A * 255);
    case Int32Array:
      return Math.round(A * 2147483647);
    case Int16Array:
      return Math.round(A * 32767);
    case Int8Array:
      return Math.round(A * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
var He = {
  DEG2RAD: Ii,
  RAD2DEG: Ri,
  generateUUID: ui,
  clamp: NA,
  euclideanModulo: Pr,
  mapLinear: rl,
  inverseLerp: sl,
  lerp: yi,
  damp: al,
  pingpong: ol,
  smoothstep: ll,
  smootherstep: cl,
  randInt: hl,
  randFloat: fl,
  randFloatSpread: ul,
  seededRandom: dl,
  degToRad: pl,
  radToDeg: gl,
  isPowerOfTwo: vl,
  ceilPowerOfTwo: ml,
  floorPowerOfTwo: wl,
  setQuaternionFromProperEuler: Pl,
  normalize: Ee,
  denormalize: Ai
};
oa = Symbol.iterator;
var bA = class {
  constructor(A = 0, e = 0) {
    this.x = A, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(A) {
    this.x = A;
  }
  get height() {
    return this.y;
  }
  set height(A) {
    this.y = A;
  }
  set(A, e) {
    return this.x = A, this.y = e, this;
  }
  setScalar(A) {
    return this.x = A, this.y = A, this;
  }
  setX(A) {
    return this.x = A, this;
  }
  setY(A) {
    return this.y = A, this;
  }
  setComponent(A, e) {
    switch (A) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + A);
    }
    return this;
  }
  getComponent(A) {
    switch (A) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + A);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(A) {
    return this.x = A.x, this.y = A.y, this;
  }
  add(A) {
    return this.x += A.x, this.y += A.y, this;
  }
  addScalar(A) {
    return this.x += A, this.y += A, this;
  }
  addVectors(A, e) {
    return this.x = A.x + e.x, this.y = A.y + e.y, this;
  }
  addScaledVector(A, e) {
    return this.x += A.x * e, this.y += A.y * e, this;
  }
  sub(A) {
    return this.x -= A.x, this.y -= A.y, this;
  }
  subScalar(A) {
    return this.x -= A, this.y -= A, this;
  }
  subVectors(A, e) {
    return this.x = A.x - e.x, this.y = A.y - e.y, this;
  }
  multiply(A) {
    return this.x *= A.x, this.y *= A.y, this;
  }
  multiplyScalar(A) {
    return this.x *= A, this.y *= A, this;
  }
  divide(A) {
    return this.x /= A.x, this.y /= A.y, this;
  }
  divideScalar(A) {
    return this.multiplyScalar(1 / A);
  }
  applyMatrix3(A) {
    const e = this.x, t = this.y, i = A.elements;
    return this.x = i[0] * e + i[3] * t + i[6], this.y = i[1] * e + i[4] * t + i[7], this;
  }
  min(A) {
    return this.x = Math.min(this.x, A.x), this.y = Math.min(this.y, A.y), this;
  }
  max(A) {
    return this.x = Math.max(this.x, A.x), this.y = Math.max(this.y, A.y), this;
  }
  clamp(A, e) {
    return this.x = NA(this.x, A.x, e.x), this.y = NA(this.y, A.y, e.y), this;
  }
  clampScalar(A, e) {
    return this.x = NA(this.x, A, e), this.y = NA(this.y, A, e), this;
  }
  clampLength(A, e) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(NA(t, A, e));
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
  dot(A) {
    return this.x * A.x + this.y * A.y;
  }
  cross(A) {
    return this.x * A.y - this.y * A.x;
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
  angleTo(A) {
    const e = Math.sqrt(this.lengthSq() * A.lengthSq());
    if (e === 0) return Math.PI / 2;
    const t = this.dot(A) / e;
    return Math.acos(NA(t, -1, 1));
  }
  distanceTo(A) {
    return Math.sqrt(this.distanceToSquared(A));
  }
  distanceToSquared(A) {
    const e = this.x - A.x, t = this.y - A.y;
    return e * e + t * t;
  }
  manhattanDistanceTo(A) {
    return Math.abs(this.x - A.x) + Math.abs(this.y - A.y);
  }
  setLength(A) {
    return this.normalize().multiplyScalar(A);
  }
  lerp(A, e) {
    return this.x += (A.x - this.x) * e, this.y += (A.y - this.y) * e, this;
  }
  lerpVectors(A, e, t) {
    return this.x = A.x + (e.x - A.x) * t, this.y = A.y + (e.y - A.y) * t, this;
  }
  equals(A) {
    return A.x === this.x && A.y === this.y;
  }
  fromArray(A, e = 0) {
    return this.x = A[e], this.y = A[e + 1], this;
  }
  toArray(A = [], e = 0) {
    return A[e] = this.x, A[e + 1] = this.y, A;
  }
  fromBufferAttribute(A, e) {
    return this.x = A.getX(e), this.y = A.getY(e), this;
  }
  rotateAround(A, e) {
    const t = Math.cos(e), i = Math.sin(e), n = this.x - A.x, r = this.y - A.y;
    return this.x = n * t - r * i + A.x, this.y = n * i + r * t + A.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[oa]() {
    yield this.x, yield this.y;
  }
};
ta = bA;
ta.prototype.isVector2 = !0;
var Ut = class {
  constructor(A = 0, e = 0, t = 0, i = 1) {
    this.isQuaternion = !0, this._x = A, this._y = e, this._z = t, this._w = i;
  }
  static slerpFlat(A, e, t, i, n, r, s) {
    let a = t[i + 0], l = t[i + 1], o = t[i + 2], c = t[i + 3], f = n[r + 0], h = n[r + 1], p = n[r + 2], m = n[r + 3];
    if (c !== m || a !== f || l !== h || o !== p) {
      let P = a * f + l * h + o * p + c * m;
      P < 0 && (f = -f, h = -h, p = -p, m = -m, P = -P);
      let d = 1 - s;
      if (P < 0.9995) {
        const u = Math.acos(P), x = Math.sin(u);
        d = Math.sin(d * u) / x, s = Math.sin(s * u) / x, a = a * d + f * s, l = l * d + h * s, o = o * d + p * s, c = c * d + m * s;
      } else {
        a = a * d + f * s, l = l * d + h * s, o = o * d + p * s, c = c * d + m * s;
        const u = 1 / Math.sqrt(a * a + l * l + o * o + c * c);
        a *= u, l *= u, o *= u, c *= u;
      }
    }
    A[e] = a, A[e + 1] = l, A[e + 2] = o, A[e + 3] = c;
  }
  static multiplyQuaternionsFlat(A, e, t, i, n, r) {
    const s = t[i], a = t[i + 1], l = t[i + 2], o = t[i + 3], c = n[r], f = n[r + 1], h = n[r + 2], p = n[r + 3];
    return A[e] = s * p + o * c + a * h - l * f, A[e + 1] = a * p + o * f + l * c - s * h, A[e + 2] = l * p + o * h + s * f - a * c, A[e + 3] = o * p - s * c - a * f - l * h, A;
  }
  get x() {
    return this._x;
  }
  set x(A) {
    this._x = A, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(A) {
    this._y = A, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(A) {
    this._z = A, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(A) {
    this._w = A, this._onChangeCallback();
  }
  set(A, e, t, i) {
    return this._x = A, this._y = e, this._z = t, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(A) {
    return this._x = A.x, this._y = A.y, this._z = A.z, this._w = A.w, this._onChangeCallback(), this;
  }
  setFromEuler(A, e = !0) {
    const t = A._x, i = A._y, n = A._z, r = A._order, s = Math.cos, a = Math.sin, l = s(t / 2), o = s(i / 2), c = s(n / 2), f = a(t / 2), h = a(i / 2), p = a(n / 2);
    switch (r) {
      case "XYZ":
        this._x = f * o * c + l * h * p, this._y = l * h * c - f * o * p, this._z = l * o * p + f * h * c, this._w = l * o * c - f * h * p;
        break;
      case "YXZ":
        this._x = f * o * c + l * h * p, this._y = l * h * c - f * o * p, this._z = l * o * p - f * h * c, this._w = l * o * c + f * h * p;
        break;
      case "ZXY":
        this._x = f * o * c - l * h * p, this._y = l * h * c + f * o * p, this._z = l * o * p + f * h * c, this._w = l * o * c - f * h * p;
        break;
      case "ZYX":
        this._x = f * o * c - l * h * p, this._y = l * h * c + f * o * p, this._z = l * o * p - f * h * c, this._w = l * o * c + f * h * p;
        break;
      case "YZX":
        this._x = f * o * c + l * h * p, this._y = l * h * c + f * o * p, this._z = l * o * p - f * h * c, this._w = l * o * c - f * h * p;
        break;
      case "XZY":
        this._x = f * o * c - l * h * p, this._y = l * h * c - f * o * p, this._z = l * o * p + f * h * c, this._w = l * o * c + f * h * p;
        break;
      default:
        MA("Quaternion: .setFromEuler() encountered an unknown order: " + r);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(A, e) {
    const t = e / 2, i = Math.sin(t);
    return this._x = A.x * i, this._y = A.y * i, this._z = A.z * i, this._w = Math.cos(t), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(A) {
    const e = A.elements, t = e[0], i = e[4], n = e[8], r = e[1], s = e[5], a = e[9], l = e[2], o = e[6], c = e[10], f = t + s + c;
    if (f > 0) {
      const h = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / h, this._x = (o - a) * h, this._y = (n - l) * h, this._z = (r - i) * h;
    } else if (t > s && t > c) {
      const h = 2 * Math.sqrt(1 + t - s - c);
      this._w = (o - a) / h, this._x = 0.25 * h, this._y = (i + r) / h, this._z = (n + l) / h;
    } else if (s > c) {
      const h = 2 * Math.sqrt(1 + s - t - c);
      this._w = (n - l) / h, this._x = (i + r) / h, this._y = 0.25 * h, this._z = (a + o) / h;
    } else {
      const h = 2 * Math.sqrt(1 + c - t - s);
      this._w = (r - i) / h, this._x = (n + l) / h, this._y = (a + o) / h, this._z = 0.25 * h;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(A, e) {
    let t = A.dot(e) + 1;
    return t < 1e-8 ? (t = 0, Math.abs(A.x) > Math.abs(A.z) ? (this._x = -A.y, this._y = A.x, this._z = 0, this._w = t) : (this._x = 0, this._y = -A.z, this._z = A.y, this._w = t)) : (this._x = A.y * e.z - A.z * e.y, this._y = A.z * e.x - A.x * e.z, this._z = A.x * e.y - A.y * e.x, this._w = t), this.normalize();
  }
  angleTo(A) {
    return 2 * Math.acos(Math.abs(NA(this.dot(A), -1, 1)));
  }
  rotateTowards(A, e) {
    const t = this.angleTo(A);
    if (t === 0) return this;
    const i = Math.min(1, e / t);
    return this.slerp(A, i), this;
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
  dot(A) {
    return this._x * A._x + this._y * A._y + this._z * A._z + this._w * A._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let A = this.length();
    return A === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (A = 1 / A, this._x = this._x * A, this._y = this._y * A, this._z = this._z * A, this._w = this._w * A), this._onChangeCallback(), this;
  }
  multiply(A) {
    return this.multiplyQuaternions(this, A);
  }
  premultiply(A) {
    return this.multiplyQuaternions(A, this);
  }
  multiplyQuaternions(A, e) {
    const t = A._x, i = A._y, n = A._z, r = A._w, s = e._x, a = e._y, l = e._z, o = e._w;
    return this._x = t * o + r * s + i * l - n * a, this._y = i * o + r * a + n * s - t * l, this._z = n * o + r * l + t * a - i * s, this._w = r * o - t * s - i * a - n * l, this._onChangeCallback(), this;
  }
  slerp(A, e) {
    let t = A._x, i = A._y, n = A._z, r = A._w, s = this.dot(A);
    s < 0 && (t = -t, i = -i, n = -n, r = -r, s = -s);
    let a = 1 - e;
    if (s < 0.9995) {
      const l = Math.acos(s), o = Math.sin(l);
      a = Math.sin(a * l) / o, e = Math.sin(e * l) / o, this._x = this._x * a + t * e, this._y = this._y * a + i * e, this._z = this._z * a + n * e, this._w = this._w * a + r * e, this._onChangeCallback();
    } else
      this._x = this._x * a + t * e, this._y = this._y * a + i * e, this._z = this._z * a + n * e, this._w = this._w * a + r * e, this.normalize();
    return this;
  }
  slerpQuaternions(A, e, t) {
    return this.copy(A).slerp(e, t);
  }
  random() {
    const A = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), t = Math.random(), i = Math.sqrt(1 - t), n = Math.sqrt(t);
    return this.set(i * Math.sin(A), i * Math.cos(A), n * Math.sin(e), n * Math.cos(e));
  }
  equals(A) {
    return A._x === this._x && A._y === this._y && A._z === this._z && A._w === this._w;
  }
  fromArray(A, e = 0) {
    return this._x = A[e], this._y = A[e + 1], this._z = A[e + 2], this._w = A[e + 3], this._onChangeCallback(), this;
  }
  toArray(A = [], e = 0) {
    return A[e] = this._x, A[e + 1] = this._y, A[e + 2] = this._z, A[e + 3] = this._w, A;
  }
  fromBufferAttribute(A, e) {
    return this._x = A.getX(e), this._y = A.getY(e), this._z = A.getZ(e), this._w = A.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(A) {
    return this._onChangeCallback = A, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
};
la = Symbol.iterator;
var N = class {
  constructor(A = 0, e = 0, t = 0) {
    this.x = A, this.y = e, this.z = t;
  }
  set(A, e, t) {
    return t === void 0 && (t = this.z), this.x = A, this.y = e, this.z = t, this;
  }
  setScalar(A) {
    return this.x = A, this.y = A, this.z = A, this;
  }
  setX(A) {
    return this.x = A, this;
  }
  setY(A) {
    return this.y = A, this;
  }
  setZ(A) {
    return this.z = A, this;
  }
  setComponent(A, e) {
    switch (A) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + A);
    }
    return this;
  }
  getComponent(A) {
    switch (A) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + A);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(A) {
    return this.x = A.x, this.y = A.y, this.z = A.z, this;
  }
  add(A) {
    return this.x += A.x, this.y += A.y, this.z += A.z, this;
  }
  addScalar(A) {
    return this.x += A, this.y += A, this.z += A, this;
  }
  addVectors(A, e) {
    return this.x = A.x + e.x, this.y = A.y + e.y, this.z = A.z + e.z, this;
  }
  addScaledVector(A, e) {
    return this.x += A.x * e, this.y += A.y * e, this.z += A.z * e, this;
  }
  sub(A) {
    return this.x -= A.x, this.y -= A.y, this.z -= A.z, this;
  }
  subScalar(A) {
    return this.x -= A, this.y -= A, this.z -= A, this;
  }
  subVectors(A, e) {
    return this.x = A.x - e.x, this.y = A.y - e.y, this.z = A.z - e.z, this;
  }
  multiply(A) {
    return this.x *= A.x, this.y *= A.y, this.z *= A.z, this;
  }
  multiplyScalar(A) {
    return this.x *= A, this.y *= A, this.z *= A, this;
  }
  multiplyVectors(A, e) {
    return this.x = A.x * e.x, this.y = A.y * e.y, this.z = A.z * e.z, this;
  }
  applyEuler(A) {
    return this.applyQuaternion(Xr.setFromEuler(A));
  }
  applyAxisAngle(A, e) {
    return this.applyQuaternion(Xr.setFromAxisAngle(A, e));
  }
  applyMatrix3(A) {
    const e = this.x, t = this.y, i = this.z, n = A.elements;
    return this.x = n[0] * e + n[3] * t + n[6] * i, this.y = n[1] * e + n[4] * t + n[7] * i, this.z = n[2] * e + n[5] * t + n[8] * i, this;
  }
  applyNormalMatrix(A) {
    return this.applyMatrix3(A).normalize();
  }
  applyMatrix4(A) {
    const e = this.x, t = this.y, i = this.z, n = A.elements, r = 1 / (n[3] * e + n[7] * t + n[11] * i + n[15]);
    return this.x = (n[0] * e + n[4] * t + n[8] * i + n[12]) * r, this.y = (n[1] * e + n[5] * t + n[9] * i + n[13]) * r, this.z = (n[2] * e + n[6] * t + n[10] * i + n[14]) * r, this;
  }
  applyQuaternion(A) {
    const e = this.x, t = this.y, i = this.z, n = A.x, r = A.y, s = A.z, a = A.w, l = 2 * (r * i - s * t), o = 2 * (s * e - n * i), c = 2 * (n * t - r * e);
    return this.x = e + a * l + r * c - s * o, this.y = t + a * o + s * l - n * c, this.z = i + a * c + n * o - r * l, this;
  }
  project(A) {
    return this.applyMatrix4(A.matrixWorldInverse).applyMatrix4(A.projectionMatrix);
  }
  unproject(A) {
    return this.applyMatrix4(A.projectionMatrixInverse).applyMatrix4(A.matrixWorld);
  }
  transformDirection(A) {
    const e = this.x, t = this.y, i = this.z, n = A.elements;
    return this.x = n[0] * e + n[4] * t + n[8] * i, this.y = n[1] * e + n[5] * t + n[9] * i, this.z = n[2] * e + n[6] * t + n[10] * i, this.normalize();
  }
  divide(A) {
    return this.x /= A.x, this.y /= A.y, this.z /= A.z, this;
  }
  divideScalar(A) {
    return this.multiplyScalar(1 / A);
  }
  min(A) {
    return this.x = Math.min(this.x, A.x), this.y = Math.min(this.y, A.y), this.z = Math.min(this.z, A.z), this;
  }
  max(A) {
    return this.x = Math.max(this.x, A.x), this.y = Math.max(this.y, A.y), this.z = Math.max(this.z, A.z), this;
  }
  clamp(A, e) {
    return this.x = NA(this.x, A.x, e.x), this.y = NA(this.y, A.y, e.y), this.z = NA(this.z, A.z, e.z), this;
  }
  clampScalar(A, e) {
    return this.x = NA(this.x, A, e), this.y = NA(this.y, A, e), this.z = NA(this.z, A, e), this;
  }
  clampLength(A, e) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(NA(t, A, e));
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
  dot(A) {
    return this.x * A.x + this.y * A.y + this.z * A.z;
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
  setLength(A) {
    return this.normalize().multiplyScalar(A);
  }
  lerp(A, e) {
    return this.x += (A.x - this.x) * e, this.y += (A.y - this.y) * e, this.z += (A.z - this.z) * e, this;
  }
  lerpVectors(A, e, t) {
    return this.x = A.x + (e.x - A.x) * t, this.y = A.y + (e.y - A.y) * t, this.z = A.z + (e.z - A.z) * t, this;
  }
  cross(A) {
    return this.crossVectors(this, A);
  }
  crossVectors(A, e) {
    const t = A.x, i = A.y, n = A.z, r = e.x, s = e.y, a = e.z;
    return this.x = i * a - n * s, this.y = n * r - t * a, this.z = t * s - i * r, this;
  }
  projectOnVector(A) {
    const e = A.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const t = A.dot(this) / e;
    return this.copy(A).multiplyScalar(t);
  }
  projectOnPlane(A) {
    return Qn.copy(this).projectOnVector(A), this.sub(Qn);
  }
  reflect(A) {
    return this.sub(Qn.copy(A).multiplyScalar(2 * this.dot(A)));
  }
  angleTo(A) {
    const e = Math.sqrt(this.lengthSq() * A.lengthSq());
    if (e === 0) return Math.PI / 2;
    const t = this.dot(A) / e;
    return Math.acos(NA(t, -1, 1));
  }
  distanceTo(A) {
    return Math.sqrt(this.distanceToSquared(A));
  }
  distanceToSquared(A) {
    const e = this.x - A.x, t = this.y - A.y, i = this.z - A.z;
    return e * e + t * t + i * i;
  }
  manhattanDistanceTo(A) {
    return Math.abs(this.x - A.x) + Math.abs(this.y - A.y) + Math.abs(this.z - A.z);
  }
  setFromSpherical(A) {
    return this.setFromSphericalCoords(A.radius, A.phi, A.theta);
  }
  setFromSphericalCoords(A, e, t) {
    const i = Math.sin(e) * A;
    return this.x = i * Math.sin(t), this.y = Math.cos(e) * A, this.z = i * Math.cos(t), this;
  }
  setFromCylindrical(A) {
    return this.setFromCylindricalCoords(A.radius, A.theta, A.y);
  }
  setFromCylindricalCoords(A, e, t) {
    return this.x = A * Math.sin(e), this.y = t, this.z = A * Math.cos(e), this;
  }
  setFromMatrixPosition(A) {
    const e = A.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(A) {
    const e = this.setFromMatrixColumn(A, 0).length(), t = this.setFromMatrixColumn(A, 1).length(), i = this.setFromMatrixColumn(A, 2).length();
    return this.x = e, this.y = t, this.z = i, this;
  }
  setFromMatrixColumn(A, e) {
    return this.fromArray(A.elements, e * 4);
  }
  setFromMatrix3Column(A, e) {
    return this.fromArray(A.elements, e * 3);
  }
  setFromEuler(A) {
    return this.x = A._x, this.y = A._y, this.z = A._z, this;
  }
  setFromColor(A) {
    return this.x = A.r, this.y = A.g, this.z = A.b, this;
  }
  equals(A) {
    return A.x === this.x && A.y === this.y && A.z === this.z;
  }
  fromArray(A, e = 0) {
    return this.x = A[e], this.y = A[e + 1], this.z = A[e + 2], this;
  }
  toArray(A = [], e = 0) {
    return A[e] = this.x, A[e + 1] = this.y, A[e + 2] = this.z, A;
  }
  fromBufferAttribute(A, e) {
    return this.x = A.getX(e), this.y = A.getY(e), this.z = A.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const A = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, t = Math.sqrt(1 - e * e);
    return this.x = t * Math.cos(A), this.y = e, this.z = t * Math.sin(A), this;
  }
  *[la]() {
    yield this.x, yield this.y, yield this.z;
  }
};
ia = N;
ia.prototype.isVector3 = !0;
var Qn = /* @__PURE__ */ new N(), Xr = /* @__PURE__ */ new Ut(), TA = class {
  constructor(A, e, t, i, n, r, s, a, l) {
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
    ], A !== void 0 && this.set(A, e, t, i, n, r, s, a, l);
  }
  set(A, e, t, i, n, r, s, a, l) {
    const o = this.elements;
    return o[0] = A, o[1] = i, o[2] = s, o[3] = e, o[4] = n, o[5] = a, o[6] = t, o[7] = r, o[8] = l, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(A) {
    const e = this.elements, t = A.elements;
    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], this;
  }
  extractBasis(A, e, t) {
    return A.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), t.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(A) {
    const e = A.elements;
    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
  }
  multiply(A) {
    return this.multiplyMatrices(this, A);
  }
  premultiply(A) {
    return this.multiplyMatrices(A, this);
  }
  multiplyMatrices(A, e) {
    const t = A.elements, i = e.elements, n = this.elements, r = t[0], s = t[3], a = t[6], l = t[1], o = t[4], c = t[7], f = t[2], h = t[5], p = t[8], m = i[0], P = i[3], d = i[6], u = i[1], x = i[4], C = i[7], D = i[2], M = i[5], _ = i[8];
    return n[0] = r * m + s * u + a * D, n[3] = r * P + s * x + a * M, n[6] = r * d + s * C + a * _, n[1] = l * m + o * u + c * D, n[4] = l * P + o * x + c * M, n[7] = l * d + o * C + c * _, n[2] = f * m + h * u + p * D, n[5] = f * P + h * x + p * M, n[8] = f * d + h * C + p * _, this;
  }
  multiplyScalar(A) {
    const e = this.elements;
    return e[0] *= A, e[3] *= A, e[6] *= A, e[1] *= A, e[4] *= A, e[7] *= A, e[2] *= A, e[5] *= A, e[8] *= A, this;
  }
  determinant() {
    const A = this.elements, e = A[0], t = A[1], i = A[2], n = A[3], r = A[4], s = A[5], a = A[6], l = A[7], o = A[8];
    return e * r * o - e * s * l - t * n * o + t * s * a + i * n * l - i * r * a;
  }
  invert() {
    const A = this.elements, e = A[0], t = A[1], i = A[2], n = A[3], r = A[4], s = A[5], a = A[6], l = A[7], o = A[8], c = o * r - s * l, f = s * a - o * n, h = l * n - r * a, p = e * c + t * f + i * h;
    if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const m = 1 / p;
    return A[0] = c * m, A[1] = (i * l - o * t) * m, A[2] = (s * t - i * r) * m, A[3] = f * m, A[4] = (o * e - i * a) * m, A[5] = (i * n - s * e) * m, A[6] = h * m, A[7] = (t * a - l * e) * m, A[8] = (r * e - t * n) * m, this;
  }
  transpose() {
    let A;
    const e = this.elements;
    return A = e[1], e[1] = e[3], e[3] = A, A = e[2], e[2] = e[6], e[6] = A, A = e[5], e[5] = e[7], e[7] = A, this;
  }
  getNormalMatrix(A) {
    return this.setFromMatrix4(A).invert().transpose();
  }
  transposeIntoArray(A) {
    const e = this.elements;
    return A[0] = e[0], A[1] = e[3], A[2] = e[6], A[3] = e[1], A[4] = e[4], A[5] = e[7], A[6] = e[2], A[7] = e[5], A[8] = e[8], this;
  }
  setUvTransform(A, e, t, i, n, r, s) {
    const a = Math.cos(n), l = Math.sin(n);
    return this.set(t * a, t * l, -t * (a * r + l * s) + r + A, -i * l, i * a, -i * (-l * r + a * s) + s + e, 0, 0, 1), this;
  }
  scale(A, e) {
    return si("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Tn.makeScale(A, e)), this;
  }
  rotate(A) {
    return si("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Tn.makeRotation(-A)), this;
  }
  translate(A, e) {
    return si("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Tn.makeTranslation(A, e)), this;
  }
  makeTranslation(A, e) {
    return A.isVector2 ? this.set(1, 0, A.x, 0, 1, A.y, 0, 0, 1) : this.set(1, 0, A, 0, 1, e, 0, 0, 1), this;
  }
  makeRotation(A) {
    const e = Math.cos(A), t = Math.sin(A);
    return this.set(e, -t, 0, t, e, 0, 0, 0, 1), this;
  }
  makeScale(A, e) {
    return this.set(A, 0, 0, 0, e, 0, 0, 0, 1), this;
  }
  equals(A) {
    const e = this.elements, t = A.elements;
    for (let i = 0; i < 9; i++) if (e[i] !== t[i]) return !1;
    return !0;
  }
  fromArray(A, e = 0) {
    for (let t = 0; t < 9; t++) this.elements[t] = A[t + e];
    return this;
  }
  toArray(A = [], e = 0) {
    const t = this.elements;
    return A[e] = t[0], A[e + 1] = t[1], A[e + 2] = t[2], A[e + 3] = t[3], A[e + 4] = t[4], A[e + 5] = t[5], A[e + 6] = t[6], A[e + 7] = t[7], A[e + 8] = t[8], A;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
na = TA;
na.prototype.isMatrix3 = !0;
var Tn = /* @__PURE__ */ new TA(), Yr = /* @__PURE__ */ new TA().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Kr = /* @__PURE__ */ new TA().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Dl() {
  const A = {
    enabled: !0,
    workingColorSpace: pr,
    spaces: {},
    convert: function(n, r, s) {
      return this.enabled === !1 || r === s || !r || !s || (this.spaces[r].transfer === "srgb" && (n.r = ht(n.r), n.g = ht(n.g), n.b = ht(n.b)), this.spaces[r].primaries !== this.spaces[s].primaries && (n.applyMatrix3(this.spaces[r].toXYZ), n.applyMatrix3(this.spaces[s].fromXYZ)), this.spaces[s].transfer === "srgb" && (n.r = ai(n.r), n.g = ai(n.g), n.b = ai(n.b))), n;
    },
    workingToColorSpace: function(n, r) {
      return this.convert(n, this.workingColorSpace, r);
    },
    colorSpaceToWorking: function(n, r) {
      return this.convert(n, r, this.workingColorSpace);
    },
    getPrimaries: function(n) {
      return this.spaces[n].primaries;
    },
    getTransfer: function(n) {
      return n === "" ? wn : this.spaces[n].transfer;
    },
    getToneMappingMode: function(n) {
      return this.spaces[n].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(n, r = this.workingColorSpace) {
      return n.fromArray(this.spaces[r].luminanceCoefficients);
    },
    define: function(n) {
      Object.assign(this.spaces, n);
    },
    _getMatrix: function(n, r, s) {
      return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(n) {
      return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(n = this.workingColorSpace) {
      return this.spaces[n].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(n, r) {
      return si("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), A.workingToColorSpace(n, r);
    },
    toWorkingColorSpace: function(n, r) {
      return si("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), A.colorSpaceToWorking(n, r);
    }
  }, e = [
    0.64,
    0.33,
    0.3,
    0.6,
    0.15,
    0.06
  ], t = [
    0.2126,
    0.7152,
    0.0722
  ], i = [0.3127, 0.329];
  return A.define({
    [pr]: {
      primaries: e,
      whitePoint: i,
      transfer: wn,
      toXYZ: Yr,
      fromXYZ: Kr,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: Qe },
      outputColorSpaceConfig: { drawingBufferColorSpace: Qe }
    },
    [Qe]: {
      primaries: e,
      whitePoint: i,
      transfer: Pn,
      toXYZ: Yr,
      fromXYZ: Kr,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: Qe }
    }
  }), A;
}
var OA = /* @__PURE__ */ Dl();
function ht(A) {
  return A < 0.04045 ? A * 0.0773993808 : Math.pow(A * 0.9478672986 + 0.0521327014, 2.4);
}
function ai(A) {
  return A < 31308e-7 ? A * 12.92 : 1.055 * Math.pow(A, 0.41666) - 0.055;
}
var Ot, El = class {
  static getDataURL(A, e = "image/png") {
    if (/^data:/i.test(A.src) || typeof HTMLCanvasElement > "u") return A.src;
    let t;
    if (A instanceof HTMLCanvasElement) t = A;
    else {
      Ot === void 0 && (Ot = Dn("canvas")), Ot.width = A.width, Ot.height = A.height;
      const i = Ot.getContext("2d");
      A instanceof ImageData ? i.putImageData(A, 0, 0) : i.drawImage(A, 0, 0, A.width, A.height), t = Ot;
    }
    return t.toDataURL(e);
  }
  static sRGBToLinear(A) {
    if (typeof HTMLImageElement < "u" && A instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && A instanceof ImageBitmap) {
      const e = Dn("canvas");
      e.width = A.width, e.height = A.height;
      const t = e.getContext("2d");
      t.drawImage(A, 0, 0, A.width, A.height);
      const i = t.getImageData(0, 0, A.width, A.height), n = i.data;
      for (let r = 0; r < n.length; r++) n[r] = ht(n[r] / 255) * 255;
      return t.putImageData(i, 0, 0), e;
    } else if (A.data) {
      const e = A.data.slice(0);
      for (let t = 0; t < e.length; t++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[t] = Math.floor(ht(e[t] / 255) * 255) : e[t] = ht(e[t]);
      return {
        data: e,
        width: A.width,
        height: A.height
      };
    } else
      return MA("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), A;
  }
}, Bl = 0, Dr = class {
  constructor(A = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Bl++ }), this.uuid = ui(), this.data = A, this.dataReady = !0, this.version = 0;
  }
  getSize(A) {
    const e = this.data;
    return typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement ? A.set(e.videoWidth, e.videoHeight, 0) : typeof VideoFrame < "u" && e instanceof VideoFrame ? A.set(e.displayWidth, e.displayHeight, 0) : e !== null ? A.set(e.width, e.height, e.depth || 0) : A.set(0, 0, 0), A;
  }
  set needsUpdate(A) {
    A === !0 && this.version++;
  }
  toJSON(A) {
    const e = A === void 0 || typeof A == "string";
    if (!e && A.images[this.uuid] !== void 0) return A.images[this.uuid];
    const t = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let n;
      if (Array.isArray(i)) {
        n = [];
        for (let r = 0, s = i.length; r < s; r++) i[r].isDataTexture ? n.push(bn(i[r].image)) : n.push(bn(i[r]));
      } else n = bn(i);
      t.url = n;
    }
    return e || (A.images[this.uuid] = t), t;
  }
};
function bn(A) {
  return typeof HTMLImageElement < "u" && A instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && A instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && A instanceof ImageBitmap ? El.getDataURL(A) : A.data ? {
    data: Array.from(A.data),
    width: A.width,
    height: A.height,
    type: A.data.constructor.name
  } : (MA("Texture: Unable to serialize Texture."), {});
}
var Ml = 0, Rn = /* @__PURE__ */ new N(), ze = class dn extends Lt {
  constructor(e = dn.DEFAULT_IMAGE, t = dn.DEFAULT_MAPPING, i = ot, n = ot, r = xe, s = En, a = Ti, l = Et, o = dn.DEFAULT_ANISOTROPY, c = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Ml++ }), this.uuid = ui(), this.name = "", this.source = new Dr(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = i, this.wrapT = n, this.magFilter = r, this.minFilter = s, this.anisotropy = o, this.format = a, this.internalFormat = null, this.type = l, this.offset = new bA(0, 0), this.repeat = new bA(1, 1), this.center = new bA(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new TA(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(Rn).x;
  }
  get height() {
    return this.source.getSize(Rn).y;
  }
  get depth() {
    return this.source.getSize(Rn).z;
  }
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
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
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  setValues(e) {
    for (const t in e) {
      const i = e[t];
      if (i === void 0) {
        MA(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const n = this[t];
      if (n === void 0) {
        MA(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      n && i && n.isVector2 && i.isVector2 || n && i && n.isVector3 && i.isVector3 || n && i && n.isMatrix3 && i.isMatrix3 ? n.copy(i) : this[t] = i;
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
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
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
      case fr:
        e.x = e.x - Math.floor(e.x);
        break;
      case ot:
        e.x = e.x < 0 ? 0 : 1;
        break;
      case ur:
        Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
        break;
    }
    if (e.y < 0 || e.y > 1) switch (this.wrapT) {
      case fr:
        e.y = e.y - Math.floor(e.y);
        break;
      case ot:
        e.y = e.y < 0 ? 0 : 1;
        break;
      case ur:
        Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
        break;
    }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
};
ze.DEFAULT_IMAGE = null;
ze.DEFAULT_MAPPING = 300;
ze.DEFAULT_ANISOTROPY = 1;
ca = Symbol.iterator;
var re = class {
  constructor(A = 0, e = 0, t = 0, i = 1) {
    this.x = A, this.y = e, this.z = t, this.w = i;
  }
  get width() {
    return this.z;
  }
  set width(A) {
    this.z = A;
  }
  get height() {
    return this.w;
  }
  set height(A) {
    this.w = A;
  }
  set(A, e, t, i) {
    return this.x = A, this.y = e, this.z = t, this.w = i, this;
  }
  setScalar(A) {
    return this.x = A, this.y = A, this.z = A, this.w = A, this;
  }
  setX(A) {
    return this.x = A, this;
  }
  setY(A) {
    return this.y = A, this;
  }
  setZ(A) {
    return this.z = A, this;
  }
  setW(A) {
    return this.w = A, this;
  }
  setComponent(A, e) {
    switch (A) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + A);
    }
    return this;
  }
  getComponent(A) {
    switch (A) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + A);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(A) {
    return this.x = A.x, this.y = A.y, this.z = A.z, this.w = A.w !== void 0 ? A.w : 1, this;
  }
  add(A) {
    return this.x += A.x, this.y += A.y, this.z += A.z, this.w += A.w, this;
  }
  addScalar(A) {
    return this.x += A, this.y += A, this.z += A, this.w += A, this;
  }
  addVectors(A, e) {
    return this.x = A.x + e.x, this.y = A.y + e.y, this.z = A.z + e.z, this.w = A.w + e.w, this;
  }
  addScaledVector(A, e) {
    return this.x += A.x * e, this.y += A.y * e, this.z += A.z * e, this.w += A.w * e, this;
  }
  sub(A) {
    return this.x -= A.x, this.y -= A.y, this.z -= A.z, this.w -= A.w, this;
  }
  subScalar(A) {
    return this.x -= A, this.y -= A, this.z -= A, this.w -= A, this;
  }
  subVectors(A, e) {
    return this.x = A.x - e.x, this.y = A.y - e.y, this.z = A.z - e.z, this.w = A.w - e.w, this;
  }
  multiply(A) {
    return this.x *= A.x, this.y *= A.y, this.z *= A.z, this.w *= A.w, this;
  }
  multiplyScalar(A) {
    return this.x *= A, this.y *= A, this.z *= A, this.w *= A, this;
  }
  applyMatrix4(A) {
    const e = this.x, t = this.y, i = this.z, n = this.w, r = A.elements;
    return this.x = r[0] * e + r[4] * t + r[8] * i + r[12] * n, this.y = r[1] * e + r[5] * t + r[9] * i + r[13] * n, this.z = r[2] * e + r[6] * t + r[10] * i + r[14] * n, this.w = r[3] * e + r[7] * t + r[11] * i + r[15] * n, this;
  }
  divide(A) {
    return this.x /= A.x, this.y /= A.y, this.z /= A.z, this.w /= A.w, this;
  }
  divideScalar(A) {
    return this.multiplyScalar(1 / A);
  }
  setAxisAngleFromQuaternion(A) {
    this.w = 2 * Math.acos(A.w);
    const e = Math.sqrt(1 - A.w * A.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = A.x / e, this.y = A.y / e, this.z = A.z / e), this;
  }
  setAxisAngleFromRotationMatrix(A) {
    let e, t, i, n;
    const a = A.elements, l = a[0], o = a[4], c = a[8], f = a[1], h = a[5], p = a[9], m = a[2], P = a[6], d = a[10];
    if (Math.abs(o - f) < 0.01 && Math.abs(c - m) < 0.01 && Math.abs(p - P) < 0.01) {
      if (Math.abs(o + f) < 0.1 && Math.abs(c + m) < 0.1 && Math.abs(p + P) < 0.1 && Math.abs(l + h + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const x = (l + 1) / 2, C = (h + 1) / 2, D = (d + 1) / 2, M = (o + f) / 4, _ = (c + m) / 4, I = (p + P) / 4;
      return x > C && x > D ? x < 0.01 ? (t = 0, i = 0.707106781, n = 0.707106781) : (t = Math.sqrt(x), i = M / t, n = _ / t) : C > D ? C < 0.01 ? (t = 0.707106781, i = 0, n = 0.707106781) : (i = Math.sqrt(C), t = M / i, n = I / i) : D < 0.01 ? (t = 0.707106781, i = 0.707106781, n = 0) : (n = Math.sqrt(D), t = _ / n, i = I / n), this.set(t, i, n, e), this;
    }
    let u = Math.sqrt((P - p) * (P - p) + (c - m) * (c - m) + (f - o) * (f - o));
    return Math.abs(u) < 1e-3 && (u = 1), this.x = (P - p) / u, this.y = (c - m) / u, this.z = (f - o) / u, this.w = Math.acos((l + h + d - 1) / 2), this;
  }
  setFromMatrixPosition(A) {
    const e = A.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(A) {
    return this.x = Math.min(this.x, A.x), this.y = Math.min(this.y, A.y), this.z = Math.min(this.z, A.z), this.w = Math.min(this.w, A.w), this;
  }
  max(A) {
    return this.x = Math.max(this.x, A.x), this.y = Math.max(this.y, A.y), this.z = Math.max(this.z, A.z), this.w = Math.max(this.w, A.w), this;
  }
  clamp(A, e) {
    return this.x = NA(this.x, A.x, e.x), this.y = NA(this.y, A.y, e.y), this.z = NA(this.z, A.z, e.z), this.w = NA(this.w, A.w, e.w), this;
  }
  clampScalar(A, e) {
    return this.x = NA(this.x, A, e), this.y = NA(this.y, A, e), this.z = NA(this.z, A, e), this.w = NA(this.w, A, e), this;
  }
  clampLength(A, e) {
    const t = this.length();
    return this.divideScalar(t || 1).multiplyScalar(NA(t, A, e));
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
  dot(A) {
    return this.x * A.x + this.y * A.y + this.z * A.z + this.w * A.w;
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
  setLength(A) {
    return this.normalize().multiplyScalar(A);
  }
  lerp(A, e) {
    return this.x += (A.x - this.x) * e, this.y += (A.y - this.y) * e, this.z += (A.z - this.z) * e, this.w += (A.w - this.w) * e, this;
  }
  lerpVectors(A, e, t) {
    return this.x = A.x + (e.x - A.x) * t, this.y = A.y + (e.y - A.y) * t, this.z = A.z + (e.z - A.z) * t, this.w = A.w + (e.w - A.w) * t, this;
  }
  equals(A) {
    return A.x === this.x && A.y === this.y && A.z === this.z && A.w === this.w;
  }
  fromArray(A, e = 0) {
    return this.x = A[e], this.y = A[e + 1], this.z = A[e + 2], this.w = A[e + 3], this;
  }
  toArray(A = [], e = 0) {
    return A[e] = this.x, A[e + 1] = this.y, A[e + 2] = this.z, A[e + 3] = this.w, A;
  }
  fromBufferAttribute(A, e) {
    return this.x = A.getX(e), this.y = A.getY(e), this.z = A.getZ(e), this.w = A.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[ca]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
ra = re;
ra.prototype.isVector4 = !0;
var Cl = class extends Lt {
  constructor(A = 1, e = 1, t = {}) {
    super(), t = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: xe,
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
    }, t), this.isRenderTarget = !0, this.width = A, this.height = e, this.depth = t.depth, this.scissor = new re(0, 0, A, e), this.scissorTest = !1, this.viewport = new re(0, 0, A, e), this.textures = [];
    const i = new ze({
      width: A,
      height: e,
      depth: t.depth
    }), n = t.count;
    for (let r = 0; r < n; r++)
      this.textures[r] = i.clone(), this.textures[r].isRenderTargetTexture = !0, this.textures[r].renderTarget = this;
    this._setTextureOptions(t), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = t.depthTexture, this.samples = t.samples, this.multiview = t.multiview, this.useArrayDepthTexture = t.useArrayDepthTexture;
  }
  _setTextureOptions(A = {}) {
    const e = {
      minFilter: xe,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    A.mapping !== void 0 && (e.mapping = A.mapping), A.wrapS !== void 0 && (e.wrapS = A.wrapS), A.wrapT !== void 0 && (e.wrapT = A.wrapT), A.wrapR !== void 0 && (e.wrapR = A.wrapR), A.magFilter !== void 0 && (e.magFilter = A.magFilter), A.minFilter !== void 0 && (e.minFilter = A.minFilter), A.format !== void 0 && (e.format = A.format), A.type !== void 0 && (e.type = A.type), A.anisotropy !== void 0 && (e.anisotropy = A.anisotropy), A.colorSpace !== void 0 && (e.colorSpace = A.colorSpace), A.flipY !== void 0 && (e.flipY = A.flipY), A.generateMipmaps !== void 0 && (e.generateMipmaps = A.generateMipmaps), A.internalFormat !== void 0 && (e.internalFormat = A.internalFormat);
    for (let t = 0; t < this.textures.length; t++) this.textures[t].setValues(e);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(A) {
    this.textures[0] = A;
  }
  set depthTexture(A) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), A !== null && (A.renderTarget = this), this._depthTexture = A;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(A, e, t = 1) {
    if (this.width !== A || this.height !== e || this.depth !== t) {
      this.width = A, this.height = e, this.depth = t;
      for (let i = 0, n = this.textures.length; i < n; i++)
        this.textures[i].image.width = A, this.textures[i].image.height = e, this.textures[i].image.depth = t, this.textures[i].isData3DTexture !== !0 && (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, A, e), this.scissor.set(0, 0, A, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(A) {
    this.width = A.width, this.height = A.height, this.depth = A.depth, this.scissor.copy(A.scissor), this.scissorTest = A.scissorTest, this.viewport.copy(A.viewport), this.textures.length = 0;
    for (let e = 0, t = A.textures.length; e < t; e++) {
      this.textures[e] = A.textures[e].clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
      const i = Object.assign({}, A.textures[e].image);
      this.textures[e].source = new Dr(i);
    }
    return this.depthBuffer = A.depthBuffer, this.stencilBuffer = A.stencilBuffer, this.resolveDepthBuffer = A.resolveDepthBuffer, this.resolveStencilBuffer = A.resolveStencilBuffer, A.depthTexture !== null && (this.depthTexture = A.depthTexture.clone()), this.samples = A.samples, this.multiview = A.multiview, this.useArrayDepthTexture = A.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, je = class extends Cl {
  constructor(A = 1, e = 1, t = {}) {
    super(A, e, t), this.isWebGLRenderTarget = !0;
  }
}, Pa = class extends ze {
  constructor(A = null, e = 1, t = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: A,
      width: e,
      height: t,
      depth: i
    }, this.magFilter = Me, this.minFilter = Me, this.wrapR = ot, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(A) {
    this.layerUpdates.add(A);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, xl = class extends ze {
  constructor(A = null, e = 1, t = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: A,
      width: e,
      height: t,
      depth: i
    }, this.magFilter = Me, this.minFilter = Me, this.wrapR = ot, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, ae = class Da {
  constructor(e, t, i, n, r, s, a, l, o, c, f, h, p, m, P, d) {
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
    ], e !== void 0 && this.set(e, t, i, n, r, s, a, l, o, c, f, h, p, m, P, d);
  }
  set(e, t, i, n, r, s, a, l, o, c, f, h, p, m, P, d) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = i, u[12] = n, u[1] = r, u[5] = s, u[9] = a, u[13] = l, u[2] = o, u[6] = c, u[10] = f, u[14] = h, u[3] = p, u[7] = m, u[11] = P, u[15] = d, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Da().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this;
  }
  copyPosition(e) {
    const t = this.elements, i = e.elements;
    return t[12] = i[12], t[13] = i[13], t[14] = i[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(e, t, i) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), i.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(e, t, i) {
    return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(e) {
    if (e.determinantAffine() === 0) return this.identity();
    const t = this.elements, i = e.elements, n = 1 / Ht.setFromMatrixColumn(e, 0).length(), r = 1 / Ht.setFromMatrixColumn(e, 1).length(), s = 1 / Ht.setFromMatrixColumn(e, 2).length();
    return t[0] = i[0] * n, t[1] = i[1] * n, t[2] = i[2] * n, t[3] = 0, t[4] = i[4] * r, t[5] = i[5] * r, t[6] = i[6] * r, t[7] = 0, t[8] = i[8] * s, t[9] = i[9] * s, t[10] = i[10] * s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, i = e.x, n = e.y, r = e.z, s = Math.cos(i), a = Math.sin(i), l = Math.cos(n), o = Math.sin(n), c = Math.cos(r), f = Math.sin(r);
    if (e.order === "XYZ") {
      const h = s * c, p = s * f, m = a * c, P = a * f;
      t[0] = l * c, t[4] = -l * f, t[8] = o, t[1] = p + m * o, t[5] = h - P * o, t[9] = -a * l, t[2] = P - h * o, t[6] = m + p * o, t[10] = s * l;
    } else if (e.order === "YXZ") {
      const h = l * c, p = l * f, m = o * c, P = o * f;
      t[0] = h + P * a, t[4] = m * a - p, t[8] = s * o, t[1] = s * f, t[5] = s * c, t[9] = -a, t[2] = p * a - m, t[6] = P + h * a, t[10] = s * l;
    } else if (e.order === "ZXY") {
      const h = l * c, p = l * f, m = o * c, P = o * f;
      t[0] = h - P * a, t[4] = -s * f, t[8] = m + p * a, t[1] = p + m * a, t[5] = s * c, t[9] = P - h * a, t[2] = -s * o, t[6] = a, t[10] = s * l;
    } else if (e.order === "ZYX") {
      const h = s * c, p = s * f, m = a * c, P = a * f;
      t[0] = l * c, t[4] = m * o - p, t[8] = h * o + P, t[1] = l * f, t[5] = P * o + h, t[9] = p * o - m, t[2] = -o, t[6] = a * l, t[10] = s * l;
    } else if (e.order === "YZX") {
      const h = s * l, p = s * o, m = a * l, P = a * o;
      t[0] = l * c, t[4] = P - h * f, t[8] = m * f + p, t[1] = f, t[5] = s * c, t[9] = -a * c, t[2] = -o * c, t[6] = p * f + m, t[10] = h - P * f;
    } else if (e.order === "XZY") {
      const h = s * l, p = s * o, m = a * l, P = a * o;
      t[0] = l * c, t[4] = -f, t[8] = o * c, t[1] = h * f + P, t[5] = s * c, t[9] = p * f - m, t[2] = m * f - p, t[6] = a * c, t[10] = P * f + h;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(_l, e, Sl);
  }
  lookAt(e, t, i) {
    const n = this.elements;
    return _e.subVectors(e, t), _e.lengthSq() === 0 && (_e.z = 1), _e.normalize(), pt.crossVectors(i, _e), pt.lengthSq() === 0 && (Math.abs(i.z) === 1 ? _e.x += 1e-4 : _e.z += 1e-4, _e.normalize(), pt.crossVectors(i, _e)), pt.normalize(), Gi.crossVectors(_e, pt), n[0] = pt.x, n[4] = Gi.x, n[8] = _e.x, n[1] = pt.y, n[5] = Gi.y, n[9] = _e.y, n[2] = pt.z, n[6] = Gi.z, n[10] = _e.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const i = e.elements, n = t.elements, r = this.elements, s = i[0], a = i[4], l = i[8], o = i[12], c = i[1], f = i[5], h = i[9], p = i[13], m = i[2], P = i[6], d = i[10], u = i[14], x = i[3], C = i[7], D = i[11], M = i[15], _ = n[0], I = n[4], v = n[8], B = n[12], W = n[1], S = n[5], V = n[9], k = n[13], G = n[2], z = n[6], X = n[10], L = n[14], q = n[3], AA = n[7], eA = n[11], cA = n[15];
    return r[0] = s * _ + a * W + l * G + o * q, r[4] = s * I + a * S + l * z + o * AA, r[8] = s * v + a * V + l * X + o * eA, r[12] = s * B + a * k + l * L + o * cA, r[1] = c * _ + f * W + h * G + p * q, r[5] = c * I + f * S + h * z + p * AA, r[9] = c * v + f * V + h * X + p * eA, r[13] = c * B + f * k + h * L + p * cA, r[2] = m * _ + P * W + d * G + u * q, r[6] = m * I + P * S + d * z + u * AA, r[10] = m * v + P * V + d * X + u * eA, r[14] = m * B + P * k + d * L + u * cA, r[3] = x * _ + C * W + D * G + M * q, r[7] = x * I + C * S + D * z + M * AA, r[11] = x * v + C * V + D * X + M * eA, r[15] = x * B + C * k + D * L + M * cA, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], i = e[4], n = e[8], r = e[12], s = e[1], a = e[5], l = e[9], o = e[13], c = e[2], f = e[6], h = e[10], p = e[14], m = e[3], P = e[7], d = e[11], u = e[15], x = l * p - o * h, C = a * p - o * f, D = a * h - l * f, M = s * p - o * c, _ = s * h - l * c, I = s * f - a * c;
    return t * (P * x - d * C + u * D) - i * (m * x - d * M + u * _) + n * (m * C - P * M + u * I) - r * (m * D - P * _ + d * I);
  }
  determinantAffine() {
    const e = this.elements, t = e[0], i = e[4], n = e[8], r = e[1], s = e[5], a = e[9], l = e[2], o = e[6], c = e[10];
    return t * (s * c - a * o) - i * (r * c - a * l) + n * (r * o - s * l);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, i) {
    const n = this.elements;
    return e.isVector3 ? (n[12] = e.x, n[13] = e.y, n[14] = e.z) : (n[12] = e, n[13] = t, n[14] = i), this;
  }
  invert() {
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], s = e[4], a = e[5], l = e[6], o = e[7], c = e[8], f = e[9], h = e[10], p = e[11], m = e[12], P = e[13], d = e[14], u = e[15], x = t * a - i * s, C = t * l - n * s, D = t * o - r * s, M = i * l - n * a, _ = i * o - r * a, I = n * o - r * l, v = c * P - f * m, B = c * d - h * m, W = c * u - p * m, S = f * d - h * P, V = f * u - p * P, k = h * u - p * d, G = x * k - C * V + D * S + M * W - _ * B + I * v;
    if (G === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const z = 1 / G;
    return e[0] = (a * k - l * V + o * S) * z, e[1] = (n * V - i * k - r * S) * z, e[2] = (P * I - d * _ + u * M) * z, e[3] = (h * _ - f * I - p * M) * z, e[4] = (l * W - s * k - o * B) * z, e[5] = (t * k - n * W + r * B) * z, e[6] = (d * D - m * I - u * C) * z, e[7] = (c * I - h * D + p * C) * z, e[8] = (s * V - a * W + o * v) * z, e[9] = (i * W - t * V - r * v) * z, e[10] = (m * _ - P * D + u * x) * z, e[11] = (f * D - c * _ - p * x) * z, e[12] = (a * B - s * S - l * v) * z, e[13] = (t * S - i * B + n * v) * z, e[14] = (P * C - m * M - d * x) * z, e[15] = (c * M - f * C + h * x) * z, this;
  }
  scale(e) {
    const t = this.elements, i = e.x, n = e.y, r = e.z;
    return t[0] *= i, t[4] *= n, t[8] *= r, t[1] *= i, t[5] *= n, t[9] *= r, t[2] *= i, t[6] *= n, t[10] *= r, t[3] *= i, t[7] *= n, t[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, i, n));
  }
  makeTranslation(e, t, i) {
    return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    const i = Math.cos(t), n = Math.sin(t), r = 1 - i, s = e.x, a = e.y, l = e.z, o = r * s, c = r * a;
    return this.set(o * s + i, o * a - n * l, o * l + n * a, 0, o * a + n * l, c * a + i, c * l - n * s, 0, o * l - n * a, c * l + n * s, r * l * l + i, 0, 0, 0, 0, 1), this;
  }
  makeScale(e, t, i) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, i, n, r, s) {
    return this.set(1, i, r, 0, e, 1, s, 0, t, n, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, i) {
    const n = this.elements, r = t._x, s = t._y, a = t._z, l = t._w, o = r + r, c = s + s, f = a + a, h = r * o, p = r * c, m = r * f, P = s * c, d = s * f, u = a * f, x = l * o, C = l * c, D = l * f, M = i.x, _ = i.y, I = i.z;
    return n[0] = (1 - (P + u)) * M, n[1] = (p + D) * M, n[2] = (m - C) * M, n[3] = 0, n[4] = (p - D) * _, n[5] = (1 - (h + u)) * _, n[6] = (d + x) * _, n[7] = 0, n[8] = (m + C) * I, n[9] = (d - x) * I, n[10] = (1 - (h + P)) * I, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, this;
  }
  decompose(e, t, i) {
    const n = this.elements;
    e.x = n[12], e.y = n[13], e.z = n[14];
    const r = this.determinantAffine();
    if (r === 0)
      return i.set(1, 1, 1), t.identity(), this;
    let s = Ht.set(n[0], n[1], n[2]).length();
    const a = Ht.set(n[4], n[5], n[6]).length(), l = Ht.set(n[8], n[9], n[10]).length();
    r < 0 && (s = -s), Ve.copy(this);
    const o = 1 / s, c = 1 / a, f = 1 / l;
    return Ve.elements[0] *= o, Ve.elements[1] *= o, Ve.elements[2] *= o, Ve.elements[4] *= c, Ve.elements[5] *= c, Ve.elements[6] *= c, Ve.elements[8] *= f, Ve.elements[9] *= f, Ve.elements[10] *= f, t.setFromRotationMatrix(Ve), i.x = s, i.y = a, i.z = l, this;
  }
  makePerspective(e, t, i, n, r, s, a = li, l = !1) {
    const o = this.elements, c = 2 * r / (t - e), f = 2 * r / (i - n), h = (t + e) / (t - e), p = (i + n) / (i - n);
    let m, P;
    if (l)
      m = r / (s - r), P = s * r / (s - r);
    else if (a === 2e3)
      m = -(s + r) / (s - r), P = -2 * s * r / (s - r);
    else if (a === 2001)
      m = -s / (s - r), P = -s * r / (s - r);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return o[0] = c, o[4] = 0, o[8] = h, o[12] = 0, o[1] = 0, o[5] = f, o[9] = p, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = m, o[14] = P, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(e, t, i, n, r, s, a = li, l = !1) {
    const o = this.elements, c = 2 / (t - e), f = 2 / (i - n), h = -(t + e) / (t - e), p = -(i + n) / (i - n);
    let m, P;
    if (l)
      m = 1 / (s - r), P = s / (s - r);
    else if (a === 2e3)
      m = -2 / (s - r), P = -(s + r) / (s - r);
    else if (a === 2001)
      m = -1 / (s - r), P = -r / (s - r);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return o[0] = c, o[4] = 0, o[8] = 0, o[12] = h, o[1] = 0, o[5] = f, o[9] = 0, o[13] = p, o[2] = 0, o[6] = 0, o[10] = m, o[14] = P, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let n = 0; n < 16; n++) if (t[n] !== i[n]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let i = 0; i < 16; i++) this.elements[i] = e[i + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e;
  }
};
sa = ae;
sa.prototype.isMatrix4 = !0;
var Ht = /* @__PURE__ */ new N(), Ve = /* @__PURE__ */ new ae(), _l = /* @__PURE__ */ new N(0, 0, 0), Sl = /* @__PURE__ */ new N(1, 1, 1), pt = /* @__PURE__ */ new N(), Gi = /* @__PURE__ */ new N(), _e = /* @__PURE__ */ new N(), Jr = /* @__PURE__ */ new ae(), qr = /* @__PURE__ */ new Ut(), Li = class Ea {
  constructor(e = 0, t = 0, i = 0, n = Ea.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = i, this._order = n;
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
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, i, n = this._order) {
    return this._x = e, this._y = t, this._z = i, this._order = n, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, i = !0) {
    const n = e.elements, r = n[0], s = n[4], a = n[8], l = n[1], o = n[5], c = n[9], f = n[2], h = n[6], p = n[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(NA(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-c, p), this._z = Math.atan2(-s, r)) : (this._x = Math.atan2(h, o), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-NA(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(l, o)) : (this._y = Math.atan2(-f, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(NA(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-f, p), this._z = Math.atan2(-s, o)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-NA(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(h, p), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-s, o));
        break;
      case "YZX":
        this._z = Math.asin(NA(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-c, o), this._y = Math.atan2(-f, r)) : (this._x = 0, this._y = Math.atan2(a, p));
        break;
      case "XZY":
        this._z = Math.asin(-NA(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(h, o), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-c, p), this._y = 0);
        break;
      default:
        MA("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, i === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, i) {
    return Jr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Jr, t, i);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return qr.setFromEuler(this), this.setFromQuaternion(qr, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
Li.DEFAULT_ORDER = "XYZ";
var Ba = class {
  constructor() {
    this.mask = 1;
  }
  set(A) {
    this.mask = (1 << A | 0) >>> 0;
  }
  enable(A) {
    this.mask |= 1 << A | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(A) {
    this.mask ^= 1 << A | 0;
  }
  disable(A) {
    this.mask &= ~(1 << A | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(A) {
    return (this.mask & A.mask) !== 0;
  }
  isEnabled(A) {
    return (this.mask & (1 << A | 0)) !== 0;
  }
}, Il = 0, jr = /* @__PURE__ */ new N(), Vt = /* @__PURE__ */ new Ut(), et = /* @__PURE__ */ new ae(), ki = /* @__PURE__ */ new N(), gi = /* @__PURE__ */ new N(), yl = /* @__PURE__ */ new N(), Ql = /* @__PURE__ */ new Ut(), Zr = /* @__PURE__ */ new N(1, 0, 0), $r = /* @__PURE__ */ new N(0, 1, 0), As = /* @__PURE__ */ new N(0, 0, 1), es = { type: "added" }, Tl = { type: "removed" }, Gt = {
  type: "childadded",
  child: null
}, Ln = {
  type: "childremoved",
  child: null
}, be = class pn extends Lt {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Il++ }), this.uuid = ui(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = pn.DEFAULT_UP.clone();
    const e = new N(), t = new Li(), i = new Ut(), n = new N(1, 1, 1);
    function r() {
      i.setFromEuler(t, !1);
    }
    function s() {
      t.setFromQuaternion(i, void 0, !1);
    }
    t._onChange(r), i._onChange(s), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      modelViewMatrix: { value: new ae() },
      normalMatrix: { value: new TA() }
    }), this.matrix = new ae(), this.matrixWorld = new ae(), this.matrixAutoUpdate = pn.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ba(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return Vt.setFromAxisAngle(e, t), this.quaternion.multiply(Vt), this;
  }
  rotateOnWorldAxis(e, t) {
    return Vt.setFromAxisAngle(e, t), this.quaternion.premultiply(Vt), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Zr, e);
  }
  rotateY(e) {
    return this.rotateOnAxis($r, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(As, e);
  }
  translateOnAxis(e, t) {
    return jr.copy(e).applyQuaternion(this.quaternion), this.position.add(jr.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Zr, e);
  }
  translateY(e) {
    return this.translateOnAxis($r, e);
  }
  translateZ(e) {
    return this.translateOnAxis(As, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(et.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, i) {
    e.isVector3 ? ki.copy(e) : ki.set(e, t, i);
    const n = this.parent;
    this.updateWorldMatrix(!0, !1), gi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? et.lookAt(gi, ki, this.up) : et.lookAt(ki, gi, this.up), this.quaternion.setFromRotationMatrix(et), n && (et.extractRotation(n.matrixWorld), Vt.setFromRotationMatrix(et), this.quaternion.premultiply(Vt.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
      return this;
    }
    return e === this ? (IA("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(es), Gt.child = e, this.dispatchEvent(Gt), Gt.child = null) : IA("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Tl), Ln.child = e, this.dispatchEvent(Ln), Ln.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), et.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), et.multiply(e.parent.matrixWorld)), e.applyMatrix4(et), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(es), Gt.child = e, this.dispatchEvent(Gt), Gt.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let i = 0, n = this.children.length; i < n; i++) {
      const r = this.children[i].getObjectByProperty(e, t);
      if (r !== void 0) return r;
    }
  }
  getObjectsByProperty(e, t, i = []) {
    this[e] === t && i.push(this);
    const n = this.children;
    for (let r = 0, s = n.length; r < s; r++) n[r].getObjectsByProperty(e, t, i);
    return i;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(gi, e, yl), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(gi, Ql, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let i = 0, n = t.length; i < n; i++) t[i].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let i = 0, n = t.length; i < n; i++) t[i].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, i = e.y, n = e.z, r = this.matrix.elements;
      r[12] += t - r[0] * t - r[4] * i - r[8] * n, r[13] += i - r[1] * t - r[5] * i - r[9] * n, r[14] += n - r[2] * t - r[6] * i - r[10] * n;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let i = 0, n = t.length; i < n; i++) t[i].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t, i = !1) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || i) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, i = !0), t === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++) r[s].updateWorldMatrix(!1, !0, i);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", i = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const n = {};
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.castShadow === !0 && (n.castShadow = !0), this.receiveShadow === !0 && (n.receiveShadow = !0), this.visible === !1 && (n.visible = !1), this.frustumCulled === !1 && (n.frustumCulled = !1), this.renderOrder !== 0 && (n.renderOrder = this.renderOrder), this.static !== !1 && (n.static = this.static), Object.keys(this.userData).length > 0 && (n.userData = this.userData), n.layers = this.layers.mask, n.matrix = this.matrix.toArray(), n.up = this.up.toArray(), this.pivot !== null && (n.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (n.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (n.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (n.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (n.type = "InstancedMesh", n.count = this.count, n.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (n.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (n.type = "BatchedMesh", n.perObjectFrustumCulled = this.perObjectFrustumCulled, n.sortObjects = this.sortObjects, n.drawRanges = this._drawRanges, n.reservedRanges = this._reservedRanges, n.geometryInfo = this._geometryInfo.map((a) => ({
      ...a,
      boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
      boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0
    })), n.instanceInfo = this._instanceInfo.map((a) => ({ ...a })), n.availableInstanceIds = this._availableInstanceIds.slice(), n.availableGeometryIds = this._availableGeometryIds.slice(), n.nextIndexStart = this._nextIndexStart, n.nextVertexStart = this._nextVertexStart, n.geometryCount = this._geometryCount, n.maxInstanceCount = this._maxInstanceCount, n.maxVertexCount = this._maxVertexCount, n.maxIndexCount = this._maxIndexCount, n.geometryInitialized = this._geometryInitialized, n.matricesTexture = this._matricesTexture.toJSON(e), n.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (n.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (n.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (n.boundingBox = this.boundingBox.toJSON()));
    function r(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? n.background = this.background.toJSON() : this.background.isTexture && (n.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (n.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      n.geometry = r(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l)) for (let o = 0, c = l.length; o < c; o++) {
          const f = l[o];
          r(e.shapes, f);
        }
        else r(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (n.bindMode = this.bindMode, n.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), n.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const a = [];
      for (let l = 0, o = this.material.length; l < o; l++) a.push(r(e.materials, this.material[l]));
      n.material = a;
    } else n.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      n.children = [];
      for (let a = 0; a < this.children.length; a++) n.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      n.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        n.animations.push(r(e.animations, l));
      }
    }
    if (t) {
      const a = s(e.geometries), l = s(e.materials), o = s(e.textures), c = s(e.images), f = s(e.shapes), h = s(e.skeletons), p = s(e.animations), m = s(e.nodes);
      a.length > 0 && (i.geometries = a), l.length > 0 && (i.materials = l), o.length > 0 && (i.textures = o), c.length > 0 && (i.images = c), f.length > 0 && (i.shapes = f), h.length > 0 && (i.skeletons = h), p.length > 0 && (i.animations = p), m.length > 0 && (i.nodes = m);
    }
    return i.object = n, i;
    function s(a) {
      const l = [];
      for (const o in a) {
        const c = a[o];
        delete c.metadata, l.push(c);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let i = 0; i < e.children.length; i++) {
      const n = e.children[i];
      this.add(n.clone());
    }
    return this;
  }
};
be.DEFAULT_UP = /* @__PURE__ */ new N(0, 1, 0);
be.DEFAULT_MATRIX_AUTO_UPDATE = !0;
be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Wi = class extends be {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, bl = { type: "move" }, Un = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Wi(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Wi(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new N(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new N()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Wi(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new N(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new N(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(A) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(A), this._grip !== null && this._grip.dispatchEvent(A), this._hand !== null && this._hand.dispatchEvent(A), this;
  }
  connect(A) {
    if (A && A.hand) {
      const e = this._hand;
      if (e) for (const t of A.hand.values()) this._getHandJoint(e, t);
    }
    return this.dispatchEvent({
      type: "connected",
      data: A
    }), this;
  }
  disconnect(A) {
    return this.dispatchEvent({
      type: "disconnected",
      data: A
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(A, e, t) {
    let i = null, n = null, r = null;
    const s = this._targetRay, a = this._grip, l = this._hand;
    if (A && e.session.visibilityState !== "visible-blurred") {
      if (l && A.hand) {
        r = !0;
        for (const m of A.hand.values()) {
          const P = e.getJointPose(m, t), d = this._getHandJoint(l, m);
          P !== null && (d.matrix.fromArray(P.transform.matrix), d.matrix.decompose(d.position, d.rotation, d.scale), d.matrixWorldNeedsUpdate = !0, d.jointRadius = P.radius), d.visible = P !== null;
        }
        const o = l.joints["index-finger-tip"], c = l.joints["thumb-tip"], f = o.position.distanceTo(c.position), h = 0.02, p = 5e-3;
        l.inputState.pinching && f > h + p ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: A.handedness,
          target: this
        })) : !l.inputState.pinching && f <= h - p && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: A.handedness,
          target: this
        }));
      } else a !== null && A.gripSpace && (n = e.getPose(A.gripSpace, t), n !== null && (a.matrix.fromArray(n.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1, n.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1, a.eventsEnabled && a.dispatchEvent({
        type: "gripUpdated",
        data: A,
        target: this
      })));
      s !== null && (i = e.getPose(A.targetRaySpace, t), i === null && n !== null && (i = n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(bl)));
    }
    return s !== null && (s.visible = i !== null), a !== null && (a.visible = n !== null), l !== null && (l.visible = r !== null), this;
  }
  _getHandJoint(A, e) {
    if (A.joints[e.jointName] === void 0) {
      const t = new Wi();
      t.matrixAutoUpdate = !1, t.visible = !1, A.joints[e.jointName] = t, A.add(t);
    }
    return A.joints[e.jointName];
  }
}, Ma = {
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
}, gt = {
  h: 0,
  s: 0,
  l: 0
}, Xi = {
  h: 0,
  s: 0,
  l: 0
};
function Fn(A, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? A + (e - A) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? A + (e - A) * 6 * (2 / 3 - t) : A;
}
var HA = class {
  constructor(A, e, t) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(A, e, t);
  }
  set(A, e, t) {
    if (e === void 0 && t === void 0) {
      const i = A;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else this.setRGB(A, e, t);
    return this;
  }
  setScalar(A) {
    return this.r = A, this.g = A, this.b = A, this;
  }
  setHex(A, e = Qe) {
    return A = Math.floor(A), this.r = (A >> 16 & 255) / 255, this.g = (A >> 8 & 255) / 255, this.b = (A & 255) / 255, OA.colorSpaceToWorking(this, e), this;
  }
  setRGB(A, e, t, i = OA.workingColorSpace) {
    return this.r = A, this.g = e, this.b = t, OA.colorSpaceToWorking(this, i), this;
  }
  setHSL(A, e, t, i = OA.workingColorSpace) {
    if (A = Pr(A, 1), e = NA(e, 0, 1), t = NA(t, 0, 1), e === 0) this.r = this.g = this.b = t;
    else {
      const n = t <= 0.5 ? t * (1 + e) : t + e - t * e, r = 2 * t - n;
      this.r = Fn(r, n, A + 1 / 3), this.g = Fn(r, n, A), this.b = Fn(r, n, A - 1 / 3);
    }
    return OA.colorSpaceToWorking(this, i), this;
  }
  setStyle(A, e = Qe) {
    function t(n) {
      n !== void 0 && parseFloat(n) < 1 && MA("Color: Alpha component of " + A + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(A)) {
      let n;
      const r = i[1], s = i[2];
      switch (r) {
        case "rgb":
        case "rgba":
          if (n = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return t(n[4]), this.setRGB(Math.min(255, parseInt(n[1], 10)) / 255, Math.min(255, parseInt(n[2], 10)) / 255, Math.min(255, parseInt(n[3], 10)) / 255, e);
          if (n = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return t(n[4]), this.setRGB(Math.min(100, parseInt(n[1], 10)) / 100, Math.min(100, parseInt(n[2], 10)) / 100, Math.min(100, parseInt(n[3], 10)) / 100, e);
          break;
        case "hsl":
        case "hsla":
          if (n = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return t(n[4]), this.setHSL(parseFloat(n[1]) / 360, parseFloat(n[2]) / 100, parseFloat(n[3]) / 100, e);
          break;
        default:
          MA("Color: Unknown color model " + A);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(A)) {
      const n = i[1], r = n.length;
      if (r === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, e);
      if (r === 6) return this.setHex(parseInt(n, 16), e);
      MA("Color: Invalid hex color " + A);
    } else if (A && A.length > 0) return this.setColorName(A, e);
    return this;
  }
  setColorName(A, e = Qe) {
    const t = Ma[A.toLowerCase()];
    return t !== void 0 ? this.setHex(t, e) : MA("Color: Unknown color " + A), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(A) {
    return this.r = A.r, this.g = A.g, this.b = A.b, this;
  }
  copySRGBToLinear(A) {
    return this.r = ht(A.r), this.g = ht(A.g), this.b = ht(A.b), this;
  }
  copyLinearToSRGB(A) {
    return this.r = ai(A.r), this.g = ai(A.g), this.b = ai(A.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(A = Qe) {
    return OA.workingToColorSpace(Pe.copy(this), A), Math.round(NA(Pe.r * 255, 0, 255)) * 65536 + Math.round(NA(Pe.g * 255, 0, 255)) * 256 + Math.round(NA(Pe.b * 255, 0, 255));
  }
  getHexString(A = Qe) {
    return ("000000" + this.getHex(A).toString(16)).slice(-6);
  }
  getHSL(A, e = OA.workingColorSpace) {
    OA.workingToColorSpace(Pe.copy(this), e);
    const t = Pe.r, i = Pe.g, n = Pe.b, r = Math.max(t, i, n), s = Math.min(t, i, n);
    let a, l;
    const o = (s + r) / 2;
    if (s === r)
      a = 0, l = 0;
    else {
      const c = r - s;
      switch (l = o <= 0.5 ? c / (r + s) : c / (2 - r - s), r) {
        case t:
          a = (i - n) / c + (i < n ? 6 : 0);
          break;
        case i:
          a = (n - t) / c + 2;
          break;
        case n:
          a = (t - i) / c + 4;
          break;
      }
      a /= 6;
    }
    return A.h = a, A.s = l, A.l = o, A;
  }
  getRGB(A, e = OA.workingColorSpace) {
    return OA.workingToColorSpace(Pe.copy(this), e), A.r = Pe.r, A.g = Pe.g, A.b = Pe.b, A;
  }
  getStyle(A = Qe) {
    OA.workingToColorSpace(Pe.copy(this), A);
    const e = Pe.r, t = Pe.g, i = Pe.b;
    return A !== "srgb" ? `color(${A} ${e.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(t * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(A, e, t) {
    return this.getHSL(gt), this.setHSL(gt.h + A, gt.s + e, gt.l + t);
  }
  add(A) {
    return this.r += A.r, this.g += A.g, this.b += A.b, this;
  }
  addColors(A, e) {
    return this.r = A.r + e.r, this.g = A.g + e.g, this.b = A.b + e.b, this;
  }
  addScalar(A) {
    return this.r += A, this.g += A, this.b += A, this;
  }
  sub(A) {
    return this.r = Math.max(0, this.r - A.r), this.g = Math.max(0, this.g - A.g), this.b = Math.max(0, this.b - A.b), this;
  }
  multiply(A) {
    return this.r *= A.r, this.g *= A.g, this.b *= A.b, this;
  }
  multiplyScalar(A) {
    return this.r *= A, this.g *= A, this.b *= A, this;
  }
  lerp(A, e) {
    return this.r += (A.r - this.r) * e, this.g += (A.g - this.g) * e, this.b += (A.b - this.b) * e, this;
  }
  lerpColors(A, e, t) {
    return this.r = A.r + (e.r - A.r) * t, this.g = A.g + (e.g - A.g) * t, this.b = A.b + (e.b - A.b) * t, this;
  }
  lerpHSL(A, e) {
    this.getHSL(gt), A.getHSL(Xi);
    const t = yi(gt.h, Xi.h, e), i = yi(gt.s, Xi.s, e), n = yi(gt.l, Xi.l, e);
    return this.setHSL(t, i, n), this;
  }
  setFromVector3(A) {
    return this.r = A.x, this.g = A.y, this.b = A.z, this;
  }
  applyMatrix3(A) {
    const e = this.r, t = this.g, i = this.b, n = A.elements;
    return this.r = n[0] * e + n[3] * t + n[6] * i, this.g = n[1] * e + n[4] * t + n[7] * i, this.b = n[2] * e + n[5] * t + n[8] * i, this;
  }
  equals(A) {
    return A.r === this.r && A.g === this.g && A.b === this.b;
  }
  fromArray(A, e = 0) {
    return this.r = A[e], this.g = A[e + 1], this.b = A[e + 2], this;
  }
  toArray(A = [], e = 0) {
    return A[e] = this.r, A[e + 1] = this.g, A[e + 2] = this.b, A;
  }
  fromBufferAttribute(A, e) {
    return this.r = A.getX(e), this.g = A.getY(e), this.b = A.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, Pe = /* @__PURE__ */ new HA();
HA.NAMES = Ma;
var Rl = class extends be {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Li(), this.environmentIntensity = 1, this.environmentRotation = new Li(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(A, e) {
    return super.copy(A, e), A.background !== null && (this.background = A.background.clone()), A.environment !== null && (this.environment = A.environment.clone()), A.fog !== null && (this.fog = A.fog.clone()), this.backgroundBlurriness = A.backgroundBlurriness, this.backgroundIntensity = A.backgroundIntensity, this.backgroundRotation.copy(A.backgroundRotation), this.environmentIntensity = A.environmentIntensity, this.environmentRotation.copy(A.environmentRotation), A.overrideMaterial !== null && (this.overrideMaterial = A.overrideMaterial.clone()), this.matrixAutoUpdate = A.matrixAutoUpdate, this;
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}, Ge = /* @__PURE__ */ new N(), tt = /* @__PURE__ */ new N(), Nn = /* @__PURE__ */ new N(), it = /* @__PURE__ */ new N(), kt = /* @__PURE__ */ new N(), Wt = /* @__PURE__ */ new N(), ts = /* @__PURE__ */ new N(), zn = /* @__PURE__ */ new N(), On = /* @__PURE__ */ new N(), Hn = /* @__PURE__ */ new N(), Vn = /* @__PURE__ */ new re(), Gn = /* @__PURE__ */ new re(), kn = /* @__PURE__ */ new re(), vi = class ei {
  constructor(e = new N(), t = new N(), i = new N()) {
    this.a = e, this.b = t, this.c = i;
  }
  static getNormal(e, t, i, n) {
    n.subVectors(i, t), Ge.subVectors(e, t), n.cross(Ge);
    const r = n.lengthSq();
    return r > 0 ? n.multiplyScalar(1 / Math.sqrt(r)) : n.set(0, 0, 0);
  }
  static getBarycoord(e, t, i, n, r) {
    Ge.subVectors(n, t), tt.subVectors(i, t), Nn.subVectors(e, t);
    const s = Ge.dot(Ge), a = Ge.dot(tt), l = Ge.dot(Nn), o = tt.dot(tt), c = tt.dot(Nn), f = s * o - a * a;
    if (f === 0)
      return r.set(0, 0, 0), null;
    const h = 1 / f, p = (o * l - a * c) * h, m = (s * c - a * l) * h;
    return r.set(1 - p - m, m, p);
  }
  static containsPoint(e, t, i, n) {
    return this.getBarycoord(e, t, i, n, it) === null ? !1 : it.x >= 0 && it.y >= 0 && it.x + it.y <= 1;
  }
  static getInterpolation(e, t, i, n, r, s, a, l) {
    return this.getBarycoord(e, t, i, n, it) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, it.x), l.addScaledVector(s, it.y), l.addScaledVector(a, it.z), l);
  }
  static getInterpolatedAttribute(e, t, i, n, r, s) {
    return Vn.setScalar(0), Gn.setScalar(0), kn.setScalar(0), Vn.fromBufferAttribute(e, t), Gn.fromBufferAttribute(e, i), kn.fromBufferAttribute(e, n), s.setScalar(0), s.addScaledVector(Vn, r.x), s.addScaledVector(Gn, r.y), s.addScaledVector(kn, r.z), s;
  }
  static isFrontFacing(e, t, i, n) {
    return Ge.subVectors(i, t), tt.subVectors(e, t), Ge.cross(tt).dot(n) < 0;
  }
  set(e, t, i) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(i), this;
  }
  setFromPointsAndIndices(e, t, i, n) {
    return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[n]), this;
  }
  setFromAttributeAndIndices(e, t, i, n) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, n), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Ge.subVectors(this.c, this.b), tt.subVectors(this.a, this.b), Ge.cross(tt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return ei.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return ei.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, i, n, r) {
    return ei.getInterpolation(e, this.a, this.b, this.c, t, i, n, r);
  }
  containsPoint(e) {
    return ei.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return ei.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const i = this.a, n = this.b, r = this.c;
    let s, a;
    kt.subVectors(n, i), Wt.subVectors(r, i), zn.subVectors(e, i);
    const l = kt.dot(zn), o = Wt.dot(zn);
    if (l <= 0 && o <= 0) return t.copy(i);
    On.subVectors(e, n);
    const c = kt.dot(On), f = Wt.dot(On);
    if (c >= 0 && f <= c) return t.copy(n);
    const h = l * f - c * o;
    if (h <= 0 && l >= 0 && c <= 0)
      return s = l / (l - c), t.copy(i).addScaledVector(kt, s);
    Hn.subVectors(e, r);
    const p = kt.dot(Hn), m = Wt.dot(Hn);
    if (m >= 0 && p <= m) return t.copy(r);
    const P = p * o - l * m;
    if (P <= 0 && o >= 0 && m <= 0)
      return a = o / (o - m), t.copy(i).addScaledVector(Wt, a);
    const d = c * m - p * f;
    if (d <= 0 && f - c >= 0 && p - m >= 0)
      return ts.subVectors(r, n), a = (f - c) / (f - c + (p - m)), t.copy(n).addScaledVector(ts, a);
    const u = 1 / (d + P + h);
    return s = P * u, a = h * u, t.copy(i).addScaledVector(kt, s).addScaledVector(Wt, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}, Ui = class {
  constructor(A = new N(1 / 0, 1 / 0, 1 / 0), e = new N(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = A, this.max = e;
  }
  set(A, e) {
    return this.min.copy(A), this.max.copy(e), this;
  }
  setFromArray(A) {
    this.makeEmpty();
    for (let e = 0, t = A.length; e < t; e += 3) this.expandByPoint(ke.fromArray(A, e));
    return this;
  }
  setFromBufferAttribute(A) {
    this.makeEmpty();
    for (let e = 0, t = A.count; e < t; e++) this.expandByPoint(ke.fromBufferAttribute(A, e));
    return this;
  }
  setFromPoints(A) {
    this.makeEmpty();
    for (let e = 0, t = A.length; e < t; e++) this.expandByPoint(A[e]);
    return this;
  }
  setFromCenterAndSize(A, e) {
    const t = ke.copy(e).multiplyScalar(0.5);
    return this.min.copy(A).sub(t), this.max.copy(A).add(t), this;
  }
  setFromObject(A, e = !1) {
    return this.makeEmpty(), this.expandByObject(A, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(A) {
    return this.min.copy(A.min), this.max.copy(A.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(A) {
    return this.isEmpty() ? A.set(0, 0, 0) : A.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(A) {
    return this.isEmpty() ? A.set(0, 0, 0) : A.subVectors(this.max, this.min);
  }
  expandByPoint(A) {
    return this.min.min(A), this.max.max(A), this;
  }
  expandByVector(A) {
    return this.min.sub(A), this.max.add(A), this;
  }
  expandByScalar(A) {
    return this.min.addScalar(-A), this.max.addScalar(A), this;
  }
  expandByObject(A, e = !1) {
    A.updateWorldMatrix(!1, !1);
    const t = A.geometry;
    if (t !== void 0) {
      const n = t.getAttribute("position");
      if (e === !0 && n !== void 0 && A.isInstancedMesh !== !0) for (let r = 0, s = n.count; r < s; r++)
        A.isMesh === !0 ? A.getVertexPosition(r, ke) : ke.fromBufferAttribute(n, r), ke.applyMatrix4(A.matrixWorld), this.expandByPoint(ke);
      else
        A.boundingBox !== void 0 ? (A.boundingBox === null && A.computeBoundingBox(), Yi.copy(A.boundingBox)) : (t.boundingBox === null && t.computeBoundingBox(), Yi.copy(t.boundingBox)), Yi.applyMatrix4(A.matrixWorld), this.union(Yi);
    }
    const i = A.children;
    for (let n = 0, r = i.length; n < r; n++) this.expandByObject(i[n], e);
    return this;
  }
  containsPoint(A) {
    return A.x >= this.min.x && A.x <= this.max.x && A.y >= this.min.y && A.y <= this.max.y && A.z >= this.min.z && A.z <= this.max.z;
  }
  containsBox(A) {
    return this.min.x <= A.min.x && A.max.x <= this.max.x && this.min.y <= A.min.y && A.max.y <= this.max.y && this.min.z <= A.min.z && A.max.z <= this.max.z;
  }
  getParameter(A, e) {
    return e.set((A.x - this.min.x) / (this.max.x - this.min.x), (A.y - this.min.y) / (this.max.y - this.min.y), (A.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(A) {
    return A.max.x >= this.min.x && A.min.x <= this.max.x && A.max.y >= this.min.y && A.min.y <= this.max.y && A.max.z >= this.min.z && A.min.z <= this.max.z;
  }
  intersectsSphere(A) {
    return this.clampPoint(A.center, ke), ke.distanceToSquared(A.center) <= A.radius * A.radius;
  }
  intersectsPlane(A) {
    let e, t;
    return A.normal.x > 0 ? (e = A.normal.x * this.min.x, t = A.normal.x * this.max.x) : (e = A.normal.x * this.max.x, t = A.normal.x * this.min.x), A.normal.y > 0 ? (e += A.normal.y * this.min.y, t += A.normal.y * this.max.y) : (e += A.normal.y * this.max.y, t += A.normal.y * this.min.y), A.normal.z > 0 ? (e += A.normal.z * this.min.z, t += A.normal.z * this.max.z) : (e += A.normal.z * this.max.z, t += A.normal.z * this.min.z), e <= -A.constant && t >= -A.constant;
  }
  intersectsTriangle(A) {
    if (this.isEmpty()) return !1;
    this.getCenter(mi), Ki.subVectors(this.max, mi), Xt.subVectors(A.a, mi), Yt.subVectors(A.b, mi), Kt.subVectors(A.c, mi), vt.subVectors(Yt, Xt), mt.subVectors(Kt, Yt), Mt.subVectors(Xt, Kt);
    let e = [
      0,
      -vt.z,
      vt.y,
      0,
      -mt.z,
      mt.y,
      0,
      -Mt.z,
      Mt.y,
      vt.z,
      0,
      -vt.x,
      mt.z,
      0,
      -mt.x,
      Mt.z,
      0,
      -Mt.x,
      -vt.y,
      vt.x,
      0,
      -mt.y,
      mt.x,
      0,
      -Mt.y,
      Mt.x,
      0
    ];
    return !Wn(e, Xt, Yt, Kt, Ki) || (e = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !Wn(e, Xt, Yt, Kt, Ki)) ? !1 : (Ji.crossVectors(vt, mt), e = [
      Ji.x,
      Ji.y,
      Ji.z
    ], Wn(e, Xt, Yt, Kt, Ki));
  }
  clampPoint(A, e) {
    return e.copy(A).clamp(this.min, this.max);
  }
  distanceToPoint(A) {
    return this.clampPoint(A, ke).distanceTo(A);
  }
  getBoundingSphere(A) {
    return this.isEmpty() ? A.makeEmpty() : (this.getCenter(A.center), A.radius = this.getSize(ke).length() * 0.5), A;
  }
  intersect(A) {
    return this.min.max(A.min), this.max.min(A.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(A) {
    return this.min.min(A.min), this.max.max(A.max), this;
  }
  applyMatrix4(A) {
    return this.isEmpty() ? this : (nt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(A), nt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(A), nt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(A), nt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(A), nt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(A), nt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(A), nt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(A), nt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(A), this.setFromPoints(nt), this);
  }
  translate(A) {
    return this.min.add(A), this.max.add(A), this;
  }
  equals(A) {
    return A.min.equals(this.min) && A.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(A) {
    return this.min.fromArray(A.min), this.max.fromArray(A.max), this;
  }
}, nt = [
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N()
], ke = /* @__PURE__ */ new N(), Yi = /* @__PURE__ */ new Ui(), Xt = /* @__PURE__ */ new N(), Yt = /* @__PURE__ */ new N(), Kt = /* @__PURE__ */ new N(), vt = /* @__PURE__ */ new N(), mt = /* @__PURE__ */ new N(), Mt = /* @__PURE__ */ new N(), mi = /* @__PURE__ */ new N(), Ki = /* @__PURE__ */ new N(), Ji = /* @__PURE__ */ new N(), Ct = /* @__PURE__ */ new N();
function Wn(A, e, t, i, n) {
  for (let r = 0, s = A.length - 3; r <= s; r += 3) {
    Ct.fromArray(A, r);
    const a = n.x * Math.abs(Ct.x) + n.y * Math.abs(Ct.y) + n.z * Math.abs(Ct.z), l = e.dot(Ct), o = t.dot(Ct), c = i.dot(Ct);
    if (Math.max(-Math.max(l, o, c), Math.min(l, o, c)) > a) return !1;
  }
  return !0;
}
var oe = /* @__PURE__ */ new N(), qi = /* @__PURE__ */ new bA(), Ll = 0, Ze = class extends Lt {
  constructor(A, e, t = !1) {
    if (super(), Array.isArray(A)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Ll++ }), this.name = "", this.array = A, this.itemSize = e, this.count = A !== void 0 ? A.length / e : 0, this.normalized = t, this.usage = $o, this.updateRanges = [], this.gpuType = Bn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(A) {
    A === !0 && this.version++;
  }
  setUsage(A) {
    return this.usage = A, this;
  }
  addUpdateRange(A, e) {
    this.updateRanges.push({
      start: A,
      count: e
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(A) {
    return this.name = A.name, this.array = new A.array.constructor(A.array), this.itemSize = A.itemSize, this.count = A.count, this.normalized = A.normalized, this.usage = A.usage, this.gpuType = A.gpuType, this;
  }
  copyAt(A, e, t) {
    A *= this.itemSize, t *= e.itemSize;
    for (let i = 0, n = this.itemSize; i < n; i++) this.array[A + i] = e.array[t + i];
    return this;
  }
  copyArray(A) {
    return this.array.set(A), this;
  }
  applyMatrix3(A) {
    if (this.itemSize === 2) for (let e = 0, t = this.count; e < t; e++)
      qi.fromBufferAttribute(this, e), qi.applyMatrix3(A), this.setXY(e, qi.x, qi.y);
    else if (this.itemSize === 3) for (let e = 0, t = this.count; e < t; e++)
      oe.fromBufferAttribute(this, e), oe.applyMatrix3(A), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyMatrix4(A) {
    for (let e = 0, t = this.count; e < t; e++)
      oe.fromBufferAttribute(this, e), oe.applyMatrix4(A), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyNormalMatrix(A) {
    for (let e = 0, t = this.count; e < t; e++)
      oe.fromBufferAttribute(this, e), oe.applyNormalMatrix(A), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  transformDirection(A) {
    for (let e = 0, t = this.count; e < t; e++)
      oe.fromBufferAttribute(this, e), oe.transformDirection(A), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  set(A, e = 0) {
    return this.array.set(A, e), this;
  }
  getComponent(A, e) {
    let t = this.array[A * this.itemSize + e];
    return this.normalized && (t = Ai(t, this.array)), t;
  }
  setComponent(A, e, t) {
    return this.normalized && (t = Ee(t, this.array)), this.array[A * this.itemSize + e] = t, this;
  }
  getX(A) {
    let e = this.array[A * this.itemSize];
    return this.normalized && (e = Ai(e, this.array)), e;
  }
  setX(A, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[A * this.itemSize] = e, this;
  }
  getY(A) {
    let e = this.array[A * this.itemSize + 1];
    return this.normalized && (e = Ai(e, this.array)), e;
  }
  setY(A, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[A * this.itemSize + 1] = e, this;
  }
  getZ(A) {
    let e = this.array[A * this.itemSize + 2];
    return this.normalized && (e = Ai(e, this.array)), e;
  }
  setZ(A, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[A * this.itemSize + 2] = e, this;
  }
  getW(A) {
    let e = this.array[A * this.itemSize + 3];
    return this.normalized && (e = Ai(e, this.array)), e;
  }
  setW(A, e) {
    return this.normalized && (e = Ee(e, this.array)), this.array[A * this.itemSize + 3] = e, this;
  }
  setXY(A, e, t) {
    return A *= this.itemSize, this.normalized && (e = Ee(e, this.array), t = Ee(t, this.array)), this.array[A + 0] = e, this.array[A + 1] = t, this;
  }
  setXYZ(A, e, t, i) {
    return A *= this.itemSize, this.normalized && (e = Ee(e, this.array), t = Ee(t, this.array), i = Ee(i, this.array)), this.array[A + 0] = e, this.array[A + 1] = t, this.array[A + 2] = i, this;
  }
  setXYZW(A, e, t, i, n) {
    return A *= this.itemSize, this.normalized && (e = Ee(e, this.array), t = Ee(t, this.array), i = Ee(i, this.array), n = Ee(n, this.array)), this.array[A + 0] = e, this.array[A + 1] = t, this.array[A + 2] = i, this.array[A + 3] = n, this;
  }
  onUpload(A) {
    return this.onUploadCallback = A, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const A = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (A.name = this.name), this.usage !== 35044 && (A.usage = this.usage), A;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Ca = class extends Ze {
  constructor(A, e, t) {
    super(new Uint16Array(A), e, t);
  }
}, xa = class extends Ze {
  constructor(A, e, t) {
    super(new Uint32Array(A), e, t);
  }
}, ft = class extends Ze {
  constructor(A, e, t) {
    super(new Float32Array(A), e, t);
  }
}, Ul = /* @__PURE__ */ new Ui(), wi = /* @__PURE__ */ new N(), Xn = /* @__PURE__ */ new N(), Er = class {
  constructor(A = new N(), e = -1) {
    this.isSphere = !0, this.center = A, this.radius = e;
  }
  set(A, e) {
    return this.center.copy(A), this.radius = e, this;
  }
  setFromPoints(A, e) {
    const t = this.center;
    e !== void 0 ? t.copy(e) : Ul.setFromPoints(A).getCenter(t);
    let i = 0;
    for (let n = 0, r = A.length; n < r; n++) i = Math.max(i, t.distanceToSquared(A[n]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(A) {
    return this.center.copy(A.center), this.radius = A.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(A) {
    return A.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(A) {
    return A.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(A) {
    const e = this.radius + A.radius;
    return A.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(A) {
    return A.intersectsSphere(this);
  }
  intersectsPlane(A) {
    return Math.abs(A.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(A, e) {
    const t = this.center.distanceToSquared(A);
    return e.copy(A), t > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(A) {
    return this.isEmpty() ? (A.makeEmpty(), A) : (A.set(this.center, this.center), A.expandByScalar(this.radius), A);
  }
  applyMatrix4(A) {
    return this.center.applyMatrix4(A), this.radius = this.radius * A.getMaxScaleOnAxis(), this;
  }
  translate(A) {
    return this.center.add(A), this;
  }
  expandByPoint(A) {
    if (this.isEmpty())
      return this.center.copy(A), this.radius = 0, this;
    wi.subVectors(A, this.center);
    const e = wi.lengthSq();
    if (e > this.radius * this.radius) {
      const t = Math.sqrt(e), i = (t - this.radius) * 0.5;
      this.center.addScaledVector(wi, i / t), this.radius += i;
    }
    return this;
  }
  union(A) {
    return A.isEmpty() ? this : this.isEmpty() ? (this.copy(A), this) : (this.center.equals(A.center) === !0 ? this.radius = Math.max(this.radius, A.radius) : (Xn.subVectors(A.center, this.center).setLength(A.radius), this.expandByPoint(wi.copy(A.center).add(Xn)), this.expandByPoint(wi.copy(A.center).sub(Xn))), this);
  }
  equals(A) {
    return A.center.equals(this.center) && A.radius === this.radius;
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
  fromJSON(A) {
    return this.radius = A.radius, this.center.fromArray(A.center), this;
  }
}, Fl = 0, Fe = /* @__PURE__ */ new ae(), Yn = /* @__PURE__ */ new be(), Jt = /* @__PURE__ */ new N(), Se = /* @__PURE__ */ new Ui(), Pi = /* @__PURE__ */ new Ui(), de = /* @__PURE__ */ new N(), Ft = class _a extends Lt {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Fl++ }), this.uuid = ui(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Al(e) ? xa : Ca)(e, 1) : this.index = e, this;
  }
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, i = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: i
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const r = new TA().getNormalMatrix(e);
      i.applyNormalMatrix(r), i.needsUpdate = !0;
    }
    const n = this.attributes.tangent;
    return n !== void 0 && (n.transformDirection(e), n.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  applyQuaternion(e) {
    return Fe.makeRotationFromQuaternion(e), this.applyMatrix4(Fe), this;
  }
  rotateX(e) {
    return Fe.makeRotationX(e), this.applyMatrix4(Fe), this;
  }
  rotateY(e) {
    return Fe.makeRotationY(e), this.applyMatrix4(Fe), this;
  }
  rotateZ(e) {
    return Fe.makeRotationZ(e), this.applyMatrix4(Fe), this;
  }
  translate(e, t, i) {
    return Fe.makeTranslation(e, t, i), this.applyMatrix4(Fe), this;
  }
  scale(e, t, i) {
    return Fe.makeScale(e, t, i), this.applyMatrix4(Fe), this;
  }
  lookAt(e) {
    return Yn.lookAt(e), Yn.updateMatrix(), this.applyMatrix4(Yn.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Jt).negate(), this.translate(Jt.x, Jt.y, Jt.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const i = [];
      for (let n = 0, r = e.length; n < r; n++) {
        const s = e[n];
        i.push(s.x, s.y, s.z || 0);
      }
      this.setAttribute("position", new ft(i, 3));
    } else {
      const i = Math.min(e.length, t.count);
      for (let n = 0; n < i; n++) {
        const r = e[n];
        t.setXYZ(n, r.x, r.y, r.z || 0);
      }
      e.length > t.count && MA("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ui());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      IA("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new N(-1 / 0, -1 / 0, -1 / 0), new N(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t) for (let i = 0, n = t.length; i < n; i++) {
        const r = t[i];
        Se.setFromBufferAttribute(r), this.morphTargetsRelative ? (de.addVectors(this.boundingBox.min, Se.min), this.boundingBox.expandByPoint(de), de.addVectors(this.boundingBox.max, Se.max), this.boundingBox.expandByPoint(de)) : (this.boundingBox.expandByPoint(Se.min), this.boundingBox.expandByPoint(Se.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && IA('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Er());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      IA("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new N(), 1 / 0);
      return;
    }
    if (e) {
      const i = this.boundingSphere.center;
      if (Se.setFromBufferAttribute(e), t) for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        Pi.setFromBufferAttribute(a), this.morphTargetsRelative ? (de.addVectors(Se.min, Pi.min), Se.expandByPoint(de), de.addVectors(Se.max, Pi.max), Se.expandByPoint(de)) : (Se.expandByPoint(Pi.min), Se.expandByPoint(Pi.max));
      }
      Se.getCenter(i);
      let n = 0;
      for (let r = 0, s = e.count; r < s; r++)
        de.fromBufferAttribute(e, r), n = Math.max(n, i.distanceToSquared(de));
      if (t) for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r], l = this.morphTargetsRelative;
        for (let o = 0, c = a.count; o < c; o++)
          de.fromBufferAttribute(a, o), l && (Jt.fromBufferAttribute(e, o), de.add(Jt)), n = Math.max(n, i.distanceToSquared(de));
      }
      this.boundingSphere.radius = Math.sqrt(n), isNaN(this.boundingSphere.radius) && IA('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      IA("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = t.position, n = t.normal, r = t.uv;
    let s = this.getAttribute("tangent");
    (s === void 0 || s.count !== i.count) && (s = new Ze(new Float32Array(4 * i.count), 4), this.setAttribute("tangent", s));
    const a = [], l = [];
    for (let v = 0; v < i.count; v++)
      a[v] = new N(), l[v] = new N();
    const o = new N(), c = new N(), f = new N(), h = new bA(), p = new bA(), m = new bA(), P = new N(), d = new N();
    function u(v, B, W) {
      o.fromBufferAttribute(i, v), c.fromBufferAttribute(i, B), f.fromBufferAttribute(i, W), h.fromBufferAttribute(r, v), p.fromBufferAttribute(r, B), m.fromBufferAttribute(r, W), c.sub(o), f.sub(o), p.sub(h), m.sub(h);
      const S = 1 / (p.x * m.y - m.x * p.y);
      isFinite(S) && (P.copy(c).multiplyScalar(m.y).addScaledVector(f, -p.y).multiplyScalar(S), d.copy(f).multiplyScalar(p.x).addScaledVector(c, -m.x).multiplyScalar(S), a[v].add(P), a[B].add(P), a[W].add(P), l[v].add(d), l[B].add(d), l[W].add(d));
    }
    let x = this.groups;
    x.length === 0 && (x = [{
      start: 0,
      count: e.count
    }]);
    for (let v = 0, B = x.length; v < B; ++v) {
      const W = x[v], S = W.start, V = W.count;
      for (let k = S, G = S + V; k < G; k += 3) u(e.getX(k + 0), e.getX(k + 1), e.getX(k + 2));
    }
    const C = new N(), D = new N(), M = new N(), _ = new N();
    function I(v) {
      M.fromBufferAttribute(n, v), _.copy(M);
      const B = a[v];
      C.copy(B), C.sub(M.multiplyScalar(M.dot(B))).normalize(), D.crossVectors(_, B);
      const W = D.dot(l[v]) < 0 ? -1 : 1;
      s.setXYZW(v, C.x, C.y, C.z, W);
    }
    for (let v = 0, B = x.length; v < B; ++v) {
      const W = x[v], S = W.start, V = W.count;
      for (let k = S, G = S + V; k < G; k += 3)
        I(e.getX(k + 0)), I(e.getX(k + 1)), I(e.getX(k + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0 || i.count !== t.count)
        i = new Ze(new Float32Array(t.count * 3), 3), this.setAttribute("normal", i);
      else for (let h = 0, p = i.count; h < p; h++) i.setXYZ(h, 0, 0, 0);
      const n = new N(), r = new N(), s = new N(), a = new N(), l = new N(), o = new N(), c = new N(), f = new N();
      if (e) for (let h = 0, p = e.count; h < p; h += 3) {
        const m = e.getX(h + 0), P = e.getX(h + 1), d = e.getX(h + 2);
        n.fromBufferAttribute(t, m), r.fromBufferAttribute(t, P), s.fromBufferAttribute(t, d), c.subVectors(s, r), f.subVectors(n, r), c.cross(f), a.fromBufferAttribute(i, m), l.fromBufferAttribute(i, P), o.fromBufferAttribute(i, d), a.add(c), l.add(c), o.add(c), i.setXYZ(m, a.x, a.y, a.z), i.setXYZ(P, l.x, l.y, l.z), i.setXYZ(d, o.x, o.y, o.z);
      }
      else for (let h = 0, p = t.count; h < p; h += 3)
        n.fromBufferAttribute(t, h + 0), r.fromBufferAttribute(t, h + 1), s.fromBufferAttribute(t, h + 2), c.subVectors(s, r), f.subVectors(n, r), c.cross(f), i.setXYZ(h + 0, c.x, c.y, c.z), i.setXYZ(h + 1, c.x, c.y, c.z), i.setXYZ(h + 2, c.x, c.y, c.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, i = e.count; t < i; t++)
      de.fromBufferAttribute(e, t), de.normalize(), e.setXYZ(t, de.x, de.y, de.z);
  }
  toNonIndexed() {
    function e(a, l) {
      const o = a.array, c = a.itemSize, f = a.normalized, h = new o.constructor(l.length * c);
      let p = 0, m = 0;
      for (let P = 0, d = l.length; P < d; P++) {
        a.isInterleavedBufferAttribute ? p = l[P] * a.data.stride + a.offset : p = l[P] * c;
        for (let u = 0; u < c; u++) h[m++] = o[p++];
      }
      return new Ze(h, c, f);
    }
    if (this.index === null)
      return MA("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new _a(), i = this.index.array, n = this.attributes;
    for (const a in n) {
      const l = n[a], o = e(l, i);
      t.setAttribute(a, o);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const l = [], o = r[a];
      for (let c = 0, f = o.length; c < f; c++) {
        const h = o[c], p = e(h, i);
        l.push(p);
      }
      t.morphAttributes[a] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const s = this.groups;
    for (let a = 0, l = s.length; a < l; a++) {
      const o = s[a];
      t.addGroup(o.start, o.count, o.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = { metadata: {
      version: 4.7,
      type: "BufferGeometry",
      generator: "BufferGeometry.toJSON"
    } };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const l = this.parameters;
      for (const o in l) l[o] !== void 0 && (e[o] = l[o]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const i = this.attributes;
    for (const l in i) {
      const o = i[l];
      e.data.attributes[l] = o.toJSON(e.data);
    }
    const n = {};
    let r = !1;
    for (const l in this.morphAttributes) {
      const o = this.morphAttributes[l], c = [];
      for (let f = 0, h = o.length; f < h; f++) {
        const p = o[f];
        c.push(p.toJSON(e.data));
      }
      c.length > 0 && (n[l] = c, r = !0);
    }
    r && (e.data.morphAttributes = n, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const s = this.groups;
    s.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(s)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = a.toJSON()), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const i = e.index;
    i !== null && this.setIndex(i.clone());
    const n = e.attributes;
    for (const o in n) {
      const c = n[o];
      this.setAttribute(o, c.clone(t));
    }
    const r = e.morphAttributes;
    for (const o in r) {
      const c = [], f = r[o];
      for (let h = 0, p = f.length; h < p; h++) c.push(f[h].clone(t));
      this.morphAttributes[o] = c;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const s = e.groups;
    for (let o = 0, c = s.length; o < c; o++) {
      const f = s[o];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Nl = 0, Fi = class extends Lt {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Nl++ }), this.uuid = ui(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new HA(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = yn, this.stencilZFail = yn, this.stencilZPass = yn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(A) {
    this._alphaTest > 0 != A > 0 && this.version++, this._alphaTest = A;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(A) {
    if (A !== void 0)
      for (const e in A) {
        const t = A[e];
        if (t === void 0) {
          MA(`Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const i = this[e];
        if (i === void 0) {
          MA(`Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(t) : i && i.isVector2 && t && t.isVector2 || i && i.isEuler && t && t.isEuler || i && i.isVector3 && t && t.isVector3 ? i.copy(t) : this[e] = t;
      }
  }
  toJSON(A) {
    const e = A === void 0 || typeof A == "string";
    e && (A = {
      textures: {},
      images: {}
    });
    const t = { metadata: {
      version: 4.7,
      type: "Material",
      generator: "Material.toJSON"
    } };
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.color && this.color.isColor && (t.color = this.color.getHex()), this.roughness !== void 0 && (t.roughness = this.roughness), this.metalness !== void 0 && (t.metalness = this.metalness), this.sheen !== void 0 && (t.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (t.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (t.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (t.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (t.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (t.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (t.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (t.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (t.shininess = this.shininess), this.clearcoat !== void 0 && (t.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (t.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (t.clearcoatMap = this.clearcoatMap.toJSON(A).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (t.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(A).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (t.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(A).uuid, t.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (t.sheenColorMap = this.sheenColorMap.toJSON(A).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (t.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(A).uuid), this.dispersion !== void 0 && (t.dispersion = this.dispersion), this.iridescence !== void 0 && (t.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (t.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (t.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (t.iridescenceMap = this.iridescenceMap.toJSON(A).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (t.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(A).uuid), this.anisotropy !== void 0 && (t.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (t.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (t.anisotropyMap = this.anisotropyMap.toJSON(A).uuid), this.map && this.map.isTexture && (t.map = this.map.toJSON(A).uuid), this.matcap && this.matcap.isTexture && (t.matcap = this.matcap.toJSON(A).uuid), this.alphaMap && this.alphaMap.isTexture && (t.alphaMap = this.alphaMap.toJSON(A).uuid), this.lightMap && this.lightMap.isTexture && (t.lightMap = this.lightMap.toJSON(A).uuid, t.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (t.aoMap = this.aoMap.toJSON(A).uuid, t.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (t.bumpMap = this.bumpMap.toJSON(A).uuid, t.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (t.normalMap = this.normalMap.toJSON(A).uuid, t.normalMapType = this.normalMapType, t.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (t.displacementMap = this.displacementMap.toJSON(A).uuid, t.displacementScale = this.displacementScale, t.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (t.roughnessMap = this.roughnessMap.toJSON(A).uuid), this.metalnessMap && this.metalnessMap.isTexture && (t.metalnessMap = this.metalnessMap.toJSON(A).uuid), this.emissiveMap && this.emissiveMap.isTexture && (t.emissiveMap = this.emissiveMap.toJSON(A).uuid), this.specularMap && this.specularMap.isTexture && (t.specularMap = this.specularMap.toJSON(A).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (t.specularIntensityMap = this.specularIntensityMap.toJSON(A).uuid), this.specularColorMap && this.specularColorMap.isTexture && (t.specularColorMap = this.specularColorMap.toJSON(A).uuid), this.envMap && this.envMap.isTexture && (t.envMap = this.envMap.toJSON(A).uuid, this.combine !== void 0 && (t.combine = this.combine)), this.envMapRotation !== void 0 && (t.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (t.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (t.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (t.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (t.gradientMap = this.gradientMap.toJSON(A).uuid), this.transmission !== void 0 && (t.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (t.transmissionMap = this.transmissionMap.toJSON(A).uuid), this.thickness !== void 0 && (t.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (t.thicknessMap = this.thicknessMap.toJSON(A).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (t.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (t.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (t.size = this.size), this.shadowSide !== null && (t.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (t.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (t.blending = this.blending), this.side !== 0 && (t.side = this.side), this.vertexColors === !0 && (t.vertexColors = !0), this.opacity < 1 && (t.opacity = this.opacity), this.transparent === !0 && (t.transparent = !0), this.blendSrc !== 204 && (t.blendSrc = this.blendSrc), this.blendDst !== 205 && (t.blendDst = this.blendDst), this.blendEquation !== 100 && (t.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (t.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (t.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (t.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (t.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (t.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (t.depthFunc = this.depthFunc), this.depthTest === !1 && (t.depthTest = this.depthTest), this.depthWrite === !1 && (t.depthWrite = this.depthWrite), this.colorWrite === !1 && (t.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (t.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (t.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (t.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (t.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (t.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (t.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (t.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (t.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (t.rotation = this.rotation), this.polygonOffset === !0 && (t.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (t.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (t.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (t.linewidth = this.linewidth), this.dashSize !== void 0 && (t.dashSize = this.dashSize), this.gapSize !== void 0 && (t.gapSize = this.gapSize), this.scale !== void 0 && (t.scale = this.scale), this.dithering === !0 && (t.dithering = !0), this.alphaTest > 0 && (t.alphaTest = this.alphaTest), this.alphaHash === !0 && (t.alphaHash = !0), this.alphaToCoverage === !0 && (t.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (t.premultipliedAlpha = !0), this.forceSinglePass === !0 && (t.forceSinglePass = !0), this.allowOverride === !1 && (t.allowOverride = !1), this.wireframe === !0 && (t.wireframe = !0), this.wireframeLinewidth > 1 && (t.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (t.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (t.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (t.flatShading = !0), this.visible === !1 && (t.visible = !1), this.toneMapped === !1 && (t.toneMapped = !1), this.fog === !1 && (t.fog = !1), Object.keys(this.userData).length > 0 && (t.userData = this.userData);
    function i(n) {
      const r = [];
      for (const s in n) {
        const a = n[s];
        delete a.metadata, r.push(a);
      }
      return r;
    }
    if (e) {
      const n = i(A.textures), r = i(A.images);
      n.length > 0 && (t.textures = n), r.length > 0 && (t.images = r);
    }
    return t;
  }
  fromJSON(A, e) {
    if (A.uuid !== void 0 && (this.uuid = A.uuid), A.name !== void 0 && (this.name = A.name), A.color !== void 0 && this.color !== void 0 && this.color.setHex(A.color), A.roughness !== void 0 && (this.roughness = A.roughness), A.metalness !== void 0 && (this.metalness = A.metalness), A.sheen !== void 0 && (this.sheen = A.sheen), A.sheenColor !== void 0 && (this.sheenColor = new HA().setHex(A.sheenColor)), A.sheenRoughness !== void 0 && (this.sheenRoughness = A.sheenRoughness), A.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(A.emissive), A.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(A.specular), A.specularIntensity !== void 0 && (this.specularIntensity = A.specularIntensity), A.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(A.specularColor), A.shininess !== void 0 && (this.shininess = A.shininess), A.clearcoat !== void 0 && (this.clearcoat = A.clearcoat), A.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = A.clearcoatRoughness), A.dispersion !== void 0 && (this.dispersion = A.dispersion), A.iridescence !== void 0 && (this.iridescence = A.iridescence), A.iridescenceIOR !== void 0 && (this.iridescenceIOR = A.iridescenceIOR), A.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = A.iridescenceThicknessRange), A.transmission !== void 0 && (this.transmission = A.transmission), A.thickness !== void 0 && (this.thickness = A.thickness), A.attenuationDistance !== void 0 && (this.attenuationDistance = A.attenuationDistance), A.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(A.attenuationColor), A.anisotropy !== void 0 && (this.anisotropy = A.anisotropy), A.anisotropyRotation !== void 0 && (this.anisotropyRotation = A.anisotropyRotation), A.fog !== void 0 && (this.fog = A.fog), A.flatShading !== void 0 && (this.flatShading = A.flatShading), A.blending !== void 0 && (this.blending = A.blending), A.combine !== void 0 && (this.combine = A.combine), A.side !== void 0 && (this.side = A.side), A.shadowSide !== void 0 && (this.shadowSide = A.shadowSide), A.opacity !== void 0 && (this.opacity = A.opacity), A.transparent !== void 0 && (this.transparent = A.transparent), A.alphaTest !== void 0 && (this.alphaTest = A.alphaTest), A.alphaHash !== void 0 && (this.alphaHash = A.alphaHash), A.depthFunc !== void 0 && (this.depthFunc = A.depthFunc), A.depthTest !== void 0 && (this.depthTest = A.depthTest), A.depthWrite !== void 0 && (this.depthWrite = A.depthWrite), A.colorWrite !== void 0 && (this.colorWrite = A.colorWrite), A.blendSrc !== void 0 && (this.blendSrc = A.blendSrc), A.blendDst !== void 0 && (this.blendDst = A.blendDst), A.blendEquation !== void 0 && (this.blendEquation = A.blendEquation), A.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = A.blendSrcAlpha), A.blendDstAlpha !== void 0 && (this.blendDstAlpha = A.blendDstAlpha), A.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = A.blendEquationAlpha), A.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(A.blendColor), A.blendAlpha !== void 0 && (this.blendAlpha = A.blendAlpha), A.stencilWriteMask !== void 0 && (this.stencilWriteMask = A.stencilWriteMask), A.stencilFunc !== void 0 && (this.stencilFunc = A.stencilFunc), A.stencilRef !== void 0 && (this.stencilRef = A.stencilRef), A.stencilFuncMask !== void 0 && (this.stencilFuncMask = A.stencilFuncMask), A.stencilFail !== void 0 && (this.stencilFail = A.stencilFail), A.stencilZFail !== void 0 && (this.stencilZFail = A.stencilZFail), A.stencilZPass !== void 0 && (this.stencilZPass = A.stencilZPass), A.stencilWrite !== void 0 && (this.stencilWrite = A.stencilWrite), A.wireframe !== void 0 && (this.wireframe = A.wireframe), A.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = A.wireframeLinewidth), A.wireframeLinecap !== void 0 && (this.wireframeLinecap = A.wireframeLinecap), A.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = A.wireframeLinejoin), A.rotation !== void 0 && (this.rotation = A.rotation), A.linewidth !== void 0 && (this.linewidth = A.linewidth), A.dashSize !== void 0 && (this.dashSize = A.dashSize), A.gapSize !== void 0 && (this.gapSize = A.gapSize), A.scale !== void 0 && (this.scale = A.scale), A.polygonOffset !== void 0 && (this.polygonOffset = A.polygonOffset), A.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = A.polygonOffsetFactor), A.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = A.polygonOffsetUnits), A.dithering !== void 0 && (this.dithering = A.dithering), A.alphaToCoverage !== void 0 && (this.alphaToCoverage = A.alphaToCoverage), A.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = A.premultipliedAlpha), A.forceSinglePass !== void 0 && (this.forceSinglePass = A.forceSinglePass), A.allowOverride !== void 0 && (this.allowOverride = A.allowOverride), A.visible !== void 0 && (this.visible = A.visible), A.toneMapped !== void 0 && (this.toneMapped = A.toneMapped), A.userData !== void 0 && (this.userData = A.userData), A.vertexColors !== void 0 && (typeof A.vertexColors == "number" ? this.vertexColors = A.vertexColors > 0 : this.vertexColors = A.vertexColors), A.size !== void 0 && (this.size = A.size), A.sizeAttenuation !== void 0 && (this.sizeAttenuation = A.sizeAttenuation), A.map !== void 0 && (this.map = e[A.map] || null), A.matcap !== void 0 && (this.matcap = e[A.matcap] || null), A.alphaMap !== void 0 && (this.alphaMap = e[A.alphaMap] || null), A.bumpMap !== void 0 && (this.bumpMap = e[A.bumpMap] || null), A.bumpScale !== void 0 && (this.bumpScale = A.bumpScale), A.normalMap !== void 0 && (this.normalMap = e[A.normalMap] || null), A.normalMapType !== void 0 && (this.normalMapType = A.normalMapType), A.normalScale !== void 0) {
      let t = A.normalScale;
      Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new bA().fromArray(t);
    }
    return A.displacementMap !== void 0 && (this.displacementMap = e[A.displacementMap] || null), A.displacementScale !== void 0 && (this.displacementScale = A.displacementScale), A.displacementBias !== void 0 && (this.displacementBias = A.displacementBias), A.roughnessMap !== void 0 && (this.roughnessMap = e[A.roughnessMap] || null), A.metalnessMap !== void 0 && (this.metalnessMap = e[A.metalnessMap] || null), A.emissiveMap !== void 0 && (this.emissiveMap = e[A.emissiveMap] || null), A.emissiveIntensity !== void 0 && (this.emissiveIntensity = A.emissiveIntensity), A.specularMap !== void 0 && (this.specularMap = e[A.specularMap] || null), A.specularIntensityMap !== void 0 && (this.specularIntensityMap = e[A.specularIntensityMap] || null), A.specularColorMap !== void 0 && (this.specularColorMap = e[A.specularColorMap] || null), A.envMap !== void 0 && (this.envMap = e[A.envMap] || null), A.envMapRotation !== void 0 && this.envMapRotation.fromArray(A.envMapRotation), A.envMapIntensity !== void 0 && (this.envMapIntensity = A.envMapIntensity), A.reflectivity !== void 0 && (this.reflectivity = A.reflectivity), A.refractionRatio !== void 0 && (this.refractionRatio = A.refractionRatio), A.lightMap !== void 0 && (this.lightMap = e[A.lightMap] || null), A.lightMapIntensity !== void 0 && (this.lightMapIntensity = A.lightMapIntensity), A.aoMap !== void 0 && (this.aoMap = e[A.aoMap] || null), A.aoMapIntensity !== void 0 && (this.aoMapIntensity = A.aoMapIntensity), A.gradientMap !== void 0 && (this.gradientMap = e[A.gradientMap] || null), A.clearcoatMap !== void 0 && (this.clearcoatMap = e[A.clearcoatMap] || null), A.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = e[A.clearcoatRoughnessMap] || null), A.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = e[A.clearcoatNormalMap] || null), A.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new bA().fromArray(A.clearcoatNormalScale)), A.iridescenceMap !== void 0 && (this.iridescenceMap = e[A.iridescenceMap] || null), A.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = e[A.iridescenceThicknessMap] || null), A.transmissionMap !== void 0 && (this.transmissionMap = e[A.transmissionMap] || null), A.thicknessMap !== void 0 && (this.thicknessMap = e[A.thicknessMap] || null), A.anisotropyMap !== void 0 && (this.anisotropyMap = e[A.anisotropyMap] || null), A.sheenColorMap !== void 0 && (this.sheenColorMap = e[A.sheenColorMap] || null), A.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = e[A.sheenRoughnessMap] || null), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(A) {
    this.name = A.name, this.blending = A.blending, this.side = A.side, this.vertexColors = A.vertexColors, this.opacity = A.opacity, this.transparent = A.transparent, this.blendSrc = A.blendSrc, this.blendDst = A.blendDst, this.blendEquation = A.blendEquation, this.blendSrcAlpha = A.blendSrcAlpha, this.blendDstAlpha = A.blendDstAlpha, this.blendEquationAlpha = A.blendEquationAlpha, this.blendColor.copy(A.blendColor), this.blendAlpha = A.blendAlpha, this.depthFunc = A.depthFunc, this.depthTest = A.depthTest, this.depthWrite = A.depthWrite, this.stencilWriteMask = A.stencilWriteMask, this.stencilFunc = A.stencilFunc, this.stencilRef = A.stencilRef, this.stencilFuncMask = A.stencilFuncMask, this.stencilFail = A.stencilFail, this.stencilZFail = A.stencilZFail, this.stencilZPass = A.stencilZPass, this.stencilWrite = A.stencilWrite;
    const e = A.clippingPlanes;
    let t = null;
    if (e !== null) {
      const i = e.length;
      t = new Array(i);
      for (let n = 0; n !== i; ++n) t[n] = e[n].clone();
    }
    return this.clippingPlanes = t, this.clipIntersection = A.clipIntersection, this.clipShadows = A.clipShadows, this.shadowSide = A.shadowSide, this.colorWrite = A.colorWrite, this.precision = A.precision, this.polygonOffset = A.polygonOffset, this.polygonOffsetFactor = A.polygonOffsetFactor, this.polygonOffsetUnits = A.polygonOffsetUnits, this.dithering = A.dithering, this.alphaTest = A.alphaTest, this.alphaHash = A.alphaHash, this.alphaToCoverage = A.alphaToCoverage, this.premultipliedAlpha = A.premultipliedAlpha, this.forceSinglePass = A.forceSinglePass, this.allowOverride = A.allowOverride, this.visible = A.visible, this.toneMapped = A.toneMapped, this.userData = JSON.parse(JSON.stringify(A.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(A) {
    A === !0 && this.version++;
  }
}, rt = /* @__PURE__ */ new N(), Kn = /* @__PURE__ */ new N(), ji = /* @__PURE__ */ new N(), wt = /* @__PURE__ */ new N(), Jn = /* @__PURE__ */ new N(), Zi = /* @__PURE__ */ new N(), qn = /* @__PURE__ */ new N(), zl = class {
  constructor(A = new N(), e = new N(0, 0, -1)) {
    this.origin = A, this.direction = e;
  }
  set(A, e) {
    return this.origin.copy(A), this.direction.copy(e), this;
  }
  copy(A) {
    return this.origin.copy(A.origin), this.direction.copy(A.direction), this;
  }
  at(A, e) {
    return e.copy(this.origin).addScaledVector(this.direction, A);
  }
  lookAt(A) {
    return this.direction.copy(A).sub(this.origin).normalize(), this;
  }
  recast(A) {
    return this.origin.copy(this.at(A, rt)), this;
  }
  closestPointToPoint(A, e) {
    e.subVectors(A, this.origin);
    const t = e.dot(this.direction);
    return t < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, t);
  }
  distanceToPoint(A) {
    return Math.sqrt(this.distanceSqToPoint(A));
  }
  distanceSqToPoint(A) {
    const e = rt.subVectors(A, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(A) : (rt.copy(this.origin).addScaledVector(this.direction, e), rt.distanceToSquared(A));
  }
  distanceSqToSegment(A, e, t, i) {
    Kn.copy(A).add(e).multiplyScalar(0.5), ji.copy(e).sub(A).normalize(), wt.copy(this.origin).sub(Kn);
    const n = A.distanceTo(e) * 0.5, r = -this.direction.dot(ji), s = wt.dot(this.direction), a = -wt.dot(ji), l = wt.lengthSq(), o = Math.abs(1 - r * r);
    let c, f, h, p;
    if (o > 0)
      if (c = r * a - s, f = r * s - a, p = n * o, c >= 0) if (f >= -p) if (f <= p) {
        const m = 1 / o;
        c *= m, f *= m, h = c * (c + r * f + 2 * s) + f * (r * c + f + 2 * a) + l;
      } else
        f = n, c = Math.max(0, -(r * f + s)), h = -c * c + f * (f + 2 * a) + l;
      else
        f = -n, c = Math.max(0, -(r * f + s)), h = -c * c + f * (f + 2 * a) + l;
      else f <= -p ? (c = Math.max(0, -(-r * n + s)), f = c > 0 ? -n : Math.min(Math.max(-n, -a), n), h = -c * c + f * (f + 2 * a) + l) : f <= p ? (c = 0, f = Math.min(Math.max(-n, -a), n), h = f * (f + 2 * a) + l) : (c = Math.max(0, -(r * n + s)), f = c > 0 ? n : Math.min(Math.max(-n, -a), n), h = -c * c + f * (f + 2 * a) + l);
    else
      f = r > 0 ? -n : n, c = Math.max(0, -(r * f + s)), h = -c * c + f * (f + 2 * a) + l;
    return t && t.copy(this.origin).addScaledVector(this.direction, c), i && i.copy(Kn).addScaledVector(ji, f), h;
  }
  intersectSphere(A, e) {
    rt.subVectors(A.center, this.origin);
    const t = rt.dot(this.direction), i = rt.dot(rt) - t * t, n = A.radius * A.radius;
    if (i > n) return null;
    const r = Math.sqrt(n - i), s = t - r, a = t + r;
    return a < 0 ? null : s < 0 ? this.at(a, e) : this.at(s, e);
  }
  intersectsSphere(A) {
    return A.radius < 0 ? !1 : this.distanceSqToPoint(A.center) <= A.radius * A.radius;
  }
  distanceToPlane(A) {
    const e = A.normal.dot(this.direction);
    if (e === 0)
      return A.distanceToPoint(this.origin) === 0 ? 0 : null;
    const t = -(this.origin.dot(A.normal) + A.constant) / e;
    return t >= 0 ? t : null;
  }
  intersectPlane(A, e) {
    const t = this.distanceToPlane(A);
    return t === null ? null : this.at(t, e);
  }
  intersectsPlane(A) {
    const e = A.distanceToPoint(this.origin);
    return e === 0 || A.normal.dot(this.direction) * e < 0;
  }
  intersectBox(A, e) {
    let t, i, n, r, s, a;
    const l = 1 / this.direction.x, o = 1 / this.direction.y, c = 1 / this.direction.z, f = this.origin;
    return l >= 0 ? (t = (A.min.x - f.x) * l, i = (A.max.x - f.x) * l) : (t = (A.max.x - f.x) * l, i = (A.min.x - f.x) * l), o >= 0 ? (n = (A.min.y - f.y) * o, r = (A.max.y - f.y) * o) : (n = (A.max.y - f.y) * o, r = (A.min.y - f.y) * o), t > r || n > i || ((n > t || isNaN(t)) && (t = n), (r < i || isNaN(i)) && (i = r), c >= 0 ? (s = (A.min.z - f.z) * c, a = (A.max.z - f.z) * c) : (s = (A.max.z - f.z) * c, a = (A.min.z - f.z) * c), t > a || s > i) || ((s > t || t !== t) && (t = s), (a < i || i !== i) && (i = a), i < 0) ? null : this.at(t >= 0 ? t : i, e);
  }
  intersectsBox(A) {
    return this.intersectBox(A, rt) !== null;
  }
  intersectTriangle(A, e, t, i, n) {
    Jn.subVectors(e, A), Zi.subVectors(t, A), qn.crossVectors(Jn, Zi);
    let r = this.direction.dot(qn), s;
    if (r > 0) {
      if (i) return null;
      s = 1;
    } else if (r < 0)
      s = -1, r = -r;
    else return null;
    wt.subVectors(this.origin, A);
    const a = s * this.direction.dot(Zi.crossVectors(wt, Zi));
    if (a < 0) return null;
    const l = s * this.direction.dot(Jn.cross(wt));
    if (l < 0 || a + l > r) return null;
    const o = -s * wt.dot(qn);
    return o < 0 ? null : this.at(o / r, n);
  }
  applyMatrix4(A) {
    return this.origin.applyMatrix4(A), this.direction.transformDirection(A), this;
  }
  equals(A) {
    return A.origin.equals(this.origin) && A.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Sa = class extends Fi {
  constructor(A) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new HA(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Li(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(A);
  }
  copy(A) {
    return super.copy(A), this.color.copy(A.color), this.map = A.map, this.lightMap = A.lightMap, this.lightMapIntensity = A.lightMapIntensity, this.aoMap = A.aoMap, this.aoMapIntensity = A.aoMapIntensity, this.specularMap = A.specularMap, this.alphaMap = A.alphaMap, this.envMap = A.envMap, this.envMapRotation.copy(A.envMapRotation), this.combine = A.combine, this.reflectivity = A.reflectivity, this.refractionRatio = A.refractionRatio, this.wireframe = A.wireframe, this.wireframeLinewidth = A.wireframeLinewidth, this.wireframeLinecap = A.wireframeLinecap, this.wireframeLinejoin = A.wireframeLinejoin, this.fog = A.fog, this;
  }
}, is = /* @__PURE__ */ new ae(), xt = /* @__PURE__ */ new zl(), $i = /* @__PURE__ */ new Er(), ns = /* @__PURE__ */ new N(), An = /* @__PURE__ */ new N(), en = /* @__PURE__ */ new N(), tn = /* @__PURE__ */ new N(), jn = /* @__PURE__ */ new N(), nn = /* @__PURE__ */ new N(), rs = /* @__PURE__ */ new N(), rn = /* @__PURE__ */ new N(), Ne = class extends be {
  constructor(A = new Ft(), e = new Sa()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = A, this.material = e, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(A, e) {
    return super.copy(A, e), A.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = A.morphTargetInfluences.slice()), A.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, A.morphTargetDictionary)), this.material = Array.isArray(A.material) ? A.material.slice() : A.material, this.geometry = A.geometry, this;
  }
  updateMorphTargets() {
    const A = this.geometry.morphAttributes, e = Object.keys(A);
    if (e.length > 0) {
      const t = A[e[0]];
      if (t !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, n = t.length; i < n; i++) {
          const r = t[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[r] = i;
        }
      }
    }
  }
  getVertexPosition(A, e) {
    const t = this.geometry, i = t.attributes.position, n = t.morphAttributes.position, r = t.morphTargetsRelative;
    e.fromBufferAttribute(i, A);
    const s = this.morphTargetInfluences;
    if (n && s) {
      nn.set(0, 0, 0);
      for (let a = 0, l = n.length; a < l; a++) {
        const o = s[a], c = n[a];
        o !== 0 && (jn.fromBufferAttribute(c, A), r ? nn.addScaledVector(jn, o) : nn.addScaledVector(jn.sub(e), o));
      }
      e.add(nn);
    }
    return e;
  }
  raycast(A, e) {
    const t = this.geometry, i = this.material, n = this.matrixWorld;
    i !== void 0 && (t.boundingSphere === null && t.computeBoundingSphere(), $i.copy(t.boundingSphere), $i.applyMatrix4(n), xt.copy(A.ray).recast(A.near), !($i.containsPoint(xt.origin) === !1 && (xt.intersectSphere($i, ns) === null || xt.origin.distanceToSquared(ns) > (A.far - A.near) ** 2)) && (is.copy(n).invert(), xt.copy(A.ray).applyMatrix4(is), !(t.boundingBox !== null && xt.intersectsBox(t.boundingBox) === !1) && this._computeIntersections(A, e, xt)));
  }
  _computeIntersections(A, e, t) {
    let i;
    const n = this.geometry, r = this.material, s = n.index, a = n.attributes.position, l = n.attributes.uv, o = n.attributes.uv1, c = n.attributes.normal, f = n.groups, h = n.drawRange;
    if (s !== null) if (Array.isArray(r)) for (let p = 0, m = f.length; p < m; p++) {
      const P = f[p], d = r[P.materialIndex], u = Math.max(P.start, h.start), x = Math.min(s.count, Math.min(P.start + P.count, h.start + h.count));
      for (let C = u, D = x; C < D; C += 3) {
        const M = s.getX(C), _ = s.getX(C + 1), I = s.getX(C + 2);
        i = sn(this, d, A, t, l, o, c, M, _, I), i && (i.faceIndex = Math.floor(C / 3), i.face.materialIndex = P.materialIndex, e.push(i));
      }
    }
    else {
      const p = Math.max(0, h.start), m = Math.min(s.count, h.start + h.count);
      for (let P = p, d = m; P < d; P += 3) {
        const u = s.getX(P), x = s.getX(P + 1), C = s.getX(P + 2);
        i = sn(this, r, A, t, l, o, c, u, x, C), i && (i.faceIndex = Math.floor(P / 3), e.push(i));
      }
    }
    else if (a !== void 0) if (Array.isArray(r)) for (let p = 0, m = f.length; p < m; p++) {
      const P = f[p], d = r[P.materialIndex], u = Math.max(P.start, h.start), x = Math.min(a.count, Math.min(P.start + P.count, h.start + h.count));
      for (let C = u, D = x; C < D; C += 3) {
        const M = C, _ = C + 1, I = C + 2;
        i = sn(this, d, A, t, l, o, c, M, _, I), i && (i.faceIndex = Math.floor(C / 3), i.face.materialIndex = P.materialIndex, e.push(i));
      }
    }
    else {
      const p = Math.max(0, h.start), m = Math.min(a.count, h.start + h.count);
      for (let P = p, d = m; P < d; P += 3) {
        const u = P, x = P + 1, C = P + 2;
        i = sn(this, r, A, t, l, o, c, u, x, C), i && (i.faceIndex = Math.floor(P / 3), e.push(i));
      }
    }
  }
};
function Ol(A, e, t, i, n, r, s, a) {
  let l;
  if (e.side === 1 ? l = i.intersectTriangle(s, r, n, !0, a) : l = i.intersectTriangle(n, r, s, e.side === 0, a), l === null) return null;
  rn.copy(a), rn.applyMatrix4(A.matrixWorld);
  const o = t.ray.origin.distanceTo(rn);
  return o < t.near || o > t.far ? null : {
    distance: o,
    point: rn.clone(),
    object: A
  };
}
function sn(A, e, t, i, n, r, s, a, l, o) {
  A.getVertexPosition(a, An), A.getVertexPosition(l, en), A.getVertexPosition(o, tn);
  const c = Ol(A, e, t, i, An, en, tn, rs);
  if (c) {
    const f = new N();
    vi.getBarycoord(rs, An, en, tn, f), n && (c.uv = vi.getInterpolatedAttribute(n, a, l, o, f, new bA())), r && (c.uv1 = vi.getInterpolatedAttribute(r, a, l, o, f, new bA())), s && (c.normal = vi.getInterpolatedAttribute(s, a, l, o, f, new N()), c.normal.dot(i.direction) > 0 && c.normal.multiplyScalar(-1));
    const h = {
      a,
      b: l,
      c: o,
      normal: new N(),
      materialIndex: 0
    };
    vi.getNormal(An, en, tn, h.normal), c.face = h, c.barycoord = f;
  }
  return c;
}
var Hl = class extends ze {
  constructor(A = null, e = 1, t = 1, i, n, r, s, a, l = Me, o = Me, c, f) {
    super(null, r, s, a, l, o, i, n, c, f), this.isDataTexture = !0, this.image = {
      data: A,
      width: e,
      height: t
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Zn = /* @__PURE__ */ new N(), Vl = /* @__PURE__ */ new N(), Gl = /* @__PURE__ */ new TA(), St = class {
  constructor(A = new N(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = A, this.constant = e;
  }
  set(A, e) {
    return this.normal.copy(A), this.constant = e, this;
  }
  setComponents(A, e, t, i) {
    return this.normal.set(A, e, t), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(A, e) {
    return this.normal.copy(A), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(A, e, t) {
    const i = Zn.subVectors(t, e).cross(Vl.subVectors(A, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, A), this;
  }
  copy(A) {
    return this.normal.copy(A.normal), this.constant = A.constant, this;
  }
  normalize() {
    const A = 1 / this.normal.length();
    return this.normal.multiplyScalar(A), this.constant *= A, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(A) {
    return this.normal.dot(A) + this.constant;
  }
  distanceToSphere(A) {
    return this.distanceToPoint(A.center) - A.radius;
  }
  projectPoint(A, e) {
    return e.copy(A).addScaledVector(this.normal, -this.distanceToPoint(A));
  }
  intersectLine(A, e, t = !0) {
    const i = A.delta(Zn), n = this.normal.dot(i);
    if (n === 0)
      return this.distanceToPoint(A.start) === 0 ? e.copy(A.start) : null;
    const r = -(A.start.dot(this.normal) + this.constant) / n;
    return t === !0 && (r < 0 || r > 1) ? null : e.copy(A.start).addScaledVector(i, r);
  }
  intersectsLine(A) {
    const e = this.distanceToPoint(A.start), t = this.distanceToPoint(A.end);
    return e < 0 && t > 0 || t < 0 && e > 0;
  }
  intersectsBox(A) {
    return A.intersectsPlane(this);
  }
  intersectsSphere(A) {
    return A.intersectsPlane(this);
  }
  coplanarPoint(A) {
    return A.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(A, e) {
    const t = e || Gl.getNormalMatrix(A), i = this.coplanarPoint(Zn).applyMatrix4(A), n = this.normal.applyMatrix3(t).normalize();
    return this.constant = -i.dot(n), this;
  }
  translate(A) {
    return this.constant -= A.dot(this.normal), this;
  }
  equals(A) {
    return A.normal.equals(this.normal) && A.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, _t = /* @__PURE__ */ new Er(), kl = /* @__PURE__ */ new bA(0.5, 0.5), an = /* @__PURE__ */ new N(), Br = class {
  constructor(A = new St(), e = new St(), t = new St(), i = new St(), n = new St(), r = new St()) {
    this.planes = [
      A,
      e,
      t,
      i,
      n,
      r
    ];
  }
  set(A, e, t, i, n, r) {
    const s = this.planes;
    return s[0].copy(A), s[1].copy(e), s[2].copy(t), s[3].copy(i), s[4].copy(n), s[5].copy(r), this;
  }
  copy(A) {
    const e = this.planes;
    for (let t = 0; t < 6; t++) e[t].copy(A.planes[t]);
    return this;
  }
  setFromProjectionMatrix(A, e = li, t = !1) {
    const i = this.planes, n = A.elements, r = n[0], s = n[1], a = n[2], l = n[3], o = n[4], c = n[5], f = n[6], h = n[7], p = n[8], m = n[9], P = n[10], d = n[11], u = n[12], x = n[13], C = n[14], D = n[15];
    if (i[0].setComponents(l - r, h - o, d - p, D - u).normalize(), i[1].setComponents(l + r, h + o, d + p, D + u).normalize(), i[2].setComponents(l + s, h + c, d + m, D + x).normalize(), i[3].setComponents(l - s, h - c, d - m, D - x).normalize(), t)
      i[4].setComponents(a, f, P, C).normalize(), i[5].setComponents(l - a, h - f, d - P, D - C).normalize();
    else if (i[4].setComponents(l - a, h - f, d - P, D - C).normalize(), e === 2e3) i[5].setComponents(l + a, h + f, d + P, D + C).normalize();
    else if (e === 2001) i[5].setComponents(a, f, P, C).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(A) {
    if (A.boundingSphere !== void 0)
      A.boundingSphere === null && A.computeBoundingSphere(), _t.copy(A.boundingSphere).applyMatrix4(A.matrixWorld);
    else {
      const e = A.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), _t.copy(e.boundingSphere).applyMatrix4(A.matrixWorld);
    }
    return this.intersectsSphere(_t);
  }
  intersectsSprite(A) {
    return _t.center.set(0, 0, 0), _t.radius = 0.7071067811865476 + kl.distanceTo(A.center), _t.applyMatrix4(A.matrixWorld), this.intersectsSphere(_t);
  }
  intersectsSphere(A) {
    const e = this.planes, t = A.center, i = -A.radius;
    for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < i) return !1;
    return !0;
  }
  intersectsBox(A) {
    const e = this.planes;
    for (let t = 0; t < 6; t++) {
      const i = e[t];
      if (an.x = i.normal.x > 0 ? A.max.x : A.min.x, an.y = i.normal.y > 0 ? A.max.y : A.min.y, an.z = i.normal.z > 0 ? A.max.z : A.min.z, i.distanceToPoint(an) < 0) return !1;
    }
    return !0;
  }
  containsPoint(A) {
    const e = this.planes;
    for (let t = 0; t < 6; t++) if (e[t].distanceToPoint(A) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Ia = class extends ze {
  constructor(A = [], e = 301, t, i, n, r, s, a, l, o) {
    super(A, e, t, i, n, r, s, a, l, o), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(A) {
    this.image = A;
  }
}, Wl = class extends ze {
  constructor(A, e, t, i, n, r, s, a, l) {
    super(A, e, t, i, n, r, s, a, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}, hi = class extends ze {
  constructor(A, e, t = bt, i, n, r, s = Me, a = Me, l, o = bi, c = 1) {
    if (o !== 1026 && o !== 1027) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: A,
      height: e,
      depth: c
    }, i, n, r, s, a, o, t, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(A) {
    return super.copy(A), this.source = new Dr(Object.assign({}, A.image)), this.compareFunction = A.compareFunction, this;
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}, Xl = class extends hi {
  constructor(A, e = bt, t = 301, i, n, r = Me, s = Me, a, l = bi) {
    const o = {
      width: A,
      height: A,
      depth: 1
    }, c = [
      o,
      o,
      o,
      o,
      o,
      o
    ];
    super(A, A, e, t, i, n, r, s, a, l), this.image = c, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(A) {
    this.image = A;
  }
}, ya = class extends ze {
  constructor(A = null) {
    super(), this.sourceTexture = A, this.isExternalTexture = !0;
  }
  copy(A) {
    return super.copy(A), this.sourceTexture = A.sourceTexture, this;
  }
}, Mr = class Qa extends Ft {
  constructor(e = 1, t = 1, i = 1, n = 1, r = 1, s = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: i,
      widthSegments: n,
      heightSegments: r,
      depthSegments: s
    };
    const a = this;
    n = Math.floor(n), r = Math.floor(r), s = Math.floor(s);
    const l = [], o = [], c = [], f = [];
    let h = 0, p = 0;
    m("z", "y", "x", -1, -1, i, t, e, s, r, 0), m("z", "y", "x", 1, -1, i, t, -e, s, r, 1), m("x", "z", "y", 1, 1, e, i, t, n, s, 2), m("x", "z", "y", 1, -1, e, i, -t, n, s, 3), m("x", "y", "z", 1, -1, e, t, i, n, r, 4), m("x", "y", "z", -1, -1, e, t, -i, n, r, 5), this.setIndex(l), this.setAttribute("position", new ft(o, 3)), this.setAttribute("normal", new ft(c, 3)), this.setAttribute("uv", new ft(f, 2));
    function m(P, d, u, x, C, D, M, _, I, v, B) {
      const W = D / I, S = M / v, V = D / 2, k = M / 2, G = _ / 2, z = I + 1, X = v + 1;
      let L = 0, q = 0;
      const AA = new N();
      for (let eA = 0; eA < X; eA++) {
        const cA = eA * S - k;
        for (let PA = 0; PA < z; PA++)
          AA[P] = (PA * W - V) * x, AA[d] = cA * C, AA[u] = G, o.push(AA.x, AA.y, AA.z), AA[P] = 0, AA[d] = 0, AA[u] = _ > 0 ? 1 : -1, c.push(AA.x, AA.y, AA.z), f.push(PA / I), f.push(1 - eA / v), L += 1;
      }
      for (let eA = 0; eA < v; eA++) for (let cA = 0; cA < I; cA++) {
        const PA = h + cA + z * eA, WA = h + cA + z * (eA + 1), KA = h + (cA + 1) + z * (eA + 1), Y = h + (cA + 1) + z * eA;
        l.push(PA, WA, Y), l.push(WA, KA, Y), q += 6;
      }
      a.addGroup(p, q, B), p += q, h += L;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Qa(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}, Qi = class Ta extends Ft {
  constructor(e = 1, t = 1, i = 1, n = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: i,
      heightSegments: n
    };
    const r = e / 2, s = t / 2, a = Math.floor(i), l = Math.floor(n), o = a + 1, c = l + 1, f = e / a, h = t / l, p = [], m = [], P = [], d = [];
    for (let u = 0; u < c; u++) {
      const x = u * h - s;
      for (let C = 0; C < o; C++) {
        const D = C * f - r;
        m.push(D, -x, 0), P.push(0, 0, 1), d.push(C / a), d.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++) for (let x = 0; x < a; x++) {
      const C = x + o * u, D = x + o * (u + 1), M = x + 1 + o * (u + 1), _ = x + 1 + o * u;
      p.push(C, D, _), p.push(D, M, _);
    }
    this.setIndex(p), this.setAttribute("position", new ft(m, 3)), this.setAttribute("normal", new ft(P, 3)), this.setAttribute("uv", new ft(d, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Ta(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}, Yl = class extends Fi {
  constructor(A) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new HA(0), this.transparent = !0, this.fog = !0, this.setValues(A);
  }
  copy(A) {
    return super.copy(A), this.color.copy(A.color), this.fog = A.fog, this;
  }
};
function fi(A) {
  const e = {};
  for (const t in A) {
    e[t] = {};
    for (const i in A[t]) {
      const n = A[t][i];
      if (ss(n)) n.isRenderTargetTexture ? (MA("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][i] = null) : e[t][i] = n.clone();
      else if (Array.isArray(n)) if (ss(n[0])) {
        const r = [];
        for (let s = 0, a = n.length; s < a; s++) r[s] = n[s].clone();
        e[t][i] = r;
      } else e[t][i] = n.slice();
      else e[t][i] = n;
    }
  }
  return e;
}
function Be(A) {
  const e = {};
  for (let t = 0; t < A.length; t++) {
    const i = fi(A[t]);
    for (const n in i) e[n] = i[n];
  }
  return e;
}
function ss(A) {
  return A && (A.isColor || A.isMatrix3 || A.isMatrix4 || A.isVector2 || A.isVector3 || A.isVector4 || A.isTexture || A.isQuaternion);
}
function Kl(A) {
  const e = [];
  for (let t = 0; t < A.length; t++) e.push(A[t].clone());
  return e;
}
function ba(A) {
  const e = A.getRenderTarget();
  return e === null ? A.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : OA.workingColorSpace;
}
var Ra = {
  clone: fi,
  merge: Be
}, Jl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ql = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, Te = class extends Fi {
  constructor(A) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Jl, this.fragmentShader = ql, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, A !== void 0 && this.setValues(A);
  }
  copy(A) {
    return super.copy(A), this.fragmentShader = A.fragmentShader, this.vertexShader = A.vertexShader, this.uniforms = fi(A.uniforms), this.uniformsGroups = Kl(A.uniformsGroups), this.defines = Object.assign({}, A.defines), this.wireframe = A.wireframe, this.wireframeLinewidth = A.wireframeLinewidth, this.fog = A.fog, this.lights = A.lights, this.clipping = A.clipping, this.extensions = Object.assign({}, A.extensions), this.glslVersion = A.glslVersion, this.defaultAttributeValues = Object.assign({}, A.defaultAttributeValues), this.index0AttributeName = A.index0AttributeName, this.uniformsNeedUpdate = A.uniformsNeedUpdate, this;
  }
  toJSON(A) {
    const e = super.toJSON(A);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const i in this.uniforms) {
      const n = this.uniforms[i].value;
      n && n.isTexture ? e.uniforms[i] = {
        type: "t",
        value: n.toJSON(A).uuid
      } : n && n.isColor ? e.uniforms[i] = {
        type: "c",
        value: n.getHex()
      } : n && n.isVector2 ? e.uniforms[i] = {
        type: "v2",
        value: n.toArray()
      } : n && n.isVector3 ? e.uniforms[i] = {
        type: "v3",
        value: n.toArray()
      } : n && n.isVector4 ? e.uniforms[i] = {
        type: "v4",
        value: n.toArray()
      } : n && n.isMatrix3 ? e.uniforms[i] = {
        type: "m3",
        value: n.toArray()
      } : n && n.isMatrix4 ? e.uniforms[i] = {
        type: "m4",
        value: n.toArray()
      } : e.uniforms[i] = { value: n };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const t = {};
    for (const i in this.extensions) this.extensions[i] === !0 && (t[i] = !0);
    return Object.keys(t).length > 0 && (e.extensions = t), e;
  }
  fromJSON(A, e) {
    if (super.fromJSON(A, e), A.uniforms !== void 0) for (const t in A.uniforms) {
      const i = A.uniforms[t];
      switch (this.uniforms[t] = {}, i.type) {
        case "t":
          this.uniforms[t].value = e[i.value] || null;
          break;
        case "c":
          this.uniforms[t].value = new HA().setHex(i.value);
          break;
        case "v2":
          this.uniforms[t].value = new bA().fromArray(i.value);
          break;
        case "v3":
          this.uniforms[t].value = new N().fromArray(i.value);
          break;
        case "v4":
          this.uniforms[t].value = new re().fromArray(i.value);
          break;
        case "m3":
          this.uniforms[t].value = new TA().fromArray(i.value);
          break;
        case "m4":
          this.uniforms[t].value = new ae().fromArray(i.value);
          break;
        default:
          this.uniforms[t].value = i.value;
      }
    }
    if (A.defines !== void 0 && (this.defines = A.defines), A.vertexShader !== void 0 && (this.vertexShader = A.vertexShader), A.fragmentShader !== void 0 && (this.fragmentShader = A.fragmentShader), A.glslVersion !== void 0 && (this.glslVersion = A.glslVersion), A.extensions !== void 0) for (const t in A.extensions) this.extensions[t] = A.extensions[t];
    return A.lights !== void 0 && (this.lights = A.lights), A.clipping !== void 0 && (this.clipping = A.clipping), this;
  }
}, jl = class extends Te {
  constructor(A) {
    super(A), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, Zl = class extends Fi {
  constructor(A) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Zo, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(A);
  }
  copy(A) {
    return super.copy(A), this.depthPacking = A.depthPacking, this.map = A.map, this.alphaMap = A.alphaMap, this.displacementMap = A.displacementMap, this.displacementScale = A.displacementScale, this.displacementBias = A.displacementBias, this.wireframe = A.wireframe, this.wireframeLinewidth = A.wireframeLinewidth, this;
  }
}, $l = class extends Fi {
  constructor(A) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(A);
  }
  copy(A) {
    return super.copy(A), this.map = A.map, this.alphaMap = A.alphaMap, this.displacementMap = A.displacementMap, this.displacementScale = A.displacementScale, this.displacementBias = A.displacementBias, this;
  }
};
function on(A, e) {
  return !A || A.constructor === e ? A : typeof e.BYTES_PER_ELEMENT == "number" ? new e(A) : Array.prototype.slice.call(A);
}
var Ni = class {
  constructor(A, e, t, i) {
    this.parameterPositions = A, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new e.constructor(t), this.sampleValues = e, this.valueSize = t, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(A) {
    const e = this.parameterPositions;
    let t = this._cachedIndex, i = e[t], n = e[t - 1];
    t: {
      A: {
        let r;
        e: {
          i: if (!(A < i)) {
            for (let s = t + 2; ; ) {
              if (i === void 0) {
                if (A < n) break i;
                return t = e.length, this._cachedIndex = t, this.copySampleValue_(t - 1);
              }
              if (t === s) break;
              if (n = i, i = e[++t], A < i) break A;
            }
            r = e.length;
            break e;
          }
          if (!(A >= n)) {
            const s = e[1];
            A < s && (t = 2, n = s);
            for (let a = t - 2; ; ) {
              if (n === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (t === a) break;
              if (i = n, n = e[--t - 1], A >= n) break A;
            }
            r = t, t = 0;
            break e;
          }
          break t;
        }
        for (; t < r; ) {
          const s = t + r >>> 1;
          A < e[s] ? r = s : t = s + 1;
        }
        if (i = e[t], n = e[t - 1], n === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0)
          return t = e.length, this._cachedIndex = t, this.copySampleValue_(t - 1);
      }
      this._cachedIndex = t, this.intervalChanged_(t, n, i);
    }
    return this.interpolate_(t, n, A, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(A) {
    const e = this.resultBuffer, t = this.sampleValues, i = this.valueSize, n = A * i;
    for (let r = 0; r !== i; ++r) e[r] = t[n + r];
    return e;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {
  }
}, Ac = class extends Ni {
  constructor(A, e, t, i) {
    super(A, e, t, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: Or,
      endingEnd: Or
    };
  }
  intervalChanged_(A, e, t) {
    const i = this.parameterPositions;
    let n = A - 2, r = A + 1, s = i[n], a = i[r];
    if (s === void 0) switch (this.getSettings_().endingStart) {
      case Hr:
        n = A, s = 2 * e - t;
        break;
      case Vr:
        n = i.length - 2, s = e + i[n] - i[n + 1];
        break;
      default:
        n = A, s = t;
    }
    if (a === void 0) switch (this.getSettings_().endingEnd) {
      case Hr:
        r = A, a = 2 * t - e;
        break;
      case Vr:
        r = 1, a = t + i[1] - i[0];
        break;
      default:
        r = A - 1, a = e;
    }
    const l = (t - e) * 0.5, o = this.valueSize;
    this._weightPrev = l / (e - s), this._weightNext = l / (a - t), this._offsetPrev = n * o, this._offsetNext = r * o;
  }
  interpolate_(A, e, t, i) {
    const n = this.resultBuffer, r = this.sampleValues, s = this.valueSize, a = A * s, l = a - s, o = this._offsetPrev, c = this._offsetNext, f = this._weightPrev, h = this._weightNext, p = (t - e) / (i - e), m = p * p, P = m * p, d = -f * P + 2 * f * m - f * p, u = (1 + f) * P + (-1.5 - 2 * f) * m + (-0.5 + f) * p + 1, x = (-1 - h) * P + (1.5 + h) * m + 0.5 * p, C = h * P - h * m;
    for (let D = 0; D !== s; ++D) n[D] = d * r[o + D] + u * r[l + D] + x * r[a + D] + C * r[c + D];
    return n;
  }
}, ec = class extends Ni {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
  interpolate_(A, e, t, i) {
    const n = this.resultBuffer, r = this.sampleValues, s = this.valueSize, a = A * s, l = a - s, o = (t - e) / (i - e), c = 1 - o;
    for (let f = 0; f !== s; ++f) n[f] = r[l + f] * c + r[a + f] * o;
    return n;
  }
}, tc = class extends Ni {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
  interpolate_(A) {
    return this.copySampleValue_(A - 1);
  }
}, ic = class extends Ni {
  interpolate_(A, e, t, i) {
    const n = this.resultBuffer, r = this.sampleValues, s = this.valueSize, a = A * s, l = a - s, o = this.inTangents, c = this.outTangents;
    if (!o || !c) {
      const p = (t - e) / (i - e), m = 1 - p;
      for (let P = 0; P !== s; ++P) n[P] = r[l + P] * m + r[a + P] * p;
      return n;
    }
    const f = s * 2, h = A - 1;
    for (let p = 0; p !== s; ++p) {
      const m = r[l + p], P = r[a + p], d = h * f + p * 2, u = c[d], x = c[d + 1], C = A * f + p * 2, D = o[C], M = o[C + 1];
      let _ = (t - e) / (i - e), I, v, B, W, S;
      for (let V = 0; V < 8; V++) {
        I = _ * _, v = I * _, B = 1 - _, W = B * B, S = W * B;
        const k = S * e + 3 * W * _ * u + 3 * B * I * D + v * i - t;
        if (Math.abs(k) < 1e-10) break;
        const G = 3 * W * (u - e) + 6 * B * _ * (D - u) + 3 * I * (i - D);
        if (Math.abs(G) < 1e-10) break;
        _ = _ - k / G, _ = Math.max(0, Math.min(1, _));
      }
      n[p] = S * m + 3 * W * _ * x + 3 * B * I * M + v * P;
    }
    return n;
  }
}, $e = class {
  constructor(A, e, t, i) {
    if (A === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + A);
    this.name = A, this.times = on(e, this.TimeBufferType), this.values = on(t, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(A) {
    const e = A.constructor;
    let t;
    if (e.toJSON !== this.toJSON) t = e.toJSON(A);
    else {
      t = {
        name: A.name,
        times: on(A.times, Array),
        values: on(A.values, Array)
      };
      const i = A.getInterpolation();
      i !== A.DefaultInterpolation && (t.interpolation = i);
    }
    return t.type = A.ValueTypeName, t;
  }
  InterpolantFactoryMethodDiscrete(A) {
    return new tc(this.times, this.values, this.getValueSize(), A);
  }
  InterpolantFactoryMethodLinear(A) {
    return new ec(this.times, this.values, this.getValueSize(), A);
  }
  InterpolantFactoryMethodSmooth(A) {
    return new Ac(this.times, this.values, this.getValueSize(), A);
  }
  InterpolantFactoryMethodBezier(A) {
    const e = new ic(this.times, this.values, this.getValueSize(), A);
    return this.settings && (e.inTangents = this.settings.inTangents, e.outTangents = this.settings.outTangents), e;
  }
  setInterpolation(A) {
    let e;
    switch (A) {
      case mn:
        e = this.InterpolantFactoryMethodDiscrete;
        break;
      case dr:
        e = this.InterpolantFactoryMethodLinear;
        break;
      case In:
        e = this.InterpolantFactoryMethodSmooth;
        break;
      case zr:
        e = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (e === void 0) {
      const t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (A !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(t);
      return MA("KeyframeTrack:", t), this;
    }
    return this.createInterpolant = e, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return mn;
      case this.InterpolantFactoryMethodLinear:
        return dr;
      case this.InterpolantFactoryMethodSmooth:
        return In;
      case this.InterpolantFactoryMethodBezier:
        return zr;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(A) {
    if (A !== 0) {
      const e = this.times;
      for (let t = 0, i = e.length; t !== i; ++t) e[t] += A;
    }
    return this;
  }
  scale(A) {
    if (A !== 1) {
      const e = this.times;
      for (let t = 0, i = e.length; t !== i; ++t) e[t] *= A;
    }
    return this;
  }
  trim(A, e) {
    const t = this.times, i = t.length;
    let n = 0, r = i - 1;
    for (; n !== i && t[n] < A; ) ++n;
    for (; r !== -1 && t[r] > e; ) --r;
    if (++r, n !== 0 || r !== i) {
      n >= r && (r = Math.max(r, 1), n = r - 1);
      const s = this.getValueSize();
      this.times = t.slice(n, r), this.values = this.values.slice(n * s, r * s);
    }
    return this;
  }
  validate() {
    let A = !0;
    const e = this.getValueSize();
    e - Math.floor(e) !== 0 && (IA("KeyframeTrack: Invalid value size in track.", this), A = !1);
    const t = this.times, i = this.values, n = t.length;
    n === 0 && (IA("KeyframeTrack: Track is empty.", this), A = !1);
    let r = null;
    for (let s = 0; s !== n; s++) {
      const a = t[s];
      if (typeof a == "number" && isNaN(a)) {
        IA("KeyframeTrack: Time is not a valid number.", this, s, a), A = !1;
        break;
      }
      if (r !== null && r > a) {
        IA("KeyframeTrack: Out of order keys.", this, s, a, r), A = !1;
        break;
      }
      r = a;
    }
    if (i !== void 0 && el(i))
      for (let s = 0, a = i.length; s !== a; ++s) {
        const l = i[s];
        if (isNaN(l)) {
          IA("KeyframeTrack: Value is not a valid number.", this, s, l), A = !1;
          break;
        }
      }
    return A;
  }
  optimize() {
    const A = this.times.slice(), e = this.values.slice(), t = this.getValueSize(), i = this.getInterpolation() === In, n = A.length - 1;
    let r = 1;
    for (let s = 1; s < n; ++s) {
      let a = !1;
      const l = A[s];
      if (l !== A[s + 1] && (s !== 1 || l !== A[0])) if (i)
        a = !0;
      else {
        const o = s * t, c = o - t, f = o + t;
        for (let h = 0; h !== t; ++h) {
          const p = e[o + h];
          if (p !== e[c + h] || p !== e[f + h]) {
            a = !0;
            break;
          }
        }
      }
      if (a) {
        if (s !== r) {
          A[r] = A[s];
          const o = s * t, c = r * t;
          for (let f = 0; f !== t; ++f) e[c + f] = e[o + f];
        }
        ++r;
      }
    }
    if (n > 0) {
      A[r] = A[n];
      for (let s = n * t, a = r * t, l = 0; l !== t; ++l) e[a + l] = e[s + l];
      ++r;
    }
    return r !== A.length ? (this.times = A.slice(0, r), this.values = e.slice(0, r * t)) : (this.times = A, this.values = e), this;
  }
  clone() {
    const A = this.times.slice(), e = this.values.slice(), t = this.constructor, i = new t(this.name, A, e);
    return i.createInterpolant = this.createInterpolant, i;
  }
};
$e.prototype.ValueTypeName = "";
$e.prototype.TimeBufferType = Float32Array;
$e.prototype.ValueBufferType = Float32Array;
$e.prototype.DefaultInterpolation = dr;
var zi = class extends $e {
  constructor(A, e, t) {
    super(A, e, t);
  }
};
zi.prototype.ValueTypeName = "bool";
zi.prototype.ValueBufferType = Array;
zi.prototype.DefaultInterpolation = mn;
zi.prototype.InterpolantFactoryMethodLinear = void 0;
zi.prototype.InterpolantFactoryMethodSmooth = void 0;
var nc = class extends $e {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
};
nc.prototype.ValueTypeName = "color";
var rc = class extends $e {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
};
rc.prototype.ValueTypeName = "number";
var sc = class extends Ni {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
  interpolate_(A, e, t, i) {
    const n = this.resultBuffer, r = this.sampleValues, s = this.valueSize, a = (t - e) / (i - e);
    let l = A * s;
    for (let o = l + s; l !== o; l += 4) Ut.slerpFlat(n, 0, r, l - s, r, l, a);
    return n;
  }
}, La = class extends $e {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
  InterpolantFactoryMethodLinear(A) {
    return new sc(this.times, this.values, this.getValueSize(), A);
  }
};
La.prototype.ValueTypeName = "quaternion";
La.prototype.InterpolantFactoryMethodSmooth = void 0;
var Oi = class extends $e {
  constructor(A, e, t) {
    super(A, e, t);
  }
};
Oi.prototype.ValueTypeName = "string";
Oi.prototype.ValueBufferType = Array;
Oi.prototype.DefaultInterpolation = mn;
Oi.prototype.InterpolantFactoryMethodLinear = void 0;
Oi.prototype.InterpolantFactoryMethodSmooth = void 0;
var ac = class extends $e {
  constructor(A, e, t, i) {
    super(A, e, t, i);
  }
};
ac.prototype.ValueTypeName = "vector";
var oc = class {
  constructor(A, e, t) {
    const i = this;
    let n = !1, r = 0, s = 0, a;
    const l = [];
    this.onStart = void 0, this.onLoad = A, this.onProgress = e, this.onError = t, this._abortController = null, this.itemStart = function(o) {
      s++, n === !1 && i.onStart !== void 0 && i.onStart(o, r, s), n = !0;
    }, this.itemEnd = function(o) {
      r++, i.onProgress !== void 0 && i.onProgress(o, r, s), r === s && (n = !1, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(o) {
      i.onError !== void 0 && i.onError(o);
    }, this.resolveURL = function(o) {
      return o = o.normalize("NFC"), a ? a(o) : o;
    }, this.setURLModifier = function(o) {
      return a = o, this;
    }, this.addHandler = function(o, c) {
      return l.push(o, c), this;
    }, this.removeHandler = function(o) {
      const c = l.indexOf(o);
      return c !== -1 && l.splice(c, 2), this;
    }, this.getHandler = function(o) {
      for (let c = 0, f = l.length; c < f; c += 2) {
        const h = l[c], p = l[c + 1];
        if (h.global && (h.lastIndex = 0), h.test(o)) return p;
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
  constructor(A) {
    this.manager = A !== void 0 ? A : lc, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  load() {
  }
  loadAsync(A, e) {
    const t = this;
    return new Promise(function(i, n) {
      t.load(A, i, e, n);
    });
  }
  parse() {
  }
  setCrossOrigin(A) {
    return this.crossOrigin = A, this;
  }
  setWithCredentials(A) {
    return this.withCredentials = A, this;
  }
  setPath(A) {
    return this.path = A, this;
  }
  setResourcePath(A) {
    return this.resourcePath = A, this;
  }
  setRequestHeader(A) {
    return this.requestHeader = A, this;
  }
  abort() {
    return this;
  }
};
cc.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var hc = class extends be {
  constructor(A, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new HA(A), this.intensity = e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(A, e) {
    return super.copy(A, e), this.color.copy(A.color), this.intensity = A.intensity, this;
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, e;
  }
}, $n = /* @__PURE__ */ new ae(), as = /* @__PURE__ */ new N(), os = /* @__PURE__ */ new N(), fc = class {
  constructor(A) {
    this.camera = A, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new bA(512, 512), this.mapType = Et, this.map = null, this.mapPass = null, this.matrix = new ae(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Br(), this._frameExtents = new bA(1, 1), this._viewportCount = 1, this._viewports = [new re(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(A) {
    const e = this.camera, t = this.matrix;
    as.setFromMatrixPosition(A.matrixWorld), e.position.copy(as), os.setFromMatrixPosition(A.target.matrixWorld), e.lookAt(os), e.updateMatrixWorld(), $n.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix($n, e.coordinateSystem, e.reversedDepth), e.coordinateSystem === 2001 || e.reversedDepth ? t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), t.multiply($n);
  }
  getViewport(A) {
    return this._viewports[A];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(A) {
    return this.camera = A.camera.clone(), this.intensity = A.intensity, this.bias = A.bias, this.radius = A.radius, this.autoUpdate = A.autoUpdate, this.needsUpdate = A.needsUpdate, this.normalBias = A.normalBias, this.blurSamples = A.blurSamples, this.mapSize.copy(A.mapSize), this.biasNode = A.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const A = {};
    return this.intensity !== 1 && (A.intensity = this.intensity), this.bias !== 0 && (A.bias = this.bias), this.normalBias !== 0 && (A.normalBias = this.normalBias), this.radius !== 1 && (A.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (A.mapSize = this.mapSize.toArray()), A.camera = this.camera.toJSON(!1).object, delete A.camera.matrix, A;
  }
}, ln = /* @__PURE__ */ new N(), cn = /* @__PURE__ */ new Ut(), Ke = /* @__PURE__ */ new N(), Ua = class extends be {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ae(), this.projectionMatrix = new ae(), this.projectionMatrixInverse = new ae(), this.coordinateSystem = li, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(A, e) {
    return super.copy(A, e), this.matrixWorldInverse.copy(A.matrixWorldInverse), this.projectionMatrix.copy(A.projectionMatrix), this.projectionMatrixInverse.copy(A.projectionMatrixInverse), this.coordinateSystem = A.coordinateSystem, this;
  }
  getWorldDirection(A) {
    return super.getWorldDirection(A).negate();
  }
  updateMatrixWorld(A) {
    super.updateMatrixWorld(A), this.matrixWorld.decompose(ln, cn, Ke), Ke.x === 1 && Ke.y === 1 && Ke.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ln, cn, Ke.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(A, e, t = !1) {
    super.updateWorldMatrix(A, e, t), this.matrixWorld.decompose(ln, cn, Ke), Ke.x === 1 && Ke.y === 1 && Ke.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ln, cn, Ke.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Pt = /* @__PURE__ */ new N(), ls = /* @__PURE__ */ new bA(), cs = /* @__PURE__ */ new bA(), We = class extends Ua {
  constructor(A = 50, e = 1, t = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = A, this.zoom = 1, this.near = t, this.far = i, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(A, e) {
    return super.copy(A, e), this.fov = A.fov, this.zoom = A.zoom, this.near = A.near, this.far = A.far, this.focus = A.focus, this.aspect = A.aspect, this.view = A.view === null ? null : Object.assign({}, A.view), this.filmGauge = A.filmGauge, this.filmOffset = A.filmOffset, this;
  }
  setFocalLength(A) {
    const e = 0.5 * this.getFilmHeight() / A;
    this.fov = Ri * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const A = Math.tan(Ii * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / A;
  }
  getEffectiveFOV() {
    return Ri * 2 * Math.atan(Math.tan(Ii * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(A, e, t) {
    Pt.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(Pt.x, Pt.y).multiplyScalar(-A / Pt.z), Pt.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Pt.x, Pt.y).multiplyScalar(-A / Pt.z);
  }
  getViewSize(A, e) {
    return this.getViewBounds(A, ls, cs), e.subVectors(cs, ls);
  }
  setViewOffset(A, e, t, i, n, r) {
    this.aspect = A / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = A, this.view.fullHeight = e, this.view.offsetX = t, this.view.offsetY = i, this.view.width = n, this.view.height = r, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const A = this.near;
    let e = A * Math.tan(Ii * 0.5 * this.fov) / this.zoom, t = 2 * e, i = this.aspect * t, n = -0.5 * i;
    const r = this.view;
    if (this.view !== null && this.view.enabled) {
      const a = r.fullWidth, l = r.fullHeight;
      n += r.offsetX * i / a, e -= r.offsetY * t / l, i *= r.width / a, t *= r.height / l;
    }
    const s = this.filmOffset;
    s !== 0 && (n += A * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(n, n + i, e, e - t, A, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}, Mn = class extends Ua {
  constructor(A = -1, e = 1, t = 1, i = -1, n = 0.1, r = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = A, this.right = e, this.top = t, this.bottom = i, this.near = n, this.far = r, this.updateProjectionMatrix();
  }
  copy(A, e) {
    return super.copy(A, e), this.left = A.left, this.right = A.right, this.top = A.top, this.bottom = A.bottom, this.near = A.near, this.far = A.far, this.zoom = A.zoom, this.view = A.view === null ? null : Object.assign({}, A.view), this;
  }
  setViewOffset(A, e, t, i, n, r) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = A, this.view.fullHeight = e, this.view.offsetX = t, this.view.offsetY = i, this.view.width = n, this.view.height = r, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const A = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), t = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let n = t - A, r = t + A, s = i + e, a = i - e;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, o = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      n += l * this.view.offsetX, r = n + l * this.view.width, s -= o * this.view.offsetY, a = s - o * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(n, r, s, a, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}, uc = class extends fc {
  constructor() {
    super(new Mn(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, dc = class extends hc {
  constructor(A, e) {
    super(A, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(be.DEFAULT_UP), this.updateMatrix(), this.target = new be(), this.shadow = new uc();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(A) {
    return super.copy(A), this.target = A.target.clone(), this.shadow = A.shadow.clone(), this;
  }
  toJSON(A) {
    const e = super.toJSON(A);
    return e.object.shadow = this.shadow.toJSON(), e.object.target = this.target.uuid, e;
  }
}, qt = -90, jt = 1, pc = class extends be {
  constructor(A, e, t) {
    super(), this.type = "CubeCamera", this.renderTarget = t, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new We(qt, jt, A, e);
    i.layers = this.layers, this.add(i);
    const n = new We(qt, jt, A, e);
    n.layers = this.layers, this.add(n);
    const r = new We(qt, jt, A, e);
    r.layers = this.layers, this.add(r);
    const s = new We(qt, jt, A, e);
    s.layers = this.layers, this.add(s);
    const a = new We(qt, jt, A, e);
    a.layers = this.layers, this.add(a);
    const l = new We(qt, jt, A, e);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const A = this.coordinateSystem, e = this.children.concat(), [t, i, n, r, s, a] = e;
    for (const l of e) this.remove(l);
    if (A === 2e3)
      t.up.set(0, 1, 0), t.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), n.up.set(0, 0, -1), n.lookAt(0, 1, 0), r.up.set(0, 0, 1), r.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), a.up.set(0, 1, 0), a.lookAt(0, 0, -1);
    else if (A === 2001)
      t.up.set(0, -1, 0), t.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), n.up.set(0, 0, 1), n.lookAt(0, 1, 0), r.up.set(0, 0, -1), r.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), a.up.set(0, -1, 0), a.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + A);
    for (const l of e)
      this.add(l), l.updateMatrixWorld();
  }
  update(A, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: t, activeMipmapLevel: i } = this;
    this.coordinateSystem !== A.coordinateSystem && (this.coordinateSystem = A.coordinateSystem, this.updateCoordinateSystem());
    const [n, r, s, a, l, o] = this.children, c = A.getRenderTarget(), f = A.getActiveCubeFace(), h = A.getActiveMipmapLevel(), p = A.xr.enabled;
    A.xr.enabled = !1;
    const m = t.texture.generateMipmaps;
    t.texture.generateMipmaps = !1;
    let P = !1;
    A.isWebGLRenderer === !0 ? P = A.state.buffers.depth.getReversed() : P = A.reversedDepthBuffer, A.setRenderTarget(t, 0, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, n), A.setRenderTarget(t, 1, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, r), A.setRenderTarget(t, 2, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, s), A.setRenderTarget(t, 3, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, a), A.setRenderTarget(t, 4, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, l), t.texture.generateMipmaps = m, A.setRenderTarget(t, 5, i), P && A.autoClear === !1 && A.clearDepth(), A.render(e, o), A.setRenderTarget(c, f, h), A.xr.enabled = p, t.texture.needsPMREMUpdate = !0;
  }
}, gc = class extends We {
  constructor(A = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = A;
  }
}, Cr = "\\[\\]\\.:\\/", vc = new RegExp("[" + Cr + "]", "g"), xr = "[^" + Cr + "]", mc = "[^" + Cr.replace("\\.", "") + "]", wc = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", xr), Pc = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", mc), Dc = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", xr), Ec = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", xr), Bc = new RegExp("^" + wc + Pc + Dc + Ec + "$"), Mc = [
  "material",
  "materials",
  "bones",
  "map"
], Cc = class {
  constructor(A, e, t) {
    const i = t || ne.parseTrackName(e);
    this._targetGroup = A, this._bindings = A.subscribe_(e, i);
  }
  getValue(A, e) {
    this.bind();
    const t = this._targetGroup.nCachedObjects_, i = this._bindings[t];
    i !== void 0 && i.getValue(A, e);
  }
  setValue(A, e) {
    const t = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = t.length; i !== n; ++i) t[i].setValue(A, e);
  }
  bind() {
    const A = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = A.length; e !== t; ++e) A[e].bind();
  }
  unbind() {
    const A = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, t = A.length; e !== t; ++e) A[e].unbind();
  }
}, ne = class ti {
  constructor(e, t, i) {
    this.path = t, this.parsedPath = i || ti.parseTrackName(t), this.node = ti.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, i) {
    return e && e.isAnimationObjectGroup ? new ti.Composite(e, t, i) : new ti(e, t, i);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(vc, "");
  }
  static parseTrackName(e) {
    const t = Bc.exec(e);
    if (t === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
    const i = {
      nodeName: t[2],
      objectName: t[3],
      objectIndex: t[4],
      propertyName: t[5],
      propertyIndex: t[6]
    }, n = i.nodeName && i.nodeName.lastIndexOf(".");
    if (n !== void 0 && n !== -1) {
      const r = i.nodeName.substring(n + 1);
      Mc.indexOf(r) !== -1 && (i.nodeName = i.nodeName.substring(0, n), i.objectName = r);
    }
    if (i.propertyName === null || i.propertyName.length === 0) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
    return i;
  }
  static findNode(e, t) {
    if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
    if (e.skeleton) {
      const i = e.skeleton.getBoneByName(t);
      if (i !== void 0) return i;
    }
    if (e.children) {
      const i = function(r) {
        for (let s = 0; s < r.length; s++) {
          const a = r[s];
          if (a.name === t || a.uuid === t) return a;
          const l = i(a.children);
          if (l) return l;
        }
        return null;
      }, n = i(e.children);
      if (n) return n;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const i = this.resolvedProperty;
    for (let n = 0, r = i.length; n !== r; ++n) e[t++] = i[n];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(e, t) {
    const i = this.resolvedProperty;
    for (let n = 0, r = i.length; n !== r; ++n) i[n] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const i = this.resolvedProperty;
    for (let n = 0, r = i.length; n !== r; ++n) i[n] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const i = this.resolvedProperty;
    for (let n = 0, r = i.length; n !== r; ++n) i[n] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node;
    const t = this.parsedPath, i = t.objectName, n = t.propertyName;
    let r = t.propertyIndex;
    if (e || (e = ti.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
      MA("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (i) {
      let o = t.objectIndex;
      switch (i) {
        case "materials":
          if (!e.material) {
            IA("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.materials) {
            IA("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) {
            IA("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          e = e.skeleton.bones;
          for (let c = 0; c < e.length; c++) if (e[c].name === o) {
            o = c;
            break;
          }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) {
            IA("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.map) {
            IA("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          e = e.material.map;
          break;
        default:
          if (e[i] === void 0) {
            IA("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          e = e[i];
      }
      if (o !== void 0) {
        if (e[o] === void 0) {
          IA("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
          return;
        }
        e = e[o];
      }
    }
    const s = e[n];
    if (s === void 0) {
      const o = t.nodeName;
      IA("PropertyBinding: Trying to update property for track: " + o + "." + n + " but it wasn't found.", e);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = e, e.isMaterial === !0 ? a = this.Versioning.NeedsUpdate : e.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (r !== void 0) {
      if (n === "morphTargetInfluences") {
        if (!e.geometry) {
          IA("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!e.geometry.morphAttributes) {
          IA("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r;
    } else s.fromArray !== void 0 && s.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (l = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = n;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
ne.Composite = Cc;
ne.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
ne.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
ne.prototype.GetterByBindingType = [
  ne.prototype._getValue_direct,
  ne.prototype._getValue_array,
  ne.prototype._getValue_arrayElement,
  ne.prototype._getValue_toArray
];
ne.prototype.SetterByBindingTypeAndVersioning = [
  [
    ne.prototype._setValue_direct,
    ne.prototype._setValue_direct_setNeedsUpdate,
    ne.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    ne.prototype._setValue_array,
    ne.prototype._setValue_array_setNeedsUpdate,
    ne.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    ne.prototype._setValue_arrayElement,
    ne.prototype._setValue_arrayElement_setNeedsUpdate,
    ne.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    ne.prototype._setValue_fromArray,
    ne.prototype._setValue_fromArray_setNeedsUpdate,
    ne.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var xc = class {
  constructor(A, e, t, i) {
    this.elements = [
      1,
      0,
      0,
      1
    ], A !== void 0 && this.set(A, e, t, i);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(A, e = 0) {
    for (let t = 0; t < 4; t++) this.elements[t] = A[t + e];
    return this;
  }
  set(A, e, t, i) {
    const n = this.elements;
    return n[0] = A, n[2] = e, n[1] = t, n[3] = i, this;
  }
};
aa = xc;
aa.prototype.isMatrix2 = !0;
function hs(A, e, t, i) {
  const n = _c(i);
  switch (t) {
    case fo:
      return A * e;
    case po:
      return A * e / n.components * n.byteLength;
    case ga:
      return A * e / n.components * n.byteLength;
    case vn:
      return A * e * 2 / n.components * n.byteLength;
    case va:
      return A * e * 2 / n.components * n.byteLength;
    case uo:
      return A * e * 3 / n.components * n.byteLength;
    case Ti:
      return A * e * 4 / n.components * n.byteLength;
    case ma:
      return A * e * 4 / n.components * n.byteLength;
    case go:
    case vo:
      return Math.floor((A + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case mo:
    case wo:
      return Math.floor((A + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Do:
    case Bo:
      return Math.max(A, 16) * Math.max(e, 8) / 4;
    case Po:
    case Eo:
      return Math.max(A, 8) * Math.max(e, 8) / 2;
    case Mo:
    case Co:
    case _o:
    case So:
      return Math.floor((A + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case xo:
    case Io:
    case yo:
      return Math.floor((A + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Qo:
      return Math.floor((A + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case To:
      return Math.floor((A + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case bo:
      return Math.floor((A + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Ro:
      return Math.floor((A + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Lo:
      return Math.floor((A + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Uo:
      return Math.floor((A + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case Fo:
      return Math.floor((A + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case No:
      return Math.floor((A + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case zo:
      return Math.floor((A + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Oo:
      return Math.floor((A + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Ho:
      return Math.floor((A + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Vo:
      return Math.floor((A + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Go:
      return Math.floor((A + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case ko:
      return Math.floor((A + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case Wo:
    case Xo:
    case Yo:
      return Math.ceil(A / 4) * Math.ceil(e / 4) * 16;
    case Ko:
    case Jo:
      return Math.ceil(A / 4) * Math.ceil(e / 4) * 8;
    case qo:
    case jo:
      return Math.ceil(A / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${t} format.`);
}
function _c(A) {
  switch (A) {
    case Et:
    case ao:
      return {
        byteLength: 1,
        components: 1
      };
    case ha:
    case oo:
    case Rt:
      return {
        byteLength: 2,
        components: 1
      };
    case fa:
    case ua:
      return {
        byteLength: 2,
        components: 4
      };
    case bt:
    case lo:
    case Bn:
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
  throw new Error(`THREE.TextureUtils: Unknown texture type ${A}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } }));
typeof window < "u" && (window.__THREE__ ? MA("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function Fa() {
  let A = null, e = !1, t = null, i = null;
  function n(r, s) {
    t(r, s), i = A.requestAnimationFrame(n);
  }
  return {
    start: function() {
      e !== !0 && t !== null && A !== null && (i = A.requestAnimationFrame(n), e = !0);
    },
    stop: function() {
      A !== null && A.cancelAnimationFrame(i), e = !1;
    },
    setAnimationLoop: function(r) {
      t = r;
    },
    setContext: function(r) {
      A = r;
    }
  };
}
function Sc(A) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(a, l) {
    const o = a.array, c = a.usage, f = o.byteLength, h = A.createBuffer();
    A.bindBuffer(l, h), A.bufferData(l, o, c), a.onUploadCallback();
    let p;
    if (o instanceof Float32Array) p = A.FLOAT;
    else if (typeof Float16Array < "u" && o instanceof Float16Array) p = A.HALF_FLOAT;
    else if (o instanceof Uint16Array) a.isFloat16BufferAttribute ? p = A.HALF_FLOAT : p = A.UNSIGNED_SHORT;
    else if (o instanceof Int16Array) p = A.SHORT;
    else if (o instanceof Uint32Array) p = A.UNSIGNED_INT;
    else if (o instanceof Int32Array) p = A.INT;
    else if (o instanceof Int8Array) p = A.BYTE;
    else if (o instanceof Uint8Array) p = A.UNSIGNED_BYTE;
    else if (o instanceof Uint8ClampedArray) p = A.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + o);
    return {
      buffer: h,
      type: p,
      bytesPerElement: o.BYTES_PER_ELEMENT,
      version: a.version,
      size: f
    };
  }
  function i(a, l, o) {
    const c = l.array, f = l.updateRanges;
    if (A.bindBuffer(o, a), f.length === 0) A.bufferSubData(o, 0, c);
    else {
      f.sort((p, m) => p.start - m.start);
      let h = 0;
      for (let p = 1; p < f.length; p++) {
        const m = f[h], P = f[p];
        P.start <= m.start + m.count + 1 ? m.count = Math.max(m.count, P.start + P.count - m.start) : (++h, f[h] = P);
      }
      f.length = h + 1;
      for (let p = 0, m = f.length; p < m; p++) {
        const P = f[p];
        A.bufferSubData(o, P.start * c.BYTES_PER_ELEMENT, c, P.start, P.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function n(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), e.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = e.get(a);
    l && (A.deleteBuffer(l.buffer), e.delete(a));
  }
  function s(a, l) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const c = e.get(a);
      (!c || c.version < a.version) && e.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const o = e.get(a);
    if (o === void 0) e.set(a, t(a, l));
    else if (o.version < a.version) {
      if (o.size !== a.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(o.buffer, a, l), o.version = a.version;
    }
  }
  return {
    get: n,
    remove: r,
    update: s
  };
}
var LA = {
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
}, sA = {
  common: {
    diffuse: { value: /* @__PURE__ */ new HA(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new TA() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new TA() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new TA() },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 },
    dfgLUT: { value: null }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new TA() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new TA() },
    normalScale: { value: /* @__PURE__ */ new bA(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new TA() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new TA() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new HA(16777215) }
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
    probesMin: { value: /* @__PURE__ */ new N() },
    probesMax: { value: /* @__PURE__ */ new N() },
    probesResolution: { value: /* @__PURE__ */ new N() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new HA(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new TA() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new TA() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new HA(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new bA(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new TA() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new TA() },
    alphaTest: { value: 0 }
  }
}, qe = {
  basic: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.specularmap,
      sA.envmap,
      sA.aomap,
      sA.lightmap,
      sA.fog
    ]),
    vertexShader: LA.meshbasic_vert,
    fragmentShader: LA.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.specularmap,
      sA.envmap,
      sA.aomap,
      sA.lightmap,
      sA.emissivemap,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      sA.fog,
      sA.lights,
      {
        emissive: { value: /* @__PURE__ */ new HA(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: LA.meshlambert_vert,
    fragmentShader: LA.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.specularmap,
      sA.envmap,
      sA.aomap,
      sA.lightmap,
      sA.emissivemap,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      sA.fog,
      sA.lights,
      {
        emissive: { value: /* @__PURE__ */ new HA(0) },
        specular: { value: /* @__PURE__ */ new HA(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: LA.meshphong_vert,
    fragmentShader: LA.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.envmap,
      sA.aomap,
      sA.lightmap,
      sA.emissivemap,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      sA.roughnessmap,
      sA.metalnessmap,
      sA.fog,
      sA.lights,
      {
        emissive: { value: /* @__PURE__ */ new HA(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: LA.meshphysical_vert,
    fragmentShader: LA.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.aomap,
      sA.lightmap,
      sA.emissivemap,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      sA.gradientmap,
      sA.fog,
      sA.lights,
      { emissive: { value: /* @__PURE__ */ new HA(0) } }
    ]),
    vertexShader: LA.meshtoon_vert,
    fragmentShader: LA.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      sA.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: LA.meshmatcap_vert,
    fragmentShader: LA.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Be([sA.points, sA.fog]),
    vertexShader: LA.points_vert,
    fragmentShader: LA.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: LA.linedashed_vert,
    fragmentShader: LA.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Be([sA.common, sA.displacementmap]),
    vertexShader: LA.depth_vert,
    fragmentShader: LA.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.bumpmap,
      sA.normalmap,
      sA.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: LA.meshnormal_vert,
    fragmentShader: LA.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Be([sA.sprite, sA.fog]),
    vertexShader: LA.sprite_vert,
    fragmentShader: LA.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new TA() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: LA.background_vert,
    fragmentShader: LA.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new TA() }
    },
    vertexShader: LA.backgroundCube_vert,
    fragmentShader: LA.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: LA.cube_vert,
    fragmentShader: LA.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: LA.equirect_vert,
    fragmentShader: LA.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Be([
      sA.common,
      sA.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new N() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: LA.distance_vert,
    fragmentShader: LA.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Be([
      sA.lights,
      sA.fog,
      {
        color: { value: /* @__PURE__ */ new HA(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: LA.shadow_vert,
    fragmentShader: LA.shadow_frag
  }
};
qe.physical = {
  uniforms: /* @__PURE__ */ Be([qe.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new TA() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new TA() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new bA(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new TA() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new TA() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new TA() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new HA(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new TA() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new TA() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new TA() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new bA() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new TA() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new HA(0) },
    specularColor: { value: /* @__PURE__ */ new HA(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new TA() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new TA() },
    anisotropyVector: { value: /* @__PURE__ */ new bA() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new TA() }
  }]),
  vertexShader: LA.meshphysical_vert,
  fragmentShader: LA.meshphysical_frag
};
var hn = {
  r: 0,
  b: 0,
  g: 0
}, Ic = /* @__PURE__ */ new ae(), Na = /* @__PURE__ */ new TA();
Na.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function yc(A, e, t, i, n, r) {
  const s = new HA(0);
  let a = n === !0 ? 0 : 1, l, o, c = null, f = 0, h = null;
  function p(x) {
    let C = x.isScene === !0 ? x.background : null;
    if (C && C.isTexture) {
      const D = x.backgroundBlurriness > 0;
      C = e.get(C, D);
    }
    return C;
  }
  function m(x) {
    let C = !1;
    const D = p(x);
    D === null ? d(s, a) : D && D.isColor && (d(D, 1), C = !0);
    const M = A.xr.getEnvironmentBlendMode();
    M === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, r) : M === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, r), (A.autoClear || C) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), A.clear(A.autoClearColor, A.autoClearDepth, A.autoClearStencil));
  }
  function P(x, C) {
    const D = p(C);
    D && (D.isCubeTexture || D.mapping === 306) ? (o === void 0 && (o = new Ne(new Mr(1, 1, 1), new Te({
      name: "BackgroundCubeMaterial",
      uniforms: fi(qe.backgroundCube.uniforms),
      vertexShader: qe.backgroundCube.vertexShader,
      fragmentShader: qe.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), o.geometry.deleteAttribute("normal"), o.geometry.deleteAttribute("uv"), o.onBeforeRender = function(M, _, I) {
      this.matrixWorld.copyPosition(I.matrixWorld);
    }, Object.defineProperty(o.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), i.update(o)), o.material.uniforms.envMap.value = D, o.material.uniforms.backgroundBlurriness.value = C.backgroundBlurriness, o.material.uniforms.backgroundIntensity.value = C.backgroundIntensity, o.material.uniforms.backgroundRotation.value.setFromMatrix4(Ic.makeRotationFromEuler(C.backgroundRotation)).transpose(), D.isCubeTexture && D.isRenderTargetTexture === !1 && o.material.uniforms.backgroundRotation.value.premultiply(Na), o.material.toneMapped = OA.getTransfer(D.colorSpace) !== Pn, (c !== D || f !== D.version || h !== A.toneMapping) && (o.material.needsUpdate = !0, c = D, f = D.version, h = A.toneMapping), o.layers.enableAll(), x.unshift(o, o.geometry, o.material, 0, 0, null)) : D && D.isTexture && (l === void 0 && (l = new Ne(new Qi(2, 2), new Te({
      name: "BackgroundMaterial",
      uniforms: fi(qe.background.uniforms),
      vertexShader: qe.background.vertexShader,
      fragmentShader: qe.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), i.update(l)), l.material.uniforms.t2D.value = D, l.material.uniforms.backgroundIntensity.value = C.backgroundIntensity, l.material.toneMapped = OA.getTransfer(D.colorSpace) !== Pn, D.matrixAutoUpdate === !0 && D.updateMatrix(), l.material.uniforms.uvTransform.value.copy(D.matrix), (c !== D || f !== D.version || h !== A.toneMapping) && (l.material.needsUpdate = !0, c = D, f = D.version, h = A.toneMapping), l.layers.enableAll(), x.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function d(x, C) {
    x.getRGB(hn, ba(A)), t.buffers.color.setClear(hn.r, hn.g, hn.b, C, r);
  }
  function u() {
    o !== void 0 && (o.geometry.dispose(), o.material.dispose(), o = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(x, C = 1) {
      s.set(x), a = C, d(s, a);
    },
    getClearAlpha: function() {
      return a;
    },
    setClearAlpha: function(x) {
      a = x, d(s, a);
    },
    render: m,
    addToRenderList: P,
    dispose: u
  };
}
function Qc(A, e) {
  const t = A.getParameter(A.MAX_VERTEX_ATTRIBS), i = {}, n = h(null);
  let r = n, s = !1;
  function a(S, V, k, G, z) {
    let X = !1;
    const L = f(S, G, k, V);
    r !== L && (r = L, o(r.object)), X = p(S, G, k, z), X && m(S, G, k, z), z !== null && e.update(z, A.ELEMENT_ARRAY_BUFFER), (X || s) && (s = !1, D(S, V, k, G), z !== null && A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, e.get(z).buffer));
  }
  function l() {
    return A.createVertexArray();
  }
  function o(S) {
    return A.bindVertexArray(S);
  }
  function c(S) {
    return A.deleteVertexArray(S);
  }
  function f(S, V, k, G) {
    const z = G.wireframe === !0;
    let X = i[V.id];
    X === void 0 && (X = {}, i[V.id] = X);
    const L = S.isInstancedMesh === !0 ? S.id : 0;
    let q = X[L];
    q === void 0 && (q = {}, X[L] = q);
    let AA = q[k.id];
    AA === void 0 && (AA = {}, q[k.id] = AA);
    let eA = AA[z];
    return eA === void 0 && (eA = h(l()), AA[z] = eA), eA;
  }
  function h(S) {
    const V = [], k = [], G = [];
    for (let z = 0; z < t; z++)
      V[z] = 0, k[z] = 0, G[z] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: V,
      enabledAttributes: k,
      attributeDivisors: G,
      object: S,
      attributes: {},
      index: null
    };
  }
  function p(S, V, k, G) {
    const z = r.attributes, X = V.attributes;
    let L = 0;
    const q = k.getAttributes();
    for (const AA in q) if (q[AA].location >= 0) {
      const eA = z[AA];
      let cA = X[AA];
      if (cA === void 0 && (AA === "instanceMatrix" && S.instanceMatrix && (cA = S.instanceMatrix), AA === "instanceColor" && S.instanceColor && (cA = S.instanceColor)), eA === void 0 || eA.attribute !== cA || cA && eA.data !== cA.data) return !0;
      L++;
    }
    return r.attributesNum !== L || r.index !== G;
  }
  function m(S, V, k, G) {
    const z = {}, X = V.attributes;
    let L = 0;
    const q = k.getAttributes();
    for (const AA in q) if (q[AA].location >= 0) {
      let eA = X[AA];
      eA === void 0 && (AA === "instanceMatrix" && S.instanceMatrix && (eA = S.instanceMatrix), AA === "instanceColor" && S.instanceColor && (eA = S.instanceColor));
      const cA = {};
      cA.attribute = eA, eA && eA.data && (cA.data = eA.data), z[AA] = cA, L++;
    }
    r.attributes = z, r.attributesNum = L, r.index = G;
  }
  function P() {
    const S = r.newAttributes;
    for (let V = 0, k = S.length; V < k; V++) S[V] = 0;
  }
  function d(S) {
    u(S, 0);
  }
  function u(S, V) {
    const k = r.newAttributes, G = r.enabledAttributes, z = r.attributeDivisors;
    k[S] = 1, G[S] === 0 && (A.enableVertexAttribArray(S), G[S] = 1), z[S] !== V && (A.vertexAttribDivisor(S, V), z[S] = V);
  }
  function x() {
    const S = r.newAttributes, V = r.enabledAttributes;
    for (let k = 0, G = V.length; k < G; k++) V[k] !== S[k] && (A.disableVertexAttribArray(k), V[k] = 0);
  }
  function C(S, V, k, G, z, X, L) {
    L === !0 ? A.vertexAttribIPointer(S, V, k, z, X) : A.vertexAttribPointer(S, V, k, G, z, X);
  }
  function D(S, V, k, G) {
    P();
    const z = G.attributes, X = k.getAttributes(), L = V.defaultAttributeValues;
    for (const q in X) {
      const AA = X[q];
      if (AA.location >= 0) {
        let eA = z[q];
        if (eA === void 0 && (q === "instanceMatrix" && S.instanceMatrix && (eA = S.instanceMatrix), q === "instanceColor" && S.instanceColor && (eA = S.instanceColor)), eA !== void 0) {
          const cA = eA.normalized, PA = eA.itemSize, WA = e.get(eA);
          if (WA === void 0) continue;
          const KA = WA.buffer, Y = WA.type, nA = WA.bytesPerElement, fA = Y === A.INT || Y === A.UNSIGNED_INT || eA.gpuType === 1013;
          if (eA.isInterleavedBufferAttribute) {
            const hA = eA.data, CA = hA.stride, _A = eA.offset;
            if (hA.isInstancedInterleavedBuffer) {
              for (let yA = 0; yA < AA.locationSize; yA++) u(AA.location + yA, hA.meshPerAttribute);
              S.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = hA.meshPerAttribute * hA.count);
            } else for (let yA = 0; yA < AA.locationSize; yA++) d(AA.location + yA);
            A.bindBuffer(A.ARRAY_BUFFER, KA);
            for (let yA = 0; yA < AA.locationSize; yA++) C(AA.location + yA, PA / AA.locationSize, Y, cA, CA * nA, (_A + PA / AA.locationSize * yA) * nA, fA);
          } else {
            if (eA.isInstancedBufferAttribute) {
              for (let hA = 0; hA < AA.locationSize; hA++) u(AA.location + hA, eA.meshPerAttribute);
              S.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = eA.meshPerAttribute * eA.count);
            } else for (let hA = 0; hA < AA.locationSize; hA++) d(AA.location + hA);
            A.bindBuffer(A.ARRAY_BUFFER, KA);
            for (let hA = 0; hA < AA.locationSize; hA++) C(AA.location + hA, PA / AA.locationSize, Y, cA, PA * nA, PA / AA.locationSize * hA * nA, fA);
          }
        } else if (L !== void 0) {
          const cA = L[q];
          if (cA !== void 0) switch (cA.length) {
            case 2:
              A.vertexAttrib2fv(AA.location, cA);
              break;
            case 3:
              A.vertexAttrib3fv(AA.location, cA);
              break;
            case 4:
              A.vertexAttrib4fv(AA.location, cA);
              break;
            default:
              A.vertexAttrib1fv(AA.location, cA);
          }
        }
      }
    }
    x();
  }
  function M() {
    B();
    for (const S in i) {
      const V = i[S];
      for (const k in V) {
        const G = V[k];
        for (const z in G) {
          const X = G[z];
          for (const L in X)
            c(X[L].object), delete X[L];
          delete G[z];
        }
      }
      delete i[S];
    }
  }
  function _(S) {
    if (i[S.id] === void 0) return;
    const V = i[S.id];
    for (const k in V) {
      const G = V[k];
      for (const z in G) {
        const X = G[z];
        for (const L in X)
          c(X[L].object), delete X[L];
        delete G[z];
      }
    }
    delete i[S.id];
  }
  function I(S) {
    for (const V in i) {
      const k = i[V];
      for (const G in k) {
        const z = k[G];
        if (z[S.id] === void 0) continue;
        const X = z[S.id];
        for (const L in X)
          c(X[L].object), delete X[L];
        delete z[S.id];
      }
    }
  }
  function v(S) {
    for (const V in i) {
      const k = i[V], G = S.isInstancedMesh === !0 ? S.id : 0, z = k[G];
      if (z !== void 0) {
        for (const X in z) {
          const L = z[X];
          for (const q in L)
            c(L[q].object), delete L[q];
          delete z[X];
        }
        delete k[G], Object.keys(k).length === 0 && delete i[V];
      }
    }
  }
  function B() {
    W(), s = !0, r !== n && (r = n, o(r.object));
  }
  function W() {
    n.geometry = null, n.program = null, n.wireframe = !1;
  }
  return {
    setup: a,
    reset: B,
    resetDefaultState: W,
    dispose: M,
    releaseStatesOfGeometry: _,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: I,
    initAttributes: P,
    enableAttribute: d,
    disableUnusedAttributes: x
  };
}
function Tc(A, e, t) {
  let i;
  function n(l) {
    i = l;
  }
  function r(l, o) {
    A.drawArrays(i, l, o), t.update(o, i, 1);
  }
  function s(l, o, c) {
    c !== 0 && (A.drawArraysInstanced(i, l, o, c), t.update(o, i, c));
  }
  function a(l, o, c) {
    if (c === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, l, 0, o, 0, c);
    let f = 0;
    for (let h = 0; h < c; h++) f += o[h];
    t.update(f, i, 1);
  }
  this.setMode = n, this.render = r, this.renderInstances = s, this.renderMultiDraw = a;
}
function bc(A, e, t, i) {
  let n;
  function r() {
    if (n !== void 0) return n;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const I = e.get("EXT_texture_filter_anisotropic");
      n = A.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else n = 0;
    return n;
  }
  function s(I) {
    return !(I !== 1023 && i.convert(I) !== A.getParameter(A.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(I) {
    const v = I === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(I !== 1009 && i.convert(I) !== A.getParameter(A.IMPLEMENTATION_COLOR_READ_TYPE) && I !== 1015 && !v);
  }
  function l(I) {
    if (I === "highp") {
      if (A.getShaderPrecisionFormat(A.VERTEX_SHADER, A.HIGH_FLOAT).precision > 0 && A.getShaderPrecisionFormat(A.FRAGMENT_SHADER, A.HIGH_FLOAT).precision > 0) return "highp";
      I = "mediump";
    }
    return I === "mediump" && A.getShaderPrecisionFormat(A.VERTEX_SHADER, A.MEDIUM_FLOAT).precision > 0 && A.getShaderPrecisionFormat(A.FRAGMENT_SHADER, A.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let o = t.precision !== void 0 ? t.precision : "highp";
  const c = l(o);
  c !== o && (MA("WebGLRenderer:", o, "not supported, using", c, "instead."), o = c);
  const f = t.logarithmicDepthBuffer === !0, h = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control");
  t.reversedDepthBuffer === !0 && h === !1 && MA("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const p = A.getParameter(A.MAX_TEXTURE_IMAGE_UNITS), m = A.getParameter(A.MAX_VERTEX_TEXTURE_IMAGE_UNITS), P = A.getParameter(A.MAX_TEXTURE_SIZE), d = A.getParameter(A.MAX_CUBE_MAP_TEXTURE_SIZE), u = A.getParameter(A.MAX_VERTEX_ATTRIBS), x = A.getParameter(A.MAX_VERTEX_UNIFORM_VECTORS), C = A.getParameter(A.MAX_VARYING_VECTORS), D = A.getParameter(A.MAX_FRAGMENT_UNIFORM_VECTORS), M = A.getParameter(A.MAX_SAMPLES), _ = A.getParameter(A.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: r,
    getMaxPrecision: l,
    textureFormatReadable: s,
    textureTypeReadable: a,
    precision: o,
    logarithmicDepthBuffer: f,
    reversedDepthBuffer: h,
    maxTextures: p,
    maxVertexTextures: m,
    maxTextureSize: P,
    maxCubemapSize: d,
    maxAttributes: u,
    maxVertexUniforms: x,
    maxVaryings: C,
    maxFragmentUniforms: D,
    maxSamples: M,
    samples: _
  };
}
function Rc(A) {
  const e = this;
  let t = null, i = 0, n = !1, r = !1;
  const s = new St(), a = new TA(), l = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, h) {
    const p = f.length !== 0 || h || i !== 0 || n;
    return n = h, i = f.length, p;
  }, this.beginShadows = function() {
    r = !0, c(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(f, h) {
    t = c(f, h, 0);
  }, this.setState = function(f, h, p) {
    const m = f.clippingPlanes, P = f.clipIntersection, d = f.clipShadows, u = A.get(f);
    if (!n || m === null || m.length === 0 || r && !d) r ? c(null) : o();
    else {
      const x = r ? 0 : i, C = x * 4;
      let D = u.clippingState || null;
      l.value = D, D = c(m, h, C, p);
      for (let M = 0; M !== C; ++M) D[M] = t[M];
      u.clippingState = D, this.numIntersection = P ? this.numPlanes : 0, this.numPlanes += x;
    }
  };
  function o() {
    l.value !== t && (l.value = t, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0;
  }
  function c(f, h, p, m) {
    const P = f !== null ? f.length : 0;
    let d = null;
    if (P !== 0) {
      if (d = l.value, m !== !0 || d === null) {
        const u = p + P * 4, x = h.matrixWorldInverse;
        a.getNormalMatrix(x), (d === null || d.length < u) && (d = new Float32Array(u));
        for (let C = 0, D = p; C !== P; ++C, D += 4)
          s.copy(f[C]).applyMatrix4(x, a), s.normal.toArray(d, D), d[D + 3] = s.constant;
      }
      l.value = d, l.needsUpdate = !0;
    }
    return e.numPlanes = P, e.numIntersection = 0, d;
  }
}
var Dt = 4, fs = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], It = 20, Lc = 256, Di = /* @__PURE__ */ new Mn(), us = /* @__PURE__ */ new HA(), Ar = null, er = 0, tr = 0, ir = !1, Uc = /* @__PURE__ */ new N(), ds = class {
  constructor(A) {
    this._renderer = A, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(A, e = 0, t = 0.1, i = 100, n = {}) {
    const { size: r = 256, position: s = Uc } = n;
    Ar = this._renderer.getRenderTarget(), er = this._renderer.getActiveCubeFace(), tr = this._renderer.getActiveMipmapLevel(), ir = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(r);
    const a = this._allocateTargets();
    return a.depthBuffer = !0, this._sceneToCubeUV(A, t, i, a, s), e > 0 && this._blur(a, 0, 0, e), this._applyPMREM(a), this._cleanup(a), a;
  }
  fromEquirectangular(A, e = null) {
    return this._fromTexture(A, e);
  }
  fromCubemap(A, e = null) {
    return this._fromTexture(A, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = vs(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = gs(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  _setSize(A) {
    this._lodMax = Math.floor(Math.log2(A)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let A = 0; A < this._lodMeshes.length; A++) this._lodMeshes[A].geometry.dispose();
  }
  _cleanup(A) {
    this._renderer.setRenderTarget(Ar, er, tr), this._renderer.xr.enabled = ir, A.scissorTest = !1, Zt(A, 0, 0, A.width, A.height);
  }
  _fromTexture(A, e) {
    A.mapping === 301 || A.mapping === 302 ? this._setSize(A.image.length === 0 ? 16 : A.image[0].width || A.image[0].image.width) : this._setSize(A.image.width / 4), Ar = this._renderer.getRenderTarget(), er = this._renderer.getActiveCubeFace(), tr = this._renderer.getActiveMipmapLevel(), ir = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const t = e || this._allocateTargets();
    return this._textureToCubeUV(A, t), this._applyPMREM(t), this._cleanup(t), t;
  }
  _allocateTargets() {
    const A = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, t = {
      magFilter: xe,
      minFilter: xe,
      generateMipmaps: !1,
      type: Rt,
      format: Ti,
      colorSpace: pr,
      depthBuffer: !1
    }, i = ps(A, e, t);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== A || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ps(A, e, t);
      const { _lodMax: n } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Fc(n)), this._blurMaterial = zc(n, A, e), this._ggxMaterial = Nc(n, A, e);
    }
    return i;
  }
  _compileMaterial(A) {
    const e = new Ne(new Ft(), A);
    this._renderer.compile(e, Di);
  }
  _sceneToCubeUV(A, e, t, i, n) {
    const r = new We(90, 1, e, t), s = [
      1,
      -1,
      1,
      1,
      1,
      1
    ], a = [
      1,
      1,
      1,
      -1,
      -1,
      -1
    ], l = this._renderer, o = l.autoClear, c = l.toneMapping;
    l.getClearColor(us), l.toneMapping = 0, l.autoClear = !1, l.state.buffers.depth.getReversed() && (l.setRenderTarget(i), l.clearDepth(), l.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ne(new Mr(), new Sa({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    })));
    const f = this._backgroundBox, h = f.material;
    let p = !1;
    const m = A.background;
    m ? m.isColor && (h.color.copy(m), A.background = null, p = !0) : (h.color.copy(us), p = !0);
    for (let P = 0; P < 6; P++) {
      const d = P % 3;
      d === 0 ? (r.up.set(0, s[P], 0), r.position.set(n.x, n.y, n.z), r.lookAt(n.x + a[P], n.y, n.z)) : d === 1 ? (r.up.set(0, 0, s[P]), r.position.set(n.x, n.y, n.z), r.lookAt(n.x, n.y + a[P], n.z)) : (r.up.set(0, s[P], 0), r.position.set(n.x, n.y, n.z), r.lookAt(n.x, n.y, n.z + a[P]));
      const u = this._cubeSize;
      Zt(i, d * u, P > 2 ? u : 0, u, u), l.setRenderTarget(i), p && l.render(f, r), l.render(A, r);
    }
    l.toneMapping = c, l.autoClear = o, A.background = m;
  }
  _textureToCubeUV(A, e) {
    const t = this._renderer, i = A.mapping === 301 || A.mapping === 302;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = vs()), this._cubemapMaterial.uniforms.flipEnvMap.value = A.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = gs());
    const n = i ? this._cubemapMaterial : this._equirectMaterial, r = this._lodMeshes[0];
    r.material = n;
    const s = n.uniforms;
    s.envMap.value = A;
    const a = this._cubeSize;
    Zt(e, 0, 0, 3 * a, 2 * a), t.setRenderTarget(e), t.render(r, Di);
  }
  _applyPMREM(A) {
    const e = this._renderer, t = e.autoClear;
    e.autoClear = !1;
    const i = this._lodMeshes.length;
    for (let n = 1; n < i; n++) this._applyGGXFilter(A, n - 1, n);
    e.autoClear = t;
  }
  _applyGGXFilter(A, e, t) {
    const i = this._renderer, n = this._pingPongRenderTarget, r = this._ggxMaterial, s = this._lodMeshes[t];
    s.material = r;
    const a = r.uniforms, l = t / (this._lodMeshes.length - 1), o = e / (this._lodMeshes.length - 1), c = Math.sqrt(l * l - o * o) * (0 + l * 1.25), { _lodMax: f } = this, h = this._sizeLods[t], p = 3 * h * (t > f - Dt ? t - f + Dt : 0), m = 4 * (this._cubeSize - h);
    a.envMap.value = A.texture, a.roughness.value = c, a.mipInt.value = f - e, Zt(n, p, m, 3 * h, 2 * h), i.setRenderTarget(n), i.render(s, Di), a.envMap.value = n.texture, a.roughness.value = 0, a.mipInt.value = f - t, Zt(A, p, m, 3 * h, 2 * h), i.setRenderTarget(A), i.render(s, Di);
  }
  _blur(A, e, t, i, n) {
    const r = this._pingPongRenderTarget;
    this._halfBlur(A, r, e, t, i, "latitudinal", n), this._halfBlur(r, A, t, t, i, "longitudinal", n);
  }
  _halfBlur(A, e, t, i, n, r, s) {
    const a = this._renderer, l = this._blurMaterial;
    r !== "latitudinal" && r !== "longitudinal" && IA("blur direction must be either latitudinal or longitudinal!");
    const o = 3, c = this._lodMeshes[i];
    c.material = l;
    const f = l.uniforms, h = this._sizeLods[t] - 1, p = isFinite(n) ? Math.PI / (2 * h) : 2 * Math.PI / (2 * It - 1), m = n / p, P = isFinite(n) ? 1 + Math.floor(o * m) : It;
    P > It && MA(`sigmaRadians, ${n}, is too large and will clip, as it requested ${P} samples when the maximum is set to ${It}`);
    const d = [];
    let u = 0;
    for (let D = 0; D < It; ++D) {
      const M = D / m, _ = Math.exp(-M * M / 2);
      d.push(_), D === 0 ? u += _ : D < P && (u += 2 * _);
    }
    for (let D = 0; D < d.length; D++) d[D] = d[D] / u;
    f.envMap.value = A.texture, f.samples.value = P, f.weights.value = d, f.latitudinal.value = r === "latitudinal", s && (f.poleAxis.value = s);
    const { _lodMax: x } = this;
    f.dTheta.value = p, f.mipInt.value = x - t;
    const C = this._sizeLods[i];
    Zt(e, 3 * C * (i > x - Dt ? i - x + Dt : 0), 4 * (this._cubeSize - C), 3 * C, 2 * C), a.setRenderTarget(e), a.render(c, Di);
  }
};
function Fc(A) {
  const e = [], t = [], i = [];
  let n = A;
  const r = A - Dt + 1 + fs.length;
  for (let s = 0; s < r; s++) {
    const a = Math.pow(2, n);
    e.push(a);
    let l = 1 / a;
    s > A - Dt ? l = fs[s - A + Dt - 1] : s === 0 && (l = 0), t.push(l);
    const o = 1 / (a - 2), c = -o, f = 1 + o, h = [
      c,
      c,
      f,
      c,
      f,
      f,
      c,
      c,
      f,
      f,
      c,
      f
    ], p = 6, m = 6, P = 3, d = 2, u = 1, x = new Float32Array(P * m * p), C = new Float32Array(d * m * p), D = new Float32Array(u * m * p);
    for (let _ = 0; _ < p; _++) {
      const I = _ % 3 * 2 / 3 - 1, v = _ > 2 ? 0 : -1, B = [
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
      x.set(B, P * m * _), C.set(h, d * m * _);
      const W = [
        _,
        _,
        _,
        _,
        _,
        _
      ];
      D.set(W, u * m * _);
    }
    const M = new Ft();
    M.setAttribute("position", new Ze(x, P)), M.setAttribute("uv", new Ze(C, d)), M.setAttribute("faceIndex", new Ze(D, u)), i.push(new Ne(M, null)), n > Dt && n--;
  }
  return {
    lodMeshes: i,
    sizeLods: e,
    sigmas: t
  };
}
function ps(A, e, t) {
  const i = new je(A, e, t);
  return i.texture.mapping = 306, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function Zt(A, e, t, i, n) {
  A.viewport.set(e, t, i, n), A.scissor.set(e, t, i, n);
}
function Nc(A, e, t) {
  return new Te({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Lc,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${A}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: Cn(),
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
function zc(A, e, t) {
  const i = new Float32Array(It), n = new N(0, 1, 0);
  return new Te({
    name: "SphericalGaussianBlur",
    defines: {
      n: It,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${A}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: n }
    },
    vertexShader: Cn(),
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
function gs() {
  return new Te({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: Cn(),
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
function vs() {
  return new Te({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Cn(),
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
function Cn() {
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
var za = class extends je {
  constructor(A = 1, e = {}) {
    super(A, A, e), this.isWebGLCubeRenderTarget = !0;
    const t = {
      width: A,
      height: A,
      depth: 1
    }, i = [
      t,
      t,
      t,
      t,
      t,
      t
    ];
    this.texture = new Ia(i), this._setTextureOptions(e), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(A, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const t = {
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
    }, i = new Mr(5, 5, 5), n = new Te({
      name: "CubemapFromEquirect",
      uniforms: fi(t.uniforms),
      vertexShader: t.vertexShader,
      fragmentShader: t.fragmentShader,
      side: 1,
      blending: 0
    });
    n.uniforms.tEquirect.value = e;
    const r = new Ne(i, n), s = e.minFilter;
    return e.minFilter === 1008 && (e.minFilter = xe), new pc(1, 10, this).update(A, r), e.minFilter = s, r.geometry.dispose(), r.material.dispose(), this;
  }
  clear(A, e = !0, t = !0, i = !0) {
    const n = A.getRenderTarget();
    for (let r = 0; r < 6; r++)
      A.setRenderTarget(this, r), A.clear(e, t, i);
    A.setRenderTarget(n);
  }
};
function Oc(A) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), i = null;
  function n(h, p = !1) {
    return h == null ? null : p ? s(h) : r(h);
  }
  function r(h) {
    if (h && h.isTexture) {
      const p = h.mapping;
      if (p === 303 || p === 304) if (e.has(h)) {
        const m = e.get(h).texture;
        return a(m, h.mapping);
      } else {
        const m = h.image;
        if (m && m.height > 0) {
          const P = new za(m.height);
          return P.fromEquirectangularTexture(A, h), e.set(h, P), h.addEventListener("dispose", o), a(P.texture, h.mapping);
        } else return null;
      }
    }
    return h;
  }
  function s(h) {
    if (h && h.isTexture) {
      const p = h.mapping, m = p === 303 || p === 304, P = p === 301 || p === 302;
      if (m || P) {
        let d = t.get(h);
        const u = d !== void 0 ? d.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== u)
          return i === null && (i = new ds(A)), d = m ? i.fromEquirectangular(h, d) : i.fromCubemap(h, d), d.texture.pmremVersion = h.pmremVersion, t.set(h, d), d.texture;
        if (d !== void 0) return d.texture;
        {
          const x = h.image;
          return m && x && x.height > 0 || P && x && l(x) ? (i === null && (i = new ds(A)), d = m ? i.fromEquirectangular(h) : i.fromCubemap(h), d.texture.pmremVersion = h.pmremVersion, t.set(h, d), h.addEventListener("dispose", c), d.texture) : null;
        }
      }
    }
    return h;
  }
  function a(h, p) {
    return p === 303 ? h.mapping = 301 : p === 304 && (h.mapping = 302), h;
  }
  function l(h) {
    let p = 0;
    const m = 6;
    for (let P = 0; P < m; P++) h[P] !== void 0 && p++;
    return p === m;
  }
  function o(h) {
    const p = h.target;
    p.removeEventListener("dispose", o);
    const m = e.get(p);
    m !== void 0 && (e.delete(p), m.dispose());
  }
  function c(h) {
    const p = h.target;
    p.removeEventListener("dispose", c);
    const m = t.get(p);
    m !== void 0 && (t.delete(p), m.dispose());
  }
  function f() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), i !== null && (i.dispose(), i = null);
  }
  return {
    get: n,
    dispose: f
  };
}
function Hc(A) {
  const e = {};
  function t(i) {
    if (e[i] !== void 0) return e[i];
    const n = A.getExtension(i);
    return e[i] = n, n;
  }
  return {
    has: function(i) {
      return t(i) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const n = t(i);
      return n === null && si("WebGLRenderer: " + i + " extension not supported."), n;
    }
  };
}
function Vc(A, e, t, i) {
  const n = {}, r = /* @__PURE__ */ new WeakMap();
  function s(f) {
    const h = f.target;
    h.index !== null && e.remove(h.index);
    for (const m in h.attributes) e.remove(h.attributes[m]);
    h.removeEventListener("dispose", s), delete n[h.id];
    const p = r.get(h);
    p && (e.remove(p), r.delete(h)), i.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, t.memory.geometries--;
  }
  function a(f, h) {
    return n[h.id] === !0 || (h.addEventListener("dispose", s), n[h.id] = !0, t.memory.geometries++), h;
  }
  function l(f) {
    const h = f.attributes;
    for (const p in h) e.update(h[p], A.ARRAY_BUFFER);
  }
  function o(f) {
    const h = [], p = f.index, m = f.attributes.position;
    let P = 0;
    if (m === void 0) return;
    if (p !== null) {
      const x = p.array;
      P = p.version;
      for (let C = 0, D = x.length; C < D; C += 3) {
        const M = x[C + 0], _ = x[C + 1], I = x[C + 2];
        h.push(M, _, _, I, I, M);
      }
    } else {
      const x = m.array;
      P = m.version;
      for (let C = 0, D = x.length / 3 - 1; C < D; C += 3) {
        const M = C + 0, _ = C + 1, I = C + 2;
        h.push(M, _, _, I, I, M);
      }
    }
    const d = new (m.count >= 65535 ? xa : Ca)(h, 1);
    d.version = P;
    const u = r.get(f);
    u && e.remove(u), r.set(f, d);
  }
  function c(f) {
    const h = r.get(f);
    if (h) {
      const p = f.index;
      p !== null && h.version < p.version && o(f);
    } else o(f);
    return r.get(f);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: c
  };
}
function Gc(A, e, t) {
  let i;
  function n(f) {
    i = f;
  }
  let r, s;
  function a(f) {
    r = f.type, s = f.bytesPerElement;
  }
  function l(f, h) {
    A.drawElements(i, h, r, f * s), t.update(h, i, 1);
  }
  function o(f, h, p) {
    p !== 0 && (A.drawElementsInstanced(i, h, r, f * s, p), t.update(h, i, p));
  }
  function c(f, h, p) {
    if (p === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, h, 0, r, f, 0, p);
    let m = 0;
    for (let P = 0; P < p; P++) m += h[P];
    t.update(m, i, 1);
  }
  this.setMode = n, this.setIndex = a, this.render = l, this.renderInstances = o, this.renderMultiDraw = c;
}
function kc(A) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(r, s, a) {
    switch (t.calls++, s) {
      case A.TRIANGLES:
        t.triangles += a * (r / 3);
        break;
      case A.LINES:
        t.lines += a * (r / 2);
        break;
      case A.LINE_STRIP:
        t.lines += a * (r - 1);
        break;
      case A.LINE_LOOP:
        t.lines += a * r;
        break;
      case A.POINTS:
        t.points += a * r;
        break;
      default:
        IA("WebGLInfo: Unknown draw mode:", s);
        break;
    }
  }
  function n() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: n,
    update: i
  };
}
function Wc(A, e, t) {
  const i = /* @__PURE__ */ new WeakMap(), n = new re();
  function r(s, a, l) {
    const o = s.morphTargetInfluences, c = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, f = c !== void 0 ? c.length : 0;
    let h = i.get(a);
    if (h === void 0 || h.count !== f) {
      let B = function() {
        I.dispose(), i.delete(a), a.removeEventListener("dispose", B);
      };
      h !== void 0 && h.texture.dispose();
      const p = a.morphAttributes.position !== void 0, m = a.morphAttributes.normal !== void 0, P = a.morphAttributes.color !== void 0, d = a.morphAttributes.position || [], u = a.morphAttributes.normal || [], x = a.morphAttributes.color || [];
      let C = 0;
      p === !0 && (C = 1), m === !0 && (C = 2), P === !0 && (C = 3);
      let D = a.attributes.position.count * C, M = 1;
      D > e.maxTextureSize && (M = Math.ceil(D / e.maxTextureSize), D = e.maxTextureSize);
      const _ = new Float32Array(D * M * 4 * f), I = new Pa(_, D, M, f);
      I.type = Bn, I.needsUpdate = !0;
      const v = C * 4;
      for (let W = 0; W < f; W++) {
        const S = d[W], V = u[W], k = x[W], G = D * M * 4 * W;
        for (let z = 0; z < S.count; z++) {
          const X = z * v;
          p === !0 && (n.fromBufferAttribute(S, z), _[G + X + 0] = n.x, _[G + X + 1] = n.y, _[G + X + 2] = n.z, _[G + X + 3] = 0), m === !0 && (n.fromBufferAttribute(V, z), _[G + X + 4] = n.x, _[G + X + 5] = n.y, _[G + X + 6] = n.z, _[G + X + 7] = 0), P === !0 && (n.fromBufferAttribute(k, z), _[G + X + 8] = n.x, _[G + X + 9] = n.y, _[G + X + 10] = n.z, _[G + X + 11] = k.itemSize === 4 ? n.w : 1);
        }
      }
      h = {
        count: f,
        texture: I,
        size: new bA(D, M)
      }, i.set(a, h), a.addEventListener("dispose", B);
    }
    if (s.isInstancedMesh === !0 && s.morphTexture !== null) l.getUniforms().setValue(A, "morphTexture", s.morphTexture, t);
    else {
      let p = 0;
      for (let P = 0; P < o.length; P++) p += o[P];
      const m = a.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(A, "morphTargetBaseInfluence", m), l.getUniforms().setValue(A, "morphTargetInfluences", o);
    }
    l.getUniforms().setValue(A, "morphTargetsTexture", h.texture, t), l.getUniforms().setValue(A, "morphTargetsTextureSize", h.size);
  }
  return { update: r };
}
function Xc(A, e, t, i, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(o) {
    const c = n.render.frame, f = o.geometry, h = e.get(o, f);
    if (r.get(h) !== c && (e.update(h), r.set(h, c)), o.isInstancedMesh && (o.hasEventListener("dispose", l) === !1 && o.addEventListener("dispose", l), r.get(o) !== c && (t.update(o.instanceMatrix, A.ARRAY_BUFFER), o.instanceColor !== null && t.update(o.instanceColor, A.ARRAY_BUFFER), r.set(o, c))), o.isSkinnedMesh) {
      const p = o.skeleton;
      r.get(p) !== c && (p.update(), r.set(p, c));
    }
    return h;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function l(o) {
    const c = o.target;
    c.removeEventListener("dispose", l), i.releaseStatesOfObject(c), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
var Yc = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function Kc(A, e, t, i, n, r) {
  const s = new je(e, t, {
    type: A,
    depthBuffer: n,
    stencilBuffer: r,
    samples: i ? 4 : 0,
    depthTexture: n ? new hi(e, t) : void 0
  }), a = new je(e, t, {
    type: Rt,
    depthBuffer: !1,
    stencilBuffer: !1
  }), l = new Ft();
  l.setAttribute("position", new ft([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
  ], 3)), l.setAttribute("uv", new ft([
    0,
    2,
    0,
    0,
    2,
    0
  ], 2));
  const o = new jl({
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
  }), c = new Ne(l, o), f = new Mn(-1, 1, 1, -1, 0, 1);
  let h = null, p = null, m = !1, P, d = null, u = [], x = !1;
  this.setSize = function(C, D) {
    s.setSize(C, D), a.setSize(C, D);
    for (let M = 0; M < u.length; M++) {
      const _ = u[M];
      _.setSize && _.setSize(C, D);
    }
  }, this.setEffects = function(C) {
    u = C, x = u.length > 0 && u[0].isRenderPass === !0;
    const D = s.width, M = s.height;
    for (let _ = 0; _ < u.length; _++) {
      const I = u[_];
      I.setSize && I.setSize(D, M);
    }
  }, this.begin = function(C, D) {
    if (m || C.toneMapping === 0 && u.length === 0) return !1;
    if (d = D, D !== null) {
      const M = D.width, _ = D.height;
      (s.width !== M || s.height !== _) && this.setSize(M, _);
    }
    return x === !1 && C.setRenderTarget(s), P = C.toneMapping, C.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return x;
  }, this.end = function(C, D) {
    C.toneMapping = P, m = !0;
    let M = s, _ = a;
    for (let I = 0; I < u.length; I++) {
      const v = u[I];
      if (v.enabled !== !1 && (v.render(C, _, M, D), v.needsSwap !== !1)) {
        const B = M;
        M = _, _ = B;
      }
    }
    if (h !== C.outputColorSpace || p !== C.toneMapping) {
      h = C.outputColorSpace, p = C.toneMapping, o.defines = {}, OA.getTransfer(h) === "srgb" && (o.defines.SRGB_TRANSFER = "");
      const I = Yc[p];
      I && (o.defines[I] = ""), o.needsUpdate = !0;
    }
    o.uniforms.tDiffuse.value = M.texture, C.setRenderTarget(d), C.render(c, f), d = null, m = !1;
  }, this.isCompositing = function() {
    return m;
  }, this.dispose = function() {
    s.depthTexture && s.depthTexture.dispose(), s.dispose(), a.dispose(), l.dispose(), o.dispose();
  };
}
var Oa = /* @__PURE__ */ new ze(), gr = /* @__PURE__ */ new hi(1, 1), Ha = /* @__PURE__ */ new Pa(), Va = /* @__PURE__ */ new xl(), Ga = /* @__PURE__ */ new Ia(), ms = [], ws = [], Ps = new Float32Array(16), Ds = new Float32Array(9), Es = new Float32Array(4);
function di(A, e, t) {
  const i = A[0];
  if (i <= 0 || i > 0) return A;
  const n = e * t;
  let r = ms[n];
  if (r === void 0 && (r = new Float32Array(n), ms[n] = r), e !== 0) {
    i.toArray(r, 0);
    for (let s = 1, a = 0; s !== e; ++s)
      a += t, A[s].toArray(r, a);
  }
  return r;
}
function he(A, e) {
  if (A.length !== e.length) return !1;
  for (let t = 0, i = A.length; t < i; t++) if (A[t] !== e[t]) return !1;
  return !0;
}
function fe(A, e) {
  for (let t = 0, i = e.length; t < i; t++) A[t] = e[t];
}
function xn(A, e) {
  let t = ws[e];
  t === void 0 && (t = new Int32Array(e), ws[e] = t);
  for (let i = 0; i !== e; ++i) t[i] = A.allocateTextureUnit();
  return t;
}
function Jc(A, e) {
  const t = this.cache;
  t[0] !== e && (A.uniform1f(this.addr, e), t[0] = e);
}
function qc(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (A.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (he(t, e)) return;
    A.uniform2fv(this.addr, e), fe(t, e);
  }
}
function jc(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (A.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (A.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (he(t, e)) return;
    A.uniform3fv(this.addr, e), fe(t, e);
  }
}
function Zc(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (A.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (he(t, e)) return;
    A.uniform4fv(this.addr, e), fe(t, e);
  }
}
function $c(A, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (he(t, e)) return;
    A.uniformMatrix2fv(this.addr, !1, e), fe(t, e);
  } else {
    if (he(t, i)) return;
    Es.set(i), A.uniformMatrix2fv(this.addr, !1, Es), fe(t, i);
  }
}
function Ah(A, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (he(t, e)) return;
    A.uniformMatrix3fv(this.addr, !1, e), fe(t, e);
  } else {
    if (he(t, i)) return;
    Ds.set(i), A.uniformMatrix3fv(this.addr, !1, Ds), fe(t, i);
  }
}
function eh(A, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (he(t, e)) return;
    A.uniformMatrix4fv(this.addr, !1, e), fe(t, e);
  } else {
    if (he(t, i)) return;
    Ps.set(i), A.uniformMatrix4fv(this.addr, !1, Ps), fe(t, i);
  }
}
function th(A, e) {
  const t = this.cache;
  t[0] !== e && (A.uniform1i(this.addr, e), t[0] = e);
}
function ih(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (A.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (he(t, e)) return;
    A.uniform2iv(this.addr, e), fe(t, e);
  }
}
function nh(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (A.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (he(t, e)) return;
    A.uniform3iv(this.addr, e), fe(t, e);
  }
}
function rh(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (A.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (he(t, e)) return;
    A.uniform4iv(this.addr, e), fe(t, e);
  }
}
function sh(A, e) {
  const t = this.cache;
  t[0] !== e && (A.uniform1ui(this.addr, e), t[0] = e);
}
function ah(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (A.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (he(t, e)) return;
    A.uniform2uiv(this.addr, e), fe(t, e);
  }
}
function oh(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (A.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (he(t, e)) return;
    A.uniform3uiv(this.addr, e), fe(t, e);
  }
}
function lh(A, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (A.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (he(t, e)) return;
    A.uniform4uiv(this.addr, e), fe(t, e);
  }
}
function ch(A, e, t) {
  const i = this.cache, n = t.allocateTextureUnit();
  i[0] !== n && (A.uniform1i(this.addr, n), i[0] = n);
  let r;
  this.type === A.SAMPLER_2D_SHADOW ? (gr.compareFunction = t.isReversedDepthBuffer() ? 518 : 515, r = gr) : r = Oa, t.setTexture2D(e || r, n);
}
function hh(A, e, t) {
  const i = this.cache, n = t.allocateTextureUnit();
  i[0] !== n && (A.uniform1i(this.addr, n), i[0] = n), t.setTexture3D(e || Va, n);
}
function fh(A, e, t) {
  const i = this.cache, n = t.allocateTextureUnit();
  i[0] !== n && (A.uniform1i(this.addr, n), i[0] = n), t.setTextureCube(e || Ga, n);
}
function uh(A, e, t) {
  const i = this.cache, n = t.allocateTextureUnit();
  i[0] !== n && (A.uniform1i(this.addr, n), i[0] = n), t.setTexture2DArray(e || Ha, n);
}
function dh(A) {
  switch (A) {
    case 5126:
      return Jc;
    case 35664:
      return qc;
    case 35665:
      return jc;
    case 35666:
      return Zc;
    case 35674:
      return $c;
    case 35675:
      return Ah;
    case 35676:
      return eh;
    case 5124:
    case 35670:
      return th;
    case 35667:
    case 35671:
      return ih;
    case 35668:
    case 35672:
      return nh;
    case 35669:
    case 35673:
      return rh;
    case 5125:
      return sh;
    case 36294:
      return ah;
    case 36295:
      return oh;
    case 36296:
      return lh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ch;
    case 35679:
    case 36299:
    case 36307:
      return hh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return fh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return uh;
  }
}
function ph(A, e) {
  A.uniform1fv(this.addr, e);
}
function gh(A, e) {
  const t = di(e, this.size, 2);
  A.uniform2fv(this.addr, t);
}
function vh(A, e) {
  const t = di(e, this.size, 3);
  A.uniform3fv(this.addr, t);
}
function mh(A, e) {
  const t = di(e, this.size, 4);
  A.uniform4fv(this.addr, t);
}
function wh(A, e) {
  const t = di(e, this.size, 4);
  A.uniformMatrix2fv(this.addr, !1, t);
}
function Ph(A, e) {
  const t = di(e, this.size, 9);
  A.uniformMatrix3fv(this.addr, !1, t);
}
function Dh(A, e) {
  const t = di(e, this.size, 16);
  A.uniformMatrix4fv(this.addr, !1, t);
}
function Eh(A, e) {
  A.uniform1iv(this.addr, e);
}
function Bh(A, e) {
  A.uniform2iv(this.addr, e);
}
function Mh(A, e) {
  A.uniform3iv(this.addr, e);
}
function Ch(A, e) {
  A.uniform4iv(this.addr, e);
}
function xh(A, e) {
  A.uniform1uiv(this.addr, e);
}
function _h(A, e) {
  A.uniform2uiv(this.addr, e);
}
function Sh(A, e) {
  A.uniform3uiv(this.addr, e);
}
function Ih(A, e) {
  A.uniform4uiv(this.addr, e);
}
function yh(A, e, t) {
  const i = this.cache, n = e.length, r = xn(t, n);
  he(i, r) || (A.uniform1iv(this.addr, r), fe(i, r));
  let s;
  this.type === A.SAMPLER_2D_SHADOW ? s = gr : s = Oa;
  for (let a = 0; a !== n; ++a) t.setTexture2D(e[a] || s, r[a]);
}
function Qh(A, e, t) {
  const i = this.cache, n = e.length, r = xn(t, n);
  he(i, r) || (A.uniform1iv(this.addr, r), fe(i, r));
  for (let s = 0; s !== n; ++s) t.setTexture3D(e[s] || Va, r[s]);
}
function Th(A, e, t) {
  const i = this.cache, n = e.length, r = xn(t, n);
  he(i, r) || (A.uniform1iv(this.addr, r), fe(i, r));
  for (let s = 0; s !== n; ++s) t.setTextureCube(e[s] || Ga, r[s]);
}
function bh(A, e, t) {
  const i = this.cache, n = e.length, r = xn(t, n);
  he(i, r) || (A.uniform1iv(this.addr, r), fe(i, r));
  for (let s = 0; s !== n; ++s) t.setTexture2DArray(e[s] || Ha, r[s]);
}
function Rh(A) {
  switch (A) {
    case 5126:
      return ph;
    case 35664:
      return gh;
    case 35665:
      return vh;
    case 35666:
      return mh;
    case 35674:
      return wh;
    case 35675:
      return Ph;
    case 35676:
      return Dh;
    case 5124:
    case 35670:
      return Eh;
    case 35667:
    case 35671:
      return Bh;
    case 35668:
    case 35672:
      return Mh;
    case 35669:
    case 35673:
      return Ch;
    case 5125:
      return xh;
    case 36294:
      return _h;
    case 36295:
      return Sh;
    case 36296:
      return Ih;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return yh;
    case 35679:
    case 36299:
    case 36307:
      return Qh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Th;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return bh;
  }
}
var Lh = class {
  constructor(A, e, t) {
    this.id = A, this.addr = t, this.cache = [], this.type = e.type, this.setValue = dh(e.type);
  }
}, Uh = class {
  constructor(A, e, t) {
    this.id = A, this.addr = t, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Rh(e.type);
  }
}, Fh = class {
  constructor(A) {
    this.id = A, this.seq = [], this.map = {};
  }
  setValue(A, e, t) {
    const i = this.seq;
    for (let n = 0, r = i.length; n !== r; ++n) {
      const s = i[n];
      s.setValue(A, e[s.id], t);
    }
  }
}, nr = /(\w+)(\])?(\[|\.)?/g;
function Bs(A, e) {
  A.seq.push(e), A.map[e.id] = e;
}
function Nh(A, e, t) {
  const i = A.name, n = i.length;
  for (nr.lastIndex = 0; ; ) {
    const r = nr.exec(i), s = nr.lastIndex;
    let a = r[1];
    const l = r[2] === "]", o = r[3];
    if (l && (a = a | 0), o === void 0 || o === "[" && s + 2 === n) {
      Bs(t, o === void 0 ? new Lh(a, A, e) : new Uh(a, A, e));
      break;
    } else {
      let c = t.map[a];
      c === void 0 && (c = new Fh(a), Bs(t, c)), t = c;
    }
  }
}
var gn = class {
  constructor(A, e) {
    this.seq = [], this.map = {};
    const t = A.getProgramParameter(e, A.ACTIVE_UNIFORMS);
    for (let r = 0; r < t; ++r) {
      const s = A.getActiveUniform(e, r);
      Nh(s, A.getUniformLocation(e, s.name), this);
    }
    const i = [], n = [];
    for (const r of this.seq) r.type === A.SAMPLER_2D_SHADOW || r.type === A.SAMPLER_CUBE_SHADOW || r.type === A.SAMPLER_2D_ARRAY_SHADOW ? i.push(r) : n.push(r);
    i.length > 0 && (this.seq = i.concat(n));
  }
  setValue(A, e, t, i) {
    const n = this.map[e];
    n !== void 0 && n.setValue(A, t, i);
  }
  setOptional(A, e, t) {
    const i = e[t];
    i !== void 0 && this.setValue(A, t, i);
  }
  static upload(A, e, t, i) {
    for (let n = 0, r = e.length; n !== r; ++n) {
      const s = e[n], a = t[s.id];
      a.needsUpdate !== !1 && s.setValue(A, a.value, i);
    }
  }
  static seqWithValue(A, e) {
    const t = [];
    for (let i = 0, n = A.length; i !== n; ++i) {
      const r = A[i];
      r.id in e && t.push(r);
    }
    return t;
  }
};
function Ms(A, e, t) {
  const i = A.createShader(e);
  return A.shaderSource(i, t), A.compileShader(i), i;
}
var zh = 37297, Oh = 0;
function Hh(A, e) {
  const t = A.split(`
`), i = [], n = Math.max(e - 6, 0), r = Math.min(e + 6, t.length);
  for (let s = n; s < r; s++) {
    const a = s + 1;
    i.push(`${a === e ? ">" : " "} ${a}: ${t[s]}`);
  }
  return i.join(`
`);
}
var Cs = /* @__PURE__ */ new TA();
function Vh(A) {
  OA._getMatrix(Cs, OA.workingColorSpace, A);
  const e = `mat3( ${Cs.elements.map((t) => t.toFixed(4))} )`;
  switch (OA.getTransfer(A)) {
    case wn:
      return [e, "LinearTransferOETF"];
    case Pn:
      return [e, "sRGBTransferOETF"];
    default:
      return MA("WebGLProgram: Unsupported color space: ", A), [e, "LinearTransferOETF"];
  }
}
function xs(A, e, t) {
  const i = A.getShaderParameter(e, A.COMPILE_STATUS), n = (A.getShaderInfoLog(e) || "").trim();
  if (i && n === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(n);
  if (r) {
    const s = parseInt(r[1]);
    return t.toUpperCase() + `

` + n + `

` + Hh(A.getShaderSource(e), s);
  } else return n;
}
function Gh(A, e) {
  const t = Vh(e);
  return [
    `vec4 ${A}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
var kh = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Wh(A, e) {
  const t = kh[e];
  return t === void 0 ? (MA("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + A + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + A + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
var fn = /* @__PURE__ */ new N();
function Xh() {
  return OA.getLuminanceCoefficients(fn), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${fn.x.toFixed(4)}, ${fn.y.toFixed(4)}, ${fn.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Yh(A) {
  return [A.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", A.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(xi).join(`
`);
}
function Kh(A) {
  const e = [];
  for (const t in A) {
    const i = A[t];
    i !== !1 && e.push("#define " + t + " " + i);
  }
  return e.join(`
`);
}
function Jh(A, e) {
  const t = {}, i = A.getProgramParameter(e, A.ACTIVE_ATTRIBUTES);
  for (let n = 0; n < i; n++) {
    const r = A.getActiveAttrib(e, n), s = r.name;
    let a = 1;
    r.type === A.FLOAT_MAT2 && (a = 2), r.type === A.FLOAT_MAT3 && (a = 3), r.type === A.FLOAT_MAT4 && (a = 4), t[s] = {
      type: r.type,
      location: A.getAttribLocation(e, s),
      locationSize: a
    };
  }
  return t;
}
function xi(A) {
  return A !== "";
}
function _s(A, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return A.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ss(A, e) {
  return A.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
var qh = /^[ \t]*#include +<([\w\d./]+)>/gm;
function vr(A) {
  return A.replace(qh, Zh);
}
var jh = /* @__PURE__ */ new Map();
function Zh(A, e) {
  let t = LA[e];
  if (t === void 0) {
    const i = jh.get(e);
    if (i !== void 0)
      t = LA[i], MA('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i);
    else throw new Error("THREE.WebGLProgram: Can not resolve #include <" + e + ">");
  }
  return vr(t);
}
var $h = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Is(A) {
  return A.replace($h, Af);
}
function Af(A, e, t, i) {
  let n = "";
  for (let r = parseInt(e); r < parseInt(t); r++) n += i.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return n;
}
function ys(A) {
  let e = `precision ${A.precision} float;
	precision ${A.precision} int;
	precision ${A.precision} sampler2D;
	precision ${A.precision} samplerCube;
	precision ${A.precision} sampler3D;
	precision ${A.precision} sampler2DArray;
	precision ${A.precision} sampler2DShadow;
	precision ${A.precision} samplerCubeShadow;
	precision ${A.precision} sampler2DArrayShadow;
	precision ${A.precision} isampler2D;
	precision ${A.precision} isampler3D;
	precision ${A.precision} isamplerCube;
	precision ${A.precision} isampler2DArray;
	precision ${A.precision} usampler2D;
	precision ${A.precision} usampler3D;
	precision ${A.precision} usamplerCube;
	precision ${A.precision} usampler2DArray;
	`;
  return A.precision === "highp" ? e += `
#define HIGH_PRECISION` : A.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : A.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
var ef = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function tf(A) {
  return ef[A.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var nf = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function rf(A) {
  return A.envMap === !1 ? "ENVMAP_TYPE_CUBE" : nf[A.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var sf = { 302: "ENVMAP_MODE_REFRACTION" };
function af(A) {
  return A.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : sf[A.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var of = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function lf(A) {
  return A.envMap === !1 ? "ENVMAP_BLENDING_NONE" : of[A.combine] || "ENVMAP_BLENDING_NONE";
}
function cf(A) {
  const e = A.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, i = 1 / e;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)),
    texelHeight: i,
    maxMip: t
  };
}
function hf(A, e, t, i) {
  const n = A.getContext(), r = t.defines;
  let s = t.vertexShader, a = t.fragmentShader;
  const l = tf(t), o = rf(t), c = af(t), f = lf(t), h = cf(t), p = Yh(t), m = Kh(r), P = n.createProgram();
  let d, u, x = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (d = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    m
  ].filter(xi).join(`
`), d.length > 0 && (d += `
`), u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    m
  ].filter(xi).join(`
`), u.length > 0 && (u += `
`)) : (d = [
    ys(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    m,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexNormals ? "#define HAS_NORMAL" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
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
  ].filter(xi).join(`
`), u = [
    ys(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    m,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + o : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + f : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? LA.tonemapping_pars_fragment : "",
    t.toneMapping !== 0 ? Wh("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    LA.colorspace_pars_fragment,
    Gh("linearToOutputTexel", t.outputColorSpace),
    Xh(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(xi).join(`
`)), s = vr(s), s = _s(s, t), s = Ss(s, t), a = vr(a), a = _s(a, t), a = Ss(a, t), s = Is(s), a = Is(a), t.isRawShaderMaterial !== !0 && (x = `#version 300 es
`, d = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + d, u = [
    "#define varying in",
    t.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
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
` + u);
  const C = x + d + s, D = x + u + a, M = Ms(n, n.VERTEX_SHADER, C), _ = Ms(n, n.FRAGMENT_SHADER, D);
  n.attachShader(P, M), n.attachShader(P, _), t.index0AttributeName !== void 0 ? n.bindAttribLocation(P, 0, t.index0AttributeName) : t.hasPositionAttribute === !0 && n.bindAttribLocation(P, 0, "position"), n.linkProgram(P);
  function I(S) {
    if (A.debug.checkShaderErrors) {
      const V = n.getProgramInfoLog(P) || "", k = n.getShaderInfoLog(M) || "", G = n.getShaderInfoLog(_) || "", z = V.trim(), X = k.trim(), L = G.trim();
      let q = !0, AA = !0;
      if (n.getProgramParameter(P, n.LINK_STATUS) === !1)
        if (q = !1, typeof A.debug.onShaderError == "function") A.debug.onShaderError(n, P, M, _);
        else {
          const eA = xs(n, M, "vertex"), cA = xs(n, _, "fragment");
          IA("WebGLProgram: Shader Error " + n.getError() + " - VALIDATE_STATUS " + n.getProgramParameter(P, n.VALIDATE_STATUS) + `

Material Name: ` + S.name + `
Material Type: ` + S.type + `

Program Info Log: ` + z + `
` + eA + `
` + cA);
        }
      else z !== "" ? MA("WebGLProgram: Program Info Log:", z) : (X === "" || L === "") && (AA = !1);
      AA && (S.diagnostics = {
        runnable: q,
        programLog: z,
        vertexShader: {
          log: X,
          prefix: d
        },
        fragmentShader: {
          log: L,
          prefix: u
        }
      });
    }
    n.deleteShader(M), n.deleteShader(_), v = new gn(n, P), B = Jh(n, P);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && I(this), v;
  };
  let B;
  this.getAttributes = function() {
    return B === void 0 && I(this), B;
  };
  let W = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return W === !1 && (W = n.getProgramParameter(P, zh)), W;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), n.deleteProgram(P), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Oh++, this.cacheKey = e, this.usedTimes = 1, this.program = P, this.vertexShader = M, this.fragmentShader = _, this;
}
var ff = 0, uf = class {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(A, e, t) {
    const i = this._getShaderCacheForMaterial(A);
    return i.has(e) === !1 && (i.add(e), e.usedTimes++), i.has(t) === !1 && (i.add(t), t.usedTimes++), this;
  }
  remove(A) {
    const e = this.materialCache.get(A);
    for (const t of e)
      t.usedTimes--, t.usedTimes === 0 && this.shaderCache.delete(t.code);
    return this.materialCache.delete(A), this;
  }
  getVertexShaderStage(A) {
    return this._getShaderStage(A.vertexShader);
  }
  getFragmentShaderStage(A) {
    return this._getShaderStage(A.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(A) {
    const e = this.materialCache;
    let t = e.get(A);
    return t === void 0 && (t = /* @__PURE__ */ new Set(), e.set(A, t)), t;
  }
  _getShaderStage(A) {
    const e = this.shaderCache;
    let t = e.get(A);
    return t === void 0 && (t = new df(A), e.set(A, t)), t;
  }
}, df = class {
  constructor(A) {
    this.id = ff++, this.code = A, this.usedTimes = 0;
  }
};
function pf(A) {
  return A === 1030 || A === 37490 || A === 36285;
}
function gf(A, e, t, i, n, r) {
  const s = new Ba(), a = new uf(), l = /* @__PURE__ */ new Set(), o = [], c = /* @__PURE__ */ new Map(), f = i.logarithmicDepthBuffer;
  let h = i.precision;
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
  function m(v) {
    return l.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function P(v, B, W, S, V, k) {
    const G = S.fog, z = V.geometry, X = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? S.environment : null, L = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, q = e.get(v.envMap || X, L), AA = q && q.mapping === 306 ? q.image.height : null, eA = p[v.type];
    v.precision !== null && (h = i.getMaxPrecision(v.precision), h !== v.precision && MA("WebGLProgram.getParameters:", v.precision, "not supported, using", h, "instead."));
    const cA = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, PA = cA !== void 0 ? cA.length : 0;
    let WA = 0;
    z.morphAttributes.position !== void 0 && (WA = 1), z.morphAttributes.normal !== void 0 && (WA = 2), z.morphAttributes.color !== void 0 && (WA = 3);
    let KA, Y, nA, fA;
    if (eA) {
      const xA = qe[eA];
      KA = xA.vertexShader, Y = xA.fragmentShader;
    } else {
      KA = v.vertexShader, Y = v.fragmentShader;
      const xA = a.getVertexShaderStage(v), De = a.getFragmentShaderStage(v);
      a.update(v, xA, De), nA = xA.id, fA = De.id;
    }
    const hA = A.getRenderTarget(), CA = A.state.buffers.depth.getReversed(), _A = V.isInstancedMesh === !0, yA = V.isBatchedMesh === !0, XA = !!v.map, zA = !!v.matcap, $A = !!q, pe = !!v.aoMap, Ce = !!v.lightMap, Re = !!v.bumpMap && v.wireframe === !1, Ae = !!v.normalMap, ge = !!v.displacementMap, ue = !!v.emissiveMap, le = !!v.metalnessMap, T = !!v.roughnessMap, Le = v.anisotropy > 0, YA = v.clearcoat > 0, ee = v.dispersion > 0, E = v.iridescence > 0, g = v.sheen > 0, y = v.transmission > 0, H = Le && !!v.anisotropyMap, J = YA && !!v.clearcoatMap, iA = YA && !!v.clearcoatNormalMap, aA = YA && !!v.clearcoatRoughnessMap, b = E && !!v.iridescenceMap, tA = E && !!v.iridescenceThicknessMap, dA = g && !!v.sheenColorMap, mA = g && !!v.sheenRoughnessMap, $ = !!v.specularMap, DA = !!v.specularColorMap, EA = !!v.specularIntensityMap, QA = y && !!v.transmissionMap, VA = y && !!v.thicknessMap, Q = !!v.gradientMap, K = !!v.alphaMap, j = v.alphaTest > 0, uA = !!v.alphaHash, vA = !!v.extensions;
    let Z = 0;
    v.toneMapped && (hA === null || hA.isXRRenderTarget === !0) && (Z = A.toneMapping);
    const oA = {
      shaderID: eA,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: KA,
      fragmentShader: Y,
      defines: v.defines,
      customVertexShaderID: nA,
      customFragmentShaderID: fA,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: h,
      batching: yA,
      batchingColor: yA && V._colorsTexture !== null,
      instancing: _A,
      instancingColor: _A && V.instanceColor !== null,
      instancingMorph: _A && V.morphTexture !== null,
      outputColorSpace: hA === null ? A.outputColorSpace : hA.isXRRenderTarget === !0 ? hA.texture.colorSpace : OA.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: XA,
      matcap: zA,
      envMap: $A,
      envMapMode: $A && q.mapping,
      envMapCubeUVHeight: AA,
      aoMap: pe,
      lightMap: Ce,
      bumpMap: Re,
      normalMap: Ae,
      displacementMap: ge,
      emissiveMap: ue,
      normalMapObjectSpace: Ae && v.normalMapType === 1,
      normalMapTangentSpace: Ae && v.normalMapType === 0,
      packedNormalMap: Ae && v.normalMapType === 0 && pf(v.normalMap.format),
      metalnessMap: le,
      roughnessMap: T,
      anisotropy: Le,
      anisotropyMap: H,
      clearcoat: YA,
      clearcoatMap: J,
      clearcoatNormalMap: iA,
      clearcoatRoughnessMap: aA,
      dispersion: ee,
      iridescence: E,
      iridescenceMap: b,
      iridescenceThicknessMap: tA,
      sheen: g,
      sheenColorMap: dA,
      sheenRoughnessMap: mA,
      specularMap: $,
      specularColorMap: DA,
      specularIntensityMap: EA,
      transmission: y,
      transmissionMap: QA,
      thicknessMap: VA,
      gradientMap: Q,
      opaque: v.transparent === !1 && v.blending === 1 && v.alphaToCoverage === !1,
      alphaMap: K,
      alphaTest: j,
      alphaHash: uA,
      combine: v.combine,
      mapUv: XA && m(v.map.channel),
      aoMapUv: pe && m(v.aoMap.channel),
      lightMapUv: Ce && m(v.lightMap.channel),
      bumpMapUv: Re && m(v.bumpMap.channel),
      normalMapUv: Ae && m(v.normalMap.channel),
      displacementMapUv: ge && m(v.displacementMap.channel),
      emissiveMapUv: ue && m(v.emissiveMap.channel),
      metalnessMapUv: le && m(v.metalnessMap.channel),
      roughnessMapUv: T && m(v.roughnessMap.channel),
      anisotropyMapUv: H && m(v.anisotropyMap.channel),
      clearcoatMapUv: J && m(v.clearcoatMap.channel),
      clearcoatNormalMapUv: iA && m(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: aA && m(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: b && m(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: tA && m(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: dA && m(v.sheenColorMap.channel),
      sheenRoughnessMapUv: mA && m(v.sheenRoughnessMap.channel),
      specularMapUv: $ && m(v.specularMap.channel),
      specularColorMapUv: DA && m(v.specularColorMap.channel),
      specularIntensityMapUv: EA && m(v.specularIntensityMap.channel),
      transmissionMapUv: QA && m(v.transmissionMap.channel),
      thicknessMapUv: VA && m(v.thicknessMap.channel),
      alphaMapUv: K && m(v.alphaMap.channel),
      vertexTangents: !!z.attributes.tangent && (Ae || Le),
      vertexNormals: !!z.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4,
      pointsUvs: V.isPoints === !0 && !!z.attributes.uv && (XA || K),
      fog: !!G,
      useFog: v.fog === !0,
      fogExp2: !!G && G.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || z.attributes.normal === void 0 && Ae === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reversedDepthBuffer: CA,
      skinning: V.isSkinnedMesh === !0,
      hasPositionAttribute: z.attributes.position !== void 0,
      morphTargets: z.morphAttributes.position !== void 0,
      morphNormals: z.morphAttributes.normal !== void 0,
      morphColors: z.morphAttributes.color !== void 0,
      morphTargetsCount: PA,
      morphTextureStride: WA,
      numDirLights: B.directional.length,
      numPointLights: B.point.length,
      numSpotLights: B.spot.length,
      numSpotLightMaps: B.spotLightMap.length,
      numRectAreaLights: B.rectArea.length,
      numHemiLights: B.hemi.length,
      numDirLightShadows: B.directionalShadowMap.length,
      numPointLightShadows: B.pointShadowMap.length,
      numSpotLightShadows: B.spotShadowMap.length,
      numSpotLightShadowsWithMaps: B.numSpotLightShadowsWithMaps,
      numLightProbes: B.numLightProbes,
      numLightProbeGrids: k.length,
      numClippingPlanes: r.numPlanes,
      numClipIntersection: r.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: A.shadowMap.enabled && W.length > 0,
      shadowMapType: A.shadowMap.type,
      toneMapping: Z,
      decodeVideoTexture: XA && v.map.isVideoTexture === !0 && OA.getTransfer(v.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ue && v.emissiveMap.isVideoTexture === !0 && OA.getTransfer(v.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === 2,
      flipSided: v.side === 1,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: vA && v.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (vA && v.extensions.multiDraw === !0 || yA) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return oA.vertexUv1s = l.has(1), oA.vertexUv2s = l.has(2), oA.vertexUv3s = l.has(3), l.clear(), oA;
  }
  function d(v) {
    const B = [];
    if (v.shaderID ? B.push(v.shaderID) : (B.push(v.customVertexShaderID), B.push(v.customFragmentShaderID)), v.defines !== void 0) for (const W in v.defines)
      B.push(W), B.push(v.defines[W]);
    return v.isRawShaderMaterial === !1 && (u(B, v), x(B, v), B.push(A.outputColorSpace)), B.push(v.customProgramCacheKey), B.join();
  }
  function u(v, B) {
    v.push(B.precision), v.push(B.outputColorSpace), v.push(B.envMapMode), v.push(B.envMapCubeUVHeight), v.push(B.mapUv), v.push(B.alphaMapUv), v.push(B.lightMapUv), v.push(B.aoMapUv), v.push(B.bumpMapUv), v.push(B.normalMapUv), v.push(B.displacementMapUv), v.push(B.emissiveMapUv), v.push(B.metalnessMapUv), v.push(B.roughnessMapUv), v.push(B.anisotropyMapUv), v.push(B.clearcoatMapUv), v.push(B.clearcoatNormalMapUv), v.push(B.clearcoatRoughnessMapUv), v.push(B.iridescenceMapUv), v.push(B.iridescenceThicknessMapUv), v.push(B.sheenColorMapUv), v.push(B.sheenRoughnessMapUv), v.push(B.specularMapUv), v.push(B.specularColorMapUv), v.push(B.specularIntensityMapUv), v.push(B.transmissionMapUv), v.push(B.thicknessMapUv), v.push(B.combine), v.push(B.fogExp2), v.push(B.sizeAttenuation), v.push(B.morphTargetsCount), v.push(B.morphAttributeCount), v.push(B.numDirLights), v.push(B.numPointLights), v.push(B.numSpotLights), v.push(B.numSpotLightMaps), v.push(B.numHemiLights), v.push(B.numRectAreaLights), v.push(B.numDirLightShadows), v.push(B.numPointLightShadows), v.push(B.numSpotLightShadows), v.push(B.numSpotLightShadowsWithMaps), v.push(B.numLightProbes), v.push(B.shadowMapType), v.push(B.toneMapping), v.push(B.numClippingPlanes), v.push(B.numClipIntersection), v.push(B.depthPacking);
  }
  function x(v, B) {
    s.disableAll(), B.instancing && s.enable(0), B.instancingColor && s.enable(1), B.instancingMorph && s.enable(2), B.matcap && s.enable(3), B.envMap && s.enable(4), B.normalMapObjectSpace && s.enable(5), B.normalMapTangentSpace && s.enable(6), B.clearcoat && s.enable(7), B.iridescence && s.enable(8), B.alphaTest && s.enable(9), B.vertexColors && s.enable(10), B.vertexAlphas && s.enable(11), B.vertexUv1s && s.enable(12), B.vertexUv2s && s.enable(13), B.vertexUv3s && s.enable(14), B.vertexTangents && s.enable(15), B.anisotropy && s.enable(16), B.alphaHash && s.enable(17), B.batching && s.enable(18), B.dispersion && s.enable(19), B.batchingColor && s.enable(20), B.gradientMap && s.enable(21), B.packedNormalMap && s.enable(22), B.vertexNormals && s.enable(23), v.push(s.mask), s.disableAll(), B.fog && s.enable(0), B.useFog && s.enable(1), B.flatShading && s.enable(2), B.logarithmicDepthBuffer && s.enable(3), B.reversedDepthBuffer && s.enable(4), B.skinning && s.enable(5), B.morphTargets && s.enable(6), B.morphNormals && s.enable(7), B.morphColors && s.enable(8), B.premultipliedAlpha && s.enable(9), B.shadowMapEnabled && s.enable(10), B.doubleSided && s.enable(11), B.flipSided && s.enable(12), B.useDepthPacking && s.enable(13), B.dithering && s.enable(14), B.transmission && s.enable(15), B.sheen && s.enable(16), B.opaque && s.enable(17), B.pointsUvs && s.enable(18), B.decodeVideoTexture && s.enable(19), B.decodeVideoTextureEmissive && s.enable(20), B.alphaToCoverage && s.enable(21), B.numLightProbeGrids > 0 && s.enable(22), B.hasPositionAttribute && s.enable(23), v.push(s.mask);
  }
  function C(v) {
    const B = p[v.type];
    let W;
    if (B) {
      const S = qe[B];
      W = Ra.clone(S.uniforms);
    } else W = v.uniforms;
    return W;
  }
  function D(v, B) {
    let W = c.get(B);
    return W !== void 0 ? ++W.usedTimes : (W = new hf(A, B, v, n), o.push(W), c.set(B, W)), W;
  }
  function M(v) {
    if (--v.usedTimes === 0) {
      const B = o.indexOf(v);
      o[B] = o[o.length - 1], o.pop(), c.delete(v.cacheKey), v.destroy();
    }
  }
  function _(v) {
    a.remove(v);
  }
  function I() {
    a.dispose();
  }
  return {
    getParameters: P,
    getProgramCacheKey: d,
    getUniforms: C,
    acquireProgram: D,
    releaseProgram: M,
    releaseShaderCache: _,
    programs: o,
    dispose: I
  };
}
function vf() {
  let A = /* @__PURE__ */ new WeakMap();
  function e(s) {
    return A.has(s);
  }
  function t(s) {
    let a = A.get(s);
    return a === void 0 && (a = {}, A.set(s, a)), a;
  }
  function i(s) {
    A.delete(s);
  }
  function n(s, a, l) {
    A.get(s)[a] = l;
  }
  function r() {
    A = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: i,
    update: n,
    dispose: r
  };
}
function mf(A, e) {
  return A.groupOrder !== e.groupOrder ? A.groupOrder - e.groupOrder : A.renderOrder !== e.renderOrder ? A.renderOrder - e.renderOrder : A.material.id !== e.material.id ? A.material.id - e.material.id : A.materialVariant !== e.materialVariant ? A.materialVariant - e.materialVariant : A.z !== e.z ? A.z - e.z : A.id - e.id;
}
function Qs(A, e) {
  return A.groupOrder !== e.groupOrder ? A.groupOrder - e.groupOrder : A.renderOrder !== e.renderOrder ? A.renderOrder - e.renderOrder : A.z !== e.z ? e.z - A.z : A.id - e.id;
}
function Ts() {
  const A = [];
  let e = 0;
  const t = [], i = [], n = [];
  function r() {
    e = 0, t.length = 0, i.length = 0, n.length = 0;
  }
  function s(h) {
    let p = 0;
    return h.isInstancedMesh && (p += 2), h.isSkinnedMesh && (p += 1), p;
  }
  function a(h, p, m, P, d, u) {
    let x = A[e];
    return x === void 0 ? (x = {
      id: h.id,
      object: h,
      geometry: p,
      material: m,
      materialVariant: s(h),
      groupOrder: P,
      renderOrder: h.renderOrder,
      z: d,
      group: u
    }, A[e] = x) : (x.id = h.id, x.object = h, x.geometry = p, x.material = m, x.materialVariant = s(h), x.groupOrder = P, x.renderOrder = h.renderOrder, x.z = d, x.group = u), e++, x;
  }
  function l(h, p, m, P, d, u) {
    const x = a(h, p, m, P, d, u);
    m.transmission > 0 ? i.push(x) : m.transparent === !0 ? n.push(x) : t.push(x);
  }
  function o(h, p, m, P, d, u) {
    const x = a(h, p, m, P, d, u);
    m.transmission > 0 ? i.unshift(x) : m.transparent === !0 ? n.unshift(x) : t.unshift(x);
  }
  function c(h, p, m) {
    t.length > 1 && t.sort(h || mf), i.length > 1 && i.sort(p || Qs), n.length > 1 && n.sort(p || Qs), m && (t.reverse(), i.reverse(), n.reverse());
  }
  function f() {
    for (let h = e, p = A.length; h < p; h++) {
      const m = A[h];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: i,
    transparent: n,
    init: r,
    push: l,
    unshift: o,
    finish: f,
    sort: c
  };
}
function wf() {
  let A = /* @__PURE__ */ new WeakMap();
  function e(i, n) {
    const r = A.get(i);
    let s;
    return r === void 0 ? (s = new Ts(), A.set(i, [s])) : n >= r.length ? (s = new Ts(), r.push(s)) : s = r[n], s;
  }
  function t() {
    A = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Pf() {
  const A = {};
  return { get: function(e) {
    if (A[e.id] !== void 0) return A[e.id];
    let t;
    switch (e.type) {
      case "DirectionalLight":
        t = {
          direction: new N(),
          color: new HA()
        };
        break;
      case "SpotLight":
        t = {
          position: new N(),
          direction: new N(),
          color: new HA(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        t = {
          position: new N(),
          color: new HA(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        t = {
          direction: new N(),
          skyColor: new HA(),
          groundColor: new HA()
        };
        break;
      case "RectAreaLight":
        t = {
          color: new HA(),
          position: new N(),
          halfWidth: new N(),
          halfHeight: new N()
        };
        break;
    }
    return A[e.id] = t, t;
  } };
}
function Df() {
  const A = {};
  return { get: function(e) {
    if (A[e.id] !== void 0) return A[e.id];
    let t;
    switch (e.type) {
      case "DirectionalLight":
        t = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new bA()
        };
        break;
      case "SpotLight":
        t = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new bA()
        };
        break;
      case "PointLight":
        t = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new bA(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return A[e.id] = t, t;
  } };
}
var Ef = 0;
function Bf(A, e) {
  return (e.castShadow ? 2 : 0) - (A.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (A.map ? 1 : 0);
}
function Mf(A) {
  const e = new Pf(), t = Df(), i = {
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
  for (let o = 0; o < 9; o++) i.probe.push(new N());
  const n = new N(), r = new ae(), s = new ae();
  function a(o) {
    let c = 0, f = 0, h = 0;
    for (let B = 0; B < 9; B++) i.probe[B].set(0, 0, 0);
    let p = 0, m = 0, P = 0, d = 0, u = 0, x = 0, C = 0, D = 0, M = 0, _ = 0, I = 0;
    o.sort(Bf);
    for (let B = 0, W = o.length; B < W; B++) {
      const S = o[B], V = S.color, k = S.intensity, G = S.distance;
      let z = null;
      if (S.shadow && S.shadow.map && (S.shadow.map.texture.format === 1030 ? z = S.shadow.map.texture : z = S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight)
        c += V.r * k, f += V.g * k, h += V.b * k;
      else if (S.isLightProbe) {
        for (let X = 0; X < 9; X++) i.probe[X].addScaledVector(S.sh.coefficients[X], k);
        I++;
      } else if (S.isDirectionalLight) {
        const X = e.get(S);
        if (X.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
          const L = S.shadow, q = t.get(S);
          q.shadowIntensity = L.intensity, q.shadowBias = L.bias, q.shadowNormalBias = L.normalBias, q.shadowRadius = L.radius, q.shadowMapSize = L.mapSize, i.directionalShadow[p] = q, i.directionalShadowMap[p] = z, i.directionalShadowMatrix[p] = S.shadow.matrix, x++;
        }
        i.directional[p] = X, p++;
      } else if (S.isSpotLight) {
        const X = e.get(S);
        X.position.setFromMatrixPosition(S.matrixWorld), X.color.copy(V).multiplyScalar(k), X.distance = G, X.coneCos = Math.cos(S.angle), X.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), X.decay = S.decay, i.spot[P] = X;
        const L = S.shadow;
        if (S.map && (i.spotLightMap[M] = S.map, M++, L.updateMatrices(S), S.castShadow && _++), i.spotLightMatrix[P] = L.matrix, S.castShadow) {
          const q = t.get(S);
          q.shadowIntensity = L.intensity, q.shadowBias = L.bias, q.shadowNormalBias = L.normalBias, q.shadowRadius = L.radius, q.shadowMapSize = L.mapSize, i.spotShadow[P] = q, i.spotShadowMap[P] = z, D++;
        }
        P++;
      } else if (S.isRectAreaLight) {
        const X = e.get(S);
        X.color.copy(V).multiplyScalar(k), X.halfWidth.set(S.width * 0.5, 0, 0), X.halfHeight.set(0, S.height * 0.5, 0), i.rectArea[d] = X, d++;
      } else if (S.isPointLight) {
        const X = e.get(S);
        if (X.color.copy(S.color).multiplyScalar(S.intensity), X.distance = S.distance, X.decay = S.decay, S.castShadow) {
          const L = S.shadow, q = t.get(S);
          q.shadowIntensity = L.intensity, q.shadowBias = L.bias, q.shadowNormalBias = L.normalBias, q.shadowRadius = L.radius, q.shadowMapSize = L.mapSize, q.shadowCameraNear = L.camera.near, q.shadowCameraFar = L.camera.far, i.pointShadow[m] = q, i.pointShadowMap[m] = z, i.pointShadowMatrix[m] = S.shadow.matrix, C++;
        }
        i.point[m] = X, m++;
      } else if (S.isHemisphereLight) {
        const X = e.get(S);
        X.skyColor.copy(S.color).multiplyScalar(k), X.groundColor.copy(S.groundColor).multiplyScalar(k), i.hemi[u] = X, u++;
      }
    }
    d > 0 && (A.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = sA.LTC_FLOAT_1, i.rectAreaLTC2 = sA.LTC_FLOAT_2) : (i.rectAreaLTC1 = sA.LTC_HALF_1, i.rectAreaLTC2 = sA.LTC_HALF_2)), i.ambient[0] = c, i.ambient[1] = f, i.ambient[2] = h;
    const v = i.hash;
    (v.directionalLength !== p || v.pointLength !== m || v.spotLength !== P || v.rectAreaLength !== d || v.hemiLength !== u || v.numDirectionalShadows !== x || v.numPointShadows !== C || v.numSpotShadows !== D || v.numSpotMaps !== M || v.numLightProbes !== I) && (i.directional.length = p, i.spot.length = P, i.rectArea.length = d, i.point.length = m, i.hemi.length = u, i.directionalShadow.length = x, i.directionalShadowMap.length = x, i.pointShadow.length = C, i.pointShadowMap.length = C, i.spotShadow.length = D, i.spotShadowMap.length = D, i.directionalShadowMatrix.length = x, i.pointShadowMatrix.length = C, i.spotLightMatrix.length = D + M - _, i.spotLightMap.length = M, i.numSpotLightShadowsWithMaps = _, i.numLightProbes = I, v.directionalLength = p, v.pointLength = m, v.spotLength = P, v.rectAreaLength = d, v.hemiLength = u, v.numDirectionalShadows = x, v.numPointShadows = C, v.numSpotShadows = D, v.numSpotMaps = M, v.numLightProbes = I, i.version = Ef++);
  }
  function l(o, c) {
    let f = 0, h = 0, p = 0, m = 0, P = 0;
    const d = c.matrixWorldInverse;
    for (let u = 0, x = o.length; u < x; u++) {
      const C = o[u];
      if (C.isDirectionalLight) {
        const D = i.directional[f];
        D.direction.setFromMatrixPosition(C.matrixWorld), n.setFromMatrixPosition(C.target.matrixWorld), D.direction.sub(n), D.direction.transformDirection(d), f++;
      } else if (C.isSpotLight) {
        const D = i.spot[p];
        D.position.setFromMatrixPosition(C.matrixWorld), D.position.applyMatrix4(d), D.direction.setFromMatrixPosition(C.matrixWorld), n.setFromMatrixPosition(C.target.matrixWorld), D.direction.sub(n), D.direction.transformDirection(d), p++;
      } else if (C.isRectAreaLight) {
        const D = i.rectArea[m];
        D.position.setFromMatrixPosition(C.matrixWorld), D.position.applyMatrix4(d), s.identity(), r.copy(C.matrixWorld), r.premultiply(d), s.extractRotation(r), D.halfWidth.set(C.width * 0.5, 0, 0), D.halfHeight.set(0, C.height * 0.5, 0), D.halfWidth.applyMatrix4(s), D.halfHeight.applyMatrix4(s), m++;
      } else if (C.isPointLight) {
        const D = i.point[h];
        D.position.setFromMatrixPosition(C.matrixWorld), D.position.applyMatrix4(d), h++;
      } else if (C.isHemisphereLight) {
        const D = i.hemi[P];
        D.direction.setFromMatrixPosition(C.matrixWorld), D.direction.transformDirection(d), P++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: i
  };
}
function bs(A) {
  const e = new Mf(A), t = [], i = [], n = [];
  function r(h) {
    f.camera = h, t.length = 0, i.length = 0, n.length = 0;
  }
  function s(h) {
    t.push(h);
  }
  function a(h) {
    i.push(h);
  }
  function l(h) {
    n.push(h);
  }
  function o() {
    e.setup(t);
  }
  function c(h) {
    e.setupView(t, h);
  }
  const f = {
    lightsArray: t,
    shadowsArray: i,
    lightProbeGridArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: r,
    state: f,
    setupLights: o,
    setupLightsView: c,
    pushLight: s,
    pushShadow: a,
    pushLightProbeGrid: l
  };
}
function Cf(A) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(n, r = 0) {
    const s = e.get(n);
    let a;
    return s === void 0 ? (a = new bs(A), e.set(n, [a])) : r >= s.length ? (a = new bs(A), s.push(a)) : a = s[r], a;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
var xf = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, _f = `uniform sampler2D shadow_pass;
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
}`, Sf = [
  /* @__PURE__ */ new N(1, 0, 0),
  /* @__PURE__ */ new N(-1, 0, 0),
  /* @__PURE__ */ new N(0, 1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1)
], If = [
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0)
], Rs = /* @__PURE__ */ new ae(), Ei = /* @__PURE__ */ new N(), rr = /* @__PURE__ */ new N();
function yf(A, e, t) {
  let i = new Br();
  const n = new bA(), r = new bA(), s = new re(), a = new Zl(), l = new $l(), o = {}, c = t.maxTextureSize, f = {
    0: 1,
    1: 0,
    2: 2
  }, h = new Te({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new bA() },
      radius: { value: 4 }
    },
    vertexShader: xf,
    fragmentShader: _f
  }), p = h.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const m = new Ft();
  m.setAttribute("position", new Ze(new Float32Array([
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
  const P = new Ne(m, h), d = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let u = this.type;
  this.render = function(_, I, v) {
    if (d.enabled === !1 || d.autoUpdate === !1 && d.needsUpdate === !1 || _.length === 0) return;
    this.type === 2 && (MA("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const B = A.getRenderTarget(), W = A.getActiveCubeFace(), S = A.getActiveMipmapLevel(), V = A.state;
    V.setBlending(0), V.buffers.depth.getReversed() === !0 ? V.buffers.color.setClear(0, 0, 0, 0) : V.buffers.color.setClear(1, 1, 1, 1), V.buffers.depth.setTest(!0), V.setScissorTest(!1);
    const k = u !== this.type;
    k && I.traverse(function(G) {
      G.material && (Array.isArray(G.material) ? G.material.forEach((z) => z.needsUpdate = !0) : G.material.needsUpdate = !0);
    });
    for (let G = 0, z = _.length; G < z; G++) {
      const X = _[G], L = X.shadow;
      if (L === void 0) {
        MA("WebGLShadowMap:", X, "has no shadow.");
        continue;
      }
      if (L.autoUpdate === !1 && L.needsUpdate === !1) continue;
      n.copy(L.mapSize);
      const q = L.getFrameExtents();
      n.multiply(q), r.copy(L.mapSize), (n.x > c || n.y > c) && (n.x > c && (r.x = Math.floor(c / q.x), n.x = r.x * q.x, L.mapSize.x = r.x), n.y > c && (r.y = Math.floor(c / q.y), n.y = r.y * q.y, L.mapSize.y = r.y));
      const AA = A.state.buffers.depth.getReversed();
      if (L.camera._reversedDepth = AA, L.map === null || k === !0) {
        if (L.map !== null && (L.map.depthTexture !== null && (L.map.depthTexture.dispose(), L.map.depthTexture = null), L.map.dispose()), this.type === 3) {
          if (X.isPointLight) {
            MA("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          L.map = new je(n.x, n.y, {
            format: vn,
            type: Rt,
            minFilter: xe,
            magFilter: xe,
            generateMipmaps: !1
          }), L.map.texture.name = X.name + ".shadowMap", L.map.depthTexture = new hi(n.x, n.y, Bn), L.map.depthTexture.name = X.name + ".shadowMapDepth", L.map.depthTexture.format = bi, L.map.depthTexture.compareFunction = null, L.map.depthTexture.minFilter = Me, L.map.depthTexture.magFilter = Me;
        } else
          X.isPointLight ? (L.map = new za(n.x), L.map.depthTexture = new Xl(n.x, bt)) : (L.map = new je(n.x, n.y), L.map.depthTexture = new hi(n.x, n.y, bt)), L.map.depthTexture.name = X.name + ".shadowMap", L.map.depthTexture.format = bi, this.type === 1 ? (L.map.depthTexture.compareFunction = AA ? 518 : 515, L.map.depthTexture.minFilter = xe, L.map.depthTexture.magFilter = xe) : (L.map.depthTexture.compareFunction = null, L.map.depthTexture.minFilter = Me, L.map.depthTexture.magFilter = Me);
        L.camera.updateProjectionMatrix();
      }
      const eA = L.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let cA = 0; cA < eA; cA++) {
        if (L.map.isWebGLCubeRenderTarget)
          A.setRenderTarget(L.map, cA), A.clear();
        else {
          cA === 0 && (A.setRenderTarget(L.map), A.clear());
          const PA = L.getViewport(cA);
          s.set(r.x * PA.x, r.y * PA.y, r.x * PA.z, r.y * PA.w), V.viewport(s);
        }
        if (X.isPointLight) {
          const PA = L.camera, WA = L.matrix, KA = X.distance || PA.far;
          KA !== PA.far && (PA.far = KA, PA.updateProjectionMatrix()), Ei.setFromMatrixPosition(X.matrixWorld), PA.position.copy(Ei), rr.copy(PA.position), rr.add(Sf[cA]), PA.up.copy(If[cA]), PA.lookAt(rr), PA.updateMatrixWorld(), WA.makeTranslation(-Ei.x, -Ei.y, -Ei.z), Rs.multiplyMatrices(PA.projectionMatrix, PA.matrixWorldInverse), L._frustum.setFromProjectionMatrix(Rs, PA.coordinateSystem, PA.reversedDepth);
        } else L.updateMatrices(X);
        i = L.getFrustum(), D(I, v, L.camera, X, this.type);
      }
      L.isPointLightShadow !== !0 && this.type === 3 && x(L, v), L.needsUpdate = !1;
    }
    u = this.type, d.needsUpdate = !1, A.setRenderTarget(B, W, S);
  };
  function x(_, I) {
    const v = e.update(P);
    h.defines.VSM_SAMPLES !== _.blurSamples && (h.defines.VSM_SAMPLES = _.blurSamples, p.defines.VSM_SAMPLES = _.blurSamples, h.needsUpdate = !0, p.needsUpdate = !0), _.mapPass === null && (_.mapPass = new je(n.x, n.y, {
      format: vn,
      type: Rt
    })), h.uniforms.shadow_pass.value = _.map.depthTexture, h.uniforms.resolution.value = _.mapSize, h.uniforms.radius.value = _.radius, A.setRenderTarget(_.mapPass), A.clear(), A.renderBufferDirect(I, null, v, h, P, null), p.uniforms.shadow_pass.value = _.mapPass.texture, p.uniforms.resolution.value = _.mapSize, p.uniforms.radius.value = _.radius, A.setRenderTarget(_.map), A.clear(), A.renderBufferDirect(I, null, v, p, P, null);
  }
  function C(_, I, v, B) {
    let W = null;
    const S = v.isPointLight === !0 ? _.customDistanceMaterial : _.customDepthMaterial;
    if (S !== void 0) W = S;
    else if (W = v.isPointLight === !0 ? l : a, A.localClippingEnabled && I.clipShadows === !0 && Array.isArray(I.clippingPlanes) && I.clippingPlanes.length !== 0 || I.displacementMap && I.displacementScale !== 0 || I.alphaMap && I.alphaTest > 0 || I.map && I.alphaTest > 0 || I.alphaToCoverage === !0) {
      const V = W.uuid, k = I.uuid;
      let G = o[V];
      G === void 0 && (G = {}, o[V] = G);
      let z = G[k];
      z === void 0 && (z = W.clone(), G[k] = z, I.addEventListener("dispose", M)), W = z;
    }
    if (W.visible = I.visible, W.wireframe = I.wireframe, B === 3 ? W.side = I.shadowSide !== null ? I.shadowSide : I.side : W.side = I.shadowSide !== null ? I.shadowSide : f[I.side], W.alphaMap = I.alphaMap, W.alphaTest = I.alphaToCoverage === !0 ? 0.5 : I.alphaTest, W.map = I.map, W.clipShadows = I.clipShadows, W.clippingPlanes = I.clippingPlanes, W.clipIntersection = I.clipIntersection, W.displacementMap = I.displacementMap, W.displacementScale = I.displacementScale, W.displacementBias = I.displacementBias, W.wireframeLinewidth = I.wireframeLinewidth, W.linewidth = I.linewidth, v.isPointLight === !0 && W.isMeshDistanceMaterial === !0) {
      const V = A.properties.get(W);
      V.light = v;
    }
    return W;
  }
  function D(_, I, v, B, W) {
    if (_.visible === !1) return;
    if (_.layers.test(I.layers) && (_.isMesh || _.isLine || _.isPoints) && (_.castShadow || _.receiveShadow && W === 3) && (!_.frustumCulled || i.intersectsObject(_))) {
      _.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, _.matrixWorld);
      const V = e.update(_), k = _.material;
      if (Array.isArray(k)) {
        const G = V.groups;
        for (let z = 0, X = G.length; z < X; z++) {
          const L = G[z], q = k[L.materialIndex];
          if (q && q.visible) {
            const AA = C(_, q, B, W);
            _.onBeforeShadow(A, _, I, v, V, AA, L), A.renderBufferDirect(v, null, V, AA, _, L), _.onAfterShadow(A, _, I, v, V, AA, L);
          }
        }
      } else if (k.visible) {
        const G = C(_, k, B, W);
        _.onBeforeShadow(A, _, I, v, V, G, null), A.renderBufferDirect(v, null, V, G, _, null), _.onAfterShadow(A, _, I, v, V, G, null);
      }
    }
    const S = _.children;
    for (let V = 0, k = S.length; V < k; V++) D(S[V], I, v, B, W);
  }
  function M(_) {
    _.target.removeEventListener("dispose", M);
    for (const I in o) {
      const v = o[I], B = _.target.uuid;
      B in v && (v[B].dispose(), delete v[B]);
    }
  }
}
function Qf(A, e) {
  function t() {
    let Q = !1;
    const K = new re();
    let j = null;
    const uA = new re(0, 0, 0, 0);
    return {
      setMask: function(vA) {
        j !== vA && !Q && (A.colorMask(vA, vA, vA, vA), j = vA);
      },
      setLocked: function(vA) {
        Q = vA;
      },
      setClear: function(vA, Z, oA, xA, De) {
        De === !0 && (vA *= xA, Z *= xA, oA *= xA), K.set(vA, Z, oA, xA), uA.equals(K) === !1 && (A.clearColor(vA, Z, oA, xA), uA.copy(K));
      },
      reset: function() {
        Q = !1, j = null, uA.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let Q = !1, K = !1, j = null, uA = null, vA = null;
    return {
      setReversed: function(Z) {
        if (K !== Z) {
          const oA = e.get("EXT_clip_control");
          Z ? oA.clipControlEXT(oA.LOWER_LEFT_EXT, oA.ZERO_TO_ONE_EXT) : oA.clipControlEXT(oA.LOWER_LEFT_EXT, oA.NEGATIVE_ONE_TO_ONE_EXT), K = Z;
          const xA = vA;
          vA = null, this.setClear(xA);
        }
      },
      getReversed: function() {
        return K;
      },
      setTest: function(Z) {
        Z ? hA(A.DEPTH_TEST) : CA(A.DEPTH_TEST);
      },
      setMask: function(Z) {
        j !== Z && !Q && (A.depthMask(Z), j = Z);
      },
      setFunc: function(Z) {
        if (K && (Z = nl[Z]), uA !== Z) {
          switch (Z) {
            case 0:
              A.depthFunc(A.NEVER);
              break;
            case 1:
              A.depthFunc(A.ALWAYS);
              break;
            case 2:
              A.depthFunc(A.LESS);
              break;
            case 3:
              A.depthFunc(A.LEQUAL);
              break;
            case 4:
              A.depthFunc(A.EQUAL);
              break;
            case 5:
              A.depthFunc(A.GEQUAL);
              break;
            case 6:
              A.depthFunc(A.GREATER);
              break;
            case 7:
              A.depthFunc(A.NOTEQUAL);
              break;
            default:
              A.depthFunc(A.LEQUAL);
          }
          uA = Z;
        }
      },
      setLocked: function(Z) {
        Q = Z;
      },
      setClear: function(Z) {
        vA !== Z && (vA = Z, K && (Z = 1 - Z), A.clearDepth(Z));
      },
      reset: function() {
        Q = !1, j = null, uA = null, vA = null, K = !1;
      }
    };
  }
  function n() {
    let Q = !1, K = null, j = null, uA = null, vA = null, Z = null, oA = null, xA = null, De = null;
    return {
      setTest: function(jA) {
        Q || (jA ? hA(A.STENCIL_TEST) : CA(A.STENCIL_TEST));
      },
      setMask: function(jA) {
        K !== jA && !Q && (A.stencilMask(jA), K = jA);
      },
      setFunc: function(jA, Xe, At) {
        (j !== jA || uA !== Xe || vA !== At) && (A.stencilFunc(jA, Xe, At), j = jA, uA = Xe, vA = At);
      },
      setOp: function(jA, Xe, At) {
        (Z !== jA || oA !== Xe || xA !== At) && (A.stencilOp(jA, Xe, At), Z = jA, oA = Xe, xA = At);
      },
      setLocked: function(jA) {
        Q = jA;
      },
      setClear: function(jA) {
        De !== jA && (A.clearStencil(jA), De = jA);
      },
      reset: function() {
        Q = !1, K = null, j = null, uA = null, vA = null, Z = null, oA = null, xA = null, De = null;
      }
    };
  }
  const r = new t(), s = new i(), a = new n(), l = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  let c = {}, f = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), m = [], P = null, d = !1, u = null, x = null, C = null, D = null, M = null, _ = null, I = null, v = new HA(0, 0, 0), B = 0, W = !1, S = null, V = null, k = null, G = null, z = null;
  const X = A.getParameter(A.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let L = !1, q = 0;
  const AA = A.getParameter(A.VERSION);
  AA.indexOf("WebGL") !== -1 ? (q = parseFloat(/^WebGL (\d)/.exec(AA)[1]), L = q >= 1) : AA.indexOf("OpenGL ES") !== -1 && (q = parseFloat(/^OpenGL ES (\d)/.exec(AA)[1]), L = q >= 2);
  let eA = null, cA = {};
  const PA = A.getParameter(A.SCISSOR_BOX), WA = A.getParameter(A.VIEWPORT), KA = new re().fromArray(PA), Y = new re().fromArray(WA);
  function nA(Q, K, j, uA) {
    const vA = new Uint8Array(4), Z = A.createTexture();
    A.bindTexture(Q, Z), A.texParameteri(Q, A.TEXTURE_MIN_FILTER, A.NEAREST), A.texParameteri(Q, A.TEXTURE_MAG_FILTER, A.NEAREST);
    for (let oA = 0; oA < j; oA++) Q === A.TEXTURE_3D || Q === A.TEXTURE_2D_ARRAY ? A.texImage3D(K, 0, A.RGBA, 1, 1, uA, 0, A.RGBA, A.UNSIGNED_BYTE, vA) : A.texImage2D(K + oA, 0, A.RGBA, 1, 1, 0, A.RGBA, A.UNSIGNED_BYTE, vA);
    return Z;
  }
  const fA = {};
  fA[A.TEXTURE_2D] = nA(A.TEXTURE_2D, A.TEXTURE_2D, 1), fA[A.TEXTURE_CUBE_MAP] = nA(A.TEXTURE_CUBE_MAP, A.TEXTURE_CUBE_MAP_POSITIVE_X, 6), fA[A.TEXTURE_2D_ARRAY] = nA(A.TEXTURE_2D_ARRAY, A.TEXTURE_2D_ARRAY, 1, 1), fA[A.TEXTURE_3D] = nA(A.TEXTURE_3D, A.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), s.setClear(1), a.setClear(0), hA(A.DEPTH_TEST), s.setFunc(3), Re(!1), Ae(1), hA(A.CULL_FACE), pe(0);
  function hA(Q) {
    c[Q] !== !0 && (A.enable(Q), c[Q] = !0);
  }
  function CA(Q) {
    c[Q] !== !1 && (A.disable(Q), c[Q] = !1);
  }
  function _A(Q, K) {
    return h[Q] !== K ? (A.bindFramebuffer(Q, K), h[Q] = K, Q === A.DRAW_FRAMEBUFFER && (h[A.FRAMEBUFFER] = K), Q === A.FRAMEBUFFER && (h[A.DRAW_FRAMEBUFFER] = K), !0) : !1;
  }
  function yA(Q, K) {
    let j = m, uA = !1;
    if (Q) {
      j = p.get(K), j === void 0 && (j = [], p.set(K, j));
      const vA = Q.textures;
      if (j.length !== vA.length || j[0] !== A.COLOR_ATTACHMENT0) {
        for (let Z = 0, oA = vA.length; Z < oA; Z++) j[Z] = A.COLOR_ATTACHMENT0 + Z;
        j.length = vA.length, uA = !0;
      }
    } else j[0] !== A.BACK && (j[0] = A.BACK, uA = !0);
    uA && A.drawBuffers(j);
  }
  function XA(Q) {
    return P !== Q ? (A.useProgram(Q), P = Q, !0) : !1;
  }
  const zA = {
    100: A.FUNC_ADD,
    101: A.FUNC_SUBTRACT,
    102: A.FUNC_REVERSE_SUBTRACT
  };
  zA[103] = A.MIN, zA[104] = A.MAX;
  const $A = {
    200: A.ZERO,
    201: A.ONE,
    202: A.SRC_COLOR,
    204: A.SRC_ALPHA,
    210: A.SRC_ALPHA_SATURATE,
    208: A.DST_COLOR,
    206: A.DST_ALPHA,
    203: A.ONE_MINUS_SRC_COLOR,
    205: A.ONE_MINUS_SRC_ALPHA,
    209: A.ONE_MINUS_DST_COLOR,
    207: A.ONE_MINUS_DST_ALPHA,
    211: A.CONSTANT_COLOR,
    212: A.ONE_MINUS_CONSTANT_COLOR,
    213: A.CONSTANT_ALPHA,
    214: A.ONE_MINUS_CONSTANT_ALPHA
  };
  function pe(Q, K, j, uA, vA, Z, oA, xA, De, jA) {
    if (Q === 0) {
      d === !0 && (CA(A.BLEND), d = !1);
      return;
    }
    if (d === !1 && (hA(A.BLEND), d = !0), Q !== 5) {
      if (Q !== u || jA !== W) {
        if ((x !== 100 || M !== 100) && (A.blendEquation(A.FUNC_ADD), x = 100, M = 100), jA) switch (Q) {
          case 1:
            A.blendFuncSeparate(A.ONE, A.ONE_MINUS_SRC_ALPHA, A.ONE, A.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            A.blendFunc(A.ONE, A.ONE);
            break;
          case 3:
            A.blendFuncSeparate(A.ZERO, A.ONE_MINUS_SRC_COLOR, A.ZERO, A.ONE);
            break;
          case 4:
            A.blendFuncSeparate(A.DST_COLOR, A.ONE_MINUS_SRC_ALPHA, A.ZERO, A.ONE);
            break;
          default:
            IA("WebGLState: Invalid blending: ", Q);
            break;
        }
        else switch (Q) {
          case 1:
            A.blendFuncSeparate(A.SRC_ALPHA, A.ONE_MINUS_SRC_ALPHA, A.ONE, A.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            A.blendFuncSeparate(A.SRC_ALPHA, A.ONE, A.ONE, A.ONE);
            break;
          case 3:
            IA("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case 4:
            IA("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            IA("WebGLState: Invalid blending: ", Q);
            break;
        }
        C = null, D = null, _ = null, I = null, v.set(0, 0, 0), B = 0, u = Q, W = jA;
      }
      return;
    }
    vA = vA || K, Z = Z || j, oA = oA || uA, (K !== x || vA !== M) && (A.blendEquationSeparate(zA[K], zA[vA]), x = K, M = vA), (j !== C || uA !== D || Z !== _ || oA !== I) && (A.blendFuncSeparate($A[j], $A[uA], $A[Z], $A[oA]), C = j, D = uA, _ = Z, I = oA), (xA.equals(v) === !1 || De !== B) && (A.blendColor(xA.r, xA.g, xA.b, De), v.copy(xA), B = De), u = Q, W = !1;
  }
  function Ce(Q, K) {
    Q.side === 2 ? CA(A.CULL_FACE) : hA(A.CULL_FACE);
    let j = Q.side === 1;
    K && (j = !j), Re(j), Q.blending === 1 && Q.transparent === !1 ? pe(0) : pe(Q.blending, Q.blendEquation, Q.blendSrc, Q.blendDst, Q.blendEquationAlpha, Q.blendSrcAlpha, Q.blendDstAlpha, Q.blendColor, Q.blendAlpha, Q.premultipliedAlpha), s.setFunc(Q.depthFunc), s.setTest(Q.depthTest), s.setMask(Q.depthWrite), r.setMask(Q.colorWrite);
    const uA = Q.stencilWrite;
    a.setTest(uA), uA && (a.setMask(Q.stencilWriteMask), a.setFunc(Q.stencilFunc, Q.stencilRef, Q.stencilFuncMask), a.setOp(Q.stencilFail, Q.stencilZFail, Q.stencilZPass)), ue(Q.polygonOffset, Q.polygonOffsetFactor, Q.polygonOffsetUnits), Q.alphaToCoverage === !0 ? hA(A.SAMPLE_ALPHA_TO_COVERAGE) : CA(A.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Re(Q) {
    S !== Q && (Q ? A.frontFace(A.CW) : A.frontFace(A.CCW), S = Q);
  }
  function Ae(Q) {
    Q !== 0 ? (hA(A.CULL_FACE), Q !== V && (Q === 1 ? A.cullFace(A.BACK) : Q === 2 ? A.cullFace(A.FRONT) : A.cullFace(A.FRONT_AND_BACK))) : CA(A.CULL_FACE), V = Q;
  }
  function ge(Q) {
    Q !== k && (L && A.lineWidth(Q), k = Q);
  }
  function ue(Q, K, j) {
    Q ? (hA(A.POLYGON_OFFSET_FILL), (G !== K || z !== j) && (G = K, z = j, s.getReversed() && (K = -K), A.polygonOffset(K, j))) : CA(A.POLYGON_OFFSET_FILL);
  }
  function le(Q) {
    Q ? hA(A.SCISSOR_TEST) : CA(A.SCISSOR_TEST);
  }
  function T(Q) {
    Q === void 0 && (Q = A.TEXTURE0 + X - 1), eA !== Q && (A.activeTexture(Q), eA = Q);
  }
  function Le(Q, K, j) {
    j === void 0 && (eA === null ? j = A.TEXTURE0 + X - 1 : j = eA);
    let uA = cA[j];
    uA === void 0 && (uA = {
      type: void 0,
      texture: void 0
    }, cA[j] = uA), (uA.type !== Q || uA.texture !== K) && (eA !== j && (A.activeTexture(j), eA = j), A.bindTexture(Q, K || fA[Q]), uA.type = Q, uA.texture = K);
  }
  function YA() {
    const Q = cA[eA];
    Q !== void 0 && Q.type !== void 0 && (A.bindTexture(Q.type, null), Q.type = void 0, Q.texture = void 0);
  }
  function ee() {
    try {
      A.compressedTexImage2D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function E() {
    try {
      A.compressedTexImage3D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function g() {
    try {
      A.texSubImage2D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function y() {
    try {
      A.texSubImage3D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function H() {
    try {
      A.compressedTexSubImage2D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function J() {
    try {
      A.compressedTexSubImage3D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function iA() {
    try {
      A.texStorage2D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function aA() {
    try {
      A.texStorage3D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function b() {
    try {
      A.texImage2D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function tA() {
    try {
      A.texImage3D(...arguments);
    } catch (Q) {
      IA("WebGLState:", Q);
    }
  }
  function dA(Q) {
    return f[Q] !== void 0 ? f[Q] : A.getParameter(Q);
  }
  function mA(Q, K) {
    f[Q] !== K && (A.pixelStorei(Q, K), f[Q] = K);
  }
  function $(Q) {
    KA.equals(Q) === !1 && (A.scissor(Q.x, Q.y, Q.z, Q.w), KA.copy(Q));
  }
  function DA(Q) {
    Y.equals(Q) === !1 && (A.viewport(Q.x, Q.y, Q.z, Q.w), Y.copy(Q));
  }
  function EA(Q, K) {
    let j = o.get(K);
    j === void 0 && (j = /* @__PURE__ */ new WeakMap(), o.set(K, j));
    let uA = j.get(Q);
    uA === void 0 && (uA = A.getUniformBlockIndex(K, Q.name), j.set(Q, uA));
  }
  function QA(Q, K) {
    const j = o.get(K).get(Q);
    l.get(K) !== j && (A.uniformBlockBinding(K, j, Q.__bindingPointIndex), l.set(K, j));
  }
  function VA() {
    A.disable(A.BLEND), A.disable(A.CULL_FACE), A.disable(A.DEPTH_TEST), A.disable(A.POLYGON_OFFSET_FILL), A.disable(A.SCISSOR_TEST), A.disable(A.STENCIL_TEST), A.disable(A.SAMPLE_ALPHA_TO_COVERAGE), A.blendEquation(A.FUNC_ADD), A.blendFunc(A.ONE, A.ZERO), A.blendFuncSeparate(A.ONE, A.ZERO, A.ONE, A.ZERO), A.blendColor(0, 0, 0, 0), A.colorMask(!0, !0, !0, !0), A.clearColor(0, 0, 0, 0), A.depthMask(!0), A.depthFunc(A.LESS), s.setReversed(!1), A.clearDepth(1), A.stencilMask(4294967295), A.stencilFunc(A.ALWAYS, 0, 4294967295), A.stencilOp(A.KEEP, A.KEEP, A.KEEP), A.clearStencil(0), A.cullFace(A.BACK), A.frontFace(A.CCW), A.polygonOffset(0, 0), A.activeTexture(A.TEXTURE0), A.bindFramebuffer(A.FRAMEBUFFER, null), A.bindFramebuffer(A.DRAW_FRAMEBUFFER, null), A.bindFramebuffer(A.READ_FRAMEBUFFER, null), A.useProgram(null), A.lineWidth(1), A.scissor(0, 0, A.canvas.width, A.canvas.height), A.viewport(0, 0, A.canvas.width, A.canvas.height), A.pixelStorei(A.PACK_ALIGNMENT, 4), A.pixelStorei(A.UNPACK_ALIGNMENT, 4), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, !1), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), A.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL, A.BROWSER_DEFAULT_WEBGL), A.pixelStorei(A.PACK_ROW_LENGTH, 0), A.pixelStorei(A.PACK_SKIP_PIXELS, 0), A.pixelStorei(A.PACK_SKIP_ROWS, 0), A.pixelStorei(A.UNPACK_ROW_LENGTH, 0), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, 0), A.pixelStorei(A.UNPACK_SKIP_PIXELS, 0), A.pixelStorei(A.UNPACK_SKIP_ROWS, 0), A.pixelStorei(A.UNPACK_SKIP_IMAGES, 0), c = {}, f = {}, eA = null, cA = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), m = [], P = null, d = !1, u = null, x = null, C = null, D = null, M = null, _ = null, I = null, v = new HA(0, 0, 0), B = 0, W = !1, S = null, V = null, k = null, G = null, z = null, KA.set(0, 0, A.canvas.width, A.canvas.height), Y.set(0, 0, A.canvas.width, A.canvas.height), r.reset(), s.reset(), a.reset();
  }
  return {
    buffers: {
      color: r,
      depth: s,
      stencil: a
    },
    enable: hA,
    disable: CA,
    bindFramebuffer: _A,
    drawBuffers: yA,
    useProgram: XA,
    setBlending: pe,
    setMaterial: Ce,
    setFlipSided: Re,
    setCullFace: Ae,
    setLineWidth: ge,
    setPolygonOffset: ue,
    setScissorTest: le,
    activeTexture: T,
    bindTexture: Le,
    unbindTexture: YA,
    compressedTexImage2D: ee,
    compressedTexImage3D: E,
    texImage2D: b,
    texImage3D: tA,
    pixelStorei: mA,
    getParameter: dA,
    updateUBOMapping: EA,
    uniformBlockBinding: QA,
    texStorage2D: iA,
    texStorage3D: aA,
    texSubImage2D: g,
    texSubImage3D: y,
    compressedTexSubImage2D: H,
    compressedTexSubImage3D: J,
    scissor: $,
    viewport: DA,
    reset: VA
  };
}
function Tf(A, e, t, i, n, r, s) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), o = new bA(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new Set();
  let h;
  const p = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function P(E, g) {
    return m ? new OffscreenCanvas(E, g) : Dn("canvas");
  }
  function d(E, g, y) {
    let H = 1;
    const J = ee(E);
    if ((J.width > y || J.height > y) && (H = y / Math.max(J.width, J.height)), H < 1) if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
      const iA = Math.floor(H * J.width), aA = Math.floor(H * J.height);
      h === void 0 && (h = P(iA, aA));
      const b = g ? P(iA, aA) : h;
      return b.width = iA, b.height = aA, b.getContext("2d").drawImage(E, 0, 0, iA, aA), MA("WebGLRenderer: Texture has been resized from (" + J.width + "x" + J.height + ") to (" + iA + "x" + aA + ")."), b;
    } else
      return "data" in E && MA("WebGLRenderer: Image in DataTexture is too big (" + J.width + "x" + J.height + ")."), E;
    return E;
  }
  function u(E) {
    return E.generateMipmaps;
  }
  function x(E) {
    A.generateMipmap(E);
  }
  function C(E) {
    return E.isWebGLCubeRenderTarget ? A.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? A.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? A.TEXTURE_2D_ARRAY : A.TEXTURE_2D;
  }
  function D(E, g, y, H, J, iA = !1) {
    if (E !== null) {
      if (A[E] !== void 0) return A[E];
      MA("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let aA;
    H && (aA = e.get("EXT_texture_norm16"), aA || MA("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let b = g;
    if (g === A.RED && (y === A.FLOAT && (b = A.R32F), y === A.HALF_FLOAT && (b = A.R16F), y === A.UNSIGNED_BYTE && (b = A.R8), y === A.UNSIGNED_SHORT && aA && (b = aA.R16_EXT), y === A.SHORT && aA && (b = aA.R16_SNORM_EXT)), g === A.RED_INTEGER && (y === A.UNSIGNED_BYTE && (b = A.R8UI), y === A.UNSIGNED_SHORT && (b = A.R16UI), y === A.UNSIGNED_INT && (b = A.R32UI), y === A.BYTE && (b = A.R8I), y === A.SHORT && (b = A.R16I), y === A.INT && (b = A.R32I)), g === A.RG && (y === A.FLOAT && (b = A.RG32F), y === A.HALF_FLOAT && (b = A.RG16F), y === A.UNSIGNED_BYTE && (b = A.RG8), y === A.UNSIGNED_SHORT && aA && (b = aA.RG16_EXT), y === A.SHORT && aA && (b = aA.RG16_SNORM_EXT)), g === A.RG_INTEGER && (y === A.UNSIGNED_BYTE && (b = A.RG8UI), y === A.UNSIGNED_SHORT && (b = A.RG16UI), y === A.UNSIGNED_INT && (b = A.RG32UI), y === A.BYTE && (b = A.RG8I), y === A.SHORT && (b = A.RG16I), y === A.INT && (b = A.RG32I)), g === A.RGB_INTEGER && (y === A.UNSIGNED_BYTE && (b = A.RGB8UI), y === A.UNSIGNED_SHORT && (b = A.RGB16UI), y === A.UNSIGNED_INT && (b = A.RGB32UI), y === A.BYTE && (b = A.RGB8I), y === A.SHORT && (b = A.RGB16I), y === A.INT && (b = A.RGB32I)), g === A.RGBA_INTEGER && (y === A.UNSIGNED_BYTE && (b = A.RGBA8UI), y === A.UNSIGNED_SHORT && (b = A.RGBA16UI), y === A.UNSIGNED_INT && (b = A.RGBA32UI), y === A.BYTE && (b = A.RGBA8I), y === A.SHORT && (b = A.RGBA16I), y === A.INT && (b = A.RGBA32I)), g === A.RGB && (y === A.UNSIGNED_SHORT && aA && (b = aA.RGB16_EXT), y === A.SHORT && aA && (b = aA.RGB16_SNORM_EXT), y === A.UNSIGNED_INT_5_9_9_9_REV && (b = A.RGB9_E5), y === A.UNSIGNED_INT_10F_11F_11F_REV && (b = A.R11F_G11F_B10F)), g === A.RGBA) {
      const tA = iA ? wn : OA.getTransfer(J);
      y === A.FLOAT && (b = A.RGBA32F), y === A.HALF_FLOAT && (b = A.RGBA16F), y === A.UNSIGNED_BYTE && (b = tA === "srgb" ? A.SRGB8_ALPHA8 : A.RGBA8), y === A.UNSIGNED_SHORT && aA && (b = aA.RGBA16_EXT), y === A.SHORT && aA && (b = aA.RGBA16_SNORM_EXT), y === A.UNSIGNED_SHORT_4_4_4_4 && (b = A.RGBA4), y === A.UNSIGNED_SHORT_5_5_5_1 && (b = A.RGB5_A1);
    }
    return (b === A.R16F || b === A.R32F || b === A.RG16F || b === A.RG32F || b === A.RGBA16F || b === A.RGBA32F) && e.get("EXT_color_buffer_float"), b;
  }
  function M(E, g) {
    let y;
    return E ? g === null || g === 1014 || g === 1020 ? y = A.DEPTH24_STENCIL8 : g === 1015 ? y = A.DEPTH32F_STENCIL8 : g === 1012 && (y = A.DEPTH24_STENCIL8, MA("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === 1014 || g === 1020 ? y = A.DEPTH_COMPONENT24 : g === 1015 ? y = A.DEPTH_COMPONENT32F : g === 1012 && (y = A.DEPTH_COMPONENT16), y;
  }
  function _(E, g) {
    return u(E) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? g.mipmaps.length : 1;
  }
  function I(E) {
    const g = E.target;
    g.removeEventListener("dispose", I), B(g), g.isVideoTexture && c.delete(g), g.isHTMLTexture && f.delete(g);
  }
  function v(E) {
    const g = E.target;
    g.removeEventListener("dispose", v), S(g);
  }
  function B(E) {
    const g = i.get(E);
    if (g.__webglInit === void 0) return;
    const y = E.source, H = p.get(y);
    if (H) {
      const J = H[g.__cacheKey];
      J.usedTimes--, J.usedTimes === 0 && W(E), Object.keys(H).length === 0 && p.delete(y);
    }
    i.remove(E);
  }
  function W(E) {
    const g = i.get(E);
    A.deleteTexture(g.__webglTexture);
    const y = E.source, H = p.get(y);
    delete H[g.__cacheKey], s.memory.textures--;
  }
  function S(E) {
    const g = i.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), i.remove(E.depthTexture)), E.isWebGLCubeRenderTarget) for (let H = 0; H < 6; H++) {
      if (Array.isArray(g.__webglFramebuffer[H])) for (let J = 0; J < g.__webglFramebuffer[H].length; J++) A.deleteFramebuffer(g.__webglFramebuffer[H][J]);
      else A.deleteFramebuffer(g.__webglFramebuffer[H]);
      g.__webglDepthbuffer && A.deleteRenderbuffer(g.__webglDepthbuffer[H]);
    }
    else {
      if (Array.isArray(g.__webglFramebuffer)) for (let H = 0; H < g.__webglFramebuffer.length; H++) A.deleteFramebuffer(g.__webglFramebuffer[H]);
      else A.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && A.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && A.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let H = 0; H < g.__webglColorRenderbuffer.length; H++) g.__webglColorRenderbuffer[H] && A.deleteRenderbuffer(g.__webglColorRenderbuffer[H]);
      g.__webglDepthRenderbuffer && A.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const y = E.textures;
    for (let H = 0, J = y.length; H < J; H++) {
      const iA = i.get(y[H]);
      iA.__webglTexture && (A.deleteTexture(iA.__webglTexture), s.memory.textures--), i.remove(y[H]);
    }
    i.remove(E);
  }
  let V = 0;
  function k() {
    V = 0;
  }
  function G() {
    return V;
  }
  function z(E) {
    V = E;
  }
  function X() {
    const E = V;
    return E >= n.maxTextures && MA("WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + n.maxTextures), V += 1, E;
  }
  function L(E) {
    const g = [];
    return g.push(E.wrapS), g.push(E.wrapT), g.push(E.wrapR || 0), g.push(E.magFilter), g.push(E.minFilter), g.push(E.anisotropy), g.push(E.internalFormat), g.push(E.format), g.push(E.type), g.push(E.generateMipmaps), g.push(E.premultiplyAlpha), g.push(E.flipY), g.push(E.unpackAlignment), g.push(E.colorSpace), g.join();
  }
  function q(E, g) {
    const y = i.get(E);
    if (E.isVideoTexture && Le(E), E.isRenderTargetTexture === !1 && E.isExternalTexture !== !0 && E.version > 0 && y.__version !== E.version) {
      const H = E.image;
      if (H === null) MA("WebGLRenderer: Texture marked for update but no image data found.");
      else if (H.complete === !1) MA("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        CA(y, E, g);
        return;
      }
    } else E.isExternalTexture && (y.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(A.TEXTURE_2D, y.__webglTexture, A.TEXTURE0 + g);
  }
  function AA(E, g) {
    const y = i.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && y.__version !== E.version) {
      CA(y, E, g);
      return;
    } else E.isExternalTexture && (y.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(A.TEXTURE_2D_ARRAY, y.__webglTexture, A.TEXTURE0 + g);
  }
  function eA(E, g) {
    const y = i.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && y.__version !== E.version) {
      CA(y, E, g);
      return;
    }
    t.bindTexture(A.TEXTURE_3D, y.__webglTexture, A.TEXTURE0 + g);
  }
  function cA(E, g) {
    const y = i.get(E);
    if (E.isCubeDepthTexture !== !0 && E.version > 0 && y.__version !== E.version) {
      _A(y, E, g);
      return;
    }
    t.bindTexture(A.TEXTURE_CUBE_MAP, y.__webglTexture, A.TEXTURE0 + g);
  }
  const PA = {
    [fr]: A.REPEAT,
    [ot]: A.CLAMP_TO_EDGE,
    [ur]: A.MIRRORED_REPEAT
  }, WA = {
    [Me]: A.NEAREST,
    [no]: A.NEAREST_MIPMAP_NEAREST,
    [ro]: A.NEAREST_MIPMAP_LINEAR,
    [xe]: A.LINEAR,
    [so]: A.LINEAR_MIPMAP_NEAREST,
    [En]: A.LINEAR_MIPMAP_LINEAR
  }, KA = {
    512: A.NEVER,
    519: A.ALWAYS,
    513: A.LESS,
    515: A.LEQUAL,
    514: A.EQUAL,
    518: A.GEQUAL,
    516: A.GREATER,
    517: A.NOTEQUAL
  };
  function Y(E, g) {
    if (g.type === 1015 && e.has("OES_texture_float_linear") === !1 && (g.magFilter === 1006 || g.magFilter === 1007 || g.magFilter === 1005 || g.magFilter === 1008 || g.minFilter === 1006 || g.minFilter === 1007 || g.minFilter === 1005 || g.minFilter === 1008) && MA("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), A.texParameteri(E, A.TEXTURE_WRAP_S, PA[g.wrapS]), A.texParameteri(E, A.TEXTURE_WRAP_T, PA[g.wrapT]), (E === A.TEXTURE_3D || E === A.TEXTURE_2D_ARRAY) && A.texParameteri(E, A.TEXTURE_WRAP_R, PA[g.wrapR]), A.texParameteri(E, A.TEXTURE_MAG_FILTER, WA[g.magFilter]), A.texParameteri(E, A.TEXTURE_MIN_FILTER, WA[g.minFilter]), g.compareFunction && (A.texParameteri(E, A.TEXTURE_COMPARE_MODE, A.COMPARE_REF_TO_TEXTURE), A.texParameteri(E, A.TEXTURE_COMPARE_FUNC, KA[g.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || i.get(g).__currentAnisotropy) {
        const y = e.get("EXT_texture_filter_anisotropic");
        A.texParameterf(E, y.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, n.getMaxAnisotropy())), i.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function nA(E, g) {
    let y = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, g.addEventListener("dispose", I));
    const H = g.source;
    let J = p.get(H);
    J === void 0 && (J = {}, p.set(H, J));
    const iA = L(g);
    if (iA !== E.__cacheKey) {
      J[iA] === void 0 && (J[iA] = {
        texture: A.createTexture(),
        usedTimes: 0
      }, s.memory.textures++, y = !0), J[iA].usedTimes++;
      const aA = J[E.__cacheKey];
      aA !== void 0 && (J[E.__cacheKey].usedTimes--, aA.usedTimes === 0 && W(g)), E.__cacheKey = iA, E.__webglTexture = J[iA].texture;
    }
    return y;
  }
  function fA(E, g, y) {
    return Math.floor(Math.floor(E / y) / g);
  }
  function hA(E, g, y, H) {
    const iA = E.updateRanges;
    if (iA.length === 0) t.texSubImage2D(A.TEXTURE_2D, 0, 0, 0, g.width, g.height, y, H, g.data);
    else {
      iA.sort((mA, $) => mA.start - $.start);
      let aA = 0;
      for (let mA = 1; mA < iA.length; mA++) {
        const $ = iA[aA], DA = iA[mA], EA = $.start + $.count, QA = fA(DA.start, g.width, 4), VA = fA($.start, g.width, 4);
        DA.start <= EA + 1 && QA === VA && fA(DA.start + DA.count - 1, g.width, 4) === QA ? $.count = Math.max($.count, DA.start + DA.count - $.start) : (++aA, iA[aA] = DA);
      }
      iA.length = aA + 1;
      const b = t.getParameter(A.UNPACK_ROW_LENGTH), tA = t.getParameter(A.UNPACK_SKIP_PIXELS), dA = t.getParameter(A.UNPACK_SKIP_ROWS);
      t.pixelStorei(A.UNPACK_ROW_LENGTH, g.width);
      for (let mA = 0, $ = iA.length; mA < $; mA++) {
        const DA = iA[mA], EA = Math.floor(DA.start / 4), QA = Math.ceil(DA.count / 4), VA = EA % g.width, Q = Math.floor(EA / g.width), K = QA, j = 1;
        t.pixelStorei(A.UNPACK_SKIP_PIXELS, VA), t.pixelStorei(A.UNPACK_SKIP_ROWS, Q), t.texSubImage2D(A.TEXTURE_2D, 0, VA, Q, K, j, y, H, g.data);
      }
      E.clearUpdateRanges(), t.pixelStorei(A.UNPACK_ROW_LENGTH, b), t.pixelStorei(A.UNPACK_SKIP_PIXELS, tA), t.pixelStorei(A.UNPACK_SKIP_ROWS, dA);
    }
  }
  function CA(E, g, y) {
    let H = A.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (H = A.TEXTURE_2D_ARRAY), g.isData3DTexture && (H = A.TEXTURE_3D);
    const J = nA(E, g), iA = g.source;
    t.bindTexture(H, E.__webglTexture, A.TEXTURE0 + y);
    const aA = i.get(iA);
    if (iA.version !== aA.__version || J === !0) {
      if (t.activeTexture(A.TEXTURE0 + y), !(typeof ImageBitmap < "u" && g.image instanceof ImageBitmap)) {
        const K = OA.getPrimaries(OA.workingColorSpace), j = g.colorSpace === "" ? null : OA.getPrimaries(g.colorSpace), uA = g.colorSpace === "" || K === j ? A.NONE : A.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, g.flipY), t.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), t.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL, uA);
      }
      t.pixelStorei(A.UNPACK_ALIGNMENT, g.unpackAlignment);
      let b = d(g.image, !1, n.maxTextureSize);
      b = YA(g, b);
      const tA = r.convert(g.format, g.colorSpace), dA = r.convert(g.type);
      let mA = D(g.internalFormat, tA, dA, g.normalized, g.colorSpace, g.isVideoTexture);
      Y(H, g);
      let $;
      const DA = g.mipmaps, EA = g.isVideoTexture !== !0, QA = aA.__version === void 0 || J === !0, VA = iA.dataReady, Q = _(g, b);
      if (g.isDepthTexture)
        mA = M(g.format === pa, g.type), QA && (EA ? t.texStorage2D(A.TEXTURE_2D, 1, mA, b.width, b.height) : t.texImage2D(A.TEXTURE_2D, 0, mA, b.width, b.height, 0, tA, dA, null));
      else if (g.isDataTexture) if (DA.length > 0) {
        EA && QA && t.texStorage2D(A.TEXTURE_2D, Q, mA, DA[0].width, DA[0].height);
        for (let K = 0, j = DA.length; K < j; K++)
          $ = DA[K], EA ? VA && t.texSubImage2D(A.TEXTURE_2D, K, 0, 0, $.width, $.height, tA, dA, $.data) : t.texImage2D(A.TEXTURE_2D, K, mA, $.width, $.height, 0, tA, dA, $.data);
        g.generateMipmaps = !1;
      } else EA ? (QA && t.texStorage2D(A.TEXTURE_2D, Q, mA, b.width, b.height), VA && hA(g, b, tA, dA)) : t.texImage2D(A.TEXTURE_2D, 0, mA, b.width, b.height, 0, tA, dA, b.data);
      else if (g.isCompressedTexture) if (g.isCompressedArrayTexture) {
        EA && QA && t.texStorage3D(A.TEXTURE_2D_ARRAY, Q, mA, DA[0].width, DA[0].height, b.depth);
        for (let K = 0, j = DA.length; K < j; K++)
          if ($ = DA[K], g.format !== 1023) if (tA !== null) if (EA) {
            if (VA) if (g.layerUpdates.size > 0) {
              const uA = hs($.width, $.height, g.format, g.type);
              for (const vA of g.layerUpdates) {
                const Z = $.data.subarray(vA * uA / $.data.BYTES_PER_ELEMENT, (vA + 1) * uA / $.data.BYTES_PER_ELEMENT);
                t.compressedTexSubImage3D(A.TEXTURE_2D_ARRAY, K, 0, 0, vA, $.width, $.height, 1, tA, Z);
              }
              g.clearLayerUpdates();
            } else t.compressedTexSubImage3D(A.TEXTURE_2D_ARRAY, K, 0, 0, 0, $.width, $.height, b.depth, tA, $.data);
          } else t.compressedTexImage3D(A.TEXTURE_2D_ARRAY, K, mA, $.width, $.height, b.depth, 0, $.data, 0, 0);
          else MA("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else EA ? VA && t.texSubImage3D(A.TEXTURE_2D_ARRAY, K, 0, 0, 0, $.width, $.height, b.depth, tA, dA, $.data) : t.texImage3D(A.TEXTURE_2D_ARRAY, K, mA, $.width, $.height, b.depth, 0, tA, dA, $.data);
      } else {
        EA && QA && t.texStorage2D(A.TEXTURE_2D, Q, mA, DA[0].width, DA[0].height);
        for (let K = 0, j = DA.length; K < j; K++)
          $ = DA[K], g.format !== 1023 ? tA !== null ? EA ? VA && t.compressedTexSubImage2D(A.TEXTURE_2D, K, 0, 0, $.width, $.height, tA, $.data) : t.compressedTexImage2D(A.TEXTURE_2D, K, mA, $.width, $.height, 0, $.data) : MA("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : EA ? VA && t.texSubImage2D(A.TEXTURE_2D, K, 0, 0, $.width, $.height, tA, dA, $.data) : t.texImage2D(A.TEXTURE_2D, K, mA, $.width, $.height, 0, tA, dA, $.data);
      }
      else if (g.isDataArrayTexture) if (EA) {
        if (QA && t.texStorage3D(A.TEXTURE_2D_ARRAY, Q, mA, b.width, b.height, b.depth), VA) if (g.layerUpdates.size > 0) {
          const K = hs(b.width, b.height, g.format, g.type);
          for (const j of g.layerUpdates) {
            const uA = b.data.subarray(j * K / b.data.BYTES_PER_ELEMENT, (j + 1) * K / b.data.BYTES_PER_ELEMENT);
            t.texSubImage3D(A.TEXTURE_2D_ARRAY, 0, 0, 0, j, b.width, b.height, 1, tA, dA, uA);
          }
          g.clearLayerUpdates();
        } else t.texSubImage3D(A.TEXTURE_2D_ARRAY, 0, 0, 0, 0, b.width, b.height, b.depth, tA, dA, b.data);
      } else t.texImage3D(A.TEXTURE_2D_ARRAY, 0, mA, b.width, b.height, b.depth, 0, tA, dA, b.data);
      else if (g.isData3DTexture) EA ? (QA && t.texStorage3D(A.TEXTURE_3D, Q, mA, b.width, b.height, b.depth), VA && t.texSubImage3D(A.TEXTURE_3D, 0, 0, 0, 0, b.width, b.height, b.depth, tA, dA, b.data)) : t.texImage3D(A.TEXTURE_3D, 0, mA, b.width, b.height, b.depth, 0, tA, dA, b.data);
      else if (g.isFramebufferTexture) {
        if (QA) if (EA) t.texStorage2D(A.TEXTURE_2D, Q, mA, b.width, b.height);
        else {
          let K = b.width, j = b.height;
          for (let uA = 0; uA < Q; uA++)
            t.texImage2D(A.TEXTURE_2D, uA, mA, K, j, 0, tA, dA, null), K >>= 1, j >>= 1;
        }
      } else if (g.isHTMLTexture) {
        if ("texElementImage2D" in A) {
          const K = A.canvas;
          if (K.hasAttribute("layoutsubtree") || K.setAttribute("layoutsubtree", "true"), b.parentNode !== K) {
            K.appendChild(b), f.add(g), K.onpaint = (j) => {
              const uA = j.changedElements;
              for (const vA of f) uA.includes(vA.image) && (vA.needsUpdate = !0);
            }, K.requestPaint();
            return;
          }
          if (A.texElementImage2D.length === 3) A.texElementImage2D(A.TEXTURE_2D, A.RGBA8, b);
          else {
            const uA = A.RGBA, vA = A.RGBA, Z = A.UNSIGNED_BYTE;
            A.texElementImage2D(A.TEXTURE_2D, 0, uA, vA, Z, b);
          }
          A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, A.LINEAR), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE), A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE);
        }
      } else if (DA.length > 0) {
        if (EA && QA) {
          const K = ee(DA[0]);
          t.texStorage2D(A.TEXTURE_2D, Q, mA, K.width, K.height);
        }
        for (let K = 0, j = DA.length; K < j; K++)
          $ = DA[K], EA ? VA && t.texSubImage2D(A.TEXTURE_2D, K, 0, 0, tA, dA, $) : t.texImage2D(A.TEXTURE_2D, K, mA, tA, dA, $);
        g.generateMipmaps = !1;
      } else if (EA) {
        if (QA) {
          const K = ee(b);
          t.texStorage2D(A.TEXTURE_2D, Q, mA, K.width, K.height);
        }
        VA && t.texSubImage2D(A.TEXTURE_2D, 0, 0, 0, tA, dA, b);
      } else t.texImage2D(A.TEXTURE_2D, 0, mA, tA, dA, b);
      u(g) && x(H), aA.__version = iA.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function _A(E, g, y) {
    if (g.image.length !== 6) return;
    const H = nA(E, g), J = g.source;
    t.bindTexture(A.TEXTURE_CUBE_MAP, E.__webglTexture, A.TEXTURE0 + y);
    const iA = i.get(J);
    if (J.version !== iA.__version || H === !0) {
      t.activeTexture(A.TEXTURE0 + y);
      const aA = OA.getPrimaries(OA.workingColorSpace), b = g.colorSpace === "" ? null : OA.getPrimaries(g.colorSpace), tA = g.colorSpace === "" || aA === b ? A.NONE : A.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, g.flipY), t.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), t.pixelStorei(A.UNPACK_ALIGNMENT, g.unpackAlignment), t.pixelStorei(A.UNPACK_COLORSPACE_CONVERSION_WEBGL, tA);
      const dA = g.isCompressedTexture || g.image[0].isCompressedTexture, mA = g.image[0] && g.image[0].isDataTexture, $ = [];
      for (let Z = 0; Z < 6; Z++)
        !dA && !mA ? $[Z] = d(g.image[Z], !0, n.maxCubemapSize) : $[Z] = mA ? g.image[Z].image : g.image[Z], $[Z] = YA(g, $[Z]);
      const DA = $[0], EA = r.convert(g.format, g.colorSpace), QA = r.convert(g.type), VA = D(g.internalFormat, EA, QA, g.normalized, g.colorSpace), Q = g.isVideoTexture !== !0, K = iA.__version === void 0 || H === !0, j = J.dataReady;
      let uA = _(g, DA);
      Y(A.TEXTURE_CUBE_MAP, g);
      let vA;
      if (dA) {
        Q && K && t.texStorage2D(A.TEXTURE_CUBE_MAP, uA, VA, DA.width, DA.height);
        for (let Z = 0; Z < 6; Z++) {
          vA = $[Z].mipmaps;
          for (let oA = 0; oA < vA.length; oA++) {
            const xA = vA[oA];
            g.format !== 1023 ? EA !== null ? Q ? j && t.compressedTexSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA, 0, 0, xA.width, xA.height, EA, xA.data) : t.compressedTexImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA, VA, xA.width, xA.height, 0, xA.data) : MA("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Q ? j && t.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA, 0, 0, xA.width, xA.height, EA, QA, xA.data) : t.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA, VA, xA.width, xA.height, 0, EA, QA, xA.data);
          }
        }
      } else {
        if (vA = g.mipmaps, Q && K) {
          vA.length > 0 && uA++;
          const Z = ee($[0]);
          t.texStorage2D(A.TEXTURE_CUBE_MAP, uA, VA, Z.width, Z.height);
        }
        for (let Z = 0; Z < 6; Z++) if (mA) {
          Q ? j && t.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, $[Z].width, $[Z].height, EA, QA, $[Z].data) : t.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, VA, $[Z].width, $[Z].height, 0, EA, QA, $[Z].data);
          for (let oA = 0; oA < vA.length; oA++) {
            const xA = vA[oA].image[Z].image;
            Q ? j && t.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA + 1, 0, 0, xA.width, xA.height, EA, QA, xA.data) : t.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA + 1, VA, xA.width, xA.height, 0, EA, QA, xA.data);
          }
        } else {
          Q ? j && t.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, EA, QA, $[Z]) : t.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, VA, EA, QA, $[Z]);
          for (let oA = 0; oA < vA.length; oA++) {
            const xA = vA[oA];
            Q ? j && t.texSubImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA + 1, 0, 0, EA, QA, xA.image[Z]) : t.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + Z, oA + 1, VA, EA, QA, xA.image[Z]);
          }
        }
      }
      u(g) && x(A.TEXTURE_CUBE_MAP), iA.__version = J.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function yA(E, g, y, H, J, iA) {
    const aA = r.convert(y.format, y.colorSpace), b = r.convert(y.type), tA = D(y.internalFormat, aA, b, y.normalized, y.colorSpace), dA = i.get(g), mA = i.get(y);
    if (mA.__renderTarget = g, !dA.__hasExternalTextures) {
      const $ = Math.max(1, g.width >> iA), DA = Math.max(1, g.height >> iA);
      J === A.TEXTURE_3D || J === A.TEXTURE_2D_ARRAY ? t.texImage3D(J, iA, tA, $, DA, g.depth, 0, aA, b, null) : t.texImage2D(J, iA, tA, $, DA, 0, aA, b, null);
    }
    t.bindFramebuffer(A.FRAMEBUFFER, E), T(g) ? a.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER, H, J, mA.__webglTexture, 0, le(g)) : (J === A.TEXTURE_2D || J >= A.TEXTURE_CUBE_MAP_POSITIVE_X && J <= A.TEXTURE_CUBE_MAP_NEGATIVE_Z) && A.framebufferTexture2D(A.FRAMEBUFFER, H, J, mA.__webglTexture, iA), t.bindFramebuffer(A.FRAMEBUFFER, null);
  }
  function XA(E, g, y) {
    if (A.bindRenderbuffer(A.RENDERBUFFER, E), g.depthBuffer) {
      const H = g.depthTexture, J = H && H.isDepthTexture ? H.type : null, iA = M(g.stencilBuffer, J), aA = g.stencilBuffer ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT;
      T(g) ? a.renderbufferStorageMultisampleEXT(A.RENDERBUFFER, le(g), iA, g.width, g.height) : y ? A.renderbufferStorageMultisample(A.RENDERBUFFER, le(g), iA, g.width, g.height) : A.renderbufferStorage(A.RENDERBUFFER, iA, g.width, g.height), A.framebufferRenderbuffer(A.FRAMEBUFFER, aA, A.RENDERBUFFER, E);
    } else {
      const H = g.textures;
      for (let J = 0; J < H.length; J++) {
        const iA = H[J], aA = r.convert(iA.format, iA.colorSpace), b = r.convert(iA.type), tA = D(iA.internalFormat, aA, b, iA.normalized, iA.colorSpace);
        T(g) ? a.renderbufferStorageMultisampleEXT(A.RENDERBUFFER, le(g), tA, g.width, g.height) : y ? A.renderbufferStorageMultisample(A.RENDERBUFFER, le(g), tA, g.width, g.height) : A.renderbufferStorage(A.RENDERBUFFER, tA, g.width, g.height);
      }
    }
    A.bindRenderbuffer(A.RENDERBUFFER, null);
  }
  function zA(E, g, y) {
    const H = g.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(A.FRAMEBUFFER, E), !(g.depthTexture && g.depthTexture.isDepthTexture)) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const J = i.get(g.depthTexture);
    if (J.__renderTarget = g, (!J.__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), H) {
      if (J.__webglInit === void 0 && (J.__webglInit = !0, g.depthTexture.addEventListener("dispose", I)), J.__webglTexture === void 0) {
        J.__webglTexture = A.createTexture(), t.bindTexture(A.TEXTURE_CUBE_MAP, J.__webglTexture), Y(A.TEXTURE_CUBE_MAP, g.depthTexture);
        const dA = r.convert(g.depthTexture.format), mA = r.convert(g.depthTexture.type);
        let $;
        g.depthTexture.format === 1026 ? $ = A.DEPTH_COMPONENT24 : g.depthTexture.format === 1027 && ($ = A.DEPTH24_STENCIL8);
        for (let DA = 0; DA < 6; DA++) A.texImage2D(A.TEXTURE_CUBE_MAP_POSITIVE_X + DA, 0, $, g.width, g.height, 0, dA, mA, null);
      }
    } else q(g.depthTexture, 0);
    const iA = J.__webglTexture, aA = le(g), b = H ? A.TEXTURE_CUBE_MAP_POSITIVE_X + y : A.TEXTURE_2D, tA = g.depthTexture.format === 1027 ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT;
    if (g.depthTexture.format === 1026) T(g) ? a.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER, tA, b, iA, 0, aA) : A.framebufferTexture2D(A.FRAMEBUFFER, tA, b, iA, 0);
    else if (g.depthTexture.format === 1027) T(g) ? a.framebufferTexture2DMultisampleEXT(A.FRAMEBUFFER, tA, b, iA, 0, aA) : A.framebufferTexture2D(A.FRAMEBUFFER, tA, b, iA, 0);
    else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function $A(E) {
    const g = i.get(E), y = E.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== E.depthTexture) {
      const H = E.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), H) {
        const J = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, H.removeEventListener("dispose", J);
        };
        H.addEventListener("dispose", J), g.__depthDisposeCallback = J;
      }
      g.__boundDepthTexture = H;
    }
    if (E.depthTexture && !g.__autoAllocateDepthBuffer) if (y) for (let H = 0; H < 6; H++) zA(g.__webglFramebuffer[H], E, H);
    else {
      const H = E.texture.mipmaps;
      H && H.length > 0 ? zA(g.__webglFramebuffer[0], E, 0) : zA(g.__webglFramebuffer, E, 0);
    }
    else if (y) {
      g.__webglDepthbuffer = [];
      for (let H = 0; H < 6; H++)
        if (t.bindFramebuffer(A.FRAMEBUFFER, g.__webglFramebuffer[H]), g.__webglDepthbuffer[H] === void 0)
          g.__webglDepthbuffer[H] = A.createRenderbuffer(), XA(g.__webglDepthbuffer[H], E, !1);
        else {
          const J = E.stencilBuffer ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT, iA = g.__webglDepthbuffer[H];
          A.bindRenderbuffer(A.RENDERBUFFER, iA), A.framebufferRenderbuffer(A.FRAMEBUFFER, J, A.RENDERBUFFER, iA);
        }
    } else {
      const H = E.texture.mipmaps;
      if (H && H.length > 0 ? t.bindFramebuffer(A.FRAMEBUFFER, g.__webglFramebuffer[0]) : t.bindFramebuffer(A.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
        g.__webglDepthbuffer = A.createRenderbuffer(), XA(g.__webglDepthbuffer, E, !1);
      else {
        const J = E.stencilBuffer ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT, iA = g.__webglDepthbuffer;
        A.bindRenderbuffer(A.RENDERBUFFER, iA), A.framebufferRenderbuffer(A.FRAMEBUFFER, J, A.RENDERBUFFER, iA);
      }
    }
    t.bindFramebuffer(A.FRAMEBUFFER, null);
  }
  function pe(E, g, y) {
    const H = i.get(E);
    g !== void 0 && yA(H.__webglFramebuffer, E, E.texture, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, 0), y !== void 0 && $A(E);
  }
  function Ce(E) {
    const g = E.texture, y = i.get(E), H = i.get(g);
    E.addEventListener("dispose", v);
    const J = E.textures, iA = E.isWebGLCubeRenderTarget === !0, aA = J.length > 1;
    if (aA || (H.__webglTexture === void 0 && (H.__webglTexture = A.createTexture()), H.__version = g.version, s.memory.textures++), iA) {
      y.__webglFramebuffer = [];
      for (let b = 0; b < 6; b++) if (g.mipmaps && g.mipmaps.length > 0) {
        y.__webglFramebuffer[b] = [];
        for (let tA = 0; tA < g.mipmaps.length; tA++) y.__webglFramebuffer[b][tA] = A.createFramebuffer();
      } else y.__webglFramebuffer[b] = A.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        y.__webglFramebuffer = [];
        for (let b = 0; b < g.mipmaps.length; b++) y.__webglFramebuffer[b] = A.createFramebuffer();
      } else y.__webglFramebuffer = A.createFramebuffer();
      if (aA) for (let b = 0, tA = J.length; b < tA; b++) {
        const dA = i.get(J[b]);
        dA.__webglTexture === void 0 && (dA.__webglTexture = A.createTexture(), s.memory.textures++);
      }
      if (E.samples > 0 && T(E) === !1) {
        y.__webglMultisampledFramebuffer = A.createFramebuffer(), y.__webglColorRenderbuffer = [], t.bindFramebuffer(A.FRAMEBUFFER, y.__webglMultisampledFramebuffer);
        for (let b = 0; b < J.length; b++) {
          const tA = J[b];
          y.__webglColorRenderbuffer[b] = A.createRenderbuffer(), A.bindRenderbuffer(A.RENDERBUFFER, y.__webglColorRenderbuffer[b]);
          const dA = r.convert(tA.format, tA.colorSpace), mA = r.convert(tA.type), $ = D(tA.internalFormat, dA, mA, tA.normalized, tA.colorSpace, E.isXRRenderTarget === !0), DA = le(E);
          A.renderbufferStorageMultisample(A.RENDERBUFFER, DA, $, E.width, E.height), A.framebufferRenderbuffer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0 + b, A.RENDERBUFFER, y.__webglColorRenderbuffer[b]);
        }
        A.bindRenderbuffer(A.RENDERBUFFER, null), E.depthBuffer && (y.__webglDepthRenderbuffer = A.createRenderbuffer(), XA(y.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(A.FRAMEBUFFER, null);
      }
    }
    if (iA) {
      t.bindTexture(A.TEXTURE_CUBE_MAP, H.__webglTexture), Y(A.TEXTURE_CUBE_MAP, g);
      for (let b = 0; b < 6; b++) if (g.mipmaps && g.mipmaps.length > 0) for (let tA = 0; tA < g.mipmaps.length; tA++) yA(y.__webglFramebuffer[b][tA], E, g, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + b, tA);
      else yA(y.__webglFramebuffer[b], E, g, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + b, 0);
      u(g) && x(A.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (aA) {
      for (let b = 0, tA = J.length; b < tA; b++) {
        const dA = J[b], mA = i.get(dA);
        let $ = A.TEXTURE_2D;
        (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && ($ = E.isWebGL3DRenderTarget ? A.TEXTURE_3D : A.TEXTURE_2D_ARRAY), t.bindTexture($, mA.__webglTexture), Y($, dA), yA(y.__webglFramebuffer, E, dA, A.COLOR_ATTACHMENT0 + b, $, 0), u(dA) && x($);
      }
      t.unbindTexture();
    } else {
      let b = A.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (b = E.isWebGL3DRenderTarget ? A.TEXTURE_3D : A.TEXTURE_2D_ARRAY), t.bindTexture(b, H.__webglTexture), Y(b, g), g.mipmaps && g.mipmaps.length > 0) for (let tA = 0; tA < g.mipmaps.length; tA++) yA(y.__webglFramebuffer[tA], E, g, A.COLOR_ATTACHMENT0, b, tA);
      else yA(y.__webglFramebuffer, E, g, A.COLOR_ATTACHMENT0, b, 0);
      u(g) && x(b), t.unbindTexture();
    }
    E.depthBuffer && $A(E);
  }
  function Re(E) {
    const g = E.textures;
    for (let y = 0, H = g.length; y < H; y++) {
      const J = g[y];
      if (u(J)) {
        const iA = C(E), aA = i.get(J).__webglTexture;
        t.bindTexture(iA, aA), x(iA), t.unbindTexture();
      }
    }
  }
  const Ae = [], ge = [];
  function ue(E) {
    if (E.samples > 0) {
      if (T(E) === !1) {
        const g = E.textures, y = E.width, H = E.height;
        let J = A.COLOR_BUFFER_BIT;
        const iA = E.stencilBuffer ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT, aA = i.get(E), b = g.length > 1;
        if (b) for (let dA = 0; dA < g.length; dA++)
          t.bindFramebuffer(A.FRAMEBUFFER, aA.__webglMultisampledFramebuffer), A.framebufferRenderbuffer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0 + dA, A.RENDERBUFFER, null), t.bindFramebuffer(A.FRAMEBUFFER, aA.__webglFramebuffer), A.framebufferTexture2D(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0 + dA, A.TEXTURE_2D, null, 0);
        t.bindFramebuffer(A.READ_FRAMEBUFFER, aA.__webglMultisampledFramebuffer);
        const tA = E.texture.mipmaps;
        tA && tA.length > 0 ? t.bindFramebuffer(A.DRAW_FRAMEBUFFER, aA.__webglFramebuffer[0]) : t.bindFramebuffer(A.DRAW_FRAMEBUFFER, aA.__webglFramebuffer);
        for (let dA = 0; dA < g.length; dA++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (J |= A.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (J |= A.STENCIL_BUFFER_BIT)), b) {
            A.framebufferRenderbuffer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.RENDERBUFFER, aA.__webglColorRenderbuffer[dA]);
            const mA = i.get(g[dA]).__webglTexture;
            A.framebufferTexture2D(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, mA, 0);
          }
          A.blitFramebuffer(0, 0, y, H, 0, 0, y, H, J, A.NEAREST), l === !0 && (Ae.length = 0, ge.length = 0, Ae.push(A.COLOR_ATTACHMENT0 + dA), E.depthBuffer && E.resolveDepthBuffer === !1 && (Ae.push(iA), ge.push(iA), A.invalidateFramebuffer(A.DRAW_FRAMEBUFFER, ge)), A.invalidateFramebuffer(A.READ_FRAMEBUFFER, Ae));
        }
        if (t.bindFramebuffer(A.READ_FRAMEBUFFER, null), t.bindFramebuffer(A.DRAW_FRAMEBUFFER, null), b) for (let dA = 0; dA < g.length; dA++) {
          t.bindFramebuffer(A.FRAMEBUFFER, aA.__webglMultisampledFramebuffer), A.framebufferRenderbuffer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0 + dA, A.RENDERBUFFER, aA.__webglColorRenderbuffer[dA]);
          const mA = i.get(g[dA]).__webglTexture;
          t.bindFramebuffer(A.FRAMEBUFFER, aA.__webglFramebuffer), A.framebufferTexture2D(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0 + dA, A.TEXTURE_2D, mA, 0);
        }
        t.bindFramebuffer(A.DRAW_FRAMEBUFFER, aA.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && l) {
        const g = E.stencilBuffer ? A.DEPTH_STENCIL_ATTACHMENT : A.DEPTH_ATTACHMENT;
        A.invalidateFramebuffer(A.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function le(E) {
    return Math.min(n.maxSamples, E.samples);
  }
  function T(E) {
    const g = i.get(E);
    return E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function Le(E) {
    const g = s.render.frame;
    c.get(E) !== g && (c.set(E, g), E.update());
  }
  function YA(E, g) {
    const y = E.colorSpace, H = E.format, J = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || y !== "srgb-linear" && y !== "" && (OA.getTransfer(y) === "srgb" ? (H !== 1023 || J !== 1009) && MA("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : IA("WebGLTextures: Unsupported texture color space:", y)), g;
  }
  function ee(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (o.width = E.naturalWidth || E.width, o.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (o.width = E.displayWidth, o.height = E.displayHeight) : (o.width = E.width, o.height = E.height), o;
  }
  this.allocateTextureUnit = X, this.resetTextureUnits = k, this.getTextureUnits = G, this.setTextureUnits = z, this.setTexture2D = q, this.setTexture2DArray = AA, this.setTexture3D = eA, this.setTextureCube = cA, this.rebindTextures = pe, this.setupRenderTarget = Ce, this.updateRenderTargetMipmap = Re, this.updateMultisampleRenderTarget = ue, this.setupDepthRenderbuffer = $A, this.setupFrameBufferTexture = yA, this.useMultisampledRTT = T, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function bf(A, e) {
  function t(i, n = "") {
    let r;
    const s = OA.getTransfer(n);
    if (i === 1009) return A.UNSIGNED_BYTE;
    if (i === 1017) return A.UNSIGNED_SHORT_4_4_4_4;
    if (i === 1018) return A.UNSIGNED_SHORT_5_5_5_1;
    if (i === 35902) return A.UNSIGNED_INT_5_9_9_9_REV;
    if (i === 35899) return A.UNSIGNED_INT_10F_11F_11F_REV;
    if (i === 1010) return A.BYTE;
    if (i === 1011) return A.SHORT;
    if (i === 1012) return A.UNSIGNED_SHORT;
    if (i === 1013) return A.INT;
    if (i === 1014) return A.UNSIGNED_INT;
    if (i === 1015) return A.FLOAT;
    if (i === 1016) return A.HALF_FLOAT;
    if (i === 1021) return A.ALPHA;
    if (i === 1022) return A.RGB;
    if (i === 1023) return A.RGBA;
    if (i === 1026) return A.DEPTH_COMPONENT;
    if (i === 1027) return A.DEPTH_STENCIL;
    if (i === 1028) return A.RED;
    if (i === 1029) return A.RED_INTEGER;
    if (i === 1030) return A.RG;
    if (i === 1031) return A.RG_INTEGER;
    if (i === 1033) return A.RGBA_INTEGER;
    if (i === 33776 || i === 33777 || i === 33778 || i === 33779) if (s === "srgb")
      if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
        if (i === 33776) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (i === 33777) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (i === 33778) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (i === 33779) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) {
      if (i === 33776) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (i === 33777) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (i === 33778) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (i === 33779) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (i === 35840) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (i === 36196 || i === 37492 || i === 37496 || i === 37488 || i === 37489 || i === 37490 || i === 37491)
      if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (i === 36196 || i === 37492) return s === "srgb" ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
        if (i === 37488) return r.COMPRESSED_R11_EAC;
        if (i === 37489) return r.COMPRESSED_SIGNED_R11_EAC;
        if (i === 37490) return r.COMPRESSED_RG11_EAC;
        if (i === 37491) return r.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (i === 37808) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return s === "srgb" ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (r = e.get("EXT_texture_compression_bptc"), r !== null) {
        if (i === 36492) return s === "srgb" ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (r = e.get("EXT_texture_compression_rgtc"), r !== null) {
        if (i === 36283) return r.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return i === 1020 ? A.UNSIGNED_INT_24_8 : A[i] !== void 0 ? A[i] : null;
  }
  return { convert: t };
}
var Rf = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Lf = `
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

}`, Uf = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(A, e) {
    if (this.texture === null) {
      const t = new ya(A.texture);
      (A.depthNear !== e.depthNear || A.depthFar !== e.depthFar) && (this.depthNear = A.depthNear, this.depthFar = A.depthFar), this.texture = t;
    }
  }
  getMesh(A) {
    if (this.texture !== null && this.mesh === null) {
      const e = A.cameras[0].viewport, t = new Te({
        vertexShader: Rf,
        fragmentShader: Lf,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new Ne(new Qi(20, 20), t);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, Ff = class extends Lt {
  constructor(A, e) {
    super();
    const t = this;
    let i = null, n = 1, r = null, s = "local-floor", a = 1, l = null, o = null, c = null, f = null, h = null, p = null;
    const m = typeof XRWebGLBinding < "u", P = new Uf(), d = {}, u = e.getContextAttributes();
    let x = null, C = null;
    const D = [], M = [], _ = new bA();
    let I = null;
    const v = new We();
    v.viewport = new re();
    const B = new We();
    B.viewport = new re();
    const W = [v, B], S = new gc();
    let V = null, k = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let nA = D[Y];
      return nA === void 0 && (nA = new Un(), D[Y] = nA), nA.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let nA = D[Y];
      return nA === void 0 && (nA = new Un(), D[Y] = nA), nA.getGripSpace();
    }, this.getHand = function(Y) {
      let nA = D[Y];
      return nA === void 0 && (nA = new Un(), D[Y] = nA), nA.getHandSpace();
    };
    function G(Y) {
      const nA = M.indexOf(Y.inputSource);
      if (nA === -1) return;
      const fA = D[nA];
      fA !== void 0 && (fA.update(Y.inputSource, Y.frame, l || r), fA.dispatchEvent({
        type: Y.type,
        data: Y.inputSource
      }));
    }
    function z() {
      i.removeEventListener("select", G), i.removeEventListener("selectstart", G), i.removeEventListener("selectend", G), i.removeEventListener("squeeze", G), i.removeEventListener("squeezestart", G), i.removeEventListener("squeezeend", G), i.removeEventListener("end", z), i.removeEventListener("inputsourceschange", X);
      for (let Y = 0; Y < D.length; Y++) {
        const nA = M[Y];
        nA !== null && (M[Y] = null, D[Y].disconnect(nA));
      }
      V = null, k = null, P.reset();
      for (const Y in d) delete d[Y];
      A.setRenderTarget(x), h = null, f = null, c = null, i = null, C = null, KA.stop(), t.isPresenting = !1, A.setPixelRatio(I), A.setSize(_.width, _.height, !1), t.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      n = Y, t.isPresenting === !0 && MA("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      s = Y, t.isPresenting === !0 && MA("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || r;
    }, this.setReferenceSpace = function(Y) {
      l = Y;
    }, this.getBaseLayer = function() {
      return f !== null ? f : h;
    }, this.getBinding = function() {
      return c === null && m && (c = new XRWebGLBinding(i, e)), c;
    }, this.getFrame = function() {
      return p;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(Y) {
      if (i = Y, i !== null) {
        if (x = A.getRenderTarget(), i.addEventListener("select", G), i.addEventListener("selectstart", G), i.addEventListener("selectend", G), i.addEventListener("squeeze", G), i.addEventListener("squeezestart", G), i.addEventListener("squeezeend", G), i.addEventListener("end", z), i.addEventListener("inputsourceschange", X), u.xrCompatible !== !0 && await e.makeXRCompatible(), I = A.getPixelRatio(), A.getSize(_), m && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let nA = null, fA = null, hA = null;
          u.depth && (hA = u.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, nA = u.stencil ? pa : bi, fA = u.stencil ? da : bt);
          const CA = {
            colorFormat: e.RGBA8,
            depthFormat: hA,
            scaleFactor: n
          };
          c = this.getBinding(), f = c.createProjectionLayer(CA), i.updateRenderState({ layers: [f] }), A.setPixelRatio(1), A.setSize(f.textureWidth, f.textureHeight, !1), C = new je(f.textureWidth, f.textureHeight, {
            format: Ti,
            type: Et,
            depthTexture: new hi(f.textureWidth, f.textureHeight, fA, void 0, void 0, void 0, void 0, void 0, void 0, nA),
            stencilBuffer: u.stencil,
            colorSpace: A.outputColorSpace,
            samples: u.antialias ? 4 : 0,
            resolveDepthBuffer: f.ignoreDepthValues === !1,
            resolveStencilBuffer: f.ignoreDepthValues === !1
          });
        } else {
          const nA = {
            antialias: u.antialias,
            alpha: !0,
            depth: u.depth,
            stencil: u.stencil,
            framebufferScaleFactor: n
          };
          h = new XRWebGLLayer(i, e, nA), i.updateRenderState({ baseLayer: h }), A.setPixelRatio(1), A.setSize(h.framebufferWidth, h.framebufferHeight, !1), C = new je(h.framebufferWidth, h.framebufferHeight, {
            format: Ti,
            type: Et,
            colorSpace: A.outputColorSpace,
            stencilBuffer: u.stencil,
            resolveDepthBuffer: h.ignoreDepthValues === !1,
            resolveStencilBuffer: h.ignoreDepthValues === !1
          });
        }
        C.isXRRenderTarget = !0, this.setFoveation(a), l = null, r = await i.requestReferenceSpace(s), KA.setContext(i), KA.start(), t.isPresenting = !0, t.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null) return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return P.getDepthTexture();
    };
    function X(Y) {
      for (let nA = 0; nA < Y.removed.length; nA++) {
        const fA = Y.removed[nA], hA = M.indexOf(fA);
        hA >= 0 && (M[hA] = null, D[hA].disconnect(fA));
      }
      for (let nA = 0; nA < Y.added.length; nA++) {
        const fA = Y.added[nA];
        let hA = M.indexOf(fA);
        if (hA === -1) {
          for (let _A = 0; _A < D.length; _A++) if (_A >= M.length) {
            M.push(fA), hA = _A;
            break;
          } else if (M[_A] === null) {
            M[_A] = fA, hA = _A;
            break;
          }
          if (hA === -1) break;
        }
        const CA = D[hA];
        CA && CA.connect(fA);
      }
    }
    const L = new N(), q = new N();
    function AA(Y, nA, fA) {
      L.setFromMatrixPosition(nA.matrixWorld), q.setFromMatrixPosition(fA.matrixWorld);
      const hA = L.distanceTo(q), CA = nA.projectionMatrix.elements, _A = fA.projectionMatrix.elements, yA = CA[14] / (CA[10] - 1), XA = CA[14] / (CA[10] + 1), zA = (CA[9] + 1) / CA[5], $A = (CA[9] - 1) / CA[5], pe = (CA[8] - 1) / CA[0], Ce = (_A[8] + 1) / _A[0], Re = yA * pe, Ae = yA * Ce, ge = hA / (-pe + Ce), ue = ge * -pe;
      if (nA.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(ue), Y.translateZ(ge), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), CA[10] === -1)
        Y.projectionMatrix.copy(nA.projectionMatrix), Y.projectionMatrixInverse.copy(nA.projectionMatrixInverse);
      else {
        const le = yA + ge, T = XA + ge, Le = Re - ue, YA = Ae + (hA - ue), ee = zA * XA / T * le, E = $A * XA / T * le;
        Y.projectionMatrix.makePerspective(Le, YA, ee, E, le, T), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function eA(Y, nA) {
      nA === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(nA.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (i === null) return;
      let nA = Y.near, fA = Y.far;
      P.texture !== null && (P.depthNear > 0 && (nA = P.depthNear), P.depthFar > 0 && (fA = P.depthFar)), S.near = B.near = v.near = nA, S.far = B.far = v.far = fA, (V !== S.near || k !== S.far) && (i.updateRenderState({
        depthNear: S.near,
        depthFar: S.far
      }), V = S.near, k = S.far), S.layers.mask = Y.layers.mask | 6, v.layers.mask = S.layers.mask & -5, B.layers.mask = S.layers.mask & -3;
      const hA = Y.parent, CA = S.cameras;
      eA(S, hA);
      for (let _A = 0; _A < CA.length; _A++) eA(CA[_A], hA);
      CA.length === 2 ? AA(S, v, B) : S.projectionMatrix.copy(v.projectionMatrix), cA(Y, S, hA);
    };
    function cA(Y, nA, fA) {
      fA === null ? Y.matrix.copy(nA.matrixWorld) : (Y.matrix.copy(fA.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(nA.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(nA.projectionMatrix), Y.projectionMatrixInverse.copy(nA.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = Ri * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return S;
    }, this.getFoveation = function() {
      if (!(f === null && h === null))
        return a;
    }, this.setFoveation = function(Y) {
      a = Y, f !== null && (f.fixedFoveation = Y), h !== null && h.fixedFoveation !== void 0 && (h.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return P.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return P.getMesh(S);
    }, this.getCameraTexture = function(Y) {
      return d[Y];
    };
    let PA = null;
    function WA(Y, nA) {
      if (o = nA.getViewerPose(l || r), p = nA, o !== null) {
        const fA = o.views;
        h !== null && (A.setRenderTargetFramebuffer(C, h.framebuffer), A.setRenderTarget(C));
        let hA = !1;
        fA.length !== S.cameras.length && (S.cameras.length = 0, hA = !0);
        for (let _A = 0; _A < fA.length; _A++) {
          const yA = fA[_A];
          let XA = null;
          if (h !== null) XA = h.getViewport(yA);
          else {
            const $A = c.getViewSubImage(f, yA);
            XA = $A.viewport, _A === 0 && (A.setRenderTargetTextures(C, $A.colorTexture, $A.depthStencilTexture), A.setRenderTarget(C));
          }
          let zA = W[_A];
          zA === void 0 && (zA = new We(), zA.layers.enable(_A), zA.viewport = new re(), W[_A] = zA), zA.matrix.fromArray(yA.transform.matrix), zA.matrix.decompose(zA.position, zA.quaternion, zA.scale), zA.projectionMatrix.fromArray(yA.projectionMatrix), zA.projectionMatrixInverse.copy(zA.projectionMatrix).invert(), zA.viewport.set(XA.x, XA.y, XA.width, XA.height), _A === 0 && (S.matrix.copy(zA.matrix), S.matrix.decompose(S.position, S.quaternion, S.scale)), hA === !0 && S.cameras.push(zA);
        }
        const CA = i.enabledFeatures;
        if (CA && CA.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && m) {
          c = t.getBinding();
          const _A = c.getDepthInformation(fA[0]);
          _A && _A.isValid && _A.texture && P.init(_A, i.renderState);
        }
        if (CA && CA.includes("camera-access") && m) {
          A.state.unbindTexture(), c = t.getBinding();
          for (let _A = 0; _A < fA.length; _A++) {
            const yA = fA[_A].camera;
            if (yA) {
              let XA = d[yA];
              XA || (XA = new ya(), d[yA] = XA);
              const zA = c.getCameraImage(yA);
              XA.sourceTexture = zA;
            }
          }
        }
      }
      for (let fA = 0; fA < D.length; fA++) {
        const hA = M[fA], CA = D[fA];
        hA !== null && CA !== void 0 && CA.update(hA, nA, l || r);
      }
      PA && PA(Y, nA), nA.detectedPlanes && t.dispatchEvent({
        type: "planesdetected",
        data: nA
      }), p = null;
    }
    const KA = new Fa();
    KA.setAnimationLoop(WA), this.setAnimationLoop = function(Y) {
      PA = Y;
    }, this.dispose = function() {
    };
  }
}, Nf = /* @__PURE__ */ new ae(), ka = /* @__PURE__ */ new TA();
ka.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function zf(A, e) {
  function t(d, u) {
    d.matrixAutoUpdate === !0 && d.updateMatrix(), u.value.copy(d.matrix);
  }
  function i(d, u) {
    u.color.getRGB(d.fogColor.value, ba(A)), u.isFog ? (d.fogNear.value = u.near, d.fogFar.value = u.far) : u.isFogExp2 && (d.fogDensity.value = u.density);
  }
  function n(d, u, x, C, D) {
    u.isNodeMaterial ? u.uniformsNeedUpdate = !1 : u.isMeshBasicMaterial ? r(d, u) : u.isMeshLambertMaterial ? (r(d, u), u.envMap && (d.envMapIntensity.value = u.envMapIntensity)) : u.isMeshToonMaterial ? (r(d, u), f(d, u)) : u.isMeshPhongMaterial ? (r(d, u), c(d, u), u.envMap && (d.envMapIntensity.value = u.envMapIntensity)) : u.isMeshStandardMaterial ? (r(d, u), h(d, u), u.isMeshPhysicalMaterial && p(d, u, D)) : u.isMeshMatcapMaterial ? (r(d, u), m(d, u)) : u.isMeshDepthMaterial ? r(d, u) : u.isMeshDistanceMaterial ? (r(d, u), P(d, u)) : u.isMeshNormalMaterial ? r(d, u) : u.isLineBasicMaterial ? (s(d, u), u.isLineDashedMaterial && a(d, u)) : u.isPointsMaterial ? l(d, u, x, C) : u.isSpriteMaterial ? o(d, u) : u.isShadowMaterial ? (d.color.value.copy(u.color), d.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function r(d, u) {
    d.opacity.value = u.opacity, u.color && d.diffuse.value.copy(u.color), u.emissive && d.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (d.map.value = u.map, t(u.map, d.mapTransform)), u.alphaMap && (d.alphaMap.value = u.alphaMap, t(u.alphaMap, d.alphaMapTransform)), u.bumpMap && (d.bumpMap.value = u.bumpMap, t(u.bumpMap, d.bumpMapTransform), d.bumpScale.value = u.bumpScale, u.side === 1 && (d.bumpScale.value *= -1)), u.normalMap && (d.normalMap.value = u.normalMap, t(u.normalMap, d.normalMapTransform), d.normalScale.value.copy(u.normalScale), u.side === 1 && d.normalScale.value.negate()), u.displacementMap && (d.displacementMap.value = u.displacementMap, t(u.displacementMap, d.displacementMapTransform), d.displacementScale.value = u.displacementScale, d.displacementBias.value = u.displacementBias), u.emissiveMap && (d.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, d.emissiveMapTransform)), u.specularMap && (d.specularMap.value = u.specularMap, t(u.specularMap, d.specularMapTransform)), u.alphaTest > 0 && (d.alphaTest.value = u.alphaTest);
    const x = e.get(u), C = x.envMap, D = x.envMapRotation;
    C && (d.envMap.value = C, d.envMapRotation.value.setFromMatrix4(Nf.makeRotationFromEuler(D)).transpose(), C.isCubeTexture && C.isRenderTargetTexture === !1 && d.envMapRotation.value.premultiply(ka), d.reflectivity.value = u.reflectivity, d.ior.value = u.ior, d.refractionRatio.value = u.refractionRatio), u.lightMap && (d.lightMap.value = u.lightMap, d.lightMapIntensity.value = u.lightMapIntensity, t(u.lightMap, d.lightMapTransform)), u.aoMap && (d.aoMap.value = u.aoMap, d.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, d.aoMapTransform));
  }
  function s(d, u) {
    d.diffuse.value.copy(u.color), d.opacity.value = u.opacity, u.map && (d.map.value = u.map, t(u.map, d.mapTransform));
  }
  function a(d, u) {
    d.dashSize.value = u.dashSize, d.totalSize.value = u.dashSize + u.gapSize, d.scale.value = u.scale;
  }
  function l(d, u, x, C) {
    d.diffuse.value.copy(u.color), d.opacity.value = u.opacity, d.size.value = u.size * x, d.scale.value = C * 0.5, u.map && (d.map.value = u.map, t(u.map, d.uvTransform)), u.alphaMap && (d.alphaMap.value = u.alphaMap, t(u.alphaMap, d.alphaMapTransform)), u.alphaTest > 0 && (d.alphaTest.value = u.alphaTest);
  }
  function o(d, u) {
    d.diffuse.value.copy(u.color), d.opacity.value = u.opacity, d.rotation.value = u.rotation, u.map && (d.map.value = u.map, t(u.map, d.mapTransform)), u.alphaMap && (d.alphaMap.value = u.alphaMap, t(u.alphaMap, d.alphaMapTransform)), u.alphaTest > 0 && (d.alphaTest.value = u.alphaTest);
  }
  function c(d, u) {
    d.specular.value.copy(u.specular), d.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(d, u) {
    u.gradientMap && (d.gradientMap.value = u.gradientMap);
  }
  function h(d, u) {
    d.metalness.value = u.metalness, u.metalnessMap && (d.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, d.metalnessMapTransform)), d.roughness.value = u.roughness, u.roughnessMap && (d.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, d.roughnessMapTransform)), u.envMap && (d.envMapIntensity.value = u.envMapIntensity);
  }
  function p(d, u, x) {
    d.ior.value = u.ior, u.sheen > 0 && (d.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), d.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (d.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, d.sheenColorMapTransform)), u.sheenRoughnessMap && (d.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, d.sheenRoughnessMapTransform))), u.clearcoat > 0 && (d.clearcoat.value = u.clearcoat, d.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (d.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, d.clearcoatMapTransform)), u.clearcoatRoughnessMap && (d.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, d.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (d.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, d.clearcoatNormalMapTransform), d.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === 1 && d.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (d.dispersion.value = u.dispersion), u.iridescence > 0 && (d.iridescence.value = u.iridescence, d.iridescenceIOR.value = u.iridescenceIOR, d.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], d.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (d.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, d.iridescenceMapTransform)), u.iridescenceThicknessMap && (d.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, d.iridescenceThicknessMapTransform))), u.transmission > 0 && (d.transmission.value = u.transmission, d.transmissionSamplerMap.value = x.texture, d.transmissionSamplerSize.value.set(x.width, x.height), u.transmissionMap && (d.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, d.transmissionMapTransform)), d.thickness.value = u.thickness, u.thicknessMap && (d.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, d.thicknessMapTransform)), d.attenuationDistance.value = u.attenuationDistance, d.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (d.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (d.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, d.anisotropyMapTransform))), d.specularIntensity.value = u.specularIntensity, d.specularColor.value.copy(u.specularColor), u.specularColorMap && (d.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, d.specularColorMapTransform)), u.specularIntensityMap && (d.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, d.specularIntensityMapTransform));
  }
  function m(d, u) {
    u.matcap && (d.matcap.value = u.matcap);
  }
  function P(d, u) {
    const x = e.get(u).light;
    d.referencePosition.value.setFromMatrixPosition(x.matrixWorld), d.nearDistance.value = x.shadow.camera.near, d.farDistance.value = x.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: n
  };
}
function Of(A, e, t, i) {
  let n = {}, r = {}, s = [];
  const a = A.getParameter(A.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(D, M) {
    const _ = M.program;
    i.uniformBlockBinding(D, _);
  }
  function o(D, M) {
    let _ = n[D.id];
    _ === void 0 && (d(D), _ = c(D), n[D.id] = _, D.addEventListener("dispose", x));
    const I = M.program;
    i.updateUBOMapping(D, I);
    const v = e.render.frame;
    r[D.id] !== v && (h(D), r[D.id] = v);
  }
  function c(D) {
    const M = f();
    D.__bindingPointIndex = M;
    const _ = A.createBuffer(), I = D.__size, v = D.usage;
    return A.bindBuffer(A.UNIFORM_BUFFER, _), A.bufferData(A.UNIFORM_BUFFER, I, v), A.bindBuffer(A.UNIFORM_BUFFER, null), A.bindBufferBase(A.UNIFORM_BUFFER, M, _), _;
  }
  function f() {
    for (let D = 0; D < a; D++) if (s.indexOf(D) === -1)
      return s.push(D), D;
    return IA("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(D) {
    const M = n[D.id], _ = D.uniforms, I = D.__cache;
    A.bindBuffer(A.UNIFORM_BUFFER, M);
    for (let v = 0, B = _.length; v < B; v++) {
      const W = _[v];
      if (Array.isArray(W)) for (let S = 0, V = W.length; S < V; S++) p(W[S], v, S, I);
      else p(W, v, 0, I);
    }
    A.bindBuffer(A.UNIFORM_BUFFER, null);
  }
  function p(D, M, _, I) {
    if (P(D, M, _, I) === !0) {
      const v = D.__offset, B = D.value;
      if (Array.isArray(B)) {
        let W = 0;
        for (let S = 0; S < B.length; S++) {
          const V = B[S], k = u(V);
          m(V, D.__data, W), typeof V != "number" && typeof V != "boolean" && !V.isMatrix3 && !ArrayBuffer.isView(V) && (W += k.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else m(B, D.__data, 0);
      A.bufferSubData(A.UNIFORM_BUFFER, v, D.__data);
    }
  }
  function m(D, M, _) {
    typeof D == "number" || typeof D == "boolean" ? M[0] = D : D.isMatrix3 ? (M[0] = D.elements[0], M[1] = D.elements[1], M[2] = D.elements[2], M[3] = 0, M[4] = D.elements[3], M[5] = D.elements[4], M[6] = D.elements[5], M[7] = 0, M[8] = D.elements[6], M[9] = D.elements[7], M[10] = D.elements[8], M[11] = 0) : ArrayBuffer.isView(D) ? M.set(new D.constructor(D.buffer, D.byteOffset, M.length)) : D.toArray(M, _);
  }
  function P(D, M, _, I) {
    const v = D.value, B = M + "_" + _;
    if (I[B] === void 0)
      return typeof v == "number" || typeof v == "boolean" ? I[B] = v : ArrayBuffer.isView(v) ? I[B] = v.slice() : I[B] = v.clone(), !0;
    {
      const W = I[B];
      if (typeof v == "number" || typeof v == "boolean") {
        if (W !== v)
          return I[B] = v, !0;
      } else {
        if (ArrayBuffer.isView(v)) return !0;
        if (W.equals(v) === !1)
          return W.copy(v), !0;
      }
    }
    return !1;
  }
  function d(D) {
    const M = D.uniforms;
    let _ = 0;
    const I = 16;
    for (let B = 0, W = M.length; B < W; B++) {
      const S = Array.isArray(M[B]) ? M[B] : [M[B]];
      for (let V = 0, k = S.length; V < k; V++) {
        const G = S[V], z = Array.isArray(G.value) ? G.value : [G.value];
        for (let X = 0, L = z.length; X < L; X++) {
          const q = z[X], AA = u(q), eA = _ % I, cA = eA % AA.boundary, PA = eA + cA;
          _ += cA, PA !== 0 && I - PA < AA.storage && (_ += I - PA), G.__data = new Float32Array(AA.storage / Float32Array.BYTES_PER_ELEMENT), G.__offset = _, _ += AA.storage;
        }
      }
    }
    const v = _ % I;
    return v > 0 && (_ += I - v), D.__size = _, D.__cache = {}, this;
  }
  function u(D) {
    const M = {
      boundary: 0,
      storage: 0
    };
    return typeof D == "number" || typeof D == "boolean" ? (M.boundary = 4, M.storage = 4) : D.isVector2 ? (M.boundary = 8, M.storage = 8) : D.isVector3 || D.isColor ? (M.boundary = 16, M.storage = 12) : D.isVector4 ? (M.boundary = 16, M.storage = 16) : D.isMatrix3 ? (M.boundary = 48, M.storage = 48) : D.isMatrix4 ? (M.boundary = 64, M.storage = 64) : D.isTexture ? MA("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(D) ? (M.boundary = 16, M.storage = D.byteLength) : MA("WebGLRenderer: Unsupported uniform value type.", D), M;
  }
  function x(D) {
    const M = D.target;
    M.removeEventListener("dispose", x);
    const _ = s.indexOf(M.__bindingPointIndex);
    s.splice(_, 1), A.deleteBuffer(n[M.id]), delete n[M.id], delete r[M.id];
  }
  function C() {
    for (const D in n) A.deleteBuffer(n[D]);
    s = [], n = {}, r = {};
  }
  return {
    bind: l,
    update: o,
    dispose: C
  };
}
var Hf = new Uint16Array([
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
]), Je = null;
function Vf() {
  return Je === null && (Je = new Hl(Hf, 16, 16, vn, Rt), Je.name = "DFG_LUT", Je.minFilter = xe, Je.magFilter = xe, Je.wrapS = ot, Je.wrapT = ot, Je.generateMipmaps = !1, Je.needsUpdate = !0), Je;
}
var Gf = class {
  constructor(A = {}) {
    const { canvas: e = tl(), context: t = null, depth: i = !0, stencil: n = !1, alpha: r = !1, antialias: s = !1, premultipliedAlpha: a = !0, preserveDrawingBuffer: l = !1, powerPreference: o = "default", failIfMajorPerformanceCaveat: c = !1, reversedDepthBuffer: f = !1, outputBufferType: h = Et } = A;
    this.isWebGLRenderer = !0;
    let p;
    if (t !== null) {
      if (typeof WebGLRenderingContext < "u" && t instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = t.getContextAttributes().alpha;
    } else p = r;
    const m = h, P = /* @__PURE__ */ new Set([
      ma,
      va,
      ga
    ]), d = /* @__PURE__ */ new Set([
      Et,
      bt,
      ha,
      da,
      fa,
      ua
    ]), u = new Uint32Array(4), x = new Int32Array(4), C = new N();
    let D = null, M = null;
    const _ = [], I = [];
    let v = null;
    this.domElement = e, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const B = this;
    let W = !1, S = null, V = null, k = null, G = null;
    this._outputColorSpace = Qe;
    let z = 0, X = 0, L = null, q = -1, AA = null;
    const eA = new re(), cA = new re();
    let PA = null;
    const WA = new HA(0);
    let KA = 0, Y = e.width, nA = e.height, fA = 1, hA = null, CA = null;
    const _A = new re(0, 0, Y, nA), yA = new re(0, 0, Y, nA);
    let XA = !1;
    const zA = new Br();
    let $A = !1, pe = !1;
    const Ce = new ae(), Re = new N(), Ae = new re(), ge = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ue = !1;
    function le() {
      return L === null ? fA : 1;
    }
    let T = t;
    function Le(w, R) {
      return e.getContext(w, R);
    }
    try {
      const w = {
        alpha: !0,
        depth: i,
        stencil: n,
        antialias: s,
        premultipliedAlpha: a,
        preserveDrawingBuffer: l,
        powerPreference: o,
        failIfMajorPerformanceCaveat: c
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r185"), e.addEventListener("webglcontextlost", xA, !1), e.addEventListener("webglcontextrestored", De, !1), e.addEventListener("webglcontextcreationerror", jA, !1), T === null) {
        const R = "webgl2";
        if (T = Le(R, w), T === null) throw Le(R) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (w) {
      throw IA("WebGLRenderer: " + w.message), w;
    }
    let YA, ee, E, g, y, H, J, iA, aA, b, tA, dA, mA, $, DA, EA, QA, VA, Q, K, j, uA, vA;
    function Z() {
      YA = new Hc(T), YA.init(), j = new bf(T, YA), ee = new bc(T, YA, A, j), E = new Qf(T, YA), ee.reversedDepthBuffer && f && E.buffers.depth.setReversed(!0), V = T.createFramebuffer(), k = T.createFramebuffer(), G = T.createFramebuffer(), g = new kc(T), y = new vf(), H = new Tf(T, YA, E, y, ee, j, g), J = new Oc(B), iA = new Sc(T), uA = new Qc(T, iA), aA = new Vc(T, iA, g, uA), b = new Xc(T, aA, iA, uA, g), VA = new Wc(T, ee, H), DA = new Rc(y), tA = new gf(B, J, YA, ee, uA, DA), dA = new zf(B, y), mA = new wf(), $ = new Cf(YA), QA = new yc(B, J, E, b, p, a), EA = new yf(B, b, ee), vA = new Of(T, g, ee, E), Q = new Tc(T, YA, g), K = new Gc(T, YA, g), g.programs = tA.programs, B.capabilities = ee, B.extensions = YA, B.properties = y, B.renderLists = mA, B.shadowMap = EA, B.state = E, B.info = g;
    }
    Z(), m !== 1009 && (v = new Kc(m, e.width, e.height, s, i, n));
    const oA = new Ff(B, T);
    this.xr = oA, this.getContext = function() {
      return T;
    }, this.getContextAttributes = function() {
      return T.getContextAttributes();
    }, this.forceContextLoss = function() {
      const w = YA.get("WEBGL_lose_context");
      w && w.loseContext();
    }, this.forceContextRestore = function() {
      const w = YA.get("WEBGL_lose_context");
      w && w.restoreContext();
    }, this.getPixelRatio = function() {
      return fA;
    }, this.setPixelRatio = function(w) {
      w !== void 0 && (fA = w, this.setSize(Y, nA, !1));
    }, this.getSize = function(w) {
      return w.set(Y, nA);
    }, this.setSize = function(w, R, O = !0) {
      if (oA.isPresenting) {
        MA("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Y = w, nA = R, e.width = Math.floor(w * fA), e.height = Math.floor(R * fA), O === !0 && (e.style.width = w + "px", e.style.height = R + "px"), v !== null && v.setSize(e.width, e.height), this.setViewport(0, 0, w, R);
    }, this.getDrawingBufferSize = function(w) {
      return w.set(Y * fA, nA * fA).floor();
    }, this.setDrawingBufferSize = function(w, R, O) {
      Y = w, nA = R, fA = O, e.width = Math.floor(w * O), e.height = Math.floor(R * O), this.setViewport(0, 0, w, R);
    }, this.setEffects = function(w) {
      if (m === 1009) {
        IA("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (w) {
        for (let R = 0; R < w.length; R++) if (w[R].isOutputPass === !0) {
          MA("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      v.setEffects(w || []);
    }, this.getCurrentViewport = function(w) {
      return w.copy(eA);
    }, this.getViewport = function(w) {
      return w.copy(_A);
    }, this.setViewport = function(w, R, O, F) {
      w.isVector4 ? _A.set(w.x, w.y, w.z, w.w) : _A.set(w, R, O, F), E.viewport(eA.copy(_A).multiplyScalar(fA).round());
    }, this.getScissor = function(w) {
      return w.copy(yA);
    }, this.setScissor = function(w, R, O, F) {
      w.isVector4 ? yA.set(w.x, w.y, w.z, w.w) : yA.set(w, R, O, F), E.scissor(cA.copy(yA).multiplyScalar(fA).round());
    }, this.getScissorTest = function() {
      return XA;
    }, this.setScissorTest = function(w) {
      E.setScissorTest(XA = w);
    }, this.setOpaqueSort = function(w) {
      hA = w;
    }, this.setTransparentSort = function(w) {
      CA = w;
    }, this.getClearColor = function(w) {
      return w.copy(QA.getClearColor());
    }, this.setClearColor = function() {
      QA.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return QA.getClearAlpha();
    }, this.setClearAlpha = function() {
      QA.setClearAlpha(...arguments);
    }, this.clear = function(w = !0, R = !0, O = !0) {
      let F = 0;
      if (w) {
        let U = !1;
        if (L !== null) {
          const rA = L.texture.format;
          U = P.has(rA);
        }
        if (U) {
          const rA = L.texture.type, lA = d.has(rA), pA = QA.getClearColor(), gA = QA.getClearAlpha(), SA = pA.r, UA = pA.g, FA = pA.b;
          lA ? (u[0] = SA, u[1] = UA, u[2] = FA, u[3] = gA, T.clearBufferuiv(T.COLOR, 0, u)) : (x[0] = SA, x[1] = UA, x[2] = FA, x[3] = gA, T.clearBufferiv(T.COLOR, 0, x));
        } else F |= T.COLOR_BUFFER_BIT;
      }
      R && (F |= T.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), O && (F |= T.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && T.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(w) {
      w.setRenderer(this), S = w;
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", xA, !1), e.removeEventListener("webglcontextrestored", De, !1), e.removeEventListener("webglcontextcreationerror", jA, !1), QA.dispose(), mA.dispose(), $.dispose(), y.dispose(), J.dispose(), b.dispose(), uA.dispose(), vA.dispose(), tA.dispose(), oA.dispose(), oA.removeEventListener("sessionstart", Qr), oA.removeEventListener("sessionend", Tr), Bt.stop();
    };
    function xA(w) {
      w.preventDefault(), kr("WebGLRenderer: Context Lost."), W = !0;
    }
    function De() {
      kr("WebGLRenderer: Context Restored."), W = !1;
      const w = g.autoReset, R = EA.enabled, O = EA.autoUpdate, F = EA.needsUpdate, U = EA.type;
      Z(), g.autoReset = w, EA.enabled = R, EA.autoUpdate = O, EA.needsUpdate = F, EA.type = U;
    }
    function jA(w) {
      IA("WebGLRenderer: A WebGL context could not be created. Reason: ", w.statusMessage);
    }
    function Xe(w) {
      const R = w.target;
      R.removeEventListener("dispose", Xe), At(R);
    }
    function At(w) {
      Za(w), y.remove(w);
    }
    function Za(w) {
      const R = y.get(w).programs;
      R !== void 0 && (R.forEach(function(O) {
        tA.releaseProgram(O);
      }), w.isShaderMaterial && tA.releaseShaderCache(w));
    }
    this.renderBufferDirect = function(w, R, O, F, U, rA) {
      R === null && (R = ge);
      const lA = U.isMesh && U.matrixWorld.determinantAffine() < 0, pA = eo(w, R, O, F, U);
      E.setMaterial(F, lA);
      let gA = O.index, SA = 1;
      if (F.wireframe === !0) {
        if (gA = aA.getWireframeAttribute(O), gA === void 0) return;
        SA = 2;
      }
      const UA = O.drawRange, FA = O.attributes.position;
      let BA = UA.start * SA, ZA = (UA.start + UA.count) * SA;
      rA !== null && (BA = Math.max(BA, rA.start * SA), ZA = Math.min(ZA, (rA.start + rA.count) * SA)), gA !== null ? (BA = Math.max(BA, 0), ZA = Math.min(ZA, gA.count)) : FA != null && (BA = Math.max(BA, 0), ZA = Math.min(ZA, FA.count));
      const te = ZA - BA;
      if (te < 0 || te === 1 / 0) return;
      uA.setup(U, F, pA, O, gA);
      let ie, GA = Q;
      if (gA !== null && (ie = iA.get(gA), GA = K, GA.setIndex(ie)), U.isMesh) F.wireframe === !0 ? (E.setLineWidth(F.wireframeLinewidth * le()), GA.setMode(T.LINES)) : GA.setMode(T.TRIANGLES);
      else if (U.isLine) {
        let me = F.linewidth;
        me === void 0 && (me = 1), E.setLineWidth(me * le()), U.isLineSegments ? GA.setMode(T.LINES) : U.isLineLoop ? GA.setMode(T.LINE_LOOP) : GA.setMode(T.LINE_STRIP);
      } else U.isPoints ? GA.setMode(T.POINTS) : U.isSprite && GA.setMode(T.TRIANGLES);
      if (U.isBatchedMesh) if (YA.get("WEBGL_multi_draw"))
        GA.renderMultiDraw(U._multiDrawStarts, U._multiDrawCounts, U._multiDrawCount);
      else {
        const me = U._multiDrawStarts, wA = U._multiDrawCounts, Oe = U._multiDrawCount, kA = gA ? iA.get(gA).bytesPerElement : 1, Ue = y.get(F).currentProgram.getUniforms();
        for (let Ye = 0; Ye < Oe; Ye++)
          Ue.setValue(T, "_gl_DrawID", Ye), GA.render(me[Ye] / kA, wA[Ye]);
      }
      else if (U.isInstancedMesh) GA.renderInstances(BA, te, U.count);
      else if (O.isInstancedBufferGeometry) {
        const me = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, wA = Math.min(O.instanceCount, me);
        GA.renderInstances(BA, te, wA);
      } else GA.render(BA, te);
    };
    function yr(w, R, O) {
      w.transparent === !0 && w.side === 2 && w.forceSinglePass === !1 ? (w.side = 1, w.needsUpdate = !0, Vi(w, R, O), w.side = 0, w.needsUpdate = !0, Vi(w, R, O), w.side = 2) : Vi(w, R, O);
    }
    this.compile = function(w, R, O = null) {
      O === null && (O = w), M = $.get(O), M.init(R), I.push(M), O.traverseVisible(function(U) {
        U.isLight && U.layers.test(R.layers) && (M.pushLight(U), U.castShadow && M.pushShadow(U));
      }), w !== O && w.traverseVisible(function(U) {
        U.isLight && U.layers.test(R.layers) && (M.pushLight(U), U.castShadow && M.pushShadow(U));
      }), M.setupLights();
      const F = /* @__PURE__ */ new Set();
      return w.traverse(function(U) {
        if (!(U.isMesh || U.isPoints || U.isLine || U.isSprite)) return;
        const rA = U.material;
        if (rA) if (Array.isArray(rA)) for (let lA = 0; lA < rA.length; lA++) {
          const pA = rA[lA];
          yr(pA, O, U), F.add(pA);
        }
        else
          yr(rA, O, U), F.add(rA);
      }), M = I.pop(), F;
    }, this.compileAsync = function(w, R, O = null) {
      const F = this.compile(w, R, O);
      return new Promise((U) => {
        function rA() {
          if (F.forEach(function(lA) {
            y.get(lA).currentProgram.isReady() && F.delete(lA);
          }), F.size === 0) {
            U(w);
            return;
          }
          setTimeout(rA, 10);
        }
        YA.get("KHR_parallel_shader_compile") !== null ? rA() : setTimeout(rA, 10);
      });
    };
    let _n = null;
    function $a(w) {
      _n && _n(w);
    }
    function Qr() {
      Bt.stop();
    }
    function Tr() {
      Bt.start();
    }
    const Bt = new Fa();
    Bt.setAnimationLoop($a), typeof self < "u" && Bt.setContext(self), this.setAnimationLoop = function(w) {
      _n = w, oA.setAnimationLoop(w), w === null ? Bt.stop() : Bt.start();
    }, oA.addEventListener("sessionstart", Qr), oA.addEventListener("sessionend", Tr), this.render = function(w, R) {
      if (R !== void 0 && R.isCamera !== !0) {
        IA("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (W === !0) return;
      S !== null && S.renderStart(w, R);
      const O = oA.enabled === !0 && oA.isPresenting === !0, F = v !== null && (L === null || O) && v.begin(B, L);
      if (w.matrixWorldAutoUpdate === !0 && w.updateMatrixWorld(), R.parent === null && R.matrixWorldAutoUpdate === !0 && R.updateMatrixWorld(), oA.enabled === !0 && oA.isPresenting === !0 && (v === null || v.isCompositing() === !1) && (oA.cameraAutoUpdate === !0 && oA.updateCamera(R), R = oA.getCamera()), w.isScene === !0 && w.onBeforeRender(B, w, R, L), M = $.get(w, I.length), M.init(R), M.state.textureUnits = H.getTextureUnits(), I.push(M), Ce.multiplyMatrices(R.projectionMatrix, R.matrixWorldInverse), zA.setFromProjectionMatrix(Ce, li, R.reversedDepth), pe = this.localClippingEnabled, $A = DA.init(this.clippingPlanes, pe), D = mA.get(w, _.length), D.init(), _.push(D), oA.enabled === !0 && oA.isPresenting === !0) {
        const rA = B.xr.getDepthSensingMesh();
        rA !== null && Sn(rA, R, -1 / 0, B.sortObjects);
      }
      Sn(w, R, 0, B.sortObjects), D.finish(), B.sortObjects === !0 && D.sort(hA, CA, R.reversedDepth), ue = oA.enabled === !1 || oA.isPresenting === !1 || oA.hasDepthSensing() === !1, ue && QA.addToRenderList(D, w), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), $A === !0 && DA.beginShadows();
      const U = M.state.shadowsArray;
      if (EA.render(U, w, R), $A === !0 && DA.endShadows(), (F && v.hasRenderPass()) === !1) {
        const rA = D.opaque, lA = D.transmissive;
        if (M.setupLights(), R.isArrayCamera) {
          const pA = R.cameras;
          if (lA.length > 0) for (let gA = 0, SA = pA.length; gA < SA; gA++) {
            const UA = pA[gA];
            Rr(rA, lA, w, UA);
          }
          ue && QA.render(w);
          for (let gA = 0, SA = pA.length; gA < SA; gA++) {
            const UA = pA[gA];
            br(D, w, UA, UA.viewport);
          }
        } else
          lA.length > 0 && Rr(rA, lA, w, R), ue && QA.render(w), br(D, w, R);
      }
      L !== null && X === 0 && (H.updateMultisampleRenderTarget(L), H.updateRenderTargetMipmap(L)), F && v.end(B), w.isScene === !0 && w.onAfterRender(B, w, R), uA.resetDefaultState(), q = -1, AA = null, I.pop(), I.length > 0 ? (M = I[I.length - 1], H.setTextureUnits(M.state.textureUnits), $A === !0 && DA.setGlobalState(B.clippingPlanes, M.state.camera)) : M = null, _.pop(), _.length > 0 ? D = _[_.length - 1] : D = null, S !== null && S.renderEnd();
    };
    function Sn(w, R, O, F) {
      if (w.visible === !1) return;
      if (w.layers.test(R.layers)) {
        if (w.isGroup) O = w.renderOrder;
        else if (w.isLOD)
          w.autoUpdate === !0 && w.update(R);
        else if (w.isLightProbeGrid) M.pushLightProbeGrid(w);
        else if (w.isLight)
          M.pushLight(w), w.castShadow && M.pushShadow(w);
        else if (w.isSprite) {
          if (!w.frustumCulled || zA.intersectsSprite(w)) {
            F && Ae.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ce);
            const rA = b.update(w), lA = w.material;
            lA.visible && D.push(w, rA, lA, O, Ae.z, null);
          }
        } else if ((w.isMesh || w.isLine || w.isPoints) && (!w.frustumCulled || zA.intersectsObject(w))) {
          const rA = b.update(w), lA = w.material;
          if (F && (w.boundingSphere !== void 0 ? (w.boundingSphere === null && w.computeBoundingSphere(), Ae.copy(w.boundingSphere.center)) : (rA.boundingSphere === null && rA.computeBoundingSphere(), Ae.copy(rA.boundingSphere.center)), Ae.applyMatrix4(w.matrixWorld).applyMatrix4(Ce)), Array.isArray(lA)) {
            const pA = rA.groups;
            for (let gA = 0, SA = pA.length; gA < SA; gA++) {
              const UA = pA[gA], FA = lA[UA.materialIndex];
              FA && FA.visible && D.push(w, rA, FA, O, Ae.z, UA);
            }
          } else lA.visible && D.push(w, rA, lA, O, Ae.z, null);
        }
      }
      const U = w.children;
      for (let rA = 0, lA = U.length; rA < lA; rA++) Sn(U[rA], R, O, F);
    }
    function br(w, R, O, F) {
      const { opaque: U, transmissive: rA, transparent: lA } = w;
      M.setupLightsView(O), $A === !0 && DA.setGlobalState(B.clippingPlanes, O), F && E.viewport(eA.copy(F)), U.length > 0 && Hi(U, R, O), rA.length > 0 && Hi(rA, R, O), lA.length > 0 && Hi(lA, R, O), E.buffers.depth.setTest(!0), E.buffers.depth.setMask(!0), E.buffers.color.setMask(!0), E.setPolygonOffset(!1);
    }
    function Rr(w, R, O, F) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null) return;
      if (M.state.transmissionRenderTarget[F.id] === void 0) {
        const FA = YA.has("EXT_color_buffer_half_float") || YA.has("EXT_color_buffer_float");
        M.state.transmissionRenderTarget[F.id] = new je(1, 1, {
          generateMipmaps: !0,
          type: FA ? Rt : Et,
          minFilter: En,
          samples: Math.max(4, ee.samples),
          stencilBuffer: n,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: OA.workingColorSpace
        });
      }
      const U = M.state.transmissionRenderTarget[F.id], rA = F.viewport || eA;
      U.setSize(rA.z * B.transmissionResolutionScale, rA.w * B.transmissionResolutionScale);
      const lA = B.getRenderTarget(), pA = B.getActiveCubeFace(), gA = B.getActiveMipmapLevel();
      B.setRenderTarget(U), B.getClearColor(WA), KA = B.getClearAlpha(), KA < 1 && B.setClearColor(16777215, 0.5), B.clear(), ue && QA.render(O);
      const SA = B.toneMapping;
      B.toneMapping = 0;
      const UA = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), M.setupLightsView(F), $A === !0 && DA.setGlobalState(B.clippingPlanes, F), Hi(w, O, F), H.updateMultisampleRenderTarget(U), H.updateRenderTargetMipmap(U), YA.has("WEBGL_multisampled_render_to_texture") === !1) {
        let FA = !1;
        for (let BA = 0, ZA = R.length; BA < ZA; BA++) {
          const { object: te, geometry: ie, material: GA, group: me } = R[BA];
          if (GA.side === 2 && te.layers.test(F.layers)) {
            const wA = GA.side;
            GA.side = 1, GA.needsUpdate = !0, Lr(te, O, F, ie, GA, me), GA.side = wA, GA.needsUpdate = !0, FA = !0;
          }
        }
        FA === !0 && (H.updateMultisampleRenderTarget(U), H.updateRenderTargetMipmap(U));
      }
      B.setRenderTarget(lA, pA, gA), B.setClearColor(WA, KA), UA !== void 0 && (F.viewport = UA), B.toneMapping = SA;
    }
    function Hi(w, R, O) {
      const F = R.isScene === !0 ? R.overrideMaterial : null;
      for (let U = 0, rA = w.length; U < rA; U++) {
        const lA = w[U], { object: pA, geometry: gA, group: SA } = lA;
        let UA = lA.material;
        UA.allowOverride === !0 && F !== null && (UA = F), pA.layers.test(O.layers) && Lr(pA, R, O, gA, UA, SA);
      }
    }
    function Lr(w, R, O, F, U, rA) {
      w.onBeforeRender(B, R, O, F, U, rA), w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, w.matrixWorld), w.normalMatrix.getNormalMatrix(w.modelViewMatrix), U.onBeforeRender(B, R, O, F, w, rA), U.transparent === !0 && U.side === 2 && U.forceSinglePass === !1 ? (U.side = 1, U.needsUpdate = !0, B.renderBufferDirect(O, R, F, U, w, rA), U.side = 0, U.needsUpdate = !0, B.renderBufferDirect(O, R, F, U, w, rA), U.side = 2) : B.renderBufferDirect(O, R, F, U, w, rA), w.onAfterRender(B, R, O, F, U, rA);
    }
    function Vi(w, R, O) {
      R.isScene !== !0 && (R = ge);
      const F = y.get(w), U = M.state.lights, rA = M.state.shadowsArray, lA = U.state.version, pA = tA.getParameters(w, U.state, rA, R, O, M.state.lightProbeGridArray), gA = tA.getProgramCacheKey(pA);
      let SA = F.programs;
      F.environment = w.isMeshStandardMaterial || w.isMeshLambertMaterial || w.isMeshPhongMaterial ? R.environment : null, F.fog = R.fog;
      const UA = w.isMeshStandardMaterial || w.isMeshLambertMaterial && !w.envMap || w.isMeshPhongMaterial && !w.envMap;
      F.envMap = J.get(w.envMap || F.environment, UA), F.envMapRotation = F.environment !== null && w.envMap === null ? R.environmentRotation : w.envMapRotation, SA === void 0 && (w.addEventListener("dispose", Xe), SA = /* @__PURE__ */ new Map(), F.programs = SA);
      let FA = SA.get(gA);
      if (FA !== void 0) {
        if (F.currentProgram === FA && F.lightsStateVersion === lA)
          return Fr(w, pA), FA;
      } else
        pA.uniforms = tA.getUniforms(w), S !== null && w.isNodeMaterial && S.build(w, O, pA), w.onBeforeCompile(pA, B), FA = tA.acquireProgram(pA, gA), SA.set(gA, FA), F.uniforms = pA.uniforms;
      const BA = F.uniforms;
      return (!w.isShaderMaterial && !w.isRawShaderMaterial || w.clipping === !0) && (BA.clippingPlanes = DA.uniform), Fr(w, pA), F.needsLights = io(w), F.lightsStateVersion = lA, F.needsLights && (BA.ambientLightColor.value = U.state.ambient, BA.lightProbe.value = U.state.probe, BA.directionalLights.value = U.state.directional, BA.directionalLightShadows.value = U.state.directionalShadow, BA.spotLights.value = U.state.spot, BA.spotLightShadows.value = U.state.spotShadow, BA.rectAreaLights.value = U.state.rectArea, BA.ltc_1.value = U.state.rectAreaLTC1, BA.ltc_2.value = U.state.rectAreaLTC2, BA.pointLights.value = U.state.point, BA.pointLightShadows.value = U.state.pointShadow, BA.hemisphereLights.value = U.state.hemi, BA.directionalShadowMatrix.value = U.state.directionalShadowMatrix, BA.spotLightMatrix.value = U.state.spotLightMatrix, BA.spotLightMap.value = U.state.spotLightMap, BA.pointShadowMatrix.value = U.state.pointShadowMatrix), F.lightProbeGrid = M.state.lightProbeGridArray.length > 0, F.currentProgram = FA, F.uniformsList = null, FA;
    }
    function Ur(w) {
      if (w.uniformsList === null) {
        const R = w.currentProgram.getUniforms();
        w.uniformsList = gn.seqWithValue(R.seq, w.uniforms);
      }
      return w.uniformsList;
    }
    function Fr(w, R) {
      const O = y.get(w);
      O.outputColorSpace = R.outputColorSpace, O.batching = R.batching, O.batchingColor = R.batchingColor, O.instancing = R.instancing, O.instancingColor = R.instancingColor, O.instancingMorph = R.instancingMorph, O.skinning = R.skinning, O.morphTargets = R.morphTargets, O.morphNormals = R.morphNormals, O.morphColors = R.morphColors, O.morphTargetsCount = R.morphTargetsCount, O.numClippingPlanes = R.numClippingPlanes, O.numIntersection = R.numClipIntersection, O.vertexAlphas = R.vertexAlphas, O.vertexTangents = R.vertexTangents, O.toneMapping = R.toneMapping;
    }
    function Ao(w, R) {
      if (w.length === 0) return null;
      if (w.length === 1) return w[0].texture !== null ? w[0] : null;
      C.setFromMatrixPosition(R.matrixWorld);
      for (let O = 0, F = w.length; O < F; O++) {
        const U = w[O];
        if (U.texture !== null && U.boundingBox.containsPoint(C)) return U;
      }
      return null;
    }
    function eo(w, R, O, F, U) {
      R.isScene !== !0 && (R = ge), H.resetTextureUnits();
      const rA = R.fog, lA = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? R.environment : null, pA = L === null ? B.outputColorSpace : L.isXRRenderTarget === !0 ? L.texture.colorSpace : OA.workingColorSpace, gA = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, SA = J.get(F.envMap || lA, gA), UA = F.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, FA = !!O.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), BA = !!O.morphAttributes.position, ZA = !!O.morphAttributes.normal, te = !!O.morphAttributes.color;
      let ie = 0;
      F.toneMapped && (L === null || L.isXRRenderTarget === !0) && (ie = B.toneMapping);
      const GA = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, me = GA !== void 0 ? GA.length : 0, wA = y.get(F), Oe = M.state.lights;
      if ($A === !0 && (pe === !0 || w !== AA)) {
        const JA = w === AA && F.id === q;
        DA.setState(F, w, JA);
      }
      let kA = !1;
      F.version === wA.__version ? (wA.needsLights && wA.lightsStateVersion !== Oe.state.version || wA.outputColorSpace !== pA || U.isBatchedMesh && wA.batching === !1 || !U.isBatchedMesh && wA.batching === !0 || U.isBatchedMesh && wA.batchingColor === !0 && U.colorTexture === null || U.isBatchedMesh && wA.batchingColor === !1 && U.colorTexture !== null || U.isInstancedMesh && wA.instancing === !1 || !U.isInstancedMesh && wA.instancing === !0 || U.isSkinnedMesh && wA.skinning === !1 || !U.isSkinnedMesh && wA.skinning === !0 || U.isInstancedMesh && wA.instancingColor === !0 && U.instanceColor === null || U.isInstancedMesh && wA.instancingColor === !1 && U.instanceColor !== null || U.isInstancedMesh && wA.instancingMorph === !0 && U.morphTexture === null || U.isInstancedMesh && wA.instancingMorph === !1 && U.morphTexture !== null || wA.envMap !== SA || F.fog === !0 && wA.fog !== rA || wA.numClippingPlanes !== void 0 && (wA.numClippingPlanes !== DA.numPlanes || wA.numIntersection !== DA.numIntersection) || wA.vertexAlphas !== UA || wA.vertexTangents !== FA || wA.morphTargets !== BA || wA.morphNormals !== ZA || wA.morphColors !== te || wA.toneMapping !== ie || wA.morphTargetsCount !== me || !!wA.lightProbeGrid != M.state.lightProbeGridArray.length > 0) && (kA = !0) : (kA = !0, wA.__version = F.version);
      let Ue = wA.currentProgram;
      kA === !0 && (Ue = Vi(F, R, U), S && F.isNodeMaterial && S.onUpdateProgram(F, Ue, wA));
      let Ye = !1, ut = !1, Nt = !1;
      const qA = Ue.getUniforms(), se = wA.uniforms;
      if (E.useProgram(Ue.program) && (Ye = !0, ut = !0, Nt = !0), F.id !== q && (q = F.id, ut = !0), wA.needsLights) {
        const JA = Ao(M.state.lightProbeGridArray, U);
        wA.lightProbeGrid !== JA && (wA.lightProbeGrid = JA, ut = !0);
      }
      if (Ye || AA !== w) {
        E.buffers.depth.getReversed() && w.reversedDepth !== !0 && (w._reversedDepth = !0, w.updateProjectionMatrix()), qA.setValue(T, "projectionMatrix", w.projectionMatrix), qA.setValue(T, "viewMatrix", w.matrixWorldInverse);
        const JA = qA.map.cameraPosition;
        JA !== void 0 && JA.setValue(T, Re.setFromMatrixPosition(w.matrixWorld)), ee.logarithmicDepthBuffer && qA.setValue(T, "logDepthBufFC", 2 / (Math.log(w.far + 1) / Math.LN2)), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && qA.setValue(T, "isOrthographic", w.isOrthographicCamera === !0), AA !== w && (AA = w, ut = !0, Nt = !0);
      }
      if (wA.needsLights && (Oe.state.directionalShadowMap.length > 0 && qA.setValue(T, "directionalShadowMap", Oe.state.directionalShadowMap, H), Oe.state.spotShadowMap.length > 0 && qA.setValue(T, "spotShadowMap", Oe.state.spotShadowMap, H), Oe.state.pointShadowMap.length > 0 && qA.setValue(T, "pointShadowMap", Oe.state.pointShadowMap, H)), U.isSkinnedMesh) {
        qA.setOptional(T, U, "bindMatrix"), qA.setOptional(T, U, "bindMatrixInverse");
        const JA = U.skeleton;
        JA && (JA.boneTexture === null && JA.computeBoneTexture(), qA.setValue(T, "boneTexture", JA.boneTexture, H));
      }
      U.isBatchedMesh && (qA.setOptional(T, U, "batchingTexture"), qA.setValue(T, "batchingTexture", U._matricesTexture, H), qA.setOptional(T, U, "batchingIdTexture"), qA.setValue(T, "batchingIdTexture", U._indirectTexture, H), qA.setOptional(T, U, "batchingColorTexture"), U._colorsTexture !== null && qA.setValue(T, "batchingColorTexture", U._colorsTexture, H));
      const dt = O.morphAttributes;
      if ((dt.position !== void 0 || dt.normal !== void 0 || dt.color !== void 0) && VA.update(U, O, Ue), (ut || wA.receiveShadow !== U.receiveShadow) && (wA.receiveShadow = U.receiveShadow, qA.setValue(T, "receiveShadow", U.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && R.environment !== null && (se.envMapIntensity.value = R.environmentIntensity), se.dfgLUT !== void 0 && (se.dfgLUT.value = Vf()), ut) {
        if (qA.setValue(T, "toneMappingExposure", B.toneMappingExposure), wA.needsLights && to(se, Nt), rA && F.fog === !0 && dA.refreshFogUniforms(se, rA), dA.refreshMaterialUniforms(se, F, fA, nA, M.state.transmissionRenderTarget[w.id]), wA.needsLights && wA.lightProbeGrid) {
          const JA = wA.lightProbeGrid;
          se.probesSH.value = JA.texture, se.probesMin.value.copy(JA.boundingBox.min), se.probesMax.value.copy(JA.boundingBox.max), se.probesResolution.value.copy(JA.resolution);
        }
        gn.upload(T, Ur(wA), se, H);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (gn.upload(T, Ur(wA), se, H), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && qA.setValue(T, "center", U.center), qA.setValue(T, "modelViewMatrix", U.modelViewMatrix), qA.setValue(T, "normalMatrix", U.normalMatrix), qA.setValue(T, "modelMatrix", U.matrixWorld), F.uniformsGroups !== void 0) {
        const JA = F.uniformsGroups;
        for (let pi = 0, zt = JA.length; pi < zt; pi++) {
          const Nr = JA[pi];
          vA.update(Nr, Ue), vA.bind(Nr, Ue);
        }
      }
      return Ue;
    }
    function to(w, R) {
      w.ambientLightColor.needsUpdate = R, w.lightProbe.needsUpdate = R, w.directionalLights.needsUpdate = R, w.directionalLightShadows.needsUpdate = R, w.pointLights.needsUpdate = R, w.pointLightShadows.needsUpdate = R, w.spotLights.needsUpdate = R, w.spotLightShadows.needsUpdate = R, w.rectAreaLights.needsUpdate = R, w.hemisphereLights.needsUpdate = R;
    }
    function io(w) {
      return w.isMeshLambertMaterial || w.isMeshToonMaterial || w.isMeshPhongMaterial || w.isMeshStandardMaterial || w.isShadowMaterial || w.isShaderMaterial && w.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return z;
    }, this.getActiveMipmapLevel = function() {
      return X;
    }, this.getRenderTarget = function() {
      return L;
    }, this.setRenderTargetTextures = function(w, R, O) {
      const F = y.get(w);
      F.__autoAllocateDepthBuffer = w.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), y.get(w.texture).__webglTexture = R, y.get(w.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : O, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(w, R) {
      const O = y.get(w);
      O.__webglFramebuffer = R, O.__useDefaultFramebuffer = R === void 0;
    }, this.setRenderTarget = function(w, R = 0, O = 0) {
      L = w, z = R, X = O;
      let F = null, U = !1, rA = !1;
      if (w) {
        const lA = y.get(w);
        if (lA.__useDefaultFramebuffer !== void 0) {
          E.bindFramebuffer(T.FRAMEBUFFER, lA.__webglFramebuffer), eA.copy(w.viewport), cA.copy(w.scissor), PA = w.scissorTest, E.viewport(eA), E.scissor(cA), E.setScissorTest(PA), q = -1;
          return;
        } else if (lA.__webglFramebuffer === void 0) H.setupRenderTarget(w);
        else if (lA.__hasExternalTextures) H.rebindTextures(w, y.get(w.texture).__webglTexture, y.get(w.depthTexture).__webglTexture);
        else if (w.depthBuffer) {
          const SA = w.depthTexture;
          if (lA.__boundDepthTexture !== SA) {
            if (SA !== null && y.has(SA) && (w.width !== SA.image.width || w.height !== SA.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            H.setupDepthRenderbuffer(w);
          }
        }
        const pA = w.texture;
        (pA.isData3DTexture || pA.isDataArrayTexture || pA.isCompressedArrayTexture) && (rA = !0);
        const gA = y.get(w).__webglFramebuffer;
        w.isWebGLCubeRenderTarget ? (Array.isArray(gA[R]) ? F = gA[R][O] : F = gA[R], U = !0) : w.samples > 0 && H.useMultisampledRTT(w) === !1 ? F = y.get(w).__webglMultisampledFramebuffer : Array.isArray(gA) ? F = gA[O] : F = gA, eA.copy(w.viewport), cA.copy(w.scissor), PA = w.scissorTest;
      } else
        eA.copy(_A).multiplyScalar(fA).floor(), cA.copy(yA).multiplyScalar(fA).floor(), PA = XA;
      if (O !== 0 && (F = V), E.bindFramebuffer(T.FRAMEBUFFER, F) && E.drawBuffers(w, F), E.viewport(eA), E.scissor(cA), E.setScissorTest(PA), U) {
        const lA = y.get(w.texture);
        T.framebufferTexture2D(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_CUBE_MAP_POSITIVE_X + R, lA.__webglTexture, O);
      } else if (rA) {
        const lA = R;
        for (let pA = 0; pA < w.textures.length; pA++) {
          const gA = y.get(w.textures[pA]);
          T.framebufferTextureLayer(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0 + pA, gA.__webglTexture, O, lA);
        }
      } else if (w !== null && O !== 0) {
        const lA = y.get(w.texture);
        T.framebufferTexture2D(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, lA.__webglTexture, O);
      }
      q = -1;
    }, this.readRenderTargetPixels = function(w, R, O, F, U, rA, lA, pA = 0) {
      if (!(w && w.isWebGLRenderTarget)) {
        IA("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let gA = y.get(w).__webglFramebuffer;
      if (w.isWebGLCubeRenderTarget && lA !== void 0 && (gA = gA[lA]), gA) {
        E.bindFramebuffer(T.FRAMEBUFFER, gA);
        try {
          const SA = w.textures[pA], UA = SA.format, FA = SA.type;
          if (w.textures.length > 1 && T.readBuffer(T.COLOR_ATTACHMENT0 + pA), !ee.textureFormatReadable(UA)) {
            IA("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!ee.textureTypeReadable(FA)) {
            IA("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          R >= 0 && R <= w.width - F && O >= 0 && O <= w.height - U && T.readPixels(R, O, F, U, j.convert(UA), j.convert(FA), rA);
        } finally {
          const SA = L !== null ? y.get(L).__webglFramebuffer : null;
          E.bindFramebuffer(T.FRAMEBUFFER, SA);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(w, R, O, F, U, rA, lA, pA = 0) {
      if (!(w && w.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let gA = y.get(w).__webglFramebuffer;
      if (w.isWebGLCubeRenderTarget && lA !== void 0 && (gA = gA[lA]), gA) if (R >= 0 && R <= w.width - F && O >= 0 && O <= w.height - U) {
        E.bindFramebuffer(T.FRAMEBUFFER, gA);
        const SA = w.textures[pA], UA = SA.format, FA = SA.type;
        if (w.textures.length > 1 && T.readBuffer(T.COLOR_ATTACHMENT0 + pA), !ee.textureFormatReadable(UA)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!ee.textureTypeReadable(FA)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const BA = T.createBuffer();
        T.bindBuffer(T.PIXEL_PACK_BUFFER, BA), T.bufferData(T.PIXEL_PACK_BUFFER, rA.byteLength, T.STREAM_READ), T.readPixels(R, O, F, U, j.convert(UA), j.convert(FA), 0);
        const ZA = L !== null ? y.get(L).__webglFramebuffer : null;
        E.bindFramebuffer(T.FRAMEBUFFER, ZA);
        const te = T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return T.flush(), await il(T, te, 4), T.bindBuffer(T.PIXEL_PACK_BUFFER, BA), T.getBufferSubData(T.PIXEL_PACK_BUFFER, 0, rA), T.deleteBuffer(BA), T.deleteSync(te), rA;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(w, R = null, O = 0) {
      const F = Math.pow(2, -O), U = Math.floor(w.image.width * F), rA = Math.floor(w.image.height * F), lA = R !== null ? R.x : 0, pA = R !== null ? R.y : 0;
      H.setTexture2D(w, 0), T.copyTexSubImage2D(T.TEXTURE_2D, O, 0, 0, lA, pA, U, rA), E.unbindTexture();
    }, this.copyTextureToTexture = function(w, R, O = null, F = null, U = 0, rA = 0) {
      let lA, pA, gA, SA, UA, FA, BA, ZA, te;
      const ie = w.isCompressedTexture ? w.mipmaps[rA] : w.image;
      if (O !== null)
        lA = O.max.x - O.min.x, pA = O.max.y - O.min.y, gA = O.isBox3 ? O.max.z - O.min.z : 1, SA = O.min.x, UA = O.min.y, FA = O.isBox3 ? O.min.z : 0;
      else {
        const se = Math.pow(2, -U);
        lA = Math.floor(ie.width * se), pA = Math.floor(ie.height * se), w.isDataArrayTexture ? gA = ie.depth : w.isData3DTexture ? gA = Math.floor(ie.depth * se) : gA = 1, SA = 0, UA = 0, FA = 0;
      }
      F !== null ? (BA = F.x, ZA = F.y, te = F.z) : (BA = 0, ZA = 0, te = 0);
      const GA = j.convert(R.format), me = j.convert(R.type);
      let wA;
      R.isData3DTexture ? (H.setTexture3D(R, 0), wA = T.TEXTURE_3D) : R.isDataArrayTexture || R.isCompressedArrayTexture ? (H.setTexture2DArray(R, 0), wA = T.TEXTURE_2D_ARRAY) : (H.setTexture2D(R, 0), wA = T.TEXTURE_2D), E.activeTexture(T.TEXTURE0), E.pixelStorei(T.UNPACK_FLIP_Y_WEBGL, R.flipY), E.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL, R.premultiplyAlpha), E.pixelStorei(T.UNPACK_ALIGNMENT, R.unpackAlignment);
      const Oe = E.getParameter(T.UNPACK_ROW_LENGTH), kA = E.getParameter(T.UNPACK_IMAGE_HEIGHT), Ue = E.getParameter(T.UNPACK_SKIP_PIXELS), Ye = E.getParameter(T.UNPACK_SKIP_ROWS), ut = E.getParameter(T.UNPACK_SKIP_IMAGES);
      E.pixelStorei(T.UNPACK_ROW_LENGTH, ie.width), E.pixelStorei(T.UNPACK_IMAGE_HEIGHT, ie.height), E.pixelStorei(T.UNPACK_SKIP_PIXELS, SA), E.pixelStorei(T.UNPACK_SKIP_ROWS, UA), E.pixelStorei(T.UNPACK_SKIP_IMAGES, FA);
      const Nt = w.isDataArrayTexture || w.isData3DTexture, qA = R.isDataArrayTexture || R.isData3DTexture;
      if (w.isDepthTexture) {
        const se = y.get(w), dt = y.get(R), JA = y.get(se.__renderTarget), pi = y.get(dt.__renderTarget);
        E.bindFramebuffer(T.READ_FRAMEBUFFER, JA.__webglFramebuffer), E.bindFramebuffer(T.DRAW_FRAMEBUFFER, pi.__webglFramebuffer);
        for (let zt = 0; zt < gA; zt++)
          Nt && (T.framebufferTextureLayer(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, y.get(w).__webglTexture, U, FA + zt), T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, y.get(R).__webglTexture, rA, te + zt)), T.blitFramebuffer(SA, UA, lA, pA, BA, ZA, lA, pA, T.DEPTH_BUFFER_BIT, T.NEAREST);
        E.bindFramebuffer(T.READ_FRAMEBUFFER, null), E.bindFramebuffer(T.DRAW_FRAMEBUFFER, null);
      } else if (U !== 0 || w.isRenderTargetTexture || y.has(w)) {
        const se = y.get(w), dt = y.get(R);
        E.bindFramebuffer(T.READ_FRAMEBUFFER, k), E.bindFramebuffer(T.DRAW_FRAMEBUFFER, G);
        for (let JA = 0; JA < gA; JA++)
          Nt ? T.framebufferTextureLayer(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, se.__webglTexture, U, FA + JA) : T.framebufferTexture2D(T.READ_FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, se.__webglTexture, U), qA ? T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, dt.__webglTexture, rA, te + JA) : T.framebufferTexture2D(T.DRAW_FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.TEXTURE_2D, dt.__webglTexture, rA), U !== 0 ? T.blitFramebuffer(SA, UA, lA, pA, BA, ZA, lA, pA, T.COLOR_BUFFER_BIT, T.NEAREST) : qA ? T.copyTexSubImage3D(wA, rA, BA, ZA, te + JA, SA, UA, lA, pA) : T.copyTexSubImage2D(wA, rA, BA, ZA, SA, UA, lA, pA);
        E.bindFramebuffer(T.READ_FRAMEBUFFER, null), E.bindFramebuffer(T.DRAW_FRAMEBUFFER, null);
      } else qA ? w.isDataTexture || w.isData3DTexture ? T.texSubImage3D(wA, rA, BA, ZA, te, lA, pA, gA, GA, me, ie.data) : R.isCompressedArrayTexture ? T.compressedTexSubImage3D(wA, rA, BA, ZA, te, lA, pA, gA, GA, ie.data) : T.texSubImage3D(wA, rA, BA, ZA, te, lA, pA, gA, GA, me, ie) : w.isDataTexture ? T.texSubImage2D(T.TEXTURE_2D, rA, BA, ZA, lA, pA, GA, me, ie.data) : w.isCompressedTexture ? T.compressedTexSubImage2D(T.TEXTURE_2D, rA, BA, ZA, ie.width, ie.height, GA, ie.data) : T.texSubImage2D(T.TEXTURE_2D, rA, BA, ZA, lA, pA, GA, me, ie);
      E.pixelStorei(T.UNPACK_ROW_LENGTH, Oe), E.pixelStorei(T.UNPACK_IMAGE_HEIGHT, kA), E.pixelStorei(T.UNPACK_SKIP_PIXELS, Ue), E.pixelStorei(T.UNPACK_SKIP_ROWS, Ye), E.pixelStorei(T.UNPACK_SKIP_IMAGES, ut), rA === 0 && R.generateMipmaps && T.generateMipmap(wA), E.unbindTexture();
    }, this.initRenderTarget = function(w) {
      y.get(w).__webglFramebuffer === void 0 && H.setupRenderTarget(w);
    }, this.initTexture = function(w) {
      w.isCubeTexture ? H.setTextureCube(w, 0) : w.isData3DTexture ? H.setTexture3D(w, 0) : w.isDataArrayTexture || w.isCompressedArrayTexture ? H.setTexture2DArray(w, 0) : H.setTexture2D(w, 0), E.unbindTexture();
    }, this.resetState = function() {
      z = 0, X = 0, L = null, E.reset(), uA.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return li;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(A) {
    this._outputColorSpace = A;
    const e = this.getContext();
    e.drawingBufferColorSpace = OA._getDrawingBufferColorSpace(A), e.unpackColorSpace = OA._getUnpackColorSpace();
  }
}, _r = `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uDetachedTension;
  uniform float uRadius;
  uniform float uMaxAngle;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;
  uniform float uEntranceScaleProgress;
  uniform float uPreEntranceProgress;
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
    float preEntrance = smoothstep(
      0.0,
      1.0,
      clamp(uPreEntranceProgress, 0.0, 1.0)
    );
    base.xy *= mix(1.0, 0.6, preEntrance);
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
    // Pulling a detached sheet taut unfolds the curl without turning the
    // sticker back over. Reflecting it across the peel front keeps the back
    // face toward the viewer when the sheet becomes flat.
    vec3 tautBack = base;
    tautBack.xy += direction * (2.0 * arcDistance);
    curved = mix(curved, tautBack, clamp(uDetachedTension, 0.0, 1.0));
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
    vec3 curledNormal = normalize(vec3(direction * sin(angle), cos(angle)));
    return normalize(mix(
      curledNormal,
      vec3(0.0, 0.0, -1.0),
      clamp(uDetachedTension, 0.0, 1.0)
    ));
  }
`, kf = `
  ${_r}
  #include <common>
  #include <shadowmap_pars_vertex>

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;
  varying float vShadowReceiverProximity;

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
    float receiverDistance = max(along - front, 0.0);
    float receiverShadowReach = max(effectiveRadius * 1.6, receiverFeather * 3.0);

    vLift = max(deformed.z, 0.0);
    vCurl = peelMask
      * sin(clamp(normalizedArc, 0.0, 3.14159265))
      * (1.0 - clamp(uDetachedTension, 0.0, 1.0));
    vAdhered = mix(
      1.0,
      smoothstep(front - receiverFeather, front + receiverFeather, along),
      activePeel
    );
    vShadowReceiverProximity =
      activePeel
      * (1.0 - smoothstep(
        receiverFeather,
        receiverShadowReach,
        receiverDistance
      ));

    vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormalView = normalize(normalMatrix * localNormal);
    vec3 transformedNormal = vNormalView;
    vec4 worldPosition = modelMatrix * vec4(deformed, 1.0);
    #include <shadowmap_vertex>
    gl_Position = projectionMatrix * viewPosition;
  }
`, ed = `
  ${_r}

  uniform vec2 uShadowDirection;
  uniform float uShadowDistance;
  uniform float uShadowLiftScale;

  varying vec2 vShadowUv;

  void main() {
    vShadowUv = uv;
    vec3 deformed = deformSticker(position);
    vec4 worldPosition = modelMatrix * vec4(deformed, 1.0);
    float projectionDistance =
      uShadowDistance + max(deformed.z, 0.0) * uShadowLiftScale;
    worldPosition.xy += normalize(uShadowDirection) * projectionDistance;
    worldPosition.z = -0.004;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`, Wf = `
  uniform sampler2D uMap;
  uniform sampler2D uPreparedMap;
  uniform float uPreparedMix;
  uniform vec2 uTexel;
  uniform float uEdgeFinishScale;
  uniform float uEdgeBevelWidth;
  uniform float uEdgeFinishStrength;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;
  uniform vec3 uLightDirection;
  uniform float uLightIntensity;
  uniform float uAmbientLight;
  uniform float uLightSoftness;
  uniform float uMaterialType;
  uniform float uMaterialIntensity;
  uniform float uMaterialScale;
  uniform float uHolographicGrain;
  uniform float uMaterialSeed;
  uniform float uMaterialBaked;
  uniform vec3 uHolographicColorA;
  uniform vec3 uHolographicColorB;
  uniform vec3 uHolographicColorC;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uSurfaceShadowEnabled;
  uniform float uEntranceSweep;
  uniform vec2 uEntranceAxis;
  uniform float uLaserCoreWidth;
  uniform float uLaserBandWidth;
  uniform float uLaserBandOpacity;
  uniform float uLaserBrightness;
  uniform float uLaserHighlightIntensity;
  uniform float uBackgroundRemovalDistortion;
  uniform float uRemovalDistortionRange;
  uniform float uRemovalDistortionStrength;
  uniform float uRemovalRippleDensity;
  uniform float uRemovalRippleSpeed;
  uniform float uInteractionHint;
  uniform float uInteractionHintRadius;
  uniform vec3 uInteractionHintColor;
  uniform float uTime;
  uniform float uPeel;
  uniform float uPreserveFrontColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;
  varying float vShadowReceiverProximity;

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

  vec4 artworkSample(vec2 uv) {
    vec2 safeUv = clamp(uv, vec2(0.0), vec2(1.0));
    vec4 artwork = texture2D(uMap, safeUv);
    if (uPreparedMix > 0.0) {
      artwork = mix(
        artwork,
        texture2D(uPreparedMap, safeUv),
        uPreparedMix
      );
    }
    return artwork;
  }

  vec3 spectralPalette(float phase) {
    return 0.55 + 0.45 * cos(
      6.2831853 * (phase + vec3(0.0, 0.333333, 0.666667))
    );
  }

  vec3 screenBlend(vec3 base, vec3 layer) {
    return 1.0 - (1.0 - base) * (1.0 - layer);
  }

  vec3 holographicPalette(float phase) {
    float position = fract(phase);
    if (position < 0.333333) {
      return mix(
        uHolographicColorA,
        uHolographicColorB,
        position * 3.0
      );
    }
    if (position < 0.666667) {
      return mix(
        uHolographicColorB,
        uHolographicColorC,
        (position - 0.333333) * 3.0
      );
    }
    return mix(
      uHolographicColorC,
      uHolographicColorA,
      (position - 0.666667) * 3.0
    );
  }

  float previewGradientPhase() {
    float aspect = uTexel.y / max(uTexel.x, 0.000001);
    float aspectSquared = aspect * aspect;
    float horizontalWeight = aspectSquared / (aspectSquared + 1.0);
    return vUv.x * horizontalWeight
      + vUv.y * (1.0 - horizontalWeight);
  }

  float previewReflectiveOpacity(float phase) {
    float position = fract(phase);
    if (position < 0.25 || position > 0.78) return 0.0;
    if (position < 0.46) {
      return mix(0.0, 0.7, (position - 0.25) / 0.21);
    }
    if (position < 0.58) {
      return mix(0.7, 0.14, (position - 0.46) / 0.12);
    }
    return mix(0.14, 0.0, (position - 0.58) / 0.2);
  }

  vec3 applyFrontMaterial(
    vec3 base,
    vec3 normal,
    vec3 viewDirection,
    vec3 lightDirection,
    vec3 halfDirection,
    float finishActivation,
    float deformation
  ) {
    float kind = floor(uMaterialType + 0.5);
    // The default path is deliberately a no-op so it is pixel-identical to
    // Sticker Forge's front material before selectable finishes were added.
    if (kind < 0.5) return base;

    float amount =
      clamp(uMaterialIntensity, 0.0, 1.0)
      * clamp(finishActivation, 0.0, 1.0);
    float scale = max(uMaterialScale, 0.2);
    vec2 detailUv = vUv * scale;
    float facing = max(dot(normal, viewDirection), 0.0);
    float directLight = max(dot(normal, lightDirection), 0.0);
    float materialLight = clamp(
      uAmbientLight + directLight * uLightIntensity,
      0.0,
      1.65
    );
    float ndh = max(dot(normal, halfDirection), 0.0);
    float edge = pow(1.0 - facing, 3.0);
    float grain = hash21(detailUv * 913.7 + uMaterialSeed * 71.3) - 0.5;
    float fineGrain = hash21(detailUv * 2471.0 + uMaterialSeed * 131.0);
    float sharpSpec = pow(ndh, 72.0);

    // Diffractive holographic film.
    if (kind < 1.5) {
      // Keep the diffraction bands anchored to the undeformed sticker.
      // Match the gallery thumbnail's single, soft diagonal color wash. Light
      // and view changes move that wash without replacing the printed artwork.
      vec3 defaultLightDirection = normalize(vec3(-0.38, 0.52, 0.76));
      float holographicLightShift =
        dot(
          lightDirection.xy - defaultLightDirection.xy,
          vec2(0.32, -0.26)
        );
      float holographicViewShift =
        (1.0 - facing) * 0.12
        + vCurl * 0.08;
      float phase =
        (previewGradientPhase() - 0.5) * scale + 0.5
        + holographicLightShift
        + holographicViewShift;
      vec3 rainbow = holographicPalette(phase);
      float broadSpec = pow(ndh, 12.0);
      float lightStrength = clamp(
        1.0 + (uLightIntensity - 0.8) * 0.35,
        0.6,
        1.3
      );
      float holographicMix =
        0.24
        * amount
        * lightStrength;
      vec3 holographicBase = mix(
        base,
        rainbow,
        holographicMix
      );
      float frostGrain =
        hash21(detailUv * 1380.0 + uMaterialSeed * 113.0) - 0.5;
      float frostAmount =
        clamp(uHolographicGrain, 0.0, 1.0) * amount;
      holographicBase *= 1.0 + frostGrain * 0.22 * frostAmount;
      holographicBase = mix(
        holographicBase,
        vec3(0.92 + frostGrain * 0.16),
        abs(frostGrain) * 0.1 * frostAmount
      );
      float holographicHighlight =
        broadSpec * 0.1
        + sharpSpec * 0.16
        + vCurl * 0.035;
      holographicHighlight *= smoothstep(0.0, 0.18, deformation);
      return screenBlend(
        holographicBase,
        rainbow
          * holographicHighlight
          * amount
          * uLightIntensity
      );
    }

    // Glitter laminate.
    if (kind < 2.5) {
      vec2 cell = floor(detailUv * 115.0);
      float flake = hash21(cell + uMaterialSeed * 97.0);
      float orientation = hash21(cell.yx + uMaterialSeed * 43.0);
      float twinkle = pow(
        max(0.0, cos((orientation - dot(normal.xy, vec2(0.47, 0.83))) * 6.2831853)),
        18.0
      );
      float sparkle = smoothstep(0.91, 0.995, flake) * twinkle;
      vec3 sparkleColor = mix(vec3(1.0), spectralPalette(flake), 0.46);
      return base * (1.0 + grain * 0.04 * amount)
        + sparkleColor * sparkle * amount * 1.35
        + sharpSpec * 0.08 * amount;
    }

    // Retroreflective film.
    float retroAlignment = max(dot(lightDirection, viewDirection), 0.0);
    float retroCone = pow(
      retroAlignment,
      mix(10.0, 3.0, clamp(uLightSoftness, 0.0, 1.0))
    );
    vec3 defaultLightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    float reflectivePhase =
      (previewGradientPhase() - 0.5) * scale + 0.5
      + dot(
        lightDirection.xy - defaultLightDirection.xy,
        vec2(0.28, -0.22)
      );
    float reflectivePreview = previewReflectiveOpacity(
      reflectivePhase
    );
    float lightStrength = clamp(
      1.0 + (uLightIntensity - 0.8) * 0.5,
      0.5,
      1.4
    );
    float retro = reflectivePreview * lightStrength
      + retroCone
        * mix(0.42, 1.0, directLight)
        * smoothstep(0.0, 0.18, deformation)
        * 0.18;
    float beads = 0.78 + fineGrain * 0.28;
    float reflectiveLift = retro * beads * amount;
    return mix(base, vec3(1.0), clamp(reflectiveLift, 0.0, 0.78))
      + edge * 0.025 * amount * materialLight;
  }

  float interactionHitArea(vec2 uv, float centerAlpha, float radius) {
    vec2 hitOffset = uTexel * radius;
    vec2 diagonalOffset = hitOffset * 0.70710678;
    float sampledAlpha = min(
      min(
        min(
          texture2D(uMap, uv + vec2(hitOffset.x, 0.0)).a,
          texture2D(uMap, uv - vec2(hitOffset.x, 0.0)).a
        ),
        min(
          texture2D(uMap, uv + vec2(0.0, hitOffset.y)).a,
          texture2D(uMap, uv - vec2(0.0, hitOffset.y)).a
        )
      ),
      min(
        min(
          texture2D(uMap, uv + diagonalOffset).a,
          texture2D(uMap, uv - diagonalOffset).a
        ),
        min(
          texture2D(
            uMap,
            uv + vec2(diagonalOffset.x, -diagonalOffset.y)
          ).a,
          texture2D(
            uMap,
            uv + vec2(-diagonalOffset.x, diagonalOffset.y)
          ).a
        )
      )
    );
    return smoothstep(0.04, 0.28, centerAlpha)
      * (1.0 - smoothstep(0.08, 0.72, sampledAlpha));
  }

  void main() {
    vec2 surfaceUv = vUv;
    if (uBackgroundRemovalDistortion > 0.5 && uEntranceSweep >= 0.0) {
      vec2 scanDirection = abs(uEntranceAxis.x) > 0.5
        ? vec2(sign(uEntranceAxis.x), 0.0)
        : vec2(0.0, sign(uEntranceAxis.y));
      vec2 scanTangent = vec2(-scanDirection.y, scanDirection.x);
      float scanCoordinate = abs(uEntranceAxis.x) > 0.5
        ? (uEntranceAxis.x > 0.0 ? vUv.x : 1.0 - vUv.x)
        : (uEntranceAxis.y < 0.0 ? 1.0 - vUv.y : vUv.y);
      float tangentCoordinate = dot(vUv - vec2(0.5), scanTangent);
      float sweepCenter = mix(-0.3, 1.3, uEntranceSweep);
      float sweepDelta = scanCoordinate - sweepCenter;
      float distortionEnvelope =
        1.0 - smoothstep(
          uRemovalDistortionRange * 0.15,
          uRemovalDistortionRange,
          abs(sweepDelta)
        );
      float ripplePhase =
        tangentCoordinate * uRemovalRippleDensity;
      float rippleAcross = sweepDelta * uRemovalRippleDensity;
      float waterWaveA = sin(
        ripplePhase * 0.55
        + rippleAcross * 0.8
        + uTime * uRemovalRippleSpeed
      );
      float waterWaveB = sin(
        ripplePhase * 0.31
        - rippleAcross * 0.45
        - uTime * uRemovalRippleSpeed * 0.63
        + 1.7
      );
      float waterWaveC = sin(
        ripplePhase * 0.18
        + uTime * uRemovalRippleSpeed * 0.37
        + 3.1
      );
      float waterRipple =
        (waterWaveA * 0.58 + waterWaveB * 0.3 + waterWaveC * 0.12)
        * 0.0045
        * distortionEnvelope
        * uRemovalDistortionStrength;
      surfaceUv += scanTangent * waterRipple;
      surfaceUv +=
        scanDirection
        * (
          cos(ripplePhase * 0.42 + uTime * uRemovalRippleSpeed * 0.48)
          * 0.65
          + sin(ripplePhase * 0.23 - uTime * uRemovalRippleSpeed * 0.31)
          * 0.35
        )
        * distortionEnvelope
        * uRemovalDistortionStrength
        * 0.0016;
      surfaceUv = clamp(surfaceUv, vec2(0.001), vec2(0.999));
    }

    vec4 printSample = artworkSample(surfaceUv);
    float finishScale = clamp(uEdgeFinishScale, 0.75, 8.0);
    vec2 bevelOffset = uTexel * clamp(
      uEdgeBevelWidth * finishScale,
      0.5,
      24.0
    );
    float alphaLeft = artworkSample(
      surfaceUv - vec2(bevelOffset.x, 0.0)
    ).a;
    float alphaRight = artworkSample(
      surfaceUv + vec2(bevelOffset.x, 0.0)
    ).a;
    float alphaUp = artworkSample(
      surfaceUv + vec2(0.0, bevelOffset.y)
    ).a;
    float alphaDown = artworkSample(
      surfaceUv - vec2(0.0, bevelOffset.y)
    ).a;
    float innerAlpha = min(
      min(alphaLeft, alphaRight),
      min(alphaUp, alphaDown)
    );
    float edgeBand = smoothstep(0.06, 0.56, printSample.a)
      * (1.0 - smoothstep(0.1, 0.88, innerAlpha));
    vec2 inwardGradient = vec2(
      alphaRight - alphaLeft,
      alphaUp - alphaDown
    );
    vec2 outwardNormal = -inwardGradient
      / max(length(inwardGradient), 0.0001);
    vec2 edgeLightDirection = length(uLightDirection.xy) > 0.001
      ? normalize(uLightDirection.xy)
      : normalize(vec2(-0.65, 0.76));
    float directionalEdgeLight =
      dot(outwardNormal, edgeLightDirection);
    float edgeHighlight = pow(
      max(directionalEdgeLight, 0.0),
      1.35
    );
    float edgeShade = pow(
      max(-directionalEdgeLight, 0.0),
      1.2
    );

    if (printSample.a < 0.1) discard;

    vec3 surfaceNormal = normalize(vNormalView);
    vec3 viewDirection = normalize(-vViewPosition);
    float frontDeformation = clamp(vCurl * 0.82 + vLift * 0.48, 0.0, 1.0);
    float preservedFront = uPreserveFrontColor * (
      1.0 - smoothstep(0.025, 0.34, frontDeformation)
    );
    float signedFacing = dot(surfaceNormal, viewDirection);
    float frontMix = smoothstep(-0.035, 0.035, signedFacing);
    frontMix = mix(
      frontMix,
      step(0.0, signedFacing),
      preservedFront
    );
    vec3 normal = signedFacing < 0.0 ? -surfaceNormal : surfaceNormal;
    vec3 lightDirection = length(uLightDirection) > 0.0001
      ? normalize(uLightDirection)
      : normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float normalLight = max(dot(normal, lightDirection), 0.0);
    float lightLevel = clamp(
      uAmbientLight + normalLight * uLightIntensity,
      0.0,
      1.65
    );
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    float highlightExponent = mix(52.0, 18.0, uLightSoftness);
    float printHighlight =
      pow(max(dot(normal, halfDirection), 0.0), highlightExponent)
      * 0.068
      * uLightIntensity
      * mix(1.0, 0.68, uLightSoftness);
    float frontDiffuse = mix(
      1.0,
      lightLevel,
      0.18 + frontDeformation * 0.82
    );
    vec3 litFrontColor = printSample.rgb * frontDiffuse + printHighlight;
    litFrontColor += fresnel * 0.025;
    vec3 neutralFrontColor = mix(
      litFrontColor,
      printSample.rgb,
      preservedFront
    );
    float materialFinishActivation = mix(
      1.0,
      smoothstep(0.0, 0.22, frontDeformation) * 0.35,
      clamp(uMaterialBaked, 0.0, 1.0)
    );
    vec3 frontColor = applyFrontMaterial(
      neutralFrontColor,
      normal,
      viewDirection,
      lightDirection,
      halfDirection,
      materialFinishActivation,
      frontDeformation
    );
    frontColor = mix(
      frontColor,
      vec3(1.0),
      edgeBand
        * edgeHighlight
        * clamp(uEdgeFinishStrength, 0.0, 1.0)
        * 0.2
    );
    frontColor *= 1.0
      - edgeBand
        * edgeShade
        * clamp(uEdgeFinishStrength, 0.0, 1.0)
        * 0.12;

    float exponent =
      mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0))
      * mix(1.2, 0.42, uLightSoftness);
    float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
    specular *=
      mix(0.06, 0.3, uGloss)
      * (1.0 - uRoughness * 0.58)
      * uLightIntensity
      * mix(1.0, 0.72, uLightSoftness);
    float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
    vec3 backColor = uBackColor * mix(0.76, 1.0, lightLevel);
    backColor += specular + fresnel * (0.055 + 0.085 * uGloss) + satinBand + micro;

    vec3 color = mix(backColor, frontColor, frontMix);

    float projectedShadow =
      (1.0 - getShadowMask())
      * vAdhered
      * vShadowReceiverProximity;
    float peelShadowActivation = smoothstep(0.001, 0.035, uPeel);
    color = mix(
      color,
      uShadowColor,
      clamp(
        projectedShadow
          * uShadowOpacity
          * uSurfaceShadowEnabled
          * peelShadowActivation,
        0.0,
        1.0
      )
    );

    if (uEntranceSweep >= 0.0) {
      float sweepCoordinate = abs(uEntranceAxis.x) > 0.5
        ? (uEntranceAxis.x > 0.0 ? vUv.x : 1.0 - vUv.x)
        : (uEntranceAxis.y < 0.0 ? 1.0 - vUv.y : vUv.y);
      float sweepCenter = mix(-0.3, 1.3, uEntranceSweep);
      float laserDistance = abs(sweepCoordinate - sweepCenter);
      float laserCore =
        1.0 - smoothstep(0.0, uLaserCoreWidth, laserDistance);
      float laserHalo =
        1.0 - smoothstep(uLaserCoreWidth, uLaserBandWidth, laserDistance);
      float laserPhase =
        (sweepCoordinate - sweepCenter) * 3.6 + uEntranceSweep * 1.7;
      vec3 laserColor = 0.58 + 0.42 * cos(
        6.2831853 * (laserPhase + vec3(0.0, 0.33, 0.67))
      );
      color = mix(
        color,
        laserColor * uLaserBrightness,
        laserHalo * uLaserBandOpacity
      );
      color += laserColor * (
        laserCore * uLaserHighlightIntensity
        + laserHalo * uLaserBandOpacity * 0.347826
      );
    }

    if (uInteractionHint > 0.0) {
      float hitArea = interactionHitArea(
        vUv,
        printSample.a,
        uInteractionHintRadius
      );
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
      float innerLineWidth = max(2.0, uInteractionHintRadius * 0.09);
      float innerEdgeOuter = interactionHitArea(
        vUv,
        printSample.a,
        uInteractionHintRadius + innerLineWidth
      );
      float innerEdgeInner = interactionHitArea(
        vUv,
        printSample.a,
        max(0.0, uInteractionHintRadius - innerLineWidth)
      );
      float innerEdge = clamp(
        innerEdgeOuter - innerEdgeInner,
        0.0,
        1.0
      ) * (1.0 - edge);
      float dash = smoothstep(
        -0.22,
        0.22,
        sin((gl_FragCoord.x + gl_FragCoord.y) * 0.72)
      );
      color = mix(
        color,
        uInteractionHintColor,
        hitArea * 0.28 * uInteractionHint
      );
      color = mix(
        color,
        uInteractionHintColor,
        max(edge, innerEdge) * dash * uInteractionHint
      );
    }

    gl_FragColor = vec4(color, printSample.a * uOpacity);
    #include <colorspace_fragment>
  }
`, Xf = `
  uniform float uPeelDepth;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;

  varying vec2 vResidueUv;
  varying float vResidueReveal;

  void main() {
    vResidueUv = uv;
    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    float along = dot(position.xy - uOrigin, direction);
    float revealFeather = max(min(uMeshSize.x, uMeshSize.y) * 0.012, 0.004);
    float peeledArea = 1.0 - smoothstep(
      uPeelDepth - revealFeather,
      uPeelDepth + revealFeather,
      along
    );
    vResidueReveal = peeledArea * step(0.00001, uPeelDepth);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`, Yf = `
  uniform sampler2D uMap;
  uniform float uOpacity;

  varying vec2 vResidueUv;
  varying float vResidueReveal;

  float residueNoise(vec2 point) {
    point = fract(point * vec2(127.1, 311.7));
    point += dot(point, point + 19.19);
    return fract(point.x * point.y);
  }

  void main() {
    float artworkAlpha = texture2D(uMap, vResidueUv).a;
    if (artworkAlpha < 0.1 || vResidueReveal < 0.001) discard;

    float grain = mix(0.82, 1.0, residueNoise(vResidueUv * 760.0));
    float residueAlpha = artworkAlpha * vResidueReveal * grain * 0.085;
    gl_FragColor = vec4(vec3(0.34), residueAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`, Kf = `
  ${_r}

  varying vec2 vDepthUv;

  void main() {
    vDepthUv = uv;
    vec3 deformed = deformSticker(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`, Jf = `
  uniform sampler2D uMap;
  varying vec2 vDepthUv;

  void main() {
    float artworkAlpha = texture2D(uMap, vDepthUv).a;
    if (artworkAlpha < 0.04) discard;
    gl_FragColor = vec4(1.0);
  }
`, qf = "data:audio/mpeg;base64,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UQCH0q01oGmnLht0AgjKHjedpdG/krlVFsiA60xsCOJAJGxQuctRBikVDCbaTUEF7DKXioqWTRMvieniNKzXbJ6NvOpKCgDxTTANikDcLwMN8CzIFjAfQHyARlBkVDZE5GJFwIIxIJyQfAOQCYCCcDBODEhAIyg2gFKQfNeshgoqDChdrP15//3v85///rrojcHrwn0eMNntU1Rsg88/YYvkE//7nMy//HEVLmXZQCAAAbVTAQmCCEoRa7S0SGUTSCFcrJUbr1BWmTqTNpmJsUw7wFJMnQgms6ssYNkEwC2N1DkOK5nhuNHNPqsyBYo0Vcq5muk0rVtDRXZ8mmJENNkZThQ9cqa7Evt6eQobp2H/+5LEMoAhRhFMmYeAAz2wLj8w8ADMeYQ5CyEpBvLgIEdY2SFGchpdi9K57cqgaRKUugS7k7EHLgoUAkFadBvkob0k/YkdRdKKxxGuJjKJwonEvhYlaczezIcX9aLehZ/s6NY4qAXmk5WtDmZhZYV4J2pVvUT0Q414AjyFOZ7D6Rl2CLK2nAuz6U101Taof2k1lTR5ewul00VgQqGTG4tMH///////////saaaluT///////////q5zk1d3dxkxcPURDtt8miWQiW17cAsRoaRSkmOPkgWLCa63i69KoM3ao8gMAMAHqGmW8slSaaOEcLqOc9BbRIC4Cbk7OtVLsekeMdJni7OhOeCn04wriKac8JvSScVbgwKCBEljRWWdhv3kWj7xP3jyIxwW672RktWl3mqIXe6rxzTUceKxqBTN7AuntsUpi1s70z70h6Hs6GKyJam2uVacWeeBPesbWYcCDWPqPnMTV3jJEfv7vHlI8N+7dNMd6wwHF5L9OLXaDDawAiElSf//AKltttttciUSiSJRJBIKKlIloqtQhUVMrQN//uSxAwAGS2VabmHgBsesWx3MYADBaA20IArpwV3FzC9DVIumsfwk6H4AhjWSBklxujILxbXkJP9kUTTAbUPgRrOacVK5bEIVLArDuZYM0JsljVXRpVmu/fxFer4MVlVsmVxMzWYltFK9csTpONrYpYT5igOS4a6M2JbVcZnl77zOz2iPLNvfMU7LNqLLF0+vBe1g2pEeRLut0xS0img+TMXeqq1iznP8JVWxSl7pyBL4je513msKLNtcLmKwsV7wp2uSCuoUT0kizlSiUSIIBAA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yRlBLhYGgLd9+38EiTWIMZ09+TzAAV4ZQFSSZgFGhccLCJrrYDKv5/////////////////yCBN9////////////////W64MsCKTcSSAeIK4nY6UwrXGqYs1MckZOqA8YO+sqtlueq9v/Ha8NK9F21jn/+5LEsoAngg8Y2PyAAoszZG+ewAG1Wo4Phk6XfD9DJ5aeuxZdv48YhhWk0xMS6uv8P8zafOrR/ZpHlsaOoGvddaeTNWfXm30axw4+zSx1aYh6TaPLjJbTk6UkmJ6691IW25epl08nKW0Dzh8TicISFEOo6oy6VTEmiS6erX77WKJ1a5b9vq7HIGmv3auulQU2o0QgHgjGgeAVoKiEoVsUA2K562c+h36Gu7uzt+96n97K+BaurHl9a3Z5bAWzNQV1yH8DCxdaJYvPF2x3j1G+8kO2N+q6J5Gy8WT51UgD/Gsu7T59mq9ktxJYWYT41H5YW1DZ0lJLXITrCXUqGcVcfWIyavhV5TdlpmT4SRKJJK6i+ygjmK4OzAljocjsTSVy7oUi5b8CZew/B0bD9LX62fOrH/AIAAAALzoVIGAYsQ0AAZ7XvQnJ1mWiqszaXue1UCBDwcld9balSKxcTKQWluLsU3dUaQDoODYEzl6ljWFAFhQcDSiBglDrVd11VjrJgNk6W67KdNNCcgqlSNAW8ph4Es+MtzTSdOVs7csQARIu//uSxImAFLGbJXSWAAT0weLXM6AACg6tyjih6AZhqYbSWauA78eEgRQUYw3FUDDZQk6ISxdhJAyYcOHiwhlLQYAbVp7zveztoRax32TyhgzXmJNbcIOQCIQXwMMIMsCTUL2EAEDE3ZRvdd4YchpmELrxllIoFbuzlVddrFGZp0uyuuGmxqquioA7ZEPauzdDmcg4Sgb7MuM1Rsx7v4YT0//+eSTTTWHS3z/9St2t9/0a1nNdVTMwGWSjneldO4Zc8vWWQLsb////////////////////////////////////+BHX6rV0+HAGAAImYEKOGTDqxwAcQgGI2Cjw54qR+2uAQAsI3dN4DCoBTXMCBBABFVBWiizJQMDSDdNVF21oxeH18JWGAHJmGFFGCJyxMdl7Ny3jd11go2vhOUzgMMnGJZBw9ti5QsASUSMVgoXflip4eYWFwYADAYewMQkmGLUXSs0SCrTZIDhiO4cDf9NC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0ZOnULjZ60vEEKnO1en5xJYKRanqkuxIKLRosiRzm4dPc3Dkqd//3mXqt7VpqKoARlNOLMTRJGlFOz0aceZG5/s07xakiJxoEKLKPhyizCni1JGnFvV1dJpKkJY6ojUTODIKh4ugXSOnDp1JdScJw3YyVSThNJZNK6tY6cLJpKrEI0Hxg4dLHTh0oNjAeGyAnPEwpEQyMh4bICc8TCkiIipYqWKh4bGDhdRdJNIuUSXhOF1axxpRZRZQGBAR5l5v+TU1JxpwGJAjyCaKRpx1VVVMQf/7ksRSA9QloIJDJNtIAAA0gAAABE1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=", jf = "data:audio/wav;base64,UklGRpD2AABXQVZFZm10IBAAAAABAAIAgLsAAADuAgAEABAAZGF0YWz2AAD///3//v///wAA+//+/wEAAAD7//7//v//////AAD8//3/AAABAPv//P8AAAIA+//8/wEAAgD7//z///8CAP7//P/9/wMA/v/8////AgD9//7///8AAP7/AAD9//7/AAACAP7//f/+/wIAAAD+//3///8BAAIA/f/9/wAAAgD+//7/AQAAAP7/AAAAAP7//v8CAAAA/P///wEAAQD+//3///8CAAIA/P/8/wMAAwD9//v/AgAEAP7//P8AAAIAAgD///3///8DAAIA/v///wIAAgAAAAEAAQAAAP//AwAEAP////8FAAIA//8BAAQAAQABAAIAAgACAAMAAAABAAMAAwABAAIAAgACAAEAAwACAAEAAQAEAAMA//8BAAYAAgD//wIAAwABAAEAAwACAAAAAQACAAIAAQACAAEAAAACAAQAAQD+/wEABAACAP3/AAAHAAIA+////wcABAD+//3/AQAFAAMA/v/+/wIAAgAAAAEAAQABAP7/AAAEAAEA/f8BAAMAAAD+/wMAAgD9////BQABAP7/AAADAP//AAACAAAA/v8CAAIAAAD//wIAAQAAAP//AgAAAP//AAAEAAEA/v///wMAAgD///3/AgAEAAEA/P8AAAQAAgD9////AwACAP7/AAACAAEAAAAAAAAAAQAAAP//AQABAP//AQAEAP7//f8DAAIA/P8AAAMAAAD+/wMAAAD+/wIAAwD9////AwADAP////8AAAMAAgAAAP//AwABAAAAAgADAP7///8DAAUA///+/wIABAABAAEA//8CAAQAAQD+/wMABQAAAP//BAACAAAAAgADAAEAAgACAAIAAQACAAMAAgAAAAEAAwADAAIAAQAAAAMABQAAAP7/BQAGAP3///8IAAQA+/8BAAgAAQD9/wQABQAAAP//AwAEAAAAAQABAAEAAwADAP//AQADAAEAAAADAAAA//8DAAQA/v8AAAQAAgD9/wIAAwABAP//AQABAAIAAQABAAAAAgABAAEAAQACAAEAAAAAAAQAAgD//wEAAwACAAEAAQABAAIAAwACAP//AQAEAAMAAAADAAIAAQABAAMAAgADAAIAAQAAAAMABAACAP//AQADAAMAAQACAAEAAAACAAUAAgD+/wAABgADAP7///8GAAUA/v/+/wYABgD///3/AwAGAAMA//8BAAMABAADAAEAAAADAAQAAwAAAAMABAADAAEABAAEAAMAAAAEAAYABAD+/wMACAAGAP7/AwAGAAYAAQACAAQABgACAAIABAAGAAEAAwAFAAYAAgACAAMABwAEAAIAAAAFAAYAAwABAAUABQAEAAEABAAEAAUAAgACAAQABwABAAIABgAGAP//AgAGAAYAAgABAAEABwAGAAAA//8IAAUAAAABAAQABAAEAAEAAgAEAAQAAAADAAMAAgADAAUAAAABAAYAAwD+/wMABAACAAEABAACAAAAAwAEAP//AAAGAAQA/f///wgABAD8/wEABQABAAEAAwABAP7/BAAGAP///f8EAAYAAAD+/wIAAgACAAMAAQD+/wIABAABAP7/AAADAAMA///+/wIABAD/////AgABAP7/AQACAAAA/v8BAAIAAAD+/wIAAQD+//7/AwACAP///v8CAAEA///+/wIAAQD///7/AgACAAAA/P8BAAMAAAD8/wIAAwD///3/AwABAP////8CAAEAAAD//wIAAgABAP7/AQACAAIA/////wAAAwABAAEA//8AAAEABAD/////AQAAAP//BAACAP3///8FAAEA/v8AAAIAAQABAAAAAAABAAIAAAD//wAAAgAAAAAAAAAAAAEAAQAAAP//AAABAP//AAACAAAA/v8AAAEAAQAAAP7/AQACAAAA/v8AAAIAAAD+////AgABAP3/AAADAP7//P8DAAMA/P/9/wQAAQD8/wAAAwD+//3/AgADAP3//f8CAAIA///+////AAABAAEA/v/9/wEAAwAAAPz///8CAAEA/f/9/wIAAwD+//z///8FAAEA+//9/wQAAgD9//3/AwAAAP3/AAACAP7/AAABAAAA/P8BAAIA/v/9/wIAAgD///7/AgAAAP//AQABAP7/AQADAAAA/f8CAAIAAQABAP////8EAAIA/v8BAAQAAAD//wQAAQD//wIAAwABAAEAAQACAAIAAgABAAMAAQABAAIAAwAAAAIAAwAEAAAAAAAEAAUA//8AAAMABQABAAEAAQADAAIAAQABAAQAAgACAAAAAgADAAIA/v8CAAQAAgD//wMAAgAAAP//BQACAP//AAACAAIAAwAAAP//AAAEAAEA/////wMAAgD/////BAABAP//AAADAP//AAACAAIA/v8BAAEAAQABAAIA//8AAAAAAgACAAAA/P8CAAMAAAD//wIAAAD//wAABAAAAP7///8DAAAAAAAAAAAA//8BAAIAAQD9/wAAAwAAAPv/AQAFAP7//P8CAAIA///+////AQABAP7///8BAAAA/v8AAAEA///+/wAAAwD///z/AAACAP////////7///8DAP///f///wEA//////7/AAAAAP///f8AAAAA/v/+/wIA/v/8/wAAAwD8//v/AQADAPz//f8AAAAA/v/////////+//7///8AAP3///8AAP7//f8AAAAA/v/9//7/AAABAP7//f///wEAAAD9//7/AAD+//7/AQAAAPv///8CAP7//P///wAA///+//7///8AAP///f/+/wAA///9//7/AAD////////9////AQD///z//v8AAP7/AAAAAPz//P8BAAIA/P/6/wAAAQD+//v//v8BAP///P/9////AAD8//z///8AAP3//P///wIA/P/6//7/AQD8//z//v////z//v/9/////f/8//z/AQD+//r/+v8BAP7//P/7/////v/9//r///////v/+f8AAP///P/6//3//v////n//P/+////+//8//z//v/+//z/+f/+/////v/8//3/+//9//7////6//v//f8AAPz/+//7/wAA/v/8//v////8//z//f////z//f/9/wAA/P/7//z/AQD///z//P8AAP7//v/8//7//v8AAP7//P/9/wIA///7//z/AgD///7//f///////v/9/wAA//////7///8AAAEA/f/9/wEAAAD8/wAAAQD///3/AQAAAP///f/+/wEAAQD8////AgD+//3/BAAAAPr///8EAP3//f8BAAAA/v//////AAABAP///f///wIAAQD8//7/AQAAAP////8AAAAAAAD+////AgAAAP3///8CAAAA/v8AAAAA//8AAAAA/////wEA///+/wEAAAD///////8BAAAA/v///wAAAAAAAAAA/v///wEA//////////8BAAAA/f///wIA/////wAAAAD//wEAAQD///7/AAABAAIA///9////BAACAP7//v8BAAEAAgD///3///8FAAMA/f/7/wMABgAAAPr/AQAEAAAA/v8DAAEA/P8BAAQA/v/+/wMAAQD9/wAAAgD/////AQD/////AQACAP///f8AAAMAAAD9/wAAAwAAAP7///8AAAIAAgD9//3/AwACAP3/AAACAP///v8CAAEA/////wEA//8CAAEA/f///wUAAAD9/wAABAD/////AQABAP//AQABAAEA//8AAAAAAgD/////AQABAP//AQAAAP////8EAP///P8BAAYA///7/wAABgD///z/AQAEAP7//v8CAAIA/v8AAAAA//8BAAMA/v/9/wEABAD///7///8BAAAAAgD///7/AQADAP7//v8AAAMAAAD///7/AwABAP7///8CAP//AAABAAAA/v8CAAAA/////wIA/////wAAAQAAAAAA/f8BAAMA///7/wIAAgD+//3/AgABAAAA/v//////AgAAAP///f8AAAIAAgD9//3/AQADAP7//v8BAAEA/v8BAAEAAAD//wEAAAD//wAAAQD//wAAAQAAAP//AgAAAP7/AAACAAAAAAAAAAAAAQABAP//AAACAAAA//8CAAEAAAAAAAAAAQABAAIA///+/wIABAD+//3/AgADAAAA//8AAAIAAQAAAP7/AQADAP///f8DAAMA/v/9/wQAAQD+/wAAAgD/////AgACAP3/AAADAAEA/v8AAAEAAQD//wAAAQACAP///v8CAAMA/f///wMAAAD+/wMAAgD9////AwABAP///f8BAAMAAQD8////AgABAP//AAD//wAA//8BAAEA/v/8/wMAAwD9//3/AwD///7//v8BAP//AAD+//7/AAACAPz//v8AAAAA/P8BAAAA/v/7/wEAAAD+//3////9/wAA//////v///8BAP//+v/+////AAD9//7//P/////////7////AAD+//r/AAAAAP7/+//+////AgD9//v///8DAPz//P8AAAEA/P8AAP///f/+/wIA///+//7/AQD+/wAA////////AAD//wIA///+////AwAAAP////8BAP//AQAAAAAA//8BAAIAAQD+/wAAAQACAP//AQABAP////8EAAIA/P/9/wYAAwD9//7/AwACAAAA/v8AAAEAAgAAAAAA//8BAAIAAQD+/wAAAgAAAP7/AgACAP///v8BAAEAAAAAAAEA/////wEAAQD//wAA/////wIAAQD//wAAAQD+/wAAAwAAAP3/AAABAAIAAAD/////AwABAP////8BAP//AQABAAAA//8DAAAAAQAAAAAA/v8CAAEAAgAAAAAA/v8FAAIA/f/+/wYAAQD+////BQAAAP//AAAFAP////8CAAMA/f8DAAIAAAD//wQAAAAAAAEAAgD+/wIAAQABAP//AgAAAAIAAAACAP//AAAAAAMAAAAAAP//AgAAAAIA//8AAAAAAwAAAP///v8DAAAAAAAAAAIA/v/+/wEABAD+//3///8EAAEA/v/+/wMAAQD/////AgD//wEAAQABAP//AQABAAIA/v///wMABQD9//7/AwAFAP7//P8CAAYAAAD9/wEAAwD//wIAAgD+////BQACAP7/AAADAAEAAgAAAAAAAgACAP//AgADAAEA//8DAAMAAAD//wIAAgADAAAAAQADAAMA//8BAAIAAgAAAAIAAQADAAEAAAABAAQA//8AAAQABAD9/wAAAwACAP//AgABAAAAAQAEAAAA/v///wIAAgACAP3//v8CAAQAAAD+////AQABAAIA///9//7/BAADAP7//f8BAAIAAgD+//7/AQADAP///v8BAAIAAAD//wAAAgAAAP//AgACAP3///8EAAIA/v///wEAAgACAAAA/v8BAAQAAAD9/wIABAD+//3/BAAEAP////8AAAEAAgACAP7///8DAAIA//8AAAAAAQACAAEA/f8CAAQA///+/wIAAgABAAAAAAABAAIA//8BAAQAAQD9/wIABAAAAPz/AgAFAAAA/f8DAAQA/v///wUAAQD9/wEABgD///3/AwAEAP3///8GAAIA+/8CAAUAAQD+/wEAAAACAAEA/////wUAAgD9//7/BgADAPv//P8HAAQA/f/9/wQAAQABAAEAAAD+/wIAAgACAP7/AAADAAMAAAAAAAAAAgAAAAIAAQABAP//AQADAAIA/f8AAAIAAwAAAAAAAAAAAAEAAwD///7/AQAEAAAA/f8BAAMAAAD//wAAAQABAAEA//8AAAMAAAD+/wEAAgD//wEAAgD/////AwABAAAAAQAAAP//BAADAPz//v8GAAQA/v/9/wMAAwD/////AgACAAAAAAADAAEA/////wEAAgABAAAAAAAAAAIAAAABAAEA/v8AAAMAAAD9/wEAAgD+////AgAAAP////8BAAAA//8BAP///f8BAAIA/v/9/wIAAQD+/wAAAQD9////AgAAAPz/AAACAAAA/v///wAAAAABAAAA/P8AAAMAAQD8//7/AgABAP//AAD9////AwADAPz//P8DAAMA/v/+/wAAAgABAP///v8BAAIA///9/wIAAgD+////AgAAAP//AQAAAAAAAgAAAP7/AAABAAEAAgD///z/BAAGAP3/+v8EAAUA/f/+/wMAAAD+/wEAAgD///7/AQABAP///v8AAAAA//8AAAEA/f/+/wEAAQD8//3/AgACAPz//f8CAAEA/P///wAA/v/8/wIAAQD8//z/AQAAAP7//f8AAP///v/+/wAA/f/8////AwD9//r//v8DAP//+//9/wEAAAD9//3/AAD///3//v8AAP///f/8////AAD+//3///8AAP7//f/+///////9//3///////7////+//z///8CAP//+//+/wEA/v/+/////f/+/wIAAAD7//7/AwAAAPz//f8BAAEA/v/+/wAAAQD///7///8CAAAA/f///wIAAQD/////AAD//wEAAQD///3/AQADAAEA/v///wAABAABAP3//v8FAAIA/f8AAAQAAAD+/wAAAwACAP///v8DAAMAAAD//wEAAQABAAAA/v8BAAUA///6/wQACAD8//n/BgAGAPr//P8GAAMA/f///wIAAQAAAP//AAAAAAAAAAABAP7//v8BAAIA///9////AgAAAP7//v8BAAAA//8BAP///v8BAAEA/v///wEA/////wEAAAD+/wAAAAAAAAAA/v/+/wIAAwD9//v/AgADAP3//f8CAAEA/v8AAAEA/v/+/wIAAAD9////BAABAP3///8CAAAAAAD//wEAAAD//wAAAwAAAP7/AQADAP//AAAAAAEAAAAAAAEAAwD/////AgADAP7/AAABAAEAAAACAAEAAQAAAAAAAQADAP////8BAAIAAAABAAEAAQAAAAEAAQAAAP//AgADAP///v8DAAIA/v8AAAIAAAAAAAIAAgD//wAAAgACAAAA/v8BAAQAAAD9/wIABQD///7/AwACAP7///8DAAEA//8BAAEAAAACAAEA/v8AAAMA//8AAAIA///+/wMAAQD//wAAAQAAAAIAAQD+//7/AwAEAP///P8DAAUA///8/wEAAwACAP///v8BAAUAAAD8/wAABQAAAP7/AgACAP7/AAACAAEA/v///wIAAwAAAP7/AQABAAAAAQD///7/AgAEAAAA/f///wIAAgD///3/AAACAAAA//8BAAEA/v///wEAAAAAAAAA/v/+/wMAAgD9//7/AgABAP7///8AAP//AAAAAAAAAAD+//7/AwABAPv//v8DAP7//v8BAP///P8BAAIA/f/8/wEAAQD9//3/AQD///3///8BAPz//v8AAP7//f8AAP///v/+/wAA/v///////v///wEA/P/9/wEAAwD8//v/AAAEAP///P/9/wMAAQD8//z/BAABAPz///8EAP///P8BAAMA/v8AAAIAAAD//wIAAgD///7/AgADAAEA//8AAAMAAgD+/wAABAACAP3/AQAGAAEA/v8BAAIAAQACAAEAAAACAAIA//8BAAMAAQD//wIAAwABAP//AQACAAIAAAABAAEAAgACAAEA//8CAAMAAQD+/wIAAwAAAP//AwABAAAAAQABAAAAAwABAP//AAAFAAAA/f8BAAUAAAD+/wEABQAAAP7///8EAAIA//8AAAIA//8CAAIA///9/wMAAwABAP//AQAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAAD//wMAAAD//wEAAwD+//7/AQACAP//AAAAAAEAAAD//wAAAgD+//7/AQACAP/////+/wAAAwAAAPr///8FAAIA+v/+/wQAAgD8//7/AwABAPz/AQADAP///v8CAAIA/////wIAAAD//wIAAwD/////AwADAP7/AQADAAAA//8CAAUAAAD8/wIABgABAP3/AgAFAAAA//8EAAMA//8AAAMAAwAAAAEAAwACAAEAAgABAAAAAgAFAAAA//8EAAQAAQAAAAEAAgAFAAMA/v8CAAcAAwD+/wEABQAEAAEAAQACAAMAAgACAAIAAgAAAAQABQABAP//AwADAAAAAQAEAAEAAgACAAIAAAACAAMAAQD//wMAAgABAAAAAgACAAIAAAAAAAIAAwD//wAAAQACAAAAAQABAAEAAAABAAEAAQD//wAAAQADAAMA/v/9/wMABQD+//z/AwAEAP////8CAAIAAAD/////AgACAAAA//8AAAEAAgABAP///v8BAAEAAQABAP///v8CAAMA///9/wEAAgABAAAA/v///wIAAQD+////AQAAAP//AAAAAAAA//8AAAAA/v/+/wIAAgD8//3/BAACAPz//f8CAAEA/f///wIAAAD9/wAAAgD+//z/AQACAPz//v8DAAAA/P/+/wEAAAD9////AAAAAP////8AAP7//v8BAP///////////v8BAAAA/f/9/wIAAgD+//z/AAACAAAA+/8BAAQA/f/6/wQABAD8//v/AgABAAEAAAD9//3/BQACAPz//f8EAAEA///+/wEAAAAAAAAAAQD+/wEAAAAAAP7/AgAAAP3//v8FAP///P///wMA///////////+/wIAAAD+//3/AQAAAAAA/P///////////wAA/v///wAA///+/wEA///8//7/AgAAAP3//v8BAAEA/f/+/wEA///9////AgD+//v/AgADAPv/+/8DAAIA/P/9/wEA/////wAA/v/9/wAAAAD////////+////AAABAP3//P8AAAMA///7////AAD+////AAD+//3/AAABAP7//P8BAAMA/P/8/wIAAgD9//7//////wIAAAD7////BAAAAPz/AAABAP7/AAABAP7///8CAP///f8BAAIA/v///wEAAQAAAAEA/v///wIAAgD/////AAACAAEAAAD+/wEAAgABAP7/AAACAAMA/v///wIABAD/////AAADAAEAAQD+/wIAAwADAP3///8DAAUA/f///wIABAD//wEAAQACAP//AgABAAIA/v8CAAEAAgD//wMAAQAAAP//BAABAAAA/v8DAAEAAQD+/wAAAwACAPv/AQAEAAAA+/8CAAIA/v///wIA/f///wEAAAD9/wEAAgD///v/AQACAP7/+/8AAAIAAAD9/wAA/v/9/wAAAwD8//v/AgADAPv//v8AAP7//v8CAP///f/+/wEA//////3//v///wEA///+//z/AAABAP///P/+/wAAAQD+//3//f8CAAEA/P/7/wIAAgD9//z/AAAAAP7//v////7/AAD///3//v8AAAAA/v/+//3///8BAP7//P///wAAAAD9//3///////3///////7//f8AAP7//v////7/+////wEA///8//7///8BAP7//P/9/wEA///9//7/AAD+/////v////7/AAD+//3///8CAP3//P8AAAIA/v/+/wAAAAD+/wAA/v///wEAAAD9////AgACAPz//v8BAAEA///+/wAAAgD+////AQACAP7//f8CAAMA////////AAAAAAIA///+/wAAAwD///7/AgADAP3//v8CAAIA/v///wEAAQD+/wAAAAABAP7//////wEA//8AAP/////+/wAA//8AAP7//////wIA/f/9/wAAAgD8//3/AAABAP3////+/wAA/v8AAP7//v/9/wEA///+//z///8BAAIA+//7/wEABQD7//n/AAAEAP7//f/+/wAA//8BAP7//f/+/wIAAQD///z///8CAAEA/f8AAAIAAAD8/wEAAwD///3/AwADAP7//v8DAAIAAAD+/wAAAgADAP////8BAAMAAAD//wEAAgD/////AgADAP//AAAAAAAAAQABAP7///8BAAIAAAD/////AQAAAP7///8CAAAA/f///wMA/v/8/wEAAgD+//3/AAACAP///f///wIA///9/wEAAQD9////AQD/////AQD///7/AAABAP7//v8BAAEA/f/9/wEAAwD9//z/AgACAP3//v8BAP///f8BAAEA/v/+/wEAAgD+//z/AAACAAAA/P/+/wEAAQD+//7//////wAAAAD+////AQD///3/AAAAAP7//v8AAP///v8AAAAA/f/9/wAAAQD9//7/AAD+//3/AQAAAPz//f8BAAEA/f/7/wAAAgD///v//v8BAAAA/f/8/wAAAwD+//v///8CAP7//v/+////AQD///3///8CAP///P8AAAIAAAD8//3/AwADAPv/+/8EAAQA+//8/wQAAQD7/wAAAwD+//7/AQAAAP//AQD///7/AAACAAAA//8AAAEAAAD/////AgABAP7//v8EAAIA/f///wQAAAD+/wEAAgD+/wEAAQABAAAA//8AAAMA/////wEAAQD+/wMAAgD9//3/BQACAP7//v8EAAEA///+/wQAAQD+//7/BAABAAAA/v8CAAEAAgD//wEAAAABAP//AwD//wAAAAAEAAAAAAD+/wUAAgD///v/BgAFAP7//P8FAAEAAQABAAIA/f8EAAIAAAD//wMA//8CAAEAAAD//wQA///+/wEABQD+//7/AQADAP7///8AAAAA//8CAAAA/v/+/wIAAAD+//7/AgD///7///8AAP////////////8AAP///f/+/wAAAQD///z///8CAAAA+//+/wQA///7////AgAAAP7///////7/AAABAAAA/v///wEAAQD9//7/AgABAP3/AAACAAAAAAABAP7///8CAAIA//8AAAEAAQAAAAEA//8AAAEAAgAAAP//AAAEAAEA/f///wUAAQD+/wAAAgABAAEAAAAAAAEAAwAAAP7/AAADAAEA/v///wIAAQABAAAA/////wIAAQD+/wAAAQAAAAEAAAD//wAAAgAAAP7/AQABAP//AAAAAAEAAQD/////AQACAP////8BAAIAAAD+/wAABAACAP7///8CAAEAAQABAP//AAAEAAIAAAAAAAMAAgAAAAEAAwABAAAAAgADAAEAAgADAAAA//8EAAUAAAD+/wMABQABAAAAAgACAAIAAgACAAEAAAABAAMAAgD//wIAAwABAP7/AAACAAIA/v8AAAIAAgD+/wAAAQAAAP//AQAAAAEAAAABAP//AAAAAAEAAAABAP7/AAACAAEA/f8BAAEA/////wQA///8/wEABAD//wAAAAAAAAAAAgAAAAEAAQD/////BQADAP3//f8EAAQA///+/wMAAwABAP//AQADAAIA/v8BAAQAAQD+/wMABAD///7/BAADAAAAAAADAAAAAAABAAMAAAD//wEABQAAAP3/AgAGAP///f8BAAQAAQAAAP7/AgACAAAA//8DAAEA/v8AAAUAAQD9////BQABAP7/AAABAAEAAwD///7/AQAEAP///v8BAAIA/////wIAAgD9/wAABAAAAP3/AQAEAAAA/v8AAAMAAQD+/wAAAwAAAAAAAQAAAAEAAQD+////BAABAPv/AQAFAP///P8DAAIA/v///wMAAAD//wAAAgAAAP////8BAAAA/////wEAAAAAAP////8AAAAA//8AAP///////wAA//8BAP////8BAAAA/f8AAAEAAQD+//7///8DAAEA/v/+/wAAAgACAPz//f8EAAQA+//+/wUAAwD9////AQACAAEAAQD//wIAAgACAAEAAgD//wEABAADAP//AgADAAQAAQACAAIABAABAAIAAwAEAAAABAAFAAQA//8DAAYABQD+/wMABgAGAAEAAgACAAgABQABAAEACAADAAIABQAGAAAABgAGAAMAAQAHAAQAAwADAAUAAwAGAAMAAgADAAgABAABAAEABwAFAAEAAQAIAAUAAAACAAYAAgACAAMABQACAAMABAAEAAIAAgADAAUAAQACAAQAAwABAAMABAADAAIAAwACAAMAAwADAAMAAgAAAAQABQABAAAABQADAAIAAwAFAAAAAAAEAAYAAQAAAAMABQAAAAQABQD+//7/CAAGAP7///8FAAIAAgAEAAEA//8DAAMAAQAAAAIAAgACAAEAAAACAAMAAQD+/wAAAwADAAAA/v8BAAMAAQABAP//AAABAAIA//8AAAIAAQD9/wEAAwAAAP3/AgACAP///v8CAAEA///+/wEAAgABAP7///8AAAMAAQD9//z/AgAEAAEA/P/9/wMABgD8//v/AwAFAPv//P8EAAQA/f8AAAAAAAAAAAIA/v/+/wMAAgD6/wEABgAAAPn/AgAFAP///P8BAAAAAgABAP///v8DAAEA/v///wMA/////wIAAwD9////AgACAP7/AAACAAEA/v8BAAEAAAD//wEAAQABAAEA/v///wQA///+/wEAAQD+/wEAAgD+//3/AgAAAAAA////////AQAAAP///f8AAAEAAAD9/wAA/////wAAAAD8/wEAAAD9//3/AgD+//7/AAD+//v/AgAAAPz/+/8BAP///v/9////+//+///////8//7//v////z//f/9/wEA/f/7//3/AgD9//r//v8CAPv//f/+/////P/+//3//v/8/////f/+//3//v/7///////8//n/AwD9//n/+/8DAPv/+//9//7//P8AAPr//f/9//7/+v/+//3//v/7//7/+/////z//f/6/////v/9//n////+//7/+v/+//3//v/8//7//f8AAPv//P/+/wEA/P/7//3/AQD///7/+v/+/wAA///8//3///8AAP7//f/8/wEAAAD8//z/AAAAAP3//f8AAAAA/v/9////AgD+//v///8DAAEA/P/8/wIAAQD///7/AAAAAAAA//8BAP/////+/wEAAQD/////AQD//wAAAAABAP7/AAAAAAEAAAAAAP7/AgACAAAA/P8BAAIAAwD+//7/AAAEAAAA/v///wMA/v///wIAAgD9/wAAAAACAP//AAD//wEAAAACAP//AAD//wQAAAD+////BAAAAAEA//8BAAAAAwD//wAAAQADAP3/AgACAAEA/f8CAAIAAgD9/wEAAgADAPz///8DAAUA/P/+/wIABQD9////AQADAP7/AAD//wIAAAABAP7/AQAAAAIA/v8AAP//AAD//wIA//8AAP//AQD+////AAABAP3/AQACAP7//P8EAAEA+//+/wQA///+/wIAAAD8/wEAAgABAP3//v8BAAQAAAD8//7/AwABAP//AAABAP//AAACAAAA/P/+/wMAAgD+////AQABAP//AAD/////AAAAAAEAAQD+/wAAAgD///3/AgAAAP7/AQACAP////8AAAAAAQABAPz//v8DAAIA/f/+/wIAAQD+/wAAAQD///3/AgACAP3//v8CAAEA/f///wEAAAD+////AAABAP7//f8AAAIA/v/+/////////wIA///8//7/AwAAAP3//f8BAAAA///9/wAAAAAAAPz///8CAAEA/P/+/wAAAAD//wEA/v/+////AgD///7//f8AAAEAAQD+//7//v8BAAAA///9/wEAAAD+//7/AQAAAP///f///wAAAQD8//7/AAAAAP3//v8AAAAA/f////7/AAD///7//v8AAP7//f/+/wIA/f/8/wAAAgD9//z/AAABAPv//f8BAAEA+//8/wEAAQD8//3//v/////////8//7/AQD+//v/AAAAAPz//f8CAP//+//9/wIAAAD9//3///8CAAAA+////wQA///6/wIABAD8//z/BAAAAP3/AAADAP///////wEAAgABAPz/AAADAAEA/v8BAAEAAQABAAAA//8CAAAA//8BAAIA/v8BAAQA///8/wQABAD9//7/AwABAP7/AQACAP7/AAADAAAA/f8BAAMA/////wEAAAAAAAEA///+/wIABAD9//3/AwADAP3//f8BAAMAAAD9////BAAAAPv/AAAEAP//+/8AAAMAAAD+//7/AAABAP///v/+/wAAAgAAAPz//v8EAAIA+//8/wIAAwD+//z/AAABAAAA/////////v8BAAEA/v/9////AQAAAP3///8AAP////8BAP///P///wEA//////////////////8BAAAA/P///wMAAAD9//7/AAABAAAA//8AAAEA/v/9/wIAAgD+//3/AQAEAAAA/v8AAAAA//8BAAMAAAD8/wAABQADAPv//f8FAAQA/P///wQAAgD9////AgACAP7//v8DAAQA/f/9/wIABAD+//3/AQAEAAAA/v///wMAAQAAAP//AgABAP//AAACAP7/AQADAAAA/f8CAAMA///+/wIAAAAAAAEAAgD+/wAAAgABAP//AgAAAAAAAAABAAEAAgD+//7/AwAEAPz//v8DAAIA/v8AAAAAAAABAAIA/////wAAAwAAAAAA/v8BAAIAAQD//wEAAAABAAEAAQD9/wIAAgD/////AwD//wAAAgADAP3/AAABAAMAAQABAP//AwABAAIA//8DAAIAAAD//wUAAwAAAP//BQAAAAAAAgAFAAAA//8AAAUAAQABAAIAAgD+/wQABAABAP7/AwABAAIABAADAP3/AQADAAMAAAABAAEAAgABAAEAAQABAP//AgADAAAA//8DAAIA/v///wQAAwAAAP7/AQAEAAMA/f///wMAAwABAAAA//8AAAQAAwD8//7/BAAFAP///v8CAAMAAAABAAAAAgACAAEAAAADAAEAAQABAAIAAAACAAMAAQAAAAIAAgABAAAAAgACAP//AQADAAEAAAABAAEAAgADAAAA//8EAAMA/f///wYAAgD9/wAABQACAP//AAACAAEAAgAAAAAAAQADAAAAAAACAAIA//8CAAIA//8AAAQAAgD//wAAAwABAAEA//8AAAMAAQD//wMAAgD+////BAABAP3/AAAEAAIA/v/+/wMAAgD+//7/AgAAAAAAAQABAP3/AAADAAAA/P8BAAIAAAD9/wIAAgD///7/AwABAP///f8DAAEA/////wIAAAACAAAAAQD+/wEAAgACAP7/AgABAAEA//8CAAAAAgABAAAAAAAGAP///f8CAAUA/v///wQABAD8/wIAAwAAAP//BAAAAP7/AgAFAP7/AAAAAAIAAQABAP//AgAAAP//AgADAPz/AQADAAAA/P8DAAMA/f/9/wQAAQD+//7/AwABAP7//v8BAAAAAAAAAAEA/v/+/wIAAwD9//3/AQACAP//AAAAAP7/AAACAP////8AAAAAAAABAAAA/v8BAAEA//8BAAIA//8AAAIAAAD+/wIAAgD+//7/BQAEAPz//P8GAAUA/P/8/wUAAwD+/wAAAwD//wAAAwADAP3/AAAEAAIA/f8BAAMAAQD9/wIAAwAAAP7/AwACAP///v8BAAAAAQAAAP///v8DAAEA///+/wEAAAAAAP7/AAD//wAA//8AAP7/AAABAAAA+////wIAAQD9//7//f8BAAMA///5/wAABAD///z/AAD///3/AAADAPz//P8CAAEA/f///wAA/v/+/wIA///+////AAD//wAA//8AAP////8AAAIA///9/wAAAwD+//3/AQABAP7///8BAAAA//8BAP7//v8CAAEA/P/+/wMAAgD8//7/AwABAPv//v8DAP///P8AAAEA//////7//v8BAAAA/f/+////AQAAAP3//P8BAAIA/v/9/wAA//////7/AQD+//z/AAAEAP//+//9/wIAAQD///7/AAD/////AgABAPz//v8DAAIAAAD/////AQADAAEA/f///wQAAgAAAP//AAACAAIAAQAAAP//AAADAAQA/////wIAAgD//wEAAgABAAAAAAACAAMAAAD+/wIAAgD+////BAAAAP3/AQADAP7/AAAAAP//AAABAP3///8EAAAA+v8CAAQA/f/8/wMAAQD8//7/BAD///v/AAAEAP7//v8BAAAA/f8BAAAA/f/+/wIAAAD+//3/AgACAP3/+/8CAAMA/f/8/wMAAgD9////AwAAAP3/AAADAP7//v8BAAIAAAD/////AgABAP///f8BAAMAAQD8////BQADAP3///8BAAAAAgADAP3//v8FAAMA/P8BAAUA/v/8/wYABQD7//v/BgAGAP3/+/8CAAMAAQD+////AAADAAAA/f8AAAMA///+/wAAAgAAAAAA/////wAAAAD//wEAAAD+////AwAAAPz///8DAAAA/v8AAAEAAQAAAP7/AAADAAIA/v/+/wIAAwAAAP//AQABAAAAAQABAAAAAgAAAP//AgACAP//AAABAAEAAQABAAAAAgAAAP//AwABAP7/AQACAAAAAAABAP//AQACAP///v8BAAMA///9////AQABAAAA/v/+/wEAAwD///3///8BAAIA///8/wAAAQAAAAAAAAD9/wAABQD///j/AgAFAP3/+/8DAAIA/v/+/wAAAAACAP7//f8BAAMA/v/+/wIAAAD8/wIABAD9//v/AgAEAP///P8BAAEA/////wEAAAD+/wEAAgD/////AAABAAAA//8AAAEAAAAAAAAA///+/wIAAgD9//z/AgADAP//+v///wQAAgD6//z/AwACAPr//v8DAP//+/8BAAIA/v/6/wAAAgD+//n///8BAP7/+/8CAP7/+//+/wAA/P/9//7/AAD9//3//f8AAP//+//7/wIAAQD8//n/AAACAPz/+v8AAAEA/f/8/wAA///9//7/AAD+//z/AAACAP7//P///wEA///+//7///8BAAAA/f/+/wIAAgD9//v/AgAEAP7/+/8AAAUAAQD6////BQAAAPr///8FAAAA/P///wIAAQD+//3///8BAAAA/////wAA/////////v/+/wIAAAD7//7/AgD///3//f///wAAAAD9//7/AAD///3//v/9/wAAAQD8//r/AgADAPz/+f8AAAIA///7//7///8AAP///v/9/wAA///+////AgD8//z/AgABAPv///8BAAAA/f8AAAEAAAD9//7/AgACAPz///8CAAEA/f8AAAAAAAABAAIA/v///wAAAgAAAP///v8CAAEAAQD///////8CAAAA/v///wIAAAAAAP7///8CAAIA+////wQAAQD7/wEAAgD+//7/BAD///z/AAADAP///f///wAAAAD///7/AAD/////////////AAD+//7/AQAAAPz/AAABAPz//v8DAP7/+/8AAAMA/v/9////AAAAAP///f/+/wEAAQD9////AQAAAP3/AAABAP///v8BAP////8AAAIA/////wAAAQD//wEAAAAAAP//AgABAAAA//8CAAEAAAD//wEAAQABAAAAAQAAAAEAAgAAAP7/AQADAAAA/v8BAAIAAgD//wAAAgAAAAAAAwABAP7/AQAEAP///v8CAAIA//8AAAIAAQAAAAEAAQAAAP//AgACAP//AAACAAAAAAAAAAIAAAD//wAABAACAP3//v8FAAIA/v/9/wIABAABAP7/AQACAAIA//8AAAAAAgAAAAAAAgADAP////8AAAIAAQAAAP7/AQADAAMA///+////BgAEAPv//P8GAAUA/v/9/wMAAgACAAEAAAD//wMAAgAAAAAAAwABAAEAAQABAAEAAgAAAP//AwADAP////8CAAIAAAAAAAEAAQABAAEAAQABAAAAAAADAAIA/////wMAAwAAAP//AgACAAAA//8DAAIAAAAAAAIAAgABAAAAAQAAAAIAAgAAAAAABAADAP3//v8GAAUA/f/9/wUABAD/////AgADAAEA//8BAAMAAgD/////AwADAAAA//8CAAQAAAD+/wEAAwAAAP//AAACAAIAAAD+/wEABAAAAPz/AQAEAP///v8DAAEA//8AAAEAAQACAP///v8BAAMA//8AAAEAAgD/////AAADAAEA/f/+/wQAAgD+//3/AQADAAEA/P///wQAAwD7//z/AgAEAP7/+/8AAAUA///8/wAAAwD+//3///8BAP/////+/wAA////////AQD8//7/AQABAPz//v8AAP///v8BAP3//v8AAAAA/P8BAAAA/f/8/wEAAAD+//z/AAAAAP///v8BAPz//v8CAAAA+/8AAP///f///wQA/P/7/wAAAwD8//3///8BAPz///8AAP///P/+////AgD9//z//v8EAP3/+////wMA/v/9//7/AQD+/wAA//////z/AQACAAAA+/8AAAEAAQAAAP7//P8DAAIA///9/wEA//8BAAEAAAD+/wAAAAADAAEA/P/+/wUAAQD+/wAAAwAAAP7/AQACAAAA/////wIAAgAAAAAAAAAAAAAAAgABAAAAAAACAAIAAQD9/wEABAABAP7/AwADAAEA//8CAAEAAwAAAAIAAwADAP//AQACAAUA/////wQABQD+/wEABAADAP7/AwADAAIAAAADAAEAAgACAAMAAAABAAIABQD/////AwAFAP7/AAAEAAMA//8DAAIAAAD//wMAAQABAAEAAwAAAAEAAgADAP7/AQADAAIA//8BAAIAAgD//wEAAgADAP//AgACAAIA//8BAAIABAD//wAAAwAFAP7//v8DAAUA//8AAAAAAwADAAIA/v8AAAIABAACAAAA/v8EAAMAAQABAAMA//8CAAUAAgD9/wEABQAEAP7/AQAEAAIA//8DAAMA/v///wYAAwD+////BAADAAEAAAABAAEAAwABAAEAAQACAAEAAgABAAEAAQACAAAAAQACAAEA//8AAAIAAgD//wAAAQACAAAA//8AAAIAAQD///7/AgADAP///f8BAAMAAAD8/wAABAABAPz/AAAEAAAA/f8AAAEAAAD+/wAAAwABAP3///8DAAEA/f///wEAAQAAAP////8CAAEA/v///wIAAAD+/wEAAQD+/wEAAgD+//3/AgADAP7//f8BAAMAAQD9//7/AQABAAAA/////wAAAQAAAAAA/v///wAAAAD//wAAAAD/////AQD///////8AAAAAAAD//wAA/v/+/wAAAwD///3///8CAAEAAAD9//7/AAADAAEA/f/+/wIA//8BAAIAAAD8/wAABAABAP3///8BAAMAAAD//wEAAAD//wMAAQD9////BQAAAP3/AQADAP///v8BAAMA//8AAAIAAQD//wIAAQD+////BAABAP//AQADAP//AQABAAEA//8BAAEAAgAAAAAAAQADAP//AAAAAAEAAQADAP7///8EAAMA/P8BAAMAAAD+/wQAAAD//wMAAwD7/wEABAD///7/AwAAAAAAAgABAP3/AgABAP7/AAADAP7//v8DAAIA/f///wIAAQD//wEA//8AAAEAAAAAAAAA//8BAAIA///+/wMAAgD+////AgABAP7/AAACAAIA/v8AAAMAAQD+////AgACAP7/AAABAAEAAAAAAP//AQACAP///v8CAAEA/////wAA//8CAAEA/f///wMAAAD9////AgD/////AQAAAP7///8CAP///P8AAAIA/v/9/wEAAgD+//7//v8AAAEA///9////////////AQD///3///8CAAAA/f/9/wEAAAD+////AQAAAP7//v8BAAAA///+////AQAAAP7/AAACAP///f8CAAMA/v/9/wEAAwAAAP7/AAADAAAA/f8BAAMA/v/+/wIAAwD/////AAABAAEA///+/wMAAQD9/wAABQD///3/AgADAP3/AQADAP7//f8FAAMA/P/9/wUAAgD9//7/AwACAAAA/v8BAAEAAAD//wAAAAAAAAAAAQD/////AQACAP3//f8DAAQA/f/8/wEAAQD//wAA/////wEAAAD+/wAAAAD9////BAD///v/AAAEAP//+////wMAAAD+//7/AQABAAAA/f8AAAIAAAD9/wIAAQD+////AgAAAAAA//////7/BAACAP3//P8CAAMAAAD8/wAAAQAAAP7/AQAAAP7///8CAAAA/v///wIA/v/9/wEAAwD+//3/AQABAP7/AAAAAP7///8BAAAA/v///wAAAAD///7///8AAAEA///8/wAAAwAAAP3///8BAP////8AAP////8BAAAA/v8BAAIA/v/+/wEAAQD///////8AAAAAAQABAP///f8AAAMAAAD+/wAAAAD//wEAAgD+//7/AQABAAAA////////AQABAP7///8BAAEA///9/wEAAgD9//7/AgABAP3//v8BAAEAAAD+//7/AQAAAP7///////7/AQAAAP////8BAAAA/////wAA//8AAAAAAAD+/wEAAQD///7/AgD//wAAAQD///7/AgABAP7//v8BAAEAAQD+//7/AgACAP7///8CAAEA//8AAAAAAQABAP7/AAADAAAA/f8CAAMA/v/9/wMAAgD///7/AQABAAEA/////wAAAwAAAP3/AAAFAAAA/P///wQAAAD//wAAAQAAAAEA/////wAAAgD+////AwABAP3/AAACAAAA/f8AAAEAAQD/////AQACAP3//v8CAAMA/f/8/wEABQD///v//f8FAAMA/P/6/wMABQD+//r/AQADAAAA//8AAP7///8CAAIA/P/+/wIAAQD//wAA////////AgAAAP7///8BAAAA/v8AAAMA/P/9/wQAAgD6////BgD///n/AQAEAP7//P8BAAIA///+/wAAAAD///7/AQAAAP7///8BAP///v8AAAEA/v8AAP////8AAAAA/v8AAP///////wEA/f///wIAAQD7//7/AgACAP3//f/+/wQAAQD8//z/AwABAP7//f8AAAAAAAD9/wAAAAD///3/AgAAAP3//f8AAAAAAQD9//z/AAAEAP7//P///wIA///+//3/AAAAAP///v///wAAAgD9//z///8CAP/////+////AAABAP3///8AAP////8BAP///v///wIA///+////AQAAAP///P///wIAAQD8//7/AgABAP3//////wAA///+////AQD///7/AAABAP///v///wEA/v/8/wAAAgD+//7/AQD///3///8BAP7//P/+/wIAAAD7//7/BAD+//r/AAADAPz//P8BAAAA/f////7///8BAP7//P8AAAAA///9////AAAAAP3///8BAP//+/8AAAEA/v/9/wEAAAAAAP3//v8BAAAA+////wMAAAD6/wEAAgD+//3/AgAAAP7///8DAP7//v8BAAIA/P8AAAMAAQD7////AwADAP7//v///wQAAQD///7/AgACAAAA/f8CAAMAAQD9/wEAAwAAAP3/AwADAP///v8CAAMAAQD9/wAAAgADAP////8CAAIA//8AAAEAAgD//wAAAQACAAEA/f/+/wQAAwD+//3/AwACAAAA//8AAAAAAQD//wAAAQAAAP//AQAAAP//AAACAP7//f8CAAQA/P/9/wQABAD7//3/BAADAPz//P8BAAUAAQD7//7/BAABAP7//v8AAAEAAQAAAP////8AAAIAAgD+//3/AgAEAP///P8BAAQAAQD+/wAAAAACAAEA/v8AAAMAAAD//wIAAgD//wAAAgABAAAAAQAAAAEAAQAAAAAAAgABAAAAAAABAAEAAAAAAAIAAAD+/wAABAACAP3///8DAAIA//8AAAIAAQAAAAAAAQACAAEAAAAAAAIAAwABAP//AQADAAIAAAD//wIABQAAAP//AwAEAAAAAQADAAEAAAADAAIAAgACAAEAAAAEAAQAAAD+/wQABgABAP3/BQAFAAAA//8FAAMAAQABAAQAAgADAAEAAgABAAUAAwAAAAAABQACAAAAAgAFAP//AAAEAAUA/////wEABQACAAAAAAAEAAMAAQD//wIAAgACAAEAAgABAAIAAQABAAEAAQABAAEAAQABAAEAAgABAAAAAAACAAEA//8AAAIAAQD//wEAAwAAAP3/AQAFAP7//P8CAAUA///+/wEAAwAAAP//AAACAAAAAAAAAAEAAQABAP////8CAAIA/v///wIAAwD+//7/AgABAP//AgABAP7///8EAAIA/P/+/wUAAwD7//7/BQABAPz/AQADAAAA//8BAP//AAAAAAEAAAAAAP7/AgABAP///P8DAAIA///8/wAAAgADAP3//f///wYAAAD8//z/AgACAAEA/P///wEAAwD9//7/AQACAP3/AAABAAEA/f8BAAAAAAD//wIA/////wIAAwD8////BAADAPz/AAACAAAA//8CAP7///8DAAMA/f///wIA///9/wMAAQD9//3/BAACAP7//P8AAAIAAAD9/wAAAQD/////AgD9//7/AAAAAP7/AAD///////8AAP7/AAD///7///8BAP////////7//v8DAAEA+//9/wQAAgD8//7/AgD+//7/AQABAP3///8BAP7///8CAP7//f8BAAIA/v///wEA/////wAA//8AAAEA///+/wAAAQAAAP///////wAAAQD///3/AAACAAAA/f/+/wMAAgD8//3/AwADAPv//v8EAAEA/P/+/wMAAgD9//7/AgABAP7/AAABAP////8CAAAA/f8AAAMA///9/wAAAgD+////AgD///7/AQAAAP///v8AAAAA/v///wIA///9/wEAAQD+////AgD///3/AQABAP////8AAAAA//8CAAEA/f///wIAAQAAAP////8AAAMAAQD+/wEAAgD//wEAAgAAAP//AwABAAAAAgACAAEAAgD//wAABAADAP7/AAACAAQAAgD+//3/BQAEAP3///8EAAAAAAABAAEA/v8CAAIAAgD+/wAABAAEAPv///8FAAQA/P///wEABAADAP3/+v8FAAYA/f/7/wUAAgD+////AwAAAAEA/////wEABAD+//7/AgACAP7/AQACAP///f8CAAIAAAD//wAAAQACAP////8BAAIAAAAAAAEAAQAAAAAAAAACAAEAAAABAAMAAgAAAP//AQACAAIAAAACAAEAAAACAAUAAAD8/wIABwD///3/BAAGAP3//v8EAAQA/v8BAAMAAQAAAAQAAgD/////BAADAAIA//8AAAQABAD+//7/BQAGAP7//v8EAAMA//8BAAQAAQD+/wIABQD///7/AgACAAEAAwD///7/AwAEAP7//v8DAAIA//8AAAAAAgABAAAA//8AAAEAAAD//wEAAAD//wAAAgAAAP7/AAACAP7//v8BAAIA/v/+/wEAAQD///7///8DAAAA+/8AAAQA///9/wAAAQD+////AQAAAP///////wEAAAD///7/AAABAAAA/f/+/wIAAgD7//7/AwAAAPz/AQAAAP3///8BAP3/AAABAPz/+/8DAAIA/f/8//////8BAP7//f/+/wAA/f8AAAAA/P/6/wEAAwD///n//v8BAAAA/P/9//7/AAD+//7//v////3///////7//P8AAP/////+/wAA/f/9////AgD9//3//v8AAP//AgD9//v//v8EAP7//v////7//f8FAAEA+P/8/wkAAAD3//3/BwD///z///8CAP7//////wAA/v8BAAAA/v/+/wMAAAD+//3/AQABAAAA/v8AAAAA/////wIA/v/+/wEAAAD9/wIAAAD9//7/AQD/////AAD///7/AAD//wAA/v/9/wAAAgD+//3/AAAAAP//AAD///3///8BAAAA/v/9/wAAAQD///////8AAP7/AAABAP///f8BAAIAAAD8/wIAAwD+//z/BAADAP///P8DAAIAAAD+/wEAAQACAP//AAAAAAMA/////wEABAD//wEAAAABAAAAAwD//wAAAgADAP7///8DAAQA/P/+/wQABgD9//3/AwAEAP////8AAAIAAQACAAAAAAABAAIAAQAAAAAAAgAAAAAAAAADAAIA/v/+/wQABAD+//3/AwACAP//AAADAAEA//8AAAMAAAD//wEAAwAAAAAAAQACAP//AgAAAP//AgAEAP7//f8CAAQA/v/+/wEAAwAAAAAAAAABAP7/AQADAAAA/P8CAAMAAAD+/wAAAQACAP7//v8BAAMA/v/+/wIAAgD9/wAAAgAAAP7/AAAAAAIA///9////BQAAAP3/AQADAP7///8AAAAAAAACAP3//f8DAAQA/P/9/wEAAgD+////AAD/////AgD///7/AAAAAP7/AQAAAP3///8EAP7/+/8CAAMA/f/8/wIAAQD9////AAD+/wAAAAD///7/AAAAAAAAAQD+//z/AgAEAP7/+v8CAAQA/v/9/wEAAAAAAAAAAAD9/wEAAgD+//v/AgAEAP7/+v8BAAMA///8////AQABAPz//v8BAAAA/P///wEA/v/9/wEA///9//3/AQAAAP3/+/8AAAIA/f/6/wAAAAD///7//v/9////AQD+//v///8AAP///v/+//3/AAABAP3/+/8BAAAA/f/9/////v////3///8AAP7//P///////v/8//7/AQABAPv//P8BAAAA+f///wEA/f/8/wIA///7//3/AQD8//3/AAD///r///8BAP//+v/+/wAA/v/8/wAAAAD9//z/AQD///7//f////7///8AAAAA/P/9/wAAAgD8//3/AQAAAP3//////wAA/v/+//7/AAD//////v/+//7/AQD///7//P///wEA///8/wAAAAD+//3/AQD///7//v8AAP//AAD+/////v8AAP//AAD+/wAAAAD/////AAD+/wAAAAABAP7/AAAAAP7///8DAP///f8CAAQA/P/9/wQAAgD9/wAAAgAAAAAAAgAAAP3/AAAEAAEA/f8CAAMA/f///wUAAAD6/wEABQD+//7/AwD///3/BAACAPz//v8EAAIA/////wAAAAACAAEAAAD//wEAAwAAAPz/AgAFAP//+/8CAAUAAgD8////AwAEAP7//v8CAAMA//8BAAAAAgAAAAAAAAAEAAAA/v8CAAUA/v///wIAAgD//wIAAQAAAAAABAABAP///v8DAAMAAQD//wIAAQABAAEAAwD///3/AgAHAAAA/P8AAAYAAgD9//7/BAADAAAA//8BAAIAAwD/////AgAEAP7///8EAAQA/v8AAAIAAgABAAIA/v8BAAQAAgD+/wEAAwABAP//AgACAAAA//8CAAIAAgD/////AQAEAAEA//8AAAIAAgACAP//AAACAAIAAAABAAEAAQABAAAAAAACAAEAAAABAAEAAQADAP///v8EAAQA/f8AAAQAAQD//wMAAgD//wIAAwD//wEABAACAP7/AQAFAAIA/v8BAAMAAwD//wAABAACAP//AQADAAEA//8DAAMA//8AAAMAAgAAAAAAAwACAAAAAAADAAMAAAD//wIAAwAAAAAAAwABAAAAAQADAAEAAAAAAAIABAAAAPz/AgAGAAEA/f8AAAIAAwABAP//AAAEAAIA/////wIAAwABAPz/AgAHAAAA/P8DAAMA//8BAAIA//8CAAIA//8CAAQA/v/+/wUABQD+//7/AwAEAAAA//8AAAMABAABAP7/AAAFAAMA/f///wUABAAAAAAAAQACAAMAAwD/////BAAFAP////8CAAQAAwAAAP7/AQAFAAMA/v/+/wIABQADAP7//f8EAAQAAQD//wEAAwACAP//AQAEAAEA/v8DAAMA//8BAAQAAAD//wMAAgD//wEAAgD//wAAAgACAAAAAAAAAAEAAQABAP7/AQADAAAA/v8CAAQAAAD8/wEABgACAPz/AAAEAAIA//8CAAEA//8AAAQAAgD+//7/BAAEAAAA/f8CAAMAAQD//wIAAgAAAP//AgACAAIAAAAAAAIAAwD//wAAAgABAP//AQACAAIAAAAAAAAAAgAAAAEAAQD///7/AwACAP///v8BAAIAAQD/////AgADAP7//f8CAAUA/v/7/wEABgAAAP3/AQACAP//AAACAAEA/v8AAAIAAwAAAP7/AQADAAAA//8CAAMA/v///wIAAwD///7/AQAEAAEA//8AAAEA//8CAAMAAAD+/wIAAgAAAAAAAQAAAAIAAgAAAP//AwADAP7///8EAAUA///+/wIABAACAP7//v8EAAUA///9/wUAAwD9/wEABAD+////BAADAPz/AQAFAAEA/P8BAAUAAQD8/wMABAD///z/BAADAP7//v8DAAEAAQABAAAA/v8CAAIA///8/wMAAwD///7/AgAAAAAAAAAAAP//AgD//wAAAAADAAAA///9/wUAAwD+//z/AwAEAAAA/P8BAAMAAwD8/wAAAgACAP//AAAAAAIA//8AAAAAAwD///7/AAADAAAA///+/wEAAgAAAPz/AAADAAAA/P8AAAIA/v/+/wEA/v/+/wIAAAD7////BAD///r/AAADAP7/+////wMA///8/wAAAgD///z///8CAP///P8AAAIA/v/9/wEAAgD8//z/AgABAP3//v8BAP///P8AAAMA/v/7////AwAAAP3//v//////AAD/////AAD+//3/AgACAPv//P8CAAAA/f///wAA////////AAAAAP7//v8CAAAA/f8AAAMA/v/8/wIAAgD9//7/BAACAPv//f8FAAMA+v/8/wUAAwD7//3/BAABAP3//v8DAAAA/P///wMA///+/wEAAQD9/wAAAgAAAP7/AAAAAAEAAQD///3/AgACAP7//f8DAAAA/v8BAAEA/f8BAAIA/v/9/wIAAQAAAAAA//8AAAEAAAD/////AAACAAAA/v8AAAAAAAAAAP///f8AAAIA///9//////8BAAEA/f/8/wIAAgD9//3/AQAAAP7//v8BAAAA/v/7/wAAAwD+//j/AQAEAPz/+P8BAAEA/f/7//////8AAP3//f///////P/+//3/AAD///3//f8BAPz/+////wEA/P/9//3/AAD///3/+f/+/wEAAAD6//v//v8DAP3/+v/7/wEA/v/9//r//v//////+v/+//3//v/9////+v/9//7/AAD5//7//v////r////9//7/+v////3////9//7/+f///////v/4/////v/+//v//v/8/wAA/P/8//3/AgD6//v///8CAPz//P/+/wEA/P/+////AAD7//7///////3/AAD8//7///8CAPz//P/+/wIA/f/+/wAAAQD7////AwABAPv//v8BAAMA//////3/AQADAAAA/P8CAAMA/v/8/wUAAwD9//7/BQAAAP7/AQACAAAAAQABAAEAAQAAAAEAAwABAP7/AwADAAAAAQACAP//AQADAAMAAQABAAAAAgACAAIA//8CAAQAAQD+/wMABAD+//3/BQADAP////8DAAIAAQD//wAAAQACAAEAAAAAAAEAAQACAAAA/v8AAAUAAgD8//7/BQACAP7///8CAAAA//8BAAIA////////AwAAAAAA/v8BAAAAAAAAAAIA/f///wEAAgD7/wAAAgACAPv///8AAAIA/v////z/AgABAAEA+f8AAAMAAgD7/wAAAAACAP7/AAD+//////8DAP3///8BAAMA+//+/wMAAgD7////AgADAP3///8BAAEA/P8CAAMA/f/7/wUAAwD+//z/AgACAAAA/f///wIAAQD8////AgABAPz///8AAAEAAAD///3/AQACAP7//P8BAAAA/f8AAAEA/P/9/wMAAQD7//3/AAAAAP/////+//3/AAACAP///P/8/wIAAwD+//3///8AAP//AgD///v//v8EAAMA/f/+/wEAAgAAAP//AQABAP7/AAACAAIA/v///wIAAgD//wAAAQAAAP//AQD//wEAAAD/////AgAAAP////8BAP//AAAAAAEA/v/+/wEAAwD9//z/AAADAP7//v/+////AAAAAP3//f8AAAEA/P///wAA///9/wAAAAD///3//v8AAAEA/f/9/wAAAQD+/wEA///+//7/AgABAP7//f8AAAIAAgD8//7/AQADAP3//f8DAAMA/P///wMAAgD9////AQADAP7/AAACAAQA/v/+/wIAAwAAAAEA//8BAAEABAABAAEA//8BAAQABQD9////BAAFAP//AQADAAQAAQAAAAAABAADAAAAAAAEAAIAAQABAAMAAQABAAIABAAAAAAAAQAEAAIAAQAAAAQAAgACAAAAAQABAAMAAQAAAAIAAgD//wIAAgAAAP//AwADAAAA//8BAAIAAQD/////AgACAP7//v8DAAAA/P8AAAMA///9/wIAAQD9////AQD///7/AgAAAP7//v8CAP3//v8CAAEA+/8CAAIA/v/7/wUAAAD7//7/BgD///7///8DAP7/AQAAAAIA//8CAP7/AQD+/wEA//8CAPz/AgADAAIA+v8BAAMAAwD4////AwADAPj/AQABAAIA+f8CAP3////9/wEA+/8BAP7/AAD5/wEA//////j/AAAAAAAA+P8AAAEA///5/wEA///+//v/AgD+//3//P8CAP3////8/wAA/P/+//7/AQD7//3//f8CAPz//P/7/wEAAAD9//j/AAABAP7/+P///////v/8/////P/9//7////9//3//P8BAP///P/6/wIAAAD7//r/AgAAAP7/+v8AAAIA///7/wAAAgD+//3/AwABAP3/AQADAAEAAAABAAAABAADAAAA//8EAAIAAgACAAMAAgAEAAMAAwACAAQAAQAFAAUABAAAAAUABgAEAAIABAADAAgABgACAAAACgAGAAMAAwAIAAQABgAEAAUAAwAIAAUABAADAAUABAAHAAQAAwADAAgABAAFAAQABQACAAcABwADAAAACAAGAAMAAgAGAAQABQACAAMAAwAIAAMAAQACAAgABAADAAAABgAEAAYAAAAEAAQABgABAAQAAwAEAAEABQADAAQAAAAFAAUABQD9/wUABQADAP//BwADAAEAAAAIAAEAAQAAAAYAAAAEAP//BQD//wMAAQAFAPz/AQACAAcA/f8BAP7/BQAAAAcA/P8BAAAABwD//wIA//8DAP//BQD//wQA/v8GAAEAAwD9/wYAAQACAP7/BAAAAAMA//8DAP7/BQD//wAAAgAHAPz/AAACAAYA//8CAAAABAABAAQAAAACAAIABAABAAMAAQADAAIABAACAAEAAgAFAAQAAwACAAIAAgAFAAQAAAABAAIAAwABAAMA//8BAP//AQABAAMA/f8AAAAAAwD+////AAADAPz/AgAAAAAA/v8DAP7/AQAAAAQA/f8AAP//BAD+////+/8FAAAA/v/8/wQA/v////3/AAD+/wMA/f/9//7/BAD9//7//P8CAAEA///8/wIAAgD+//z/BAAAAP7//f8EAAAAAQD8/wAAAAADAP//AQD+/wIA/v8CAP7/AQD7/wQA//////v/BQAAAP3//f8FAP///v/+/wQA/v/+//z/BQD///7//f8EAAEA///+/wIA//8BAP3/AwD+/wEA/P8BAP3/AQD5/wAA/f8BAPn/AAD9/wAA+f8DAPz//f/6/wMA/f////n/AgD7/wAA/f8BAPf/AQD+/wEA9v8BAP//BAD3/wIA/v8DAPv/AgD9/wMA/f8CAP3/BQD9/wEA//8GAP7/AQD//wQAAQACAP//AwAEAAQA/v8CAAMABgD+////AwAIAAAA//8DAAcAAQD+/wQABgADAAIAAQADAAQAAgACAAIAAQABAAQAAwAAAAEAAwABAAIABAACAP7/AwADAAQAAAAFAAAABwADAAcAAQAEAAIABwABAAMAAwAHAP//BAAEAAYA/f8GAAMABwAAAAYAAAAHAAAABwAAAAUA/v8GAAAABwD+/wEA/v8GAP///v/8/wMA+/8BAPz//v/6/wEA/P/+//r//v/8//7/9//+//z//v/3////+v////r/AAD3//z//f////X//P/9//7/9v/9//z////4////+v8AAPv/AAD6/wAA/P8CAPn/AAD7/wMA/P/+//n/AwD+//3/+P8DAP3//f/6/wIA/P/8//z/AQD8//z/+v8CAP3//f/6/wEA+//7//7/AwD4//n//v8FAPr/+f/6/wMA/f/7//r/AQD7//3//P////z//v/9//7//P////3////7/wEA/f/+//3/AQD9//7/AAD9//z//v8AAP7/+//+/wEAAAD8//z/AwAAAPz//P8CAAAA/f/8/wEAAAAAAP3/AAABAAEA/f8AAP//AwD///7//f8EAAIA/v/8/wQAAwD//wAABAACAAAAAwAGAP7///8BAAUAAQD+//7/AgAEAP//AAAAAAMAAQABAP//AgADAP3//f8AAAMA///+//z/AgAAAP3//P8CAP///f/+/wAA/P8AAP///f/8/wIA/v/8//3/AAAAAP///f/+/wEAAAD+//z/AQABAAAA/v/+/wAAAgD//wEAAAABAAEAAwD+////AQADAP////8AAAAA//8DAP/////+////AwD9//3//P8EAP///v/7/wEAAAD///7/AAD+/wQA/P////v/AgD7/wAA+f////z/AwD8//7//P8EAPz//v/9/wYA+f/+////BAD6/wEA//8CAP3/BAD9/wAA/v8DAPz/AAAAAAIA+/8BAAAAAAD7/wIA/f/9//z/AgD5//3/+P8BAPf/+//3////9//5//X//P/5//j/8//8//T/9//0//3/8P/5//b/+v/x//v/9P/3//T//P/x//j/9//7//L/9//6//3/8v/3//v//v/x//n//f/8//T/+//6//z/+P/8//v/+v/6//3/+//7//X//v/6//j/8//+//v/9//0//7/+P/0//f/AAD2//X/+f////f/9//6/wAA8//5//b//v/0//z/9P/7//L//f/z//j/8v/8//P/+f/x//n/8P/7//D/+f/x//v/8f/2//L//P/3//j/8v/9//b/+v/2//v/8v/+//n/9//x/wIA9v/5//P//f/2//v/9f/8//b////1//z/+P/+//f/AAD2//z/+f8BAPb//f/4/wAA9//+//r////5//7//P////n/AQD7//3/+v8FAPz/+//6/wMA/P/+//j/AQAAAAEA9/8BAAEAAQD9/wAAAwACAAUAAgADAAEABgAFAAYAAAADAAcACgD//wYABgAPAAEACwAFABAABAAQAAQAEgAFABEABAARAAgAEwAHABIACgAVAAcAFAAKABcABgAZAAkAGAAJABgABwAXAAkAFgAGABgABwAWAAgAHQAGABcACwAeAAgAGwAMACAABwAgAA0AIgAKACAACgAjAA0AHgAHAB0ADgAaAAcAFgAJABsABAAZAAYAGQADABwAAwAZAAQAFQACABgAAQASAAAAFQD+/xAAAQATAPv/DwADABAA+f8JAAIADQD6/woAAQANAPv/DAABAA4A/v8OAAMADQABAA0AAQAQAAUADgAEABEACAAOAAYADwALABEABwATAAsAFAAHABcADQAVAAoAGAASABUACgAVABMAGQALABcAEQAcABAAGQASABgAEgAWAA8AGQAQABYADgAWABEAEQAOAA0ADAAPAAoACwALAAsACQAGAAcACAAHAAQAAAADAAcAAgD7/wAABAD9//r//P/+//n/+f/4//r/9//5//X/8//1//f/8//y//H/9f/z//P/8//1//H/+P/w//X/9P/3//T/9v/y//b/9//3//L/+f/0//f/8P/4//P/9P/w//n/8//5/+3/9v/x//z/8P/3//D/+v/3//z/8f/8//P/AADz//n/8v8AAPX/+//w/wAA8f/9/+7////v//3/7P/9/+3////u//3/7P/+//L//f/t/wAA7v8AAPD/AADu//7/7//+//P////w/wEA8P8AAOv/AQDu/wAA5/8CAO3//P/u//7/7v/+//L/AgDw//v/9/8EAPP/+v/x/wMA8v/+//L/AQDy/wMA8v/9//T/AgDz////9v////L//v/5//3/9v8AAPj//P/+////9//9//3/AQD4////+P/9//n//f/1//v/9v/7//L/+v/v//r/7P/3/+z/+P/s//X/7v/y//D/9v/y//P/8f/2//P/8//u//X/7f/1/+r/8v/s//T/5P/v/+n/8v/o/+//6f/z/+3/9P/n//P/8P/3/+z/9P/x//v/8v/1//P//f/1//3/9P8DAPb////5/wQA+f8BAAEABQD7/wgAAgAJAPv/DQD//woAAgAQAAIACwALABIACQANAAkAFAAPAA8ABwAVABAADwAHABUADwATAA0AFwALABMADgAVAAoAEQANABEACgAQAA8ADAAIABEACAAOAAEACwAJAAsABwAIAAoACwAKAAoACwAJAA0ADAALAAgADwAHAA0ACQAQAAgADAAHABIACAAOAAQAFQAJABIABwAVAAgAGAAIABcABgAcAAkAHQAFAB8ACQAiAAYAIwAGACQACAAmAAQAIAAHACUAAwAcAAYAIwAHABkAAwAfAAcAGwAAAB4ACQAaAP//HQAGABUA//8bAAIAGAABABgA/v8WAAMAEAD8/xAAAwAIAPv/CwD//wgA+/8KAPz/CwD5/w0A+/8MAPn/CwD+/wQA+P8JAPn/AQD2/wUA9P8BAPj////y/wAA+P/3//T//v/2//b/9//+//X/+v/6////9f/8//r//P/2//j/+//5//n/9//8//H/+//0//z/9f/+/+7//P/4/wAA7//9//n/AwD4/wIA/P8IAP//BAAAAAsAAAAGAAIACwD+/wcAAgALAP3/CwD6/woA//8KAPj/CQAAAAsA+/8HAP3/CgABAAYA//8JAAMABgD8/wYAAgAEAPb/BwD9/wIA9P8EAPn/BgDy/wIA9f8FAPX/AgD7/wIA9/8FAPj/AQD7/wIA/v8CAAAABQABAAcAAAAHAAUACAAHAAcABgAKAAYABgABAAoAAAAHAAAABQAAAAYABAD//wEABQACAP3/+/8AAPj/+//0//n/9P/4/+7/9P/x//D/6//x//H/8v/t//D/7f/z/+z/6f/u//D/7f/r/+z/7f/l/+z/6f/r/+H/6v/l/+v/5P/i/+n/6f/q/+b/5v/o/+f/6//n/+b/6v/u/+z/5v/w/+z/8v/o//n/7P/3/+z/+P/r//f/7v/x/+r/8P/u//H/6P/4/+z/+f/v//v/8P/8//L/AwDx/wkA9/8MAPj/EwD8/xEA/v8ZAAEAFgADABQABQAXAAUAEwAHABcACQAYAAcAGwAPABoADQAcABAAGgAOABwADwAbAA8AHwASABcAEwAaABIAEgAUABMAEQASABEADQAPAA4ADgAKAAsADAAPAAMACQAIAAoAAAAIAAIABwD7/woA/v8FAP7/BAADAAUA/P8HAAAABQD3/wgA/f8FAPP/CAD1/woA9/8GAPj/CQD//wUAAQAHAAMABAAGAAsA//8GAAUACgD//wgAAAAJAP3/CQD8/wwAAQAFAAIACwAFAAEAAwAJAAcABAABAAcAAgAAAAMABAD9/wAABAAGAPr/AAACAP7///8BAAAA+//9/wEA/P/5//3/AQD4//r//f/9//r/+f/+//v/+//8//j//f/2//3/9v/8//b//P/2//r/9f/9//f//P/4/wEA+f/8//f/BAD7//v/+P8AAP3/+//7/wEA+/////z/AQD6////+/8CAPv/BAD7/wQA/v8CAP3/AwD9////+/8CAPz/+//6/wIA///4//r//v/+//j/+v/5////+//6//n//f/8//r/+v/9//z//P/7//z//f/+//v//v/7/wAA+v8AAP3/AAD7/////f/9//7//f////3//v8EAP7/BAD//wgAAgAIAP//DQD8/xAAAAANAAIACwAEAAYAAQAGAAEACAD+/wcAAAANAPv/CgABABIA/f8MAP7/FAD//xAA//8UAAMAFQABABMABgAXAAIADwAKABYA//8SAAcAFgACABcABgAOAAcAEQAKAAUADAAFAAcACAAFAAgACAAQAAYADQAPAA8ABAAQABAACgAKAAsADwADAAsAAgAOAAEACwD//w8A/v8MAAMACAABAAwACQADAAkACwAEAAgABwAIAP3/BwAJAAgAAQAJAAoACQAEAAgACAADAAYABgAAAAEAAgACAPr///8AAP3//P/7/wEA+v/9//n/BAD7//3/+f/+//3//f/5//z/+/8BAPn//v/7/wAA+//8///////9//j/AAD2////+f////b//v//////+v/9//n/BQD7////9f8FAPf/AgD1/wUA9/8HAPn/CQD2/wsA+v8MAPX/DgD4/wwA8/8RAPf/EAD3/xIA9/8SAPj/FwD0/xQA+/8bAPH/EwD7/xgA9v8YAPz/FgD+/x4A+v8YAP//HgD//xoABAAWAAcAHwAIABoACQAeAAsAHwAKABwACgAlAAgAHgAKABsADAAeAAoAFgAJABcADgAVAAwAEAAQABcACQARAA8ADgAPAAwAEQAIAA8ADAAOAAgADAALAAkABwAEAAUACgACAAMAAAAKAP7/AgD//woA+v8IAPn/CwD1/woA9/8IAPP/DAD1/wQA7f8OAPD/DgDs/xMA8v8RAO//CgDv/w0A6P8KAOn/CwDn/wkA6P8JAOL/CwDj/woA3/8KAOP/AgDb/wYA4f8AANn/AQDi//7/1/8BAN//AQDZ/wIA4P/9/97//P/f//r/4P/2/+H/9//g//X/4P/3/+D/9//j//L/4//z/+X/8f/n//X/4//1/+z/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7//1//L/8P/x/+//9v/v//j/6//5/+z/+//s//z/6f/9/+7/AADl/wEA8P8EAOT/BgDw/wkA5/8HAO//CwDt/wcA7/8LAPD/CADy/wwA8f8LAPb/DQD0/w0A+P8OAPv/DAD5/w4AAAAJAP3/CwAEAAkAAgAJAAcACgAIAAoACgALAA0ACwARAAoAEwAJABYACQAXAAkAGgAMABsACwAeAA0AHgAMACAACgAhAAkAJAAIACMABwAjAAsAIwAKACIADwAeAAsAJAAQABoACgAfAAoAGwAIABUABAAXAAgAEAADAA0ACAAJAAQABwAJAP//AgABAAgA9v/+//b/BADx//3/6//6/+f//f/j//L/3v/6/9z/8f/X//X/1f/w/9P/8P/S/+z/zP/u/9L/6v/I/+v/0f/p/8z/5//R/+j/0//m/9P/5//X/+n/2v/q/93/7P/j/+7/5P/x/+//8v/v//b/+v/6//z//P8EAAEABwAHABIABgASABMAIQAPAB4AGQArABsAKQAaADUAJgAxAB0APQAoADgAJQA+ACgAPQAuAD4AKQA+AC4AQAAoADkAKQA9ACYAMQAiADUAJgAnABoAKgAeABwAEgAfABMAEgALAA0ACQAHAAIA/P////v/+v/u//T/7v/w/+P/6P/e/+X/2v/c/9H/2v/S/9P/x//T/8r/zv/A/87/xf/N/8D/yv/A/87/xf/I/7//y//K/8v/xP/J/87/0P/K/87/1v/W/9f/1//f/9z/5v/d/+v/5//y/+j/9v/0/wEA9f8AAP7/EQACAA0ABAAbAAwAGgALACQAFAAkABcALAAbACsAIQAwACIAMQAoADQAJgAxACgANgAmAC4AJQAxACYAKwAjACgAIgAjAB8AIQAcABsAGwAWABcAEgASAAgAEAAHAAwA/P8JAPz/BQDw/wIA8P/7/+j/+v/k//T/4f/x/9v/8v/a/+3/1v/x/9b/8P/T/+z/1v/x/9T/6f/X/+z/2f/s/9v/6v/e//L/4v/z/+T/+f/s//n/8P/+//b//v8AAAMAAAAGAAwACgAOABIAFwATAB0AHgAkABoAKQAjADIAIQA0ACUAPQApADsAKgBEADQARAAtAEUAOABJAC4ARQA1AEgAKwBEADAAQwAmAD0ALQA7ACUAMwAkAC8AIAAoABoAIgASABkADgAUAAYABwD//wUA/f/2//f/9P/y/+b/8//m/+b/2P/r/9f/3f/O/+H/yP/Y/8f/2f+7/9j/vv/T/7j/1v+2/87/uP/T/7X/z/+3/9L/uP/Y/7r/1/+8/97/wv/h/8P/4//M/+f/0P/q/9X/6v/f//T/4v/y/+v//v/z//7/9v8IAAYACQAEABIAEgASABcAGAAbABoAKAAdACcAIAAwACMANQAlADYAKgA+ACcAPgAuAEMAKgBCAC4ARgAtAEIAKwBFAC4AQgAnAD8AKQA/ACIAOgAiADcAHgA0AB4ALQAcACoAGQAjABgAHgAVABoAEQARABAADgAIAAUACAAAAP//+v////P/+P/s//f/6v/1/+D/9f/f//L/1//z/9b/7v/R/+z/0P/r/8z/5v/K/+b/yf/l/8j/5//J/+T/yf/r/8n/4P/P/+v/zf/h/9P/6P/U/+X/2P/m/9z/6v/h/+f/5f/o/+v/7f/u/+b/9f/x//n/6v////L/BQD0/wgA8/8PAPr/EgD0/xgA+/8dAPX/HgD7/yQA+f8kAPz/KQABACoAAgApAAYALwAHACgACQAwAAkAKAAKAC0ACQAmAAwAJgALACQAEQAfAA4AIAAUABkAEwAXABUAEwAWABAAFQALABkACAAVAAQAGQD+/xIA/f8XAPf/EwD3/xEA7/8XAPP/DgDp/xgA7/8SAOf/FADs/xUA5v8QAOr/EADm/wsA6v8JAOn/BwDr/wUA7v8EAOv/AgDz/wQA8P8BAPT/AAD5//7/+P/7//7/+P/9//f/AgD0/wQA8/8GAPH/CQDt/woA7f8NAOv/EADr/w4A6/8RAOz/EADq/xMA6/8QAOn/EwDl/w4A6P8RAOT/CwDo/w8A6P8IAOn/CgDu/wYA7v8EAPP/AwD0////9v/8//r/+//6//f//P/4//3/8f////L/AwDt/wUA7/8GAOr/DQDr/wsA5/8SAOr/DgDm/xQA6f8PAOX/FwDq/w4A5/8VAOr/DQDq/xIA7f8PAO3/DwDw/xEA8f8MAPX/DQD5/wkA+f8FAP3/BgACAAAAAQADAAsA/P8GAP7/EAD7/xEA+P8SAPv/GAD1/xUA9/8cAPX/HADy/xsA8/8iAPD/GwDx/yIA7/8dAPH/HgDy/x8A8/8aAPb/HAD1/xcA+v8XAPf/FQD+/xAA+f8RAP7/CQD9/wsA/f8FAAMAAwADAP//BwD9/woA+v8HAPb/CwD2/wwA7/8LAPL/EgDr/wkA7P8RAOr/CQDp/wsA6P8KAOj/BwDm/w4A5f8IAOj/DwDj/wUA6/8JAOb/AQDs////6v///+v/+f/w//r/7P/4//X/9P/x//X/9f/x//n/8v/1//D////v//n/7/8BAOr//v/t/wIA5/8EAOr/AgDn/wgA6v8EAOj/CADu/wcA6f8IAPP/CQDs/wcA9P8MAPD/CADz/wsA9/8LAPb/CAD6/w4A/f8HAP//DgAFAAgABwANAAkACQANAAwADgAMAA8ACQATAA8AEQAIABgADwAUAAkAGgANABkACwAaAA0AHQAJABwACwAcAAoAHAAJABsACgAYAAgAFwAHABQACQARAAMAEAAHAA4AAQAKAAMACQAAAAUA/v8AAP7/AAD4//f//P/3//T/7//3/+//8//o//D/6f/v/+X/7f/k/+r/4v/p/9//6P/e/+X/2//k/9r/4//X/+D/2v/g/9b/4P/Z/97/1v/f/9r/3v/b/9//3//f/+D/3//j/+P/5v/h/+f/5v/r/+f/6//p/+7/7f/y/+7/9f/y//r/9v/8//j/AwD8/wYA/v8MAAMADQAIABIACQATAA8AFgASABgAEwAYABsAHAAYAB0AIAAeACAAIwAhAB8AJgAnACQAIAAnACYAKAAiACcAIAApACIAJwAZACcAHwAlABQAJgAaACAAEwAiABMAGQATAB8ADQASAA4AGQAIAAsABgASAAUABgAAAAgA/f8AAPz////2//r/+f/3//L/8f/2//H/8v/s//D/6v/y/+b/6P/k/+//4//n/9//6f/i/+j/2v/o/97/5//b/+r/2//n/9v/6v/c/+n/2//q/97/6//d/+v/3//t/+P/7P/j/+7/5//v/+f/8f/s//H/7P/0//H/9f/0//n/9v/5//n/+//9///////9/wMAAwAGAAAABQACAA8ABgAJAAMAEgAJAA8ABwARAAkAFgALABIACgAYAAsAFwANABcACgAbABEAFwALABsAEwAaABEAGAARABwAFwAWABEAHgAYABMAFAAdABgAEwASABoAGQATABAAFgAZABIAEwAUABYADgAVABEAFAANABQACwASAAwAEgADABIACwAPAP//DgAEAAoA/v8KAPv/BQD8/wgA9v8AAPb/BgD0//7/7v8AAPD//P/r//r/7f/4/+j/9P/o//X/5P/u/+b/8v/h/+3/4v/u/+L/6//e/+r/4//o/9v/6P/j/+b/3P/m/+T/5P/e/+P/4//k/+X/4P/i/+X/6v/h/+T/5//t/+T/6//p//D/6v/x/+z/9P/u//r/8f/3//P/AQD1//7/+P8GAPn/BQD5/wwAAQAKAP7/EgAHAA8ABwAWAAoAFwAOABoADQAZABAAIQARABoAEAAkABQAHQATACIAFAAgABQAIAAUAB8AFAAfABIAHQAPABsAEgAZAAoAGQARABIABgAXAA0ACAADABIABwADAAAACQD//////P////j/+v/3//X/9P/1//D/7v/x/+3/6P/r/+z/5P/m/+b/5v/e/+f/4f/j/9r/5//f/+L/1//l/97/4P/X/+b/3P/i/9n/5//c/+X/3//r/9z/6f/l//H/3//s/+r/9//l//X/8P/8/+z/AQD5//7/8/8KAAEABgD8/w8ACQARAAQAEgARABgADQAZABcAHAAXACEAGgAhACAAJQAhACUAJAAlACYAJgAqACUAJwAmAC4AJQAoACcALAAiAC0AJgAnAB8ALAAdACcAHQAmABQAJQAVACAADwAhAAsAGQAJABsAAwATAAEAEgD//w4A+f8HAPz/BgDy/wIA9f/8/+///f/w//L/7f/2/+3/7f/r/+3/6f/q/+n/5f/r/+X/6P/k//D/3//r/+L/8v/e/+//3v/z/+H/9f/e//j/4f/5/+D////i//7/4/8EAOb/AwDp/wcA6f8IAO3/DADu/wwA8v8QAPX/DgD3/xMA/P8TAP3/EgACABgABAASAAcAGgAJABMADgAZAA4AEQATABUAFAARABQAEAAYAA4AGAAOABgACgAcAAoAGAAGABoABgAbAAQAGAABABkAAAAZAPz/EwD9/xYA+P8RAPj/EAD0/xAA8v8JAPL/CwDs/wQA8v8FAOr////w/wEA7P/2/+3//v/u//D/6//5/+3/7f/q//H/7v/s/+v/7P/v/+n/7f/o//H/6P/v/+b/9P/p//D/5P/0/+r/9P/l//T/6//5/+f/9f/t//v/6v/6//H/+v/x/wEA8f/8//f/BQD3/wAA/P8FAP//BgD//wMABQAJAAQABAALAAYACgAIABAABgAPAAgAFAALABMACAAWAAwAGQAMABYACQAcAAwAGQAHABkACQAbAAYAFgAHABkABAAVAAcAFwAAABEABgAVAP7/DAACABEA/f8IAP//DAD8/wQA/v8GAPz/AAD7/wEA+v/7//n//P/4//n/9v/2//n/9f/4//H/+//x//j/7v/9/+7/+P/u//j/6//7/+3/9v/o////7//9/+b/AQDx/wUA6v8CAPH/CADw/wUA8/8JAPP/CAD4/wwA9/8KAP7/DQD7/wwAAgALAAEAEAAIAAkABgAUAAsADAAJABIADwAQAA8ADgAQAA8AFQAOAA8ACwAZAAoAEAAKABgACAATAAkAFgAHABUABgAVAAQAFAAEABIAAwAUAAAADwABABAA//8OAPr/CwD//woA+P8HAPz/BgD5/wEA+/8BAPj////5//r/9P/9//f/9f/1//f/9P/0//X/8v/z//P/9//w//T/8P/3/+//+P/w//r/7f/7//P//v/t//3/9f/+//D/AQD0////9v8DAPX/BQD8/wUA9/8JAP//CQD9/wsAAQANAAIADQAGABAAAwAMAAsAEQAFAAoADQARAAoACwAOAA8ACwANAA8ADQAMAAwAEQANAA4ACQANAA4AEQAHAAsACQAQAAkADAAAAA0ABwAKAPz/DQACAAMA/v8MAAEAAgD7/wYAAAAEAPn/AQD8/wIA9//+//r/AAD0//v/9v////T/+v/1//z/9f/8//b/+P/2//3/+v/4//f//f/+//v/+P/9//3//P/+/////f/+/wMAAQD/////BgAEAAQAAgALAAUACgAGABAABgAOAAkAEwALABEACQASAA4AEgALABQADQARAA4AFgAMABAADwAWAAwAEAAMABUADQAOAAoAEQALAA4ACQAKAAkADQAFAAEACAAHAAIA//8CAP//AgD9//3/+/8AAPf/+f/3//3/9P/2//L/+v/w//T/7//2/+r/8//r//P/6P/x/+j/7//n//L/5//t/+r/8P/p/+3/7P/v/+n/7//s//D/6v/w/+3/8P/t//L/8P/y//H/9P/1//X/9//2//f/+f/+//n/+//9/wMA+/8DAAAABAAAAAcAAgAGAAYACAAEAAoACAAJAAcADQAJAAwACwANAAkADwAPAA0ACgAOAA8ADgANAAsADAALAA8ACQAMAAgADAAHAA0ABQAKAAQACQADAAoAAwAGAAAACAD+/wQA/v8FAPn/AQD+/wMA9P/+//r////y//3/9v/7//L//P/0//f/8f/7//f/9f/y//f/+f/2//L/9v/5//X/8f/1//n/9f/z//L/+v/4//j/8P/7//j/+//z////9/////b/AgD3/wQA9/8FAPr/BgD7/wkA+/8IAP7/DQD8/wwAAAAOAAAAEwAEAA4AAwAVAAYAEAAGABQACQAUAAgAEwAKABQADQASAAoAEgAPABEADgARAAwAEAASABAADAARABIADQAPABAAEQAKABAADQAPAAcAEgALAA4ABAARAAYADwACAA0AAwAQAP7/CwADAA0A+/8MAAAACAD5/wkA/f8GAPj/BQD4/wQA9v8BAPT////z////8//7//D/+f/z//n/7v/0//L/9//t//D/7//0/+z/7f/u/+//6//t/+7/6v/s/+7/7//o/+r/6//y/+j/6v/p//T/6v/w/+n/9P/p//X/7P/0/+n/9//w//b/6f/4//P/+P/s//3/9v/4//H/AwD3//v/9/8FAPr////9/wcA/v8DAAAABwAEAAcABAAJAAcABwALAAwACQAIABAACwAMAAsAEwAKAA4ADAAVAAsAEQAMABYACgAUAAkAFAALABcABwASAAgAFgAEABEABwAUAAMAEAAEABAABAAOAAEADAACAAsA//8IAAAACAD+/wIA/f8HAP///f/7/wIA///6//v//f/9//j//P/4//3/9v/9//H//v/2//7/7v8AAPT//v/s/wAA8f///+3////u/wIA7v/+/+v/AwDw////6f8DAPL/AADr/wEA7/8CAO7/AQDw/wMA7v////T/AADw/wEA9P/9//P/AgD3//v/9P8BAPv//P/2/////f/8//r//f/+//v//v/9/wEA+f8AAPz/AwD4/wIA/P8FAPj/BAD9/wkA+f8DAP3/CwD7/wgA/f8JAPz/DgD//wcA/f8OAAEACwD9/wwAAgAMAP//CwACAA0AAAAIAAMADwADAAYAAwALAAQACgAEAAUAAwALAAQABAAFAAQAAQAGAAUAAAABAAQAAwD9//////8CAPv//v/+//7/9//+//v/+f/2//3/9v/2//b//P/z//T/9P/6//L/8v/w//f/8//z/+7/8//z//T/8P/y//D/8v/y//T/8f/v//L/9v/2//D/8v/3//r/8//1//n/+v/3//v//f/8//n//////wEA/P8DAAIAAwAAAAgABgAHAAUACgAJAAwADQANAAsADgAOABEAEAAQAA0AEwAUABIADQASABYAFAAMABIAFgASAA0AEQASABIADAANAA8AEQANAAoACwANAAsACAAHAAgABQAFAAQABAD+/wIA/P/+//r//P/1//n/9//4/+//9f/x//P/7f/w/+v/7//r/+3/5//r/+j/6v/l/+n/5P/n/+X/6P/i/+b/5//l/+P/6P/n/+X/5f/o/+r/6v/p/+j/7//t//D/7f/y//H/9//x//T/9//9//P/+f/9/wIA+v////7/BgADAAcAAAALAAgADAAHAA4ACgANAA4AFAALAA8AFAAWAAwAEwAVABUAEgAUABIAFgAXABUAEQAVABYAEwASABQAEwASABMAEAAQABAAEAAMAA8ADAALAAgADAAIAAgABQAIAAIABAADAAQA+////wAAAQD4//z/+f/7//f/+f/y//f/9f/2/+//9P/y//L/7//z//L/8P/u//H/8v/v//H/8P/w/+//8//x//P/8f/y//L/+f/x//X/8//7//T//P/2//z/9/8CAPn/AAD6/wMA/P8FAP3/BQD//wkAAQAIAAEACwAGAAsABAALAAgAEAAGAAsACgARAAkADQANAA8ACgAPAAwADAANAA4ACgAJAA8ACwAJAAgADQAHAAsAAwAIAAcACQAAAAgAAwAGAP//BgD+/wIA/v8EAPv//v/6/wIA9//7//b//P/2//v/8//1//T/+//y//L/8//1//H/8v/y//L/8v/x//L/8f/x/+7/8f/w//L/7//x//D/8//t//P/8f/3/+//9f/y//3/8P/3//T//v/1//z/9f////n//v/4/wUA+/8AAP7/BwD9/wYAAgAHAAIACwAEAAkABwAPAAcADgAKABIADAAQAAwAFgAQAA4ADwAaABAADwAUABgADwASABcAFAAQABIAFgATABIAEgAUABAAEwATABAACgAUABEADgAHABEACwAPAAYACQAIAA8AAwAFAAQADQACAAEA/f8JAP///v/5/wQA+//9//f//P/5//v/9f/6//f/9v/z//r/9v/y//H/9//2//H/8v/1//b/8f/0//P/9P/x//f/8v/0//H/+P/0//f/8P/6//f/+P/y//7/+P/9//T//v/8/wIA+P8AAP3/BAD9/wQA//8EAAEABwAEAAYAAwAHAAgADAAGAAYACwAOAAsACQAMAAwADwAOAA8ACgAQAA8AEQALABIADgARAAkAFQAMABAABgAVAAkADwAGABQABQAOAAUAEgADAAwAAQAOAAMACwD9/woA//8JAPv/BgD4/wUA/P8CAPP/AQD5//7/9f/8//T/+v/2//n/8v/3//X/9f/x//P/9f/z//H/8P/2//L/8//u//X/8f/1/+7/9//v//n/7//4//D/+//t//z/9P/9/+3//v/3/wAA8P8BAPj/AgD0/wMA+v8DAPj/BgD+/wUA/P8JAAAABQABAAsAAwAGAAQADQAHAAYABwAMAAkABwANAAkACAAIABIABgAJAAgAEwAEAAwABwAQAAQAEQACAA4ABgASAP//DgAFAA4AAQARAP//CwACABAA/f8LAP7/CwAAAAsA/P8JAP//BgD//wkA+/8DAAEABwD5/wEAAgADAPn/AQACAAAA/v8AAAAA/v8BAP7/AAD+/wMA/f8CAPz/BAD8/wUA/f8FAP3/BwD9/wcA/P8JAP3/CAD//w0A//8GAP//DgABAAsA//8KAAQADQACAAkAAwANAAYACwADAAwABwAKAAcACgAHAAoACQAIAAkACQAHAAUADAAKAAcAAQALAAoACgD//woABgAKAAAACQACAAkAAQAJAP//CQABAAgA/f8GAAAACAAAAAQA/f8IAAIAAQD9/wcAAQD//wEABwD///7/AwAFAP///f8EAAQAAAD8/wQAAQAFAP7/AgD//wYA/f8EAP7/BQD+/wYA/f8EAP3/BwD8/wUA/v8GAPz/BQD//wQA+/8FAAAABAD6/wMAAQADAPr/AQACAAEA/P8BAAEA///+//7/AAAAAAAA+///////AgD6/wAA/P8BAPr/AQD5/wEA+/8CAPf/AQD6/wIA9v8BAPn/AgD2/wMA+f8CAPb/AgD4/wMA9v8BAPn/BAD2/wEA+/8BAPj/AwD7/wAA+v8DAPz/AQD8/wMA/f////7/BQD/////AAACAAIAAwACAP//AgAEAAQAAAAEAAIABQACAAYAAQAHAAEABwACAAcAAAAJAAQABwD//wkAAgAJAAIACAD+/woAAwAHAAEABwD+/wgABQAFAPz/BQADAAQA//8EAAAAAQAAAAQAAAD//wAAAgD//wAAAAD+/wAA/v/+//v/AwD///v/+f8FAP3/+//5/wQA+//8//v/AgD5/////P8DAPf//v/+/wQA+P/9//z/BAD8/wAA+v8CAP//AAD7/wMA/v////7/BAD9/wEA/v8BAAEAAwD/////AAADAAIAAQAAAAEAAwAEAAQA//8BAAMABwACAAMAAAAHAAQABQAAAAQAAgAIAAMAAgD//woAAwABAAEACQD//wIABAAIAPz/AwADAAcA//8EAP//BAABAAQA/P8DAAIAAgD9/wMA/v8AAAAAAQD5////AQD+//v////9//7//P/9//v//v/9//r/+//8//v/+//8//j/+f/6//7/+P/3//f//v/5//j/9f/7//r/+//1//r/+v/8//b/+v/4//3/9//6//n//v/2//z/+v/8//X//f/6//7/9//7//j/AAD5//z/+f/+//n////8//7/+v////7//f/8/wIA/f/7//3/BQD///3//f8BAAIAAAD/////AQACAAMA//8CAAMAAgD+/wYAAwAAAP7/BwAEAAEA/v8GAAQAAQD9/wcABAAAAP3/CAACAAEA//8FAP//AwD//wIAAAAEAPz/AAAAAAQA/f/+//z/AwAAAPz/+v////7//f/7//z//P/9//v//P/8//r/+f/9//z/9v/5//z/+v/2//n/+//5//f/+v/4//b/9//8//r/9f/0//r/+//3//P/+f/8//f/9v/4//r/+P/4//j/+P/4//z/+f/6//X/+v/8//7/9//4//r/AAD7//v/9//+//3/AAD3//z//v8DAPn//f/9/wIA/P/+//v/AQD+/wAA/P8CAPz//////wMA/P8AAAAAAQD//wEA/P/9/wIABAD6//z/AwADAP7//P/+/wEAAQD+//7//P//////AAD7//7//f8BAP3//P/6/wIA///7//r/AQD///7/+f/8//7/AAD6//v///////r//v////v/+////wEA+//8//7/AwD9//r//f8FAP3/+//9/wYA/v////z/BAD+/wQA/P8CAP//BQD9/wMA/v8GAP7/BQD8/wUAAQAGAPv/BAABAAcA/P8EAP//BQD//wQA/P8EAAAABAD8/wQA//8CAP7/AwD9/wMA/v////3/AwD+//z//f8BAP3//f/9////+//8/////f/7//7//P/6//z//v/9//r/+v/8/wAA+//4//z////4//v//v/+//n/+//7/wAA/f/7//n/AAD///7//P/+//z/AQAAAP7//v8DAP////8BAAMA/v8AAAMABAABAAIABAADAAUABQAEAAMABwAHAAUABgAKAAQABQALAAwAAgAGAAwACwAGAAkABwAJAAsACgAEAAkACwAJAAQACwAKAAYABAAMAAkABgACAAkABwAHAAMABgAEAAMAAwAHAAAAAAADAAMA/v8AAAEA///+/wAA/f/9/////v/5//z/AAD6//j//P/8//j/+f/7//n/+P/6//n/+f/2//b/+v/8//b/9P/4//3/+P/1//j/+v/6//r/+v/4//r//v/8//n/+v/9/////v/7//v/AAACAP///f8CAAIAAQAAAAUAAwAEAAIABgAGAAcAAgAHAAkACQACAAcACwAMAAQABwALAAwABwALAAkACQAIAA4ACgALAAgACwAKAA0ACAAKAAgADQAJAAoABwAKAAgACQAHAAkABQAGAAcACAADAAQABgAHAAIABAADAAIAAwADAAAAAAADAAEA/v/9/wAA///+//z////8//v/+/////r/+//6//z/+P/9//n/+f/5//7/9//7//z/+//1/////f/6//f//v/7////+//7//r/AgD///z/+/8DAAAA/v8AAAQAAAAAAAIABAADAAMAAgAEAAgABgAAAAQACAAHAAUABgAGAAYACAAGAAcACAAIAAUACQAJAAoABgAHAAcACwAGAAgACAAJAAQACAAIAAcAAwAHAAUACQAEAAMABAAHAAEABQADAAIAAQAGAAIAAAD//wMAAAADAAAA/P///wMA/v/7/wAAAQD6//z/AgD///r/+/////3//f/9//z/+f8BAP//+v/6/wAA/P/+//3//P/6/wQAAAD6//n/AwAAAP//+v8AAAIAAgD8/wEAAQACAP//AgAAAAUAAwABAAAABgACAAMABAAGAAEABAAGAAcAAwACAAYACgAEAAIABQAKAAgAAwACAAkACwAEAAIACQAIAAMABgALAAUAAQAHAAoABgADAAcABgAFAAUABgAFAAUABgAFAAMAAwAGAAcAAgD//wUACAAEAP//AgAFAAgA///+/wMACAD/////AwAFAP//BQADAAEA/f8GAAIAAgD+/wMA/f8GAAIAAgD6/wQAAgAEAPv/AgAAAAQA/P8EAP//AQD+/wcA/f/+/wAABwD9/wEAAAADAP//BQAAAP//AQAHAP///v8EAAcA/v/+/wMABwACAP//AgAFAAQAAAAFAAUAAQABAAgABQADAAEABQAFAAcAAwAEAAMABwAGAAcAAgAGAAYACAAEAAcABQAGAAYACAAEAAMABgAKAAUAAQAFAAkABQABAAUABgAFAAIABAADAAUAAgADAAAABAADAAIA/v8FAAMAAAD7/wUAAgAAAPr/AwD//wEA+f8AAP3/AgD4/////f8AAPX/AAD///3/8v8AAAAA/v/x//7//v/+//T//v/7//7/9v/9//r////4//v/+v8AAPr//P/6/wAA+//8//z/AAD8//7//v8AAP7/AAD+/wAAAQABAAAAAAABAAMAAQACAAEAAgAFAAIAAQADAAkAAwAAAAUACgACAAIABQAHAAQABQAFAAUABQAFAAUABgAEAAQABQAEAAQABQAEAAAABQAFAAMA//8EAAIAAgD//wIA/v8EAAAA/v/8/wUA/v/8//z/AwD6//7//f////j//v/9////+P/7//r/AAD5//v/9//9//v//P/1//z/+//7//f//f/6//n/9//+//z/+v/4//z//f/8//n/+//9//3/+//9//3/+//9/wAA/f/6////AwD///r///8CAAAA/f///wEAAgACAP////8DAAEAAAACAAIAAAACAAMAAQABAAMAAgD//wIABAABAP//AwACAP//AQAFAAAA/v8CAAMA/////wAAAgD+//7//f8EAP7/+f/8/wUA/f/5//3/AQD9//z/+v/+//z//P/6//7/+v/7//3//f/4//r//P/9//n/+//9//z/+P/8//3/+v/5//3/+//6//3//f/7//3//f/6//3////+//r//f8AAAAA/P////3//v8BAAIA+//9/wIABgD9//7/AAAHAAAA/////wQAAQADAP//AgADAAMA/f8BAAQAAwD9/wIAAwABAP7/AgACAP///f8BAAMA///7//3/BAABAPr/+/8CAP7//P/6//3/+v8AAPz/+f/3/wAA+//5//f//P/6//z/9v/5//r/+//1//v/+f/4//T//P/2//b/9v/6//X/+P/2//n/9v/4//b/+P/2//f/9//6//b/9//4//r/+P/3//b/+P/5//n/+f/4//j/+f/6//v/+v/2//j//P/+//j/+P/6/wAA/P/5//j/AAD+//z/9//7/wAAAwD4//f///8EAPv//P/8/wAA/v8AAPz/AgAAAP3//P8EAAAA///9/wIA//8AAAAAAwD9////AQAEAP7///8AAAEA/v8AAAEA///8/wEAAgD9//z/AQD+//3//v8AAP7//f/8///////7//n//P8AAP3/+P/6/////P/4//r//v/7//j/+//8//r/+f/5//v/+//5//j/+//7//j/+P/7//n/+P/7//n/9//6//3/+P/2//n//f/5//b/+P/+//r/9v/4////+f/3//n//f/6//r/+f/6//n//f/6//v/+f/9//v/+//6/wEA+v/6//z/AgD5//3//f/+//r/AgD+//7/+f8BAP/////6/wMA//////z/BAD/////+/8DAAEAAQD8/wIAAAABAP7/AwD+/wEAAgAEAPv/AAAEAAMA/P8BAAIAAQAAAAIA//8BAAEAAAD//wQAAgD+//7/AwACAP///v/+/wMAAQD8//z/AwABAPv//f8CAAAA/v/+//3//v8BAP///P/+//7//v////7//f/+//7//P/+/wEA/P/9////AAD8//3///8BAPz//f/+/wMA/P/+////AgD8//////8EAPz////+/wIA//8CAPv//f8CAAYA+v/8/wEABwD9//7//f8FAAEA///7/wEAAQACAPz//v///wMA///8//z/AgABAP3/+/8AAP7//v///wAA+//+/wEA/v/8/////f/8////AQD6//v/AQD///v//f/+//z//f////z/+//+/////P/7//7/AAD7//3////9//v/AAD///r//P8BAP7//f/8////AAAAAPr///8DAAIA+v8AAAMAAQD8/wMAAQABAAAABAD//wEABAAEAP7/AwADAAUAAgAEAAAABAAEAAQAAgAGAAEABAAEAAcAAQAEAAQABgABAAYABAAFAAAAAwAFAAYAAAACAAMABQACAAMAAQACAAIAAgD//wQAAwD///7/AwADAP7//P8CAAMA/f/9/wIAAAD8////AgD9//7/AgD///v///8CAP7/+v8AAAMA///7/wAAAwD///r/AQAEAAAA+/8BAAMAAgD//wEA//8EAAMAAwD+/wUABAAEAAAABwAEAAQAAQAJAAQABQACAAcABgAGAAEACQAIAAcAAAAKAAkABwACAAkABwAJAAMACQAHAAgAAwAJAAcABgAEAAkABAAFAAYABwADAAUABAAHAAMAAwAEAAgAAgABAAMABgACAAMAAgADAAEABAABAAAAAgACAP//AAACAAAA/v///wEA///+//3/AAAAAP///P/+/wAA///8//7///////7/AAD8//7///8BAP7//v/8/wEAAQD///v/AQD//wAA//8CAP7/AQABAAIA/P8CAAQAAgD8/wIABQAEAP7/AwADAAQAAgADAAEABQAEAAMAAQAGAAQAAgADAAcAAwABAAMACAAEAAIAAQAEAAQABgABAAEAAgAFAAMABQAAAP//AwAHAP////8CAAQAAAACAAEAAAABAAIA/v8CAAIA/v/9/wUAAQD8//7/AwAAAAAA/f///wEAAwD+//3///8DAAEA///9/wMAAwAAAP//AwABAAAAAgAGAAAAAAAEAAYAAAACAAUABgACAAQABAAGAAQABQACAAcABwAFAAIABwAHAAgABQAFAAQACgAIAAUAAwAJAAgABwADAAcACAAHAAMACAAHAAYAAwAGAAUABwAEAAUAAwAFAAMABgAEAAMAAQAEAAYABAD//wEABAAFAAIA//8BAAQABAAAAP//AQADAAAA//8AAAQA/////wIAAwD9/wAAAAABAP//AQAAAAAA/f8BAAEAAwD9//7/AQAFAP3//f8BAAYA/////wAABAACAAEA/f8BAAUABAD+/wEABAAEAAEAAQAEAAQAAQACAAYAAwAAAAMACAACAAEABAAIAAEAAwADAAYAAQAFAAQABAABAAcABAAEAAAABgAEAAQAAQAGAAUABAAAAAYABQAEAP//BQAEAAQAAQAFAAEAAwADAAQAAAADAAQABAAAAAIABQAFAP//AAAGAAQAAQACAAIAAgAGAAIA//8DAAUAAQACAAIAAQABAAQAAgABAAAAAgAEAAMA//8BAAMAAgABAAMAAgD//wIABgABAP3/AwAFAAAA/v8FAAIAAAD//wQAAgACAP//AQABAAQA//8BAAAAAwD//wMAAAACAP//BAD+/wEAAAAEAP//AQD9/wUAAgAAAPv/BQACAP///v8FAP//AAABAAMA/f8BAAIAAwD9/wAAAwAEAP////8AAAUAAQD+////BQAEAP3///8GAAQA/f8AAAUAAgAAAAMAAQD//wIABAD/////AgADAAIAAQD//wAAAgAFAAEA/f8AAAUAAgD+/wEAAgAAAAAAAgABAAEAAAABAAAAAQD//wMAAQD///7/AwACAAAA//8CAAAAAgAAAAAA//8DAAEA///+/wQAAQD///3/BAAAAP3///8EAP3//v8CAAMA+////wMAAwA=", Wa = qf, Zf = jf, Ls = 5, $f = 7e-4, Us = 0.018, Fs = 0.012, sr = 6e-3, Bi = 0.985, ar = 0.95, or = 4, Au = 90, eu = 48, _i = null, tu = 8, iu = 2, yt = /* @__PURE__ */ new Map(), Qt = /* @__PURE__ */ new Map(), ii = [], un = 0, Ns = 0.16;
function Ie(A, e, t, i) {
  return {
    key: A,
    start: e - Ns,
    end: t - Ns,
    trim: i
  };
}
var nu = {
  lift: Ie("lift", 0.178, 0.325, 2.65),
  micro: [
    Ie("micro-a", 0.185, 0.205, 2.9),
    Ie("micro-b", 0.282, 0.322, 2.8),
    Ie("micro-c", 0.407, 0.44, 2.75),
    Ie("micro-d", 0.483, 0.565, 2.65),
    Ie("micro-e", 0.603, 0.698, 2.55),
    Ie("micro-f", 0.724, 0.92, 2.45)
  ],
  body: [
    Ie("body-a", 0.94, 1.126, 0.64),
    Ie("body-b", 1.352, 1.446, 0.7),
    Ie("body-c", 1.558, 1.708, 0.68)
  ],
  accent: [Ie("accent-a", 1.222, 1.292, 0.58), Ie("accent-b", 1.574, 1.715, 0.62)],
  finish: Ie("finish", 1.73, 1.795, 0.72)
};
function ce(A, e, t) {
  return Math.min(t, Math.max(e, A));
}
function zs(A, e, t) {
  const i = ce((t - A) / (e - A), 0, 1);
  return i * i * (3 - 2 * i);
}
function at(A, e) {
  return A + Math.random() * (e - A);
}
function ru(A) {
  const e = Array.from({ length: A }, (t, i) => i);
  for (let t = e.length - 1; t > 0; t -= 1) {
    const i = Math.floor(Math.random() * (t + 1));
    [e[t], e[i]] = [e[i], e[t]];
  }
  return e;
}
function Os(A) {
  return 10 ** (A / 20);
}
function Mi(A) {
  return 2 ** (at(-A, A) / 12);
}
function Hs() {
  return ce(-Math.log(Math.max(1e-3, 1 - Math.random())), 0.55, 1.8);
}
function Vs() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function Ci() {
  if (_i) return _i;
  if (typeof window > "u") return null;
  const A = window.AudioContext ?? window.webkitAudioContext;
  if (!A) return null;
  try {
    _i = new A({ latencyHint: "interactive" });
  } catch {
    return null;
  }
  return _i;
}
function ni() {
  return new DOMException("Audio load was evicted.", "AbortError");
}
function Sr() {
  for (let A = ii.length - 1; A >= 0; A -= 1) {
    const e = ii[A];
    e.load.invalidated && (ii.splice(A, 1), e.encoded = null, e.reject(ni()));
  }
  for (; un < iu && ii.length > 0; ) {
    const A = ii.shift();
    if (!A) return;
    if (A.load.invalidated) {
      A.encoded = null, A.reject(ni());
      continue;
    }
    const e = A.encoded;
    if (A.encoded = null, !e) {
      A.reject(ni());
      continue;
    }
    un += 1;
    let t;
    try {
      t = A.context.decodeAudioData(e);
    } catch (i) {
      un -= 1, A.reject(i);
      continue;
    }
    t.then((i) => {
      if (A.load.invalidated) {
        A.reject(ni());
        return;
      }
      A.resolve(i);
    }, (i) => A.reject(i)).finally(() => {
      un -= 1, Sr();
    });
  }
}
function su(A, e, t) {
  return t.invalidated ? Promise.reject(ni()) : new Promise((i, n) => {
    ii.push({
      context: A,
      encoded: e,
      load: t,
      resolve: i,
      reject: n
    }), Sr();
  });
}
function au(A) {
  A.invalidated || (A.invalidated = !0, A.settled || A.controller.abort(), Sr());
}
function ou() {
  for (; Qt.size > tu; ) {
    const A = Qt.keys().next().value;
    if (typeof A != "string") return;
    Qt.delete(A);
    const e = yt.get(A);
    !e || e.pinned || e.references > 0 || (yt.delete(A), au(e.load));
  }
}
function Gs(A, e) {
  let t = yt.get(A);
  if (!t) {
    const r = {
      controller: new AbortController(),
      invalidated: !1,
      settled: !1
    }, s = fetch(A, { signal: r.controller.signal }).then((l) => {
      if (!l.ok) throw new Error(`Peel audio request failed with ${l.status}.`);
      return l.arrayBuffer();
    }).then((l) => {
      if (r.invalidated) throw ni();
      return su(e, l, r);
    }).finally(() => {
      r.settled = !0;
    });
    t = {
      promise: s,
      references: 0,
      pinned: A === Wa || A === Zf,
      load: r
    }, yt.set(A, t);
    const a = t;
    s.catch(() => {
      yt.get(A) === a && (yt.delete(A), Qt.delete(A));
    });
  }
  t.references += 1, Qt.delete(A);
  const i = t;
  let n = !1;
  return {
    src: A,
    promise: i.promise,
    release: () => {
      n || (n = !0, yt.get(A) === i && (i.references = Math.max(0, i.references - 1), !(i.references > 0 || i.pinned) && (Qt.delete(A), Qt.set(A, !0), ou())));
    }
  };
}
function st(A, e, t, i, n = 1) {
  return {
    key: A,
    start: e * t,
    end: e * i,
    trim: n
  };
}
function lu(A) {
  return {
    lift: st("lift", A, 0.02, 0.18, 1.2),
    micro: [
      st("micro-a", A, 0.12, 0.32, 1.05),
      st("micro-b", A, 0.28, 0.48, 1),
      st("micro-c", A, 0.44, 0.62, 0.95)
    ],
    body: [
      st("body-a", A, 0.32, 0.56, 0.9),
      st("body-b", A, 0.52, 0.76, 0.86),
      st("body-c", A, 0.7, 0.88, 0.82)
    ],
    accent: [st("accent", A, 0.58, 0.78, 0.82)],
    finish: st("finish", A, 0.8, 0.98, 0.9)
  };
}
var cu = class {
  constructor() {
    this.enabled = !1, this.src = "", this.volume = 0.7, this.useBuiltInProfile = !1, this.buffer = null, this.bufferLease = null, this.reappearBuffer = null, this.reappearBufferLease = null, this.profile = null, this.loadRevision = 0, this.masterGain = null, this.compressor = null, this.activeVoices = /* @__PURE__ */ new Set(), this.gestureActive = !1, this.lastProgress = 0, this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = 6e-3, this.nextBackwardSpacing = 0.025, this.liftArmed = !0, this.finishArmed = !0, this.fullyDetached = !1, this.lastAccentTime = -1 / 0, this.holdTimer = null, this.panWalk = 0, this.lastSliceKey = "", this.sliceBags = {
      micro: [],
      body: [],
      accent: []
    }, this.destroyed = !1;
  }
  configure(A) {
    if (this.destroyed) return;
    const e = A.src.trim(), t = !!A.useBuiltInProfile, i = e !== this.src, n = t !== this.useBuiltInProfile;
    if (i && (this.bufferLease?.release(), this.bufferLease = null), this.enabled = A.enabled && !!e, this.src = e, this.volume = ce(A.volume, 0, 1), this.useBuiltInProfile = t, this.masterGain && this.masterGain.gain.setTargetAtTime(this.volume, this.masterGain.context.currentTime, 0.012), (i || n) && (this.reset(0), this.buffer = null, this.profile = null, this.loadRevision += 1), !this.enabled) {
      this.reset(this.lastProgress);
      return;
    }
    this.buffer || this.preload(), this.reappearBuffer || this.preloadReappear();
  }
  unlock() {
    if (!this.enabled || this.destroyed) return;
    const A = Ci();
    A && (A.state === "suspended" && A.resume().catch(() => {
    }), this.buffer || this.preload(), this.reappearBuffer || this.preloadReappear());
  }
  begin(A, e = Vs()) {
    this.clearHoldTimer(), this.gestureActive = !0, this.lastProgress = ce(A, 0, 1), this.lastUpdateTime = e, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = at(4e-3, 8e-3), this.nextBackwardSpacing = at(0.018, 0.032), this.lastAccentTime = -1 / 0, this.panWalk = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012), this.lastProgress <= sr && (this.liftArmed = !0), this.lastProgress < ar ? (this.fullyDetached = !1, this.finishArmed = !0) : this.lastProgress >= Bi && (this.fullyDetached = !0, this.finishArmed = !1);
  }
  update(A, e = Vs(), t = 0) {
    const i = ce(A, 0, 1);
    if (!this.gestureActive) {
      this.begin(i, e);
      return;
    }
    const n = this.lastProgress, r = Math.max((e - this.lastUpdateTime) / 1e3, 0), s = i - n;
    if (this.lastProgress = i, this.lastUpdateTime = e, i <= sr && (this.liftArmed = !0), i < ar && (this.fullyDetached = !1, this.finishArmed = !0), Math.abs(s) < $f) {
      const u = Math.exp(-Math.min(r, 0.12) / 0.045);
      this.smoothedVelocity *= u, this.smoothedAcceleration *= u;
      return;
    }
    this.armHoldSilence();
    const a = ce(r || 1 / 60, 1 / 240, 0.25);
    r > 0.14 && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0);
    const l = s / a, o = this.smoothedVelocity, c = 1 - Math.exp(-a / 0.045);
    this.smoothedVelocity += (l - this.smoothedVelocity) * c;
    const f = (this.smoothedVelocity - o) / a, h = this.smoothedAcceleration, p = 1 - Math.exp(-a / 0.075);
    this.smoothedAcceleration += (f - this.smoothedAcceleration) * p;
    const m = Math.abs(l) * 0.52 + Math.abs(this.smoothedVelocity) * 0.48, P = ce(Math.log1p(8 * m) / Math.log(13), 0, 1);
    this.panWalk = ce(this.panWalk + at(-0.018, 0.018), -0.05, 0.05);
    const d = ce(t * 0.08 + this.panWalk, -0.12, 0.12);
    if (this.fullyDetached && i >= ar) {
      this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.01);
      return;
    }
    if (s > 0 && m >= Us) {
      if (this.stopVoices(/* @__PURE__ */ new Set(["reattach"]), 0.012), this.liftArmed && n <= Fs && i >= Fs && (this.playLift(P, d), this.liftArmed = !1), this.finishArmed && n < Bi && i >= Bi) {
        this.playFinish(P, d), this.finishArmed = !1, this.fullyDetached = !0, this.forwardTravel = 0, this.backwardTravel = 0;
        return;
      }
      if (!this.fullyDetached) {
        this.forwardTravel += s;
        const u = ce(m / (6 + 44 * P ** 0.75), 32e-4, 0.035);
        let x = 0;
        for (; this.forwardTravel >= this.nextForwardSpacing && x < 2; ) {
          const C = zs(8e-3, 0.035, i) * (1 - 0.28 * zs(0.86, 0.98, i));
          this.playTexture(P, C, d), this.forwardTravel -= this.nextForwardSpacing, this.nextForwardSpacing = u * Hs(), x += 1;
        }
        x === 2 && this.forwardTravel >= this.nextForwardSpacing && (this.forwardTravel = 0);
      }
      if (h <= or && this.smoothedAcceleration > or && P > 0.2 && e - this.lastAccentTime >= Au && i < Bi) {
        const u = ce((this.smoothedAcceleration - or) / 8, 0, 1);
        this.playAccent(P, u, d), this.lastAccentTime = e;
      }
      this.backwardTravel = 0;
      return;
    }
    if (s < 0 && m >= Us) {
      this.stopVoices(/* @__PURE__ */ new Set(["texture"]), 0.014), this.backwardTravel += -s;
      const u = ce(m / (2 + 12 * P ** 0.8), 8e-3, 0.07);
      let x = 0;
      for (; this.backwardTravel >= this.nextBackwardSpacing && x < 1; )
        this.playReattach(P, d), this.backwardTravel -= this.nextBackwardSpacing, this.nextBackwardSpacing = u * Hs(), x += 1;
      x && this.backwardTravel >= this.nextBackwardSpacing && (this.backwardTravel = 0), this.forwardTravel = 0;
    }
  }
  end(A) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ce(A, 0, 1), this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.016);
  }
  playReappear() {
    if (!this.enabled || this.destroyed) return;
    const A = Ci(), e = this.reappearBuffer;
    if (!A || !e || this.activeVoices.size >= Ls) {
      e || this.preloadReappear();
      return;
    }
    const t = A.currentTime + 2e-3, i = e.duration, n = A.createBufferSource(), r = A.createGain(), s = 0.82, a = Math.min(4e-3, i * 0.12), l = Math.min(0.025, i * 0.2);
    n.buffer = e, r.gain.setValueAtTime(0, t), r.gain.linearRampToValueAtTime(s, t + a), r.gain.setValueAtTime(s, Math.max(t + a, t + i - l)), r.gain.linearRampToValueAtTime(0, t + i), n.connect(r), r.connect(this.ensureOutput(A));
    const o = [n, r], c = {
      source: n,
      gain: r,
      nodes: o,
      kind: "reappear"
    };
    this.activeVoices.add(c), n.addEventListener("ended", () => {
      this.activeVoices.delete(c);
      for (const f of o) f.disconnect();
    }, { once: !0 }), n.start(t);
  }
  reset(A = 0) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ce(A, 0, 1), this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.liftArmed = this.lastProgress <= sr, this.fullyDetached = this.lastProgress >= Bi, this.finishArmed = !this.fullyDetached, this.lastAccentTime = -1 / 0, this.stopVoices(void 0, 0.012);
  }
  stop() {
    this.clearHoldTimer(), this.gestureActive = !1, this.stopVoices(void 0, 0.012);
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.loadRevision += 1, this.stop(), this.masterGain?.disconnect(), this.compressor?.disconnect(), this.masterGain = null, this.compressor = null, this.buffer = null, this.bufferLease?.release(), this.bufferLease = null, this.reappearBuffer = null, this.reappearBufferLease?.release(), this.reappearBufferLease = null, this.src = "", this.profile = null);
  }
  preload() {
    const A = Ci();
    if (!A || !this.enabled || !this.src || this.destroyed) return;
    (!this.bufferLease || this.bufferLease.src !== this.src) && (this.bufferLease?.release(), this.bufferLease = Gs(this.src, A));
    const e = this.bufferLease, t = ++this.loadRevision;
    e.promise.then((i) => {
      this.destroyed || t !== this.loadRevision || (this.buffer = i, this.profile = this.useBuiltInProfile ? nu : lu(i.duration), this.sliceBags = {
        micro: [],
        body: [],
        accent: []
      });
    }).catch(() => {
      this.bufferLease === e && (e.release(), this.bufferLease = null);
    });
  }
  preloadReappear() {
    const A = Ci();
    if (!A || !this.enabled || this.destroyed) return;
    this.reappearBufferLease ?? (this.reappearBufferLease = Gs("data:audio/wav;base64,UklGRpD2AABXQVZFZm10IBAAAAABAAIAgLsAAADuAgAEABAAZGF0YWz2AAD///3//v///wAA+//+/wEAAAD7//7//v//////AAD8//3/AAABAPv//P8AAAIA+//8/wEAAgD7//z///8CAP7//P/9/wMA/v/8////AgD9//7///8AAP7/AAD9//7/AAACAP7//f/+/wIAAAD+//3///8BAAIA/f/9/wAAAgD+//7/AQAAAP7/AAAAAP7//v8CAAAA/P///wEAAQD+//3///8CAAIA/P/8/wMAAwD9//v/AgAEAP7//P8AAAIAAgD///3///8DAAIA/v///wIAAgAAAAEAAQAAAP//AwAEAP////8FAAIA//8BAAQAAQABAAIAAgACAAMAAAABAAMAAwABAAIAAgACAAEAAwACAAEAAQAEAAMA//8BAAYAAgD//wIAAwABAAEAAwACAAAAAQACAAIAAQACAAEAAAACAAQAAQD+/wEABAACAP3/AAAHAAIA+////wcABAD+//3/AQAFAAMA/v/+/wIAAgAAAAEAAQABAP7/AAAEAAEA/f8BAAMAAAD+/wMAAgD9////BQABAP7/AAADAP//AAACAAAA/v8CAAIAAAD//wIAAQAAAP//AgAAAP//AAAEAAEA/v///wMAAgD///3/AgAEAAEA/P8AAAQAAgD9////AwACAP7/AAACAAEAAAAAAAAAAQAAAP//AQABAP//AQAEAP7//f8DAAIA/P8AAAMAAAD+/wMAAAD+/wIAAwD9////AwADAP////8AAAMAAgAAAP//AwABAAAAAgADAP7///8DAAUA///+/wIABAABAAEA//8CAAQAAQD+/wMABQAAAP//BAACAAAAAgADAAEAAgACAAIAAQACAAMAAgAAAAEAAwADAAIAAQAAAAMABQAAAP7/BQAGAP3///8IAAQA+/8BAAgAAQD9/wQABQAAAP//AwAEAAAAAQABAAEAAwADAP//AQADAAEAAAADAAAA//8DAAQA/v8AAAQAAgD9/wIAAwABAP//AQABAAIAAQABAAAAAgABAAEAAQACAAEAAAAAAAQAAgD//wEAAwACAAEAAQABAAIAAwACAP//AQAEAAMAAAADAAIAAQABAAMAAgADAAIAAQAAAAMABAACAP//AQADAAMAAQACAAEAAAACAAUAAgD+/wAABgADAP7///8GAAUA/v/+/wYABgD///3/AwAGAAMA//8BAAMABAADAAEAAAADAAQAAwAAAAMABAADAAEABAAEAAMAAAAEAAYABAD+/wMACAAGAP7/AwAGAAYAAQACAAQABgACAAIABAAGAAEAAwAFAAYAAgACAAMABwAEAAIAAAAFAAYAAwABAAUABQAEAAEABAAEAAUAAgACAAQABwABAAIABgAGAP//AgAGAAYAAgABAAEABwAGAAAA//8IAAUAAAABAAQABAAEAAEAAgAEAAQAAAADAAMAAgADAAUAAAABAAYAAwD+/wMABAACAAEABAACAAAAAwAEAP//AAAGAAQA/f///wgABAD8/wEABQABAAEAAwABAP7/BAAGAP///f8EAAYAAAD+/wIAAgACAAMAAQD+/wIABAABAP7/AAADAAMA///+/wIABAD/////AgABAP7/AQACAAAA/v8BAAIAAAD+/wIAAQD+//7/AwACAP///v8CAAEA///+/wIAAQD///7/AgACAAAA/P8BAAMAAAD8/wIAAwD///3/AwABAP////8CAAEAAAD//wIAAgABAP7/AQACAAIA/////wAAAwABAAEA//8AAAEABAD/////AQAAAP//BAACAP3///8FAAEA/v8AAAIAAQABAAAAAAABAAIAAAD//wAAAgAAAAAAAAAAAAEAAQAAAP//AAABAP//AAACAAAA/v8AAAEAAQAAAP7/AQACAAAA/v8AAAIAAAD+////AgABAP3/AAADAP7//P8DAAMA/P/9/wQAAQD8/wAAAwD+//3/AgADAP3//f8CAAIA///+////AAABAAEA/v/9/wEAAwAAAPz///8CAAEA/f/9/wIAAwD+//z///8FAAEA+//9/wQAAgD9//3/AwAAAP3/AAACAP7/AAABAAAA/P8BAAIA/v/9/wIAAgD///7/AgAAAP//AQABAP7/AQADAAAA/f8CAAIAAQABAP////8EAAIA/v8BAAQAAAD//wQAAQD//wIAAwABAAEAAQACAAIAAgABAAMAAQABAAIAAwAAAAIAAwAEAAAAAAAEAAUA//8AAAMABQABAAEAAQADAAIAAQABAAQAAgACAAAAAgADAAIA/v8CAAQAAgD//wMAAgAAAP//BQACAP//AAACAAIAAwAAAP//AAAEAAEA/////wMAAgD/////BAABAP//AAADAP//AAACAAIA/v8BAAEAAQABAAIA//8AAAAAAgACAAAA/P8CAAMAAAD//wIAAAD//wAABAAAAP7///8DAAAAAAAAAAAA//8BAAIAAQD9/wAAAwAAAPv/AQAFAP7//P8CAAIA///+////AQABAP7///8BAAAA/v8AAAEA///+/wAAAwD///z/AAACAP////////7///8DAP///f///wEA//////7/AAAAAP///f8AAAAA/v/+/wIA/v/8/wAAAwD8//v/AQADAPz//f8AAAAA/v/////////+//7///8AAP3///8AAP7//f8AAAAA/v/9//7/AAABAP7//f///wEAAAD9//7/AAD+//7/AQAAAPv///8CAP7//P///wAA///+//7///8AAP///f/+/wAA///9//7/AAD////////9////AQD///z//v8AAP7/AAAAAPz//P8BAAIA/P/6/wAAAQD+//v//v8BAP///P/9////AAD8//z///8AAP3//P///wIA/P/6//7/AQD8//z//v////z//v/9/////f/8//z/AQD+//r/+v8BAP7//P/7/////v/9//r///////v/+f8AAP///P/6//3//v////n//P/+////+//8//z//v/+//z/+f/+/////v/8//3/+//9//7////6//v//f8AAPz/+//7/wAA/v/8//v////8//z//f////z//f/9/wAA/P/7//z/AQD///z//P8AAP7//v/8//7//v8AAP7//P/9/wIA///7//z/AgD///7//f///////v/9/wAA//////7///8AAAEA/f/9/wEAAAD8/wAAAQD///3/AQAAAP///f/+/wEAAQD8////AgD+//3/BAAAAPr///8EAP3//f8BAAAA/v//////AAABAP///f///wIAAQD8//7/AQAAAP////8AAAAAAAD+////AgAAAP3///8CAAAA/v8AAAAA//8AAAAA/////wEA///+/wEAAAD///////8BAAAA/v///wAAAAAAAAAA/v///wEA//////////8BAAAA/f///wIA/////wAAAAD//wEAAQD///7/AAABAAIA///9////BAACAP7//v8BAAEAAgD///3///8FAAMA/f/7/wMABgAAAPr/AQAEAAAA/v8DAAEA/P8BAAQA/v/+/wMAAQD9/wAAAgD/////AQD/////AQACAP///f8AAAMAAAD9/wAAAwAAAP7///8AAAIAAgD9//3/AwACAP3/AAACAP///v8CAAEA/////wEA//8CAAEA/f///wUAAAD9/wAABAD/////AQABAP//AQABAAEA//8AAAAAAgD/////AQABAP//AQAAAP////8EAP///P8BAAYA///7/wAABgD///z/AQAEAP7//v8CAAIA/v8AAAAA//8BAAMA/v/9/wEABAD///7///8BAAAAAgD///7/AQADAP7//v8AAAMAAAD///7/AwABAP7///8CAP//AAABAAAA/v8CAAAA/////wIA/////wAAAQAAAAAA/f8BAAMA///7/wIAAgD+//3/AgABAAAA/v//////AgAAAP///f8AAAIAAgD9//3/AQADAP7//v8BAAEA/v8BAAEAAAD//wEAAAD//wAAAQD//wAAAQAAAP//AgAAAP7/AAACAAAAAAAAAAAAAQABAP//AAACAAAA//8CAAEAAAAAAAAAAQABAAIA///+/wIABAD+//3/AgADAAAA//8AAAIAAQAAAP7/AQADAP///f8DAAMA/v/9/wQAAQD+/wAAAgD/////AgACAP3/AAADAAEA/v8AAAEAAQD//wAAAQACAP///v8CAAMA/f///wMAAAD+/wMAAgD9////AwABAP///f8BAAMAAQD8////AgABAP//AAD//wAA//8BAAEA/v/8/wMAAwD9//3/AwD///7//v8BAP//AAD+//7/AAACAPz//v8AAAAA/P8BAAAA/v/7/wEAAAD+//3////9/wAA//////v///8BAP//+v/+////AAD9//7//P/////////7////AAD+//r/AAAAAP7/+//+////AgD9//v///8DAPz//P8AAAEA/P8AAP///f/+/wIA///+//7/AQD+/wAA////////AAD//wIA///+////AwAAAP////8BAP//AQAAAAAA//8BAAIAAQD+/wAAAQACAP//AQABAP////8EAAIA/P/9/wYAAwD9//7/AwACAAAA/v8AAAEAAgAAAAAA//8BAAIAAQD+/wAAAgAAAP7/AgACAP///v8BAAEAAAAAAAEA/////wEAAQD//wAA/////wIAAQD//wAAAQD+/wAAAwAAAP3/AAABAAIAAAD/////AwABAP////8BAP//AQABAAAA//8DAAAAAQAAAAAA/v8CAAEAAgAAAAAA/v8FAAIA/f/+/wYAAQD+////BQAAAP//AAAFAP////8CAAMA/f8DAAIAAAD//wQAAAAAAAEAAgD+/wIAAQABAP//AgAAAAIAAAACAP//AAAAAAMAAAAAAP//AgAAAAIA//8AAAAAAwAAAP///v8DAAAAAAAAAAIA/v/+/wEABAD+//3///8EAAEA/v/+/wMAAQD/////AgD//wEAAQABAP//AQABAAIA/v///wMABQD9//7/AwAFAP7//P8CAAYAAAD9/wEAAwD//wIAAgD+////BQACAP7/AAADAAEAAgAAAAAAAgACAP//AgADAAEA//8DAAMAAAD//wIAAgADAAAAAQADAAMA//8BAAIAAgAAAAIAAQADAAEAAAABAAQA//8AAAQABAD9/wAAAwACAP//AgABAAAAAQAEAAAA/v///wIAAgACAP3//v8CAAQAAAD+////AQABAAIA///9//7/BAADAP7//f8BAAIAAgD+//7/AQADAP///v8BAAIAAAD//wAAAgAAAP//AgACAP3///8EAAIA/v///wEAAgACAAAA/v8BAAQAAAD9/wIABAD+//3/BAAEAP////8AAAEAAgACAP7///8DAAIA//8AAAAAAQACAAEA/f8CAAQA///+/wIAAgABAAAAAAABAAIA//8BAAQAAQD9/wIABAAAAPz/AgAFAAAA/f8DAAQA/v///wUAAQD9/wEABgD///3/AwAEAP3///8GAAIA+/8CAAUAAQD+/wEAAAACAAEA/////wUAAgD9//7/BgADAPv//P8HAAQA/f/9/wQAAQABAAEAAAD+/wIAAgACAP7/AAADAAMAAAAAAAAAAgAAAAIAAQABAP//AQADAAIA/f8AAAIAAwAAAAAAAAAAAAEAAwD///7/AQAEAAAA/f8BAAMAAAD//wAAAQABAAEA//8AAAMAAAD+/wEAAgD//wEAAgD/////AwABAAAAAQAAAP//BAADAPz//v8GAAQA/v/9/wMAAwD/////AgACAAAAAAADAAEA/////wEAAgABAAAAAAAAAAIAAAABAAEA/v8AAAMAAAD9/wEAAgD+////AgAAAP////8BAAAA//8BAP///f8BAAIA/v/9/wIAAQD+/wAAAQD9////AgAAAPz/AAACAAAA/v///wAAAAABAAAA/P8AAAMAAQD8//7/AgABAP//AAD9////AwADAPz//P8DAAMA/v/+/wAAAgABAP///v8BAAIA///9/wIAAgD+////AgAAAP//AQAAAAAAAgAAAP7/AAABAAEAAgD///z/BAAGAP3/+v8EAAUA/f/+/wMAAAD+/wEAAgD///7/AQABAP///v8AAAAA//8AAAEA/f/+/wEAAQD8//3/AgACAPz//f8CAAEA/P///wAA/v/8/wIAAQD8//z/AQAAAP7//f8AAP///v/+/wAA/f/8////AwD9//r//v8DAP//+//9/wEAAAD9//3/AAD///3//v8AAP///f/8////AAD+//3///8AAP7//f/+///////9//3///////7////+//z///8CAP//+//+/wEA/v/+/////f/+/wIAAAD7//7/AwAAAPz//f8BAAEA/v/+/wAAAQD///7///8CAAAA/f///wIAAQD/////AAD//wEAAQD///3/AQADAAEA/v///wAABAABAP3//v8FAAIA/f8AAAQAAAD+/wAAAwACAP///v8DAAMAAAD//wEAAQABAAAA/v8BAAUA///6/wQACAD8//n/BgAGAPr//P8GAAMA/f///wIAAQAAAP//AAAAAAAAAAABAP7//v8BAAIA///9////AgAAAP7//v8BAAAA//8BAP///v8BAAEA/v///wEA/////wEAAAD+/wAAAAAAAAAA/v/+/wIAAwD9//v/AgADAP3//f8CAAEA/v8AAAEA/v/+/wIAAAD9////BAABAP3///8CAAAAAAD//wEAAAD//wAAAwAAAP7/AQADAP//AAAAAAEAAAAAAAEAAwD/////AgADAP7/AAABAAEAAAACAAEAAQAAAAAAAQADAP////8BAAIAAAABAAEAAQAAAAEAAQAAAP//AgADAP///v8DAAIA/v8AAAIAAAAAAAIAAgD//wAAAgACAAAA/v8BAAQAAAD9/wIABQD///7/AwACAP7///8DAAEA//8BAAEAAAACAAEA/v8AAAMA//8AAAIA///+/wMAAQD//wAAAQAAAAIAAQD+//7/AwAEAP///P8DAAUA///8/wEAAwACAP///v8BAAUAAAD8/wAABQAAAP7/AgACAP7/AAACAAEA/v///wIAAwAAAP7/AQABAAAAAQD///7/AgAEAAAA/f///wIAAgD///3/AAACAAAA//8BAAEA/v///wEAAAAAAAAA/v/+/wMAAgD9//7/AgABAP7///8AAP//AAAAAAAAAAD+//7/AwABAPv//v8DAP7//v8BAP///P8BAAIA/f/8/wEAAQD9//3/AQD///3///8BAPz//v8AAP7//f8AAP///v/+/wAA/v///////v///wEA/P/9/wEAAwD8//v/AAAEAP///P/9/wMAAQD8//z/BAABAPz///8EAP///P8BAAMA/v8AAAIAAAD//wIAAgD///7/AgADAAEA//8AAAMAAgD+/wAABAACAP3/AQAGAAEA/v8BAAIAAQACAAEAAAACAAIA//8BAAMAAQD//wIAAwABAP//AQACAAIAAAABAAEAAgACAAEA//8CAAMAAQD+/wIAAwAAAP//AwABAAAAAQABAAAAAwABAP//AAAFAAAA/f8BAAUAAAD+/wEABQAAAP7///8EAAIA//8AAAIA//8CAAIA///9/wMAAwABAP//AQAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAAD//wMAAAD//wEAAwD+//7/AQACAP//AAAAAAEAAAD//wAAAgD+//7/AQACAP/////+/wAAAwAAAPr///8FAAIA+v/+/wQAAgD8//7/AwABAPz/AQADAP///v8CAAIA/////wIAAAD//wIAAwD/////AwADAP7/AQADAAAA//8CAAUAAAD8/wIABgABAP3/AgAFAAAA//8EAAMA//8AAAMAAwAAAAEAAwACAAEAAgABAAAAAgAFAAAA//8EAAQAAQAAAAEAAgAFAAMA/v8CAAcAAwD+/wEABQAEAAEAAQACAAMAAgACAAIAAgAAAAQABQABAP//AwADAAAAAQAEAAEAAgACAAIAAAACAAMAAQD//wMAAgABAAAAAgACAAIAAAAAAAIAAwD//wAAAQACAAAAAQABAAEAAAABAAEAAQD//wAAAQADAAMA/v/9/wMABQD+//z/AwAEAP////8CAAIAAAD/////AgACAAAA//8AAAEAAgABAP///v8BAAEAAQABAP///v8CAAMA///9/wEAAgABAAAA/v///wIAAQD+////AQAAAP//AAAAAAAA//8AAAAA/v/+/wIAAgD8//3/BAACAPz//f8CAAEA/f///wIAAAD9/wAAAgD+//z/AQACAPz//v8DAAAA/P/+/wEAAAD9////AAAAAP////8AAP7//v8BAP///////////v8BAAAA/f/9/wIAAgD+//z/AAACAAAA+/8BAAQA/f/6/wQABAD8//v/AgABAAEAAAD9//3/BQACAPz//f8EAAEA///+/wEAAAAAAAAAAQD+/wEAAAAAAP7/AgAAAP3//v8FAP///P///wMA///////////+/wIAAAD+//3/AQAAAAAA/P///////////wAA/v///wAA///+/wEA///8//7/AgAAAP3//v8BAAEA/f/+/wEA///9////AgD+//v/AgADAPv/+/8DAAIA/P/9/wEA/////wAA/v/9/wAAAAD////////+////AAABAP3//P8AAAMA///7////AAD+////AAD+//3/AAABAP7//P8BAAMA/P/8/wIAAgD9//7//////wIAAAD7////BAAAAPz/AAABAP7/AAABAP7///8CAP///f8BAAIA/v///wEAAQAAAAEA/v///wIAAgD/////AAACAAEAAAD+/wEAAgABAP7/AAACAAMA/v///wIABAD/////AAADAAEAAQD+/wIAAwADAP3///8DAAUA/f///wIABAD//wEAAQACAP//AgABAAIA/v8CAAEAAgD//wMAAQAAAP//BAABAAAA/v8DAAEAAQD+/wAAAwACAPv/AQAEAAAA+/8CAAIA/v///wIA/f///wEAAAD9/wEAAgD///v/AQACAP7/+/8AAAIAAAD9/wAA/v/9/wAAAwD8//v/AgADAPv//v8AAP7//v8CAP///f/+/wEA//////3//v///wEA///+//z/AAABAP///P/+/wAAAQD+//3//f8CAAEA/P/7/wIAAgD9//z/AAAAAP7//v////7/AAD///3//v8AAAAA/v/+//3///8BAP7//P///wAAAAD9//3///////3///////7//f8AAP7//v////7/+////wEA///8//7///8BAP7//P/9/wEA///9//7/AAD+/////v////7/AAD+//3///8CAP3//P8AAAIA/v/+/wAAAAD+/wAA/v///wEAAAD9////AgACAPz//v8BAAEA///+/wAAAgD+////AQACAP7//f8CAAMA////////AAAAAAIA///+/wAAAwD///7/AgADAP3//v8CAAIA/v///wEAAQD+/wAAAAABAP7//////wEA//8AAP/////+/wAA//8AAP7//////wIA/f/9/wAAAgD8//3/AAABAP3////+/wAA/v8AAP7//v/9/wEA///+//z///8BAAIA+//7/wEABQD7//n/AAAEAP7//f/+/wAA//8BAP7//f/+/wIAAQD///z///8CAAEA/f8AAAIAAAD8/wEAAwD///3/AwADAP7//v8DAAIAAAD+/wAAAgADAP////8BAAMAAAD//wEAAgD/////AgADAP//AAAAAAAAAQABAP7///8BAAIAAAD/////AQAAAP7///8CAAAA/f///wMA/v/8/wEAAgD+//3/AAACAP///f///wIA///9/wEAAQD9////AQD/////AQD///7/AAABAP7//v8BAAEA/f/9/wEAAwD9//z/AgACAP3//v8BAP///f8BAAEA/v/+/wEAAgD+//z/AAACAAAA/P/+/wEAAQD+//7//////wAAAAD+////AQD///3/AAAAAP7//v8AAP///v8AAAAA/f/9/wAAAQD9//7/AAD+//3/AQAAAPz//f8BAAEA/f/7/wAAAgD///v//v8BAAAA/f/8/wAAAwD+//v///8CAP7//v/+////AQD///3///8CAP///P8AAAIAAAD8//3/AwADAPv/+/8EAAQA+//8/wQAAQD7/wAAAwD+//7/AQAAAP//AQD///7/AAACAAAA//8AAAEAAAD/////AgABAP7//v8EAAIA/f///wQAAAD+/wEAAgD+/wEAAQABAAAA//8AAAMA/////wEAAQD+/wMAAgD9//3/BQACAP7//v8EAAEA///+/wQAAQD+//7/BAABAAAA/v8CAAEAAgD//wEAAAABAP//AwD//wAAAAAEAAAAAAD+/wUAAgD///v/BgAFAP7//P8FAAEAAQABAAIA/f8EAAIAAAD//wMA//8CAAEAAAD//wQA///+/wEABQD+//7/AQADAP7///8AAAAA//8CAAAA/v/+/wIAAAD+//7/AgD///7///8AAP////////////8AAP///f/+/wAAAQD///z///8CAAAA+//+/wQA///7////AgAAAP7///////7/AAABAAAA/v///wEAAQD9//7/AgABAP3/AAACAAAAAAABAP7///8CAAIA//8AAAEAAQAAAAEA//8AAAEAAgAAAP//AAAEAAEA/f///wUAAQD+/wAAAgABAAEAAAAAAAEAAwAAAP7/AAADAAEA/v///wIAAQABAAAA/////wIAAQD+/wAAAQAAAAEAAAD//wAAAgAAAP7/AQABAP//AAAAAAEAAQD/////AQACAP////8BAAIAAAD+/wAABAACAP7///8CAAEAAQABAP//AAAEAAIAAAAAAAMAAgAAAAEAAwABAAAAAgADAAEAAgADAAAA//8EAAUAAAD+/wMABQABAAAAAgACAAIAAgACAAEAAAABAAMAAgD//wIAAwABAP7/AAACAAIA/v8AAAIAAgD+/wAAAQAAAP//AQAAAAEAAAABAP//AAAAAAEAAAABAP7/AAACAAEA/f8BAAEA/////wQA///8/wEABAD//wAAAAAAAAAAAgAAAAEAAQD/////BQADAP3//f8EAAQA///+/wMAAwABAP//AQADAAIA/v8BAAQAAQD+/wMABAD///7/BAADAAAAAAADAAAAAAABAAMAAAD//wEABQAAAP3/AgAGAP///f8BAAQAAQAAAP7/AgACAAAA//8DAAEA/v8AAAUAAQD9////BQABAP7/AAABAAEAAwD///7/AQAEAP///v8BAAIA/////wIAAgD9/wAABAAAAP3/AQAEAAAA/v8AAAMAAQD+/wAAAwAAAAAAAQAAAAEAAQD+////BAABAPv/AQAFAP///P8DAAIA/v///wMAAAD//wAAAgAAAP////8BAAAA/////wEAAAAAAP////8AAAAA//8AAP///////wAA//8BAP////8BAAAA/f8AAAEAAQD+//7///8DAAEA/v/+/wAAAgACAPz//f8EAAQA+//+/wUAAwD9////AQACAAEAAQD//wIAAgACAAEAAgD//wEABAADAP//AgADAAQAAQACAAIABAABAAIAAwAEAAAABAAFAAQA//8DAAYABQD+/wMABgAGAAEAAgACAAgABQABAAEACAADAAIABQAGAAAABgAGAAMAAQAHAAQAAwADAAUAAwAGAAMAAgADAAgABAABAAEABwAFAAEAAQAIAAUAAAACAAYAAgACAAMABQACAAMABAAEAAIAAgADAAUAAQACAAQAAwABAAMABAADAAIAAwACAAMAAwADAAMAAgAAAAQABQABAAAABQADAAIAAwAFAAAAAAAEAAYAAQAAAAMABQAAAAQABQD+//7/CAAGAP7///8FAAIAAgAEAAEA//8DAAMAAQAAAAIAAgACAAEAAAACAAMAAQD+/wAAAwADAAAA/v8BAAMAAQABAP//AAABAAIA//8AAAIAAQD9/wEAAwAAAP3/AgACAP///v8CAAEA///+/wEAAgABAP7///8AAAMAAQD9//z/AgAEAAEA/P/9/wMABgD8//v/AwAFAPv//P8EAAQA/f8AAAAAAAAAAAIA/v/+/wMAAgD6/wEABgAAAPn/AgAFAP///P8BAAAAAgABAP///v8DAAEA/v///wMA/////wIAAwD9////AgACAP7/AAACAAEA/v8BAAEAAAD//wEAAQABAAEA/v///wQA///+/wEAAQD+/wEAAgD+//3/AgAAAAAA////////AQAAAP///f8AAAEAAAD9/wAA/////wAAAAD8/wEAAAD9//3/AgD+//7/AAD+//v/AgAAAPz/+/8BAP///v/9////+//+///////8//7//v////z//f/9/wEA/f/7//3/AgD9//r//v8CAPv//f/+/////P/+//3//v/8/////f/+//3//v/7///////8//n/AwD9//n/+/8DAPv/+//9//7//P8AAPr//f/9//7/+v/+//3//v/7//7/+/////z//f/6/////v/9//n////+//7/+v/+//3//v/8//7//f8AAPv//P/+/wEA/P/7//3/AQD///7/+v/+/wAA///8//3///8AAP7//f/8/wEAAAD8//z/AAAAAP3//f8AAAAA/v/9////AgD+//v///8DAAEA/P/8/wIAAQD///7/AAAAAAAA//8BAP/////+/wEAAQD/////AQD//wAAAAABAP7/AAAAAAEAAAAAAP7/AgACAAAA/P8BAAIAAwD+//7/AAAEAAAA/v///wMA/v///wIAAgD9/wAAAAACAP//AAD//wEAAAACAP//AAD//wQAAAD+////BAAAAAEA//8BAAAAAwD//wAAAQADAP3/AgACAAEA/f8CAAIAAgD9/wEAAgADAPz///8DAAUA/P/+/wIABQD9////AQADAP7/AAD//wIAAAABAP7/AQAAAAIA/v8AAP//AAD//wIA//8AAP//AQD+////AAABAP3/AQACAP7//P8EAAEA+//+/wQA///+/wIAAAD8/wEAAgABAP3//v8BAAQAAAD8//7/AwABAP//AAABAP//AAACAAAA/P/+/wMAAgD+////AQABAP//AAD/////AAAAAAEAAQD+/wAAAgD///3/AgAAAP7/AQACAP////8AAAAAAQABAPz//v8DAAIA/f/+/wIAAQD+/wAAAQD///3/AgACAP3//v8CAAEA/f///wEAAAD+////AAABAP7//f8AAAIA/v/+/////////wIA///8//7/AwAAAP3//f8BAAAA///9/wAAAAAAAPz///8CAAEA/P/+/wAAAAD//wEA/v/+////AgD///7//f8AAAEAAQD+//7//v8BAAAA///9/wEAAAD+//7/AQAAAP///f///wAAAQD8//7/AAAAAP3//v8AAAAA/f////7/AAD///7//v8AAP7//f/+/wIA/f/8/wAAAgD9//z/AAABAPv//f8BAAEA+//8/wEAAQD8//3//v/////////8//7/AQD+//v/AAAAAPz//f8CAP//+//9/wIAAAD9//3///8CAAAA+////wQA///6/wIABAD8//z/BAAAAP3/AAADAP///////wEAAgABAPz/AAADAAEA/v8BAAEAAQABAAAA//8CAAAA//8BAAIA/v8BAAQA///8/wQABAD9//7/AwABAP7/AQACAP7/AAADAAAA/f8BAAMA/////wEAAAAAAAEA///+/wIABAD9//3/AwADAP3//f8BAAMAAAD9////BAAAAPv/AAAEAP//+/8AAAMAAAD+//7/AAABAP///v/+/wAAAgAAAPz//v8EAAIA+//8/wIAAwD+//z/AAABAAAA/////////v8BAAEA/v/9////AQAAAP3///8AAP////8BAP///P///wEA//////////////////8BAAAA/P///wMAAAD9//7/AAABAAAA//8AAAEA/v/9/wIAAgD+//3/AQAEAAAA/v8AAAAA//8BAAMAAAD8/wAABQADAPv//f8FAAQA/P///wQAAgD9////AgACAP7//v8DAAQA/f/9/wIABAD+//3/AQAEAAAA/v///wMAAQAAAP//AgABAP//AAACAP7/AQADAAAA/f8CAAMA///+/wIAAAAAAAEAAgD+/wAAAgABAP//AgAAAAAAAAABAAEAAgD+//7/AwAEAPz//v8DAAIA/v8AAAAAAAABAAIA/////wAAAwAAAAAA/v8BAAIAAQD//wEAAAABAAEAAQD9/wIAAgD/////AwD//wAAAgADAP3/AAABAAMAAQABAP//AwABAAIA//8DAAIAAAD//wUAAwAAAP//BQAAAAAAAgAFAAAA//8AAAUAAQABAAIAAgD+/wQABAABAP7/AwABAAIABAADAP3/AQADAAMAAAABAAEAAgABAAEAAQABAP//AgADAAAA//8DAAIA/v///wQAAwAAAP7/AQAEAAMA/f///wMAAwABAAAA//8AAAQAAwD8//7/BAAFAP///v8CAAMAAAABAAAAAgACAAEAAAADAAEAAQABAAIAAAACAAMAAQAAAAIAAgABAAAAAgACAP//AQADAAEAAAABAAEAAgADAAAA//8EAAMA/f///wYAAgD9/wAABQACAP//AAACAAEAAgAAAAAAAQADAAAAAAACAAIA//8CAAIA//8AAAQAAgD//wAAAwABAAEA//8AAAMAAQD//wMAAgD+////BAABAP3/AAAEAAIA/v/+/wMAAgD+//7/AgAAAAAAAQABAP3/AAADAAAA/P8BAAIAAAD9/wIAAgD///7/AwABAP///f8DAAEA/////wIAAAACAAAAAQD+/wEAAgACAP7/AgABAAEA//8CAAAAAgABAAAAAAAGAP///f8CAAUA/v///wQABAD8/wIAAwAAAP//BAAAAP7/AgAFAP7/AAAAAAIAAQABAP//AgAAAP//AgADAPz/AQADAAAA/P8DAAMA/f/9/wQAAQD+//7/AwABAP7//v8BAAAAAAAAAAEA/v/+/wIAAwD9//3/AQACAP//AAAAAP7/AAACAP////8AAAAAAAABAAAA/v8BAAEA//8BAAIA//8AAAIAAAD+/wIAAgD+//7/BQAEAPz//P8GAAUA/P/8/wUAAwD+/wAAAwD//wAAAwADAP3/AAAEAAIA/f8BAAMAAQD9/wIAAwAAAP7/AwACAP///v8BAAAAAQAAAP///v8DAAEA///+/wEAAAAAAP7/AAD//wAA//8AAP7/AAABAAAA+////wIAAQD9//7//f8BAAMA///5/wAABAD///z/AAD///3/AAADAPz//P8CAAEA/f///wAA/v/+/wIA///+////AAD//wAA//8AAP////8AAAIA///9/wAAAwD+//3/AQABAP7///8BAAAA//8BAP7//v8CAAEA/P/+/wMAAgD8//7/AwABAPv//v8DAP///P8AAAEA//////7//v8BAAAA/f/+////AQAAAP3//P8BAAIA/v/9/wAA//////7/AQD+//z/AAAEAP//+//9/wIAAQD///7/AAD/////AgABAPz//v8DAAIAAAD/////AQADAAEA/f///wQAAgAAAP//AAACAAIAAQAAAP//AAADAAQA/////wIAAgD//wEAAgABAAAAAAACAAMAAAD+/wIAAgD+////BAAAAP3/AQADAP7/AAAAAP//AAABAP3///8EAAAA+v8CAAQA/f/8/wMAAQD8//7/BAD///v/AAAEAP7//v8BAAAA/f8BAAAA/f/+/wIAAAD+//3/AgACAP3/+/8CAAMA/f/8/wMAAgD9////AwAAAP3/AAADAP7//v8BAAIAAAD/////AgABAP///f8BAAMAAQD8////BQADAP3///8BAAAAAgADAP3//v8FAAMA/P8BAAUA/v/8/wYABQD7//v/BgAGAP3/+/8CAAMAAQD+////AAADAAAA/f8AAAMA///+/wAAAgAAAAAA/////wAAAAD//wEAAAD+////AwAAAPz///8DAAAA/v8AAAEAAQAAAP7/AAADAAIA/v/+/wIAAwAAAP//AQABAAAAAQABAAAAAgAAAP//AgACAP//AAABAAEAAQABAAAAAgAAAP//AwABAP7/AQACAAAAAAABAP//AQACAP///v8BAAMA///9////AQABAAAA/v/+/wEAAwD///3///8BAAIA///8/wAAAQAAAAAAAAD9/wAABQD///j/AgAFAP3/+/8DAAIA/v/+/wAAAAACAP7//f8BAAMA/v/+/wIAAAD8/wIABAD9//v/AgAEAP///P8BAAEA/////wEAAAD+/wEAAgD/////AAABAAAA//8AAAEAAAAAAAAA///+/wIAAgD9//z/AgADAP//+v///wQAAgD6//z/AwACAPr//v8DAP//+/8BAAIA/v/6/wAAAgD+//n///8BAP7/+/8CAP7/+//+/wAA/P/9//7/AAD9//3//f8AAP//+//7/wIAAQD8//n/AAACAPz/+v8AAAEA/f/8/wAA///9//7/AAD+//z/AAACAP7//P///wEA///+//7///8BAAAA/f/+/wIAAgD9//v/AgAEAP7/+/8AAAUAAQD6////BQAAAPr///8FAAAA/P///wIAAQD+//3///8BAAAA/////wAA/////////v/+/wIAAAD7//7/AgD///3//f///wAAAAD9//7/AAD///3//v/9/wAAAQD8//r/AgADAPz/+f8AAAIA///7//7///8AAP///v/9/wAA///+////AgD8//z/AgABAPv///8BAAAA/f8AAAEAAAD9//7/AgACAPz///8CAAEA/f8AAAAAAAABAAIA/v///wAAAgAAAP///v8CAAEAAQD///////8CAAAA/v///wIAAAAAAP7///8CAAIA+////wQAAQD7/wEAAgD+//7/BAD///z/AAADAP///f///wAAAAD///7/AAD/////////////AAD+//7/AQAAAPz/AAABAPz//v8DAP7/+/8AAAMA/v/9////AAAAAP///f/+/wEAAQD9////AQAAAP3/AAABAP///v8BAP////8AAAIA/////wAAAQD//wEAAAAAAP//AgABAAAA//8CAAEAAAD//wEAAQABAAAAAQAAAAEAAgAAAP7/AQADAAAA/v8BAAIAAgD//wAAAgAAAAAAAwABAP7/AQAEAP///v8CAAIA//8AAAIAAQAAAAEAAQAAAP//AgACAP//AAACAAAAAAAAAAIAAAD//wAABAACAP3//v8FAAIA/v/9/wIABAABAP7/AQACAAIA//8AAAAAAgAAAAAAAgADAP////8AAAIAAQAAAP7/AQADAAMA///+////BgAEAPv//P8GAAUA/v/9/wMAAgACAAEAAAD//wMAAgAAAAAAAwABAAEAAQABAAEAAgAAAP//AwADAP////8CAAIAAAAAAAEAAQABAAEAAQABAAAAAAADAAIA/////wMAAwAAAP//AgACAAAA//8DAAIAAAAAAAIAAgABAAAAAQAAAAIAAgAAAAAABAADAP3//v8GAAUA/f/9/wUABAD/////AgADAAEA//8BAAMAAgD/////AwADAAAA//8CAAQAAAD+/wEAAwAAAP//AAACAAIAAAD+/wEABAAAAPz/AQAEAP///v8DAAEA//8AAAEAAQACAP///v8BAAMA//8AAAEAAgD/////AAADAAEA/f/+/wQAAgD+//3/AQADAAEA/P///wQAAwD7//z/AgAEAP7/+/8AAAUA///8/wAAAwD+//3///8BAP/////+/wAA////////AQD8//7/AQABAPz//v8AAP///v8BAP3//v8AAAAA/P8BAAAA/f/8/wEAAAD+//z/AAAAAP///v8BAPz//v8CAAAA+/8AAP///f///wQA/P/7/wAAAwD8//3///8BAPz///8AAP///P/+////AgD9//z//v8EAP3/+////wMA/v/9//7/AQD+/wAA//////z/AQACAAAA+/8AAAEAAQAAAP7//P8DAAIA///9/wEA//8BAAEAAAD+/wAAAAADAAEA/P/+/wUAAQD+/wAAAwAAAP7/AQACAAAA/////wIAAgAAAAAAAAAAAAAAAgABAAAAAAACAAIAAQD9/wEABAABAP7/AwADAAEA//8CAAEAAwAAAAIAAwADAP//AQACAAUA/////wQABQD+/wEABAADAP7/AwADAAIAAAADAAEAAgACAAMAAAABAAIABQD/////AwAFAP7/AAAEAAMA//8DAAIAAAD//wMAAQABAAEAAwAAAAEAAgADAP7/AQADAAIA//8BAAIAAgD//wEAAgADAP//AgACAAIA//8BAAIABAD//wAAAwAFAP7//v8DAAUA//8AAAAAAwADAAIA/v8AAAIABAACAAAA/v8EAAMAAQABAAMA//8CAAUAAgD9/wEABQAEAP7/AQAEAAIA//8DAAMA/v///wYAAwD+////BAADAAEAAAABAAEAAwABAAEAAQACAAEAAgABAAEAAQACAAAAAQACAAEA//8AAAIAAgD//wAAAQACAAAA//8AAAIAAQD///7/AgADAP///f8BAAMAAAD8/wAABAABAPz/AAAEAAAA/f8AAAEAAAD+/wAAAwABAP3///8DAAEA/f///wEAAQAAAP////8CAAEA/v///wIAAAD+/wEAAQD+/wEAAgD+//3/AgADAP7//f8BAAMAAQD9//7/AQABAAAA/////wAAAQAAAAAA/v///wAAAAD//wAAAAD/////AQD///////8AAAAAAAD//wAA/v/+/wAAAwD///3///8CAAEAAAD9//7/AAADAAEA/f/+/wIA//8BAAIAAAD8/wAABAABAP3///8BAAMAAAD//wEAAAD//wMAAQD9////BQAAAP3/AQADAP///v8BAAMA//8AAAIAAQD//wIAAQD+////BAABAP//AQADAP//AQABAAEA//8BAAEAAgAAAAAAAQADAP//AAAAAAEAAQADAP7///8EAAMA/P8BAAMAAAD+/wQAAAD//wMAAwD7/wEABAD///7/AwAAAAAAAgABAP3/AgABAP7/AAADAP7//v8DAAIA/f///wIAAQD//wEA//8AAAEAAAAAAAAA//8BAAIA///+/wMAAgD+////AgABAP7/AAACAAIA/v8AAAMAAQD+////AgACAP7/AAABAAEAAAAAAP//AQACAP///v8CAAEA/////wAA//8CAAEA/f///wMAAAD9////AgD/////AQAAAP7///8CAP///P8AAAIA/v/9/wEAAgD+//7//v8AAAEA///9////////////AQD///3///8CAAAA/f/9/wEAAAD+////AQAAAP7//v8BAAAA///+////AQAAAP7/AAACAP///f8CAAMA/v/9/wEAAwAAAP7/AAADAAAA/f8BAAMA/v/+/wIAAwD/////AAABAAEA///+/wMAAQD9/wAABQD///3/AgADAP3/AQADAP7//f8FAAMA/P/9/wUAAgD9//7/AwACAAAA/v8BAAEAAAD//wAAAAAAAAAAAQD/////AQACAP3//f8DAAQA/f/8/wEAAQD//wAA/////wEAAAD+/wAAAAD9////BAD///v/AAAEAP//+////wMAAAD+//7/AQABAAAA/f8AAAIAAAD9/wIAAQD+////AgAAAAAA//////7/BAACAP3//P8CAAMAAAD8/wAAAQAAAP7/AQAAAP7///8CAAAA/v///wIA/v/9/wEAAwD+//3/AQABAP7/AAAAAP7///8BAAAA/v///wAAAAD///7///8AAAEA///8/wAAAwAAAP3///8BAP////8AAP////8BAAAA/v8BAAIA/v/+/wEAAQD///////8AAAAAAQABAP///f8AAAMAAAD+/wAAAAD//wEAAgD+//7/AQABAAAA////////AQABAP7///8BAAEA///9/wEAAgD9//7/AgABAP3//v8BAAEAAAD+//7/AQAAAP7///////7/AQAAAP////8BAAAA/////wAA//8AAAAAAAD+/wEAAQD///7/AgD//wAAAQD///7/AgABAP7//v8BAAEAAQD+//7/AgACAP7///8CAAEA//8AAAAAAQABAP7/AAADAAAA/f8CAAMA/v/9/wMAAgD///7/AQABAAEA/////wAAAwAAAP3/AAAFAAAA/P///wQAAAD//wAAAQAAAAEA/////wAAAgD+////AwABAP3/AAACAAAA/f8AAAEAAQD/////AQACAP3//v8CAAMA/f/8/wEABQD///v//f8FAAMA/P/6/wMABQD+//r/AQADAAAA//8AAP7///8CAAIA/P/+/wIAAQD//wAA////////AgAAAP7///8BAAAA/v8AAAMA/P/9/wQAAgD6////BgD///n/AQAEAP7//P8BAAIA///+/wAAAAD///7/AQAAAP7///8BAP///v8AAAEA/v8AAP////8AAAAA/v8AAP///////wEA/f///wIAAQD7//7/AgACAP3//f/+/wQAAQD8//z/AwABAP7//f8AAAAAAAD9/wAAAAD///3/AgAAAP3//f8AAAAAAQD9//z/AAAEAP7//P///wIA///+//3/AAAAAP///v///wAAAgD9//z///8CAP/////+////AAABAP3///8AAP////8BAP///v///wIA///+////AQAAAP///P///wIAAQD8//7/AgABAP3//////wAA///+////AQD///7/AAABAP///v///wEA/v/8/wAAAgD+//7/AQD///3///8BAP7//P/+/wIAAAD7//7/BAD+//r/AAADAPz//P8BAAAA/f////7///8BAP7//P8AAAAA///9////AAAAAP3///8BAP//+/8AAAEA/v/9/wEAAAAAAP3//v8BAAAA+////wMAAAD6/wEAAgD+//3/AgAAAP7///8DAP7//v8BAAIA/P8AAAMAAQD7////AwADAP7//v///wQAAQD///7/AgACAAAA/f8CAAMAAQD9/wEAAwAAAP3/AwADAP///v8CAAMAAQD9/wAAAgADAP////8CAAIA//8AAAEAAgD//wAAAQACAAEA/f/+/wQAAwD+//3/AwACAAAA//8AAAAAAQD//wAAAQAAAP//AQAAAP//AAACAP7//f8CAAQA/P/9/wQABAD7//3/BAADAPz//P8BAAUAAQD7//7/BAABAP7//v8AAAEAAQAAAP////8AAAIAAgD+//3/AgAEAP///P8BAAQAAQD+/wAAAAACAAEA/v8AAAMAAAD//wIAAgD//wAAAgABAAAAAQAAAAEAAQAAAAAAAgABAAAAAAABAAEAAAAAAAIAAAD+/wAABAACAP3///8DAAIA//8AAAIAAQAAAAAAAQACAAEAAAAAAAIAAwABAP//AQADAAIAAAD//wIABQAAAP//AwAEAAAAAQADAAEAAAADAAIAAgACAAEAAAAEAAQAAAD+/wQABgABAP3/BQAFAAAA//8FAAMAAQABAAQAAgADAAEAAgABAAUAAwAAAAAABQACAAAAAgAFAP//AAAEAAUA/////wEABQACAAAAAAAEAAMAAQD//wIAAgACAAEAAgABAAIAAQABAAEAAQABAAEAAQABAAEAAgABAAAAAAACAAEA//8AAAIAAQD//wEAAwAAAP3/AQAFAP7//P8CAAUA///+/wEAAwAAAP//AAACAAAAAAAAAAEAAQABAP////8CAAIA/v///wIAAwD+//7/AgABAP//AgABAP7///8EAAIA/P/+/wUAAwD7//7/BQABAPz/AQADAAAA//8BAP//AAAAAAEAAAAAAP7/AgABAP///P8DAAIA///8/wAAAgADAP3//f///wYAAAD8//z/AgACAAEA/P///wEAAwD9//7/AQACAP3/AAABAAEA/f8BAAAAAAD//wIA/////wIAAwD8////BAADAPz/AAACAAAA//8CAP7///8DAAMA/f///wIA///9/wMAAQD9//3/BAACAP7//P8AAAIAAAD9/wAAAQD/////AgD9//7/AAAAAP7/AAD///////8AAP7/AAD///7///8BAP////////7//v8DAAEA+//9/wQAAgD8//7/AgD+//7/AQABAP3///8BAP7///8CAP7//f8BAAIA/v///wEA/////wAA//8AAAEA///+/wAAAQAAAP///////wAAAQD///3/AAACAAAA/f/+/wMAAgD8//3/AwADAPv//v8EAAEA/P/+/wMAAgD9//7/AgABAP7/AAABAP////8CAAAA/f8AAAMA///9/wAAAgD+////AgD///7/AQAAAP///v8AAAAA/v///wIA///9/wEAAQD+////AgD///3/AQABAP////8AAAAA//8CAAEA/f///wIAAQAAAP////8AAAMAAQD+/wEAAgD//wEAAgAAAP//AwABAAAAAgACAAEAAgD//wAABAADAP7/AAACAAQAAgD+//3/BQAEAP3///8EAAAAAAABAAEA/v8CAAIAAgD+/wAABAAEAPv///8FAAQA/P///wEABAADAP3/+v8FAAYA/f/7/wUAAgD+////AwAAAAEA/////wEABAD+//7/AgACAP7/AQACAP///f8CAAIAAAD//wAAAQACAP////8BAAIAAAAAAAEAAQAAAAAAAAACAAEAAAABAAMAAgAAAP//AQACAAIAAAACAAEAAAACAAUAAAD8/wIABwD///3/BAAGAP3//v8EAAQA/v8BAAMAAQAAAAQAAgD/////BAADAAIA//8AAAQABAD+//7/BQAGAP7//v8EAAMA//8BAAQAAQD+/wIABQD///7/AgACAAEAAwD///7/AwAEAP7//v8DAAIA//8AAAAAAgABAAAA//8AAAEAAAD//wEAAAD//wAAAgAAAP7/AAACAP7//v8BAAIA/v/+/wEAAQD///7///8DAAAA+/8AAAQA///9/wAAAQD+////AQAAAP///////wEAAAD///7/AAABAAAA/f/+/wIAAgD7//7/AwAAAPz/AQAAAP3///8BAP3/AAABAPz/+/8DAAIA/f/8//////8BAP7//f/+/wAA/f8AAAAA/P/6/wEAAwD///n//v8BAAAA/P/9//7/AAD+//7//v////3///////7//P8AAP/////+/wAA/f/9////AgD9//3//v8AAP//AgD9//v//v8EAP7//v////7//f8FAAEA+P/8/wkAAAD3//3/BwD///z///8CAP7//////wAA/v8BAAAA/v/+/wMAAAD+//3/AQABAAAA/v8AAAAA/////wIA/v/+/wEAAAD9/wIAAAD9//7/AQD/////AAD///7/AAD//wAA/v/9/wAAAgD+//3/AAAAAP//AAD///3///8BAAAA/v/9/wAAAQD///////8AAP7/AAABAP///f8BAAIAAAD8/wIAAwD+//z/BAADAP///P8DAAIAAAD+/wEAAQACAP//AAAAAAMA/////wEABAD//wEAAAABAAAAAwD//wAAAgADAP7///8DAAQA/P/+/wQABgD9//3/AwAEAP////8AAAIAAQACAAAAAAABAAIAAQAAAAAAAgAAAAAAAAADAAIA/v/+/wQABAD+//3/AwACAP//AAADAAEA//8AAAMAAAD//wEAAwAAAAAAAQACAP//AgAAAP//AgAEAP7//f8CAAQA/v/+/wEAAwAAAAAAAAABAP7/AQADAAAA/P8CAAMAAAD+/wAAAQACAP7//v8BAAMA/v/+/wIAAgD9/wAAAgAAAP7/AAAAAAIA///9////BQAAAP3/AQADAP7///8AAAAAAAACAP3//f8DAAQA/P/9/wEAAgD+////AAD/////AgD///7/AAAAAP7/AQAAAP3///8EAP7/+/8CAAMA/f/8/wIAAQD9////AAD+/wAAAAD///7/AAAAAAAAAQD+//z/AgAEAP7/+v8CAAQA/v/9/wEAAAAAAAAAAAD9/wEAAgD+//v/AgAEAP7/+v8BAAMA///8////AQABAPz//v8BAAAA/P///wEA/v/9/wEA///9//3/AQAAAP3/+/8AAAIA/f/6/wAAAAD///7//v/9////AQD+//v///8AAP///v/+//3/AAABAP3/+/8BAAAA/f/9/////v////3///8AAP7//P///////v/8//7/AQABAPv//P8BAAAA+f///wEA/f/8/wIA///7//3/AQD8//3/AAD///r///8BAP//+v/+/wAA/v/8/wAAAAD9//z/AQD///7//f////7///8AAAAA/P/9/wAAAgD8//3/AQAAAP3//////wAA/v/+//7/AAD//////v/+//7/AQD///7//P///wEA///8/wAAAAD+//3/AQD///7//v8AAP//AAD+/////v8AAP//AAD+/wAAAAD/////AAD+/wAAAAABAP7/AAAAAP7///8DAP///f8CAAQA/P/9/wQAAgD9/wAAAgAAAAAAAgAAAP3/AAAEAAEA/f8CAAMA/f///wUAAAD6/wEABQD+//7/AwD///3/BAACAPz//v8EAAIA/////wAAAAACAAEAAAD//wEAAwAAAPz/AgAFAP//+/8CAAUAAgD8////AwAEAP7//v8CAAMA//8BAAAAAgAAAAAAAAAEAAAA/v8CAAUA/v///wIAAgD//wIAAQAAAAAABAABAP///v8DAAMAAQD//wIAAQABAAEAAwD///3/AgAHAAAA/P8AAAYAAgD9//7/BAADAAAA//8BAAIAAwD/////AgAEAP7///8EAAQA/v8AAAIAAgABAAIA/v8BAAQAAgD+/wEAAwABAP//AgACAAAA//8CAAIAAgD/////AQAEAAEA//8AAAIAAgACAP//AAACAAIAAAABAAEAAQABAAAAAAACAAEAAAABAAEAAQADAP///v8EAAQA/f8AAAQAAQD//wMAAgD//wIAAwD//wEABAACAP7/AQAFAAIA/v8BAAMAAwD//wAABAACAP//AQADAAEA//8DAAMA//8AAAMAAgAAAAAAAwACAAAAAAADAAMAAAD//wIAAwAAAAAAAwABAAAAAQADAAEAAAAAAAIABAAAAPz/AgAGAAEA/f8AAAIAAwABAP//AAAEAAIA/////wIAAwABAPz/AgAHAAAA/P8DAAMA//8BAAIA//8CAAIA//8CAAQA/v/+/wUABQD+//7/AwAEAAAA//8AAAMABAABAP7/AAAFAAMA/f///wUABAAAAAAAAQACAAMAAwD/////BAAFAP////8CAAQAAwAAAP7/AQAFAAMA/v/+/wIABQADAP7//f8EAAQAAQD//wEAAwACAP//AQAEAAEA/v8DAAMA//8BAAQAAAD//wMAAgD//wEAAgD//wAAAgACAAAAAAAAAAEAAQABAP7/AQADAAAA/v8CAAQAAAD8/wEABgACAPz/AAAEAAIA//8CAAEA//8AAAQAAgD+//7/BAAEAAAA/f8CAAMAAQD//wIAAgAAAP//AgACAAIAAAAAAAIAAwD//wAAAgABAP//AQACAAIAAAAAAAAAAgAAAAEAAQD///7/AwACAP///v8BAAIAAQD/////AgADAP7//f8CAAUA/v/7/wEABgAAAP3/AQACAP//AAACAAEA/v8AAAIAAwAAAP7/AQADAAAA//8CAAMA/v///wIAAwD///7/AQAEAAEA//8AAAEA//8CAAMAAAD+/wIAAgAAAAAAAQAAAAIAAgAAAP//AwADAP7///8EAAUA///+/wIABAACAP7//v8EAAUA///9/wUAAwD9/wEABAD+////BAADAPz/AQAFAAEA/P8BAAUAAQD8/wMABAD///z/BAADAP7//v8DAAEAAQABAAAA/v8CAAIA///8/wMAAwD///7/AgAAAAAAAAAAAP//AgD//wAAAAADAAAA///9/wUAAwD+//z/AwAEAAAA/P8BAAMAAwD8/wAAAgACAP//AAAAAAIA//8AAAAAAwD///7/AAADAAAA///+/wEAAgAAAPz/AAADAAAA/P8AAAIA/v/+/wEA/v/+/wIAAAD7////BAD///r/AAADAP7/+////wMA///8/wAAAgD///z///8CAP///P8AAAIA/v/9/wEAAgD8//z/AgABAP3//v8BAP///P8AAAMA/v/7////AwAAAP3//v//////AAD/////AAD+//3/AgACAPv//P8CAAAA/f///wAA////////AAAAAP7//v8CAAAA/f8AAAMA/v/8/wIAAgD9//7/BAACAPv//f8FAAMA+v/8/wUAAwD7//3/BAABAP3//v8DAAAA/P///wMA///+/wEAAQD9/wAAAgAAAP7/AAAAAAEAAQD///3/AgACAP7//f8DAAAA/v8BAAEA/f8BAAIA/v/9/wIAAQAAAAAA//8AAAEAAAD/////AAACAAAA/v8AAAAAAAAAAP///f8AAAIA///9//////8BAAEA/f/8/wIAAgD9//3/AQAAAP7//v8BAAAA/v/7/wAAAwD+//j/AQAEAPz/+P8BAAEA/f/7//////8AAP3//f///////P/+//3/AAD///3//f8BAPz/+////wEA/P/9//3/AAD///3/+f/+/wEAAAD6//v//v8DAP3/+v/7/wEA/v/9//r//v//////+v/+//3//v/9////+v/9//7/AAD5//7//v////r////9//7/+v////3////9//7/+f///////v/4/////v/+//v//v/8/wAA/P/8//3/AgD6//v///8CAPz//P/+/wEA/P/+////AAD7//7///////3/AAD8//7///8CAPz//P/+/wIA/f/+/wAAAQD7////AwABAPv//v8BAAMA//////3/AQADAAAA/P8CAAMA/v/8/wUAAwD9//7/BQAAAP7/AQACAAAAAQABAAEAAQAAAAEAAwABAP7/AwADAAAAAQACAP//AQADAAMAAQABAAAAAgACAAIA//8CAAQAAQD+/wMABAD+//3/BQADAP////8DAAIAAQD//wAAAQACAAEAAAAAAAEAAQACAAAA/v8AAAUAAgD8//7/BQACAP7///8CAAAA//8BAAIA////////AwAAAAAA/v8BAAAAAAAAAAIA/f///wEAAgD7/wAAAgACAPv///8AAAIA/v////z/AgABAAEA+f8AAAMAAgD7/wAAAAACAP7/AAD+//////8DAP3///8BAAMA+//+/wMAAgD7////AgADAP3///8BAAEA/P8CAAMA/f/7/wUAAwD+//z/AgACAAAA/f///wIAAQD8////AgABAPz///8AAAEAAAD///3/AQACAP7//P8BAAAA/f8AAAEA/P/9/wMAAQD7//3/AAAAAP/////+//3/AAACAP///P/8/wIAAwD+//3///8AAP//AgD///v//v8EAAMA/f/+/wEAAgAAAP//AQABAP7/AAACAAIA/v///wIAAgD//wAAAQAAAP//AQD//wEAAAD/////AgAAAP////8BAP//AAAAAAEA/v/+/wEAAwD9//z/AAADAP7//v/+////AAAAAP3//f8AAAEA/P///wAA///9/wAAAAD///3//v8AAAEA/f/9/wAAAQD+/wEA///+//7/AgABAP7//f8AAAIAAgD8//7/AQADAP3//f8DAAMA/P///wMAAgD9////AQADAP7/AAACAAQA/v/+/wIAAwAAAAEA//8BAAEABAABAAEA//8BAAQABQD9////BAAFAP//AQADAAQAAQAAAAAABAADAAAAAAAEAAIAAQABAAMAAQABAAIABAAAAAAAAQAEAAIAAQAAAAQAAgACAAAAAQABAAMAAQAAAAIAAgD//wIAAgAAAP//AwADAAAA//8BAAIAAQD/////AgACAP7//v8DAAAA/P8AAAMA///9/wIAAQD9////AQD///7/AgAAAP7//v8CAP3//v8CAAEA+/8CAAIA/v/7/wUAAAD7//7/BgD///7///8DAP7/AQAAAAIA//8CAP7/AQD+/wEA//8CAPz/AgADAAIA+v8BAAMAAwD4////AwADAPj/AQABAAIA+f8CAP3////9/wEA+/8BAP7/AAD5/wEA//////j/AAAAAAAA+P8AAAEA///5/wEA///+//v/AgD+//3//P8CAP3////8/wAA/P/+//7/AQD7//3//f8CAPz//P/7/wEAAAD9//j/AAABAP7/+P///////v/8/////P/9//7////9//3//P8BAP///P/6/wIAAAD7//r/AgAAAP7/+v8AAAIA///7/wAAAgD+//3/AwABAP3/AQADAAEAAAABAAAABAADAAAA//8EAAIAAgACAAMAAgAEAAMAAwACAAQAAQAFAAUABAAAAAUABgAEAAIABAADAAgABgACAAAACgAGAAMAAwAIAAQABgAEAAUAAwAIAAUABAADAAUABAAHAAQAAwADAAgABAAFAAQABQACAAcABwADAAAACAAGAAMAAgAGAAQABQACAAMAAwAIAAMAAQACAAgABAADAAAABgAEAAYAAAAEAAQABgABAAQAAwAEAAEABQADAAQAAAAFAAUABQD9/wUABQADAP//BwADAAEAAAAIAAEAAQAAAAYAAAAEAP//BQD//wMAAQAFAPz/AQACAAcA/f8BAP7/BQAAAAcA/P8BAAAABwD//wIA//8DAP//BQD//wQA/v8GAAEAAwD9/wYAAQACAP7/BAAAAAMA//8DAP7/BQD//wAAAgAHAPz/AAACAAYA//8CAAAABAABAAQAAAACAAIABAABAAMAAQADAAIABAACAAEAAgAFAAQAAwACAAIAAgAFAAQAAAABAAIAAwABAAMA//8BAP//AQABAAMA/f8AAAAAAwD+////AAADAPz/AgAAAAAA/v8DAP7/AQAAAAQA/f8AAP//BAD+////+/8FAAAA/v/8/wQA/v////3/AAD+/wMA/f/9//7/BAD9//7//P8CAAEA///8/wIAAgD+//z/BAAAAP7//f8EAAAAAQD8/wAAAAADAP//AQD+/wIA/v8CAP7/AQD7/wQA//////v/BQAAAP3//f8FAP///v/+/wQA/v/+//z/BQD///7//f8EAAEA///+/wIA//8BAP3/AwD+/wEA/P8BAP3/AQD5/wAA/f8BAPn/AAD9/wAA+f8DAPz//f/6/wMA/f////n/AgD7/wAA/f8BAPf/AQD+/wEA9v8BAP//BAD3/wIA/v8DAPv/AgD9/wMA/f8CAP3/BQD9/wEA//8GAP7/AQD//wQAAQACAP//AwAEAAQA/v8CAAMABgD+////AwAIAAAA//8DAAcAAQD+/wQABgADAAIAAQADAAQAAgACAAIAAQABAAQAAwAAAAEAAwABAAIABAACAP7/AwADAAQAAAAFAAAABwADAAcAAQAEAAIABwABAAMAAwAHAP//BAAEAAYA/f8GAAMABwAAAAYAAAAHAAAABwAAAAUA/v8GAAAABwD+/wEA/v8GAP///v/8/wMA+/8BAPz//v/6/wEA/P/+//r//v/8//7/9//+//z//v/3////+v////r/AAD3//z//f////X//P/9//7/9v/9//z////4////+v8AAPv/AAD6/wAA/P8CAPn/AAD7/wMA/P/+//n/AwD+//3/+P8DAP3//f/6/wIA/P/8//z/AQD8//z/+v8CAP3//f/6/wEA+//7//7/AwD4//n//v8FAPr/+f/6/wMA/f/7//r/AQD7//3//P////z//v/9//7//P////3////7/wEA/f/+//3/AQD9//7/AAD9//z//v8AAP7/+//+/wEAAAD8//z/AwAAAPz//P8CAAAA/f/8/wEAAAAAAP3/AAABAAEA/f8AAP//AwD///7//f8EAAIA/v/8/wQAAwD//wAABAACAAAAAwAGAP7///8BAAUAAQD+//7/AgAEAP//AAAAAAMAAQABAP//AgADAP3//f8AAAMA///+//z/AgAAAP3//P8CAP///f/+/wAA/P8AAP///f/8/wIA/v/8//3/AAAAAP///f/+/wEAAAD+//z/AQABAAAA/v/+/wAAAgD//wEAAAABAAEAAwD+////AQADAP////8AAAAA//8DAP/////+////AwD9//3//P8EAP///v/7/wEAAAD///7/AAD+/wQA/P////v/AgD7/wAA+f////z/AwD8//7//P8EAPz//v/9/wYA+f/+////BAD6/wEA//8CAP3/BAD9/wAA/v8DAPz/AAAAAAIA+/8BAAAAAAD7/wIA/f/9//z/AgD5//3/+P8BAPf/+//3////9//5//X//P/5//j/8//8//T/9//0//3/8P/5//b/+v/x//v/9P/3//T//P/x//j/9//7//L/9//6//3/8v/3//v//v/x//n//f/8//T/+//6//z/+P/8//v/+v/6//3/+//7//X//v/6//j/8//+//v/9//0//7/+P/0//f/AAD2//X/+f////f/9//6/wAA8//5//b//v/0//z/9P/7//L//f/z//j/8v/8//P/+f/x//n/8P/7//D/+f/x//v/8f/2//L//P/3//j/8v/9//b/+v/2//v/8v/+//n/9//x/wIA9v/5//P//f/2//v/9f/8//b////1//z/+P/+//f/AAD2//z/+f8BAPb//f/4/wAA9//+//r////5//7//P////n/AQD7//3/+v8FAPz/+//6/wMA/P/+//j/AQAAAAEA9/8BAAEAAQD9/wAAAwACAAUAAgADAAEABgAFAAYAAAADAAcACgD//wYABgAPAAEACwAFABAABAAQAAQAEgAFABEABAARAAgAEwAHABIACgAVAAcAFAAKABcABgAZAAkAGAAJABgABwAXAAkAFgAGABgABwAWAAgAHQAGABcACwAeAAgAGwAMACAABwAgAA0AIgAKACAACgAjAA0AHgAHAB0ADgAaAAcAFgAJABsABAAZAAYAGQADABwAAwAZAAQAFQACABgAAQASAAAAFQD+/xAAAQATAPv/DwADABAA+f8JAAIADQD6/woAAQANAPv/DAABAA4A/v8OAAMADQABAA0AAQAQAAUADgAEABEACAAOAAYADwALABEABwATAAsAFAAHABcADQAVAAoAGAASABUACgAVABMAGQALABcAEQAcABAAGQASABgAEgAWAA8AGQAQABYADgAWABEAEQAOAA0ADAAPAAoACwALAAsACQAGAAcACAAHAAQAAAADAAcAAgD7/wAABAD9//r//P/+//n/+f/4//r/9//5//X/8//1//f/8//y//H/9f/z//P/8//1//H/+P/w//X/9P/3//T/9v/y//b/9//3//L/+f/0//f/8P/4//P/9P/w//n/8//5/+3/9v/x//z/8P/3//D/+v/3//z/8f/8//P/AADz//n/8v8AAPX/+//w/wAA8f/9/+7////v//3/7P/9/+3////u//3/7P/+//L//f/t/wAA7v8AAPD/AADu//7/7//+//P////w/wEA8P8AAOv/AQDu/wAA5/8CAO3//P/u//7/7v/+//L/AgDw//v/9/8EAPP/+v/x/wMA8v/+//L/AQDy/wMA8v/9//T/AgDz////9v////L//v/5//3/9v8AAPj//P/+////9//9//3/AQD4////+P/9//n//f/1//v/9v/7//L/+v/v//r/7P/3/+z/+P/s//X/7v/y//D/9v/y//P/8f/2//P/8//u//X/7f/1/+r/8v/s//T/5P/v/+n/8v/o/+//6f/z/+3/9P/n//P/8P/3/+z/9P/x//v/8v/1//P//f/1//3/9P8DAPb////5/wQA+f8BAAEABQD7/wgAAgAJAPv/DQD//woAAgAQAAIACwALABIACQANAAkAFAAPAA8ABwAVABAADwAHABUADwATAA0AFwALABMADgAVAAoAEQANABEACgAQAA8ADAAIABEACAAOAAEACwAJAAsABwAIAAoACwAKAAoACwAJAA0ADAALAAgADwAHAA0ACQAQAAgADAAHABIACAAOAAQAFQAJABIABwAVAAgAGAAIABcABgAcAAkAHQAFAB8ACQAiAAYAIwAGACQACAAmAAQAIAAHACUAAwAcAAYAIwAHABkAAwAfAAcAGwAAAB4ACQAaAP//HQAGABUA//8bAAIAGAABABgA/v8WAAMAEAD8/xAAAwAIAPv/CwD//wgA+/8KAPz/CwD5/w0A+/8MAPn/CwD+/wQA+P8JAPn/AQD2/wUA9P8BAPj////y/wAA+P/3//T//v/2//b/9//+//X/+v/6////9f/8//r//P/2//j/+//5//n/9//8//H/+//0//z/9f/+/+7//P/4/wAA7//9//n/AwD4/wIA/P8IAP//BAAAAAsAAAAGAAIACwD+/wcAAgALAP3/CwD6/woA//8KAPj/CQAAAAsA+/8HAP3/CgABAAYA//8JAAMABgD8/wYAAgAEAPb/BwD9/wIA9P8EAPn/BgDy/wIA9f8FAPX/AgD7/wIA9/8FAPj/AQD7/wIA/v8CAAAABQABAAcAAAAHAAUACAAHAAcABgAKAAYABgABAAoAAAAHAAAABQAAAAYABAD//wEABQACAP3/+/8AAPj/+//0//n/9P/4/+7/9P/x//D/6//x//H/8v/t//D/7f/z/+z/6f/u//D/7f/r/+z/7f/l/+z/6f/r/+H/6v/l/+v/5P/i/+n/6f/q/+b/5v/o/+f/6//n/+b/6v/u/+z/5v/w/+z/8v/o//n/7P/3/+z/+P/r//f/7v/x/+r/8P/u//H/6P/4/+z/+f/v//v/8P/8//L/AwDx/wkA9/8MAPj/EwD8/xEA/v8ZAAEAFgADABQABQAXAAUAEwAHABcACQAYAAcAGwAPABoADQAcABAAGgAOABwADwAbAA8AHwASABcAEwAaABIAEgAUABMAEQASABEADQAPAA4ADgAKAAsADAAPAAMACQAIAAoAAAAIAAIABwD7/woA/v8FAP7/BAADAAUA/P8HAAAABQD3/wgA/f8FAPP/CAD1/woA9/8GAPj/CQD//wUAAQAHAAMABAAGAAsA//8GAAUACgD//wgAAAAJAP3/CQD8/wwAAQAFAAIACwAFAAEAAwAJAAcABAABAAcAAgAAAAMABAD9/wAABAAGAPr/AAACAP7///8BAAAA+//9/wEA/P/5//3/AQD4//r//f/9//r/+f/+//v/+//8//j//f/2//3/9v/8//b//P/2//r/9f/9//f//P/4/wEA+f/8//f/BAD7//v/+P8AAP3/+//7/wEA+/////z/AQD6////+/8CAPv/BAD7/wQA/v8CAP3/AwD9////+/8CAPz/+//6/wIA///4//r//v/+//j/+v/5////+//6//n//f/8//r/+v/9//z//P/7//z//f/+//v//v/7/wAA+v8AAP3/AAD7/////f/9//7//f////3//v8EAP7/BAD//wgAAgAIAP//DQD8/xAAAAANAAIACwAEAAYAAQAGAAEACAD+/wcAAAANAPv/CgABABIA/f8MAP7/FAD//xAA//8UAAMAFQABABMABgAXAAIADwAKABYA//8SAAcAFgACABcABgAOAAcAEQAKAAUADAAFAAcACAAFAAgACAAQAAYADQAPAA8ABAAQABAACgAKAAsADwADAAsAAgAOAAEACwD//w8A/v8MAAMACAABAAwACQADAAkACwAEAAgABwAIAP3/BwAJAAgAAQAJAAoACQAEAAgACAADAAYABgAAAAEAAgACAPr///8AAP3//P/7/wEA+v/9//n/BAD7//3/+f/+//3//f/5//z/+/8BAPn//v/7/wAA+//8///////9//j/AAD2////+f////b//v//////+v/9//n/BQD7////9f8FAPf/AgD1/wUA9/8HAPn/CQD2/wsA+v8MAPX/DgD4/wwA8/8RAPf/EAD3/xIA9/8SAPj/FwD0/xQA+/8bAPH/EwD7/xgA9v8YAPz/FgD+/x4A+v8YAP//HgD//xoABAAWAAcAHwAIABoACQAeAAsAHwAKABwACgAlAAgAHgAKABsADAAeAAoAFgAJABcADgAVAAwAEAAQABcACQARAA8ADgAPAAwAEQAIAA8ADAAOAAgADAALAAkABwAEAAUACgACAAMAAAAKAP7/AgD//woA+v8IAPn/CwD1/woA9/8IAPP/DAD1/wQA7f8OAPD/DgDs/xMA8v8RAO//CgDv/w0A6P8KAOn/CwDn/wkA6P8JAOL/CwDj/woA3/8KAOP/AgDb/wYA4f8AANn/AQDi//7/1/8BAN//AQDZ/wIA4P/9/97//P/f//r/4P/2/+H/9//g//X/4P/3/+D/9//j//L/4//z/+X/8f/n//X/4//1/+z/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7//1//L/8P/x/+//9v/v//j/6//5/+z/+//s//z/6f/9/+7/AADl/wEA8P8EAOT/BgDw/wkA5/8HAO//CwDt/wcA7/8LAPD/CADy/wwA8f8LAPb/DQD0/w0A+P8OAPv/DAD5/w4AAAAJAP3/CwAEAAkAAgAJAAcACgAIAAoACgALAA0ACwARAAoAEwAJABYACQAXAAkAGgAMABsACwAeAA0AHgAMACAACgAhAAkAJAAIACMABwAjAAsAIwAKACIADwAeAAsAJAAQABoACgAfAAoAGwAIABUABAAXAAgAEAADAA0ACAAJAAQABwAJAP//AgABAAgA9v/+//b/BADx//3/6//6/+f//f/j//L/3v/6/9z/8f/X//X/1f/w/9P/8P/S/+z/zP/u/9L/6v/I/+v/0f/p/8z/5//R/+j/0//m/9P/5//X/+n/2v/q/93/7P/j/+7/5P/x/+//8v/v//b/+v/6//z//P8EAAEABwAHABIABgASABMAIQAPAB4AGQArABsAKQAaADUAJgAxAB0APQAoADgAJQA+ACgAPQAuAD4AKQA+AC4AQAAoADkAKQA9ACYAMQAiADUAJgAnABoAKgAeABwAEgAfABMAEgALAA0ACQAHAAIA/P////v/+v/u//T/7v/w/+P/6P/e/+X/2v/c/9H/2v/S/9P/x//T/8r/zv/A/87/xf/N/8D/yv/A/87/xf/I/7//y//K/8v/xP/J/87/0P/K/87/1v/W/9f/1//f/9z/5v/d/+v/5//y/+j/9v/0/wEA9f8AAP7/EQACAA0ABAAbAAwAGgALACQAFAAkABcALAAbACsAIQAwACIAMQAoADQAJgAxACgANgAmAC4AJQAxACYAKwAjACgAIgAjAB8AIQAcABsAGwAWABcAEgASAAgAEAAHAAwA/P8JAPz/BQDw/wIA8P/7/+j/+v/k//T/4f/x/9v/8v/a/+3/1v/x/9b/8P/T/+z/1v/x/9T/6f/X/+z/2f/s/9v/6v/e//L/4v/z/+T/+f/s//n/8P/+//b//v8AAAMAAAAGAAwACgAOABIAFwATAB0AHgAkABoAKQAjADIAIQA0ACUAPQApADsAKgBEADQARAAtAEUAOABJAC4ARQA1AEgAKwBEADAAQwAmAD0ALQA7ACUAMwAkAC8AIAAoABoAIgASABkADgAUAAYABwD//wUA/f/2//f/9P/y/+b/8//m/+b/2P/r/9f/3f/O/+H/yP/Y/8f/2f+7/9j/vv/T/7j/1v+2/87/uP/T/7X/z/+3/9L/uP/Y/7r/1/+8/97/wv/h/8P/4//M/+f/0P/q/9X/6v/f//T/4v/y/+v//v/z//7/9v8IAAYACQAEABIAEgASABcAGAAbABoAKAAdACcAIAAwACMANQAlADYAKgA+ACcAPgAuAEMAKgBCAC4ARgAtAEIAKwBFAC4AQgAnAD8AKQA/ACIAOgAiADcAHgA0AB4ALQAcACoAGQAjABgAHgAVABoAEQARABAADgAIAAUACAAAAP//+v////P/+P/s//f/6v/1/+D/9f/f//L/1//z/9b/7v/R/+z/0P/r/8z/5v/K/+b/yf/l/8j/5//J/+T/yf/r/8n/4P/P/+v/zf/h/9P/6P/U/+X/2P/m/9z/6v/h/+f/5f/o/+v/7f/u/+b/9f/x//n/6v////L/BQD0/wgA8/8PAPr/EgD0/xgA+/8dAPX/HgD7/yQA+f8kAPz/KQABACoAAgApAAYALwAHACgACQAwAAkAKAAKAC0ACQAmAAwAJgALACQAEQAfAA4AIAAUABkAEwAXABUAEwAWABAAFQALABkACAAVAAQAGQD+/xIA/f8XAPf/EwD3/xEA7/8XAPP/DgDp/xgA7/8SAOf/FADs/xUA5v8QAOr/EADm/wsA6v8JAOn/BwDr/wUA7v8EAOv/AgDz/wQA8P8BAPT/AAD5//7/+P/7//7/+P/9//f/AgD0/wQA8/8GAPH/CQDt/woA7f8NAOv/EADr/w4A6/8RAOz/EADq/xMA6/8QAOn/EwDl/w4A6P8RAOT/CwDo/w8A6P8IAOn/CgDu/wYA7v8EAPP/AwD0////9v/8//r/+//6//f//P/4//3/8f////L/AwDt/wUA7/8GAOr/DQDr/wsA5/8SAOr/DgDm/xQA6f8PAOX/FwDq/w4A5/8VAOr/DQDq/xIA7f8PAO3/DwDw/xEA8f8MAPX/DQD5/wkA+f8FAP3/BgACAAAAAQADAAsA/P8GAP7/EAD7/xEA+P8SAPv/GAD1/xUA9/8cAPX/HADy/xsA8/8iAPD/GwDx/yIA7/8dAPH/HgDy/x8A8/8aAPb/HAD1/xcA+v8XAPf/FQD+/xAA+f8RAP7/CQD9/wsA/f8FAAMAAwADAP//BwD9/woA+v8HAPb/CwD2/wwA7/8LAPL/EgDr/wkA7P8RAOr/CQDp/wsA6P8KAOj/BwDm/w4A5f8IAOj/DwDj/wUA6/8JAOb/AQDs////6v///+v/+f/w//r/7P/4//X/9P/x//X/9f/x//n/8v/1//D////v//n/7/8BAOr//v/t/wIA5/8EAOr/AgDn/wgA6v8EAOj/CADu/wcA6f8IAPP/CQDs/wcA9P8MAPD/CADz/wsA9/8LAPb/CAD6/w4A/f8HAP//DgAFAAgABwANAAkACQANAAwADgAMAA8ACQATAA8AEQAIABgADwAUAAkAGgANABkACwAaAA0AHQAJABwACwAcAAoAHAAJABsACgAYAAgAFwAHABQACQARAAMAEAAHAA4AAQAKAAMACQAAAAUA/v8AAP7/AAD4//f//P/3//T/7//3/+//8//o//D/6f/v/+X/7f/k/+r/4v/p/9//6P/e/+X/2//k/9r/4//X/+D/2v/g/9b/4P/Z/97/1v/f/9r/3v/b/9//3//f/+D/3//j/+P/5v/h/+f/5v/r/+f/6//p/+7/7f/y/+7/9f/y//r/9v/8//j/AwD8/wYA/v8MAAMADQAIABIACQATAA8AFgASABgAEwAYABsAHAAYAB0AIAAeACAAIwAhAB8AJgAnACQAIAAnACYAKAAiACcAIAApACIAJwAZACcAHwAlABQAJgAaACAAEwAiABMAGQATAB8ADQASAA4AGQAIAAsABgASAAUABgAAAAgA/f8AAPz////2//r/+f/3//L/8f/2//H/8v/s//D/6v/y/+b/6P/k/+//4//n/9//6f/i/+j/2v/o/97/5//b/+r/2//n/9v/6v/c/+n/2//q/97/6//d/+v/3//t/+P/7P/j/+7/5//v/+f/8f/s//H/7P/0//H/9f/0//n/9v/5//n/+//9///////9/wMAAwAGAAAABQACAA8ABgAJAAMAEgAJAA8ABwARAAkAFgALABIACgAYAAsAFwANABcACgAbABEAFwALABsAEwAaABEAGAARABwAFwAWABEAHgAYABMAFAAdABgAEwASABoAGQATABAAFgAZABIAEwAUABYADgAVABEAFAANABQACwASAAwAEgADABIACwAPAP//DgAEAAoA/v8KAPv/BQD8/wgA9v8AAPb/BgD0//7/7v8AAPD//P/r//r/7f/4/+j/9P/o//X/5P/u/+b/8v/h/+3/4v/u/+L/6//e/+r/4//o/9v/6P/j/+b/3P/m/+T/5P/e/+P/4//k/+X/4P/i/+X/6v/h/+T/5//t/+T/6//p//D/6v/x/+z/9P/u//r/8f/3//P/AQD1//7/+P8GAPn/BQD5/wwAAQAKAP7/EgAHAA8ABwAWAAoAFwAOABoADQAZABAAIQARABoAEAAkABQAHQATACIAFAAgABQAIAAUAB8AFAAfABIAHQAPABsAEgAZAAoAGQARABIABgAXAA0ACAADABIABwADAAAACQD//////P////j/+v/3//X/9P/1//D/7v/x/+3/6P/r/+z/5P/m/+b/5v/e/+f/4f/j/9r/5//f/+L/1//l/97/4P/X/+b/3P/i/9n/5//c/+X/3//r/9z/6f/l//H/3//s/+r/9//l//X/8P/8/+z/AQD5//7/8/8KAAEABgD8/w8ACQARAAQAEgARABgADQAZABcAHAAXACEAGgAhACAAJQAhACUAJAAlACYAJgAqACUAJwAmAC4AJQAoACcALAAiAC0AJgAnAB8ALAAdACcAHQAmABQAJQAVACAADwAhAAsAGQAJABsAAwATAAEAEgD//w4A+f8HAPz/BgDy/wIA9f/8/+///f/w//L/7f/2/+3/7f/r/+3/6f/q/+n/5f/r/+X/6P/k//D/3//r/+L/8v/e/+//3v/z/+H/9f/e//j/4f/5/+D////i//7/4/8EAOb/AwDp/wcA6f8IAO3/DADu/wwA8v8QAPX/DgD3/xMA/P8TAP3/EgACABgABAASAAcAGgAJABMADgAZAA4AEQATABUAFAARABQAEAAYAA4AGAAOABgACgAcAAoAGAAGABoABgAbAAQAGAABABkAAAAZAPz/EwD9/xYA+P8RAPj/EAD0/xAA8v8JAPL/CwDs/wQA8v8FAOr////w/wEA7P/2/+3//v/u//D/6//5/+3/7f/q//H/7v/s/+v/7P/v/+n/7f/o//H/6P/v/+b/9P/p//D/5P/0/+r/9P/l//T/6//5/+f/9f/t//v/6v/6//H/+v/x/wEA8f/8//f/BQD3/wAA/P8FAP//BgD//wMABQAJAAQABAALAAYACgAIABAABgAPAAgAFAALABMACAAWAAwAGQAMABYACQAcAAwAGQAHABkACQAbAAYAFgAHABkABAAVAAcAFwAAABEABgAVAP7/DAACABEA/f8IAP//DAD8/wQA/v8GAPz/AAD7/wEA+v/7//n//P/4//n/9v/2//n/9f/4//H/+//x//j/7v/9/+7/+P/u//j/6//7/+3/9v/o////7//9/+b/AQDx/wUA6v8CAPH/CADw/wUA8/8JAPP/CAD4/wwA9/8KAP7/DQD7/wwAAgALAAEAEAAIAAkABgAUAAsADAAJABIADwAQAA8ADgAQAA8AFQAOAA8ACwAZAAoAEAAKABgACAATAAkAFgAHABUABgAVAAQAFAAEABIAAwAUAAAADwABABAA//8OAPr/CwD//woA+P8HAPz/BgD5/wEA+/8BAPj////5//r/9P/9//f/9f/1//f/9P/0//X/8v/z//P/9//w//T/8P/3/+//+P/w//r/7f/7//P//v/t//3/9f/+//D/AQD0////9v8DAPX/BQD8/wUA9/8JAP//CQD9/wsAAQANAAIADQAGABAAAwAMAAsAEQAFAAoADQARAAoACwAOAA8ACwANAA8ADQAMAAwAEQANAA4ACQANAA4AEQAHAAsACQAQAAkADAAAAA0ABwAKAPz/DQACAAMA/v8MAAEAAgD7/wYAAAAEAPn/AQD8/wIA9//+//r/AAD0//v/9v////T/+v/1//z/9f/8//b/+P/2//3/+v/4//f//f/+//v/+P/9//3//P/+/////f/+/wMAAQD/////BgAEAAQAAgALAAUACgAGABAABgAOAAkAEwALABEACQASAA4AEgALABQADQARAA4AFgAMABAADwAWAAwAEAAMABUADQAOAAoAEQALAA4ACQAKAAkADQAFAAEACAAHAAIA//8CAP//AgD9//3/+/8AAPf/+f/3//3/9P/2//L/+v/w//T/7//2/+r/8//r//P/6P/x/+j/7//n//L/5//t/+r/8P/p/+3/7P/v/+n/7//s//D/6v/w/+3/8P/t//L/8P/y//H/9P/1//X/9//2//f/+f/+//n/+//9/wMA+/8DAAAABAAAAAcAAgAGAAYACAAEAAoACAAJAAcADQAJAAwACwANAAkADwAPAA0ACgAOAA8ADgANAAsADAALAA8ACQAMAAgADAAHAA0ABQAKAAQACQADAAoAAwAGAAAACAD+/wQA/v8FAPn/AQD+/wMA9P/+//r////y//3/9v/7//L//P/0//f/8f/7//f/9f/y//f/+f/2//L/9v/5//X/8f/1//n/9f/z//L/+v/4//j/8P/7//j/+//z////9/////b/AgD3/wQA9/8FAPr/BgD7/wkA+/8IAP7/DQD8/wwAAAAOAAAAEwAEAA4AAwAVAAYAEAAGABQACQAUAAgAEwAKABQADQASAAoAEgAPABEADgARAAwAEAASABAADAARABIADQAPABAAEQAKABAADQAPAAcAEgALAA4ABAARAAYADwACAA0AAwAQAP7/CwADAA0A+/8MAAAACAD5/wkA/f8GAPj/BQD4/wQA9v8BAPT////z////8//7//D/+f/z//n/7v/0//L/9//t//D/7//0/+z/7f/u/+//6//t/+7/6v/s/+7/7//o/+r/6//y/+j/6v/p//T/6v/w/+n/9P/p//X/7P/0/+n/9//w//b/6f/4//P/+P/s//3/9v/4//H/AwD3//v/9/8FAPr////9/wcA/v8DAAAABwAEAAcABAAJAAcABwALAAwACQAIABAACwAMAAsAEwAKAA4ADAAVAAsAEQAMABYACgAUAAkAFAALABcABwASAAgAFgAEABEABwAUAAMAEAAEABAABAAOAAEADAACAAsA//8IAAAACAD+/wIA/f8HAP///f/7/wIA///6//v//f/9//j//P/4//3/9v/9//H//v/2//7/7v8AAPT//v/s/wAA8f///+3////u/wIA7v/+/+v/AwDw////6f8DAPL/AADr/wEA7/8CAO7/AQDw/wMA7v////T/AADw/wEA9P/9//P/AgD3//v/9P8BAPv//P/2/////f/8//r//f/+//v//v/9/wEA+f8AAPz/AwD4/wIA/P8FAPj/BAD9/wkA+f8DAP3/CwD7/wgA/f8JAPz/DgD//wcA/f8OAAEACwD9/wwAAgAMAP//CwACAA0AAAAIAAMADwADAAYAAwALAAQACgAEAAUAAwALAAQABAAFAAQAAQAGAAUAAAABAAQAAwD9//////8CAPv//v/+//7/9//+//v/+f/2//3/9v/2//b//P/z//T/9P/6//L/8v/w//f/8//z/+7/8//z//T/8P/y//D/8v/y//T/8f/v//L/9v/2//D/8v/3//r/8//1//n/+v/3//v//f/8//n//////wEA/P8DAAIAAwAAAAgABgAHAAUACgAJAAwADQANAAsADgAOABEAEAAQAA0AEwAUABIADQASABYAFAAMABIAFgASAA0AEQASABIADAANAA8AEQANAAoACwANAAsACAAHAAgABQAFAAQABAD+/wIA/P/+//r//P/1//n/9//4/+//9f/x//P/7f/w/+v/7//r/+3/5//r/+j/6v/l/+n/5P/n/+X/6P/i/+b/5//l/+P/6P/n/+X/5f/o/+r/6v/p/+j/7//t//D/7f/y//H/9//x//T/9//9//P/+f/9/wIA+v////7/BgADAAcAAAALAAgADAAHAA4ACgANAA4AFAALAA8AFAAWAAwAEwAVABUAEgAUABIAFgAXABUAEQAVABYAEwASABQAEwASABMAEAAQABAAEAAMAA8ADAALAAgADAAIAAgABQAIAAIABAADAAQA+////wAAAQD4//z/+f/7//f/+f/y//f/9f/2/+//9P/y//L/7//z//L/8P/u//H/8v/v//H/8P/w/+//8//x//P/8f/y//L/+f/x//X/8//7//T//P/2//z/9/8CAPn/AAD6/wMA/P8FAP3/BQD//wkAAQAIAAEACwAGAAsABAALAAgAEAAGAAsACgARAAkADQANAA8ACgAPAAwADAANAA4ACgAJAA8ACwAJAAgADQAHAAsAAwAIAAcACQAAAAgAAwAGAP//BgD+/wIA/v8EAPv//v/6/wIA9//7//b//P/2//v/8//1//T/+//y//L/8//1//H/8v/y//L/8v/x//L/8f/x/+7/8f/w//L/7//x//D/8//t//P/8f/3/+//9f/y//3/8P/3//T//v/1//z/9f////n//v/4/wUA+/8AAP7/BwD9/wYAAgAHAAIACwAEAAkABwAPAAcADgAKABIADAAQAAwAFgAQAA4ADwAaABAADwAUABgADwASABcAFAAQABIAFgATABIAEgAUABAAEwATABAACgAUABEADgAHABEACwAPAAYACQAIAA8AAwAFAAQADQACAAEA/f8JAP///v/5/wQA+//9//f//P/5//v/9f/6//f/9v/z//r/9v/y//H/9//2//H/8v/1//b/8f/0//P/9P/x//f/8v/0//H/+P/0//f/8P/6//f/+P/y//7/+P/9//T//v/8/wIA+P8AAP3/BAD9/wQA//8EAAEABwAEAAYAAwAHAAgADAAGAAYACwAOAAsACQAMAAwADwAOAA8ACgAQAA8AEQALABIADgARAAkAFQAMABAABgAVAAkADwAGABQABQAOAAUAEgADAAwAAQAOAAMACwD9/woA//8JAPv/BgD4/wUA/P8CAPP/AQD5//7/9f/8//T/+v/2//n/8v/3//X/9f/x//P/9f/z//H/8P/2//L/8//u//X/8f/1/+7/9//v//n/7//4//D/+//t//z/9P/9/+3//v/3/wAA8P8BAPj/AgD0/wMA+v8DAPj/BgD+/wUA/P8JAAAABQABAAsAAwAGAAQADQAHAAYABwAMAAkABwANAAkACAAIABIABgAJAAgAEwAEAAwABwAQAAQAEQACAA4ABgASAP//DgAFAA4AAQARAP//CwACABAA/f8LAP7/CwAAAAsA/P8JAP//BgD//wkA+/8DAAEABwD5/wEAAgADAPn/AQACAAAA/v8AAAAA/v8BAP7/AAD+/wMA/f8CAPz/BAD8/wUA/f8FAP3/BwD9/wcA/P8JAP3/CAD//w0A//8GAP//DgABAAsA//8KAAQADQACAAkAAwANAAYACwADAAwABwAKAAcACgAHAAoACQAIAAkACQAHAAUADAAKAAcAAQALAAoACgD//woABgAKAAAACQACAAkAAQAJAP//CQABAAgA/f8GAAAACAAAAAQA/f8IAAIAAQD9/wcAAQD//wEABwD///7/AwAFAP///f8EAAQAAAD8/wQAAQAFAP7/AgD//wYA/f8EAP7/BQD+/wYA/f8EAP3/BwD8/wUA/v8GAPz/BQD//wQA+/8FAAAABAD6/wMAAQADAPr/AQACAAEA/P8BAAEA///+//7/AAAAAAAA+///////AgD6/wAA/P8BAPr/AQD5/wEA+/8CAPf/AQD6/wIA9v8BAPn/AgD2/wMA+f8CAPb/AgD4/wMA9v8BAPn/BAD2/wEA+/8BAPj/AwD7/wAA+v8DAPz/AQD8/wMA/f////7/BQD/////AAACAAIAAwACAP//AgAEAAQAAAAEAAIABQACAAYAAQAHAAEABwACAAcAAAAJAAQABwD//wkAAgAJAAIACAD+/woAAwAHAAEABwD+/wgABQAFAPz/BQADAAQA//8EAAAAAQAAAAQAAAD//wAAAgD//wAAAAD+/wAA/v/+//v/AwD///v/+f8FAP3/+//5/wQA+//8//v/AgD5/////P8DAPf//v/+/wQA+P/9//z/BAD8/wAA+v8CAP//AAD7/wMA/v////7/BAD9/wEA/v8BAAEAAwD/////AAADAAIAAQAAAAEAAwAEAAQA//8BAAMABwACAAMAAAAHAAQABQAAAAQAAgAIAAMAAgD//woAAwABAAEACQD//wIABAAIAPz/AwADAAcA//8EAP//BAABAAQA/P8DAAIAAgD9/wMA/v8AAAAAAQD5////AQD+//v////9//7//P/9//v//v/9//r/+//8//v/+//8//j/+f/6//7/+P/3//f//v/5//j/9f/7//r/+//1//r/+v/8//b/+v/4//3/9//6//n//v/2//z/+v/8//X//f/6//7/9//7//j/AAD5//z/+f/+//n////8//7/+v////7//f/8/wIA/f/7//3/BQD///3//f8BAAIAAAD/////AQACAAMA//8CAAMAAgD+/wYAAwAAAP7/BwAEAAEA/v8GAAQAAQD9/wcABAAAAP3/CAACAAEA//8FAP//AwD//wIAAAAEAPz/AAAAAAQA/f/+//z/AwAAAPz/+v////7//f/7//z//P/9//v//P/8//r/+f/9//z/9v/5//z/+v/2//n/+//5//f/+v/4//b/9//8//r/9f/0//r/+//3//P/+f/8//f/9v/4//r/+P/4//j/+P/4//z/+f/6//X/+v/8//7/9//4//r/AAD7//v/9//+//3/AAD3//z//v8DAPn//f/9/wIA/P/+//v/AQD+/wAA/P8CAPz//////wMA/P8AAAAAAQD//wEA/P/9/wIABAD6//z/AwADAP7//P/+/wEAAQD+//7//P//////AAD7//7//f8BAP3//P/6/wIA///7//r/AQD///7/+f/8//7/AAD6//v///////r//v////v/+////wEA+//8//7/AwD9//r//f8FAP3/+//9/wYA/v////z/BAD+/wQA/P8CAP//BQD9/wMA/v8GAP7/BQD8/wUAAQAGAPv/BAABAAcA/P8EAP//BQD//wQA/P8EAAAABAD8/wQA//8CAP7/AwD9/wMA/v////3/AwD+//z//f8BAP3//f/9////+//8/////f/7//7//P/6//z//v/9//r/+v/8/wAA+//4//z////4//v//v/+//n/+//7/wAA/f/7//n/AAD///7//P/+//z/AQAAAP7//v8DAP////8BAAMA/v8AAAMABAABAAIABAADAAUABQAEAAMABwAHAAUABgAKAAQABQALAAwAAgAGAAwACwAGAAkABwAJAAsACgAEAAkACwAJAAQACwAKAAYABAAMAAkABgACAAkABwAHAAMABgAEAAMAAwAHAAAAAAADAAMA/v8AAAEA///+/wAA/f/9/////v/5//z/AAD6//j//P/8//j/+f/7//n/+P/6//n/+f/2//b/+v/8//b/9P/4//3/+P/1//j/+v/6//r/+v/4//r//v/8//n/+v/9/////v/7//v/AAACAP///f8CAAIAAQAAAAUAAwAEAAIABgAGAAcAAgAHAAkACQACAAcACwAMAAQABwALAAwABwALAAkACQAIAA4ACgALAAgACwAKAA0ACAAKAAgADQAJAAoABwAKAAgACQAHAAkABQAGAAcACAADAAQABgAHAAIABAADAAIAAwADAAAAAAADAAEA/v/9/wAA///+//z////8//v/+/////r/+//6//z/+P/9//n/+f/5//7/9//7//z/+//1/////f/6//f//v/7////+//7//r/AgD///z/+/8DAAAA/v8AAAQAAAAAAAIABAADAAMAAgAEAAgABgAAAAQACAAHAAUABgAGAAYACAAGAAcACAAIAAUACQAJAAoABgAHAAcACwAGAAgACAAJAAQACAAIAAcAAwAHAAUACQAEAAMABAAHAAEABQADAAIAAQAGAAIAAAD//wMAAAADAAAA/P///wMA/v/7/wAAAQD6//z/AgD///r/+/////3//f/9//z/+f8BAP//+v/6/wAA/P/+//3//P/6/wQAAAD6//n/AwAAAP//+v8AAAIAAgD8/wEAAQACAP//AgAAAAUAAwABAAAABgACAAMABAAGAAEABAAGAAcAAwACAAYACgAEAAIABQAKAAgAAwACAAkACwAEAAIACQAIAAMABgALAAUAAQAHAAoABgADAAcABgAFAAUABgAFAAUABgAFAAMAAwAGAAcAAgD//wUACAAEAP//AgAFAAgA///+/wMACAD/////AwAFAP//BQADAAEA/f8GAAIAAgD+/wMA/f8GAAIAAgD6/wQAAgAEAPv/AgAAAAQA/P8EAP//AQD+/wcA/f/+/wAABwD9/wEAAAADAP//BQAAAP//AQAHAP///v8EAAcA/v/+/wMABwACAP//AgAFAAQAAAAFAAUAAQABAAgABQADAAEABQAFAAcAAwAEAAMABwAGAAcAAgAGAAYACAAEAAcABQAGAAYACAAEAAMABgAKAAUAAQAFAAkABQABAAUABgAFAAIABAADAAUAAgADAAAABAADAAIA/v8FAAMAAAD7/wUAAgAAAPr/AwD//wEA+f8AAP3/AgD4/////f8AAPX/AAD///3/8v8AAAAA/v/x//7//v/+//T//v/7//7/9v/9//r////4//v/+v8AAPr//P/6/wAA+//8//z/AAD8//7//v8AAP7/AAD+/wAAAQABAAAAAAABAAMAAQACAAEAAgAFAAIAAQADAAkAAwAAAAUACgACAAIABQAHAAQABQAFAAUABQAFAAUABgAEAAQABQAEAAQABQAEAAAABQAFAAMA//8EAAIAAgD//wIA/v8EAAAA/v/8/wUA/v/8//z/AwD6//7//f////j//v/9////+P/7//r/AAD5//v/9//9//v//P/1//z/+//7//f//f/6//n/9//+//z/+v/4//z//f/8//n/+//9//3/+//9//3/+//9/wAA/f/6////AwD///r///8CAAAA/f///wEAAgACAP////8DAAEAAAACAAIAAAACAAMAAQABAAMAAgD//wIABAABAP//AwACAP//AQAFAAAA/v8CAAMA/////wAAAgD+//7//f8EAP7/+f/8/wUA/f/5//3/AQD9//z/+v/+//z//P/6//7/+v/7//3//f/4//r//P/9//n/+//9//z/+P/8//3/+v/5//3/+//6//3//f/7//3//f/6//3////+//r//f8AAAAA/P////3//v8BAAIA+//9/wIABgD9//7/AAAHAAAA/////wQAAQADAP//AgADAAMA/f8BAAQAAwD9/wIAAwABAP7/AgACAP///f8BAAMA///7//3/BAABAPr/+/8CAP7//P/6//3/+v8AAPz/+f/3/wAA+//5//f//P/6//z/9v/5//r/+//1//v/+f/4//T//P/2//b/9v/6//X/+P/2//n/9v/4//b/+P/2//f/9//6//b/9//4//r/+P/3//b/+P/5//n/+f/4//j/+f/6//v/+v/2//j//P/+//j/+P/6/wAA/P/5//j/AAD+//z/9//7/wAAAwD4//f///8EAPv//P/8/wAA/v8AAPz/AgAAAP3//P8EAAAA///9/wIA//8AAAAAAwD9////AQAEAP7///8AAAEA/v8AAAEA///8/wEAAgD9//z/AQD+//3//v8AAP7//f/8///////7//n//P8AAP3/+P/6/////P/4//r//v/7//j/+//8//r/+f/5//v/+//5//j/+//7//j/+P/7//n/+P/7//n/9//6//3/+P/2//n//f/5//b/+P/+//r/9v/4////+f/3//n//f/6//r/+f/6//n//f/6//v/+f/9//v/+//6/wEA+v/6//z/AgD5//3//f/+//r/AgD+//7/+f8BAP/////6/wMA//////z/BAD/////+/8DAAEAAQD8/wIAAAABAP7/AwD+/wEAAgAEAPv/AAAEAAMA/P8BAAIAAQAAAAIA//8BAAEAAAD//wQAAgD+//7/AwACAP///v/+/wMAAQD8//z/AwABAPv//f8CAAAA/v/+//3//v8BAP///P/+//7//v////7//f/+//7//P/+/wEA/P/9////AAD8//3///8BAPz//f/+/wMA/P/+////AgD8//////8EAPz////+/wIA//8CAPv//f8CAAYA+v/8/wEABwD9//7//f8FAAEA///7/wEAAQACAPz//v///wMA///8//z/AgABAP3/+/8AAP7//v///wAA+//+/wEA/v/8/////f/8////AQD6//v/AQD///v//f/+//z//f////z/+//+/////P/7//7/AAD7//3////9//v/AAD///r//P8BAP7//f/8////AAAAAPr///8DAAIA+v8AAAMAAQD8/wMAAQABAAAABAD//wEABAAEAP7/AwADAAUAAgAEAAAABAAEAAQAAgAGAAEABAAEAAcAAQAEAAQABgABAAYABAAFAAAAAwAFAAYAAAACAAMABQACAAMAAQACAAIAAgD//wQAAwD///7/AwADAP7//P8CAAMA/f/9/wIAAAD8////AgD9//7/AgD///v///8CAP7/+v8AAAMA///7/wAAAwD///r/AQAEAAAA+/8BAAMAAgD//wEA//8EAAMAAwD+/wUABAAEAAAABwAEAAQAAQAJAAQABQACAAcABgAGAAEACQAIAAcAAAAKAAkABwACAAkABwAJAAMACQAHAAgAAwAJAAcABgAEAAkABAAFAAYABwADAAUABAAHAAMAAwAEAAgAAgABAAMABgACAAMAAgADAAEABAABAAAAAgACAP//AAACAAAA/v///wEA///+//3/AAAAAP///P/+/wAA///8//7///////7/AAD8//7///8BAP7//v/8/wEAAQD///v/AQD//wAA//8CAP7/AQABAAIA/P8CAAQAAgD8/wIABQAEAP7/AwADAAQAAgADAAEABQAEAAMAAQAGAAQAAgADAAcAAwABAAMACAAEAAIAAQAEAAQABgABAAEAAgAFAAMABQAAAP//AwAHAP////8CAAQAAAACAAEAAAABAAIA/v8CAAIA/v/9/wUAAQD8//7/AwAAAAAA/f///wEAAwD+//3///8DAAEA///9/wMAAwAAAP//AwABAAAAAgAGAAAAAAAEAAYAAAACAAUABgACAAQABAAGAAQABQACAAcABwAFAAIABwAHAAgABQAFAAQACgAIAAUAAwAJAAgABwADAAcACAAHAAMACAAHAAYAAwAGAAUABwAEAAUAAwAFAAMABgAEAAMAAQAEAAYABAD//wEABAAFAAIA//8BAAQABAAAAP//AQADAAAA//8AAAQA/////wIAAwD9/wAAAAABAP//AQAAAAAA/f8BAAEAAwD9//7/AQAFAP3//f8BAAYA/////wAABAACAAEA/f8BAAUABAD+/wEABAAEAAEAAQAEAAQAAQACAAYAAwAAAAMACAACAAEABAAIAAEAAwADAAYAAQAFAAQABAABAAcABAAEAAAABgAEAAQAAQAGAAUABAAAAAYABQAEAP//BQAEAAQAAQAFAAEAAwADAAQAAAADAAQABAAAAAIABQAFAP//AAAGAAQAAQACAAIAAgAGAAIA//8DAAUAAQACAAIAAQABAAQAAgABAAAAAgAEAAMA//8BAAMAAgABAAMAAgD//wIABgABAP3/AwAFAAAA/v8FAAIAAAD//wQAAgACAP//AQABAAQA//8BAAAAAwD//wMAAAACAP//BAD+/wEAAAAEAP//AQD9/wUAAgAAAPv/BQACAP///v8FAP//AAABAAMA/f8BAAIAAwD9/wAAAwAEAP////8AAAUAAQD+////BQAEAP3///8GAAQA/f8AAAUAAgAAAAMAAQD//wIABAD/////AgADAAIAAQD//wAAAgAFAAEA/f8AAAUAAgD+/wEAAgAAAAAAAgABAAEAAAABAAAAAQD//wMAAQD///7/AwACAAAA//8CAAAAAgAAAAAA//8DAAEA///+/wQAAQD///3/BAAAAP3///8EAP3//v8CAAMA+////wMAAwA=", A));
    const e = this.reappearBufferLease;
    e.promise.then((t) => {
      this.destroyed || (this.reappearBuffer = t);
    }).catch(() => {
      this.reappearBufferLease === e && (e.release(), this.reappearBufferLease = null);
    });
  }
  armHoldSilence() {
    typeof window > "u" || (this.clearHoldTimer(), this.holdTimer = window.setTimeout(() => {
      this.holdTimer = null, this.gestureActive && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012));
    }, eu));
  }
  clearHoldTimer() {
    this.holdTimer === null || typeof window > "u" || (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
  playLift(A, e) {
    const t = this.profile?.lift;
    t && this.playSlice(t, {
      kind: "lift",
      duration: 0.07 + A * 0.025,
      playbackRate: (0.94 + A * 0.12) * Mi(0.5),
      gain: 0.11 + A * 0.065,
      lowpass: 4200 + A * 5400,
      highpass: 180,
      attack: 4e-3,
      release: 0.018,
      pan: e
    });
  }
  playTexture(A, e, t) {
    if (!this.profile || e <= 1e-3) return;
    const i = Math.random() < ce(0.12 + 0.58 * A, 0, 0.72), n = this.takeSlice(i ? "body" : "micro");
    if (!n) return;
    const r = at(0.85, 1.15) * (0.066 - 0.032 * A);
    this.playSlice(n, {
      kind: "texture",
      duration: r,
      playbackRate: (0.92 + A * 0.18) * Mi(0.7),
      gain: (0.07 + 0.2 * A ** 0.65) * e * Os(at(-1.5, 1.5)),
      lowpass: 2400 + A * 9e3,
      highpass: 210,
      attack: 6e-3 - A * 35e-4,
      release: 0.017 - A * 8e-3,
      pan: t
    });
  }
  playReattach(A, e) {
    const t = this.takeSlice("micro");
    t && this.playSlice(t, {
      kind: "reattach",
      duration: at(0.03, 0.05),
      playbackRate: (0.67 + A * 0.17) * Mi(0.5),
      gain: (0.024 + 0.052 * A ** 0.7) * Os(at(-1.2, 1.2)),
      lowpass: 1500 + A * 2400,
      highpass: 120,
      attack: 5e-3,
      release: 0.02,
      pan: e * 0.6
    });
  }
  playAccent(A, e, t) {
    const i = this.takeSlice("accent");
    i && this.playSlice(i, {
      kind: "accent",
      duration: at(0.045, 0.072),
      playbackRate: (0.96 + A * 0.12) * (1 + e * 0.08) * Mi(0.45),
      gain: (0.14 + A * 0.1) * (1 + e * 0.35),
      lowpass: 5200 + A * 6e3,
      highpass: 220,
      attack: 2e-3,
      release: 0.024,
      pan: t
    });
  }
  playFinish(A, e) {
    const t = this.profile?.finish;
    t && (this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.01), this.playSlice(t, {
      kind: "finish",
      duration: 0.064,
      playbackRate: (0.97 + A * 0.08) * Mi(0.35),
      gain: 0.2 + A * 0.12,
      lowpass: 7500 + A * 4500,
      highpass: 180,
      attack: 15e-4,
      release: 0.038,
      pan: e
    }));
  }
  takeSlice(A) {
    const e = this.profile?.[A] ?? [];
    if (!e.length) return null;
    let t = this.sliceBags[A];
    t.length || (t = ru(e.length), t.length > 1 && e[t[t.length - 1]]?.key === this.lastSliceKey && ([t[0], t[t.length - 1]] = [t[t.length - 1], t[0]]), this.sliceBags[A] = t);
    const i = e[t.pop() ?? 0] ?? null;
    return i && (this.lastSliceKey = i.key), i;
  }
  playSlice(A, e) {
    if (!this.enabled || this.destroyed || this.activeVoices.size >= Ls) return;
    const t = Ci(), i = this.buffer;
    if (!t || !i) return;
    const n = ce(A.start, 0, Math.max(i.duration - 4e-3, 0)), r = ce(A.end, n + 4e-3, i.duration) - n;
    if (r < 4e-3) return;
    const s = Math.min(e.duration * e.playbackRate, r), a = Math.max(r - s, 0), l = n + (a ? Math.random() * a : 0), o = s / e.playbackRate, c = t.currentTime + 2e-3, f = Math.min(e.attack, o * 0.36), h = Math.min(e.release, o * 0.48), p = Math.max(c + f, c + o - h), m = ce(e.gain * A.trim, 0, 1.1), P = t.createBufferSource(), d = t.createBiquadFilter(), u = t.createBiquadFilter(), x = t.createGain(), C = typeof t.createStereoPanner == "function" ? t.createStereoPanner() : null;
    P.buffer = i, P.playbackRate.setValueAtTime(e.playbackRate, c), d.type = "highpass", d.frequency.setValueAtTime(e.highpass, c), d.Q.setValueAtTime(0.7, c), u.type = "lowpass", u.frequency.setValueAtTime(ce(e.lowpass, 600, t.sampleRate * 0.46), c), u.Q.setValueAtTime(0.72, c), C && C.pan.setValueAtTime(e.pan, c), x.gain.setValueAtTime(0, c), x.gain.linearRampToValueAtTime(m, c + f), x.gain.setValueAtTime(m, p), x.gain.linearRampToValueAtTime(0, c + o), P.connect(d), d.connect(u);
    const D = C ?? u;
    C && u.connect(C), D.connect(x), x.connect(this.ensureOutput(t));
    const M = [
      P,
      d,
      u
    ];
    C && M.push(C), M.push(x);
    const _ = {
      source: P,
      gain: x,
      nodes: M,
      kind: e.kind
    };
    this.activeVoices.add(_), P.addEventListener("ended", () => {
      this.activeVoices.delete(_);
      for (const I of M) I.disconnect();
    }, { once: !0 }), P.start(c, l, s);
  }
  stopVoices(A, e) {
    const t = _i;
    if (!t) return;
    const i = t.currentTime;
    for (const n of [...this.activeVoices])
      if (!(A && !A.has(n.kind))) {
        try {
          n.gain.gain.cancelScheduledValues(i), n.gain.gain.setTargetAtTime(0, i, Math.max(e / 3, 2e-3)), n.source.stop(i + e);
        } catch {
        }
        this.activeVoices.delete(n);
      }
  }
  ensureOutput(A) {
    return this.masterGain ? this.masterGain : (this.masterGain = A.createGain(), this.compressor = A.createDynamicsCompressor(), this.masterGain.gain.setValueAtTime(this.volume, A.currentTime), this.compressor.threshold.setValueAtTime(-14, A.currentTime), this.compressor.knee.setValueAtTime(8, A.currentTime), this.compressor.ratio.setValueAtTime(4, A.currentTime), this.compressor.attack.setValueAtTime(3e-3, A.currentTime), this.compressor.release.setValueAtTime(0.1, A.currentTime), this.masterGain.connect(this.compressor), this.compressor.connect(A.destination), this.masterGain);
  }
}, hu = {
  sweepDuration: 950,
  cycleDuration: 1210,
  coreWidth: 0.04,
  bandWidth: 0.3,
  bandOpacity: 0.46,
  brightness: 1.18,
  highlightIntensity: 0.62,
  distortionRange: 0.41,
  distortionStrength: 3.15,
  rippleDensity: 18,
  rippleSpeed: 6
}, fu = { ...hu };
function ks() {
  return fu;
}
var uu = [
  "original",
  "holographic",
  "glitter",
  "reflective"
];
function Ws(A) {
  const e = uu.indexOf(A);
  return e < 0 ? 0 : e;
}
var Si = {
  source: void 0,
  outline: {
    width: 18,
    color: "#ffffff"
  },
  edge: {
    width: 2.4,
    strength: 0.7
  },
  shadow: {
    color: "#191823",
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42
  },
  lighting: {
    direction: {
      x: -0.38,
      y: 0.52,
      z: 0.76
    },
    intensity: 0.8,
    ambient: 0.35,
    softness: 0.6
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    detachThreshold: 0.74,
    residue: !0,
    surfaceShadow: !0,
    release: "snap"
  },
  back: {
    color: "#f7f5f2",
    gloss: 0.7,
    roughness: 0.3
  },
  material: {
    type: "original",
    intensity: 0.86,
    scale: 1,
    holographicGrain: 0.72,
    seed: 0.37,
    holographicColors: [
      "#f2a7c5",
      "#8edfd5",
      "#9db4ea"
    ]
  },
  sound: {
    src: "",
    volume: 0.7,
    enabled: !0
  },
  display: {
    width: 0,
    height: 0
  },
  tilt: -3,
  wind: 0.25,
  quality: "high"
};
function $t(A, e = {}) {
  const t = A ?? Si;
  return {
    source: e.source ?? t.source,
    outline: {
      ...t.outline,
      ...e.outline
    },
    edge: {
      ...t.edge,
      ...e.edge
    },
    shadow: {
      ...t.shadow,
      ...e.shadow
    },
    lighting: {
      ...t.lighting,
      ...e.lighting,
      direction: {
        ...t.lighting.direction,
        ...e.lighting?.direction
      }
    },
    peel: {
      ...t.peel,
      ...e.peel
    },
    back: {
      ...t.back,
      ...e.back
    },
    material: {
      ...t.material,
      ...e.material
    },
    sound: {
      ...t.sound,
      ...e.sound
    },
    display: {
      ...t.display,
      ...e.display
    },
    tilt: e.tilt ?? t.tilt,
    wind: e.wind ?? t.wind,
    quality: e.quality ?? t.quality
  };
}
var Tt = 2147483647, mr = 48271, ri = 96, du = 6, Xa = 5, pu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map();
function Ya(A) {
  return Math.floor(A * Tt) || 1;
}
function Ka(A, e, t) {
  const i = A.get(e);
  if (i !== void 0)
    return A.delete(e), A.set(e, i), i;
  const n = t();
  if (A.set(e, n), A.size > du) {
    const r = A.keys().next().value;
    r !== void 0 && A.delete(r);
  }
  return n;
}
function vu(A) {
  const e = Ya(A);
  return Ka(pu, e, () => {
    let t = e;
    const i = new Uint8ClampedArray(ri * ri * 4);
    for (let n = 0; n < i.length; n += 4) {
      t = t * mr % Tt;
      const r = t / Tt > 0.48 ? 255 : 20;
      i[n] = r, i[n + 1] = r, i[n + 2] = r, t = t * mr % Tt, i[n + 3] = Math.round(38 + t / Tt * 74);
    }
    return { pixels: i };
  });
}
function mu(A) {
  const e = vu(A);
  if (e.canvas) return e.canvas;
  const t = document.createElement("canvas");
  t.width = ri, t.height = ri;
  const i = t.getContext("2d", { alpha: !0 });
  if (!i) return null;
  const n = i.createImageData(ri, ri);
  return n.data.set(e.pixels), i.putImageData(n, 0, 0), e.canvas = t, t;
}
function wu(A, e) {
  const t = Ya(A), i = Ka(gu, t, () => ({
    state: t,
    values: new Float64Array(0)
  })), n = e * Xa;
  if (i.values.length >= n) return i.values;
  const r = new Float64Array(n);
  r.set(i.values);
  let s = i.state;
  for (let a = i.values.length; a < n; a += 1)
    s = s * mr % Tt, r[a] = s / Tt;
  return i.state = s, i.values = r, r;
}
function wr(A, e) {
  return (A - 0.5) * e + 0.5;
}
function Pu(A) {
  const e = A - Math.floor(A);
  return e < 0.25 || e > 0.78 ? 0 : e < 0.46 ? 0.7 * (e - 0.25) / 0.21 : e < 0.58 ? 0.7 + -0.5599999999999999 * (e - 0.46) / 0.12 : 0.14 * (1 - (e - 0.58) / 0.2);
}
function Du(A, e, t, i) {
  const n = Math.max(32, Math.ceil(48 * e));
  for (let r = 0; r <= n; r += 1) {
    const s = r / n, a = Pu(wr(s, e) + i);
    A.addColorStop(s, `rgba(255,255,255,${a * t})`);
  }
}
function Eu(A, e, t, i) {
  const n = wr(0, e) + i, r = wr(1, e) + i, s = Math.floor(n * 3), a = Math.ceil(r * 3);
  A.addColorStop(0, t[(s % 3 + 3) % 3]);
  for (let l = s; l <= a; l += 1) {
    const o = (l / 3 - n) / e;
    o <= 0 || o >= 1 || A.addColorStop(o, t[(l % 3 + 3) % 3]);
  }
  A.addColorStop(1, t[(a % 3 + 3) % 3]);
}
function Bu(A, e, t, i, n, r, s) {
  const a = mu(s);
  if (!a) return;
  const l = A.createPattern(a, "repeat");
  l && (l.setTransform(new DOMMatrix().scaleSelf(1 / Math.sqrt(r), 1 / Math.sqrt(r))), A.save(), A.globalAlpha = 0.42 * i * n, A.fillStyle = l, A.fillRect(0, 0, e, t), A.restore());
}
function Mu(A, e, t, i, n) {
  const r = {
    ...Si.material,
    ...i
  };
  if (r.type === "original" || r.intensity <= 0) return;
  const s = Math.min(1, Math.max(0, r.intensity)), a = Math.min(4, Math.max(0.2, r.scale)), l = {
    ...Si.lighting,
    ...n,
    direction: {
      ...Si.lighting.direction,
      ...n?.direction
    }
  }, o = Math.hypot(l.direction.x, l.direction.y, l.direction.z) || 1, c = l.direction.x / o, f = l.direction.y / o, h = Si.lighting.direction, p = Math.hypot(h.x, h.y, h.z), m = h.x / p, P = h.y / p, d = Math.min(1.5, Math.max(0, l.intensity));
  if (A.save(), A.globalCompositeOperation = "source-atop", r.type === "reflective") {
    const u = A.createLinearGradient(0, t, e, 0), x = (c - m) * 0.28 + (f - P) * -0.22;
    Du(u, a, s * Math.min(1.4, Math.max(0.5, 1 + (d - 0.8) * 0.5)), x), A.fillStyle = u, A.fillRect(0, 0, e, t);
  } else if (r.type === "holographic") {
    const u = A.createLinearGradient(0, t, e, 0), x = (c - m) * 0.32 + (f - P) * -0.26;
    Eu(u, a, r.holographicColors, x), A.fillStyle = u, A.globalAlpha = 0.24 * s * Math.min(1.3, Math.max(0.6, 1 + (d - 0.8) * 0.35)), A.fillRect(0, 0, e, t), Bu(A, e, t, s, Math.min(1, Math.max(0, r.holographicGrain)), a, r.seed);
  }
  if (r.type === "glitter") {
    const u = Math.atan2(f, c), x = Math.min(1.4, Math.max(0.45, 0.5 + d * 0.625)), C = Math.min(8e3, Math.round(e * t / 520 * a * a)), D = wu(r.seed, C);
    for (let M = 0; M < C; M += 1) {
      const _ = M * Xa, I = D[_] * e, v = D[_ + 1] * t, B = D[_ + 2] > 0.5, W = D[_ + 3], S = (I * 0.013 + v * 0.017 + r.seed * 7) % 1 * Math.PI * 2, V = 0.18 + Math.pow(Math.max(0, Math.cos(S - u)), 10) * 0.82;
      A.globalAlpha = 0.38 * s * W * V * x, A.fillStyle = B ? "#ffffff" : "#34281f";
      const k = (0.7 + D[_ + 4] * 1.8) / Math.sqrt(a);
      A.fillRect(I, v, k, k);
    }
  }
  A.restore();
}
function Cu(A, e, t, i, n) {
  const r = document.createElement("canvas");
  r.width = e, r.height = t;
  const s = r.getContext("2d", { alpha: !0 });
  if (!s) throw new Error("Canvas 2D is unavailable.");
  return s.clearRect(0, 0, e, t), s.imageSmoothingEnabled = !0, s.imageSmoothingQuality = "high", s.drawImage(A, 0, 0, e, t), Mu(s, e, t, i, n), r;
}
var oi = 2048, lt = 320, Ir = 0.1 * 255;
function ve(A, e, t) {
  return Math.min(t, Math.max(e, A));
}
function xu(A, e, t) {
  const i = new Uint8Array(e * t), n = new Int32Array(e * t);
  let r = 0, s = 0;
  const a = (l, o) => {
    if (l < 0 || l >= e || o < 0 || o >= t) return;
    const c = o * e + l;
    i[c] || A[c] >= Ir || (i[c] = 1, n[s] = c, s += 1);
  };
  for (let l = 0; l < e; l += 1)
    a(l, 0), a(l, t - 1);
  for (let l = 1; l < t - 1; l += 1)
    a(0, l), a(e - 1, l);
  for (; r < s; ) {
    const l = n[r];
    r += 1;
    const o = l % e, c = Math.floor(l / e);
    a(o - 1, c), a(o + 1, c), a(o, c - 1), a(o, c + 1);
  }
  return i;
}
function Xs(A) {
  if (!A) return null;
  const e = Number.parseFloat(A);
  return Number.isFinite(e) && e > 0 ? e : null;
}
function _u(A) {
  if (A.length > 2e6) throw new Error("SVG markup must be smaller than 2 MB.");
  const e = new DOMParser().parseFromString(A, "image/svg+xml");
  if (e.querySelector("parsererror")) throw new Error("The SVG could not be parsed.");
  const t = e.documentElement;
  if (t.localName.toLowerCase() !== "svg") throw new Error("The uploaded file is not an SVG document.");
  t.querySelectorAll("script, foreignObject, iframe, object, embed, audio, video, canvas, style, animate, animateMotion, animateTransform, set").forEach((i) => i.remove());
  for (const i of [t, ...Array.from(t.querySelectorAll("*"))]) for (const n of Array.from(i.attributes)) {
    const r = n.name.toLowerCase(), s = n.value.trim();
    if (r.startsWith("on")) {
      i.removeAttribute(n.name);
      continue;
    }
    if (r === "href" || r === "xlink:href") {
      s.startsWith("#") || i.removeAttribute(n.name);
      continue;
    }
    /url\s*\(/i.test(s) && !/url\s*\(\s*["']?#/i.test(s) && i.removeAttribute(n.name), (/^javascript:/i.test(s) || /^data:text\/html/i.test(s)) && i.removeAttribute(n.name);
  }
  return t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(t);
}
function Su(A) {
  const e = new DOMParser().parseFromString(A, "image/svg+xml").documentElement, t = e.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (t?.length === 4 && Number.isFinite(t[2]) && Number.isFinite(t[3]) && t[2] > 0 && t[3] > 0) return ve(t[2] / t[3], 0.15, 8);
  const i = Xs(e.getAttribute("width")), n = Xs(e.getAttribute("height"));
  return i && n ? ve(i / n, 0.15, 8) : 1;
}
async function Iu(A) {
  const e = new Blob([A], { type: "image/svg+xml;charset=utf-8" }), t = URL.createObjectURL(e);
  try {
    const i = new Image();
    return i.decoding = "async", i.src = t, await i.decode(), i;
  } finally {
    URL.revokeObjectURL(t);
  }
}
async function Ja(A) {
  if (!/^(data:|blob:|https?:|\/)/i.test(A)) throw new Error("The image URL must use data, blob, HTTP, or HTTPS.");
  const e = new Image();
  if (e.decoding = "async", /^https?:/i.test(A) && (e.crossOrigin = "anonymous"), e.src = A, await e.decode(), !e.naturalWidth || !e.naturalHeight) throw new Error("The image has no drawable dimensions.");
  return e;
}
function qa(A) {
  const e = Math.min(1, 640 / Math.max(A.naturalWidth, A.naturalHeight)), t = Math.max(1, Math.round(A.naturalWidth * e)), i = Math.max(1, Math.round(A.naturalHeight * e)), n = document.createElement("canvas");
  n.width = t, n.height = i;
  const r = n.getContext("2d", { willReadFrequently: !0 });
  if (!r) throw new Error("Canvas 2D is unavailable.");
  r.clearRect(0, 0, t, i), r.drawImage(A, 0, 0, t, i);
  const s = r.getImageData(0, 0, t, i).data;
  for (let a = 3; a < s.length; a += 4) if (s[a] < 255) return !0;
  return !1;
}
async function td(A) {
  return qa(await Ja(A));
}
async function yu(A) {
  const e = A.fontFamily ?? "Arial Rounded MT Bold, Arial Black, sans-serif", t = A.fontWeight ?? 900, i = A.richText?.blocks.filter((u) => u.runs.length);
  if (i?.length) {
    const u = document.createElement("canvas").getContext("2d");
    if (!u) throw new Error("Canvas 2D is unavailable.");
    const x = 144, C = (k) => {
      const G = i.map((z) => {
        let X = 0, L = 0, q = 0, AA = 0;
        const eA = z.runs.map((PA) => {
          const WA = ve((PA.fontSize ?? 28) * k, 24, 720);
          AA = Math.max(AA, WA);
          const KA = PA.fontWeight ?? t;
          u.font = `${KA} ${WA}px ${e}`;
          const Y = u.measureText(PA.text || " "), nA = Y.actualBoundingBoxAscent || Math.max(WA * 0.76, 1), fA = Y.actualBoundingBoxDescent || Math.max(WA * 0.2, 1), hA = PA.text ? Y.width : 0;
          return X += hA, L = Math.max(L, nA), q = Math.max(q, fA), {
            ...PA,
            fontSize: WA,
            fontWeight: KA,
            width: hA
          };
        }), cA = AA || 28 * k;
        return (!eA.length || L + q < 1) && (L = cA * 0.76, q = cA * 0.24), {
          align: z.align ?? "center",
          runs: eA,
          width: X,
          ascent: L,
          descent: q,
          height: Math.max(L + q, cA) * ve(z.lineHeight ?? 1.2, 0.7, 3)
        };
      });
      return {
        lines: G,
        contentWidth: Math.max(1, ...G.map((z) => z.width)),
        contentHeight: G.reduce((z, X) => z + X.height, 0)
      };
    };
    let D = 8, M = C(D);
    const _ = 1750 / Math.max(M.contentWidth, 1), I = 1790 / Math.max(M.contentHeight, 1);
    if ((_ < 1 || I < 1) && (D *= Math.min(_, I), M = C(D)), document.fonts?.load) {
      const k = /* @__PURE__ */ new Set();
      for (const G of M.lines) for (const z of G.runs) k.add(`${z.fontWeight} ${z.fontSize}px ${e}`);
      await Promise.all([...k].map((G) => document.fonts.load(G).catch(() => []))), M = C(D);
    }
    const v = ve(Math.ceil(M.contentWidth + x * 2), lt, oi), B = ve(Math.ceil(M.contentHeight + x * 2), lt, oi), W = document.createElement("canvas");
    W.width = v, W.height = B;
    const S = W.getContext("2d", { willReadFrequently: !0 });
    if (!S) throw new Error("Canvas 2D is unavailable.");
    S.clearRect(0, 0, v, B), S.textBaseline = "alphabetic";
    let V = (B - M.contentHeight) / 2;
    for (const k of M.lines) {
      const G = k.align === "left" ? x : k.align === "right" ? v - x - k.width : (v - k.width) / 2, z = V + (k.height - k.ascent - k.descent) / 2 + k.ascent;
      let X = G;
      for (const L of k.runs) {
        if (S.font = `${L.fontWeight} ${L.fontSize}px ${e}`, S.fillStyle = L.color ?? A.color ?? "#19191d", S.fillText(L.text, X, z), L.underline && L.width > 0) {
          const q = Math.max(2, L.fontSize * 0.045);
          S.fillRect(X, z + Math.max(2, L.fontSize * 0.07), L.width, q);
        }
        X += L.width;
      }
      V += k.height;
    }
    return W;
  }
  const n = t;
  let r = 420;
  const s = document.createElement("canvas").getContext("2d");
  if (!s) throw new Error("Canvas 2D is unavailable.");
  if (document.fonts?.load) try {
    await document.fonts.load(`${n} ${r}px ${e}`);
  } catch {
  }
  const a = A.text || " ";
  s.font = `${n} ${r}px ${e}`;
  let l = s.measureText(a);
  const o = Math.max(1, l.width);
  o > 1750 && (r *= 1750 / o, s.font = `${n} ${r}px ${e}`, l = s.measureText(a));
  const c = l.actualBoundingBoxAscent || Math.max(r * 0.76, 1), f = l.actualBoundingBoxDescent || Math.max(r * 0.2, 1), h = 144, p = ve(Math.ceil(l.width + h * 2), lt, oi), m = ve(Math.ceil(c + f + h * 2), lt, 1280), P = document.createElement("canvas");
  P.width = p, P.height = m;
  const d = P.getContext("2d", { willReadFrequently: !0 });
  if (!d) throw new Error("Canvas 2D is unavailable.");
  return d.clearRect(0, 0, p, m), d.font = `${n} ${r}px ${e}`, d.textBaseline = "alphabetic", d.textAlign = "center", d.fillStyle = A.color ?? "#19191d", d.fillText(a, p / 2, (m + c - f) / 2), P;
}
async function Qu(A) {
  const e = _u(A.svg), t = Su(e), i = 1740, n = 144, r = t >= 1 ? i : i * t, s = t >= 1 ? i / t : i, a = ve(Math.ceil(r + n * 2), lt, oi), l = ve(Math.ceil(s + n * 2), lt, oi), o = document.createElement("canvas");
  o.width = a, o.height = l;
  const c = o.getContext("2d", { willReadFrequently: !0 });
  if (!c) throw new Error("Canvas 2D is unavailable.");
  const f = await Iu(e);
  return c.drawImage(f, n, n, a - n * 2, l - n * 2), o;
}
async function Tu(A) {
  const e = await Ja(A.src), t = qa(e), i = ve(e.naturalWidth / e.naturalHeight, 0.15, 8), n = ve(A.padding ?? 144, 0, 512), r = ve(A.textureMaxEdge ?? oi, lt, 8192), s = Math.max(1, r - n * 2), a = i >= 1 ? s : s * i, l = i >= 1 ? s / i : s, o = ve(Math.ceil(a + n * 2), lt, r), c = ve(Math.ceil(l + n * 2), lt, r), f = document.createElement("canvas");
  f.width = o, f.height = c;
  const h = f.getContext("2d", { willReadFrequently: !0 });
  if (!h) throw new Error("Canvas 2D is unavailable.");
  return h.clearRect(0, 0, o, c), h.drawImage(e, n, n, o - n * 2, c - n * 2), {
    canvas: f,
    hasTransparency: t
  };
}
function bu(A, e) {
  const t = document.createElement("canvas");
  t.width = A.width, t.height = A.height;
  const i = t.getContext("2d");
  if (!i) throw new Error("Canvas 2D is unavailable.");
  return i.fillStyle = e, i.fillRect(0, 0, t.width, t.height), i.globalCompositeOperation = "destination-in", i.drawImage(A, 0, 0), t;
}
var Ru = 1e12;
function Ys(A, e, t, i, n, r, s, a, l) {
  let o = 0;
  a[0] = 0, l[0] = Number.NEGATIVE_INFINITY, l[1] = Number.POSITIVE_INFINITY;
  for (let c = 1; c < s; c += 1) {
    let f = a[o], h = (A[e + c * t] + c * c - (A[e + f * t] + f * f)) / (2 * c - 2 * f);
    for (; h <= l[o]; )
      o -= 1, f = a[o], h = (A[e + c * t] + c * c - (A[e + f * t] + f * f)) / (2 * c - 2 * f);
    o += 1, a[o] = c, l[o] = h, l[o + 1] = Number.POSITIVE_INFINITY;
  }
  o = 0;
  for (let c = 0; c < s; c += 1) {
    for (; l[o + 1] < c; ) o += 1;
    const f = a[o], h = c - f;
    i[n + c * r] = h * h + A[e + f * t];
  }
}
function Lu(A, e) {
  const t = A.width, i = A.height, n = A.getContext("2d", { willReadFrequently: !0 });
  if (!n) throw new Error("Canvas 2D is unavailable.");
  const r = n.getImageData(0, 0, t, i).data, s = t * i, a = new Float32Array(s), l = new Float32Array(s);
  let o = !1;
  for (let d = 0; d < s; d += 1) {
    const u = r[d * 4 + 3] >= Ir;
    a[d] = u ? 0 : Ru, o || (o = u);
  }
  const c = Math.max(t, i), f = new Int32Array(c), h = new Float64Array(c + 1);
  if (o) {
    for (let d = 0; d < i; d += 1) Ys(a, d * t, 1, l, d * t, 1, t, f, h);
    for (let d = 0; d < t; d += 1) Ys(l, d, t, a, d, t, i, f, h);
  }
  const p = document.createElement("canvas");
  p.width = t, p.height = i;
  const m = p.getContext("2d");
  if (!m) throw new Error("Canvas 2D is unavailable.");
  const P = m.createImageData(t, i);
  for (let d = 0; d < s; d += 1) {
    const u = o ? ve(e + 0.5 - Math.sqrt(a[d]), 0, 1) : 0, x = d * 4;
    P.data[x] = 255, P.data[x + 1] = 255, P.data[x + 2] = 255, P.data[x + 3] = Math.round(u * 255);
  }
  return m.putImageData(P, 0, 0), p;
}
function Uu(A, e) {
  const t = document.createElement("canvas");
  t.width = A.width, t.height = A.height;
  const i = t.getContext("2d", { willReadFrequently: !0 });
  if (!i) throw new Error("Canvas 2D is unavailable.");
  const n = ve(e.width * 2.35, 0, 112);
  if (n > 0.25) {
    const r = Lu(A, n);
    i.drawImage(bu(r, e.color), 0, 0);
  }
  return i.drawImage(A, 0, 0), t;
}
async function Ks(A, e) {
  const t = A.type === "image" ? await Tu(A) : {
    canvas: A.type === "text" ? await yu(A) : await Qu(A),
    hasTransparency: !0
  }, i = t.canvas, n = Uu(i, e), r = n.getContext("2d", { willReadFrequently: !0 });
  if (!r) throw new Error("Canvas 2D is unavailable.");
  const s = r.getImageData(0, 0, n.width, n.height), a = new Uint8ClampedArray(n.width * n.height);
  for (let o = 3, c = 0; o < s.data.length; o += 4)
    a[c] = s.data[o], c += 1;
  const l = [];
  for (let o = 0; o < n.height; o += 1) {
    const c = o * n.width;
    let f = -1, h = -1;
    for (let m = 0; m < n.width; m += 1)
      a[c + m] < Ir || (f < 0 && (f = m), h = m);
    if (f < 0) continue;
    const p = o / Math.max(n.height - 1, 1);
    l.push(f / Math.max(n.width - 1, 1), p), h !== f && l.push(h / Math.max(n.width - 1, 1), p);
  }
  return {
    canvas: n,
    width: n.width,
    height: n.height,
    aspect: n.width / n.height,
    alpha: a,
    exteriorAlpha: xu(a, n.width, n.height),
    support: new Float32Array(l),
    hasTransparency: t.hasTransparency
  };
}
var ct = {
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
}, Js = 2.55, Fu = Math.PI, Nu = 1.28, qs = 4e-3, js = -0.22, zu = 0.035, lr = 0.74, Ou = 760, Hu = 520, id = 720, Zs = 720 / 1e3, $s = 0.06, Vu = 0.42, Gu = 0.32, ku = 0.9, Wu = "rgb(36, 126, 245)";
function ja(A) {
  const e = A.payload, t = A.consume;
  return A.payload = null, A.consume = null, {
    payload: e,
    consume: t
  };
}
function cr(A, e) {
  const { payload: t, consume: i } = ja(A);
  t && i && i(e, t);
}
function Xu(A) {
  return {
    commit() {
      cr(A, "commit");
    },
    commitWithEntrance() {
      cr(A, "entrance");
    },
    dispose() {
      cr(A, "dispose");
    }
  };
}
function RA(A, e, t) {
  return Math.min(t, Math.max(e, A));
}
function hr(A, e, t) {
  const i = RA((t - A) / (e - A), 0, 1);
  return i * i * (3 - 2 * i);
}
function ye(A, e) {
  try {
    return new HA(A);
  } catch {
    return new HA(e);
  }
}
function Aa(A, e) {
  return {
    ...A,
    ...e,
    outline: {
      ...A.outline,
      ...e.outline
    },
    edge: {
      ...A.edge,
      ...e.edge
    },
    shadow: {
      ...A.shadow,
      ...e.shadow
    },
    lighting: {
      ...A.lighting,
      ...e.lighting,
      direction: e.lighting?.direction ?? A.lighting?.direction
    },
    peel: {
      ...A.peel,
      ...e.peel
    },
    back: {
      ...A.back,
      ...e.back
    },
    material: {
      ...A.material,
      ...e.material
    },
    sound: {
      ...A.sound,
      ...e.sound
    },
    display: {
      ...A.display,
      ...e.display
    }
  };
}
var Yu = class {
  constructor(A, e = {}) {
    this.camera = new Mn(-1, 1, 1, -1, 0.01, 10), this.scene = new Rl(), this.peelAudio = new cu(), this.groundShadowGeometry = new Qi(1, 1), this.peelShadowLight = new dc(16777215, 1), this.peelShadowTarget = new be(), this.geometry = new Qi(1, 1, 2, 2), this.texture = null, this.artwork = null, this.source = ct, this.requestedSource = ct, this.sourceRevision = 0, this.sourceRebuildTimer = null, this.preparedSourceStates = /* @__PURE__ */ new Set(), this.destroyed = !1, this.resizeObserver = null, this.resizeFrameRequest = 0, this.renderedWidth = 0, this.renderedHeight = 0, this.renderedPixelRatio = 0, this.measuredClientWidth = -1, this.measuredClientHeight = -1, this.geometryWidth = 1, this.geometryHeight = 1, this.geometrySegmentsX = 2, this.geometrySegmentsY = 2, this.viewWidth = 2, this.viewHeight = 2, this.viewportHeightPx = 420, this.renderScale = 1, this.meshWidth = 1.6, this.meshHeight = 0.62, this.pointerId = null, this.grabOrigin = new bA(-0.8, 0), this.grabStart = new bA(), this.grabDirection = new bA(1, 0), this.activeDirection = new bA(1, 0), this.grabExtent = 1.6, this.creaseDepth = 0, this.basePeelRadius = 0.08, this.effectivePeelRadius = 0.08, this.grabProjection = 0, this.springVelocity = 0, this.springActive = !1, this.springTargetDepth = 0, this.dragDetached = !1, this.detachedTension = 0, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.preparedEntrance = null, this.backgroundRemovalEffectActive = !1, this.backgroundRemovalEffectElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.entranceAxis = new bA(1, 0), this.reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.hoverFrameRequest = 0, this.hoverClientX = 0, this.hoverClientY = 0, this.frameRequest = 0, this.lastFrameTime = 0, this.state = {
      ready: !1,
      dragging: !1,
      progress: 0,
      grabPoint: null,
      pointer: null
    }, this.resize = () => {
      this.resizeInternal(!0);
    }, this.resizeObserved = () => {
      this.resizeInternal(!1);
    }, this.scheduleResize = () => {
      this.destroyed || this.resizeFrameRequest || (this.resizeFrameRequest = requestAnimationFrame(() => {
        this.resizeFrameRequest = 0, this.resizeObserved();
      }));
    }, this.onPointerDown = (i) => {
      if (this.destroyed || !this.state.ready || this.detachedExitActive || this.entranceActive || i.button !== 0) return;
      this.hoverFrameRequest && (cancelAnimationFrame(this.hoverFrameRequest), this.hoverFrameRequest = 0);
      const n = this.screenToLocal(i.clientX, i.clientY), r = this.hitEdge(n);
      if (!r) {
        this.startInteractionHint();
        return;
      }
      this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.uniforms.uInteractionHint.value = 0, i.preventDefault(), this.renderer.domElement.focus({ preventScroll: !0 }), this.renderer.domElement.setPointerCapture(i.pointerId), this.pointerId = i.pointerId, this.grabOrigin.copy(r.local), this.grabStart.copy(r.local), this.grabDirection.copy(r.inward), this.activeDirection.copy(r.inward), this.grabExtent = this.projectionExtent(this.grabOrigin, this.grabDirection), this.setCreaseDepth(0), this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = 0, this.dragDetached = !1, this.state.dragging = !0, this.state.grabPoint = {
        x: r.local.x,
        y: r.local.y
      }, this.state.pointer = {
        x: n.x,
        y: n.y
      }, this.renderer.domElement.style.cursor = "grabbing", this.peelAudio.unlock(), this.peelAudio.begin(this.state.progress, i.timeStamp), this.updatePeelUniforms(), this.emit("peelstart", {
        amount: this.state.progress,
        progress: this.state.progress,
        origin: this.state.grabPoint
      }), this.requestRender();
    }, this.onPointerMove = (i) => {
      if (this.destroyed || !this.state.ready) return;
      if (this.state.dragging && i.pointerId === this.pointerId && i.buttons === 0) {
        this.finishPointerDrag(i.timeStamp);
        return;
      }
      if (!this.state.dragging || i.pointerId !== this.pointerId) {
        this.hoverClientX = i.clientX, this.hoverClientY = i.clientY, this.hoverFrameRequest || (this.hoverFrameRequest = requestAnimationFrame(this.updateHoverCursor));
        return;
      }
      i.preventDefault();
      const n = this.screenToLocal(i.clientX, i.clientY), r = n.clone().sub(this.grabStart), s = r.length();
      let a = 0, l = !1;
      if (this.dragDetached) {
        const o = s > qs ? r.clone().normalize() : this.grabDirection;
        o.dot(this.grabDirection) >= js && (this.activeDirection.copy(o), this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), s < this.peelModelForDepth(this.grabExtent).projection && (this.dragDetached = !1));
      }
      if (this.dragDetached) {
        const o = this.peelModelForDepth(this.grabExtent).projection;
        this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = this.grabExtent, this.setCreaseDepth(this.grabExtent), this.setDetachedDragOffset(r.x - this.activeDirection.x * o, r.y - this.activeDirection.y * o);
      } else {
        if (s > qs) {
          const o = r.clone().normalize();
          o.dot(this.grabDirection) >= js ? (this.activeDirection.copy(o), a = s) : l = !0;
        } else this.activeDirection.copy(this.grabDirection);
        if (this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), l)
          this.springActive || (this.springActive = !0, this.springVelocity = 0), this.springTargetDepth = 0;
        else {
          const o = this.peelModelForDepth(this.grabExtent).projection, c = this.solveCreaseDepth(a);
          this.creaseDepth - c > this.grabExtent * zu || this.springActive && c < this.creaseDepth ? (this.springActive || (this.springActive = !0, this.springVelocity = 0), this.springTargetDepth = c) : (this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = c, this.setCreaseDepth(c));
          const f = Math.max(0, a - o);
          this.setDetachedDragOffset(this.activeDirection.x * f, this.activeDirection.y * f), this.state.progress >= 1 - Number.EPSILON && (this.dragDetached = !0);
        }
      }
      this.peelAudio.update(this.state.progress, i.timeStamp, this.activeDirection.x), this.state.pointer = {
        x: n.x,
        y: n.y
      }, this.updatePeelUniforms(), this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress,
        direction: {
          x: this.activeDirection.x,
          y: this.activeDirection.y
        }
      }), this.requestRender();
    }, this.onPointerUp = (i) => {
      !this.state.dragging || i.pointerId !== this.pointerId || this.finishPointerDrag(i.timeStamp);
    }, this.onWindowPointerEnd = (i) => {
      !this.state.dragging || i.pointerId !== this.pointerId || this.finishPointerDrag(i.timeStamp);
    }, this.onLostPointerCapture = (i) => {
      !this.state.dragging || i.pointerId !== this.pointerId || this.finishPointerDrag(i.timeStamp);
    }, this.onWindowBlur = () => {
      this.finishPointerDrag(performance.now());
    }, this.onVisibilityChange = () => {
      document.visibilityState === "hidden" && this.finishPointerDrag(performance.now());
    }, this.onPointerLeave = () => {
      this.state.dragging || (this.hoverFrameRequest && (cancelAnimationFrame(this.hoverFrameRequest), this.hoverFrameRequest = 0), this.renderer.domElement.style.cursor !== "default" && (this.renderer.domElement.style.cursor = "default"));
    }, this.updateHoverCursor = () => {
      if (this.hoverFrameRequest = 0, this.destroyed || this.state.dragging) return;
      const i = this.hitEdge(this.screenToLocal(this.hoverClientX, this.hoverClientY)) ? "grab" : "default";
      this.renderer.domElement.style.cursor !== i && (this.renderer.domElement.style.cursor = i);
    }, this.onKeyDown = (i) => {
      if (!this.state.ready) return;
      const n = i.key === "ArrowUp" || i.key === "ArrowRight", r = i.key === "ArrowDown" || i.key === "ArrowLeft";
      if (!n && !r && i.key !== " ") return;
      if (i.preventDefault(), this.peelAudio.unlock(), i.key === " ") {
        this.reset();
        return;
      }
      this.grabOrigin.set(-this.meshWidth / 2, 0), this.activeDirection.set(1, 0), this.grabDirection.copy(this.activeDirection), this.grabExtent = this.meshWidth;
      const s = this.state.progress, a = RA(s + (n ? 0.08 : -0.08), 0, 1);
      this.setCreaseDepth(a * this.grabExtent), this.peelAudio.begin(s, i.timeStamp - 72), this.peelAudio.update(this.state.progress, i.timeStamp, this.activeDirection.x), this.peelAudio.end(this.state.progress), this.state.pointer = {
        x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
        y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
      }, this.updatePeelUniforms(), this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress
      }), this.requestRender();
    }, this.onContextLost = (i) => {
      i.preventDefault(), this.emit("error", { message: "The WebGL context was lost. Reload the page to restore the sticker." });
    }, this.renderFrame = (i) => {
      if (this.frameRequest = 0, this.destroyed) return;
      const n = this.lastFrameTime ? Math.min((i - this.lastFrameTime) / 1e3, 1 / 20) : 1 / 60;
      this.lastFrameTime = i;
      const r = this.reducedMotionQuery.matches;
      if (this.springActive && r) if (this.state.dragging)
        this.setCreaseDepth(this.springTargetDepth), this.springVelocity = 0, this.springActive = !1, this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      else {
        this.reset();
        return;
      }
      if (this.springActive) {
        const a = 132 + RA(this.options.peel.stiffness, 0, 1) * 146, l = Math.sqrt(a) * 1.83;
        let o = n, c = this.creaseDepth;
        for (; o > 0; ) {
          const f = Math.min(o, 0.008333333333333333), h = -a * (c - this.springTargetDepth) - l * this.springVelocity;
          this.springVelocity += h * f, c += this.springVelocity * f, o -= f;
        }
        Math.abs(c - this.springTargetDepth) <= this.grabExtent * 8e-4 && Math.abs(this.springVelocity) < this.grabExtent * 0.018 ? (this.setCreaseDepth(this.springTargetDepth), this.springVelocity = 0, this.springActive = !1, !this.state.dragging && this.springTargetDepth === 0 && (this.state.pointer = null, this.state.grabPoint = null)) : (this.setCreaseDepth(Math.max(0, c)), this.state.dragging || (this.state.pointer = {
          x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
          y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
        })), this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      }
      if (this.detachedExitActive) {
        this.detachedExitElapsed += n;
        const a = Math.max(this.viewWidth, this.viewHeight) * (1.45 + this.detachedExitElapsed * 3.2);
        if (this.stickerMesh.position.x += this.activeDirection.x * a * n, this.stickerMesh.position.y += this.activeDirection.y * a * n, this.stickerMesh.rotation.z += this.detachedExitSpin * n, this.detachedExitElapsed >= 0.46) {
          if (this.emit("detachcomplete", { progress: 1 }), this.destroyed) return;
          this.startEntranceAnimation();
          return;
        }
      }
      if (this.preparedEntrance) {
        this.preparedEntrance.elapsed += n;
        const a = RA(this.preparedEntrance.elapsed / Gu, 0, 1), l = hr(0, 1, a);
        if (this.uniforms.uPreparedMix.value = l, this.uniforms.uPreEntranceProgress.value = l, a >= 1) {
          const o = this.preparedEntrance;
          this.preparedEntrance = null, this.sourceRevision += 1, this.requestedSource = o.source, this.source = o.source, this.options = $t(this.options, {
            ...o.options,
            source: o.source
          }), this.applyArtwork(o.artwork, o.texture), this.startEntranceAnimation();
          return;
        }
      }
      if (this.entranceActive && (this.entranceElapsed += n, this.applyEntranceElapsed(this.entranceElapsed) && (this.entranceActive = !1, this.clearEntrancePose(), this.emit("cyclecomplete", { progress: 0 }))), this.interactionHintActive) {
        this.interactionHintElapsed += n;
        const a = RA(this.interactionHintElapsed / ku, 0, 1);
        if (r) this.uniforms.uInteractionHint.value = a < 0.72 ? 1 : 0;
        else {
          const l = hr(0, 0.12, a), o = 1 - hr(0.58, 1, a), c = 0.9 + Math.sin(a * Math.PI * 2) * 0.1;
          this.uniforms.uInteractionHint.value = l * o * c;
        }
        a >= 1 && (this.interactionHintActive = !1, this.uniforms.uInteractionHint.value = 0);
      }
      if (this.backgroundRemovalEffectActive) {
        const a = ks();
        if (this.applyLaserEffectSettings(), r) this.uniforms.uEntranceSweep.value = 0.5;
        else {
          this.backgroundRemovalEffectElapsed += n;
          const l = this.backgroundRemovalEffectElapsed % (a.cycleDuration / 1e3);
          this.uniforms.uEntranceSweep.value = Math.min(l / (a.sweepDuration / 1e3), 1);
        }
      }
      this.uniforms.uTime.value = i / 1e3, this.renderer.render(this.scene, this.camera);
      const s = !r && this.options.wind > 1e-3 && this.state.progress > 0.01;
      (this.springActive || this.detachedExitActive || this.preparedEntrance !== null || this.entranceActive || this.interactionHintActive || this.backgroundRemovalEffectActive && !r || s) && this.requestRender();
    }, this.container = A, this.options = $t(void 0, e), this.camera.position.z = 3, this.renderer = new Gf({
      alpha: !0,
      antialias: !0,
      powerPreference: "high-performance",
      premultipliedAlpha: !0,
      preserveDrawingBuffer: !0
    }), this.renderer.setClearColor(0, 0), this.renderer.outputColorSpace = Qe, this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = 1, this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.cursor = "default", this.renderer.domElement.tabIndex = 0, this.renderer.domElement.setAttribute("role", "slider"), this.renderer.domElement.setAttribute("aria-valuemin", "0"), this.renderer.domElement.setAttribute("aria-valuemax", "100"), this.renderer.domElement.setAttribute("aria-valuenow", "0"), this.renderer.domElement.setAttribute("aria-label", "Interactive sticker. Drag a visible edge, or use arrow keys to preview the peel."), this.renderer.domElement.setAttribute("aria-keyshortcuts", "ArrowUp ArrowRight ArrowDown ArrowLeft Space"), this.uniforms = {
      uMap: { value: null },
      uPreparedMap: { value: null },
      uPreparedMix: { value: 0 },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
      uDetachedTension: { value: 0 },
      uRadius: { value: 0.08 },
      uMaxAngle: { value: 3.55 },
      uWind: { value: this.options.wind },
      uTime: { value: 0 },
      uOrigin: { value: this.grabOrigin.clone() },
      uPeelDir: { value: this.activeDirection.clone() },
      uMeshSize: { value: new bA(this.meshWidth, this.meshHeight) },
      uTexel: { value: new bA(1 / 1024, 1 / 512) },
      uEdgeFinishScale: { value: 1 },
      uEdgeBevelWidth: { value: this.options.edge.width },
      uEdgeFinishStrength: { value: this.options.edge.strength },
      uBackColor: { value: ye(this.options.back.color, "#f7f5f2") },
      uGloss: { value: this.options.back.gloss },
      uRoughness: { value: this.options.back.roughness },
      uLightDirection: { value: new N(this.options.lighting.direction.x, this.options.lighting.direction.y, this.options.lighting.direction.z).normalize() },
      uLightIntensity: { value: this.options.lighting.intensity },
      uAmbientLight: { value: this.options.lighting.ambient },
      uLightSoftness: { value: this.options.lighting.softness },
      uMaterialType: { value: Ws(this.options.material.type) },
      uMaterialIntensity: { value: this.options.material.intensity },
      uMaterialScale: { value: this.options.material.scale },
      uHolographicGrain: { value: this.options.material.holographicGrain },
      uMaterialSeed: { value: this.options.material.seed },
      uMaterialBaked: { value: 0 },
      uHolographicColorA: { value: ye(this.options.material.holographicColors[0], "#f2a7c5") },
      uHolographicColorB: { value: ye(this.options.material.holographicColors[1], "#8edfd5") },
      uHolographicColorC: { value: ye(this.options.material.holographicColors[2], "#9db4ea") },
      uShadowColor: { value: ye(this.options.shadow.color, "#191823") },
      uShadowOpacity: { value: this.options.shadow.opacity },
      uSurfaceShadowEnabled: { value: this.options.peel.surfaceShadow ? 1 : 0 },
      uShadowBlur: { value: this.options.shadow.blur },
      uShadowDistance: { value: 0.04 },
      uShadowDirection: { value: new bA(0.7, -0.7) },
      uEntranceSweep: { value: -1 },
      uEntranceAxis: { value: this.entranceAxis.clone() },
      uEntranceScaleProgress: { value: -1 },
      uPreEntranceProgress: { value: 0 },
      uLaserCoreWidth: { value: 0.04 },
      uLaserBandWidth: { value: 0.3 },
      uLaserBandOpacity: { value: 0.46 },
      uLaserBrightness: { value: 1.18 },
      uLaserHighlightIntensity: { value: 0.62 },
      uBackgroundRemovalDistortion: { value: 0 },
      uRemovalDistortionRange: { value: 0.37 },
      uRemovalDistortionStrength: { value: 2.25 },
      uRemovalRippleDensity: { value: 12 },
      uRemovalRippleSpeed: { value: 4.2 },
      uInteractionHint: { value: 0 },
      uInteractionHintRadius: { value: 3 },
      uInteractionHintColor: { value: ye(Wu, "rgb(36, 126, 245)") },
      uPreserveFrontColor: { value: 1 },
      uOpacity: { value: 1 }
    };
    const t = {
      ...Ra.clone(sA.lights),
      ...this.uniforms
    };
    this.stickerMaterial = new Te({
      uniforms: t,
      vertexShader: kf,
      fragmentShader: Wf,
      lights: !0,
      side: 2,
      transparent: !0,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMaterial.alphaTest = 8e-3, this.stickerMesh = new Ne(this.geometry, this.stickerMaterial), this.stickerMesh.renderOrder = 20, this.stickerMesh.receiveShadow = !0, this.residueMaterial = new Te({
      uniforms: { ...this.uniforms },
      vertexShader: Xf,
      fragmentShader: Yf,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }), this.residueMesh = new Ne(this.geometry, this.residueMaterial), this.residueMesh.position.z = -6e-3, this.residueMesh.renderOrder = 10, this.peelShadowDepthMaterial = new Te({
      uniforms: { ...this.uniforms },
      vertexShader: Kf,
      fragmentShader: Jf,
      side: 2,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMesh.castShadow = !0, this.stickerMesh.customDepthMaterial = this.peelShadowDepthMaterial, this.peelShadowLight.castShadow = !0, this.peelShadowLight.shadow.mapSize.set(this.options.quality === "high" ? 2048 : 1024, this.options.quality === "high" ? 2048 : 1024), this.peelShadowLight.shadow.bias = -1e-4, this.peelShadowLight.shadow.normalBias = 15e-4, this.peelShadowLight.target = this.peelShadowTarget, this.scene.add(this.peelShadowTarget, this.peelShadowLight), this.groundShadowMaterial = new Yl({
      color: ye(this.options.shadow.color, "#191823"),
      opacity: this.options.shadow.opacity,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }), this.groundShadowMesh = new Ne(this.groundShadowGeometry, this.groundShadowMaterial), this.groundShadowMesh.position.z = -0.012, this.groundShadowMesh.receiveShadow = !0, this.groundShadowMesh.renderOrder = 5, this.scene.add(this.groundShadowMesh), this.scene.add(this.residueMesh), this.scene.add(this.stickerMesh);
    try {
      this.attach();
    } catch (i) {
      throw this.destroy(), i;
    }
  }
  attach() {
    const A = this.renderer.domElement;
    this.container.appendChild(A), A.addEventListener("pointerdown", this.onPointerDown), A.addEventListener("pointermove", this.onPointerMove), A.addEventListener("pointerup", this.onPointerUp), A.addEventListener("pointercancel", this.onPointerUp), A.addEventListener("lostpointercapture", this.onLostPointerCapture), A.addEventListener("pointerleave", this.onPointerLeave), A.addEventListener("keydown", this.onKeyDown), A.addEventListener("webglcontextlost", this.onContextLost), window.addEventListener("pointerup", this.onWindowPointerEnd, !0), window.addEventListener("pointercancel", this.onWindowPointerEnd, !0), window.addEventListener("blur", this.onWindowBlur), document.addEventListener("visibilitychange", this.onVisibilityChange), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(this.resizeObserved), this.resizeObserver.observe(this.container)) : window.addEventListener("resize", this.scheduleResize), this.resize();
  }
  async setSource(A) {
    if (this.destroyed) return;
    this.cancelPreparedEntrance(), this.requestedSource = A, this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null);
    const e = ++this.sourceRevision;
    try {
      const t = await Ks(A, this.options.outline);
      if (this.destroyed || e !== this.sourceRevision) return;
      this.source = A, this.options.source = A, this.applyArtwork(t);
    } catch (t) {
      const i = t instanceof Error ? t.message : "The sticker source failed to render.";
      throw this.emit("error", { message: i }), t;
    }
  }
  async prepareSource(A, e = {}) {
    if (this.destroyed) throw new Error("The sticker renderer has been destroyed.");
    const t = $t(this.options, e), i = await Ks(A, t.outline);
    if (this.destroyed) throw new Error("The sticker renderer has been destroyed.");
    const n = this.createArtworkTexture(i, t.material, t.lighting);
    try {
      this.renderer.initTexture(n);
    } catch (s) {
      throw n.dispose(), s;
    }
    const r = {
      payload: {
        artwork: i,
        texture: n,
        source: A,
        options: e
      },
      consume: null
    };
    return r.consume = (s, a) => {
      if (this.preparedSourceStates.delete(r), s === "dispose" || this.destroyed) {
        a.texture.dispose();
        return;
      }
      if (s === "commit") {
        this.sourceRevision += 1, this.requestedSource = a.source, this.source = a.source, this.options = $t(this.options, {
          ...a.options,
          source: a.source
        }), this.applyArtwork(a.artwork, a.texture);
        return;
      }
      s === "entrance" && (this.cancelPreparedEntrance(), this.entranceActive = !1, this.clearEntrancePose(), this.preparedEntrance = {
        artwork: a.artwork,
        texture: a.texture,
        source: a.source,
        options: a.options,
        elapsed: 0
      }, this.uniforms.uPreparedMap.value = a.texture, this.uniforms.uPreparedMix.value = 0, this.uniforms.uPreEntranceProgress.value = 0, this.requestRender());
    }, this.preparedSourceStates.add(r), Xu(r);
  }
  setOptions(A) {
    if (this.destroyed) return;
    const e = this.options.outline, t = this.options.quality, i = this.options.display, n = this.materialKey();
    this.options = $t(this.options, A), this.artwork && this.materialKey() !== n && !A.source && this.refreshMaterialTexture(), A.source && this.setSource(A.source).catch(() => {
    }), A.outline && (this.options.outline.width !== e.width || this.options.outline.color !== e.color) && !A.source && (this.sourceRebuildTimer !== null && window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = window.setTimeout(() => {
      this.sourceRebuildTimer = null, this.setSource(this.requestedSource).catch(() => {
      });
    }, 70)), (this.options.quality !== t || this.options.display.width !== i.width || this.options.display.height !== i.height) && this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.applyOptionsToRenderer(), this.requestRender();
  }
  reset() {
    const A = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, A !== null && this.renderer.domElement.hasPointerCapture(A) && this.renderer.domElement.releasePointerCapture(A), this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = 0, this.dragDetached = !1, this.detachedTension = 0, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = He.degToRad(this.options.tilt), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uInteractionHint.value = 0, this.peelAudio.reset(0), this.setCreaseDepth(0), this.state.pointer = null, this.state.grabPoint = null, this.renderer.domElement.style.cursor = "default", this.updatePeelUniforms(), this.emit("peelchange", {
      amount: 0,
      progress: 0
    }), this.requestRender();
  }
  setPeelProgress(A, e = {
    origin: {
      x: 0,
      y: 0.5
    },
    target: {
      x: 1,
      y: 0.5
    }
  }) {
    if (this.destroyed || !this.artwork) return;
    this.springActive = !1, this.springVelocity = 0, this.detachedExitActive = !1, this.entranceActive = !1, this.interactionHintActive = !1, this.state.dragging = !1, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = He.degToRad(this.options.tilt), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uInteractionHint.value = 0;
    const t = RA(e.origin.x, 0, 1) - 0.5, i = 0.5 - RA(e.origin.y, 0, 1), n = e.target.x - 0.5, r = 0.5 - e.target.y;
    this.grabOrigin.set(t * this.meshWidth, i * this.meshHeight);
    const s = (n - t) * this.meshWidth, a = (r - i) * this.meshHeight, l = Math.hypot(s, a);
    this.grabDirection.set(s, a), this.grabDirection.lengthSq() < 1e-4 && this.grabDirection.set(1, 0), this.grabDirection.normalize(), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection);
    const o = this.peelModelForDepth(this.grabExtent).projection, c = Math.max(l, o), f = RA(A, 0, 1) * c;
    this.setCreaseDepth(this.solveCreaseDepth(f));
    const h = Math.max(0, f - o);
    this.setDetachedDragOffset(this.activeDirection.x * h, this.activeDirection.y * h), this.state.grabPoint = {
      x: this.grabOrigin.x,
      y: this.grabOrigin.y
    }, this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * f,
      y: this.grabOrigin.y + this.activeDirection.y * f
    }, this.updatePeelUniforms(), this.renderer.render(this.scene, this.camera);
  }
  setEntranceProgress(A) {
    this.destroyed || !this.artwork || (this.springActive = !1, this.springVelocity = 0, this.detachedExitActive = !1, this.entranceActive = !1, this.interactionHintActive = !1, this.state.dragging = !1, this.detachedTension = 0, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = He.degToRad(this.options.tilt), this.uniforms.uInteractionHint.value = 0, this.setCreaseDepth(0), this.state.grabPoint = null, this.state.pointer = null, this.configureEntranceAxis(), this.applyEntranceElapsed(RA(A, 0, 1) * Zs) && this.clearEntrancePose(), this.updatePeelUniforms(), this.renderer.render(this.scene, this.camera));
  }
  setBackgroundRemovalEffect(A) {
    this.destroyed || (this.backgroundRemovalEffectActive = A, this.backgroundRemovalEffectElapsed = 0, this.configureEntranceAxis(), this.uniforms.uBackgroundRemovalDistortion.value = A ? 1 : 0, this.entranceActive || (this.uniforms.uEntranceSweep.value = A ? 0 : -1), this.requestRender());
  }
  reappear() {
    this.destroyed || this.startEntranceAnimation();
  }
  setRenderScale(A) {
    if (this.destroyed) return;
    const e = RA(A, 1, 6);
    Math.abs(e - this.renderScale) < 1e-3 || (this.renderScale = e, this.resize());
  }
  getRenderSnapshot() {
    const A = this.uniforms.uOrigin.value, e = this.uniforms.uPeelDir.value;
    return {
      progress: this.uniforms.uPeel.value,
      peelDepth: this.uniforms.uPeelDepth.value,
      peelRadius: this.uniforms.uRadius.value,
      detachedTension: this.uniforms.uDetachedTension.value,
      origin: {
        x: A.x,
        y: A.y
      },
      direction: {
        x: e.x,
        y: e.y
      },
      position: {
        x: this.stickerMesh.position.x,
        y: this.stickerMesh.position.y
      },
      scale: {
        x: this.stickerMesh.scale.x,
        y: this.stickerMesh.scale.y
      },
      rotation: this.stickerMesh.rotation.z,
      entranceSweep: this.uniforms.uEntranceSweep.value,
      entranceScaleProgress: this.uniforms.uEntranceScaleProgress.value,
      time: this.uniforms.uTime.value
    };
  }
  setRenderSnapshot(A) {
    this.destroyed || !this.artwork || (this.springActive = !1, this.detachedExitActive = !1, this.entranceActive = !1, this.interactionHintActive = !1, this.state.dragging = !1, this.state.progress = A.progress, this.creaseDepth = A.peelDepth, this.effectivePeelRadius = A.peelRadius, this.detachedTension = A.detachedTension, this.grabOrigin.set(A.origin.x, A.origin.y), this.activeDirection.set(A.direction.x, A.direction.y), this.stickerMesh.position.set(A.position.x, A.position.y, 0), this.stickerMesh.scale.set(A.scale.x, A.scale.y, 1), this.stickerMesh.rotation.z = A.rotation, this.uniforms.uPeel.value = A.progress, this.uniforms.uPeelDepth.value = A.peelDepth, this.uniforms.uRadius.value = A.peelRadius, this.uniforms.uDetachedTension.value = A.detachedTension, this.uniforms.uOrigin.value.copy(this.grabOrigin), this.uniforms.uPeelDir.value.copy(this.activeDirection), this.uniforms.uEntranceSweep.value = A.entranceSweep, this.uniforms.uEntranceScaleProgress.value = A.entranceScaleProgress, this.uniforms.uTime.value = A.time, this.renderer.render(this.scene, this.camera));
  }
  resizeInternal(A) {
    if (this.destroyed) return;
    const e = this.container.clientWidth, t = this.container.clientHeight, i = e !== this.measuredClientWidth || t !== this.measuredClientHeight;
    this.measuredClientWidth = e, this.measuredClientHeight = t;
    const n = Math.max(2, Math.round(e || 640)), r = Math.max(2, Math.round(t || 420)), s = this.options.quality === "low" ? 1.25 : 2, a = Math.min(Math.min(window.devicePixelRatio || 1, s) * this.renderScale, 6), l = n !== this.renderedWidth || r !== this.renderedHeight || a !== this.renderedPixelRatio;
    if (l) {
      this.renderedWidth = n, this.renderedHeight = r, this.renderedPixelRatio = a, this.renderer.setPixelRatio(a), this.renderer.setSize(n, r, !1), this.viewportHeightPx = r, this.viewHeight = 2, this.viewWidth = n / r * this.viewHeight, this.groundShadowMesh.scale.set(this.viewWidth * 1.2, this.viewHeight * 1.2, 1), this.camera.left = -this.viewWidth / 2, this.camera.right = this.viewWidth / 2, this.camera.top = this.viewHeight / 2, this.camera.bottom = -this.viewHeight / 2, this.camera.updateProjectionMatrix();
      const c = this.peelShadowLight.shadow.camera, f = Math.max(this.viewWidth, this.viewHeight) * 0.9;
      c.left = -f, c.right = f, c.top = f, c.bottom = -f, c.near = 0.1, c.far = 16, c.updateProjectionMatrix();
    }
    const o = this.artwork ? this.updateMeshGeometry(this.artwork.aspect, A || l || i) : !1;
    !l && !o && !i && !A || (this.applyOptionsToRenderer(), this.renderer.render(this.scene, this.camera));
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
    this.destroyed = !0, cancelAnimationFrame(this.frameRequest), cancelAnimationFrame(this.resizeFrameRequest), cancelAnimationFrame(this.hoverFrameRequest), this.frameRequest = 0, this.resizeFrameRequest = 0, this.hoverFrameRequest = 0;
    for (const e of this.preparedSourceStates) {
      const { payload: t } = ja(e);
      t?.texture.dispose();
    }
    this.preparedSourceStates.clear(), this.cancelPreparedEntrance(), this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null), this.resizeObserver?.disconnect(), this.resizeObserver = null, window.removeEventListener("resize", this.scheduleResize);
    const A = this.renderer.domElement;
    A.removeEventListener("pointerdown", this.onPointerDown), A.removeEventListener("pointermove", this.onPointerMove), A.removeEventListener("pointerup", this.onPointerUp), A.removeEventListener("pointercancel", this.onPointerUp), A.removeEventListener("lostpointercapture", this.onLostPointerCapture), A.removeEventListener("pointerleave", this.onPointerLeave), A.removeEventListener("keydown", this.onKeyDown), A.removeEventListener("webglcontextlost", this.onContextLost), window.removeEventListener("pointerup", this.onWindowPointerEnd, !0), window.removeEventListener("pointercancel", this.onWindowPointerEnd, !0), window.removeEventListener("blur", this.onWindowBlur), document.removeEventListener("visibilitychange", this.onVisibilityChange), this.texture?.dispose(), this.texture = null, this.artwork = null, this.source = ct, this.requestedSource = ct, this.options = $t(void 0, {}), this.uniforms.uMap.value = null, this.uniforms.uPreparedMap.value = null, this.geometry.dispose();
    for (const e of Object.keys(this.geometry.attributes)) this.geometry.deleteAttribute(e);
    this.geometry.setIndex(null), this.groundShadowGeometry.dispose(), this.stickerMaterial.dispose(), this.residueMaterial.dispose(), this.peelShadowDepthMaterial.dispose(), this.groundShadowMaterial.dispose(), this.peelAudio.destroy(), this.renderer.dispose(), this.renderer.forceContextLoss(), A.width = 1, A.height = 1, A.remove();
  }
  materialKey() {
    const A = this.options.material, e = this.options.lighting;
    return JSON.stringify([
      A.type,
      A.intensity,
      A.scale,
      A.holographicGrain,
      A.seed,
      ...A.holographicColors,
      e.direction.x,
      e.direction.y,
      e.direction.z,
      e.intensity
    ]);
  }
  createArtworkTexture(A, e = this.options.material, t = this.options.lighting) {
    const i = Cu(A.canvas, A.width, A.height, e, t), n = new Wl(i);
    return n.colorSpace = Qe, n.minFilter = En, n.magFilter = xe, n.generateMipmaps = !0, n.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy()), n.needsUpdate = !0, n;
  }
  refreshMaterialTexture() {
    if (!this.artwork) return;
    const A = this.texture, e = this.createArtworkTexture(this.artwork);
    this.texture = e, this.uniforms.uMap.value = e, this.uniforms.uPreparedMap.value === A && (this.uniforms.uPreparedMap.value = e), this.uniforms.uMaterialBaked.value = 1, A?.dispose();
  }
  cancelPreparedEntrance() {
    const A = this.preparedEntrance;
    this.preparedEntrance = null, A && A.texture.dispose(), this.uniforms.uPreparedMix.value = 0, this.uniforms.uPreEntranceProgress.value = 0, this.uniforms.uPreparedMap.value = this.texture;
  }
  applyArtwork(A, e = this.createArtworkTexture(A)) {
    this.artwork = A;
    const t = this.texture;
    this.texture = e, this.uniforms.uMap.value = e, this.uniforms.uPreparedMap.value = e, this.uniforms.uPreparedMix.value = 0, this.uniforms.uMaterialBaked.value = 1, this.uniforms.uPreEntranceProgress.value = 0, this.uniforms.uTexel.value.set(1 / A.width, 1 / A.height), this.updateMeshGeometry(A.aspect), this.applyOptionsToRenderer(), this.reset(), this.state.ready = !0, t?.dispose(), this.emit("ready", {
      width: A.width,
      height: A.height,
      hasTransparency: A.hasTransparency
    });
  }
  updateMeshGeometry(A, e = !1) {
    const t = this.viewHeight / Math.max(1, this.viewportHeightPx);
    let i, n;
    if (this.options.display.width > 0 && this.options.display.height > 0)
      i = this.options.display.width * t, n = this.options.display.height * t;
    else {
      const h = Math.min(this.viewWidth * 0.78, Ou * t), p = Math.min(this.viewHeight * 0.58, Hu * t);
      i = h, n = i / A, n > p && (n = p, i = n * A);
    }
    const r = this.options.display.width > 0 ? Math.max(1e-3, i) : Math.max(0.34, i), s = this.options.display.height > 0 ? Math.max(1e-3, n) : Math.max(0.25, n), a = this.options.quality === "high" ? 240 : this.options.quality === "medium" ? 160 : 96, l = RA(Math.round(a), 64, 256), o = RA(Math.round(a / Math.max(A, 0.35)), 56, 192), c = l !== this.geometrySegmentsX || o !== this.geometrySegmentsY, f = Math.abs(r - this.geometryWidth) > 1e-6 || Math.abs(s - this.geometryHeight) > 1e-6;
    if (!c && !f)
      return e && this.resetGeometryPeelState(), !1;
    if (this.meshWidth = r, this.meshHeight = s, c) {
      const h = new Qi(this.meshWidth, this.meshHeight, l, o), p = this.geometry;
      this.geometry = h, this.stickerMesh.geometry = h, this.residueMesh.geometry = h, p.dispose(), this.geometrySegmentsX = l, this.geometrySegmentsY = o;
    } else {
      const h = this.geometry.attributes.position;
      let p = 0;
      for (let m = 0; m <= o; m += 1) {
        const P = (0.5 - m / o) * this.meshHeight;
        for (let d = 0; d <= l; d += 1) {
          const u = (d / l - 0.5) * this.meshWidth;
          h.setXYZ(p, u, P, 0), p += 1;
        }
      }
      h.needsUpdate = !0, this.geometry.computeBoundingBox(), this.geometry.computeBoundingSphere();
    }
    return this.geometryWidth = this.meshWidth, this.geometryHeight = this.meshHeight, this.resetGeometryPeelState(), !0;
  }
  resetGeometryPeelState() {
    this.uniforms.uMeshSize.value.set(this.meshWidth, this.meshHeight), this.grabOrigin.set(-this.meshWidth / 2, 0), this.grabDirection.set(1, 0), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.meshWidth, this.setCreaseDepth(0), this.updatePeelUniforms();
  }
  applyOptionsToRenderer() {
    const A = He.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = A, this.residueMesh.rotation.z = A, this.uniforms.uBackColor.value = ye(this.options.back.color, "#f7f5f2"), this.uniforms.uEdgeBevelWidth.value = RA(this.options.edge.width, 0.5, 6), this.uniforms.uEdgeFinishStrength.value = RA(this.options.edge.strength, 0, 1), this.uniforms.uGloss.value = RA(this.options.back.gloss, 0, 1), this.uniforms.uRoughness.value = RA(this.options.back.roughness, 0, 1), this.uniforms.uMaterialType.value = Ws(this.options.material.type), this.uniforms.uMaterialIntensity.value = RA(this.options.material.intensity, 0, 1), this.uniforms.uMaterialScale.value = RA(this.options.material.scale, 0.2, 4), this.uniforms.uHolographicGrain.value = RA(this.options.material.holographicGrain, 0, 1), this.uniforms.uMaterialSeed.value = this.options.material.seed, this.uniforms.uHolographicColorA.value = ye(this.options.material.holographicColors[0], "#f2a7c5"), this.uniforms.uHolographicColorB.value = ye(this.options.material.holographicColors[1], "#8edfd5"), this.uniforms.uHolographicColorC.value = ye(this.options.material.holographicColors[2], "#9db4ea"), this.uniforms.uWind.value = Math.max(0, this.options.wind);
    const e = this.uniforms.uLightDirection.value;
    e.set(this.options.lighting.direction.x, this.options.lighting.direction.y, Math.max(1e-3, this.options.lighting.direction.z)), e.lengthSq() < 1e-4 ? e.set(-0.38, 0.52, 0.76) : e.normalize();
    const t = RA(this.options.lighting.intensity, 0, 1.5), i = RA(this.options.lighting.ambient, 0, 1), n = RA(this.options.lighting.softness, 0, 1);
    this.uniforms.uLightIntensity.value = t, this.uniforms.uAmbientLight.value = i, this.uniforms.uLightSoftness.value = n;
    const r = this.options.sound.src.trim();
    this.peelAudio.configure({
      enabled: this.options.sound.enabled,
      src: r || Wa,
      volume: this.options.sound.volume,
      useBuiltInProfile: !r
    });
    const s = this.options.peel.maxAngle, a = s > Math.PI * 2 ? He.degToRad(s) : s;
    this.uniforms.uMaxAngle.value = RA(a, Js, Fu);
    const l = this.options.peel.radius, o = this.container.getBoundingClientRect(), c = l <= 1 ? Math.max(8e-3, Math.min(this.meshWidth, this.meshHeight) * l) : Math.max(8e-3, l / Math.max(o.height, 1) * this.viewHeight);
    this.basePeelRadius = c * He.lerp(0.82, 1.16, RA(this.options.peel.stiffness, 0, 1)), this.residueMesh.visible = this.options.peel.residue, this.uniforms.uSurfaceShadowEnabled.value = this.options.peel.surfaceShadow ? 1 : 0, this.setCreaseDepth(this.creaseDepth), this.uniforms.uShadowColor.value = ye(this.options.shadow.color, "#191823");
    const f = (0.45 + t * 0.75) * (1 - i * 0.35), h = RA(this.options.shadow.opacity * f, 0, 0.9);
    this.uniforms.uShadowOpacity.value = h, this.groundShadowMaterial.color.copy(ye(this.options.shadow.color, "#191823")), this.groundShadowMaterial.opacity = h;
    const p = this.meshWidth / Math.max(this.viewWidth, 1e-3) * Math.max(this.renderer.domElement.clientWidth, 1), m = this.artwork ? this.artwork.width / Math.max(p, 1) : 1;
    this.uniforms.uEdgeFinishScale.value = RA(m, 0.75, 8), this.uniforms.uInteractionHintRadius.value = this.artwork ? RA(this.options.peel.grabWidth * m, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13) : 3;
    const P = He.lerp(0.55, 1.3, n);
    this.uniforms.uShadowBlur.value = Math.max(0, this.options.shadow.blur) * m * 0.34 * P, this.uniforms.uShadowDistance.value = Math.max(0, this.options.shadow.distance) / Math.max(o.width || 1, 1) * this.viewWidth;
    const d = this.uniforms.uShadowDirection.value;
    if (d.set(-e.x, -e.y), d.lengthSq() < 1e-4) {
      const C = He.degToRad(this.options.shadow.angle);
      d.set(Math.cos(C), -Math.sin(C));
    }
    d.normalize();
    const u = 1.6 + this.uniforms.uShadowDistance.value * 34;
    this.peelShadowLight.position.set(e.x * u, e.y * u, Math.max(0.8, e.z * u)), this.peelShadowTarget.position.set(0, 0, 0), this.peelShadowLight.shadow.radius = RA(this.options.shadow.blur * He.lerp(0.42, 0.72, n), 1, 56);
    const x = this.options.quality === "high" ? 2048 : 1024;
    this.peelShadowLight.shadow.mapSize.set(x, x), this.peelShadowLight.shadow.needsUpdate = !0;
  }
  updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress, this.uniforms.uPeelDepth.value = this.creaseDepth, this.uniforms.uDetachedTension.value = this.detachedTension, this.uniforms.uRadius.value = this.effectivePeelRadius, this.uniforms.uOrigin.value.copy(this.grabOrigin), this.uniforms.uPeelDir.value.copy(this.activeDirection);
    const A = Math.round(RA(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(A)), this.renderer.domElement.setAttribute("aria-valuetext", `${A}% peeled`);
  }
  projectedGrabDistance(A, e, t = this.uniforms.uMaxAngle.value) {
    if (A <= 0) return 0;
    const i = Math.max(e, 1e-3), n = Math.min(A / i, t), r = i * t;
    let s = -i * Math.sin(n);
    return A > r && (s -= (A - r) * Math.cos(t)), Math.max(0, A + s);
  }
  peelModelForDepth(A) {
    const e = RA(A, 0, Math.max(this.grabExtent, 1e-3));
    if (e <= 1e-6) return {
      depth: 0,
      radius: this.basePeelRadius,
      projection: 0
    };
    const t = this.projectedGrabDistance(e, this.basePeelRadius);
    if (t >= e / Nu) return {
      depth: e,
      radius: this.basePeelRadius,
      projection: t
    };
    const i = e / Js;
    return {
      depth: e,
      radius: i,
      projection: this.projectedGrabDistance(e, i)
    };
  }
  setCreaseDepth(A) {
    const e = this.peelModelForDepth(A);
    this.creaseDepth = e.depth, this.effectivePeelRadius = e.radius, this.grabProjection = e.projection, this.state.progress = RA(this.creaseDepth / Math.max(this.grabExtent, 1e-3), 0, 1);
  }
  solveCreaseDepth(A) {
    const e = Math.max(0, A), t = this.peelModelForDepth(this.grabExtent);
    if (e >= t.projection) return t.depth;
    if (e <= 1e-6) return 0;
    let i = 0, n = this.grabExtent;
    for (let r = 0; r < 16; r += 1) {
      const s = (i + n) * 0.5;
      this.peelModelForDepth(s).projection < e ? i = s : n = s;
    }
    return (i + n) * 0.5;
  }
  setDetachedDragOffset(A, e) {
    const t = He.degToRad(this.options.tilt), i = Math.cos(t), n = Math.sin(t), r = RA(Math.hypot(A, e) / Math.max(this.grabExtent * 0.45, 0.12), 0, 1);
    this.detachedTension = r * r * (3 - 2 * r);
    const s = this.grabProjection - this.grabExtent * 2, a = A + this.activeDirection.x * s * this.detachedTension, l = e + this.activeDirection.y * s * this.detachedTension;
    this.stickerMesh.position.set(a * i - l * n, a * n + l * i, 0);
  }
  screenToLocal(A, e) {
    const t = this.renderer.domElement.getBoundingClientRect(), i = (A - t.left) / Math.max(t.width, 1) * 2 - 1, n = 1 - (e - t.top) / Math.max(t.height, 1) * 2, r = i * (this.viewWidth / 2), s = n * (this.viewHeight / 2), a = -He.degToRad(this.options.tilt), l = Math.cos(a), o = Math.sin(a);
    return new bA(r * l - s * o, r * o + s * l);
  }
  sampleAlpha(A, e) {
    if (!this.artwork) return 0;
    const t = RA(Math.round(A), 0, this.artwork.width - 1), i = RA(Math.round(e), 0, this.artwork.height - 1);
    return this.artwork.alpha[i * this.artwork.width + t] / 255;
  }
  sampleExterior(A, e) {
    if (!this.artwork) return !1;
    const t = Math.round(A), i = Math.round(e);
    return t < 0 || t >= this.artwork.width || i < 0 || i >= this.artwork.height ? !0 : this.artwork.exteriorAlpha[i * this.artwork.width + t] === 1;
  }
  hitEdge(A) {
    if (!this.artwork) return null;
    const e = A.x / this.meshWidth + 0.5, t = A.y / this.meshHeight + 0.5;
    if (e < -0.04 || e > 1.04 || t < -0.04 || t > 1.04) return null;
    const i = e * (this.artwork.width - 1), n = (1 - t) * (this.artwork.height - 1), r = this.meshWidth / Math.max(this.viewWidth, 1e-3) * this.renderer.domElement.clientWidth, s = this.artwork.width / Math.max(r, 1), a = RA(this.options.peel.grabWidth * s, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13), l = Math.ceil(a), o = Math.max(0, Math.floor(i - l)), c = Math.min(this.artwork.width - 1, Math.ceil(i + l)), f = Math.max(0, Math.floor(n - l)), h = Math.min(this.artwork.height - 1, Math.ceil(n + l));
    let p = -1, m = -1, P = a * a + 1;
    for (let C = f; C <= h; C += 1) for (let D = o; D <= c; D += 1) {
      const M = D - i, _ = C - n, I = M * M + _ * _;
      I >= P || I > a * a || this.sampleAlpha(D, C) < 0.1 || (this.sampleExterior(D - 1, C) || this.sampleExterior(D + 1, C) || this.sampleExterior(D, C - 1) || this.sampleExterior(D, C + 1)) && (p = D, m = C, P = I);
    }
    if (p < 0 || m < 0) return null;
    const d = new bA((p / Math.max(this.artwork.width - 1, 1) - 0.5) * this.meshWidth, (0.5 - m / Math.max(this.artwork.height - 1, 1)) * this.meshHeight), u = RA(a * 0.14, 1.5, 4.5), x = new bA(this.sampleAlpha(p + u, m) - this.sampleAlpha(p - u, m), -(this.sampleAlpha(p, m + u) - this.sampleAlpha(p, m - u)));
    return x.lengthSq() < 8e-3 && x.set(-d.x, -d.y), x.lengthSq() < 1e-4 && x.set(1, 0), x.normalize(), {
      local: d,
      inward: x
    };
  }
  projectionExtent(A, e) {
    if (!this.artwork) return Math.max(this.meshHeight * 0.35, this.meshWidth);
    let t = this.meshHeight * 0.35;
    for (let i = 0; i < this.artwork.support.length; i += 2) {
      const n = (this.artwork.support[i] - 0.5) * this.meshWidth, r = (0.5 - this.artwork.support[i + 1]) * this.meshHeight;
      t = Math.max(t, (n - A.x) * e.x + (r - A.y) * e.y);
    }
    return Math.max(this.meshHeight * 0.35, t + this.meshHeight * 0.025);
  }
  finishPointerDrag(A) {
    if (!this.state.dragging) return;
    const e = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, e !== null && this.renderer.domElement.hasPointerCapture(e) && this.renderer.domElement.releasePointerCapture(e), this.renderer.domElement.style.cursor = "grab";
    const t = this.options.peel.release, i = this.springActive ? Math.min(this.state.progress, RA(this.springTargetDepth / Math.max(this.grabExtent, 1e-3), 0, 1)) : this.state.progress, n = t === "snap" && i >= lr || t === "snap" && this.options.peel.detachThreshold < lr && i >= RA(this.options.peel.detachThreshold, 0.1, lr);
    n && (this.setCreaseDepth(this.grabExtent), this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
      y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
    }, this.updatePeelUniforms(), this.peelAudio.update(this.state.progress, A, this.activeDirection.x)), this.peelAudio.end(this.state.progress);
    const r = t === "reset" || t === "snap" && !n, s = this.reducedMotionQuery.matches;
    if (r || (this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = this.creaseDepth), r && !s && (this.springActive = !0, this.springVelocity = 0, this.springTargetDepth = 0), this.emit("peelend", {
      amount: this.state.progress,
      progress: this.state.progress,
      willReset: r
    }), n) {
      if (s) {
        if (this.emit("detachcomplete", { progress: 1 }), this.destroyed) return;
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
  configureEntranceAxis() {
    this.entranceAxis.set(this.meshWidth >= this.meshHeight ? 1 : 0, this.meshWidth >= this.meshHeight ? 0 : -1), this.uniforms.uEntranceAxis.value.copy(this.entranceAxis);
  }
  applyEntranceElapsed(A) {
    const e = RA(A / Zs, 0, 1);
    this.uniforms.uEntranceScaleProgress.value = e;
    const t = RA((A - $s) / Vu, 0, 1);
    return this.uniforms.uEntranceSweep.value = A < $s ? -1 : t, e >= 1 && t >= 1;
  }
  clearEntrancePose() {
    this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uEntranceSweep.value = -1;
  }
  startEntranceAnimation() {
    this.reset(), this.peelAudio.playReappear(), this.entranceActive = !0, this.entranceElapsed = 0, this.configureEntranceAxis(), this.applyLaserEffectSettings(), this.applyEntranceElapsed(0), this.requestRender();
  }
  applyLaserEffectSettings() {
    const A = ks();
    this.uniforms.uLaserCoreWidth.value = A.coreWidth, this.uniforms.uLaserBandWidth.value = A.bandWidth, this.uniforms.uLaserBandOpacity.value = A.bandOpacity, this.uniforms.uLaserBrightness.value = A.brightness, this.uniforms.uLaserHighlightIntensity.value = A.highlightIntensity, this.uniforms.uRemovalDistortionRange.value = A.distortionRange, this.uniforms.uRemovalDistortionStrength.value = A.distortionStrength, this.uniforms.uRemovalRippleDensity.value = A.rippleDensity, this.uniforms.uRemovalRippleSpeed.value = A.rippleSpeed;
  }
  emit(A, e) {
    this.container.dispatchEvent(new CustomEvent(A, { detail: e }));
  }
};
function Ku(A) {
  return {
    ready: A.ready,
    dragging: A.dragging,
    progress: A.progress,
    grabPoint: A.grabPoint ? { ...A.grabPoint } : null,
    pointer: A.pointer ? { ...A.pointer } : null
  };
}
function Ju(A) {
  return {
    ...A,
    origin: { ...A.origin },
    direction: { ...A.direction },
    position: { ...A.position },
    scale: { ...A.scale }
  };
}
var qu = class {
  constructor(A) {
    this.resize = () => {
      this.renderer?.resize();
    }, this.renderer = A, this.lastState = A.getState(), this.lastSnapshot = A.getRenderSnapshot();
  }
  async setSource(A) {
    await this.renderer?.setSource(A);
  }
  async prepareSource(A, e) {
    if (!this.renderer) throw new Error("The sticker renderer has been destroyed.");
    return this.renderer.prepareSource(A, e);
  }
  setOptions(A) {
    this.renderer?.setOptions(A);
  }
  reset() {
    this.renderer?.reset();
  }
  setPeelProgress(A, e) {
    this.renderer?.setPeelProgress(A, e);
  }
  setEntranceProgress(A) {
    this.renderer?.setEntranceProgress(A);
  }
  setBackgroundRemovalEffect(A) {
    this.renderer?.setBackgroundRemovalEffect(A);
  }
  reappear() {
    this.renderer?.reappear();
  }
  setRenderScale(A) {
    this.renderer?.setRenderScale(A);
  }
  getRenderSnapshot() {
    return this.renderer ? (this.lastSnapshot = this.renderer.getRenderSnapshot(), this.lastSnapshot) : Ju(this.lastSnapshot);
  }
  setRenderSnapshot(A) {
    this.renderer?.setRenderSnapshot(A);
  }
  getState() {
    return this.renderer ? (this.lastState = this.renderer.getState(), this.lastState) : Ku(this.lastState);
  }
  destroy() {
    const A = this.renderer;
    if (A) {
      this.lastState = A.getState(), this.lastSnapshot = A.getRenderSnapshot();
      try {
        A.destroy();
      } finally {
        this.renderer = null;
      }
    }
  }
};
function ju(A) {
  return new qu(A);
}
async function Zu(A, e = {}) {
  if (typeof document > "u") throw new Error("Sticker Forge can only be created in a browser.");
  const t = typeof A == "string" ? document.querySelector(A) : A;
  if (!t) throw new Error("Sticker Forge could not find its target element.");
  const i = new Yu(t, e);
  try {
    return await i.setSource(e.source ?? ct), ju(i);
  } catch (n) {
    throw i.destroy(), n;
  }
}
var $u = typeof HTMLElement > "u" ? class {
} : HTMLElement, ea = class extends $u {
  constructor(...A) {
    super(...A), this.instance = null, this.instancePromise = null, this.mountElement = null, this.pendingOptions = {}, this.pendingSource = null, this.lifecycleRevision = 0;
  }
  static get observedAttributes() {
    return ["text"];
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      const A = this.attachShadow({ mode: "open" }), e = document.createElement("style");
      e.textContent = `
        :host { display: block; min-width: 160px; min-height: 120px; }
        .mount { width: 100%; height: 100%; min-height: inherit; }
      `, this.mountElement = document.createElement("div"), this.mountElement.className = "mount", A.append(e, this.mountElement);
      for (const t of [
        "peelstart",
        "peelchange",
        "peelend",
        "detachcomplete",
        "cyclecomplete",
        "error"
      ]) this.mountElement.addEventListener(t, (i) => {
        this.dispatchEvent(new CustomEvent(t, {
          detail: i.detail,
          bubbles: !0,
          composed: !0
        }));
      });
    }
    this.pendingSource || (this.pendingSource = {
      ...ct,
      text: this.getAttribute("text") || ct.text
    }), this.ensureInstance().catch(() => {
    });
  }
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback(A, e, t) {
    if (A === "text" && e !== t) {
      const i = {
        ...ct,
        text: t || " "
      };
      this.pendingSource = i, this.isConnected && this.setSource(i).catch(() => {
      });
    }
  }
  async setSource(A) {
    this.pendingSource = A, await (await this.ensureInstance()).setSource(A);
  }
  async prepareSource(A, e) {
    return (await this.ensureInstance()).prepareSource(A, e);
  }
  setOptions(A) {
    this.pendingOptions = Aa(this.pendingOptions, A), this.instance?.setOptions(A);
  }
  reset() {
    this.instance?.reset();
  }
  setPeelProgress(A, e) {
    this.instance?.setPeelProgress(A, e);
  }
  setEntranceProgress(A) {
    this.instance?.setEntranceProgress(A);
  }
  setBackgroundRemovalEffect(A) {
    this.instance?.setBackgroundRemovalEffect(A);
  }
  reappear() {
    this.instance?.reappear();
  }
  setRenderScale(A) {
    this.instance?.setRenderScale(A);
  }
  getRenderSnapshot() {
    return this.instance?.getRenderSnapshot() ?? {
      progress: 0,
      peelDepth: 0,
      peelRadius: 0,
      detachedTension: 0,
      origin: {
        x: 0,
        y: 0
      },
      direction: {
        x: 1,
        y: 0
      },
      position: {
        x: 0,
        y: 0
      },
      scale: {
        x: 1,
        y: 1
      },
      rotation: 0,
      entranceSweep: -1,
      entranceScaleProgress: -1,
      time: 0
    };
  }
  setRenderSnapshot(A) {
    this.instance?.setRenderSnapshot(A);
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
    const A = this.instancePromise;
    this.instance?.destroy(), this.instance = null, this.instancePromise = null, A && A.then((e) => {
      e.destroy();
    }).catch(() => {
    });
  }
  ensureInstance() {
    if (this.instance) return Promise.resolve(this.instance);
    if (this.instancePromise) return this.instancePromise;
    if (!this.mountElement) return Promise.reject(/* @__PURE__ */ new Error("The sticker element is not connected."));
    const A = Aa(this.pendingOptions, { source: this.pendingSource ?? ct }), e = this.lifecycleRevision, t = Zu(this.mountElement, A);
    return this.instancePromise = t, t.then((i) => {
      if (this.instancePromise === t && (this.instancePromise = null), e !== this.lifecycleRevision || !this.isConnected) {
        i.destroy();
        return;
      }
      this.instance = i, this.dispatchEvent(new CustomEvent("ready", {
        bubbles: !0,
        composed: !0
      }));
    }).catch((i) => {
      this.instancePromise === t && (this.instancePromise = null);
      const n = i instanceof Error ? i.message : "Sticker Forge could not initialize.";
      this.dispatchEvent(new CustomEvent("error", {
        detail: { message: n },
        bubbles: !0,
        composed: !0
      }));
    }), t;
  }
};
function Ad(A = "sticker-forge") {
  if (!(typeof customElements > "u") && !customElements.get(A)) {
    const e = A === "sticker-forge" ? ea : class extends ea {
    };
    customElements.define(A, e);
  }
}
Ad();
export {
  id as STICKER_ENTRANCE_DURATION_MS,
  ea as StickerForgeElement,
  Zu as createSticker,
  Ad as defineStickerForge,
  td as imageSourceHasTransparency,
  _u as sanitizeSvgMarkup
};

//# sourceMappingURL=sticker-forge.es.js.map