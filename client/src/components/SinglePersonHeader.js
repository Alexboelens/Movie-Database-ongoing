import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import noImage from './images/no-person-image.png';
import banner from './images/moviebanner.png';
const getAge = require("findage");


const SinglePersonHeader = ({ name, knownFor, birthday, placeOfBirth, image, biography, children }) => {

    const renderAge = birthDate => {
        if (birthDate === null) {
            return 'Unknown'
        } else {
            birthDate = birthDate.split('-');
            const newDate = `${birthDate[1]}/${birthDate[2]}/${birthDate[0]}`;
            return getAge.fullAge(newDate).split(' ')[0];
        }
    }

    const renderBirthday = string => {
        return string.split('-').reverse().join('-');
    }

    const renderBiography = text => {
        if (text.length === 0 || text === null) {
            return 'No information added for this person.';
        } else {
            return text;
        }
    }

    const renderPlaceOfBirth = place => {
        if (place === null) {
            return 'Unknown';
        } else {
            return place;
        }
    }

    return (
        <Container fluid={true} className='mb-5'>
            <Row className='single-item-image-wrap text-light' style={{ backgroundImage: `url(${banner})` }}>
                <Col className="opacity-wrap">
                    <Row>
                        <Col xs='12' md='3' className='d-flex flex-column align-items-center pb-5'>
                            <div className="single-person-image mt-5" style={{ backgroundImage: image !== null ? `url(https://image.tmdb.org/t/p/original/${image})` : `url(${noImage})` }}></div>
                            {children}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <div className='person-info-wrap mt-5'>
                                        <h1 className='pb-3 text-warning'>{name}</h1>
                                        <p className='bold'>Birthday</p>
                                        {birthday && <p>{renderBirthday(birthday)}</p>}
                                        <p className='bold'>Age</p>
                                        <p>{renderAge(birthday)}</p>
                                        <p className='bold'>Known for</p>
                                        <p>{knownFor}</p>
                                        <p className='bold'>Place of Birth</p>
                                        <p>{renderPlaceOfBirth(placeOfBirth)}</p>
                                        <p className='bold'>Biography</p>
                                        <p className='pb-5'>{renderBiography(biography)}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SinglePersonHeader;