import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
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
        cursor: 'pointer'
    }
});

function AppAppBar(props) {
    const { classes } = props;

    let emotionTag = null;

    switch (props.emotion) {
        case 'angry':
            emotionTag = <i className="em em-angry"></i>
            break;
        case 'disgust':
            emotionTag = <i className="em em-nauseated_face"></i>
            break;
        case 'fear':
            emotionTag = <i className="em em-fearful"></i>
            break;
        case 'happy':
            emotionTag = <i className="em em-smile"></i>
            break;
        case 'sad':
            emotionTag = <i className="em em-cry"></i>
            break;
        case 'surprise':
            emotionTag = <i className="em em-astonished"></i>
            break;
        case 'neutral':
            emotionTag = <i className="em em-no_mouth"></i>
            break;
        default:
            emotionTag = <i className="em em-thinking_face"></i>
    }

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                    >
                        {'Emotion Recognition'}
                    </Link>
                    <div className={classes.right}>
                        {emotionTag}
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);