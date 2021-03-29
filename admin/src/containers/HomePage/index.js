import React, { memo, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { LoadingIndicator, request } from 'strapi-helper-plugin';

import { Block, Container, Separator } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Padded } from '@buffetjs/core';

const HomePage = ({ global: { plugins }, history: { push } }) => {
  const initialStatusData = {
    siteIsUpdated: false,
    lastChange: 'Loading...'
  }
  const [statusData, setStatusData] = useState(initialStatusData)

  const loadStatus = async () => {
    try  {
      const resp = await request("/build-plugin/status", { method: 'GET'})
      setStatusData(resp)
      console.log(resp)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  return (

    <Container >
      <Row>
        <Col>
          <Block>
            <Row>
              <Col>
                <h2>Site Status:</h2>
                <p>
                { statusData.siteIsUpdated ? <strong>El sitio esta actualizado.</strong> : 
                  <strong>Faltan publicar los ultimos cambios.</strong>
                }
                </p>
              </Col>
              <Col>
              { statusData.siteIsUpdated ? 
                <FontAwesomeIcon style={{ color: 'green', fontSize: '36px'}} icon={faCheckCircle} /> :
                <FontAwesomeIcon style={{ color: 'red', fontSize: '36px'}} icon={faExclamationCircle} /> 
              }
              </Col>
            </Row>
          </Block>
        </Col>
        <Col>
          <Block>
            <p>Ultima modificacion:</p>
            <h2><strong>{ statusData.lastChange }</strong></h2>
          </Block>
        </Col>
      </Row>
    </Container>

  );
};

export default memo(HomePage);
