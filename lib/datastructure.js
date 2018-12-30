const Stack = (function() {
    "use strict"
    /**
     * @class Stack
     * @classdesc A Stack is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Stack = require("@structure-js/datastructure").Stack
     * var stack = new Stack()
     * ```
     */
    function Stack() {
        this._top = null;
        this._size = 0;
    }
    function Node(value, next) {
        this._value = value;
        this._next = next;
    }
    Stack.prototype = {
        *[Symbol.iterator]() {
            if(this._top === null) return { done: true };
            var cur = this._top;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        push: function(value) {
            var node = new Node(value,this._top);
            this._top = node;
            this._size++;
            return true;
        },
        pop: function() {
            if(this._top === null) throw Error("Object is empty!");
            var value = this._top._value;
            this._top = this._top._next;
            this._size--;
            return value;
        },
        top: function() {
            if(this._top === null) throw Error("Object is empty!");
            return this._top._value;
        },
        size: function() {
            return this._size;
        },
        isEmpty: function() {
            if(this._top === null) return true;
            return false;
        },
        clear: function() {
            this._top = null;
            this._size = 0;
        }
    }
    return Stack;
})();
const Queue = (function() {
    "use strict"
    /**
     * @class Queue
     * @classdesc A Queue is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Queue = require("@structure-js/datastructure").Queue
     * var queue = new Queue()
     * ```
     */
    function Queue() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    Queue.prototype = {
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        push: function(value) {
            var node = new Node(value, null, this._last);
            if(this._last) this._last._next = node;
            else this._first = node;
            this._last = node;
            this._size++;
            return true;
        },
        pop: function() {
            if(this._first === null) throw new Error("Object is empty!");
            var value = this._first._value;
            this._first = this._first._next;
            if(this._first) this._first._prev = null;
            else this._last = null;
            this._size--;
            return value;
        },
        front: function() {
            if(this.isEmpty()) throw new Error("Object is empty!");
            return this._first._value;
        },
        size: function() {
            return this._size;
        },
        isEmpty: function() {
            if(this._first === null && this._last === null) return true;
            return false;
        },
        clear: function() {
            this._first = null;
            this._last = null;
            this._size = 0;
        }
    }
    return Queue;
})();
const Deque = (function() {
    "use strict"
    /**
     * @class Deque
     * @classdesc A Deque is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var Deque = require("@structure-js/datastructure").Deque
     * var deque = new Deque()
     * ```
     */
    function Deque() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    Deque.prototype = {
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        pushFront: function(value) {
            var node = new Node(value, this._first, null);
            if(this._first) this._first._prev = node;
            else this._last = node;
            this._first = node;
            this._size++;
            return true;
        },
        pushBack: Queue.prototype.push,
        popFront: Queue.prototype.pop,
        popBack: function() {
            if(this._last === null) throw new Error("Object is empty!");;
            var value = this._last._value;
            this._last = this._last._prev;
            if(this._last) this._last._next = null;
            else this._first = null;
            this._size--;
            return value;
        },
        front: Queue.prototype.front,
        back: function() {
            if(this.isEmpty()) throw new Error("Object is empty!");
            return this._last._value;
        },
        size: Queue.prototype.size,
        isEmpty: Queue.prototype.isEmpty,
        clear: Queue.prototype.clear
    }
    return Deque;
})();
const List = (function() {
    "use strict"
    /**
     * @class List
     * @classdesc A List is a linear data structure.
     * @desc
     * #### Example -
     * ```js
     * var List = require("@structure-js/datastructure").List
     * var list = new List()
     * ```
     */
    function List() {
        this._first = null;
        this._last = null;
        this._size = 0;
    }
    function Node(value, next, prev) {
        this._value = value;
        this._next = next;
        this._prev = prev;
    }
    List.prototype = {
        pushFront: Deque.prototype.pushFront,
        pushBack: Deque.prototype.pushBack,
        popFront: Deque.prototype.popFront,
        popBack: Deque.prototype.popBack,
        front: Deque.prototype.front,
        back: Deque.prototype.back,
        size: Deque.prototype.size,
        isEmpty: Deque.prototype.isEmpty,
        clear: Deque.prototype.clear,
        *[Symbol.iterator]() {
            if(this._first === null) return { done: true };
            var cur = this._first;
            while(cur !== null){
                yield cur._value; 
                cur = cur._next;
            }           
        },
        at: function(idx) {
            var cur;
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                cur = this._last;
                while(++idx){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
                return cur._value;
        },
        insert: function(idx,value) {
            var cur;
            if(idx == 0 || idx == this._size*-1){
                this.pushFront(value);
                return true;
            }
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                idx++;
                cur = this._last;
                while(idx++){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
            var node = new Node(value,cur,cur._prev);
            cur._prev._next = node;
            cur._prev = node;
            this._size++;
            return true;
        },
        delete: function(idx){
            var cur;
            if(idx == 0 || idx == this._size*-1){
                return this.popFront(value);
            }else if(idx == -1 || idx == this._size-1){
                return this.popBack(value);
            }
            if(idx > -1){
                cur = this._first;
                while(idx--){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._next;
                }
            }else{
                idx++;
                cur = this._last;
                while(idx++){
                    if(cur === null) throw new Error("Index out of range");
                    cur = cur._prev;
                }
            }
            if(cur === null) throw new Error("Index out of range");
            var value = cur._value;
            cur._prev._next = cur._next;
            cur._next._prev = cur._prev;
            this._size--;
            return value;
        }
    }
    return List;
})();
const Heap = (function() {
    "use strict"
    /**
     * @class Heap
     * @classdesc A Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var Heap = require("@structure-js/datastructure").MaxHeap
     * var Heap = new MaxHeap()
     * ```
     */
    function Heap() {
        this._list = [0];
        this._compare = function(){};
    }
    Heap.prototype = {
        push: function(value) {
            this._list.push(value);
            var curIdx = this._list.length - 1;
            var parentsIdx = parseInt(curIdx / 2);
            while(parentsIdx){
                if(this._compare(this._list[parentsIdx], value)) return 0;
                var tmp = this._list[parentsIdx];
                this._list[parentsIdx] = this._list[curIdx];
                this._list[curIdx] = tmp;
                curIdx = parentsIdx;
                parentsIdx = parseInt(parentsIdx / 2);
            }
            return 0;
        },
        pop: function() {
            if(this._list.length === 1) throw new Error("Heap is empty!")
            var value = this._list[1];
            this._list[1] = this._list[this._list.length - 1];
            this._list.pop();
            var idx = 1;
            while(idx*2 < this._list.length){
                if(idx*2+1 < this._list.length){
                    if(this._compare(this._list[idx],this._list[idx*2]) && this._compare(this._list[idx],this._list[idx*2+1])){
                        return value;
                    }else if(this._compare(this._list[idx*2],this._list[idx*2+1])){
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2];
                        this._list[idx*2] = tmp;
                        idx = idx*2;
                    }else{
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2+1];
                        this._list[idx*2+1] = tmp;
                        idx = idx*2+1;
                    }
                }else{
                    if(this._compare(this._list[idx],this._list[idx*2])){
                        return value;
                    }else{
                        var tmp = this._list[idx];
                        this._list[idx] = this._list[idx*2];
                        this._list[idx*2] = tmp;
                        idx = idx*2;
                    }
                }
            }
            return value;
        },
        top: function() {
            return this._list[1];
        },
        clear: function() {
            this._list = [0];
        },
        isEmpty: function() {
            if(this._list.length === 1) return true;
            return false;
        },
        size: function() {
            return this._list.length - 1;
        }
    }
    return Heap;
})();
const MaxHeap = (function() {
    "use strict"
    /**
     * @class Max Heap
     * @classdesc A Max Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var MaxHeap = require("@structure-js/datastructure").MaxHeap
     * var maxHeap = new MaxHeap()
     * ```
     */
    function MaxHeap() {
        this._list = [0];
        this._compare = function(x,y){
            return x > y;
        };
    }
    MaxHeap.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    return MaxHeap;
})();
const MinHeap = (function() {
    "use strict"
    /**
     * @class Min Heap
     * @classdesc A Min Heap is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var MinHeap = require("@structure-js/datastructure").MinHeap
     * var minHeap = new MinHeap()
     * ```
     */
    function MinHeap() {
        this._list = [0];
        this._compare = function(x,y){
            return x < y;
        };
    }
    MinHeap.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    return MinHeap;
})();
const PriorityQueue = (function() {
    "use strict"
    /**
     * @class Priority Queue
     * @classdesc A Priority Queue is a abstract data structure.
     * @desc
     * #### Example -
     * ```js
     * var PriorityQueue = require("@structure-js/datastructure").PriorityQueue
     * var priorityQueue = new PriorityQueue()
     * ```
     */
    function PriorityQueue(compare) {
        this._list = [0];
        this._compare = compare;
    }
    PriorityQueue.prototype = {
        push: Heap.prototype.push,
        pop: Heap.prototype.pop,
        top: Heap.prototype.top,
        clear: Heap.prototype.clear,
        isEmpty: Heap.prototype.isEmpty,
        size: Heap.prototype.size
    }
    return PriorityQueue;
})();
const Graph = (function () {
    "use strict";
    /**
     * @class Graph
     * @classdesc A Graph is a non-linear data structure consisting of nodes and edges.
     * This is implemented with Adjacency List.
     * @desc
     * #### Example -
     * ```js
     * var Graph = require("@structure-js/datastructure").Graph
     * var graph=new Graph()
     * ```
     */
    let isVertexType = function (vertex) {
        return vertex instanceof Graph.Vertex;
    }

    function Graph() {
        this.vertexSize = 0;
        this.edgeSize = 0;
        this._negativeWeightCnt = 0;
        let vertexMap = new Map();

        this.getVertexMap = function () {
            return vertexMap;
        }

        return this;
    }

    Graph.prototype = {
        addVertex: function (value) {
            let vertex = new Graph.Vertex(value);
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : " + typeof (vertex));
            }

            this.getVertexMap().set(value,vertex);
            this.vertexSize++;
        },
        removeVertex: function (value) {
            let vertex = this.getVertex(value);

            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : vertex");
            }

            for (let edge of this.getEdgeIterator()) {
                if (edge.vs.value === value || edge.ve.value === value) {
                    this.removeEdge(edge.vs.value, edge.ve.value);
                }
            }

            this.getVertexMap().delete(value);
            this.vertexSize--;
        },
        hasVertex: function (value) {
            // // Check type of vertex.
            // if (!isVertexType(vertex)) {
            //     throw new Error("VertexTypeError : start-vertex");
            // }
            return this.getVertexMap().has(value);
        },
        hasEdge: function (v1, v2) {
            vs = this.getVertex(v1);
            ve = this.getVertex(v2);

            return vs.hasEdgeTo(ve);
        },
        getVertex: function(value){
            let result = this.getVertexMap().get(value);
            if(result === undefined){
                throw new Error("NotExistError : " + value);
            }else{
                return result;
            }
        },
        addEdge: function (v1, v2, weight) {
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            // Check type of vs and ve.
            if (!isVertexType(vs)) {
                throw new Error("VertexTypeError : start-vertex");
            }
            if (!isVertexType(ve)) {
                throw new Error("VertexTypeError : end-vertex");
            }
            // Check this graph has vs or ve.
            if (!this.hasVertex(v1)) {
                throw new Error("Vertex doesn't exist : start-vertex " + v1);
            }
            if (!this.hasVertex(v2)) {
                throw new Error("Vertex doesn't exist : end-vertex " + v2);
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }

            if(weight<0){
                this._negativeWeightCnt++;
            }
            vs.addEdge(ve, weight);
            this.edgeSize++;
        },
        getWeight: function (v1, v2){
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(v1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(v2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            return vs.getWeightTo(ve);
        },
        removeEdge: function (v1, v2) {
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(v1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(v2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            if(vs.getWeightTo(ve) < 0){
                this._negativeWeightCnt--;
            }

            vs.removeEdge(ve);
            this.edgeSize--;
        },
        updateEdgeWeight: function (v1, v2, weight) {
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(v1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(v2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }
            // Check is this edge exist.
            if (!vs.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }

            if(weight < 0 && vs.getWeightTo(ve) >= 0){
                this._negativeWeightCnt++;
            }
            vs.updateEdgeWeightTo(ve, weight);
        },
        getNeighborsOf: function (value) {
            return this.getVertex(value).getNeighbors();
        },
        /**  This function is for get distance between two other vertexes.
         * This basically use Dijkstra algorithm with Queue. - O(V^2)
         * But, If the graph has at least one edge of negative weight, use Bellman-Ford's algorithm. - O(VE)
         * TODO: Change Queue to Minimum Heap in Dijkstra algorithm. - O(ElogV)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        getDistance: function (v1, v2) {
            if(this.hasNegativeWeight()){
                return this.bellmanFord(v1,v2)[0];
            }else{
                return this.dijkstra(v1, v2)[0];
            }
        }, 
        getPath: function (v1, v2) {
            if(this.hasNegativeWeight()){
                return this.bellmanFord(v1,v2)[1];
            }else{
                return this.dijkstra(v1, v2)[1];
            }
        },

        getVertexIterator: function () {
            return this.getVertexMap().values();
        },
        getEdgeIterator: function* () {
            for (let vs of this.getVertexIterator()) {
                for (let ve of vs.getNeighborsIterator()) {
                    yield new Graph.Edge(vs, ve, vs.getWeightTo(ve));
                }
            }
        },
        /**
         * [deprecated]
         * This is dijkstra algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * This is implemented using queue.
         * 
         * Time complexity : O(V^2)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        dijkstraUsingQueue: function (v1, v2) {
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            let distanceMap = new Map();
            let pathMap = new Map();
            let tempQueue = new Queue();
            tempQueue.push(vs);

            for (let vertex of this.getVertexIterator()) {
                distanceMap.set(vertex, Number.MAX_SAFE_INTEGER);
                pathMap.set(vertex, [vs]);
            }
            distanceMap.set(vs, 0);

            while (!tempQueue.isEmpty()) {
                let currentVertex = tempQueue.pop();
                let currentDistance = distanceMap.get(currentVertex);
                let currentPath = pathMap.get(currentVertex);
                // Loop for neighbors of currentVertex
                for (let neighbor of currentVertex.getNeighborsIterator()) {
                    let weight = currentVertex.getWeightTo(neighbor);

                    // Push to tempQueue if this neighbor wasn't visited
                    if (distanceMap.get(neighbor) === Number.MAX_SAFE_INTEGER) {
                        tempQueue.push(neighbor);
                    }

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (distanceMap.get(neighbor) > newDistance) {
                        // update distance
                        distanceMap.set(neighbor, newDistance);

                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(neighbor);
                        pathMap.set(neighbor, tempCurrentPath);
                    }
                }
            }

            let resultDistance = distanceMap.get(ve);
            let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(ve));
            return [resultDistance, resultPath];
        },
        /**
         * This is dijkstra algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * This is implemented using min-heap.
         * 
         * Time complexity : O(ElogV)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        dijkstra: function (v1, v2) {
            let vs = this.getVertex(v1);
            let ve = this.getVertex(v2);

            let distanceMap = new Map();
            let pathMap = new Map();
            let tempHeap = new MinHeap();

            let VertexDistance = function(vertex, distance){
                this.vertex = vertex;
                this.distance = distance;
            }

            tempHeap._compare = function(e1, e2){
                return e1.distance < e2.distance;
            }

            tempHeap.push(new VertexDistance(vs, 0));
            distanceMap.set(v1, 0);

            for (let vertex of this.getVertexIterator()) {
                if(vertex !== vs){
                    tempHeap.push(new VertexDistance(vertex, Number.MAX_SAFE_INTEGER));
                    distanceMap.set(vertex.value, Number.MAX_SAFE_INTEGER);
                }
                pathMap.set(vertex.value, [v1]);
            }

            while (!tempHeap.isEmpty()) {
                let currentVertex = tempHeap.pop().vertex;
                console.log(currentVertex);
                let currentDistance = distanceMap.get(currentVertex.value);
                let currentPath = pathMap.get(currentVertex.value);
                // Loop for neighbors of currentVertex
                for (let neighbor of currentVertex.getNeighborsIterator()) {
                    let weight = currentVertex.getWeightTo(neighbor);

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (distanceMap.get(neighbor.value) > newDistance) {
                        // update distance
                        distanceMap.set(neighbor.value, newDistance);
                        tempHeap.push(new VertexDistance(neighbor, newDistance));
                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(neighbor.value);
                        pathMap.set(neighbor.value, tempCurrentPath);
                    }
                }
            }

            let resultDistance = distanceMap.get(v2);
            let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(v2));
            return [resultDistance, resultPath];
        },
        /**
         * This is bellman-ford's algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * 
         * Time complexity : O(V^2)
         * 
         * @param {Key} v1 
         * @param {Key} v2 
         */
        bellmanFord: function (v1, v2) {
            let distanceMap = new Map();
            let pathMap = new Map();

            for (let vertex of this.getVertexIterator()) {
                distanceMap.set(vertex.value, Number.MAX_SAFE_INTEGER);
                pathMap.set(vertex.value, [v1]);
            }
            distanceMap.set(v1, 0);

            let isUpdated = true;
            // loop until vertexSize
            for (let i = 0; i < this.vertexSize; i++) {
                isUpdated = false;
                for (let edge of this.getEdgeIterator()) {

                    let currentVsDistance = distanceMap.get(edge.vs.value);
                    let currentPath = pathMap.get(edge.vs.value);
                    let newDistance = currentVsDistance + edge.weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (currentVsDistance < Number.MAX_SAFE_INTEGER
                        && newDistance < distanceMap.get(edge.ve.value)) {
                        // update distance
                        distanceMap.set(edge.ve.value, newDistance);
                         
                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(edge.ve.value);
                        pathMap.set(edge.ve.value, tempCurrentPath);

                        isUpdated = true;
                    }
                }
            }

            if (isUpdated) {
                throw new Error("NegativeCycleError : This graph has at least one negative-cycle.");
            } else {
                let resultDistance = distanceMap.get(v2);
                let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(v2));
                return [resultDistance, resultPath];
            }
        },
        hasNegativeWeight: function(){
            return this._negativeWeightCnt > 0;
        }
    }

    Graph.Vertex = function (value) {
        this.value = value;
        this.edgeSize = 0;
        // Use Map
        var edgeMap = new Map();

        this.getEdgeMap = function () {
            return edgeMap;
        }
    }

    Graph.Vertex.prototype = {
        addEdge: function (ve, weight) {
            // Check is this edge already exist.
            if (this.hasEdgeTo(ve)) {
                throw new Error("Already has this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }
            this.getEdgeMap().set(ve, weight);
            this.edgeSize++;
        },
        removeEdge: function (ve) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            this.getEdgeMap().delete(ve);
            this.edgeSize--;
        },
        updateEdgeWeightTo: function (ve, weight) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }
            this.getEdgeMap().set(ve, weight);
        },
        hasEdgeTo: function (ve) {
            if (!isVertexType(ve)) {
                throw new Error("VertexTypeError : ");
            }
            return this.getEdgeMap().has(ve);
        },
        getWeightTo: function (ve) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            return this.getEdgeMap().get(ve);
        },
        getNeighborsIterator: function () {
            return this.getEdgeMap().keys();
        }
    }

    Graph.Edge = function (vs, ve, weight) {
        if (typeof (weight) !== "number") {
            throw new Error("The value of 'weight' is only allowed number");
        }
        // Check is weight a number.
        if (typeof (weight) != "number") {
            throw new Error("The value of 'weight' is only allowed number");
        }

        this.vs = vs;
        this.ve = ve;
        this.weight = weight;
    }
    return Graph;
})();
const UndirectedGraph = (function () {
    "use strict";
    /**
     * @class Graph
     * @classdesc A Graph is a non-linear data structure consisting of nodes and edges.
     * This is implemented with Adjacency List.
     * @desc
     * #### Example -
     * ```js
     * var UndirectedGraph = require("@structure-js/datastructure").UndirectedGraph
     * var UndirectedGraph=new UndirectedGraph()
     * ```
     */

    let isVertexType = function(vertex) {
        return vertex instanceof Graph.Vertex;
    }

    function UndirectedGraph() {
        this.vertexSize = 0;
        this.edgeSize = 0;
        this.vertexSet = new Set();

        return this;
    }

    UndirectedGraph.prototype = new Graph();

    UndirectedGraph.prototype.addEdge = function(k1, k2, weight){
        let v1 = this.getVertex(k1);
        let v2 = this.getVertex(k2);

        v1.addEdge(v2, weight);
        v2.addEdge(v1, weight);
        this.edgeSize++;
    }

    UndirectedGraph.prototype.removeEdge = function(k1, k2){
        let v1 = this.getVertex(k1);
        let v2 = this.getVertex(k2);
        
        v1.removeEdge(v2);
        v2.removeEdge(v1);
        this.edgeSize--;
    }

    UndirectedGraph.Vertex = Graph.Vertex;

    return UndirectedGraph;
})();
const Tree = (function () {
    "use strict";
    /**
     * @class Tree
     * @classdesc Tree is a non-linear data structure simulates a 
     * hierarchical tree structure, with a root value and sub-trees of children 
     * with a parent node, represented as a set of linked nodes.
     * 
     * This doesn't allow duplicated value of node.
     * @desc
     * #### Example -
     * ```js
     * var Tree = require("@structure-js/datastructure").Tree
     * var tree=new Tree()
     * ```
     */

    function Tree() {
        this.nodeSize = 0;
        this.height = 0;
        this.root = null;

        this.setRoot = function (value) {
            if (!(value instanceof Tree.Node)) {
                if (this.root === null) {
                    this.root = new Tree.Node(value);
                    this.nodeSize++;
                } else {
                    this.root.value = value;
                }
            } else {
                this.root = value;
            }
        }

        return this;
    }

    Tree.prototype = {
        insertTo: function (targetValue, newValue) {
            if (this.contains(newValue)) {
                throw new Error("AlreadyExistError : " + newValue);
            }
            let targetNode = this.getNode(targetValue);
            let newNode = new Tree.Node(newValue);
            newNode.setParent(targetNode);
            targetNode.insert(newNode);
            this.nodeSize++;
        },
        isEmpty: function () {
            return this.root === null;
        },
        contains: function (value) {
            try {
                return this.getNode(value) instanceof Tree.Node;
            } catch (e) {
                return false;
            }
        },
        // DFS
        getNode: function (value) {
            if (this.root === null) {
                return null;
            }

            for (let node of this.dfsIterator()) {
                if (node.value === value) {
                    return node;
                }
            }

            throw new Error('NonExistError : when you try to get ' + value);
        },
        deleteNode: function (value) {
            targetNode = this.getNode(value);
            if (targetNode == null) {
                throw new Error('NonExistError : when you try to delete ' + value);
            }

            parentNode = targetNode.getParent();
            parentNode.deleteChild(targetNode);
            targetNode.setParent(null);
        },
        // bfs
        bfsIterator: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                if (this.root === null) {
                    return null;
                }
            }
            let queue = new Queue();
            queue.push(node);
            while (!queue.isEmpty()) {
                let n = queue.pop();
                yield n;

                for (let child of n.getChildren()) {
                    if (child !== null) {
                        queue.push(child);
                    }
                }
            }
        },
        // pre-order
        dfsIterator: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                if (this.root === null) {
                    return null;
                }
            }
            for (let child of node.getChildren()) {
                if (child !== null) {
                    yield* this.dfsIterator(child);
                }
            }
            yield node;
        },
        // in-order
        dfsIteratorInOrder: function* (node) {
            if (!(node instanceof Tree.Node)) {
                node = this.root;
            }
            yield node;
            for (let child of node.getChildren()) {
                yield* this.dfsIteratorInOrder(child);
            }
        },
        // in-order
        _dfsVisualization: function (node, level, isFirst) {
            if (node === null) {
                return;
            }
            if (!(node instanceof Tree.Node)) {
                node = this.root;
                level = 0;
                isFirst = true;
            }
            let char = "";
            let i;
            if (!isFirst) {
                console.log();
                for (i = 0; i < level - 1; i++) {
                    char += "\t";
                }
            }
            if (level !== 0) {
                char += "\t";
            }
            process.stdout.write(char + node.value);
            for (let child of node.getChildren()) {
                if (child === node.getChildren()[0]) {
                    this._dfsVisualization(child, level + 1, true);
                } else {
                    this._dfsVisualization(child, level + 1, false);
                }
            }
        }
    }

    Tree.Node = function (value) {
        this.value = value;
        this.parent = null;
        this.children = [];
        this.childrenSize = 0;
    }

    Tree.Node.prototype = {
        getChildren: function () {
            return this.children;
        },
        getChildrenSize: function () {
            return this.childrenSize;
        },
        hasChild: function (child) {
            for (let temp of this.children) {
                if (temp === child) {
                    return true;
                }
            }
            return false;
        },
        insert: function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            this.children.push(child);
            child.setParent(this);
            this.childrenSize++;
        },
        deleteChild: function (child) {
            if (!(child instanceof Tree.Node)) {
                throw new Error("NodeTypeError : " + child);
            }
            let isDeleted = false;
            for (let i = 0; i < this.childrenSize; i++) {
                if (this.children[i] === child) {
                    this.children.splice(i, 1);
                    this.childrenSize--;
                    isDeleted = true;
                    break;
                }
            }

            if (!isDeleted) {
                throw new Error("NonExistentNodeError : " + child);
            }
        },
        isRoot: function () {
            return this.getParent() === null;
        },
        getParent: function () {
            return this.parent;
        },
        setParent: function (_parent) {
            this.parent = _parent;
        }

    }

    return Tree;
})();
const BinarySearchTree = (function () {
    "use strict";
    /**
     * @class BinarySearchTree
     * @classdesc BinarySearchTree keep its keys in sorted order, so that 
     * lookup and other operations can use the principle of binary search.
     * 
     * This is implemented using 'Red-black tree'. Red-black tree is a kind 
     * of self-balancing binary search tree.  Each node of the binary tree 
     * has an extra bit, and that bit is often interpreted as the color 
     * (red or black) of the node. These color bits are used to ensure the 
     * tree remains approximately balanced during insertions and deletions.
     * 
     * Red-black tree has 5 more requirements on a binary-search tree.
     * - Each node is either red or black.
     * - The root is black. (This rule is sometimes omitted. Since the root 
     *  can always be changed from red to black, but not necessarily vice 
     *  versa, this rule has little effect on analysis.)
     * - All leaves (NIL) are black.
     * - If a node is red, then both its children are black.
     * - Every path from a given node to any of its descendant NIL nodes 
     *       contains the same number of black nodes.
     * 
     * Time complexity
     * - searching : O(log n)
     * - insertion : O(log n)
     * - deletion : O(log n)
     * 
     * ref) [Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
     * 
     * @desc
     * #### Example -
     * ```js
     * var BinarySearchTree = require("@structure-js/datastructure").BinaryTree;
     * var binarySearchTree=new BinarySearchTree();
     * ```
     */

    function BinarySearchTree() {
        this.nodeSize = 0;
        this.height = 0;
        this.root = null;
        this._compare = function(value1, value2) {
            return value1 - value2;
        }

        return this;
    }

    const RED = 0;
    const BLACK = 1;
    const LEFT = 2;
    const RIGHT = 3;

    let isRed = function(node){
        // console.log('isRed');
        if (!(node instanceof BinarySearchTree.Node)) {
            if (this.isEmpty()) throw new Error("NodeTypeError");
        }
        let temp = node;
        // console.log(node);
        for (let i = 1; i < arguments.length; i++) {
            switch (arguments[i]) {
                case LEFT:
                    if (temp.getLeft() !== null) {
                        temp = temp.getLeft();
                    } else {
                        return false;
                    }
                    break;
                case RIGHT:
                    if (temp.getRight() !== null) {
                        temp = temp.getRight();
                    } else {
                        return false;
                    }
                    break;
            }
        }
        // console.log(temp);
        return temp.color === RED;
    }

    BinarySearchTree.prototype = new Tree();
    
    BinarySearchTree.prototype.insert = function (value) {
        if (this.contains(value)) {
            throw new Error("AlreadyExistError : " + value);
        }

        this.root = this._insert(this.root, value);
        this.root.setParent(null);
        this.root.color = BLACK;
        this.nodeSize++;
    }
    BinarySearchTree.prototype._insert = function (node, value) {
        if(node === null){
            return new BinarySearchTree.Node(value, RED);
        }

        let cmp = this._compare(node.value, value); 
        if(cmp > 0){
            let newNode = this._insert(node.getLeft(), value);
            newNode.setParent(node);
            node.setLeft(newNode);
        }else if(cmp < 0){
            let newNode = this._insert(node.getRight(), value);
            newNode.setParent(node);
            node.setRight(newNode);
        }else{
            throw new Error("AlreadyExistError : " + value);
        }

        if(isRed(node, RIGHT) && !isRed(node, LEFT)){
            node = this.rotateLeft(node);
        }
        if(isRed(node, LEFT) && isRed(node, LEFT,LEFT)){
            node = this.rotateRight(node);
        }
        if(isRed(node, LEFT) && isRed(node, RIGHT)){
            this.flipColors(node);
        }
        //node.size = node.left.size + node.right.size + 1;

        return node;
    }

    BinarySearchTree.prototype.delete = function (value) {
        if(!this.contains(value)){
            return;
        }

        if(!isRed(this.root, LEFT) && !isRed(this.root, RIGHT)){
                this.root.color = RED;
        }
        
        this.setRoot(this._delete(this.root, value));

        if(!this.isEmpty()){
            this.root.color = BLACK;
        }
    }

    BinarySearchTree.prototype._delete = function (node, value) {
        if(node===null){
            return null;
        }
        if (this._compare(value, node.value) < 0) {
            if (!isRed(node, LEFT) && !isRed(node,LEFT,LEFT)) {
                node = this.moveRedLeft(node);
            }
            node.setLeft(this._delete(node.getLeft(), value));
        } else {
            if (isRed(node, LEFT)) {
                node = this.rotateRight(node);
            }
            if (this._compare(value, node.value) === 0 && node.getRight() === null) {
                return null;
            }
            if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT)) {
                node = this.moveRedRight(node);
            }
            if (this._compare(value, node.value) === 0) {
                let x = this.getNode(this.getMin(node.getRight()));
                node.value = x.value;
                // node.value = this.getNode(this.getMin(node.getRight())).value;
                node.setRight(this._deleteMin(node.getRight()));
            } else {
                node.setRight(this._delete(node.getRight(), value));
            }
        }
        return this.balance(node);
    }

    BinarySearchTree.prototype.deleteMin = function(){
        if(this.isEmpty()) throw new Error("NoSuchElementException");
        // if both children of root are black, set root to red
        if (!isRed(this.root, LEFT) && !isRed(this.root,RIGHT)){
            this.root.color = RED;
        }
        this.root = this._deleteMin(this.root);
        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }
    BinarySearchTree.prototype._deleteMin = function(node){
        if (node.getLeft() === null){
            return null;
        }

        if (!isRed(node,LEFT) && !isRed(node, LEFT, LEFT)){
            node = this.moveRedLeft(node);
        }

        node.setLeft(this._deleteMin(node.getLeft()));
        return this.balance(node);
    }

    BinarySearchTree.prototype.deleteMax = function(){
        if(this.isEmpty()) throw new Error("NoSuchElementException");
        // if both children of root are black, set root to red
        if (!isRed(this.root, LEFT) && !isRed(this.root,RIGHT)){
            this.root.color = RED;
        }
        this.root = this._deleteMax(this.root);
        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }

    BinarySearchTree.prototype._deleteMax = function (node) {
        if (isRed(node, LEFT))
            node = this.rotateRight(node);

        if (node.getRight() === null)
            return null;

        if (!isRed(node, RIGHT) && !isRed(node, RIGHT, LEFT))
            node = this.moveRedRight(node);

        node.setRight(this._deleteMax(node.getRight()));

        return this.balance(node);
    }

    BinarySearchTree.prototype.moveRedLeft = function (node) {
        this.flipColors(node);
        if (isRed(node,RIGHT,LEFT)) {
            node.setRight(this.rotateRight(node.getRight()));
            node = this.rotateLeft(node);
            this.flipColors(node);
        }
        return node;
    }

    BinarySearchTree.prototype.moveRedRight = function (node) {
        // assert (h != null);
        // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
        this.flipColors(node);
        if (isRed(node,LEFT,LEFT)) {
            node = this.rotateRight(node);
            this.flipColors(node);
        }
        return node;
    }

    BinarySearchTree.prototype.balance = function (node) {
        // assert (h != null);

        if (isRed(node,RIGHT)) node = this.rotateLeft(node);
        if (isRed(node, LEFT) && isRed(node,LEFT,LEFT)) node = this.rotateRight(node);
        if (isRed(node, LEFT) && isRed(node, RIGHT)) this.flipColors(node);

        // node.size = node.getLeft().size + node.getRight().size + 1;
        return node;
    }

    BinarySearchTree.prototype.getMin = function(node){
        if(!(node instanceof BinarySearchTree.Node)){
            node = this.root;
            if(this.isEmpty()){
                return null;
            }
        }
        for(var temp = node; temp.getLeft()!==null; temp = temp.getLeft());

        return temp.value;
    }

    BinarySearchTree.prototype.getMax = function(node){
        if(!(node instanceof BinarySearchTree.Node)){
            node = this.root;
            if(this.isEmpty()){
                return null;
            }
        }
        for(var temp = node; temp.getRight()!==null;temp=temp.getRight());

        return temp.value;
    }

    BinarySearchTree.prototype.rotateRight = function (node) {
        let x = node.getLeft();
        node.setLeft(x.getRight());
        if(x.getRight()!==null){
            x.getRight().setParent(node);
        }
        x.setParent(node.getParent());
        x.setRight(node);
        node.setParent(x);
        x.color = x.getRight().color;
        x.getRight().color = RED;
        // x.size=node.size;
        // node.size = size(node.getLeft()) + size(node.getRight()) +1;
        return x;
    }

    BinarySearchTree.prototype.rotateLeft = function (node) {
        let x = node.getRight();
        node.setRight(x.getLeft());
        if(x.getLeft()!==null){
            x.getLeft().setParent(node);
        }
        x.setLeft(node);
        x.setParent(node.getParent());
        node.setParent(x);
        x.color = x.getLeft().color;
        x.getLeft().color = RED;
        // x.size=node.size;
        // node.size = size(node.getLeft()) + size(node.getRight()) +1;
        return x;
    }
    BinarySearchTree.prototype.flipColors = function (node) {
        node.flipColor();
        if(node.getLeft()!==null){
            node.getLeft().flipColor();
        }
        if(node.getRight()!==null){
            node.getRight().flipColor();
        }
    }
    BinarySearchTree.prototype._dfsVisualization = function (node, level, isFirst){
        if(node===null){
            return;
        }
        if(!(node instanceof Tree.Node)){
            node = this.root;
            level = 0;
            isFirst = true;
        }
        let char = "";
        let i;
        if(!isFirst){
            console.log();
            for (i = 0; i < level - 1; i++) {
                char += "\t";
            }
        }
        if(level !== 0){
            char += "\t";
        }
        
        process.stdout.write(char + node.value+ (isRed(node)?'r':'b'));
        for(let child of node.getChildren()){
            if(child === node.getChildren()[0]){
                this._dfsVisualization(child, level+1, true);
            }else{
                this._dfsVisualization(child, level+1, false);
            }
        }
    }

    BinarySearchTree.Node = function (value,color) {
        this.value = value;
        this.color = color;
        this.parent = null;
        this.children = [];
        this.size = 0;

        // left
        this.children[0] = null;
        // right
        this.children[1] = null;
    }

    BinarySearchTree.Node.prototype = new Tree.Node();

    BinarySearchTree.Node.prototype.getChildren = function () {
        return this.children;
    }

    BinarySearchTree.Node.prototype.flipColor = function () {
        this.color = isRed(this) ? BLACK : RED;
    }
    BinarySearchTree.Node.prototype.getLeft = function () {
        return this.children[0];
    }

    BinarySearchTree.Node.prototype.setLeft = function (node) {
        this.children[0] = node;
    }

    BinarySearchTree.Node.prototype.getRight = function () {
        return this.children[1];
    }

    BinarySearchTree.Node.prototype.setRight = function (node) {
        this.children[1] = node;
    }

    BinarySearchTree.Node.prototype.insertToLeft = function (child) {
        if (!(child instanceof BinarySearchTree.Node)) {
            throw new Error("NodeTypeError : " + child);
        }
        if (this.getLeft() !== null) {
            throw new Error("AlreadyExistError : " + child.value);
        }

        this.children[0] = child;
        child.setParent(this);
        this.childrenSize++;
    }

    BinarySearchTree.Node.prototype.insertToRight = function (child) {
        if (!(child instanceof BinarySearchTree.Node)) {
            throw new Error("NodeTypeError : " + child);
        }
        if (this.getRight() !== null) {
            throw new Error("AlreadyExistError : " + child.value);
        }

        this.children[1] = child;
        child.setParent(this);
        this.childrenSize++;
    }

    BinarySearchTree.Node.prototype.getGrandParent = function () {
        let parent = this.getParent()
        return parent !== null ? parent.getParent() : null;
    }

    BinarySearchTree.Node.prototype.getUncle = function () {
        let grandParent = this.getGrandParent();
        return this.getParent() === grandParent.getLeft() ? 
            grandParent.getRight() : grandParent.getLeft();
    }
    return BinarySearchTree;
})();
const BTree = (function () {
    "use strict";
    /**
     * @class BTree
     * @classdesc BTree 
     * 
     * B-tree is a self-balancing tree data structure that maintains sorted 
     * data and allows searches, sequential access, insertions, and deletions 
     * in logarithmic time. The B-tree is a generalization of a binary search 
     * tree in that a node can have more than two children. Unlike self-balancing 
     * binary search trees, the B-tree is well suited for storage systems that 
     * read and write relatively large blocks of data, such as discs. It is 
     * commonly used in databases and file systems.
     * 
     * - 
     * - All leaf nodes have same distance with root node.
     * 
     * Time complexity
     * - spacing : O(n) 
     * - searching : O(log n)
     * - insertion : O(log n)
     * - deletion : O(log n)
     * 
     * ref) [Wikipedia](en.wikipedia.org/wiki/B-tree)
     * 
     * @desc
     * #### Example -
     * ```js
     * var BTree = require("@structure-js/datastructure").BTree;
     * var bTree=new BTree();
     * ```
     */
    const M = 6;

    function BTree() {
        this.size = 0;
        this.height = 0;
        this.root = new BTree.Node(0);
        this.compare = function(k1, k2){
            return k1 - k2;
        }

        return this;
    }

    BTree.prototype = new Tree();

    BTree.prototype.insert = function (key) {

        let u = this.insert2(this.root, key, this.height);
        this.size++;
        if (u == null) return;

        // need to split root
        let t = new BTree.Node(2);
        t.children[0] = new BTree.Entry(this.root.children[0].key, this.root);
        t.children[1] = new BTree.Entry(u.children[0].key, u);
        this.root = t;
        this.height++;
    }
    BTree.prototype.insert2 = function (node, key, ht) {
        let i;
        let t = new BTree.Entry(key, null);

        if (ht == 0) {  // external node
            for (i = 0; i < node.size; i++) {
                if (this.compare(node.children[i].key, key) > 0) break;
            }
        } else {        // internal node
            for (i = 0; i < node.size; i++) {
                if (((i + 1) === node.size) || (this.compare(node.children[i + 1].key, key) > 0)) {
                    let u = this.insert2(node.children[i++].nextNode, key, ht - 1);   //node type
                    if (u === null) {
                        return null;
                    }
                    t.key = u.children[0].key;
                    t.nextNode = u;
                    break;
                }
            }
        }

        for (let j = node.size; j > i; j--) {
            node.children[j] = node.children[j - 1];
        }
        node.children[i] = t;
        node.size++;
        if (node.size < M) {
            return null;
        } else {
            return this.split(node);
        }
    }

    BTree.prototype.get = function (key) {
        if (key == null) throw new IllegalArgumentException("argument to get() is null");

        let result = this.search(this.root, new BTree.Entry(key, null), this.height);
        if (result !== null) {
            return result.key;
        } else {
            return null;
        }
    }

    BTree.prototype.search = function (node, key, ht) {
        let children = node.children;

        
        if (ht === 0) { // external node
            for (let i = 0; i < node.size; i++) {
                if (this.compare(children[i].key, key) === 0) {
                    return children[i];
                }
            }
        } else {        // internal node
            for (let i = 0; i < node.size; i++) {
                if (((i + 1) === node.size) || (this.compare(children[i + 1].key, key) > 0)) {
                    return this.search(children[i].nextNode, key, ht - 1);
                }
            }
        }
        return null;
    }

    BTree.prototype.split = function (node) {
        let t = new BTree.Node(M / 2);
        node.size = M / 2;
        let splited = [];
        for (let i = 0; i < M / 2; i++) {
            t.children[i] = node.children[M / 2 + i];
            splited.push(M / 2 + i);
        }
        for (let i = splited.length - 1; i >= 0; i--) {
            node.children.splice(splited[i], 1);
        }
        return t;
    }

    BTree.prototype.delete = function (key) {
    }

    BTree.prototype._bfsVisualization = function () {
        let queue = new Queue();

        queue.push(this.root);
        let height = this.height;
        while (!queue.isEmpty()) {
            let tempQueue = new Queue();
            let space = "";
            for (let i = 0; i < height * 7; i++) {
                space += "\t";
            }
            process.stdout.write(space);
            while (!queue.isEmpty()) {
                for (let child of queue.pop().children) {
                    if (!(child instanceof BTree.Entry)) continue;
                    process.stdout.write((child.key + "\t"));
                    if (child.nextNode !== null) {
                        tempQueue.push(child.nextNode);
                    }
                }
                process.stdout.write("\t\t");
            }
            queue = tempQueue;
            console.log();
            height--;
        }
    }

    BTree.Node = function (size) {
        this.children = new Array(M);
        this.size = size;
    }

    BTree.Node.prototype = new Tree.Node();

    BTree.Node.prototype.getChildren = function () {
        return this.children;
    }

    BTree.Entry = function (key, nextNode) {
        this.key = key;
        this.nextNode = nextNode;
    }
    return BTree;
})();

