// All Comments are handwritten for better understanding!

const processes = [
  { cpuBurst: 10, At: 10, name: "P1", Priority: 2, St: null, Et: null, key: 1 },
  { cpuBurst: 13, At: 0, name: "P2", Priority: 12, St: null, Et: null, key: 2 },
  { cpuBurst: 3, At: 1, name: "P3", Priority: 5, St: null, Et: null, key: 3 },
];
var algo = "FCFS";
var type = "NON PRE-EMPTIVE";
const outputProcess = [];
const chartElements = [];


const LoadProcess = (process) => {
  const element = document.getElementById("processes");
  const child = document.createElement("tr");
  const head = document.createElement("th");
  head.setAttribute("scope", "row");
  head.innerHTML = `${process.name}`;
  const cpu = document.createElement("td");
  cpu.innerHTML = `${process.cpuBurst}`;
  const At = document.createElement("td");
  At.innerHTML = `${process.At}`;
  const Pri = document.createElement("td");
  Pri.innerHTML = `${process.Priority}`;
  child.appendChild(head);
  child.appendChild(cpu);
  child.appendChild(At);
  child.appendChild(Pri);
  element.appendChild(child);
};

processes.forEach((element) => {
  LoadProcess(element);
});

const AddButton = document.getElementById("addProcess");
const AlgoButton = document.getElementById("algo");
const TypeButton = document.getElementById("type");
const Start = document.getElementById("start");
const AlgoOptions = document.getElementsByClassName("algos");
const TypeOptions = document.getElementsByClassName("typeOptions")

const handleAddProcess = (evt) => {
  evt.preventDefault();
  const name = document.getElementById("name");
  const cpuBurst = document.getElementById("cpuBurst");
  const At = document.getElementById("arrivalTime");
  const pri = document.getElementById("priority");

  const process = {
    name: name.value,
    At: parseInt(At.value),
    cpuBurst: parseInt(cpuBurst.value),
    Priority: parseInt(pri.value),
    St: null,
    Et: null,
    key: processes.length + 1,
  };
  if (
    name.value != "" &&
    pri.value != "" &&
    At.value != "" &&
    cpuBurst.value != ""
  ) {
    processes.push(process);
    LoadProcess(process);
  }
  name.value = "";
  pri.value = "";
  At.value = "";
  cpuBurst.value = "";
};

const handleAlgoOptionClick = (evt) => {
  evt.preventDefault();
  AlgoButton.innerHTML = evt.target.innerHTML;
  algo = evt.target.innerHTML.toUpperCase();
}

const handleTypeOptionClicked = (evt) => {
  evt.preventDefault();
  TypeButton.innerHTML = evt.target.innerHTML;
  type = evt.target.innerHTML.toUpperCase();
  handleAlgosOnLoad();
}

const handleAlgosOnLoad = () => {
  if(type === "NON PRE-EMPTIVE"){
    document.getElementById("algos-non").classList.remove("d-none");
    document.getElementById("algos-pre").classList.add("d-none");
  }else{
    document.getElementById("algos-pre").classList.remove("d-none");
    document.getElementById("algos-non").classList.add("d-none");
  }
}
handleAlgosOnLoad();

const handleChangeAlgo = (evt) => {
  evt.preventDefault();
};

const displayOutput = () => {
  outputProcess.forEach((process) => {
    addElementToOutput(process);
  });
};

const addElementToOutput = (process) => {
  const element = document.getElementById("output");
  const child = document.createElement("tr");
  const head = document.createElement("th");
  head.setAttribute("scope", "row");
  head.innerHTML = `${process.name}`;
  const cpu = document.createElement("td");
  cpu.innerHTML = `${process.cpuBurst}`;
  const At = document.createElement("td");
  At.innerHTML = `${process.At}`;
  const Pri = document.createElement("td");
  Pri.innerHTML = `${process.Priority}`;
  const ST = document.createElement("td");
  ST.innerHTML = `${process.St}`;
  const ET = document.createElement("td");
  ET.innerHTML = `${process.Et}`;
  const TAT = document.createElement("td");
  const tat = process.Et - process.At;
  TAT.innerHTML = `${tat}`;
  const WT = document.createElement("td");
  WT.innerHTML = `${tat - process.cpuBurst}`;
  child.appendChild(head);
  child.appendChild(cpu);
  child.appendChild(At);
  child.appendChild(Pri);
  child.appendChild(ST);
  child.appendChild(ET);
  child.appendChild(TAT);
  child.appendChild(WT);
  element.appendChild(child);
};

