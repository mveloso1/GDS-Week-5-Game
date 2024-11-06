console.log("I am in wk5")

class Player {
    constructor() {
        this.name = "";
        this.level = 0;
    }
    setName(temp) {
        this.name = temp;
    }
    getName() {
    return  this.name;
    }
    setLevel (newlevel) {
    this.level = newlevel;
    }
    getLevel () {
    return this.level;
    }
}
 debugger;
const spider = new Player();
spider.setName("Spider");
spider.setLevel(10);

const wolfspider = new Player();
wolfspider.setName("Wolfspider");
wolfspider.setLevel(15);

const crabspider = new Player();
crabspider.setName("Crabspider");
crabspider.setLevel(25);

const arrayOfObjects = [spider, wolfspider, crabspider];
console.log(arrayOfObjects[1].getName());