var R = Object.defineProperty;
var S = (h, e, t) => e in h ? R(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var a = (h, e, t) => (S(h, typeof e != "symbol" ? e + "" : e, t), t);
class U {
  constructor(e) {
    // audiocontext
    a(this, "context");
    a(this, "input");
    a(this, "output");
    a(this, "shiftDownBuffer");
    a(this, "shiftUpBuffer");
    a(this, "mod1");
    a(this, "mod2");
    a(this, "mod1Gain");
    a(this, "mod2Gain");
    a(this, "mod3Gain");
    a(this, "mod4Gain");
    a(this, "modGain1");
    a(this, "modGain2");
    a(this, "fade1");
    a(this, "fade2");
    a(this, "mix1");
    a(this, "mix2");
    a(this, "delay1");
    a(this, "delay2");
    this.context = e;
    const t = e.createGain(), m = e.createGain();
    this.input = t, this.output = m;
    const f = e.createBufferSource(), s = e.createBufferSource(), c = e.createBufferSource(), r = e.createBufferSource();
    this.shiftDownBuffer = this.createDelayTimeBuffer(e, 0.1, 0.05, !1), this.shiftUpBuffer = this.createDelayTimeBuffer(e, 0.1, 0.05, !0), f.buffer = this.shiftDownBuffer, s.buffer = this.shiftDownBuffer, c.buffer = this.shiftUpBuffer, r.buffer = this.shiftUpBuffer, f.loop = !0, s.loop = !0, c.loop = !0, r.loop = !0;
    const u = e.createGain(), o = e.createGain(), i = e.createGain();
    i.gain.value = 0;
    const l = e.createGain();
    l.gain.value = 0, f.connect(u), s.connect(o), c.connect(i), r.connect(l);
    const n = e.createGain(), d = e.createGain(), T = e.createDelay(), y = e.createDelay();
    u.connect(n), o.connect(d), i.connect(n), l.connect(d), n.connect(T.delayTime), d.connect(y.delayTime);
    const G = e.createBufferSource(), p = e.createBufferSource(), v = this.createFadeBuffer(e, 0.1, 0.05);
    G.buffer = v, p.buffer = v, G.loop = !0, p.loop = !0;
    const g = e.createGain(), B = e.createGain();
    g.gain.value = 0, B.gain.value = 0, G.connect(g.gain), p.connect(B.gain), t.connect(T), t.connect(y), T.connect(g), y.connect(B), g.connect(m), B.connect(m);
    const b = e.currentTime + 0.05, D = b + 0.1 - 0.05;
    f.start(b), s.start(D), c.start(b), r.start(D), G.start(b), p.start(D), this.mod1 = f, this.mod2 = s, this.mod1Gain = u, this.mod2Gain = o, this.mod3Gain = i, this.mod4Gain = l, this.modGain1 = n, this.modGain2 = d, this.fade1 = G, this.fade2 = p, this.mix1 = g, this.mix2 = B, this.delay1 = T, this.delay2 = y, this.setDelay(0.1);
  }
  createFadeBuffer(e, t, m) {
    const f = t * e.sampleRate, s = (t - 2 * m) * e.sampleRate, c = f + s, r = e.createBuffer(1, c, e.sampleRate), u = r.getChannelData(0), o = m * e.sampleRate, i = o, l = f - o;
    for (let n = 0; n < f; ++n) {
      let d;
      n < i ? d = Math.sqrt(n / o) : n >= l ? d = Math.sqrt(1 - (n - l) / o) : d = 1, u[n] = d;
    }
    for (let n = f; n < c; ++n)
      u[n] = 0;
    return r;
  }
  createDelayTimeBuffer(e, t, m, f) {
    const s = t * e.sampleRate, c = (t - 2 * m) * e.sampleRate, r = s + c, u = e.createBuffer(1, r, e.sampleRate), o = u.getChannelData(0);
    for (let i = 0; i < s; ++i)
      f ? o[i] = (s - i) / r : o[i] = i / s;
    for (let i = s; i < r; ++i)
      o[i] = 0;
    return u;
  }
  setPitchOffset(e) {
    e > 0 ? (this.mod1Gain.gain.value = 0, this.mod2Gain.gain.value = 0, this.mod3Gain.gain.value = 1, this.mod4Gain.gain.value = 1) : (this.mod1Gain.gain.value = 1, this.mod2Gain.gain.value = 1, this.mod3Gain.gain.value = 0, this.mod4Gain.gain.value = 0), this.setDelay(0.1 * Math.abs(e));
  }
  setDelay(e) {
    this.modGain1.gain.setTargetAtTime(0.5 * e, 0, 0.01), this.modGain2.gain.setTargetAtTime(0.5 * e, 0, 0.01);
  }
  setVolume(e) {
    this.output.gain.value = e;
  }
  disconnect() {
    var e, t;
    (e = this.input) == null || e.disconnect(), (t = this.output) == null || t.disconnect();
  }
}
export {
  U as default
};
