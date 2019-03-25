import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const ProjectSelection = props => (
    <form onSubmit={props.handleSubmit}>
        <Row>
            <Col md={10}>
                <Dropdown
                    value={props.projectName} 
                    options={props.options} 
                    onChange={props.handleSelectChange} 
                    style={{ width: '100%', marginBottom: '10px' }} />
            </Col>
            <Col md={2}>
                <Button type='submit' label='Search' style={{ width: '100%' }} />
            </Col>
        </Row>
    </form>

)

export default ProjectSelection;