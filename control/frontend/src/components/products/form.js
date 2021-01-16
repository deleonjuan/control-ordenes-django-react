import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { AddProduct, UpdateProduct } from '../../reducers/products'

class FormProducts extends Component {

    static propTypes = {
        AddProduct: propTypes.func.isRequired,
        UpdateProduct: propTypes.func.isRequired
    }

    state = {
        id: null,
        name: '',
        price: '',
        description: '',
        category: '',
        isEditing: false
    }

    componentWillReceiveProps(prop) {
        if (prop.product) {
            console.log(prop);
            this.setState({ 
                id: prop.product.id,
                name: prop.product.name,
                price: prop.product.price,
                description: prop.product.description,
                category: prop.product.category,
                isEditing: true
            });
        }else{
            this.setState({isEditing: false})
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        // e.preventDefault()
        const { name, price, description, category } = this.state
        const product = { name, description, price, category }

        if(!this.state.isEditing) this.props.AddProduct(product)
        else this.props.UpdateProduct(product, this.state.id);
    }

    render() {
        const { name, price, description, category } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="inp_nombre" className="form-label">Nombre</label>
                    <input type="text" name="name" className="form-control" id="inp_nombre" onChange={this.onChange} value={name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_description" className="form-label">Descripcion</label>
                    <input type="text" name="description" className="form-control" id="inp_description" onChange={this.onChange} value={description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_category" className="form-label">Categoria</label>
                    <input type="text" name="category" className="form-control" id="inp_category" onChange={this.onChange} value={category} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_price" className="form-label">Precio</label>
                    <input type="number" name="price" className="form-control" id="inp_price" onChange={this.onChange} value={price} />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        )
    };
}

export default connect(null, { AddProduct, UpdateProduct })(FormProducts)
