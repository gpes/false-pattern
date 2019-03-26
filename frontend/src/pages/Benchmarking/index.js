import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Accordion, AccordionTab } from 'primereact/accordion';
import ProjectSelection from '../../components/ProjectSelection';
import PageTitle from '../../components/PageTitle';

import { listProjectNames, listBenchmarkingByProjectName } from '../../requests';

export default class BenchmarkingPage extends Component {
    state = {
        projectName: '',
        options: [],
        patterns: []
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

        let data = await listBenchmarkingByProjectName(this.state.projectName);

        let patterns = data.patterns;
        let terms = data.terms;

        let newPatterns =
            patterns
                .filter(pattern => pattern.instances.length > 0)
                .map(pattern => {
                    let { instances } = pattern;

                    for (let i = 0; i < instances.length; i++) {
                        let { roles } = instances[i];

                        for (let k = 0; k < roles.length; k++) {
                            let { element } = roles[k];

                            let newTerms = [];

                            for (let j = 0; j < terms.length; j++) {
                                let { entityName } = terms[j];

                                let keys;

                                if (element === entityName) {
                                    let { termsWithCounter } = terms[j];
                                    keys = Object.keys(termsWithCounter)

                                    for (let h = 0; h < keys.length; h++) {
                                        newTerms.push({ term: keys[h], value: termsWithCounter[keys[h]] })
                                    }
                                }
                            }

                            roles[k].terms = newTerms;
                        }

                        instances[i].roles = roles;
                    }

                    pattern.instances = instances;
                    return pattern;
                });


        this.setState({ ...this.state, patterns: newPatterns })
        console.log(newPatterns)
    }

    headerTemplate = roles => {
        return (
            <>
                {roles.map((role, roleIndex) => (
                    <div key={roleIndex}>
                        <span>
                            <b>{role.name}</b>: {role.element}
                        </span>
                        <br />
                    </div>
                ))}
            </>
        )
    }

    render() {
        return (
            <>
                <PageTitle
                    title='Benchmarking'
                    subtitle='Visualização  dos dados da ferramenta de detecção de padrões de projeto e extração de vocabulário de cada projeto' />

                <ProjectSelection
                    projectName={this.state.projectName}
                    options={this.state.options}
                    handleSelectChange={this.handleSelectChange}
                    handleSubmit={this.handleSubmit} />

                <Accordion multiple={true}>
                    {
                        this.state.patterns.map((pattern, patternIndex) => (
                            <AccordionTab key={patternIndex} header={pattern.patternName}>
                                <Accordion multiple={true}>
                                    {
                                        pattern.instances.map((instance, instanceIndex) =>
                                            <AccordionTab key={instanceIndex} header={this.headerTemplate(instance.roles)}>
                                                <h4>Entity Terms</h4>
                                                <Row>
                                                    {instance.roles.map(role => (
                                                        role.terms.map((termObject, index) => (
                                                            <Col key={index} md={3}>
                                                                {termObject.term}: {termObject.value}
                                                            </Col>
                                                        ))
                                                    ))}
                                                </Row>
                                            </AccordionTab>
                                        )
                                    }
                                </Accordion>
                            </AccordionTab>
                        ))
                    }

                </Accordion>
            </>
        )
    }
}