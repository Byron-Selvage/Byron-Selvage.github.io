import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import dynamic from 'next/dynamic';

const Analytics = dynamic(() => import('../components/Template/Analytics'), { ssr: false });
const ScrollToTop = dynamic(() => import('../components/Template/ScrollToTop'), { ssr: false });
const Navigation = dynamic(() => import('../components/Template/Navigation'), { ssr: false });
const SideBar = dynamic(() => import('../components/Template/SideBar'), { ssr: false });


const Main = (props) => (
  <HelmetProvider>
    <Analytics />
    <ScrollToTop />
    <Helmet
      titleTemplate="%s | Byron Selvage"
      defaultTitle="Byron Selvage"
      defer={false}
    >
      {props.title && <title>{props.title}</title>}
      <meta name="description" content={props.description} />
    </Helmet>
    <div id="wrapper">
      <Navigation />
      <div id="main">{props.children}</div>
      {props.fullPage ? null : <SideBar />}
    </div>
  </HelmetProvider>
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
