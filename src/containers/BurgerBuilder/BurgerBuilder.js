import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchase: false,
        loading: false,
        error: false
    }
    
    componentDidMount() {
        axios.get('https://react-burger-cbebf.firebaseio.com/ingredients.json')
            .then(response=>{
                //console.log(response.data);
                this.setState({ingredients: response.data});
            })
            .catch(()=>
                this.setState({error:true})
            );
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
               return ingredients[igKey]; 
            })
            .reduce((sum, el)=>{
                return sum+el
            }, 0);
        
        this.setState({purchaseable: sum>0});
    }

    addIngredientHandler = (type) => {
        //console.log(type);
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchase: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchase: false});
    }

    purchaseContinueHandler = () => {
        //alert("You continue your order!!");
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'David Mao',
                address: {
                    street: '1 East Loop Road',
                    zipCode: '300',
                    country: 'USA'
                },
                email: 'davidmao8419@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => this.setState({loading: false, purchase:false}))
            .catch(error => this.setState({loading: false, purchase:false}));
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        
        let burger = this.state.error? <p>Something went wrong</p> : <Spinner/>;
        let orderSummery = <Spinner/>;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        order={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummery = <OrderSummery ingredients={this.state.ingredients} price={this.state.totalPrice}
        cancel={this.purchaseCancleHandler} cont={this.purchaseContinueHandler}/> ;
        }
        if(this.state.loading) {
            orderSummery = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchase} closeModal={this.purchaseCancleHandler}>
                    {orderSummery}            
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;