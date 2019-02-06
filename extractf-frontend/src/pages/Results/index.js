import React, { Component } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Row, Col } from 'react-grid-system';

import PageTitle from '../../components/PageTitle/index';

import styles from './index.module.css';

class ResultsPage extends Component {
    state = {
        patternName: ''
    }

    patternNames = [
        { label: 'Factory Method', value: 'factory' },
    ]

    dataChart = {
        labels: ['axion', 'collections', 'project3', 'project4', 'project5'],
        datasets: [
            {
                label: 'Projetos do Qualitas.class',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
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