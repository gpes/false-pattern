import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Container } from 'react-grid-system';

import Menubar from './components/Menubar';
import SidebarList from './components/SidebarList';

import Footer from './components/Footer';

export default class App extends Component {
    state = {
        visible: false
    }

    handleOpenSidebar = () => {
        this.setState({ visible: true })
    }

    handleCloseSidebar = () => {
        this.setState({ visible: false })
    }

    render() {
        return (
            <>
                <Menubar handleOpenSidebar={this.handleOpenSidebar} />
                <Sidebar visible={this.state.visible} onHide={this.handleCloseSidebar}>
                    <SidebarList />
                </Sidebar>
                <Container>
                    <h1>sasa</h1>
                </Container>
                <Footer />
            </>
        )
    }
}