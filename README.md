# COVID-19-Global-Hackathon
React code used for animations in case anybody wants to build on this idea or try other testing scenarios.

## Summary of the project: <br />
With the testing shortage, we are fighting this virus blind. We can substantially boost testing capacity by batching low risk tests together and implementing simple algorithms.

## Links to the final hackathon video/submission: <br />
https://devpost.com/software/boost-testing-capacity-tenfold-using-batch-testing <br />
https://www.youtube.com/watch?v=uWXcr1ekypU <br />

## How to use the code: <br />
I had to speed write the code to meet the deadline so it's a bit of a mess but still very functional.  To animate different testing scenarios, open Group.js and find the defaultProps object near the top.  These 3 variables in that object control the test: <br />

totalPeople - The total amount of people to be tested. <br />
infectedPeople - How many of the total people are infected (placement of infected people are chosen randomly). <br />
groupSize - Size of batches to divide the total people into. <br />

## How to Run: <br />
cd animation <br />
npm start <br />

Once the page loads, press the Test button at the bottom to start the animation.
