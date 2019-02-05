import React, { Component } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
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
                            <Button label='Calcular' />
                        </Col>
                    </Row>
                </form>

            </>
        )
    }
}

export default ResultsPage;