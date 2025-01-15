/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';

const sections = {
  about: 'About',
  process: 'Process',
  example: 'Example',
};

const HammingCode = () => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax?.typesetPromise(); // Trigger MathJax to process the math
    }
  });

  return (
    <Main
      title="Hamming Code Implementation"
      description="Interactive demonstration of Hamming code encoding and decoding"
    >
      <article className="post" id="hamming">
        <header>
          <div className="title">
            <h2>
              <Link to="/projects/hamming">Hamming Code</Link>
            </h2>
            <div className="link-container">
              {Object.keys(sections).map((sec) => (
                <h4 key={sec}>
                  <a href={`#${sec.toLowerCase()}`}>{sections[sec]}</a>
                </h4>
              ))}
            </div>
          </div>
        </header>

        <section id="about">
          <h2>About</h2>
          <p>
            Developed by Richard Hamming in the late 1940s, Hamming Code
            was one of the first examples of an algorithm that could detect
            errors and correct them automatically. Hammings paper
            &quot;Error Detecting and Error Correcting Codes&quot; laid the groundwork
            for modern error-correcting codes. Hamming code and other
            error-correction algorithms are widely used in applications
            such as data storage, satellite communications, QR codes, and more.
          </p>
        </section>

        <section id="process">
          <h2>Process</h2>
          <div dangerouslySetInnerHTML={{
            __html: `
            <p>
            Hamming code works by adding parity (check) bits to the data, called the message (M). For k message bits, we need q parity bits where $2^q \\geq k + q + 1$. 
            </p>
            <p>
            The message is encoded by the Generator Matrix (G) which combines a $k \\times k$ identity matrix and a $k \\times q$ Parity Matrix (P). The parity matrix
            contains the binary locations of the message bits. An encoded message with parity bits is called a codeword (C).
            </p>
            <p>
            Error detection and correction uses the Parity Check Matrix (H), which is a combination of the Parity Matrix and a $q \\times q$ identity matrix. If the codeword
            has no errors, then $\\mod_2(C \\cdot H^T) = \\vec{0}$. 
            </p>
            `,
          }}
          />

        </section>

        <section id="example">
          <h2>Example</h2>
          <div dangerouslySetInnerHTML={{
            __html: `
            <p>
              Let's transmit the message "Hi". Represented in UTF-8 encoded binary, "Hi" becomes "0100100001101001". So, our Message Vector ($M$) is,
              $$M = [0,1,0,0,1,0,0,0,0,1,1,0,1,0,0,1]$$So, we have $k=16$ message bits. We know that,
              $$\\begin{align*}2^q &\\geq k + q + 1 \\\\
              17 &\\le 2^q -q \\end{align*}$$
              so,
              $$q = 5$$
              Next, we must create our $\\mathbf{P}$ matrix. This will allow us to create our Generator matrix ($\\mathbf{G}$). $\\mathbf{P}$ is constructed with the binary locations of the data bits. Since $k=16$, our $\\mathbf{P}$ matrix must contain the first 16 data bit locations. So,
$$
\\mathbf{P} = [3,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21] \\\\
$$
$$
\\mathbf{P} = \\begin{bmatrix}
              0 & 0 & 0 & 1 & 1 \\\\
              0 & 0 & 1 & 0 & 1 \\\\
              0 & 0 & 1 & 1 & 0 \\\\
              0 & 1 & 0 & 0 & 1 \\\\
              0 & 1 & 0 & 1 & 0 \\\\
              0 & 1 & 0 & 1 & 1 \\\\
              0 & 1 & 1 & 0 & 0 \\\\
              0 & 1 & 1 & 0 & 1 \\\\
              0 & 1 & 1 & 1 & 0 \\\\
              0 & 1 & 1 & 1 & 1 \\\\
              1 & 0 & 0 & 0 & 1 \\\\
              1 & 0 & 0 & 1 & 0 \\\\
              1 & 0 & 0 & 1 & 1 \\\\
              1 & 0 & 1 & 0 & 0 \\\\
              1 & 0 & 1 & 0 & 1 \\\\
\\end{bmatrix}
$$


Now we can create our Generator matrix ($\\mathbf{G}$). We know that $\\mathbf{G} = [I | \\mathbf{P}]$. Since $\\mathbf{P}$ is a $16\\times5$ matrix, we must use $I_{16}$. So,
$$
\\mathbf{G} = [I_{16} | \\mathbf{P}]$$$$
\\mathbf{G} = \\begin{bmatrix}
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 &\\\\
 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 &\\\\
 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 &\\\\
 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 0 & 0 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 1 &\\\\
\\end{bmatrix}
$$


Next, we must create the Parity check matrix ($\\mathbf{H}$) to allow us to check the validity of $\\mathbf{G}$ and any codewords ($\\mathbf{C}$) we generate. 
$$
\\mathbf{H} = [-\\mathbf{P^T}|I_5] $$$$
\\mathbf{H} = \\begin{bmatrix}
0 &  0 &  0 &  0 &  0 &  0 &  0 &  0 &  0 &  0 &  0 & -1 & -1 & -1 & -1 & -1 &  1 &  0 & 0 &  0 &  0 &\\\\
0 &  0 &  0 &  0 & -1 & -1 & -1 & -1 & -1 & -1 & -1 &  0 &  0 &  0 &  0 &  0 &  0 &  1 & 0 &  0 &  0 &\\\\
0 & -1 & -1 & -1 &  0 &  0 &  0 & -1 & -1 & -1 & -1 &  0 &  0 &  0 & -1 & -1 &  0 &  0 & 1 &  0 &  0 &\\\\
-1 &  0 & -1 & -1 &  0 & -1 & -1 &  0 &  0 & -1 & -1 &  0 & -1 & -1 &  0 &  0 &  0 &  0 & 0 &  1 &  0 &\\\\
-1 & -1 &  0 & -1 & -1 &  0 & -1 &  0 & -1 &  0 & -1 & -1 &  0 & -1 &  0 & -1 &  0 &  0 & 0 &  0 &  1 &\\\\
\\end{bmatrix}
$$


Now that we have both our Generator and Parity check matrices, we can finally create our encoded Codeword ($\\mathbf{C}$) from our original message.
$$
\\mathbf{C} = mod_2(M*\\mathbf{G})$$$$
\\mathbf{C} = mod_2(\\begin{bmatrix} 0&1&\\cdots&0&1\\end{bmatrix} \\begin{bmatrix}
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 &\\\\
 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 &\\\\
 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 &\\\\
 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 0 & 0 & 1 & 1 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 & 0 &\\\\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 1 &\\\\
\\end{bmatrix})$$$$
\\mathbf{C} = mod_2(\\begin{bmatrix} 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 0 & 1 & 2 & 3 & 4 & 3 & 4 \\end{bmatrix})$$$$
\\mathbf{C} = \\begin{bmatrix} 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 \\end{bmatrix}
$$


Note that the first 16 bits of our Codeword are the same as our Message vector. In fact, the Codeword is the Message vector with five parity bits added on the end. For any valid codeword, $mod_2(\\mathbf{C} * \\mathbf{H^T}) = 0$. So, let's test whether this Codeword is valid.
$$
mod_2(\\mathbf{C} * \\mathbf{H^T}) \\stackrel{?}{=} 0$$$$
mod_2(\\begin{bmatrix} 0 & 1 & \\cdots & 1 & 0 \\end{bmatrix} \\begin{bmatrix} 0 &  0 &  0 & -1 & -1 &\\\\
  0 &  0 & -1 &  0 & -1 &\\\\
  0 &  0 & -1 & -1 &  0 &\\\\
  0 &  0 & -1 & -1 & -1 &\\\\
  0 & -1 &  0 &  0 & -1 &\\\\
  0 & -1 &  0 & -1 &  0 &\\\\
  0 & -1 &  0 & -1 & -1 &\\\\
  0 & -1 & -1 &  0 &  0 &\\\\
  0 & -1 & -1 &  0 & -1 &\\\\
  0 & -1 & -1 & -1 &  0 &\\\\
  0 & -1 & -1 & -1 & -1 &\\\\
 -1 &  0 &  0 &  0 & -1 &\\\\
 -1 &  0 &  0 & -1 &  0 &\\\\
 -1 &  0 &  0 & -1 & -1 &\\\\
 -1 &  0 & -1 &  0 &  0 &\\\\
 -1 &  0 & -1 &  0 & -1 &\\\\
  1 &  0 &  0 &  0 &  0 &\\\\
  0 &  1 &  0 &  0 &  0 &\\\\
  0 &  0 &  1 &  0 &  0 &\\\\
  0 &  0 &  0 &  1 &  0 &\\\\
  0 &  0 &  0 &  0 &  1 &\\\\
  \\end{bmatrix} \\stackrel{?}{=} 0$$$$
  mod_2(\\begin{bmatrix} -2& -2& -4& -2& -4 \\end{bmatrix}) \\stackrel{?}{=} 0$$$$
  \\begin{bmatrix} 0& 0& 0& 0& 0 \\end{bmatrix} = 0
$$


So, since $mod_2(\\mathbf{C} * \\mathbf{H^T}) = 0$, our Codeword is valid. Now that we have properly encoded our message, it is ready for transmission or, in the case of the article we read, storage. It is during this transmission or storage period when an error may be introduced. We can simulate this by simply flipping a bit. For this example, I will flip the last bit from a $0$ to a $1$. So, our now inaccurate Codeword is,
$$\\mathbf{C} = \\begin{bmatrix} 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 1 \\end{bmatrix}$$


We can run this Codeword through the same $mod_2(\\mathbf{C} * \\mathbf{H^T}) = 0$ to demonstrate the error and help us isolate it. 
$$\\begin{align*}
mod_2(\\mathbf{C} * \\mathbf{H^T}) &\\stackrel{?}{=} 0\\\\
&\\mathbf{\\vdots}\\\\
\\begin{bmatrix} 0& 0& 0& 0& 1 \\end{bmatrix} &\\ne 0\\end{align*}
$$


This result proves that there is a flipped bit within our Codeword. Finding it is simply a process of trial and error. We can take the Codeword and flip one bit at a time before rerunning the validity check until we find the bit that was flipped, leaving us with our original Codeword. 

Now that we have corrected the error and returned to the correct Codeword, $\\mathbf{C} = \\begin{bmatrix} 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 \\end{bmatrix}$, we can decode the Codeword to retrieve the original message. First, we must separate the data bits from the parity bits. Since we added five parity bits, this process is as simple as removing the last five entries in the Codeword. So, 
$$
\\text{Final message} = \\begin{bmatrix} 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 0 & 1 \\end{bmatrix}
$$


Finally, we can convert this from binary to text and retrieve our original message "Hi".
            </p>
            `,
          }}
          />
        </section>
      </article>
    </Main>
  );
};

export default HammingCode;
