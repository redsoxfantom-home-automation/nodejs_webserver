var ws = require('socket.io-client')("http://"+host+":"+port)
var ReactDOM = require('react-dom')
var React = require('react')

ws.on('connect', function(){
	console.log("Connected to lights service")
})

class LightList extends React.Component {
   handleLightUpdate(lightList) {
      this.setState({
         lights : lightList
      })
   }

   constructor(props) {
      super(props)
      this.state = { lights: []}
      props.socket.on(
         'light_update',
         (data) => this.handleLightUpdate(data)
      )
   }

   render() {
      const lightList = this.state.lights.map((light) =>
         <Light key={light.id} label={light.label} power={light.power}/>
      )

      return <ul>
               {lightList}
             </ul>
   }
}

class Light extends React.Component {
   render() {
      return <li>
               {this.props.label} {this.props.power ? '[ON]' : '[OFF]'}
             </li>
   }
}

ReactDOM.render(
   <LightList socket={ws} />,
   document.getElementById("app")
)
