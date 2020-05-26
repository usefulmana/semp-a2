import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getTours, getToursByName } from './../actions/tourActions';
import Navbar from './../parts/Navbar';
import AddButton from '../parts/AddButton';
import DeleteButton from '../parts/DeleteButton';
import { Link } from 'react-router-dom';
import { getTypes } from '../actions/typeActions';

class Tours extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      query: '',
      filter: true,
      type: '',
      minTime: 0,
      maxTime: 10000,
      tours: []
    })
    this.onChange = this.onChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }


  componentDidMount() {
    // var elems = document.querySelectorAll('.tooltipped')
    // M.Tooltip.init(elems, { position: "top" });
    this.props.getTours()
    this.props.getTypes()
    if (this.props.tour.tours !== null){
      this.setState({
        tours: this.props.tour.tours
      })
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch(e){
    e.preventDefault()
    if (this.state.query === ""){
      this.props.getTours()
      this.setState({
        tours: this.props.tour.tours
      })
    }
    else{
      this.props.getToursByName(this.state.query)
      this.setState({
        tours: this.props.tour.tours
      })
    }
  }

  gridView(loc) {
    return (
      <tr>
        <td>
          <Link to={{
            pathname: `/tour/${loc.id}`
          }}>
            {loc.name}
          </Link>
        </td>
        <td className="truncate">{loc.types.length === 0 ? "None" : loc.types.map(type => (
          <Fragment>{type.name},</Fragment>
        ))}</td>
        <td>{loc.minTime}</td>
        <td>
          <DeleteButton id={loc.id} />
        </td>
      </tr>
    )
  }

  renderLogic() {
    if (this.props.ui.card) {
      if (this.props.tour.tours === null) {
        return (<h4 className="center-align">No items available</h4>)
      }
      else {
        return this.state.tours.map(loc => this.cardView(loc))
      }
    }
    else {
      return (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Types</th>
              <th>Time(s)</th>
              <th>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tours.map(loc => this.gridView(loc))}
          </tbody>
        </table>
      )
    }
  }


  cardView(loc) {
    return (
      <div class="col s12 m4 l4">
        <div class="card">

            <Link to={{
              pathname: `/tour/${loc.id}`,
            }}>
            <div className="card-image">
              <img src={loc.locations ? "https://picsum.photos/seed/picsum/100/210" : loc.locations[0].pic} width="455" height="270" />
              <span class="card-title">{loc.name}</span>
            </div>
              <div class="card-content">
                <p className="truncate">{loc.description}</p>
              </div>
            </Link>

            <div class="card-action">
              <div className="center-align">
                <DeleteButton id={loc.id} />
              </div>
            </div>
          </div>

      </div>
    )
  }

  search (){
    return(
      <Fragment>
        <form onSubmit={this.handleSearch}>
          <div className="row">
            <div className="col s3"></div>
            <div className="col s6">
              <div className="input-field">
                <input name="query" type="search" id="search" placeholder="Search By Name" onChange={this.onChange} />
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    )
  }

  filter(){
    if (this.state.filter){
      return (
        <Fragment>
          <form onSubmit={this.handleFilter}>
            <div className="row">
              <div className="col s3 input-field">

              </div>
              <div className="col s2 input-field">
                <select name="type" onChange={this.onChange}>
                  <option value="" selected>All</option>
                  {this.props.type.types === null ? null :
                    this.props.type.types.map(t => (
                      <option value={t.id}>{t.name}</option>
                    ))
                  }
                </select>
              </div>

              <div class="input-field col s2">
                <input id="minTime" name="minTime" type="number" className="validate" min="0" max="10000" required value={this.state.minTime} onChange={this.onChange}/>
                <label for="minTime" className="active">Min Time(s)</label>
              </div>

              <div class="input-field col s2">
                <input id="maxTime" name="maxTime" type="number" className="validate" min="0" max="100000" required value={this.state.maxTime} onChange={this.onChange}/>
                <label for="maxTime" className="active">Max Time(s)</label>
              </div>
            </div>
            <div className="center-align">
              <button type="submit" className="btn"><i className="material-icons right">filter_list</i>Filter</button>
            </div>
          </form>
        </Fragment>
      )
    }
    else {
      return null
    }
  }

  handleFilter(e){
      e.preventDefault()
      const {type, minTime, maxTime} = this.state
      const tours = this.props.tour.tours
      if (type === ''){
        this.setState({
          tours: tours.filter(t => (t.minTime >= minTime && t.minTime <= maxTime))
        })
      }
      else {
        var temp = tours.filter(t => (t.minTime >= minTime && t.minTime <= maxTime))
        this.setState({
          tours: temp.filter(e => e.types.some(i => i.id === type))
        })
      }


      // for (let i = 0; i< tours.length; i++){
      //   result.push(tours[i].types.filter(e => e.name === type).filter(e => (e.minTime >= minTime && e.minTime <= maxTime)))
      // }

  }

  onClick(e){
    e.preventDefault()
    this.setState({
      filter: !this.state.filter
    })
  }

  render() {
    return (
      <div >
        <Navbar />
        <div className="container">
          <h1 className="teal-text">Tour Management</h1>
          <div className="divider"></div>
          <br />
          {this.search()}

          {this.filter()}
          <br/>
          <div className="row">
            {this.renderLogic()}
          </div>
          <AddButton />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  tour: state.tour,
  ui: state.ui,
  type: state.type
});

export default connect(
  mapStateToProps,
  { getTours, getToursByName, getTypes }
)(Tours);
