import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: '',
      players: [],
      balance: '',
      contrAddr: '',
      value: '',
      message: ''
    };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const contrAddr = await lottery.options.address;

    this.setState({ manager, players, balance, contrAddr });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({ message: 'You have been entered!'});
  }

  onPickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'A winner has been picked!'});
  }


  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h2>Lottery Contract</h2>
        <p>
          Manager: {this.state.manager} <br/>
          Contract Address: {this.state.contrAddr} <br/>
          Players: {this.state.players.length} <br/>
          Balance: {web3.utils.fromWei(this.state.balance, 'ether')} ether <br/>
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Enter Lottery</h4>
          <div>
            <label>Amount to enter: </label>
            <input style={{marginRight: 20}}
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Enter</button>
          </div>
        </form>
        <hr/>

        <h4>Pick a winner</h4>
        <button onClick={this.onPickWinner}>Pick!</button>

        <hr/>

      <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
