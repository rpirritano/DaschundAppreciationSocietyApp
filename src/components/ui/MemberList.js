import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Member from './Member'

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [
            {
                name: "Joe Wilson",
                email: "joe.wilson@example.com",
                thumbnail: "https://randomuser.me/api/portraits/men/53.jpg"
            },
            {
                name: "Stacy Gardner",
                email: "stacy.gardner@example.com",
                thumbnail: "https://randomuser.me/api/portraits/women/74.jpg"
            },
            {
                name: "Billy Young",
                email: "billy.young@example.com",
                thumbnail: "https://randomuser.me/api/portraits/men/34.jpg"
            }
          ]
        }
    }

    render() {
      //First: Destructure members to use this state
      //Secont: map the members array
        const { members } = this.state
        return (
            <div className="member-list">
            	<h1>Society Members</h1>
              {members.map(
                (data, i) =>
                      <Member key={i} onClick={email =>console.log(email)}
                      {...data} />
              )}
            </div>
        )
   }
}

export default MemberList
