import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Category deleted successfully');
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category');
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image?.url || ''
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await api.post('/upload', uploadData, config);
      setFormData(prev => ({ ...prev, image: response.data.image }));
      toast.success('Image uploaded');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const categoryData = {
        name: formData.name,
        description: formData.description,
        image: formData.image ? { url: formData.image } : null
      };

      if (editingCategory) {
        const response = await api.put(`/categories/${editingCategory._id}`, categoryData);
        setCategories(categories.map(c => c._id === editingCategory._id ? response.data.category : c));
        toast.success('Category updated successfully');
      } else {
        const response = await api.post('/categories', categoryData);
        setCategories([...categories, response.data.category]);
        toast.success('Category created successfully');
      }
      
      setShowModal(false);
      setFormData({
        name: '',
        description: '',
        image: ''
      });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/50';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading categories...</div>;

  return (
    <div className="admin-categories">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Categories</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '250px' }}
          />
          <button 
            style={{ background: '#32CD32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={handleAddNew}
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Image</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Slug</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(category => (
              <tr key={category._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>
                  <img 
                    src={getImageUrl(category.image?.url)}
                    alt={category.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                </td>
                <td style={{ padding: '15px' }}>{category.name}</td>
                <td style={{ padding: '15px' }}>{category.slug}</td>
                <td style={{ padding: '15px' }}>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleEdit(category)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}
                    onClick={() => handleDelete(category._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '30px', borderRadius: '10px', width: '500px', maxWidth: '90%',
            maxHeight: '90vh', overflowY: 'auto', position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              <FaTimes />
            </button>
            
            <h2 style={{ marginBottom: '20px' }}>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category Image</label>
                <div style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', borderRadius: '5px', cursor: 'pointer' }}>
                  {formData.image ? (
                    <div style={{ position: 'relative' }}>
                      <img src={getImageUrl(formData.image)} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <label style={{ cursor: 'pointer', display: 'block', width: '100%' }}>
                      <FaCloudUploadAlt size={40} color="#ccc" />
                      <p style={{ marginTop: '10px', color: '#666' }}>Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                  {uploading && <p style={{ color: '#3498db', marginTop: '10px' }}>Uploading...</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#32CD32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.7 : 1
                }}
              >
                {uploading ? 'Processing...' : (editingCategory ? 'Update Category' : 'Add Category')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
