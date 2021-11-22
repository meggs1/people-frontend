import React, { Component } from 'react'
import './App.css';

class App extends Component {
  state = {
    friends: [],
    user: [],
    name: "",
    bio: "",
    avatar: ''
  }

  componentDidMount() {

    this.fetchFriends()
    console.log(this.state.friends)
  }

  fetchFriends = () => {
    fetch('http://localhost:3000/friends')
    .then((response) => response.json())
    .then((data) => {
      this.setState({friends: data})
      console.log('fetch', this.state.friends)
    })
    .catch(err => console.log(err))
  } 

  addFriend = (friend) => {
    const friendObj = {
      name: friend.name,
      bio: friend.bio,
      // avatar: friend.avatar,
      user_id: 1
    }
    fetch('http://localhost:3000/friends', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friend: friendObj
      })
    })

    .then(resp =>
      resp.json()
      .then(data => ({ data, resp })))
      .then(({ data, resp }) =>  {
      if (resp.ok) {
        console.log(data, resp)
      } else {
        console.log(resp)
        // return resp.json()
        //     .then((errors) => {
        //         return Promise.reject(errors)
        //     });
      }
    }).catch(err => console.log(err))

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
}

handleImageChange = e => {
  if (e.target.files[0]) this.setState({ avatar: e.target.files[0] });
};

handleSubmit = (e) => {
  const name = this.state.name
  const bio = this.state.bio
  const avatar = this.state.avatar
  e.preventDefault()
  console.log('submit', this.state)
  this.addFriend({name, bio, avatar})
}

friendForm = () => {
  return (    
    <div >
      <form onSubmit={this.handleSubmit}>
        <h1>Friend form</h1>
        <label>Name: </label>
        <input name="name" value={this.state.name} onChange={this.handleChange}/>
        <br />
        <label>Bio: </label>
        <input name="bio"  value={this.state.bio} onChange={this.handleChange}/>
        <br />
        <label>Avatar: </label>
        <input name="avatar" type="file" value={this.state.avatar} onChange={this.handleImageChange} accept="image/png, image/jpeg" />
        <br />
        <input type="submit" value="Add friend" />
      </form>
    </div>
  )
}


  render() {
    return (
      <div>
        {this.friendForm()}
        {this.state.friends.map(friend => friend.name)}
      </div>

    )
  }
}

export default App;
