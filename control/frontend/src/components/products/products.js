import React, { Component, component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProducts, DeleteProduct } from '../../reducers/products'

export class Products extends Component {

    static propTypes = {
        products: propTypes.array.isRequired,
        GetProducts: propTypes.func.isRequired,
        DeleteProduct: propTypes.func.isRequired
    }

    componentDidMount() {
        this.props.GetProducts()
    }

    render() {
        return (
            <div>
                <h1>Lista de productos</h1>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Descripcio</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <button
                                            onClick={this.props.DeleteProduct.bind
                                            (this, product.id)}
                                            className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products
})

export default connect(mapStateToProps, { GetProducts, DeleteProduct })(Products)