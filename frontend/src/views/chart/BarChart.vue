<script>

import { Bar } from 'vue-chartjs'

export default {
  name:'BarChart',
  extends: Bar,
  data() {
    return{
      chartdata: {
      labels: ['objects'],
      datasets: [
        {
          label: 'plane',
          backgroundColor: '#78f979',
          data: [40]
        },
        {
          label: 'car',
          backgroundColor: '#7879f9',
          data: [20]
        },        
        {
          label: 'tank',
          backgroundColor: '#f879f9',
          data: [62]
        },        
        {
          label: 'jeep',
          backgroundColor: '#787979',
          data: [33]
        },        
      ]
    },
    options: {   
      responsive: true,
      maintainAspectRatio: false,  
      scales: {
              xAxes: [{
                  scaleLabel: {
                      labelString: 'X axe name',
                      fontColor:'#000000',
                      fontSize:10},
                  ticks: { fontColor: "#DDDDDD"}}],
              yAxes: [{
                  scaleLabel: {
                      labelString: 'Y axe name',
                      fontColor: '#000000',
                      fontSize:10
                  },
                  ticks: {
                    fontColor: "#DDDDDD",
                    beginAtZero: true,
                    max: 70
                    }
              }]
            }
        }
    }
  },
  
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

