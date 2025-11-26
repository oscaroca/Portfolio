import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import homeLogo from '../../assets/home-main.svg';
// import Particle from '../../components/Particle';
import Typewriter from 'typewriter-effect';
import Home2 from './Home2';
import '../../style.css';

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';

export default function Home() {
  return (
    <section>
      <Container
        fluid
        style={{
          marginTop: '109px',
          position: 'relative',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          paddingBottom: '30px',
          paddingTop: '30px',
        }}
        id="home"
      >
        {/* <Particle /> */}
        <Container
          style={{
            padding: ' 9rem 0 2rem !important',
            color: 'whitesmoke',
            textAlign: 'left',
          }}
        >
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{' '}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> OSCAR BLAZQUEZ</strong>
              </h1>

              <div style={{ padding: 50, textAlign: 'left' }}>
                <Typewriter
                  options={{
                    strings: [
                      'Software Developer',
                      'Freelancer',
                      'MERN Stack Developer',
                      'Open Source Contributor',
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: '450px' }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />

      <Container>
        <Row style={{ paddingTop: '50px', paddingBottom: '80px' }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="mainGreen">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/oscaroca"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/oscarbj/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
