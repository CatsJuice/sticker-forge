var ks, Gs, Ws, Xs, Ys, qs, Ks, Js, Zs;
var nA = 1e3, ai = 1001, rA = 1002, Dt = 1003, Va = 1004, za = 1005, St = 1006, Ha = 1007, pr = 1008, Ei = 1009, ka = 1010, Ga = 1011, js = 1012, Wa = 1013, bi = 1014, mr = 1015, Ii = 1016, $s = 1017, ea = 1018, ta = 1020, Xa = 35902, Ya = 35899, qa = 1021, Ka = 1022, Sn = 1023, Cn = 1026, ia = 1027, Ja = 1028, na = 1029, cr = 1030, ra = 1031, Aa = 1033, Za = 33776, ja = 33777, $a = 33778, eo = 33779, to = 35840, io = 35841, no = 35842, ro = 35843, Ao = 36196, so = 37492, ao = 37496, oo = 37488, lo = 37489, co = 37490, ho = 37491, uo = 37808, fo = 37809, po = 37810, mo = 37811, go = 37812, vo = 37813, wo = 37814, Eo = 37815, Mo = 37816, Po = 37817, _o = 37818, Do = 37819, xo = 37820, So = 37821, Co = 36492, yo = 36494, To = 36495, Bo = 36283, bo = 36284, Io = 36285, Ro = 36286, hr = 2300, AA = 2301, Pr = 2302, CA = 2303, yA = 2400, TA = 2401, BA = 2402, Lo = 3200;
var Bt = "srgb", sA = "srgb-linear", ur = "linear", fr = "srgb", _r = 7680;
var Uo = 35044;
var nn = 2e3;
function No(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function Fo(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function dr(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Qo() {
  const e = dr("canvas");
  return e.style.display = "block", e;
}
var bA = {}, rn = null;
function IA(...e) {
  const t = "THREE." + e.shift();
  rn ? rn("log", t, ...e) : console.log(t, ...e);
}
function sa(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const i = e[1];
    i && i.isStackTrace ? e[0] += " " + i.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function De(...e) {
  e = sa(e);
  const t = "THREE." + e.shift();
  if (rn) rn("warn", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.warn(i.getError(t)) : console.warn(t, ...e);
  }
}
function Te(...e) {
  e = sa(e);
  const t = "THREE." + e.shift();
  if (rn) rn("error", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.error(i.getError(t)) : console.error(t, ...e);
  }
}
function en(...e) {
  const t = e.join(" ");
  t in bA || (bA[t] = !0, De(...e));
}
function Oo(e, t, i) {
  return new Promise(function(n, r) {
    function A() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          r();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(A, i);
          break;
        default:
          n();
      }
    }
    setTimeout(A, i);
  });
}
var Vo = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
}, Ri = class {
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
      for (let r = 0, A = n.length; r < A; r++) n[r].call(this, e);
      e.target = null;
    }
  }
}, vt = [
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
], RA = 1234567, _n = Math.PI / 180, yn = 180 / Math.PI;
function an() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (vt[e & 255] + vt[e >> 8 & 255] + vt[e >> 16 & 255] + vt[e >> 24 & 255] + "-" + vt[t & 255] + vt[t >> 8 & 255] + "-" + vt[t >> 16 & 15 | 64] + vt[t >> 24 & 255] + "-" + vt[i & 63 | 128] + vt[i >> 8 & 255] + "-" + vt[i >> 16 & 255] + vt[i >> 24 & 255] + vt[n & 255] + vt[n >> 8 & 255] + vt[n >> 16 & 255] + vt[n >> 24 & 255]).toLowerCase();
}
function Fe(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function lA(e, t) {
  return (e % t + t) % t;
}
function zo(e, t, i, n, r) {
  return n + (e - t) * (r - n) / (i - t);
}
function Ho(e, t, i) {
  return e !== t ? (i - e) / (t - e) : 0;
}
function Dn(e, t, i) {
  return (1 - i) * e + i * t;
}
function ko(e, t, i, n) {
  return Dn(e, t, 1 - Math.exp(-i * n));
}
function Go(e, t = 1) {
  return t - Math.abs(lA(e, t * 2) - t);
}
function Wo(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * (3 - 2 * e));
}
function Xo(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function Yo(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function qo(e, t) {
  return e + Math.random() * (t - e);
}
function Ko(e) {
  return e * (0.5 - Math.random());
}
function Jo(e) {
  e !== void 0 && (RA = e);
  let t = RA += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Zo(e) {
  return e * _n;
}
function jo(e) {
  return e * yn;
}
function $o(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function el(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function tl(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function il(e, t, i, n, r) {
  const A = Math.cos, s = Math.sin, a = A(i / 2), l = s(i / 2), o = A((t + n) / 2), c = s((t + n) / 2), u = A((t - n) / 2), h = s((t - n) / 2), p = A((n - t) / 2), w = s((n - t) / 2);
  switch (r) {
    case "XYX":
      e.set(a * c, l * u, l * h, a * o);
      break;
    case "YZY":
      e.set(l * h, a * c, l * u, a * o);
      break;
    case "ZXZ":
      e.set(l * u, l * h, a * c, a * o);
      break;
    case "XZX":
      e.set(a * c, l * w, l * p, a * o);
      break;
    case "YXY":
      e.set(l * p, a * c, l * w, a * o);
      break;
    case "ZYZ":
      e.set(l * w, l * p, a * c, a * o);
      break;
    default:
      De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Zi(e, t) {
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
var $t = {
  DEG2RAD: _n,
  RAD2DEG: yn,
  generateUUID: an,
  clamp: Fe,
  euclideanModulo: lA,
  mapLinear: zo,
  inverseLerp: Ho,
  lerp: Dn,
  damp: ko,
  pingpong: Go,
  smoothstep: Wo,
  smootherstep: Xo,
  randInt: Yo,
  randFloat: qo,
  randFloatSpread: Ko,
  seededRandom: Jo,
  degToRad: Zo,
  radToDeg: jo,
  isPowerOfTwo: $o,
  ceilPowerOfTwo: el,
  floorPowerOfTwo: tl,
  setQuaternionFromProperEuler: il,
  normalize: Mt,
  denormalize: Zi
};
Ks = Symbol.iterator;
var Re = class {
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
    const i = Math.cos(t), n = Math.sin(t), r = this.x - e.x, A = this.y - e.y;
    return this.x = r * i - A * n + e.x, this.y = r * n + A * i + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Ks]() {
    yield this.x, yield this.y;
  }
};
ks = Re;
ks.prototype.isVector2 = !0;
var Li = class {
  constructor(e = 0, t = 0, i = 0, n = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = n;
  }
  static slerpFlat(e, t, i, n, r, A, s) {
    let a = i[n + 0], l = i[n + 1], o = i[n + 2], c = i[n + 3], u = r[A + 0], h = r[A + 1], p = r[A + 2], w = r[A + 3];
    if (c !== w || a !== u || l !== h || o !== p) {
      let M = a * u + l * h + o * p + c * w;
      M < 0 && (u = -u, h = -h, p = -p, w = -w, M = -M);
      let d = 1 - s;
      if (M < 0.9995) {
        const f = Math.acos(M), C = Math.sin(f);
        d = Math.sin(d * f) / C, s = Math.sin(s * f) / C, a = a * d + u * s, l = l * d + h * s, o = o * d + p * s, c = c * d + w * s;
      } else {
        a = a * d + u * s, l = l * d + h * s, o = o * d + p * s, c = c * d + w * s;
        const f = 1 / Math.sqrt(a * a + l * l + o * o + c * c);
        a *= f, l *= f, o *= f, c *= f;
      }
    }
    e[t] = a, e[t + 1] = l, e[t + 2] = o, e[t + 3] = c;
  }
  static multiplyQuaternionsFlat(e, t, i, n, r, A) {
    const s = i[n], a = i[n + 1], l = i[n + 2], o = i[n + 3], c = r[A], u = r[A + 1], h = r[A + 2], p = r[A + 3];
    return e[t] = s * p + o * c + a * h - l * u, e[t + 1] = a * p + o * u + l * c - s * h, e[t + 2] = l * p + o * h + s * u - a * c, e[t + 3] = o * p - s * c - a * u - l * h, e;
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
    const i = e._x, n = e._y, r = e._z, A = e._order, s = Math.cos, a = Math.sin, l = s(i / 2), o = s(n / 2), c = s(r / 2), u = a(i / 2), h = a(n / 2), p = a(r / 2);
    switch (A) {
      case "XYZ":
        this._x = u * o * c + l * h * p, this._y = l * h * c - u * o * p, this._z = l * o * p + u * h * c, this._w = l * o * c - u * h * p;
        break;
      case "YXZ":
        this._x = u * o * c + l * h * p, this._y = l * h * c - u * o * p, this._z = l * o * p - u * h * c, this._w = l * o * c + u * h * p;
        break;
      case "ZXY":
        this._x = u * o * c - l * h * p, this._y = l * h * c + u * o * p, this._z = l * o * p + u * h * c, this._w = l * o * c - u * h * p;
        break;
      case "ZYX":
        this._x = u * o * c - l * h * p, this._y = l * h * c + u * o * p, this._z = l * o * p - u * h * c, this._w = l * o * c + u * h * p;
        break;
      case "YZX":
        this._x = u * o * c + l * h * p, this._y = l * h * c + u * o * p, this._z = l * o * p - u * h * c, this._w = l * o * c - u * h * p;
        break;
      case "XZY":
        this._x = u * o * c - l * h * p, this._y = l * h * c - u * o * p, this._z = l * o * p + u * h * c, this._w = l * o * c + u * h * p;
        break;
      default:
        De("Quaternion: .setFromEuler() encountered an unknown order: " + A);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const i = t / 2, n = Math.sin(i);
    return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], n = t[4], r = t[8], A = t[1], s = t[5], a = t[9], l = t[2], o = t[6], c = t[10], u = i + s + c;
    if (u > 0) {
      const h = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / h, this._x = (o - a) * h, this._y = (r - l) * h, this._z = (A - n) * h;
    } else if (i > s && i > c) {
      const h = 2 * Math.sqrt(1 + i - s - c);
      this._w = (o - a) / h, this._x = 0.25 * h, this._y = (n + A) / h, this._z = (r + l) / h;
    } else if (s > c) {
      const h = 2 * Math.sqrt(1 + s - i - c);
      this._w = (r - l) / h, this._x = (n + A) / h, this._y = 0.25 * h, this._z = (a + o) / h;
    } else {
      const h = 2 * Math.sqrt(1 + c - i - s);
      this._w = (A - n) / h, this._x = (r + l) / h, this._y = (a + o) / h, this._z = 0.25 * h;
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
    const i = e._x, n = e._y, r = e._z, A = e._w, s = t._x, a = t._y, l = t._z, o = t._w;
    return this._x = i * o + A * s + n * l - r * a, this._y = n * o + A * a + r * s - i * l, this._z = r * o + A * l + i * a - n * s, this._w = A * o - i * s - n * a - r * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let i = e._x, n = e._y, r = e._z, A = e._w, s = this.dot(e);
    s < 0 && (i = -i, n = -n, r = -r, A = -A, s = -s);
    let a = 1 - t;
    if (s < 0.9995) {
      const l = Math.acos(s), o = Math.sin(l);
      a = Math.sin(a * l) / o, t = Math.sin(t * l) / o, this._x = this._x * a + i * t, this._y = this._y * a + n * t, this._z = this._z * a + r * t, this._w = this._w * a + A * t, this._onChangeCallback();
    } else
      this._x = this._x * a + i * t, this._y = this._y * a + n * t, this._z = this._z * a + r * t, this._w = this._w * a + A * t, this.normalize();
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
Js = Symbol.iterator;
var Q = class {
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
    return this.applyQuaternion(LA.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(LA.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, i = this.y, n = this.z, r = e.elements;
    return this.x = r[0] * t + r[3] * i + r[6] * n, this.y = r[1] * t + r[4] * i + r[7] * n, this.z = r[2] * t + r[5] * i + r[8] * n, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, i = this.y, n = this.z, r = e.elements, A = 1 / (r[3] * t + r[7] * i + r[11] * n + r[15]);
    return this.x = (r[0] * t + r[4] * i + r[8] * n + r[12]) * A, this.y = (r[1] * t + r[5] * i + r[9] * n + r[13]) * A, this.z = (r[2] * t + r[6] * i + r[10] * n + r[14]) * A, this;
  }
  applyQuaternion(e) {
    const t = this.x, i = this.y, n = this.z, r = e.x, A = e.y, s = e.z, a = e.w, l = 2 * (A * n - s * i), o = 2 * (s * t - r * n), c = 2 * (r * i - A * t);
    return this.x = t + a * l + A * c - s * o, this.y = i + a * o + s * l - r * c, this.z = n + a * c + r * o - A * l, this;
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
    const i = e.x, n = e.y, r = e.z, A = t.x, s = t.y, a = t.z;
    return this.x = n * a - r * s, this.y = r * A - i * a, this.z = i * s - n * A, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const i = e.dot(this) / t;
    return this.copy(e).multiplyScalar(i);
  }
  projectOnPlane(e) {
    return Dr.copy(this).projectOnVector(e), this.sub(Dr);
  }
  reflect(e) {
    return this.sub(Dr.copy(e).multiplyScalar(2 * this.dot(e)));
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
  *[Js]() {
    yield this.x, yield this.y, yield this.z;
  }
};
Gs = Q;
Gs.prototype.isVector3 = !0;
var Dr = /* @__PURE__ */ new Q(), LA = /* @__PURE__ */ new Li(), Ie = class {
  constructor(e, t, i, n, r, A, s, a, l) {
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
    ], e !== void 0 && this.set(e, t, i, n, r, A, s, a, l);
  }
  set(e, t, i, n, r, A, s, a, l) {
    const o = this.elements;
    return o[0] = e, o[1] = n, o[2] = s, o[3] = t, o[4] = r, o[5] = a, o[6] = i, o[7] = A, o[8] = l, this;
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
    const i = e.elements, n = t.elements, r = this.elements, A = i[0], s = i[3], a = i[6], l = i[1], o = i[4], c = i[7], u = i[2], h = i[5], p = i[8], w = n[0], M = n[3], d = n[6], f = n[1], C = n[4], x = n[7], P = n[2], D = n[5], S = n[8];
    return r[0] = A * w + s * f + a * P, r[3] = A * M + s * C + a * D, r[6] = A * d + s * x + a * S, r[1] = l * w + o * f + c * P, r[4] = l * M + o * C + c * D, r[7] = l * d + o * x + c * S, r[2] = u * w + h * f + p * P, r[5] = u * M + h * C + p * D, r[8] = u * d + h * x + p * S, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], A = e[4], s = e[5], a = e[6], l = e[7], o = e[8];
    return t * A * o - t * s * l - i * r * o + i * s * a + n * r * l - n * A * a;
  }
  invert() {
    const e = this.elements, t = e[0], i = e[1], n = e[2], r = e[3], A = e[4], s = e[5], a = e[6], l = e[7], o = e[8], c = o * A - s * l, u = s * a - o * r, h = l * r - A * a, p = t * c + i * u + n * h;
    if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const w = 1 / p;
    return e[0] = c * w, e[1] = (n * l - o * i) * w, e[2] = (s * i - n * A) * w, e[3] = u * w, e[4] = (o * t - n * a) * w, e[5] = (n * r - s * t) * w, e[6] = h * w, e[7] = (i * a - l * t) * w, e[8] = (A * t - i * r) * w, this;
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
  setUvTransform(e, t, i, n, r, A, s) {
    const a = Math.cos(r), l = Math.sin(r);
    return this.set(i * a, i * l, -i * (a * A + l * s) + A + e, -n * l, n * a, -n * (-l * A + a * s) + s + t, 0, 0, 1), this;
  }
  scale(e, t) {
    return en("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(xr.makeScale(e, t)), this;
  }
  rotate(e) {
    return en("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(xr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return en("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(xr.makeTranslation(e, t)), this;
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
Ws = Ie;
Ws.prototype.isMatrix3 = !0;
var xr = /* @__PURE__ */ new Ie(), UA = /* @__PURE__ */ new Ie().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), NA = /* @__PURE__ */ new Ie().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function nl() {
  const e = {
    enabled: !0,
    workingColorSpace: sA,
    spaces: {},
    convert: function(r, A, s) {
      return this.enabled === !1 || A === s || !A || !s || (this.spaces[A].transfer === "srgb" && (r.r = oi(r.r), r.g = oi(r.g), r.b = oi(r.b)), this.spaces[A].primaries !== this.spaces[s].primaries && (r.applyMatrix3(this.spaces[A].toXYZ), r.applyMatrix3(this.spaces[s].fromXYZ)), this.spaces[s].transfer === "srgb" && (r.r = tn(r.r), r.g = tn(r.g), r.b = tn(r.b))), r;
    },
    workingToColorSpace: function(r, A) {
      return this.convert(r, this.workingColorSpace, A);
    },
    colorSpaceToWorking: function(r, A) {
      return this.convert(r, A, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? ur : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, A = this.workingColorSpace) {
      return r.fromArray(this.spaces[A].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    _getMatrix: function(r, A, s) {
      return r.copy(this.spaces[A].toXYZ).multiply(this.spaces[s].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(r, A) {
      return en("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, A);
    },
    toWorkingColorSpace: function(r, A) {
      return en("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, A);
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
    [sA]: {
      primaries: t,
      whitePoint: n,
      transfer: ur,
      toXYZ: UA,
      fromXYZ: NA,
      luminanceCoefficients: i,
      workingColorSpaceConfig: { unpackColorSpace: Bt },
      outputColorSpaceConfig: { drawingBufferColorSpace: Bt }
    },
    [Bt]: {
      primaries: t,
      whitePoint: n,
      transfer: fr,
      toXYZ: UA,
      fromXYZ: NA,
      luminanceCoefficients: i,
      outputColorSpaceConfig: { drawingBufferColorSpace: Bt }
    }
  }), e;
}
var Oe = /* @__PURE__ */ nl();
function oi(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function tn(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Qi, rl = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let i;
    if (e instanceof HTMLCanvasElement) i = e;
    else {
      Qi === void 0 && (Qi = dr("canvas")), Qi.width = e.width, Qi.height = e.height;
      const n = Qi.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), i = Qi;
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
      for (let A = 0; A < r.length; A++) r[A] = oi(r[A] / 255) * 255;
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
      return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Al = 0, cA = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Al++ }), this.uuid = an(), this.data = e, this.dataReady = !0, this.version = 0;
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
        for (let A = 0, s = n.length; A < s; A++) n[A].isDataTexture ? r.push(Sr(n[A].image)) : r.push(Sr(n[A]));
      } else r = Sr(n);
      i.url = r;
    }
    return t || (e.images[this.uuid] = i), i;
  }
};
function Sr(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? rl.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (De("Texture: Unable to serialize Texture."), {});
}
var sl = 0, Cr = /* @__PURE__ */ new Q(), Qt = class ar extends Ri {
  constructor(t = ar.DEFAULT_IMAGE, i = ar.DEFAULT_MAPPING, n = ai, r = ai, A = St, s = pr, a = Sn, l = Ei, o = ar.DEFAULT_ANISOTROPY, c = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: sl++ }), this.uuid = an(), this.name = "", this.source = new cA(t), this.mipmaps = [], this.mapping = i, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = A, this.minFilter = s, this.anisotropy = o, this.format = a, this.internalFormat = null, this.type = l, this.offset = new Re(0, 0), this.repeat = new Re(1, 1), this.center = new Re(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ie(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(Cr).x;
  }
  get height() {
    return this.source.getSize(Cr).y;
  }
  get depth() {
    return this.source.getSize(Cr).z;
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
        De(`Texture.setValues(): parameter '${i}' has value of undefined.`);
        continue;
      }
      const r = this[i];
      if (r === void 0) {
        De(`Texture.setValues(): property '${i}' does not exist.`);
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
      case nA:
        t.x = t.x - Math.floor(t.x);
        break;
      case ai:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case rA:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case nA:
        t.y = t.y - Math.floor(t.y);
        break;
      case ai:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case rA:
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
Qt.DEFAULT_IMAGE = null;
Qt.DEFAULT_MAPPING = 300;
Qt.DEFAULT_ANISOTROPY = 1;
Zs = Symbol.iterator;
var At = class {
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
    const t = this.x, i = this.y, n = this.z, r = this.w, A = e.elements;
    return this.x = A[0] * t + A[4] * i + A[8] * n + A[12] * r, this.y = A[1] * t + A[5] * i + A[9] * n + A[13] * r, this.z = A[2] * t + A[6] * i + A[10] * n + A[14] * r, this.w = A[3] * t + A[7] * i + A[11] * n + A[15] * r, this;
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
    const a = e.elements, l = a[0], o = a[4], c = a[8], u = a[1], h = a[5], p = a[9], w = a[2], M = a[6], d = a[10];
    if (Math.abs(o - u) < 0.01 && Math.abs(c - w) < 0.01 && Math.abs(p - M) < 0.01) {
      if (Math.abs(o + u) < 0.1 && Math.abs(c + w) < 0.1 && Math.abs(p + M) < 0.1 && Math.abs(l + h + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const C = (l + 1) / 2, x = (h + 1) / 2, P = (d + 1) / 2, D = (o + u) / 4, S = (c + w) / 4, B = (p + M) / 4;
      return C > x && C > P ? C < 0.01 ? (i = 0, n = 0.707106781, r = 0.707106781) : (i = Math.sqrt(C), n = D / i, r = S / i) : x > P ? x < 0.01 ? (i = 0.707106781, n = 0, r = 0.707106781) : (n = Math.sqrt(x), i = D / n, r = B / n) : P < 0.01 ? (i = 0.707106781, n = 0.707106781, r = 0) : (r = Math.sqrt(P), i = S / r, n = B / r), this.set(i, n, r, t), this;
    }
    let f = Math.sqrt((M - p) * (M - p) + (c - w) * (c - w) + (u - o) * (u - o));
    return Math.abs(f) < 1e-3 && (f = 1), this.x = (M - p) / f, this.y = (c - w) / f, this.z = (u - o) / f, this.w = Math.acos((l + h + d - 1) / 2), this;
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
  *[Zs]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
Xs = At;
Xs.prototype.isVector4 = !0;
var al = class extends Ri {
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: St,
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
    }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new At(0, 0, e, t), this.scissorTest = !1, this.viewport = new At(0, 0, e, t), this.textures = [];
    const n = new Qt({
      width: e,
      height: t,
      depth: i.depth
    }), r = i.count;
    for (let A = 0; A < r; A++)
      this.textures[A] = n.clone(), this.textures[A].isRenderTargetTexture = !0, this.textures[A].renderTarget = this;
    this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview, this.useArrayDepthTexture = i.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: St,
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
      this.textures[t].source = new cA(n);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Kt = class extends al {
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}, aa = class extends Qt {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Dt, this.minFilter = Dt, this.wrapR = ai, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, ol = class extends Qt {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Dt, this.minFilter = Dt, this.wrapR = ai, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, at = class oa {
  constructor(t, i, n, r, A, s, a, l, o, c, u, h, p, w, M, d) {
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
    ], t !== void 0 && this.set(t, i, n, r, A, s, a, l, o, c, u, h, p, w, M, d);
  }
  set(t, i, n, r, A, s, a, l, o, c, u, h, p, w, M, d) {
    const f = this.elements;
    return f[0] = t, f[4] = i, f[8] = n, f[12] = r, f[1] = A, f[5] = s, f[9] = a, f[13] = l, f[2] = o, f[6] = c, f[10] = u, f[14] = h, f[3] = p, f[7] = w, f[11] = M, f[15] = d, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new oa().fromArray(this.elements);
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
    const i = this.elements, n = t.elements, r = 1 / Oi.setFromMatrixColumn(t, 0).length(), A = 1 / Oi.setFromMatrixColumn(t, 1).length(), s = 1 / Oi.setFromMatrixColumn(t, 2).length();
    return i[0] = n[0] * r, i[1] = n[1] * r, i[2] = n[2] * r, i[3] = 0, i[4] = n[4] * A, i[5] = n[5] * A, i[6] = n[6] * A, i[7] = 0, i[8] = n[8] * s, i[9] = n[9] * s, i[10] = n[10] * s, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const i = this.elements, n = t.x, r = t.y, A = t.z, s = Math.cos(n), a = Math.sin(n), l = Math.cos(r), o = Math.sin(r), c = Math.cos(A), u = Math.sin(A);
    if (t.order === "XYZ") {
      const h = s * c, p = s * u, w = a * c, M = a * u;
      i[0] = l * c, i[4] = -l * u, i[8] = o, i[1] = p + w * o, i[5] = h - M * o, i[9] = -a * l, i[2] = M - h * o, i[6] = w + p * o, i[10] = s * l;
    } else if (t.order === "YXZ") {
      const h = l * c, p = l * u, w = o * c, M = o * u;
      i[0] = h + M * a, i[4] = w * a - p, i[8] = s * o, i[1] = s * u, i[5] = s * c, i[9] = -a, i[2] = p * a - w, i[6] = M + h * a, i[10] = s * l;
    } else if (t.order === "ZXY") {
      const h = l * c, p = l * u, w = o * c, M = o * u;
      i[0] = h - M * a, i[4] = -s * u, i[8] = w + p * a, i[1] = p + w * a, i[5] = s * c, i[9] = M - h * a, i[2] = -s * o, i[6] = a, i[10] = s * l;
    } else if (t.order === "ZYX") {
      const h = s * c, p = s * u, w = a * c, M = a * u;
      i[0] = l * c, i[4] = w * o - p, i[8] = h * o + M, i[1] = l * u, i[5] = M * o + h, i[9] = p * o - w, i[2] = -o, i[6] = a * l, i[10] = s * l;
    } else if (t.order === "YZX") {
      const h = s * l, p = s * o, w = a * l, M = a * o;
      i[0] = l * c, i[4] = M - h * u, i[8] = w * u + p, i[1] = u, i[5] = s * c, i[9] = -a * c, i[2] = -o * c, i[6] = p * u + w, i[10] = h - M * u;
    } else if (t.order === "XZY") {
      const h = s * l, p = s * o, w = a * l, M = a * o;
      i[0] = l * c, i[4] = -u, i[8] = o * c, i[1] = h * u + M, i[5] = s * c, i[9] = p * u - w, i[2] = w * u - p, i[6] = a * c, i[10] = M * u + h;
    }
    return i[3] = 0, i[7] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(ll, t, cl);
  }
  lookAt(t, i, n) {
    const r = this.elements;
    return Ct.subVectors(t, i), Ct.lengthSq() === 0 && (Ct.z = 1), Ct.normalize(), ui.crossVectors(n, Ct), ui.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ct.x += 1e-4 : Ct.z += 1e-4, Ct.normalize(), ui.crossVectors(n, Ct)), ui.normalize(), Fn.crossVectors(Ct, ui), r[0] = ui.x, r[4] = Fn.x, r[8] = Ct.x, r[1] = ui.y, r[5] = Fn.y, r[9] = Ct.y, r[2] = ui.z, r[6] = Fn.z, r[10] = Ct.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, i) {
    const n = t.elements, r = i.elements, A = this.elements, s = n[0], a = n[4], l = n[8], o = n[12], c = n[1], u = n[5], h = n[9], p = n[13], w = n[2], M = n[6], d = n[10], f = n[14], C = n[3], x = n[7], P = n[11], D = n[15], S = r[0], B = r[4], g = r[8], _ = r[12], W = r[1], y = r[5], H = r[9], G = r[13], k = r[2], O = r[6], X = r[10], U = r[14], J = r[3], ee = r[7], te = r[11], ce = r[15];
    return A[0] = s * S + a * W + l * k + o * J, A[4] = s * B + a * y + l * O + o * ee, A[8] = s * g + a * H + l * X + o * te, A[12] = s * _ + a * G + l * U + o * ce, A[1] = c * S + u * W + h * k + p * J, A[5] = c * B + u * y + h * O + p * ee, A[9] = c * g + u * H + h * X + p * te, A[13] = c * _ + u * G + h * U + p * ce, A[2] = w * S + M * W + d * k + f * J, A[6] = w * B + M * y + d * O + f * ee, A[10] = w * g + M * H + d * X + f * te, A[14] = w * _ + M * G + d * U + f * ce, A[3] = C * S + x * W + P * k + D * J, A[7] = C * B + x * y + P * O + D * ee, A[11] = C * g + x * H + P * X + D * te, A[15] = C * _ + x * G + P * U + D * ce, this;
  }
  multiplyScalar(t) {
    const i = this.elements;
    return i[0] *= t, i[4] *= t, i[8] *= t, i[12] *= t, i[1] *= t, i[5] *= t, i[9] *= t, i[13] *= t, i[2] *= t, i[6] *= t, i[10] *= t, i[14] *= t, i[3] *= t, i[7] *= t, i[11] *= t, i[15] *= t, this;
  }
  determinant() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], A = t[12], s = t[1], a = t[5], l = t[9], o = t[13], c = t[2], u = t[6], h = t[10], p = t[14], w = t[3], M = t[7], d = t[11], f = t[15], C = l * p - o * h, x = a * p - o * u, P = a * h - l * u, D = s * p - o * c, S = s * h - l * c, B = s * u - a * c;
    return i * (M * C - d * x + f * P) - n * (w * C - d * D + f * S) + r * (w * x - M * D + f * B) - A * (w * P - M * S + d * B);
  }
  determinantAffine() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], A = t[1], s = t[5], a = t[9], l = t[2], o = t[6], c = t[10];
    return i * (s * c - a * o) - n * (A * c - a * l) + r * (A * o - s * l);
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
    const t = this.elements, i = t[0], n = t[1], r = t[2], A = t[3], s = t[4], a = t[5], l = t[6], o = t[7], c = t[8], u = t[9], h = t[10], p = t[11], w = t[12], M = t[13], d = t[14], f = t[15], C = i * a - n * s, x = i * l - r * s, P = i * o - A * s, D = n * l - r * a, S = n * o - A * a, B = r * o - A * l, g = c * M - u * w, _ = c * d - h * w, W = c * f - p * w, y = u * d - h * M, H = u * f - p * M, G = h * f - p * d, k = C * G - x * H + P * y + D * W - S * _ + B * g;
    if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const O = 1 / k;
    return t[0] = (a * G - l * H + o * y) * O, t[1] = (r * H - n * G - A * y) * O, t[2] = (M * B - d * S + f * D) * O, t[3] = (h * S - u * B - p * D) * O, t[4] = (l * W - s * G - o * _) * O, t[5] = (i * G - r * W + A * _) * O, t[6] = (d * P - w * B - f * x) * O, t[7] = (c * B - h * P + p * x) * O, t[8] = (s * H - a * W + o * g) * O, t[9] = (n * W - i * H - A * g) * O, t[10] = (w * S - M * P + f * C) * O, t[11] = (u * P - c * S - p * C) * O, t[12] = (a * _ - s * y - l * g) * O, t[13] = (i * y - n * _ + r * g) * O, t[14] = (M * x - w * D - d * C) * O, t[15] = (c * D - u * x + h * C) * O, this;
  }
  scale(t) {
    const i = this.elements, n = t.x, r = t.y, A = t.z;
    return i[0] *= n, i[4] *= r, i[8] *= A, i[1] *= n, i[5] *= r, i[9] *= A, i[2] *= n, i[6] *= r, i[10] *= A, i[3] *= n, i[7] *= r, i[11] *= A, this;
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
    const n = Math.cos(i), r = Math.sin(i), A = 1 - n, s = t.x, a = t.y, l = t.z, o = A * s, c = A * a;
    return this.set(o * s + n, o * a - r * l, o * l + r * a, 0, o * a + r * l, c * a + n, c * l - r * s, 0, o * l - r * a, c * l + r * s, A * l * l + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, i, n) {
    return this.set(t, 0, 0, 0, 0, i, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, i, n, r, A, s) {
    return this.set(1, n, A, 0, t, 1, s, 0, i, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, i, n) {
    const r = this.elements, A = i._x, s = i._y, a = i._z, l = i._w, o = A + A, c = s + s, u = a + a, h = A * o, p = A * c, w = A * u, M = s * c, d = s * u, f = a * u, C = l * o, x = l * c, P = l * u, D = n.x, S = n.y, B = n.z;
    return r[0] = (1 - (M + f)) * D, r[1] = (p + P) * D, r[2] = (w - x) * D, r[3] = 0, r[4] = (p - P) * S, r[5] = (1 - (h + f)) * S, r[6] = (d + C) * S, r[7] = 0, r[8] = (w + x) * B, r[9] = (d - C) * B, r[10] = (1 - (h + M)) * B, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, i, n) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const A = this.determinantAffine();
    if (A === 0)
      return n.set(1, 1, 1), i.identity(), this;
    let s = Oi.set(r[0], r[1], r[2]).length();
    const a = Oi.set(r[4], r[5], r[6]).length(), l = Oi.set(r[8], r[9], r[10]).length();
    A < 0 && (s = -s), Vt.copy(this);
    const o = 1 / s, c = 1 / a, u = 1 / l;
    return Vt.elements[0] *= o, Vt.elements[1] *= o, Vt.elements[2] *= o, Vt.elements[4] *= c, Vt.elements[5] *= c, Vt.elements[6] *= c, Vt.elements[8] *= u, Vt.elements[9] *= u, Vt.elements[10] *= u, i.setFromRotationMatrix(Vt), n.x = s, n.y = a, n.z = l, this;
  }
  makePerspective(t, i, n, r, A, s, a = nn, l = !1) {
    const o = this.elements, c = 2 * A / (i - t), u = 2 * A / (n - r), h = (i + t) / (i - t), p = (n + r) / (n - r);
    let w, M;
    if (l)
      w = A / (s - A), M = s * A / (s - A);
    else if (a === 2e3)
      w = -(s + A) / (s - A), M = -2 * s * A / (s - A);
    else if (a === 2001)
      w = -s / (s - A), M = -s * A / (s - A);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return o[0] = c, o[4] = 0, o[8] = h, o[12] = 0, o[1] = 0, o[5] = u, o[9] = p, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = w, o[14] = M, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(t, i, n, r, A, s, a = nn, l = !1) {
    const o = this.elements, c = 2 / (i - t), u = 2 / (n - r), h = -(i + t) / (i - t), p = -(n + r) / (n - r);
    let w, M;
    if (l)
      w = 1 / (s - A), M = s / (s - A);
    else if (a === 2e3)
      w = -2 / (s - A), M = -(s + A) / (s - A);
    else if (a === 2001)
      w = -1 / (s - A), M = -A / (s - A);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return o[0] = c, o[4] = 0, o[8] = 0, o[12] = h, o[1] = 0, o[5] = u, o[9] = 0, o[13] = p, o[2] = 0, o[6] = 0, o[10] = w, o[14] = M, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
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
Ys = at;
Ys.prototype.isMatrix4 = !0;
var Oi = /* @__PURE__ */ new Q(), Vt = /* @__PURE__ */ new at(), ll = /* @__PURE__ */ new Q(0, 0, 0), cl = /* @__PURE__ */ new Q(1, 1, 1), ui = /* @__PURE__ */ new Q(), Fn = /* @__PURE__ */ new Q(), Ct = /* @__PURE__ */ new Q(), FA = /* @__PURE__ */ new at(), QA = /* @__PURE__ */ new Li(), Tn = class la {
  constructor(t = 0, i = 0, n = 0, r = la.DEFAULT_ORDER) {
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
    const r = t.elements, A = r[0], s = r[4], a = r[8], l = r[1], o = r[5], c = r[9], u = r[2], h = r[6], p = r[10];
    switch (i) {
      case "XYZ":
        this._y = Math.asin(Fe(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-c, p), this._z = Math.atan2(-s, A)) : (this._x = Math.atan2(h, o), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Fe(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(l, o)) : (this._y = Math.atan2(-u, A), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Fe(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-s, o)) : (this._y = 0, this._z = Math.atan2(l, A));
        break;
      case "ZYX":
        this._y = Math.asin(-Fe(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(h, p), this._z = Math.atan2(l, A)) : (this._x = 0, this._z = Math.atan2(-s, o));
        break;
      case "YZX":
        this._z = Math.asin(Fe(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-c, o), this._y = Math.atan2(-u, A)) : (this._x = 0, this._y = Math.atan2(a, p));
        break;
      case "XZY":
        this._z = Math.asin(-Fe(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(h, o), this._y = Math.atan2(a, A)) : (this._x = Math.atan2(-c, p), this._y = 0);
        break;
      default:
        De("Euler: .setFromRotationMatrix() encountered an unknown order: " + i);
    }
    return this._order = i, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, i, n) {
    return FA.makeRotationFromQuaternion(t), this.setFromRotationMatrix(FA, i, n);
  }
  setFromVector3(t, i = this._order) {
    return this.set(t.x, t.y, t.z, i);
  }
  reorder(t) {
    return QA.setFromEuler(this), this.setFromQuaternion(QA, t);
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
Tn.DEFAULT_ORDER = "XYZ";
var ca = class {
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
}, hl = 0, OA = /* @__PURE__ */ new Q(), Vi = /* @__PURE__ */ new Li(), ei = /* @__PURE__ */ new at(), Qn = /* @__PURE__ */ new Q(), cn = /* @__PURE__ */ new Q(), ul = /* @__PURE__ */ new Q(), fl = /* @__PURE__ */ new Li(), VA = /* @__PURE__ */ new Q(1, 0, 0), zA = /* @__PURE__ */ new Q(0, 1, 0), HA = /* @__PURE__ */ new Q(0, 0, 1), kA = { type: "added" }, dl = { type: "removed" }, zi = {
  type: "childadded",
  child: null
}, yr = {
  type: "childremoved",
  child: null
}, It = class or extends Ri {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: hl++ }), this.uuid = an(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = or.DEFAULT_UP.clone();
    const t = new Q(), i = new Tn(), n = new Li(), r = new Q(1, 1, 1);
    function A() {
      n.setFromEuler(i, !1);
    }
    function s() {
      i.setFromQuaternion(n, void 0, !1);
    }
    i._onChange(A), n._onChange(s), Object.defineProperties(this, {
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
      modelViewMatrix: { value: new at() },
      normalMatrix: { value: new Ie() }
    }), this.matrix = new at(), this.matrixWorld = new at(), this.matrixAutoUpdate = or.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = or.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new ca(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
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
    return Vi.setFromAxisAngle(t, i), this.quaternion.multiply(Vi), this;
  }
  rotateOnWorldAxis(t, i) {
    return Vi.setFromAxisAngle(t, i), this.quaternion.premultiply(Vi), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(VA, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(zA, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(HA, t);
  }
  translateOnAxis(t, i) {
    return OA.copy(t).applyQuaternion(this.quaternion), this.position.add(OA.multiplyScalar(i)), this;
  }
  translateX(t) {
    return this.translateOnAxis(VA, t);
  }
  translateY(t) {
    return this.translateOnAxis(zA, t);
  }
  translateZ(t) {
    return this.translateOnAxis(HA, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(ei.copy(this.matrixWorld).invert());
  }
  lookAt(t, i, n) {
    t.isVector3 ? Qn.copy(t) : Qn.set(t, i, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), cn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? ei.lookAt(cn, Qn, this.up) : ei.lookAt(Qn, cn, this.up), this.quaternion.setFromRotationMatrix(ei), r && (ei.extractRotation(r.matrixWorld), Vi.setFromRotationMatrix(ei), this.quaternion.premultiply(Vi.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this;
    }
    return t === this ? (Te("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(kA), zi.child = t, this.dispatchEvent(zi), zi.child = null) : Te("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const i = this.children.indexOf(t);
    return i !== -1 && (t.parent = null, this.children.splice(i, 1), t.dispatchEvent(dl), yr.child = t, this.dispatchEvent(yr), yr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), ei.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), ei.multiply(t.parent.matrixWorld)), t.applyMatrix4(ei), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(kA), zi.child = t, this.dispatchEvent(zi), zi.child = null, this;
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
      const A = this.children[n].getObjectByProperty(t, i);
      if (A !== void 0) return A;
    }
  }
  getObjectsByProperty(t, i, n = []) {
    this[t] === i && n.push(this);
    const r = this.children;
    for (let A = 0, s = r.length; A < s; A++) r[A].getObjectsByProperty(t, i, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(cn, t, ul), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(cn, fl, t), t;
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
      const i = t.x, n = t.y, r = t.z, A = this.matrix.elements;
      A[12] += i - A[0] * i - A[4] * n - A[8] * r, A[13] += n - A[1] * i - A[5] * n - A[9] * r, A[14] += r - A[2] * i - A[6] * n - A[10] * r;
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
      const A = this.children;
      for (let s = 0, a = A.length; s < a; s++) A[s].updateWorldMatrix(!1, !0, n);
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
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((a) => ({
      ...a,
      boundingBox: a.boundingBox ? a.boundingBox.toJSON() : void 0,
      boundingSphere: a.boundingSphere ? a.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((a) => ({ ...a })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function A(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = A(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l)) for (let o = 0, c = l.length; o < c; o++) {
          const u = l[o];
          A(t.shapes, u);
        }
        else A(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (A(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const a = [];
      for (let l = 0, o = this.material.length; l < o; l++) a.push(A(t.materials, this.material[l]));
      r.material = a;
    } else r.material = A(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let a = 0; a < this.children.length; a++) r.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        r.animations.push(A(t.animations, l));
      }
    }
    if (i) {
      const a = s(t.geometries), l = s(t.materials), o = s(t.textures), c = s(t.images), u = s(t.shapes), h = s(t.skeletons), p = s(t.animations), w = s(t.nodes);
      a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), o.length > 0 && (n.textures = o), c.length > 0 && (n.images = c), u.length > 0 && (n.shapes = u), h.length > 0 && (n.skeletons = h), p.length > 0 && (n.animations = p), w.length > 0 && (n.nodes = w);
    }
    return n.object = r, n;
    function s(a) {
      const l = [];
      for (const o in a) {
        const c = a[o];
        delete c.metadata, l.push(c);
      }
      return l;
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
It.DEFAULT_UP = /* @__PURE__ */ new Q(0, 1, 0);
It.DEFAULT_MATRIX_AUTO_UPDATE = !0;
It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var On = class extends It {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, pl = { type: "move" }, Tr = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new On(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new On(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Q(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Q()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new On(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Q(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Q(), this._grip.eventsEnabled = !1), this._grip;
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
    let n = null, r = null, A = null;
    const s = this._targetRay, a = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        A = !0;
        for (const w of e.hand.values()) {
          const M = t.getJointPose(w, i), d = this._getHandJoint(l, w);
          M !== null && (d.matrix.fromArray(M.transform.matrix), d.matrix.decompose(d.position, d.rotation, d.scale), d.matrixWorldNeedsUpdate = !0, d.jointRadius = M.radius), d.visible = M !== null;
        }
        const o = l.joints["index-finger-tip"], c = l.joints["thumb-tip"], u = o.position.distanceTo(c.position), h = 0.02, p = 5e-3;
        l.inputState.pinching && u > h + p ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && u <= h - p && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else a !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1, a.eventsEnabled && a.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      s !== null && (n = t.getPose(e.targetRaySpace, i), n === null && r !== null && (n = r), n !== null && (s.matrix.fromArray(n.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(n.linearVelocity)) : s.hasLinearVelocity = !1, n.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(n.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(pl)));
    }
    return s !== null && (s.visible = n !== null), a !== null && (a.visible = r !== null), l !== null && (l.visible = A !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new On();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}, ha = {
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
}, fi = {
  h: 0,
  s: 0,
  l: 0
}, Vn = {
  h: 0,
  s: 0,
  l: 0
};
function Br(e, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + (t - e) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e;
}
var Ve = class {
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
  setHex(e, t = Bt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Oe.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, i, n = Oe.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, Oe.colorSpaceToWorking(this, n), this;
  }
  setHSL(e, t, i, n = Oe.workingColorSpace) {
    if (e = lA(e, 1), t = Fe(t, 0, 1), i = Fe(i, 0, 1), t === 0) this.r = this.g = this.b = i;
    else {
      const r = i <= 0.5 ? i * (1 + t) : i + t - i * t, A = 2 * i - r;
      this.r = Br(A, r, e + 1 / 3), this.g = Br(A, r, e), this.b = Br(A, r, e - 1 / 3);
    }
    return Oe.colorSpaceToWorking(this, n), this;
  }
  setStyle(e, t = Bt) {
    function i(r) {
      r !== void 0 && parseFloat(r) < 1 && De("Color: Alpha component of " + e + " will be ignored.");
    }
    let n;
    if (n = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const A = n[1], s = n[2];
      switch (A) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return i(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return i(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return i(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          De("Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = n[1], A = r.length;
      if (A === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (A === 6) return this.setHex(parseInt(r, 16), t);
      De("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Bt) {
    const i = ha[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : De("Color: Unknown color " + e), this;
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
  getHex(e = Bt) {
    return Oe.workingToColorSpace(wt.copy(this), e), Math.round(Fe(wt.r * 255, 0, 255)) * 65536 + Math.round(Fe(wt.g * 255, 0, 255)) * 256 + Math.round(Fe(wt.b * 255, 0, 255));
  }
  getHexString(e = Bt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = Oe.workingColorSpace) {
    Oe.workingToColorSpace(wt.copy(this), t);
    const i = wt.r, n = wt.g, r = wt.b, A = Math.max(i, n, r), s = Math.min(i, n, r);
    let a, l;
    const o = (s + A) / 2;
    if (s === A)
      a = 0, l = 0;
    else {
      const c = A - s;
      switch (l = o <= 0.5 ? c / (A + s) : c / (2 - A - s), A) {
        case i:
          a = (n - r) / c + (n < r ? 6 : 0);
          break;
        case n:
          a = (r - i) / c + 2;
          break;
        case r:
          a = (i - n) / c + 4;
          break;
      }
      a /= 6;
    }
    return e.h = a, e.s = l, e.l = o, e;
  }
  getRGB(e, t = Oe.workingColorSpace) {
    return Oe.workingToColorSpace(wt.copy(this), t), e.r = wt.r, e.g = wt.g, e.b = wt.b, e;
  }
  getStyle(e = Bt) {
    Oe.workingToColorSpace(wt.copy(this), e);
    const t = wt.r, i = wt.g, n = wt.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, i) {
    return this.getHSL(fi), this.setHSL(fi.h + e, fi.s + t, fi.l + i);
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
    this.getHSL(fi), e.getHSL(Vn);
    const i = Dn(fi.h, Vn.h, t), n = Dn(fi.s, Vn.s, t), r = Dn(fi.l, Vn.l, t);
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
}, wt = /* @__PURE__ */ new Ve();
Ve.NAMES = ha;
var ml = class extends It {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Tn(), this.environmentIntensity = 1, this.environmentRotation = new Tn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, zt = /* @__PURE__ */ new Q(), ti = /* @__PURE__ */ new Q(), br = /* @__PURE__ */ new Q(), ii = /* @__PURE__ */ new Q(), Hi = /* @__PURE__ */ new Q(), ki = /* @__PURE__ */ new Q(), GA = /* @__PURE__ */ new Q(), Ir = /* @__PURE__ */ new Q(), Rr = /* @__PURE__ */ new Q(), Lr = /* @__PURE__ */ new Q(), Ur = /* @__PURE__ */ new At(), Nr = /* @__PURE__ */ new At(), Fr = /* @__PURE__ */ new At(), hn = class ji {
  constructor(t = new Q(), i = new Q(), n = new Q()) {
    this.a = t, this.b = i, this.c = n;
  }
  static getNormal(t, i, n, r) {
    r.subVectors(n, i), zt.subVectors(t, i), r.cross(zt);
    const A = r.lengthSq();
    return A > 0 ? r.multiplyScalar(1 / Math.sqrt(A)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, i, n, r, A) {
    zt.subVectors(r, i), ti.subVectors(n, i), br.subVectors(t, i);
    const s = zt.dot(zt), a = zt.dot(ti), l = zt.dot(br), o = ti.dot(ti), c = ti.dot(br), u = s * o - a * a;
    if (u === 0)
      return A.set(0, 0, 0), null;
    const h = 1 / u, p = (o * l - a * c) * h, w = (s * c - a * l) * h;
    return A.set(1 - p - w, w, p);
  }
  static containsPoint(t, i, n, r) {
    return this.getBarycoord(t, i, n, r, ii) === null ? !1 : ii.x >= 0 && ii.y >= 0 && ii.x + ii.y <= 1;
  }
  static getInterpolation(t, i, n, r, A, s, a, l) {
    return this.getBarycoord(t, i, n, r, ii) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(A, ii.x), l.addScaledVector(s, ii.y), l.addScaledVector(a, ii.z), l);
  }
  static getInterpolatedAttribute(t, i, n, r, A, s) {
    return Ur.setScalar(0), Nr.setScalar(0), Fr.setScalar(0), Ur.fromBufferAttribute(t, i), Nr.fromBufferAttribute(t, n), Fr.fromBufferAttribute(t, r), s.setScalar(0), s.addScaledVector(Ur, A.x), s.addScaledVector(Nr, A.y), s.addScaledVector(Fr, A.z), s;
  }
  static isFrontFacing(t, i, n, r) {
    return zt.subVectors(n, i), ti.subVectors(t, i), zt.cross(ti).dot(r) < 0;
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
    return zt.subVectors(this.c, this.b), ti.subVectors(this.a, this.b), zt.cross(ti).length() * 0.5;
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
  getInterpolation(t, i, n, r, A) {
    return ji.getInterpolation(t, this.a, this.b, this.c, i, n, r, A);
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
    const n = this.a, r = this.b, A = this.c;
    let s, a;
    Hi.subVectors(r, n), ki.subVectors(A, n), Ir.subVectors(t, n);
    const l = Hi.dot(Ir), o = ki.dot(Ir);
    if (l <= 0 && o <= 0) return i.copy(n);
    Rr.subVectors(t, r);
    const c = Hi.dot(Rr), u = ki.dot(Rr);
    if (c >= 0 && u <= c) return i.copy(r);
    const h = l * u - c * o;
    if (h <= 0 && l >= 0 && c <= 0)
      return s = l / (l - c), i.copy(n).addScaledVector(Hi, s);
    Lr.subVectors(t, A);
    const p = Hi.dot(Lr), w = ki.dot(Lr);
    if (w >= 0 && p <= w) return i.copy(A);
    const M = p * o - l * w;
    if (M <= 0 && o >= 0 && w <= 0)
      return a = o / (o - w), i.copy(n).addScaledVector(ki, a);
    const d = c * w - p * u;
    if (d <= 0 && u - c >= 0 && p - w >= 0)
      return GA.subVectors(A, r), a = (u - c) / (u - c + (p - w)), i.copy(r).addScaledVector(GA, a);
    const f = 1 / (d + M + h);
    return s = M * f, a = h * f, i.copy(n).addScaledVector(Hi, s).addScaledVector(ki, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, Bn = class {
  constructor(e = new Q(1 / 0, 1 / 0, 1 / 0), t = new Q(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(Ht.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(Ht.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const i = Ht.copy(t).multiplyScalar(0.5);
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
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let A = 0, s = r.count; A < s; A++)
        e.isMesh === !0 ? e.getVertexPosition(A, Ht) : Ht.fromBufferAttribute(r, A), Ht.applyMatrix4(e.matrixWorld), this.expandByPoint(Ht);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), zn.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), zn.copy(i.boundingBox)), zn.applyMatrix4(e.matrixWorld), this.union(zn);
    }
    const n = e.children;
    for (let r = 0, A = n.length; r < A; r++) this.expandByObject(n[r], t);
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
    return this.clampPoint(e.center, Ht), Ht.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(un), Hn.subVectors(this.max, un), Gi.subVectors(e.a, un), Wi.subVectors(e.b, un), Xi.subVectors(e.c, un), di.subVectors(Wi, Gi), pi.subVectors(Xi, Wi), Pi.subVectors(Gi, Xi);
    let t = [
      0,
      -di.z,
      di.y,
      0,
      -pi.z,
      pi.y,
      0,
      -Pi.z,
      Pi.y,
      di.z,
      0,
      -di.x,
      pi.z,
      0,
      -pi.x,
      Pi.z,
      0,
      -Pi.x,
      -di.y,
      di.x,
      0,
      -pi.y,
      pi.x,
      0,
      -Pi.y,
      Pi.x,
      0
    ];
    return !Qr(t, Gi, Wi, Xi, Hn) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !Qr(t, Gi, Wi, Xi, Hn)) ? !1 : (kn.crossVectors(di, pi), t = [
      kn.x,
      kn.y,
      kn.z
    ], Qr(t, Gi, Wi, Xi, Hn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Ht).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ht).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (ni[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), ni[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), ni[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), ni[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), ni[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), ni[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), ni[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), ni[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(ni), this);
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
}, ni = [
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q(),
  /* @__PURE__ */ new Q()
], Ht = /* @__PURE__ */ new Q(), zn = /* @__PURE__ */ new Bn(), Gi = /* @__PURE__ */ new Q(), Wi = /* @__PURE__ */ new Q(), Xi = /* @__PURE__ */ new Q(), di = /* @__PURE__ */ new Q(), pi = /* @__PURE__ */ new Q(), Pi = /* @__PURE__ */ new Q(), un = /* @__PURE__ */ new Q(), Hn = /* @__PURE__ */ new Q(), kn = /* @__PURE__ */ new Q(), _i = /* @__PURE__ */ new Q();
function Qr(e, t, i, n, r) {
  for (let A = 0, s = e.length - 3; A <= s; A += 3) {
    _i.fromArray(e, A);
    const a = r.x * Math.abs(_i.x) + r.y * Math.abs(_i.y) + r.z * Math.abs(_i.z), l = t.dot(_i), o = i.dot(_i), c = n.dot(_i);
    if (Math.max(-Math.max(l, o, c), Math.min(l, o, c)) > a) return !1;
  }
  return !0;
}
var ot = /* @__PURE__ */ new Q(), Gn = /* @__PURE__ */ new Re(), gl = 0, Jt = class extends Ri {
  constructor(e, t, i = !1) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: gl++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = Uo, this.updateRanges = [], this.gpuType = mr, this.version = 0;
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
      ot.fromBufferAttribute(this, t), ot.applyMatrix3(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ot.fromBufferAttribute(this, t), ot.applyMatrix4(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ot.fromBufferAttribute(this, t), ot.applyNormalMatrix(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ot.fromBufferAttribute(this, t), ot.transformDirection(e), this.setXYZ(t, ot.x, ot.y, ot.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = Zi(i, this.array)), i;
  }
  setComponent(e, t, i) {
    return this.normalized && (i = Mt(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Zi(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Zi(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Zi(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Mt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Zi(t, this.array)), t;
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
}, ua = class extends Jt {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}, fa = class extends Jt {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}, li = class extends Jt {
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}, vl = /* @__PURE__ */ new Bn(), fn = /* @__PURE__ */ new Q(), Or = /* @__PURE__ */ new Q(), hA = class {
  constructor(e = new Q(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : vl.setFromPoints(e).getCenter(i);
    let n = 0;
    for (let r = 0, A = e.length; r < A; r++) n = Math.max(n, i.distanceToSquared(e[r]));
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
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Or.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(fn.copy(e.center).add(Or)), this.expandByPoint(fn.copy(e.center).sub(Or))), this);
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
}, wl = 0, Nt = /* @__PURE__ */ new at(), Vr = /* @__PURE__ */ new It(), Yi = /* @__PURE__ */ new Q(), yt = /* @__PURE__ */ new Bn(), dn = /* @__PURE__ */ new Bn(), dt = /* @__PURE__ */ new Q(), Ui = class da extends Ri {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: wl++ }), this.uuid = an(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (No(t) ? fa : ua)(t, 1) : this.index = t, this;
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
      const A = new Ie().getNormalMatrix(t);
      n.applyNormalMatrix(A), n.needsUpdate = !0;
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
    return Vr.lookAt(t), Vr.updateMatrix(), this.applyMatrix4(Vr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Yi).negate(), this.translate(Yi.x, Yi.y, Yi.z), this;
  }
  setFromPoints(t) {
    const i = this.getAttribute("position");
    if (i === void 0) {
      const n = [];
      for (let r = 0, A = t.length; r < A; r++) {
        const s = t[r];
        n.push(s.x, s.y, s.z || 0);
      }
      this.setAttribute("position", new li(n, 3));
    } else {
      const n = Math.min(t.length, i.count);
      for (let r = 0; r < n; r++) {
        const A = t[r];
        i.setXYZ(r, A.x, A.y, A.z || 0);
      }
      t.length > i.count && De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), i.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Bn());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new Q(-1 / 0, -1 / 0, -1 / 0), new Q(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), i) for (let n = 0, r = i.length; n < r; n++) {
        const A = i[n];
        yt.setFromBufferAttribute(A), this.morphTargetsRelative ? (dt.addVectors(this.boundingBox.min, yt.min), this.boundingBox.expandByPoint(dt), dt.addVectors(this.boundingBox.max, yt.max), this.boundingBox.expandByPoint(dt)) : (this.boundingBox.expandByPoint(yt.min), this.boundingBox.expandByPoint(yt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new hA());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new Q(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (yt.setFromBufferAttribute(t), i) for (let A = 0, s = i.length; A < s; A++) {
        const a = i[A];
        dn.setFromBufferAttribute(a), this.morphTargetsRelative ? (dt.addVectors(yt.min, dn.min), yt.expandByPoint(dt), dt.addVectors(yt.max, dn.max), yt.expandByPoint(dt)) : (yt.expandByPoint(dn.min), yt.expandByPoint(dn.max));
      }
      yt.getCenter(n);
      let r = 0;
      for (let A = 0, s = t.count; A < s; A++)
        dt.fromBufferAttribute(t, A), r = Math.max(r, n.distanceToSquared(dt));
      if (i) for (let A = 0, s = i.length; A < s; A++) {
        const a = i[A], l = this.morphTargetsRelative;
        for (let o = 0, c = a.count; o < c; o++)
          dt.fromBufferAttribute(a, o), l && (Yi.fromBufferAttribute(t, o), dt.add(Yi)), r = Math.max(r, n.distanceToSquared(dt));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, i = this.attributes;
    if (t === null || i.position === void 0 || i.normal === void 0 || i.uv === void 0) {
      Te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = i.position, r = i.normal, A = i.uv;
    let s = this.getAttribute("tangent");
    (s === void 0 || s.count !== n.count) && (s = new Jt(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", s));
    const a = [], l = [];
    for (let g = 0; g < n.count; g++)
      a[g] = new Q(), l[g] = new Q();
    const o = new Q(), c = new Q(), u = new Q(), h = new Re(), p = new Re(), w = new Re(), M = new Q(), d = new Q();
    function f(g, _, W) {
      o.fromBufferAttribute(n, g), c.fromBufferAttribute(n, _), u.fromBufferAttribute(n, W), h.fromBufferAttribute(A, g), p.fromBufferAttribute(A, _), w.fromBufferAttribute(A, W), c.sub(o), u.sub(o), p.sub(h), w.sub(h);
      const y = 1 / (p.x * w.y - w.x * p.y);
      isFinite(y) && (M.copy(c).multiplyScalar(w.y).addScaledVector(u, -p.y).multiplyScalar(y), d.copy(u).multiplyScalar(p.x).addScaledVector(c, -w.x).multiplyScalar(y), a[g].add(M), a[_].add(M), a[W].add(M), l[g].add(d), l[_].add(d), l[W].add(d));
    }
    let C = this.groups;
    C.length === 0 && (C = [{
      start: 0,
      count: t.count
    }]);
    for (let g = 0, _ = C.length; g < _; ++g) {
      const W = C[g], y = W.start, H = W.count;
      for (let G = y, k = y + H; G < k; G += 3) f(t.getX(G + 0), t.getX(G + 1), t.getX(G + 2));
    }
    const x = new Q(), P = new Q(), D = new Q(), S = new Q();
    function B(g) {
      D.fromBufferAttribute(r, g), S.copy(D);
      const _ = a[g];
      x.copy(_), x.sub(D.multiplyScalar(D.dot(_))).normalize(), P.crossVectors(S, _);
      const W = P.dot(l[g]) < 0 ? -1 : 1;
      s.setXYZW(g, x.x, x.y, x.z, W);
    }
    for (let g = 0, _ = C.length; g < _; ++g) {
      const W = C[g], y = W.start, H = W.count;
      for (let G = y, k = y + H; G < k; G += 3)
        B(t.getX(G + 0)), B(t.getX(G + 1)), B(t.getX(G + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const t = this.index, i = this.getAttribute("position");
    if (i !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== i.count)
        n = new Jt(new Float32Array(i.count * 3), 3), this.setAttribute("normal", n);
      else for (let h = 0, p = n.count; h < p; h++) n.setXYZ(h, 0, 0, 0);
      const r = new Q(), A = new Q(), s = new Q(), a = new Q(), l = new Q(), o = new Q(), c = new Q(), u = new Q();
      if (t) for (let h = 0, p = t.count; h < p; h += 3) {
        const w = t.getX(h + 0), M = t.getX(h + 1), d = t.getX(h + 2);
        r.fromBufferAttribute(i, w), A.fromBufferAttribute(i, M), s.fromBufferAttribute(i, d), c.subVectors(s, A), u.subVectors(r, A), c.cross(u), a.fromBufferAttribute(n, w), l.fromBufferAttribute(n, M), o.fromBufferAttribute(n, d), a.add(c), l.add(c), o.add(c), n.setXYZ(w, a.x, a.y, a.z), n.setXYZ(M, l.x, l.y, l.z), n.setXYZ(d, o.x, o.y, o.z);
      }
      else for (let h = 0, p = i.count; h < p; h += 3)
        r.fromBufferAttribute(i, h + 0), A.fromBufferAttribute(i, h + 1), s.fromBufferAttribute(i, h + 2), c.subVectors(s, A), u.subVectors(r, A), c.cross(u), n.setXYZ(h + 0, c.x, c.y, c.z), n.setXYZ(h + 1, c.x, c.y, c.z), n.setXYZ(h + 2, c.x, c.y, c.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let i = 0, n = t.count; i < n; i++)
      dt.fromBufferAttribute(t, i), dt.normalize(), t.setXYZ(i, dt.x, dt.y, dt.z);
  }
  toNonIndexed() {
    function t(a, l) {
      const o = a.array, c = a.itemSize, u = a.normalized, h = new o.constructor(l.length * c);
      let p = 0, w = 0;
      for (let M = 0, d = l.length; M < d; M++) {
        a.isInterleavedBufferAttribute ? p = l[M] * a.data.stride + a.offset : p = l[M] * c;
        for (let f = 0; f < c; f++) h[w++] = o[p++];
      }
      return new Jt(h, c, u);
    }
    if (this.index === null)
      return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const i = new da(), n = this.index.array, r = this.attributes;
    for (const a in r) {
      const l = r[a], o = t(l, n);
      i.setAttribute(a, o);
    }
    const A = this.morphAttributes;
    for (const a in A) {
      const l = [], o = A[a];
      for (let c = 0, u = o.length; c < u; c++) {
        const h = o[c], p = t(h, n);
        l.push(p);
      }
      i.morphAttributes[a] = l;
    }
    i.morphTargetsRelative = this.morphTargetsRelative;
    const s = this.groups;
    for (let a = 0, l = s.length; a < l; a++) {
      const o = s[a];
      i.addGroup(o.start, o.count, o.materialIndex);
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
      const l = this.parameters;
      for (const o in l) l[o] !== void 0 && (t[o] = l[o]);
      return t;
    }
    t.data = { attributes: {} };
    const i = this.index;
    i !== null && (t.data.index = {
      type: i.array.constructor.name,
      array: Array.prototype.slice.call(i.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const o = n[l];
      t.data.attributes[l] = o.toJSON(t.data);
    }
    const r = {};
    let A = !1;
    for (const l in this.morphAttributes) {
      const o = this.morphAttributes[l], c = [];
      for (let u = 0, h = o.length; u < h; u++) {
        const p = o[u];
        c.push(p.toJSON(t.data));
      }
      c.length > 0 && (r[l] = c, A = !0);
    }
    A && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const s = this.groups;
    s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
    const a = this.boundingSphere;
    return a !== null && (t.data.boundingSphere = a.toJSON()), t;
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
    for (const o in r) {
      const c = r[o];
      this.setAttribute(o, c.clone(i));
    }
    const A = t.morphAttributes;
    for (const o in A) {
      const c = [], u = A[o];
      for (let h = 0, p = u.length; h < p; h++) c.push(u[h].clone(i));
      this.morphAttributes[o] = c;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const s = t.groups;
    for (let o = 0, c = s.length; o < c; o++) {
      const u = s[o];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this._transformed = t._transformed, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, El = 0, bn = class extends Ri {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: El++ }), this.uuid = an(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ve(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = _r, this.stencilZFail = _r, this.stencilZPass = _r, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
          De(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === void 0) {
          De(`Material: '${t}' is not a property of THREE.${this.type}.`);
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
      const A = [];
      for (const s in r) {
        const a = r[s];
        delete a.metadata, A.push(a);
      }
      return A;
    }
    if (t) {
      const r = n(e.textures), A = n(e.images);
      r.length > 0 && (i.textures = r), A.length > 0 && (i.images = A);
    }
    return i;
  }
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Ve().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let i = e.normalScale;
      Array.isArray(i) === !1 && (i = [i, i]), this.normalScale = new Re().fromArray(i);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new Re().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
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
}, ri = /* @__PURE__ */ new Q(), zr = /* @__PURE__ */ new Q(), Wn = /* @__PURE__ */ new Q(), mi = /* @__PURE__ */ new Q(), Hr = /* @__PURE__ */ new Q(), Xn = /* @__PURE__ */ new Q(), kr = /* @__PURE__ */ new Q(), Ml = class {
  constructor(e = new Q(), t = new Q(0, 0, -1)) {
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
    return this.origin.copy(this.at(e, ri)), this;
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
    const t = ri.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (ri.copy(this.origin).addScaledVector(this.direction, t), ri.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, i, n) {
    zr.copy(e).add(t).multiplyScalar(0.5), Wn.copy(t).sub(e).normalize(), mi.copy(this.origin).sub(zr);
    const r = e.distanceTo(t) * 0.5, A = -this.direction.dot(Wn), s = mi.dot(this.direction), a = -mi.dot(Wn), l = mi.lengthSq(), o = Math.abs(1 - A * A);
    let c, u, h, p;
    if (o > 0)
      if (c = A * a - s, u = A * s - a, p = r * o, c >= 0) if (u >= -p) if (u <= p) {
        const w = 1 / o;
        c *= w, u *= w, h = c * (c + A * u + 2 * s) + u * (A * c + u + 2 * a) + l;
      } else
        u = r, c = Math.max(0, -(A * u + s)), h = -c * c + u * (u + 2 * a) + l;
      else
        u = -r, c = Math.max(0, -(A * u + s)), h = -c * c + u * (u + 2 * a) + l;
      else u <= -p ? (c = Math.max(0, -(-A * r + s)), u = c > 0 ? -r : Math.min(Math.max(-r, -a), r), h = -c * c + u * (u + 2 * a) + l) : u <= p ? (c = 0, u = Math.min(Math.max(-r, -a), r), h = u * (u + 2 * a) + l) : (c = Math.max(0, -(A * r + s)), u = c > 0 ? r : Math.min(Math.max(-r, -a), r), h = -c * c + u * (u + 2 * a) + l);
    else
      u = A > 0 ? -r : r, c = Math.max(0, -(A * u + s)), h = -c * c + u * (u + 2 * a) + l;
    return i && i.copy(this.origin).addScaledVector(this.direction, c), n && n.copy(zr).addScaledVector(Wn, u), h;
  }
  intersectSphere(e, t) {
    ri.subVectors(e.center, this.origin);
    const i = ri.dot(this.direction), n = ri.dot(ri) - i * i, r = e.radius * e.radius;
    if (n > r) return null;
    const A = Math.sqrt(r - n), s = i - A, a = i + A;
    return a < 0 ? null : s < 0 ? this.at(a, t) : this.at(s, t);
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
    let i, n, r, A, s, a;
    const l = 1 / this.direction.x, o = 1 / this.direction.y, c = 1 / this.direction.z, u = this.origin;
    return l >= 0 ? (i = (e.min.x - u.x) * l, n = (e.max.x - u.x) * l) : (i = (e.max.x - u.x) * l, n = (e.min.x - u.x) * l), o >= 0 ? (r = (e.min.y - u.y) * o, A = (e.max.y - u.y) * o) : (r = (e.max.y - u.y) * o, A = (e.min.y - u.y) * o), i > A || r > n || ((r > i || isNaN(i)) && (i = r), (A < n || isNaN(n)) && (n = A), c >= 0 ? (s = (e.min.z - u.z) * c, a = (e.max.z - u.z) * c) : (s = (e.max.z - u.z) * c, a = (e.min.z - u.z) * c), i > a || s > n) || ((s > i || i !== i) && (i = s), (a < n || n !== n) && (n = a), n < 0) ? null : this.at(i >= 0 ? i : n, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, ri) !== null;
  }
  intersectTriangle(e, t, i, n, r) {
    Hr.subVectors(t, e), Xn.subVectors(i, e), kr.crossVectors(Hr, Xn);
    let A = this.direction.dot(kr), s;
    if (A > 0) {
      if (n) return null;
      s = 1;
    } else if (A < 0)
      s = -1, A = -A;
    else return null;
    mi.subVectors(this.origin, e);
    const a = s * this.direction.dot(Xn.crossVectors(mi, Xn));
    if (a < 0) return null;
    const l = s * this.direction.dot(Hr.cross(mi));
    if (l < 0 || a + l > A) return null;
    const o = -s * mi.dot(kr);
    return o < 0 ? null : this.at(o / A, r);
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
}, pa = class extends bn {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ve(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Tn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, WA = /* @__PURE__ */ new at(), Di = /* @__PURE__ */ new Ml(), Yn = /* @__PURE__ */ new hA(), XA = /* @__PURE__ */ new Q(), qn = /* @__PURE__ */ new Q(), Kn = /* @__PURE__ */ new Q(), Jn = /* @__PURE__ */ new Q(), Gr = /* @__PURE__ */ new Q(), Zn = /* @__PURE__ */ new Q(), YA = /* @__PURE__ */ new Q(), jn = /* @__PURE__ */ new Q(), Ft = class extends It {
  constructor(e = new Ui(), t = new pa()) {
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
          const A = i[n].name || String(n);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = n;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const i = this.geometry, n = i.attributes.position, r = i.morphAttributes.position, A = i.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const s = this.morphTargetInfluences;
    if (r && s) {
      Zn.set(0, 0, 0);
      for (let a = 0, l = r.length; a < l; a++) {
        const o = s[a], c = r[a];
        o !== 0 && (Gr.fromBufferAttribute(c, e), A ? Zn.addScaledVector(Gr, o) : Zn.addScaledVector(Gr.sub(t), o));
      }
      t.add(Zn);
    }
    return t;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.material, r = this.matrixWorld;
    n !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), Yn.copy(i.boundingSphere), Yn.applyMatrix4(r), Di.copy(e.ray).recast(e.near), !(Yn.containsPoint(Di.origin) === !1 && (Di.intersectSphere(Yn, XA) === null || Di.origin.distanceToSquared(XA) > (e.far - e.near) ** 2)) && (WA.copy(r).invert(), Di.copy(e.ray).applyMatrix4(WA), !(i.boundingBox !== null && Di.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, Di)));
  }
  _computeIntersections(e, t, i) {
    let n;
    const r = this.geometry, A = this.material, s = r.index, a = r.attributes.position, l = r.attributes.uv, o = r.attributes.uv1, c = r.attributes.normal, u = r.groups, h = r.drawRange;
    if (s !== null) if (Array.isArray(A)) for (let p = 0, w = u.length; p < w; p++) {
      const M = u[p], d = A[M.materialIndex], f = Math.max(M.start, h.start), C = Math.min(s.count, Math.min(M.start + M.count, h.start + h.count));
      for (let x = f, P = C; x < P; x += 3) {
        const D = s.getX(x), S = s.getX(x + 1), B = s.getX(x + 2);
        n = $n(this, d, e, i, l, o, c, D, S, B), n && (n.faceIndex = Math.floor(x / 3), n.face.materialIndex = M.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, h.start), w = Math.min(s.count, h.start + h.count);
      for (let M = p, d = w; M < d; M += 3) {
        const f = s.getX(M), C = s.getX(M + 1), x = s.getX(M + 2);
        n = $n(this, A, e, i, l, o, c, f, C, x), n && (n.faceIndex = Math.floor(M / 3), t.push(n));
      }
    }
    else if (a !== void 0) if (Array.isArray(A)) for (let p = 0, w = u.length; p < w; p++) {
      const M = u[p], d = A[M.materialIndex], f = Math.max(M.start, h.start), C = Math.min(a.count, Math.min(M.start + M.count, h.start + h.count));
      for (let x = f, P = C; x < P; x += 3) {
        const D = x, S = x + 1, B = x + 2;
        n = $n(this, d, e, i, l, o, c, D, S, B), n && (n.faceIndex = Math.floor(x / 3), n.face.materialIndex = M.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, h.start), w = Math.min(a.count, h.start + h.count);
      for (let M = p, d = w; M < d; M += 3) {
        const f = M, C = M + 1, x = M + 2;
        n = $n(this, A, e, i, l, o, c, f, C, x), n && (n.faceIndex = Math.floor(M / 3), t.push(n));
      }
    }
  }
};
function Pl(e, t, i, n, r, A, s, a) {
  let l;
  if (t.side === 1 ? l = n.intersectTriangle(s, A, r, !0, a) : l = n.intersectTriangle(r, A, s, t.side === 0, a), l === null) return null;
  jn.copy(a), jn.applyMatrix4(e.matrixWorld);
  const o = i.ray.origin.distanceTo(jn);
  return o < i.near || o > i.far ? null : {
    distance: o,
    point: jn.clone(),
    object: e
  };
}
function $n(e, t, i, n, r, A, s, a, l, o) {
  e.getVertexPosition(a, qn), e.getVertexPosition(l, Kn), e.getVertexPosition(o, Jn);
  const c = Pl(e, t, i, n, qn, Kn, Jn, YA);
  if (c) {
    const u = new Q();
    hn.getBarycoord(YA, qn, Kn, Jn, u), r && (c.uv = hn.getInterpolatedAttribute(r, a, l, o, u, new Re())), A && (c.uv1 = hn.getInterpolatedAttribute(A, a, l, o, u, new Re())), s && (c.normal = hn.getInterpolatedAttribute(s, a, l, o, u, new Q()), c.normal.dot(n.direction) > 0 && c.normal.multiplyScalar(-1));
    const h = {
      a,
      b: l,
      c: o,
      normal: new Q(),
      materialIndex: 0
    };
    hn.getNormal(qn, Kn, Jn, h.normal), c.face = h, c.barycoord = u;
  }
  return c;
}
var _l = class extends Qt {
  constructor(e = null, t = 1, i = 1, n, r, A, s, a, l = Dt, o = Dt, c, u) {
    super(null, A, s, a, l, o, n, r, c, u), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: i
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Wr = /* @__PURE__ */ new Q(), Dl = /* @__PURE__ */ new Q(), xl = /* @__PURE__ */ new Ie(), Ci = class {
  constructor(e = new Q(1, 0, 0), t = 0) {
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
    const n = Wr.subVectors(i, t).cross(Dl.subVectors(e, t)).normalize();
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
    const n = e.delta(Wr), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const A = -(e.start.dot(this.normal) + this.constant) / r;
    return i === !0 && (A < 0 || A > 1) ? null : t.copy(e.start).addScaledVector(n, A);
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
    const i = t || xl.getNormalMatrix(e), n = this.coplanarPoint(Wr).applyMatrix4(e), r = this.normal.applyMatrix3(i).normalize();
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
}, xi = /* @__PURE__ */ new hA(), Sl = /* @__PURE__ */ new Re(0.5, 0.5), er = /* @__PURE__ */ new Q(), uA = class {
  constructor(e = new Ci(), t = new Ci(), i = new Ci(), n = new Ci(), r = new Ci(), A = new Ci()) {
    this.planes = [
      e,
      t,
      i,
      n,
      r,
      A
    ];
  }
  set(e, t, i, n, r, A) {
    const s = this.planes;
    return s[0].copy(e), s[1].copy(t), s[2].copy(i), s[3].copy(n), s[4].copy(r), s[5].copy(A), this;
  }
  copy(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
    return this;
  }
  setFromProjectionMatrix(e, t = nn, i = !1) {
    const n = this.planes, r = e.elements, A = r[0], s = r[1], a = r[2], l = r[3], o = r[4], c = r[5], u = r[6], h = r[7], p = r[8], w = r[9], M = r[10], d = r[11], f = r[12], C = r[13], x = r[14], P = r[15];
    if (n[0].setComponents(l - A, h - o, d - p, P - f).normalize(), n[1].setComponents(l + A, h + o, d + p, P + f).normalize(), n[2].setComponents(l + s, h + c, d + w, P + C).normalize(), n[3].setComponents(l - s, h - c, d - w, P - C).normalize(), i)
      n[4].setComponents(a, u, M, x).normalize(), n[5].setComponents(l - a, h - u, d - M, P - x).normalize();
    else if (n[4].setComponents(l - a, h - u, d - M, P - x).normalize(), t === 2e3) n[5].setComponents(l + a, h + u, d + M, P + x).normalize();
    else if (t === 2001) n[5].setComponents(a, u, M, x).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(xi);
  }
  intersectsSprite(e) {
    return xi.center.set(0, 0, 0), xi.radius = 0.7071067811865476 + Sl.distanceTo(e.center), xi.applyMatrix4(e.matrixWorld), this.intersectsSphere(xi);
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
      if (er.x = n.normal.x > 0 ? e.max.x : e.min.x, er.y = n.normal.y > 0 ? e.max.y : e.min.y, er.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(er) < 0) return !1;
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
}, ma = class extends Qt {
  constructor(e = [], t = 301, i, n, r, A, s, a, l, o) {
    super(e, t, i, n, r, A, s, a, l, o), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, Cl = class extends Qt {
  constructor(e, t, i, n, r, A, s, a, l) {
    super(e, t, i, n, r, A, s, a, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}, An = class extends Qt {
  constructor(e, t, i = bi, n, r, A, s = Dt, a = Dt, l, o = Cn, c = 1) {
    if (o !== 1026 && o !== 1027) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: c
    }, n, r, A, s, a, o, i, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new cA(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, yl = class extends An {
  constructor(e, t = bi, i = 301, n, r, A = Dt, s = Dt, a, l = Cn) {
    const o = {
      width: e,
      height: e,
      depth: 1
    }, c = [
      o,
      o,
      o,
      o,
      o,
      o
    ];
    super(e, e, t, i, n, r, A, s, a, l), this.image = c, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, ga = class extends Qt {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, fA = class va extends Ui {
  constructor(t = 1, i = 1, n = 1, r = 1, A = 1, s = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: i,
      depth: n,
      widthSegments: r,
      heightSegments: A,
      depthSegments: s
    };
    const a = this;
    r = Math.floor(r), A = Math.floor(A), s = Math.floor(s);
    const l = [], o = [], c = [], u = [];
    let h = 0, p = 0;
    w("z", "y", "x", -1, -1, n, i, t, s, A, 0), w("z", "y", "x", 1, -1, n, i, -t, s, A, 1), w("x", "z", "y", 1, 1, t, n, i, r, s, 2), w("x", "z", "y", 1, -1, t, n, -i, r, s, 3), w("x", "y", "z", 1, -1, t, i, n, r, A, 4), w("x", "y", "z", -1, -1, t, i, -n, r, A, 5), this.setIndex(l), this.setAttribute("position", new li(o, 3)), this.setAttribute("normal", new li(c, 3)), this.setAttribute("uv", new li(u, 2));
    function w(M, d, f, C, x, P, D, S, B, g, _) {
      const W = P / B, y = D / g, H = P / 2, G = D / 2, k = S / 2, O = B + 1, X = g + 1;
      let U = 0, J = 0;
      const ee = new Q();
      for (let te = 0; te < X; te++) {
        const ce = te * y - G;
        for (let Ee = 0; Ee < O; Ee++)
          ee[M] = (Ee * W - H) * C, ee[d] = ce * x, ee[f] = k, o.push(ee.x, ee.y, ee.z), ee[M] = 0, ee[d] = 0, ee[f] = S > 0 ? 1 : -1, c.push(ee.x, ee.y, ee.z), u.push(Ee / B), u.push(1 - te / g), U += 1;
      }
      for (let te = 0; te < g; te++) for (let ce = 0; ce < B; ce++) {
        const Ee = h + ce + O * te, We = h + ce + O * (te + 1), qe = h + (ce + 1) + O * (te + 1), Y = h + (ce + 1) + O * te;
        l.push(Ee, We, Y), l.push(We, qe, Y), J += 6;
      }
      a.addGroup(p, J, _), p += J, h += U;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new va(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}, xn = class wa extends Ui {
  constructor(t = 1, i = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: i,
      widthSegments: n,
      heightSegments: r
    };
    const A = t / 2, s = i / 2, a = Math.floor(n), l = Math.floor(r), o = a + 1, c = l + 1, u = t / a, h = i / l, p = [], w = [], M = [], d = [];
    for (let f = 0; f < c; f++) {
      const C = f * h - s;
      for (let x = 0; x < o; x++) {
        const P = x * u - A;
        w.push(P, -C, 0), M.push(0, 0, 1), d.push(x / a), d.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++) for (let C = 0; C < a; C++) {
      const x = C + o * f, P = C + o * (f + 1), D = C + 1 + o * (f + 1), S = C + 1 + o * f;
      p.push(x, P, S), p.push(P, D, S);
    }
    this.setIndex(p), this.setAttribute("position", new li(w, 3)), this.setAttribute("normal", new li(M, 3)), this.setAttribute("uv", new li(d, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new wa(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}, Tl = class extends bn {
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new Ve(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
};
function sn(e) {
  const t = {};
  for (const i in e) {
    t[i] = {};
    for (const n in e[i]) {
      const r = e[i][n];
      if (qA(r)) r.isRenderTargetTexture ? (De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[i][n] = null) : t[i][n] = r.clone();
      else if (Array.isArray(r)) if (qA(r[0])) {
        const A = [];
        for (let s = 0, a = r.length; s < a; s++) A[s] = r[s].clone();
        t[i][n] = A;
      } else t[i][n] = r.slice();
      else t[i][n] = r;
    }
  }
  return t;
}
function Pt(e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const n = sn(e[i]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function qA(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function Bl(e) {
  const t = [];
  for (let i = 0; i < e.length; i++) t.push(e[i].clone());
  return t;
}
function Ea(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Oe.workingColorSpace;
}
var Ma = {
  clone: sn,
  merge: Pt
}, bl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Il = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, bt = class extends bn {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = bl, this.fragmentShader = Il, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = sn(e.uniforms), this.uniformsGroups = Bl(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
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
          this.uniforms[i].value = new Ve().setHex(n.value);
          break;
        case "v2":
          this.uniforms[i].value = new Re().fromArray(n.value);
          break;
        case "v3":
          this.uniforms[i].value = new Q().fromArray(n.value);
          break;
        case "v4":
          this.uniforms[i].value = new At().fromArray(n.value);
          break;
        case "m3":
          this.uniforms[i].value = new Ie().fromArray(n.value);
          break;
        case "m4":
          this.uniforms[i].value = new at().fromArray(n.value);
          break;
        default:
          this.uniforms[i].value = n.value;
      }
    }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (const i in e.extensions) this.extensions[i] = e.extensions[i];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}, Rl = class extends bt {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, Ll = class extends bn {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Lo, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, Ul = class extends bn {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
};
function tr(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var In = class {
  constructor(e, t, i, n) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = n !== void 0 ? n : new t.constructor(i), this.sampleValues = t, this.valueSize = i, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let i = this._cachedIndex, n = t[i], r = t[i - 1];
    i: {
      e: {
        let A;
        t: {
          n: if (!(e < n)) {
            for (let s = i + 2; ; ) {
              if (n === void 0) {
                if (e < r) break n;
                return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
              }
              if (i === s) break;
              if (r = n, n = t[++i], e < n) break e;
            }
            A = t.length;
            break t;
          }
          if (!(e >= r)) {
            const s = t[1];
            e < s && (i = 2, r = s);
            for (let a = i - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (i === a) break;
              if (n = r, r = t[--i - 1], e >= r) break e;
            }
            A = i, i = 0;
            break t;
          }
          break i;
        }
        for (; i < A; ) {
          const s = i + A >>> 1;
          e < t[s] ? A = s : i = s + 1;
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
    for (let A = 0; A !== n; ++A) t[A] = i[r + A];
    return t;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {
  }
}, Nl = class extends In {
  constructor(e, t, i, n) {
    super(e, t, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: yA,
      endingEnd: yA
    };
  }
  intervalChanged_(e, t, i) {
    const n = this.parameterPositions;
    let r = e - 2, A = e + 1, s = n[r], a = n[A];
    if (s === void 0) switch (this.getSettings_().endingStart) {
      case TA:
        r = e, s = 2 * t - i;
        break;
      case BA:
        r = n.length - 2, s = t + n[r] - n[r + 1];
        break;
      default:
        r = e, s = i;
    }
    if (a === void 0) switch (this.getSettings_().endingEnd) {
      case TA:
        A = e, a = 2 * i - t;
        break;
      case BA:
        A = 1, a = i + n[1] - n[0];
        break;
      default:
        A = e - 1, a = t;
    }
    const l = (i - t) * 0.5, o = this.valueSize;
    this._weightPrev = l / (t - s), this._weightNext = l / (a - i), this._offsetPrev = r * o, this._offsetNext = A * o;
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, A = this.sampleValues, s = this.valueSize, a = e * s, l = a - s, o = this._offsetPrev, c = this._offsetNext, u = this._weightPrev, h = this._weightNext, p = (i - t) / (n - t), w = p * p, M = w * p, d = -u * M + 2 * u * w - u * p, f = (1 + u) * M + (-1.5 - 2 * u) * w + (-0.5 + u) * p + 1, C = (-1 - h) * M + (1.5 + h) * w + 0.5 * p, x = h * M - h * w;
    for (let P = 0; P !== s; ++P) r[P] = d * A[o + P] + f * A[l + P] + C * A[a + P] + x * A[c + P];
    return r;
  }
}, Fl = class extends In {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, A = this.sampleValues, s = this.valueSize, a = e * s, l = a - s, o = (i - t) / (n - t), c = 1 - o;
    for (let u = 0; u !== s; ++u) r[u] = A[l + u] * c + A[a + u] * o;
    return r;
  }
}, Ql = class extends In {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, Ol = class extends In {
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, A = this.sampleValues, s = this.valueSize, a = e * s, l = a - s, o = this.inTangents, c = this.outTangents;
    if (!o || !c) {
      const p = (i - t) / (n - t), w = 1 - p;
      for (let M = 0; M !== s; ++M) r[M] = A[l + M] * w + A[a + M] * p;
      return r;
    }
    const u = s * 2, h = e - 1;
    for (let p = 0; p !== s; ++p) {
      const w = A[l + p], M = A[a + p], d = h * u + p * 2, f = c[d], C = c[d + 1], x = e * u + p * 2, P = o[x], D = o[x + 1];
      let S = (i - t) / (n - t), B, g, _, W, y;
      for (let H = 0; H < 8; H++) {
        B = S * S, g = B * S, _ = 1 - S, W = _ * _, y = W * _;
        const G = y * t + 3 * W * S * f + 3 * _ * B * P + g * n - i;
        if (Math.abs(G) < 1e-10) break;
        const k = 3 * W * (f - t) + 6 * _ * S * (P - f) + 3 * B * (n - P);
        if (Math.abs(k) < 1e-10) break;
        S = S - G / k, S = Math.max(0, Math.min(1, S));
      }
      r[p] = y * w + 3 * W * S * C + 3 * _ * B * D + g * M;
    }
    return r;
  }
}, Zt = class {
  constructor(e, t, i, n) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = tr(t, this.TimeBufferType), this.values = tr(i, this.ValueBufferType), this.setInterpolation(n || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let i;
    if (t.toJSON !== this.toJSON) i = t.toJSON(e);
    else {
      i = {
        name: e.name,
        times: tr(e.times, Array),
        values: tr(e.values, Array)
      };
      const n = e.getInterpolation();
      n !== e.DefaultInterpolation && (i.interpolation = n);
    }
    return i.type = e.ValueTypeName, i;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new Ql(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Fl(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new Nl(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const t = new Ol(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case hr:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case AA:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case Pr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case CA:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      const i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(i);
      return De("KeyframeTrack:", i), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return hr;
      case this.InterpolantFactoryMethodLinear:
        return AA;
      case this.InterpolantFactoryMethodSmooth:
        return Pr;
      case this.InterpolantFactoryMethodBezier:
        return CA;
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
    let r = 0, A = n - 1;
    for (; r !== n && i[r] < e; ) ++r;
    for (; A !== -1 && i[A] > t; ) --A;
    if (++A, r !== 0 || A !== n) {
      r >= A && (A = Math.max(A, 1), r = A - 1);
      const s = this.getValueSize();
      this.times = i.slice(r, A), this.values = this.values.slice(r * s, A * s);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (Te("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const i = this.times, n = this.values, r = i.length;
    r === 0 && (Te("KeyframeTrack: Track is empty.", this), e = !1);
    let A = null;
    for (let s = 0; s !== r; s++) {
      const a = i[s];
      if (typeof a == "number" && isNaN(a)) {
        Te("KeyframeTrack: Time is not a valid number.", this, s, a), e = !1;
        break;
      }
      if (A !== null && A > a) {
        Te("KeyframeTrack: Out of order keys.", this, s, a, A), e = !1;
        break;
      }
      A = a;
    }
    if (n !== void 0 && Fo(n))
      for (let s = 0, a = n.length; s !== a; ++s) {
        const l = n[s];
        if (isNaN(l)) {
          Te("KeyframeTrack: Value is not a valid number.", this, s, l), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), i = this.getValueSize(), n = this.getInterpolation() === Pr, r = e.length - 1;
    let A = 1;
    for (let s = 1; s < r; ++s) {
      let a = !1;
      const l = e[s];
      if (l !== e[s + 1] && (s !== 1 || l !== e[0])) if (n)
        a = !0;
      else {
        const o = s * i, c = o - i, u = o + i;
        for (let h = 0; h !== i; ++h) {
          const p = t[o + h];
          if (p !== t[c + h] || p !== t[u + h]) {
            a = !0;
            break;
          }
        }
      }
      if (a) {
        if (s !== A) {
          e[A] = e[s];
          const o = s * i, c = A * i;
          for (let u = 0; u !== i; ++u) t[c + u] = t[o + u];
        }
        ++A;
      }
    }
    if (r > 0) {
      e[A] = e[r];
      for (let s = r * i, a = A * i, l = 0; l !== i; ++l) t[a + l] = t[s + l];
      ++A;
    }
    return A !== e.length ? (this.times = e.slice(0, A), this.values = t.slice(0, A * i)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), i = this.constructor, n = new i(this.name, e, t);
    return n.createInterpolant = this.createInterpolant, n;
  }
};
Zt.prototype.ValueTypeName = "";
Zt.prototype.TimeBufferType = Float32Array;
Zt.prototype.ValueBufferType = Float32Array;
Zt.prototype.DefaultInterpolation = AA;
var Rn = class extends Zt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Rn.prototype.ValueTypeName = "bool";
Rn.prototype.ValueBufferType = Array;
Rn.prototype.DefaultInterpolation = hr;
Rn.prototype.InterpolantFactoryMethodLinear = void 0;
Rn.prototype.InterpolantFactoryMethodSmooth = void 0;
var Vl = class extends Zt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
Vl.prototype.ValueTypeName = "color";
var zl = class extends Zt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
zl.prototype.ValueTypeName = "number";
var Hl = class extends In {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, A = this.sampleValues, s = this.valueSize, a = (i - t) / (n - t);
    let l = e * s;
    for (let o = l + s; l !== o; l += 4) Li.slerpFlat(r, 0, A, l - s, A, l, a);
    return r;
  }
}, Pa = class extends Zt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Hl(this.times, this.values, this.getValueSize(), e);
  }
};
Pa.prototype.ValueTypeName = "quaternion";
Pa.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ln = class extends Zt {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Ln.prototype.ValueTypeName = "string";
Ln.prototype.ValueBufferType = Array;
Ln.prototype.DefaultInterpolation = hr;
Ln.prototype.InterpolantFactoryMethodLinear = void 0;
Ln.prototype.InterpolantFactoryMethodSmooth = void 0;
var kl = class extends Zt {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
kl.prototype.ValueTypeName = "vector";
var Gl = class {
  constructor(e, t, i) {
    const n = this;
    let r = !1, A = 0, s = 0, a;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = i, this._abortController = null, this.itemStart = function(o) {
      s++, r === !1 && n.onStart !== void 0 && n.onStart(o, A, s), r = !0;
    }, this.itemEnd = function(o) {
      A++, n.onProgress !== void 0 && n.onProgress(o, A, s), A === s && (r = !1, n.onLoad !== void 0 && n.onLoad());
    }, this.itemError = function(o) {
      n.onError !== void 0 && n.onError(o);
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
      for (let c = 0, u = l.length; c < u; c += 2) {
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
}, Wl = /* @__PURE__ */ new Gl(), Xl = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : Wl, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
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
Xl.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Yl = class extends It {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ve(e), this.intensity = t;
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
}, Xr = /* @__PURE__ */ new at(), KA = /* @__PURE__ */ new Q(), JA = /* @__PURE__ */ new Q(), ql = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Re(512, 512), this.mapType = Ei, this.map = null, this.mapPass = null, this.matrix = new at(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new uA(), this._frameExtents = new Re(1, 1), this._viewportCount = 1, this._viewports = [new At(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, i = this.matrix;
    KA.setFromMatrixPosition(e.matrixWorld), t.position.copy(KA), JA.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(JA), t.updateMatrixWorld(), Xr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Xr, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), i.multiply(Xr);
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
}, ir = /* @__PURE__ */ new Q(), nr = /* @__PURE__ */ new Li(), Xt = /* @__PURE__ */ new Q(), _a = class extends It {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new at(), this.projectionMatrix = new at(), this.projectionMatrixInverse = new at(), this.coordinateSystem = nn, this._reversedDepth = !1;
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
    super.updateMatrixWorld(e), this.matrixWorld.decompose(ir, nr, Xt), Xt.x === 1 && Xt.y === 1 && Xt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ir, nr, Xt.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, i = !1) {
    super.updateWorldMatrix(e, t, i), this.matrixWorld.decompose(ir, nr, Xt), Xt.x === 1 && Xt.y === 1 && Xt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ir, nr, Xt.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, gi = /* @__PURE__ */ new Q(), ZA = /* @__PURE__ */ new Re(), jA = /* @__PURE__ */ new Re(), kt = class extends _a {
  constructor(e = 50, t = 1, i = 0.1, n = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = yn * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(_n * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return yn * 2 * Math.atan(Math.tan(_n * 0.5 * this.fov) / this.zoom);
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
    return this.getViewBounds(e, ZA, jA), t.subVectors(jA, ZA);
  }
  setViewOffset(e, t, i, n, r, A) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = A, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(_n * 0.5 * this.fov) / this.zoom, i = 2 * t, n = this.aspect * i, r = -0.5 * n;
    const A = this.view;
    if (this.view !== null && this.view.enabled) {
      const a = A.fullWidth, l = A.fullHeight;
      r += A.offsetX * n / a, t -= A.offsetY * i / l, n *= A.width / a, i *= A.height / l;
    }
    const s = this.filmOffset;
    s !== 0 && (r += e * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, gr = class extends _a {
  constructor(e = -1, t = 1, i = 1, n = -1, r = 0.1, A = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = n, this.near = r, this.far = A, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, i, n, r, A) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = A, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, n = (this.top + this.bottom) / 2;
    let r = i - e, A = i + e, s = n + t, a = n - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, o = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, A = r + l * this.view.width, s -= o * this.view.offsetY, a = s - o * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, A, s, a, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, Kl = class extends ql {
  constructor() {
    super(new gr(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, Jl = class extends Yl {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(It.DEFAULT_UP), this.updateMatrix(), this.target = new It(), this.shadow = new Kl();
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
}, qi = -90, Ki = 1, Zl = class extends It {
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const n = new kt(qi, Ki, e, t);
    n.layers = this.layers, this.add(n);
    const r = new kt(qi, Ki, e, t);
    r.layers = this.layers, this.add(r);
    const A = new kt(qi, Ki, e, t);
    A.layers = this.layers, this.add(A);
    const s = new kt(qi, Ki, e, t);
    s.layers = this.layers, this.add(s);
    const a = new kt(qi, Ki, e, t);
    a.layers = this.layers, this.add(a);
    const l = new kt(qi, Ki, e, t);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [i, n, r, A, s, a] = t;
    for (const l of t) this.remove(l);
    if (e === 2e3)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), n.up.set(0, 1, 0), n.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), A.up.set(0, 0, 1), A.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), a.up.set(0, 1, 0), a.lookAt(0, 0, -1);
    else if (e === 2001)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), n.up.set(0, -1, 0), n.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), A.up.set(0, 0, -1), A.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), a.up.set(0, -1, 0), a.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: n } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, A, s, a, l, o] = this.children, c = e.getRenderTarget(), u = e.getActiveCubeFace(), h = e.getActiveMipmapLevel(), p = e.xr.enabled;
    e.xr.enabled = !1;
    const w = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1;
    let M = !1;
    e.isWebGLRenderer === !0 ? M = e.state.buffers.depth.getReversed() : M = e.reversedDepthBuffer, e.setRenderTarget(i, 0, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(i, 1, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, A), e.setRenderTarget(i, 2, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(i, 3, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(i, 4, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, l), i.texture.generateMipmaps = w, e.setRenderTarget(i, 5, n), M && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(c, u, h), e.xr.enabled = p, i.texture.needsPMREMUpdate = !0;
  }
}, jl = class extends kt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, dA = "\\[\\]\\.:\\/", $l = new RegExp("[" + dA + "]", "g"), pA = "[^" + dA + "]", ec = "[^" + dA.replace("\\.", "") + "]", tc = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", pA), ic = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", ec), nc = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", pA), rc = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", pA), Ac = new RegExp("^" + tc + ic + nc + rc + "$"), sc = [
  "material",
  "materials",
  "bones",
  "map"
], ac = class {
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
    return t.replace(/\s/g, "_").replace($l, "");
  }
  static parseTrackName(t) {
    const i = Ac.exec(t);
    if (i === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + t);
    const n = {
      nodeName: i[2],
      objectName: i[3],
      objectIndex: i[4],
      propertyName: i[5],
      propertyIndex: i[6]
    }, r = n.nodeName && n.nodeName.lastIndexOf(".");
    if (r !== void 0 && r !== -1) {
      const A = n.nodeName.substring(r + 1);
      sc.indexOf(A) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = A);
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
      const n = function(A) {
        for (let s = 0; s < A.length; s++) {
          const a = A[s];
          if (a.name === i || a.uuid === i) return a;
          const l = n(a.children);
          if (l) return l;
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
    for (let r = 0, A = n.length; r !== A; ++r) t[i++] = n[r];
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
    for (let r = 0, A = n.length; r !== A; ++r) n[r] = t[i++];
  }
  _setValue_array_setNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, A = n.length; r !== A; ++r) n[r] = t[i++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, A = n.length; r !== A; ++r) n[r] = t[i++];
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
    let A = i.propertyIndex;
    if (t || (t = $i.findNode(this.rootNode, i.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      De("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let o = i.objectIndex;
      switch (n) {
        case "materials":
          if (!t.material) {
            Te("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            Te("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            Te("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let c = 0; c < t.length; c++) if (t[c].name === o) {
            o = c;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            Te("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            Te("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[n] === void 0) {
            Te("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[n];
      }
      if (o !== void 0) {
        if (t[o] === void 0) {
          Te("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[o];
      }
    }
    const s = t[r];
    if (s === void 0) {
      const o = i.nodeName;
      Te("PropertyBinding: Trying to update property for track: " + o + "." + r + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? a = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (A !== void 0) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          Te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          Te("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[A] !== void 0 && (A = t.morphTargetDictionary[A]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = A;
    } else s.fromArray !== void 0 && s.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (l = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = r;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
rt.Composite = ac;
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
var oc = class {
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
qs = oc;
qs.prototype.isMatrix2 = !0;
function $A(e, t, i, n) {
  const r = lc(n);
  switch (i) {
    case qa:
      return e * t;
    case Ja:
      return e * t / r.components * r.byteLength;
    case na:
      return e * t / r.components * r.byteLength;
    case cr:
      return e * t * 2 / r.components * r.byteLength;
    case ra:
      return e * t * 2 / r.components * r.byteLength;
    case Ka:
      return e * t * 3 / r.components * r.byteLength;
    case Sn:
      return e * t * 4 / r.components * r.byteLength;
    case Aa:
      return e * t * 4 / r.components * r.byteLength;
    case Za:
    case ja:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case $a:
    case eo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case io:
    case ro:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case to:
    case no:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case Ao:
    case so:
    case oo:
    case lo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case ao:
    case co:
    case ho:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case uo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case fo:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case po:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case mo:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case go:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case vo:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case wo:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Eo:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Mo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Po:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case _o:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Do:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case xo:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case So:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Co:
    case yo:
    case To:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Bo:
    case bo:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case Io:
    case Ro:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${i} format.`);
}
function lc(e) {
  switch (e) {
    case Ei:
    case ka:
      return {
        byteLength: 1,
        components: 1
      };
    case js:
    case Ga:
    case Ii:
      return {
        byteLength: 2,
        components: 1
      };
    case $s:
    case ea:
      return {
        byteLength: 2,
        components: 4
      };
    case bi:
    case Wa:
    case mr:
      return {
        byteLength: 4,
        components: 1
      };
    case Xa:
    case Ya:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } }));
typeof window < "u" && (window.__THREE__ ? De("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function Da() {
  let e = null, t = !1, i = null, n = null;
  function r(A, s) {
    i(A, s), n = e.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && i !== null && e !== null && (n = e.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      e !== null && e.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(A) {
      i = A;
    },
    setContext: function(A) {
      e = A;
    }
  };
}
function cc(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function i(a, l) {
    const o = a.array, c = a.usage, u = o.byteLength, h = e.createBuffer();
    e.bindBuffer(l, h), e.bufferData(l, o, c), a.onUploadCallback();
    let p;
    if (o instanceof Float32Array) p = e.FLOAT;
    else if (typeof Float16Array < "u" && o instanceof Float16Array) p = e.HALF_FLOAT;
    else if (o instanceof Uint16Array) a.isFloat16BufferAttribute ? p = e.HALF_FLOAT : p = e.UNSIGNED_SHORT;
    else if (o instanceof Int16Array) p = e.SHORT;
    else if (o instanceof Uint32Array) p = e.UNSIGNED_INT;
    else if (o instanceof Int32Array) p = e.INT;
    else if (o instanceof Int8Array) p = e.BYTE;
    else if (o instanceof Uint8Array) p = e.UNSIGNED_BYTE;
    else if (o instanceof Uint8ClampedArray) p = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + o);
    return {
      buffer: h,
      type: p,
      bytesPerElement: o.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function n(a, l, o) {
    const c = l.array, u = l.updateRanges;
    if (e.bindBuffer(o, a), u.length === 0) e.bufferSubData(o, 0, c);
    else {
      u.sort((p, w) => p.start - w.start);
      let h = 0;
      for (let p = 1; p < u.length; p++) {
        const w = u[h], M = u[p];
        M.start <= w.start + w.count + 1 ? w.count = Math.max(w.count, M.start + M.count - w.start) : (++h, u[h] = M);
      }
      u.length = h + 1;
      for (let p = 0, w = u.length; p < w; p++) {
        const M = u[p];
        e.bufferSubData(o, M.start * c.BYTES_PER_ELEMENT, c, M.start, M.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), t.get(a);
  }
  function A(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = t.get(a);
    l && (e.deleteBuffer(l.buffer), t.delete(a));
  }
  function s(a, l) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const c = t.get(a);
      (!c || c.version < a.version) && t.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const o = t.get(a);
    if (o === void 0) t.set(a, i(a, l));
    else if (o.version < a.version) {
      if (o.size !== a.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(o.buffer, a, l), o.version = a.version;
    }
  }
  return {
    get: r,
    remove: A,
    update: s
  };
}
var Le = {
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
}, se = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ie() },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 },
    dfgLUT: { value: null }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ie() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ie() },
    normalScale: { value: /* @__PURE__ */ new Re(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ie() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ve(16777215) }
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
    probesMin: { value: /* @__PURE__ */ new Q() },
    probesMax: { value: /* @__PURE__ */ new Q() },
    probesResolution: { value: /* @__PURE__ */ new Q() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ie() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Re(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 }
  }
}, qt = {
  basic: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.specularmap,
      se.envmap,
      se.aomap,
      se.lightmap,
      se.fog
    ]),
    vertexShader: Le.meshbasic_vert,
    fragmentShader: Le.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.specularmap,
      se.envmap,
      se.aomap,
      se.lightmap,
      se.emissivemap,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      se.fog,
      se.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Le.meshlambert_vert,
    fragmentShader: Le.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.specularmap,
      se.envmap,
      se.aomap,
      se.lightmap,
      se.emissivemap,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      se.fog,
      se.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        specular: { value: /* @__PURE__ */ new Ve(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Le.meshphong_vert,
    fragmentShader: Le.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.envmap,
      se.aomap,
      se.lightmap,
      se.emissivemap,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      se.roughnessmap,
      se.metalnessmap,
      se.fog,
      se.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Le.meshphysical_vert,
    fragmentShader: Le.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.aomap,
      se.lightmap,
      se.emissivemap,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      se.gradientmap,
      se.fog,
      se.lights,
      { emissive: { value: /* @__PURE__ */ new Ve(0) } }
    ]),
    vertexShader: Le.meshtoon_vert,
    fragmentShader: Le.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      se.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: Le.meshmatcap_vert,
    fragmentShader: Le.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Pt([se.points, se.fog]),
    vertexShader: Le.points_vert,
    fragmentShader: Le.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Le.linedashed_vert,
    fragmentShader: Le.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Pt([se.common, se.displacementmap]),
    vertexShader: Le.depth_vert,
    fragmentShader: Le.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.bumpmap,
      se.normalmap,
      se.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: Le.meshnormal_vert,
    fragmentShader: Le.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Pt([se.sprite, se.fog]),
    vertexShader: Le.sprite_vert,
    fragmentShader: Le.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ie() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Le.background_vert,
    fragmentShader: Le.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ie() }
    },
    vertexShader: Le.backgroundCube_vert,
    fragmentShader: Le.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Le.cube_vert,
    fragmentShader: Le.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: Le.equirect_vert,
    fragmentShader: Le.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Pt([
      se.common,
      se.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new Q() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Le.distance_vert,
    fragmentShader: Le.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Pt([
      se.lights,
      se.fog,
      {
        color: { value: /* @__PURE__ */ new Ve(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Le.shadow_vert,
    fragmentShader: Le.shadow_frag
  }
};
qt.physical = {
  uniforms: /* @__PURE__ */ Pt([qt.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new Ie() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ie() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new Re(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ie() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new Ie() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ie() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new Ve(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new Ie() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ie() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new Ie() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new Re() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new Ie() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new Ve(0) },
    specularColor: { value: /* @__PURE__ */ new Ve(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new Ie() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new Ie() },
    anisotropyVector: { value: /* @__PURE__ */ new Re() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new Ie() }
  }]),
  vertexShader: Le.meshphysical_vert,
  fragmentShader: Le.meshphysical_frag
};
var rr = {
  r: 0,
  b: 0,
  g: 0
}, hc = /* @__PURE__ */ new at(), xa = /* @__PURE__ */ new Ie();
xa.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function uc(e, t, i, n, r, A) {
  const s = new Ve(0);
  let a = r === !0 ? 0 : 1, l, o, c = null, u = 0, h = null;
  function p(C) {
    let x = C.isScene === !0 ? C.background : null;
    if (x && x.isTexture) {
      const P = C.backgroundBlurriness > 0;
      x = t.get(x, P);
    }
    return x;
  }
  function w(C) {
    let x = !1;
    const P = p(C);
    P === null ? d(s, a) : P && P.isColor && (d(P, 1), x = !0);
    const D = e.xr.getEnvironmentBlendMode();
    D === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, A) : D === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, A), (e.autoClear || x) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function M(C, x) {
    const P = p(x);
    P && (P.isCubeTexture || P.mapping === 306) ? (o === void 0 && (o = new Ft(new fA(1, 1, 1), new bt({
      name: "BackgroundCubeMaterial",
      uniforms: sn(qt.backgroundCube.uniforms),
      vertexShader: qt.backgroundCube.vertexShader,
      fragmentShader: qt.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), o.geometry.deleteAttribute("normal"), o.geometry.deleteAttribute("uv"), o.onBeforeRender = function(D, S, B) {
      this.matrixWorld.copyPosition(B.matrixWorld);
    }, Object.defineProperty(o.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), n.update(o)), o.material.uniforms.envMap.value = P, o.material.uniforms.backgroundBlurriness.value = x.backgroundBlurriness, o.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, o.material.uniforms.backgroundRotation.value.setFromMatrix4(hc.makeRotationFromEuler(x.backgroundRotation)).transpose(), P.isCubeTexture && P.isRenderTargetTexture === !1 && o.material.uniforms.backgroundRotation.value.premultiply(xa), o.material.toneMapped = Oe.getTransfer(P.colorSpace) !== fr, (c !== P || u !== P.version || h !== e.toneMapping) && (o.material.needsUpdate = !0, c = P, u = P.version, h = e.toneMapping), o.layers.enableAll(), C.unshift(o, o.geometry, o.material, 0, 0, null)) : P && P.isTexture && (l === void 0 && (l = new Ft(new xn(2, 2), new bt({
      name: "BackgroundMaterial",
      uniforms: sn(qt.background.uniforms),
      vertexShader: qt.background.vertexShader,
      fragmentShader: qt.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), n.update(l)), l.material.uniforms.t2D.value = P, l.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, l.material.toneMapped = Oe.getTransfer(P.colorSpace) !== fr, P.matrixAutoUpdate === !0 && P.updateMatrix(), l.material.uniforms.uvTransform.value.copy(P.matrix), (c !== P || u !== P.version || h !== e.toneMapping) && (l.material.needsUpdate = !0, c = P, u = P.version, h = e.toneMapping), l.layers.enableAll(), C.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function d(C, x) {
    C.getRGB(rr, Ea(e)), i.buffers.color.setClear(rr.r, rr.g, rr.b, x, A);
  }
  function f() {
    o !== void 0 && (o.geometry.dispose(), o.material.dispose(), o = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(C, x = 1) {
      s.set(C), a = x, d(s, a);
    },
    getClearAlpha: function() {
      return a;
    },
    setClearAlpha: function(C) {
      a = C, d(s, a);
    },
    render: w,
    addToRenderList: M,
    dispose: f
  };
}
function fc(e, t) {
  const i = e.getParameter(e.MAX_VERTEX_ATTRIBS), n = {}, r = h(null);
  let A = r, s = !1;
  function a(y, H, G, k, O) {
    let X = !1;
    const U = u(y, k, G, H);
    A !== U && (A = U, o(A.object)), X = p(y, k, G, O), X && w(y, k, G, O), O !== null && t.update(O, e.ELEMENT_ARRAY_BUFFER), (X || s) && (s = !1, P(y, H, G, k), O !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(O).buffer));
  }
  function l() {
    return e.createVertexArray();
  }
  function o(y) {
    return e.bindVertexArray(y);
  }
  function c(y) {
    return e.deleteVertexArray(y);
  }
  function u(y, H, G, k) {
    const O = k.wireframe === !0;
    let X = n[H.id];
    X === void 0 && (X = {}, n[H.id] = X);
    const U = y.isInstancedMesh === !0 ? y.id : 0;
    let J = X[U];
    J === void 0 && (J = {}, X[U] = J);
    let ee = J[G.id];
    ee === void 0 && (ee = {}, J[G.id] = ee);
    let te = ee[O];
    return te === void 0 && (te = h(l()), ee[O] = te), te;
  }
  function h(y) {
    const H = [], G = [], k = [];
    for (let O = 0; O < i; O++)
      H[O] = 0, G[O] = 0, k[O] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: H,
      enabledAttributes: G,
      attributeDivisors: k,
      object: y,
      attributes: {},
      index: null
    };
  }
  function p(y, H, G, k) {
    const O = A.attributes, X = H.attributes;
    let U = 0;
    const J = G.getAttributes();
    for (const ee in J) if (J[ee].location >= 0) {
      const te = O[ee];
      let ce = X[ee];
      if (ce === void 0 && (ee === "instanceMatrix" && y.instanceMatrix && (ce = y.instanceMatrix), ee === "instanceColor" && y.instanceColor && (ce = y.instanceColor)), te === void 0 || te.attribute !== ce || ce && te.data !== ce.data) return !0;
      U++;
    }
    return A.attributesNum !== U || A.index !== k;
  }
  function w(y, H, G, k) {
    const O = {}, X = H.attributes;
    let U = 0;
    const J = G.getAttributes();
    for (const ee in J) if (J[ee].location >= 0) {
      let te = X[ee];
      te === void 0 && (ee === "instanceMatrix" && y.instanceMatrix && (te = y.instanceMatrix), ee === "instanceColor" && y.instanceColor && (te = y.instanceColor));
      const ce = {};
      ce.attribute = te, te && te.data && (ce.data = te.data), O[ee] = ce, U++;
    }
    A.attributes = O, A.attributesNum = U, A.index = k;
  }
  function M() {
    const y = A.newAttributes;
    for (let H = 0, G = y.length; H < G; H++) y[H] = 0;
  }
  function d(y) {
    f(y, 0);
  }
  function f(y, H) {
    const G = A.newAttributes, k = A.enabledAttributes, O = A.attributeDivisors;
    G[y] = 1, k[y] === 0 && (e.enableVertexAttribArray(y), k[y] = 1), O[y] !== H && (e.vertexAttribDivisor(y, H), O[y] = H);
  }
  function C() {
    const y = A.newAttributes, H = A.enabledAttributes;
    for (let G = 0, k = H.length; G < k; G++) H[G] !== y[G] && (e.disableVertexAttribArray(G), H[G] = 0);
  }
  function x(y, H, G, k, O, X, U) {
    U === !0 ? e.vertexAttribIPointer(y, H, G, O, X) : e.vertexAttribPointer(y, H, G, k, O, X);
  }
  function P(y, H, G, k) {
    M();
    const O = k.attributes, X = G.getAttributes(), U = H.defaultAttributeValues;
    for (const J in X) {
      const ee = X[J];
      if (ee.location >= 0) {
        let te = O[J];
        if (te === void 0 && (J === "instanceMatrix" && y.instanceMatrix && (te = y.instanceMatrix), J === "instanceColor" && y.instanceColor && (te = y.instanceColor)), te !== void 0) {
          const ce = te.normalized, Ee = te.itemSize, We = t.get(te);
          if (We === void 0) continue;
          const qe = We.buffer, Y = We.type, re = We.bytesPerElement, ue = Y === e.INT || Y === e.UNSIGNED_INT || te.gpuType === 1013;
          if (te.isInterleavedBufferAttribute) {
            const he = te.data, xe = he.stride, Ce = te.offset;
            if (he.isInstancedInterleavedBuffer) {
              for (let Be = 0; Be < ee.locationSize; Be++) f(ee.location + Be, he.meshPerAttribute);
              y.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = he.meshPerAttribute * he.count);
            } else for (let Be = 0; Be < ee.locationSize; Be++) d(ee.location + Be);
            e.bindBuffer(e.ARRAY_BUFFER, qe);
            for (let Be = 0; Be < ee.locationSize; Be++) x(ee.location + Be, Ee / ee.locationSize, Y, ce, xe * re, (Ce + Ee / ee.locationSize * Be) * re, ue);
          } else {
            if (te.isInstancedBufferAttribute) {
              for (let he = 0; he < ee.locationSize; he++) f(ee.location + he, te.meshPerAttribute);
              y.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = te.meshPerAttribute * te.count);
            } else for (let he = 0; he < ee.locationSize; he++) d(ee.location + he);
            e.bindBuffer(e.ARRAY_BUFFER, qe);
            for (let he = 0; he < ee.locationSize; he++) x(ee.location + he, Ee / ee.locationSize, Y, ce, Ee * re, Ee / ee.locationSize * he * re, ue);
          }
        } else if (U !== void 0) {
          const ce = U[J];
          if (ce !== void 0) switch (ce.length) {
            case 2:
              e.vertexAttrib2fv(ee.location, ce);
              break;
            case 3:
              e.vertexAttrib3fv(ee.location, ce);
              break;
            case 4:
              e.vertexAttrib4fv(ee.location, ce);
              break;
            default:
              e.vertexAttrib1fv(ee.location, ce);
          }
        }
      }
    }
    C();
  }
  function D() {
    _();
    for (const y in n) {
      const H = n[y];
      for (const G in H) {
        const k = H[G];
        for (const O in k) {
          const X = k[O];
          for (const U in X)
            c(X[U].object), delete X[U];
          delete k[O];
        }
      }
      delete n[y];
    }
  }
  function S(y) {
    if (n[y.id] === void 0) return;
    const H = n[y.id];
    for (const G in H) {
      const k = H[G];
      for (const O in k) {
        const X = k[O];
        for (const U in X)
          c(X[U].object), delete X[U];
        delete k[O];
      }
    }
    delete n[y.id];
  }
  function B(y) {
    for (const H in n) {
      const G = n[H];
      for (const k in G) {
        const O = G[k];
        if (O[y.id] === void 0) continue;
        const X = O[y.id];
        for (const U in X)
          c(X[U].object), delete X[U];
        delete O[y.id];
      }
    }
  }
  function g(y) {
    for (const H in n) {
      const G = n[H], k = y.isInstancedMesh === !0 ? y.id : 0, O = G[k];
      if (O !== void 0) {
        for (const X in O) {
          const U = O[X];
          for (const J in U)
            c(U[J].object), delete U[J];
          delete O[X];
        }
        delete G[k], Object.keys(G).length === 0 && delete n[H];
      }
    }
  }
  function _() {
    W(), s = !0, A !== r && (A = r, o(A.object));
  }
  function W() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: _,
    resetDefaultState: W,
    dispose: D,
    releaseStatesOfGeometry: S,
    releaseStatesOfObject: g,
    releaseStatesOfProgram: B,
    initAttributes: M,
    enableAttribute: d,
    disableUnusedAttributes: C
  };
}
function dc(e, t, i) {
  let n;
  function r(l) {
    n = l;
  }
  function A(l, o) {
    e.drawArrays(n, l, o), i.update(o, n, 1);
  }
  function s(l, o, c) {
    c !== 0 && (e.drawArraysInstanced(n, l, o, c), i.update(o, n, c));
  }
  function a(l, o, c) {
    if (c === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, o, 0, c);
    let u = 0;
    for (let h = 0; h < c; h++) u += o[h];
    i.update(u, n, 1);
  }
  this.setMode = r, this.render = A, this.renderInstances = s, this.renderMultiDraw = a;
}
function pc(e, t, i, n) {
  let r;
  function A() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const B = t.get("EXT_texture_filter_anisotropic");
      r = e.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function s(B) {
    return !(B !== 1023 && n.convert(B) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(B) {
    const g = B === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(B !== 1009 && n.convert(B) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && B !== 1015 && !g);
  }
  function l(B) {
    if (B === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      B = "mediump";
    }
    return B === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let o = i.precision !== void 0 ? i.precision : "highp";
  const c = l(o);
  c !== o && (De("WebGLRenderer:", o, "not supported, using", c, "instead."), o = c);
  const u = i.logarithmicDepthBuffer === !0, h = i.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
  i.reversedDepthBuffer === !0 && h === !1 && De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), w = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), M = e.getParameter(e.MAX_TEXTURE_SIZE), d = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), f = e.getParameter(e.MAX_VERTEX_ATTRIBS), C = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), x = e.getParameter(e.MAX_VARYING_VECTORS), P = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), D = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: A,
    getMaxPrecision: l,
    textureFormatReadable: s,
    textureTypeReadable: a,
    precision: o,
    logarithmicDepthBuffer: u,
    reversedDepthBuffer: h,
    maxTextures: p,
    maxVertexTextures: w,
    maxTextureSize: M,
    maxCubemapSize: d,
    maxAttributes: f,
    maxVertexUniforms: C,
    maxVaryings: x,
    maxFragmentUniforms: P,
    maxSamples: D,
    samples: S
  };
}
function mc(e) {
  const t = this;
  let i = null, n = 0, r = !1, A = !1;
  const s = new Ci(), a = new Ie(), l = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, h) {
    const p = u.length !== 0 || h || n !== 0 || r;
    return r = h, n = u.length, p;
  }, this.beginShadows = function() {
    A = !0, c(null);
  }, this.endShadows = function() {
    A = !1;
  }, this.setGlobalState = function(u, h) {
    i = c(u, h, 0);
  }, this.setState = function(u, h, p) {
    const w = u.clippingPlanes, M = u.clipIntersection, d = u.clipShadows, f = e.get(u);
    if (!r || w === null || w.length === 0 || A && !d) A ? c(null) : o();
    else {
      const C = A ? 0 : n, x = C * 4;
      let P = f.clippingState || null;
      l.value = P, P = c(w, h, x, p);
      for (let D = 0; D !== x; ++D) P[D] = i[D];
      f.clippingState = P, this.numIntersection = M ? this.numPlanes : 0, this.numPlanes += C;
    }
  };
  function o() {
    l.value !== i && (l.value = i, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function c(u, h, p, w) {
    const M = u !== null ? u.length : 0;
    let d = null;
    if (M !== 0) {
      if (d = l.value, w !== !0 || d === null) {
        const f = p + M * 4, C = h.matrixWorldInverse;
        a.getNormalMatrix(C), (d === null || d.length < f) && (d = new Float32Array(f));
        for (let x = 0, P = p; x !== M; ++x, P += 4)
          s.copy(u[x]).applyMatrix4(C, a), s.normal.toArray(d, P), d[P + 3] = s.constant;
      }
      l.value = d, l.needsUpdate = !0;
    }
    return t.numPlanes = M, t.numIntersection = 0, d;
  }
}
var vi = 4, es = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], yi = 20, gc = 256, pn = /* @__PURE__ */ new gr(), ts = /* @__PURE__ */ new Ve(), Yr = null, qr = 0, Kr = 0, Jr = !1, vc = /* @__PURE__ */ new Q(), is = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(e, t = 0, i = 0.1, n = 100, r = {}) {
    const { size: A = 256, position: s = vc } = r;
    Yr = this._renderer.getRenderTarget(), qr = this._renderer.getActiveCubeFace(), Kr = this._renderer.getActiveMipmapLevel(), Jr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(A);
    const a = this._allocateTargets();
    return a.depthBuffer = !0, this._sceneToCubeUV(e, i, n, a, s), t > 0 && this._blur(a, 0, 0, t), this._applyPMREM(a), this._cleanup(a), a;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = As(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = rs(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(Yr, qr, Kr), this._renderer.xr.enabled = Jr, e.scissorTest = !1, Ji(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Yr = this._renderer.getRenderTarget(), qr = this._renderer.getActiveCubeFace(), Kr = this._renderer.getActiveMipmapLevel(), Jr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = t || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
      magFilter: St,
      minFilter: St,
      generateMipmaps: !1,
      type: Ii,
      format: Sn,
      colorSpace: sA,
      depthBuffer: !1
    }, n = ns(e, t, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ns(e, t, i);
      const { _lodMax: r } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = wc(r)), this._blurMaterial = Mc(r, e, t), this._ggxMaterial = Ec(r, e, t);
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new Ft(new Ui(), e);
    this._renderer.compile(t, pn);
  }
  _sceneToCubeUV(e, t, i, n, r) {
    const A = new kt(90, 1, t, i), s = [
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
    l.getClearColor(ts), l.toneMapping = 0, l.autoClear = !1, l.state.buffers.depth.getReversed() && (l.setRenderTarget(n), l.clearDepth(), l.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ft(new fA(), new pa({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    })));
    const u = this._backgroundBox, h = u.material;
    let p = !1;
    const w = e.background;
    w ? w.isColor && (h.color.copy(w), e.background = null, p = !0) : (h.color.copy(ts), p = !0);
    for (let M = 0; M < 6; M++) {
      const d = M % 3;
      d === 0 ? (A.up.set(0, s[M], 0), A.position.set(r.x, r.y, r.z), A.lookAt(r.x + a[M], r.y, r.z)) : d === 1 ? (A.up.set(0, 0, s[M]), A.position.set(r.x, r.y, r.z), A.lookAt(r.x, r.y + a[M], r.z)) : (A.up.set(0, s[M], 0), A.position.set(r.x, r.y, r.z), A.lookAt(r.x, r.y, r.z + a[M]));
      const f = this._cubeSize;
      Ji(n, d * f, M > 2 ? f : 0, f, f), l.setRenderTarget(n), p && l.render(u, A), l.render(e, A);
    }
    l.toneMapping = c, l.autoClear = o, e.background = w;
  }
  _textureToCubeUV(e, t) {
    const i = this._renderer, n = e.mapping === 301 || e.mapping === 302;
    n ? (this._cubemapMaterial === null && (this._cubemapMaterial = As()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = rs());
    const r = n ? this._cubemapMaterial : this._equirectMaterial, A = this._lodMeshes[0];
    A.material = r;
    const s = r.uniforms;
    s.envMap.value = e;
    const a = this._cubeSize;
    Ji(t, 0, 0, 3 * a, 2 * a), i.setRenderTarget(t), i.render(A, pn);
  }
  _applyPMREM(e) {
    const t = this._renderer, i = t.autoClear;
    t.autoClear = !1;
    const n = this._lodMeshes.length;
    for (let r = 1; r < n; r++) this._applyGGXFilter(e, r - 1, r);
    t.autoClear = i;
  }
  _applyGGXFilter(e, t, i) {
    const n = this._renderer, r = this._pingPongRenderTarget, A = this._ggxMaterial, s = this._lodMeshes[i];
    s.material = A;
    const a = A.uniforms, l = i / (this._lodMeshes.length - 1), o = t / (this._lodMeshes.length - 1), c = Math.sqrt(l * l - o * o) * (0 + l * 1.25), { _lodMax: u } = this, h = this._sizeLods[i], p = 3 * h * (i > u - vi ? i - u + vi : 0), w = 4 * (this._cubeSize - h);
    a.envMap.value = e.texture, a.roughness.value = c, a.mipInt.value = u - t, Ji(r, p, w, 3 * h, 2 * h), n.setRenderTarget(r), n.render(s, pn), a.envMap.value = r.texture, a.roughness.value = 0, a.mipInt.value = u - i, Ji(e, p, w, 3 * h, 2 * h), n.setRenderTarget(e), n.render(s, pn);
  }
  _blur(e, t, i, n, r) {
    const A = this._pingPongRenderTarget;
    this._halfBlur(e, A, t, i, n, "latitudinal", r), this._halfBlur(A, e, i, i, n, "longitudinal", r);
  }
  _halfBlur(e, t, i, n, r, A, s) {
    const a = this._renderer, l = this._blurMaterial;
    A !== "latitudinal" && A !== "longitudinal" && Te("blur direction must be either latitudinal or longitudinal!");
    const o = 3, c = this._lodMeshes[n];
    c.material = l;
    const u = l.uniforms, h = this._sizeLods[i] - 1, p = isFinite(r) ? Math.PI / (2 * h) : 2 * Math.PI / (2 * yi - 1), w = r / p, M = isFinite(r) ? 1 + Math.floor(o * w) : yi;
    M > yi && De(`sigmaRadians, ${r}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${yi}`);
    const d = [];
    let f = 0;
    for (let P = 0; P < yi; ++P) {
      const D = P / w, S = Math.exp(-D * D / 2);
      d.push(S), P === 0 ? f += S : P < M && (f += 2 * S);
    }
    for (let P = 0; P < d.length; P++) d[P] = d[P] / f;
    u.envMap.value = e.texture, u.samples.value = M, u.weights.value = d, u.latitudinal.value = A === "latitudinal", s && (u.poleAxis.value = s);
    const { _lodMax: C } = this;
    u.dTheta.value = p, u.mipInt.value = C - i;
    const x = this._sizeLods[n];
    Ji(t, 3 * x * (n > C - vi ? n - C + vi : 0), 4 * (this._cubeSize - x), 3 * x, 2 * x), a.setRenderTarget(t), a.render(c, pn);
  }
};
function wc(e) {
  const t = [], i = [], n = [];
  let r = e;
  const A = e - vi + 1 + es.length;
  for (let s = 0; s < A; s++) {
    const a = Math.pow(2, r);
    t.push(a);
    let l = 1 / a;
    s > e - vi ? l = es[s - e + vi - 1] : s === 0 && (l = 0), i.push(l);
    const o = 1 / (a - 2), c = -o, u = 1 + o, h = [
      c,
      c,
      u,
      c,
      u,
      u,
      c,
      c,
      u,
      u,
      c,
      u
    ], p = 6, w = 6, M = 3, d = 2, f = 1, C = new Float32Array(M * w * p), x = new Float32Array(d * w * p), P = new Float32Array(f * w * p);
    for (let S = 0; S < p; S++) {
      const B = S % 3 * 2 / 3 - 1, g = S > 2 ? 0 : -1, _ = [
        B,
        g,
        0,
        B + 2 / 3,
        g,
        0,
        B + 2 / 3,
        g + 1,
        0,
        B,
        g,
        0,
        B + 2 / 3,
        g + 1,
        0,
        B,
        g + 1,
        0
      ];
      C.set(_, M * w * S), x.set(h, d * w * S);
      const W = [
        S,
        S,
        S,
        S,
        S,
        S
      ];
      P.set(W, f * w * S);
    }
    const D = new Ui();
    D.setAttribute("position", new Jt(C, M)), D.setAttribute("uv", new Jt(x, d)), D.setAttribute("faceIndex", new Jt(P, f)), n.push(new Ft(D, null)), r > vi && r--;
  }
  return {
    lodMeshes: n,
    sizeLods: t,
    sigmas: i
  };
}
function ns(e, t, i) {
  const n = new Kt(e, t, i);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Ji(e, t, i, n, r) {
  e.viewport.set(t, i, n, r), e.scissor.set(t, i, n, r);
}
function Ec(e, t, i) {
  return new bt({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: gc,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / i,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: vr(),
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
function Mc(e, t, i) {
  const n = new Float32Array(yi), r = new Q(0, 1, 0);
  return new bt({
    name: "SphericalGaussianBlur",
    defines: {
      n: yi,
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
    vertexShader: vr(),
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
function rs() {
  return new bt({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: vr(),
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
function As() {
  return new bt({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: vr(),
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
function vr() {
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
var Sa = class extends Kt {
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
    this.texture = new ma(n), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
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
    }, n = new fA(5, 5, 5), r = new bt({
      name: "CubemapFromEquirect",
      uniforms: sn(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: 1,
      blending: 0
    });
    r.uniforms.tEquirect.value = t;
    const A = new Ft(n, r), s = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = St), new Zl(1, 10, this).update(e, A), t.minFilter = s, A.geometry.dispose(), A.material.dispose(), this;
  }
  clear(e, t = !0, i = !0, n = !0) {
    const r = e.getRenderTarget();
    for (let A = 0; A < 6; A++)
      e.setRenderTarget(this, A), e.clear(t, i, n);
    e.setRenderTarget(r);
  }
};
function Pc(e) {
  let t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n = null;
  function r(h, p = !1) {
    return h == null ? null : p ? s(h) : A(h);
  }
  function A(h) {
    if (h && h.isTexture) {
      const p = h.mapping;
      if (p === 303 || p === 304) if (t.has(h)) {
        const w = t.get(h).texture;
        return a(w, h.mapping);
      } else {
        const w = h.image;
        if (w && w.height > 0) {
          const M = new Sa(w.height);
          return M.fromEquirectangularTexture(e, h), t.set(h, M), h.addEventListener("dispose", o), a(M.texture, h.mapping);
        } else return null;
      }
    }
    return h;
  }
  function s(h) {
    if (h && h.isTexture) {
      const p = h.mapping, w = p === 303 || p === 304, M = p === 301 || p === 302;
      if (w || M) {
        let d = i.get(h);
        const f = d !== void 0 ? d.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== f)
          return n === null && (n = new is(e)), d = w ? n.fromEquirectangular(h, d) : n.fromCubemap(h, d), d.texture.pmremVersion = h.pmremVersion, i.set(h, d), d.texture;
        if (d !== void 0) return d.texture;
        {
          const C = h.image;
          return w && C && C.height > 0 || M && C && l(C) ? (n === null && (n = new is(e)), d = w ? n.fromEquirectangular(h) : n.fromCubemap(h), d.texture.pmremVersion = h.pmremVersion, i.set(h, d), h.addEventListener("dispose", c), d.texture) : null;
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
    const w = 6;
    for (let M = 0; M < w; M++) h[M] !== void 0 && p++;
    return p === w;
  }
  function o(h) {
    const p = h.target;
    p.removeEventListener("dispose", o);
    const w = t.get(p);
    w !== void 0 && (t.delete(p), w.dispose());
  }
  function c(h) {
    const p = h.target;
    p.removeEventListener("dispose", c);
    const w = i.get(p);
    w !== void 0 && (i.delete(p), w.dispose());
  }
  function u() {
    t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: u
  };
}
function _c(e) {
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
function Dc(e, t, i, n) {
  const r = {}, A = /* @__PURE__ */ new WeakMap();
  function s(u) {
    const h = u.target;
    h.index !== null && t.remove(h.index);
    for (const w in h.attributes) t.remove(h.attributes[w]);
    h.removeEventListener("dispose", s), delete r[h.id];
    const p = A.get(h);
    p && (t.remove(p), A.delete(h)), n.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, i.memory.geometries--;
  }
  function a(u, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", s), r[h.id] = !0, i.memory.geometries++), h;
  }
  function l(u) {
    const h = u.attributes;
    for (const p in h) t.update(h[p], e.ARRAY_BUFFER);
  }
  function o(u) {
    const h = [], p = u.index, w = u.attributes.position;
    let M = 0;
    if (w === void 0) return;
    if (p !== null) {
      const C = p.array;
      M = p.version;
      for (let x = 0, P = C.length; x < P; x += 3) {
        const D = C[x + 0], S = C[x + 1], B = C[x + 2];
        h.push(D, S, S, B, B, D);
      }
    } else {
      const C = w.array;
      M = w.version;
      for (let x = 0, P = C.length / 3 - 1; x < P; x += 3) {
        const D = x + 0, S = x + 1, B = x + 2;
        h.push(D, S, S, B, B, D);
      }
    }
    const d = new (w.count >= 65535 ? fa : ua)(h, 1);
    d.version = M;
    const f = A.get(u);
    f && t.remove(f), A.set(u, d);
  }
  function c(u) {
    const h = A.get(u);
    if (h) {
      const p = u.index;
      p !== null && h.version < p.version && o(u);
    } else o(u);
    return A.get(u);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: c
  };
}
function xc(e, t, i) {
  let n;
  function r(u) {
    n = u;
  }
  let A, s;
  function a(u) {
    A = u.type, s = u.bytesPerElement;
  }
  function l(u, h) {
    e.drawElements(n, h, A, u * s), i.update(h, n, 1);
  }
  function o(u, h, p) {
    p !== 0 && (e.drawElementsInstanced(n, h, A, u * s, p), i.update(h, n, p));
  }
  function c(u, h, p) {
    if (p === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, h, 0, A, u, 0, p);
    let w = 0;
    for (let M = 0; M < p; M++) w += h[M];
    i.update(w, n, 1);
  }
  this.setMode = r, this.setIndex = a, this.render = l, this.renderInstances = o, this.renderMultiDraw = c;
}
function Sc(e) {
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
  function n(A, s, a) {
    switch (i.calls++, s) {
      case e.TRIANGLES:
        i.triangles += a * (A / 3);
        break;
      case e.LINES:
        i.lines += a * (A / 2);
        break;
      case e.LINE_STRIP:
        i.lines += a * (A - 1);
        break;
      case e.LINE_LOOP:
        i.lines += a * A;
        break;
      case e.POINTS:
        i.points += a * A;
        break;
      default:
        Te("WebGLInfo: Unknown draw mode:", s);
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
function Cc(e, t, i) {
  const n = /* @__PURE__ */ new WeakMap(), r = new At();
  function A(s, a, l) {
    const o = s.morphTargetInfluences, c = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = c !== void 0 ? c.length : 0;
    let h = n.get(a);
    if (h === void 0 || h.count !== u) {
      let _ = function() {
        B.dispose(), n.delete(a), a.removeEventListener("dispose", _);
      };
      h !== void 0 && h.texture.dispose();
      const p = a.morphAttributes.position !== void 0, w = a.morphAttributes.normal !== void 0, M = a.morphAttributes.color !== void 0, d = a.morphAttributes.position || [], f = a.morphAttributes.normal || [], C = a.morphAttributes.color || [];
      let x = 0;
      p === !0 && (x = 1), w === !0 && (x = 2), M === !0 && (x = 3);
      let P = a.attributes.position.count * x, D = 1;
      P > t.maxTextureSize && (D = Math.ceil(P / t.maxTextureSize), P = t.maxTextureSize);
      const S = new Float32Array(P * D * 4 * u), B = new aa(S, P, D, u);
      B.type = mr, B.needsUpdate = !0;
      const g = x * 4;
      for (let W = 0; W < u; W++) {
        const y = d[W], H = f[W], G = C[W], k = P * D * 4 * W;
        for (let O = 0; O < y.count; O++) {
          const X = O * g;
          p === !0 && (r.fromBufferAttribute(y, O), S[k + X + 0] = r.x, S[k + X + 1] = r.y, S[k + X + 2] = r.z, S[k + X + 3] = 0), w === !0 && (r.fromBufferAttribute(H, O), S[k + X + 4] = r.x, S[k + X + 5] = r.y, S[k + X + 6] = r.z, S[k + X + 7] = 0), M === !0 && (r.fromBufferAttribute(G, O), S[k + X + 8] = r.x, S[k + X + 9] = r.y, S[k + X + 10] = r.z, S[k + X + 11] = G.itemSize === 4 ? r.w : 1);
        }
      }
      h = {
        count: u,
        texture: B,
        size: new Re(P, D)
      }, n.set(a, h), a.addEventListener("dispose", _);
    }
    if (s.isInstancedMesh === !0 && s.morphTexture !== null) l.getUniforms().setValue(e, "morphTexture", s.morphTexture, i);
    else {
      let p = 0;
      for (let M = 0; M < o.length; M++) p += o[M];
      const w = a.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(e, "morphTargetBaseInfluence", w), l.getUniforms().setValue(e, "morphTargetInfluences", o);
    }
    l.getUniforms().setValue(e, "morphTargetsTexture", h.texture, i), l.getUniforms().setValue(e, "morphTargetsTextureSize", h.size);
  }
  return { update: A };
}
function yc(e, t, i, n, r) {
  let A = /* @__PURE__ */ new WeakMap();
  function s(o) {
    const c = r.render.frame, u = o.geometry, h = t.get(o, u);
    if (A.get(h) !== c && (t.update(h), A.set(h, c)), o.isInstancedMesh && (o.hasEventListener("dispose", l) === !1 && o.addEventListener("dispose", l), A.get(o) !== c && (i.update(o.instanceMatrix, e.ARRAY_BUFFER), o.instanceColor !== null && i.update(o.instanceColor, e.ARRAY_BUFFER), A.set(o, c))), o.isSkinnedMesh) {
      const p = o.skeleton;
      A.get(p) !== c && (p.update(), A.set(p, c));
    }
    return h;
  }
  function a() {
    A = /* @__PURE__ */ new WeakMap();
  }
  function l(o) {
    const c = o.target;
    c.removeEventListener("dispose", l), n.releaseStatesOfObject(c), i.remove(c.instanceMatrix), c.instanceColor !== null && i.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
var Tc = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function Bc(e, t, i, n, r, A) {
  const s = new Kt(t, i, {
    type: e,
    depthBuffer: r,
    stencilBuffer: A,
    samples: n ? 4 : 0,
    depthTexture: r ? new An(t, i) : void 0
  }), a = new Kt(t, i, {
    type: Ii,
    depthBuffer: !1,
    stencilBuffer: !1
  }), l = new Ui();
  l.setAttribute("position", new li([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
  ], 3)), l.setAttribute("uv", new li([
    0,
    2,
    0,
    0,
    2,
    0
  ], 2));
  const o = new Rl({
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
  }), c = new Ft(l, o), u = new gr(-1, 1, 1, -1, 0, 1);
  let h = null, p = null, w = !1, M, d = null, f = [], C = !1;
  this.setSize = function(x, P) {
    s.setSize(x, P), a.setSize(x, P);
    for (let D = 0; D < f.length; D++) {
      const S = f[D];
      S.setSize && S.setSize(x, P);
    }
  }, this.setEffects = function(x) {
    f = x, C = f.length > 0 && f[0].isRenderPass === !0;
    const P = s.width, D = s.height;
    for (let S = 0; S < f.length; S++) {
      const B = f[S];
      B.setSize && B.setSize(P, D);
    }
  }, this.begin = function(x, P) {
    if (w || x.toneMapping === 0 && f.length === 0) return !1;
    if (d = P, P !== null) {
      const D = P.width, S = P.height;
      (s.width !== D || s.height !== S) && this.setSize(D, S);
    }
    return C === !1 && x.setRenderTarget(s), M = x.toneMapping, x.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return C;
  }, this.end = function(x, P) {
    x.toneMapping = M, w = !0;
    let D = s, S = a;
    for (let B = 0; B < f.length; B++) {
      const g = f[B];
      if (g.enabled !== !1 && (g.render(x, S, D, P), g.needsSwap !== !1)) {
        const _ = D;
        D = S, S = _;
      }
    }
    if (h !== x.outputColorSpace || p !== x.toneMapping) {
      h = x.outputColorSpace, p = x.toneMapping, o.defines = {}, Oe.getTransfer(h) === "srgb" && (o.defines.SRGB_TRANSFER = "");
      const B = Tc[p];
      B && (o.defines[B] = ""), o.needsUpdate = !0;
    }
    o.uniforms.tDiffuse.value = D.texture, x.setRenderTarget(d), x.render(c, u), d = null, w = !1;
  }, this.isCompositing = function() {
    return w;
  }, this.dispose = function() {
    s.depthTexture && s.depthTexture.dispose(), s.dispose(), a.dispose(), l.dispose(), o.dispose();
  };
}
var Ca = /* @__PURE__ */ new Qt(), aA = /* @__PURE__ */ new An(1, 1), ya = /* @__PURE__ */ new aa(), Ta = /* @__PURE__ */ new ol(), Ba = /* @__PURE__ */ new ma(), ss = [], as = [], os = new Float32Array(16), ls = new Float32Array(9), cs = new Float32Array(4);
function on(e, t, i) {
  const n = e[0];
  if (n <= 0 || n > 0) return e;
  const r = t * i;
  let A = ss[r];
  if (A === void 0 && (A = new Float32Array(r), ss[r] = A), t !== 0) {
    n.toArray(A, 0);
    for (let s = 1, a = 0; s !== t; ++s)
      a += i, e[s].toArray(A, a);
  }
  return A;
}
function ht(e, t) {
  if (e.length !== t.length) return !1;
  for (let i = 0, n = e.length; i < n; i++) if (e[i] !== t[i]) return !1;
  return !0;
}
function ut(e, t) {
  for (let i = 0, n = t.length; i < n; i++) e[i] = t[i];
}
function wr(e, t) {
  let i = as[t];
  i === void 0 && (i = new Int32Array(t), as[t] = i);
  for (let n = 0; n !== t; ++n) i[n] = e.allocateTextureUnit();
  return i;
}
function bc(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1f(this.addr, t), i[0] = t);
}
function Ic(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ht(i, t)) return;
    e.uniform2fv(this.addr, t), ut(i, t);
  }
}
function Rc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else if (t.r !== void 0)
    (i[0] !== t.r || i[1] !== t.g || i[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), i[0] = t.r, i[1] = t.g, i[2] = t.b);
  else {
    if (ht(i, t)) return;
    e.uniform3fv(this.addr, t), ut(i, t);
  }
}
function Lc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ht(i, t)) return;
    e.uniform4fv(this.addr, t), ut(i, t);
  }
}
function Uc(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ht(i, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), ut(i, t);
  } else {
    if (ht(i, n)) return;
    cs.set(n), e.uniformMatrix2fv(this.addr, !1, cs), ut(i, n);
  }
}
function Nc(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ht(i, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), ut(i, t);
  } else {
    if (ht(i, n)) return;
    ls.set(n), e.uniformMatrix3fv(this.addr, !1, ls), ut(i, n);
  }
}
function Fc(e, t) {
  const i = this.cache, n = t.elements;
  if (n === void 0) {
    if (ht(i, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), ut(i, t);
  } else {
    if (ht(i, n)) return;
    os.set(n), e.uniformMatrix4fv(this.addr, !1, os), ut(i, n);
  }
}
function Qc(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1i(this.addr, t), i[0] = t);
}
function Oc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ht(i, t)) return;
    e.uniform2iv(this.addr, t), ut(i, t);
  }
}
function Vc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ht(i, t)) return;
    e.uniform3iv(this.addr, t), ut(i, t);
  }
}
function zc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ht(i, t)) return;
    e.uniform4iv(this.addr, t), ut(i, t);
  }
}
function Hc(e, t) {
  const i = this.cache;
  i[0] !== t && (e.uniform1ui(this.addr, t), i[0] = t);
}
function kc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y);
  else {
    if (ht(i, t)) return;
    e.uniform2uiv(this.addr, t), ut(i, t);
  }
}
function Gc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z);
  else {
    if (ht(i, t)) return;
    e.uniform3uiv(this.addr, t), ut(i, t);
  }
}
function Wc(e, t) {
  const i = this.cache;
  if (t.x !== void 0)
    (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w);
  else {
    if (ht(i, t)) return;
    e.uniform4uiv(this.addr, t), ut(i, t);
  }
}
function Xc(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r);
  let A;
  this.type === e.SAMPLER_2D_SHADOW ? (aA.compareFunction = i.isReversedDepthBuffer() ? 518 : 515, A = aA) : A = Ca, i.setTexture2D(t || A, r);
}
function Yc(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture3D(t || Ta, r);
}
function qc(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTextureCube(t || Ba, r);
}
function Kc(e, t, i) {
  const n = this.cache, r = i.allocateTextureUnit();
  n[0] !== r && (e.uniform1i(this.addr, r), n[0] = r), i.setTexture2DArray(t || ya, r);
}
function Jc(e) {
  switch (e) {
    case 5126:
      return bc;
    case 35664:
      return Ic;
    case 35665:
      return Rc;
    case 35666:
      return Lc;
    case 35674:
      return Uc;
    case 35675:
      return Nc;
    case 35676:
      return Fc;
    case 5124:
    case 35670:
      return Qc;
    case 35667:
    case 35671:
      return Oc;
    case 35668:
    case 35672:
      return Vc;
    case 35669:
    case 35673:
      return zc;
    case 5125:
      return Hc;
    case 36294:
      return kc;
    case 36295:
      return Gc;
    case 36296:
      return Wc;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Xc;
    case 35679:
    case 36299:
    case 36307:
      return Yc;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return qc;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Kc;
  }
}
function Zc(e, t) {
  e.uniform1fv(this.addr, t);
}
function jc(e, t) {
  const i = on(t, this.size, 2);
  e.uniform2fv(this.addr, i);
}
function $c(e, t) {
  const i = on(t, this.size, 3);
  e.uniform3fv(this.addr, i);
}
function eh(e, t) {
  const i = on(t, this.size, 4);
  e.uniform4fv(this.addr, i);
}
function th(e, t) {
  const i = on(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, i);
}
function ih(e, t) {
  const i = on(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, i);
}
function nh(e, t) {
  const i = on(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, i);
}
function rh(e, t) {
  e.uniform1iv(this.addr, t);
}
function Ah(e, t) {
  e.uniform2iv(this.addr, t);
}
function sh(e, t) {
  e.uniform3iv(this.addr, t);
}
function ah(e, t) {
  e.uniform4iv(this.addr, t);
}
function oh(e, t) {
  e.uniform1uiv(this.addr, t);
}
function lh(e, t) {
  e.uniform2uiv(this.addr, t);
}
function ch(e, t) {
  e.uniform3uiv(this.addr, t);
}
function hh(e, t) {
  e.uniform4uiv(this.addr, t);
}
function uh(e, t, i) {
  const n = this.cache, r = t.length, A = wr(i, r);
  ht(n, A) || (e.uniform1iv(this.addr, A), ut(n, A));
  let s;
  this.type === e.SAMPLER_2D_SHADOW ? s = aA : s = Ca;
  for (let a = 0; a !== r; ++a) i.setTexture2D(t[a] || s, A[a]);
}
function fh(e, t, i) {
  const n = this.cache, r = t.length, A = wr(i, r);
  ht(n, A) || (e.uniform1iv(this.addr, A), ut(n, A));
  for (let s = 0; s !== r; ++s) i.setTexture3D(t[s] || Ta, A[s]);
}
function dh(e, t, i) {
  const n = this.cache, r = t.length, A = wr(i, r);
  ht(n, A) || (e.uniform1iv(this.addr, A), ut(n, A));
  for (let s = 0; s !== r; ++s) i.setTextureCube(t[s] || Ba, A[s]);
}
function ph(e, t, i) {
  const n = this.cache, r = t.length, A = wr(i, r);
  ht(n, A) || (e.uniform1iv(this.addr, A), ut(n, A));
  for (let s = 0; s !== r; ++s) i.setTexture2DArray(t[s] || ya, A[s]);
}
function mh(e) {
  switch (e) {
    case 5126:
      return Zc;
    case 35664:
      return jc;
    case 35665:
      return $c;
    case 35666:
      return eh;
    case 35674:
      return th;
    case 35675:
      return ih;
    case 35676:
      return nh;
    case 5124:
    case 35670:
      return rh;
    case 35667:
    case 35671:
      return Ah;
    case 35668:
    case 35672:
      return sh;
    case 35669:
    case 35673:
      return ah;
    case 5125:
      return oh;
    case 36294:
      return lh;
    case 36295:
      return ch;
    case 36296:
      return hh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return uh;
    case 35679:
    case 36299:
    case 36307:
      return fh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return dh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return ph;
  }
}
var gh = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = Jc(t.type);
  }
}, vh = class {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = mh(t.type);
  }
}, wh = class {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, i) {
    const n = this.seq;
    for (let r = 0, A = n.length; r !== A; ++r) {
      const s = n[r];
      s.setValue(e, t[s.id], i);
    }
  }
}, Zr = /(\w+)(\])?(\[|\.)?/g;
function hs(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function Eh(e, t, i) {
  const n = e.name, r = n.length;
  for (Zr.lastIndex = 0; ; ) {
    const A = Zr.exec(n), s = Zr.lastIndex;
    let a = A[1];
    const l = A[2] === "]", o = A[3];
    if (l && (a = a | 0), o === void 0 || o === "[" && s + 2 === r) {
      hs(i, o === void 0 ? new gh(a, e, t) : new vh(a, e, t));
      break;
    } else {
      let c = i.map[a];
      c === void 0 && (c = new wh(a), hs(i, c)), i = c;
    }
  }
}
var lr = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let A = 0; A < i; ++A) {
      const s = e.getActiveUniform(t, A);
      Eh(s, e.getUniformLocation(t, s.name), this);
    }
    const n = [], r = [];
    for (const A of this.seq) A.type === e.SAMPLER_2D_SHADOW || A.type === e.SAMPLER_CUBE_SHADOW || A.type === e.SAMPLER_2D_ARRAY_SHADOW ? n.push(A) : r.push(A);
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
    for (let r = 0, A = t.length; r !== A; ++r) {
      const s = t[r], a = i[s.id];
      a.needsUpdate !== !1 && s.setValue(e, a.value, n);
    }
  }
  static seqWithValue(e, t) {
    const i = [];
    for (let n = 0, r = e.length; n !== r; ++n) {
      const A = e[n];
      A.id in t && i.push(A);
    }
    return i;
  }
};
function us(e, t, i) {
  const n = e.createShader(t);
  return e.shaderSource(n, i), e.compileShader(n), n;
}
var Mh = 37297, Ph = 0;
function _h(e, t) {
  const i = e.split(`
`), n = [], r = Math.max(t - 6, 0), A = Math.min(t + 6, i.length);
  for (let s = r; s < A; s++) {
    const a = s + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${i[s]}`);
  }
  return n.join(`
`);
}
var fs = /* @__PURE__ */ new Ie();
function Dh(e) {
  Oe._getMatrix(fs, Oe.workingColorSpace, e);
  const t = `mat3( ${fs.elements.map((i) => i.toFixed(4))} )`;
  switch (Oe.getTransfer(e)) {
    case ur:
      return [t, "LinearTransferOETF"];
    case fr:
      return [t, "sRGBTransferOETF"];
    default:
      return De("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function ds(e, t, i) {
  const n = e.getShaderParameter(t, e.COMPILE_STATUS), r = (e.getShaderInfoLog(t) || "").trim();
  if (n && r === "") return "";
  const A = /ERROR: 0:(\d+)/.exec(r);
  if (A) {
    const s = parseInt(A[1]);
    return i.toUpperCase() + `

` + r + `

` + _h(e.getShaderSource(t), s);
  } else return r;
}
function xh(e, t) {
  const i = Dh(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
var Sh = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Ch(e, t) {
  const i = Sh[t];
  return i === void 0 ? (De("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }";
}
var Ar = /* @__PURE__ */ new Q();
function yh() {
  return Oe.getLuminanceCoefficients(Ar), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${Ar.x.toFixed(4)}, ${Ar.y.toFixed(4)}, ${Ar.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Th(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Mn).join(`
`);
}
function Bh(e) {
  const t = [];
  for (const i in e) {
    const n = e[i];
    n !== !1 && t.push("#define " + i + " " + n);
  }
  return t.join(`
`);
}
function bh(e, t) {
  const i = {}, n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const A = e.getActiveAttrib(t, r), s = A.name;
    let a = 1;
    A.type === e.FLOAT_MAT2 && (a = 2), A.type === e.FLOAT_MAT3 && (a = 3), A.type === e.FLOAT_MAT4 && (a = 4), i[s] = {
      type: A.type,
      location: e.getAttribLocation(t, s),
      locationSize: a
    };
  }
  return i;
}
function Mn(e) {
  return e !== "";
}
function ps(e, t) {
  const i = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, i).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function ms(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Ih = /^[ \t]*#include +<([\w\d./]+)>/gm;
function oA(e) {
  return e.replace(Ih, Lh);
}
var Rh = /* @__PURE__ */ new Map();
function Lh(e, t) {
  let i = Le[t];
  if (i === void 0) {
    const n = Rh.get(t);
    if (n !== void 0)
      i = Le[n], De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
  }
  return oA(i);
}
var Uh = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function gs(e) {
  return e.replace(Uh, Nh);
}
function Nh(e, t, i, n) {
  let r = "";
  for (let A = parseInt(t); A < parseInt(i); A++) r += n.replace(/\[\s*i\s*\]/g, "[ " + A + " ]").replace(/UNROLLED_LOOP_INDEX/g, A);
  return r;
}
function vs(e) {
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
var Fh = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function Qh(e) {
  return Fh[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var Oh = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function Vh(e) {
  return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Oh[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var zh = { 302: "ENVMAP_MODE_REFRACTION" };
function Hh(e) {
  return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : zh[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var kh = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function Gh(e) {
  return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : kh[e.combine] || "ENVMAP_BLENDING_NONE";
}
function Wh(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const i = Math.log2(t) - 2, n = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)),
    texelHeight: n,
    maxMip: i
  };
}
function Xh(e, t, i, n) {
  const r = e.getContext(), A = i.defines;
  let s = i.vertexShader, a = i.fragmentShader;
  const l = Qh(i), o = Vh(i), c = Hh(i), u = Gh(i), h = Wh(i), p = Th(i), w = Bh(A), M = r.createProgram();
  let d, f, C = i.glslVersion ? "#version " + i.glslVersion + `
` : "";
  i.isRawShaderMaterial ? (d = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    w
  ].filter(Mn).join(`
`), d.length > 0 && (d += `
`), f = [
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    w
  ].filter(Mn).join(`
`), f.length > 0 && (f += `
`)) : (d = [
    vs(i),
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    w,
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
    i.envMap ? "#define " + c : "",
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
    i.shadowMapEnabled ? "#define " + l : "",
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
`), f = [
    vs(i),
    "#define SHADER_TYPE " + i.shaderType,
    "#define SHADER_NAME " + i.shaderName,
    w,
    i.useFog && i.fog ? "#define USE_FOG" : "",
    i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "",
    i.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    i.map ? "#define USE_MAP" : "",
    i.matcap ? "#define USE_MATCAP" : "",
    i.envMap ? "#define USE_ENVMAP" : "",
    i.envMap ? "#define " + o : "",
    i.envMap ? "#define " + c : "",
    i.envMap ? "#define " + u : "",
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
    i.shadowMapEnabled ? "#define " + l : "",
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
    i.toneMapping !== 0 ? Le.tonemapping_pars_fragment : "",
    i.toneMapping !== 0 ? Ch("toneMapping", i.toneMapping) : "",
    i.dithering ? "#define DITHERING" : "",
    i.opaque ? "#define OPAQUE" : "",
    Le.colorspace_pars_fragment,
    xh("linearToOutputTexel", i.outputColorSpace),
    yh(),
    i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "",
    `
`
  ].filter(Mn).join(`
`)), s = oA(s), s = ps(s, i), s = ms(s, i), a = oA(a), a = ps(a, i), a = ms(a, i), s = gs(s), a = gs(a), i.isRawShaderMaterial !== !0 && (C = `#version 300 es
`, d = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + d, f = [
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
` + f);
  const x = C + d + s, P = C + f + a, D = us(r, r.VERTEX_SHADER, x), S = us(r, r.FRAGMENT_SHADER, P);
  r.attachShader(M, D), r.attachShader(M, S), i.index0AttributeName !== void 0 ? r.bindAttribLocation(M, 0, i.index0AttributeName) : i.hasPositionAttribute === !0 && r.bindAttribLocation(M, 0, "position"), r.linkProgram(M);
  function B(y) {
    if (e.debug.checkShaderErrors) {
      const H = r.getProgramInfoLog(M) || "", G = r.getShaderInfoLog(D) || "", k = r.getShaderInfoLog(S) || "", O = H.trim(), X = G.trim(), U = k.trim();
      let J = !0, ee = !0;
      if (r.getProgramParameter(M, r.LINK_STATUS) === !1)
        if (J = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(r, M, D, S);
        else {
          const te = ds(r, D, "vertex"), ce = ds(r, S, "fragment");
          Te("WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(M, r.VALIDATE_STATUS) + `

Material Name: ` + y.name + `
Material Type: ` + y.type + `

Program Info Log: ` + O + `
` + te + `
` + ce);
        }
      else O !== "" ? De("WebGLProgram: Program Info Log:", O) : (X === "" || U === "") && (ee = !1);
      ee && (y.diagnostics = {
        runnable: J,
        programLog: O,
        vertexShader: {
          log: X,
          prefix: d
        },
        fragmentShader: {
          log: U,
          prefix: f
        }
      });
    }
    r.deleteShader(D), r.deleteShader(S), g = new lr(r, M), _ = bh(r, M);
  }
  let g;
  this.getUniforms = function() {
    return g === void 0 && B(this), g;
  };
  let _;
  this.getAttributes = function() {
    return _ === void 0 && B(this), _;
  };
  let W = i.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return W === !1 && (W = r.getProgramParameter(M, Mh)), W;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(M), this.program = void 0;
  }, this.type = i.shaderType, this.name = i.shaderName, this.id = Ph++, this.cacheKey = t, this.usedTimes = 1, this.program = M, this.vertexShader = D, this.fragmentShader = S, this;
}
var Yh = 0, qh = class {
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
    return i === void 0 && (i = new Kh(e), t.set(e, i)), i;
  }
}, Kh = class {
  constructor(e) {
    this.id = Yh++, this.code = e, this.usedTimes = 0;
  }
};
function Jh(e) {
  return e === 1030 || e === 37490 || e === 36285;
}
function Zh(e, t, i, n, r, A) {
  const s = new ca(), a = new qh(), l = /* @__PURE__ */ new Set(), o = [], c = /* @__PURE__ */ new Map(), u = n.logarithmicDepthBuffer;
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
  function w(g) {
    return l.add(g), g === 0 ? "uv" : `uv${g}`;
  }
  function M(g, _, W, y, H, G) {
    const k = y.fog, O = H.geometry, X = g.isMeshStandardMaterial || g.isMeshLambertMaterial || g.isMeshPhongMaterial ? y.environment : null, U = g.isMeshStandardMaterial || g.isMeshLambertMaterial && !g.envMap || g.isMeshPhongMaterial && !g.envMap, J = t.get(g.envMap || X, U), ee = J && J.mapping === 306 ? J.image.height : null, te = p[g.type];
    g.precision !== null && (h = n.getMaxPrecision(g.precision), h !== g.precision && De("WebGLProgram.getParameters:", g.precision, "not supported, using", h, "instead."));
    const ce = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Ee = ce !== void 0 ? ce.length : 0;
    let We = 0;
    O.morphAttributes.position !== void 0 && (We = 1), O.morphAttributes.normal !== void 0 && (We = 2), O.morphAttributes.color !== void 0 && (We = 3);
    let qe, Y, re, ue;
    if (te) {
      const Se = qt[te];
      qe = Se.vertexShader, Y = Se.fragmentShader;
    } else {
      qe = g.vertexShader, Y = g.fragmentShader;
      const Se = a.getVertexShaderStage(g), Et = a.getFragmentShaderStage(g);
      a.update(g, Se, Et), re = Se.id, ue = Et.id;
    }
    const he = e.getRenderTarget(), xe = e.state.buffers.depth.getReversed(), Ce = H.isInstancedMesh === !0, Be = H.isBatchedMesh === !0, Xe = !!g.map, Qe = !!g.matcap, $e = !!J, pt = !!g.aoMap, xt = !!g.lightMap, Rt = !!g.bumpMap && g.wireframe === !1, et = !!g.normalMap, mt = !!g.displacementMap, ft = !!g.emissiveMap, lt = !!g.metalnessMap, I = !!g.roughnessMap, Lt = g.anisotropy > 0, Ye = g.clearcoat > 0, tt = g.dispersion > 0, E = g.iridescence > 0, m = g.sheen > 0, T = g.transmission > 0, z = Lt && !!g.anisotropyMap, K = Ye && !!g.clearcoatMap, ne = Ye && !!g.clearcoatNormalMap, ae = Ye && !!g.clearcoatRoughnessMap, R = E && !!g.iridescenceMap, ie = E && !!g.iridescenceThicknessMap, de = m && !!g.sheenColorMap, ve = m && !!g.sheenRoughnessMap, $ = !!g.specularMap, Me = !!g.specularColorMap, Pe = !!g.specularIntensityMap, be = T && !!g.transmissionMap, ze = T && !!g.thicknessMap, b = !!g.gradientMap, q = !!g.alphaMap, Z = g.alphaTest > 0, fe = !!g.alphaHash, ge = !!g.extensions;
    let j = 0;
    g.toneMapped && (he === null || he.isXRRenderTarget === !0) && (j = e.toneMapping);
    const oe = {
      shaderID: te,
      shaderType: g.type,
      shaderName: g.name,
      vertexShader: qe,
      fragmentShader: Y,
      defines: g.defines,
      customVertexShaderID: re,
      customFragmentShaderID: ue,
      isRawShaderMaterial: g.isRawShaderMaterial === !0,
      glslVersion: g.glslVersion,
      precision: h,
      batching: Be,
      batchingColor: Be && H._colorsTexture !== null,
      instancing: Ce,
      instancingColor: Ce && H.instanceColor !== null,
      instancingMorph: Ce && H.morphTexture !== null,
      outputColorSpace: he === null ? e.outputColorSpace : he.isXRRenderTarget === !0 ? he.texture.colorSpace : Oe.workingColorSpace,
      alphaToCoverage: !!g.alphaToCoverage,
      map: Xe,
      matcap: Qe,
      envMap: $e,
      envMapMode: $e && J.mapping,
      envMapCubeUVHeight: ee,
      aoMap: pt,
      lightMap: xt,
      bumpMap: Rt,
      normalMap: et,
      displacementMap: mt,
      emissiveMap: ft,
      normalMapObjectSpace: et && g.normalMapType === 1,
      normalMapTangentSpace: et && g.normalMapType === 0,
      packedNormalMap: et && g.normalMapType === 0 && Jh(g.normalMap.format),
      metalnessMap: lt,
      roughnessMap: I,
      anisotropy: Lt,
      anisotropyMap: z,
      clearcoat: Ye,
      clearcoatMap: K,
      clearcoatNormalMap: ne,
      clearcoatRoughnessMap: ae,
      dispersion: tt,
      iridescence: E,
      iridescenceMap: R,
      iridescenceThicknessMap: ie,
      sheen: m,
      sheenColorMap: de,
      sheenRoughnessMap: ve,
      specularMap: $,
      specularColorMap: Me,
      specularIntensityMap: Pe,
      transmission: T,
      transmissionMap: be,
      thicknessMap: ze,
      gradientMap: b,
      opaque: g.transparent === !1 && g.blending === 1 && g.alphaToCoverage === !1,
      alphaMap: q,
      alphaTest: Z,
      alphaHash: fe,
      combine: g.combine,
      mapUv: Xe && w(g.map.channel),
      aoMapUv: pt && w(g.aoMap.channel),
      lightMapUv: xt && w(g.lightMap.channel),
      bumpMapUv: Rt && w(g.bumpMap.channel),
      normalMapUv: et && w(g.normalMap.channel),
      displacementMapUv: mt && w(g.displacementMap.channel),
      emissiveMapUv: ft && w(g.emissiveMap.channel),
      metalnessMapUv: lt && w(g.metalnessMap.channel),
      roughnessMapUv: I && w(g.roughnessMap.channel),
      anisotropyMapUv: z && w(g.anisotropyMap.channel),
      clearcoatMapUv: K && w(g.clearcoatMap.channel),
      clearcoatNormalMapUv: ne && w(g.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ae && w(g.clearcoatRoughnessMap.channel),
      iridescenceMapUv: R && w(g.iridescenceMap.channel),
      iridescenceThicknessMapUv: ie && w(g.iridescenceThicknessMap.channel),
      sheenColorMapUv: de && w(g.sheenColorMap.channel),
      sheenRoughnessMapUv: ve && w(g.sheenRoughnessMap.channel),
      specularMapUv: $ && w(g.specularMap.channel),
      specularColorMapUv: Me && w(g.specularColorMap.channel),
      specularIntensityMapUv: Pe && w(g.specularIntensityMap.channel),
      transmissionMapUv: be && w(g.transmissionMap.channel),
      thicknessMapUv: ze && w(g.thicknessMap.channel),
      alphaMapUv: q && w(g.alphaMap.channel),
      vertexTangents: !!O.attributes.tangent && (et || Lt),
      vertexNormals: !!O.attributes.normal,
      vertexColors: g.vertexColors,
      vertexAlphas: g.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!O.attributes.uv && (Xe || q),
      fog: !!k,
      useFog: g.fog === !0,
      fogExp2: !!k && k.isFogExp2,
      flatShading: g.wireframe === !1 && (g.flatShading === !0 || O.attributes.normal === void 0 && et === !1 && (g.isMeshLambertMaterial || g.isMeshPhongMaterial || g.isMeshStandardMaterial || g.isMeshPhysicalMaterial)),
      sizeAttenuation: g.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reversedDepthBuffer: xe,
      skinning: H.isSkinnedMesh === !0,
      hasPositionAttribute: O.attributes.position !== void 0,
      morphTargets: O.morphAttributes.position !== void 0,
      morphNormals: O.morphAttributes.normal !== void 0,
      morphColors: O.morphAttributes.color !== void 0,
      morphTargetsCount: Ee,
      morphTextureStride: We,
      numDirLights: _.directional.length,
      numPointLights: _.point.length,
      numSpotLights: _.spot.length,
      numSpotLightMaps: _.spotLightMap.length,
      numRectAreaLights: _.rectArea.length,
      numHemiLights: _.hemi.length,
      numDirLightShadows: _.directionalShadowMap.length,
      numPointLightShadows: _.pointShadowMap.length,
      numSpotLightShadows: _.spotShadowMap.length,
      numSpotLightShadowsWithMaps: _.numSpotLightShadowsWithMaps,
      numLightProbes: _.numLightProbes,
      numLightProbeGrids: G.length,
      numClippingPlanes: A.numPlanes,
      numClipIntersection: A.numIntersection,
      dithering: g.dithering,
      shadowMapEnabled: e.shadowMap.enabled && W.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: j,
      decodeVideoTexture: Xe && g.map.isVideoTexture === !0 && Oe.getTransfer(g.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: ft && g.emissiveMap.isVideoTexture === !0 && Oe.getTransfer(g.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: g.premultipliedAlpha,
      doubleSided: g.side === 2,
      flipSided: g.side === 1,
      useDepthPacking: g.depthPacking >= 0,
      depthPacking: g.depthPacking || 0,
      index0AttributeName: g.index0AttributeName,
      extensionClipCullDistance: ge && g.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ge && g.extensions.multiDraw === !0 || Be) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: g.customProgramCacheKey()
    };
    return oe.vertexUv1s = l.has(1), oe.vertexUv2s = l.has(2), oe.vertexUv3s = l.has(3), l.clear(), oe;
  }
  function d(g) {
    const _ = [];
    if (g.shaderID ? _.push(g.shaderID) : (_.push(g.customVertexShaderID), _.push(g.customFragmentShaderID)), g.defines !== void 0) for (const W in g.defines)
      _.push(W), _.push(g.defines[W]);
    return g.isRawShaderMaterial === !1 && (f(_, g), C(_, g), _.push(e.outputColorSpace)), _.push(g.customProgramCacheKey), _.join();
  }
  function f(g, _) {
    g.push(_.precision), g.push(_.outputColorSpace), g.push(_.envMapMode), g.push(_.envMapCubeUVHeight), g.push(_.mapUv), g.push(_.alphaMapUv), g.push(_.lightMapUv), g.push(_.aoMapUv), g.push(_.bumpMapUv), g.push(_.normalMapUv), g.push(_.displacementMapUv), g.push(_.emissiveMapUv), g.push(_.metalnessMapUv), g.push(_.roughnessMapUv), g.push(_.anisotropyMapUv), g.push(_.clearcoatMapUv), g.push(_.clearcoatNormalMapUv), g.push(_.clearcoatRoughnessMapUv), g.push(_.iridescenceMapUv), g.push(_.iridescenceThicknessMapUv), g.push(_.sheenColorMapUv), g.push(_.sheenRoughnessMapUv), g.push(_.specularMapUv), g.push(_.specularColorMapUv), g.push(_.specularIntensityMapUv), g.push(_.transmissionMapUv), g.push(_.thicknessMapUv), g.push(_.combine), g.push(_.fogExp2), g.push(_.sizeAttenuation), g.push(_.morphTargetsCount), g.push(_.morphAttributeCount), g.push(_.numDirLights), g.push(_.numPointLights), g.push(_.numSpotLights), g.push(_.numSpotLightMaps), g.push(_.numHemiLights), g.push(_.numRectAreaLights), g.push(_.numDirLightShadows), g.push(_.numPointLightShadows), g.push(_.numSpotLightShadows), g.push(_.numSpotLightShadowsWithMaps), g.push(_.numLightProbes), g.push(_.shadowMapType), g.push(_.toneMapping), g.push(_.numClippingPlanes), g.push(_.numClipIntersection), g.push(_.depthPacking);
  }
  function C(g, _) {
    s.disableAll(), _.instancing && s.enable(0), _.instancingColor && s.enable(1), _.instancingMorph && s.enable(2), _.matcap && s.enable(3), _.envMap && s.enable(4), _.normalMapObjectSpace && s.enable(5), _.normalMapTangentSpace && s.enable(6), _.clearcoat && s.enable(7), _.iridescence && s.enable(8), _.alphaTest && s.enable(9), _.vertexColors && s.enable(10), _.vertexAlphas && s.enable(11), _.vertexUv1s && s.enable(12), _.vertexUv2s && s.enable(13), _.vertexUv3s && s.enable(14), _.vertexTangents && s.enable(15), _.anisotropy && s.enable(16), _.alphaHash && s.enable(17), _.batching && s.enable(18), _.dispersion && s.enable(19), _.batchingColor && s.enable(20), _.gradientMap && s.enable(21), _.packedNormalMap && s.enable(22), _.vertexNormals && s.enable(23), g.push(s.mask), s.disableAll(), _.fog && s.enable(0), _.useFog && s.enable(1), _.flatShading && s.enable(2), _.logarithmicDepthBuffer && s.enable(3), _.reversedDepthBuffer && s.enable(4), _.skinning && s.enable(5), _.morphTargets && s.enable(6), _.morphNormals && s.enable(7), _.morphColors && s.enable(8), _.premultipliedAlpha && s.enable(9), _.shadowMapEnabled && s.enable(10), _.doubleSided && s.enable(11), _.flipSided && s.enable(12), _.useDepthPacking && s.enable(13), _.dithering && s.enable(14), _.transmission && s.enable(15), _.sheen && s.enable(16), _.opaque && s.enable(17), _.pointsUvs && s.enable(18), _.decodeVideoTexture && s.enable(19), _.decodeVideoTextureEmissive && s.enable(20), _.alphaToCoverage && s.enable(21), _.numLightProbeGrids > 0 && s.enable(22), _.hasPositionAttribute && s.enable(23), g.push(s.mask);
  }
  function x(g) {
    const _ = p[g.type];
    let W;
    if (_) {
      const y = qt[_];
      W = Ma.clone(y.uniforms);
    } else W = g.uniforms;
    return W;
  }
  function P(g, _) {
    let W = c.get(_);
    return W !== void 0 ? ++W.usedTimes : (W = new Xh(e, _, g, r), o.push(W), c.set(_, W)), W;
  }
  function D(g) {
    if (--g.usedTimes === 0) {
      const _ = o.indexOf(g);
      o[_] = o[o.length - 1], o.pop(), c.delete(g.cacheKey), g.destroy();
    }
  }
  function S(g) {
    a.remove(g);
  }
  function B() {
    a.dispose();
  }
  return {
    getParameters: M,
    getProgramCacheKey: d,
    getUniforms: x,
    acquireProgram: P,
    releaseProgram: D,
    releaseShaderCache: S,
    programs: o,
    dispose: B
  };
}
function jh() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(s) {
    return e.has(s);
  }
  function i(s) {
    let a = e.get(s);
    return a === void 0 && (a = {}, e.set(s, a)), a;
  }
  function n(s) {
    e.delete(s);
  }
  function r(s, a, l) {
    e.get(s)[a] = l;
  }
  function A() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: i,
    remove: n,
    update: r,
    dispose: A
  };
}
function $h(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function ws(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function Es() {
  const e = [];
  let t = 0;
  const i = [], n = [], r = [];
  function A() {
    t = 0, i.length = 0, n.length = 0, r.length = 0;
  }
  function s(h) {
    let p = 0;
    return h.isInstancedMesh && (p += 2), h.isSkinnedMesh && (p += 1), p;
  }
  function a(h, p, w, M, d, f) {
    let C = e[t];
    return C === void 0 ? (C = {
      id: h.id,
      object: h,
      geometry: p,
      material: w,
      materialVariant: s(h),
      groupOrder: M,
      renderOrder: h.renderOrder,
      z: d,
      group: f
    }, e[t] = C) : (C.id = h.id, C.object = h, C.geometry = p, C.material = w, C.materialVariant = s(h), C.groupOrder = M, C.renderOrder = h.renderOrder, C.z = d, C.group = f), t++, C;
  }
  function l(h, p, w, M, d, f) {
    const C = a(h, p, w, M, d, f);
    w.transmission > 0 ? n.push(C) : w.transparent === !0 ? r.push(C) : i.push(C);
  }
  function o(h, p, w, M, d, f) {
    const C = a(h, p, w, M, d, f);
    w.transmission > 0 ? n.unshift(C) : w.transparent === !0 ? r.unshift(C) : i.unshift(C);
  }
  function c(h, p, w) {
    i.length > 1 && i.sort(h || $h), n.length > 1 && n.sort(p || ws), r.length > 1 && r.sort(p || ws), w && (i.reverse(), n.reverse(), r.reverse());
  }
  function u() {
    for (let h = t, p = e.length; h < p; h++) {
      const w = e[h];
      if (w.id === null) break;
      w.id = null, w.object = null, w.geometry = null, w.material = null, w.group = null;
    }
  }
  return {
    opaque: i,
    transmissive: n,
    transparent: r,
    init: A,
    push: l,
    unshift: o,
    finish: u,
    sort: c
  };
}
function eu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const A = e.get(n);
    let s;
    return A === void 0 ? (s = new Es(), e.set(n, [s])) : r >= A.length ? (s = new Es(), A.push(s)) : s = A[r], s;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
function tu() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let i;
    switch (t.type) {
      case "DirectionalLight":
        i = {
          direction: new Q(),
          color: new Ve()
        };
        break;
      case "SpotLight":
        i = {
          position: new Q(),
          direction: new Q(),
          color: new Ve(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        i = {
          position: new Q(),
          color: new Ve(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        i = {
          direction: new Q(),
          skyColor: new Ve(),
          groundColor: new Ve()
        };
        break;
      case "RectAreaLight":
        i = {
          color: new Ve(),
          position: new Q(),
          halfWidth: new Q(),
          halfHeight: new Q()
        };
        break;
    }
    return e[t.id] = i, i;
  } };
}
function iu() {
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
          shadowMapSize: new Re()
        };
        break;
      case "SpotLight":
        i = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Re()
        };
        break;
      case "PointLight":
        i = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Re(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return e[t.id] = i, i;
  } };
}
var nu = 0;
function ru(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function Au(e) {
  const t = new tu(), i = iu(), n = {
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
  for (let o = 0; o < 9; o++) n.probe.push(new Q());
  const r = new Q(), A = new at(), s = new at();
  function a(o) {
    let c = 0, u = 0, h = 0;
    for (let _ = 0; _ < 9; _++) n.probe[_].set(0, 0, 0);
    let p = 0, w = 0, M = 0, d = 0, f = 0, C = 0, x = 0, P = 0, D = 0, S = 0, B = 0;
    o.sort(ru);
    for (let _ = 0, W = o.length; _ < W; _++) {
      const y = o[_], H = y.color, G = y.intensity, k = y.distance;
      let O = null;
      if (y.shadow && y.shadow.map && (y.shadow.map.texture.format === 1030 ? O = y.shadow.map.texture : O = y.shadow.map.depthTexture || y.shadow.map.texture), y.isAmbientLight)
        c += H.r * G, u += H.g * G, h += H.b * G;
      else if (y.isLightProbe) {
        for (let X = 0; X < 9; X++) n.probe[X].addScaledVector(y.sh.coefficients[X], G);
        B++;
      } else if (y.isDirectionalLight) {
        const X = t.get(y);
        if (X.color.copy(y.color).multiplyScalar(y.intensity), y.castShadow) {
          const U = y.shadow, J = i.get(y);
          J.shadowIntensity = U.intensity, J.shadowBias = U.bias, J.shadowNormalBias = U.normalBias, J.shadowRadius = U.radius, J.shadowMapSize = U.mapSize, n.directionalShadow[p] = J, n.directionalShadowMap[p] = O, n.directionalShadowMatrix[p] = y.shadow.matrix, C++;
        }
        n.directional[p] = X, p++;
      } else if (y.isSpotLight) {
        const X = t.get(y);
        X.position.setFromMatrixPosition(y.matrixWorld), X.color.copy(H).multiplyScalar(G), X.distance = k, X.coneCos = Math.cos(y.angle), X.penumbraCos = Math.cos(y.angle * (1 - y.penumbra)), X.decay = y.decay, n.spot[M] = X;
        const U = y.shadow;
        if (y.map && (n.spotLightMap[D] = y.map, D++, U.updateMatrices(y), y.castShadow && S++), n.spotLightMatrix[M] = U.matrix, y.castShadow) {
          const J = i.get(y);
          J.shadowIntensity = U.intensity, J.shadowBias = U.bias, J.shadowNormalBias = U.normalBias, J.shadowRadius = U.radius, J.shadowMapSize = U.mapSize, n.spotShadow[M] = J, n.spotShadowMap[M] = O, P++;
        }
        M++;
      } else if (y.isRectAreaLight) {
        const X = t.get(y);
        X.color.copy(H).multiplyScalar(G), X.halfWidth.set(y.width * 0.5, 0, 0), X.halfHeight.set(0, y.height * 0.5, 0), n.rectArea[d] = X, d++;
      } else if (y.isPointLight) {
        const X = t.get(y);
        if (X.color.copy(y.color).multiplyScalar(y.intensity), X.distance = y.distance, X.decay = y.decay, y.castShadow) {
          const U = y.shadow, J = i.get(y);
          J.shadowIntensity = U.intensity, J.shadowBias = U.bias, J.shadowNormalBias = U.normalBias, J.shadowRadius = U.radius, J.shadowMapSize = U.mapSize, J.shadowCameraNear = U.camera.near, J.shadowCameraFar = U.camera.far, n.pointShadow[w] = J, n.pointShadowMap[w] = O, n.pointShadowMatrix[w] = y.shadow.matrix, x++;
        }
        n.point[w] = X, w++;
      } else if (y.isHemisphereLight) {
        const X = t.get(y);
        X.skyColor.copy(y.color).multiplyScalar(G), X.groundColor.copy(y.groundColor).multiplyScalar(G), n.hemi[f] = X, f++;
      }
    }
    d > 0 && (e.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = se.LTC_FLOAT_1, n.rectAreaLTC2 = se.LTC_FLOAT_2) : (n.rectAreaLTC1 = se.LTC_HALF_1, n.rectAreaLTC2 = se.LTC_HALF_2)), n.ambient[0] = c, n.ambient[1] = u, n.ambient[2] = h;
    const g = n.hash;
    (g.directionalLength !== p || g.pointLength !== w || g.spotLength !== M || g.rectAreaLength !== d || g.hemiLength !== f || g.numDirectionalShadows !== C || g.numPointShadows !== x || g.numSpotShadows !== P || g.numSpotMaps !== D || g.numLightProbes !== B) && (n.directional.length = p, n.spot.length = M, n.rectArea.length = d, n.point.length = w, n.hemi.length = f, n.directionalShadow.length = C, n.directionalShadowMap.length = C, n.pointShadow.length = x, n.pointShadowMap.length = x, n.spotShadow.length = P, n.spotShadowMap.length = P, n.directionalShadowMatrix.length = C, n.pointShadowMatrix.length = x, n.spotLightMatrix.length = P + D - S, n.spotLightMap.length = D, n.numSpotLightShadowsWithMaps = S, n.numLightProbes = B, g.directionalLength = p, g.pointLength = w, g.spotLength = M, g.rectAreaLength = d, g.hemiLength = f, g.numDirectionalShadows = C, g.numPointShadows = x, g.numSpotShadows = P, g.numSpotMaps = D, g.numLightProbes = B, n.version = nu++);
  }
  function l(o, c) {
    let u = 0, h = 0, p = 0, w = 0, M = 0;
    const d = c.matrixWorldInverse;
    for (let f = 0, C = o.length; f < C; f++) {
      const x = o[f];
      if (x.isDirectionalLight) {
        const P = n.directional[u];
        P.direction.setFromMatrixPosition(x.matrixWorld), r.setFromMatrixPosition(x.target.matrixWorld), P.direction.sub(r), P.direction.transformDirection(d), u++;
      } else if (x.isSpotLight) {
        const P = n.spot[p];
        P.position.setFromMatrixPosition(x.matrixWorld), P.position.applyMatrix4(d), P.direction.setFromMatrixPosition(x.matrixWorld), r.setFromMatrixPosition(x.target.matrixWorld), P.direction.sub(r), P.direction.transformDirection(d), p++;
      } else if (x.isRectAreaLight) {
        const P = n.rectArea[w];
        P.position.setFromMatrixPosition(x.matrixWorld), P.position.applyMatrix4(d), s.identity(), A.copy(x.matrixWorld), A.premultiply(d), s.extractRotation(A), P.halfWidth.set(x.width * 0.5, 0, 0), P.halfHeight.set(0, x.height * 0.5, 0), P.halfWidth.applyMatrix4(s), P.halfHeight.applyMatrix4(s), w++;
      } else if (x.isPointLight) {
        const P = n.point[h];
        P.position.setFromMatrixPosition(x.matrixWorld), P.position.applyMatrix4(d), h++;
      } else if (x.isHemisphereLight) {
        const P = n.hemi[M];
        P.direction.setFromMatrixPosition(x.matrixWorld), P.direction.transformDirection(d), M++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: n
  };
}
function Ms(e) {
  const t = new Au(e), i = [], n = [], r = [];
  function A(h) {
    u.camera = h, i.length = 0, n.length = 0, r.length = 0;
  }
  function s(h) {
    i.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function l(h) {
    r.push(h);
  }
  function o() {
    t.setup(i);
  }
  function c(h) {
    t.setupView(i, h);
  }
  const u = {
    lightsArray: i,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: A,
    state: u,
    setupLights: o,
    setupLightsView: c,
    pushLight: s,
    pushShadow: a,
    pushLightProbeGrid: l
  };
}
function su(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function i(r, A = 0) {
    const s = t.get(r);
    let a;
    return s === void 0 ? (a = new Ms(e), t.set(r, [a])) : A >= s.length ? (a = new Ms(e), s.push(a)) : a = s[A], a;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: n
  };
}
var au = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, ou = `uniform sampler2D shadow_pass;
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
}`, lu = [
  /* @__PURE__ */ new Q(1, 0, 0),
  /* @__PURE__ */ new Q(-1, 0, 0),
  /* @__PURE__ */ new Q(0, 1, 0),
  /* @__PURE__ */ new Q(0, -1, 0),
  /* @__PURE__ */ new Q(0, 0, 1),
  /* @__PURE__ */ new Q(0, 0, -1)
], cu = [
  /* @__PURE__ */ new Q(0, -1, 0),
  /* @__PURE__ */ new Q(0, -1, 0),
  /* @__PURE__ */ new Q(0, 0, 1),
  /* @__PURE__ */ new Q(0, 0, -1),
  /* @__PURE__ */ new Q(0, -1, 0),
  /* @__PURE__ */ new Q(0, -1, 0)
], Ps = /* @__PURE__ */ new at(), mn = /* @__PURE__ */ new Q(), jr = /* @__PURE__ */ new Q();
function hu(e, t, i) {
  let n = new uA();
  const r = new Re(), A = new Re(), s = new At(), a = new Ll(), l = new Ul(), o = {}, c = i.maxTextureSize, u = {
    0: 1,
    1: 0,
    2: 2
  }, h = new bt({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Re() },
      radius: { value: 4 }
    },
    vertexShader: au,
    fragmentShader: ou
  }), p = h.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const w = new Ui();
  w.setAttribute("position", new Jt(new Float32Array([
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
  const M = new Ft(w, h), d = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let f = this.type;
  this.render = function(S, B, g) {
    if (d.enabled === !1 || d.autoUpdate === !1 && d.needsUpdate === !1 || S.length === 0) return;
    this.type === 2 && (De("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const _ = e.getRenderTarget(), W = e.getActiveCubeFace(), y = e.getActiveMipmapLevel(), H = e.state;
    H.setBlending(0), H.buffers.depth.getReversed() === !0 ? H.buffers.color.setClear(0, 0, 0, 0) : H.buffers.color.setClear(1, 1, 1, 1), H.buffers.depth.setTest(!0), H.setScissorTest(!1);
    const G = f !== this.type;
    G && B.traverse(function(k) {
      k.material && (Array.isArray(k.material) ? k.material.forEach((O) => O.needsUpdate = !0) : k.material.needsUpdate = !0);
    });
    for (let k = 0, O = S.length; k < O; k++) {
      const X = S[k], U = X.shadow;
      if (U === void 0) {
        De("WebGLShadowMap:", X, "has no shadow.");
        continue;
      }
      if (U.autoUpdate === !1 && U.needsUpdate === !1) continue;
      r.copy(U.mapSize);
      const J = U.getFrameExtents();
      r.multiply(J), A.copy(U.mapSize), (r.x > c || r.y > c) && (r.x > c && (A.x = Math.floor(c / J.x), r.x = A.x * J.x, U.mapSize.x = A.x), r.y > c && (A.y = Math.floor(c / J.y), r.y = A.y * J.y, U.mapSize.y = A.y));
      const ee = e.state.buffers.depth.getReversed();
      if (U.camera._reversedDepth = ee, U.map === null || G === !0) {
        if (U.map !== null && (U.map.depthTexture !== null && (U.map.depthTexture.dispose(), U.map.depthTexture = null), U.map.dispose()), this.type === 3) {
          if (X.isPointLight) {
            De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          U.map = new Kt(r.x, r.y, {
            format: cr,
            type: Ii,
            minFilter: St,
            magFilter: St,
            generateMipmaps: !1
          }), U.map.texture.name = X.name + ".shadowMap", U.map.depthTexture = new An(r.x, r.y, mr), U.map.depthTexture.name = X.name + ".shadowMapDepth", U.map.depthTexture.format = Cn, U.map.depthTexture.compareFunction = null, U.map.depthTexture.minFilter = Dt, U.map.depthTexture.magFilter = Dt;
        } else
          X.isPointLight ? (U.map = new Sa(r.x), U.map.depthTexture = new yl(r.x, bi)) : (U.map = new Kt(r.x, r.y), U.map.depthTexture = new An(r.x, r.y, bi)), U.map.depthTexture.name = X.name + ".shadowMap", U.map.depthTexture.format = Cn, this.type === 1 ? (U.map.depthTexture.compareFunction = ee ? 518 : 515, U.map.depthTexture.minFilter = St, U.map.depthTexture.magFilter = St) : (U.map.depthTexture.compareFunction = null, U.map.depthTexture.minFilter = Dt, U.map.depthTexture.magFilter = Dt);
        U.camera.updateProjectionMatrix();
      }
      const te = U.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let ce = 0; ce < te; ce++) {
        if (U.map.isWebGLCubeRenderTarget)
          e.setRenderTarget(U.map, ce), e.clear();
        else {
          ce === 0 && (e.setRenderTarget(U.map), e.clear());
          const Ee = U.getViewport(ce);
          s.set(A.x * Ee.x, A.y * Ee.y, A.x * Ee.z, A.y * Ee.w), H.viewport(s);
        }
        if (X.isPointLight) {
          const Ee = U.camera, We = U.matrix, qe = X.distance || Ee.far;
          qe !== Ee.far && (Ee.far = qe, Ee.updateProjectionMatrix()), mn.setFromMatrixPosition(X.matrixWorld), Ee.position.copy(mn), jr.copy(Ee.position), jr.add(lu[ce]), Ee.up.copy(cu[ce]), Ee.lookAt(jr), Ee.updateMatrixWorld(), We.makeTranslation(-mn.x, -mn.y, -mn.z), Ps.multiplyMatrices(Ee.projectionMatrix, Ee.matrixWorldInverse), U._frustum.setFromProjectionMatrix(Ps, Ee.coordinateSystem, Ee.reversedDepth);
        } else U.updateMatrices(X);
        n = U.getFrustum(), P(B, g, U.camera, X, this.type);
      }
      U.isPointLightShadow !== !0 && this.type === 3 && C(U, g), U.needsUpdate = !1;
    }
    f = this.type, d.needsUpdate = !1, e.setRenderTarget(_, W, y);
  };
  function C(S, B) {
    const g = t.update(M);
    h.defines.VSM_SAMPLES !== S.blurSamples && (h.defines.VSM_SAMPLES = S.blurSamples, p.defines.VSM_SAMPLES = S.blurSamples, h.needsUpdate = !0, p.needsUpdate = !0), S.mapPass === null && (S.mapPass = new Kt(r.x, r.y, {
      format: cr,
      type: Ii
    })), h.uniforms.shadow_pass.value = S.map.depthTexture, h.uniforms.resolution.value = S.mapSize, h.uniforms.radius.value = S.radius, e.setRenderTarget(S.mapPass), e.clear(), e.renderBufferDirect(B, null, g, h, M, null), p.uniforms.shadow_pass.value = S.mapPass.texture, p.uniforms.resolution.value = S.mapSize, p.uniforms.radius.value = S.radius, e.setRenderTarget(S.map), e.clear(), e.renderBufferDirect(B, null, g, p, M, null);
  }
  function x(S, B, g, _) {
    let W = null;
    const y = g.isPointLight === !0 ? S.customDistanceMaterial : S.customDepthMaterial;
    if (y !== void 0) W = y;
    else if (W = g.isPointLight === !0 ? l : a, e.localClippingEnabled && B.clipShadows === !0 && Array.isArray(B.clippingPlanes) && B.clippingPlanes.length !== 0 || B.displacementMap && B.displacementScale !== 0 || B.alphaMap && B.alphaTest > 0 || B.map && B.alphaTest > 0 || B.alphaToCoverage === !0) {
      const H = W.uuid, G = B.uuid;
      let k = o[H];
      k === void 0 && (k = {}, o[H] = k);
      let O = k[G];
      O === void 0 && (O = W.clone(), k[G] = O, B.addEventListener("dispose", D)), W = O;
    }
    if (W.visible = B.visible, W.wireframe = B.wireframe, _ === 3 ? W.side = B.shadowSide !== null ? B.shadowSide : B.side : W.side = B.shadowSide !== null ? B.shadowSide : u[B.side], W.alphaMap = B.alphaMap, W.alphaTest = B.alphaToCoverage === !0 ? 0.5 : B.alphaTest, W.map = B.map, W.clipShadows = B.clipShadows, W.clippingPlanes = B.clippingPlanes, W.clipIntersection = B.clipIntersection, W.displacementMap = B.displacementMap, W.displacementScale = B.displacementScale, W.displacementBias = B.displacementBias, W.wireframeLinewidth = B.wireframeLinewidth, W.linewidth = B.linewidth, g.isPointLight === !0 && W.isMeshDistanceMaterial === !0) {
      const H = e.properties.get(W);
      H.light = g;
    }
    return W;
  }
  function P(S, B, g, _, W) {
    if (S.visible === !1) return;
    if (S.layers.test(B.layers) && (S.isMesh || S.isLine || S.isPoints) && (S.castShadow || S.receiveShadow && W === 3) && (!S.frustumCulled || n.intersectsObject(S))) {
      S.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, S.matrixWorld);
      const H = t.update(S), G = S.material;
      if (Array.isArray(G)) {
        const k = H.groups;
        for (let O = 0, X = k.length; O < X; O++) {
          const U = k[O], J = G[U.materialIndex];
          if (J && J.visible) {
            const ee = x(S, J, _, W);
            S.onBeforeShadow(e, S, B, g, H, ee, U), e.renderBufferDirect(g, null, H, ee, S, U), S.onAfterShadow(e, S, B, g, H, ee, U);
          }
        }
      } else if (G.visible) {
        const k = x(S, G, _, W);
        S.onBeforeShadow(e, S, B, g, H, k, null), e.renderBufferDirect(g, null, H, k, S, null), S.onAfterShadow(e, S, B, g, H, k, null);
      }
    }
    const y = S.children;
    for (let H = 0, G = y.length; H < G; H++) P(y[H], B, g, _, W);
  }
  function D(S) {
    S.target.removeEventListener("dispose", D);
    for (const B in o) {
      const g = o[B], _ = S.target.uuid;
      _ in g && (g[_].dispose(), delete g[_]);
    }
  }
}
function uu(e, t) {
  function i() {
    let b = !1;
    const q = new At();
    let Z = null;
    const fe = new At(0, 0, 0, 0);
    return {
      setMask: function(ge) {
        Z !== ge && !b && (e.colorMask(ge, ge, ge, ge), Z = ge);
      },
      setLocked: function(ge) {
        b = ge;
      },
      setClear: function(ge, j, oe, Se, Et) {
        Et === !0 && (ge *= Se, j *= Se, oe *= Se), q.set(ge, j, oe, Se), fe.equals(q) === !1 && (e.clearColor(ge, j, oe, Se), fe.copy(q));
      },
      reset: function() {
        b = !1, Z = null, fe.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let b = !1, q = !1, Z = null, fe = null, ge = null;
    return {
      setReversed: function(j) {
        if (q !== j) {
          const oe = t.get("EXT_clip_control");
          j ? oe.clipControlEXT(oe.LOWER_LEFT_EXT, oe.ZERO_TO_ONE_EXT) : oe.clipControlEXT(oe.LOWER_LEFT_EXT, oe.NEGATIVE_ONE_TO_ONE_EXT), q = j;
          const Se = ge;
          ge = null, this.setClear(Se);
        }
      },
      getReversed: function() {
        return q;
      },
      setTest: function(j) {
        j ? he(e.DEPTH_TEST) : xe(e.DEPTH_TEST);
      },
      setMask: function(j) {
        Z !== j && !b && (e.depthMask(j), Z = j);
      },
      setFunc: function(j) {
        if (q && (j = Vo[j]), fe !== j) {
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
        b = j;
      },
      setClear: function(j) {
        ge !== j && (ge = j, q && (j = 1 - j), e.clearDepth(j));
      },
      reset: function() {
        b = !1, Z = null, fe = null, ge = null, q = !1;
      }
    };
  }
  function r() {
    let b = !1, q = null, Z = null, fe = null, ge = null, j = null, oe = null, Se = null, Et = null;
    return {
      setTest: function(Ze) {
        b || (Ze ? he(e.STENCIL_TEST) : xe(e.STENCIL_TEST));
      },
      setMask: function(Ze) {
        q !== Ze && !b && (e.stencilMask(Ze), q = Ze);
      },
      setFunc: function(Ze, Gt, jt) {
        (Z !== Ze || fe !== Gt || ge !== jt) && (e.stencilFunc(Ze, Gt, jt), Z = Ze, fe = Gt, ge = jt);
      },
      setOp: function(Ze, Gt, jt) {
        (j !== Ze || oe !== Gt || Se !== jt) && (e.stencilOp(Ze, Gt, jt), j = Ze, oe = Gt, Se = jt);
      },
      setLocked: function(Ze) {
        b = Ze;
      },
      setClear: function(Ze) {
        Et !== Ze && (e.clearStencil(Ze), Et = Ze);
      },
      reset: function() {
        b = !1, q = null, Z = null, fe = null, ge = null, j = null, oe = null, Se = null, Et = null;
      }
    };
  }
  const A = new i(), s = new n(), a = new r(), l = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  let c = {}, u = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), w = [], M = null, d = !1, f = null, C = null, x = null, P = null, D = null, S = null, B = null, g = new Ve(0, 0, 0), _ = 0, W = !1, y = null, H = null, G = null, k = null, O = null;
  const X = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let U = !1, J = 0;
  const ee = e.getParameter(e.VERSION);
  ee.indexOf("WebGL") !== -1 ? (J = parseFloat(/^WebGL (\d)/.exec(ee)[1]), U = J >= 1) : ee.indexOf("OpenGL ES") !== -1 && (J = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), U = J >= 2);
  let te = null, ce = {};
  const Ee = e.getParameter(e.SCISSOR_BOX), We = e.getParameter(e.VIEWPORT), qe = new At().fromArray(Ee), Y = new At().fromArray(We);
  function re(b, q, Z, fe) {
    const ge = new Uint8Array(4), j = e.createTexture();
    e.bindTexture(b, j), e.texParameteri(b, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(b, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let oe = 0; oe < Z; oe++) b === e.TEXTURE_3D || b === e.TEXTURE_2D_ARRAY ? e.texImage3D(q, 0, e.RGBA, 1, 1, fe, 0, e.RGBA, e.UNSIGNED_BYTE, ge) : e.texImage2D(q + oe, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, ge);
    return j;
  }
  const ue = {};
  ue[e.TEXTURE_2D] = re(e.TEXTURE_2D, e.TEXTURE_2D, 1), ue[e.TEXTURE_CUBE_MAP] = re(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ue[e.TEXTURE_2D_ARRAY] = re(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), ue[e.TEXTURE_3D] = re(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), A.setClear(0, 0, 0, 1), s.setClear(1), a.setClear(0), he(e.DEPTH_TEST), s.setFunc(3), Rt(!1), et(1), he(e.CULL_FACE), pt(0);
  function he(b) {
    c[b] !== !0 && (e.enable(b), c[b] = !0);
  }
  function xe(b) {
    c[b] !== !1 && (e.disable(b), c[b] = !1);
  }
  function Ce(b, q) {
    return h[b] !== q ? (e.bindFramebuffer(b, q), h[b] = q, b === e.DRAW_FRAMEBUFFER && (h[e.FRAMEBUFFER] = q), b === e.FRAMEBUFFER && (h[e.DRAW_FRAMEBUFFER] = q), !0) : !1;
  }
  function Be(b, q) {
    let Z = w, fe = !1;
    if (b) {
      Z = p.get(q), Z === void 0 && (Z = [], p.set(q, Z));
      const ge = b.textures;
      if (Z.length !== ge.length || Z[0] !== e.COLOR_ATTACHMENT0) {
        for (let j = 0, oe = ge.length; j < oe; j++) Z[j] = e.COLOR_ATTACHMENT0 + j;
        Z.length = ge.length, fe = !0;
      }
    } else Z[0] !== e.BACK && (Z[0] = e.BACK, fe = !0);
    fe && e.drawBuffers(Z);
  }
  function Xe(b) {
    return M !== b ? (e.useProgram(b), M = b, !0) : !1;
  }
  const Qe = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  Qe[103] = e.MIN, Qe[104] = e.MAX;
  const $e = {
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
  function pt(b, q, Z, fe, ge, j, oe, Se, Et, Ze) {
    if (b === 0) {
      d === !0 && (xe(e.BLEND), d = !1);
      return;
    }
    if (d === !1 && (he(e.BLEND), d = !0), b !== 5) {
      if (b !== f || Ze !== W) {
        if ((C !== 100 || D !== 100) && (e.blendEquation(e.FUNC_ADD), C = 100, D = 100), Ze) switch (b) {
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
            Te("WebGLState: Invalid blending: ", b);
            break;
        }
        else switch (b) {
          case 1:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case 3:
            Te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case 4:
            Te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            Te("WebGLState: Invalid blending: ", b);
            break;
        }
        x = null, P = null, S = null, B = null, g.set(0, 0, 0), _ = 0, f = b, W = Ze;
      }
      return;
    }
    ge = ge || q, j = j || Z, oe = oe || fe, (q !== C || ge !== D) && (e.blendEquationSeparate(Qe[q], Qe[ge]), C = q, D = ge), (Z !== x || fe !== P || j !== S || oe !== B) && (e.blendFuncSeparate($e[Z], $e[fe], $e[j], $e[oe]), x = Z, P = fe, S = j, B = oe), (Se.equals(g) === !1 || Et !== _) && (e.blendColor(Se.r, Se.g, Se.b, Et), g.copy(Se), _ = Et), f = b, W = !1;
  }
  function xt(b, q) {
    b.side === 2 ? xe(e.CULL_FACE) : he(e.CULL_FACE);
    let Z = b.side === 1;
    q && (Z = !Z), Rt(Z), b.blending === 1 && b.transparent === !1 ? pt(0) : pt(b.blending, b.blendEquation, b.blendSrc, b.blendDst, b.blendEquationAlpha, b.blendSrcAlpha, b.blendDstAlpha, b.blendColor, b.blendAlpha, b.premultipliedAlpha), s.setFunc(b.depthFunc), s.setTest(b.depthTest), s.setMask(b.depthWrite), A.setMask(b.colorWrite);
    const fe = b.stencilWrite;
    a.setTest(fe), fe && (a.setMask(b.stencilWriteMask), a.setFunc(b.stencilFunc, b.stencilRef, b.stencilFuncMask), a.setOp(b.stencilFail, b.stencilZFail, b.stencilZPass)), ft(b.polygonOffset, b.polygonOffsetFactor, b.polygonOffsetUnits), b.alphaToCoverage === !0 ? he(e.SAMPLE_ALPHA_TO_COVERAGE) : xe(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Rt(b) {
    y !== b && (b ? e.frontFace(e.CW) : e.frontFace(e.CCW), y = b);
  }
  function et(b) {
    b !== 0 ? (he(e.CULL_FACE), b !== H && (b === 1 ? e.cullFace(e.BACK) : b === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : xe(e.CULL_FACE), H = b;
  }
  function mt(b) {
    b !== G && (U && e.lineWidth(b), G = b);
  }
  function ft(b, q, Z) {
    b ? (he(e.POLYGON_OFFSET_FILL), (k !== q || O !== Z) && (k = q, O = Z, s.getReversed() && (q = -q), e.polygonOffset(q, Z))) : xe(e.POLYGON_OFFSET_FILL);
  }
  function lt(b) {
    b ? he(e.SCISSOR_TEST) : xe(e.SCISSOR_TEST);
  }
  function I(b) {
    b === void 0 && (b = e.TEXTURE0 + X - 1), te !== b && (e.activeTexture(b), te = b);
  }
  function Lt(b, q, Z) {
    Z === void 0 && (te === null ? Z = e.TEXTURE0 + X - 1 : Z = te);
    let fe = ce[Z];
    fe === void 0 && (fe = {
      type: void 0,
      texture: void 0
    }, ce[Z] = fe), (fe.type !== b || fe.texture !== q) && (te !== Z && (e.activeTexture(Z), te = Z), e.bindTexture(b, q || ue[b]), fe.type = b, fe.texture = q);
  }
  function Ye() {
    const b = ce[te];
    b !== void 0 && b.type !== void 0 && (e.bindTexture(b.type, null), b.type = void 0, b.texture = void 0);
  }
  function tt() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function E() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function m() {
    try {
      e.texSubImage2D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function T() {
    try {
      e.texSubImage3D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function z() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function K() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function ne() {
    try {
      e.texStorage2D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function ae() {
    try {
      e.texStorage3D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function R() {
    try {
      e.texImage2D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function ie() {
    try {
      e.texImage3D(...arguments);
    } catch (b) {
      Te("WebGLState:", b);
    }
  }
  function de(b) {
    return u[b] !== void 0 ? u[b] : e.getParameter(b);
  }
  function ve(b, q) {
    u[b] !== q && (e.pixelStorei(b, q), u[b] = q);
  }
  function $(b) {
    qe.equals(b) === !1 && (e.scissor(b.x, b.y, b.z, b.w), qe.copy(b));
  }
  function Me(b) {
    Y.equals(b) === !1 && (e.viewport(b.x, b.y, b.z, b.w), Y.copy(b));
  }
  function Pe(b, q) {
    let Z = o.get(q);
    Z === void 0 && (Z = /* @__PURE__ */ new WeakMap(), o.set(q, Z));
    let fe = Z.get(b);
    fe === void 0 && (fe = e.getUniformBlockIndex(q, b.name), Z.set(b, fe));
  }
  function be(b, q) {
    const Z = o.get(q).get(b);
    l.get(q) !== Z && (e.uniformBlockBinding(q, Z, b.__bindingPointIndex), l.set(q, Z));
  }
  function ze() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), s.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), c = {}, u = {}, te = null, ce = {}, h = {}, p = /* @__PURE__ */ new WeakMap(), w = [], M = null, d = !1, f = null, C = null, x = null, P = null, D = null, S = null, B = null, g = new Ve(0, 0, 0), _ = 0, W = !1, y = null, H = null, G = null, k = null, O = null, qe.set(0, 0, e.canvas.width, e.canvas.height), Y.set(0, 0, e.canvas.width, e.canvas.height), A.reset(), s.reset(), a.reset();
  }
  return {
    buffers: {
      color: A,
      depth: s,
      stencil: a
    },
    enable: he,
    disable: xe,
    bindFramebuffer: Ce,
    drawBuffers: Be,
    useProgram: Xe,
    setBlending: pt,
    setMaterial: xt,
    setFlipSided: Rt,
    setCullFace: et,
    setLineWidth: mt,
    setPolygonOffset: ft,
    setScissorTest: lt,
    activeTexture: I,
    bindTexture: Lt,
    unbindTexture: Ye,
    compressedTexImage2D: tt,
    compressedTexImage3D: E,
    texImage2D: R,
    texImage3D: ie,
    pixelStorei: ve,
    getParameter: de,
    updateUBOMapping: Pe,
    uniformBlockBinding: be,
    texStorage2D: ne,
    texStorage3D: ae,
    texSubImage2D: m,
    texSubImage3D: T,
    compressedTexSubImage2D: z,
    compressedTexSubImage3D: K,
    scissor: $,
    viewport: Me,
    reset: ze
  };
}
function fu(e, t, i, n, r, A, s) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), o = new Re(), c = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set();
  let h;
  const p = /* @__PURE__ */ new WeakMap();
  let w = !1;
  try {
    w = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function M(E, m) {
    return w ? new OffscreenCanvas(E, m) : dr("canvas");
  }
  function d(E, m, T) {
    let z = 1;
    const K = tt(E);
    if ((K.width > T || K.height > T) && (z = T / Math.max(K.width, K.height)), z < 1) if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
      const ne = Math.floor(z * K.width), ae = Math.floor(z * K.height);
      h === void 0 && (h = M(ne, ae));
      const R = m ? M(ne, ae) : h;
      return R.width = ne, R.height = ae, R.getContext("2d").drawImage(E, 0, 0, ne, ae), De("WebGLRenderer: Texture has been resized from (" + K.width + "x" + K.height + ") to (" + ne + "x" + ae + ")."), R;
    } else
      return "data" in E && De("WebGLRenderer: Image in DataTexture is too big (" + K.width + "x" + K.height + ")."), E;
    return E;
  }
  function f(E) {
    return E.generateMipmaps;
  }
  function C(E) {
    e.generateMipmap(E);
  }
  function x(E) {
    return E.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? e.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function P(E, m, T, z, K, ne = !1) {
    if (E !== null) {
      if (e[E] !== void 0) return e[E];
      De("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let ae;
    z && (ae = t.get("EXT_texture_norm16"), ae || De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let R = m;
    if (m === e.RED && (T === e.FLOAT && (R = e.R32F), T === e.HALF_FLOAT && (R = e.R16F), T === e.UNSIGNED_BYTE && (R = e.R8), T === e.UNSIGNED_SHORT && ae && (R = ae.R16_EXT), T === e.SHORT && ae && (R = ae.R16_SNORM_EXT)), m === e.RED_INTEGER && (T === e.UNSIGNED_BYTE && (R = e.R8UI), T === e.UNSIGNED_SHORT && (R = e.R16UI), T === e.UNSIGNED_INT && (R = e.R32UI), T === e.BYTE && (R = e.R8I), T === e.SHORT && (R = e.R16I), T === e.INT && (R = e.R32I)), m === e.RG && (T === e.FLOAT && (R = e.RG32F), T === e.HALF_FLOAT && (R = e.RG16F), T === e.UNSIGNED_BYTE && (R = e.RG8), T === e.UNSIGNED_SHORT && ae && (R = ae.RG16_EXT), T === e.SHORT && ae && (R = ae.RG16_SNORM_EXT)), m === e.RG_INTEGER && (T === e.UNSIGNED_BYTE && (R = e.RG8UI), T === e.UNSIGNED_SHORT && (R = e.RG16UI), T === e.UNSIGNED_INT && (R = e.RG32UI), T === e.BYTE && (R = e.RG8I), T === e.SHORT && (R = e.RG16I), T === e.INT && (R = e.RG32I)), m === e.RGB_INTEGER && (T === e.UNSIGNED_BYTE && (R = e.RGB8UI), T === e.UNSIGNED_SHORT && (R = e.RGB16UI), T === e.UNSIGNED_INT && (R = e.RGB32UI), T === e.BYTE && (R = e.RGB8I), T === e.SHORT && (R = e.RGB16I), T === e.INT && (R = e.RGB32I)), m === e.RGBA_INTEGER && (T === e.UNSIGNED_BYTE && (R = e.RGBA8UI), T === e.UNSIGNED_SHORT && (R = e.RGBA16UI), T === e.UNSIGNED_INT && (R = e.RGBA32UI), T === e.BYTE && (R = e.RGBA8I), T === e.SHORT && (R = e.RGBA16I), T === e.INT && (R = e.RGBA32I)), m === e.RGB && (T === e.UNSIGNED_SHORT && ae && (R = ae.RGB16_EXT), T === e.SHORT && ae && (R = ae.RGB16_SNORM_EXT), T === e.UNSIGNED_INT_5_9_9_9_REV && (R = e.RGB9_E5), T === e.UNSIGNED_INT_10F_11F_11F_REV && (R = e.R11F_G11F_B10F)), m === e.RGBA) {
      const ie = ne ? ur : Oe.getTransfer(K);
      T === e.FLOAT && (R = e.RGBA32F), T === e.HALF_FLOAT && (R = e.RGBA16F), T === e.UNSIGNED_BYTE && (R = ie === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), T === e.UNSIGNED_SHORT && ae && (R = ae.RGBA16_EXT), T === e.SHORT && ae && (R = ae.RGBA16_SNORM_EXT), T === e.UNSIGNED_SHORT_4_4_4_4 && (R = e.RGBA4), T === e.UNSIGNED_SHORT_5_5_5_1 && (R = e.RGB5_A1);
    }
    return (R === e.R16F || R === e.R32F || R === e.RG16F || R === e.RG32F || R === e.RGBA16F || R === e.RGBA32F) && t.get("EXT_color_buffer_float"), R;
  }
  function D(E, m) {
    let T;
    return E ? m === null || m === 1014 || m === 1020 ? T = e.DEPTH24_STENCIL8 : m === 1015 ? T = e.DEPTH32F_STENCIL8 : m === 1012 && (T = e.DEPTH24_STENCIL8, De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : m === null || m === 1014 || m === 1020 ? T = e.DEPTH_COMPONENT24 : m === 1015 ? T = e.DEPTH_COMPONENT32F : m === 1012 && (T = e.DEPTH_COMPONENT16), T;
  }
  function S(E, m) {
    return f(E) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(m.width, m.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? m.mipmaps.length : 1;
  }
  function B(E) {
    const m = E.target;
    m.removeEventListener("dispose", B), _(m), m.isVideoTexture && c.delete(m), m.isHTMLTexture && u.delete(m);
  }
  function g(E) {
    const m = E.target;
    m.removeEventListener("dispose", g), y(m);
  }
  function _(E) {
    const m = n.get(E);
    if (m.__webglInit === void 0) return;
    const T = E.source, z = p.get(T);
    if (z) {
      const K = z[m.__cacheKey];
      K.usedTimes--, K.usedTimes === 0 && W(E), Object.keys(z).length === 0 && p.delete(T);
    }
    n.remove(E);
  }
  function W(E) {
    const m = n.get(E);
    e.deleteTexture(m.__webglTexture);
    const T = E.source, z = p.get(T);
    delete z[m.__cacheKey], s.memory.textures--;
  }
  function y(E) {
    const m = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget) for (let z = 0; z < 6; z++) {
      if (Array.isArray(m.__webglFramebuffer[z])) for (let K = 0; K < m.__webglFramebuffer[z].length; K++) e.deleteFramebuffer(m.__webglFramebuffer[z][K]);
      else e.deleteFramebuffer(m.__webglFramebuffer[z]);
      m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer[z]);
    }
    else {
      if (Array.isArray(m.__webglFramebuffer)) for (let z = 0; z < m.__webglFramebuffer.length; z++) e.deleteFramebuffer(m.__webglFramebuffer[z]);
      else e.deleteFramebuffer(m.__webglFramebuffer);
      if (m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer), m.__webglMultisampledFramebuffer && e.deleteFramebuffer(m.__webglMultisampledFramebuffer), m.__webglColorRenderbuffer)
        for (let z = 0; z < m.__webglColorRenderbuffer.length; z++) m.__webglColorRenderbuffer[z] && e.deleteRenderbuffer(m.__webglColorRenderbuffer[z]);
      m.__webglDepthRenderbuffer && e.deleteRenderbuffer(m.__webglDepthRenderbuffer);
    }
    const T = E.textures;
    for (let z = 0, K = T.length; z < K; z++) {
      const ne = n.get(T[z]);
      ne.__webglTexture && (e.deleteTexture(ne.__webglTexture), s.memory.textures--), n.remove(T[z]);
    }
    n.remove(E);
  }
  let H = 0;
  function G() {
    H = 0;
  }
  function k() {
    return H;
  }
  function O(E) {
    H = E;
  }
  function X() {
    const E = H;
    return E >= r.maxTextures && De("WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), H += 1, E;
  }
  function U(E) {
    const m = [];
    return m.push(E.wrapS), m.push(E.wrapT), m.push(E.wrapR || 0), m.push(E.magFilter), m.push(E.minFilter), m.push(E.anisotropy), m.push(E.internalFormat), m.push(E.format), m.push(E.type), m.push(E.generateMipmaps), m.push(E.premultiplyAlpha), m.push(E.flipY), m.push(E.unpackAlignment), m.push(E.colorSpace), m.join();
  }
  function J(E, m) {
    const T = n.get(E);
    if (E.isVideoTexture && Lt(E), E.isRenderTargetTexture === !1 && E.isExternalTexture !== !0 && E.version > 0 && T.__version !== E.version) {
      const z = E.image;
      if (z === null) De("WebGLRenderer: Texture marked for update but no image data found.");
      else if (z.complete === !1) De("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        xe(T, E, m);
        return;
      }
    } else E.isExternalTexture && (T.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D, T.__webglTexture, e.TEXTURE0 + m);
  }
  function ee(E, m) {
    const T = n.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && T.__version !== E.version) {
      xe(T, E, m);
      return;
    } else E.isExternalTexture && (T.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    i.bindTexture(e.TEXTURE_2D_ARRAY, T.__webglTexture, e.TEXTURE0 + m);
  }
  function te(E, m) {
    const T = n.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && T.__version !== E.version) {
      xe(T, E, m);
      return;
    }
    i.bindTexture(e.TEXTURE_3D, T.__webglTexture, e.TEXTURE0 + m);
  }
  function ce(E, m) {
    const T = n.get(E);
    if (E.isCubeDepthTexture !== !0 && E.version > 0 && T.__version !== E.version) {
      Ce(T, E, m);
      return;
    }
    i.bindTexture(e.TEXTURE_CUBE_MAP, T.__webglTexture, e.TEXTURE0 + m);
  }
  const Ee = {
    [nA]: e.REPEAT,
    [ai]: e.CLAMP_TO_EDGE,
    [rA]: e.MIRRORED_REPEAT
  }, We = {
    [Dt]: e.NEAREST,
    [Va]: e.NEAREST_MIPMAP_NEAREST,
    [za]: e.NEAREST_MIPMAP_LINEAR,
    [St]: e.LINEAR,
    [Ha]: e.LINEAR_MIPMAP_NEAREST,
    [pr]: e.LINEAR_MIPMAP_LINEAR
  }, qe = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function Y(E, m) {
    if (m.type === 1015 && t.has("OES_texture_float_linear") === !1 && (m.magFilter === 1006 || m.magFilter === 1007 || m.magFilter === 1005 || m.magFilter === 1008 || m.minFilter === 1006 || m.minFilter === 1007 || m.minFilter === 1005 || m.minFilter === 1008) && De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(E, e.TEXTURE_WRAP_S, Ee[m.wrapS]), e.texParameteri(E, e.TEXTURE_WRAP_T, Ee[m.wrapT]), (E === e.TEXTURE_3D || E === e.TEXTURE_2D_ARRAY) && e.texParameteri(E, e.TEXTURE_WRAP_R, Ee[m.wrapR]), e.texParameteri(E, e.TEXTURE_MAG_FILTER, We[m.magFilter]), e.texParameteri(E, e.TEXTURE_MIN_FILTER, We[m.minFilter]), m.compareFunction && (e.texParameteri(E, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(E, e.TEXTURE_COMPARE_FUNC, qe[m.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (m.magFilter === 1003 || m.minFilter !== 1005 && m.minFilter !== 1008 || m.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (m.anisotropy > 1 || n.get(m).__currentAnisotropy) {
        const T = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(E, T.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(m.anisotropy, r.getMaxAnisotropy())), n.get(m).__currentAnisotropy = m.anisotropy;
      }
    }
  }
  function re(E, m) {
    let T = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, m.addEventListener("dispose", B));
    const z = m.source;
    let K = p.get(z);
    K === void 0 && (K = {}, p.set(z, K));
    const ne = U(m);
    if (ne !== E.__cacheKey) {
      K[ne] === void 0 && (K[ne] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, s.memory.textures++, T = !0), K[ne].usedTimes++;
      const ae = K[E.__cacheKey];
      ae !== void 0 && (K[E.__cacheKey].usedTimes--, ae.usedTimes === 0 && W(m)), E.__cacheKey = ne, E.__webglTexture = K[ne].texture;
    }
    return T;
  }
  function ue(E, m, T) {
    return Math.floor(Math.floor(E / T) / m);
  }
  function he(E, m, T, z) {
    const ne = E.updateRanges;
    if (ne.length === 0) i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, m.width, m.height, T, z, m.data);
    else {
      ne.sort((ve, $) => ve.start - $.start);
      let ae = 0;
      for (let ve = 1; ve < ne.length; ve++) {
        const $ = ne[ae], Me = ne[ve], Pe = $.start + $.count, be = ue(Me.start, m.width, 4), ze = ue($.start, m.width, 4);
        Me.start <= Pe + 1 && be === ze && ue(Me.start + Me.count - 1, m.width, 4) === be ? $.count = Math.max($.count, Me.start + Me.count - $.start) : (++ae, ne[ae] = Me);
      }
      ne.length = ae + 1;
      const R = i.getParameter(e.UNPACK_ROW_LENGTH), ie = i.getParameter(e.UNPACK_SKIP_PIXELS), de = i.getParameter(e.UNPACK_SKIP_ROWS);
      i.pixelStorei(e.UNPACK_ROW_LENGTH, m.width);
      for (let ve = 0, $ = ne.length; ve < $; ve++) {
        const Me = ne[ve], Pe = Math.floor(Me.start / 4), be = Math.ceil(Me.count / 4), ze = Pe % m.width, b = Math.floor(Pe / m.width), q = be, Z = 1;
        i.pixelStorei(e.UNPACK_SKIP_PIXELS, ze), i.pixelStorei(e.UNPACK_SKIP_ROWS, b), i.texSubImage2D(e.TEXTURE_2D, 0, ze, b, q, Z, T, z, m.data);
      }
      E.clearUpdateRanges(), i.pixelStorei(e.UNPACK_ROW_LENGTH, R), i.pixelStorei(e.UNPACK_SKIP_PIXELS, ie), i.pixelStorei(e.UNPACK_SKIP_ROWS, de);
    }
  }
  function xe(E, m, T) {
    let z = e.TEXTURE_2D;
    (m.isDataArrayTexture || m.isCompressedArrayTexture) && (z = e.TEXTURE_2D_ARRAY), m.isData3DTexture && (z = e.TEXTURE_3D);
    const K = re(E, m), ne = m.source;
    i.bindTexture(z, E.__webglTexture, e.TEXTURE0 + T);
    const ae = n.get(ne);
    if (ne.version !== ae.__version || K === !0) {
      if (i.activeTexture(e.TEXTURE0 + T), !(typeof ImageBitmap < "u" && m.image instanceof ImageBitmap)) {
        const q = Oe.getPrimaries(Oe.workingColorSpace), Z = m.colorSpace === "" ? null : Oe.getPrimaries(m.colorSpace), fe = m.colorSpace === "" || q === Z ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, fe);
      }
      i.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment);
      let R = d(m.image, !1, r.maxTextureSize);
      R = Ye(m, R);
      const ie = A.convert(m.format, m.colorSpace), de = A.convert(m.type);
      let ve = P(m.internalFormat, ie, de, m.normalized, m.colorSpace, m.isVideoTexture);
      Y(z, m);
      let $;
      const Me = m.mipmaps, Pe = m.isVideoTexture !== !0, be = ae.__version === void 0 || K === !0, ze = ne.dataReady, b = S(m, R);
      if (m.isDepthTexture)
        ve = D(m.format === ia, m.type), be && (Pe ? i.texStorage2D(e.TEXTURE_2D, 1, ve, R.width, R.height) : i.texImage2D(e.TEXTURE_2D, 0, ve, R.width, R.height, 0, ie, de, null));
      else if (m.isDataTexture) if (Me.length > 0) {
        Pe && be && i.texStorage2D(e.TEXTURE_2D, b, ve, Me[0].width, Me[0].height);
        for (let q = 0, Z = Me.length; q < Z; q++)
          $ = Me[q], Pe ? ze && i.texSubImage2D(e.TEXTURE_2D, q, 0, 0, $.width, $.height, ie, de, $.data) : i.texImage2D(e.TEXTURE_2D, q, ve, $.width, $.height, 0, ie, de, $.data);
        m.generateMipmaps = !1;
      } else Pe ? (be && i.texStorage2D(e.TEXTURE_2D, b, ve, R.width, R.height), ze && he(m, R, ie, de)) : i.texImage2D(e.TEXTURE_2D, 0, ve, R.width, R.height, 0, ie, de, R.data);
      else if (m.isCompressedTexture) if (m.isCompressedArrayTexture) {
        Pe && be && i.texStorage3D(e.TEXTURE_2D_ARRAY, b, ve, Me[0].width, Me[0].height, R.depth);
        for (let q = 0, Z = Me.length; q < Z; q++)
          if ($ = Me[q], m.format !== 1023) if (ie !== null) if (Pe) {
            if (ze) if (m.layerUpdates.size > 0) {
              const fe = $A($.width, $.height, m.format, m.type);
              for (const ge of m.layerUpdates) {
                const j = $.data.subarray(ge * fe / $.data.BYTES_PER_ELEMENT, (ge + 1) * fe / $.data.BYTES_PER_ELEMENT);
                i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, q, 0, 0, ge, $.width, $.height, 1, ie, j);
              }
              m.clearLayerUpdates();
            } else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, q, 0, 0, 0, $.width, $.height, R.depth, ie, $.data);
          } else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY, q, ve, $.width, $.height, R.depth, 0, $.data, 0, 0);
          else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else Pe ? ze && i.texSubImage3D(e.TEXTURE_2D_ARRAY, q, 0, 0, 0, $.width, $.height, R.depth, ie, de, $.data) : i.texImage3D(e.TEXTURE_2D_ARRAY, q, ve, $.width, $.height, R.depth, 0, ie, de, $.data);
      } else {
        Pe && be && i.texStorage2D(e.TEXTURE_2D, b, ve, Me[0].width, Me[0].height);
        for (let q = 0, Z = Me.length; q < Z; q++)
          $ = Me[q], m.format !== 1023 ? ie !== null ? Pe ? ze && i.compressedTexSubImage2D(e.TEXTURE_2D, q, 0, 0, $.width, $.height, ie, $.data) : i.compressedTexImage2D(e.TEXTURE_2D, q, ve, $.width, $.height, 0, $.data) : De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Pe ? ze && i.texSubImage2D(e.TEXTURE_2D, q, 0, 0, $.width, $.height, ie, de, $.data) : i.texImage2D(e.TEXTURE_2D, q, ve, $.width, $.height, 0, ie, de, $.data);
      }
      else if (m.isDataArrayTexture) if (Pe) {
        if (be && i.texStorage3D(e.TEXTURE_2D_ARRAY, b, ve, R.width, R.height, R.depth), ze) if (m.layerUpdates.size > 0) {
          const q = $A(R.width, R.height, m.format, m.type);
          for (const Z of m.layerUpdates) {
            const fe = R.data.subarray(Z * q / R.data.BYTES_PER_ELEMENT, (Z + 1) * q / R.data.BYTES_PER_ELEMENT);
            i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, Z, R.width, R.height, 1, ie, de, fe);
          }
          m.clearLayerUpdates();
        } else i.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, R.width, R.height, R.depth, ie, de, R.data);
      } else i.texImage3D(e.TEXTURE_2D_ARRAY, 0, ve, R.width, R.height, R.depth, 0, ie, de, R.data);
      else if (m.isData3DTexture) Pe ? (be && i.texStorage3D(e.TEXTURE_3D, b, ve, R.width, R.height, R.depth), ze && i.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, R.width, R.height, R.depth, ie, de, R.data)) : i.texImage3D(e.TEXTURE_3D, 0, ve, R.width, R.height, R.depth, 0, ie, de, R.data);
      else if (m.isFramebufferTexture) {
        if (be) if (Pe) i.texStorage2D(e.TEXTURE_2D, b, ve, R.width, R.height);
        else {
          let q = R.width, Z = R.height;
          for (let fe = 0; fe < b; fe++)
            i.texImage2D(e.TEXTURE_2D, fe, ve, q, Z, 0, ie, de, null), q >>= 1, Z >>= 1;
        }
      } else if (m.isHTMLTexture) {
        if ("texElementImage2D" in e) {
          const q = e.canvas;
          if (q.hasAttribute("layoutsubtree") || q.setAttribute("layoutsubtree", "true"), R.parentNode !== q) {
            q.appendChild(R), u.add(m), q.onpaint = (Z) => {
              const fe = Z.changedElements;
              for (const ge of u) fe.includes(ge.image) && (ge.needsUpdate = !0);
            }, q.requestPaint();
            return;
          }
          if (e.texElementImage2D.length === 3) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, R);
          else {
            const fe = e.RGBA, ge = e.RGBA, j = e.UNSIGNED_BYTE;
            e.texElementImage2D(e.TEXTURE_2D, 0, fe, ge, j, R);
          }
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (Me.length > 0) {
        if (Pe && be) {
          const q = tt(Me[0]);
          i.texStorage2D(e.TEXTURE_2D, b, ve, q.width, q.height);
        }
        for (let q = 0, Z = Me.length; q < Z; q++)
          $ = Me[q], Pe ? ze && i.texSubImage2D(e.TEXTURE_2D, q, 0, 0, ie, de, $) : i.texImage2D(e.TEXTURE_2D, q, ve, ie, de, $);
        m.generateMipmaps = !1;
      } else if (Pe) {
        if (be) {
          const q = tt(R);
          i.texStorage2D(e.TEXTURE_2D, b, ve, q.width, q.height);
        }
        ze && i.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ie, de, R);
      } else i.texImage2D(e.TEXTURE_2D, 0, ve, ie, de, R);
      f(m) && C(z), ae.__version = ne.version, m.onUpdate && m.onUpdate(m);
    }
    E.__version = m.version;
  }
  function Ce(E, m, T) {
    if (m.image.length !== 6) return;
    const z = re(E, m), K = m.source;
    i.bindTexture(e.TEXTURE_CUBE_MAP, E.__webglTexture, e.TEXTURE0 + T);
    const ne = n.get(K);
    if (K.version !== ne.__version || z === !0) {
      i.activeTexture(e.TEXTURE0 + T);
      const ae = Oe.getPrimaries(Oe.workingColorSpace), R = m.colorSpace === "" ? null : Oe.getPrimaries(m.colorSpace), ie = m.colorSpace === "" || ae === R ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), i.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment), i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, ie);
      const de = m.isCompressedTexture || m.image[0].isCompressedTexture, ve = m.image[0] && m.image[0].isDataTexture, $ = [];
      for (let j = 0; j < 6; j++)
        !de && !ve ? $[j] = d(m.image[j], !0, r.maxCubemapSize) : $[j] = ve ? m.image[j].image : m.image[j], $[j] = Ye(m, $[j]);
      const Me = $[0], Pe = A.convert(m.format, m.colorSpace), be = A.convert(m.type), ze = P(m.internalFormat, Pe, be, m.normalized, m.colorSpace), b = m.isVideoTexture !== !0, q = ne.__version === void 0 || z === !0, Z = K.dataReady;
      let fe = S(m, Me);
      Y(e.TEXTURE_CUBE_MAP, m);
      let ge;
      if (de) {
        b && q && i.texStorage2D(e.TEXTURE_CUBE_MAP, fe, ze, Me.width, Me.height);
        for (let j = 0; j < 6; j++) {
          ge = $[j].mipmaps;
          for (let oe = 0; oe < ge.length; oe++) {
            const Se = ge[oe];
            m.format !== 1023 ? Pe !== null ? b ? Z && i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe, 0, 0, Se.width, Se.height, Pe, Se.data) : i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe, ze, Se.width, Se.height, 0, Se.data) : De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : b ? Z && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe, 0, 0, Se.width, Se.height, Pe, be, Se.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe, ze, Se.width, Se.height, 0, Pe, be, Se.data);
          }
        }
      } else {
        if (ge = m.mipmaps, b && q) {
          ge.length > 0 && fe++;
          const j = tt($[0]);
          i.texStorage2D(e.TEXTURE_CUBE_MAP, fe, ze, j.width, j.height);
        }
        for (let j = 0; j < 6; j++) if (ve) {
          b ? Z && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, $[j].width, $[j].height, Pe, be, $[j].data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ze, $[j].width, $[j].height, 0, Pe, be, $[j].data);
          for (let oe = 0; oe < ge.length; oe++) {
            const Se = ge[oe].image[j].image;
            b ? Z && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe + 1, 0, 0, Se.width, Se.height, Pe, be, Se.data) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe + 1, ze, Se.width, Se.height, 0, Pe, be, Se.data);
          }
        } else {
          b ? Z && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Pe, be, $[j]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, ze, Pe, be, $[j]);
          for (let oe = 0; oe < ge.length; oe++) {
            const Se = ge[oe];
            b ? Z && i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe + 1, 0, 0, Pe, be, Se.image[j]) : i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + j, oe + 1, ze, Pe, be, Se.image[j]);
          }
        }
      }
      f(m) && C(e.TEXTURE_CUBE_MAP), ne.__version = K.version, m.onUpdate && m.onUpdate(m);
    }
    E.__version = m.version;
  }
  function Be(E, m, T, z, K, ne) {
    const ae = A.convert(T.format, T.colorSpace), R = A.convert(T.type), ie = P(T.internalFormat, ae, R, T.normalized, T.colorSpace), de = n.get(m), ve = n.get(T);
    if (ve.__renderTarget = m, !de.__hasExternalTextures) {
      const $ = Math.max(1, m.width >> ne), Me = Math.max(1, m.height >> ne);
      K === e.TEXTURE_3D || K === e.TEXTURE_2D_ARRAY ? i.texImage3D(K, ne, ie, $, Me, m.depth, 0, ae, R, null) : i.texImage2D(K, ne, ie, $, Me, 0, ae, R, null);
    }
    i.bindFramebuffer(e.FRAMEBUFFER, E), I(m) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, z, K, ve.__webglTexture, 0, lt(m)) : (K === e.TEXTURE_2D || K >= e.TEXTURE_CUBE_MAP_POSITIVE_X && K <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, z, K, ve.__webglTexture, ne), i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Xe(E, m, T) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, E), m.depthBuffer) {
      const z = m.depthTexture, K = z && z.isDepthTexture ? z.type : null, ne = D(m.stencilBuffer, K), ae = m.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      I(m) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, lt(m), ne, m.width, m.height) : T ? e.renderbufferStorageMultisample(e.RENDERBUFFER, lt(m), ne, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, ne, m.width, m.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, ae, e.RENDERBUFFER, E);
    } else {
      const z = m.textures;
      for (let K = 0; K < z.length; K++) {
        const ne = z[K], ae = A.convert(ne.format, ne.colorSpace), R = A.convert(ne.type), ie = P(ne.internalFormat, ae, R, ne.normalized, ne.colorSpace);
        I(m) ? a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, lt(m), ie, m.width, m.height) : T ? e.renderbufferStorageMultisample(e.RENDERBUFFER, lt(m), ie, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, ie, m.width, m.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function Qe(E, m, T) {
    const z = m.isWebGLCubeRenderTarget === !0;
    if (i.bindFramebuffer(e.FRAMEBUFFER, E), !(m.depthTexture && m.depthTexture.isDepthTexture)) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const K = n.get(m.depthTexture);
    if (K.__renderTarget = m, (!K.__webglTexture || m.depthTexture.image.width !== m.width || m.depthTexture.image.height !== m.height) && (m.depthTexture.image.width = m.width, m.depthTexture.image.height = m.height, m.depthTexture.needsUpdate = !0), z) {
      if (K.__webglInit === void 0 && (K.__webglInit = !0, m.depthTexture.addEventListener("dispose", B)), K.__webglTexture === void 0) {
        K.__webglTexture = e.createTexture(), i.bindTexture(e.TEXTURE_CUBE_MAP, K.__webglTexture), Y(e.TEXTURE_CUBE_MAP, m.depthTexture);
        const de = A.convert(m.depthTexture.format), ve = A.convert(m.depthTexture.type);
        let $;
        m.depthTexture.format === 1026 ? $ = e.DEPTH_COMPONENT24 : m.depthTexture.format === 1027 && ($ = e.DEPTH24_STENCIL8);
        for (let Me = 0; Me < 6; Me++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + Me, 0, $, m.width, m.height, 0, de, ve, null);
      }
    } else J(m.depthTexture, 0);
    const ne = K.__webglTexture, ae = lt(m), R = z ? e.TEXTURE_CUBE_MAP_POSITIVE_X + T : e.TEXTURE_2D, ie = m.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (m.depthTexture.format === 1026) I(m) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, R, ne, 0, ae) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, R, ne, 0);
    else if (m.depthTexture.format === 1027) I(m) ? a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, R, ne, 0, ae) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, R, ne, 0);
    else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function $e(E) {
    const m = n.get(E), T = E.isWebGLCubeRenderTarget === !0;
    if (m.__boundDepthTexture !== E.depthTexture) {
      const z = E.depthTexture;
      if (m.__depthDisposeCallback && m.__depthDisposeCallback(), z) {
        const K = () => {
          delete m.__boundDepthTexture, delete m.__depthDisposeCallback, z.removeEventListener("dispose", K);
        };
        z.addEventListener("dispose", K), m.__depthDisposeCallback = K;
      }
      m.__boundDepthTexture = z;
    }
    if (E.depthTexture && !m.__autoAllocateDepthBuffer) if (T) for (let z = 0; z < 6; z++) Qe(m.__webglFramebuffer[z], E, z);
    else {
      const z = E.texture.mipmaps;
      z && z.length > 0 ? Qe(m.__webglFramebuffer[0], E, 0) : Qe(m.__webglFramebuffer, E, 0);
    }
    else if (T) {
      m.__webglDepthbuffer = [];
      for (let z = 0; z < 6; z++)
        if (i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[z]), m.__webglDepthbuffer[z] === void 0)
          m.__webglDepthbuffer[z] = e.createRenderbuffer(), Xe(m.__webglDepthbuffer[z], E, !1);
        else {
          const K = E.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ne = m.__webglDepthbuffer[z];
          e.bindRenderbuffer(e.RENDERBUFFER, ne), e.framebufferRenderbuffer(e.FRAMEBUFFER, K, e.RENDERBUFFER, ne);
        }
    } else {
      const z = E.texture.mipmaps;
      if (z && z.length > 0 ? i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[0]) : i.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer), m.__webglDepthbuffer === void 0)
        m.__webglDepthbuffer = e.createRenderbuffer(), Xe(m.__webglDepthbuffer, E, !1);
      else {
        const K = E.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ne = m.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, ne), e.framebufferRenderbuffer(e.FRAMEBUFFER, K, e.RENDERBUFFER, ne);
      }
    }
    i.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function pt(E, m, T) {
    const z = n.get(E);
    m !== void 0 && Be(z.__webglFramebuffer, E, E.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), T !== void 0 && $e(E);
  }
  function xt(E) {
    const m = E.texture, T = n.get(E), z = n.get(m);
    E.addEventListener("dispose", g);
    const K = E.textures, ne = E.isWebGLCubeRenderTarget === !0, ae = K.length > 1;
    if (ae || (z.__webglTexture === void 0 && (z.__webglTexture = e.createTexture()), z.__version = m.version, s.memory.textures++), ne) {
      T.__webglFramebuffer = [];
      for (let R = 0; R < 6; R++) if (m.mipmaps && m.mipmaps.length > 0) {
        T.__webglFramebuffer[R] = [];
        for (let ie = 0; ie < m.mipmaps.length; ie++) T.__webglFramebuffer[R][ie] = e.createFramebuffer();
      } else T.__webglFramebuffer[R] = e.createFramebuffer();
    } else {
      if (m.mipmaps && m.mipmaps.length > 0) {
        T.__webglFramebuffer = [];
        for (let R = 0; R < m.mipmaps.length; R++) T.__webglFramebuffer[R] = e.createFramebuffer();
      } else T.__webglFramebuffer = e.createFramebuffer();
      if (ae) for (let R = 0, ie = K.length; R < ie; R++) {
        const de = n.get(K[R]);
        de.__webglTexture === void 0 && (de.__webglTexture = e.createTexture(), s.memory.textures++);
      }
      if (E.samples > 0 && I(E) === !1) {
        T.__webglMultisampledFramebuffer = e.createFramebuffer(), T.__webglColorRenderbuffer = [], i.bindFramebuffer(e.FRAMEBUFFER, T.__webglMultisampledFramebuffer);
        for (let R = 0; R < K.length; R++) {
          const ie = K[R];
          T.__webglColorRenderbuffer[R] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, T.__webglColorRenderbuffer[R]);
          const de = A.convert(ie.format, ie.colorSpace), ve = A.convert(ie.type), $ = P(ie.internalFormat, de, ve, ie.normalized, ie.colorSpace, E.isXRRenderTarget === !0), Me = lt(E);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Me, $, E.width, E.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + R, e.RENDERBUFFER, T.__webglColorRenderbuffer[R]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), E.depthBuffer && (T.__webglDepthRenderbuffer = e.createRenderbuffer(), Xe(T.__webglDepthRenderbuffer, E, !0)), i.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (ne) {
      i.bindTexture(e.TEXTURE_CUBE_MAP, z.__webglTexture), Y(e.TEXTURE_CUBE_MAP, m);
      for (let R = 0; R < 6; R++) if (m.mipmaps && m.mipmaps.length > 0) for (let ie = 0; ie < m.mipmaps.length; ie++) Be(T.__webglFramebuffer[R][ie], E, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + R, ie);
      else Be(T.__webglFramebuffer[R], E, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + R, 0);
      f(m) && C(e.TEXTURE_CUBE_MAP), i.unbindTexture();
    } else if (ae) {
      for (let R = 0, ie = K.length; R < ie; R++) {
        const de = K[R], ve = n.get(de);
        let $ = e.TEXTURE_2D;
        (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && ($ = E.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture($, ve.__webglTexture), Y($, de), Be(T.__webglFramebuffer, E, de, e.COLOR_ATTACHMENT0 + R, $, 0), f(de) && C($);
      }
      i.unbindTexture();
    } else {
      let R = e.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (R = E.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), i.bindTexture(R, z.__webglTexture), Y(R, m), m.mipmaps && m.mipmaps.length > 0) for (let ie = 0; ie < m.mipmaps.length; ie++) Be(T.__webglFramebuffer[ie], E, m, e.COLOR_ATTACHMENT0, R, ie);
      else Be(T.__webglFramebuffer, E, m, e.COLOR_ATTACHMENT0, R, 0);
      f(m) && C(R), i.unbindTexture();
    }
    E.depthBuffer && $e(E);
  }
  function Rt(E) {
    const m = E.textures;
    for (let T = 0, z = m.length; T < z; T++) {
      const K = m[T];
      if (f(K)) {
        const ne = x(E), ae = n.get(K).__webglTexture;
        i.bindTexture(ne, ae), C(ne), i.unbindTexture();
      }
    }
  }
  const et = [], mt = [];
  function ft(E) {
    if (E.samples > 0) {
      if (I(E) === !1) {
        const m = E.textures, T = E.width, z = E.height;
        let K = e.COLOR_BUFFER_BIT;
        const ne = E.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ae = n.get(E), R = m.length > 1;
        if (R) for (let de = 0; de < m.length; de++)
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + de, e.RENDERBUFFER, null), i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + de, e.TEXTURE_2D, null, 0);
        i.bindFramebuffer(e.READ_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
        const ie = E.texture.mipmaps;
        ie && ie.length > 0 ? i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglFramebuffer[0]) : i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglFramebuffer);
        for (let de = 0; de < m.length; de++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (K |= e.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (K |= e.STENCIL_BUFFER_BIT)), R) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, ae.__webglColorRenderbuffer[de]);
            const ve = n.get(m[de]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, ve, 0);
          }
          e.blitFramebuffer(0, 0, T, z, 0, 0, T, z, K, e.NEAREST), l === !0 && (et.length = 0, mt.length = 0, et.push(e.COLOR_ATTACHMENT0 + de), E.depthBuffer && E.resolveDepthBuffer === !1 && (et.push(ne), mt.push(ne), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, mt)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, et));
        }
        if (i.bindFramebuffer(e.READ_FRAMEBUFFER, null), i.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), R) for (let de = 0; de < m.length; de++) {
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + de, e.RENDERBUFFER, ae.__webglColorRenderbuffer[de]);
          const ve = n.get(m[de]).__webglTexture;
          i.bindFramebuffer(e.FRAMEBUFFER, ae.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + de, e.TEXTURE_2D, ve, 0);
        }
        i.bindFramebuffer(e.DRAW_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && l) {
        const m = E.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [m]);
      }
    }
  }
  function lt(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function I(E) {
    const m = n.get(E);
    return E.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && m.__useRenderToTexture !== !1;
  }
  function Lt(E) {
    const m = s.render.frame;
    c.get(E) !== m && (c.set(E, m), E.update());
  }
  function Ye(E, m) {
    const T = E.colorSpace, z = E.format, K = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || T !== "srgb-linear" && T !== "" && (Oe.getTransfer(T) === "srgb" ? (z !== 1023 || K !== 1009) && De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Te("WebGLTextures: Unsupported texture color space:", T)), m;
  }
  function tt(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (o.width = E.naturalWidth || E.width, o.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (o.width = E.displayWidth, o.height = E.displayHeight) : (o.width = E.width, o.height = E.height), o;
  }
  this.allocateTextureUnit = X, this.resetTextureUnits = G, this.getTextureUnits = k, this.setTextureUnits = O, this.setTexture2D = J, this.setTexture2DArray = ee, this.setTexture3D = te, this.setTextureCube = ce, this.rebindTextures = pt, this.setupRenderTarget = xt, this.updateRenderTargetMipmap = Rt, this.updateMultisampleRenderTarget = ft, this.setupDepthRenderbuffer = $e, this.setupFrameBufferTexture = Be, this.useMultisampledRTT = I, this.isReversedDepthBuffer = function() {
    return i.buffers.depth.getReversed();
  };
}
function du(e, t) {
  function i(n, r = "") {
    let A;
    const s = Oe.getTransfer(r);
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
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779) if (s === "srgb")
      if (A = t.get("WEBGL_compressed_texture_s3tc_srgb"), A !== null) {
        if (n === 33776) return A.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (n === 33777) return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (n === 33778) return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (n === 33779) return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (A = t.get("WEBGL_compressed_texture_s3tc"), A !== null) {
      if (n === 33776) return A.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (n === 33777) return A.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (n === 33778) return A.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (n === 33779) return A.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (A = t.get("WEBGL_compressed_texture_pvrtc"), A !== null) {
        if (n === 35840) return A.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return A.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return A.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return A.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491)
      if (A = t.get("WEBGL_compressed_texture_etc"), A !== null) {
        if (n === 36196 || n === 37492) return s === "srgb" ? A.COMPRESSED_SRGB8_ETC2 : A.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : A.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return A.COMPRESSED_R11_EAC;
        if (n === 37489) return A.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return A.COMPRESSED_RG11_EAC;
        if (n === 37491) return A.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (A = t.get("WEBGL_compressed_texture_astc"), A !== null) {
        if (n === 37808) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : A.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : A.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : A.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : A.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : A.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : A.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : A.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : A.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : A.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : A.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : A.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : A.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : A.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return s === "srgb" ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : A.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (A = t.get("EXT_texture_compression_bptc"), A !== null) {
        if (n === 36492) return s === "srgb" ? A.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : A.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return A.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return A.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (A = t.get("EXT_texture_compression_rgtc"), A !== null) {
        if (n === 36283) return A.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return A.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return A.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return A.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] !== void 0 ? e[n] : null;
  }
  return { convert: i };
}
var pu = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, mu = `
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

}`, gu = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const i = new ga(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, i = new bt({
        vertexShader: pu,
        fragmentShader: mu,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Ft(new xn(20, 20), i);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, vu = class extends Ri {
  constructor(e, t) {
    super();
    const i = this;
    let n = null, r = 1, A = null, s = "local-floor", a = 1, l = null, o = null, c = null, u = null, h = null, p = null;
    const w = typeof XRWebGLBinding < "u", M = new gu(), d = {}, f = t.getContextAttributes();
    let C = null, x = null;
    const P = [], D = [], S = new Re();
    let B = null;
    const g = new kt();
    g.viewport = new At();
    const _ = new kt();
    _.viewport = new At();
    const W = [g, _], y = new jl();
    let H = null, G = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let re = P[Y];
      return re === void 0 && (re = new Tr(), P[Y] = re), re.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let re = P[Y];
      return re === void 0 && (re = new Tr(), P[Y] = re), re.getGripSpace();
    }, this.getHand = function(Y) {
      let re = P[Y];
      return re === void 0 && (re = new Tr(), P[Y] = re), re.getHandSpace();
    };
    function k(Y) {
      const re = D.indexOf(Y.inputSource);
      if (re === -1) return;
      const ue = P[re];
      ue !== void 0 && (ue.update(Y.inputSource, Y.frame, l || A), ue.dispatchEvent({
        type: Y.type,
        data: Y.inputSource
      }));
    }
    function O() {
      n.removeEventListener("select", k), n.removeEventListener("selectstart", k), n.removeEventListener("selectend", k), n.removeEventListener("squeeze", k), n.removeEventListener("squeezestart", k), n.removeEventListener("squeezeend", k), n.removeEventListener("end", O), n.removeEventListener("inputsourceschange", X);
      for (let Y = 0; Y < P.length; Y++) {
        const re = D[Y];
        re !== null && (D[Y] = null, P[Y].disconnect(re));
      }
      H = null, G = null, M.reset();
      for (const Y in d) delete d[Y];
      e.setRenderTarget(C), h = null, u = null, c = null, n = null, x = null, qe.stop(), i.isPresenting = !1, e.setPixelRatio(B), e.setSize(S.width, S.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      r = Y, i.isPresenting === !0 && De("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      s = Y, i.isPresenting === !0 && De("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || A;
    }, this.setReferenceSpace = function(Y) {
      l = Y;
    }, this.getBaseLayer = function() {
      return u !== null ? u : h;
    }, this.getBinding = function() {
      return c === null && w && (c = new XRWebGLBinding(n, t)), c;
    }, this.getFrame = function() {
      return p;
    }, this.getSession = function() {
      return n;
    }, this.setSession = async function(Y) {
      if (n = Y, n !== null) {
        if (C = e.getRenderTarget(), n.addEventListener("select", k), n.addEventListener("selectstart", k), n.addEventListener("selectend", k), n.addEventListener("squeeze", k), n.addEventListener("squeezestart", k), n.addEventListener("squeezeend", k), n.addEventListener("end", O), n.addEventListener("inputsourceschange", X), f.xrCompatible !== !0 && await t.makeXRCompatible(), B = e.getPixelRatio(), e.getSize(S), w && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let re = null, ue = null, he = null;
          f.depth && (he = f.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, re = f.stencil ? ia : Cn, ue = f.stencil ? ta : bi);
          const xe = {
            colorFormat: t.RGBA8,
            depthFormat: he,
            scaleFactor: r
          };
          c = this.getBinding(), u = c.createProjectionLayer(xe), n.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), x = new Kt(u.textureWidth, u.textureHeight, {
            format: Sn,
            type: Ei,
            depthTexture: new An(u.textureWidth, u.textureHeight, ue, void 0, void 0, void 0, void 0, void 0, void 0, re),
            stencilBuffer: f.stencil,
            colorSpace: e.outputColorSpace,
            samples: f.antialias ? 4 : 0,
            resolveDepthBuffer: u.ignoreDepthValues === !1,
            resolveStencilBuffer: u.ignoreDepthValues === !1
          });
        } else {
          const re = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: r
          };
          h = new XRWebGLLayer(n, t, re), n.updateRenderState({ baseLayer: h }), e.setPixelRatio(1), e.setSize(h.framebufferWidth, h.framebufferHeight, !1), x = new Kt(h.framebufferWidth, h.framebufferHeight, {
            format: Sn,
            type: Ei,
            colorSpace: e.outputColorSpace,
            stencilBuffer: f.stencil,
            resolveDepthBuffer: h.ignoreDepthValues === !1,
            resolveStencilBuffer: h.ignoreDepthValues === !1
          });
        }
        x.isXRRenderTarget = !0, this.setFoveation(a), l = null, A = await n.requestReferenceSpace(s), qe.setContext(n), qe.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (n !== null) return n.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return M.getDepthTexture();
    };
    function X(Y) {
      for (let re = 0; re < Y.removed.length; re++) {
        const ue = Y.removed[re], he = D.indexOf(ue);
        he >= 0 && (D[he] = null, P[he].disconnect(ue));
      }
      for (let re = 0; re < Y.added.length; re++) {
        const ue = Y.added[re];
        let he = D.indexOf(ue);
        if (he === -1) {
          for (let Ce = 0; Ce < P.length; Ce++) if (Ce >= D.length) {
            D.push(ue), he = Ce;
            break;
          } else if (D[Ce] === null) {
            D[Ce] = ue, he = Ce;
            break;
          }
          if (he === -1) break;
        }
        const xe = P[he];
        xe && xe.connect(ue);
      }
    }
    const U = new Q(), J = new Q();
    function ee(Y, re, ue) {
      U.setFromMatrixPosition(re.matrixWorld), J.setFromMatrixPosition(ue.matrixWorld);
      const he = U.distanceTo(J), xe = re.projectionMatrix.elements, Ce = ue.projectionMatrix.elements, Be = xe[14] / (xe[10] - 1), Xe = xe[14] / (xe[10] + 1), Qe = (xe[9] + 1) / xe[5], $e = (xe[9] - 1) / xe[5], pt = (xe[8] - 1) / xe[0], xt = (Ce[8] + 1) / Ce[0], Rt = Be * pt, et = Be * xt, mt = he / (-pt + xt), ft = mt * -pt;
      if (re.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(ft), Y.translateZ(mt), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), xe[10] === -1)
        Y.projectionMatrix.copy(re.projectionMatrix), Y.projectionMatrixInverse.copy(re.projectionMatrixInverse);
      else {
        const lt = Be + mt, I = Xe + mt, Lt = Rt - ft, Ye = et + (he - ft), tt = Qe * Xe / I * lt, E = $e * Xe / I * lt;
        Y.projectionMatrix.makePerspective(Lt, Ye, tt, E, lt, I), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function te(Y, re) {
      re === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(re.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (n === null) return;
      let re = Y.near, ue = Y.far;
      M.texture !== null && (M.depthNear > 0 && (re = M.depthNear), M.depthFar > 0 && (ue = M.depthFar)), y.near = _.near = g.near = re, y.far = _.far = g.far = ue, (H !== y.near || G !== y.far) && (n.updateRenderState({
        depthNear: y.near,
        depthFar: y.far
      }), H = y.near, G = y.far), y.layers.mask = Y.layers.mask | 6, g.layers.mask = y.layers.mask & -5, _.layers.mask = y.layers.mask & -3;
      const he = Y.parent, xe = y.cameras;
      te(y, he);
      for (let Ce = 0; Ce < xe.length; Ce++) te(xe[Ce], he);
      xe.length === 2 ? ee(y, g, _) : y.projectionMatrix.copy(g.projectionMatrix), ce(Y, y, he);
    };
    function ce(Y, re, ue) {
      ue === null ? Y.matrix.copy(re.matrixWorld) : (Y.matrix.copy(ue.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(re.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(re.projectionMatrix), Y.projectionMatrixInverse.copy(re.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = yn * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return y;
    }, this.getFoveation = function() {
      if (!(u === null && h === null))
        return a;
    }, this.setFoveation = function(Y) {
      a = Y, u !== null && (u.fixedFoveation = Y), h !== null && h.fixedFoveation !== void 0 && (h.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return M.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return M.getMesh(y);
    }, this.getCameraTexture = function(Y) {
      return d[Y];
    };
    let Ee = null;
    function We(Y, re) {
      if (o = re.getViewerPose(l || A), p = re, o !== null) {
        const ue = o.views;
        h !== null && (e.setRenderTargetFramebuffer(x, h.framebuffer), e.setRenderTarget(x));
        let he = !1;
        ue.length !== y.cameras.length && (y.cameras.length = 0, he = !0);
        for (let Ce = 0; Ce < ue.length; Ce++) {
          const Be = ue[Ce];
          let Xe = null;
          if (h !== null) Xe = h.getViewport(Be);
          else {
            const $e = c.getViewSubImage(u, Be);
            Xe = $e.viewport, Ce === 0 && (e.setRenderTargetTextures(x, $e.colorTexture, $e.depthStencilTexture), e.setRenderTarget(x));
          }
          let Qe = W[Ce];
          Qe === void 0 && (Qe = new kt(), Qe.layers.enable(Ce), Qe.viewport = new At(), W[Ce] = Qe), Qe.matrix.fromArray(Be.transform.matrix), Qe.matrix.decompose(Qe.position, Qe.quaternion, Qe.scale), Qe.projectionMatrix.fromArray(Be.projectionMatrix), Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(), Qe.viewport.set(Xe.x, Xe.y, Xe.width, Xe.height), Ce === 0 && (y.matrix.copy(Qe.matrix), y.matrix.decompose(y.position, y.quaternion, y.scale)), he === !0 && y.cameras.push(Qe);
        }
        const xe = n.enabledFeatures;
        if (xe && xe.includes("depth-sensing") && n.depthUsage == "gpu-optimized" && w) {
          c = i.getBinding();
          const Ce = c.getDepthInformation(ue[0]);
          Ce && Ce.isValid && Ce.texture && M.init(Ce, n.renderState);
        }
        if (xe && xe.includes("camera-access") && w) {
          e.state.unbindTexture(), c = i.getBinding();
          for (let Ce = 0; Ce < ue.length; Ce++) {
            const Be = ue[Ce].camera;
            if (Be) {
              let Xe = d[Be];
              Xe || (Xe = new ga(), d[Be] = Xe);
              const Qe = c.getCameraImage(Be);
              Xe.sourceTexture = Qe;
            }
          }
        }
      }
      for (let ue = 0; ue < P.length; ue++) {
        const he = D[ue], xe = P[ue];
        he !== null && xe !== void 0 && xe.update(he, re, l || A);
      }
      Ee && Ee(Y, re), re.detectedPlanes && i.dispatchEvent({
        type: "planesdetected",
        data: re
      }), p = null;
    }
    const qe = new Da();
    qe.setAnimationLoop(We), this.setAnimationLoop = function(Y) {
      Ee = Y;
    }, this.dispose = function() {
    };
  }
}, wu = /* @__PURE__ */ new at(), ba = /* @__PURE__ */ new Ie();
ba.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Eu(e, t) {
  function i(d, f) {
    d.matrixAutoUpdate === !0 && d.updateMatrix(), f.value.copy(d.matrix);
  }
  function n(d, f) {
    f.color.getRGB(d.fogColor.value, Ea(e)), f.isFog ? (d.fogNear.value = f.near, d.fogFar.value = f.far) : f.isFogExp2 && (d.fogDensity.value = f.density);
  }
  function r(d, f, C, x, P) {
    f.isNodeMaterial ? f.uniformsNeedUpdate = !1 : f.isMeshBasicMaterial ? A(d, f) : f.isMeshLambertMaterial ? (A(d, f), f.envMap && (d.envMapIntensity.value = f.envMapIntensity)) : f.isMeshToonMaterial ? (A(d, f), u(d, f)) : f.isMeshPhongMaterial ? (A(d, f), c(d, f), f.envMap && (d.envMapIntensity.value = f.envMapIntensity)) : f.isMeshStandardMaterial ? (A(d, f), h(d, f), f.isMeshPhysicalMaterial && p(d, f, P)) : f.isMeshMatcapMaterial ? (A(d, f), w(d, f)) : f.isMeshDepthMaterial ? A(d, f) : f.isMeshDistanceMaterial ? (A(d, f), M(d, f)) : f.isMeshNormalMaterial ? A(d, f) : f.isLineBasicMaterial ? (s(d, f), f.isLineDashedMaterial && a(d, f)) : f.isPointsMaterial ? l(d, f, C, x) : f.isSpriteMaterial ? o(d, f) : f.isShadowMaterial ? (d.color.value.copy(f.color), d.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function A(d, f) {
    d.opacity.value = f.opacity, f.color && d.diffuse.value.copy(f.color), f.emissive && d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (d.map.value = f.map, i(f.map, d.mapTransform)), f.alphaMap && (d.alphaMap.value = f.alphaMap, i(f.alphaMap, d.alphaMapTransform)), f.bumpMap && (d.bumpMap.value = f.bumpMap, i(f.bumpMap, d.bumpMapTransform), d.bumpScale.value = f.bumpScale, f.side === 1 && (d.bumpScale.value *= -1)), f.normalMap && (d.normalMap.value = f.normalMap, i(f.normalMap, d.normalMapTransform), d.normalScale.value.copy(f.normalScale), f.side === 1 && d.normalScale.value.negate()), f.displacementMap && (d.displacementMap.value = f.displacementMap, i(f.displacementMap, d.displacementMapTransform), d.displacementScale.value = f.displacementScale, d.displacementBias.value = f.displacementBias), f.emissiveMap && (d.emissiveMap.value = f.emissiveMap, i(f.emissiveMap, d.emissiveMapTransform)), f.specularMap && (d.specularMap.value = f.specularMap, i(f.specularMap, d.specularMapTransform)), f.alphaTest > 0 && (d.alphaTest.value = f.alphaTest);
    const C = t.get(f), x = C.envMap, P = C.envMapRotation;
    x && (d.envMap.value = x, d.envMapRotation.value.setFromMatrix4(wu.makeRotationFromEuler(P)).transpose(), x.isCubeTexture && x.isRenderTargetTexture === !1 && d.envMapRotation.value.premultiply(ba), d.reflectivity.value = f.reflectivity, d.ior.value = f.ior, d.refractionRatio.value = f.refractionRatio), f.lightMap && (d.lightMap.value = f.lightMap, d.lightMapIntensity.value = f.lightMapIntensity, i(f.lightMap, d.lightMapTransform)), f.aoMap && (d.aoMap.value = f.aoMap, d.aoMapIntensity.value = f.aoMapIntensity, i(f.aoMap, d.aoMapTransform));
  }
  function s(d, f) {
    d.diffuse.value.copy(f.color), d.opacity.value = f.opacity, f.map && (d.map.value = f.map, i(f.map, d.mapTransform));
  }
  function a(d, f) {
    d.dashSize.value = f.dashSize, d.totalSize.value = f.dashSize + f.gapSize, d.scale.value = f.scale;
  }
  function l(d, f, C, x) {
    d.diffuse.value.copy(f.color), d.opacity.value = f.opacity, d.size.value = f.size * C, d.scale.value = x * 0.5, f.map && (d.map.value = f.map, i(f.map, d.uvTransform)), f.alphaMap && (d.alphaMap.value = f.alphaMap, i(f.alphaMap, d.alphaMapTransform)), f.alphaTest > 0 && (d.alphaTest.value = f.alphaTest);
  }
  function o(d, f) {
    d.diffuse.value.copy(f.color), d.opacity.value = f.opacity, d.rotation.value = f.rotation, f.map && (d.map.value = f.map, i(f.map, d.mapTransform)), f.alphaMap && (d.alphaMap.value = f.alphaMap, i(f.alphaMap, d.alphaMapTransform)), f.alphaTest > 0 && (d.alphaTest.value = f.alphaTest);
  }
  function c(d, f) {
    d.specular.value.copy(f.specular), d.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function u(d, f) {
    f.gradientMap && (d.gradientMap.value = f.gradientMap);
  }
  function h(d, f) {
    d.metalness.value = f.metalness, f.metalnessMap && (d.metalnessMap.value = f.metalnessMap, i(f.metalnessMap, d.metalnessMapTransform)), d.roughness.value = f.roughness, f.roughnessMap && (d.roughnessMap.value = f.roughnessMap, i(f.roughnessMap, d.roughnessMapTransform)), f.envMap && (d.envMapIntensity.value = f.envMapIntensity);
  }
  function p(d, f, C) {
    d.ior.value = f.ior, f.sheen > 0 && (d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), d.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (d.sheenColorMap.value = f.sheenColorMap, i(f.sheenColorMap, d.sheenColorMapTransform)), f.sheenRoughnessMap && (d.sheenRoughnessMap.value = f.sheenRoughnessMap, i(f.sheenRoughnessMap, d.sheenRoughnessMapTransform))), f.clearcoat > 0 && (d.clearcoat.value = f.clearcoat, d.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (d.clearcoatMap.value = f.clearcoatMap, i(f.clearcoatMap, d.clearcoatMapTransform)), f.clearcoatRoughnessMap && (d.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, i(f.clearcoatRoughnessMap, d.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (d.clearcoatNormalMap.value = f.clearcoatNormalMap, i(f.clearcoatNormalMap, d.clearcoatNormalMapTransform), d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === 1 && d.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (d.dispersion.value = f.dispersion), f.iridescence > 0 && (d.iridescence.value = f.iridescence, d.iridescenceIOR.value = f.iridescenceIOR, d.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], d.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (d.iridescenceMap.value = f.iridescenceMap, i(f.iridescenceMap, d.iridescenceMapTransform)), f.iridescenceThicknessMap && (d.iridescenceThicknessMap.value = f.iridescenceThicknessMap, i(f.iridescenceThicknessMap, d.iridescenceThicknessMapTransform))), f.transmission > 0 && (d.transmission.value = f.transmission, d.transmissionSamplerMap.value = C.texture, d.transmissionSamplerSize.value.set(C.width, C.height), f.transmissionMap && (d.transmissionMap.value = f.transmissionMap, i(f.transmissionMap, d.transmissionMapTransform)), d.thickness.value = f.thickness, f.thicknessMap && (d.thicknessMap.value = f.thicknessMap, i(f.thicknessMap, d.thicknessMapTransform)), d.attenuationDistance.value = f.attenuationDistance, d.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (d.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (d.anisotropyMap.value = f.anisotropyMap, i(f.anisotropyMap, d.anisotropyMapTransform))), d.specularIntensity.value = f.specularIntensity, d.specularColor.value.copy(f.specularColor), f.specularColorMap && (d.specularColorMap.value = f.specularColorMap, i(f.specularColorMap, d.specularColorMapTransform)), f.specularIntensityMap && (d.specularIntensityMap.value = f.specularIntensityMap, i(f.specularIntensityMap, d.specularIntensityMapTransform));
  }
  function w(d, f) {
    f.matcap && (d.matcap.value = f.matcap);
  }
  function M(d, f) {
    const C = t.get(f).light;
    d.referencePosition.value.setFromMatrixPosition(C.matrixWorld), d.nearDistance.value = C.shadow.camera.near, d.farDistance.value = C.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Mu(e, t, i, n) {
  let r = {}, A = {}, s = [];
  const a = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(P, D) {
    const S = D.program;
    n.uniformBlockBinding(P, S);
  }
  function o(P, D) {
    let S = r[P.id];
    S === void 0 && (d(P), S = c(P), r[P.id] = S, P.addEventListener("dispose", C));
    const B = D.program;
    n.updateUBOMapping(P, B);
    const g = t.render.frame;
    A[P.id] !== g && (h(P), A[P.id] = g);
  }
  function c(P) {
    const D = u();
    P.__bindingPointIndex = D;
    const S = e.createBuffer(), B = P.__size, g = P.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, S), e.bufferData(e.UNIFORM_BUFFER, B, g), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, D, S), S;
  }
  function u() {
    for (let P = 0; P < a; P++) if (s.indexOf(P) === -1)
      return s.push(P), P;
    return Te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(P) {
    const D = r[P.id], S = P.uniforms, B = P.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, D);
    for (let g = 0, _ = S.length; g < _; g++) {
      const W = S[g];
      if (Array.isArray(W)) for (let y = 0, H = W.length; y < H; y++) p(W[y], g, y, B);
      else p(W, g, 0, B);
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function p(P, D, S, B) {
    if (M(P, D, S, B) === !0) {
      const g = P.__offset, _ = P.value;
      if (Array.isArray(_)) {
        let W = 0;
        for (let y = 0; y < _.length; y++) {
          const H = _[y], G = f(H);
          w(H, P.__data, W), typeof H != "number" && typeof H != "boolean" && !H.isMatrix3 && !ArrayBuffer.isView(H) && (W += G.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else w(_, P.__data, 0);
      e.bufferSubData(e.UNIFORM_BUFFER, g, P.__data);
    }
  }
  function w(P, D, S) {
    typeof P == "number" || typeof P == "boolean" ? D[0] = P : P.isMatrix3 ? (D[0] = P.elements[0], D[1] = P.elements[1], D[2] = P.elements[2], D[3] = 0, D[4] = P.elements[3], D[5] = P.elements[4], D[6] = P.elements[5], D[7] = 0, D[8] = P.elements[6], D[9] = P.elements[7], D[10] = P.elements[8], D[11] = 0) : ArrayBuffer.isView(P) ? D.set(new P.constructor(P.buffer, P.byteOffset, D.length)) : P.toArray(D, S);
  }
  function M(P, D, S, B) {
    const g = P.value, _ = D + "_" + S;
    if (B[_] === void 0)
      return typeof g == "number" || typeof g == "boolean" ? B[_] = g : ArrayBuffer.isView(g) ? B[_] = g.slice() : B[_] = g.clone(), !0;
    {
      const W = B[_];
      if (typeof g == "number" || typeof g == "boolean") {
        if (W !== g)
          return B[_] = g, !0;
      } else {
        if (ArrayBuffer.isView(g)) return !0;
        if (W.equals(g) === !1)
          return W.copy(g), !0;
      }
    }
    return !1;
  }
  function d(P) {
    const D = P.uniforms;
    let S = 0;
    const B = 16;
    for (let _ = 0, W = D.length; _ < W; _++) {
      const y = Array.isArray(D[_]) ? D[_] : [D[_]];
      for (let H = 0, G = y.length; H < G; H++) {
        const k = y[H], O = Array.isArray(k.value) ? k.value : [k.value];
        for (let X = 0, U = O.length; X < U; X++) {
          const J = O[X], ee = f(J), te = S % B, ce = te % ee.boundary, Ee = te + ce;
          S += ce, Ee !== 0 && B - Ee < ee.storage && (S += B - Ee), k.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = S, S += ee.storage;
        }
      }
    }
    const g = S % B;
    return g > 0 && (S += B - g), P.__size = S, P.__cache = {}, this;
  }
  function f(P) {
    const D = {
      boundary: 0,
      storage: 0
    };
    return typeof P == "number" || typeof P == "boolean" ? (D.boundary = 4, D.storage = 4) : P.isVector2 ? (D.boundary = 8, D.storage = 8) : P.isVector3 || P.isColor ? (D.boundary = 16, D.storage = 12) : P.isVector4 ? (D.boundary = 16, D.storage = 16) : P.isMatrix3 ? (D.boundary = 48, D.storage = 48) : P.isMatrix4 ? (D.boundary = 64, D.storage = 64) : P.isTexture ? De("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(P) ? (D.boundary = 16, D.storage = P.byteLength) : De("WebGLRenderer: Unsupported uniform value type.", P), D;
  }
  function C(P) {
    const D = P.target;
    D.removeEventListener("dispose", C);
    const S = s.indexOf(D.__bindingPointIndex);
    s.splice(S, 1), e.deleteBuffer(r[D.id]), delete r[D.id], delete A[D.id];
  }
  function x() {
    for (const P in r) e.deleteBuffer(r[P]);
    s = [], r = {}, A = {};
  }
  return {
    bind: l,
    update: o,
    dispose: x
  };
}
var Pu = new Uint16Array([
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
function _u() {
  return Yt === null && (Yt = new _l(Pu, 16, 16, cr, Ii), Yt.name = "DFG_LUT", Yt.minFilter = St, Yt.magFilter = St, Yt.wrapS = ai, Yt.wrapT = ai, Yt.generateMipmaps = !1, Yt.needsUpdate = !0), Yt;
}
var Du = class {
  constructor(e = {}) {
    const { canvas: t = Qo(), context: i = null, depth: n = !0, stencil: r = !1, alpha: A = !1, antialias: s = !1, premultipliedAlpha: a = !0, preserveDrawingBuffer: l = !1, powerPreference: o = "default", failIfMajorPerformanceCaveat: c = !1, reversedDepthBuffer: u = !1, outputBufferType: h = Ei } = e;
    this.isWebGLRenderer = !0;
    let p;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = i.getContextAttributes().alpha;
    } else p = A;
    const w = h, M = /* @__PURE__ */ new Set([
      Aa,
      ra,
      na
    ]), d = /* @__PURE__ */ new Set([
      Ei,
      bi,
      js,
      ta,
      $s,
      ea
    ]), f = new Uint32Array(4), C = new Int32Array(4), x = new Q();
    let P = null, D = null;
    const S = [], B = [];
    let g = null;
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const _ = this;
    let W = !1, y = null, H = null, G = null, k = null;
    this._outputColorSpace = Bt;
    let O = 0, X = 0, U = null, J = -1, ee = null;
    const te = new At(), ce = new At();
    let Ee = null;
    const We = new Ve(0);
    let qe = 0, Y = t.width, re = t.height, ue = 1, he = null, xe = null;
    const Ce = new At(0, 0, Y, re), Be = new At(0, 0, Y, re);
    let Xe = !1;
    const Qe = new uA();
    let $e = !1, pt = !1;
    const xt = new at(), Rt = new Q(), et = new At(), mt = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let ft = !1;
    function lt() {
      return U === null ? ue : 1;
    }
    let I = i;
    function Lt(v, L) {
      return t.getContext(v, L);
    }
    try {
      const v = {
        alpha: !0,
        depth: n,
        stencil: r,
        antialias: s,
        premultipliedAlpha: a,
        preserveDrawingBuffer: l,
        powerPreference: o,
        failIfMajorPerformanceCaveat: c
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r185"), t.addEventListener("webglcontextlost", Se, !1), t.addEventListener("webglcontextrestored", Et, !1), t.addEventListener("webglcontextcreationerror", Ze, !1), I === null) {
        const L = "webgl2";
        if (I = Lt(L, v), I === null) throw Lt(L) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (v) {
      throw Te("WebGLRenderer: " + v.message), v;
    }
    let Ye, tt, E, m, T, z, K, ne, ae, R, ie, de, ve, $, Me, Pe, be, ze, b, q, Z, fe, ge;
    function j() {
      Ye = new _c(I), Ye.init(), Z = new du(I, Ye), tt = new pc(I, Ye, e, Z), E = new uu(I, Ye), tt.reversedDepthBuffer && u && E.buffers.depth.setReversed(!0), H = I.createFramebuffer(), G = I.createFramebuffer(), k = I.createFramebuffer(), m = new Sc(I), T = new jh(), z = new fu(I, Ye, E, T, tt, Z, m), K = new Pc(_), ne = new cc(I), fe = new fc(I, ne), ae = new Dc(I, ne, m, fe), R = new yc(I, ae, ne, fe, m), ze = new Cc(I, tt, z), Me = new mc(T), ie = new Zh(_, K, Ye, tt, fe, Me), de = new Eu(_, T), ve = new eu(), $ = new su(Ye), be = new uc(_, K, E, R, p, a), Pe = new hu(_, R, tt), ge = new Mu(I, m, tt, E), b = new dc(I, Ye, m), q = new xc(I, Ye, m), m.programs = ie.programs, _.capabilities = tt, _.extensions = Ye, _.properties = T, _.renderLists = ve, _.shadowMap = Pe, _.state = E, _.info = m;
    }
    j(), w !== 1009 && (g = new Bc(w, t.width, t.height, s, n, r));
    const oe = new vu(_, I);
    this.xr = oe, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const v = Ye.get("WEBGL_lose_context");
      v && v.loseContext();
    }, this.forceContextRestore = function() {
      const v = Ye.get("WEBGL_lose_context");
      v && v.restoreContext();
    }, this.getPixelRatio = function() {
      return ue;
    }, this.setPixelRatio = function(v) {
      v !== void 0 && (ue = v, this.setSize(Y, re, !1));
    }, this.getSize = function(v) {
      return v.set(Y, re);
    }, this.setSize = function(v, L, V = !0) {
      if (oe.isPresenting) {
        De("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Y = v, re = L, t.width = Math.floor(v * ue), t.height = Math.floor(L * ue), V === !0 && (t.style.width = v + "px", t.style.height = L + "px"), g !== null && g.setSize(t.width, t.height), this.setViewport(0, 0, v, L);
    }, this.getDrawingBufferSize = function(v) {
      return v.set(Y * ue, re * ue).floor();
    }, this.setDrawingBufferSize = function(v, L, V) {
      Y = v, re = L, ue = V, t.width = Math.floor(v * V), t.height = Math.floor(L * V), this.setViewport(0, 0, v, L);
    }, this.setEffects = function(v) {
      if (w === 1009) {
        Te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (v) {
        for (let L = 0; L < v.length; L++) if (v[L].isOutputPass === !0) {
          De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      g.setEffects(v || []);
    }, this.getCurrentViewport = function(v) {
      return v.copy(te);
    }, this.getViewport = function(v) {
      return v.copy(Ce);
    }, this.setViewport = function(v, L, V, F) {
      v.isVector4 ? Ce.set(v.x, v.y, v.z, v.w) : Ce.set(v, L, V, F), E.viewport(te.copy(Ce).multiplyScalar(ue).round());
    }, this.getScissor = function(v) {
      return v.copy(Be);
    }, this.setScissor = function(v, L, V, F) {
      v.isVector4 ? Be.set(v.x, v.y, v.z, v.w) : Be.set(v, L, V, F), E.scissor(ce.copy(Be).multiplyScalar(ue).round());
    }, this.getScissorTest = function() {
      return Xe;
    }, this.setScissorTest = function(v) {
      E.setScissorTest(Xe = v);
    }, this.setOpaqueSort = function(v) {
      he = v;
    }, this.setTransparentSort = function(v) {
      xe = v;
    }, this.getClearColor = function(v) {
      return v.copy(be.getClearColor());
    }, this.setClearColor = function() {
      be.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return be.getClearAlpha();
    }, this.setClearAlpha = function() {
      be.setClearAlpha(...arguments);
    }, this.clear = function(v = !0, L = !0, V = !0) {
      let F = 0;
      if (v) {
        let N = !1;
        if (U !== null) {
          const Ae = U.texture.format;
          N = M.has(Ae);
        }
        if (N) {
          const Ae = U.texture.type, le = d.has(Ae), pe = be.getClearColor(), me = be.getClearAlpha(), ye = pe.r, Ue = pe.g, Ne = pe.b;
          le ? (f[0] = ye, f[1] = Ue, f[2] = Ne, f[3] = me, I.clearBufferuiv(I.COLOR, 0, f)) : (C[0] = ye, C[1] = Ue, C[2] = Ne, C[3] = me, I.clearBufferiv(I.COLOR, 0, C));
        } else F |= I.COLOR_BUFFER_BIT;
      }
      L && (F |= I.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), V && (F |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && I.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(v) {
      v.setRenderer(this), y = v;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", Se, !1), t.removeEventListener("webglcontextrestored", Et, !1), t.removeEventListener("webglcontextcreationerror", Ze, !1), be.dispose(), ve.dispose(), $.dispose(), T.dispose(), K.dispose(), R.dispose(), fe.dispose(), ge.dispose(), ie.dispose(), oe.dispose(), oe.removeEventListener("sessionstart", wA), oe.removeEventListener("sessionend", EA), Mi.stop();
    };
    function Se(v) {
      v.preventDefault(), IA("WebGLRenderer: Context Lost."), W = !0;
    }
    function Et() {
      IA("WebGLRenderer: Context Restored."), W = !1;
      const v = m.autoReset, L = Pe.enabled, V = Pe.autoUpdate, F = Pe.needsUpdate, N = Pe.type;
      j(), m.autoReset = v, Pe.enabled = L, Pe.autoUpdate = V, Pe.needsUpdate = F, Pe.type = N;
    }
    function Ze(v) {
      Te("WebGLRenderer: A WebGL context could not be created. Reason: ", v.statusMessage);
    }
    function Gt(v) {
      const L = v.target;
      L.removeEventListener("dispose", Gt), jt(L);
    }
    function jt(v) {
      La(v), T.remove(v);
    }
    function La(v) {
      const L = T.get(v).programs;
      L !== void 0 && (L.forEach(function(V) {
        ie.releaseProgram(V);
      }), v.isShaderMaterial && ie.releaseShaderCache(v));
    }
    this.renderBufferDirect = function(v, L, V, F, N, Ae) {
      L === null && (L = mt);
      const le = N.isMesh && N.matrixWorld.determinantAffine() < 0, pe = Fa(v, L, V, F, N);
      E.setMaterial(F, le);
      let me = V.index, ye = 1;
      if (F.wireframe === !0) {
        if (me = ae.getWireframeAttribute(V), me === void 0) return;
        ye = 2;
      }
      const Ue = V.drawRange, Ne = V.attributes.position;
      let _e = Ue.start * ye, je = (Ue.start + Ue.count) * ye;
      Ae !== null && (_e = Math.max(_e, Ae.start * ye), je = Math.min(je, (Ae.start + Ae.count) * ye)), me !== null ? (_e = Math.max(_e, 0), je = Math.min(je, me.count)) : Ne != null && (_e = Math.max(_e, 0), je = Math.min(je, Ne.count));
      const it = je - _e;
      if (it < 0 || it === 1 / 0) return;
      fe.setup(N, F, pe, V, me);
      let nt, He = b;
      if (me !== null && (nt = ne.get(me), He = q, He.setIndex(nt)), N.isMesh) F.wireframe === !0 ? (E.setLineWidth(F.wireframeLinewidth * lt()), He.setMode(I.LINES)) : He.setMode(I.TRIANGLES);
      else if (N.isLine) {
        let gt = F.linewidth;
        gt === void 0 && (gt = 1), E.setLineWidth(gt * lt()), N.isLineSegments ? He.setMode(I.LINES) : N.isLineLoop ? He.setMode(I.LINE_LOOP) : He.setMode(I.LINE_STRIP);
      } else N.isPoints ? He.setMode(I.POINTS) : N.isSprite && He.setMode(I.TRIANGLES);
      if (N.isBatchedMesh) if (Ye.get("WEBGL_multi_draw"))
        He.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
      else {
        const gt = N._multiDrawStarts, we = N._multiDrawCounts, Ot = N._multiDrawCount, ke = me ? ne.get(me).bytesPerElement : 1, Ut = T.get(F).currentProgram.getUniforms();
        for (let Wt = 0; Wt < Ot; Wt++)
          Ut.setValue(I, "_gl_DrawID", Wt), He.render(gt[Wt] / ke, we[Wt]);
      }
      else if (N.isInstancedMesh) He.renderInstances(_e, it, N.count);
      else if (V.isInstancedBufferGeometry) {
        const gt = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0, we = Math.min(V.instanceCount, gt);
        He.renderInstances(_e, it, we);
      } else He.render(_e, it);
    };
    function vA(v, L, V) {
      v.transparent === !0 && v.side === 2 && v.forceSinglePass === !1 ? (v.side = 1, v.needsUpdate = !0, Nn(v, L, V), v.side = 0, v.needsUpdate = !0, Nn(v, L, V), v.side = 2) : Nn(v, L, V);
    }
    this.compile = function(v, L, V = null) {
      V === null && (V = v), D = $.get(V), D.init(L), B.push(D), V.traverseVisible(function(N) {
        N.isLight && N.layers.test(L.layers) && (D.pushLight(N), N.castShadow && D.pushShadow(N));
      }), v !== V && v.traverseVisible(function(N) {
        N.isLight && N.layers.test(L.layers) && (D.pushLight(N), N.castShadow && D.pushShadow(N));
      }), D.setupLights();
      const F = /* @__PURE__ */ new Set();
      return v.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite)) return;
        const Ae = N.material;
        if (Ae) if (Array.isArray(Ae)) for (let le = 0; le < Ae.length; le++) {
          const pe = Ae[le];
          vA(pe, V, N), F.add(pe);
        }
        else
          vA(Ae, V, N), F.add(Ae);
      }), D = B.pop(), F;
    }, this.compileAsync = function(v, L, V = null) {
      const F = this.compile(v, L, V);
      return new Promise((N) => {
        function Ae() {
          if (F.forEach(function(le) {
            T.get(le).currentProgram.isReady() && F.delete(le);
          }), F.size === 0) {
            N(v);
            return;
          }
          setTimeout(Ae, 10);
        }
        Ye.get("KHR_parallel_shader_compile") !== null ? Ae() : setTimeout(Ae, 10);
      });
    };
    let Er = null;
    function Ua(v) {
      Er && Er(v);
    }
    function wA() {
      Mi.stop();
    }
    function EA() {
      Mi.start();
    }
    const Mi = new Da();
    Mi.setAnimationLoop(Ua), typeof self < "u" && Mi.setContext(self), this.setAnimationLoop = function(v) {
      Er = v, oe.setAnimationLoop(v), v === null ? Mi.stop() : Mi.start();
    }, oe.addEventListener("sessionstart", wA), oe.addEventListener("sessionend", EA), this.render = function(v, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        Te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (W === !0) return;
      y !== null && y.renderStart(v, L);
      const V = oe.enabled === !0 && oe.isPresenting === !0, F = g !== null && (U === null || V) && g.begin(_, U);
      if (v.matrixWorldAutoUpdate === !0 && v.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), oe.enabled === !0 && oe.isPresenting === !0 && (g === null || g.isCompositing() === !1) && (oe.cameraAutoUpdate === !0 && oe.updateCamera(L), L = oe.getCamera()), v.isScene === !0 && v.onBeforeRender(_, v, L, U), D = $.get(v, B.length), D.init(L), D.state.textureUnits = z.getTextureUnits(), B.push(D), xt.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Qe.setFromProjectionMatrix(xt, nn, L.reversedDepth), pt = this.localClippingEnabled, $e = Me.init(this.clippingPlanes, pt), P = ve.get(v, S.length), P.init(), S.push(P), oe.enabled === !0 && oe.isPresenting === !0) {
        const Ae = _.xr.getDepthSensingMesh();
        Ae !== null && Mr(Ae, L, -1 / 0, _.sortObjects);
      }
      Mr(v, L, 0, _.sortObjects), P.finish(), _.sortObjects === !0 && P.sort(he, xe, L.reversedDepth), ft = oe.enabled === !1 || oe.isPresenting === !1 || oe.hasDepthSensing() === !1, ft && be.addToRenderList(P, v), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), $e === !0 && Me.beginShadows();
      const N = D.state.shadowsArray;
      if (Pe.render(N, v, L), $e === !0 && Me.endShadows(), (F && g.hasRenderPass()) === !1) {
        const Ae = P.opaque, le = P.transmissive;
        if (D.setupLights(), L.isArrayCamera) {
          const pe = L.cameras;
          if (le.length > 0) for (let me = 0, ye = pe.length; me < ye; me++) {
            const Ue = pe[me];
            PA(Ae, le, v, Ue);
          }
          ft && be.render(v);
          for (let me = 0, ye = pe.length; me < ye; me++) {
            const Ue = pe[me];
            MA(P, v, Ue, Ue.viewport);
          }
        } else
          le.length > 0 && PA(Ae, le, v, L), ft && be.render(v), MA(P, v, L);
      }
      U !== null && X === 0 && (z.updateMultisampleRenderTarget(U), z.updateRenderTargetMipmap(U)), F && g.end(_), v.isScene === !0 && v.onAfterRender(_, v, L), fe.resetDefaultState(), J = -1, ee = null, B.pop(), B.length > 0 ? (D = B[B.length - 1], z.setTextureUnits(D.state.textureUnits), $e === !0 && Me.setGlobalState(_.clippingPlanes, D.state.camera)) : D = null, S.pop(), S.length > 0 ? P = S[S.length - 1] : P = null, y !== null && y.renderEnd();
    };
    function Mr(v, L, V, F) {
      if (v.visible === !1) return;
      if (v.layers.test(L.layers)) {
        if (v.isGroup) V = v.renderOrder;
        else if (v.isLOD)
          v.autoUpdate === !0 && v.update(L);
        else if (v.isLightProbeGrid) D.pushLightProbeGrid(v);
        else if (v.isLight)
          D.pushLight(v), v.castShadow && D.pushShadow(v);
        else if (v.isSprite) {
          if (!v.frustumCulled || Qe.intersectsSprite(v)) {
            F && et.setFromMatrixPosition(v.matrixWorld).applyMatrix4(xt);
            const Ae = R.update(v), le = v.material;
            le.visible && P.push(v, Ae, le, V, et.z, null);
          }
        } else if ((v.isMesh || v.isLine || v.isPoints) && (!v.frustumCulled || Qe.intersectsObject(v))) {
          const Ae = R.update(v), le = v.material;
          if (F && (v.boundingSphere !== void 0 ? (v.boundingSphere === null && v.computeBoundingSphere(), et.copy(v.boundingSphere.center)) : (Ae.boundingSphere === null && Ae.computeBoundingSphere(), et.copy(Ae.boundingSphere.center)), et.applyMatrix4(v.matrixWorld).applyMatrix4(xt)), Array.isArray(le)) {
            const pe = Ae.groups;
            for (let me = 0, ye = pe.length; me < ye; me++) {
              const Ue = pe[me], Ne = le[Ue.materialIndex];
              Ne && Ne.visible && P.push(v, Ae, Ne, V, et.z, Ue);
            }
          } else le.visible && P.push(v, Ae, le, V, et.z, null);
        }
      }
      const N = v.children;
      for (let Ae = 0, le = N.length; Ae < le; Ae++) Mr(N[Ae], L, V, F);
    }
    function MA(v, L, V, F) {
      const { opaque: N, transmissive: Ae, transparent: le } = v;
      D.setupLightsView(V), $e === !0 && Me.setGlobalState(_.clippingPlanes, V), F && E.viewport(te.copy(F)), N.length > 0 && Un(N, L, V), Ae.length > 0 && Un(Ae, L, V), le.length > 0 && Un(le, L, V), E.buffers.depth.setTest(!0), E.buffers.depth.setMask(!0), E.buffers.color.setMask(!0), E.setPolygonOffset(!1);
    }
    function PA(v, L, V, F) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null) return;
      if (D.state.transmissionRenderTarget[F.id] === void 0) {
        const Ne = Ye.has("EXT_color_buffer_half_float") || Ye.has("EXT_color_buffer_float");
        D.state.transmissionRenderTarget[F.id] = new Kt(1, 1, {
          generateMipmaps: !0,
          type: Ne ? Ii : Ei,
          minFilter: pr,
          samples: Math.max(4, tt.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: Oe.workingColorSpace
        });
      }
      const N = D.state.transmissionRenderTarget[F.id], Ae = F.viewport || te;
      N.setSize(Ae.z * _.transmissionResolutionScale, Ae.w * _.transmissionResolutionScale);
      const le = _.getRenderTarget(), pe = _.getActiveCubeFace(), me = _.getActiveMipmapLevel();
      _.setRenderTarget(N), _.getClearColor(We), qe = _.getClearAlpha(), qe < 1 && _.setClearColor(16777215, 0.5), _.clear(), ft && be.render(V);
      const ye = _.toneMapping;
      _.toneMapping = 0;
      const Ue = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), D.setupLightsView(F), $e === !0 && Me.setGlobalState(_.clippingPlanes, F), Un(v, V, F), z.updateMultisampleRenderTarget(N), z.updateRenderTargetMipmap(N), Ye.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ne = !1;
        for (let _e = 0, je = L.length; _e < je; _e++) {
          const { object: it, geometry: nt, material: He, group: gt } = L[_e];
          if (He.side === 2 && it.layers.test(F.layers)) {
            const we = He.side;
            He.side = 1, He.needsUpdate = !0, _A(it, V, F, nt, He, gt), He.side = we, He.needsUpdate = !0, Ne = !0;
          }
        }
        Ne === !0 && (z.updateMultisampleRenderTarget(N), z.updateRenderTargetMipmap(N));
      }
      _.setRenderTarget(le, pe, me), _.setClearColor(We, qe), Ue !== void 0 && (F.viewport = Ue), _.toneMapping = ye;
    }
    function Un(v, L, V) {
      const F = L.isScene === !0 ? L.overrideMaterial : null;
      for (let N = 0, Ae = v.length; N < Ae; N++) {
        const le = v[N], { object: pe, geometry: me, group: ye } = le;
        let Ue = le.material;
        Ue.allowOverride === !0 && F !== null && (Ue = F), pe.layers.test(V.layers) && _A(pe, L, V, me, Ue, ye);
      }
    }
    function _A(v, L, V, F, N, Ae) {
      v.onBeforeRender(_, L, V, F, N, Ae), v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, v.matrixWorld), v.normalMatrix.getNormalMatrix(v.modelViewMatrix), N.onBeforeRender(_, L, V, F, v, Ae), N.transparent === !0 && N.side === 2 && N.forceSinglePass === !1 ? (N.side = 1, N.needsUpdate = !0, _.renderBufferDirect(V, L, F, N, v, Ae), N.side = 0, N.needsUpdate = !0, _.renderBufferDirect(V, L, F, N, v, Ae), N.side = 2) : _.renderBufferDirect(V, L, F, N, v, Ae), v.onAfterRender(_, L, V, F, N, Ae);
    }
    function Nn(v, L, V) {
      L.isScene !== !0 && (L = mt);
      const F = T.get(v), N = D.state.lights, Ae = D.state.shadowsArray, le = N.state.version, pe = ie.getParameters(v, N.state, Ae, L, V, D.state.lightProbeGridArray), me = ie.getProgramCacheKey(pe);
      let ye = F.programs;
      F.environment = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? L.environment : null, F.fog = L.fog;
      const Ue = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap;
      F.envMap = K.get(v.envMap || F.environment, Ue), F.envMapRotation = F.environment !== null && v.envMap === null ? L.environmentRotation : v.envMapRotation, ye === void 0 && (v.addEventListener("dispose", Gt), ye = /* @__PURE__ */ new Map(), F.programs = ye);
      let Ne = ye.get(me);
      if (Ne !== void 0) {
        if (F.currentProgram === Ne && F.lightsStateVersion === le)
          return xA(v, pe), Ne;
      } else
        pe.uniforms = ie.getUniforms(v), y !== null && v.isNodeMaterial && y.build(v, V, pe), v.onBeforeCompile(pe, _), Ne = ie.acquireProgram(pe, me), ye.set(me, Ne), F.uniforms = pe.uniforms;
      const _e = F.uniforms;
      return (!v.isShaderMaterial && !v.isRawShaderMaterial || v.clipping === !0) && (_e.clippingPlanes = Me.uniform), xA(v, pe), F.needsLights = Oa(v), F.lightsStateVersion = le, F.needsLights && (_e.ambientLightColor.value = N.state.ambient, _e.lightProbe.value = N.state.probe, _e.directionalLights.value = N.state.directional, _e.directionalLightShadows.value = N.state.directionalShadow, _e.spotLights.value = N.state.spot, _e.spotLightShadows.value = N.state.spotShadow, _e.rectAreaLights.value = N.state.rectArea, _e.ltc_1.value = N.state.rectAreaLTC1, _e.ltc_2.value = N.state.rectAreaLTC2, _e.pointLights.value = N.state.point, _e.pointLightShadows.value = N.state.pointShadow, _e.hemisphereLights.value = N.state.hemi, _e.directionalShadowMatrix.value = N.state.directionalShadowMatrix, _e.spotLightMatrix.value = N.state.spotLightMatrix, _e.spotLightMap.value = N.state.spotLightMap, _e.pointShadowMatrix.value = N.state.pointShadowMatrix), F.lightProbeGrid = D.state.lightProbeGridArray.length > 0, F.currentProgram = Ne, F.uniformsList = null, Ne;
    }
    function DA(v) {
      if (v.uniformsList === null) {
        const L = v.currentProgram.getUniforms();
        v.uniformsList = lr.seqWithValue(L.seq, v.uniforms);
      }
      return v.uniformsList;
    }
    function xA(v, L) {
      const V = T.get(v);
      V.outputColorSpace = L.outputColorSpace, V.batching = L.batching, V.batchingColor = L.batchingColor, V.instancing = L.instancing, V.instancingColor = L.instancingColor, V.instancingMorph = L.instancingMorph, V.skinning = L.skinning, V.morphTargets = L.morphTargets, V.morphNormals = L.morphNormals, V.morphColors = L.morphColors, V.morphTargetsCount = L.morphTargetsCount, V.numClippingPlanes = L.numClippingPlanes, V.numIntersection = L.numClipIntersection, V.vertexAlphas = L.vertexAlphas, V.vertexTangents = L.vertexTangents, V.toneMapping = L.toneMapping;
    }
    function Na(v, L) {
      if (v.length === 0) return null;
      if (v.length === 1) return v[0].texture !== null ? v[0] : null;
      x.setFromMatrixPosition(L.matrixWorld);
      for (let V = 0, F = v.length; V < F; V++) {
        const N = v[V];
        if (N.texture !== null && N.boundingBox.containsPoint(x)) return N;
      }
      return null;
    }
    function Fa(v, L, V, F, N) {
      L.isScene !== !0 && (L = mt), z.resetTextureUnits();
      const Ae = L.fog, le = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? L.environment : null, pe = U === null ? _.outputColorSpace : U.isXRRenderTarget === !0 ? U.texture.colorSpace : Oe.workingColorSpace, me = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, ye = K.get(F.envMap || le, me), Ue = F.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4, Ne = !!V.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), _e = !!V.morphAttributes.position, je = !!V.morphAttributes.normal, it = !!V.morphAttributes.color;
      let nt = 0;
      F.toneMapped && (U === null || U.isXRRenderTarget === !0) && (nt = _.toneMapping);
      const He = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, gt = He !== void 0 ? He.length : 0, we = T.get(F), Ot = D.state.lights;
      if ($e === !0 && (pt === !0 || v !== ee)) {
        const Ke = v === ee && F.id === J;
        Me.setState(F, v, Ke);
      }
      let ke = !1;
      F.version === we.__version ? (we.needsLights && we.lightsStateVersion !== Ot.state.version || we.outputColorSpace !== pe || N.isBatchedMesh && we.batching === !1 || !N.isBatchedMesh && we.batching === !0 || N.isBatchedMesh && we.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && we.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && we.instancing === !1 || !N.isInstancedMesh && we.instancing === !0 || N.isSkinnedMesh && we.skinning === !1 || !N.isSkinnedMesh && we.skinning === !0 || N.isInstancedMesh && we.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && we.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && we.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && we.instancingMorph === !1 && N.morphTexture !== null || we.envMap !== ye || F.fog === !0 && we.fog !== Ae || we.numClippingPlanes !== void 0 && (we.numClippingPlanes !== Me.numPlanes || we.numIntersection !== Me.numIntersection) || we.vertexAlphas !== Ue || we.vertexTangents !== Ne || we.morphTargets !== _e || we.morphNormals !== je || we.morphColors !== it || we.toneMapping !== nt || we.morphTargetsCount !== gt || !!we.lightProbeGrid != D.state.lightProbeGridArray.length > 0) && (ke = !0) : (ke = !0, we.__version = F.version);
      let Ut = we.currentProgram;
      ke === !0 && (Ut = Nn(F, L, N), y && F.isNodeMaterial && y.onUpdateProgram(F, Ut, we));
      let Wt = !1, ci = !1, Ni = !1;
      const Je = Ut.getUniforms(), st = we.uniforms;
      if (E.useProgram(Ut.program) && (Wt = !0, ci = !0, Ni = !0), F.id !== J && (J = F.id, ci = !0), we.needsLights) {
        const Ke = Na(D.state.lightProbeGridArray, N);
        we.lightProbeGrid !== Ke && (we.lightProbeGrid = Ke, ci = !0);
      }
      if (Wt || ee !== v) {
        E.buffers.depth.getReversed() && v.reversedDepth !== !0 && (v._reversedDepth = !0, v.updateProjectionMatrix()), Je.setValue(I, "projectionMatrix", v.projectionMatrix), Je.setValue(I, "viewMatrix", v.matrixWorldInverse);
        const Ke = Je.map.cameraPosition;
        Ke !== void 0 && Ke.setValue(I, Rt.setFromMatrixPosition(v.matrixWorld)), tt.logarithmicDepthBuffer && Je.setValue(I, "logDepthBufFC", 2 / (Math.log(v.far + 1) / Math.LN2)), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && Je.setValue(I, "isOrthographic", v.isOrthographicCamera === !0), ee !== v && (ee = v, ci = !0, Ni = !0);
      }
      if (we.needsLights && (Ot.state.directionalShadowMap.length > 0 && Je.setValue(I, "directionalShadowMap", Ot.state.directionalShadowMap, z), Ot.state.spotShadowMap.length > 0 && Je.setValue(I, "spotShadowMap", Ot.state.spotShadowMap, z), Ot.state.pointShadowMap.length > 0 && Je.setValue(I, "pointShadowMap", Ot.state.pointShadowMap, z)), N.isSkinnedMesh) {
        Je.setOptional(I, N, "bindMatrix"), Je.setOptional(I, N, "bindMatrixInverse");
        const Ke = N.skeleton;
        Ke && (Ke.boneTexture === null && Ke.computeBoneTexture(), Je.setValue(I, "boneTexture", Ke.boneTexture, z));
      }
      N.isBatchedMesh && (Je.setOptional(I, N, "batchingTexture"), Je.setValue(I, "batchingTexture", N._matricesTexture, z), Je.setOptional(I, N, "batchingIdTexture"), Je.setValue(I, "batchingIdTexture", N._indirectTexture, z), Je.setOptional(I, N, "batchingColorTexture"), N._colorsTexture !== null && Je.setValue(I, "batchingColorTexture", N._colorsTexture, z));
      const hi = V.morphAttributes;
      if ((hi.position !== void 0 || hi.normal !== void 0 || hi.color !== void 0) && ze.update(N, V, Ut), (ci || we.receiveShadow !== N.receiveShadow) && (we.receiveShadow = N.receiveShadow, Je.setValue(I, "receiveShadow", N.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && L.environment !== null && (st.envMapIntensity.value = L.environmentIntensity), st.dfgLUT !== void 0 && (st.dfgLUT.value = _u()), ci) {
        if (Je.setValue(I, "toneMappingExposure", _.toneMappingExposure), we.needsLights && Qa(st, Ni), Ae && F.fog === !0 && de.refreshFogUniforms(st, Ae), de.refreshMaterialUniforms(st, F, ue, re, D.state.transmissionRenderTarget[v.id]), we.needsLights && we.lightProbeGrid) {
          const Ke = we.lightProbeGrid;
          st.probesSH.value = Ke.texture, st.probesMin.value.copy(Ke.boundingBox.min), st.probesMax.value.copy(Ke.boundingBox.max), st.probesResolution.value.copy(Ke.resolution);
        }
        lr.upload(I, DA(we), st, z);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (lr.upload(I, DA(we), st, z), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && Je.setValue(I, "center", N.center), Je.setValue(I, "modelViewMatrix", N.modelViewMatrix), Je.setValue(I, "normalMatrix", N.normalMatrix), Je.setValue(I, "modelMatrix", N.matrixWorld), F.uniformsGroups !== void 0) {
        const Ke = F.uniformsGroups;
        for (let ln = 0, Fi = Ke.length; ln < Fi; ln++) {
          const SA = Ke[ln];
          ge.update(SA, Ut), ge.bind(SA, Ut);
        }
      }
      return Ut;
    }
    function Qa(v, L) {
      v.ambientLightColor.needsUpdate = L, v.lightProbe.needsUpdate = L, v.directionalLights.needsUpdate = L, v.directionalLightShadows.needsUpdate = L, v.pointLights.needsUpdate = L, v.pointLightShadows.needsUpdate = L, v.spotLights.needsUpdate = L, v.spotLightShadows.needsUpdate = L, v.rectAreaLights.needsUpdate = L, v.hemisphereLights.needsUpdate = L;
    }
    function Oa(v) {
      return v.isMeshLambertMaterial || v.isMeshToonMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isShadowMaterial || v.isShaderMaterial && v.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return O;
    }, this.getActiveMipmapLevel = function() {
      return X;
    }, this.getRenderTarget = function() {
      return U;
    }, this.setRenderTargetTextures = function(v, L, V) {
      const F = T.get(v);
      F.__autoAllocateDepthBuffer = v.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), T.get(v.texture).__webglTexture = L, T.get(v.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : V, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(v, L) {
      const V = T.get(v);
      V.__webglFramebuffer = L, V.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(v, L = 0, V = 0) {
      U = v, O = L, X = V;
      let F = null, N = !1, Ae = !1;
      if (v) {
        const le = T.get(v);
        if (le.__useDefaultFramebuffer !== void 0) {
          E.bindFramebuffer(I.FRAMEBUFFER, le.__webglFramebuffer), te.copy(v.viewport), ce.copy(v.scissor), Ee = v.scissorTest, E.viewport(te), E.scissor(ce), E.setScissorTest(Ee), J = -1;
          return;
        } else if (le.__webglFramebuffer === void 0) z.setupRenderTarget(v);
        else if (le.__hasExternalTextures) z.rebindTextures(v, T.get(v.texture).__webglTexture, T.get(v.depthTexture).__webglTexture);
        else if (v.depthBuffer) {
          const ye = v.depthTexture;
          if (le.__boundDepthTexture !== ye) {
            if (ye !== null && T.has(ye) && (v.width !== ye.image.width || v.height !== ye.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            z.setupDepthRenderbuffer(v);
          }
        }
        const pe = v.texture;
        (pe.isData3DTexture || pe.isDataArrayTexture || pe.isCompressedArrayTexture) && (Ae = !0);
        const me = T.get(v).__webglFramebuffer;
        v.isWebGLCubeRenderTarget ? (Array.isArray(me[L]) ? F = me[L][V] : F = me[L], N = !0) : v.samples > 0 && z.useMultisampledRTT(v) === !1 ? F = T.get(v).__webglMultisampledFramebuffer : Array.isArray(me) ? F = me[V] : F = me, te.copy(v.viewport), ce.copy(v.scissor), Ee = v.scissorTest;
      } else
        te.copy(Ce).multiplyScalar(ue).floor(), ce.copy(Be).multiplyScalar(ue).floor(), Ee = Xe;
      if (V !== 0 && (F = H), E.bindFramebuffer(I.FRAMEBUFFER, F) && E.drawBuffers(v, F), E.viewport(te), E.scissor(ce), E.setScissorTest(Ee), N) {
        const le = T.get(v.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + L, le.__webglTexture, V);
      } else if (Ae) {
        const le = L;
        for (let pe = 0; pe < v.textures.length; pe++) {
          const me = T.get(v.textures[pe]);
          I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0 + pe, me.__webglTexture, V, le);
        }
      } else if (v !== null && V !== 0) {
        const le = T.get(v.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, le.__webglTexture, V);
      }
      J = -1;
    }, this.readRenderTargetPixels = function(v, L, V, F, N, Ae, le, pe = 0) {
      if (!(v && v.isWebGLRenderTarget)) {
        Te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let me = T.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && le !== void 0 && (me = me[le]), me) {
        E.bindFramebuffer(I.FRAMEBUFFER, me);
        try {
          const ye = v.textures[pe], Ue = ye.format, Ne = ye.type;
          if (v.textures.length > 1 && I.readBuffer(I.COLOR_ATTACHMENT0 + pe), !tt.textureFormatReadable(Ue)) {
            Te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!tt.textureTypeReadable(Ne)) {
            Te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= v.width - F && V >= 0 && V <= v.height - N && I.readPixels(L, V, F, N, Z.convert(Ue), Z.convert(Ne), Ae);
        } finally {
          const ye = U !== null ? T.get(U).__webglFramebuffer : null;
          E.bindFramebuffer(I.FRAMEBUFFER, ye);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(v, L, V, F, N, Ae, le, pe = 0) {
      if (!(v && v.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let me = T.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && le !== void 0 && (me = me[le]), me) if (L >= 0 && L <= v.width - F && V >= 0 && V <= v.height - N) {
        E.bindFramebuffer(I.FRAMEBUFFER, me);
        const ye = v.textures[pe], Ue = ye.format, Ne = ye.type;
        if (v.textures.length > 1 && I.readBuffer(I.COLOR_ATTACHMENT0 + pe), !tt.textureFormatReadable(Ue)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!tt.textureTypeReadable(Ne)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const _e = I.createBuffer();
        I.bindBuffer(I.PIXEL_PACK_BUFFER, _e), I.bufferData(I.PIXEL_PACK_BUFFER, Ae.byteLength, I.STREAM_READ), I.readPixels(L, V, F, N, Z.convert(Ue), Z.convert(Ne), 0);
        const je = U !== null ? T.get(U).__webglFramebuffer : null;
        E.bindFramebuffer(I.FRAMEBUFFER, je);
        const it = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return I.flush(), await Oo(I, it, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, _e), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, Ae), I.deleteBuffer(_e), I.deleteSync(it), Ae;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(v, L = null, V = 0) {
      const F = Math.pow(2, -V), N = Math.floor(v.image.width * F), Ae = Math.floor(v.image.height * F), le = L !== null ? L.x : 0, pe = L !== null ? L.y : 0;
      z.setTexture2D(v, 0), I.copyTexSubImage2D(I.TEXTURE_2D, V, 0, 0, le, pe, N, Ae), E.unbindTexture();
    }, this.copyTextureToTexture = function(v, L, V = null, F = null, N = 0, Ae = 0) {
      let le, pe, me, ye, Ue, Ne, _e, je, it;
      const nt = v.isCompressedTexture ? v.mipmaps[Ae] : v.image;
      if (V !== null)
        le = V.max.x - V.min.x, pe = V.max.y - V.min.y, me = V.isBox3 ? V.max.z - V.min.z : 1, ye = V.min.x, Ue = V.min.y, Ne = V.isBox3 ? V.min.z : 0;
      else {
        const st = Math.pow(2, -N);
        le = Math.floor(nt.width * st), pe = Math.floor(nt.height * st), v.isDataArrayTexture ? me = nt.depth : v.isData3DTexture ? me = Math.floor(nt.depth * st) : me = 1, ye = 0, Ue = 0, Ne = 0;
      }
      F !== null ? (_e = F.x, je = F.y, it = F.z) : (_e = 0, je = 0, it = 0);
      const He = Z.convert(L.format), gt = Z.convert(L.type);
      let we;
      L.isData3DTexture ? (z.setTexture3D(L, 0), we = I.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (z.setTexture2DArray(L, 0), we = I.TEXTURE_2D_ARRAY) : (z.setTexture2D(L, 0), we = I.TEXTURE_2D), E.activeTexture(I.TEXTURE0), E.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, L.flipY), E.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), E.pixelStorei(I.UNPACK_ALIGNMENT, L.unpackAlignment);
      const Ot = E.getParameter(I.UNPACK_ROW_LENGTH), ke = E.getParameter(I.UNPACK_IMAGE_HEIGHT), Ut = E.getParameter(I.UNPACK_SKIP_PIXELS), Wt = E.getParameter(I.UNPACK_SKIP_ROWS), ci = E.getParameter(I.UNPACK_SKIP_IMAGES);
      E.pixelStorei(I.UNPACK_ROW_LENGTH, nt.width), E.pixelStorei(I.UNPACK_IMAGE_HEIGHT, nt.height), E.pixelStorei(I.UNPACK_SKIP_PIXELS, ye), E.pixelStorei(I.UNPACK_SKIP_ROWS, Ue), E.pixelStorei(I.UNPACK_SKIP_IMAGES, Ne);
      const Ni = v.isDataArrayTexture || v.isData3DTexture, Je = L.isDataArrayTexture || L.isData3DTexture;
      if (v.isDepthTexture) {
        const st = T.get(v), hi = T.get(L), Ke = T.get(st.__renderTarget), ln = T.get(hi.__renderTarget);
        E.bindFramebuffer(I.READ_FRAMEBUFFER, Ke.__webglFramebuffer), E.bindFramebuffer(I.DRAW_FRAMEBUFFER, ln.__webglFramebuffer);
        for (let Fi = 0; Fi < me; Fi++)
          Ni && (I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, T.get(v).__webglTexture, N, Ne + Fi), I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, T.get(L).__webglTexture, Ae, it + Fi)), I.blitFramebuffer(ye, Ue, le, pe, _e, je, le, pe, I.DEPTH_BUFFER_BIT, I.NEAREST);
        E.bindFramebuffer(I.READ_FRAMEBUFFER, null), E.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else if (N !== 0 || v.isRenderTargetTexture || T.has(v)) {
        const st = T.get(v), hi = T.get(L);
        E.bindFramebuffer(I.READ_FRAMEBUFFER, G), E.bindFramebuffer(I.DRAW_FRAMEBUFFER, k);
        for (let Ke = 0; Ke < me; Ke++)
          Ni ? I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, st.__webglTexture, N, Ne + Ke) : I.framebufferTexture2D(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, st.__webglTexture, N), Je ? I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, hi.__webglTexture, Ae, it + Ke) : I.framebufferTexture2D(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_2D, hi.__webglTexture, Ae), N !== 0 ? I.blitFramebuffer(ye, Ue, le, pe, _e, je, le, pe, I.COLOR_BUFFER_BIT, I.NEAREST) : Je ? I.copyTexSubImage3D(we, Ae, _e, je, it + Ke, ye, Ue, le, pe) : I.copyTexSubImage2D(we, Ae, _e, je, ye, Ue, le, pe);
        E.bindFramebuffer(I.READ_FRAMEBUFFER, null), E.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else Je ? v.isDataTexture || v.isData3DTexture ? I.texSubImage3D(we, Ae, _e, je, it, le, pe, me, He, gt, nt.data) : L.isCompressedArrayTexture ? I.compressedTexSubImage3D(we, Ae, _e, je, it, le, pe, me, He, nt.data) : I.texSubImage3D(we, Ae, _e, je, it, le, pe, me, He, gt, nt) : v.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, Ae, _e, je, le, pe, He, gt, nt.data) : v.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, Ae, _e, je, nt.width, nt.height, He, nt.data) : I.texSubImage2D(I.TEXTURE_2D, Ae, _e, je, le, pe, He, gt, nt);
      E.pixelStorei(I.UNPACK_ROW_LENGTH, Ot), E.pixelStorei(I.UNPACK_IMAGE_HEIGHT, ke), E.pixelStorei(I.UNPACK_SKIP_PIXELS, Ut), E.pixelStorei(I.UNPACK_SKIP_ROWS, Wt), E.pixelStorei(I.UNPACK_SKIP_IMAGES, ci), Ae === 0 && L.generateMipmaps && I.generateMipmap(we), E.unbindTexture();
    }, this.initRenderTarget = function(v) {
      T.get(v).__webglFramebuffer === void 0 && z.setupRenderTarget(v);
    }, this.initTexture = function(v) {
      v.isCubeTexture ? z.setTextureCube(v, 0) : v.isData3DTexture ? z.setTexture3D(v, 0) : v.isDataArrayTexture || v.isCompressedArrayTexture ? z.setTexture2DArray(v, 0) : z.setTexture2D(v, 0), E.unbindTexture();
    }, this.resetState = function() {
      O = 0, X = 0, U = null, E.reset(), fe.reset();
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
    t.drawingBufferColorSpace = Oe._getDrawingBufferColorSpace(e), t.unpackColorSpace = Oe._getUnpackColorSpace();
  }
}, mA = `
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
`, xu = `
  ${mA}
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
    vCurl = peelMask
      * sin(clamp(normalizedArc, 0.0, 3.14159265))
      * (1.0 - clamp(uDetachedTension, 0.0, 1.0));
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
`, mf = `
  ${mA}

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
`, Su = `
  uniform sampler2D uMap;
  uniform sampler2D uPreparedMap;
  uniform float uPreparedMix;
  uniform vec2 uTexel;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
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
  uniform float uPreserveFrontColor;
  uniform float uOpacity;

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

    vec4 printSample = texture2D(uMap, surfaceUv);
    if (uPreparedMix > 0.0) {
      vec4 preparedSample = texture2D(uPreparedMap, surfaceUv);
      printSample = mix(printSample, preparedSample, uPreparedMix);
    }
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
    vec3 lightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float normalLight = max(dot(normal, lightDirection), 0.0);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    float printHighlight = pow(max(dot(normal, halfDirection), 0.0), 42.0) * 0.055;
    float frontDiffuse = mix(1.0, 0.76 + 0.24 * normalLight, frontDeformation);
    vec3 litFrontColor = printSample.rgb * frontDiffuse + printHighlight;
    litFrontColor += fresnel * 0.025;
    vec3 frontColor = mix(
      litFrontColor,
      printSample.rgb,
      preservedFront
    );

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
`, Cu = `
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
`, yu = `
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
`, Tu = `
  ${mA}

  varying vec2 vDepthUv;

  void main() {
    vDepthUv = uv;
    vec3 deformed = deformSticker(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`, Bu = `
  uniform sampler2D uMap;
  varying vec2 vDepthUv;

  void main() {
    float artworkAlpha = texture2D(uMap, vDepthUv).a;
    if (artworkAlpha < 0.04) discard;
    gl_FragColor = vec4(1.0);
  }
`, bu = "data:audio/mpeg;base64,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UQCH0q01oGmnLht0AgjKHjedpdG/krlVFsiA60xsCOJAJGxQuctRBikVDCbaTUEF7DKXioqWTRMvieniNKzXbJ6NvOpKCgDxTTANikDcLwMN8CzIFjAfQHyARlBkVDZE5GJFwIIxIJyQfAOQCYCCcDBODEhAIyg2gFKQfNeshgoqDChdrP15//3v85///rrojcHrwn0eMNntU1Rsg88/YYvkE//7nMy//HEVLmXZQCAAAbVTAQmCCEoRa7S0SGUTSCFcrJUbr1BWmTqTNpmJsUw7wFJMnQgms6ssYNkEwC2N1DkOK5nhuNHNPqsyBYo0Vcq5muk0rVtDRXZ8mmJENNkZThQ9cqa7Evt6eQobp2H/+5LEMoAhRhFMmYeAAz2wLj8w8ADMeYQ5CyEpBvLgIEdY2SFGchpdi9K57cqgaRKUugS7k7EHLgoUAkFadBvkob0k/YkdRdKKxxGuJjKJwonEvhYlaczezIcX9aLehZ/s6NY4qAXmk5WtDmZhZYV4J2pVvUT0Q414AjyFOZ7D6Rl2CLK2nAuz6U101Taof2k1lTR5ewul00VgQqGTG4tMH///////////saaaluT///////////q5zk1d3dxkxcPURDtt8miWQiW17cAsRoaRSkmOPkgWLCa63i69KoM3ao8gMAMAHqGmW8slSaaOEcLqOc9BbRIC4Cbk7OtVLsekeMdJni7OhOeCn04wriKac8JvSScVbgwKCBEljRWWdhv3kWj7xP3jyIxwW672RktWl3mqIXe6rxzTUceKxqBTN7AuntsUpi1s70z70h6Hs6GKyJam2uVacWeeBPesbWYcCDWPqPnMTV3jJEfv7vHlI8N+7dNMd6wwHF5L9OLXaDDawAiElSf//AKltttttciUSiSJRJBIKKlIloqtQhUVMrQN//uSxAwAGS2VabmHgBsesWx3MYADBaA20IArpwV3FzC9DVIumsfwk6H4AhjWSBklxujILxbXkJP9kUTTAbUPgRrOacVK5bEIVLArDuZYM0JsljVXRpVmu/fxFer4MVlVsmVxMzWYltFK9csTpONrYpYT5igOS4a6M2JbVcZnl77zOz2iPLNvfMU7LNqLLF0+vBe1g2pEeRLut0xS0img+TMXeqq1iznP8JVWxSl7pyBL4je513msKLNtcLmKwsV7wp2uSCuoUT0kizlSiUSIIBAA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yRlBLhYGgLd9+38EiTWIMZ09+TzAAV4ZQFSSZgFGhccLCJrrYDKv5/////////////////yCBN9////////////////W64MsCKTcSSAeIK4nY6UwrXGqYs1MckZOqA8YO+sqtlueq9v/Ha8NK9F21jn/+5LEsoAngg8Y2PyAAoszZG+ewAG1Wo4Phk6XfD9DJ5aeuxZdv48YhhWk0xMS6uv8P8zafOrR/ZpHlsaOoGvddaeTNWfXm30axw4+zSx1aYh6TaPLjJbTk6UkmJ6691IW25epl08nKW0Dzh8TicISFEOo6oy6VTEmiS6erX77WKJ1a5b9vq7HIGmv3auulQU2o0QgHgjGgeAVoKiEoVsUA2K562c+h36Gu7uzt+96n97K+BaurHl9a3Z5bAWzNQV1yH8DCxdaJYvPF2x3j1G+8kO2N+q6J5Gy8WT51UgD/Gsu7T59mq9ktxJYWYT41H5YW1DZ0lJLXITrCXUqGcVcfWIyavhV5TdlpmT4SRKJJK6i+ygjmK4OzAljocjsTSVy7oUi5b8CZew/B0bD9LX62fOrH/AIAAAALzoVIGAYsQ0AAZ7XvQnJ1mWiqszaXue1UCBDwcld9balSKxcTKQWluLsU3dUaQDoODYEzl6ljWFAFhQcDSiBglDrVd11VjrJgNk6W67KdNNCcgqlSNAW8ph4Es+MtzTSdOVs7csQARIu//uSxImAFLGbJXSWAAT0weLXM6AACg6tyjih6AZhqYbSWauA78eEgRQUYw3FUDDZQk6ISxdhJAyYcOHiwhlLQYAbVp7zveztoRax32TyhgzXmJNbcIOQCIQXwMMIMsCTUL2EAEDE3ZRvdd4YchpmELrxllIoFbuzlVddrFGZp0uyuuGmxqquioA7ZEPauzdDmcg4Sgb7MuM1Rsx7v4YT0//+eSTTTWHS3z/9St2t9/0a1nNdVTMwGWSjneldO4Zc8vWWQLsb////////////////////////////////////+BHX6rV0+HAGAAImYEKOGTDqxwAcQgGI2Cjw54qR+2uAQAsI3dN4DCoBTXMCBBABFVBWiizJQMDSDdNVF21oxeH18JWGAHJmGFFGCJyxMdl7Ny3jd11go2vhOUzgMMnGJZBw9ti5QsASUSMVgoXflip4eYWFwYADAYewMQkmGLUXSs0SCrTZIDhiO4cDf9NC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0ZOnULjZ60vEEKnO1en5xJYKRanqkuxIKLRosiRzm4dPc3Dkqd//3mXqt7VpqKoARlNOLMTRJGlFOz0aceZG5/s07xakiJxoEKLKPhyizCni1JGnFvV1dJpKkJY6ojUTODIKh4ugXSOnDp1JdScJw3YyVSThNJZNK6tY6cLJpKrEI0Hxg4dLHTh0oNjAeGyAnPEwpEQyMh4bICc8TCkiIipYqWKh4bGDhdRdJNIuUSXhOF1axxpRZRZQGBAR5l5v+TU1JxpwGJAjyCaKRpx1VVVMQf/7ksRSA9QloIJDJNtIAAA0gAAABE1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=", Iu = "data:audio/wav;base64,UklGRpD2AABXQVZFZm10IBAAAAABAAIAgLsAAADuAgAEABAAZGF0YWz2AAD///3//v///wAA+//+/wEAAAD7//7//v//////AAD8//3/AAABAPv//P8AAAIA+//8/wEAAgD7//z///8CAP7//P/9/wMA/v/8////AgD9//7///8AAP7/AAD9//7/AAACAP7//f/+/wIAAAD+//3///8BAAIA/f/9/wAAAgD+//7/AQAAAP7/AAAAAP7//v8CAAAA/P///wEAAQD+//3///8CAAIA/P/8/wMAAwD9//v/AgAEAP7//P8AAAIAAgD///3///8DAAIA/v///wIAAgAAAAEAAQAAAP//AwAEAP////8FAAIA//8BAAQAAQABAAIAAgACAAMAAAABAAMAAwABAAIAAgACAAEAAwACAAEAAQAEAAMA//8BAAYAAgD//wIAAwABAAEAAwACAAAAAQACAAIAAQACAAEAAAACAAQAAQD+/wEABAACAP3/AAAHAAIA+////wcABAD+//3/AQAFAAMA/v/+/wIAAgAAAAEAAQABAP7/AAAEAAEA/f8BAAMAAAD+/wMAAgD9////BQABAP7/AAADAP//AAACAAAA/v8CAAIAAAD//wIAAQAAAP//AgAAAP//AAAEAAEA/v///wMAAgD///3/AgAEAAEA/P8AAAQAAgD9////AwACAP7/AAACAAEAAAAAAAAAAQAAAP//AQABAP//AQAEAP7//f8DAAIA/P8AAAMAAAD+/wMAAAD+/wIAAwD9////AwADAP////8AAAMAAgAAAP//AwABAAAAAgADAP7///8DAAUA///+/wIABAABAAEA//8CAAQAAQD+/wMABQAAAP//BAACAAAAAgADAAEAAgACAAIAAQACAAMAAgAAAAEAAwADAAIAAQAAAAMABQAAAP7/BQAGAP3///8IAAQA+/8BAAgAAQD9/wQABQAAAP//AwAEAAAAAQABAAEAAwADAP//AQADAAEAAAADAAAA//8DAAQA/v8AAAQAAgD9/wIAAwABAP//AQABAAIAAQABAAAAAgABAAEAAQACAAEAAAAAAAQAAgD//wEAAwACAAEAAQABAAIAAwACAP//AQAEAAMAAAADAAIAAQABAAMAAgADAAIAAQAAAAMABAACAP//AQADAAMAAQACAAEAAAACAAUAAgD+/wAABgADAP7///8GAAUA/v/+/wYABgD///3/AwAGAAMA//8BAAMABAADAAEAAAADAAQAAwAAAAMABAADAAEABAAEAAMAAAAEAAYABAD+/wMACAAGAP7/AwAGAAYAAQACAAQABgACAAIABAAGAAEAAwAFAAYAAgACAAMABwAEAAIAAAAFAAYAAwABAAUABQAEAAEABAAEAAUAAgACAAQABwABAAIABgAGAP//AgAGAAYAAgABAAEABwAGAAAA//8IAAUAAAABAAQABAAEAAEAAgAEAAQAAAADAAMAAgADAAUAAAABAAYAAwD+/wMABAACAAEABAACAAAAAwAEAP//AAAGAAQA/f///wgABAD8/wEABQABAAEAAwABAP7/BAAGAP///f8EAAYAAAD+/wIAAgACAAMAAQD+/wIABAABAP7/AAADAAMA///+/wIABAD/////AgABAP7/AQACAAAA/v8BAAIAAAD+/wIAAQD+//7/AwACAP///v8CAAEA///+/wIAAQD///7/AgACAAAA/P8BAAMAAAD8/wIAAwD///3/AwABAP////8CAAEAAAD//wIAAgABAP7/AQACAAIA/////wAAAwABAAEA//8AAAEABAD/////AQAAAP//BAACAP3///8FAAEA/v8AAAIAAQABAAAAAAABAAIAAAD//wAAAgAAAAAAAAAAAAEAAQAAAP//AAABAP//AAACAAAA/v8AAAEAAQAAAP7/AQACAAAA/v8AAAIAAAD+////AgABAP3/AAADAP7//P8DAAMA/P/9/wQAAQD8/wAAAwD+//3/AgADAP3//f8CAAIA///+////AAABAAEA/v/9/wEAAwAAAPz///8CAAEA/f/9/wIAAwD+//z///8FAAEA+//9/wQAAgD9//3/AwAAAP3/AAACAP7/AAABAAAA/P8BAAIA/v/9/wIAAgD///7/AgAAAP//AQABAP7/AQADAAAA/f8CAAIAAQABAP////8EAAIA/v8BAAQAAAD//wQAAQD//wIAAwABAAEAAQACAAIAAgABAAMAAQABAAIAAwAAAAIAAwAEAAAAAAAEAAUA//8AAAMABQABAAEAAQADAAIAAQABAAQAAgACAAAAAgADAAIA/v8CAAQAAgD//wMAAgAAAP//BQACAP//AAACAAIAAwAAAP//AAAEAAEA/////wMAAgD/////BAABAP//AAADAP//AAACAAIA/v8BAAEAAQABAAIA//8AAAAAAgACAAAA/P8CAAMAAAD//wIAAAD//wAABAAAAP7///8DAAAAAAAAAAAA//8BAAIAAQD9/wAAAwAAAPv/AQAFAP7//P8CAAIA///+////AQABAP7///8BAAAA/v8AAAEA///+/wAAAwD///z/AAACAP////////7///8DAP///f///wEA//////7/AAAAAP///f8AAAAA/v/+/wIA/v/8/wAAAwD8//v/AQADAPz//f8AAAAA/v/////////+//7///8AAP3///8AAP7//f8AAAAA/v/9//7/AAABAP7//f///wEAAAD9//7/AAD+//7/AQAAAPv///8CAP7//P///wAA///+//7///8AAP///f/+/wAA///9//7/AAD////////9////AQD///z//v8AAP7/AAAAAPz//P8BAAIA/P/6/wAAAQD+//v//v8BAP///P/9////AAD8//z///8AAP3//P///wIA/P/6//7/AQD8//z//v////z//v/9/////f/8//z/AQD+//r/+v8BAP7//P/7/////v/9//r///////v/+f8AAP///P/6//3//v////n//P/+////+//8//z//v/+//z/+f/+/////v/8//3/+//9//7////6//v//f8AAPz/+//7/wAA/v/8//v////8//z//f////z//f/9/wAA/P/7//z/AQD///z//P8AAP7//v/8//7//v8AAP7//P/9/wIA///7//z/AgD///7//f///////v/9/wAA//////7///8AAAEA/f/9/wEAAAD8/wAAAQD///3/AQAAAP///f/+/wEAAQD8////AgD+//3/BAAAAPr///8EAP3//f8BAAAA/v//////AAABAP///f///wIAAQD8//7/AQAAAP////8AAAAAAAD+////AgAAAP3///8CAAAA/v8AAAAA//8AAAAA/////wEA///+/wEAAAD///////8BAAAA/v///wAAAAAAAAAA/v///wEA//////////8BAAAA/f///wIA/////wAAAAD//wEAAQD///7/AAABAAIA///9////BAACAP7//v8BAAEAAgD///3///8FAAMA/f/7/wMABgAAAPr/AQAEAAAA/v8DAAEA/P8BAAQA/v/+/wMAAQD9/wAAAgD/////AQD/////AQACAP///f8AAAMAAAD9/wAAAwAAAP7///8AAAIAAgD9//3/AwACAP3/AAACAP///v8CAAEA/////wEA//8CAAEA/f///wUAAAD9/wAABAD/////AQABAP//AQABAAEA//8AAAAAAgD/////AQABAP//AQAAAP////8EAP///P8BAAYA///7/wAABgD///z/AQAEAP7//v8CAAIA/v8AAAAA//8BAAMA/v/9/wEABAD///7///8BAAAAAgD///7/AQADAP7//v8AAAMAAAD///7/AwABAP7///8CAP//AAABAAAA/v8CAAAA/////wIA/////wAAAQAAAAAA/f8BAAMA///7/wIAAgD+//3/AgABAAAA/v//////AgAAAP///f8AAAIAAgD9//3/AQADAP7//v8BAAEA/v8BAAEAAAD//wEAAAD//wAAAQD//wAAAQAAAP//AgAAAP7/AAACAAAAAAAAAAAAAQABAP//AAACAAAA//8CAAEAAAAAAAAAAQABAAIA///+/wIABAD+//3/AgADAAAA//8AAAIAAQAAAP7/AQADAP///f8DAAMA/v/9/wQAAQD+/wAAAgD/////AgACAP3/AAADAAEA/v8AAAEAAQD//wAAAQACAP///v8CAAMA/f///wMAAAD+/wMAAgD9////AwABAP///f8BAAMAAQD8////AgABAP//AAD//wAA//8BAAEA/v/8/wMAAwD9//3/AwD///7//v8BAP//AAD+//7/AAACAPz//v8AAAAA/P8BAAAA/v/7/wEAAAD+//3////9/wAA//////v///8BAP//+v/+////AAD9//7//P/////////7////AAD+//r/AAAAAP7/+//+////AgD9//v///8DAPz//P8AAAEA/P8AAP///f/+/wIA///+//7/AQD+/wAA////////AAD//wIA///+////AwAAAP////8BAP//AQAAAAAA//8BAAIAAQD+/wAAAQACAP//AQABAP////8EAAIA/P/9/wYAAwD9//7/AwACAAAA/v8AAAEAAgAAAAAA//8BAAIAAQD+/wAAAgAAAP7/AgACAP///v8BAAEAAAAAAAEA/////wEAAQD//wAA/////wIAAQD//wAAAQD+/wAAAwAAAP3/AAABAAIAAAD/////AwABAP////8BAP//AQABAAAA//8DAAAAAQAAAAAA/v8CAAEAAgAAAAAA/v8FAAIA/f/+/wYAAQD+////BQAAAP//AAAFAP////8CAAMA/f8DAAIAAAD//wQAAAAAAAEAAgD+/wIAAQABAP//AgAAAAIAAAACAP//AAAAAAMAAAAAAP//AgAAAAIA//8AAAAAAwAAAP///v8DAAAAAAAAAAIA/v/+/wEABAD+//3///8EAAEA/v/+/wMAAQD/////AgD//wEAAQABAP//AQABAAIA/v///wMABQD9//7/AwAFAP7//P8CAAYAAAD9/wEAAwD//wIAAgD+////BQACAP7/AAADAAEAAgAAAAAAAgACAP//AgADAAEA//8DAAMAAAD//wIAAgADAAAAAQADAAMA//8BAAIAAgAAAAIAAQADAAEAAAABAAQA//8AAAQABAD9/wAAAwACAP//AgABAAAAAQAEAAAA/v///wIAAgACAP3//v8CAAQAAAD+////AQABAAIA///9//7/BAADAP7//f8BAAIAAgD+//7/AQADAP///v8BAAIAAAD//wAAAgAAAP//AgACAP3///8EAAIA/v///wEAAgACAAAA/v8BAAQAAAD9/wIABAD+//3/BAAEAP////8AAAEAAgACAP7///8DAAIA//8AAAAAAQACAAEA/f8CAAQA///+/wIAAgABAAAAAAABAAIA//8BAAQAAQD9/wIABAAAAPz/AgAFAAAA/f8DAAQA/v///wUAAQD9/wEABgD///3/AwAEAP3///8GAAIA+/8CAAUAAQD+/wEAAAACAAEA/////wUAAgD9//7/BgADAPv//P8HAAQA/f/9/wQAAQABAAEAAAD+/wIAAgACAP7/AAADAAMAAAAAAAAAAgAAAAIAAQABAP//AQADAAIA/f8AAAIAAwAAAAAAAAAAAAEAAwD///7/AQAEAAAA/f8BAAMAAAD//wAAAQABAAEA//8AAAMAAAD+/wEAAgD//wEAAgD/////AwABAAAAAQAAAP//BAADAPz//v8GAAQA/v/9/wMAAwD/////AgACAAAAAAADAAEA/////wEAAgABAAAAAAAAAAIAAAABAAEA/v8AAAMAAAD9/wEAAgD+////AgAAAP////8BAAAA//8BAP///f8BAAIA/v/9/wIAAQD+/wAAAQD9////AgAAAPz/AAACAAAA/v///wAAAAABAAAA/P8AAAMAAQD8//7/AgABAP//AAD9////AwADAPz//P8DAAMA/v/+/wAAAgABAP///v8BAAIA///9/wIAAgD+////AgAAAP//AQAAAAAAAgAAAP7/AAABAAEAAgD///z/BAAGAP3/+v8EAAUA/f/+/wMAAAD+/wEAAgD///7/AQABAP///v8AAAAA//8AAAEA/f/+/wEAAQD8//3/AgACAPz//f8CAAEA/P///wAA/v/8/wIAAQD8//z/AQAAAP7//f8AAP///v/+/wAA/f/8////AwD9//r//v8DAP//+//9/wEAAAD9//3/AAD///3//v8AAP///f/8////AAD+//3///8AAP7//f/+///////9//3///////7////+//z///8CAP//+//+/wEA/v/+/////f/+/wIAAAD7//7/AwAAAPz//f8BAAEA/v/+/wAAAQD///7///8CAAAA/f///wIAAQD/////AAD//wEAAQD///3/AQADAAEA/v///wAABAABAP3//v8FAAIA/f8AAAQAAAD+/wAAAwACAP///v8DAAMAAAD//wEAAQABAAAA/v8BAAUA///6/wQACAD8//n/BgAGAPr//P8GAAMA/f///wIAAQAAAP//AAAAAAAAAAABAP7//v8BAAIA///9////AgAAAP7//v8BAAAA//8BAP///v8BAAEA/v///wEA/////wEAAAD+/wAAAAAAAAAA/v/+/wIAAwD9//v/AgADAP3//f8CAAEA/v8AAAEA/v/+/wIAAAD9////BAABAP3///8CAAAAAAD//wEAAAD//wAAAwAAAP7/AQADAP//AAAAAAEAAAAAAAEAAwD/////AgADAP7/AAABAAEAAAACAAEAAQAAAAAAAQADAP////8BAAIAAAABAAEAAQAAAAEAAQAAAP//AgADAP///v8DAAIA/v8AAAIAAAAAAAIAAgD//wAAAgACAAAA/v8BAAQAAAD9/wIABQD///7/AwACAP7///8DAAEA//8BAAEAAAACAAEA/v8AAAMA//8AAAIA///+/wMAAQD//wAAAQAAAAIAAQD+//7/AwAEAP///P8DAAUA///8/wEAAwACAP///v8BAAUAAAD8/wAABQAAAP7/AgACAP7/AAACAAEA/v///wIAAwAAAP7/AQABAAAAAQD///7/AgAEAAAA/f///wIAAgD///3/AAACAAAA//8BAAEA/v///wEAAAAAAAAA/v/+/wMAAgD9//7/AgABAP7///8AAP//AAAAAAAAAAD+//7/AwABAPv//v8DAP7//v8BAP///P8BAAIA/f/8/wEAAQD9//3/AQD///3///8BAPz//v8AAP7//f8AAP///v/+/wAA/v///////v///wEA/P/9/wEAAwD8//v/AAAEAP///P/9/wMAAQD8//z/BAABAPz///8EAP///P8BAAMA/v8AAAIAAAD//wIAAgD///7/AgADAAEA//8AAAMAAgD+/wAABAACAP3/AQAGAAEA/v8BAAIAAQACAAEAAAACAAIA//8BAAMAAQD//wIAAwABAP//AQACAAIAAAABAAEAAgACAAEA//8CAAMAAQD+/wIAAwAAAP//AwABAAAAAQABAAAAAwABAP//AAAFAAAA/f8BAAUAAAD+/wEABQAAAP7///8EAAIA//8AAAIA//8CAAIA///9/wMAAwABAP//AQAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAAD//wMAAAD//wEAAwD+//7/AQACAP//AAAAAAEAAAD//wAAAgD+//7/AQACAP/////+/wAAAwAAAPr///8FAAIA+v/+/wQAAgD8//7/AwABAPz/AQADAP///v8CAAIA/////wIAAAD//wIAAwD/////AwADAP7/AQADAAAA//8CAAUAAAD8/wIABgABAP3/AgAFAAAA//8EAAMA//8AAAMAAwAAAAEAAwACAAEAAgABAAAAAgAFAAAA//8EAAQAAQAAAAEAAgAFAAMA/v8CAAcAAwD+/wEABQAEAAEAAQACAAMAAgACAAIAAgAAAAQABQABAP//AwADAAAAAQAEAAEAAgACAAIAAAACAAMAAQD//wMAAgABAAAAAgACAAIAAAAAAAIAAwD//wAAAQACAAAAAQABAAEAAAABAAEAAQD//wAAAQADAAMA/v/9/wMABQD+//z/AwAEAP////8CAAIAAAD/////AgACAAAA//8AAAEAAgABAP///v8BAAEAAQABAP///v8CAAMA///9/wEAAgABAAAA/v///wIAAQD+////AQAAAP//AAAAAAAA//8AAAAA/v/+/wIAAgD8//3/BAACAPz//f8CAAEA/f///wIAAAD9/wAAAgD+//z/AQACAPz//v8DAAAA/P/+/wEAAAD9////AAAAAP////8AAP7//v8BAP///////////v8BAAAA/f/9/wIAAgD+//z/AAACAAAA+/8BAAQA/f/6/wQABAD8//v/AgABAAEAAAD9//3/BQACAPz//f8EAAEA///+/wEAAAAAAAAAAQD+/wEAAAAAAP7/AgAAAP3//v8FAP///P///wMA///////////+/wIAAAD+//3/AQAAAAAA/P///////////wAA/v///wAA///+/wEA///8//7/AgAAAP3//v8BAAEA/f/+/wEA///9////AgD+//v/AgADAPv/+/8DAAIA/P/9/wEA/////wAA/v/9/wAAAAD////////+////AAABAP3//P8AAAMA///7////AAD+////AAD+//3/AAABAP7//P8BAAMA/P/8/wIAAgD9//7//////wIAAAD7////BAAAAPz/AAABAP7/AAABAP7///8CAP///f8BAAIA/v///wEAAQAAAAEA/v///wIAAgD/////AAACAAEAAAD+/wEAAgABAP7/AAACAAMA/v///wIABAD/////AAADAAEAAQD+/wIAAwADAP3///8DAAUA/f///wIABAD//wEAAQACAP//AgABAAIA/v8CAAEAAgD//wMAAQAAAP//BAABAAAA/v8DAAEAAQD+/wAAAwACAPv/AQAEAAAA+/8CAAIA/v///wIA/f///wEAAAD9/wEAAgD///v/AQACAP7/+/8AAAIAAAD9/wAA/v/9/wAAAwD8//v/AgADAPv//v8AAP7//v8CAP///f/+/wEA//////3//v///wEA///+//z/AAABAP///P/+/wAAAQD+//3//f8CAAEA/P/7/wIAAgD9//z/AAAAAP7//v////7/AAD///3//v8AAAAA/v/+//3///8BAP7//P///wAAAAD9//3///////3///////7//f8AAP7//v////7/+////wEA///8//7///8BAP7//P/9/wEA///9//7/AAD+/////v////7/AAD+//3///8CAP3//P8AAAIA/v/+/wAAAAD+/wAA/v///wEAAAD9////AgACAPz//v8BAAEA///+/wAAAgD+////AQACAP7//f8CAAMA////////AAAAAAIA///+/wAAAwD///7/AgADAP3//v8CAAIA/v///wEAAQD+/wAAAAABAP7//////wEA//8AAP/////+/wAA//8AAP7//////wIA/f/9/wAAAgD8//3/AAABAP3////+/wAA/v8AAP7//v/9/wEA///+//z///8BAAIA+//7/wEABQD7//n/AAAEAP7//f/+/wAA//8BAP7//f/+/wIAAQD///z///8CAAEA/f8AAAIAAAD8/wEAAwD///3/AwADAP7//v8DAAIAAAD+/wAAAgADAP////8BAAMAAAD//wEAAgD/////AgADAP//AAAAAAAAAQABAP7///8BAAIAAAD/////AQAAAP7///8CAAAA/f///wMA/v/8/wEAAgD+//3/AAACAP///f///wIA///9/wEAAQD9////AQD/////AQD///7/AAABAP7//v8BAAEA/f/9/wEAAwD9//z/AgACAP3//v8BAP///f8BAAEA/v/+/wEAAgD+//z/AAACAAAA/P/+/wEAAQD+//7//////wAAAAD+////AQD///3/AAAAAP7//v8AAP///v8AAAAA/f/9/wAAAQD9//7/AAD+//3/AQAAAPz//f8BAAEA/f/7/wAAAgD///v//v8BAAAA/f/8/wAAAwD+//v///8CAP7//v/+////AQD///3///8CAP///P8AAAIAAAD8//3/AwADAPv/+/8EAAQA+//8/wQAAQD7/wAAAwD+//7/AQAAAP//AQD///7/AAACAAAA//8AAAEAAAD/////AgABAP7//v8EAAIA/f///wQAAAD+/wEAAgD+/wEAAQABAAAA//8AAAMA/////wEAAQD+/wMAAgD9//3/BQACAP7//v8EAAEA///+/wQAAQD+//7/BAABAAAA/v8CAAEAAgD//wEAAAABAP//AwD//wAAAAAEAAAAAAD+/wUAAgD///v/BgAFAP7//P8FAAEAAQABAAIA/f8EAAIAAAD//wMA//8CAAEAAAD//wQA///+/wEABQD+//7/AQADAP7///8AAAAA//8CAAAA/v/+/wIAAAD+//7/AgD///7///8AAP////////////8AAP///f/+/wAAAQD///z///8CAAAA+//+/wQA///7////AgAAAP7///////7/AAABAAAA/v///wEAAQD9//7/AgABAP3/AAACAAAAAAABAP7///8CAAIA//8AAAEAAQAAAAEA//8AAAEAAgAAAP//AAAEAAEA/f///wUAAQD+/wAAAgABAAEAAAAAAAEAAwAAAP7/AAADAAEA/v///wIAAQABAAAA/////wIAAQD+/wAAAQAAAAEAAAD//wAAAgAAAP7/AQABAP//AAAAAAEAAQD/////AQACAP////8BAAIAAAD+/wAABAACAP7///8CAAEAAQABAP//AAAEAAIAAAAAAAMAAgAAAAEAAwABAAAAAgADAAEAAgADAAAA//8EAAUAAAD+/wMABQABAAAAAgACAAIAAgACAAEAAAABAAMAAgD//wIAAwABAP7/AAACAAIA/v8AAAIAAgD+/wAAAQAAAP//AQAAAAEAAAABAP//AAAAAAEAAAABAP7/AAACAAEA/f8BAAEA/////wQA///8/wEABAD//wAAAAAAAAAAAgAAAAEAAQD/////BQADAP3//f8EAAQA///+/wMAAwABAP//AQADAAIA/v8BAAQAAQD+/wMABAD///7/BAADAAAAAAADAAAAAAABAAMAAAD//wEABQAAAP3/AgAGAP///f8BAAQAAQAAAP7/AgACAAAA//8DAAEA/v8AAAUAAQD9////BQABAP7/AAABAAEAAwD///7/AQAEAP///v8BAAIA/////wIAAgD9/wAABAAAAP3/AQAEAAAA/v8AAAMAAQD+/wAAAwAAAAAAAQAAAAEAAQD+////BAABAPv/AQAFAP///P8DAAIA/v///wMAAAD//wAAAgAAAP////8BAAAA/////wEAAAAAAP////8AAAAA//8AAP///////wAA//8BAP////8BAAAA/f8AAAEAAQD+//7///8DAAEA/v/+/wAAAgACAPz//f8EAAQA+//+/wUAAwD9////AQACAAEAAQD//wIAAgACAAEAAgD//wEABAADAP//AgADAAQAAQACAAIABAABAAIAAwAEAAAABAAFAAQA//8DAAYABQD+/wMABgAGAAEAAgACAAgABQABAAEACAADAAIABQAGAAAABgAGAAMAAQAHAAQAAwADAAUAAwAGAAMAAgADAAgABAABAAEABwAFAAEAAQAIAAUAAAACAAYAAgACAAMABQACAAMABAAEAAIAAgADAAUAAQACAAQAAwABAAMABAADAAIAAwACAAMAAwADAAMAAgAAAAQABQABAAAABQADAAIAAwAFAAAAAAAEAAYAAQAAAAMABQAAAAQABQD+//7/CAAGAP7///8FAAIAAgAEAAEA//8DAAMAAQAAAAIAAgACAAEAAAACAAMAAQD+/wAAAwADAAAA/v8BAAMAAQABAP//AAABAAIA//8AAAIAAQD9/wEAAwAAAP3/AgACAP///v8CAAEA///+/wEAAgABAP7///8AAAMAAQD9//z/AgAEAAEA/P/9/wMABgD8//v/AwAFAPv//P8EAAQA/f8AAAAAAAAAAAIA/v/+/wMAAgD6/wEABgAAAPn/AgAFAP///P8BAAAAAgABAP///v8DAAEA/v///wMA/////wIAAwD9////AgACAP7/AAACAAEA/v8BAAEAAAD//wEAAQABAAEA/v///wQA///+/wEAAQD+/wEAAgD+//3/AgAAAAAA////////AQAAAP///f8AAAEAAAD9/wAA/////wAAAAD8/wEAAAD9//3/AgD+//7/AAD+//v/AgAAAPz/+/8BAP///v/9////+//+///////8//7//v////z//f/9/wEA/f/7//3/AgD9//r//v8CAPv//f/+/////P/+//3//v/8/////f/+//3//v/7///////8//n/AwD9//n/+/8DAPv/+//9//7//P8AAPr//f/9//7/+v/+//3//v/7//7/+/////z//f/6/////v/9//n////+//7/+v/+//3//v/8//7//f8AAPv//P/+/wEA/P/7//3/AQD///7/+v/+/wAA///8//3///8AAP7//f/8/wEAAAD8//z/AAAAAP3//f8AAAAA/v/9////AgD+//v///8DAAEA/P/8/wIAAQD///7/AAAAAAAA//8BAP/////+/wEAAQD/////AQD//wAAAAABAP7/AAAAAAEAAAAAAP7/AgACAAAA/P8BAAIAAwD+//7/AAAEAAAA/v///wMA/v///wIAAgD9/wAAAAACAP//AAD//wEAAAACAP//AAD//wQAAAD+////BAAAAAEA//8BAAAAAwD//wAAAQADAP3/AgACAAEA/f8CAAIAAgD9/wEAAgADAPz///8DAAUA/P/+/wIABQD9////AQADAP7/AAD//wIAAAABAP7/AQAAAAIA/v8AAP//AAD//wIA//8AAP//AQD+////AAABAP3/AQACAP7//P8EAAEA+//+/wQA///+/wIAAAD8/wEAAgABAP3//v8BAAQAAAD8//7/AwABAP//AAABAP//AAACAAAA/P/+/wMAAgD+////AQABAP//AAD/////AAAAAAEAAQD+/wAAAgD///3/AgAAAP7/AQACAP////8AAAAAAQABAPz//v8DAAIA/f/+/wIAAQD+/wAAAQD///3/AgACAP3//v8CAAEA/f///wEAAAD+////AAABAP7//f8AAAIA/v/+/////////wIA///8//7/AwAAAP3//f8BAAAA///9/wAAAAAAAPz///8CAAEA/P/+/wAAAAD//wEA/v/+////AgD///7//f8AAAEAAQD+//7//v8BAAAA///9/wEAAAD+//7/AQAAAP///f///wAAAQD8//7/AAAAAP3//v8AAAAA/f////7/AAD///7//v8AAP7//f/+/wIA/f/8/wAAAgD9//z/AAABAPv//f8BAAEA+//8/wEAAQD8//3//v/////////8//7/AQD+//v/AAAAAPz//f8CAP//+//9/wIAAAD9//3///8CAAAA+////wQA///6/wIABAD8//z/BAAAAP3/AAADAP///////wEAAgABAPz/AAADAAEA/v8BAAEAAQABAAAA//8CAAAA//8BAAIA/v8BAAQA///8/wQABAD9//7/AwABAP7/AQACAP7/AAADAAAA/f8BAAMA/////wEAAAAAAAEA///+/wIABAD9//3/AwADAP3//f8BAAMAAAD9////BAAAAPv/AAAEAP//+/8AAAMAAAD+//7/AAABAP///v/+/wAAAgAAAPz//v8EAAIA+//8/wIAAwD+//z/AAABAAAA/////////v8BAAEA/v/9////AQAAAP3///8AAP////8BAP///P///wEA//////////////////8BAAAA/P///wMAAAD9//7/AAABAAAA//8AAAEA/v/9/wIAAgD+//3/AQAEAAAA/v8AAAAA//8BAAMAAAD8/wAABQADAPv//f8FAAQA/P///wQAAgD9////AgACAP7//v8DAAQA/f/9/wIABAD+//3/AQAEAAAA/v///wMAAQAAAP//AgABAP//AAACAP7/AQADAAAA/f8CAAMA///+/wIAAAAAAAEAAgD+/wAAAgABAP//AgAAAAAAAAABAAEAAgD+//7/AwAEAPz//v8DAAIA/v8AAAAAAAABAAIA/////wAAAwAAAAAA/v8BAAIAAQD//wEAAAABAAEAAQD9/wIAAgD/////AwD//wAAAgADAP3/AAABAAMAAQABAP//AwABAAIA//8DAAIAAAD//wUAAwAAAP//BQAAAAAAAgAFAAAA//8AAAUAAQABAAIAAgD+/wQABAABAP7/AwABAAIABAADAP3/AQADAAMAAAABAAEAAgABAAEAAQABAP//AgADAAAA//8DAAIA/v///wQAAwAAAP7/AQAEAAMA/f///wMAAwABAAAA//8AAAQAAwD8//7/BAAFAP///v8CAAMAAAABAAAAAgACAAEAAAADAAEAAQABAAIAAAACAAMAAQAAAAIAAgABAAAAAgACAP//AQADAAEAAAABAAEAAgADAAAA//8EAAMA/f///wYAAgD9/wAABQACAP//AAACAAEAAgAAAAAAAQADAAAAAAACAAIA//8CAAIA//8AAAQAAgD//wAAAwABAAEA//8AAAMAAQD//wMAAgD+////BAABAP3/AAAEAAIA/v/+/wMAAgD+//7/AgAAAAAAAQABAP3/AAADAAAA/P8BAAIAAAD9/wIAAgD///7/AwABAP///f8DAAEA/////wIAAAACAAAAAQD+/wEAAgACAP7/AgABAAEA//8CAAAAAgABAAAAAAAGAP///f8CAAUA/v///wQABAD8/wIAAwAAAP//BAAAAP7/AgAFAP7/AAAAAAIAAQABAP//AgAAAP//AgADAPz/AQADAAAA/P8DAAMA/f/9/wQAAQD+//7/AwABAP7//v8BAAAAAAAAAAEA/v/+/wIAAwD9//3/AQACAP//AAAAAP7/AAACAP////8AAAAAAAABAAAA/v8BAAEA//8BAAIA//8AAAIAAAD+/wIAAgD+//7/BQAEAPz//P8GAAUA/P/8/wUAAwD+/wAAAwD//wAAAwADAP3/AAAEAAIA/f8BAAMAAQD9/wIAAwAAAP7/AwACAP///v8BAAAAAQAAAP///v8DAAEA///+/wEAAAAAAP7/AAD//wAA//8AAP7/AAABAAAA+////wIAAQD9//7//f8BAAMA///5/wAABAD///z/AAD///3/AAADAPz//P8CAAEA/f///wAA/v/+/wIA///+////AAD//wAA//8AAP////8AAAIA///9/wAAAwD+//3/AQABAP7///8BAAAA//8BAP7//v8CAAEA/P/+/wMAAgD8//7/AwABAPv//v8DAP///P8AAAEA//////7//v8BAAAA/f/+////AQAAAP3//P8BAAIA/v/9/wAA//////7/AQD+//z/AAAEAP//+//9/wIAAQD///7/AAD/////AgABAPz//v8DAAIAAAD/////AQADAAEA/f///wQAAgAAAP//AAACAAIAAQAAAP//AAADAAQA/////wIAAgD//wEAAgABAAAAAAACAAMAAAD+/wIAAgD+////BAAAAP3/AQADAP7/AAAAAP//AAABAP3///8EAAAA+v8CAAQA/f/8/wMAAQD8//7/BAD///v/AAAEAP7//v8BAAAA/f8BAAAA/f/+/wIAAAD+//3/AgACAP3/+/8CAAMA/f/8/wMAAgD9////AwAAAP3/AAADAP7//v8BAAIAAAD/////AgABAP///f8BAAMAAQD8////BQADAP3///8BAAAAAgADAP3//v8FAAMA/P8BAAUA/v/8/wYABQD7//v/BgAGAP3/+/8CAAMAAQD+////AAADAAAA/f8AAAMA///+/wAAAgAAAAAA/////wAAAAD//wEAAAD+////AwAAAPz///8DAAAA/v8AAAEAAQAAAP7/AAADAAIA/v/+/wIAAwAAAP//AQABAAAAAQABAAAAAgAAAP//AgACAP//AAABAAEAAQABAAAAAgAAAP//AwABAP7/AQACAAAAAAABAP//AQACAP///v8BAAMA///9////AQABAAAA/v/+/wEAAwD///3///8BAAIA///8/wAAAQAAAAAAAAD9/wAABQD///j/AgAFAP3/+/8DAAIA/v/+/wAAAAACAP7//f8BAAMA/v/+/wIAAAD8/wIABAD9//v/AgAEAP///P8BAAEA/////wEAAAD+/wEAAgD/////AAABAAAA//8AAAEAAAAAAAAA///+/wIAAgD9//z/AgADAP//+v///wQAAgD6//z/AwACAPr//v8DAP//+/8BAAIA/v/6/wAAAgD+//n///8BAP7/+/8CAP7/+//+/wAA/P/9//7/AAD9//3//f8AAP//+//7/wIAAQD8//n/AAACAPz/+v8AAAEA/f/8/wAA///9//7/AAD+//z/AAACAP7//P///wEA///+//7///8BAAAA/f/+/wIAAgD9//v/AgAEAP7/+/8AAAUAAQD6////BQAAAPr///8FAAAA/P///wIAAQD+//3///8BAAAA/////wAA/////////v/+/wIAAAD7//7/AgD///3//f///wAAAAD9//7/AAD///3//v/9/wAAAQD8//r/AgADAPz/+f8AAAIA///7//7///8AAP///v/9/wAA///+////AgD8//z/AgABAPv///8BAAAA/f8AAAEAAAD9//7/AgACAPz///8CAAEA/f8AAAAAAAABAAIA/v///wAAAgAAAP///v8CAAEAAQD///////8CAAAA/v///wIAAAAAAP7///8CAAIA+////wQAAQD7/wEAAgD+//7/BAD///z/AAADAP///f///wAAAAD///7/AAD/////////////AAD+//7/AQAAAPz/AAABAPz//v8DAP7/+/8AAAMA/v/9////AAAAAP///f/+/wEAAQD9////AQAAAP3/AAABAP///v8BAP////8AAAIA/////wAAAQD//wEAAAAAAP//AgABAAAA//8CAAEAAAD//wEAAQABAAAAAQAAAAEAAgAAAP7/AQADAAAA/v8BAAIAAgD//wAAAgAAAAAAAwABAP7/AQAEAP///v8CAAIA//8AAAIAAQAAAAEAAQAAAP//AgACAP//AAACAAAAAAAAAAIAAAD//wAABAACAP3//v8FAAIA/v/9/wIABAABAP7/AQACAAIA//8AAAAAAgAAAAAAAgADAP////8AAAIAAQAAAP7/AQADAAMA///+////BgAEAPv//P8GAAUA/v/9/wMAAgACAAEAAAD//wMAAgAAAAAAAwABAAEAAQABAAEAAgAAAP//AwADAP////8CAAIAAAAAAAEAAQABAAEAAQABAAAAAAADAAIA/////wMAAwAAAP//AgACAAAA//8DAAIAAAAAAAIAAgABAAAAAQAAAAIAAgAAAAAABAADAP3//v8GAAUA/f/9/wUABAD/////AgADAAEA//8BAAMAAgD/////AwADAAAA//8CAAQAAAD+/wEAAwAAAP//AAACAAIAAAD+/wEABAAAAPz/AQAEAP///v8DAAEA//8AAAEAAQACAP///v8BAAMA//8AAAEAAgD/////AAADAAEA/f/+/wQAAgD+//3/AQADAAEA/P///wQAAwD7//z/AgAEAP7/+/8AAAUA///8/wAAAwD+//3///8BAP/////+/wAA////////AQD8//7/AQABAPz//v8AAP///v8BAP3//v8AAAAA/P8BAAAA/f/8/wEAAAD+//z/AAAAAP///v8BAPz//v8CAAAA+/8AAP///f///wQA/P/7/wAAAwD8//3///8BAPz///8AAP///P/+////AgD9//z//v8EAP3/+////wMA/v/9//7/AQD+/wAA//////z/AQACAAAA+/8AAAEAAQAAAP7//P8DAAIA///9/wEA//8BAAEAAAD+/wAAAAADAAEA/P/+/wUAAQD+/wAAAwAAAP7/AQACAAAA/////wIAAgAAAAAAAAAAAAAAAgABAAAAAAACAAIAAQD9/wEABAABAP7/AwADAAEA//8CAAEAAwAAAAIAAwADAP//AQACAAUA/////wQABQD+/wEABAADAP7/AwADAAIAAAADAAEAAgACAAMAAAABAAIABQD/////AwAFAP7/AAAEAAMA//8DAAIAAAD//wMAAQABAAEAAwAAAAEAAgADAP7/AQADAAIA//8BAAIAAgD//wEAAgADAP//AgACAAIA//8BAAIABAD//wAAAwAFAP7//v8DAAUA//8AAAAAAwADAAIA/v8AAAIABAACAAAA/v8EAAMAAQABAAMA//8CAAUAAgD9/wEABQAEAP7/AQAEAAIA//8DAAMA/v///wYAAwD+////BAADAAEAAAABAAEAAwABAAEAAQACAAEAAgABAAEAAQACAAAAAQACAAEA//8AAAIAAgD//wAAAQACAAAA//8AAAIAAQD///7/AgADAP///f8BAAMAAAD8/wAABAABAPz/AAAEAAAA/f8AAAEAAAD+/wAAAwABAP3///8DAAEA/f///wEAAQAAAP////8CAAEA/v///wIAAAD+/wEAAQD+/wEAAgD+//3/AgADAP7//f8BAAMAAQD9//7/AQABAAAA/////wAAAQAAAAAA/v///wAAAAD//wAAAAD/////AQD///////8AAAAAAAD//wAA/v/+/wAAAwD///3///8CAAEAAAD9//7/AAADAAEA/f/+/wIA//8BAAIAAAD8/wAABAABAP3///8BAAMAAAD//wEAAAD//wMAAQD9////BQAAAP3/AQADAP///v8BAAMA//8AAAIAAQD//wIAAQD+////BAABAP//AQADAP//AQABAAEA//8BAAEAAgAAAAAAAQADAP//AAAAAAEAAQADAP7///8EAAMA/P8BAAMAAAD+/wQAAAD//wMAAwD7/wEABAD///7/AwAAAAAAAgABAP3/AgABAP7/AAADAP7//v8DAAIA/f///wIAAQD//wEA//8AAAEAAAAAAAAA//8BAAIA///+/wMAAgD+////AgABAP7/AAACAAIA/v8AAAMAAQD+////AgACAP7/AAABAAEAAAAAAP//AQACAP///v8CAAEA/////wAA//8CAAEA/f///wMAAAD9////AgD/////AQAAAP7///8CAP///P8AAAIA/v/9/wEAAgD+//7//v8AAAEA///9////////////AQD///3///8CAAAA/f/9/wEAAAD+////AQAAAP7//v8BAAAA///+////AQAAAP7/AAACAP///f8CAAMA/v/9/wEAAwAAAP7/AAADAAAA/f8BAAMA/v/+/wIAAwD/////AAABAAEA///+/wMAAQD9/wAABQD///3/AgADAP3/AQADAP7//f8FAAMA/P/9/wUAAgD9//7/AwACAAAA/v8BAAEAAAD//wAAAAAAAAAAAQD/////AQACAP3//f8DAAQA/f/8/wEAAQD//wAA/////wEAAAD+/wAAAAD9////BAD///v/AAAEAP//+////wMAAAD+//7/AQABAAAA/f8AAAIAAAD9/wIAAQD+////AgAAAAAA//////7/BAACAP3//P8CAAMAAAD8/wAAAQAAAP7/AQAAAP7///8CAAAA/v///wIA/v/9/wEAAwD+//3/AQABAP7/AAAAAP7///8BAAAA/v///wAAAAD///7///8AAAEA///8/wAAAwAAAP3///8BAP////8AAP////8BAAAA/v8BAAIA/v/+/wEAAQD///////8AAAAAAQABAP///f8AAAMAAAD+/wAAAAD//wEAAgD+//7/AQABAAAA////////AQABAP7///8BAAEA///9/wEAAgD9//7/AgABAP3//v8BAAEAAAD+//7/AQAAAP7///////7/AQAAAP////8BAAAA/////wAA//8AAAAAAAD+/wEAAQD///7/AgD//wAAAQD///7/AgABAP7//v8BAAEAAQD+//7/AgACAP7///8CAAEA//8AAAAAAQABAP7/AAADAAAA/f8CAAMA/v/9/wMAAgD///7/AQABAAEA/////wAAAwAAAP3/AAAFAAAA/P///wQAAAD//wAAAQAAAAEA/////wAAAgD+////AwABAP3/AAACAAAA/f8AAAEAAQD/////AQACAP3//v8CAAMA/f/8/wEABQD///v//f8FAAMA/P/6/wMABQD+//r/AQADAAAA//8AAP7///8CAAIA/P/+/wIAAQD//wAA////////AgAAAP7///8BAAAA/v8AAAMA/P/9/wQAAgD6////BgD///n/AQAEAP7//P8BAAIA///+/wAAAAD///7/AQAAAP7///8BAP///v8AAAEA/v8AAP////8AAAAA/v8AAP///////wEA/f///wIAAQD7//7/AgACAP3//f/+/wQAAQD8//z/AwABAP7//f8AAAAAAAD9/wAAAAD///3/AgAAAP3//f8AAAAAAQD9//z/AAAEAP7//P///wIA///+//3/AAAAAP///v///wAAAgD9//z///8CAP/////+////AAABAP3///8AAP////8BAP///v///wIA///+////AQAAAP///P///wIAAQD8//7/AgABAP3//////wAA///+////AQD///7/AAABAP///v///wEA/v/8/wAAAgD+//7/AQD///3///8BAP7//P/+/wIAAAD7//7/BAD+//r/AAADAPz//P8BAAAA/f////7///8BAP7//P8AAAAA///9////AAAAAP3///8BAP//+/8AAAEA/v/9/wEAAAAAAP3//v8BAAAA+////wMAAAD6/wEAAgD+//3/AgAAAP7///8DAP7//v8BAAIA/P8AAAMAAQD7////AwADAP7//v///wQAAQD///7/AgACAAAA/f8CAAMAAQD9/wEAAwAAAP3/AwADAP///v8CAAMAAQD9/wAAAgADAP////8CAAIA//8AAAEAAgD//wAAAQACAAEA/f/+/wQAAwD+//3/AwACAAAA//8AAAAAAQD//wAAAQAAAP//AQAAAP//AAACAP7//f8CAAQA/P/9/wQABAD7//3/BAADAPz//P8BAAUAAQD7//7/BAABAP7//v8AAAEAAQAAAP////8AAAIAAgD+//3/AgAEAP///P8BAAQAAQD+/wAAAAACAAEA/v8AAAMAAAD//wIAAgD//wAAAgABAAAAAQAAAAEAAQAAAAAAAgABAAAAAAABAAEAAAAAAAIAAAD+/wAABAACAP3///8DAAIA//8AAAIAAQAAAAAAAQACAAEAAAAAAAIAAwABAP//AQADAAIAAAD//wIABQAAAP//AwAEAAAAAQADAAEAAAADAAIAAgACAAEAAAAEAAQAAAD+/wQABgABAP3/BQAFAAAA//8FAAMAAQABAAQAAgADAAEAAgABAAUAAwAAAAAABQACAAAAAgAFAP//AAAEAAUA/////wEABQACAAAAAAAEAAMAAQD//wIAAgACAAEAAgABAAIAAQABAAEAAQABAAEAAQABAAEAAgABAAAAAAACAAEA//8AAAIAAQD//wEAAwAAAP3/AQAFAP7//P8CAAUA///+/wEAAwAAAP//AAACAAAAAAAAAAEAAQABAP////8CAAIA/v///wIAAwD+//7/AgABAP//AgABAP7///8EAAIA/P/+/wUAAwD7//7/BQABAPz/AQADAAAA//8BAP//AAAAAAEAAAAAAP7/AgABAP///P8DAAIA///8/wAAAgADAP3//f///wYAAAD8//z/AgACAAEA/P///wEAAwD9//7/AQACAP3/AAABAAEA/f8BAAAAAAD//wIA/////wIAAwD8////BAADAPz/AAACAAAA//8CAP7///8DAAMA/f///wIA///9/wMAAQD9//3/BAACAP7//P8AAAIAAAD9/wAAAQD/////AgD9//7/AAAAAP7/AAD///////8AAP7/AAD///7///8BAP////////7//v8DAAEA+//9/wQAAgD8//7/AgD+//7/AQABAP3///8BAP7///8CAP7//f8BAAIA/v///wEA/////wAA//8AAAEA///+/wAAAQAAAP///////wAAAQD///3/AAACAAAA/f/+/wMAAgD8//3/AwADAPv//v8EAAEA/P/+/wMAAgD9//7/AgABAP7/AAABAP////8CAAAA/f8AAAMA///9/wAAAgD+////AgD///7/AQAAAP///v8AAAAA/v///wIA///9/wEAAQD+////AgD///3/AQABAP////8AAAAA//8CAAEA/f///wIAAQAAAP////8AAAMAAQD+/wEAAgD//wEAAgAAAP//AwABAAAAAgACAAEAAgD//wAABAADAP7/AAACAAQAAgD+//3/BQAEAP3///8EAAAAAAABAAEA/v8CAAIAAgD+/wAABAAEAPv///8FAAQA/P///wEABAADAP3/+v8FAAYA/f/7/wUAAgD+////AwAAAAEA/////wEABAD+//7/AgACAP7/AQACAP///f8CAAIAAAD//wAAAQACAP////8BAAIAAAAAAAEAAQAAAAAAAAACAAEAAAABAAMAAgAAAP//AQACAAIAAAACAAEAAAACAAUAAAD8/wIABwD///3/BAAGAP3//v8EAAQA/v8BAAMAAQAAAAQAAgD/////BAADAAIA//8AAAQABAD+//7/BQAGAP7//v8EAAMA//8BAAQAAQD+/wIABQD///7/AgACAAEAAwD///7/AwAEAP7//v8DAAIA//8AAAAAAgABAAAA//8AAAEAAAD//wEAAAD//wAAAgAAAP7/AAACAP7//v8BAAIA/v/+/wEAAQD///7///8DAAAA+/8AAAQA///9/wAAAQD+////AQAAAP///////wEAAAD///7/AAABAAAA/f/+/wIAAgD7//7/AwAAAPz/AQAAAP3///8BAP3/AAABAPz/+/8DAAIA/f/8//////8BAP7//f/+/wAA/f8AAAAA/P/6/wEAAwD///n//v8BAAAA/P/9//7/AAD+//7//v////3///////7//P8AAP/////+/wAA/f/9////AgD9//3//v8AAP//AgD9//v//v8EAP7//v////7//f8FAAEA+P/8/wkAAAD3//3/BwD///z///8CAP7//////wAA/v8BAAAA/v/+/wMAAAD+//3/AQABAAAA/v8AAAAA/////wIA/v/+/wEAAAD9/wIAAAD9//7/AQD/////AAD///7/AAD//wAA/v/9/wAAAgD+//3/AAAAAP//AAD///3///8BAAAA/v/9/wAAAQD///////8AAP7/AAABAP///f8BAAIAAAD8/wIAAwD+//z/BAADAP///P8DAAIAAAD+/wEAAQACAP//AAAAAAMA/////wEABAD//wEAAAABAAAAAwD//wAAAgADAP7///8DAAQA/P/+/wQABgD9//3/AwAEAP////8AAAIAAQACAAAAAAABAAIAAQAAAAAAAgAAAAAAAAADAAIA/v/+/wQABAD+//3/AwACAP//AAADAAEA//8AAAMAAAD//wEAAwAAAAAAAQACAP//AgAAAP//AgAEAP7//f8CAAQA/v/+/wEAAwAAAAAAAAABAP7/AQADAAAA/P8CAAMAAAD+/wAAAQACAP7//v8BAAMA/v/+/wIAAgD9/wAAAgAAAP7/AAAAAAIA///9////BQAAAP3/AQADAP7///8AAAAAAAACAP3//f8DAAQA/P/9/wEAAgD+////AAD/////AgD///7/AAAAAP7/AQAAAP3///8EAP7/+/8CAAMA/f/8/wIAAQD9////AAD+/wAAAAD///7/AAAAAAAAAQD+//z/AgAEAP7/+v8CAAQA/v/9/wEAAAAAAAAAAAD9/wEAAgD+//v/AgAEAP7/+v8BAAMA///8////AQABAPz//v8BAAAA/P///wEA/v/9/wEA///9//3/AQAAAP3/+/8AAAIA/f/6/wAAAAD///7//v/9////AQD+//v///8AAP///v/+//3/AAABAP3/+/8BAAAA/f/9/////v////3///8AAP7//P///////v/8//7/AQABAPv//P8BAAAA+f///wEA/f/8/wIA///7//3/AQD8//3/AAD///r///8BAP//+v/+/wAA/v/8/wAAAAD9//z/AQD///7//f////7///8AAAAA/P/9/wAAAgD8//3/AQAAAP3//////wAA/v/+//7/AAD//////v/+//7/AQD///7//P///wEA///8/wAAAAD+//3/AQD///7//v8AAP//AAD+/////v8AAP//AAD+/wAAAAD/////AAD+/wAAAAABAP7/AAAAAP7///8DAP///f8CAAQA/P/9/wQAAgD9/wAAAgAAAAAAAgAAAP3/AAAEAAEA/f8CAAMA/f///wUAAAD6/wEABQD+//7/AwD///3/BAACAPz//v8EAAIA/////wAAAAACAAEAAAD//wEAAwAAAPz/AgAFAP//+/8CAAUAAgD8////AwAEAP7//v8CAAMA//8BAAAAAgAAAAAAAAAEAAAA/v8CAAUA/v///wIAAgD//wIAAQAAAAAABAABAP///v8DAAMAAQD//wIAAQABAAEAAwD///3/AgAHAAAA/P8AAAYAAgD9//7/BAADAAAA//8BAAIAAwD/////AgAEAP7///8EAAQA/v8AAAIAAgABAAIA/v8BAAQAAgD+/wEAAwABAP//AgACAAAA//8CAAIAAgD/////AQAEAAEA//8AAAIAAgACAP//AAACAAIAAAABAAEAAQABAAAAAAACAAEAAAABAAEAAQADAP///v8EAAQA/f8AAAQAAQD//wMAAgD//wIAAwD//wEABAACAP7/AQAFAAIA/v8BAAMAAwD//wAABAACAP//AQADAAEA//8DAAMA//8AAAMAAgAAAAAAAwACAAAAAAADAAMAAAD//wIAAwAAAAAAAwABAAAAAQADAAEAAAAAAAIABAAAAPz/AgAGAAEA/f8AAAIAAwABAP//AAAEAAIA/////wIAAwABAPz/AgAHAAAA/P8DAAMA//8BAAIA//8CAAIA//8CAAQA/v/+/wUABQD+//7/AwAEAAAA//8AAAMABAABAP7/AAAFAAMA/f///wUABAAAAAAAAQACAAMAAwD/////BAAFAP////8CAAQAAwAAAP7/AQAFAAMA/v/+/wIABQADAP7//f8EAAQAAQD//wEAAwACAP//AQAEAAEA/v8DAAMA//8BAAQAAAD//wMAAgD//wEAAgD//wAAAgACAAAAAAAAAAEAAQABAP7/AQADAAAA/v8CAAQAAAD8/wEABgACAPz/AAAEAAIA//8CAAEA//8AAAQAAgD+//7/BAAEAAAA/f8CAAMAAQD//wIAAgAAAP//AgACAAIAAAAAAAIAAwD//wAAAgABAP//AQACAAIAAAAAAAAAAgAAAAEAAQD///7/AwACAP///v8BAAIAAQD/////AgADAP7//f8CAAUA/v/7/wEABgAAAP3/AQACAP//AAACAAEA/v8AAAIAAwAAAP7/AQADAAAA//8CAAMA/v///wIAAwD///7/AQAEAAEA//8AAAEA//8CAAMAAAD+/wIAAgAAAAAAAQAAAAIAAgAAAP//AwADAP7///8EAAUA///+/wIABAACAP7//v8EAAUA///9/wUAAwD9/wEABAD+////BAADAPz/AQAFAAEA/P8BAAUAAQD8/wMABAD///z/BAADAP7//v8DAAEAAQABAAAA/v8CAAIA///8/wMAAwD///7/AgAAAAAAAAAAAP//AgD//wAAAAADAAAA///9/wUAAwD+//z/AwAEAAAA/P8BAAMAAwD8/wAAAgACAP//AAAAAAIA//8AAAAAAwD///7/AAADAAAA///+/wEAAgAAAPz/AAADAAAA/P8AAAIA/v/+/wEA/v/+/wIAAAD7////BAD///r/AAADAP7/+////wMA///8/wAAAgD///z///8CAP///P8AAAIA/v/9/wEAAgD8//z/AgABAP3//v8BAP///P8AAAMA/v/7////AwAAAP3//v//////AAD/////AAD+//3/AgACAPv//P8CAAAA/f///wAA////////AAAAAP7//v8CAAAA/f8AAAMA/v/8/wIAAgD9//7/BAACAPv//f8FAAMA+v/8/wUAAwD7//3/BAABAP3//v8DAAAA/P///wMA///+/wEAAQD9/wAAAgAAAP7/AAAAAAEAAQD///3/AgACAP7//f8DAAAA/v8BAAEA/f8BAAIA/v/9/wIAAQAAAAAA//8AAAEAAAD/////AAACAAAA/v8AAAAAAAAAAP///f8AAAIA///9//////8BAAEA/f/8/wIAAgD9//3/AQAAAP7//v8BAAAA/v/7/wAAAwD+//j/AQAEAPz/+P8BAAEA/f/7//////8AAP3//f///////P/+//3/AAD///3//f8BAPz/+////wEA/P/9//3/AAD///3/+f/+/wEAAAD6//v//v8DAP3/+v/7/wEA/v/9//r//v//////+v/+//3//v/9////+v/9//7/AAD5//7//v////r////9//7/+v////3////9//7/+f///////v/4/////v/+//v//v/8/wAA/P/8//3/AgD6//v///8CAPz//P/+/wEA/P/+////AAD7//7///////3/AAD8//7///8CAPz//P/+/wIA/f/+/wAAAQD7////AwABAPv//v8BAAMA//////3/AQADAAAA/P8CAAMA/v/8/wUAAwD9//7/BQAAAP7/AQACAAAAAQABAAEAAQAAAAEAAwABAP7/AwADAAAAAQACAP//AQADAAMAAQABAAAAAgACAAIA//8CAAQAAQD+/wMABAD+//3/BQADAP////8DAAIAAQD//wAAAQACAAEAAAAAAAEAAQACAAAA/v8AAAUAAgD8//7/BQACAP7///8CAAAA//8BAAIA////////AwAAAAAA/v8BAAAAAAAAAAIA/f///wEAAgD7/wAAAgACAPv///8AAAIA/v////z/AgABAAEA+f8AAAMAAgD7/wAAAAACAP7/AAD+//////8DAP3///8BAAMA+//+/wMAAgD7////AgADAP3///8BAAEA/P8CAAMA/f/7/wUAAwD+//z/AgACAAAA/f///wIAAQD8////AgABAPz///8AAAEAAAD///3/AQACAP7//P8BAAAA/f8AAAEA/P/9/wMAAQD7//3/AAAAAP/////+//3/AAACAP///P/8/wIAAwD+//3///8AAP//AgD///v//v8EAAMA/f/+/wEAAgAAAP//AQABAP7/AAACAAIA/v///wIAAgD//wAAAQAAAP//AQD//wEAAAD/////AgAAAP////8BAP//AAAAAAEA/v/+/wEAAwD9//z/AAADAP7//v/+////AAAAAP3//f8AAAEA/P///wAA///9/wAAAAD///3//v8AAAEA/f/9/wAAAQD+/wEA///+//7/AgABAP7//f8AAAIAAgD8//7/AQADAP3//f8DAAMA/P///wMAAgD9////AQADAP7/AAACAAQA/v/+/wIAAwAAAAEA//8BAAEABAABAAEA//8BAAQABQD9////BAAFAP//AQADAAQAAQAAAAAABAADAAAAAAAEAAIAAQABAAMAAQABAAIABAAAAAAAAQAEAAIAAQAAAAQAAgACAAAAAQABAAMAAQAAAAIAAgD//wIAAgAAAP//AwADAAAA//8BAAIAAQD/////AgACAP7//v8DAAAA/P8AAAMA///9/wIAAQD9////AQD///7/AgAAAP7//v8CAP3//v8CAAEA+/8CAAIA/v/7/wUAAAD7//7/BgD///7///8DAP7/AQAAAAIA//8CAP7/AQD+/wEA//8CAPz/AgADAAIA+v8BAAMAAwD4////AwADAPj/AQABAAIA+f8CAP3////9/wEA+/8BAP7/AAD5/wEA//////j/AAAAAAAA+P8AAAEA///5/wEA///+//v/AgD+//3//P8CAP3////8/wAA/P/+//7/AQD7//3//f8CAPz//P/7/wEAAAD9//j/AAABAP7/+P///////v/8/////P/9//7////9//3//P8BAP///P/6/wIAAAD7//r/AgAAAP7/+v8AAAIA///7/wAAAgD+//3/AwABAP3/AQADAAEAAAABAAAABAADAAAA//8EAAIAAgACAAMAAgAEAAMAAwACAAQAAQAFAAUABAAAAAUABgAEAAIABAADAAgABgACAAAACgAGAAMAAwAIAAQABgAEAAUAAwAIAAUABAADAAUABAAHAAQAAwADAAgABAAFAAQABQACAAcABwADAAAACAAGAAMAAgAGAAQABQACAAMAAwAIAAMAAQACAAgABAADAAAABgAEAAYAAAAEAAQABgABAAQAAwAEAAEABQADAAQAAAAFAAUABQD9/wUABQADAP//BwADAAEAAAAIAAEAAQAAAAYAAAAEAP//BQD//wMAAQAFAPz/AQACAAcA/f8BAP7/BQAAAAcA/P8BAAAABwD//wIA//8DAP//BQD//wQA/v8GAAEAAwD9/wYAAQACAP7/BAAAAAMA//8DAP7/BQD//wAAAgAHAPz/AAACAAYA//8CAAAABAABAAQAAAACAAIABAABAAMAAQADAAIABAACAAEAAgAFAAQAAwACAAIAAgAFAAQAAAABAAIAAwABAAMA//8BAP//AQABAAMA/f8AAAAAAwD+////AAADAPz/AgAAAAAA/v8DAP7/AQAAAAQA/f8AAP//BAD+////+/8FAAAA/v/8/wQA/v////3/AAD+/wMA/f/9//7/BAD9//7//P8CAAEA///8/wIAAgD+//z/BAAAAP7//f8EAAAAAQD8/wAAAAADAP//AQD+/wIA/v8CAP7/AQD7/wQA//////v/BQAAAP3//f8FAP///v/+/wQA/v/+//z/BQD///7//f8EAAEA///+/wIA//8BAP3/AwD+/wEA/P8BAP3/AQD5/wAA/f8BAPn/AAD9/wAA+f8DAPz//f/6/wMA/f////n/AgD7/wAA/f8BAPf/AQD+/wEA9v8BAP//BAD3/wIA/v8DAPv/AgD9/wMA/f8CAP3/BQD9/wEA//8GAP7/AQD//wQAAQACAP//AwAEAAQA/v8CAAMABgD+////AwAIAAAA//8DAAcAAQD+/wQABgADAAIAAQADAAQAAgACAAIAAQABAAQAAwAAAAEAAwABAAIABAACAP7/AwADAAQAAAAFAAAABwADAAcAAQAEAAIABwABAAMAAwAHAP//BAAEAAYA/f8GAAMABwAAAAYAAAAHAAAABwAAAAUA/v8GAAAABwD+/wEA/v8GAP///v/8/wMA+/8BAPz//v/6/wEA/P/+//r//v/8//7/9//+//z//v/3////+v////r/AAD3//z//f////X//P/9//7/9v/9//z////4////+v8AAPv/AAD6/wAA/P8CAPn/AAD7/wMA/P/+//n/AwD+//3/+P8DAP3//f/6/wIA/P/8//z/AQD8//z/+v8CAP3//f/6/wEA+//7//7/AwD4//n//v8FAPr/+f/6/wMA/f/7//r/AQD7//3//P////z//v/9//7//P////3////7/wEA/f/+//3/AQD9//7/AAD9//z//v8AAP7/+//+/wEAAAD8//z/AwAAAPz//P8CAAAA/f/8/wEAAAAAAP3/AAABAAEA/f8AAP//AwD///7//f8EAAIA/v/8/wQAAwD//wAABAACAAAAAwAGAP7///8BAAUAAQD+//7/AgAEAP//AAAAAAMAAQABAP//AgADAP3//f8AAAMA///+//z/AgAAAP3//P8CAP///f/+/wAA/P8AAP///f/8/wIA/v/8//3/AAAAAP///f/+/wEAAAD+//z/AQABAAAA/v/+/wAAAgD//wEAAAABAAEAAwD+////AQADAP////8AAAAA//8DAP/////+////AwD9//3//P8EAP///v/7/wEAAAD///7/AAD+/wQA/P////v/AgD7/wAA+f////z/AwD8//7//P8EAPz//v/9/wYA+f/+////BAD6/wEA//8CAP3/BAD9/wAA/v8DAPz/AAAAAAIA+/8BAAAAAAD7/wIA/f/9//z/AgD5//3/+P8BAPf/+//3////9//5//X//P/5//j/8//8//T/9//0//3/8P/5//b/+v/x//v/9P/3//T//P/x//j/9//7//L/9//6//3/8v/3//v//v/x//n//f/8//T/+//6//z/+P/8//v/+v/6//3/+//7//X//v/6//j/8//+//v/9//0//7/+P/0//f/AAD2//X/+f////f/9//6/wAA8//5//b//v/0//z/9P/7//L//f/z//j/8v/8//P/+f/x//n/8P/7//D/+f/x//v/8f/2//L//P/3//j/8v/9//b/+v/2//v/8v/+//n/9//x/wIA9v/5//P//f/2//v/9f/8//b////1//z/+P/+//f/AAD2//z/+f8BAPb//f/4/wAA9//+//r////5//7//P////n/AQD7//3/+v8FAPz/+//6/wMA/P/+//j/AQAAAAEA9/8BAAEAAQD9/wAAAwACAAUAAgADAAEABgAFAAYAAAADAAcACgD//wYABgAPAAEACwAFABAABAAQAAQAEgAFABEABAARAAgAEwAHABIACgAVAAcAFAAKABcABgAZAAkAGAAJABgABwAXAAkAFgAGABgABwAWAAgAHQAGABcACwAeAAgAGwAMACAABwAgAA0AIgAKACAACgAjAA0AHgAHAB0ADgAaAAcAFgAJABsABAAZAAYAGQADABwAAwAZAAQAFQACABgAAQASAAAAFQD+/xAAAQATAPv/DwADABAA+f8JAAIADQD6/woAAQANAPv/DAABAA4A/v8OAAMADQABAA0AAQAQAAUADgAEABEACAAOAAYADwALABEABwATAAsAFAAHABcADQAVAAoAGAASABUACgAVABMAGQALABcAEQAcABAAGQASABgAEgAWAA8AGQAQABYADgAWABEAEQAOAA0ADAAPAAoACwALAAsACQAGAAcACAAHAAQAAAADAAcAAgD7/wAABAD9//r//P/+//n/+f/4//r/9//5//X/8//1//f/8//y//H/9f/z//P/8//1//H/+P/w//X/9P/3//T/9v/y//b/9//3//L/+f/0//f/8P/4//P/9P/w//n/8//5/+3/9v/x//z/8P/3//D/+v/3//z/8f/8//P/AADz//n/8v8AAPX/+//w/wAA8f/9/+7////v//3/7P/9/+3////u//3/7P/+//L//f/t/wAA7v8AAPD/AADu//7/7//+//P////w/wEA8P8AAOv/AQDu/wAA5/8CAO3//P/u//7/7v/+//L/AgDw//v/9/8EAPP/+v/x/wMA8v/+//L/AQDy/wMA8v/9//T/AgDz////9v////L//v/5//3/9v8AAPj//P/+////9//9//3/AQD4////+P/9//n//f/1//v/9v/7//L/+v/v//r/7P/3/+z/+P/s//X/7v/y//D/9v/y//P/8f/2//P/8//u//X/7f/1/+r/8v/s//T/5P/v/+n/8v/o/+//6f/z/+3/9P/n//P/8P/3/+z/9P/x//v/8v/1//P//f/1//3/9P8DAPb////5/wQA+f8BAAEABQD7/wgAAgAJAPv/DQD//woAAgAQAAIACwALABIACQANAAkAFAAPAA8ABwAVABAADwAHABUADwATAA0AFwALABMADgAVAAoAEQANABEACgAQAA8ADAAIABEACAAOAAEACwAJAAsABwAIAAoACwAKAAoACwAJAA0ADAALAAgADwAHAA0ACQAQAAgADAAHABIACAAOAAQAFQAJABIABwAVAAgAGAAIABcABgAcAAkAHQAFAB8ACQAiAAYAIwAGACQACAAmAAQAIAAHACUAAwAcAAYAIwAHABkAAwAfAAcAGwAAAB4ACQAaAP//HQAGABUA//8bAAIAGAABABgA/v8WAAMAEAD8/xAAAwAIAPv/CwD//wgA+/8KAPz/CwD5/w0A+/8MAPn/CwD+/wQA+P8JAPn/AQD2/wUA9P8BAPj////y/wAA+P/3//T//v/2//b/9//+//X/+v/6////9f/8//r//P/2//j/+//5//n/9//8//H/+//0//z/9f/+/+7//P/4/wAA7//9//n/AwD4/wIA/P8IAP//BAAAAAsAAAAGAAIACwD+/wcAAgALAP3/CwD6/woA//8KAPj/CQAAAAsA+/8HAP3/CgABAAYA//8JAAMABgD8/wYAAgAEAPb/BwD9/wIA9P8EAPn/BgDy/wIA9f8FAPX/AgD7/wIA9/8FAPj/AQD7/wIA/v8CAAAABQABAAcAAAAHAAUACAAHAAcABgAKAAYABgABAAoAAAAHAAAABQAAAAYABAD//wEABQACAP3/+/8AAPj/+//0//n/9P/4/+7/9P/x//D/6//x//H/8v/t//D/7f/z/+z/6f/u//D/7f/r/+z/7f/l/+z/6f/r/+H/6v/l/+v/5P/i/+n/6f/q/+b/5v/o/+f/6//n/+b/6v/u/+z/5v/w/+z/8v/o//n/7P/3/+z/+P/r//f/7v/x/+r/8P/u//H/6P/4/+z/+f/v//v/8P/8//L/AwDx/wkA9/8MAPj/EwD8/xEA/v8ZAAEAFgADABQABQAXAAUAEwAHABcACQAYAAcAGwAPABoADQAcABAAGgAOABwADwAbAA8AHwASABcAEwAaABIAEgAUABMAEQASABEADQAPAA4ADgAKAAsADAAPAAMACQAIAAoAAAAIAAIABwD7/woA/v8FAP7/BAADAAUA/P8HAAAABQD3/wgA/f8FAPP/CAD1/woA9/8GAPj/CQD//wUAAQAHAAMABAAGAAsA//8GAAUACgD//wgAAAAJAP3/CQD8/wwAAQAFAAIACwAFAAEAAwAJAAcABAABAAcAAgAAAAMABAD9/wAABAAGAPr/AAACAP7///8BAAAA+//9/wEA/P/5//3/AQD4//r//f/9//r/+f/+//v/+//8//j//f/2//3/9v/8//b//P/2//r/9f/9//f//P/4/wEA+f/8//f/BAD7//v/+P8AAP3/+//7/wEA+/////z/AQD6////+/8CAPv/BAD7/wQA/v8CAP3/AwD9////+/8CAPz/+//6/wIA///4//r//v/+//j/+v/5////+//6//n//f/8//r/+v/9//z//P/7//z//f/+//v//v/7/wAA+v8AAP3/AAD7/////f/9//7//f////3//v8EAP7/BAD//wgAAgAIAP//DQD8/xAAAAANAAIACwAEAAYAAQAGAAEACAD+/wcAAAANAPv/CgABABIA/f8MAP7/FAD//xAA//8UAAMAFQABABMABgAXAAIADwAKABYA//8SAAcAFgACABcABgAOAAcAEQAKAAUADAAFAAcACAAFAAgACAAQAAYADQAPAA8ABAAQABAACgAKAAsADwADAAsAAgAOAAEACwD//w8A/v8MAAMACAABAAwACQADAAkACwAEAAgABwAIAP3/BwAJAAgAAQAJAAoACQAEAAgACAADAAYABgAAAAEAAgACAPr///8AAP3//P/7/wEA+v/9//n/BAD7//3/+f/+//3//f/5//z/+/8BAPn//v/7/wAA+//8///////9//j/AAD2////+f////b//v//////+v/9//n/BQD7////9f8FAPf/AgD1/wUA9/8HAPn/CQD2/wsA+v8MAPX/DgD4/wwA8/8RAPf/EAD3/xIA9/8SAPj/FwD0/xQA+/8bAPH/EwD7/xgA9v8YAPz/FgD+/x4A+v8YAP//HgD//xoABAAWAAcAHwAIABoACQAeAAsAHwAKABwACgAlAAgAHgAKABsADAAeAAoAFgAJABcADgAVAAwAEAAQABcACQARAA8ADgAPAAwAEQAIAA8ADAAOAAgADAALAAkABwAEAAUACgACAAMAAAAKAP7/AgD//woA+v8IAPn/CwD1/woA9/8IAPP/DAD1/wQA7f8OAPD/DgDs/xMA8v8RAO//CgDv/w0A6P8KAOn/CwDn/wkA6P8JAOL/CwDj/woA3/8KAOP/AgDb/wYA4f8AANn/AQDi//7/1/8BAN//AQDZ/wIA4P/9/97//P/f//r/4P/2/+H/9//g//X/4P/3/+D/9//j//L/4//z/+X/8f/n//X/4//1/+z/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7//1//L/8P/x/+//9v/v//j/6//5/+z/+//s//z/6f/9/+7/AADl/wEA8P8EAOT/BgDw/wkA5/8HAO//CwDt/wcA7/8LAPD/CADy/wwA8f8LAPb/DQD0/w0A+P8OAPv/DAD5/w4AAAAJAP3/CwAEAAkAAgAJAAcACgAIAAoACgALAA0ACwARAAoAEwAJABYACQAXAAkAGgAMABsACwAeAA0AHgAMACAACgAhAAkAJAAIACMABwAjAAsAIwAKACIADwAeAAsAJAAQABoACgAfAAoAGwAIABUABAAXAAgAEAADAA0ACAAJAAQABwAJAP//AgABAAgA9v/+//b/BADx//3/6//6/+f//f/j//L/3v/6/9z/8f/X//X/1f/w/9P/8P/S/+z/zP/u/9L/6v/I/+v/0f/p/8z/5//R/+j/0//m/9P/5//X/+n/2v/q/93/7P/j/+7/5P/x/+//8v/v//b/+v/6//z//P8EAAEABwAHABIABgASABMAIQAPAB4AGQArABsAKQAaADUAJgAxAB0APQAoADgAJQA+ACgAPQAuAD4AKQA+AC4AQAAoADkAKQA9ACYAMQAiADUAJgAnABoAKgAeABwAEgAfABMAEgALAA0ACQAHAAIA/P////v/+v/u//T/7v/w/+P/6P/e/+X/2v/c/9H/2v/S/9P/x//T/8r/zv/A/87/xf/N/8D/yv/A/87/xf/I/7//y//K/8v/xP/J/87/0P/K/87/1v/W/9f/1//f/9z/5v/d/+v/5//y/+j/9v/0/wEA9f8AAP7/EQACAA0ABAAbAAwAGgALACQAFAAkABcALAAbACsAIQAwACIAMQAoADQAJgAxACgANgAmAC4AJQAxACYAKwAjACgAIgAjAB8AIQAcABsAGwAWABcAEgASAAgAEAAHAAwA/P8JAPz/BQDw/wIA8P/7/+j/+v/k//T/4f/x/9v/8v/a/+3/1v/x/9b/8P/T/+z/1v/x/9T/6f/X/+z/2f/s/9v/6v/e//L/4v/z/+T/+f/s//n/8P/+//b//v8AAAMAAAAGAAwACgAOABIAFwATAB0AHgAkABoAKQAjADIAIQA0ACUAPQApADsAKgBEADQARAAtAEUAOABJAC4ARQA1AEgAKwBEADAAQwAmAD0ALQA7ACUAMwAkAC8AIAAoABoAIgASABkADgAUAAYABwD//wUA/f/2//f/9P/y/+b/8//m/+b/2P/r/9f/3f/O/+H/yP/Y/8f/2f+7/9j/vv/T/7j/1v+2/87/uP/T/7X/z/+3/9L/uP/Y/7r/1/+8/97/wv/h/8P/4//M/+f/0P/q/9X/6v/f//T/4v/y/+v//v/z//7/9v8IAAYACQAEABIAEgASABcAGAAbABoAKAAdACcAIAAwACMANQAlADYAKgA+ACcAPgAuAEMAKgBCAC4ARgAtAEIAKwBFAC4AQgAnAD8AKQA/ACIAOgAiADcAHgA0AB4ALQAcACoAGQAjABgAHgAVABoAEQARABAADgAIAAUACAAAAP//+v////P/+P/s//f/6v/1/+D/9f/f//L/1//z/9b/7v/R/+z/0P/r/8z/5v/K/+b/yf/l/8j/5//J/+T/yf/r/8n/4P/P/+v/zf/h/9P/6P/U/+X/2P/m/9z/6v/h/+f/5f/o/+v/7f/u/+b/9f/x//n/6v////L/BQD0/wgA8/8PAPr/EgD0/xgA+/8dAPX/HgD7/yQA+f8kAPz/KQABACoAAgApAAYALwAHACgACQAwAAkAKAAKAC0ACQAmAAwAJgALACQAEQAfAA4AIAAUABkAEwAXABUAEwAWABAAFQALABkACAAVAAQAGQD+/xIA/f8XAPf/EwD3/xEA7/8XAPP/DgDp/xgA7/8SAOf/FADs/xUA5v8QAOr/EADm/wsA6v8JAOn/BwDr/wUA7v8EAOv/AgDz/wQA8P8BAPT/AAD5//7/+P/7//7/+P/9//f/AgD0/wQA8/8GAPH/CQDt/woA7f8NAOv/EADr/w4A6/8RAOz/EADq/xMA6/8QAOn/EwDl/w4A6P8RAOT/CwDo/w8A6P8IAOn/CgDu/wYA7v8EAPP/AwD0////9v/8//r/+//6//f//P/4//3/8f////L/AwDt/wUA7/8GAOr/DQDr/wsA5/8SAOr/DgDm/xQA6f8PAOX/FwDq/w4A5/8VAOr/DQDq/xIA7f8PAO3/DwDw/xEA8f8MAPX/DQD5/wkA+f8FAP3/BgACAAAAAQADAAsA/P8GAP7/EAD7/xEA+P8SAPv/GAD1/xUA9/8cAPX/HADy/xsA8/8iAPD/GwDx/yIA7/8dAPH/HgDy/x8A8/8aAPb/HAD1/xcA+v8XAPf/FQD+/xAA+f8RAP7/CQD9/wsA/f8FAAMAAwADAP//BwD9/woA+v8HAPb/CwD2/wwA7/8LAPL/EgDr/wkA7P8RAOr/CQDp/wsA6P8KAOj/BwDm/w4A5f8IAOj/DwDj/wUA6/8JAOb/AQDs////6v///+v/+f/w//r/7P/4//X/9P/x//X/9f/x//n/8v/1//D////v//n/7/8BAOr//v/t/wIA5/8EAOr/AgDn/wgA6v8EAOj/CADu/wcA6f8IAPP/CQDs/wcA9P8MAPD/CADz/wsA9/8LAPb/CAD6/w4A/f8HAP//DgAFAAgABwANAAkACQANAAwADgAMAA8ACQATAA8AEQAIABgADwAUAAkAGgANABkACwAaAA0AHQAJABwACwAcAAoAHAAJABsACgAYAAgAFwAHABQACQARAAMAEAAHAA4AAQAKAAMACQAAAAUA/v8AAP7/AAD4//f//P/3//T/7//3/+//8//o//D/6f/v/+X/7f/k/+r/4v/p/9//6P/e/+X/2//k/9r/4//X/+D/2v/g/9b/4P/Z/97/1v/f/9r/3v/b/9//3//f/+D/3//j/+P/5v/h/+f/5v/r/+f/6//p/+7/7f/y/+7/9f/y//r/9v/8//j/AwD8/wYA/v8MAAMADQAIABIACQATAA8AFgASABgAEwAYABsAHAAYAB0AIAAeACAAIwAhAB8AJgAnACQAIAAnACYAKAAiACcAIAApACIAJwAZACcAHwAlABQAJgAaACAAEwAiABMAGQATAB8ADQASAA4AGQAIAAsABgASAAUABgAAAAgA/f8AAPz////2//r/+f/3//L/8f/2//H/8v/s//D/6v/y/+b/6P/k/+//4//n/9//6f/i/+j/2v/o/97/5//b/+r/2//n/9v/6v/c/+n/2//q/97/6//d/+v/3//t/+P/7P/j/+7/5//v/+f/8f/s//H/7P/0//H/9f/0//n/9v/5//n/+//9///////9/wMAAwAGAAAABQACAA8ABgAJAAMAEgAJAA8ABwARAAkAFgALABIACgAYAAsAFwANABcACgAbABEAFwALABsAEwAaABEAGAARABwAFwAWABEAHgAYABMAFAAdABgAEwASABoAGQATABAAFgAZABIAEwAUABYADgAVABEAFAANABQACwASAAwAEgADABIACwAPAP//DgAEAAoA/v8KAPv/BQD8/wgA9v8AAPb/BgD0//7/7v8AAPD//P/r//r/7f/4/+j/9P/o//X/5P/u/+b/8v/h/+3/4v/u/+L/6//e/+r/4//o/9v/6P/j/+b/3P/m/+T/5P/e/+P/4//k/+X/4P/i/+X/6v/h/+T/5//t/+T/6//p//D/6v/x/+z/9P/u//r/8f/3//P/AQD1//7/+P8GAPn/BQD5/wwAAQAKAP7/EgAHAA8ABwAWAAoAFwAOABoADQAZABAAIQARABoAEAAkABQAHQATACIAFAAgABQAIAAUAB8AFAAfABIAHQAPABsAEgAZAAoAGQARABIABgAXAA0ACAADABIABwADAAAACQD//////P////j/+v/3//X/9P/1//D/7v/x/+3/6P/r/+z/5P/m/+b/5v/e/+f/4f/j/9r/5//f/+L/1//l/97/4P/X/+b/3P/i/9n/5//c/+X/3//r/9z/6f/l//H/3//s/+r/9//l//X/8P/8/+z/AQD5//7/8/8KAAEABgD8/w8ACQARAAQAEgARABgADQAZABcAHAAXACEAGgAhACAAJQAhACUAJAAlACYAJgAqACUAJwAmAC4AJQAoACcALAAiAC0AJgAnAB8ALAAdACcAHQAmABQAJQAVACAADwAhAAsAGQAJABsAAwATAAEAEgD//w4A+f8HAPz/BgDy/wIA9f/8/+///f/w//L/7f/2/+3/7f/r/+3/6f/q/+n/5f/r/+X/6P/k//D/3//r/+L/8v/e/+//3v/z/+H/9f/e//j/4f/5/+D////i//7/4/8EAOb/AwDp/wcA6f8IAO3/DADu/wwA8v8QAPX/DgD3/xMA/P8TAP3/EgACABgABAASAAcAGgAJABMADgAZAA4AEQATABUAFAARABQAEAAYAA4AGAAOABgACgAcAAoAGAAGABoABgAbAAQAGAABABkAAAAZAPz/EwD9/xYA+P8RAPj/EAD0/xAA8v8JAPL/CwDs/wQA8v8FAOr////w/wEA7P/2/+3//v/u//D/6//5/+3/7f/q//H/7v/s/+v/7P/v/+n/7f/o//H/6P/v/+b/9P/p//D/5P/0/+r/9P/l//T/6//5/+f/9f/t//v/6v/6//H/+v/x/wEA8f/8//f/BQD3/wAA/P8FAP//BgD//wMABQAJAAQABAALAAYACgAIABAABgAPAAgAFAALABMACAAWAAwAGQAMABYACQAcAAwAGQAHABkACQAbAAYAFgAHABkABAAVAAcAFwAAABEABgAVAP7/DAACABEA/f8IAP//DAD8/wQA/v8GAPz/AAD7/wEA+v/7//n//P/4//n/9v/2//n/9f/4//H/+//x//j/7v/9/+7/+P/u//j/6//7/+3/9v/o////7//9/+b/AQDx/wUA6v8CAPH/CADw/wUA8/8JAPP/CAD4/wwA9/8KAP7/DQD7/wwAAgALAAEAEAAIAAkABgAUAAsADAAJABIADwAQAA8ADgAQAA8AFQAOAA8ACwAZAAoAEAAKABgACAATAAkAFgAHABUABgAVAAQAFAAEABIAAwAUAAAADwABABAA//8OAPr/CwD//woA+P8HAPz/BgD5/wEA+/8BAPj////5//r/9P/9//f/9f/1//f/9P/0//X/8v/z//P/9//w//T/8P/3/+//+P/w//r/7f/7//P//v/t//3/9f/+//D/AQD0////9v8DAPX/BQD8/wUA9/8JAP//CQD9/wsAAQANAAIADQAGABAAAwAMAAsAEQAFAAoADQARAAoACwAOAA8ACwANAA8ADQAMAAwAEQANAA4ACQANAA4AEQAHAAsACQAQAAkADAAAAA0ABwAKAPz/DQACAAMA/v8MAAEAAgD7/wYAAAAEAPn/AQD8/wIA9//+//r/AAD0//v/9v////T/+v/1//z/9f/8//b/+P/2//3/+v/4//f//f/+//v/+P/9//3//P/+/////f/+/wMAAQD/////BgAEAAQAAgALAAUACgAGABAABgAOAAkAEwALABEACQASAA4AEgALABQADQARAA4AFgAMABAADwAWAAwAEAAMABUADQAOAAoAEQALAA4ACQAKAAkADQAFAAEACAAHAAIA//8CAP//AgD9//3/+/8AAPf/+f/3//3/9P/2//L/+v/w//T/7//2/+r/8//r//P/6P/x/+j/7//n//L/5//t/+r/8P/p/+3/7P/v/+n/7//s//D/6v/w/+3/8P/t//L/8P/y//H/9P/1//X/9//2//f/+f/+//n/+//9/wMA+/8DAAAABAAAAAcAAgAGAAYACAAEAAoACAAJAAcADQAJAAwACwANAAkADwAPAA0ACgAOAA8ADgANAAsADAALAA8ACQAMAAgADAAHAA0ABQAKAAQACQADAAoAAwAGAAAACAD+/wQA/v8FAPn/AQD+/wMA9P/+//r////y//3/9v/7//L//P/0//f/8f/7//f/9f/y//f/+f/2//L/9v/5//X/8f/1//n/9f/z//L/+v/4//j/8P/7//j/+//z////9/////b/AgD3/wQA9/8FAPr/BgD7/wkA+/8IAP7/DQD8/wwAAAAOAAAAEwAEAA4AAwAVAAYAEAAGABQACQAUAAgAEwAKABQADQASAAoAEgAPABEADgARAAwAEAASABAADAARABIADQAPABAAEQAKABAADQAPAAcAEgALAA4ABAARAAYADwACAA0AAwAQAP7/CwADAA0A+/8MAAAACAD5/wkA/f8GAPj/BQD4/wQA9v8BAPT////z////8//7//D/+f/z//n/7v/0//L/9//t//D/7//0/+z/7f/u/+//6//t/+7/6v/s/+7/7//o/+r/6//y/+j/6v/p//T/6v/w/+n/9P/p//X/7P/0/+n/9//w//b/6f/4//P/+P/s//3/9v/4//H/AwD3//v/9/8FAPr////9/wcA/v8DAAAABwAEAAcABAAJAAcABwALAAwACQAIABAACwAMAAsAEwAKAA4ADAAVAAsAEQAMABYACgAUAAkAFAALABcABwASAAgAFgAEABEABwAUAAMAEAAEABAABAAOAAEADAACAAsA//8IAAAACAD+/wIA/f8HAP///f/7/wIA///6//v//f/9//j//P/4//3/9v/9//H//v/2//7/7v8AAPT//v/s/wAA8f///+3////u/wIA7v/+/+v/AwDw////6f8DAPL/AADr/wEA7/8CAO7/AQDw/wMA7v////T/AADw/wEA9P/9//P/AgD3//v/9P8BAPv//P/2/////f/8//r//f/+//v//v/9/wEA+f8AAPz/AwD4/wIA/P8FAPj/BAD9/wkA+f8DAP3/CwD7/wgA/f8JAPz/DgD//wcA/f8OAAEACwD9/wwAAgAMAP//CwACAA0AAAAIAAMADwADAAYAAwALAAQACgAEAAUAAwALAAQABAAFAAQAAQAGAAUAAAABAAQAAwD9//////8CAPv//v/+//7/9//+//v/+f/2//3/9v/2//b//P/z//T/9P/6//L/8v/w//f/8//z/+7/8//z//T/8P/y//D/8v/y//T/8f/v//L/9v/2//D/8v/3//r/8//1//n/+v/3//v//f/8//n//////wEA/P8DAAIAAwAAAAgABgAHAAUACgAJAAwADQANAAsADgAOABEAEAAQAA0AEwAUABIADQASABYAFAAMABIAFgASAA0AEQASABIADAANAA8AEQANAAoACwANAAsACAAHAAgABQAFAAQABAD+/wIA/P/+//r//P/1//n/9//4/+//9f/x//P/7f/w/+v/7//r/+3/5//r/+j/6v/l/+n/5P/n/+X/6P/i/+b/5//l/+P/6P/n/+X/5f/o/+r/6v/p/+j/7//t//D/7f/y//H/9//x//T/9//9//P/+f/9/wIA+v////7/BgADAAcAAAALAAgADAAHAA4ACgANAA4AFAALAA8AFAAWAAwAEwAVABUAEgAUABIAFgAXABUAEQAVABYAEwASABQAEwASABMAEAAQABAAEAAMAA8ADAALAAgADAAIAAgABQAIAAIABAADAAQA+////wAAAQD4//z/+f/7//f/+f/y//f/9f/2/+//9P/y//L/7//z//L/8P/u//H/8v/v//H/8P/w/+//8//x//P/8f/y//L/+f/x//X/8//7//T//P/2//z/9/8CAPn/AAD6/wMA/P8FAP3/BQD//wkAAQAIAAEACwAGAAsABAALAAgAEAAGAAsACgARAAkADQANAA8ACgAPAAwADAANAA4ACgAJAA8ACwAJAAgADQAHAAsAAwAIAAcACQAAAAgAAwAGAP//BgD+/wIA/v8EAPv//v/6/wIA9//7//b//P/2//v/8//1//T/+//y//L/8//1//H/8v/y//L/8v/x//L/8f/x/+7/8f/w//L/7//x//D/8//t//P/8f/3/+//9f/y//3/8P/3//T//v/1//z/9f////n//v/4/wUA+/8AAP7/BwD9/wYAAgAHAAIACwAEAAkABwAPAAcADgAKABIADAAQAAwAFgAQAA4ADwAaABAADwAUABgADwASABcAFAAQABIAFgATABIAEgAUABAAEwATABAACgAUABEADgAHABEACwAPAAYACQAIAA8AAwAFAAQADQACAAEA/f8JAP///v/5/wQA+//9//f//P/5//v/9f/6//f/9v/z//r/9v/y//H/9//2//H/8v/1//b/8f/0//P/9P/x//f/8v/0//H/+P/0//f/8P/6//f/+P/y//7/+P/9//T//v/8/wIA+P8AAP3/BAD9/wQA//8EAAEABwAEAAYAAwAHAAgADAAGAAYACwAOAAsACQAMAAwADwAOAA8ACgAQAA8AEQALABIADgARAAkAFQAMABAABgAVAAkADwAGABQABQAOAAUAEgADAAwAAQAOAAMACwD9/woA//8JAPv/BgD4/wUA/P8CAPP/AQD5//7/9f/8//T/+v/2//n/8v/3//X/9f/x//P/9f/z//H/8P/2//L/8//u//X/8f/1/+7/9//v//n/7//4//D/+//t//z/9P/9/+3//v/3/wAA8P8BAPj/AgD0/wMA+v8DAPj/BgD+/wUA/P8JAAAABQABAAsAAwAGAAQADQAHAAYABwAMAAkABwANAAkACAAIABIABgAJAAgAEwAEAAwABwAQAAQAEQACAA4ABgASAP//DgAFAA4AAQARAP//CwACABAA/f8LAP7/CwAAAAsA/P8JAP//BgD//wkA+/8DAAEABwD5/wEAAgADAPn/AQACAAAA/v8AAAAA/v8BAP7/AAD+/wMA/f8CAPz/BAD8/wUA/f8FAP3/BwD9/wcA/P8JAP3/CAD//w0A//8GAP//DgABAAsA//8KAAQADQACAAkAAwANAAYACwADAAwABwAKAAcACgAHAAoACQAIAAkACQAHAAUADAAKAAcAAQALAAoACgD//woABgAKAAAACQACAAkAAQAJAP//CQABAAgA/f8GAAAACAAAAAQA/f8IAAIAAQD9/wcAAQD//wEABwD///7/AwAFAP///f8EAAQAAAD8/wQAAQAFAP7/AgD//wYA/f8EAP7/BQD+/wYA/f8EAP3/BwD8/wUA/v8GAPz/BQD//wQA+/8FAAAABAD6/wMAAQADAPr/AQACAAEA/P8BAAEA///+//7/AAAAAAAA+///////AgD6/wAA/P8BAPr/AQD5/wEA+/8CAPf/AQD6/wIA9v8BAPn/AgD2/wMA+f8CAPb/AgD4/wMA9v8BAPn/BAD2/wEA+/8BAPj/AwD7/wAA+v8DAPz/AQD8/wMA/f////7/BQD/////AAACAAIAAwACAP//AgAEAAQAAAAEAAIABQACAAYAAQAHAAEABwACAAcAAAAJAAQABwD//wkAAgAJAAIACAD+/woAAwAHAAEABwD+/wgABQAFAPz/BQADAAQA//8EAAAAAQAAAAQAAAD//wAAAgD//wAAAAD+/wAA/v/+//v/AwD///v/+f8FAP3/+//5/wQA+//8//v/AgD5/////P8DAPf//v/+/wQA+P/9//z/BAD8/wAA+v8CAP//AAD7/wMA/v////7/BAD9/wEA/v8BAAEAAwD/////AAADAAIAAQAAAAEAAwAEAAQA//8BAAMABwACAAMAAAAHAAQABQAAAAQAAgAIAAMAAgD//woAAwABAAEACQD//wIABAAIAPz/AwADAAcA//8EAP//BAABAAQA/P8DAAIAAgD9/wMA/v8AAAAAAQD5////AQD+//v////9//7//P/9//v//v/9//r/+//8//v/+//8//j/+f/6//7/+P/3//f//v/5//j/9f/7//r/+//1//r/+v/8//b/+v/4//3/9//6//n//v/2//z/+v/8//X//f/6//7/9//7//j/AAD5//z/+f/+//n////8//7/+v////7//f/8/wIA/f/7//3/BQD///3//f8BAAIAAAD/////AQACAAMA//8CAAMAAgD+/wYAAwAAAP7/BwAEAAEA/v8GAAQAAQD9/wcABAAAAP3/CAACAAEA//8FAP//AwD//wIAAAAEAPz/AAAAAAQA/f/+//z/AwAAAPz/+v////7//f/7//z//P/9//v//P/8//r/+f/9//z/9v/5//z/+v/2//n/+//5//f/+v/4//b/9//8//r/9f/0//r/+//3//P/+f/8//f/9v/4//r/+P/4//j/+P/4//z/+f/6//X/+v/8//7/9//4//r/AAD7//v/9//+//3/AAD3//z//v8DAPn//f/9/wIA/P/+//v/AQD+/wAA/P8CAPz//////wMA/P8AAAAAAQD//wEA/P/9/wIABAD6//z/AwADAP7//P/+/wEAAQD+//7//P//////AAD7//7//f8BAP3//P/6/wIA///7//r/AQD///7/+f/8//7/AAD6//v///////r//v////v/+////wEA+//8//7/AwD9//r//f8FAP3/+//9/wYA/v////z/BAD+/wQA/P8CAP//BQD9/wMA/v8GAP7/BQD8/wUAAQAGAPv/BAABAAcA/P8EAP//BQD//wQA/P8EAAAABAD8/wQA//8CAP7/AwD9/wMA/v////3/AwD+//z//f8BAP3//f/9////+//8/////f/7//7//P/6//z//v/9//r/+v/8/wAA+//4//z////4//v//v/+//n/+//7/wAA/f/7//n/AAD///7//P/+//z/AQAAAP7//v8DAP////8BAAMA/v8AAAMABAABAAIABAADAAUABQAEAAMABwAHAAUABgAKAAQABQALAAwAAgAGAAwACwAGAAkABwAJAAsACgAEAAkACwAJAAQACwAKAAYABAAMAAkABgACAAkABwAHAAMABgAEAAMAAwAHAAAAAAADAAMA/v8AAAEA///+/wAA/f/9/////v/5//z/AAD6//j//P/8//j/+f/7//n/+P/6//n/+f/2//b/+v/8//b/9P/4//3/+P/1//j/+v/6//r/+v/4//r//v/8//n/+v/9/////v/7//v/AAACAP///f8CAAIAAQAAAAUAAwAEAAIABgAGAAcAAgAHAAkACQACAAcACwAMAAQABwALAAwABwALAAkACQAIAA4ACgALAAgACwAKAA0ACAAKAAgADQAJAAoABwAKAAgACQAHAAkABQAGAAcACAADAAQABgAHAAIABAADAAIAAwADAAAAAAADAAEA/v/9/wAA///+//z////8//v/+/////r/+//6//z/+P/9//n/+f/5//7/9//7//z/+//1/////f/6//f//v/7////+//7//r/AgD///z/+/8DAAAA/v8AAAQAAAAAAAIABAADAAMAAgAEAAgABgAAAAQACAAHAAUABgAGAAYACAAGAAcACAAIAAUACQAJAAoABgAHAAcACwAGAAgACAAJAAQACAAIAAcAAwAHAAUACQAEAAMABAAHAAEABQADAAIAAQAGAAIAAAD//wMAAAADAAAA/P///wMA/v/7/wAAAQD6//z/AgD///r/+/////3//f/9//z/+f8BAP//+v/6/wAA/P/+//3//P/6/wQAAAD6//n/AwAAAP//+v8AAAIAAgD8/wEAAQACAP//AgAAAAUAAwABAAAABgACAAMABAAGAAEABAAGAAcAAwACAAYACgAEAAIABQAKAAgAAwACAAkACwAEAAIACQAIAAMABgALAAUAAQAHAAoABgADAAcABgAFAAUABgAFAAUABgAFAAMAAwAGAAcAAgD//wUACAAEAP//AgAFAAgA///+/wMACAD/////AwAFAP//BQADAAEA/f8GAAIAAgD+/wMA/f8GAAIAAgD6/wQAAgAEAPv/AgAAAAQA/P8EAP//AQD+/wcA/f/+/wAABwD9/wEAAAADAP//BQAAAP//AQAHAP///v8EAAcA/v/+/wMABwACAP//AgAFAAQAAAAFAAUAAQABAAgABQADAAEABQAFAAcAAwAEAAMABwAGAAcAAgAGAAYACAAEAAcABQAGAAYACAAEAAMABgAKAAUAAQAFAAkABQABAAUABgAFAAIABAADAAUAAgADAAAABAADAAIA/v8FAAMAAAD7/wUAAgAAAPr/AwD//wEA+f8AAP3/AgD4/////f8AAPX/AAD///3/8v8AAAAA/v/x//7//v/+//T//v/7//7/9v/9//r////4//v/+v8AAPr//P/6/wAA+//8//z/AAD8//7//v8AAP7/AAD+/wAAAQABAAAAAAABAAMAAQACAAEAAgAFAAIAAQADAAkAAwAAAAUACgACAAIABQAHAAQABQAFAAUABQAFAAUABgAEAAQABQAEAAQABQAEAAAABQAFAAMA//8EAAIAAgD//wIA/v8EAAAA/v/8/wUA/v/8//z/AwD6//7//f////j//v/9////+P/7//r/AAD5//v/9//9//v//P/1//z/+//7//f//f/6//n/9//+//z/+v/4//z//f/8//n/+//9//3/+//9//3/+//9/wAA/f/6////AwD///r///8CAAAA/f///wEAAgACAP////8DAAEAAAACAAIAAAACAAMAAQABAAMAAgD//wIABAABAP//AwACAP//AQAFAAAA/v8CAAMA/////wAAAgD+//7//f8EAP7/+f/8/wUA/f/5//3/AQD9//z/+v/+//z//P/6//7/+v/7//3//f/4//r//P/9//n/+//9//z/+P/8//3/+v/5//3/+//6//3//f/7//3//f/6//3////+//r//f8AAAAA/P////3//v8BAAIA+//9/wIABgD9//7/AAAHAAAA/////wQAAQADAP//AgADAAMA/f8BAAQAAwD9/wIAAwABAP7/AgACAP///f8BAAMA///7//3/BAABAPr/+/8CAP7//P/6//3/+v8AAPz/+f/3/wAA+//5//f//P/6//z/9v/5//r/+//1//v/+f/4//T//P/2//b/9v/6//X/+P/2//n/9v/4//b/+P/2//f/9//6//b/9//4//r/+P/3//b/+P/5//n/+f/4//j/+f/6//v/+v/2//j//P/+//j/+P/6/wAA/P/5//j/AAD+//z/9//7/wAAAwD4//f///8EAPv//P/8/wAA/v8AAPz/AgAAAP3//P8EAAAA///9/wIA//8AAAAAAwD9////AQAEAP7///8AAAEA/v8AAAEA///8/wEAAgD9//z/AQD+//3//v8AAP7//f/8///////7//n//P8AAP3/+P/6/////P/4//r//v/7//j/+//8//r/+f/5//v/+//5//j/+//7//j/+P/7//n/+P/7//n/9//6//3/+P/2//n//f/5//b/+P/+//r/9v/4////+f/3//n//f/6//r/+f/6//n//f/6//v/+f/9//v/+//6/wEA+v/6//z/AgD5//3//f/+//r/AgD+//7/+f8BAP/////6/wMA//////z/BAD/////+/8DAAEAAQD8/wIAAAABAP7/AwD+/wEAAgAEAPv/AAAEAAMA/P8BAAIAAQAAAAIA//8BAAEAAAD//wQAAgD+//7/AwACAP///v/+/wMAAQD8//z/AwABAPv//f8CAAAA/v/+//3//v8BAP///P/+//7//v////7//f/+//7//P/+/wEA/P/9////AAD8//3///8BAPz//f/+/wMA/P/+////AgD8//////8EAPz////+/wIA//8CAPv//f8CAAYA+v/8/wEABwD9//7//f8FAAEA///7/wEAAQACAPz//v///wMA///8//z/AgABAP3/+/8AAP7//v///wAA+//+/wEA/v/8/////f/8////AQD6//v/AQD///v//f/+//z//f////z/+//+/////P/7//7/AAD7//3////9//v/AAD///r//P8BAP7//f/8////AAAAAPr///8DAAIA+v8AAAMAAQD8/wMAAQABAAAABAD//wEABAAEAP7/AwADAAUAAgAEAAAABAAEAAQAAgAGAAEABAAEAAcAAQAEAAQABgABAAYABAAFAAAAAwAFAAYAAAACAAMABQACAAMAAQACAAIAAgD//wQAAwD///7/AwADAP7//P8CAAMA/f/9/wIAAAD8////AgD9//7/AgD///v///8CAP7/+v8AAAMA///7/wAAAwD///r/AQAEAAAA+/8BAAMAAgD//wEA//8EAAMAAwD+/wUABAAEAAAABwAEAAQAAQAJAAQABQACAAcABgAGAAEACQAIAAcAAAAKAAkABwACAAkABwAJAAMACQAHAAgAAwAJAAcABgAEAAkABAAFAAYABwADAAUABAAHAAMAAwAEAAgAAgABAAMABgACAAMAAgADAAEABAABAAAAAgACAP//AAACAAAA/v///wEA///+//3/AAAAAP///P/+/wAA///8//7///////7/AAD8//7///8BAP7//v/8/wEAAQD///v/AQD//wAA//8CAP7/AQABAAIA/P8CAAQAAgD8/wIABQAEAP7/AwADAAQAAgADAAEABQAEAAMAAQAGAAQAAgADAAcAAwABAAMACAAEAAIAAQAEAAQABgABAAEAAgAFAAMABQAAAP//AwAHAP////8CAAQAAAACAAEAAAABAAIA/v8CAAIA/v/9/wUAAQD8//7/AwAAAAAA/f///wEAAwD+//3///8DAAEA///9/wMAAwAAAP//AwABAAAAAgAGAAAAAAAEAAYAAAACAAUABgACAAQABAAGAAQABQACAAcABwAFAAIABwAHAAgABQAFAAQACgAIAAUAAwAJAAgABwADAAcACAAHAAMACAAHAAYAAwAGAAUABwAEAAUAAwAFAAMABgAEAAMAAQAEAAYABAD//wEABAAFAAIA//8BAAQABAAAAP//AQADAAAA//8AAAQA/////wIAAwD9/wAAAAABAP//AQAAAAAA/f8BAAEAAwD9//7/AQAFAP3//f8BAAYA/////wAABAACAAEA/f8BAAUABAD+/wEABAAEAAEAAQAEAAQAAQACAAYAAwAAAAMACAACAAEABAAIAAEAAwADAAYAAQAFAAQABAABAAcABAAEAAAABgAEAAQAAQAGAAUABAAAAAYABQAEAP//BQAEAAQAAQAFAAEAAwADAAQAAAADAAQABAAAAAIABQAFAP//AAAGAAQAAQACAAIAAgAGAAIA//8DAAUAAQACAAIAAQABAAQAAgABAAAAAgAEAAMA//8BAAMAAgABAAMAAgD//wIABgABAP3/AwAFAAAA/v8FAAIAAAD//wQAAgACAP//AQABAAQA//8BAAAAAwD//wMAAAACAP//BAD+/wEAAAAEAP//AQD9/wUAAgAAAPv/BQACAP///v8FAP//AAABAAMA/f8BAAIAAwD9/wAAAwAEAP////8AAAUAAQD+////BQAEAP3///8GAAQA/f8AAAUAAgAAAAMAAQD//wIABAD/////AgADAAIAAQD//wAAAgAFAAEA/f8AAAUAAgD+/wEAAgAAAAAAAgABAAEAAAABAAAAAQD//wMAAQD///7/AwACAAAA//8CAAAAAgAAAAAA//8DAAEA///+/wQAAQD///3/BAAAAP3///8EAP3//v8CAAMA+////wMAAwA=", Ru = bu, _s = 5, Lu = 7e-4, Ds = 0.018, xs = 0.012, $r = 6e-3, gn = 0.985, eA = 0.95, tA = 4, Uu = 90, Nu = 48, Pn = null, sr = /* @__PURE__ */ new Map(), Ss = 0.16;
function Tt(e, t, i, n) {
  return {
    key: e,
    start: t - Ss,
    end: i - Ss,
    trim: n
  };
}
var Fu = {
  lift: Tt("lift", 0.178, 0.325, 2.65),
  micro: [
    Tt("micro-a", 0.185, 0.205, 2.9),
    Tt("micro-b", 0.282, 0.322, 2.8),
    Tt("micro-c", 0.407, 0.44, 2.75),
    Tt("micro-d", 0.483, 0.565, 2.65),
    Tt("micro-e", 0.603, 0.698, 2.55),
    Tt("micro-f", 0.724, 0.92, 2.45)
  ],
  body: [
    Tt("body-a", 0.94, 1.126, 0.64),
    Tt("body-b", 1.352, 1.446, 0.7),
    Tt("body-c", 1.558, 1.708, 0.68)
  ],
  accent: [Tt("accent-a", 1.222, 1.292, 0.58), Tt("accent-b", 1.574, 1.715, 0.62)],
  finish: Tt("finish", 1.73, 1.795, 0.72)
};
function ct(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function Cs(e, t, i) {
  const n = ct((i - e) / (t - e), 0, 1);
  return n * n * (3 - 2 * n);
}
function si(e, t) {
  return e + Math.random() * (t - e);
}
function Qu(e) {
  const t = Array.from({ length: e }, (i, n) => n);
  for (let i = t.length - 1; i > 0; i -= 1) {
    const n = Math.floor(Math.random() * (i + 1));
    [t[i], t[n]] = [t[n], t[i]];
  }
  return t;
}
function ys(e) {
  return 10 ** (e / 20);
}
function vn(e) {
  return 2 ** (si(-e, e) / 12);
}
function Ts() {
  return ct(-Math.log(Math.max(1e-3, 1 - Math.random())), 0.55, 1.8);
}
function Bs() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function wn() {
  if (Pn) return Pn;
  if (typeof window > "u") return null;
  const e = window.AudioContext ?? window.webkitAudioContext;
  if (!e) return null;
  try {
    Pn = new e({ latencyHint: "interactive" });
  } catch {
    return null;
  }
  return Pn;
}
function bs(e, t) {
  const i = sr.get(e);
  if (i) return i;
  const n = fetch(e).then((r) => {
    if (!r.ok) throw new Error(`Peel audio request failed with ${r.status}.`);
    return r.arrayBuffer();
  }).then((r) => t.decodeAudioData(r));
  return sr.set(e, n), n.catch(() => {
    sr.get(e) === n && sr.delete(e);
  }), n;
}
function Ai(e, t, i, n, r = 1) {
  return {
    key: e,
    start: t * i,
    end: t * n,
    trim: r
  };
}
function Ou(e) {
  return {
    lift: Ai("lift", e, 0.02, 0.18, 1.2),
    micro: [
      Ai("micro-a", e, 0.12, 0.32, 1.05),
      Ai("micro-b", e, 0.28, 0.48, 1),
      Ai("micro-c", e, 0.44, 0.62, 0.95)
    ],
    body: [
      Ai("body-a", e, 0.32, 0.56, 0.9),
      Ai("body-b", e, 0.52, 0.76, 0.86),
      Ai("body-c", e, 0.7, 0.88, 0.82)
    ],
    accent: [Ai("accent", e, 0.58, 0.78, 0.82)],
    finish: Ai("finish", e, 0.8, 0.98, 0.9)
  };
}
var Vu = class {
  constructor() {
    this.enabled = !1, this.src = "", this.volume = 0.7, this.useBuiltInProfile = !1, this.buffer = null, this.reappearBuffer = null, this.profile = null, this.loadRevision = 0, this.masterGain = null, this.compressor = null, this.activeVoices = /* @__PURE__ */ new Set(), this.gestureActive = !1, this.lastProgress = 0, this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = 6e-3, this.nextBackwardSpacing = 0.025, this.liftArmed = !0, this.finishArmed = !0, this.fullyDetached = !1, this.lastAccentTime = -1 / 0, this.holdTimer = null, this.panWalk = 0, this.lastSliceKey = "", this.sliceBags = {
      micro: [],
      body: [],
      accent: []
    }, this.destroyed = !1;
  }
  configure(e) {
    if (this.destroyed) return;
    const t = e.src.trim(), i = !!e.useBuiltInProfile, n = t !== this.src, r = i !== this.useBuiltInProfile;
    if (this.enabled = e.enabled && !!t, this.src = t, this.volume = ct(e.volume, 0, 1), this.useBuiltInProfile = i, this.masterGain && this.masterGain.gain.setTargetAtTime(this.volume, this.masterGain.context.currentTime, 0.012), (n || r) && (this.reset(0), this.buffer = null, this.profile = null, this.loadRevision += 1), !this.enabled) {
      this.reset(this.lastProgress);
      return;
    }
    this.buffer || this.preload(), this.reappearBuffer || this.preloadReappear();
  }
  unlock() {
    if (!this.enabled || this.destroyed) return;
    const e = wn();
    e && (e.state === "suspended" && e.resume().catch(() => {
    }), this.buffer || this.preload(), this.reappearBuffer || this.preloadReappear());
  }
  begin(e, t = Bs()) {
    this.clearHoldTimer(), this.gestureActive = !0, this.lastProgress = ct(e, 0, 1), this.lastUpdateTime = t, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.nextForwardSpacing = si(4e-3, 8e-3), this.nextBackwardSpacing = si(0.018, 0.032), this.lastAccentTime = -1 / 0, this.panWalk = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012), this.lastProgress <= $r && (this.liftArmed = !0), this.lastProgress < eA ? (this.fullyDetached = !1, this.finishArmed = !0) : this.lastProgress >= gn && (this.fullyDetached = !0, this.finishArmed = !1);
  }
  update(e, t = Bs(), i = 0) {
    const n = ct(e, 0, 1);
    if (!this.gestureActive) {
      this.begin(n, t);
      return;
    }
    const r = this.lastProgress, A = Math.max((t - this.lastUpdateTime) / 1e3, 0), s = n - r;
    if (this.lastProgress = n, this.lastUpdateTime = t, n <= $r && (this.liftArmed = !0), n < eA && (this.fullyDetached = !1, this.finishArmed = !0), Math.abs(s) < Lu) {
      const f = Math.exp(-Math.min(A, 0.12) / 0.045);
      this.smoothedVelocity *= f, this.smoothedAcceleration *= f;
      return;
    }
    this.armHoldSilence();
    const a = ct(A || 1 / 60, 1 / 240, 0.25);
    A > 0.14 && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0);
    const l = s / a, o = this.smoothedVelocity, c = 1 - Math.exp(-a / 0.045);
    this.smoothedVelocity += (l - this.smoothedVelocity) * c;
    const u = (this.smoothedVelocity - o) / a, h = this.smoothedAcceleration, p = 1 - Math.exp(-a / 0.075);
    this.smoothedAcceleration += (u - this.smoothedAcceleration) * p;
    const w = Math.abs(l) * 0.52 + Math.abs(this.smoothedVelocity) * 0.48, M = ct(Math.log1p(8 * w) / Math.log(13), 0, 1);
    this.panWalk = ct(this.panWalk + si(-0.018, 0.018), -0.05, 0.05);
    const d = ct(i * 0.08 + this.panWalk, -0.12, 0.12);
    if (this.fullyDetached && n >= eA) {
      this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.01);
      return;
    }
    if (s > 0 && w >= Ds) {
      if (this.stopVoices(/* @__PURE__ */ new Set(["reattach"]), 0.012), this.liftArmed && r <= xs && n >= xs && (this.playLift(M, d), this.liftArmed = !1), this.finishArmed && r < gn && n >= gn) {
        this.playFinish(M, d), this.finishArmed = !1, this.fullyDetached = !0, this.forwardTravel = 0, this.backwardTravel = 0;
        return;
      }
      if (!this.fullyDetached) {
        this.forwardTravel += s;
        const f = ct(w / (6 + 44 * M ** 0.75), 32e-4, 0.035);
        let C = 0;
        for (; this.forwardTravel >= this.nextForwardSpacing && C < 2; ) {
          const x = Cs(8e-3, 0.035, n) * (1 - 0.28 * Cs(0.86, 0.98, n));
          this.playTexture(M, x, d), this.forwardTravel -= this.nextForwardSpacing, this.nextForwardSpacing = f * Ts(), C += 1;
        }
        C === 2 && this.forwardTravel >= this.nextForwardSpacing && (this.forwardTravel = 0);
      }
      if (h <= tA && this.smoothedAcceleration > tA && M > 0.2 && t - this.lastAccentTime >= Uu && n < gn) {
        const f = ct((this.smoothedAcceleration - tA) / 8, 0, 1);
        this.playAccent(M, f, d), this.lastAccentTime = t;
      }
      this.backwardTravel = 0;
      return;
    }
    if (s < 0 && w >= Ds) {
      this.stopVoices(/* @__PURE__ */ new Set(["texture"]), 0.014), this.backwardTravel += -s;
      const f = ct(w / (2 + 12 * M ** 0.8), 8e-3, 0.07);
      let C = 0;
      for (; this.backwardTravel >= this.nextBackwardSpacing && C < 1; )
        this.playReattach(M, d), this.backwardTravel -= this.nextBackwardSpacing, this.nextBackwardSpacing = f * Ts(), C += 1;
      C && this.backwardTravel >= this.nextBackwardSpacing && (this.backwardTravel = 0), this.forwardTravel = 0;
    }
  }
  end(e) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ct(e, 0, 1), this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.016);
  }
  playReappear() {
    if (!this.enabled || this.destroyed) return;
    const e = wn(), t = this.reappearBuffer;
    if (!e || !t || this.activeVoices.size >= _s) {
      t || this.preloadReappear();
      return;
    }
    const i = e.currentTime + 2e-3, n = t.duration, r = e.createBufferSource(), A = e.createGain(), s = 0.82, a = Math.min(4e-3, n * 0.12), l = Math.min(0.025, n * 0.2);
    r.buffer = t, A.gain.setValueAtTime(0, i), A.gain.linearRampToValueAtTime(s, i + a), A.gain.setValueAtTime(s, Math.max(i + a, i + n - l)), A.gain.linearRampToValueAtTime(0, i + n), r.connect(A), A.connect(this.ensureOutput(e));
    const o = [r, A], c = {
      source: r,
      gain: A,
      nodes: o,
      kind: "reappear"
    };
    this.activeVoices.add(c), r.addEventListener("ended", () => {
      this.activeVoices.delete(c);
      for (const u of o) u.disconnect();
    }, { once: !0 }), r.start(i);
  }
  reset(e = 0) {
    this.clearHoldTimer(), this.gestureActive = !1, this.lastProgress = ct(e, 0, 1), this.lastUpdateTime = 0, this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.forwardTravel = 0, this.backwardTravel = 0, this.liftArmed = this.lastProgress <= $r, this.fullyDetached = this.lastProgress >= gn, this.finishArmed = !this.fullyDetached, this.lastAccentTime = -1 / 0, this.stopVoices(void 0, 0.012);
  }
  stop() {
    this.clearHoldTimer(), this.gestureActive = !1, this.stopVoices(void 0, 0.012);
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.loadRevision += 1, this.stop(), this.masterGain?.disconnect(), this.compressor?.disconnect(), this.masterGain = null, this.compressor = null, this.buffer = null, this.reappearBuffer = null, this.profile = null);
  }
  preload() {
    const e = wn();
    if (!e || !this.enabled || !this.src || this.destroyed) return;
    const t = ++this.loadRevision;
    bs(this.src, e).then((i) => {
      this.destroyed || t !== this.loadRevision || (this.buffer = i, this.profile = this.useBuiltInProfile ? Fu : Ou(i.duration), this.sliceBags = {
        micro: [],
        body: [],
        accent: []
      });
    }).catch(() => {
    });
  }
  preloadReappear() {
    const e = wn();
    !e || !this.enabled || this.destroyed || bs(Iu, e).then((t) => {
      this.destroyed || (this.reappearBuffer = t);
    }).catch(() => {
    });
  }
  armHoldSilence() {
    typeof window > "u" || (this.clearHoldTimer(), this.holdTimer = window.setTimeout(() => {
      this.holdTimer = null, this.gestureActive && (this.smoothedVelocity = 0, this.smoothedAcceleration = 0, this.stopVoices(/* @__PURE__ */ new Set(["texture", "reattach"]), 0.012));
    }, Nu));
  }
  clearHoldTimer() {
    this.holdTimer === null || typeof window > "u" || (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
  playLift(e, t) {
    const i = this.profile?.lift;
    i && this.playSlice(i, {
      kind: "lift",
      duration: 0.07 + e * 0.025,
      playbackRate: (0.94 + e * 0.12) * vn(0.5),
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
    const n = Math.random() < ct(0.12 + 0.58 * e, 0, 0.72), r = this.takeSlice(n ? "body" : "micro");
    if (!r) return;
    const A = si(0.85, 1.15) * (0.066 - 0.032 * e);
    this.playSlice(r, {
      kind: "texture",
      duration: A,
      playbackRate: (0.92 + e * 0.18) * vn(0.7),
      gain: (0.07 + 0.2 * e ** 0.65) * t * ys(si(-1.5, 1.5)),
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
      playbackRate: (0.67 + e * 0.17) * vn(0.5),
      gain: (0.024 + 0.052 * e ** 0.7) * ys(si(-1.2, 1.2)),
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
      playbackRate: (0.96 + e * 0.12) * (1 + t * 0.08) * vn(0.45),
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
      playbackRate: (0.97 + e * 0.08) * vn(0.35),
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
    i.length || (i = Qu(t.length), i.length > 1 && t[i[i.length - 1]]?.key === this.lastSliceKey && ([i[0], i[i.length - 1]] = [i[i.length - 1], i[0]]), this.sliceBags[e] = i);
    const n = t[i.pop() ?? 0] ?? null;
    return n && (this.lastSliceKey = n.key), n;
  }
  playSlice(e, t) {
    if (!this.enabled || this.destroyed || this.activeVoices.size >= _s) return;
    const i = wn(), n = this.buffer;
    if (!i || !n) return;
    const r = ct(e.start, 0, Math.max(n.duration - 4e-3, 0)), A = ct(e.end, r + 4e-3, n.duration) - r;
    if (A < 4e-3) return;
    const s = Math.min(t.duration * t.playbackRate, A), a = Math.max(A - s, 0), l = r + (a ? Math.random() * a : 0), o = s / t.playbackRate, c = i.currentTime + 2e-3, u = Math.min(t.attack, o * 0.36), h = Math.min(t.release, o * 0.48), p = Math.max(c + u, c + o - h), w = ct(t.gain * e.trim, 0, 1.1), M = i.createBufferSource(), d = i.createBiquadFilter(), f = i.createBiquadFilter(), C = i.createGain(), x = typeof i.createStereoPanner == "function" ? i.createStereoPanner() : null;
    M.buffer = n, M.playbackRate.setValueAtTime(t.playbackRate, c), d.type = "highpass", d.frequency.setValueAtTime(t.highpass, c), d.Q.setValueAtTime(0.7, c), f.type = "lowpass", f.frequency.setValueAtTime(ct(t.lowpass, 600, i.sampleRate * 0.46), c), f.Q.setValueAtTime(0.72, c), x && x.pan.setValueAtTime(t.pan, c), C.gain.setValueAtTime(0, c), C.gain.linearRampToValueAtTime(w, c + u), C.gain.setValueAtTime(w, p), C.gain.linearRampToValueAtTime(0, c + o), M.connect(d), d.connect(f);
    const P = x ?? f;
    x && f.connect(x), P.connect(C), C.connect(this.ensureOutput(i));
    const D = [
      M,
      d,
      f
    ];
    x && D.push(x), D.push(C);
    const S = {
      source: M,
      gain: C,
      nodes: D,
      kind: t.kind
    };
    this.activeVoices.add(S), M.addEventListener("ended", () => {
      this.activeVoices.delete(S);
      for (const B of D) B.disconnect();
    }, { once: !0 }), M.start(c, l, s);
  }
  stopVoices(e, t) {
    const i = Pn;
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
}, zu = {
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
}, Hu = { ...zu };
function Is() {
  return Hu;
}
var Bi = 2048, wi = 320, gA = 0.1 * 255;
function _t(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function ku(e, t, i) {
  const n = new Uint8Array(t * i), r = new Int32Array(t * i);
  let A = 0, s = 0;
  const a = (l, o) => {
    if (l < 0 || l >= t || o < 0 || o >= i) return;
    const c = o * t + l;
    n[c] || e[c] >= gA || (n[c] = 1, r[s] = c, s += 1);
  };
  for (let l = 0; l < t; l += 1)
    a(l, 0), a(l, i - 1);
  for (let l = 1; l < i - 1; l += 1)
    a(0, l), a(t - 1, l);
  for (; A < s; ) {
    const l = r[A];
    A += 1;
    const o = l % t, c = Math.floor(l / t);
    a(o - 1, c), a(o + 1, c), a(o, c - 1), a(o, c + 1);
  }
  return n;
}
function Rs(e) {
  if (!e) return null;
  const t = Number.parseFloat(e);
  return Number.isFinite(t) && t > 0 ? t : null;
}
function Gu(e) {
  if (e.length > 2e6) throw new Error("SVG markup must be smaller than 2 MB.");
  const t = new DOMParser().parseFromString(e, "image/svg+xml");
  if (t.querySelector("parsererror")) throw new Error("The SVG could not be parsed.");
  const i = t.documentElement;
  if (i.localName.toLowerCase() !== "svg") throw new Error("The uploaded file is not an SVG document.");
  i.querySelectorAll("script, foreignObject, iframe, object, embed, audio, video, canvas, style, animate, animateMotion, animateTransform, set").forEach((n) => n.remove());
  for (const n of [i, ...Array.from(i.querySelectorAll("*"))]) for (const r of Array.from(n.attributes)) {
    const A = r.name.toLowerCase(), s = r.value.trim();
    if (A.startsWith("on")) {
      n.removeAttribute(r.name);
      continue;
    }
    if (A === "href" || A === "xlink:href") {
      s.startsWith("#") || n.removeAttribute(r.name);
      continue;
    }
    /url\s*\(/i.test(s) && !/url\s*\(\s*["']?#/i.test(s) && n.removeAttribute(r.name), (/^javascript:/i.test(s) || /^data:text\/html/i.test(s)) && n.removeAttribute(r.name);
  }
  return i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), new XMLSerializer().serializeToString(i);
}
function Wu(e) {
  const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement, i = t.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (i?.length === 4 && Number.isFinite(i[2]) && Number.isFinite(i[3]) && i[2] > 0 && i[3] > 0) return _t(i[2] / i[3], 0.15, 8);
  const n = Rs(t.getAttribute("width")), r = Rs(t.getAttribute("height"));
  return n && r ? _t(n / r, 0.15, 8) : 1;
}
async function Xu(e) {
  const t = new Blob([e], { type: "image/svg+xml;charset=utf-8" }), i = URL.createObjectURL(t);
  try {
    const n = new Image();
    return n.decoding = "async", n.src = i, await n.decode(), n;
  } finally {
    URL.revokeObjectURL(i);
  }
}
async function Ia(e) {
  if (!/^(data:|blob:|https?:|\/)/i.test(e)) throw new Error("The image URL must use data, blob, HTTP, or HTTPS.");
  const t = new Image();
  if (t.decoding = "async", /^https?:/i.test(e) && (t.crossOrigin = "anonymous"), t.src = e, await t.decode(), !t.naturalWidth || !t.naturalHeight) throw new Error("The image has no drawable dimensions.");
  return t;
}
function Ra(e) {
  const t = Math.min(1, 640 / Math.max(e.naturalWidth, e.naturalHeight)), i = Math.max(1, Math.round(e.naturalWidth * t)), n = Math.max(1, Math.round(e.naturalHeight * t)), r = document.createElement("canvas");
  r.width = i, r.height = n;
  const A = r.getContext("2d", { willReadFrequently: !0 });
  if (!A) throw new Error("Canvas 2D is unavailable.");
  A.clearRect(0, 0, i, n), A.drawImage(e, 0, 0, i, n);
  const s = A.getImageData(0, 0, i, n).data;
  for (let a = 3; a < s.length; a += 4) if (s[a] < 255) return !0;
  return !1;
}
async function gf(e) {
  return Ra(await Ia(e));
}
async function Yu(e) {
  const t = e.fontFamily ?? "Arial Rounded MT Bold, Arial Black, sans-serif", i = e.fontWeight ?? 900, n = e.richText?.blocks.filter((f) => f.runs.length);
  if (n?.length) {
    const f = document.createElement("canvas").getContext("2d");
    if (!f) throw new Error("Canvas 2D is unavailable.");
    const C = 144, x = (G) => {
      const k = n.map((O) => {
        let X = 0, U = 0, J = 0, ee = 0;
        const te = O.runs.map((Ee) => {
          const We = _t((Ee.fontSize ?? 28) * G, 24, 720);
          ee = Math.max(ee, We);
          const qe = Ee.fontWeight ?? i;
          f.font = `${qe} ${We}px ${t}`;
          const Y = f.measureText(Ee.text || " "), re = Y.actualBoundingBoxAscent || Math.max(We * 0.76, 1), ue = Y.actualBoundingBoxDescent || Math.max(We * 0.2, 1), he = Ee.text ? Y.width : 0;
          return X += he, U = Math.max(U, re), J = Math.max(J, ue), {
            ...Ee,
            fontSize: We,
            fontWeight: qe,
            width: he
          };
        }), ce = ee || 28 * G;
        return (!te.length || U + J < 1) && (U = ce * 0.76, J = ce * 0.24), {
          align: O.align ?? "center",
          runs: te,
          width: X,
          ascent: U,
          descent: J,
          height: Math.max(U + J, ce) * _t(O.lineHeight ?? 1.2, 0.7, 3)
        };
      });
      return {
        lines: k,
        contentWidth: Math.max(1, ...k.map((O) => O.width)),
        contentHeight: k.reduce((O, X) => O + X.height, 0)
      };
    };
    let P = 8, D = x(P);
    const S = 1750 / Math.max(D.contentWidth, 1), B = 1790 / Math.max(D.contentHeight, 1);
    if ((S < 1 || B < 1) && (P *= Math.min(S, B), D = x(P)), document.fonts?.load) {
      const G = /* @__PURE__ */ new Set();
      for (const k of D.lines) for (const O of k.runs) G.add(`${O.fontWeight} ${O.fontSize}px ${t}`);
      await Promise.all([...G].map((k) => document.fonts.load(k).catch(() => []))), D = x(P);
    }
    const g = _t(Math.ceil(D.contentWidth + C * 2), wi, Bi), _ = _t(Math.ceil(D.contentHeight + C * 2), wi, Bi), W = document.createElement("canvas");
    W.width = g, W.height = _;
    const y = W.getContext("2d", { willReadFrequently: !0 });
    if (!y) throw new Error("Canvas 2D is unavailable.");
    y.clearRect(0, 0, g, _), y.textBaseline = "alphabetic";
    let H = (_ - D.contentHeight) / 2;
    for (const G of D.lines) {
      const k = G.align === "left" ? C : G.align === "right" ? g - C - G.width : (g - G.width) / 2, O = H + (G.height - G.ascent - G.descent) / 2 + G.ascent;
      let X = k;
      for (const U of G.runs) {
        if (y.font = `${U.fontWeight} ${U.fontSize}px ${t}`, y.fillStyle = U.color ?? e.color ?? "#19191d", y.fillText(U.text, X, O), U.underline && U.width > 0) {
          const J = Math.max(2, U.fontSize * 0.045);
          y.fillRect(X, O + Math.max(2, U.fontSize * 0.07), U.width, J);
        }
        X += U.width;
      }
      H += G.height;
    }
    return W;
  }
  const r = i;
  let A = 420;
  const s = document.createElement("canvas").getContext("2d");
  if (!s) throw new Error("Canvas 2D is unavailable.");
  if (document.fonts?.load) try {
    await document.fonts.load(`${r} ${A}px ${t}`);
  } catch {
  }
  const a = e.text || " ";
  s.font = `${r} ${A}px ${t}`;
  let l = s.measureText(a);
  const o = Math.max(1, l.width);
  o > 1750 && (A *= 1750 / o, s.font = `${r} ${A}px ${t}`, l = s.measureText(a));
  const c = l.actualBoundingBoxAscent || Math.max(A * 0.76, 1), u = l.actualBoundingBoxDescent || Math.max(A * 0.2, 1), h = 144, p = _t(Math.ceil(l.width + h * 2), wi, Bi), w = _t(Math.ceil(c + u + h * 2), wi, 1280), M = document.createElement("canvas");
  M.width = p, M.height = w;
  const d = M.getContext("2d", { willReadFrequently: !0 });
  if (!d) throw new Error("Canvas 2D is unavailable.");
  return d.clearRect(0, 0, p, w), d.font = `${r} ${A}px ${t}`, d.textBaseline = "alphabetic", d.textAlign = "center", d.fillStyle = e.color ?? "#19191d", d.fillText(a, p / 2, (w + c - u) / 2), M;
}
async function qu(e) {
  const t = Gu(e.svg), i = Wu(t), n = 1740, r = 144, A = i >= 1 ? n : n * i, s = i >= 1 ? n / i : n, a = _t(Math.ceil(A + r * 2), wi, Bi), l = _t(Math.ceil(s + r * 2), wi, Bi), o = document.createElement("canvas");
  o.width = a, o.height = l;
  const c = o.getContext("2d", { willReadFrequently: !0 });
  if (!c) throw new Error("Canvas 2D is unavailable.");
  const u = await Xu(t);
  return c.drawImage(u, r, r, a - r * 2, l - r * 2), o;
}
async function Ku(e) {
  const t = await Ia(e.src), i = Ra(t), n = _t(t.naturalWidth / t.naturalHeight, 0.15, 8), r = 1740, A = 144, s = n >= 1 ? r : r * n, a = n >= 1 ? r / n : r, l = _t(Math.ceil(s + A * 2), wi, Bi), o = _t(Math.ceil(a + A * 2), wi, Bi), c = document.createElement("canvas");
  c.width = l, c.height = o;
  const u = c.getContext("2d", { willReadFrequently: !0 });
  if (!u) throw new Error("Canvas 2D is unavailable.");
  return u.clearRect(0, 0, l, o), u.drawImage(t, A, A, l - A * 2, o - A * 2), {
    canvas: c,
    hasTransparency: i
  };
}
function Ju(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d");
  if (!n) throw new Error("Canvas 2D is unavailable.");
  return n.fillStyle = t, n.fillRect(0, 0, i.width, i.height), n.globalCompositeOperation = "destination-in", n.drawImage(e, 0, 0), i;
}
var Zu = 1e12;
function Ls(e, t, i, n, r, A, s, a, l) {
  let o = 0;
  a[0] = 0, l[0] = Number.NEGATIVE_INFINITY, l[1] = Number.POSITIVE_INFINITY;
  for (let c = 1; c < s; c += 1) {
    let u = a[o], h = (e[t + c * i] + c * c - (e[t + u * i] + u * u)) / (2 * c - 2 * u);
    for (; h <= l[o]; )
      o -= 1, u = a[o], h = (e[t + c * i] + c * c - (e[t + u * i] + u * u)) / (2 * c - 2 * u);
    o += 1, a[o] = c, l[o] = h, l[o + 1] = Number.POSITIVE_INFINITY;
  }
  o = 0;
  for (let c = 0; c < s; c += 1) {
    for (; l[o + 1] < c; ) o += 1;
    const u = a[o], h = c - u;
    n[r + c * A] = h * h + e[t + u * i];
  }
}
function ju(e, t) {
  const i = e.width, n = e.height, r = e.getContext("2d", { willReadFrequently: !0 });
  if (!r) throw new Error("Canvas 2D is unavailable.");
  const A = r.getImageData(0, 0, i, n).data, s = i * n, a = new Float32Array(s), l = new Float32Array(s);
  let o = !1;
  for (let d = 0; d < s; d += 1) {
    const f = A[d * 4 + 3] >= gA;
    a[d] = f ? 0 : Zu, o || (o = f);
  }
  const c = Math.max(i, n), u = new Int32Array(c), h = new Float64Array(c + 1);
  if (o) {
    for (let d = 0; d < n; d += 1) Ls(a, d * i, 1, l, d * i, 1, i, u, h);
    for (let d = 0; d < i; d += 1) Ls(l, d, i, a, d, i, n, u, h);
  }
  const p = document.createElement("canvas");
  p.width = i, p.height = n;
  const w = p.getContext("2d");
  if (!w) throw new Error("Canvas 2D is unavailable.");
  const M = w.createImageData(i, n);
  for (let d = 0; d < s; d += 1) {
    const f = o ? _t(t + 0.5 - Math.sqrt(a[d]), 0, 1) : 0, C = d * 4;
    M.data[C] = 255, M.data[C + 1] = 255, M.data[C + 2] = 255, M.data[C + 3] = Math.round(f * 255);
  }
  return w.putImageData(M, 0, 0), p;
}
function $u(e, t) {
  const i = document.createElement("canvas");
  i.width = e.width, i.height = e.height;
  const n = i.getContext("2d", { willReadFrequently: !0 });
  if (!n) throw new Error("Canvas 2D is unavailable.");
  const r = _t(t.width * 2.35, 0, 112);
  if (r > 0.25) {
    const A = ju(e, r);
    n.drawImage(Ju(A, t.color), 0, 0);
  }
  return n.drawImage(e, 0, 0), i;
}
async function Us(e, t) {
  const i = e.type === "image" ? await Ku(e) : {
    canvas: e.type === "text" ? await Yu(e) : await qu(e),
    hasTransparency: !0
  }, n = i.canvas, r = $u(n, t), A = r.getContext("2d", { willReadFrequently: !0 });
  if (!A) throw new Error("Canvas 2D is unavailable.");
  const s = A.getImageData(0, 0, r.width, r.height), a = new Uint8ClampedArray(r.width * r.height);
  for (let o = 3, c = 0; o < s.data.length; o += 4)
    a[c] = s.data[o], c += 1;
  const l = [];
  for (let o = 0; o < r.height; o += 1) {
    const c = o * r.width;
    let u = -1, h = -1;
    for (let w = 0; w < r.width; w += 1)
      a[c + w] < gA || (u < 0 && (u = w), h = w);
    if (u < 0) continue;
    const p = o / Math.max(r.height - 1, 1);
    l.push(u / Math.max(r.width - 1, 1), p), h !== u && l.push(h / Math.max(r.width - 1, 1), p);
  }
  return {
    canvas: r,
    width: r.width,
    height: r.height,
    aspect: r.width / r.height,
    alpha: a,
    exteriorAlpha: ku(a, r.width, r.height),
    support: new Float32Array(l),
    hasTransparency: i.hasTransparency
  };
}
var ef = {
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
function En(e, t = {}) {
  const i = e ?? ef;
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
var Ti = {
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
}, Ns = 2.55, tf = Math.PI, nf = 1.28, Fs = 4e-3, Qs = -0.22, rf = 0.035, Af = 0.74, sf = 760, af = 520, vf = 720, Os = 720 / 1e3, Vs = 0.06, of = 0.42, lf = 0.32, cf = 0.9, hf = "rgb(36, 126, 245)";
function Ge(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
function iA(e, t, i) {
  const n = Ge((i - e) / (t - e), 0, 1);
  return n * n * (3 - 2 * n);
}
function Si(e, t) {
  try {
    return new Ve(e);
  } catch {
    return new Ve(t);
  }
}
function zs(e, t) {
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
var uf = class {
  constructor(e, t = {}) {
    this.camera = new gr(-1, 1, 1, -1, 0.01, 10), this.scene = new ml(), this.peelAudio = new Vu(), this.groundShadowGeometry = new xn(1, 1), this.peelShadowLight = new Jl(16777215, 1), this.peelShadowTarget = new It(), this.geometry = new xn(1, 1, 2, 2), this.texture = null, this.artwork = null, this.source = Ti, this.requestedSource = Ti, this.sourceRevision = 0, this.sourceRebuildTimer = null, this.destroyed = !1, this.resizeObserver = null, this.viewWidth = 2, this.viewHeight = 2, this.viewportHeightPx = 420, this.renderScale = 1, this.meshWidth = 1.6, this.meshHeight = 0.62, this.pointerId = null, this.grabOrigin = new Re(-0.8, 0), this.grabStart = new Re(), this.grabDirection = new Re(1, 0), this.activeDirection = new Re(1, 0), this.grabExtent = 1.6, this.creaseDepth = 0, this.basePeelRadius = 0.08, this.effectivePeelRadius = 0.08, this.grabProjection = 0, this.springVelocity = 0, this.springActive = !1, this.springTargetDepth = 0, this.dragDetached = !1, this.detachedTension = 0, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.preparedEntrance = null, this.backgroundRemovalEffectActive = !1, this.backgroundRemovalEffectElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.entranceAxis = new Re(1, 0), this.frameRequest = 0, this.lastFrameTime = 0, this.state = {
      ready: !1,
      dragging: !1,
      progress: 0,
      grabPoint: null,
      pointer: null
    }, this.resize = () => {
      if (this.destroyed) return;
      const r = Math.max(2, Math.round(this.container.clientWidth || 640)), A = Math.max(2, Math.round(this.container.clientHeight || 420)), s = this.options.quality === "low" ? 1.25 : 2;
      this.renderer.setPixelRatio(Math.min(Math.min(window.devicePixelRatio || 1, s) * this.renderScale, 6)), this.renderer.setSize(r, A, !1), this.viewportHeightPx = A, this.viewHeight = 2, this.viewWidth = r / A * this.viewHeight, this.groundShadowMesh.scale.set(this.viewWidth * 1.2, this.viewHeight * 1.2, 1), this.camera.left = -this.viewWidth / 2, this.camera.right = this.viewWidth / 2, this.camera.top = this.viewHeight / 2, this.camera.bottom = -this.viewHeight / 2, this.camera.updateProjectionMatrix();
      const a = this.peelShadowLight.shadow.camera, l = Math.max(this.viewWidth, this.viewHeight) * 0.9;
      a.left = -l, a.right = l, a.top = l, a.bottom = -l, a.near = 0.1, a.far = 16, a.updateProjectionMatrix(), this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.applyOptionsToRenderer(), this.requestRender();
    }, this.onPointerDown = (r) => {
      if (this.destroyed || !this.state.ready || this.detachedExitActive || this.entranceActive || r.button !== 0) return;
      const A = this.screenToLocal(r.clientX, r.clientY), s = this.hitEdge(A);
      if (!s) {
        this.startInteractionHint();
        return;
      }
      this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.uniforms.uInteractionHint.value = 0, r.preventDefault(), this.renderer.domElement.focus({ preventScroll: !0 }), this.renderer.domElement.setPointerCapture(r.pointerId), this.pointerId = r.pointerId, this.grabOrigin.copy(s.local), this.grabStart.copy(s.local), this.grabDirection.copy(s.inward), this.activeDirection.copy(s.inward), this.grabExtent = this.projectionExtent(this.grabOrigin, this.grabDirection), this.setCreaseDepth(0), this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = 0, this.dragDetached = !1, this.state.dragging = !0, this.state.grabPoint = {
        x: s.local.x,
        y: s.local.y
      }, this.state.pointer = {
        x: A.x,
        y: A.y
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
      const A = this.screenToLocal(r.clientX, r.clientY);
      if (!this.state.dragging || r.pointerId !== this.pointerId) {
        this.renderer.domElement.style.cursor = this.hitEdge(A) ? "grab" : "default";
        return;
      }
      r.preventDefault();
      const s = A.clone().sub(this.grabStart), a = s.length();
      let l = 0, o = !1;
      if (this.dragDetached) {
        const c = a > Fs ? s.clone().normalize() : this.grabDirection;
        c.dot(this.grabDirection) >= Qs && (this.activeDirection.copy(c), this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), a < this.peelModelForDepth(this.grabExtent).projection && (this.dragDetached = !1));
      }
      if (this.dragDetached) {
        const c = this.peelModelForDepth(this.grabExtent).projection;
        this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = this.grabExtent, this.setCreaseDepth(this.grabExtent), this.setDetachedDragOffset(s.x - this.activeDirection.x * c, s.y - this.activeDirection.y * c);
      } else {
        if (a > Fs) {
          const c = s.clone().normalize();
          c.dot(this.grabDirection) >= Qs ? (this.activeDirection.copy(c), l = a) : o = !0;
        } else this.activeDirection.copy(this.grabDirection);
        if (this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection), o)
          this.springActive || (this.springActive = !0, this.springVelocity = 0), this.springTargetDepth = 0;
        else {
          const c = this.peelModelForDepth(this.grabExtent).projection, u = this.solveCreaseDepth(l);
          this.creaseDepth - u > this.grabExtent * rf || this.springActive && u < this.creaseDepth ? (this.springActive || (this.springActive = !0, this.springVelocity = 0), this.springTargetDepth = u) : (this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = u, this.setCreaseDepth(u));
          const h = Math.max(0, l - c);
          this.setDetachedDragOffset(this.activeDirection.x * h, this.activeDirection.y * h), this.state.progress >= 1 - Number.EPSILON && (this.dragDetached = !0);
        }
      }
      this.peelAudio.update(this.state.progress, r.timeStamp, this.activeDirection.x), this.state.pointer = {
        x: A.x,
        y: A.y
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
      const A = r.key === "ArrowUp" || r.key === "ArrowRight", s = r.key === "ArrowDown" || r.key === "ArrowLeft";
      if (!A && !s && r.key !== " ") return;
      if (r.preventDefault(), this.peelAudio.unlock(), r.key === " ") {
        this.reset();
        return;
      }
      this.grabOrigin.set(-this.meshWidth / 2, 0), this.activeDirection.set(1, 0), this.grabDirection.copy(this.activeDirection), this.grabExtent = this.meshWidth;
      const a = this.state.progress, l = Ge(a + (A ? 0.08 : -0.08), 0, 1);
      this.setCreaseDepth(l * this.grabExtent), this.peelAudio.begin(a, r.timeStamp - 72), this.peelAudio.update(this.state.progress, r.timeStamp, this.activeDirection.x), this.peelAudio.end(this.state.progress), this.state.pointer = {
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
      const A = this.lastFrameTime ? Math.min((r - this.lastFrameTime) / 1e3, 1 / 20) : 1 / 60;
      this.lastFrameTime = r;
      const s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (this.springActive && s) if (this.state.dragging)
        this.setCreaseDepth(this.springTargetDepth), this.springVelocity = 0, this.springActive = !1, this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      else {
        this.reset();
        return;
      }
      if (this.springActive) {
        const l = 132 + Ge(this.options.peel.stiffness, 0, 1) * 146, o = Math.sqrt(l) * 1.83;
        let c = A, u = this.creaseDepth;
        for (; c > 0; ) {
          const h = Math.min(c, 0.008333333333333333), p = -l * (u - this.springTargetDepth) - o * this.springVelocity;
          this.springVelocity += p * h, u += this.springVelocity * h, c -= h;
        }
        Math.abs(u - this.springTargetDepth) <= this.grabExtent * 8e-4 && Math.abs(this.springVelocity) < this.grabExtent * 0.018 ? (this.setCreaseDepth(this.springTargetDepth), this.springVelocity = 0, this.springActive = !1, !this.state.dragging && this.springTargetDepth === 0 && (this.state.pointer = null, this.state.grabPoint = null)) : (this.setCreaseDepth(Math.max(0, u)), this.state.dragging || (this.state.pointer = {
          x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
          y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
        })), this.updatePeelUniforms(), this.emit("peelchange", {
          amount: this.state.progress,
          progress: this.state.progress
        });
      }
      if (this.detachedExitActive) {
        this.detachedExitElapsed += A;
        const l = Math.max(this.viewWidth, this.viewHeight) * (1.45 + this.detachedExitElapsed * 3.2);
        if (this.stickerMesh.position.x += this.activeDirection.x * l * A, this.stickerMesh.position.y += this.activeDirection.y * l * A, this.stickerMesh.rotation.z += this.detachedExitSpin * A, this.detachedExitElapsed >= 0.46) {
          this.startEntranceAnimation();
          return;
        }
      }
      if (this.preparedEntrance) {
        this.preparedEntrance.elapsed += A;
        const l = Ge(this.preparedEntrance.elapsed / lf, 0, 1), o = iA(0, 1, l);
        if (this.uniforms.uPreparedMix.value = o, this.uniforms.uPreEntranceProgress.value = o, l >= 1) {
          const c = this.preparedEntrance;
          this.preparedEntrance = null, this.sourceRevision += 1, this.requestedSource = c.source, this.source = c.source, this.options = En(this.options, {
            ...c.options,
            source: c.source
          }), this.applyOptionsToRenderer(), this.applyArtwork(c.artwork, c.texture), this.startEntranceAnimation();
          return;
        }
      }
      if (this.entranceActive && (this.entranceElapsed += A, this.applyEntranceElapsed(this.entranceElapsed) && (this.entranceActive = !1, this.clearEntrancePose(), this.emit("cyclecomplete", { progress: 0 }))), this.interactionHintActive) {
        this.interactionHintElapsed += A;
        const l = Ge(this.interactionHintElapsed / cf, 0, 1);
        if (s) this.uniforms.uInteractionHint.value = l < 0.72 ? 1 : 0;
        else {
          const o = iA(0, 0.12, l), c = 1 - iA(0.58, 1, l), u = 0.9 + Math.sin(l * Math.PI * 2) * 0.1;
          this.uniforms.uInteractionHint.value = o * c * u;
        }
        l >= 1 && (this.interactionHintActive = !1, this.uniforms.uInteractionHint.value = 0);
      }
      if (this.backgroundRemovalEffectActive) {
        const l = Is();
        if (this.applyLaserEffectSettings(), s) this.uniforms.uEntranceSweep.value = 0.5;
        else {
          this.backgroundRemovalEffectElapsed += A;
          const o = this.backgroundRemovalEffectElapsed % (l.cycleDuration / 1e3);
          this.uniforms.uEntranceSweep.value = Math.min(o / (l.sweepDuration / 1e3), 1);
        }
      }
      this.uniforms.uTime.value = r / 1e3, this.renderer.render(this.scene, this.camera);
      const a = !s && this.options.wind > 1e-3 && this.state.progress > 0.01;
      (this.springActive || this.detachedExitActive || this.preparedEntrance !== null || this.entranceActive || this.interactionHintActive || this.backgroundRemovalEffectActive && !s || a) && this.requestRender();
    }, this.container = e, this.options = En(void 0, t), this.camera.position.z = 3, this.renderer = new Du({
      alpha: !0,
      antialias: !0,
      powerPreference: "high-performance",
      premultipliedAlpha: !0,
      preserveDrawingBuffer: !0
    }), this.renderer.setClearColor(0, 0), this.renderer.outputColorSpace = Bt, this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = 1, this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.cursor = "default", this.renderer.domElement.tabIndex = 0, this.renderer.domElement.setAttribute("role", "slider"), this.renderer.domElement.setAttribute("aria-valuemin", "0"), this.renderer.domElement.setAttribute("aria-valuemax", "100"), this.renderer.domElement.setAttribute("aria-valuenow", "0"), this.renderer.domElement.setAttribute("aria-label", "Interactive sticker. Drag a visible edge, or use arrow keys to preview the peel."), this.renderer.domElement.setAttribute("aria-keyshortcuts", "ArrowUp ArrowRight ArrowDown ArrowLeft Space"), e.appendChild(this.renderer.domElement), this.uniforms = {
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
      uMeshSize: { value: new Re(this.meshWidth, this.meshHeight) },
      uTexel: { value: new Re(1 / 1024, 1 / 512) },
      uBackColor: { value: Si(this.options.back.color, "#f7f5f2") },
      uGloss: { value: this.options.back.gloss },
      uRoughness: { value: this.options.back.roughness },
      uShadowColor: { value: Si(this.options.shadow.color, "#191823") },
      uShadowOpacity: { value: this.options.shadow.opacity },
      uShadowBlur: { value: this.options.shadow.blur },
      uShadowDistance: { value: 0.04 },
      uShadowDirection: { value: new Re(0.7, -0.7) },
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
      uInteractionHintColor: { value: Si(hf, "rgb(36, 126, 245)") },
      uPreserveFrontColor: { value: 0 },
      uOpacity: { value: 1 }
    };
    const i = {
      ...Ma.clone(se.lights),
      ...this.uniforms
    };
    this.stickerMaterial = new bt({
      uniforms: i,
      vertexShader: xu,
      fragmentShader: Su,
      lights: !0,
      side: 2,
      transparent: !0,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMaterial.alphaTest = 8e-3, this.stickerMesh = new Ft(this.geometry, this.stickerMaterial), this.stickerMesh.renderOrder = 20, this.stickerMesh.receiveShadow = !0, this.residueMaterial = new bt({
      uniforms: { ...this.uniforms },
      vertexShader: Cu,
      fragmentShader: yu,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }), this.residueMesh = new Ft(this.geometry, this.residueMaterial), this.residueMesh.position.z = -6e-3, this.residueMesh.renderOrder = 10, this.peelShadowDepthMaterial = new bt({
      uniforms: { ...this.uniforms },
      vertexShader: Tu,
      fragmentShader: Bu,
      side: 2,
      depthTest: !0,
      depthWrite: !0
    }), this.stickerMesh.castShadow = !0, this.stickerMesh.customDepthMaterial = this.peelShadowDepthMaterial, this.peelShadowLight.castShadow = !0, this.peelShadowLight.shadow.mapSize.set(this.options.quality === "high" ? 2048 : 1024, this.options.quality === "high" ? 2048 : 1024), this.peelShadowLight.shadow.bias = -1e-4, this.peelShadowLight.shadow.normalBias = 15e-4, this.peelShadowLight.target = this.peelShadowTarget, this.scene.add(this.peelShadowTarget, this.peelShadowLight), this.groundShadowMaterial = new Tl({
      color: Si(this.options.shadow.color, "#191823"),
      opacity: this.options.shadow.opacity,
      transparent: !0,
      depthTest: !0,
      depthWrite: !1,
      toneMapped: !1
    }), this.groundShadowMesh = new Ft(this.groundShadowGeometry, this.groundShadowMaterial), this.groundShadowMesh.position.z = -0.012, this.groundShadowMesh.receiveShadow = !0, this.groundShadowMesh.renderOrder = 5, this.scene.add(this.groundShadowMesh), this.scene.add(this.residueMesh), this.scene.add(this.stickerMesh);
    const n = this.renderer.domElement;
    n.addEventListener("pointerdown", this.onPointerDown), n.addEventListener("pointermove", this.onPointerMove), n.addEventListener("pointerup", this.onPointerUp), n.addEventListener("pointercancel", this.onPointerUp), n.addEventListener("lostpointercapture", this.onLostPointerCapture), n.addEventListener("pointerleave", this.onPointerLeave), n.addEventListener("keydown", this.onKeyDown), n.addEventListener("webglcontextlost", this.onContextLost), window.addEventListener("pointerup", this.onWindowPointerEnd, !0), window.addEventListener("pointercancel", this.onWindowPointerEnd, !0), window.addEventListener("blur", this.onWindowBlur), document.addEventListener("visibilitychange", this.onVisibilityChange), typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(e)) : window.addEventListener("resize", this.resize), this.resize(), this.applyOptionsToRenderer();
  }
  async setSource(e) {
    if (this.destroyed) return;
    this.cancelPreparedEntrance(), this.requestedSource = e, this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null);
    const t = ++this.sourceRevision;
    try {
      const i = await Us(e, this.options.outline);
      if (this.destroyed || t !== this.sourceRevision) return;
      this.source = e, this.options.source = e, this.applyArtwork(i);
    } catch (i) {
      const n = i instanceof Error ? i.message : "The sticker source failed to render.";
      throw this.emit("error", { message: n }), i;
    }
  }
  async prepareSource(e, t = {}) {
    if (this.destroyed) throw new Error("The sticker renderer has been destroyed.");
    const i = await Us(e, En(this.options, t).outline);
    if (this.destroyed) throw new Error("The sticker renderer has been destroyed.");
    const n = this.createArtworkTexture(i);
    this.renderer.initTexture(n);
    let r = !0;
    const A = () => {
      this.sourceRevision += 1, this.requestedSource = e, this.source = e, this.options = En(this.options, {
        ...t,
        source: e
      }), this.applyOptionsToRenderer(), this.applyArtwork(i, n);
    };
    return {
      commit: () => {
        !r || this.destroyed || (r = !1, A());
      },
      commitWithEntrance: () => {
        !r || this.destroyed || (r = !1, this.cancelPreparedEntrance(), this.entranceActive = !1, this.clearEntrancePose(), this.preparedEntrance = {
          artwork: i,
          texture: n,
          source: e,
          options: t,
          elapsed: 0
        }, this.uniforms.uPreparedMap.value = n, this.uniforms.uPreparedMix.value = 0, this.uniforms.uPreEntranceProgress.value = 0, this.requestRender());
      },
      dispose: () => {
        r && (r = !1, n.dispose());
      }
    };
  }
  setOptions(e) {
    if (this.destroyed) return;
    const t = this.options.outline, i = this.options.quality;
    this.options = En(this.options, e), this.applyOptionsToRenderer(), e.source && this.setSource(e.source).catch(() => {
    }), e.outline && (this.options.outline.width !== t.width || this.options.outline.color !== t.color) && !e.source && (this.sourceRebuildTimer !== null && window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = window.setTimeout(() => {
      this.sourceRebuildTimer = null, this.setSource(this.requestedSource).catch(() => {
      });
    }, 70)), this.options.quality !== i && this.artwork && this.updateMeshGeometry(this.artwork.aspect), this.requestRender();
  }
  reset() {
    const e = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, e !== null && this.renderer.domElement.hasPointerCapture(e) && this.renderer.domElement.releasePointerCapture(e), this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = 0, this.dragDetached = !1, this.detachedTension = 0, this.detachedExitActive = !1, this.detachedExitElapsed = 0, this.detachedExitSpin = 0, this.entranceActive = !1, this.entranceElapsed = 0, this.interactionHintActive = !1, this.interactionHintElapsed = 0, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = $t.degToRad(this.options.tilt), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uInteractionHint.value = 0, this.peelAudio.reset(0), this.setCreaseDepth(0), this.state.pointer = null, this.state.grabPoint = null, this.renderer.domElement.style.cursor = "default", this.updatePeelUniforms(), this.emit("peelchange", {
      amount: 0,
      progress: 0
    }), this.requestRender();
  }
  setPeelProgress(e, t = {
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
    this.springActive = !1, this.springVelocity = 0, this.detachedExitActive = !1, this.entranceActive = !1, this.interactionHintActive = !1, this.state.dragging = !1, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = $t.degToRad(this.options.tilt), this.uniforms.uEntranceSweep.value = -1, this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uInteractionHint.value = 0;
    const i = Ge(t.origin.x, 0, 1) - 0.5, n = 0.5 - Ge(t.origin.y, 0, 1), r = t.target.x - 0.5, A = 0.5 - t.target.y;
    this.grabOrigin.set(i * this.meshWidth, n * this.meshHeight);
    const s = (r - i) * this.meshWidth, a = (A - n) * this.meshHeight, l = Math.hypot(s, a);
    this.grabDirection.set(s, a), this.grabDirection.lengthSq() < 1e-4 && this.grabDirection.set(1, 0), this.grabDirection.normalize(), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection);
    const o = this.peelModelForDepth(this.grabExtent).projection, c = Math.max(l, o), u = Ge(e, 0, 1) * c;
    this.setCreaseDepth(this.solveCreaseDepth(u));
    const h = Math.max(0, u - o);
    this.setDetachedDragOffset(this.activeDirection.x * h, this.activeDirection.y * h), this.state.grabPoint = {
      x: this.grabOrigin.x,
      y: this.grabOrigin.y
    }, this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * u,
      y: this.grabOrigin.y + this.activeDirection.y * u
    }, this.updatePeelUniforms(), this.renderer.render(this.scene, this.camera);
  }
  setEntranceProgress(e) {
    this.destroyed || !this.artwork || (this.springActive = !1, this.springVelocity = 0, this.detachedExitActive = !1, this.entranceActive = !1, this.interactionHintActive = !1, this.state.dragging = !1, this.detachedTension = 0, this.stickerMesh.position.set(0, 0, 0), this.stickerMesh.scale.set(1, 1, 1), this.stickerMesh.rotation.z = $t.degToRad(this.options.tilt), this.uniforms.uInteractionHint.value = 0, this.setCreaseDepth(0), this.state.grabPoint = null, this.state.pointer = null, this.configureEntranceAxis(), this.applyEntranceElapsed(Ge(e, 0, 1) * Os) && this.clearEntrancePose(), this.updatePeelUniforms(), this.renderer.render(this.scene, this.camera));
  }
  setBackgroundRemovalEffect(e) {
    this.destroyed || (this.backgroundRemovalEffectActive = e, this.backgroundRemovalEffectElapsed = 0, this.configureEntranceAxis(), this.uniforms.uBackgroundRemovalDistortion.value = e ? 1 : 0, this.entranceActive || (this.uniforms.uEntranceSweep.value = e ? 0 : -1), this.requestRender());
  }
  reappear() {
    this.destroyed || this.startEntranceAnimation();
  }
  setRenderScale(e) {
    if (this.destroyed) return;
    const t = Ge(e, 1, 2.6);
    Math.abs(t - this.renderScale) < 1e-3 || (this.renderScale = t, this.resize());
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
    this.destroyed = !0, cancelAnimationFrame(this.frameRequest), this.cancelPreparedEntrance(), this.sourceRebuildTimer !== null && (window.clearTimeout(this.sourceRebuildTimer), this.sourceRebuildTimer = null), this.resizeObserver?.disconnect(), window.removeEventListener("resize", this.resize);
    const e = this.renderer.domElement;
    e.removeEventListener("pointerdown", this.onPointerDown), e.removeEventListener("pointermove", this.onPointerMove), e.removeEventListener("pointerup", this.onPointerUp), e.removeEventListener("pointercancel", this.onPointerUp), e.removeEventListener("lostpointercapture", this.onLostPointerCapture), e.removeEventListener("pointerleave", this.onPointerLeave), e.removeEventListener("keydown", this.onKeyDown), e.removeEventListener("webglcontextlost", this.onContextLost), window.removeEventListener("pointerup", this.onWindowPointerEnd, !0), window.removeEventListener("pointercancel", this.onWindowPointerEnd, !0), window.removeEventListener("blur", this.onWindowBlur), document.removeEventListener("visibilitychange", this.onVisibilityChange), this.texture?.dispose(), this.geometry.dispose(), this.groundShadowGeometry.dispose(), this.stickerMaterial.dispose(), this.residueMaterial.dispose(), this.peelShadowDepthMaterial.dispose(), this.groundShadowMaterial.dispose(), this.peelAudio.destroy(), this.renderer.dispose(), this.renderer.forceContextLoss(), e.remove();
  }
  createArtworkTexture(e) {
    const t = new Cl(e.canvas);
    return t.colorSpace = Bt, t.minFilter = pr, t.magFilter = St, t.generateMipmaps = !0, t.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy()), t.needsUpdate = !0, t;
  }
  cancelPreparedEntrance() {
    const e = this.preparedEntrance;
    this.preparedEntrance = null, e && e.texture.dispose(), this.uniforms.uPreparedMix.value = 0, this.uniforms.uPreEntranceProgress.value = 0, this.uniforms.uPreparedMap.value = this.texture;
  }
  applyArtwork(e, t = this.createArtworkTexture(e)) {
    this.artwork = e;
    const i = this.texture;
    this.texture = t, this.uniforms.uMap.value = t, this.uniforms.uPreparedMap.value = t, this.uniforms.uPreparedMix.value = 0, this.uniforms.uPreEntranceProgress.value = 0, this.uniforms.uTexel.value.set(1 / e.width, 1 / e.height), this.updateMeshGeometry(e.aspect), this.reset(), this.state.ready = !0, i?.dispose(), this.emit("ready", {
      width: e.width,
      height: e.height,
      hasTransparency: e.hasTransparency
    });
  }
  updateMeshGeometry(e) {
    const t = this.viewHeight / Math.max(1, this.viewportHeightPx), i = Math.min(this.viewWidth * 0.78, sf * t), n = Math.min(this.viewHeight * 0.58, af * t);
    let r = i, A = r / e;
    A > n && (A = n, r = A * e), this.meshWidth = Math.max(0.34, r), this.meshHeight = Math.max(0.25, A);
    const s = this.options.quality === "high" ? 240 : this.options.quality === "medium" ? 160 : 96, a = Ge(Math.round(s), 64, 256), l = Ge(Math.round(s / Math.max(e, 0.35)), 56, 192), o = new xn(this.meshWidth, this.meshHeight, a, l), c = this.geometry;
    this.geometry = o, this.stickerMesh.geometry = o, this.residueMesh.geometry = o, c.dispose(), this.uniforms.uMeshSize.value.set(this.meshWidth, this.meshHeight), this.grabOrigin.set(-this.meshWidth / 2, 0), this.grabDirection.set(1, 0), this.activeDirection.copy(this.grabDirection), this.grabExtent = this.meshWidth, this.setCreaseDepth(0), this.applyOptionsToRenderer(), this.updatePeelUniforms();
  }
  applyOptionsToRenderer() {
    const e = $t.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = e, this.residueMesh.rotation.z = e, this.uniforms.uBackColor.value = Si(this.options.back.color, "#f7f5f2"), this.uniforms.uGloss.value = Ge(this.options.back.gloss, 0, 1), this.uniforms.uRoughness.value = Ge(this.options.back.roughness, 0, 1), this.uniforms.uWind.value = Math.max(0, this.options.wind);
    const t = this.options.sound.src.trim();
    this.peelAudio.configure({
      enabled: this.options.sound.enabled,
      src: t || Ru,
      volume: this.options.sound.volume,
      useBuiltInProfile: !t
    });
    const i = this.options.peel.maxAngle, n = i > Math.PI * 2 ? $t.degToRad(i) : i;
    this.uniforms.uMaxAngle.value = Ge(n, Ns, tf);
    const r = this.options.peel.radius, A = this.container.getBoundingClientRect(), s = r <= 1 ? Math.max(8e-3, Math.min(this.meshWidth, this.meshHeight) * r) : Math.max(8e-3, r / Math.max(A.height, 1) * this.viewHeight);
    this.basePeelRadius = s * $t.lerp(0.82, 1.16, Ge(this.options.peel.stiffness, 0, 1)), this.setCreaseDepth(this.creaseDepth), this.uniforms.uShadowColor.value = Si(this.options.shadow.color, "#191823"), this.uniforms.uShadowOpacity.value = Ge(this.options.shadow.opacity, 0, 0.9), this.groundShadowMaterial.color.copy(Si(this.options.shadow.color, "#191823")), this.groundShadowMaterial.opacity = Ge(this.options.shadow.opacity, 0, 0.9);
    const a = this.meshWidth / Math.max(this.viewWidth, 1e-3) * Math.max(this.renderer.domElement.clientWidth, 1), l = this.artwork ? this.artwork.width / Math.max(a, 1) : 1;
    this.uniforms.uInteractionHintRadius.value = this.artwork ? Ge(this.options.peel.grabWidth * l, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13) : 3, this.uniforms.uShadowBlur.value = Math.max(0, this.options.shadow.blur) * l * 0.34, this.uniforms.uShadowDistance.value = Math.max(0, this.options.shadow.distance) / Math.max(A.width || 1, 1) * this.viewWidth;
    const o = $t.degToRad(this.options.shadow.angle), c = this.uniforms.uShadowDirection.value;
    c.set(Math.cos(o), -Math.sin(o)).normalize();
    const u = 1.6 + this.uniforms.uShadowDistance.value * 34;
    this.peelShadowLight.position.set(-c.x * u, -c.y * u, 4.8), this.peelShadowTarget.position.set(0, 0, 0), this.peelShadowLight.shadow.radius = Ge(this.options.shadow.blur * 0.18, 1, 7);
    const h = this.options.quality === "high" ? 2048 : 1024;
    this.peelShadowLight.shadow.mapSize.set(h, h), this.peelShadowLight.shadow.needsUpdate = !0;
  }
  updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress, this.uniforms.uPeelDepth.value = this.creaseDepth, this.uniforms.uDetachedTension.value = this.detachedTension, this.uniforms.uRadius.value = this.effectivePeelRadius, this.uniforms.uOrigin.value.copy(this.grabOrigin), this.uniforms.uPeelDir.value.copy(this.activeDirection);
    const e = Math.round(Ge(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(e)), this.renderer.domElement.setAttribute("aria-valuetext", `${e}% peeled`);
  }
  projectedGrabDistance(e, t, i = this.uniforms.uMaxAngle.value) {
    if (e <= 0) return 0;
    const n = Math.max(t, 1e-3), r = Math.min(e / n, i), A = n * i;
    let s = -n * Math.sin(r);
    return e > A && (s -= (e - A) * Math.cos(i)), Math.max(0, e + s);
  }
  peelModelForDepth(e) {
    const t = Ge(e, 0, Math.max(this.grabExtent, 1e-3));
    if (t <= 1e-6) return {
      depth: 0,
      radius: this.basePeelRadius,
      projection: 0
    };
    const i = this.projectedGrabDistance(t, this.basePeelRadius);
    if (i >= t / nf) return {
      depth: t,
      radius: this.basePeelRadius,
      projection: i
    };
    const n = t / Ns;
    return {
      depth: t,
      radius: n,
      projection: this.projectedGrabDistance(t, n)
    };
  }
  setCreaseDepth(e) {
    const t = this.peelModelForDepth(e);
    this.creaseDepth = t.depth, this.effectivePeelRadius = t.radius, this.grabProjection = t.projection, this.state.progress = Ge(this.creaseDepth / Math.max(this.grabExtent, 1e-3), 0, 1);
  }
  solveCreaseDepth(e) {
    const t = Math.max(0, e), i = this.peelModelForDepth(this.grabExtent);
    if (t >= i.projection) return i.depth;
    if (t <= 1e-6) return 0;
    let n = 0, r = this.grabExtent;
    for (let A = 0; A < 16; A += 1) {
      const s = (n + r) * 0.5;
      this.peelModelForDepth(s).projection < t ? n = s : r = s;
    }
    return (n + r) * 0.5;
  }
  setDetachedDragOffset(e, t) {
    const i = $t.degToRad(this.options.tilt), n = Math.cos(i), r = Math.sin(i), A = Ge(Math.hypot(e, t) / Math.max(this.grabExtent * 0.45, 0.12), 0, 1);
    this.detachedTension = A * A * (3 - 2 * A);
    const s = this.grabProjection - this.grabExtent * 2, a = e + this.activeDirection.x * s * this.detachedTension, l = t + this.activeDirection.y * s * this.detachedTension;
    this.stickerMesh.position.set(a * n - l * r, a * r + l * n, 0);
  }
  screenToLocal(e, t) {
    const i = this.renderer.domElement.getBoundingClientRect(), n = (e - i.left) / Math.max(i.width, 1) * 2 - 1, r = 1 - (t - i.top) / Math.max(i.height, 1) * 2, A = n * (this.viewWidth / 2), s = r * (this.viewHeight / 2), a = -$t.degToRad(this.options.tilt), l = Math.cos(a), o = Math.sin(a);
    return new Re(A * l - s * o, A * o + s * l);
  }
  sampleAlpha(e, t) {
    if (!this.artwork) return 0;
    const i = Ge(Math.round(e), 0, this.artwork.width - 1), n = Ge(Math.round(t), 0, this.artwork.height - 1);
    return this.artwork.alpha[n * this.artwork.width + i] / 255;
  }
  sampleExterior(e, t) {
    if (!this.artwork) return !1;
    const i = Math.round(e), n = Math.round(t);
    return i < 0 || i >= this.artwork.width || n < 0 || n >= this.artwork.height ? !0 : this.artwork.exteriorAlpha[n * this.artwork.width + i] === 1;
  }
  hitEdge(e) {
    if (!this.artwork) return null;
    const t = e.x / this.meshWidth + 0.5, i = e.y / this.meshHeight + 0.5;
    if (t < -0.04 || t > 1.04 || i < -0.04 || i > 1.04) return null;
    const n = t * (this.artwork.width - 1), r = (1 - i) * (this.artwork.height - 1), A = this.meshWidth / Math.max(this.viewWidth, 1e-3) * this.renderer.domElement.clientWidth, s = this.artwork.width / Math.max(A, 1), a = Ge(this.options.peel.grabWidth * s, 3, Math.min(this.artwork.width, this.artwork.height) * 0.13), l = Math.ceil(a), o = Math.max(0, Math.floor(n - l)), c = Math.min(this.artwork.width - 1, Math.ceil(n + l)), u = Math.max(0, Math.floor(r - l)), h = Math.min(this.artwork.height - 1, Math.ceil(r + l));
    let p = -1, w = -1, M = a * a + 1;
    for (let x = u; x <= h; x += 1) for (let P = o; P <= c; P += 1) {
      const D = P - n, S = x - r, B = D * D + S * S;
      B >= M || B > a * a || this.sampleAlpha(P, x) < 0.1 || (this.sampleExterior(P - 1, x) || this.sampleExterior(P + 1, x) || this.sampleExterior(P, x - 1) || this.sampleExterior(P, x + 1)) && (p = P, w = x, M = B);
    }
    if (p < 0 || w < 0) return null;
    const d = new Re((p / Math.max(this.artwork.width - 1, 1) - 0.5) * this.meshWidth, (0.5 - w / Math.max(this.artwork.height - 1, 1)) * this.meshHeight), f = Ge(a * 0.14, 1.5, 4.5), C = new Re(this.sampleAlpha(p + f, w) - this.sampleAlpha(p - f, w), -(this.sampleAlpha(p, w + f) - this.sampleAlpha(p, w - f)));
    return C.lengthSq() < 8e-3 && C.set(-d.x, -d.y), C.lengthSq() < 1e-4 && C.set(1, 0), C.normalize(), {
      local: d,
      inward: C
    };
  }
  projectionExtent(e, t) {
    if (!this.artwork) return Math.max(this.meshHeight * 0.35, this.meshWidth);
    let i = this.meshHeight * 0.35;
    for (let n = 0; n < this.artwork.support.length; n += 2) {
      const r = (this.artwork.support[n] - 0.5) * this.meshWidth, A = (0.5 - this.artwork.support[n + 1]) * this.meshHeight;
      i = Math.max(i, (r - e.x) * t.x + (A - e.y) * t.y);
    }
    return Math.max(this.meshHeight * 0.35, i + this.meshHeight * 0.025);
  }
  finishPointerDrag(e) {
    if (!this.state.dragging) return;
    const t = this.pointerId;
    this.pointerId = null, this.state.dragging = !1, t !== null && this.renderer.domElement.hasPointerCapture(t) && this.renderer.domElement.releasePointerCapture(t), this.renderer.domElement.style.cursor = "grab";
    const i = this.options.peel.release, n = this.springActive ? Math.min(this.state.progress, Ge(this.springTargetDepth / Math.max(this.grabExtent, 1e-3), 0, 1)) : this.state.progress, r = i === "snap" && n >= Af;
    r && (this.setCreaseDepth(this.grabExtent), this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
      y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection
    }, this.updatePeelUniforms(), this.peelAudio.update(this.state.progress, e, this.activeDirection.x)), this.peelAudio.end(this.state.progress);
    const A = i === "reset" || i === "snap" && !r, s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (A || (this.springActive = !1, this.springVelocity = 0, this.springTargetDepth = this.creaseDepth), A && !s && (this.springActive = !0, this.springVelocity = 0, this.springTargetDepth = 0), this.emit("peelend", {
      amount: this.state.progress,
      progress: this.state.progress,
      willReset: A
    }), r) {
      if (s) {
        this.reset();
        return;
      }
      this.detachedExitActive = !0, this.detachedExitElapsed = 0, this.detachedExitSpin = this.activeDirection.x >= 0 ? -0.42 : 0.42;
    }
    if (A && s) {
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
  applyEntranceElapsed(e) {
    const t = Ge(e / Os, 0, 1);
    this.uniforms.uEntranceScaleProgress.value = t;
    const i = Ge((e - Vs) / of, 0, 1);
    return this.uniforms.uEntranceSweep.value = e < Vs ? -1 : i, t >= 1 && i >= 1;
  }
  clearEntrancePose() {
    this.uniforms.uEntranceScaleProgress.value = -1, this.uniforms.uEntranceSweep.value = -1;
  }
  startEntranceAnimation() {
    this.reset(), this.peelAudio.playReappear(), this.entranceActive = !0, this.entranceElapsed = 0, this.configureEntranceAxis(), this.applyLaserEffectSettings(), this.applyEntranceElapsed(0), this.requestRender();
  }
  applyLaserEffectSettings() {
    const e = Is();
    this.uniforms.uLaserCoreWidth.value = e.coreWidth, this.uniforms.uLaserBandWidth.value = e.bandWidth, this.uniforms.uLaserBandOpacity.value = e.bandOpacity, this.uniforms.uLaserBrightness.value = e.brightness, this.uniforms.uLaserHighlightIntensity.value = e.highlightIntensity, this.uniforms.uRemovalDistortionRange.value = e.distortionRange, this.uniforms.uRemovalDistortionStrength.value = e.distortionStrength, this.uniforms.uRemovalRippleDensity.value = e.rippleDensity, this.uniforms.uRemovalRippleSpeed.value = e.rippleSpeed;
  }
  emit(e, t) {
    this.container.dispatchEvent(new CustomEvent(e, { detail: t }));
  }
};
async function ff(e, t = {}) {
  if (typeof document > "u") throw new Error("Sticker Forge can only be created in a browser.");
  const i = typeof e == "string" ? document.querySelector(e) : e;
  if (!i) throw new Error("Sticker Forge could not find its target element.");
  const n = new uf(i, t);
  return await n.setSource(t.source ?? Ti), n;
}
var df = typeof HTMLElement > "u" ? class {
} : HTMLElement, Hs = class extends df {
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
        "cyclecomplete",
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
      ...Ti,
      text: this.getAttribute("text") || Ti.text
    }), this.ensureInstance().catch(() => {
    });
  }
  disconnectedCallback() {
    this.destroy();
  }
  attributeChangedCallback(e, t, i) {
    if (e === "text" && t !== i) {
      const n = {
        ...Ti,
        text: i || " "
      };
      this.pendingSource = n, this.isConnected && this.setSource(n).catch(() => {
      });
    }
  }
  async setSource(e) {
    this.pendingSource = e, await (await this.ensureInstance()).setSource(e);
  }
  async prepareSource(e, t) {
    return (await this.ensureInstance()).prepareSource(e, t);
  }
  setOptions(e) {
    this.pendingOptions = zs(this.pendingOptions, e), this.instance?.setOptions(e);
  }
  reset() {
    this.instance?.reset();
  }
  setPeelProgress(e, t) {
    this.instance?.setPeelProgress(e, t);
  }
  setEntranceProgress(e) {
    this.instance?.setEntranceProgress(e);
  }
  setBackgroundRemovalEffect(e) {
    this.instance?.setBackgroundRemovalEffect(e);
  }
  reappear() {
    this.instance?.reappear();
  }
  setRenderScale(e) {
    this.instance?.setRenderScale(e);
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
    const e = zs(this.pendingOptions, { source: this.pendingSource ?? Ti }), t = this.lifecycleRevision, i = ff(this.mountElement, e);
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
function pf(e = "sticker-forge") {
  if (!(typeof customElements > "u") && !customElements.get(e)) {
    const t = e === "sticker-forge" ? Hs : class extends Hs {
    };
    customElements.define(e, t);
  }
}
pf();
export {
  vf as STICKER_ENTRANCE_DURATION_MS,
  Hs as StickerForgeElement,
  ff as createSticker,
  pf as defineStickerForge,
  gf as imageSourceHasTransparency,
  Gu as sanitizeSvgMarkup
};

//# sourceMappingURL=sticker-forge.es.js.map