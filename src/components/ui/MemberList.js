import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Member from './Member'

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            loading: false
        }
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

    render() {
      //1. Destructure members and loading to use this state
      //2. map the members array
      //3. Add visual cue for the loading or the member count (length)
      //4. Refactor map to grab the api
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
                              name={member.name.first + ' ' + member.name.last}
                              email={member.email}
                              thumbnail={member.picture.thumbnail}/>
                 ):
                 <span>Currently 0 Members </span>
             }
          </div>
        )
   }
}

export default MemberList
