import { Component } from 'react'

class UIkit extends Component {
  state = { ready: false }

  componentDidMount = async () => {
    if (typeof window !== 'undefined') {
      const UIkit = (await import('uikit')).default
      const Icons = (await import('uikit/dist/js/uikit-icons.min')).default
      UIkit.use(Icons)
      this.setState({ ready: true })
    }
  }

  render = () => this.props.children!
}

export default UIkit
