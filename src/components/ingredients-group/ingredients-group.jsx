import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-group.module.css';
import {ingredients} from '../../utils/ingredients';
import Ingredient from '../ingredient/ingredient';

class IngredientsGroup extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.setState({
            data: ingredients.filter((item) => item.type === this.props.group)
        });
    }

    render() {
        return (
            <>
                <h2 className={`${styles.header} text text_type_main-medium pb-5 pt-5`}>
                    {this.props.name}
                </h2>
                {
                    this.state.data && (
                        <ul className={styles.body}>
                            {this.state.data.map(item => (
                                <Ingredient data={item} key={item._id} />
                            ))}
                        </ul>
                    )
                }
            </>
        );
    }
}

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired
};

export default IngredientsGroup;