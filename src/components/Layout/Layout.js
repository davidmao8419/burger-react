import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () => {
        //console.log("clicked");
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
        <Aux>
            <Toolbar clicked={this.sideDrawerToggleHandler}/>
            <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
};

export default Layout;