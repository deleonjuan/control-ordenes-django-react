import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetSales } from '../../reducers/sales'

class Sales extends Component {

    static propTypes = {
        sales: propTypes.array.isRequired,
        myproducts: propTypes.array.isRequired,
        GetSales: propTypes.func.isRequired
    }

    componentDidMount() {
        if(this.props.sales.length < 1) this.props.GetSales()

    }

    _calculateEarnings() {
        let ganancias = 0
        
        this.props.sales.map(e => {
            ganancias += e.total
        })
        return ganancias
    }

    _promedioPrecios(){
        let suma_precios = 0
        let promedio = 0

        this.props.myproducts.map(pr => {
            suma_precios += pr.price
        })

        if(this.props.myproducts.length > 0) promedio = suma_precios/this.props.myproducts.length

        return promedio
    }

    render() {
        return (
            <div className="card py-2 px-4 mb-4">
                <h1>Ventas</h1>
                <h3>Total ventas: {this.props.sales.length}</h3>
                <h3>Dinero ganado: Q{this._calculateEarnings()}</h3>
                <h3>Promedio de precios: Q{this._promedioPrecios()}</h3>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sales: state.sales.sales,
    myproducts: state.products.myproducts,
})

export default connect(mapStateToProps, { GetSales })(Sales)