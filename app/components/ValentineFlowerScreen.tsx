"use client";

import { useEffect } from "react";
import "../styles/FinalScreen.scss";

export default function ValentineFlowerScreen() {
  useEffect(() => {
    document.body.classList.remove("not-loaded");
  }, []);

  return (
    <section className="valentine-wrapper">
      <div className="section-body">

        <div className="night" />

        <div className="flowers">
          {/* Flower 1 */}
          <div className="flower flower--1">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />

              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__light flower__light--${i + 1}`}
                />
              ))}
            </div>

            <div className="flower__line">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Flower 2 */}
          <div className="flower flower--2">
            <div className="flower__leafs flower__leafs--2">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />

              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__light flower__light--${i + 1}`}
                />
              ))}
            </div>

            <div className="flower__line">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Flower 3 */}
          <div className="flower flower--3">
            <div className="flower__leafs flower__leafs--3">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />

              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__light flower__light--${i + 1}`}
                />
              ))}
            </div>

            <div className="flower__line">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__line__leaf flower__line__leaf--${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Flower long stem */}
          <div className="grow-ans" style={{ ["--d" as any]: "1.2s" }}>
            <div className="flower__g-long">
              <div className="flower__g-long__top" />
              <div className="flower__g-long__bottom" />
            </div>
          </div>

          {/* Growing grass 1 */}
          <div className="growing-grass">
            <div className="flower__grass flower__grass--1">
              <div className="flower__grass--top" />
              <div className="flower__grass--bottom" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
                />
              ))}
              <div className="flower__grass__overlay" />
            </div>
          </div>

          {/* Growing grass 2 */}
          <div className="growing-grass">
            <div className="flower__grass flower__grass--2">
              <div className="flower__grass--top" />
              <div className="flower__grass--bottom" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
                />
              ))}
              <div className="flower__grass__overlay" />
            </div>
          </div>

          {/* Flower right side */}
          <div className="grow-ans" style={{ ["--d" as any]: "2.4s" }}>
            <div className="flower__g-right flower__g-right--1">
              <div className="leaf" />
            </div>
          </div>
          <div className="grow-ans" style={{ ["--d" as any]: "2.8s" }}>
            <div className="flower__g-right flower__g-right--2">
              <div className="leaf" />
            </div>
          </div>

          {/* Flower front */}
          <div className="grow-ans" style={{ ["--d" as any]: "2.8s" }}>
            <div className="flower__g-front">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}
                >
                  <div className="flower__g-front__leaf" />
                </div>
              ))}
              <div className="flower__g-front__line" />
            </div>
          </div>

          {/* Flower front small */}
          <div className="grow-ans" style={{ ["--d" as any]: "3.2s" }}>
            <div className="flower__g-fr">
              <div className="leaf" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Long-g sections */}
          {[
            [3.5, 2.2, 3.4, 3.6],
            [3.6, 3.8, 4, 4.2],
            [4, 4.2, 4.4, 4.6],
            [4, 4.2, 3, 3.6],
            [4, 4.2, 3, 3.6],
            [4, 4.2, 3, 3.6],
            [4.2, 4.4, 4.6, 4.8],
            [3, 3.2, 3.5, 3.6],
          ].map((delays, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`long-g long-g--${sectionIndex}`}
            >
              {delays.map((d, leafIndex) => (
                <div
                  key={leafIndex}
                  className="grow-ans"
                  style={{ ["--d" as any]: `${d}s` }}
                >
                  <div className={`leaf leaf--${leafIndex}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
