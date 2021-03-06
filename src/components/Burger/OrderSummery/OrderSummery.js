import React from 'react';
import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
    const ingredientsSummery = Object.keys(props.ingredients)
        .map(igKey=>{
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]} 
            </li> 
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicios burger with the following ingredients:</p>
            <ul>
                {ingredientsSummery}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.cont}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummery;