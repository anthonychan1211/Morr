import Image from "next/image";
import { Montserrat } from "next/font/google";
import styled from "styled-components";
import Link from "next/link";
import earringPhoto from "../public/IMG_1010.jpg";
import braceletPhoto from "../public/IMG_1016.jpg";
import necklacePhoto from "../public/IMG_1015.jpg";
import { useEffect, useRef, useState } from "react";
// use `prisma` in your application to read and write data in your DB

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const StyledHome = styled.div`
  .video {
    height: 600px;
    width: 100%;
    margin: 0;
    object-fit: cover;
    padding: 0;
  }
  p,
  h2 {
    color: lightgrey;
    line-height: 30px;
  }
  .banner {
    width: 100%;
    background-color: #8e8c7d;
    color: #e4e4e4;
    font-size: var(--mega-text);
    text-align: center;
    padding: 20px;
    margin: 0;
    overflow: hidden;
    height: auto;
  }
  .banner.close {
    height: 0;
  }
  .about-us-container {
    display: flex;
    opacity: 0;
    overflow: hidden;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out,
      visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
    @media screen and (max-width: 1000px) {
      flex-direction: column-reverse;
    }
  }
  .about-us-container.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
  .about-us-title {
    margin: 70px 0px;
    @media screen and (max-width: 1000px) {
      margin: 5vw 0px;
    }
  }
  .text-section {
    padding: 0 8vw;
    padding-bottom: 70px;
    font-size: var(--small-text);
    @media screen and (max-width: 1000px) {
      padding: 0 5vw;
      padding-bottom: 30px;
    }
  }
  .pic-section {
    position: relative;
    min-width: 50%;
    height: auto;
    background-position: left;
    background-size: cover;
    img {
      object-fit: cover;
      object-position: left;
    }
    @media screen and (max-width: 1000px) {
      height: 200px;
    }
  }
  .category-container {
    display: flex;
    height: 350px;
    width: 100%;
    align-items: center;
    text-align: center;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      height: 80vw;
      .cell {
        height: 200px;
        width: 100%;
      }
    }
    .cell {
      color: lightgrey;
      flex: 1;
      font-size: 22px;
      border: 2px solid var(--background-grey);
      height: 100%;
      position: relative;
      overflow: hidden;
      .cell-text {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .category-image {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        transform: scale(150%);
        opacity: 0.5;
        :hover {
          opacity: 1;
          transition: opacity 0.5s;
        }
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
      <video
        className="video"
        src="/productVideo.mp4"
        loop
        muted
        autoPlay
      ></video>

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
        <div className="pic-section">
          <Image src="/IMG_0941.jpg" alt="about_photo" fill />
        </div>
      </div>
      <div className="category-container">
        <Link href={"/products/earrings"} className="cell earrings">
          <Image
            src={earringPhoto}
            alt="earrings"
            className="category-image"
            fill
          ></Image>
          <p className="cell-text">Earrings</p>
        </Link>
        <Link href={"/products/bracelets"} className="cell bracelets">
          <Image
            src={braceletPhoto}
            alt="earrings"
            className="category-image"
            fill
          ></Image>
          <p className="cell-text">Bracelets</p>
        </Link>
        <Link href={"/products/necklaces"} className="cell necklaces">
          <Image
            src={necklacePhoto}
            alt="earrings"
            className="category-image"
            fill
          ></Image>
          <p className="cell-text">Necklaces</p>
        </Link>
      </div>
    </StyledHome>
  );
}
