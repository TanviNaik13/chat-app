import React from 'react';
import { Col, Container, Grid, Panel, Row } from 'rsuite';
const SignIn = () => {
  console.log('Entering sign in');
  return (
    <Container>
      <Grid>
        <Row>
          <Col xs={24} md={12}>
            <Panel>
              <div>
                <h2>Welcome to CHaT</h2>
                <p>where Friends meet Friends :</p>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
