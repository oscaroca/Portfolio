import { Container, Row, Col } from 'react-bootstrap';

import TypewriterStack from '../components/TypewriterStack';

export default function About() {
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
          <div style={{ padding: 50, textAlign: 'center' }}>
            <TypewriterStack
              lines={['Cats are working on it...', 'Please check back later']}
              loop={true}
            />
          </div>
        </Container>
      </Container>
    </section>
  );
}
