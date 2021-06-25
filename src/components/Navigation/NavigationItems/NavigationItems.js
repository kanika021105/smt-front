import React, { useContext } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import classes from './NavigationItems.module.css';
import { AuthContext } from '../../../containers/Context/AuthContext';

const NavigationItems = () => {
    const { isLoggedIn, role } = useContext(AuthContext);

    let navItem = (
        <Nav className="mr-auto">
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
        </Nav>
    );

    if (isLoggedIn) {
        if (role === 'admin') {
            navItem = (
                <Nav className="mr-auto">
                    <LinkContainer to="/admin/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>

                    {/* <NavDropdown title="Orders" id="collasible-nav-dropdown"> */}
                    <LinkContainer to="/admin/orders">
                        <Nav.Link>Order History</Nav.Link>
                        {/* <NavDropdown.Item>Order History</NavDropdown.Item> */}
                    </LinkContainer>

                    {/* <LinkContainer to="/admin/refills">
                            <NavDropdown.Item>Refills</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown> */}

                    <LinkContainer to="/admin/categories">
                        <Nav.Link>Categories</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/admin/services">
                        <Nav.Link>Services</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/admin/transactions">
                        <Nav.Link>Transactions</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/admin/support">
                        <Nav.Link>Support</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/admin/clients">
                        <Nav.Link>Clients</Nav.Link>
                    </LinkContainer>

                    <NavDropdown title="Setting" id="collasible-nav-dropdown">
                        <LinkContainer to="/admin/settings">
                            <NavDropdown.Item>Website</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/api-provider">
                            <NavDropdown.Item>Api Provider</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            );
        }

        if (role === 'user') {
            navItem = (
                <Nav className="mr-auto">
                    <LinkContainer to="/dashboard">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/new-order">
                        <Nav.Link>New Order</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/orders">
                        <Nav.Link>Order History</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/services">
                        <Nav.Link>Services</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/support">
                        <Nav.Link>Support</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/add-fund">
                        <Nav.Link>Add Fund</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/transactions">
                        <Nav.Link>Transactions</Nav.Link>
                    </LinkContainer>

                    {/* <LinkContainer to="/api/docs">
                        <Nav.Link>API</Nav.Link>
                    </LinkContainer> */}
                </Nav>
            );
        }
    }

    return <ul className={classes.NavigationItems}>{navItem}</ul>;
};

export default NavigationItems;
