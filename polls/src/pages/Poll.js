import React, { Component } from 'react'
import './styles/Poll.css'
import Button from '@mui/material/Button';
import oscar from '../../static/img/oscar.jpg';
import profile_picture_1 from '../../static/img/profile-picture-1.jpg';
import profile_picture_2 from '../../static/img/profile-picture-2.jpg';

export default class Poll extends Component {
  render() {
    return (
      <div className="poll-background">
          <div className="poll-header">
              <div className="poll-header-image">
                  <img src={oscar}/>
              </div>
              <div className="poll-header-title">Oscar Prize</div>
              <div className="poll-header-info">
                  <span>2º position</span>
                  <span> / 13 pts</span>
              </div>
              <div className="poll-header-button">
                <Button variant="contained">BETS</Button>
              </div>
          </div>
          <div className="poll-table">
              <div className="poll-table-title">Ranking</div>
              <div className="poll-table-container">
                  <div className="poll-table-card">
                      <div className="poll-table-card-info">
                          <div className="poll-table-card-info-position">1º</div>
                          <div className="poll-table-card-info-image">
                              <img src={profile_picture_1}/>
                          </div>
                          <div className="poll-table-card-info-name">Eduardo Startari</div>
                      </div>
                      <div className="poll-table-card-number">15pts</div>
                  </div>
                  <div className="poll-table-card">
                      <div className="poll-table-card-info">
                          <div className="poll-table-card-info-position">2º</div>
                          <div className="poll-table-card-info-image">
                              <img src={profile_picture_2}/>
                          </div>
                          <div className="poll-table-card-info-name">Random person</div>
                      </div>
                      <div className="poll-table-card-number">13pts</div>
                  </div>
                  <div className="poll-table-card">
                      <div className="poll-table-card-info">
                          <div className="poll-table-card-info-position">3º</div>
                          <div className="poll-table-card-info-image">
                              <img src={profile_picture_1}/>
                          </div>
                          <div className="poll-table-card-info-name">Random person</div>
                      </div>
                      <div className="poll-table-card-number">9pts</div>
                  </div>
                  <div className="poll-table-card">
                      <div className="poll-table-card-info">
                          <div className="poll-table-card-info-position">4º</div>
                          <div className="poll-table-card-info-image">
                              <img src={profile_picture_2}/>
                          </div>
                          <div className="poll-table-card-info-name">Random person</div>
                      </div>
                      <div className="poll-table-card-number">8pts</div>
                  </div>
                  <div className="poll-table-card">
                      <div className="poll-table-card-info">
                          <div className="poll-table-card-info-position">5º</div>
                          <div className="poll-table-card-info-image">
                              <img src={profile_picture_1}/>
                          </div>
                          <div className="poll-table-card-info-name">Random person</div>
                      </div>
                      <div className="poll-table-card-number">2pts</div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}