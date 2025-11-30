import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import myImg from '../../Assets/avatar.svg';
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
            <h1 style={{ fontSize: '2.6em' }}>
              {t('home.intro.title1')}{' '}
              <span className="mainGreen">{t('home.intro.title2')}</span>{' '}
              {t('home.intro.title3')}
            </h1>
            {homeIntroBody()}
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
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
      {t('home.intro.stackLead')}
      <i>
        <b className="mainGreen"> {t('home.intro.stack')} </b>
      </i>
      <br />
      <br />
      {t('home.intro.interestsLead')}
      <i>
        <b className="mainGreen"> {t('home.intro.interests')} </b>
      </i>
      <br />
      <br />
      {t('home.intro.toolsLead')}
    </p>
  );
};
