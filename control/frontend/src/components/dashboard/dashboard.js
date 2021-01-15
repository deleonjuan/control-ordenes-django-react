import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProductsAnnonimous } from '../../reducers/products'
import { AddSale } from '../../reducers/sales'

class Dashboard extends Component {

    static propTypes = {
        products: propTypes.array.isRequired,
        auth: propTypes.object.isRequired,
        GetProductsAnnonimous: propTypes.func.isRequired,
        AddSale: propTypes.func.isRequired
    }

    componentDidMount() {
        this.props.GetProductsAnnonimous()
    }

    onBuy = e => {
        console.log(`${e.name} comprado`);
        const sale = {
            seller: e.seller,
            product: e.id,
            total: e.price,
            quantity: 1
        }

        this.props.AddSale(sale)
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
                                                        onClick={() => this.onBuy(product)}
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    auth: state.auth,
})

export default connect(mapStateToProps, { GetProductsAnnonimous, AddSale })(Dashboard)