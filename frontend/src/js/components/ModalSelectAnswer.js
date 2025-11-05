import React, { useState } from 'react';
import 'styles/components/ModalSelectAnswer.css';
import 'styles/pages/BetManage.css';
import { Button } from '@mui/material';

const ModalSelectAnswer = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="modal-select-answer"
      style={{ display: props.open ? 'flex' : 'none' }}
    >

      <div className="modal-select-main-header">
        <div className="modal-select-main-header-button" onClick={props.onClose}>
          <span className="material-icons">arrow_back</span>
          <span className="modal-select-main-header-button-details">BACK</span>
        </div>
      </div>

      <h2>Select Your Answer</h2>
      <div className="modal-select-answer-options">
        {props.data.answers.map((answer, index) => (
          <div key={index} className="modal-select-answer-option">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleSelect(answer)}
              color={selectedAnswer === answer ? "success" : "primary"}
              sx={{ height: '60px', fontWeight: selectedAnswer === answer ? 'bolder' : 'normal', borderWidth: selectedAnswer === answer ? '3px !important' : '1px' }}
            >
              {answer}
            </Button>
          </div>
        ))}
      </div>
      {selectedAnswer &&
        <div className="modal-select-answer-actions">
          <Button
            fullWidth
            variant="contained"
            onClick={() => setSelectedAnswer(null)}
            sx={{ height: '60px' }}
          >
            CANCEL
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => props.handleSelectedAnswer(selectedAnswer)}
            sx={{ height: '60px' }}
          >
            CONFIRM
          </Button>
        </div>
      }
    </div>
  )
}

export default ModalSelectAnswer;