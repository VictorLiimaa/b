function buscaProfundidadeLimitada(map, start, goal, depth, path = [], visited = new Set()) {
    path.push(start);
    visited.add(start);

    if (start === goal) {
        return path;
    }

    if (depth === 0) {
        return null; 
    }

    let neighbors = map[start];
    for (let neighbor in neighbors) {
        if (!visited.has(neighbor)) {
            let result = buscaProfundidadeLimitada(map, neighbor, goal, depth - 1, path, visited);
            if (result) {
                return result;  
            }
        }
    }

    path.pop();
    visited.delete(start);
    return null; 
}

function buscaProfundidadeInterativa(map, start, goal) {
    let limite = 0;
    while (true) {
        let visited = new Set(); 
        let result = buscaProfundidadeLimitada(map, start, goal, limite);
        if (result) {
            return result;  
        }
        limite++; 
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

console.log(buscaProfundidadeInterativa(mapaRomenia, "Arad", "Bucharest"));
