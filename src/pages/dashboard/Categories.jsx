import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { CATEGORIES, CATEGORY } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  // get all categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then(result => {
        setCategories(result.data.data);
        setTotalData(result.data.total); // get total data count from backend
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // key for backEnd, name for frontEnd table head
  const header = [
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'image',
      name: 'Image'
    },
    {
      key: 'created_at',
      name: 'Created'
    },
    {
      key: 'updated_at',
      name: 'Updated'
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
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalData={totalData}
        loading={loading}
        searchIn='title'
        searchLink={CATEGORY}
      />
    </>
  );
}