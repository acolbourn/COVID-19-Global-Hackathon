/**
 * generatePeople takes 3 arguments.
 * The return value is an array of people with specified infection rate
 * @param {number} totalPeople - Total number of people to be tested
 * @param {number} infectedPeople - Number of people in the total group that are infected
 * @param {number} groupSize - Size of initial batches of groups to create
 */
function generatePeople(totalPeople, infectedPeople, groupSize) {
  // Generate Random Infected People
  let infected = new Set();
  while (infected.size < infectedPeople) {
    const randomNum = Math.floor(Math.random() * totalPeople);
    if (!infected.has(randomNum)) {
      infected.add(randomNum);
    }
  }

  // Generate People Array
  let peopleArray = [];
  let groupCounter = 0;
  let group = 0;
  let groupPosition = 'left';
  for (let i = 0; i < totalPeople; i++) {
    peopleArray.push({
      id: i,
      infected: infected.has(i) ? 'infected' : 'clear',
      testStatus: 'none',
      hide: false,
      hideBorders: false,
      numOfTests: 0,
      group: [group],
      groupPosition
    });
    groupCounter += 1;
    groupPosition = 'center';
    if (groupCounter >= groupSize) {
      peopleArray[peopleArray.length - 1].groupPosition = 'right';
      group += 1;
      groupCounter = 0;
      groupPosition = 'left';
    }
  }

  return peopleArray;
}

// const people = generatePeople(100, 2, 10);
// console.log(people);
// testPeople(people, 'all');
// console.log(people);

export { generatePeople };
