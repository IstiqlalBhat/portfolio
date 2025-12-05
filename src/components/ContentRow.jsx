import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';
import './ContentRow.css';

const ContentRow = ({ title, data, type }) => {
    const rowRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="content-row">
            <h2 className="row-title">{title}</h2>
            <div className="row-container">
                <ChevronLeft
                    className={`slider-arrow left ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />
                <div className="row-items" ref={rowRef}>
                    {data.map((item, index) => (
                        <Card key={index} item={item} type={type} />
                    ))}
                </div>
                <ChevronRight
                    className="slider-arrow right"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    );
};

export default ContentRow;
