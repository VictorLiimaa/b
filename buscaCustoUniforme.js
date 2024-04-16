let mapaRomenia = {
    "Arad": {"Sibiu": 140, "Zerind": 75, "Timisoara": 118},
    "Zerind": {"Arad": 75, "Oradea": 71},
    "Oradea": {"Zerind": 71, "Sibiu": 151},
    "Sibiu": {"Arad": 140, "Oradea": 151, "Fagaras": 99, "Rimnicu Vilcea": 80},
    "Timisoara": {"Arad": 118, "Lugoj": 111},
    "Lugoj": {"Timisoara": 111, "Mehadia": 70},
    "Mehadia": {"Lugoj": 70, "Drobeta": 75},
    "Drobeta": {"Mehadia": 75, "Craiova": 120},
    "Craiova": {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138},
    "Rimnicu Vilcea": {"Sibiu": 80, "Craiova": 146, "Pitesti": 97},
    "Fagaras": {"Sibiu": 99, "Bucharest": 211},
    "Pitesti": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101},
    "Bucharest": {"Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85},
    "Giurgiu": {"Bucharest": 90},
    "Urziceni": {"Bucharest": 85, "Vaslui": 142, "Hirsova": 98},
    "Hirsova": {"Urziceni": 98, "Eforie": 86},
    "Eforie": {"Hirsova": 86},
    "Vaslui": {"Iasi": 92, "Urziceni": 142},
    "Iasi": {"Vaslui": 92, "Neamt": 87},
    "Neamt": {"Iasi": 87}
};
function PriorityQueue() {
    this.items = [];
}

PriorityQueue.prototype.enqueue = function(element, priority) {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
            this.items.splice(i, 0, queueElement);
            added = true;
            break;
        }
    }

    if (!added) {
        this.items.push(queueElement);
    }
};

PriorityQueue.prototype.dequeue = function() {
    return this.items.shift().element;
};

PriorityQueue.prototype.isEmpty = function() {
    return this.items.length === 0;
};

function uniformCostSearch(map, start, goal) {
    let frontier = new PriorityQueue();
    frontier.enqueue({ city: start, path: [], cost: 0 }, 0);
    let visited = new Set();

    while (!frontier.isEmpty()) {
        let { city, path, cost } = frontier.dequeue();
        path = path.concat(city);

        if (city === goal) {
            return path;
        }

        if (!visited.has(city)) {
            visited.add(city);
            for (let neighbor in map[city]) {
                if (!visited.has(neighbor)) {
                    let totalCost = cost + map[city][neighbor];
                    frontier.enqueue({ city: neighbor, path, cost: totalCost }, totalCost);
                }
            }
        }
    }
    return null;
}

console.log(uniformCostSearch(mapaRomenia, "Arad", "Bucharest"));




