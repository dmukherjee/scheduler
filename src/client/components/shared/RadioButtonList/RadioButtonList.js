import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Segment, Header } from 'semantic-ui-react';
import RadioButton from './RadioButton';
// import styles from './RadioButtonList.scss';

export default function RadioButtonList(props) {
  const { cohorts, handleRadioButtonChange, showDetails, buttonLabel } = props;
  const cohortsList = cohorts.map((cohort) => (
    <Grid.Column key={cohort.name}>
      <RadioButton cohort={cohort} handleRadioButtonChange={handleRadioButtonChange} />
    </Grid.Column>
  ));
  // returns true when at least one cohort is selected
  const isSelected = cohorts.some((cohort) => cohort.isChecked);

  return (
    <Segment placeholder data-testid="radio-button-list">
      <Header as="h2" style={{ textAlign: 'center', marginTop: '15px' }}>
        Select A Cohort
      </Header>
      <Grid columns={3} relaxed style={{ marginLeft: '50px' }}>
        {cohortsList}
      </Grid>
      <Button disabled={!isSelected} primary onClick={() => showDetails()} style={{ marginTop: '30px' }}>
        {buttonLabel}
      </Button>
    </Segment>
  );
}

RadioButtonList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
};
