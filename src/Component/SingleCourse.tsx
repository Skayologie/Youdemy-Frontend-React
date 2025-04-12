import React, { useState } from 'react';
import { Share2, Heart, ShoppingBag, Edit, X, Delete, Trash } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import SelectOption from '../Component/Form'

interface SingleCourseProps {
  title: string;
  content: string;
  category: string;
  description: string;
  price?: string;
  imageUrl?: string;
}


function SingleCourse({
  title: initialTitle,
  content: initialContent,
  category: initialCategory,
  description: initialDescription,
  price: initialPrice = "29.00",
  imageUrl = "https://i.pinimg.com/736x/72/3f/66/723f6680a44137670ab57b8e2b1b872c.jpg"
}: SingleCourseProps) {

  const apiUrl: string = import.meta.env.VITE_URL_API;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: initialTitle,
    content: initialContent,
    category_id: initialCategory,
    description: initialDescription,
    price: initialPrice,
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { id } = useParams(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
  
    try {
      const payload = JSON.stringify(formData);
      console.log("this is the payload: " + formData);
  
      const response = await axios.put(
        `${apiUrl}/Courses/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response){
        console.log("✅ Success:", response);
        toast.success(response.data.message);
      }else{
        console.error("❌ Error:");

      }
      
    } catch (error: any) {
      console.error("❌ Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const navigate = useNavigate();
  const handleDelete = async (e) =>{
    e.preventDefault();
    try{
        const response = await axios.delete(
        `${apiUrl}/Courses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response){
        toast.success(response.data.original.message);
        navigate('/');

      }else{
        console.error("❌ Error:");

      }
    }catch(error ){
      console.error("❌ Error:", error);

    }
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                aria-label={isEditing ? "Cancel edit" : "Edit"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 
                  <X className="w-5 h-5 text-gray-600" /> : 
                  <Edit className="w-5 h-5 text-gray-600" />
                }
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                aria-label="Share"
              >
                <Trash className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-[350px] overflow-hidden">
            <span className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
              New
            </span>
            <div className="h-[350px]">
              <img
                src={imageUrl}
                alt={formData.title}
                className="w-full rounded-lg shadow-lg h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-semibold text-gray-900">{formData.title}</h1>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${formData.price}</span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {formData.content}
                </p>

                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {formData.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Category: <a href="#" className="text-blue-600 hover:underline transition duration-200">{formData.category_id}</a>
                    </p>
                  </div>
                </div>

                <button 
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 
                    transition duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>ADD TO CART</span>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleCourse;