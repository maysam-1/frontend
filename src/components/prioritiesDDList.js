import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPriorities = async () => {
  try {
    const res = await axios.get("http://localhost:8000/priorities/allpriorities");
    return res.data;
  } catch (error) {
    console.error("Error fetching priorities:", error.message);
    throw error; 
  }
};

const PriorityDropdown = ({ value, onChange }) => {
  const { data: priorities, isLoading, error } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  return (
    <div>
      <label style={{ marginRight: "7px" }}>Priority:</label>
      {isLoading ? (
        <p>Loading priorities...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Failed to load priorities.</p> 
      ) : (
        <select className="priority-dd" name="priority_id" value={value} onChange={onChange}>
          <option value="" disabled>Select a priority</option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>{priority.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PriorityDropdown;
