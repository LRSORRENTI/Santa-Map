import React from 'react';
import styles from './IdBar.module.scss';
import treeImage from './tree.png';
import present from './present.png';
import santa from './santa.png'

export default function IdBar() {
    return (
        <div className={styles.IdBar} style={{padding:"10px"}}>
            <div style={{display: "flex"}}>
            <img className='tree' style={{marginLeft: "10px", marginTop: "5px"}}src={treeImage.src} width={"30px"} height={"20px"} />
            <p className={styles.p}>Santa is coming</p>
            </div>
            {/* <img className='tree' src={treeImage.src} width={"20px"} height={"20px"} /> */}
            <div style={{display: "flex"}}>
            <img className='tree' style={{marginLeft: "10px", marginTop: "5px"}}src={present.src} width={"30px"} height={"7px"} />
            <p className={styles.p}>Santa delivered</p>
            </div>
            <div style={{display: "flex"}}>
            <img className='tree'style={{marginLeft:"10px", marginTop: "5px"}} src={santa.src} width={"30px"} height={"7px"} />
            <p className={styles.p}>Santa is here</p>
            </div>
        </div>
    );
}
