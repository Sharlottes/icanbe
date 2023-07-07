import "./page.css";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <div className="top-bar">
        <span className="home">Be.vi</span>

        <div className="nav">
          <span>HOME</span>
          <span>OVERVIEW</span>
          <span>DOCUMENTATION</span>
          <span>EXAMPLES</span>
        </div>
      </div>

      <div className="contents">
        <div className="description">
          <h1>I CAN BE ANYTHING</h1>
          <p>
            <span>Be vi-!</span>
            <br />
            We are a service that creates and shares our own real-time custom filters with simple voice commands. <br />
            Now you can be anyone in the world.
          </p>
          <Link href="/convert">
            <button className="start_button">Start</button>
          </Link>
        </div>
        <div className="image">
          <Image width={450} height={360} src={"/images/banner.png"} alt="side banner image" />
        </div>
      </div>
    </div>
  );
}
