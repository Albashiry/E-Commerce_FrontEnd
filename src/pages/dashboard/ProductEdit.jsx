import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { CATEGORIES, PRODUCT } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import "../../assets/styles/dashboard/dashboard.css";
import uploadIcon from "../../assets/images/upload.ico";

export default function ProductEdit() {
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: ''
  });
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  // get all categories to fill the select items
  useEffect(() => {
    focusRef.current.focus();
    Axios.get(`/${CATEGORIES}`)
      .then(result => {
        setCategories(result.data);
        setForm({ ...form, category: result.data.data[0].id }); // set initial catagory as the first one
      })
      .catch((error) => console.log(error));
  }, []);

  // get data
  useEffect(() => {
    Axios.get(`/${PRODUCT}/${id}`)
      .then(result => {
        setForm(result.data[0]);
        setImagesFromServer(result.data[0].images);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    (images.length > 0) && uploadImages();
  }, [images]);

  const focusRef = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);

  const omit = useRef(0); // to delete the first option in select after the first change
  const j = useRef(-1);
  const ids = useRef([]);


  async function handleChange(e) {
    omit.current.style.display = 'none';
    // setForm({ ...form, [e.target.id]: e.target.value });   
    setForm(form => ({ ...form, [e.target.id]: e.target.value })); // call useEffect that calls handleSubmitForm
  }

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
        ids.current[j.current] = response.data.id; // get the image id to delete it
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function handleImagesChange(e) {
    setImages(prevImages => [...prevImages, ...e.target.files]); // call uploadImages
    // const imagesAsFiles = e.target.files;
  }

  async function handleImageDelete(id, file) {
    const findId = ids.current[id];
    try {
      const response = await Axios.delete(`product-img/${findId}`).then((data) =>
        console.log(data)
      );
      setImages(prev => prev.filter((img) => img !== file));
      ids.current = ids.current.filter((id => id !== findId));
      j.current--;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageDeleteFromServer(id) {
    setImagesFromServer(prev => prev.filter((img) => img.id !== id));
    setIdsFromServer(prev => [...prev, id]);
    // delete images when save
  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`product-img/${idsFromServer[i]}`);
      }
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
          />
        </Form.Group>

        <div
          onClick={() => openImage.current.click()}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 flex-column"
          style={{ border: '2px dashed #0086fe', cursor: 'pointer' }}
        >
          <img
            src={uploadIcon}
            alt="Upload Here" width={'100px'}
          />
          <p className="fw-bold mb-0" style={{ color: '#0086fe' }}>Upload Images</p>
        </div>

        <div className="d-flex align-items-start flex-wrap gap-2">
          {/* imagesFromServerShow */}
          {imagesFromServer.map((img, index) => (
            <div key={index} className="border p-2 col-2 position-relative">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <img src={img.image} alt={img.name} width={'150px'} height={'90px'} />
              </div>
              <div
                className="position-absolute top-0 end-0 bg-danger rounded text-white"
                style={{ cursor: 'pointer' }}
              >
                <p className="py-1 px-2 m-0" onClick={() => handleImageDeleteFromServer(img.id)}>x</p>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column my-3 gap-2">
          {/* imagesShow */}
          {images.map((img, index) => (
            <div key={index} className="border p-2 rounded">
              <div className="d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center justify-content-between gap-2">
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
                <Button onClick={() => handleImageDelete(img, index)} variant="danger">Delete</Button>
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