<template>
  <div>
      <table>
          <tr :key="j.hname" v-for="j in myJjim">
              <td>
                  <ul>
                      <li>{{j.hname}}</li>
                      <li>{{j.hno}}</li>
                      <li>{{j.hdong}}</li>
                      <li>{{j.hwidth}}</li>
                      <li>{{j.hprice}}</li>
                  </ul>
              </td>
          </tr>
      </table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    created(){
        console.log(this.$store.state.userId);
        axios
        .post("http://localhost:8000/happyhouse/jjim/list", this.$store.state.userId)
        .then((response)=>{
            console.log(response.data);
            this.myJjim = response.data;
        })
        .catch((ex)=>{
            console.log(ex);
        });
    },
    data(){
        return {
            myJjim : [],
        }
    }
}
</script>
<style>

</style>