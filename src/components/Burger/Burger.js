import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //console.log(props.ingredients);
    const transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
        //console.log(Array(props.ingredients[igKey]));
        //below use the spread operator to spread a new array I have to construct
        return [...Array(props.ingredients[igKey])].map((_, i)=>{
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'></BurgerIngredient>
        </div>
    );
};

export default burger;