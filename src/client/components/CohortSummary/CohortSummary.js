import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonList } from '../shared/RadioButtonList/RadioButtonList';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import SummaryContent from './SummaryContent/SummaryContent';


const cohorts = [
  {name: 'RPT18', isChecked: false },
  {name: 'RPT19', isChecked: false },
  {name: 'RPT20', isChecked: false },
  {name: 'RPT21', isChecked: false },
  {name: 'RPT22', isChecked: false },
];
export default class CohortSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      cohorts,
      curriculum: {},
      selectedCohort: ''
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getCurriculum = this.getCurriculum.bind(this);
  }

  handleRadioButtonChange(cohort) {
    const { cohorts } = this.state;
    let { selectedCohort } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach(e => {
      if (e.name === cohort) {
        e.isChecked = true;
        selectedCohort = e.name
      } else {
        e.isChecked = false;
      }
    });
    this.setState({ cohorts: newCohortList, selectedCohort });
  }

  getCurriculum() {
    const { selectedCohort } = this.state;
    axios
      .get(`http://localhost:9001/curriculum/${selectedCohort}`)
      .then(response => {
        if (response && response.data) {
          this.setState({ curriculum: response.data });
          console.log(response.data)
        }
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { curriculum } = this.state;
    return (
      <div data-testid="cohort-summary">
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChange={this.handleRadioButtonChange}
          showDetails={this.getCurriculum}
          buttonLabel="Show Summary"
        />
        <SummaryContent curriculum={curriculum}/>
      </div>
    )
  }
}
