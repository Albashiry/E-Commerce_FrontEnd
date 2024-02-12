import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { PRODUCTS, PRODUCT } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  // get all products
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then(result => {
        setProducts(result.data.data);
        console.log(result);
        setTotalData(result.data.total); // get total data count from backend
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: 'images',
      name: 'Images'
    },
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'price',
      name: 'Price'
    },
    {
      key: 'rating',
      name: 'Rating'
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
      await Axios.delete(`${PRODUCT}/${id}`);
      setProducts(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Products Page</h3>
        <Link to='/dashboard/product/add' className="btn btn-primary">
          Add Product
        </Link>
      </div>

      <TableShow
        header={header}
        data={products}
        handleDelete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalData={totalData}
        loading={loading}
        searchIn='title'
        searchLink={PRODUCT}
      />
    </>
  );
}