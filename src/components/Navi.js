import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, Drawer, 
     IconButton, Divider, Button, Collapse, Avatar, Dialog, DialogContent} from '@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';     
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Cart from '../containers/Cart';
import '../App.css';

const drawerWidth = 240;
//STYLE
const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    width:'100%',
    textDecoration: 'none',
    outline: '0',
  },

  appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },

  logout:{
    marginRight: 20,
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
 
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
    marginRight: 20,
  },

  cart:{
  
  [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginRight: 20,
  },
   
  },

  toolbar:{
    paddingRight:0,
  }

});


class Navi extends React.Component{
    constructor(props) {
        super(props);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.displayAvatar = this.displayAvatar.bind(this);
        this.handleCartOpen = this.handleCartOpen.bind(this);
        this.handleCartClose = this.handleCartClose.bind(this);
        this.state = {
          open: false,
          nestOpen: false,
          cartOpen: false
        };  
      }  

    handleDrawerOpen(){
        this.setState({ open: true });
      };
    
    handleDrawerClose(){
        this.setState({ open: false });
      };

    handleClick(){
        this.setState(state => ({ nestOpen: !state.nestOpen }));
    };

    handleCartOpen(){
        this.setState({ cartOpen: true });
    }

    handleCartClose(){
      this.setState({ cartOpen: false });
  }
      
    componentDidMount(){
        this.props.onMount_Nav();
    }

    displayAvatar(){
      let first = this.props.firstname.slice(0,1);
      let last = this.props.lastname.slice(0,1);
      return first.concat(last)
    }

    render(){
        const { classes, theme, genru, error, cart } = this.props;
        const { open } = this.state;
  
        return(
        <div className={classes.root}> 
   
        <AppBar position='fixed' className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
>
        <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}
               className={classNames(classes.menuButton, open && classes.hide)}
               >
             <MenuIcon />
            </IconButton>
            <Typography variant="h6"  color='inherit' noWrap className={classes.title} component={Link} to={`/kcbooks`}>
            <div className='title'>Kansas City BOOKs</div> 
            </Typography>
            <Avatar className={classes.orangeAvatar}>{this.displayAvatar()}</Avatar>
            <Badge badgeContent={cart.length} color="secondary" className={classes.cart} onClick={this.handleCartOpen}>   
                <ShoppingCartIcon />
            </Badge>
            <Button color="inherit" className={classes.logout} onClick={() => this.props.logout()}>
              Logout
            </Button>
          
        </Toolbar>
        </AppBar>  
        <Drawer className={classes.drawer} variant="persistent" anchor="left" 
          open={open} classes={{
            paper: classes.drawerPaper,}} >

        <div>
            <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>

        <Divider />

         {(() => {
                if (error) {
                    return <p>Data load error!</p>
                }else if(typeof genru === 'undefined'){
                    return <p>Loading....</p>
                }else{
                    return(
                        <div>
                            
                            <List style={{width:drawerWidth}}>
                            <ListItem button onClick={this.handleClick}>
                                <ListItemText>Books by Genre</ListItemText>{this.state.nestOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>   
                            <Collapse in={this.state.nestOpen} timeout="auto" unmountOnExit>

                            <List component="div" disablePadding>
                            <ListItem>
                               <Button component={Link} to="/kcbooks/genru/all" onClick={this.handleDrawerClose}>ALL</Button>  
                            </ListItem>
                            {genru.map((item,key) => (
                            <ListItem key={key} className={classes.nested}>
                                <Button component={Link} to={`/kcbooks/genru/${item.id}`} onClick={this.handleDrawerClose}>{item.name}</Button>
                            </ListItem>   
                        ))}
                            </List>
                            </Collapse>
                            </List>
                        </div> 
                    );
                }
                })()}
        </Drawer>

        <Dialog   open={this.state.cartOpen}
                  onClose={this.handleCartClose}
                  aria-labelledby="form-dialog-title"
                  fullWidth
                  maxWidth = 'xs'>
                  <DialogContent>
                        <Cart />
                  </DialogContent>
   
        </Dialog>

        </div>
        )
        
    }
}

Navi.propTypes = {
  classes: PropTypes.object.isRequired,
  genru: PropTypes.array,
  error: PropTypes.oneOf([undefined,true, false]),
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  cart: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(Navi);

