import React from 'react';
import { Toolbar } from 'primereact/toolbar'

import styles from './Menubar.module.css';

const Menubar = props => (
    <Toolbar className={styles.menubar}>
        <button className={styles.iconBarSize} onClick={props.handleOpenSidebar}>
            <i className="pi pi-bars p-toolbar-separator" />
        </button>
        <span className={styles.title}>Extractf</span>
    </Toolbar>
)

export default Menubar;