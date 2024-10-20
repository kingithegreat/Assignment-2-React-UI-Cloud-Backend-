import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase"; // Supabase client
import { Navbar, Container, Nav } from 'react-bootstrap'; // Ensure these are imported
import './styles/NavMenu.css'; // Custom CSS for additional styling

function NavMenu() {
    const [items, setItems] = useState([]); // Corrected state setter function

    // Fetch items from Supabase on component mount
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('id, item');
            if (error) {
                console.error(error);
            } else {
                setItems(data); // Corrected state setter function
            }
        };
        fetchItems();
    }, []);

    return (
        // Navbar component with light background, expands on large screens, sticky at the top, rounded corners, dark background, and white text
        <Navbar bg="light" expand="lg" className="sticky-top rounded bg-dark text-white">
            <Container fluid>
                {/* Brand name with custom styling */}
                <Navbar.Brand href="/" className="navbar-brand-custom">SCP</Navbar.Brand>
                {/* Toggle button for collapsing the navbar */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                {/* Collapsible part of the navbar */}
                <Navbar.Collapse id="navbarScroll" className="navbar-scroll">
                    {/* Navigation links with auto margin on the right and vertical scroll if content overflows */}
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {/* Mapping through items to create individual navigation links */}
                        {items.map((item) => (
                            <Nav.Link as={Link} key={item.id} to={`/item/${item.id}`}>{item.item}</Nav.Link>
                        ))}
                        {/* Link to the admin panel */}
                        <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
    
}

export default NavMenu;
