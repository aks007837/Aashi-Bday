import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart,
  Sparkles,
  Music2,
  Volume2,
  Gift,
  ArrowRight,
  Stars,
} from "lucide-react";
import "./style.css";

const TARGET = new Date("2026-10-03T00:00:00+05:30").getTime();
const wishes = [
  {
    title: "A little reminder",
    text: "You make ordinary days brighter just by being in them. Never forget how loved you are.",
  },
  {
    title: "A wish for your dreams",
    text: "May you find the courage to chase every dream, the patience for every detour, and joy in all the little wins.",
  },
  {
    title: "A promise from your sibling",
    text: "No matter how grown-up life gets, you will always have someone in your corner. That someone is me.",
  },
];
function App() {
  const [now, setNow] = useState(Date.now());
  const [step, setStep] = useState(0);
  const [music, setMusic] = useState(false);
  const [opened, setOpened] = useState(false);
  const audio = useRef(null);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, TARGET - now),
    ready = left === 0;
  const time = [
    Math.floor(left / 86400000),
    Math.floor((left % 86400000) / 3600000),
    Math.floor((left % 3600000) / 60000),
    Math.floor((left % 60000) / 1000),
  ];
  function toggleMusic() {
    if (music) {
      audio.current?.stop();
      audio.current = null;
      setMusic(false);
      return;
    }
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = new C(),
      master = ctx.createGain();
    master.gain.value = 0.025;
    master.connect(ctx.destination);
    let stopped = false,
      i = 0;
    const notes = [
      392, 440, 523.25, 440, 349.23, 392, 493.88, 440, 329.63, 392, 440, 523.25,
    ];
    const play = () => {
      if (stopped) return;
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = notes[i++ % notes.length];
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.7);
      o.connect(g);
      g.connect(master);
      o.start();
      o.stop(ctx.currentTime + 1.8);
      audio.current = {
        stop: () => {
          stopped = true;
          master.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
          setTimeout(() => ctx.close(), 500);
        },
      };
      setTimeout(play, 850);
    };
    play();
    setMusic(true);
  }
  const next = () => setStep((s) => Math.min(s + 1, 5));
  return (
    <main className="app">
      <div className="ambient">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <header>
        <div className="logo">
          <span>✿</span> A little birthday surprise for Aashi❤️
        </div>
        <button className="sound" onClick={toggleMusic}>
          {music ? <Volume2 size={15} /> : <Music2 size={15} />}
          <span>{music ? "Music on" : "Soft melody"}</span>
        </button>
      </header>
      {!ready ? (
        <section className="countdown screen">
          <div className="mini-flower">✿</div>
          <p className="kicker">A tiny surprise is on its way</p>
          <h1>
            Something lovely
            <br />
            <em>is almost here.</em>
          </h1>
          <p className="intro">For my dearest Aashi ❤️, with all our love.</p>
          <div className="clock">
            {time.map((n, i) => (
              <div className="clock-unit" key={i}>
                <b>{String(n).padStart(2, "0")}</b>
                <small>{["days", "hours", "minutes", "seconds"][i]}</small>
              </div>
            ))}
          </div>
          <p className="tiny">The surprise opens at midnight, India time.</p>
        </section>
      ) : (
        <section className="experience screen" key={step}>
          {step === 0 && (
            <div className="scene">
              <div className="eyebrow">
                <Sparkles size={14} /> a little birthday magic
              </div>
              <div className="gift-wrap" aria-hidden="true">
                <div className="gift-bow">♡</div>
                <div className="gift-box">
                  <span>✦</span>
                </div>
              </div>
              <p className="kicker">Hey, Aashi…</p>
              <h1>
                Someone has a<br />
                <em>surprise for you.</em>
              </h1>
              <p className="intro">A small page for a very special sister.</p>
              <button className="cta" onClick={next}>
                Open your surprise <ArrowRight size={16} />
              </button>
            </div>
          )}
          {step === 1 && (
            <div className="scene">
              <div className="cake" aria-hidden="true">
                <div className="candles">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="cake-top" />
                <div className="cake-mid" />
                <div className="cake-base" />
                <div className="plate" />
              </div>
              <p className="kicker">Make a wish, birthday girl</p>
              <h1>
                Happy Birthday,
                <br />
                <em>Aashi! ❤️</em>
              </h1>
              <p className="intro">
                May today be full of laughter, little surprises, and all the
                things that make you smile.
              </p>
              <button className="cta" onClick={next}>
                There’s more <ArrowRight size={16} />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="scene">
              <div
                className={`envelope-art ${opened ? "is-open" : ""}`}
                onClick={() => setOpened(!opened)}
                role="button"
                tabIndex={0}
                aria-label="Open the birthday letter"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpened(!opened);
                  }
                }}
              >
                <div className="letter-paper">
                  <span>For my favourite sister</span>
                  <Heart size={23} fill="currentColor" />
                </div>
                <div className="env-body" />
                <div className="env-flap" />
                <div className="seal">♡</div>
              </div>
              <p className="kicker">A note from my heart</p>
              <h1>
                {opened ? "A little note, just for you" : "Tap the envelope"}
              </h1>
              {opened ? (
                <div className="note">
                  <p>Dear Aashi,</p>
                  <p>
                    Life gave us a sister, but somewhere along the way, it also
                    gave us a friend, a favourite person to annoy, and someone
                    we will always root for. We may not say it every day, but we
                    are endlessly grateful to have you in our lives.
                  </p>
                  <p>
                    I hope this year brings you beautiful opportunities,
                    peaceful days, loud laughter, and the confidence to know how
                    wonderful you are. Whatever comes next, remember that you’ll
                    never have to face it alone. We are always here.
                  </p>
                  <b>Love you a lot. Happy birthday, Aashi. ❤️</b>
                </div>
              ) : (
                <p className="intro">
                  There are a few things I wanted to tell you.
                </p>
              )}
              <button className="cta" onClick={next}>
                {opened ? "Keep going" : "Skip to the note"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="scene memories">
              <div className="eyebrow">
                <Sparkles size={14} /> a little gallery of you
              </div>
              <h1>A little gallery of you</h1>
              <p className="intro">
                Seven little glimpses of the person who makes our world
                brighter. Keep being your wonderful self, Aashi. ❤️
              </p>
              <div className="photo-grid">
                {[
                  "Our beautiful Aashi ❤️",
                  "Always our shining star ✨",
                  "A smile that lights up everything",
                  "Simply gorgeous 🌸",
                  "Our favourite person 💗",
                  "Keep blooming, Aashi 🌷",
                  "Forever loved, always cherished ❤️",
                ].map((caption, i) => (
                  <figure className={`photo-card photo-${i + 1}`} key={i}>
                    <img
                      src={`/photos/${i + 1}.jpeg`}
                      alt={`Ashika's portrait ${i + 1}`}
                      loading="lazy"
                    />
                    <figcaption>{caption}</figcaption>
                  </figure>
                ))}
              </div>
              <button className="cta" onClick={next}>
                A few wishes for you <ArrowRight size={16} />
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="scene wishes">
              <div className="eyebrow">
                <Stars size={14} /> little wishes for your year
              </div>
              <h1>May life bring you…</h1>
              <div className="wish-list">
                {wishes.map((w, i) => (
                  <article className="wish-card" key={w.title}>
                    <span className="wish-num">0{i + 1}</span>
                    <div>
                      <h3>{w.title}</h3>
                      <p>{w.text}</p>
                    </div>
                    <span className="wish-star">✧</span>
                  </article>
                ))}
              </div>
              <button className="cta" onClick={next}>
                One last thing <ArrowRight size={16} />
              </button>
            </div>
          )}
          {step === 5 && (
            <div className="scene finale">
              <div className="final-heart">♥</div>
              <p className="kicker">Always your sibling, always your fan</p>
              <h1>
                Keep shining,
                <br />
                <em>Our Beloved Aashi ❤️</em>
              </h1>
              <p className="intro">
                No matter how much we grow up, you’ll always have a special
                place in our hearts. We are so lucky you’re our sister. ❤️
              </p>
              <div className="signature">Made with love, just for you ✿</div>
              <button
                className="restart"
                onClick={() => {
                  setStep(0);
                  setOpened(false);
                }}
              >
                Replay your surprise ↻
              </button>
            </div>
          )}
        </section>
      )}
      <div className="page-dots" aria-label="Surprise progress">
        {ready &&
          [0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={step === n ? "active" : ""}
              onClick={() => setStep(n)}
              aria-label={`Go to scene ${n + 1}`}
            />
          ))}
      </div>
      <footer>
        made with a whole lot of sibling love{" "}
        <Heart size={12} fill="currentColor" />
      </footer>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
