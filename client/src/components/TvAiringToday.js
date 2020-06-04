import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTvShowsAiringToday } from '../actions/tvShowActions'
import { Container, Row, Col } from 'reactstrap'
import noImage from './images/no-movie-image.png';
import Box from './Box';
import Pagination from './Pagination';


const TvAiringToday = ({ airingTvShows, airingTvShowsLoaded, getTvShowsAiringToday }) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        getTvShowsAiringToday(page);
    }, [getTvShowsAiringToday, page])

    const changePage = async pageNum => {
        if (pageNum === 'next') {
            await setPage(page + 1);
        } else if (pageNum === 'prev') {
            await setPage(page - 1);
        } else {
            await setPage(pageNum);
        }
        getTvShowsAiringToday(page);
        window.scrollTo({ top: 0 });
    }

    return (
        <div>
            {airingTvShowsLoaded &&
                <div>
                    <Container className='text-center mt-4 mb-5'>
                        <h1 onClick={changePage}>Currently Airing TV Shows</h1>
                    </Container>

                    <Container>
                        <Row>
                            {airingTvShows.results.map(item => (
                                <Col xs='4' lg='2' className='mb-4' key={item.id}>
                                    <Box
                                        noImage={noImage}
                                        image={item.poster_path !== null && `https://image.tmdb.org/t/p/original${item.poster_path}`}
                                        link={`/tv/${item.id}`}
                                        title={item.name ? item.name : item.original_name}
                                        className='text-center bold py-2'
                                        releaseDate={item.first_air_date && item.first_air_date}
                                    >
                                    </Box>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Pagination
                        page={page}
                        totalPages={airingTvShows.total_pages}
                        totalResults={airingTvShows.total_results}
                        changePage={changePage}
                    />
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    airingTvShows: state.tvShows.airingTvShows,
    airingTvShowsLoaded: state.tvShows.airingTvShowsLoaded
})

export default connect(mapStateToProps, { getTvShowsAiringToday })(TvAiringToday);

