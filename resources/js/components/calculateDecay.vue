<template>
    <div class="container">
    <div class="row mt-5">
      <div class="col">
        
      </div>
    </div>
    <div class="row mt-5" v-if="arrMatter.length > 0">
      <div class="col">
        <h2 class="text-center">{{this.atom.name}} </h2>
        <br>
         <h3 class="text-center">{{this.time}} saniye sonra {{this.result}} gram kalır </h3>
        <line-chart
          :chartData="arrMatter"
          :arrTime="arrTime"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Kütle"
        />
      </div>
    </div>

    

    

    

    
  </div>
</template>


<script>
import LineChart from './LineChart';
export default {
     props: ['t','m','a'],
     components: {
        LineChart
        },
     data(){
         return{
             time: this.t,
             mass: this.m,
             atom:this.a,
             result: null,
             arrMatter: [],
             arrTime: [
                 '1 saniye','1 dakika', '1 saat', '1 gün', '1 hafta', '1 ay', '1 yıl'
             ],
              positiveChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F"
      }, chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }

         }

    },
    created(){

        let ratio= this.time/this.atom.hlife;
        let total=Math.pow(0.5,ratio)*this.mass;
        this.result=total;
        this.arrMatter.push(Math.pow(0.5,1/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,60/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,360/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,(360*24)/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,(360*24*7)/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,(360*24*7*30)/this.atom.hlife)*this.mass);
        this.arrMatter.push(Math.pow(0.5,(360*24*7*30*365)/this.atom.hlife)*this.mass);
       




    }
}

</script>