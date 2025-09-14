import React from 'react';
import Link from 'next/link';

import Main from '../layouts/Main';
import TextType from '../components/Contact/TextType';
import ContactIcons from '../components/Contact/ContactIcons';

const Contact = () => (
  <Main
    title="Contact"
    description="Contact Byron Selvage via email @ BSelvage20@gmail.com"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link href="/contact">Contact</Link>
          </h2>
        </div>
      </header>
      <div className="email-at">
        <p>Feel free to get in touch. You can email me at: </p>
        <p><a href="mailto:BSelvage20@gmail.com" target="_blank" rel="noopener noreferrer">BSelvage20@gmail.com</a></p>
        <TextType />
      </div>
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
