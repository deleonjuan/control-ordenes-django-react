import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProductsAnnonimous } from '../../reducers/products'

class Dashboard extends Component {

    state = {
        isLogin: false
    }

    static propTypes = {
        products: propTypes.array.isRequired,
        auth: propTypes.object.isRequired,
        GetProductsAnnonimous: propTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.GetProductsAnnonimous()
        if (this.props.auth.token !== null) this.setState({ isLogin: true })
    }

    onBuy = e => {
        console.log(`${e.name} comprado`);
    }

    render() {
        const { isLogin } = this.state
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
                                    { isLogin &&
                                        <td>
                                            <button
                                                onClick={() => this.onBuy(product)}
                                                className="btn btn-primary btn-sm">
                                                Comprar
                                        </button>
                                        </td>
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

export default connect(mapStateToProps, { GetProductsAnnonimous })(Dashboard)