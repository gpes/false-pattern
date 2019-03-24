import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Accordion, AccordionTab } from 'primereact/accordion';
import ProjectSelection from '../../components/ProjectSelection';
import PageTitle from '../../components/PageTitle';

export default class BenchmarkingPage extends Component {
    state = {
        projectName: '',
    }

    handleSelectChange = e => {
        this.setState({ projectName: e.value })
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <PageTitle
                    title='Benchmarking'
                    subtitle='Visualização  dos dados da ferramenta de detecção de padrões de projeto e extração de vocabulário de cada projeto' />
                
                <ProjectSelection 
                    projectName={this.state.projectName} 
                    handleSelectChange={this.handleSelectChange} 
                    handleSubmit={this.handleSubmit}  />

                <Accordion multiple={true}>
                    <AccordionTab header='Design Pattern Name'>
                        <Accordion multiple={true}>
                            <AccordionTab header='Instance 1 (Entity Role 1, Entity Role 2)'>
                                <h4>Entity Names</h4>
                                <Row>
                                    {new Array(30).fill(5).map((item, index) => (
                                        <Col key={index} md={2}>Term {index + 1}</Col>
                                    ))}
                                </Row>
                            </AccordionTab>
                            <AccordionTab header='Instance 2 (Entity Role 1, Entity Role 2)'>
                                <Row>
                                    {new Array(30).fill(6).map((item, index) => (
                                        <Col key={index} md={2}>Term {index + 1}</Col>
                                    ))}
                                </Row>
                            </AccordionTab>
                        </Accordion>
                    </AccordionTab>
                </Accordion>
            </>
        )
    }
}