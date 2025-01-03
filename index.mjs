// Task 1

function findMinMax(arr) {
  if (arr.length === 1) {
    return [arr[0], arr[0]];
  }

  if (arr.length === 2) {
    return arr[0] < arr[1] ? [arr[0], arr[1]] : [arr[1], arr[0]];
  }

  const mid = Math.floor(arr.length / 2);
  const leftPart = arr.slice(0, mid);
  const rightPart = arr.slice(mid);

  const [leftMin, leftMax] = findMinMax(leftPart);
  const [rightMin, rightMax] = findMinMax(rightPart);

  return [Math.min(leftMin, rightMin), Math.max(leftMax, rightMax)];
}

const [min, max] = findMinMax([3, 5, 1, 9, 2, 8]);

console.log(`Min: ${min}, Max: ${max}`);

// Task 2

function quickSelect(arr, k) {
  if (k < 1 || k > arr.length) {
    throw new Error("The k value should be in the range of the array length");
  }

  function partition(left, right, pivotIndex) {
    const pivotValue = arr[pivotIndex];
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
        storeIndex++;
      }
    }

    [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]];

    return storeIndex;
  }

  function select(left, right, kIndex) {
    if (left === right) {
      return arr[left];
    }

    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;

    const pivotFinalIndex = partition(left, right, pivotIndex);

    if (pivotFinalIndex === kIndex) {
      return arr[pivotFinalIndex];
    } else if (pivotFinalIndex > kIndex) {
      return select(left, pivotFinalIndex - 1, kIndex);
    } else {
      return select(pivotFinalIndex + 1, right, kIndex);
    }
  }

  return select(0, arr.length - 1, k - 1);
}

const k = 3;
const result = quickSelect([3, 2, 1, 5, 4], k);

console.log(`The smallest k-element: ${result}`);
