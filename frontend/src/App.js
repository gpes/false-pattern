import React, { Component } from 'react';
import Menubar from './components/Menubar';
// import Footer from './components/Footer';
import Routes from './Routes';

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
                <Routes 
                    visible={this.state.visible}
                    handleCloseSidebar={this.handleCloseSidebar} />
                {/* <Footer /> */}
            </>
        )
    }
}