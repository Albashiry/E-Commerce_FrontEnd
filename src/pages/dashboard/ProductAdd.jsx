import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { CATEGORIES, PRODUCT } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import "../../assets/styles/dashboard.css";

export default function CategoryAdd() {
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: ''
  });
  const dummyForm = {
    category: null,
    title: 'dummy',
    description: 'dummy',
    price: 99999999,
    discount: 0,
    About: 'About'
  }
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();

  const navigate = useNavigate();

  const focusRef = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);

  // get all categories to fill the select items
  useEffect(() => {
    focusRef.current.focus();
    Axios.get(`/${CATEGORIES}`)
      .then(result => {
        setCategories(result.data);
        // setForm({ ...form, category: result.data[0].id }); // set initial catagory as the first one
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    !sent && handleSubmitForm();
  }, [form, sent]);

  useEffect(() => {
    (images.length > 0) && uploadImages();
  }, [images]);

  const omit = useRef(0); // to delete the first option in select after the first change
  const j = useRef(-1);

  const uploadImages = async () => {
    const formData = new FormData();
    for (let i = j.current + 1; i < images.length; i++) {
      j.current++;
      formData.append('image', images[i]);
      formData.append('product_id', id);
      try {
        const response = await Axios.post("/product-img/add", formData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded / total) * 100);
            if (percent % 5 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute('percent', `${percent}%`);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function handleChange(e) {
    omit.current.style.display = 'none';
    // setForm({ ...form, [e.target.id]: e.target.value });   
    setForm(form => ({ ...form, [e.target.id]: e.target.value }));
    setSent(true);
  }

  async function handleSubmitForm(e) {
    try {
      const response = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImagesChange(e) {
    setImages(prevImages => [...prevImages, ...e.target.files]); // call uploadImages
    // const imagesAsFiles = e.target.files;
  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
      navigate('/dashboard/products');
      // window.location.pathname = '/dashboard/products'; // this way reloads the page
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white mx-2 p-3" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            onChange={handleChange}
            ref={focusRef}
          >
            <optgroup label="Select Category">
              <option ref={omit}>Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>{category.title}</option>
              ))}
            </optgroup>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="title..."
            autoComplete="true"
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="description..."
            autoComplete="true"
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="price..."
            autoComplete="true"
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            value={form.discount}
            onChange={handleChange}
            placeholder="discount..."
            autoComplete="true"
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            value={form.About}
            onChange={handleChange}
            placeholder="about..."
            autoComplete="true"
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImagesChange}
            multiple
            hidden
            ref={openImage}
            disabled={!sent}
          />
        </Form.Group>

        <div
          onClick={() => openImage.current.click()}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 flex-column"
          style={{ border: !sent ? "2px dashed gray" : '2px dashed #0086fe', cursor: sent && 'pointer' }}
        >
          <img
            src={require('../../assets/images/upload.ico')}
            alt="Upload Here" width={'100px'}
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p className="fw-bold mb-0" style={{ color: !sent ? 'gray' : '#0086fe' }}>Upload Images</p>
        </div>

        <div className="d-flex flex-column my-3 gap-2">
          {images.map((img, index) => (
            <div key={index} className="border p-2 rounded">
              <div className="d-flex align-items-center justify-content-start gap-2 p-2">
                <img src={URL.createObjectURL(img)} alt={img.name} width={'150px'} height={'90px'} />
                <div>
                  <p className="mb-1">{img.name}</p>
                  <p className="mb-1">
                    {(img.size / 1024) < 1024
                      ? (img.size / 1024).toFixed(2) + ' KB'
                      : (img.size / (1024 * 1024)).toFixed(2) + ' MB'}
                  </p>
                </div>
              </div>
              <div className="custom-progress">
                <span
                  className="progress-item"
                  // percent = {`${progress[index]}%`}
                  // style = {{width: `${progress[index]}%`}}
                  ref={(e) => (progress.current[index] = e)}
                ></span>
              </div>
            </div>
          ))}
        </div>

        <button disabled={form.title.length < 1} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}