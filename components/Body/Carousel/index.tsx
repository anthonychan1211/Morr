import { DocumentObject } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledCarousel = styled.div`
  position: relative;
  width: 80%;
  height: max(280px, 33vw);
  margin: 0 auto;
  overflow: hidden;
  .container {
    width: 85%;
    min-height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .slide {
    position: absolute;
    height: 100%;
    width: 100%;
    display: grid;
    object-fit: cover;
    align-content: center;
    justify-content: center;
    border: 1px solid #928f83;
    transition: all 0.7s;
    transform: translate(-300%, -100%);
    opacity: 0;
  }
  .slide.current + .slide.next {
    display: block;
    transform: translate(100%, 0%);
  }

  .slide.prev {
    opacity: 1;
    z-index: 9;
    transform: translate(-100%, 0%);
  }
  .slide.prev-prev {
    opacity: 1;
    z-index: 9;
    transform: translate(-200%, -100%);
  }
  .slide.current {
    opacity: 1;
    z-index: 10;
    transform: translateX(0);
  }
  .slide.next {
    opacity: 1;
    z-index: 10;
    transform: translateX(100%);
    transition: all 0.7s;
  }
  .slide.next-next {
    opacity: 1;
    z-index: -1;
    transform: translate(200%, -100%);
    transition: all 0.7s;
  }
  .go-prev {
    background: transparent;
    position: absolute;
    height: 100%;
    top: 50%;
    left: 1%;
    transform: translate(-1%, -50%);
    font-size: 50px;
    color: #82828287;
    z-index: 99;
    cursor: pointer;
    transition: all 0.25s;
    :hover {
      color: #4a4a4a;
      transition: all 0.25s;
      font-size: 60px;
    }
  }
  .go-next {
    background: transparent;
    position: absolute;
    height: 100%;
    top: 50%;
    right: 1%;
    transform: translate(-1%, -50%);
    font-size: 50px;
    color: #82828287;
    z-index: 99;
    cursor: pointer;
    transition: all 0.25s;
    :hover {
      color: #4a4a4a;
      font-size: 60px;
      transition: all 0.25s;
    }
  }
`;
const Carousel = ({ data }: { data: DocumentObject }) => {
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState(data.length - 1);
  const [prevPrev, setPrevPrev] = useState(data.length - 2);
  const [next, setNext] = useState(1);
  const [nextNext, setNextNext] = useState(2);
  function handleSwitch(direction: string) {
    if (direction == "prev") {
      setCurr((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      setPrev((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      setNext((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      setNextNext((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      setPrevPrev((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    } else if (direction == "next") {
      setCurr((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setPrev((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setPrevPrev((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setNext((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setNextNext((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      handleSwitch("next");
    }, 5000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledCarousel>
      <button className="go-prev" onClick={() => handleSwitch("prev")}>
        &#8249;
      </button>
      <button className="go-next" onClick={() => handleSwitch("next")}>
        &#8250;
      </button>
      {data.map((el, i) => {
        const randomPic = Math.floor(
          Math.random() * (el["gallery"].length - 1)
        );

        return (
          <div
            className={`container ${
              i == curr
                ? "current"
                : i == prev
                ? "prev"
                : i == next
                ? "next"
                : i == prevPrev
                ? "prev-prev"
                : i == nextNext
                ? "next-next"
                : ""
            }`}
            key={i}
          >
            <Image
              className={`slide ${
                i == curr
                  ? "current"
                  : i == prev
                  ? "prev"
                  : i == next
                  ? "next"
                  : i == prevPrev
                  ? "prev-prev"
                  : i == nextNext
                  ? "next-next"
                  : ""
              }`}
              src={el["gallery"][randomPic] as string}
              alt={`photo_${i}`}
              fill
              loading={
                i == curr || i == prev || i == prevPrev || i == nextNext
                  ? "eager"
                  : undefined
              }
            />
          </div>
        );
      })}
    </StyledCarousel>
  );
};

export default Carousel;
