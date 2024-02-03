import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import { CATEGORY, USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function CategoryEdit() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));
  const {id} = useParams(); //const id = useParams().id;
  const imageReference = useRef("");
  
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`)
      .then(result => {
        setTitle(result.data.title);
        imageReference.current = result.data.image;
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => navigate('/dashboard/categories/nopage', { replace: true }));
  }, []);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append('title', title);
    form.append('image', image);
    try {
      await Axios.post(`${CATEGORY}/edit/${id}`, form);
      window.location.pathname = '/dashboard/categories';
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
      <Form className="bg-white mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title..."
            autoComplete="true"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        <img src={imageReference.current} alt={"image"} height={'200'} className="d-block my-2"/>
        </Form.Group>
        
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}