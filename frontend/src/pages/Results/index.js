import React, { Component } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Row, Col } from 'react-grid-system';

import request from '../../utils/request';

import PageTitle from '../../components/PageTitle/index';

import styles from './index.module.css';

class ResultsPage extends Component {
    state = {
        patternName: '',
        dataChart: {
            labels: ['axion', 'collections', 'xerces', 'xalan', 'jext'],
            datasets: [
                {
                    label: 'Projetos do Qualitas.class',
                    backgroundColor: '#42A5F5',
                    data: []
                }
            ]
        },
        loading: true,
    }

    API_URL = 'http://localhost:8080/extractf/metric';

    chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    patternNames = [
        { label: 'Factory Method', value: 'factory' },
    ]

    projectNames = ['axion-1.0-M2', 'collections-3.2.1', 'xerces-2.10.0', 'xalan-2.7.1', 'jext-5.0']

    handleRequests = async () => {
        let dataToSets = [];

        for (let k = 0; k < this.projectNames.length; k++) {
            let metricNumber = 0;

            let data = await request(this.API_URL, this.projectNames[k]);

            let keys = Object.keys(data)
            for (let i = 0; i < keys.length; i++) {
                metricNumber += data[keys[i]];
            }

            dataToSets.push(metricNumber);
        }

        let newDataChartState = this.state.dataChart;
        newDataChartState.datasets[0].data = dataToSets;

        this.setState({ ...this.state, dataChart: newDataChartState, loading: false });
    }

    componentDidMount() {
        this.handleRequests();
    }

    render() {
        return (
            <>
                <PageTitle title='Results' />

                <ProgressSpinner className={this.state.loading ? '' : styles.isLoading} animationDuration='2s' />

                <div className={!this.state.loading ? '' : styles.isLoading}>
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
                        <Chart type='bar' data={this.state.dataChart} options={this.chartOptions} />
                    </div>
                </div>
            </>
        )
    }
}

export default ResultsPage;