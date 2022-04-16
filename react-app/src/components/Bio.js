import React from "react";
import "./styles/bio.css";

export default function Bio() {
  return (
    <div id="div__bio_container">
      <div id="div__profilepic">
        <img src={"https://mshippoboe.s3.us-west-1.amazonaws.com/matt_rosie_profilepic.png"} id="img__profilepic" alt="Matt's profile" />
      </div>
      <article id="article__bio">
        <h2>Oboe & English Horn</h2>
        <p>
          Matthew Shipp is among the top freelance oboists in the country. He
          regularly performs in venues across the country and abroad, most frequently
          in Seattle, Philadelphia, New York, and Iowa. Mr. Shipp has performed with The
          Philadelphia Orchestra, Pennsylvania Ballet Orchestra, Chamber
          Orchestra of Philadelphia, Princeton Symphony, Brooklyn Chamber
          Orchestra, and Symphony in C. As a guest musician, Mr. Shipp has
          performed with The Philadelphia Orchestra both domestically and
          internationally in Taiwan, Japan, and South Korea. Recent engagements
          include performances at Carnegie Hall, Suntory Hall, NHK Hall, Seoul
          Arts Center, and the National Performing Arts Center of Taiwan.
        </p>
        <p>
          As a chamber musician, Matthew performed the Beethoven Wind Octet Op.
          103 with members of The Philadelphia Orchestra as a co-presenter at
          the CBDNA 2020 Conference. Additionally, he was a featured soloist in
          Mozart’s aria “Deh vieni, non tardar” with the Temple Chamber Winds at
          the World Association for Symphonic Bands and Ensembles (WASBE)
          International Conference in San Jose.
        </p>
        <p>
          Mr. Shipp is a graduate of Temple University, where he received the
          Master of Music degree and studied with Peter Smith, Associate
          Principal Oboe of The Philadelphia Orchestra. Matthew is a native of
          Iowa, and prior to moving to Philadelphia, he studied with renowned
          pedagogue Andrew Parker at the University of Iowa. He has spent
          summers participating in music festivals such as the Round Top
          Festival Institute and the New York Symphonic Ensemble’s Tour of
          Japan.
        </p>
      </article>
    </div>
  );
}
