import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import appStyles from "../App.module.css";
import Form from "react-bootstrap/Form";
import styles from "../App.module.css"
import PropTypes from 'prop-types';

const CategoryFilter = ({ setFilter, mobile }) => {
    const [category, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://sourdoughcircle-api-382dc0f20c45.herokuapp.com/category/');
                const data = await response.json();
                setCategories(data.results);
            } catch (err) {
                // Console.log(err);
            }
        };

        CategoryFilter.propTypes = {
            setFilter: PropTypes.func.isRequired,
            mobile: PropTypes.bool,
          };

        fetchCategories();
    }, []);

    

    return (
        <Container className={`${appStyles.Content} mb-3 ${mobile ? "p-3 text-center container" : ""}`}>
            <Row className="row d-flex justify-content-center">
            <Form.Group controlId="categorySelect">
                <Form.Label>Filter by Category</Form.Label>
                <Form.Control
                    className={styles.Dropdown}
                    as="select"
                    onChange={(e) => setFilter(e.target.value)}
                    defaultValue=""
                >
                    <option value="">All Categories</option>
                    {category.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>
            </Row>
        </Container>
    );
};

export default CategoryFilter;