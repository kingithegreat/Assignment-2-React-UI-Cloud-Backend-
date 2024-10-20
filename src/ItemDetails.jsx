import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { useParams } from "react-router-dom"; // Importing useParams hook from react-router-dom to access URL parameters
import { supabase } from "./supabase"; // Importing the supabase client
import "./styles/ItemDetails.css"

function ItemDetail() {
    // Extracting the 'id' parameter from the URL
    const { id } = useParams();
    // State to hold the item data fetched from the database
    const [itemData, setItemData] = useState(null);

    // useEffect hook to fetch item details when the component mounts or when 'id' changes
    useEffect(() => {
        const fetchItemsDetails = async () => {
            // Fetching item details from the 'scp' table where the id matches the URL parameter
            const { data, error } = await supabase.from('scp').select('*').eq('id', id).single();
            if (error) {
                console.error(error); // Log any errors
            } else {
                setItemData(data); // Update the state with the fetched data
            }
        };
        fetchItemsDetails(); // Call the fetch function
    }, [id]); // Dependency array with 'id' ensures this runs when 'id' changes

    return (
        <div>
            {
                itemData ? (
                    <div className="container">
                        {/* Display the item details */}
                        <h1 className="text-center">{itemData.item}</h1>
                        <h2>{itemData.class}</h2>
                        <h4>Description</h4>
                        <p>{itemData.description}</p>
                        <h4>Containment</h4>
                        <p>{itemData.containment}</p>
                        {/* Display the item image or a default image if none is provided */}
                       <div className="text-center image-container ">
                       <img className="rounded shadow" src={itemData.image ? itemData.image : "https://kmftvkygybaefqiyqapv.supabase.co/storage/v1/object/public/images/defaultScp.jpg?t=2024-09-16T23%3A19%3A12.795Z"} alt="image" />
                       </div>
                    </div>
                ) : (
                    // Display a loading message while the data is being fetched
                    <p>Loading...</p>
                )
            }
        </div>
    );
}

export default ItemDetail; // Exporting the ItemDetail component as the default export
