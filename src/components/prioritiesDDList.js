import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPriorities = async () => {
  const res = await axios.get("http://localhost:8000/priorities/allpriorities");
  return res.data;
};

const PriorityDropdown = ({ value, onChange }) => {
  const { data: priorities, isLoading } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  return (
    <div>
      <label style={{marginRight:"7px"}}>Priority:</label>
      {isLoading ? (
        <p>Loading priorities...</p>
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
