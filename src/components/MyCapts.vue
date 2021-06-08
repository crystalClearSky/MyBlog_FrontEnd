<template>
  <div>{{ checkGuest() }}
    <div class="cap_check_container" :class="{ show: runEvent(), hide: !runEvent() }">{{ runThis() }}
      <div class="title">Humanator</div>
      <div class="confirmed" :class="{passed: hasPassed}"><img :src="
              require('../assets/SVG/' +
                checkIcons[Number(hasPassed)] +
                '.svg')
            "
            alt=""
          /></div>
      <div class="indicator"></div>
      <div class="cap_check_wrapper" :class="{chaeck_passed: hasPassed}">
        <div class="words">{{ captureFunct() }}{{ capResult }}</div>
        <input type="text" placeholder="Retype above text..." v-model="textCheck" @keypress.enter="confirmEntry()" />
        <div class="buttons"><button @click="confirmEntry()">I am living</button><button @click="captureFunct(1)">refresh</button></div>
        

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import JButton from "@/components/JButton.vue";
import IOptions from "@/types/Options";
import INewIp from "@/types/NewIp";

@Component({
  name: "MyCapts",
  components: { JButton }
})
export default class MyCapts extends Vue {
  @Prop() options!: IOptions;
  @Prop() justIp!: INewIp;
  checkIcons = ["flag","white_check"];
  showBox = false;

  toCheck = "";
  get textCheck(): string {
    return this.toCheck;
  }

  set textCheck(value: string) {
    //this.rateChecker(value)
    this.typedCharacters = value;
    this.rateCheck();

    console.log(this.toCheck);
    this.toCheck = value;
  }

  runEvent(): boolean {
    setTimeout(() => {
        this.$nextTick().then(() => { this.showIt ? this.showBox = true : this.showBox = false });
    },200);
    console.log("showBox " + this.showIt)
    return this.showBox;
  }
  showIt = false;
  checkGuest() {
    //this.$nextTick().then(() => { alert(this.options.isLiving)})
    setTimeout(() => {
      if(this.justIp && !this.options?.isLiving) {
        this.showIt = true;
    }
    }, 300);
    
  }

  runThis() {
    console.log("in run this");
    setTimeout(() => {
      if(this.options?.isLiving) {
        //alert(this.options.isLiving)
        this.showBox = false;
        this.$emit("hide", this.showBox)
        //this.$emit("isConfirmed", true);
      }
    },100);
  }

  capResult = "";
  hasEntered = false;
  captureFunct(enter = -1) {
    enter > -1 ? this.hasEntered = false : 0;
    if (!this.hasEntered) {
      const chars =
        "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!!£$%^&*()";
      let result = chars[Math.floor(Math.random() * chars.length)];

      for (let i = 0; i < 6; i++) {
        result = result + chars[Math.floor(Math.random() * chars.length)];
      }
      this.capResult = result;
      this.clear();
      this.hasEntered = true;
    }
  }

  clear() {
    console.log("CLEARING")
    clearInterval(this.timer);
      this.pattern = [];
      this.toCheck = "";
      this.counting = 0;
      this.regulatorPattern = [];
      this.regulate = 0;
  }
  
  // isComplete = false;
  // counter = 0;
  // lastRate = 1;
  // newRate = 1;
  // charCount = 0;
  // lastCharCount = 0;
  // n = new Map([]);
  // lastChar = "";
  // charResult = ""
  // m: number[] = [];
  // rateChecker(char: string) {
  //   let t;
  //   clearInterval(t);
  //   this.charCount++;
  //   const letter = char.length - 1;
  //   if(this.charCount < char.length) {
  //     alert("No copy pay allowed");
  //   }
  //   if (this.counter > 0) {
  //     this.lastRate = this.counter;
  //     this.lastChar = letter;
      
