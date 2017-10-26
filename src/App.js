/* HARD: Create an app to assign a list of people to one of two teams. 
You may either start with a hard-coded array of people or you can create 
a form to gather names from the user. Either way, start with listing the users. 
Have some way to add them into one of the two teams. Once a person is assigned, 
they should be removed from the unassigned list and should be added to a team list. 
Once a person is on a team list, have a way to remove them from a team assignment 
(which will put them back on the unassigned list) or to switch them to the other team. 
Finally, have a way to reset things back to the original state of the game at the beginning.
 */

import React, { Component } from 'react';
import initialState from './initialState';
import './App.css';

// Player component that renders buttons according to which team they are on
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
        { props.team === 0 ? 
          <div>
            <button className="add-team-1" value="1" onClick={props.onTeamChange} data-player-id={props.player_id}>Add to Team 1</button>
            <button className="add-team-2" value="2" onClick={props.onTeamChange} data-player-id={props.player_id}>Add to Team 2</button>
          </div>
          :
          <div></div>
        }
        { props.team === 1 ? 
          <div>
            <button className="add-team-0" value="0" onClick={props.onTeamChange} data-player-id={props.player_id}>Unassign</button>
            <button className="add-team-2" value="2" onClick={props.onTeamChange} data-player-id={props.player_id}>Add to Team 2</button>
          </div>
          :
          <div></div>
        }
        { props.team === 2 ? 
          <div>
            <button className="add-team-1" value="1" onClick={props.onTeamChange} data-player-id={props.player_id}>Add to Team 1</button>
            <button className="add-team-0" value="0" onClick={props.onTeamChange} data-player-id={props.player_id}>Unassign</button>
          </div>
          :
          <div></div>
        }
        
      </div>
    </div>
  );
}

class App extends Component {

  constructor() {
    super();

    this.state = initialState;
    this.onTeamChange = this.onTeamChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Change team if they were the affected player
  onTeamChange(event) {
    var teamValue = Number(event.target.value);
    var affectedPlayer = Number(event.target.getAttribute('data-player-id'));

    var playersCopy = this.state.players.map(function(player, index) {
      if (player.player_id === affectedPlayer) {
        player.team = teamValue;
      } 
      return (player)
    })
    this.setState({players: playersCopy});
  }

  // Set all players' teams to 0 to reset 
  reset() {
    var playersCopy = this.state.players.map(function(player, index) {
      if (player.player_id) {
        player.team = 0;
      } 
      return (player)
    })
    this.setState({players: playersCopy});
  }

  // Renders players to the correct team depending on their team value - also waits until state exists
  render() {
    return (
      <div className="App">
        <div className="team-0">
          <h1>Unassigned</h1>
          <h2>Members</h2>
          <div className="team-1-players">
            {this.state.players && this.state.players.map((player, index) => {
              if (player.team === 0) {
                return (
                  <Player 
                    onTeamChange={this.onTeamChange}
                    name={player.name} 
                    team={player.team}
                    player_id={player.player_id}
                    key={player.id} 
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="team-1">
          <h1>Team 1</h1>
          <h2>Members</h2>
          <div className="players">
            {this.state.players && this.state.players.map((player, index) => {
              if (player.team === 1) {
                return (
                  <Player 
                    onTeamChange={this.onTeamChange}
                    name={player.name} 
                    team={player.team}
                    player_id={player.player_id}
                    key={player.id} 
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="team-2">
          <h1>Team 2</h1>
          <h2>Members</h2>
          <div className="players">
            {this.state.players && this.state.players.map((player, index) => {
                if (player.team === 2) {
                  return (
                    <Player 
                      onTeamChange={this.onTeamChange}
                      name={player.name} 
                      team={player.team}
                      player_id={player.player_id}
                      key={player.id} 
                    />
                  );
                }
              })}
          </div>
        </div>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default App;
