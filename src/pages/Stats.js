import React from 'react';
import Link from 'next/link';

import Main from '../layouts/Main';

import Personal from '../components/Stats/Personal';
import Site from '../components/Stats/Site';

const Stats = () => (
  <Main
    title="Stats"
    description="Some statistics about Byron Selvage and ByronSelvage.github.io"
  >
    <article className="post" id="stats">
      <header>
        <div className="title">
          <h2>
            <Link href="/stats">Stats</Link>
          </h2>
        </div>
      </header>
      <Personal />
      <Site />
    </article>
  </Main>
);

export default Stats;
