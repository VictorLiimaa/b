class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, { item, priority });
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push({ item, priority });
        }
    }

    dequeue() {
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


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

let heuristica = {
    "Arad": 366,
    "Bucharest": 0,
    "Craiova": 160,
    "Drobeta": 242,
    "Eforie": 161,
    "Fagaras": 176,
    "Giurgiu": 77,
    "Hirsova": 151,
    "Iasi": 226,
    "Lugoj": 244,
    "Mehadia": 241,
    "Neamt": 234,
    "Oradea": 380,
    "Pitesti": 100,
    "Rimnicu Vilcea": 193,
    "Sibiu": 253,
    "Timisoara": 329,
    "Urziceni": 80,
    "Vaslui": 199
};

function buscaGulosa(mapa, heuristica, noInicial, noObjetivo) {
    let filaPrioridade = new PriorityQueue();
    filaPrioridade.enqueue(noInicial, heuristica[noInicial]);
    let visitados = new Set();
    let predecessores = {};

    while (!filaPrioridade.isEmpty()) {
        let noAtual = filaPrioridade.dequeue();

        if (noAtual === noObjetivo) {
            return reconstruirCaminho(predecessores, noInicial, noObjetivo);
        }

        visitados.add(noAtual);

        for (let vizinho in mapa[noAtual]) {
            if (!visitados.has(vizinho)) {
                predecessores[vizinho] = noAtual;
                filaPrioridade.enqueue(vizinho, heuristica[vizinho]);
            }
        }
    }

    return null;
}

console.log(buscaGulosa(mapaRomenia, "Arad", "Bucharest"));
