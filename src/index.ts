// class Human {
//     public name:string;
//     public age:number;
//     public gender:string;

//     constructor(name:string, age:number, gender:string){
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//     }

// }
// const hyoeun = new Human("hyoeun",28,"female")
// console.log(typeof hyoeun)
// const sayHi = (person:Human):void=> {
// console.log (`hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`)
// }

// sayHi(hyoeun)


import * as CryptoJS from "crypto-js"
class Block {
   

    static calculateBlocKHash = (index:number,previousHash:string,timestamp:number,data:string):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    
    static validateStructure = (aBlock:Block) : boolean => typeof aBlock.index === "number" &&typeof aBlock.hash === "string"&& typeof aBlock.previousHash === "string" && typeof aBlock.timestamp === "number" && typeof aBlock.data === "string"


    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
        ){
            this.index= index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp
        }
}

const Genesisblock:Block = new Block(0,"sdjfldsjfl","","hello",123456);

let blockchain:Block[] = [Genesisblock];

const getBlockchain = () : Block[] => blockchain;
const getLatestBlock = ():Block => blockchain[blockchain.length -1];
const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data:string) : Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    console.log(newIndex)
    const nextTimestamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateBlocKHash(newIndex, previousBlock.hash, nextTimestamp,data);
    const newBlock : Block = new Block(newIndex, nextHash,previousBlock.hash,data,nextTimestamp);
    addBlock(newBlock);
    return newBlock
}

const getHashForBlock = (aBlock:Block):string => Block.calculateBlocKHash(aBlock.index, aBlock.previousHash,aBlock.timestamp,aBlock.data);

const isBlockValid = (candidateBlock:Block, previousBlock:Block) :boolean =>{
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }
    else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    }else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }else if(getHashForBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }else{
        return true;
    }
}

const addBlock = (candidateBlock:Block) : void => {
    if(isBlockValid(candidateBlock,getLatestBlock())){
        blockchain.push(candidateBlock)
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(getBlockchain())

export {};//이거 버그 같음 ㅎㅎ 

