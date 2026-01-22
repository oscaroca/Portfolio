import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import homeLogo from '../../assets/home-main.svg';
// import Particle from '../../components/Particle';
import Typewriter from 'typewriter-effect';
import Introduction from './Introduction';
import '../../style.css';

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from '../../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <section>
      <Container
        fluid
        style={{
          marginTop: '130px',
          position: 'relative',
          paddingBottom: '30px',
          paddingTop: '30px',
        }}
        id="home"
      >
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
                {t('home.hello1')}{' '}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>
              <h1 className="heading-name">
                {t('home.hello2')}
                <strong className="main-name"> OSCAROCA </strong>
              </h1>
              <div style={{ padding: 50, textAlign: 'left' }}>
                <Typewriter
                  options={{
                    strings: [
                      'Software Developer',
                      '3D Artist',
                      'Hardware Enthusiast',
                      'Designer',
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
      <Introduction />

      <Container>
        <Row style={{ paddingTop: '50px' }}>
          <Col md={12} className="home-about-social" style={{ zIndex: 1 }}>
            <h1>{t('home.social.findMe')}</h1>
            <p>
              {t('home.social.connect1')}
              <span className="mainGreen">{t('home.social.connect2')}</span>
              {t('home.social.connect3')}
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
                  href="https://www.linkedin.com/in/oscarbj/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
