import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle';
import ProjectSelection from '../../components/ProjectSelection';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';

export default class DetectionPage extends Component {
    state = {
        projectName: ''
    }

    detection = [
        { entityName: 'entity 1', metricValue: 7 },
        { entityName: 'entity 2', metricValue: 3 },
        { entityName: 'entity 3', metricValue: 5 },
        { entityName: 'entity 4', metricValue: 3 },
        { entityName: 'entity 5', metricValue: 1 },
    ]

    handleSelectChange = () => {

    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <PageTitle
                    title='Detection' />

                <ProjectSelection
                    projectName={this.state.projectName}
                    handleSelectChange={this.handleSelectChange}
                    handleSubmit={this.handleSubmit} />


                <Accordion multiple={true}>
                    <AccordionTab header='Design pattern name'>
                        {/* <Row>
                            <Col md={6}><h4>Entity Name</h4></Col>
                            <Col md={6}><h4>Metric Value</h4></Col>
                        </Row>
                        {new Array(30).fill(2).map((element, index) => (
                            <Row key={index}>
                                <Col md={6}>Term {index + 1}</Col>
                                <Col md={6}>{element + Math.floor(Math.random() * index)}</Col>
                            </Row>
                        ))} */}
                        <DataTable value={this.detection}>
                            <Column field='entityName' header='Entity Name' />
                            <Column field='metricValue' header='Metric Value' />
                        </DataTable>
                    </AccordionTab>
                </Accordion>
            </>
        )
    }
}