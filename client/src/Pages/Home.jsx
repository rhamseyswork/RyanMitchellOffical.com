import { Button } from 'react-bootstrap';
import SlideShow from '../components/Slide Show/SlideShow.jsx';
import { useParams, Link } from 'react-router-dom';
import ProductCarousel from '../components/Products/ProductCarousel.jsx';
import Deck from '../components/Slide Show 1/Deck.jsx';
import Hero from '../components/Hero/Hero.jsx';


function Home() {
  const { keyword } = useParams();

  return (
    <>
      <Hero />
      <SlideShow />
      <Deck />
      {!keyword ? <ProductCarousel/> : <Button as={Link} to="/merch" className='btn btn-dark mb-4'>Go Back</Button> }
    </>
  );
}

export default Home;
