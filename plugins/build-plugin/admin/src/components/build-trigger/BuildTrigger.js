import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { LoadingIndicator, request } from 'strapi-helper-plugin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Text, Padded, Separator } from '@buffetjs/core';

const BuildTrigger = () => {
  const initialStatusData = {
    siteIsUpdated: false,
    lastChange: 'Loading...'
  }
  const [showLoading, setShowLoading] = useState(false)

  const [statusData, setStatusData] = useState(initialStatusData)

  const buildSite = async () => {
    try{
      setShowLoading(true)
      const response = await request('/build-plugin', { method: 'GET' });
      setStatusData(prevData => ({
        ...prevData,
        siteIsUpdated: true
      })
      )
      setShowLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const loadStatus = async () => {
    try  {
      const resp = await request("/build-plugin/status", { method: 'GET'})
      setStatusData(resp)

    } catch(e) {

    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  return (
    <Container>
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

      <Padded top bottom size="sm">
        <Separator />
      </Padded>

      <Row className="pt-8">
        <Col>
          <p>Ultima modificacion:</p>
          <h2><strong>{ statusData.lastChange }</strong></h2>
        </Col>
      </Row>
      <Padded top bottom size="sm">
        <Separator label="-" />
      </Padded>
      
      <Row className="pt-8">
        <Col>
        <h2>Publicar cambios:</h2>
        { !showLoading && <Button 
          color="primary" 
          style={{
                  height: 40,
                  padding: 0,
                  marginRight: 10,
                  marginTop: 15
                }} 
          onClick={buildSite}
        >
          <span className="px-5 py-2">Publish & Build</span>
        </Button>}
        { showLoading && 
          <LoadingIndicator /> 
        } 
        </Col>
      </Row>
    </Container>
  );
};

export default BuildTrigger;