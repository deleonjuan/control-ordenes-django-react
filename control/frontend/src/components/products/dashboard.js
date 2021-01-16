import React, { Component, Fragment } from 'react';

import Sales from './sales'
import Products from './products'

const productosDashboard = props => {
    return (
        <div className="mt-4">
            <Sales/>
            <Products/>
        </div>
    )
}

export default productosDashboard