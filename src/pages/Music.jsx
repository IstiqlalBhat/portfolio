import React from 'react';
import './Music.css';
// import albumCover1 from '../images/Hotelcalifornia.jpg'; // TODO: Add images
// import albumCover2 from '../images/ac-dc.jpg'; 
// import albumCover3 from '../images/guns-n-roses.webp'; 

const favoriteGenres = ["Rock", "Classic Rock", "Hard Rock", "Blues", "Alternative"];
const favoriteAlbums = [
    { title: "Hotel California", artist: "The Eagles", imgSrc: "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg" },
    { title: "Back in Black", artist: "AC/DC", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ACDC_Back_in_Black_cover.svg/512px-ACDC_Back_in_Black_cover.svg.png" },
    { title: "Appetite for Destruction", artist: "Guns N' Roses", imgSrc: "https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg" },
];

const Music = () => {
    return (
        <div className="music-page">
            <div className="quote">
                <p>“Rock and Roll isn’t a genre, it’s a way of life.” 🎸</p>
            </div>

            <div className="genre-section">
                <h3>Explore by Genre</h3>
                <div className="genres">
                    {favoriteGenres.map((genre, index) => (
                        <div key={index} className="genre-card" style={{ animationDelay: `${index * 0.2}s` }}>
                            <p>{genre}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="albums-section">
                <h3>Favorite Albums</h3>
                <div className="albums">
                    {favoriteAlbums.map((album, index) => (
                        <div key={index} className="album-card" style={{ animationDelay: `${index * 0.3}s` }}>
                            <img
                                src={album.imgSrc}
                                alt={album.title}
                                className="album-image"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="album-details">
                                <h4>{album.title}</h4>
                                <p>by {album.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Music;
