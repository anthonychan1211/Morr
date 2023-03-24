import Head from "next/head";
import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// use `prisma` in your application to read and write data in your DB

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const StyledHome = styled.div`
  .video {
    height: 500px;
    width: 100%;
    background-color: aqua;
    margin: 0;
  }
  p,
  h2 {
    color: lightgrey;
    line-height: 30px;
  }
  .about-us-container {
    display: flex;
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out,
      visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
  }
  .about-us-container.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
  .about-us-title {
    margin: 70px 0px 70px 0px;
  }
  .text-section {
    padding: 0 150px;
    padding-bottom: 70px;
  }
  .pic-section {
    min-width: 50%;
    height: auto;
    background: url("/IMG_0932.jpg");
    background-position: left;
    background-size: cover;
  }
  .category-container {
    display: flex;
    height: 350px;
    width: 100%;
    align-items: center;
    border: 2px solid white;
    text-align: center;
    .cell {
      color: lightgrey;
      flex-grow: 1;
      font-size: 22px;
      height: 100%;
      position: relative;
      .cell-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;
export default function Home() {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    domRef.current && observer.observe(domRef.current);
  }, []);
  return (
    <StyledHome className={montserrat.className}>
      <div className="video"></div>
      <div
        ref={domRef}
        className={`about-us-container ${isVisible ? "is-visible" : ""}`}
      >
        <div className="text-section">
          <h2 className="about-us-title">About Us</h2>
          <p>
            Morr is a women&apos;s accessories brand that celebrates global
            diversity and craftsmanship. Our mission is to bring the best
            designs of earrings, necklaces, and bracelets from all around the
            world to our customers. We believe that accessories are a powerful
            form of self-expression, and that each piece has a unique story to
            tell.
          </p>
          <br />
          <p>
            Our brand is for women who appreciate quality and uniqueness, who
            want to make a statement with their accessories, and who value the
            stories behind the pieces they wear. We are constantly exploring new
            places and cultures to bring fresh and exciting designs to our
            customers, and we hope that our accessories inspire them to express
            their own individuality and creativity.
          </p>
        </div>
        <div className="pic-section"></div>
      </div>
      <div className="category-container">
        <Link href={"/products/earrings"} className="cell earrings">
          <p className="cell-text">Earrings</p>
        </Link>
        <Link href={"/products/earrings"} className="cell bracelets">
          <p className="cell-text">Bracelets</p>
        </Link>
        <Link href={"/products/earrings"} className="cell necklaces">
          <p className="cell-text">Necklaces</p>
        </Link>
      </div>
    </StyledHome>
  );
}
