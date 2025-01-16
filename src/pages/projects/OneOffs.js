/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';
import ImageCompression from '../../components/Projects/ImageCompression';

const sections = {
  image_compression: 'Image Compression',
  strange_attractors: 'Strange Attractors',
};

const OneOffs = () => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax?.typesetPromise(); // Trigger MathJax to process the math
    }
  });

  return (
    <Main
      title="One Offs"
      description="Random small projects"
    >
      <article className="post" id="one-offs">
        <header>
          <div className="title">
            <h2>
              <Link to="/projects/random">One-Offs</Link>
            </h2>
            <p>
              My random projects that are too small to have their own page.
            </p>
            <div className="link-container">
              {Object.keys(sections).map((sec) => (
                <h4 key={sec}>
                  <a href={`#${sec.toLowerCase().replace(/ /g, '-')}`}>{sections[sec]}</a>
                </h4>
              ))}
            </div>
          </div>
        </header>

        <section id="image_compression">
          <h2>Image Compression</h2>
          <div dangerouslySetInnerHTML={{
            __html: `
            <p>
            Singular Value Decomposition is a decomposition method that allows a matrix to be decomposed into three matrices:
            $$A = U \\Sigma V^T$$
            Where: 
            </p>
            <ul>
              <li>$U$: An orthogonal matrix of left singular vectors.</li>
              <li>$\\Sigma$: A diagonal matrix of non-negative singular values arranged in decreasing order.</li>
              <li>$V^T$: An orthogonal matrix of right singular vectors.</li>
            </ul>
            <p>
            This decomposition allows $A$ to be expressed as a weighted combination of rank-1 matrices with the
            singular values in $\\Sigma$ representing the importance of each corresponding component in approximating the original matrix.
            Truncating the singular values and their associated singular vectors creates a lower rank approximation of the original matrix.
            This approximation reduces data size at the cost of fine detail.
            </p>
            <p>
            This method can be used for image compression by creating a low rank approximation of the original image. Try it for yourself!
            The image below has original rank 512. Use the slider to adjust the rank and see how the image quality and storage requirement perform.
            </p>
            `,
          }}
          />
          <ImageCompression />
        </section>

        <section id="strange_attractors">
          <h2>Strange Attractors</h2>
          <p>
            DJSKL
          </p>
        </section>
      </article>
    </Main>
  );
};

export default OneOffs;
