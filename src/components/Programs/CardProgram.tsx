import React, { useEffect, useState } from 'react';
import { Modal, Backdrop, Fade, Button } from '@mui/material';
import { Program } from '../../interfaces/interfaces';
import { FilteredPrograms } from './FilteredPrograms';

const Programs: React.FC<{ programType: string }> = ({ programType }) => {
  const [programsData, setProgramsData] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    const filteredData = FilteredPrograms(programType);
    setProgramsData(filteredData);
  }, [programType]);

  const handleOpenModal = (program: Program) => {
    setSelectedProgram(program);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="Grid-container">
      {programsData.map((item) => (
        <div className="Grid-item" key={item.title} onClick={() => handleOpenModal(item)}>
          <img className="Image-product" alt={item.title} src={item.images['Poster Art'].url} />
          <div className="Containar-title--product">
            <p>
              <span>{item.title}</span>
            </p>
          </div>
        </div>
      ))}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={selectedProgram !== null}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={selectedProgram !== null}>
          <div className="modal">
            <img className="Image-product" alt={selectedProgram?.title} src={selectedProgram?.images['Poster Art'].url} />
            <h2 id="transition-modal-title">{selectedProgram?.title}</h2>
            <p id="transition-modal-description">{selectedProgram?.releaseYear}</p>
            <p id="transition-modal-description">{selectedProgram?.description}</p>
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export { Programs };
