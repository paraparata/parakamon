import Button from "./shared/Button";
import Modal from "./shared/Modal";
import "./About.css";

function About({ show, onClose }) {
  return (
    <Modal show={show}>
      <div className="mx-auto flex justify-center">
        <div className="w-10/12 px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-500">
          <span className="heading mb-2 text-xs text-center text-yellow-500">
            About
          </span>
          <hr className="mb-2 " />
          <div className="w-full mx-auto my-4">
            <div className="about w-full h-72 ss:h-36 px-4 py-2 flex flex-col rounded border-2 border-yellow-300 text-gray-700 overflow-y-scroll">
              <figure className="mb-4">
                <blockquote cite="https://github.com/paraparata/parakamon">
                  <p>Parakamon is para pokemon!</p>
                </blockquote>
                <figcaption>
                  —paraparata, <cite>Parakamon</cite>
                </figcaption>
              </figure>
              <h2>Resources</h2>
              <ul>
                <li>
                  <a
                    href="https://github.com/mazipan/graphql-pokeapi"
                    title="graphql-pokeapi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    graphql-pokeapi from mazipan
                  </a>
                </li>
                <li>
                  Pokemon Icons used in buttons made by{" "}
                  <a
                    href="https://www.flaticon.com/authors/roundicons-freebies"
                    title="Roundicons Freebies"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Roundicons Freebies
                  </a>{" "}
                  from{" "}
                  <a
                    href="https://www.flaticon.com/"
                    title="Flaticon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.flaticon.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://icons.getbootstrap.com/"
                    title="Bootstrap Icons"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Bootstrap Icons
                  </a>
                </li>
                <li>
                  <a
                    href="hhttps://tailwindcss.com/"
                    title="Tailwindcss"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tailwindcss
                  </a>
                </li>
                <li>BM composed by paraparata</li>
              </ul>
              <div className="mt-12 text-center">
                <hr />
                <p className="mt-2">
                  Made with React + Graphql + Apollo + wuff by{" "}
                  <a
                    href="https://paraparata.github.io/"
                    title="Paraparata"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Paraparata
                  </a>
                  <br />
                  in{" "}
                  <a
                    href="https://github.com/paraparata/parakamon"
                    title="parakamon repository"
                    target="_blank"
                    rel="noreferrer"
                  >
                    parakamon repo
                  </a>
                </p>
              </div>
            </div>
          </div>
          <Button
            title="Close"
            color="bg-white"
            textColor="text-red-500"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}

export default About;
