import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StyledLightLocation, StyledLocation } from "./styles";

const Location = () => {
  const router = useRouter();
  const routeElement = router.pathname.split("/");
  routeElement.splice(0, 1, "Morr");
  for (let i = 0; i < routeElement.length; i++) {
    if (routeElement[i].length === 0) {
      routeElement.splice(i, 1);
    } else if (routeElement[i] === "[id]") {
      routeElement[i] = "Product Detail";
    } else {
      routeElement[i] =
        routeElement[i].charAt(0).toUpperCase() + routeElement[i].slice(1);
    }
  }

  if (routeElement.includes("Products")) {
    return (
      <StyledLocation>
        <div className="route">
          {routeElement.map((el, i) => {
            return (
              <>
                {el === "Morr" ? (
                  <Link className="link" href={"/"}>
                    {el}
                  </Link>
                ) : i == routeElement.length - 1 ? (
                  <p>{el}</p>
                ) : (
                  <Link className="link" href={`/${el.toLowerCase()}`}>
                    {el}
                  </Link>
                )}
                {i !== routeElement.length - 1 && <p className="slash">/</p>}
              </>
            );
          })}
        </div>
      </StyledLocation>
    );
  } else if (routeElement.length === 1) {
    return <></>;
  } else {
    return (
      <StyledLightLocation>
        <div className="route">
          {routeElement.map((el, i) => {
            return (
              <>
                {el === "Morr" ? (
                  <Link className="link" href={"/"}>
                    {el}
                  </Link>
                ) : i == routeElement.length - 1 ? (
                  <p>{el}</p>
                ) : (
                  <Link className="link" href={`/${el.toLowerCase()}`}>
                    {el}
                  </Link>
                )}
                {i !== routeElement.length - 1 && <p className="slash">/</p>}
              </>
            );
          })}
        </div>
      </StyledLightLocation>
    );
  }
};

export default Location;
