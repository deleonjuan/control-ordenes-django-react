import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProducts, DeleteProduct } from '../../reducers/products'

export class Products extends Component {

    static propTypes = {
        sales: propTypes.array.isRequired,
        myproducts: propTypes.array.isRequired,
        GetProducts: propTypes.func.isRequired,
        DeleteProduct: propTypes.func.isRequired
    }

    componentDidMount() {
        this.props.GetProducts()
    }

    _getStats(id){

        let cantidad = 0
        let recolectado = 0

        let venta = this.props.sales.filter(pr => pr.product === id)

        venta.map(v => {
            cantidad++
            recolectado += v.total
        })

        return (
            <div className="d-flex flex-column">
                <label>vendido {cantidad} veces</label>
                <label>Q{recolectado} recolectados</label>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Mis Productos</h1>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>ventas</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.myproducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{this._getStats(product.id)}</td>
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
    sales: state.sales.sales,
    myproducts: state.products.myproducts
})

export default connect(mapStateToProps, { GetProducts, DeleteProduct })(Products)