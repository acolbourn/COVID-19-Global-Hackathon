import React, { Component } from 'react';
import Person from './Person';
import './Group.css';
import { generatePeople } from './helperFunctions';
import AnimatedNumber from 'react-animated-number';

export default class Group extends Component {
  static defaultProps = {
    totalPeople: 100,
    infectedPeople: 1,
    groupSize: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      totalTests: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.testInitialGroups = this.testInitialGroups.bind(this);
    this.testSubGroups = this.testSubGroups.bind(this);
    this.incrementTests = this.incrementTests.bind(this);
  }
  componentDidMount() {
    this.setState({
      people: generatePeople(
        this.props.totalPeople,
        this.props.infectedPeople,
        this.props.groupSize
      )
    });
  }

  /**
   * testInitialGroups takes an array of people, tests their initial groups, updates state, then procedes to next test step.
   * There is no return value.
   * @param {*} people - An array of people to be tested
   * @param {string} testType - Changes how infected groups are tested.
   * 'all' tests each individual, 'recursive' recursively splits groups in half and tests again
   */
  testInitialGroups(people, testType) {
    const numOfGroups = people[people.length - 1].group[0];

    // Loop through all groups
    let group = [];
    let positiveDetected = false;
    let self = this;
    for (let i = 0; i <= numOfGroups; i++) {
      (function(i) {
        setTimeout(() => {
          group = people.filter(p => p.group[0] === i);
          // Test each group
          positiveDetected = false;
          group.forEach(person => {
            if (person.infected === 'infected') {
              positiveDetected = true;
            }
          });
          // Update group test status and count in person array
          people.forEach(person => {
            if (person.group[0] === i) {
              person.numOfTests += 1;
              person.testStatus = positiveDetected
                ? 'groupPositive'
                : 'confirmedNegative';
            }
          });
          self.setState(st => {
            return {
              totalTests: st.totalTests + 1,
              people
            };
          });
        }, i * 1500);
      })(i);
    }

    // After initial group tests, hide confirmed negatives
    const delay_1 = numOfGroups * 1500 + 2000;
    setTimeout(() => {
      let hideGroups = people.filter(p => p.testStatus === 'confirmedNegative');

      hideGroups.forEach(person => {
        person.hide = true;
      });

      self.setState(st => {
        return {
          people
        };
      });
    }, delay_1);

    // After hiding confirmed negatives, test positive subgroups
    const delay_2 = delay_1 + 1000;
    this.setState(
      {
        people
      },
      () => {
        setTimeout(() => {
          this.testSubGroups(people, 'all');
        }, delay_2);
      }
    );

    // After testing complete, hide confirmed negatives and borders
    const miniVersionDelay = 0;
    const delay_3 = delay_1 + delay_2 + miniVersionDelay;
    setTimeout(() => {
      let hideGroups = people.filter(
        p => p.testStatus === 'confirmedNegative withinGroup'
      );

      hideGroups.forEach(person => {
        person.hide = true;
      });

      let hideBorders = people.filter(
        p => p.testStatus === 'confirmedPositive withinGroup'
      );

      hideBorders.forEach(person => {
        person.hideBorders = true;
      });

      self.setState(st => {
        return {
          people
        };
      });
    }, delay_3);
  }

  /**
   * testSubGroups takes an array of people and tests the groups that had infections.
   * There is no return value.
   * @param {*} people - An array of people to be tested
   * @param {string} testType - Changes how infected groups are tested.
   * 'all' tests each individual, 'recursive' recursively splits groups in half and tests again
   */
  testSubGroups(people, testType) {
    // Find all groups from initial screening with a positive, confirm all others as negative
    let possibleInfections = people.filter(person => {
      if (person.testStatus === ('groupPositive' || 'confirmedPositive')) {
        return true;
      } else {
        person.testStatus = 'confirmedNegative';
        return false;
      }
    });

    if (testType === 'all') {
      // Test each individual person in a group that tested positive
      let self = this;
      possibleInfections.forEach((person, index) => {
        (function(index) {
          setTimeout(() => {
            person.numOfTests += 1;
            person.testStatus =
              person.infected === 'infected'
                ? 'confirmedPositive withinGroup'
                : 'confirmedNegative withinGroup';
            self.setState(st => {
              return {
                totalTests: st.totalTests + 1,
                people
              };
            });
            console.log(index);
          }, index * 1500);
        })(index);
      });
    } else if (testType === 'recursive') {
      // recursive
    }

    console.log('Total tests: ', this.state.totalTests);
  }

  incrementTests() {
    this.setState(st => {
      return {
        totalTests: (st.totalTests += 1)
      };
    });
  }

  handleClick() {
    this.testInitialGroups(this.state.people, 'all');
  }

  render() {
    const people = this.state.people.map(p => (
      <Person
        key={p.id}
        infected={p.infected}
        testStatus={p.testStatus}
        hide={p.hide}
        hideBorders={p.hideBorders}
        groupPosition={p.groupPosition}
      />
    ));
    return (
      <div className='Group'>
        <div className='Group-container'>
          <div className='Group-people'>{people}</div>

          <div className='Group-sidebar'>
            <div className='Group-testCount'>
              <p className='Group-text'>Total Tests</p>
              <AnimatedNumber
                component='text'
                value={this.state.totalTests}
                style={{
                  transition: '0.8s ease-out',
                  fontSize: 68,
                  transitionProperty: 'background-color, color, opacity'
                }}
                frameStyle={perc =>
                  perc === 0 ? {} : { backgroundColor: '#1a2229' }
                }
                duration={300}
                stepPrecision={0}
              />
            </div>
          </div>
        </div>

        <button onClick={this.handleClick}>Test</button>
      </div>
    );
  }
}
