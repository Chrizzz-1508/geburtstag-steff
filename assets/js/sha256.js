/* Minimal SHA-256 (pure JS, laeuft auch ueber file:// ohne crypto.subtle).
   Dient nur der Verschleierung der Passwoerter im Quelltext. */
(function () {
  'use strict';

  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function rr(x, n) { return (x >>> n) | (x << (32 - n)); }

  function utf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') return Array.prototype.slice.call(new TextEncoder().encode(str));
    var out = [], i, c;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  function sha256(str) {
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var b = utf8Bytes(str);
    var bitLen = b.length * 8;
    b.push(0x80);
    while (b.length % 64 !== 56) b.push(0);
    b.push(0, 0, 0, 0, (bitLen >>> 24) & 255, (bitLen >>> 16) & 255, (bitLen >>> 8) & 255, bitLen & 255);

    var w = new Array(64), i, t, a, c, d, e, f, g, h, s0, s1, S0, S1, ch, maj, t1, t2;
    for (i = 0; i < b.length; i += 64) {
      for (t = 0; t < 16; t++) {
        w[t] = ((b[i + 4 * t] << 24) | (b[i + 4 * t + 1] << 16) | (b[i + 4 * t + 2] << 8) | b[i + 4 * t + 3]) >>> 0;
      }
      for (t = 16; t < 64; t++) {
        s0 = rr(w[t - 15], 7) ^ rr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
        s1 = rr(w[t - 2], 17) ^ rr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
        w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
      }
      a = H[0]; var bb = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];
      for (t = 0; t < 64; t++) {
        S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25);
        ch = (e & f) ^ (~e & g);
        t1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
        S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22);
        maj = (a & bb) ^ (a & c) ^ (bb & c);
        t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = bb; bb = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + bb) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.map(function (x) { return ('0000000' + x.toString(16)).slice(-8); }).join('');
  }

  /* Eingabe tolerant machen: Gross/Klein, Leerzeichen, Umlaute, Artikel, Satzzeichen */
  function normalize(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/^(die|der|das)\s+/, '')
      .replace(/\s+/g, '');
  }

  var api = { sha256: sha256, normalize: normalize, check: function (input) { return sha256(normalize(input)); } };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.Crypt = api;
})();
