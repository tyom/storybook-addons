import React from 'react';
import {
  Alignment,
  Navbar,
  Button,
  Card,
  Elevation,
  H5,
} from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

export const navbar = () => (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>Blueprint</Navbar.Heading>
      <Navbar.Divider />
      <Button className="bp3-minimal" icon="home" text="Home" />
      <Button className="bp3-minimal" icon="document" text="Files" />
    </Navbar.Group>
  </Navbar>
);

export const card = () => (
  <Card interactive={true} elevation={Elevation.TWO}>
    <H5>
      <a href="#">Card heading</a>
    </H5>
    <p>Card content</p>
    <Button>Submit</Button>
  </Card>
);

export default {
  title: 'react/blueprint',
};
