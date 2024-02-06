import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { CATEGORIES, CATEGORY } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // get all categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then(result => setCategories(result.data))
      .catch((error) => console.log(error));
  }, []);

  const header = [
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'image',
      name: 'Image'
    },
  ];

  async function handleDelete(id) {
    try {
      await Axios.delete(`${CATEGORY}/${id}`);
      setCategories(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Categories Page</h3>
        <Link to='/dashboard/category/add' className="btn btn-primary">
          Add Category
        </Link>
      </div>

      <TableShow
        header={header}
        data={categories}
        handleDelete={handleDelete}
      />
    </>
  );
}