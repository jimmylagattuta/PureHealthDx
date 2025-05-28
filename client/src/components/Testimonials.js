import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  { name: "Jason M., Age 45", quote: "The results from TRT have been incredible, but what really stood out was the care I received. The team is responsive, professional, and genuinely cares about your progress." },
  { name: "Robert D., Age 52", quote: "Before TRT, I felt constantly tired and unmotivated. Now, I’m back to enjoying workouts, my mood is better, and I finally feel balanced. Highly recommend their program!" },
  { name: "Mark S., Age 38", quote: "Not only has TRT helped me regain energy and confidence, but the service I’ve received has been top-notch. They check in regularly and make it easy to stay on track." },
  { name: "Anthony R., Age 60", quote: "The staff is amazing — knowledgeable, kind, and always quick to respond. I never felt rushed or like just another patient. They truly care about your health and results." },
  { name: "Eric T., Age 42", quote: "TRT gave me the energy and drive I hadn’t felt since my 20s. The team at Pure Health & Wellness made it easy to get started and continue with treatment." },
  { name: "David L., Age 50", quote: "I didn’t realize how low my energy had gotten until I started TRT. Within a few weeks, I was sleeping better, had more stamina, and just felt more like myself again." },
  { name: "Chris B., Age 47", quote: "The team at Pure Health & Wellness made the whole process easy. From labs to treatment, everything was explained clearly. I feel more focused and alive than I have in years." },
  { name: "Mike H., Age 36", quote: "I started TRT to improve my performance in the gym, but I’ve noticed benefits across the board — better mood, better sleep, and more motivation in general." },
  { name: "John W., Age 58", quote: "At my age, I figured low energy was just part of getting older. TRT changed that. I feel sharp again — physically and mentally. Great support from the clinic too." },
  { name: "Steve G., Age 43", quote: "The convenience of telehealth and home delivery made starting TRT simple. I didn’t expect to feel this much better this quickly. Huge improvement in my quality of life." },
  { name: "Brian N., Age 39", quote: "After months of fatigue and brain fog, TRT helped me get my edge back. I’m more productive at work and more present at home. Truly grateful for this program." },
  { name: "Kevin P., Age 41", quote: "I thought I was just burned out. Turns out, my testosterone was low. Pure Health & Wellness got me back on track. I feel like a better version of myself." },
  { name: "Alex K., Age 49", quote: "The difference is night and day. I wake up ready to go, my workouts are stronger, and my mood has totally improved. Wish I started this sooner." },
  { name: "Tom C., Age 55", quote: "I’ve tried other clinics, but Pure Health & Wellness is by far the best. Affordable, professional, and truly effective care. TRT here has made a real difference in my life." },
  { name: "Greg J., Age 44", quote: "It wasn’t just physical changes — I feel more confident, driven, and stable. TRT helped me get back to the man I used to be." },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState([]);
  const [stage, setStage] = useState("visible");

  const perPage = width >= 1024 ? 4 : width >= 600 ? 2 : 1;
  const total = testimonials.length;

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIdx(0);
  }, [perPage]);

  useEffect(() => {
    const nextSet = Array.from({ length: perPage }, (_, i) =>
      testimonials[(idx + i) % total]
    );
    setVisible(nextSet);
  }, [idx, perPage]);

  useEffect(() => {
    const cycle = setInterval(() => {
      transitionToNext();
    }, 7000);
    return () => clearInterval(cycle);
  }, [idx, perPage]);

  const transitionToNext = () => {
    setStage("fade-out");
    setTimeout(() => {
      setIdx((prev) => (prev + perPage) % total);
      setStage("slide-in");
      setTimeout(() => setStage("visible"), 500);
    }, 500);
  };

  const handleManual = (direction) => {
    setStage("fade-out");
    setTimeout(() => {
      setIdx((prev) => (prev + direction + total) % total);
      setStage("slide-in");
      setTimeout(() => setStage("visible"), 500);
    }, 500);
  };

  return (
    <section className="testimonials-section mobile-first">
      <div className="testimonial-header">
        <div className="line" />
        <h4 className="mini-title">TESTIMONIALS</h4>
        <div className="line" />
      </div>

      <h2 className="main-title">
        Hear From Some of Our Satisfied Clients
      </h2>

      <div className="carousel-container">
        <button className="nav prev" onClick={() => handleManual(-perPage)}>
          <FaChevronLeft />
        </button>

        <div className={`cards-wrapper ${stage}`}>
          {visible.map((t, i) => (
            <div
              className={`card ${stage}`}
              key={i}
              style={
                perPage === 1 && stage === "slide-in"
                  ? {
                      animation: `slideInRight 0.6s ease forwards`,
                      animationDelay: `${i * 150}ms`
                    }
                  : {}
              }
            >
              <p className="quote">“{t.quote}”</p>
              <p className="name">— {t.name}</p>
            </div>
          ))}
        </div>

        <button className="nav next" onClick={() => handleManual(perPage)}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
