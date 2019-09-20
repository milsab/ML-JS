const output = [];
const predictionPoint = 300;
const k = 5;



function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    output.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSize = 100;
  const [testSet, trainingSet] = splitData(output, testSize);
  // let numberOfCorrect = 0;
  // for(let i = 0; i < testSet.length; i++){
  //   const bucket = knn(trainingSet, testSet[i][0]);
  //   if(bucket === testSet[i][3])
  //     numberOfCorrect++;    
    
  // }
  // const accuracy = numberOfCorrect / testSize;

  // Using Lodash
  _.range(1, 20).forEach(k => {
    const accuracy = _.chain(testSet)
    .filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
    .size()
    .divide(testSize)
    .value();
    console.log('For k ' + k + ' Acuracy is ' + accuracy);
  });  
}

function knn(data, point, k){
  return _.chain(data)
  .map(row => [distance(row[0], point), row[3]])
  .sortBy(row => row[0])
  .slice(0, k)
  .countBy(row => row[1])
  .toPairs()
  .sortBy(row => row[1])
  .last()
  .first()
  .parseInt()
  .value();
}

function distance(pointA, pointB){
  return Math.abs(pointA - pointB);
}

function splitData(data, testCount){
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}
