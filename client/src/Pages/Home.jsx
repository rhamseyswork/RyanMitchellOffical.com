import { Button } from 'react-bootstrap';
import SlideShow from '../components/Slide Show/SlideShow.jsx';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCarousel from '../components/Products/ProductCarousel.jsx';
import Deck from '../components/Slide Show 1/Deck.jsx';


function Home() {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      <h1>Latest News</h1>
      <p>Home screen with animation</p>
      <SlideShow />
      <Deck />
      {!keyword ? <ProductCarousel/> : <Button as={Link} to="/merch" className='btn btn-dark mb-4'>Go Back</Button> }
    </>
  );
}

export default Home;
