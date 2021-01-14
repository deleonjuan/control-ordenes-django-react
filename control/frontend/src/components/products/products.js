import React, { Component, component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { GetProducts } from '../../reducers/products'


// const Products = props => {

//     // const [products, setProducts] = useState(propTypes.array.isRequired)

//     static propTypes = {
//         products: propTypes.array.isRequired
//     }
//     // useEffect(() => {
//     //     GetProducts()
//     //     // console.log(products);
//     // }, [])

//     return (
//         <div>
//             <h1>Productos</h1>
//         </div>
//     )
// }

export class Products extends Component {

    static propTypes = {
        products: propTypes.array.isRequired
    }

    componentDidMount(){
        this.props.GetProducts()
    }

    render() {
        return (
            <div>
                <h1>Productos</h1>
                {
                    this.props.products.map(pr => (
                        <label>{ pr.name} </label>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products
})

export default connect(mapStateToProps, { GetProducts })(Products)