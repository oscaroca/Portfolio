import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import myImg from '../../assets/avatar.webp';
import Tilt from 'react-parallax-tilt';
import '../../style.css';
import { useTranslation } from '../../hooks/useTranslation';

export default function Introduction() {
  const { t } = useTranslation();
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1
              style={{
                fontSize: '1.6em',
                fontFamily: "'Press Start 2P', monospace",
                lineHeight: 1.7,
                color: 'var(--color-cream)',
              }}
            >
              {t('home.intro.title1')}{' '}
              <span style={{ color: 'var(--color-amber)' }}>
                {t('home.intro.title2')}
              </span>{' '}
              {t('home.intro.title3')}
            </h1>
            <div className="lofi-journal-card" style={{ marginTop: '1.5rem' }}>
              {homeIntroBody()}
            </div>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable={false}
              glareMaxOpacity={0.08}
              glareColor="rgba(99, 221, 58, 0.6)"
              style={{ width: 'fit-content', alignSelf: 'center' }}
            >
              <img
                src={myImg}
                className="img-fluid"
                alt="avatar"
                draggable={false}
                style={{
                  borderRadius: '8px',
                  filter: 'drop-shadow(0 0 24px rgba(245,200,66,0.18))',
                }}
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

const homeIntroBody = () => {
  const { t } = useTranslation();

  return (
    <p className="home-about-body">
      {t('home.intro.body1')}
      <br />
      <br />
      <span style={{ color: 'var(--color-cream-dim)' }}>
        {t('home.intro.stackLead')}
      </span>
      <i>
        <b style={{ color: 'var(--color-amber)' }}> {t('home.intro.stack')} </b>
      </i>
      <br />
      <br />
      <span style={{ color: 'var(--color-cream-dim)' }}>
        {t('home.intro.interestsLead')}
      </span>
      <i>
        <b style={{ color: 'var(--color-rose)' }}>
          {' '}
          {t('home.intro.interests')}{' '}
        </b>
      </i>
      <br />
      <br />
      <span style={{ color: 'var(--color-cream-dim)' }}>
        {t('home.intro.toolsLead')}
      </span>
    </p>
  );
};
