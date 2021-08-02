<template>
<div class="container">
  <div class="dropdown">
    <input v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput" v-model.trim="inputValue" class="dropdown-input" type="text" placeholder="İzotop seçin" />
    <div v-else @click="resetSelection" class="dropdown-selected">
      <img :src="selectedItem.flag" class="dropdown-item-flag" />
      {{ selectedItem.name }}
    </div>
    <div v-show="inputValue && apiLoaded" class="dropdown-list">
      <div @click="selectItem(item)" v-show="itemVisible(item)" v-for="item in itemList" :key="item.name" class="dropdown-item">
        <img :src="item.flag" class="dropdown-item-flag" />
        {{ item.name }}
      </div>
    </div>
  </div>
  <div class=" w-50 m-auto pt-5 ">
  <div class="card card-body">
    
    <div class="form-row">
    <div class="form-group col-md-6">

      <input v-model="mass" type="text" class="form-control"  placeholder="kütleyi giriniz">

      

    </div>

      <div class="form-group col-md-4">

       <select v-model="picked" class="form-control">
      <option v-for="setting in settings" v-bind:value="setting.value">
    {{ setting.text }}
  </option>
</select>


    </div>
    </div>
    
    <div class="form-row">

    <div class="form-group col-md-6">

      <input v-model="time" type="text" class="form-control"  placeholder="süre giriniz">


    </div>
    <div class="form-group col-md-4">

       <select v-model="selected" class="form-control">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>


    </div>

    </div>

     <button v-on:click="calculate" type="submit" class="btn btn-primary">Hesapla</button>

    

     
    
    



  </div>
  </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selectedItem: {},
      inputValue: '',
      itemList: [],
      apiLoaded: false,
      selected: '1',
      picked: '1',
      mass: 0,
      time:0,
    options: [
      { text: 'nanosaniye', value: 0.000000001 },
      { text: 'mikrosaniye', value: 0.000001 },
      { text: 'milisaniye', value: 0.001 },
      { text: 'saniye', value: 1 },
      { text: 'dakika', value: 60 },
      { text: 'saat', value: 3600 },
      { text: 'gün', value: 3600*24 },
      { text: 'hafta', value: 3600*24*7 },
      { text: 'ay', value: 3600*24*7*30 },
      { text: 'yıl', value: 3600*24*7*30*365 },
    ],

    settings: [
     
      { text: 'miligram', value: '0.001' },
      { text: 'gram', value: '1' },
      { text: 'kilogram', value: '1000' },
      { text: 'ton', value: '1000000' },
  
    ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    resetSelection () {
      this.selectedItem = {}
      this.$nextTick( () => this.$refs.dropdowninput.focus() )
      this.$emit('on-item-reset')
    },
    selectItem (theItem) {
      this.selectedItem = theItem 
      this.inputValue = ''
      this.$emit('on-item-selected', theItem)
    },
    itemVisible (item) {
      let currentName = item.name.toLowerCase()
      let currentInput = this.inputValue.toLowerCase()
      return currentName.includes(currentInput)
    },
    getList () {
      axios.get("/api/atoms").then( response => {
        this.itemList = response.data
        this.apiLoaded = true
      })
    },
    calculate(){

      this.time*=this.selected;
      this.mass*=this.picked;
      
      this.$router.push({
        name: 'decayCalculate',
        params: {
        t: this.time,
        m: this.mass,
        a: this.selectedItem
    }
      
      
      });


    }
  }
}
</script>

<style>
.dropdown{
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.dropdown-input, .dropdown-selected{
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus, .dropdown-selected:hover{
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder{
  opacity: 0.7;
}
.dropdown-selected{
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list{
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item{
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover{
  background: #edf2f7;
}
.dropdown-item-flag{
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
}
.meat{
  text-align: center;
  margin-top: 5em;
  }

</style>