import React from 'react';
import ItemList from './ItemList';

import styles from './SidebarList.module.css';

const SidebarList = props => (
    <>
        <div className={styles.header}>
            <span>Menu</span>
        </div>
        <ul>
            <ItemList>Benchmarking</ItemList>
            <ItemList>Detection</ItemList>            
        </ul>
    </>
)

export default SidebarList;