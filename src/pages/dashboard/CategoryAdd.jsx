import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import { CATEGORY } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function CategoryAdd() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

    // handle focus
    const focusRef = useRef();
    useEffect(() => focusRef.current.focus(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // How to deal with images
    const form = new FormData();
    form.append('title', title);
    form.append('image', image);
    try {
      await Axios.post(`${CATEGORY}/add`, form);
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
            ref={focusRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button disabled={title.length < 1} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}