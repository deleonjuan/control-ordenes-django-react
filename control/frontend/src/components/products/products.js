import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProducts, DeleteProduct } from '../../reducers/products'
import FormProducts from './form'

export class Products extends Component {

    state = {
        forEdit: null,
        forDelete: null
    }

    static propTypes = {
        sales: propTypes.array.isRequired,
        myproducts: propTypes.array.isRequired,
        GetProducts: propTypes.func.isRequired,
        DeleteProduct: propTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.myproducts.length < 1) this.props.GetProducts()
    }

    _getStats(id) {
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

    onDeleteProduct = () => {
        const { forDelete } = this.state
        // this.props.DeleteProduct.bind(this, forDelete)
        this.props.DeleteProduct(forDelete)
    }

    render() {
        return (
            <div>
                <h1>Mis Productos</h1>

                <button onClick={() => this.setState({ forEdit: null })} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Nuevo
                </button>

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
                                            // onClick={this.props.DeleteProduct.bind(this, product.id)}
                                            onClick={() => this.setState({ forDelete: product.id })}
                                            data-bs-toggle="modal"
                                            data-bs-target="#ModalDelete"
                                            className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                        <button
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.setState({ forEdit: product })}
                                            className="btn btn-warning btn-sm ml-1">
                                            Editar
                                        </button>
                                    </td>

                                </tr>

                            ))
                        }
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.forEdit === null ? "Nuevo" : "Editar"}</h5>
                            </div>
                            <div className="modal-body">
                                <FormProducts product={this.state.forEdit} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="ModalDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Comprar</h5>
                            </div>
                            <div className="modal-body">
                                Esta seguro de eliminar este articulo
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.onDeleteProduct}>Si, Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    sales: state.sales.sales,
    myproducts: state.products.myproducts
})

export default connect(mapStateToProps, { GetProducts, DeleteProduct })(Products)