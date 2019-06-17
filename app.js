

function LRUNode(key) {
    this.key = key;
    this.next = this.prev = null;
}


function LRUCache(capacity) {
    this.capacity = capacity;
    this.head = this.tail = null;
    this.length = 0;
    this.data = {};
    this.nodeRefs = {};
}

LRUCache.prototype.set = function (key, value) {

    if (this.data[key]) {

        this.bubbleUp(key);
        this.data[key] = value;

    } else {

        var head = new LRUNode(key);


        if (this.head === null && this.tail === null) {
            this.head = head;
            this.tail = head;

            this.head.next = this.tail;
            this.tail.prev = this.head;
        } else {
            this.head.prev = head;
            head.next = this.head;
            this.head = head;
        }


        this.nodeRefs[head.key] = head;


        this.length += 1;


        if (this.length > this.capacity) {

            var tail = this.tail;
            this.tail = tail.prev;
            this.length -= 1;


            delete this.data[tail.key];
            delete this.nodeRefs[tail.key];
        }

        this.data[key] = value;
    }
};


LRUCache.prototype.get = function (key) {

    if (this.data[key]) {

        this.bubbleUp(key);

        return this.data[key];
    }

    return null;
};


LRUCache.prototype.bubbleUp = function (key) {

    if (this.nodeRefs[key] && this.nodeRefs[key] !== this.head) {
        var prefRef = this.nodeRefs[key].prev;
        var nextRef = this.nodeRefs[key].next;

        prefRef.next = nextRef;
        nextRef.prev = prefRef;

        this.head.prev = this.nodeRefs[key];
        this.nodeRefs[key].next = this.head;
        this.head = this.nodeRefs[key];
    }
};


var cache = new LRUCache(3);


cache.set("key1", 12);
cache.set("key2", 3);
cache.set("key3", 9);
cache.set("key4", 12);
console.log(cache.get("key1"));

console.log(cache);
