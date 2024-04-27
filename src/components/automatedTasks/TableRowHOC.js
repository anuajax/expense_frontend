import React, { useState } from "react";
import axios from "axios";

const withDelete = (WrappedComponent) => {
  const ComponentWithDelete = (props) => {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`https://expenses-8tag.onrender.com/users/${props.userId}/items-recurring/${id}`);
        console.log(response.data);
        alert("Task Item deleted");
        props.setTableUpdated(!props.tableUpdated);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    };
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    }
     const handleChange = (event) => {
      setFormData(()=> ({
          ...formData,
          [event.target.name] : event.target.value
        }))
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsEditing(false);
    }

    // Spread props to pass any additional props through the HOC
    return <WrappedComponent handleDelete={handleDelete} {...props} isEditing={isEditing} handleEditToggle={handleEditToggle} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>;
  };

  return ComponentWithDelete;
};

export default withDelete;
