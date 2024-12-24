import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';

const sections = {
  abstract: 'Abstract',
  biological_background: 'Biological Background',
  mathematical_model: 'Mathematical Model',
  dynamics: 'Neuronal Dynamics',
  chaos_analysis: 'Chaos Analysis',
  neuron_network: 'Neuron Network',
  conclusions: 'Conclusions',
  future_work: 'Future Work',
};

const NeuralChaos = () => (
  <Main
    title="Neural Chaos"
    description="Exploring chaos in the FitzHugh-Nagumo model of a neuron"
  >
    <article className="post" id="neural-chaos">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects/neural-chaos">Neural Chaos</Link>
          </h2>
          <p>
            A Mathematical Biology (MATH 431) Project in collaboration with <a href="https://www.linkedin.com/in/nev-ahrendsen-b75a38270/" target="_blank" rel="noreferrer">Nev Ahrendsen</a>,
            Jenna Ramsey-Rutledge, and <a href="https://www.linkedin.com/in/kyle-sperber-55572b240/" target="_blank" rel="noreferrer">Kyle Sperber</a>
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

      <section id="abstract">
        <h2>Abstract</h2>
        <p>
          Neurons are fundamental units of the brain and nervous system, responsible
          for receiving sensory input, sending motor commands to our muscles, and
          transforming and relaying the electrical signals at every step in between.
          This project investigates neuronal dynamics using the FitzHugh-Nagumo model,
          exploring how different input currents influence neuronal behavior, with
          a focus on understanding the emergence of chaos and signal transmission
          in neural networks.
        </p>
      </section>

      <section id="biological_background">
        <h2>Biological Background</h2>
        <p>
          Neurons are held in an imbalanced state of ionic concentration to create a charge
          separation. Due to this charge separation, neurons act as electrical capacitors.
          The inside of the neuron increases in charge due to the movement of ions through
          mechanical channels until a threshold potential is reached, causing sodium channels
          to open. The positive sodium ions flow into the neuron increasing the voltage inside the
          neuron. This event as described is the action or membrane potential. Once this occurs, the
          signal generated propagates through the axon all the way to the terminal where the neuron
          releases neurotransmitters to pass along the signal and to repolarize itself. The
          neurotransmitters cause negative ions (typically calcium) to flow through newly opened
          channels to return the neuron to its resting state. During this process, the neuron can
          enter a refractory period where the neuron is hyperpolarized which is when the cell
          membrane becomes dominantly negatively charged. This behavior is demonstrated in Figure 1.
        </p>
        <img
          src="/images/NeuralChaos/Neuron_Behavior.jpg"
          alt="Figure 1: Neuron Behavior"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 1: Neuron Behavior</figcaption>
      </section>

      <section id="mathematical_model">
        <h2>Mathematical Model</h2>
        <p>
          We utilized the FitzHugh-Nagumo model, a simplified two-dimensional
          version of the Hodgkin-Huxley equations. This model captures essential
          neuronal dynamics while reducing computational complexity:
        </p>
        <pre>
          du/dt = v - (u^3 / 3) - w + I(t)
          dw/dt = ε * (u + α - β * w)
        </pre>
        <p>
          Key parameters include <code>ε = 0.005</code>, <code>α = 0.1</code>,
          and <code>β = 0.5</code>, carefully chosen to represent neuronal behavior.
        </p>
      </section>

      <section id="dynamics">
        <h2>Neuronal Dynamics</h2>
        <p>
          Our analysis revealed fascinating behavioral transitions under varying
          input currents:
        </p>
        <ul>
          <li>
            For small current inputs (I &lt; 0.10421), the system converges to
            a stable equilibrium point.
          </li>
          <li>
            As input current increases, the system transitions to a limit cycle,
            demonstrating a Hopf Bifurcation.
          </li>
          <li>
            A positive correlation exists between input current magnitude and
            oscillation frequency.
          </li>
        </ul>
      </section>

      <section id="chaos_analysis">
        <h2>Chaos Analysis</h2>
        <p>
          By introducing square wave input currents, we explored the system&apos;s
          chaotic behavior. With large wave periods, the system maintains a
          limit cycle. However, as the period decreases, chaotic dynamics emerge,
          characterized by aperiodic potential propagations.
        </p>
      </section>

      <section id="neuron_network">
        <h2>Neuron Network Dynamics</h2>
        <p>
          We extended our model by linking multiple neurons, simulating signal
          transmission through synapses. Remarkably, while the first neuron
          might exhibit chaotic behavior, subsequent neurons in the network
          tend to stabilize the signal.
        </p>
        <p>
          This stabilization occurs because neurons act as low-pass filters,
          naturally smoothing out high-frequency noise and chaotic inputs.
          This mechanism may be crucial for preventing uncontrolled neuronal
          oscillations.
        </p>
      </section>

      <section id="conclusions">
        <h2>Conclusions</h2>
        <p>
          Our research demonstrated that neuronal systems exhibit complex
          dynamic behaviors ranging from stable equilibria to limit cycles
          and chaos. The FitzHugh-Nagumo model revealed how neural networks
          can self-regulate chaotic inputs, potentially providing insights
          into brain function and neurological disorders.
        </p>
      </section>

      <section id="future_work">
        <h2>Future Work</h2>
        <p>
          Future research directions include:
        </p>
        <ul>
          <li>
            Modeling more sophisticated neuron network architectures
          </li>
          <li>
            Utilizing the full Hodgkin-Huxley model to validate our findings
          </li>
          <li>
            Exploring chaos propagation and smoothing in more complex
            neural network configurations
          </li>
        </ul>
      </section>
    </article>
  </Main>
);

export default NeuralChaos;
