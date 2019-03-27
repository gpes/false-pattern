import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle';
import ProjectSelection from '../../components/ProjectSelection';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { listProjectNames, listDetectionByProject } from '../../requests';

export default class DetectionPage extends Component {
    state = {
        projectName: '',
        options: [],
        detection: []
    }

    componentDidMount() {
        this.getProjectNames();
    }

    handleSelectChange = e => {
        this.setState({ projectName: e.value })
    }

    getProjectNames = async () => {
        let data = await listProjectNames();
        let projectNames = data.map(project => ({ label: project, value: project }));
        this.setState({ ...this.state, options: projectNames });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let data = await listDetectionByProject(this.state.projectName);
        this.setState({ ...this.state, detection: data.metrics })
    }

    render() {
        return (
            <>
                <PageTitle
                    title='Detection' />

                <ProjectSelection
                    projectName={this.state.projectName}
                    options={this.state.options}
                    handleSelectChange={this.handleSelectChange}
                    handleSubmit={this.handleSubmit} />

                <Accordion multiple={true}>
                    <AccordionTab header='False Factory Method'>
                        <>
                            <h4>
                                <b>Instances quantity: </b> {this.state.detection.length}
                            </h4>
                            <DataTable value={this.state.detection}>
                                <Column field='entityName' header='Entity Name' />
                                <Column field='metricValue' header='Metric Value' />
                            </DataTable>
                        </>
                    </AccordionTab>
                </Accordion>
            </>
        )
    }
}