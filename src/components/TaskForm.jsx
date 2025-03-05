
import {useFormik} from "formik"
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import magic from "../icons/magic.gif"
import TakePic from "./takePic";
import { useParams } from "react-router-dom";
import PriorityDropdown from "./prioritiesDDList";


const validateImage = (value) => {
    if (!value) {
      return true; // Optional, allow no file
    }
    if (value.type !== 'image/jpeg' && value.type !== 'image/png') {
      return new Yup.ValidationError('Only JPEG and PNG files are allowed');
    }
    if (value.size > 1024 * 1024) { // 1MB limit
      return new Yup.ValidationError('File size must be less than 1MB');
    }
    return true;
  };

const validationSchema=Yup.object({
    title:Yup.string().max(15,"title must be max 15").required("this field is mandatory"),
    dueDate:Yup.string().max(15,"max characters is 15").required("this field is mandatory"),
    image: Yup.mixed().test('fileType', 'Invalid File', validateImage).optional(),
    isPublic: Yup.boolean(),
})

const createTask = async(taskData)=>{
    const res=await axios.post("http://127.0.0.1:8000/tasks/addtask",taskData)
    return res.data

}

async function fetchTask(taskid) {

    const res = await axios.get(`http://localhost:8000/tasks/${taskid}`);
    return res.data; 
  }

 
  const TaskForm = () => {
    // Mutation to create the task
    const mutation = useMutation({ mutationFn: createTask });
  
    // Formik setup
    const formik = useFormik({
      initialValues: {
        title: "",
        dueDate: "",
        image: "",
        isPublic: true,
        priority_id: "",
        user_id: "", // user_id will be added dynamically
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // Get the user_id from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user ? user.id : null; // Safely retrieve the user ID
        console.log("user id",user_id)
        if (user_id) {
          // Include user_id in the task data
          const taskData = {
            ...values,
            user_id: user_id,
            isPublic: values.isPublic ? 1 : 0,
          };
  
          // Handle image if present
          if (values.image) {
            if (values.image instanceof File) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const dataToSend = {
                  ...taskData,
                  image: reader.result, // Send image data as a base64 string
                };
                mutation.mutate(dataToSend);
              };
              reader.readAsDataURL(values.image);
            } else if (typeof values.image === "string") {
              const dataToSend = {
                ...taskData,
                image: values.image, // If it's already a base64 string
              };
              mutation.mutate(dataToSend);
            }
          } else {
            mutation.mutate(taskData); // No image, just send the task data
          }
  
          // Optionally reload page or redirect
          window.location.reload();
        } else {
          console.error("User is not authenticated.");
        }
      },
    });
  
    const handleImageCapture = (dataURL) => {
      console.log("Captured data URL:", dataURL);
      formik.setFieldValue("image", dataURL);
    };
  
    return (
      <div className="add-container">
        <form onSubmit={formik.handleSubmit} className="add-task">
          <label>Task Title:</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && <p>{formik.errors.title}</p>}
  
          <label>Task Due Date:</label>
          <input
            type="text"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
          />
          {formik.touched.dueDate && formik.errors.dueDate && <p>{formik.errors.dueDate}</p>}
  
          <label>Add Image (Optional)</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
          />
          {formik.touched.image && formik.errors.image && <p>{formik.errors.image.message}</p>}
  
          <label className="checkbox-label">
            Make It Public?
            <input
              type="checkbox"
              name="isPublic"
              checked={formik.values.isPublic}
              onChange={() => {
                formik.setFieldValue("isPublic", !formik.values.isPublic);
              }}
            />
          </label>
          {formik.touched.isPublic && formik.errors.isPublic && <p>{formik.errors.isPublic.message}</p>}
  
          <TakePic onCapture={handleImageCapture} />
          <PriorityDropdown value={formik.values.priority_id} onChange={formik.handleChange} />
          {formik.touched.priority_id && formik.errors.priority_id && <p>{formik.errors.priority_id}</p>}
  
          <button type="submit">
            Create Task
            <img src={magic} alt="Icon" style={{ height: "2rem", width: "2rem" }} />
          </button>
        </form>
      </div>
    );
  };
  
  export default TaskForm;