function sortByAt(a, b) {
  return a.At - b.At;
}
function sortByCpu(a, b) {
  return a.cpuBurst - b.cpuBurst;
}

function sortByRemCpu(a, b) {
  if (!a.remCpu) {
    a.remCpu = a.cpuBurst;
  }
  if (!b.remCpu) {
    b.remCpu = b.cpuBurst;
  }
  return a.remCpu - b.remCpu;
}

function sortByPri(a, b) {
  return a.Priority - b.Priority;
}

const setToDefault = () => {
  processes.forEach((element) => {
    element.St = null;
    element.Et = null;
    element.remCpu ?? (element.remCpu = element.cpuBurst);
    outputProcess.pop();
  });
};

const AddGanttChart = (process) => {
  const element = document.getElementById("chart");
  element.style.height = "43px";
  const child = document.createElement("span");
  child.style.display = "flex";
  child.style.paddingLeft = "40px";
  child.style.paddingRight = "40px";
  child.style.paddingTop = "10px";
  child.style.paddingBottom = "10px";
  child.style.borderRadius = "5px";
  child.style.alignItems = "center";
  child.style.justifyContent = "center";
  child.style.backgroundColor = "#06AED5";
  child.style.margin = "10px";
  child.style.width = `${process.cpuBurst * 10}px`;
  child.innerHTML = process.name;
  element.append(child);
};



