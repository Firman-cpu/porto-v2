"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const aboutSceneRef = useRef<HTMLDivElement>(null);
  const horizontalSceneRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const aboutScene = aboutSceneRef.current;
    const horizontalScene = horizontalSceneRef.current;
    const track = horizontalTrackRef.current;

    const about = aboutRef.current;
    const skills = skillsRef.current;

    if (
      !aboutScene ||
      !horizontalScene ||
      !track ||
      !about ||
      !skills
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // ==================================================
      // INITIAL
      // ==================================================

      gsap.set(about, {
        yPercent: 100,
      });

      gsap.set(skills, {
        xPercent: 100,
      });

      // ==================================================
      // 1. ABOUT
      //
      // HERO tetap normal di belakang.
      //
      // About masuk dari bawah.
      // ==================================================

      gsap.to(about, {
        yPercent: 0,

        ease: "none",

        scrollTrigger: {
          trigger: aboutScene,

          start: "top top",

          end: "bottom top",

          scrub: true,

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,
        },
      });

      // ==================================================
      // 2. SKILLS
      //
      // Setelah About selesai,
      // Skills masuk dari kanan.
      // ==================================================

      gsap.to(skills, {
        xPercent: 0,

        ease: "none",

        scrollTrigger: {
          trigger: horizontalScene,

          start: "top top",

          end: () =>
            `+=${window.innerHeight}`,

          scrub: true,

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,
        },
      });

      // ==================================================
      // 3. HORIZONTAL
      //
      // Skills → Tools
      // ==================================================

      const getDistance = () => {
        return (
          track.scrollWidth -
          window.innerWidth
        );
      };

      gsap.to(track, {
        x: () => -getDistance(),

        ease: "none",

        scrollTrigger: {
          trigger: horizontalScene,

          start: () =>
            `top+=${window.innerHeight} top`,

          end: () =>
            `+=${getDistance()}`,

          scrub: true,

          invalidateOnRefresh: true,
        },
      });

      // ==================================================
      // REFRESH
      // ==================================================

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      className="
        w-full
        overflow-x-hidden
        bg-neutral-950
      "
    >

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        id="hero"
        className="
          relative
          z-0
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-orange-500
        "
      >

        <div className="text-center">

          <p
            className="
              mb-6
              text-sm
              font-bold
              uppercase
              tracking-[0.5em]
              text-orange-100
            "
          >
            PORTFOLIO
          </p>

          <h1
            className="
              text-7xl
              font-black
              text-white
              md:text-9xl
            "
          >
            HERO
          </h1>

          <p
            className="
              mt-6
              text-lg
              text-orange-100
            "
          >
            Creative Developer
          </p>

          <p
            className="
              mt-10
              text-sm
              uppercase
              tracking-[0.4em]
              text-orange-100
            "
          >
            Scroll ↓
          </p>

        </div>

      </section>


      {/* ==================================================
          ABOUT SCENE
      ================================================== */}

      <section
        ref={aboutSceneRef}
        className="
          relative
          h-[200vh]
          w-full
        "
      >

        {/* ==================================================
            ABOUT
        ================================================== */}

        <section
          ref={aboutRef}
          id="about"
          className="
            absolute
            left-0
            top-0
            z-10
            flex
            h-screen
            w-full
            items-center
            justify-center
            bg-white
          "
        >

          <div className="text-center">

            <p
              className="
                mb-6
                text-sm
                font-bold
                uppercase
                tracking-[0.5em]
                text-orange-500
              "
            >
              01 — ABOUT
            </p>

            <h2
              className="
                text-7xl
                font-black
                text-neutral-900
                md:text-9xl
              "
            >
              ABOUT
            </h2>

            <p
              className="
                mt-6
                text-lg
                text-neutral-500
              "
            >
              About berhenti di sini.
            </p>

          </div>

        </section>

      </section>


      {/* ==================================================
          HORIZONTAL SCENE
      ================================================== */}

      <section
        ref={horizontalSceneRef}
        className="
          relative
          h-[200vh]
          w-full
          overflow-hidden
        "
      >

        {/* ==================================================
            HORIZONTAL TRACK
        ================================================== */}

        <div
          ref={horizontalTrackRef}
          className="
            sticky
            top-0
            flex
            h-screen
            w-max
          "
        >

          {/* ==================================================
              SKILLS
          ================================================== */}

          <section
            ref={skillsRef}
            id="skills"
            className="
              flex
              h-screen
              w-screen
              shrink-0
              items-center
              justify-center
              bg-blue-500
            "
          >

            <div className="text-center">

              <p
                className="
                  mb-6
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.5em]
                  text-blue-100
                "
              >
                02 — SKILLS
              </p>

              <h2
                className="
                  text-7xl
                  font-black
                  text-white
                  md:text-9xl
                "
              >
                SKILLS
              </h2>

              <p
                className="
                  mt-6
                  text-lg
                  text-blue-100
                "
              >
                Masuk dari kanan →
              </p>

            </div>

          </section>


          {/* ==================================================
              TOOLS
          ================================================== */}

          <section
            id="tools"
            className="
              flex
              h-screen
              w-screen
              shrink-0
              items-center
              justify-center
              bg-purple-500
            "
          >

            <div className="text-center">

              <p
                className="
                  mb-6
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.5em]
                  text-purple-100
                "
              >
                03 — TOOLS
              </p>

              <h2
                className="
                  text-7xl
                  font-black
                  text-white
                  md:text-9xl
                "
              >
                TOOLS
              </h2>

              <p
                className="
                  mt-6
                  text-lg
                  text-purple-100
                "
              >
                Horizontal selesai ↓
              </p>

            </div>

          </section>

        </div>

      </section>


      {/* ==================================================
          PROJECTS
      ================================================== */}

      <section
        id="projects"
        className="
          flex
          h-screen
          w-full
          items-center
          justify-center
          bg-green-500
        "
      >

        <div className="text-center">

          <p
            className="
              mb-6
              text-sm
              font-bold
              uppercase
              tracking-[0.5em]
              text-green-100
            "
          >
            04 — PROJECTS
          </p>

          <h2
            className="
              text-7xl
              font-black
              text-white
              md:text-9xl
            "
          >
            PROJECTS
          </h2>

        </div>

      </section>


      {/* ==================================================
          CONTACT
      ================================================== */}

      <section
        id="contact"
        className="
          flex
          h-screen
          w-full
          items-center
          justify-center
          bg-red-500
        "
      >

        <div className="text-center">

          <p
            className="
              mb-6
              text-sm
              font-bold
              uppercase
              tracking-[0.5em]
              text-red-100
            "
          >
            05 — CONTACT
          </p>

          <h2
            className="
              text-7xl
              font-black
              text-white
              md:text-9xl
            "
          >
            CONTACT
          </h2>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer
        id="footer"
        className="
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          bg-neutral-950
          text-white
        "
      >

        <div className="text-center">

          <p
            className="
              mb-6
              text-sm
              font-bold
              uppercase
              tracking-[0.5em]
              text-neutral-500
            "
          >
            06 — FOOTER
          </p>

          <h2
            className="
              text-7xl
              font-black
              md:text-9xl
            "
          >
            FOOTER
          </h2>

        </div>

      </footer>

    </main>
  );
}