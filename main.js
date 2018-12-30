const visualization = {
    container: document.getElementsByClassName('container')[1],
    Template: function(text){
        var layout = document.createElement('div');
        var title = document.createElement('h3');
        var container = document.getElementsByClassName('container')[1];
        layout.classList.add(`layout`);
        title.innerHTML += text;
        container.appendChild(layout);
        layout.appendChild(title);
        return layout;
    },
    Stack: function(stack){
        var layout = this.Template('Stack');
        var p = layout;
        for(var e of stack){
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML += `${e}`
            li.appendChild(a);
            ul.appendChild(li);
            p.appendChild(ul);
            p = li;
        }
    },
    Queue: function(queue){
        var layout = this.Template('Queue');
        var p = layout;
        for(var e of queue){
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML += `${e}`
            li.appendChild(a);
            ul.appendChild(li);
            p.appendChild(ul);
            p = li;
        }
    },
    Deque: function(deque){
        var layout = this.Template('Deque');
        var p = layout;
        for(var e of deque){
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML += `${e}`
            li.appendChild(a);
            ul.appendChild(li);
            p.appendChild(ul);
            p = li;
        }
    },
    List: function(list){
        var layout = this.Template('List');
        var p = layout;
        for(var e of list){
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML += `${e}`
            li.appendChild(a);
            ul.appendChild(li);
            p.appendChild(ul);
            p = li;
        }
    },
    Heap: function(heap,text){
        var layout = this.Template(text);
        var level = 1;
        var ul = document.createElement('ul');
        var list = [0,ul];
        layout.appendChild(ul);
        for(var i = 1; i < heap._list.length; i++){
            if(i >= level*2){
                level++;
                ul = document.createElement('ul');
                list[i/2].appendChild(ul);
            }
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML += `${heap._list[i]}`
            li.appendChild(a);
            ul.appendChild(li);
            list[i] = li;
        }
    },
    MaxHeap: function(heap){
        this.Heap(heap,'MaxHeap');
    },
    MinHeap: function(heap){
        this.Heap(heap,'MinHeap');
    },
    PriorityQueue: function(heap){
        this.Heap(heap,'PriorityQueue');
    },
    Graph: function(graph){
        // graph
    },
    Tree: function(tree){
        // tree
    },
}
const run = function() {
    var text = document.getElementsByClassName('code')[0].value;
    while(document.getElementsByClassName('container')[1].children.length > 1){
        document.getElementsByClassName('container')[1].children[1].remove();
    }
    eval(text);
}