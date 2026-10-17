const runBtn = document.getElementById("runBtn");
const numFramesInput = document.getElementById("numFrames");
const refStringInput = document.getElementById("refString");
const algoButton = document.getElementById("algo");
const algoOptions = document.querySelectorAll(".algos");
const frameContainer = document.getElementById("frameContainer");
const totalFaultsP = document.getElementById("totalFaults");
const showOutput = document.getElementById("showOutput");

let selectedAlgo = "FIFO";

algoOptions.forEach(option => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    selectedAlgo = e.target.innerText.toUpperCase();
    algoButton.innerText = e.target.innerText;
  });
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createStepBox = (stepNumber, page, frames, hasFault) => {
  const stepBox = document.createElement("div");
  stepBox.classList.add("stepBox");

  const stepLabel = document.createElement("div");
  stepLabel.classList.add("stepLabel");
  stepLabel.innerText = `Step ${stepNumber}: Page ${page}`;
  stepBox.appendChild(stepLabel);

  const framesRow = document.createElement("div");
  framesRow.classList.add("framesRow");

  frames.forEach(f => {
    const frameBox = document.createElement("div");
    frameBox.classList.add("frameBox");
    frameBox.innerText = f !== undefined ? f : "-";
    if (hasFault && f === page) frameBox.classList.add("pageFault");
    framesRow.appendChild(frameBox);
  });

  const faultIndicator = document.createElement("div");
  faultIndicator.classList.add("faultIndicator");
  if (hasFault) {
    faultIndicator.classList.add("fault");
    faultIndicator.innerText = "FAULT";
  } else {
    faultIndicator.classList.add("hit");
    faultIndicator.innerText = "HIT";
  }
  framesRow.appendChild(faultIndicator);

  stepBox.appendChild(framesRow);
  return stepBox;
};

const fifoAlgorithm = async (framesCount, pages) => {
  const frames = [];
  const queue = [];
  let pageFaults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let fault = false;
    if (!frames.includes(page)) {
      pageFaults++;
      fault = true;
      if (frames.length < framesCount) {
        frames.push(page);
        queue.push(page);
      } else {
        const toRemove = queue.shift();
        const idx = frames.indexOf(toRemove);
        frames[idx] = page;
        queue.push(page);
      }
    }
    frameContainer.appendChild(createStepBox(i + 1, page, [...frames], fault));
    await delay(300);
  }
  return pageFaults;
};

const lruAlgorithm = async (framesCount, pages) => {
  const frames = [];
  const recent = [];
  let pageFaults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let fault = false;
    if (!frames.includes(page)) {
      pageFaults++;
      fault = true;
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        const lru = recent.shift();
        frames[frames.indexOf(lru)] = page;
      }
    }
    const idx = recent.indexOf(page);
    if (idx !== -1) recent.splice(idx, 1);
    recent.push(page);
    frameContainer.appendChild(createStepBox(i + 1, page, [...frames], fault));
    await delay(300);
  }
  return pageFaults;
};

const mruAlgorithm = async (framesCount, pages) => {
  const frames = [];
  const recent = [];
  let pageFaults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let fault = false;
    if (!frames.includes(page)) {
      pageFaults++;
      fault = true;
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        const mru = recent.pop();
        frames[frames.indexOf(mru)] = page;
      }
    }
    const idx = recent.indexOf(page);
    if (idx !== -1) recent.splice(idx, 1);
    recent.push(page);
    frameContainer.appendChild(createStepBox(i + 1, page, [...frames], fault));
    await delay(300);
  }
  return pageFaults;
};

const optimalAlgorithm = async (framesCount, pages) => {
  const frames = [];
  let pageFaults = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    let fault = false;
    if (!frames.includes(page)) {
      pageFaults++;
      fault = true;
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        const future = pages.slice(i + 1);
        let farthest = -1;
        let idxToReplace = 0;
        frames.forEach((f, idx) => {
          const nextUse = future.indexOf(f);
          if (nextUse === -1) {
            idxToReplace = idx;
            farthest = Infinity;
          } else if (nextUse > farthest) {
            farthest = nextUse;
            idxToReplace = idx;
          }
        });
        frames[idxToReplace] = page;
      }
    }
    frameContainer.appendChild(createStepBox(i + 1, page, [...frames], fault));
    await delay(300);
  }
  return pageFaults;
};

const runAlgorithm = async (framesCount, pages, algo) => {
  showOutput.style.display = "block";
  frameContainer.innerHTML = "";
  let pageFaults = 0;

  switch (algo.toUpperCase()) {
    case "FIFO": pageFaults = await fifoAlgorithm(framesCount, pages); break;
    case "LRU": pageFaults = await lruAlgorithm(framesCount, pages); break;
    case "MRU": pageFaults = await mruAlgorithm(framesCount, pages); break;
    case "OPTIMAL": pageFaults = await optimalAlgorithm(framesCount, pages); break;
  }

  totalFaultsP.innerText = `Total Page Faults: ${pageFaults} / ${pages.length}`;
};

document.getElementById("pagingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const framesCount = parseInt(numFramesInput.value);
  const pages = refStringInput.value
                              .trim()                          
                              .split(/[\s,]+/)                 
                              .map(page => Number(page))  
                              .filter(page => !isNaN(page));

  if (framesCount <= 0 || pages.length === 0) {
    alert("Enter valid frames and reference string!");
    return;
  }

  runAlgorithm(framesCount, pages, selectedAlgo);
});
