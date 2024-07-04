import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import TourDate from '../components/Tour Date/TourDate.jsx';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message.jsx' 
import Paginate from '../components/Paginate/Paginate';
import Meta from '../components/Meta/Meta.jsx';
import { useGetTourDatesQuery } from '../slices/tourDatesApiSlice.js';

function TourDates() {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, error } = useGetTourDatesQuery({ keyword, pageNumber });
    
  return (
    <>
        {isLoading ? (
            <Loader />
        ) : error ? (<Message variant={'danger'}>{ error?.data?.message || error.error}</Message>) : (
        <>
            <Meta title="Ryan Mitch Tour Dates"/>
            <h1>Tour Dates</h1>
            <Row style={{justifyContent: 'center', width: 'inherit'}}>
                {data.tourDates.map(tourDate => (
                    <Col key={tourDate._id} sm={12} md={6} lg={4} xl={3}>
                        <TourDate tourDate={tourDate} style={{display: 'content'}}/>
                    </Col>
                ))}
            </Row>
            <Paginate 
            pages={data.pages} 
            page={data.page}
            keyword={keyword ? keyword : ''}
            />

            {keyword && data.pages < 1 && <Message variant={'info'}>No tour dates found</Message>}
        </>
        )}
    </>
  )
}

export default TourDates