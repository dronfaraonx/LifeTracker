import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavigationBar from './ui/NavigationBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Container>
      <Row>
        <Col xs="12">
          <NavigationBar/>
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>

  )
}