const handleStart = (evt) => {
  evt.preventDefault()
  const element = document.getElementById("output");
  element.innerHTML = "";
  const chart = document.getElementById("chart");
  chart.innerHTML = "";
  const show = document.getElementById("show");
  show.style.display = "Block";
  chart.style.display = "flex";
  chart.style.overflowX = "auto";
  chart.style.whiteSpace = "nowrap";
  chart.style.height = "60px";
  chart.style.alignItems = "center";
  chart.scrollIntoView({ behavior: "smooth", block : "center" });
  let time = 0;
  let count = 0;
  let ready_sorted;
  switch (type) {
    // NON PRE-EMPTIVE ALGORITHMS
    case "NON PRE-EMPTIVE":
      switch (algo) {
        // ----- FCFS -----
        case "FCFS":
          while (processes.length > count) {
            let sortedList = [...processes].sort(sortByAt);
            let sorted_unvisited = sortedList.filter(el => el.St == null);
            const process = sorted_unvisited[0];
            if (time < process.At) time = process.At;
            process.St = time;
            process.Et = process.St + process.cpuBurst;
            time = process.Et;
            count++;
            outputProcess.push(process);
            AddGanttChart(process);
          }
          displayOutput();
          setToDefault();
          break;

        // ----- SJF -----
        case "SJF":
          while (processes.length > count) {
            let ready = processes.filter(el => el.At <= time && el.St == null);
            let ready_sorted = [];

            if (ready.length > 0) {
              ready_sorted = ready.sort(sortByCpu);
            } else {
              ready = processes.filter(el => el.St == null);
              ready_sorted = ready.sort((a, b) => {
                if (a.At === b.At) return a.cpuBurst - b.cpuBurst;
                return a.At - b.At;
              });
              const nextProcess = ready_sorted[0];
              time = nextProcess.At;
            }

            const process = ready_sorted[0];
            if (time < process.At) time = process.At;
            process.St = time;
            process.Et = process.St + process.cpuBurst;
            time = process.Et;
            count++;
            outputProcess.push(process);
            AddGanttChart(process);
          }
          displayOutput();
          setToDefault();
          break;

        // ----- PRIORITY -----
        case "PRIORITY":
          while (processes.length > count) {
            let ready = processes.filter(el => el.At <= time && el.St == null);
            let ready_sorted = [];

            if (ready.length > 0) {
              ready_sorted = ready.sort(sortByPri);
            } else {
              ready = processes.filter(el => el.St == null);
              ready_sorted = ready.sort((a, b) => {
                if (a.At === b.At) return a.priority - b.priority;
                return a.At - b.At;
              });
              const nextProcess = ready_sorted[0];
              time = nextProcess.At;
            }

            const process = ready_sorted[0];
            if (time < process.At) time = process.At;
            process.St = time;
            process.Et = process.St + process.cpuBurst;
            time = process.Et;
            count++;
            outputProcess.push(process);  
            AddGanttChart(process);
          }
          displayOutput();
          setToDefault();
          break;
      }
      break;

  // PRE-EMPTIVE ALGORITHMS
    case "PRE-EMPTIVE":
      switch (algo) {

        // ----- SRT (Shortest Remaining Time) -----
        case "SJF": {
          let temp1 = [...processes].map(p => ({ ...p, remCpu: p.cpuBurst }));
          let time = 0;

          while (temp1.length > 0) {
            let ready = temp1.filter(el => el.At <= time);

            if (ready.length === 0) {
              time += 1;
              continue;
            }

            ready.sort(sortByRemCpu);
            let process = ready[0];

            if (process.St == null) {
              process.St = time;
            }

            process.remCpu -= 1;
            time += 1;
            process.Et = time;
            chartElements.push({ ...process });

            if (process.remCpu === 0) {
              temp1 = temp1.filter(el => el.key !== process.key);
              outputProcess.push(process);
            }
          }

          displayOutput();
          drawChart();
          break;
        }

        // ----- PRE-EMPTIVE PRIORITY -----
        case "PRIORITY": {
          let temp1 = [...processes].map(p => ({ ...p, remCpu: p.cpuBurst }));
          let time = 0;

          while (temp1.length > 0) {
            let ready = temp1.filter(el => el.At <= time);

            if (ready.length === 0) {
              time += 1;
              continue;
            }

            ready.sort(sortByPri);
            let process = ready[0];

            if (process.St == null) {
              process.St = time;
            }

            process.remCpu -= 1;
            time += 1;
            process.Et = time;
            chartElements.push({ ...process });

            if (process.remCpu === 0) {
              temp1 = temp1.filter(el => el.key !== process.key);
              outputProcess.push(process);
            }
          }

          displayOutput();
          drawChart();
          break;
        }

        case "ROUND ROBIN": {
          const quantum = parseInt(prompt("Enter Time Quantum:", "2")) || 2;
          let temp1 = [...processes].map(p => ({ ...p, remCpu: p.cpuBurst }));
          let time = 0;
          let i = 0;

          while (temp1.length > 0) {
            const process = temp1[i % temp1.length];

            if (process.At > time) {
              time++;
              continue;
            }

            if (process.St == null) process.St = time;

            const execTime = Math.min(quantum, process.remCpu);
            process.remCpu -= execTime;
            time += execTime;
            process.Et = time;

            for (let t = 0; t < execTime; t++) {
              chartElements.push({ ...process, cpuBurst: 1 });
            }

            if (process.remCpu === 0) {
              temp1 = temp1.filter(p => p.key !== process.key);
              outputProcess.push(process);
              i--;
            }

            i++;
          }

          displayOutput();
          drawChart();
          break;
        }

      }
    break;
  };
}

const drawChart = () =>{
  for(let i = 0; i < chartElements.length ; i++){
    if(chartElements.length == 1 || i == 0){
      AddGanttChart(chartElements[i]);
    }else if(chartElements[i].key == chartElements[i-1].key){
      continue;
    }else{
      AddGanttChart(chartElements[i]);
    }
  }
}

AddButton.addEventListener("click", handleAddProcess);
for(let i = 0 ; i < AlgoOptions.length ; i++){
  AlgoOptions[i].addEventListener("click", handleAlgoOptionClick);
}
for(let i = 0 ; i < TypeOptions.length ; i++){
  TypeOptions[i].addEventListener("click", handleTypeOptionClicked);
}
AlgoButton.addEventListener("click", handleChangeAlgo);
Start.addEventListener("click", handleStart);