  //     this.counter = 0;
  //     this.charResult += " " + String(this.n.get(letter));
  //     console.log(char.length +" hey!!  last character: " + char[char.length - 2] + " : " + this.m);
  //     for(const i of this.m) {
  //       console.log("from n - " + i)
  //     }
  //   }
  //   if (char.length <= this.charCount) {
  //     if (this.charCount > 1) {
  //       this.newRate = this.lastRate;
  //     }
  //     if (this.charCount <= char.length) {
  //       t = setInterval(() => {
  //         //console.log("counter - " + this.counter);
  //         this.m[letter] = this.counter;
  //         //this.n.set(letter, this.counter);
  //         if (this.counter > 1000) {
  //           clearInterval(t);
  //           this.lastCharCount = this.charCount;
  //           // console.log(
  //           //   "Timed out!! - last rate: " +
  //           //     this.lastRate +
  //           //     " new rate: " +
  //           //     this.newRate + " "
  //           // )
            
  //           return;
  //         }
  //         this.counter++;
  //       }, 10);
       
  //     }
  //     this.lastRate = this.counter;
  //   }
  //    for(const i of this.n) {
  //       console.log("finished n - " + i)
  //     }
  // }
  characters = "";
  typedCharacters = "";
  pattern: number[] = [];
  counting = 0;
  timer: any;
  charCount = 0;
  rateCheck() {
    this.charCount++;
    clearInterval(this.timer)
    if(this.charCount < this.typedCharacters.length) {
      this.charCount = 0;
       alert("No copy pay allowed");
       setTimeout(() => {
         this.toCheck = "";
       this.typedCharacters = "";
       this.clear();

       this.captureFunct(1)
       }, 20);
       
     }
    this.timer = setInterval(() => {
      if(this.counting > 1000){
        console.log("CLEARED");
        clearInterval(this.timer)
      }
      this.counting++;
    }, 10);
        console.log("CHANGED");
        this.pattern.push(this.counting);
        console.log("pat- " + this.pattern);
        this.counting = 0;
    this.characters = this.typedCharacters;
  }

  regulatorPattern: boolean[] = [];
  hasPassed = false;
  regulate = 0;
  confirmEntry() {
    for (let i = 0; i < this.pattern.length; i++) {
      this.pattern[i + 1] > this.pattern[i] ? this.regulate++ : this.regulate--
      this.regulate >= 4 || this.regulate <= -4 ? this.hasPassed = false : this.hasPassed = true;
      this.regulatorPattern.push(this.pattern[i + 1] > this.pattern[i]);
    }
    if(this.pattern.length >= this.typedCharacters.length && this.typedCharacters == this.capResult && this.hasPassed){
      this.hasPassed = true;
      this.$emit("isConfirmed", true);
      setTimeout(() => {
        this.showBox = false;
        this.clear();
      this.captureFunct(1);
      }, 500);
      //alert("all good!! " + this.regulatorPattern + " regulate - " + this.regulate)
      
    } else {
      alert("In valid sumbols or robotic entry. Please retry.")
      this.hasPassed = false;
      this.clear();
      this.captureFunct(1);
    }
  }
}
</script>

<style scoped lang="scss">
.cap_check_container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  

  .cap_check_wrapper {
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    max-width: 310px;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 2px solid rgb(252, 63, 63);
    box-shadow: 0 5px 13px rgba(0, 0, 0, 0.55);


    .words {
      padding: 3px 10px 3px 10px;
      border: 2px solid black;
      display: inline-block;
      width: 100px;
    }
    input[type="text"] {
      width: 170px;
      padding: 3px 10px 3px 10px;
      margin: 4px 10px 4px 10px;
      border: none;
      border-bottom: 2px solid rgb(85, 85, 85);
      outline: none;

      &:focus {
        outline: none;
        border-bottom: 2px solid green;
        transition: 0.5s all;
      }
    }
  }

  .chaeck_passed {
    border: 2px solid green;
  }

  .title {
    position: absolute;
    background-color: #fff;
    padding: 0 5px 0 5px;
    font-size: .8em;
    top: 13px;
    color: black;
  }
  .confirmed {
    position: absolute;
    right: 5%;
    top: -5px;
    background-color: rgb(252, 63, 63);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    img {
      width: 20px;
    }
  }
  .passed {
    background-color: green;
  }
}
.show {
  transform: scale(1);
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.hide {
  transform: scale(0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
</style>