import React, { Component } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Row, Col } from 'react-grid-system';

import { forEach } from 'async-foreach';
import request from '../../utils/request';

import PageTitle from '../../components/PageTitle/index';

import styles from './index.module.css';

class ResultsPage extends Component {
    state = {
        patternName: ''
    }

    API_URL = 'http://localhost:8080/extractf/metric';

    patternNames = [
        { label: 'Factory Method', value: 'factory' },
    ]

    projectNames = ['axion-1.0-M2', 'collections-3.2.1', 'xerces-2.10.0', 'xalan-2.7.1', 'jext-5.0']

    dataChart = {
        labels: ['axion', 'collections', 'xerces', 'xalan', 'jext'],
        datasets: [
            {
                label: 'Projetos do Qualitas.class',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    }

    handleRequests = () => {
        forEach(this.projectNames, async (item, index) => {
            let data = await request(this.API_URL, item);
            console.log(data);
        })
    }

    componentDidMount() {
        this.handleRequests();
    }

    render() {
        return (
            <>
                <PageTitle title='Results' />

                {/* <ProgressSpinner animationDuration='2s' /> */}

                <form>
                    <label htmlFor='patternName'>Escolha o Padrão de Projeto:</label>
                    <Row className={styles.field}>
                        <Col md={10}>
                            <Dropdown
                                id='patternName'
                                className={styles.select}
                                value={this.state.patternName}
                                options={this.patternNames}
                                onChange={e => this.setState({ ...this.state, patternName: e.value })}
                            />
                        </Col>
                        <Col md={2}>
                            <Button label='Visualizar' icon='pi pi-chart-bar' className={styles.visualizeButton} />
                        </Col>
                    </Row>
                </form>


                <div className={styles.chartContent}>
                    <h2>Valores da métrica para o padrão: {this.state.patternName}</h2>
                    <Chart type='bar' data={this.dataChart} />
                </div>
            </>
        )
    }
}

export default ResultsPage;