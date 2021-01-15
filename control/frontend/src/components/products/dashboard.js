import React, { Component, Fragment } from 'react';

import Sales from './sales'
import Products from './products'
import FormProducts from './form'

const productosDashboard = props => {
    return (
        <>
            <Sales/>
            {/* <FormProducts /> */}
            <Products />
        </>
    )
}

export default productosDashboard