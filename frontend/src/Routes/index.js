import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../pages/Home'
import BenchmarkingPage from '../pages/Benchmarking';
import DetectionPage from '../pages/Detection';

import * as routes from './constants';
import { Sidebar } from 'primereact/sidebar';
import SidebarList from '../components/SidebarList/index';
import { Container } from 'react-grid-system';

const Routes = props => (
    <Router>
        <div>
            <Sidebar visible={props.visible} onHide={props.handleCloseSidebar}>
                <SidebarList handleCloseSidebar={props.handleCloseSidebar} />
            </Sidebar>

            <Container>
                <Route exact path={routes.HOME} component={HomePage} />
                <Route exact path={routes.BENCHMARKING} component={BenchmarkingPage} />
                <Route exact path={routes.DETECTION} component={DetectionPage} />
            </Container>
        </div>
    </Router>
)

export default Routes;