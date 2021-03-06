import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeScreen, viewCabal } from '../actions'
import CabalsList from './cabalsList'
import Sidebar from './sidebar'
import MainPanel from './mainPanel'
import MemberList from './memberList'

const mapStateToProps = state => ({
  addr: state.currentCabal,
  cabal: state.cabals[state.currentCabal],
  cabals: state.cabals
})

const mapDispatchToProps = dispatch => ({
  changeScreen: ({ screen, addr }) => dispatch(changeScreen({ screen, addr })),
  viewCabal: ({ addr }) => dispatch(viewCabal({ addr }))
})

class LayoutScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMemberList: false
    }
    this.toggleMemberList = this.toggleMemberList.bind(this)
  }

  toggleMemberList () {
    this.setState((state) => ({
      showMemberList: !state.showMemberList
    }))
  }

  cabalsInitialized () {
    if (this.props.cabals) {
      return Object.values(this.props.cabals).every((cabal) => {
        return cabal.initialized
      })
    } else {
      return false
    }
  }

  render () {
    const { cabal } = this.props
    if (!cabal || !this.cabalsInitialized()) {
      return (
        <div className='loading'>
          <div className='status'> </div>
          <img src='static/images/cabal-logo-black.svg' />
          <div className='status'>Loading hypercores and swarming...</div>
        </div>
      )
    }
    return (
      <div className='client'>
        <CabalsList />
        <Sidebar />
        <MainPanel toggleMemberList={this.toggleMemberList} />
        {this.state.showMemberList && <MemberList />}
      </div>
    )
  }
}

const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutScreen)

export default Layout
