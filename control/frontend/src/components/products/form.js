import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { AddProduct } from '../../reducers/products'

class FormProducts extends Component {

    static propTypes = {
        AddProduct: propTypes.func.isRequired,
    }

    state = {
        name: '',
        price: '',
        description: '',
        category: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { name, price, description, category } = this.state
        const product = { seller:"http://127.0.0.1:8000/api/sellers/1/", name, description, price, category}
        this.props.AddProduct(product)
    }

    render() {
        const { name, price, description, category } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="inp_nombre" className="form-label">Nombre</label>
                    <input type="text" name="name" className="form-control" id="inp_nombre" onChange={this.onChange} value={name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_description" className="form-label">Descripcion</label>
                    <input type="text" name="description" className="form-control" id="inp_description" onChange={this.onChange} value={description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_category" className="form-label">Categoria</label>
                    <input type="text" name="category" className="form-control" id="inp_category" onChange={this.onChange} value={category}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_price" className="form-label">Precio</label>
                    <input type="number" name="price" className="form-control" id="inp_price" onChange={this.onChange} value={price}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    };
}

export default connect(null, {AddProduct})(FormProducts)
