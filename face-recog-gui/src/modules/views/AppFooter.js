import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '../components/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    title: {
        fontSize: 24,
    },
    //placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
        backgroundColor: '#500000'
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing.unit * 3,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main
    },
    footer: {
        bottom: 0,
        backgroundColor: '#8CB5CF'
    }
});


function AppFooter(props) {
    const { classes } = props;

    return (
        <div>
            <div position="fixed" className={classes.footer}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Button className={classes.rightLink} onClick={props.predict}>{props.text}</Button>
                    <div className={classes.right}/>
                </Toolbar>
            </div>
            <div className={classes.placeholder} />
        </div>
    );
}

AppFooter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFooter);