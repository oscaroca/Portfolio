import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import homeLogo from '../../Assets/home-main.png';
import PixelBg from '../../components/PixelBg';

import Introduction from './Introduction';
import '../../style.css';

import {
  AiFillGithub,
} from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from '../../hooks/useTranslation';
import TypewriterStack from '../../components/TypewriterStack';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
    <PixelBg />
    <section style={{ position: 'relative', zIndex: 1 }}>
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
            padding: '9rem 0 2rem',
            color: 'var(--color-cream)',
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
                <TypewriterStack
                  lines={[
                    'Software Developer',
                    '3D Artist',
                    'Hardware Enthusiast',
                    'Designer',
                    'Open Source Contributor',
                  ]}
                  loop={true}
                />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                draggable={false}
                style={{ filter: 'drop-shadow(0 0 30px rgba(245,200,66,0.2))' }}
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
            <p style={{ color: 'var(--color-cream-dim)', fontFamily: "'DM Mono', monospace" }}>
              {t('home.social.connect1')}
              <span style={{ color: 'var(--color-amber)' }}>
                <a
                  href="mailto:contact@oscaroca.com"
                  style={{ color: 'var(--color-amber)', textDecoration: 'none' }}
                >
                  {t('home.social.connect2')}
                </a>
              </span>
              {t('home.social.connect3')}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}
