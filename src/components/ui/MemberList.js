import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Member from './Member'

//5. Add properties for updating methods, ex: administrators

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            loading: false,
            administrators: []
        }
        this.makeAdmin = this.makeAdmin.bind(this)
        this.removeAdmin = this.removeAdmin.bind(this)
    }
    //use componentDidMount for as soon as the app does its first render and fetch the api
    componentDidMount() {
      this.setState({loading: true})
      fetch('https://api.randomuser.me/?mat=US&results=12')
        .then(response => response.json())
        .then(json => json.results)
        .then(members => this.setState({
          members, //ES6 new way, which is same as members: members
          loading:false
        }))
    }

    makeAdmin(email) {
      const administrators = [
        ...this.state.administrators,
        email
      ]
      this.setState({administrators})
    }

    removeAdmin(email) {
      const administrators = this.state.administrators.filter(
        adminEmail => adminEmail !== email
      )
      this.setState({administrators})
    }

    render() {
      //1. Destructure members and loading to use this state
      //2. map the members array
      //3. Add visual cue for the loading or the member count (length)
      //4. Refactor map to grab the api
      //6. Add the admin property to the map to handle add/remove admin
        const { members, loading } = this.state
        return (
          <div className="member-list">
              <h1>Society Members</h1>

              {(loading) ?
                  <span>loading...</span> :
                  <span>{members.length} members</span>
              }

              {(members.length) ?
                 members.map(
                (member, i) =>
                  <Member key={i}
                              admin={this.state.administrators.some(
                                adminEmail => adminEmail === member.email
                              )}
                              name={member.name.first + ' ' + member.name.last}
                              email={member.email}
                              thumbnail={member.picture.thumbnail}
                              makeAdmin={this.makeAdmin}
                              removeAdmin={this.removeAdmin}/>
                 ):
                 <span>Currently 0 Members </span>
             }
          </div>
        )
   }
}

export default MemberList
