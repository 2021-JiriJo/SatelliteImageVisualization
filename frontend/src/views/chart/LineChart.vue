<script>

import { Line } from 'vue-chartjs'

export default {
  name:'LineChart',
  extends: Line,
  data() {
    return{
      chartdata: {
      labels: ['2021-01-21','2021-01-22','2021-01-23','2021-01-24','2021-01-25'],
      datasets: [
        {
          label: 'plane',
          borderColor: '#78f979',
          data: [40,30,20,50,60],
          fill: false
        }       
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

