import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList';

import * as routes from '../../Routes/constants';

import styles from './SidebarList.module.css';

const SidebarList = props => (
    <>
        <div className={styles.header}>
            <span>Menu</span>
        </div>
        <ul>
            <Link to={routes.HOME} onClick={props.handleCloseSidebar}>
                <ItemList>
                    Home
                </ItemList>
            </Link>
            <Link to={routes.BENCHMARKING} onClick={props.handleCloseSidebar}>
                <ItemList>
                    Benchmarking
                </ItemList>
            </Link>
            <Link to={routes.DETECTION} onClick={props.handleCloseSidebar}>
                <ItemList>
                    Detection
                </ItemList>
            </Link>
        </ul>
    </>
)

export default SidebarList;