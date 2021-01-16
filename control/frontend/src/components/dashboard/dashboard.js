import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProductsAnnonimous } from '../../reducers/products'
import { AddSale } from '../../reducers/sales'

class Dashboard extends Component {

    state = {
        productToBuy: null
    }

    static propTypes = {
        products: propTypes.array.isRequired,
        auth: propTypes.object.isRequired,
        GetProductsAnnonimous: propTypes.func.isRequired,
        AddSale: propTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.products.length < 1) this.props.GetProductsAnnonimous()
    }

    onBuy = () => {
        const { productToBuy } = this.state
        const sale = {
            seller: productToBuy.seller,
            product: productToBuy.id,
            total: productToBuy.price,
            quantity: 1
        }

        this.props.AddSale(sale)
        alert("Producto comprado exitosamente")
    }

    render() {
        const { user, isLogin } = this.props.auth;
        return (
            <div>
                <h1>Lista de productos</h1>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            {isLogin &&
                                <th>Opciones</th>
                            }
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
                                    { isLogin && (
                                        product.seller !== user.id ?
                                            (
                                                <td>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ModalConfirm"
                                                        onClick={() => this.setState({ productToBuy: product })}
                                                        className="btn btn-primary btn-sm">
                                                        Comprar
                                                    </button>
                                                </td>
                                            ) : (
                                                <td>
                                                    <strong>Este producto es mio</strong>
                                                </td>
                                            )
                                    )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="modal fade" id="ModalConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Comprar</h5>
                            </div>
                            <div className="modal-body">
                                Esta seguro de comprar este articulo
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.onBuy}>Si, Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    auth: state.auth,
})

export default connect(mapStateToProps, { GetProductsAnnonimous, AddSale })(Dashboard)