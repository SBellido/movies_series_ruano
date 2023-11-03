import React, { useState, useEffect } from 'react';
import { getSeries } from '../../../services/serviceData';
import CloseIcon from '@mui/icons-material/Close';
import '../Programs.css';

interface Serie {
  title: string;
  releaseYear: number;
  programType: string;
  images: {
    'Poster Art': {
      url: string;
    };
  };
  description: string;
}

const SerieList: React.FC = () => {
  const [seriesData, setSeriesData] = useState<Serie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [serieSelected, setSerieSelected] = useState<Serie | null>(null);

  useEffect(() => {
    const data = getSeries();
    const filteredData = data
      .filter((item: Serie) => item.releaseYear >= 2010 && item.programType === 'series')
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 20);

    setSeriesData(filteredData);
  }, []);

  const openModal = (serie: Serie) => {
    setSerieSelected(serie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSerieSelected(null);
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className='Container-title'>
        <h3 className='Title'>Popular Series</h3>
      </div>
      <div className="Grid-container">
        {seriesData.map((item) => (
          <div key={item.title} className="Grid-item" onClick={() => openModal(item)}>
            <img className="Image-product" src={item.images['Poster Art'].url} alt={item.title} />
            <div className='Containar-title--product'>
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && serieSelected && (
        <div className="Background">
          <div className="Modal-container">
            <img
              className="Image-modal"
              src={serieSelected.images['Poster Art'].url}
              alt={serieSelected.title}
            />
            <div className='Contenier-info--modal'>
              <div className="Container-close--modal">
                <CloseIcon
                  type="close"
                  onClick={closeModal}
                />
              </div>
              <div className='Container-text--modal'>
                <h3 className='Title-modal'>{serieSelected.title}</h3>
                <span>Año: {serieSelected.releaseYear}</span>
                <p className='Sinapsis'>
                  <span>Sinopsis:</span>
                </p>
                <p>{serieSelected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { SerieList };