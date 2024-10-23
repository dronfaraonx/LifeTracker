import { Col, Container, Row } from 'reactstrap'
import NavigationBar from './ui/NavigationBar'
import { Outlet } from 'react-router-dom'
import SideBar from './ui/SideBar'

export default function Layout() {
  return (
    <Container>
      <Row>
        <Col >
          <SideBar/>
        </Col>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>

  )
}
