import { useState, useEffect } from "react";
import { supabase } from './supabase'; // Importing supabase client
import './styles/AdminPanel.css'

function AdminPanel() {
    // State to hold the list of items fetched from the database
    const [item, setItem] = useState([]);
    // State to hold the new record being added
    const [newRecord, setNewRecord] = useState({
        item: '',
        class: '',
        description: '',
        containment: '',
        image: ''
    });
    // State to hold the record currently being edited
    const [editRecord, setEditRecord] = useState(null);

    // useEffect hook to fetch items from the database when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('*');
            if (error) {
                console.error(error); // Log any errors
            } else {
                setItem(data); // Set the fetched data to the state
            }
        };
        fetchItems(); // Call the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    const addItem = async () => {
        const { data, error } = await supabase.from('scp').insert([{
            item: newRecord.item,
            class: newRecord.class,
            description: newRecord.description, 
            containment: newRecord.containment,
            image: newRecord.image
        }]);
    
        if (error) {
            console.error('Error adding item:', error);
        } else {
            console.log('Item added:', data);
            setNewRecord({ item: '', class: '', description: '', containment: '', image: '' }); // Reset the new record state
            window.location.reload(); // Refresh the page to show the new record
        }
    };
    

    // Function to delete a record from the database
    const deleteItem = async (id) => {
        await supabase.from('scp').delete().eq('id', id); // Delete the record with the specified id
        window.location.reload(); // Refresh the page to reflect the deletion
    };

    // Function to set the record to be edited
    const startEditing = (item) => {
        setEditRecord(item); // Set the editRecord state to the item being edited
    };

    // Function to save the updated record to the database
    const saveEdit = async (id) => {
        await supabase.from('scp').update(editRecord).eq('id', id); // Update the record with the specified id
        setEditRecord(null); // Clear the editRecord state
        window.location.reload(); // Refresh the page to show the updated record
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            <h3>Add New Record</h3>
            <div className="container">
                {/* Input fields for adding a new record */}
                <input value={newRecord.item} onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} placeholder="item" />
                <input value={newRecord.class} onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} placeholder="class" />
                <input value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} placeholder="description" />
                <input value={newRecord.containment} onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} placeholder="containment" />
                <input value={newRecord.image} onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })} placeholder="image" />
                <button onClick={addItem}>Submit</button> {/* Add this button */}
            </div>
            <ul>
                {item.map((item) => (
                    <li className='container' key={item.id}>
                        {editRecord && editRecord.id === item.id ? (
                            <div className="container">
                                {/* Input fields for editing the record */}
                                <input  value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                                <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                                <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                                <input value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                                <input value={editRecord.image} onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })} />
                                <button onClick={() => saveEdit(item.id)}>Save</button>
                                <button onClick={() => setEditRecord(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                {/* Display the item details */}
                                <p>{item.item}</p>
                                <button onClick={() => startEditing(item)}>Edit</button>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
