import { postUser } from "../services/services.service";
import anime from "animejs/lib/anime.es.js";

export const handleUserLogin = async (decoded: any) => {
  const payload: any = {};
  payload["email"] = decoded.email;
  payload["isEmailVerified"] = decoded.email_verified;
  const data = await postUser(payload);
  if (Boolean(data) && data.isEmailVerified && Boolean(data.token.length)) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    return true;
  }
  return false;
};

export const generateReponse = async (prompt: string) => {
  // console.log(import.meta.env.VITE_REACT_APP_OPENAI_API_KEYs);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEYs}`,
    },
    body: JSON.stringify({ prompt }),
  };

  const response = await fetch(
    "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
    requestOptions
  );
  const data = await response.json();
  const generatedResponse = data?.choices[0]?.text;
  return generatedResponse;
};



// function fitElementToParent(el: any, padding: any) {
//   let timeout:any = null;
//   function resize() {
//     if (timeout) clearTimeout(timeout);
//     anime.set(el, { scale: 1 });
//     const pad = padding || 0;
//     const parentEl = el.parentNode;
//     const elOffsetWidth = el.offsetWidth - pad;
//     const parentOffsetWidth = parentEl.offsetWidth;
//     const ratio = parentOffsetWidth / elOffsetWidth;
//     timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
//   }
//   resize();
//   window.addEventListener("resize", resize);
// }

function fitElementToParent(el: any, padding: number = 0) {
  let timeout: ReturnType<typeof setTimeout> | null = null; // Use specific return type

  function resize() {
    if (timeout) {
      clearTimeout(timeout);
    }

    const parentEl = el.parentNode as HTMLElement; // Ensure parent is HTMLElement

    if (!parentEl) {
      // Handle case where parent is not found
      console.error("Parent element not found for", el);
      return;
    }

    const pad = padding || 0;
    const elOffsetWidth = el.offsetWidth - pad;
    const parentOffsetWidth = parentEl.offsetWidth;

    // if (elOffsetWidth > parentOffsetWidth) {
      // Calculate scale to fit based on width
      const ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
    // } else {
    //   // Reset scale if wider than parent
    //   anime.set(el, { scale: 1 });
    // }
  }

  resize();
  window.addEventListener("resize", resize);
}


export const advancedStaggeringAnimation = function () {
  const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
  console.log(staggerVisualizerEl);
  const dotsWrapperEl = staggerVisualizerEl && staggerVisualizerEl.querySelector(".dots-wrapper");
  const dotsFragment = document.createDocumentFragment();
  const grid = [20, 10];
  const cell = 55;
  const numberOfElements = grid[0] * grid[1];
  let animation:any;
  let paused = true;
  console.log(dotsFragment,grid,cell,numberOfElements,paused);

  fitElementToParent(staggerVisualizerEl, 0);

  for (let i = 0; i < numberOfElements; i++) {
    const dotEl = document.createElement("div");
    dotEl.classList.add("dot");
    dotsFragment.appendChild(dotEl);
  }

  dotsWrapperEl && dotsWrapperEl.appendChild(dotsFragment);

  let index = anime.random(0, numberOfElements - 1);
  let nextIndex = 0;

  anime.set(".stagger-visualizer .cursor", {
    translateX: anime.stagger(-cell, { grid: grid, from: index, axis: "x" }),
    translateY: anime.stagger(-cell, { grid: grid, from: index, axis: "y" }),
    translateZ: 0,
    scale: 1.5,
  });

  function play() {
    paused = false;
    if (animation) animation.pause();

    nextIndex = anime.random(0, numberOfElements - 1);

    animation = anime
      .timeline({
        easing: "easeInOutQuad",
        complete: play,
      })
      .add({
        targets: ".stagger-visualizer .cursor",
        keyframes: [
          { scale: 0.75, duration: 120 },
          { scale: 2.5, duration: 220 },
          { scale: 1.5, duration: 450 },
        ],
        duration: 300,
      })
      .add(
        {
          targets: ".stagger-visualizer .dot",
          keyframes: [
            {
              translateX: anime.stagger("-2px", {
                grid: grid,
                from: index,
                axis: "x",
              }),
              translateY: anime.stagger("-2px", {
                grid: grid,
                from: index,
                axis: "y",
              }),
              duration: 100,
            },
            {
              translateX: anime.stagger("4px", {
                grid: grid,
                from: index,
                axis: "x",
              }),
              translateY: anime.stagger("4px", {
                grid: grid,
                from: index,
                axis: "y",
              }),
              scale: anime.stagger([2.6, 1], { grid: grid, from: index }),
              duration: 225,
            },
            {
              translateX: 0,
              translateY: 0,
              scale: 1,
              duration: 1200,
            },
          ],
          delay: anime.stagger(80, { grid: grid, from: index }),
        },
        30
      )
      .add(
        {
          targets: ".stagger-visualizer .cursor",
          translateX: {
            value: anime.stagger(-cell, {
              grid: grid,
              from: nextIndex,
              axis: "x",
            }),
          },
          translateY: {
            value: anime.stagger(-cell, {
              grid: grid,
              from: nextIndex,
              axis: "y",
            }),
          },
          scale: 1.5,
          easing: "cubicBezier(.075, .2, .165, 1)",
        },
        "-=800"
      );

    index = nextIndex;
  }

  play();
};

export const bgImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDW5odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMS44OCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFN0b2NrIFBsYXRmb3JtPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcE1NPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vJz4KICA8eG1wTU06RG9jdW1lbnRJRD54bXAuaWlkOjBjZDMzNjM2LTI2MjItNDc4ZC05MWM1LThmNTcwZDcxNWM5YjwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD5hZG9iZTpkb2NpZDpzdG9jazowOWI4NWIzZC0wNGZkLTQxZGEtOTdjYy1hNWM1NTNmNjQ1YTU8L3htcE1NOkluc3RhbmNlSUQ+CiAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpzdG9jazo2MTQzODEwMjM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAF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";