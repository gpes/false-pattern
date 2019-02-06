import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { Container } from 'react-grid-system';

import ResultsPage from './pages/Results';
import Footer from './components/Footer';

export default class App extends Component {
    items = [
        {
            label: 'Extractf',
            icon: 'pi pi-fw pi-file',
        }
    ]
    
    render() {
        return (
            <>
                <Menubar model={this.items} />
                <Container>
                    <ResultsPage />
                </Container>
                <Footer />
            </>
        )
    }
}