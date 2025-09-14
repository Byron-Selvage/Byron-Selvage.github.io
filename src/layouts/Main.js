import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Analytics = dynamic(() => import('../components/Template/Analytics'), { ssr: false });
const ScrollToTop = dynamic(() => import('../components/Template/ScrollToTop'), { ssr: false });
const Navigation = dynamic(() => import('../components/Template/Navigation'), { ssr: false });
const SideBar = dynamic(() => import('../components/Template/SideBar'), { ssr: false });

const Main = (
  {
    children, fullPage, title, description,
  },
) => (
  <>
    <Head>
      <title>{title ? `${title} | Byron Selvage` : 'Byron Selvage'}</title>
      <meta name="description" content={description} />
    </Head>

    <Analytics />
    <ScrollToTop />

    <div id="wrapper">
      <Navigation />
      <div id="main">{children}</div>
      {!fullPage && <SideBar />}
    </div>
  </>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullPage: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  fullPage: false,
  title: null,
  description: "Byron Selvage's personal website.",
};

export default Main;
