import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export function AdminAddVideo(){
    const[categories , setCategories] = useState([{CategoryId:0, CategoryName:''}]);

    let navigate = useNavigate();

    const formik = useFormik ({
        initialValues : {
            VideoId:0,
            Title: '',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0,
            Comments:['']
        },
        validationSchema : yup.object({

        }),
        onSubmit : (values) => {
            axios.post(`http://127.0.0.1:5050/add-video`,values)
            Swal.fire({
                icon:"success",
                title:"Success",
                text : "Video Added"
            })
            navigate('/admin-dashboard');
        }
    });

    function LoadCategories(){
        axios.get(`http://127.0.0.1:5050/get-categories`).then((response) => {
            response.data.unshift({
                CategoryId : -1,
                CategoryName : 'Select Category'
            })
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
    },[]);


    return(
        <div className="bg-light m-3 p-3 w-50">
            <h4>Admin Add Video</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd>
                        <input type="number" onChange={formik.handleChange} name="VideoId" className="form-control" />
                    </dd>
                    <dt>Video Title</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="Title" className="form-control" /></dd>
                    <dt>URL</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="Url" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea onChange={formik.handleChange} type="text" name="Description" cols="40" rows="2" className="form-control" /></dd>
                    <dt>Likes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Likes" className="form-control" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Dislikes" className="form-control" /></dd>
                    <dt>Views</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Views" className="form-control" /></dd>
                    <dt>Comments</dt>
                    <dd>
                        <input type="text" name="Comments" onChange={formik.handleChange} className="form-control" />
                    </dd>
                    <dt>category</dt>
                    <dd>
                        <select name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange} className="form-select">
                            {
                                categories.map(category => 
                                    <option  key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-outline-success">Add Video</button>
                <Link to="/admin-dashboard" className="btn btn-outline-danger ms-3">Cancel</Link>
            </form>
        </div>

    )
}