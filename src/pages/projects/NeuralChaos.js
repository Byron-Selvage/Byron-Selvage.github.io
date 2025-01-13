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
  references: 'References',
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
          From studying the neurons of a squid brain, physiologists Hodgkin and Huxley were able
          to derive a model that describes electrical pulses flowing through a neuron. This model
          consists of 4 nonlinear ordinary differential equations (ODEs). This model is shown
          in Figure 2 below.
        </p>
        <img
          src="/images/NeuralChaos/HH.png"
          alt="Figure 2: The Hodgkin-Huxley Model"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 2: The Hodgkin-Huxley Model</figcaption>
        <p>
          Here, V is the measured action potential (Volts), and m, h, and n are dimensionless
          probabilities explaining channel subunit activation and deactivations. m represents
          the opening of positive sodium channels,  h controls the closing of the sodium channels,
          and n represents the potassium ion channels. While accurate, the Hodgkin-Huxley model is
          computationally expensive as it requires solving a system of 4 ODEs. Due to this, we chose
          to use the FitzHugh-Nagumo model, a simplified two-dimensional version of the
          Hodgkin-Huxley
          equations. This model relies on the facts that m can be approximated by its long-run value
          since it operates on a time scale an order of magnitude greater than the other variables
          and that the values of h and n have an approximately constant relationship allowing us to
          use the quasi-steady state approximation. The equations of the FitzHugh-Nagumo model are
          shown in Figure 3 below. We chose to use parameter values 𝜖 = 0.005, 𝛼 = 0.1, and 𝛾 = 0.5
          from the textbook Modeling Life by Garfinkel, A., Shevtsov, J., & Guo, Y.
        </p>
        <img
          src="/images/NeuralChaos/FHN.png"
          alt="Figure 3: The FitzHugh-Nagumo Model"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 3: The FitzHugh-Nagumo Model</figcaption>
      </section>

      <section id="dynamics">
        <h2>Neuronal Dynamics</h2>
        <p>
          To initially analyze the properties of the FitzHugh-Nagumo model, the driving term
          I(t) was converted from a time-dependent current input to a constant value I. This
          allowed for the analysis of the system to be done using the Jacobian of the
          Fitzhugh-Nagumo Model. Through this analysis, it was found that for small values of
          I the system would exhibit a single stable equilibrium point. At this point,
          The current is insufficient to overcome the threshold potential and the neuron settles
          into a slightly more sensitive state without firing.
          This EP and its stability were found numerically and analytically.
          Then, as I(t) increases, a Hopf Bifurcation occurs and the EP becomes unstable and
          the system forms a limit cycle. This corresponds to the current triggering constant
          firing of the neuron. Due to this, there is a positive correlation between the magnitude
          of I and the frequency of oscillations of the membrane potential. These dynamics are
          demonstrated in the animated figure below. Note that for low values of I, solutions
          converge to a single value but as I increases oscillations and a limit cycle emerge.
        </p>
        <img
          src="/images/NeuralChaos/dynamics.gif"
          alt="Figure 4: Autonomous Dynamics"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 4: Autonomous Dynamics</figcaption>
      </section>

      <section id="chaos_analysis">
        <h2>Chaos Analysis</h2>
        <p>
          The FitzHugh-Nagumo model will exhibit chaos as the system becomes loaded with
          a time-dependent input current. To push the system into chaos our group added
          a square wave driving current to the system. For large periods the system exhibits
          a limit cycle as seen in the figure below.
        </p>
        <img
          src="/images/NeuralChaos/cycle.png"
          alt="Figure 5: Limit Cycle"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 5: Limit Cycle</figcaption>

        <p>
          But, as the period of the square wave decreases the system begins to enter
          chaos, a deterministic but unpredictable state where small perturbations in
          initial conditions lead to extreme differences in solution trajectories.
          This is shown in the following figure.
        </p>
        <img
          src="/images/NeuralChaos/chaos.png"
          alt="Figure 6: Chaos"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 6: Chaos</figcaption>
      </section>

      <section id="neuron_network">
        <h2>Neuron Network Dynamics</h2>
        <p>
          After running the analysis of a singular neuron a network of neurons was
          modeled by linking a series of neurons. The first neuron receives the same
          external driving current I(t). Subsequent neurons receive a coupling
          current proportional to the voltage of the previous neuron, scaled by a
          constant resistance 𝑅. This simulates the transmission of signals between
          neurons via synapses. The resulting system of equations is,
        </p>
        <img
          src="/images/NeuralChaos/NEW.png"
          alt="Figure 7: Extended FitzHugh-Nagumo"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 7: Extended FitzHugh-Nagumo</figcaption>
        <p>
          When the first neuron is stimulated with a square wave with a refractory period
          long enough for the neuron to return to its rest state before the next pulse,
          the signal is transmitted through the neurons as expected. This behavior is
          shown in the following plot.
        </p>
        <img
          src="/images/NeuralChaos/normalChain.png"
          alt="Figure 8: Regular Pulse Neuron Chain"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 8: Regular Pulse Neuron Chain</figcaption>
        <p>
          This process illustrates that the dynamics of the first neuron have a
          cascading effect. For a large period as seen above the behavior of each
          of the neurons converges to a limit cycle having stable oscillations.
          However, as the period of the input current decreases chaotic dynamics
          emerge in the first neuron. The chaos then trickles down and stabilizes
          through the connected neurons as shown below.
        </p>
        <img
          src="/images/NeuralChaos/chaosChain.png"
          alt="Figure 9: Quick Pulse Neuron Chain"
          className="centered-figure"
        />
        <figcaption className="figure-caption">Figure 9: Quick Pulse Neuron Chain</figcaption>
        <p>
          In the above figure, it can be seen that the first neuron exhibits strong
          chaotic behavior, but as the signal propagates through the neurons the
          dynamics stabilize to a limit cycle. This is because each neuron is a
          capacitor that acts as a low-pass filter in linear circuit theory. This
          means that as the previous neuron passes in a high frequency signal the
          neuron filters out the high frequency noise removing some of the chaotic
          dynamics. This allows the system to restabilize into a limit cycle.
        </p>
      </section>

      <section id="conclusions">
        <h2>Conclusions</h2>
        <p>
          Overall it was found that for constant current input signals the FitzHugh-Nagumo
          model would converge to either a stable equilibrium point or a limit cycle.
          However, as time-dependent current input such as a square wave for high period
          inputs the system would remain in a limit cycle phase plane trajectory. However,
          as the period decreased the system began to exhibit chaotic properties propagating
          potentials with aperiodic structure. Then, in linking neurons to see how the chaos
          of a neuron is transmitted through the system, we found that the chaos settles into
          a limit cycle. This is likely important for the functioning of the brain as it has
          a natural self-correcting of input signals to prevent insane membrane-like behavior
          and is possible that neurological disorders may arise when neuron connections
          cannot correct uncontrolled chaotic oscillations.
        </p>
        <p>
          Even though the FitzHugh-Nagumo model is a nice simplification of the Hodgkin-Huxley
          model that can be realistically computed. It loses information on the dynamics of
          the neuron as through its simplification it loses some of the individual behaviors
          of ion channels in the neuron. This will lose finer details in an individual neuron
          and the behaviors it exhibits as well as when neurons are linked the way a chain of
          neurons respond to chaos may change.
        </p>
        <p>
          Moving forward modeling a more sophisticated network of neurons such as having two
          neurons input into one neuron or other sophisticated graph networks of neurons.
          Furthermore, using the full Hodgkin-Huxley model and attempting to predict the
          behavior of one neuron under chaotic conditions to see if similar patterns arise
          like seen in the FitzHugh-Nagumo model alternatively attempting to link neurons
          together under the Hodgkin-Huxley model to see if the chaos smoothing properly
          similarly occurs.

        </p>
      </section>

      <section id="references">
        <h2>References</h2>
        <ul>
          <li>
            Woodruff, A. (2023, October 3).
            What is a neuron? Queensland Brain Institute -
            University of Queensland.
            https://qbi.uq.edu.au/brain/brain-anatomy/what-neuron#:~:text=Neurons%20(also%20called%20neurones%20or,although%20it’s%20not%20really%20known).
          </li>
          <li>
            Neuronal Activity. Neuronal Activity - an overview | ScienceDirect Topics. (n.d.).
            https://www.sciencedirect.com/topics/neuroscience/neuronal-activity#:~:text=Neuronal%20activity%20refers%20to%20the,by%20neurons%20in%20the%20brain.
          </li>
          <li>
            Gerstner, W., Kistler, W. M., Naud, R., & Paninski, L. (2016). Neuronal dynamics
            from single neurons to networks and models of cognition. Cambridge University Press.
          </li>
          <li>
            Purves D, Augustine GJ, Fitzpatrick D, et al., editors. Neuroscience.
            2nd edition. Sunderland (MA): Sinauer Associates; 2001. Chapter 2,
            Electrical Signals of Nerve Cells. Available from: https://www.ncbi.nlm.nih.gov/books/NBK11053/.
          </li>
          <li>
            Klimenko, T. (2022, September 8). Spinal Propagation in the Neuron
            (Neurophysiology) | Full Discussion. YouTube. https://www.youtube.com/watch?v=r2gma7gsq6g.
          </li>
          <li>
            Braun, J. (2021). Hodgkin-Huxley Model. Otto-von-Guericke-Universit¨ at
            Magdeburg, Cognitive Biology Group Lecture 4.
          </li>
          <li>
            Baxter, D. A., & Byrne, J. H. (2014). Dynamical Properties of Excitable Membranes.
            In J. H. Byrne, R. Heidelberger, & M. N. Waxham (Eds.), From Molecules to Networks
            (3rd ed., pp. 409-442). Academic Press. https://doi.org/10.1016/B978-0-12-397179-1.00014-2
          </li>
          <li>
            Garfinkel, A., Shevtsov, J., & Guo, Y. (2017). Modeling Life. Springer eBooks.
            https://doi.org/10.1007/978-3-319-59731-7
          </li>
        </ul>
      </section>
    </article>
  </Main>
);

export default NeuralChaos;
